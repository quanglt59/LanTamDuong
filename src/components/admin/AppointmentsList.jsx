import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

const FIELDS = [
  { key: 'fullName', label: 'Họ tên' },
  { key: 'phone', label: 'Số điện thoại' },
  { key: 'email', label: 'Email' },
  { key: 'fullAddress', label: 'Địa chỉ đầy đủ' },
  { key: 'healthIssue', label: 'Vấn đề sức khỏe' },
  { key: 'healthIssueOther', label: 'Vấn đề chi tiết' },
  { key: 'appointmentDate', label: 'Ngày hẹn', type: 'date' },
  { key: 'appointmentTime', label: 'Giờ hẹn', type: 'time' },
  { key: 'products', label: 'Sản phẩm', multiline: true },
  { key: 'notes', label: 'Ghi chú', multiline: true },
];

export default function AppointmentsList() {
  const { userProfile } = useAuth();
  const isAdmin = userProfile?.role === 'admin';
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAppointments(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const showMessage = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3000);
  };

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price || 0);
  const formatDate = (iso) => iso ? new Date(iso).toLocaleString('vi-VN') : '—';

  const filtered = appointments.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.fullName?.toLowerCase().includes(q) ||
      a.phone?.includes(q) ||
      a.email?.toLowerCase().includes(q) ||
      a.fullAddress?.toLowerCase().includes(q) ||
      a.healthIssue?.toLowerCase().includes(q)
    );
  });

  const todayCount = appointments.filter((a) => {
    if (!a.createdAt) return false;
    return new Date(a.createdAt).toDateString() === new Date().toDateString();
  }).length;

  const openEdit = (item) => {
    setEditItem(item);
    setEditData({
      fullName: item.fullName || '',
      phone: item.phone || '',
      email: item.email || '',
      fullAddress: item.fullAddress || '',
      healthIssue: item.healthIssue || '',
      healthIssueOther: item.healthIssueOther || '',
      appointmentDate: item.appointmentDate || '',
      appointmentTime: item.appointmentTime || '',
      products: item.products || '',
      notes: item.notes || '',
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, 'appointments', editItem.id), editData);
      setEditItem(null);
      showMessage('Cập nhật thông tin thành công!');
    } catch {
      showMessage('Có lỗi khi lưu. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'appointments', deleteItem.id));
      setDeleteItem(null);
      showMessage(`Đã xóa lịch hẹn của ${deleteItem.fullName}`);
    } catch {
      showMessage('Có lỗi khi xóa. Vui lòng thử lại.');
    } finally {
      setDeleting(false);
    }
  };

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
        <h2 className="text-2xl font-bold text-wood-900">Danh sách đặt lịch</h2>
        <p className="text-wood-500 text-sm mt-1">Dữ liệu cập nhật theo thời gian thực</p>
      </div>

      {actionMsg && (
        <div className="mb-4 bg-nature-green-50 border border-nature-green-200 text-nature-green-800 px-4 py-3 rounded-lg text-sm">
          {actionMsg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-wood-500">Tổng lịch hẹn</p>
          <p className="text-3xl font-bold text-wood-900 mt-1">{appointments.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-wood-500">Đáng chú ý</p>
          <p className="text-3xl font-bold text-nature-green-600 mt-1">{todayCount}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 mb-4">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <svg className="w-5 h-5 text-wood-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm theo tên, SĐT, email, địa chỉ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-wood-800 placeholder-wood-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-wood-400 hover:text-wood-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-wood-400">
            {search ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có lịch hẹn nào'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">STT</th>
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">Thời gian</th>
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">Họ tên</th>
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">SĐT</th>
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">Vấn đề SK</th>
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <>
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-wood-400">{filtered.length - index}</td>
                      <td className="px-4 py-3 text-wood-600 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                      <td className="px-4 py-3 font-medium text-wood-900">{item.fullName || '—'}</td>
                      <td className="px-4 py-3 text-wood-700">{item.phone || '—'}</td>
                      <td className="px-4 py-3 text-wood-600 max-w-[180px] truncate">{item.healthIssue || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                            className="text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg text-wood-600 hover:bg-gray-50 transition-colors"
                          >
                            {expandedId === item.id ? 'Thu gọn' : 'Xem'}
                          </button>
                          <button
                            onClick={() => openEdit(item)}
                            className="text-xs px-2.5 py-1.5 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            Sửa
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => setDeleteItem(item)}
                              className="text-xs px-2.5 py-1.5 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Xóa
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedId === item.id && (
                      <tr key={`${item.id}-detail`} className="bg-nature-green-50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><p className="text-wood-500 mb-0.5">Email</p><p className="text-wood-900">{item.email || '—'}</p></div>
                            <div><p className="text-wood-500 mb-0.5">Địa chỉ đầy đủ</p><p className="text-wood-900">{item.fullAddress || '—'}</p></div>
                            <div><p className="text-wood-500 mb-0.5">Ngày hẹn</p><p className="text-wood-900">{item.appointmentDate || '—'} {item.appointmentTime || ''}</p></div>
                            <div><p className="text-wood-500 mb-0.5">Vấn đề chi tiết</p><p className="text-wood-900">{item.healthIssueOther || '—'}</p></div>
                            <div><p className="text-wood-500 mb-0.5">Ghi chú</p><p className="text-wood-900">{item.notes || '—'}</p></div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-wood-900">Sửa thông tin khách hàng</h3>
              <button onClick={() => setEditItem(null)} className="text-wood-400 hover:text-wood-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-4">
              {FIELDS.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-wood-700 mb-1.5">{field.label}</label>
                  {field.multiline ? (
                    <textarea
                      rows={3}
                      value={editData[field.key]}
                      onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                      className="w-full px-4 py-2.5 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 outline-none text-sm resize-none"
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={editData[field.key]}
                      onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                      className="w-full px-4 py-2.5 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 outline-none text-sm"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => setEditItem(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-wood-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 bg-nature-green-600 text-white rounded-lg text-sm font-medium hover:bg-nature-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Đang lưu...
                  </>
                ) : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-wood-900">Xác nhận xóa</h3>
                <p className="text-sm text-wood-500 mt-0.5">Hành động này không thể hoàn tác</p>
              </div>
            </div>
            <p className="text-sm text-wood-700 mb-5 bg-red-50 rounded-lg p-3">
              Bạn có chắc muốn xóa lịch hẹn của <strong>{deleteItem.fullName}</strong> ({deleteItem.phone})?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteItem(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-wood-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Đang xóa...
                  </>
                ) : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
