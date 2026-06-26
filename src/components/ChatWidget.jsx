import { useState, useEffect, useRef } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Bạn là chuyên gia tư vấn sức khỏe của Lan Tâm Đường - thương hiệu thuốc Nam gia truyền dòng họ Đào với hơn 300 năm kinh nghiệm.

Nhiệm vụ:
- Tư vấn về các vấn đề sức khỏe theo y học cổ truyền và thuốc Nam
- Giới thiệu các sản phẩm/liệu pháp phù hợp của Lan Tâm Đường
- Gợi ý khách đặt lịch khám trực tiếp khi cần thiết

Nguyên tắc:
- Luôn trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp
- Không chẩn đoán bệnh cụ thể thay bác sĩ
- Câu trả lời ngắn gọn, dễ hiểu (tối đa 150 từ)
- Khi khách hỏi về triệu chứng nghiêm trọng, khuyên đến cơ sở y tế ngay

Các nhóm bệnh Lan Tâm Đường hỗ trợ: xương khớp, thần kinh, hô hấp, phục hồi chức năng, suy nhược cơ thể, chăm sóc phụ nữ và nội tiết.`;

async function callGemini(messages) {
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
    }),
  });

  if (!res.ok) throw new Error('Gemini API error');
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, tôi chưa thể trả lời lúc này.';
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  // Theo dõi auth state (chỉ dành cho customer)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const customerDoc = await getDoc(doc(db, 'customers', firebaseUser.uid));
        if (customerDoc.exists()) {
          const data = customerDoc.data();
          if (data.isLocked) {
            await signOut(auth);
            setUser(null);
          } else {
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email, name: data.name });
          }
        } else {
          // Không phải customer (có thể là admin đang test) → không set user
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Load lịch sử chat
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'chats', user.uid, 'messages'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, [user]);

  // Auto scroll xuống tin mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });
      await setDoc(doc(db, 'customers', cred.user.uid), {
        name: form.name,
        email: form.email,
        createdAt: new Date().toISOString(),
        isLocked: false,
      });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setAuthError('Email này đã được đăng ký');
      else if (err.code === 'auth/weak-password') setAuthError('Mật khẩu phải có ít nhất 6 ký tự');
      else setAuthError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
    } catch {
      setAuthError('Email hoặc mật khẩu không đúng');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const userMsg = { role: 'user', content: input.trim(), createdAt: new Date().toISOString() };
    setInput('');
    setSending(true);

    await addDoc(collection(db, 'chats', user.uid, 'messages'), userMsg);

    try {
      const history = [...messages, userMsg].slice(-10); // giữ 10 tin gần nhất
      const reply = await callGemini(history);
      await addDoc(collection(db, 'chats', user.uid, 'messages'), {
        role: 'assistant',
        content: reply,
        createdAt: new Date().toISOString(),
      });
    } catch {
      await addDoc(collection(db, 'chats', user.uid, 'messages'), {
        role: 'assistant',
        content: 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.',
        createdAt: new Date().toISOString(),
      });
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Nút nổi */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-nature-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-nature-green-700 transition-all hover:scale-110"
        aria-label="Chat tư vấn sức khỏe"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Popup chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[370px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ height: '520px' }}>
          {/* Header */}
          <div className="bg-nature-green-600 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Tư vấn sức khỏe AI</p>
              <p className="text-white/70 text-xs">Lan Tâm Đường • Thuốc Nam gia truyền</p>
            </div>
            {user && (
              <button
                onClick={() => signOut(auth)}
                className="text-white/70 hover:text-white text-xs"
                title="Đăng xuất"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>

          {authLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <svg className="animate-spin h-6 w-6 text-nature-green-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : !user ? (
            /* Form đăng nhập / đăng ký */
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="p-5 flex-1">
                <p className="text-sm text-wood-600 mb-4 text-center">
                  Đăng nhập để bắt đầu tư vấn sức khỏe miễn phí với AI của Lan Tâm Đường
                </p>

                {/* Tab */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                  <button
                    onClick={() => { setTab('login'); setAuthError(''); }}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${tab === 'login' ? 'bg-white text-wood-900 shadow-sm' : 'text-wood-500'}`}
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => { setTab('register'); setAuthError(''); }}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${tab === 'register' ? 'bg-white text-wood-900 shadow-sm' : 'text-wood-500'}`}
                  >
                    Đăng ký
                  </button>
                </div>

                <form onSubmit={tab === 'login' ? handleLogin : handleRegister} className="space-y-3">
                  {tab === 'register' && (
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2.5 border border-wood-200 rounded-lg text-sm focus:ring-2 focus:ring-nature-green-500 outline-none"
                    />
                  )}
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 border border-wood-200 rounded-lg text-sm focus:ring-2 focus:ring-nature-green-500 outline-none"
                  />
                  <input
                    type="password"
                    required
                    placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-3 py-2.5 border border-wood-200 rounded-lg text-sm focus:ring-2 focus:ring-nature-green-500 outline-none"
                  />
                  {authError && (
                    <p className="text-red-600 text-xs">{authError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={authSubmitting}
                    className="w-full bg-nature-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-nature-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {authSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Đang xử lý...
                      </>
                    ) : tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Giao diện chat */
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-wood-500 text-sm">Xin chào <strong>{user.name}</strong>!</p>
                    <p className="text-wood-400 text-xs mt-1">Hãy đặt câu hỏi về sức khỏe để tôi tư vấn nhé.</p>
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'bg-nature-green-600 text-white rounded-br-sm'
                          : 'bg-gray-100 text-wood-800 rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-wood-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-wood-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-wood-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-gray-100">
                <div className="flex gap-2 items-end">
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập câu hỏi sức khỏe..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 resize-none max-h-24 overflow-y-auto"
                    style={{ minHeight: '38px' }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || sending}
                    className="w-9 h-9 bg-nature-green-600 text-white rounded-xl flex items-center justify-center hover:bg-nature-green-700 transition-colors disabled:opacity-40 flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-wood-400 mt-1.5 text-center">Enter để gửi • AI tư vấn sức khỏe thuốc Nam</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
