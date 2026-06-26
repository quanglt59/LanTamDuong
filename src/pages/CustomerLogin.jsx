import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      // Kiểm tra admin/manager trước
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const profile = userDoc.data();
        if (profile.isLocked) {
          await auth.signOut();
          setError('Tài khoản đã bị khóa.');
          setLoading(false);
          return;
        }
        // Admin hoặc manager → vào dashboard
        window.location.href = '/admin';
        return;
      }

      // Kiểm tra khách hàng
      const customerDoc = await getDoc(doc(db, 'customers', uid));
      if (customerDoc.exists()) {
        if (customerDoc.data().isLocked) {
          await auth.signOut();
          setError('Tài khoản đã bị khóa. Vui lòng liên hệ Lan Tâm Đường.');
          setLoading(false);
          return;
        }
        // Khách hàng → trang chủ
        window.location.href = '/';
        return;
      }

      // Không thuộc tập nào
      await auth.signOut();
      setError('Tài khoản không tồn tại. Vui lòng đăng ký.');
      setLoading(false);
    } catch (err) {
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        setError('Email hoặc mật khẩu không đúng.');
      } else {
        setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-green-50 to-earth-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <h1 className="font-serif font-bold text-wood-900 text-2xl tracking-wide">LAN TÂM ĐƯỜNG</h1>
            <p className="text-wood-500 text-sm mt-1">Thuốc Nam gia truyền</p>
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-wood-900 mb-1">Đăng nhập</h2>
          <p className="text-wood-500 text-sm mb-6">Dành cho khách hàng, quản lý và admin</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1.5">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-nature-green-600 text-white py-3 rounded-xl font-medium hover:bg-nature-green-700 transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-wood-500">
            Chưa có tài khoản?{' '}
            <a href="/dang-ky" className="text-nature-green-600 font-medium hover:underline">
              Đăng ký ngay
            </a>
          </div>
          <div className="mt-3 text-center">
            <a href="/" className="text-sm text-wood-400 hover:text-wood-600">
              ← Quay về trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
