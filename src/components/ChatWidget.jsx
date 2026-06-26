import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

async function callGemini(messages) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error(`Chat API error ${res.status}`);
  const data = await res.json();
  return data.text;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const customerDoc = await getDoc(doc(db, 'customers', firebaseUser.uid));
        if (customerDoc.exists() && !customerDoc.data().isLocked) {
          setUser({ uid: firebaseUser.uid, ...customerDoc.data() });
        } else {
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'chats', user.uid, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const userMsg = { role: 'user', content: input.trim(), createdAt: new Date().toISOString() };
    setInput('');
    setSending(true);
    await addDoc(collection(db, 'chats', user.uid, 'messages'), userMsg);
    try {
      const history = [...messages, userMsg].slice(-10);
      const reply = await callGemini(history);
      await addDoc(collection(db, 'chats', user.uid, 'messages'), {
        role: 'assistant', content: reply, createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Chat error:', err);
      await addDoc(collection(db, 'chats', user.uid, 'messages'), {
        role: 'assistant', content: 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.', createdAt: new Date().toISOString(),
      });
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* Nút nổi */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-40">
          {/* Vòng pulse */}
          <span className="absolute inset-0 rounded-full bg-nature-green-400 opacity-40 animate-ping" />
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2.5 bg-gradient-to-br from-nature-green-500 to-nature-green-700 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:shadow-nature-green-400/40 hover:scale-105 transition-all duration-200"
            aria-label="Chat tư vấn sức khỏe"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs font-semibold tracking-wide">Chat AI miễn phí</p>
              <p className="text-[10px] text-white/75">Tư vấn sức khỏe 24/7</p>
            </div>
          </button>
        </div>
      )}

      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-nature-green-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-nature-green-700 transition-all"
          aria-label="Đóng chat"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[370px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: '520px' }}>
          {/* Header */}
          <div className="bg-nature-green-600 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              {authLoading ? (
                <p className="text-white font-semibold text-sm">Đang tải...</p>
              ) : user ? (
                <>
                  <p className="text-white font-semibold text-sm">Xin chào, {user.name}!</p>
                  <p className="text-white/70 text-xs">AI tư vấn sức khỏe Lan Tâm Đường</p>
                </>
              ) : (
                <p className="text-white font-semibold text-sm">Tư vấn sức khỏe AI</p>
              )}
            </div>
            {user && (
              <button onClick={() => signOut(auth)} className="text-white/70 hover:text-white" title="Đăng xuất">
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
            /* Chưa đăng nhập */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-nature-green-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-nature-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-wood-900 mb-2">Bạn chưa đăng nhập</h3>
              <p className="text-sm text-wood-500 mb-6">
                Vui lòng đăng nhập để trò chuyện cùng AI tư vấn sức khỏe của Lan Tâm Đường
              </p>
              <div className="flex flex-col gap-2 w-full">
                <a
                  href="/dang-nhap"
                  className="w-full bg-nature-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-nature-green-700 transition-colors text-center"
                >
                  Đăng nhập
                </a>
                <a
                  href="/dang-ky"
                  className="w-full border border-nature-green-300 text-nature-green-700 py-2.5 rounded-lg text-sm font-medium hover:bg-nature-green-50 transition-colors text-center"
                >
                  Đăng ký tài khoản mới
                </a>
              </div>
            </div>
          ) : (
            /* Đã đăng nhập - Chat */
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-wood-400 text-sm">Hãy đặt câu hỏi về sức khỏe để tôi tư vấn nhé!</p>
                  </div>
                )}
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-nature-green-600 text-white rounded-br-sm'
                        : msg.role === 'staff'
                        ? 'bg-amber-50 border border-amber-200 text-amber-900 rounded-bl-sm'
                        : 'bg-gray-100 text-wood-800 rounded-bl-sm'
                    }`}>
                      {(msg.role === 'assistant' || msg.role === 'staff') && (
                        <span className="text-[10px] font-semibold block mb-0.5 opacity-60">
                          {msg.role === 'staff' ? '👨‍⚕️ Nhân viên Lan Tâm Đường' : 'AI Lan Tâm Đường'}
                        </span>
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
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

              <div className="p-3 border-t border-gray-100 flex-shrink-0">
                <div className="flex gap-2 items-end">
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập câu hỏi sức khỏe..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 resize-none"
                    style={{ minHeight: '38px', maxHeight: '80px' }}
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
                <p className="text-xs text-wood-400 mt-1.5 text-center">Enter để gửi</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
