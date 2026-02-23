import { useState, useEffect } from 'react';

export default function CenterModeImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    {
      id: 1,
      src: "/images/2.png",
      alt: "Thuốc Nam gia truyền - Bài thuốc cổ phương",
      title: "Bài thuốc cổ phương",
      description: "Lưu truyền qua nhiều thế hệ"
    },
    {
      id: 2,
      src: "/images/3.png",
      alt: "Thuốc Nam gia truyền - Thảo dược tự nhiên",
      title: "Thảo dược tự nhiên",
      description: "Thu hái từ rừng nguyên sinh"
    },
    {
      id: 3,
      src: "/images/4.png",
      alt: "Thuốc Nam gia truyền - Chế biến thủ công",
      title: "Chế biến thủ công",
      description: "Tỉ mỉ, công phu"
    },
    {
      id: 4,
      src: "/images/5.png",
      alt: "Thuốc Nam gia truyền - Kế thừa tri thức",
      title: "Kế thừa tri thức",
      description: "Truyền dạy trực tiếp"
    }
  ];

  // Auto play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Calculate visible images
  const getVisibleImages = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    
    return [
      { ...images[prevIndex], position: 'left' },
      { ...images[currentIndex], position: 'center' },
      { ...images[nextIndex], position: 'right' }
    ];
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-beige-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-3 sm:p-4 border border-wood-200 hover:bg-nature-green-50 transition-all duration-200 cursor-pointer group shadow-lg"
            aria-label="Ảnh trước"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-wood-700 group-hover:text-nature-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-3 sm:p-4 border border-wood-200 hover:bg-nature-green-50 transition-all duration-200 cursor-pointer group shadow-lg"
            aria-label="Ảnh sau"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-wood-700 group-hover:text-nature-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Track - ĐÃ TĂNG KÍCH THƯỚC */}
          <div className="relative h-[550px] sm:h-[650px] md:h-[750px] lg:h-[850px] overflow-hidden">
            <div className="flex h-full items-center justify-center">
              {getVisibleImages().map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className={`absolute transition-all duration-500 ease-out ${
                    image.position === 'left' 
                      ? 'left-0 translate-x-[-65%] scale-90 opacity-60' 
                      : image.position === 'center' 
                      ? 'left-1/2 -translate-x-1/2 scale-100 opacity-100 z-10' 
                      : 'left-full translate-x-[-35%] scale-90 opacity-60'
                  }`}
                  style={{ 
                    width: '650px',  // TĂNG CHIỀU NGANG
                    height: '550px', // TĂNG CHIỀU DỌC
                    maxWidth: '95vw'
                  }}
                >
                  {/* Image Card */}
                  <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                    {/* Image */}
                    <div className="relative w-full h-full bg-gradient-to-br from-nature-green-100 to-earth-100">
                      {/* Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-20 h-20 text-nature-green-300 opacity-30" 
                             fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      {/* Actual Image - OBJECT-CONTAIN để toàn bộ ảnh hiển thị */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="absolute inset-0 w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          console.error(`Failed to load image: ${image.src}`);
                          e.target.style.display = 'none';
                        }}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 text-white text-sm sm:text-base font-bold">
                            0{image.id}
                          </span>
                          <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                            {image.title}
                          </h3>
                        </div>
                        <p className="text-nature-green-200 text-base sm:text-lg">
                          {image.description}
                        </p>
                      </div>
                      

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8 sm:mt-12">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? 'w-8 sm:w-10 bg-nature-green-600'
                    : 'w-2 sm:w-3 bg-wood-300 hover:bg-wood-400'
                }`}
                aria-label={`Chuyển đến ảnh ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="text-center mt-6">
            <p className="text-wood-600 font-medium">
              <span className="text-nature-green-600 font-bold text-xl">{currentIndex + 1}</span>
              <span className="mx-2">/</span>
              <span className="text-wood-700">{images.length}</span>
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="bg-white rounded-2xl shadow-lg border border-wood-100 p-6 sm:p-8 md:p-10">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-wood-900 mb-4">
                Hành Trình Thuốc Nam Lan Tâm Đường
              </h3>
              
              <div className="space-y-4 text-left">
                <p className="text-wood-700 text-sm sm:text-base leading-relaxed">
                  Mỗi bức ảnh trong bộ sưu tập này đều kể một câu chuyện riêng về hành trình của thuốc Nam gia truyền. 
                  Từ những cánh rừng nguyên sinh nơi thảo dược được thu hái theo mùa, qua bàn tay khéo léo và tâm huyết 
                  của những người thợ lành nghề, đến khi trở thành những bài thuốc quý được lưu truyền qua nhiều thế hệ.
                </p>
                
                <p className="text-wood-700 text-sm sm:text-base leading-relaxed">
                  <span className="font-bold text-nature-green-700">Lan Tâm Đường</span> không chỉ gìn giữ những bài thuốc cổ phương, 
                  mà còn bảo tồn cả quy trình, kinh nghiệm và tâm huyết đằng sau mỗi vị thuốc. Đây là di sản của dòng họ Đào, 
                  và cũng là tài sản quý giá của nền y học cổ truyền Việt Nam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}