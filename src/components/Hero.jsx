export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
      {/* Background - Bắc Kạn Landscape */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient - Núi rừng Bắc Kạn */}
        <div className="absolute inset-0 bg-gradient-to-br from-nature-green-50 via-nature-green-100/50 to-earth-100"></div>
        
        {/* Background image placeholder - sẽ thay bằng hình ảnh thực tế */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/KieuChinh.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            // maskImage: 'linear-gradient(to right, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.8) 100%)',
            // WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.8) 100%)'
          }}
        >
          {/* Fallback pattern nếu không có hình ảnh */}
          <div className="absolute inset-0 bg-gradient-to-b from-nature-green-200/20 via-transparent to-earth-200/20"></div>
        </div>
        
        {/* Decorative elements - Núi non */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 md:h-64">
          {/* Núi layer 1 - Xa */}
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,200 L0,120 Q150,100 300,120 T600,110 T900,125 T1200,115 L1200,200 Z" fill="url(#mountain1)" opacity="0.3"/>
            <defs>
              <linearGradient id="mountain1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8fcea8" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#5cb07d" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
          
          {/* Núi layer 2 - Gần hơn */}
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,200 L0,140 Q200,120 400,135 T800,130 T1200,140 L1200,200 Z" fill="url(#mountain2)" opacity="0.4"/>
            <defs>
              <linearGradient id="mountain2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5cb07d" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#3a8f5c" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Decorative elements - Lá cây, nông sản */}
        <div className="absolute top-20 right-10 sm:top-32 sm:right-20 w-32 h-32 sm:w-48 sm:h-48 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 20 Q30 30 25 50 Q20 70 30 80 Q40 90 50 85 Q60 90 70 80 Q80 70 75 50 Q70 30 50 20 Z" fill="#3a8f5c"/>
            <path d="M50 30 Q40 35 38 45 Q36 55 40 60 Q44 65 50 63 Q56 65 60 60 Q64 55 62 45 Q60 35 50 30 Z" fill="#5cb07d"/>
          </svg>
        </div>
        
        <div className="absolute bottom-32 left-8 sm:bottom-40 sm:left-16 w-24 h-24 sm:w-36 sm:h-36 opacity-8">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" fill="#b5854f" opacity="0.3"/>
            <circle cx="50" cy="50" r="20" fill="#c49f6f" opacity="0.4"/>
          </svg>
        </div>
        
        {/* Overlay để text dễ đọc - mờ bên trái, trong suốt bên phải */}
        <div className="absolute inset-0 bg-gradient-to-r from-beige-50/95 via-beige-50/70 via-beige-50/30 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-wood-900 mb-4 sm:mb-6 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-relaxed text-balance">
            Nguyễn Thị Kiều Chinh - Badgirl Hoàn lương
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-wood-700 mb-6 sm:mb-8 leading-relaxed text-balance">
            Điều trị bệnh lý xương khớp - Thoát vị đĩa đệm  Thoái hóa - Đau cổ vai gáy - Chèn ép thần kinh.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#products-grid"
              className="bg-nature-green-600 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-nature-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center cursor-pointer flex items-center justify-center"
            >
              Dịch Vụ Khám Tư Vấn Và Điều Trị
            </a>
            <a
              href="#brand-story"
              className="bg-white text-nature-green-600 border-2 border-nature-green-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-nature-green-50 transition-all duration-200 text-center cursor-pointer"
            >
              Giới Thiệu
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-8 sm:mt-12 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-wood-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-nature-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Kết hợp máy công nghệ</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-nature-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Nguồn gốc Bắc Kạn</span>
            </div> */}
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-nature-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Chất lượng cao</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
