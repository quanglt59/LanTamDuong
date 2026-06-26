import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout({ currentPage, onNavigate, children }) {
  const { currentUser, userProfile, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    {
      key: 'appointments',
      label: 'Tất cả đặt lịch',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      key: 'upcoming',
      label: 'Lịch hẹn sắp tới',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      key: 'customers',
      label: 'Khách hàng',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      key: 'chat',
      label: 'Lịch sử chat',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      key: 'messages',
      label: 'Nhắn tin nội bộ',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    ...(userProfile?.role === 'admin' ? [{
      key: 'users',
      label: 'Quản lý tài khoản',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    }] : []),
  ];

  const currentLabel = navItems.find((n) => n.key === currentPage)?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay tối phía sau sidebar khi mở trên mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-30 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo + nút đóng */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="min-w-0">
            <h1 className="font-serif font-bold text-wood-900 text-base leading-tight">LAN TÂM ĐƯỜNG</h1>
            <p className="text-xs text-wood-500 mt-0.5">Hệ thống quản trị</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-wood-400 hover:text-wood-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-2"
            title="Ẩn menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { onNavigate(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                currentPage === item.key
                  ? 'bg-nature-green-50 text-nature-green-700'
                  : 'text-wood-600 hover:bg-gray-50 hover:text-wood-900'
              }`}
            >
              <span className={`flex-shrink-0 ${currentPage === item.key ? 'text-nature-green-600' : 'text-wood-400'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-nature-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-nature-green-700 font-semibold text-sm">
                {currentUser?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-wood-900 truncate">{currentUser?.email}</p>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                userProfile?.role === 'admin'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {userProfile?.role === 'admin' ? 'Admin' : 'Manager'}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 min-w-0 transition-all duration-200 ease-in-out ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Thanh top bar — luôn hiển thị, có hamburger */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="w-9 h-9 flex items-center justify-center text-wood-500 hover:text-wood-900 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            title={sidebarOpen ? 'Ẩn menu' : 'Hiện menu'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-wood-800 truncate">{currentLabel}</span>
        </div>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
