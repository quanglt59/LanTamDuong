import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionMsg, setActionMsg] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [chatHistory, setChatHistory] = useState({});

  useEffect(() => {
    const q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      setCustomers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Load chat khi mở rộng
  useEffect(() => {
    if (!expandedId) return;
    const q = query(
      collection(db, 'chats', expandedId, 'messages'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setChatHistory((prev) => ({
        ...prev,
        [expandedId]: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
      }));
    });
    return unsubscribe;
  }, [expandedId]);

  const showMessage = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3000);
  };

  const handleToggleLock = async (customer) => {
    const newLocked = !customer.isLocked;
    await updateDoc(doc(db, 'customers', customer.id), { isLocked: newLocked });
    showMessage(newLocked ? `Đã khóa tài khoản ${customer.email}` : `Đã mở khóa tài khoản ${customer.email}`);
  };

  const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString('vi-VN') : '—';

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
  });

  const activeCount = customers.filter((c) => !c.isLocked).length;
  const lockedCount = customers.filter((c) => c.isLocked).length;

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-wood-900">Quản lý khách hàng</h2>
        <p className="text-wood-500 text-sm mt-1">Tài khoản đăng ký qua chat tư vấn AI</p>
      </div>

      {actionMsg && (
        <div className="mb-4 bg-nature-green-50 border border-nature-green-200 text-nature-green-800 px-4 py-3 rounded-lg text-sm">
          {actionMsg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-wood-500">Tổng khách hàng</p>
          <p className="text-3xl font-bold text-wood-900 mt-1">{customers.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-wood-500">Đang hoạt động</p>
          <p className="text-3xl font-bold text-nature-green-600 mt-1">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-wood-500">Bị khóa</p>
          <p className="text-3xl font-bold text-red-500 mt-1">{lockedCount}</p>
        </div>
      </div>

      {/* Search */}
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
            {search ? 'Không tìm thấy kết quả' : 'Chưa có khách hàng đăng ký'}
          </div>
        ) : (
          <div>
            {filtered.map((customer, index) => (
              <div key={customer.id} className="border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50">
                  <div className="w-9 h-9 bg-nature-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-nature-green-700 font-semibold text-sm">
                      {customer.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-wood-900 text-sm">{customer.name || '—'}</p>
                    <p className="text-wood-500 text-xs">{customer.email} • Đăng ký {formatDate(customer.createdAt)}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                    customer.isLocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {customer.isLocked ? 'Bị khóa' : 'Hoạt động'}
                  </span>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setExpandedId(expandedId === customer.id ? null : customer.id)}
                      className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-wood-600 hover:bg-gray-50"
                    >
                      {expandedId === customer.id ? 'Ẩn chat' : 'Xem chat'}
                    </button>
                    <button
                      onClick={() => handleToggleLock(customer)}
                      className={`text-xs px-3 py-1.5 rounded-lg border ${
                        customer.isLocked
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                          : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      }`}
                    >
                      {customer.isLocked ? 'Mở khóa' : 'Khóa'}
                    </button>
                  </div>
                </div>

                {/* Lịch sử chat */}
                {expandedId === customer.id && (
                  <div className="bg-gray-50 border-t border-gray-100 px-4 py-4">
                    <p className="text-xs font-semibold text-wood-600 mb-3">Lịch sử tư vấn AI</p>
                    {!chatHistory[customer.id] ? (
                      <p className="text-xs text-wood-400">Đang tải...</p>
                    ) : chatHistory[customer.id].length === 0 ? (
                      <p className="text-xs text-wood-400">Chưa có cuộc trò chuyện nào</p>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {chatHistory[customer.id].map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
                              msg.role === 'user'
                                ? 'bg-nature-green-100 text-nature-green-900'
                                : 'bg-white border border-gray-200 text-wood-700'
                            }`}>
                              <span className="font-medium text-[10px] opacity-60 block mb-0.5">
                                {msg.role === 'user' ? customer.name : 'AI Lan Tâm Đường'}
                              </span>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
