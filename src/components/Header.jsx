import { useState } from 'react';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-beige-50/95 backdrop-blur-sm border-b border-wood-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4 md:grid md:grid-cols-3 md:py-4">
         {/* Phần 1: Logo và tagline - Chiếm 1/3, căn trái */}
<div className="flex flex-col items-start justify-center">
  <div className="flex flex-col items-start">
    <Logo className="h-10 w-auto sm:h-12 md:h-14 flex-shrink-0" />
    <p className="text-xs sm:text-sm text-wood-600 leading-tight italic mt-1.5 whitespace-nowrap">
      Tinh hoa thuốc Nam gia truyền dòng họ Đào
    </p>
  </div>
</div>
          
          {/* Phần 2: Navigation - Chiếm 1/3, căn giữa */}
          <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8">
            <a href="#brand-story" className="text-wood-700 hover:text-nature-green-600 focus:text-nature-green-600 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-offset-2 rounded transition-colors duration-200 font-medium cursor-pointer text-sm lg:text-base">
              Hành Trình
            </a>
            <a href="#benefits" className="text-wood-700 hover:text-nature-green-600 focus:text-nature-green-600 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-offset-2 rounded transition-colors duration-200 font-medium cursor-pointer text-sm lg:text-base">
              Giới Thiệu
            </a>
            <a href="#products-grid" className="text-wood-700 hover:text-nature-green-600 focus:text-nature-green-600 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-offset-2 rounded transition-colors duration-200 font-medium cursor-pointer text-sm lg:text-base">
              Dịch Vụ
            </a>
            <a href="#trust" className="text-wood-700 hover:text-nature-green-600 focus:text-nature-green-600 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-offset-2 rounded transition-colors duration-200 font-medium cursor-pointer text-sm lg:text-base">
              Chất lượng
            </a>
          </nav>
          
          {/* Phần 3: Địa chỉ và CTA - Chiếm 1/3, căn phải */}
          <div className="hidden md:flex flex-col items-end justify-center gap-1.5">
            {/* Địa chỉ - được căn chỉnh đẹp */}
            <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-wood-200">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-nature-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs text-wood-600 font-medium whitespace-nowrap">
                629 Quang Trung – Quyết Thắng – Thái Nguyên
              </p>
            </div>
            
            {/* Nút đặt lịch */}
            <a 
              href="#order"
              className="hotline-pulse inline-flex items-center gap-2 bg-gradient-to-r from-nature-green-600 to-nature-green-700 text-white px-4 py-2.5 rounded-full hover:from-nature-green-700 hover:to-nature-green-800 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-offset-2 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer group whitespace-nowrap"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-semibold">Đặt lịch khám ngay</span>
            </a>
          </div>

          {/* Mobile Menu Button - Hiển thị bên phải trên mobile */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-wood-700 hover:text-nature-green-600 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-offset-2 rounded transition-colors cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-wood-900/50 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />
            
            {/* Menu */}
            <nav className="absolute top-full left-0 right-0 bg-white border-b border-wood-200 shadow-xl z-50 md:hidden">
              <div className="flex flex-col py-4">
                {/* Header info trên mobile */}
<div className="flex flex-col items-start px-6 py-4 mb-2 border-b border-wood-100 bg-beige-50">
  <Logo className="h-12 w-auto mb-2" />
  <p className="text-xs text-wood-600 leading-tight italic">
    Tinh hoa thuốc Nam gia truyền dòng họ Đào
  </p>
</div>
                
                {/* Navigation Items */}
                <div className="px-4 space-y-1">
                  <a 
                    href="#brand-story" 
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-wood-700 hover:bg-nature-green-50 hover:text-nature-green-700 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-inset transition-colors duration-200 font-medium cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-nature-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Hành Trình</span>
                  </a>
                  <a 
                    href="#benefits" 
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-wood-700 hover:bg-nature-green-50 hover:text-nature-green-700 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-inset transition-colors duration-200 font-medium cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-nature-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Giới Thiệu</span>
                  </a>
                  <a 
                    href="#products-grid" 
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-wood-700 hover:bg-nature-green-50 hover:text-nature-green-700 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-inset transition-colors duration-200 font-medium cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-nature-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Dịch Vụ</span>
                  </a>
                  <a 
                    href="#trust" 
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-wood-700 hover:bg-nature-green-50 hover:text-nature-green-700 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-inset transition-colors duration-200 font-medium cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-nature-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Chất lượng</span>
                  </a>
                </div>
                
                {/* Địa chỉ và Hotline - Mobile */}
                <div className="mt-4 px-4">
                  <div className="bg-beige-50 rounded-xl p-4 mb-4 border border-wood-100">
                    <div className="flex items-start gap-2 mb-3">
                      <svg className="w-4 h-4 flex-shrink-0 text-nature-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-xs text-wood-600 font-medium">
                        <span className="font-semibold text-wood-700">Địa chỉ:</span> 629 Quang Trung – Quyết Thắng – Thái Nguyên
                      </p>
                    </div>
                    
                    <a 
                      href="#order"
                      onClick={closeMenu}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-nature-green-600 to-nature-green-700 text-white px-6 py-3.5 rounded-full hover:from-nature-green-700 hover:to-nature-green-800 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-offset-2 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-base">Đặt lịch khám ngay</span>
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}