export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
      {/* Background - Bắc Kạn Landscape (giữ nguyên) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nature-green-50 via-nature-green-100/50 to-earth-100"></div>
        
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/bgr2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-nature-green-200/20 via-transparent to-earth-200/20"></div>
        </div>
        
        {/* Núi non */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 md:h-64">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,200 L0,120 Q150,100 300,120 T600,110 T900,125 T1200,115 L1200,200 Z" fill="url(#mountain1)" opacity="0.3"/>
            <defs>
              <linearGradient id="mountain1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8fcea8" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#5cb07d" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
          
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
        
        {/* Lá cây, nông sản */}
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
        
        {/* Overlay để text dễ đọc */}
        <div className="absolute inset-0 bg-gradient-to-r from-beige-50/95 via-beige-50/70 via-beige-50/30 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Heading - TĂNG KHOẢNG CÁCH DƯỚI */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-wood-900 mb-6 sm:mb-8 md:mb-10 leading-tight text-balance animate-fade-in-up">
            Sức khỏe là vốn quý
          </h1>
          
          {/* Quote - TĂNG KHOẢNG CÁCH GIỮA CÁC DÒNG VÀ KHOẢNG CÁCH DƯỚI */}
          <div className="relative mb-8 sm:mb-10 md:mb-12 animate-fade-in-up animation-delay-200">
            <span className="absolute -left-4 -top-2 text-6xl text-nature-green-200 opacity-30 select-none font-serif italic">"</span>
            <p className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic font-bold text-nature-green-800 leading-relaxed pl-4 sm:pl-6 border-l-4 border-nature-green-600 bg-gradient-to-r from-nature-green-50/30 to-transparent py-3 sm:py-4 mb-2">
              Kiến tạo Thân khỏe 
            </p>
            <p className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic font-bold text-nature-green-800 leading-relaxed pl-4 sm:pl-6 border-l-4 border-nature-green-600 bg-gradient-to-r from-nature-green-50/30 to-transparent py-3 sm:py-4">
              Tâm an – Trí minh. 
            </p>
            <span className="absolute -right-4 -bottom-2 text-6xl text-nature-green-200 opacity-30 select-none font-serif italic">"</span>
          </div>
          
          {/* CTA Buttons - TĂNG KHOẢNG CÁCH DƯỚI */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-8 sm:mb-10 animate-fade-in-up animation-delay-400">
            <a
              href="#products-grid"
              className="group bg-nature-green-600 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-nature-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center flex items-center justify-center"
            >
              <span>Dịch Vụ Khám Tư Vấn Và Điều Trị</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#brand-story"
              className="bg-white text-nature-green-600 border-2 border-nature-green-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-nature-green-50 transition-all duration-200 text-center"
            >
              Giới Thiệu
            </a>
          </div>

          {/* Dòng slogan - TĂNG KHOẢNG CÁCH TRÊN VÀ GIỮA CÁC PHẦN TỬ */}
          <div className="relative group mt-6 sm:mt-8 pt-4 border-t-2 border-nature-green-200/30 animate-slide-in-bottom animation-delay-600">
            {/* Hiệu ứng glow phía sau */}
            <div className="absolute -inset-2 bg-gradient-to-r from-nature-green-300/10 via-nature-green-400/20 to-nature-green-300/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Nội dung chính - TĂNG KHOẢNG CÁCH GIỮA CÁC ICON VÀ CHỮ */}
            <div className="relative flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base md:text-lg">
              {/* Icon nhảy */}
              <svg className="w-5 h-5 text-nature-green-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              
              {/* Chữ "CHỦ ĐỘNG" */}
              <span className="relative group/word1">
                <span className="absolute -inset-1 bg-nature-green-500/10 rounded-lg blur-sm scale-90 group-hover:scale-100 transition-transform duration-500"></span>
                <span className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-nature-green-700 via-nature-green-500 to-nature-green-700 animate-gradient-x bg-[length:200%_auto]">
                  CHỦ ĐỘNG
                </span>
              </span>
              
              {/* Chữ thường */}
              <span className="text-nature-green-600 font-semibold animate-pulse-slow">
                sức khỏe hôm nay,
              </span>
              
              {/* Dấu cách xoay */}
              <span className="w-2 h-2 bg-nature-green-400 rounded-full animate-spin-slow"></span>
              
              {/* Chữ "THỊNH VƯỢNG" */}
              <span className="relative group/word2">
                <span className="absolute -inset-1 bg-earth-500/10 rounded-lg blur-sm scale-90 group-hover:scale-100 transition-transform duration-500 delay-150"></span>
                <span className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-earth-700 via-earth-500 to-earth-700 animate-gradient-x animation-delay-500 bg-[length:200%_auto]">
                  THỊNH VƯỢNG
                </span>
              </span>
              
              {/* Chữ thường */}
              <span className="text-earth-600 font-semibold animate-pulse-slow animation-delay-300">
                cuộc sống ngày mai
              </span>
              
              {/* Icon mũi tên */}
              <svg className="w-5 h-5 text-nature-green-400 animate-slide-left" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            {/* Gạch chân động */}
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-nature-green-500 to-earth-500 group-hover:w-full transition-all duration-700"></div>
            
            {/* Hiệu ứng sóng */}
            <div className="absolute -bottom-3 left-0 w-full h-4 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-nature-green-300/30 to-transparent animate-wave"></div>
            </div>
          </div>

          {/* Hạt sáng bay lơ lửng */}
          <div className="absolute -right-20 top-1/2 w-40 h-40 pointer-events-none">
            <div className="absolute w-2 h-2 bg-nature-green-300/30 rounded-full animate-float" style={{ top: '10%', left: '20%' }}></div>
            <div className="absolute w-3 h-3 bg-earth-300/30 rounded-full animate-float animation-delay-200" style={{ top: '30%', left: '60%' }}></div>
            <div className="absolute w-1.5 h-1.5 bg-nature-green-400/30 rounded-full animate-float animation-delay-400" style={{ top: '70%', left: '40%' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}