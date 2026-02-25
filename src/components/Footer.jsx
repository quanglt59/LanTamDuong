import { useState } from 'react';
import Logo from './Logo';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle email submission
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-wood-900 via-wood-800 to-wood-900 text-beige-100 py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Cột 1: Logo + Slogan + Description */}
          <div className="flex flex-col items-start -mt-2 sm:-mt-4">
            <img 
              src="/images/logoltd2.png" 
              alt="Vị Bắc Kạn - Quà Nông Sản Sạch" 
              className="h-10 w-auto sm:h-12 sm:w-auto md:h-14 md:w-auto mb-4 object-contain -ml-2.5 sm:-ml-3.5"
            />
            
            <p className="text-sm sm:text-base text-beige-200 mb-4 leading-relaxed italic">
              Cơ sở số 1 về chăm sóc sức khỏe, Đông y kết hợp máy công nghệ cao.
            </p>
            
            <p className="text-xs sm:text-sm text-beige-300 mb-3 leading-relaxed">
              “Không gian chăm sóc thân – tâm chuyên nghiệp, ứng dụng đa phương pháp dưỡng sinh, hỗ trợ cơ thể tái lập trạng thái cân bằng tự nhiên một cách an toàn.”
            </p>
            
            <p className="text-base sm:text-lg font-bold text-beige-50 whitespace-nowrap">
              Đơn vị chăm sóc sức khỏe uy tín số 1 thái Nguyên 
            </p>
          </div>
          
          {/* Cột 2: Thông tin liên hệ + Social */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-beige-50">Thông tin liên hệ</h3>
            
            <ul className="space-y-3 text-sm sm:text-base text-beige-200">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-beige-50 whitespace-nowrap">Hotline:</span>
                <a href="tel:0855155696" className="hover:text-beige-50 transition-colors whitespace-nowrap">0356&nbsp;859&nbsp;566</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-beige-50 whitespace-nowrap">Email:</span>
                <a href="mailto:aocuoilailan@gmail.com" className="break-all hover:text-beige-50 transition-colors text-xs sm:text-sm">lantamduong2025@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-beige-50 whitespace-nowrap">Website:</span>
                <a href="https://lantamduong.id.vn/" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap hover:text-beige-50 transition-colors cursor-pointer">lantamduong.id.vn</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-beige-50 whitespace-nowrap">Địa&nbsp;chỉ:</span>
                <a href="https://www.google.com/maps?q=N%C3%B4ng+S%E1%BA%A3n+S%E1%BA%A1ch+B%E1%BA%AFc+K%E1%BA%A1n,+Li%E1%BB%81n+k%E1%BB%81+140,+D%E1%BB%8Bch+v%E1%BB%A5+04+-+%C4%90%C3%ACa+L%C3%A3o,+Ki%E1%BA%BFn+H%C6%B0ng,+H%C3%A0+N%E1%BB%99i,+12100&ftid=0x3135adb15595b195:0x16e7a593dd21a66b&entry=gps" target="_blank" rel="noopener noreferrer" className="hover:text-beige-50 transition-colors cursor-pointer">629 Đường Quang Trung&nbsp;,Phường Thịnh Đán&nbsp;,Tỉnh Thái Nguyên</a>
              </li>
            </ul>

            {/* Social Icons */}
            {/* <div className="flex gap-3 mt-6">
              <a href="https://www.facebook.com/profile.php?id=61583588802212" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors cursor-pointer" aria-label="Facebook Messenger">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://zalo.me/2504463575208864830" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors cursor-pointer p-1.5" aria-label="Zalo">
                <svg className="w-full h-full" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.782 0.166016H27.199C33.2653 0.166016 36.8103 1.05701 39.9572 2.74421C43.1041 4.4314 45.5875 6.89585 47.2557 10.0428C48.9429 13.1897 49.8339 16.7347 49.8339 22.801V27.1991C49.8339 33.2654 48.9429 36.8104 47.2557 39.9573C45.5685 43.1042 43.1041 45.5877 39.9572 47.2559C36.8103 48.9431 33.2653 49.8341 27.199 49.8341H22.8009C16.7346 49.8341 13.1896 48.9431 10.0427 47.2559C6.89583 45.5687 4.41243 43.1042 2.7442 39.9573C1.057 36.8104 0.166016 33.2654 0.166016 27.1991V22.801C0.166016 16.7347 1.057 13.1897 2.7442 10.0428C4.43139 6.89585 6.89583 4.41245 10.0427 2.74421C13.1707 1.05701 16.7346 0.166016 22.782 0.166016Z" fill="white"/>
                  <path d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1801 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z" fill="#0068FF"/>
                  <path d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z" fill="#0068FF"/>
                  <path d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z" fill="#0068FF"/>
                  <path d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z" fill="#0068FF"/>
                  <path d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z" fill="#0068FF"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center transition-colors cursor-pointer" aria-label="TikTok">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-beige-200 hover:bg-beige-300 flex items-center justify-center transition-colors cursor-pointer" aria-label="Email">
                <svg className="w-5 h-5 text-wood-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href="tel:0855155696" className="w-10 h-10 rounded-full bg-nature-green-600 hover:bg-nature-green-700 flex items-center justify-center transition-colors cursor-pointer" aria-label="Phone">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div> */}
          </div>
          
          {/* Cột 3: Đăng ký tư vấn */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-beige-50">Đăng ký tư vấn</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email"
                className="w-full px-4 py-3 rounded-lg bg-beige-50 text-wood-900 placeholder-wood-500 focus:outline-none focus:ring-2 focus:ring-earth-500 transition-all text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="w-full bg-earth-600 hover:bg-earth-700 text-white font-bold py-3 rounded-lg cursor-pointer text-sm sm:text-base register-pulse"
              >
                ĐĂNG KÝ
              </button>
            </form>
          </div>
          
          {/* Cột 4: Theo dõi Fanpage */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-beige-50">Theo dõi Fanpage</h3>
            
            {/* Facebook Page */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/images/fanpageltd.jpg" 
                alt="Vị Bắc Kạn Facebook Fanpage" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-wood-700 pt-6 sm:pt-8 mt-8 sm:mt-10 text-center text-xs sm:text-sm text-beige-300">
          <p>&copy; {new Date().getFullYear()} Lan Tâm Đường - Tinh hoa trị liệu cổ truyền. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
