import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      setCustomers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const showMessage = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3000);
  };

  const handleToggleLock = async (customer) => {
    const newLocked = !customer.isLocked;
    await updateDoc(doc(db, 'customers', customer.id), { isLocked: newLocked });
    showMessage(newLocked ? `Đã khóa: ${customer.email}` : `Đã mở khóa: ${customer.email}`);
  };

  const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString('vi-VN') : '—';

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.phone?.includes(q);
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
        <p className="text-wood-500 text-sm mt-1">Quản lý tài khoản đăng ký qua hệ thống chat AI</p>
      </div>

      {actionMsg && (
        <div className="mb-4 bg-nature-green-50 border border-nature-green-200 text-nature-green-800 px-4 py-3 rounded-lg text-sm">
          {actionMsg}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-wood-500">Tổng tài khoản</p>
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

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <svg className="w-5 h-5 text-wood-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm theo tên, email, số điện thoại..."
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
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-wood-400 uppercase tracking-wide">
                <th className="px-4 py-3 font-medium">Khách hàng</th>
                <th className="px-4 py-3 font-medium">Liên hệ</th>
                <th className="px-4 py-3 font-medium">Tỉnh/TP</th>
                <th className="px-4 py-3 font-medium">Ngày đăng ký</th>
                <th className="px-4 py-3 font-medium">Trạng thái</th>
                <th className="px-4 py-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-nature-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-nature-green-700 font-semibold text-xs">
                          {customer.name?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-wood-900">{customer.name || '—'}</p>
                        <p className="text-wood-400 text-xs">{customer.gender || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-wood-600">
                    <p>{customer.phone || '—'}</p>
                    <p className="text-xs text-wood-400">{customer.email}</p>
                  </td>
                  <td className="px-4 py-3 text-wood-600">{customer.province || '—'}</td>
                  <td className="px-4 py-3 text-wood-500 text-xs">{formatDate(customer.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      customer.isLocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {customer.isLocked ? 'Bị khóa' : 'Hoạt động'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
