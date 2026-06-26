import { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, orderBy, query, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

export default function ChatHistory() {
  const { userProfile } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [chatHistory, setChatHistory] = useState({});
  const [summaries, setSummaries] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [sendingReply, setSendingReply] = useState({});
  const [summarizing, setSummarizing] = useState({});
  const [imageUploading, setImageUploading] = useState({});
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);
  const uploadTargetRef = useRef(null);

  useEffect(() => {
    const fetchCustomersWithChat = async () => {
      const snap = await getDocs(collection(db, 'customers'));
      const list = [];
      for (const d of snap.docs) {
        const msgSnap = await getDocs(collection(db, 'chats', d.id, 'messages'));
        if (msgSnap.size > 0) {
          list.push({ id: d.id, ...d.data(), msgCount: msgSnap.size });
        }
      }
      list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      setCustomers(list);
      setLoading(false);
    };
    fetchCustomersWithChat();
  }, []);

  const loadChat = (customerId) => {
    if (chatHistory[customerId]) return;
    const q = query(collection(db, 'chats', customerId, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      setChatHistory((prev) => ({
        ...prev,
        [customerId]: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
      }));
    });
    return unsubscribe;
  };

  const handleExpand = (customerId) => {
    if (expandedId === customerId) {
      setExpandedId(null);
    } else {
      setExpandedId(customerId);
      loadChat(customerId);
    }
  };

  const handleSummarize = async (customer) => {
    const msgs = chatHistory[customer.id];
    if (!msgs || msgs.length === 0) return;
    setSummarizing((prev) => ({ ...prev, [customer.id]: true }));
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs, customerName: customer.name }),
      });
      const data = await res.json();
      setSummaries((prev) => ({ ...prev, [customer.id]: data.summary }));
    } catch {
      setSummaries((prev) => ({ ...prev, [customer.id]: 'Không thể tóm tắt. Vui lòng thử lại.' }));
    } finally {
      setSummarizing((prev) => ({ ...prev, [customer.id]: false }));
    }
  };

  const handleReply = async (customer) => {
    const text = replyInputs[customer.id]?.trim();
    if (!text) return;
    setSendingReply((prev) => ({ ...prev, [customer.id]: true }));
    try {
      await addDoc(collection(db, 'chats', customer.id, 'messages'), {
        role: 'staff',
        content: text,
        senderRole: userProfile?.role,
        createdAt: new Date().toISOString(),
      });
      setReplyInputs((prev) => ({ ...prev, [customer.id]: '' }));
    } finally {
      setSendingReply((prev) => ({ ...prev, [customer.id]: false }));
    }
  };

  const triggerImageUpload = (customerId) => {
    uploadTargetRef.current = customerId;
    fileInputRef.current?.click();
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    const customerId = uploadTargetRef.current;
    if (!file || !customerId) return;
    e.target.value = '';
    setImageUploading((prev) => ({ ...prev, [customerId]: true }));
    try {
      const storageRef = ref(storage, `staff-images/${customerId}/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      await addDoc(collection(db, 'chats', customerId, 'messages'), {
        role: 'staff',
        type: 'image',
        imageUrl,
        senderRole: userProfile?.role,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Image upload error:', err);
    } finally {
      setImageUploading((prev) => ({ ...prev, [customerId]: false }));
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin h-8 w-8 text-nature-green-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageSelect}
      />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-wood-900">Lịch sử chat</h2>
        <p className="text-wood-500 text-sm mt-1">
          {customers.length} khách hàng có cuộc trò chuyện với AI
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <svg className="w-5 h-5 text-wood-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm theo tên, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-wood-800 placeholder-wood-400"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-wood-400">
            {search ? 'Không tìm thấy kết quả' : 'Chưa có cuộc trò chuyện nào'}
          </div>
        ) : (
          <div>
            {filtered.map((customer) => (
              <div key={customer.id} className="border-b border-gray-100 last:border-0">
                {/* Row */}
                <div
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleExpand(customer.id)}
                >
                  <div className="w-9 h-9 bg-nature-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-nature-green-700 font-semibold text-sm">
                      {customer.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-wood-900 text-sm">{customer.name || '—'}</p>
                    <p className="text-wood-400 text-xs">{customer.email} • {customer.phone}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs bg-nature-green-50 text-nature-green-700 px-2 py-1 rounded-full font-medium">
                      {customer.msgCount} tin nhắn
                    </span>
                    <svg
                      className={`w-4 h-4 text-wood-400 transition-transform ${expandedId === customer.id ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Chat detail */}
                {expandedId === customer.id && (
                  <div className="bg-gray-50 border-t border-gray-100 px-4 py-4">
                    {/* Nút tóm tắt AI */}
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-wood-600">Nội dung trò chuyện</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSummarize(customer); }}
                        disabled={summarizing[customer.id] || !chatHistory[customer.id]?.length}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                      >
                        {summarizing[customer.id] ? (
                          <>
                            <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Đang tóm tắt...
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Tóm tắt bằng AI
                          </>
                        )}
                      </button>
                    </div>

                    {/* Kết quả tóm tắt */}
                    {summaries[customer.id] && (
                      <div className="mb-3 bg-purple-50 border border-purple-200 rounded-xl p-3">
                        <p className="text-xs font-semibold text-purple-700 mb-1.5 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.001z" />
                          </svg>
                          Tóm tắt AI
                        </p>
                        <p className="text-xs text-purple-800 whitespace-pre-line leading-relaxed">
                          {summaries[customer.id]}
                        </p>
                      </div>
                    )}

                    {/* Tin nhắn */}
                    {!chatHistory[customer.id] ? (
                      <p className="text-xs text-wood-400">Đang tải...</p>
                    ) : chatHistory[customer.id].length === 0 ? (
                      <p className="text-xs text-wood-400">Chưa có tin nhắn</p>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {chatHistory[customer.id].map((msg) => (
                          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
                              msg.role === 'user'
                                ? 'bg-nature-green-100 text-nature-green-900'
                                : msg.role === 'staff'
                                ? 'bg-amber-50 border border-amber-200 text-amber-900'
                                : 'bg-white border border-gray-200 text-wood-700'
                            }`}>
                              <span className="font-semibold text-[10px] opacity-60 block mb-0.5">
                                {msg.role === 'user'
                                  ? customer.name
                                  : msg.role === 'staff'
                                  ? `Nhân viên (${msg.senderRole})`
                                  : 'AI'} • {formatDate(msg.createdAt)}
                              </span>
                              {msg.type === 'image' ? (
                                <img
                                  src={msg.imageUrl}
                                  alt="Hình ảnh"
                                  className="max-w-full rounded-lg max-h-40 object-contain cursor-pointer mt-1"
                                  onClick={() => window.open(msg.imageUrl, '_blank')}
                                />
                              ) : (
                                msg.content
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Hộp reply của nhân viên */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs font-semibold text-wood-500 mb-2">Nhắn tin trực tiếp đến {customer.name}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); triggerImageUpload(customer.id); }}
                          disabled={imageUploading[customer.id] || sendingReply[customer.id]}
                          className="w-8 h-8 flex items-center justify-center text-wood-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg border border-gray-200 transition-colors flex-shrink-0 disabled:opacity-40"
                          title="Gửi hình ảnh"
                        >
                          {imageUploading[customer.id] ? (
                            <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                        <input
                          type="text"
                          value={replyInputs[customer.id] || ''}
                          onChange={(e) => setReplyInputs((prev) => ({ ...prev, [customer.id]: e.target.value }))}
                          onKeyDown={(e) => e.key === 'Enter' && handleReply(customer)}
                          placeholder="Nhập tin nhắn cho khách hàng..."
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        <button
                          onClick={() => handleReply(customer)}
                          disabled={sendingReply[customer.id] || imageUploading[customer.id] || !replyInputs[customer.id]?.trim()}
                          className="px-3 py-2 bg-amber-500 text-white rounded-lg text-xs font-medium hover:bg-amber-600 disabled:opacity-40 transition-colors flex-shrink-0"
                        >
                          {sendingReply[customer.id] ? 'Đang gửi...' : 'Gửi'}
                        </button>
                      </div>
                      <p className="text-[10px] text-wood-400 mt-1">Tin nhắn và ảnh sẽ hiện trong cửa sổ chat của khách hàng</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
