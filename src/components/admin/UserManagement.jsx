import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, updateDoc, query, where } from 'firebase/firestore';
import { secondaryAuth, db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

export default function UserManagement() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [newUser, setNewUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'users'), where('role', '==', 'manager'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const showMessage = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateError('');
    if (newUser.password !== newUser.confirmPassword) {
      setCreateError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (newUser.password.length < 6) {
      setCreateError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    setCreating(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        secondaryAuth,
        newUser.email,
        newUser.password
      );
      await setDoc(doc(db, 'users', credential.user.uid), {
        email: newUser.email,
        role: 'manager',
        isLocked: false,
        createdAt: new Date().toISOString(),
        createdBy: currentUser.email,
      });
      await secondaryAuth.signOut();
      setNewUser({ email: '', password: '', confirmPassword: '' });
      setShowCreateModal(false);
      showMessage('Tạo tài khoản Manager thành công!');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setCreateError('Email này đã được sử dụng');
      } else {
        setCreateError('Có lỗi xảy ra, vui lòng thử lại');
      }
    } finally {
      setCreating(false);
    }
  };

  const handleToggleLock = async (user) => {
    const newLocked = !user.isLocked;
    await updateDoc(doc(db, 'users', user.id), { isLocked: newLocked });
    showMessage(newLocked ? `Đã khóa tài khoản ${user.email}` : `Đã mở khóa tài khoản ${user.email}`);
  };

  const handleResetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(secondaryAuth, email);
      showMessage(`Đã gửi email đặt lại mật khẩu tới ${email}`);
    } catch {
      showMessage('Có lỗi khi gửi email. Vui lòng thử lại.');
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('vi-VN');
  };

  const activeCount = users.filter((u) => !u.isLocked).length;
  const lockedCount = users.filter((u) => u.isLocked).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-wood-900">Quản lý tài khoản</h2>
          <p className="text-wood-500 text-sm mt-1">Tạo và quản lý tài khoản Manager</p>
        </div>
        <button
          onClick={() => { setShowCreateModal(true); setCreateError(''); }}
          className="flex items-center gap-2 bg-nature-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-nature-green-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tạo tài khoản Manager
        </button>
      </div>

      {/* Action message */}
      {actionMsg && (
        <div className="mb-4 bg-nature-green-50 border border-nature-green-200 text-nature-green-800 px-4 py-3 rounded-lg text-sm">
          {actionMsg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-wood-500">Tổng Manager</p>
          <p className="text-3xl font-bold text-wood-900 mt-1">{users.length}</p>
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <svg className="animate-spin h-6 w-6 text-nature-green-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-wood-400">Chưa có tài khoản Manager nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">STT</th>
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">Trạng thái</th>
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">Ngày tạo</th>
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">Tạo bởi</th>
                  <th className="text-left px-4 py-3 text-wood-500 font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 text-wood-400">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-wood-900">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.isLocked
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.isLocked ? 'bg-red-500' : 'bg-green-500'}`} />
                        {user.isLocked ? 'Bị khóa' : 'Hoạt động'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-wood-600">{formatDate(user.createdAt)}</td>
                    <td className="px-4 py-3 text-wood-500 text-xs">{user.createdBy || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleResetPassword(user.email)}
                          className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-wood-700 transition-colors"
                          title="Gửi email đặt lại mật khẩu"
                        >
                          Đặt lại MK
                        </button>
                        <button
                          onClick={() => handleToggleLock(user)}
                          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                            user.isLocked
                              ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                              : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                          }`}
                        >
                          {user.isLocked ? 'Mở khóa' : 'Khóa'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-wood-900">Tạo tài khoản Manager</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-wood-400 hover:text-wood-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="manager@lantamduong.vn"
                  className="w-full px-4 py-2.5 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-1.5">Mật khẩu</label>
                <input
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full px-4 py-2.5 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-1.5">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  required
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full px-4 py-2.5 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 outline-none text-sm"
                />
              </div>

              {createError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {createError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-wood-700 hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 py-2.5 bg-nature-green-600 text-white rounded-lg text-sm font-medium hover:bg-nature-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {creating ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Đang tạo...
                    </>
                  ) : 'Tạo tài khoản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
