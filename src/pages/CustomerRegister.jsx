import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const PROVINCES = [
  'An Giang','Bà Rịa - Vũng Tàu','Bắc Giang','Bắc Kạn','Bạc Liêu',
  'Bắc Ninh','Bến Tre','Bình Định','Bình Dương','Bình Phước','Bình Thuận',
  'Cà Mau','Cần Thơ','Cao Bằng','Đà Nẵng','Đắk Lắk','Đắk Nông',
  'Điện Biên','Đồng Nai','Đồng Tháp','Gia Lai','Hà Giang','Hà Nam',
  'Hà Nội','Hà Tĩnh','Hải Dương','Hải Phòng','Hậu Giang','Hòa Bình',
  'Hưng Yên','Khánh Hòa','Kiên Giang','Kon Tum','Lai Châu','Lâm Đồng',
  'Lạng Sơn','Lào Cai','Long An','Nam Định','Nghệ An','Ninh Bình',
  'Ninh Thuận','Phú Thọ','Phú Yên','Quảng Bình','Quảng Nam','Quảng Ngãi',
  'Quảng Ninh','Quảng Trị','Sóc Trăng','Sơn La','Tây Ninh','Thái Bình',
  'Thái Nguyên','Thanh Hóa','Thừa Thiên Huế','Tiền Giang','TP. Hồ Chí Minh',
  'Trà Vinh','Tuyên Quang','Vĩnh Long','Vĩnh Phúc','Yên Bái',
];

export default function CustomerRegister() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    gender: '',
    province: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Vui lòng nhập họ và tên.';
    if (!form.phone.trim()) return 'Vui lòng nhập số điện thoại.';
    if (!/^[0-9]{9,11}$/.test(form.phone.replace(/\s/g, ''))) return 'Số điện thoại không hợp lệ.';
    if (!form.province) return 'Vui lòng chọn tỉnh/thành phố.';
    if (!form.email.trim()) return 'Vui lòng nhập email.';
    if (!form.password) return 'Vui lòng nhập mật khẩu.';
    if (form.password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.';
    if (form.password !== form.confirmPassword) return 'Xác nhận mật khẩu không khớp.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setError('');
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(db, 'customers', cred.user.uid), {
        name: form.name.trim(),
        phone: form.phone.trim(),
        gender: form.gender,
        province: form.province,
        email: form.email.trim(),
        isLocked: false,
        createdAt: new Date().toISOString(),
      });
      window.location.href = '/';
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email không hợp lệ.');
      } else {
        setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-green-50 to-earth-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <h1 className="font-serif font-bold text-wood-900 text-2xl tracking-wide">LAN TÂM ĐƯỜNG</h1>
            <p className="text-wood-500 text-sm mt-1">Thuốc Nam gia truyền</p>
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-wood-900 mb-1">Đăng ký tài khoản</h2>
          <p className="text-wood-500 text-sm mb-6">Đăng ký để trò chuyện với AI tư vấn sức khỏe miễn phí</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1.5">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1.5">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="0901 234 567"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1.5">Giới tính</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 focus:border-transparent transition bg-white"
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1.5">
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <select
                name="province"
                value={form.province}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 focus:border-transparent transition bg-white"
              >
                <option value="">-- Chọn tỉnh/thành phố --</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1.5">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Tối thiểu 6 ký tự"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-wood-700 mb-1.5">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Nhập lại mật khẩu"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-nature-green-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-nature-green-600 text-white py-3 rounded-xl font-medium hover:bg-nature-green-700 transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-wood-500">
            Đã có tài khoản?{' '}
            <a href="/dang-nhap" className="text-nature-green-600 font-medium hover:underline">
              Đăng nhập
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
