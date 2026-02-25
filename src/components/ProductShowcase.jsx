import { useState, useEffect } from 'react';

export default function CenterModeImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    {
      id: 1,
      src: "/images/bk1.jpg",
      title: "Ban Giám Khảo cuộc thi ",
      description: "ASIAN BEAUTY INDUSTRY CHAMPIONSHIP & PMU "
    },
    {
      id: 2,
      src: "/images/bk2.jpg",
      title: "Y sĩ y học cổ truyền",
      description: "Trường trung cấp y tế Thái Nguyên"
    },
    {
      id: 3,
      src: "/images/bk3.jpg",
      title: "Tốt nghiệp lớp bồi dưỡng chuyên sâu",
      description: "Hội đông y tỉnh Thái Nguyên"
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
                    width: '450px',  // TĂNG CHIỀU NGANG
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
                Hành Trình về người sáng lập 
              </h3>
              
              <div className="space-y-4 text-left">
                <p className="text-wood-700 text-sm sm:text-base leading-relaxed">
                  <span className="font-bold text-nature-green-700">Tôi là Đào Thị Lan</span>, sinh ra và lớn lên tại Định Hóa, Thái Nguyên – trong một gia đình có truyền thống làm thuốc Nam gia truyền.
                </p>
                <p>Tuổi thơ của tôi gắn liền với những vườn thảo dược, những bài thuốc cổ và lời dạy về chữ Tâm của người làm nghề. Với tôi, Đông y không chỉ là phương pháp chữa bệnh, mà là trách nhiệm gìn giữ sức khỏe cho từng gia đình.</p>
                <p>Nhưng chỉ đến khi chính gia đình mình trải qua thử thách, tôi mới thấu hiểu trọn vẹn ý nghĩa của điều đó. Sau khi xây dựng xong ngôi nhà mơ ước, chồng tôi bất ngờ đổ bệnh. Khoảng thời gian ấy khiến tôi nhận ra rằng:
                </p>
                <p>Sức khỏe mới chính là nền móng thật sự của hạnh phúc.</p>
                <p>May mắn thay, nhờ sự kiên trì điều dưỡng, chăm sóc và kết hợp thuốc Nam gia truyền, sức khỏe của anh dần hồi phục và ổn định. Khoảnh khắc nhìn người mình yêu thương khỏe mạnh trở lại, tôi càng tin sâu sắc vào giá trị của những gì gia đình mình đang gìn giữ.</p>
                <p>Từ đó, truyền thống không còn chỉ là sự kế thừa – mà trở thành niềm tin và sứ mệnh sống.</p>
                <p>Tôi hiểu rằng, nếu sức khỏe được giữ vững, mỗi mái ấm sẽ vững vàng. Và tôi mong mình có thể trở thành một “bước chạm nhỏ”, đồng hành cùng nhiều gia đình ngoài kia – để họ cũng giữ được bình an và hạnh phúc như gia đình tôi hôm nay. 💚</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}