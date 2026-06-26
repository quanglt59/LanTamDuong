import { useState, useEffect, useRef } from 'react';
import {
  collection, query, orderBy, onSnapshot, addDoc,
  getDocs, where,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

function getConversationId(uid1, uid2) {
  return [uid1, uid2].sort().join('__');
}

export default function StaffMessages() {
  const { currentUser, userProfile } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Lấy danh sách liên hệ (admin thấy managers, manager thấy admin)
  useEffect(() => {
    const targetRole = userProfile?.role === 'admin' ? 'manager' : 'admin';
    const q = query(collection(db, 'users'), where('role', '==', targetRole));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setContacts(list);
      // Nếu manager → chỉ 1 admin, tự động chọn
      if (targetRole === 'admin' && list.length === 1 && !selectedContact) {
        setSelectedContact(list[0]);
      }
    });
    return unsub;
  }, [userProfile]);

  // Load messages khi chọn contact
  useEffect(() => {
    if (!selectedContact || !currentUser) return;
    const convId = getConversationId(currentUser.uid, selectedContact.id);
    const q = query(
      collection(db, 'staffChats', convId, 'messages'),
      orderBy('createdAt', 'asc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [selectedContact, currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sending || !selectedContact) return;
    setSending(true);
    const convId = getConversationId(currentUser.uid, selectedContact.id);
    await addDoc(collection(db, 'staffChats', convId, 'messages'), {
      senderUid: currentUser.uid,
      senderName: userProfile?.email || currentUser.email,
      senderRole: userProfile?.role,
      content: input.trim(),
      createdAt: new Date().toISOString(),
    });
    setInput('');
    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const formatTime = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const isAdmin = userProfile?.role === 'admin';

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-wood-900">Nhắn tin nội bộ</h2>
        <p className="text-wood-500 text-sm mt-1">Trao đổi trực tiếp giữa admin và manager</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 flex overflow-hidden" style={{ height: '580px' }}>
        {/* Danh sách contacts — admin mới cần, manager thì ẩn (chỉ 1 admin) */}
        {isAdmin && (
          <div className="w-64 border-r border-gray-100 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-gray-100">
              <p className="text-xs font-semibold text-wood-500 uppercase tracking-wide">Managers</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.length === 0 ? (
                <p className="p-4 text-xs text-wood-400">Chưa có manager nào</p>
              ) : (
                contacts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedContact(c)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedContact?.id === c.id ? 'bg-nature-green-50' : ''
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-700 font-semibold text-xs">
                        {c.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        selectedContact?.id === c.id ? 'text-nature-green-700' : 'text-wood-800'
                      }`}>
                        {c.email}
                      </p>
                      <p className="text-xs text-wood-400">Manager</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Khung chat */}
        <div className="flex-1 flex flex-col">
          {!selectedContact ? (
            <div className="flex-1 flex items-center justify-center text-wood-400">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3 text-wood-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Chọn một manager để bắt đầu nhắn tin</p>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isAdmin ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <span className={`font-semibold text-xs ${isAdmin ? 'text-blue-700' : 'text-purple-700'}`}>
                    {selectedContact.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-wood-900">{selectedContact.email}</p>
                  <p className="text-xs text-wood-400">{isAdmin ? 'Manager' : 'Admin'}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <div className="text-center py-8 text-wood-400 text-sm">
                    Chưa có tin nhắn. Bắt đầu cuộc trò chuyện!
                  </div>
                )}
                {messages.map((msg) => {
                  const isMe = msg.senderUid === currentUser.uid;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                        {!isMe && (
                          <span className="text-[10px] text-wood-400 px-1">
                            {msg.senderRole === 'admin' ? 'Admin' : 'Manager'}
                          </span>
                        )}
                        <div className={`rounded-2xl px-4 py-2 text-sm ${
                          isMe
                            ? 'bg-nature-green-600 text-white rounded-br-sm'
                            : 'bg-gray-100 text-wood-800 rounded-bl-sm'
                        }`}>
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-wood-400 px-1">{formatTime(msg.createdAt)}</span>
                      </div>
                    </div>
                  );
                })}
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
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 resize-none"
                    style={{ minHeight: '40px', maxHeight: '100px' }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || sending}
                    className="w-10 h-10 bg-nature-green-600 text-white rounded-xl flex items-center justify-center hover:bg-nature-green-700 transition-colors disabled:opacity-40 flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
