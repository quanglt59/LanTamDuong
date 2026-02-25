import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Cô Nguyễn Thị Lan",
    age: 58,
    location: "Thái Nguyên",
    avatar: "https://ui-avatars.com/api/?name=Nguyen+Thi+Lan&background=2a7148&color=fff&size=128",
    rating: 5,
    condition: "Thoái hóa khớp gối 5 năm",
    treatment: "Xoa bóp bấm huyệt + Thuốc nam",
    duration: "2 tháng",
    comment: "Tôi bị thoái hóa khớp gối nhiều năm, đi lại khó khăn. Sau 2 tháng điều trị bằng thuốc nam kết hợp bấm huyệt tại đây, giờ tôi đã đi lại nhẹ nhàng, leo cầu thang thoải mái. Cảm ơn các lương y!",
    date: "Tháng 2/2026"
  },
  {
    id: 2,
    name: "Anh Trần Văn Hùng",
    age: 45,
    location: "Bắc Kạn",
    avatar: "https://ui-avatars.com/api/?name=Tran+Van+Hung&background=a7703f&color=fff&size=128",
    rating: 5,
    condition: "Đau dạ dày, trào ngược",
    treatment: "Thuốc nam gia truyền",
    duration: "1.5 tháng",
    comment: "Tôi bị đau dạ dày hơn 3 năm, uống đủ loại thuốc Tây chỉ đỡ tạm thời. Từ ngày dùng thuốc nam của dòng họ Đào, bụng dạ êm ru, ăn uống thoải mái, không còn ợ chua nữa.",
    date: "Tháng 1/2026"
  },
  {
    id: 3,
    name: "Chị Lê Thị Hoa",
    age: 52,
    location: "Hà Nội",
    avatar: "https://ui-avatars.com/api/?name=Le+Thi+Hoa&background=3a8f5c&color=fff&size=128",
    rating: 5,
    condition: "Thoát vị đĩa đệm cột sống cổ",
    treatment: "Kéo giãn cột sống + Bấm huyệt + Thuốc nam",
    duration: "3 tháng",
    comment: "Trước đây tôi bị đau lan xuống tay, mất ngủ triền miên vì thoát vị đĩa đệm. Điều trị tại Lan Tâm Đường, các lương y tận tình, kết hợp nhiều phương pháp. Giờ tôi đã hết đau, ngủ ngon giấc.",
    date: "Tháng 12/2025"
  },
  {
    id: 4,
    name: "Ông Phạm Văn Đức",
    age: 65,
    location: "Quảng Ninh",
    avatar: "https://ui-avatars.com/api/?name=Pham+Van+Duc&background=b5854f&color=fff&size=128",
    rating: 5,
    condition: "Di chứng tai biến nhẹ",
    treatment: "Phục hồi chức năng + Thuốc nam",
    duration: "4 tháng",
    comment: "Sau tai biến, tôi bị yếu nửa người, đi lại khó khăn. Gia đình đưa tôi đến đây với hy vọng cuối. Giờ tôi đã tự đi lại được, sinh hoạt gần như bình thường. Công ơn không gì sánh bằng!",
    date: "Tháng 11/2025"
  },
  {
    id: 5,
    name: "Chị Nguyễn Thúy Hằng",
    age: 38,
    location: "Bắc Giang",
    avatar: "https://ui-avatars.com/api/?name=Nguyen+Thuy+Hang&background=c49f6f&color=fff&size=128",
    rating: 5,
    condition: "Rối loạn kinh nguyệt, vô sinh thứ phát",
    treatment: "Điều hòa nội tiết bằng thuốc nam",
    duration: "6 tháng",
    comment: "Tôi lấy chồng 5 năm không có con, đi khắp nơi đều vô vọng. Nghe tiếng thuốc nam dòng họ Đào, tôi đến điều trị. Sau 6 tháng, tôi có thai tự nhiên. Giờ con tôi đã 1 tuổi khỏe mạnh!",
    date: "Tháng 10/2025"
  },
  {
    id: 6,
    name: "Anh Hoàng Văn Nam",
    age: 42,
    location: "Lạng Sơn",
    avatar: "https://ui-avatars.com/api/?name=Hoang+Van+Nam&background=2a7148&color=fff&size=128",
    rating: 5,
    condition: "Gout mạn tính",
    treatment: "Thuốc nam + Chế độ ăn",
    duration: "3 tháng",
    comment: "Tôi bị gout 7 năm, ngón chân sưng đau, không đi lại được mỗi khi tái phát. Từ ngày uống thuốc nam ở đây, đã 8 tháng không bị tái phát, xét nghiệm acid uric về bình thường.",
    date: "Tháng 9/2025"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play carousel - chuyển slide mỗi 8 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-beige-50 via-white to-nature-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-wood-900 mb-3 sm:mb-4 uppercase">
            BỆNH NHÂN NÓI GÌ VỀ CHÚNG TÔI
          </h2>
          <p className="text-base sm:text-lg text-wood-600 max-w-2xl mx-auto">
            Những chia sẻ chân thực từ những người đã tìm lại được sức khỏe nhờ thuốc nam gia truyền dòng họ Đào
          </p>
          <div className="w-24 h-1 bg-nature-green-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Wrapper */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-nature-green-100 min-h-[450px] sm:min-h-[420px] md:min-h-[420px] lg:min-h-[400px]">
                    <div className="flex flex-col md:flex-row gap-6 items-start h-full">
                      {/* Avatar */}
                      <div className="flex-shrink-0 mx-auto md:mx-0">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-nature-green-200"
                          loading="lazy"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Quote Icon */}
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-nature-green-200 mb-3 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>

                        {/* Patient Info Badge */}
                        <div className="inline-flex items-center gap-2 bg-beige-100 px-3 py-1 rounded-full mb-3 text-xs sm:text-sm">
                          <span className="font-bold text-nature-green-700">{testimonial.age} tuổi</span>
                          <span className="text-wood-500">•</span>
                          <span className="text-wood-700">{testimonial.location}</span>
                        </div>

                        {/* Condition & Treatment */}
                        <div className="grid grid-cols-2 gap-2 mb-4 text-xs sm:text-sm bg-nature-green-50 rounded-lg p-3">
                          <div>
                            <span className="font-bold text-nature-green-800 block">Bệnh lý:</span>
                            <span className="text-wood-700">{testimonial.condition}</span>
                          </div>
                          <div>
                            <span className="font-bold text-nature-green-800 block">Điều trị:</span>
                            <span className="text-wood-700">{testimonial.treatment}</span>
                          </div>
                          <div className="col-span-2 mt-1">
                            <span className="font-bold text-nature-green-800">Thời gian:</span>
                            <span className="text-wood-700 ml-2">{testimonial.duration}</span>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex gap-1 mb-3 justify-center md:justify-start">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-earth-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* Comment */}
                        <p className="text-sm sm:text-base text-wood-700 leading-relaxed mb-4 italic break-words">
                          "{testimonial.comment}"
                        </p>

                        {/* Patient Info */}
                        <div className="border-t border-wood-100 pt-4">
                          <h4 className="text-lg sm:text-xl font-bold text-wood-900 mb-1 break-words">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-wood-500">
                            {testimonial.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white hover:bg-nature-green-50 text-nature-green-600 rounded-full p-2 sm:p-3 transition-all duration-200 cursor-pointer border-2 border-nature-green-200 z-10 shadow-md hover:shadow-lg"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white hover:bg-nature-green-50 text-nature-green-600 rounded-full p-2 sm:p-3 transition-all duration-200 cursor-pointer border-2 border-nature-green-200 z-10 shadow-md hover:shadow-lg"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? 'w-8 sm:w-10 h-2.5 sm:h-3 bg-nature-green-600 rounded-full'
                    : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-wood-300 rounded-full hover:bg-wood-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Success Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-white rounded-xl border-2 border-nature-green-100 hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-nature-green-700 mb-1">500+</div>
            <div className="text-xs sm:text-sm text-wood-600">Bệnh nhân khỏi bệnh</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border-2 border-nature-green-100 hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-nature-green-700 mb-1">15+</div>
            <div className="text-xs sm:text-sm text-wood-600">Năm kinh nghiệm</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border-2 border-nature-green-100 hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-nature-green-700 mb-1">95%</div>
            <div className="text-xs sm:text-sm text-wood-600">Bệnh nhân hài lòng</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border-2 border-nature-green-100 hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-nature-green-700 mb-1">5</div>
            <div className="text-xs sm:text-sm text-wood-600">Đời gia truyền</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-wood-700 text-sm sm:text-base mb-4">
            Bạn đang gặp vấn đề về sức khỏe? Hãy để chúng tôi đồng hành cùng bạn!
          </p>
          <a
            href="#order"
            className="inline-flex items-center gap-2 bg-nature-green-600 text-white px-6 py-3 rounded-full hover:bg-nature-green-700 transition-all duration-300 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>ĐẶT LỊCH TƯ VẤN MIỄN PHÍ</span>
          </a>
        </div>
      </div>
    </section>
  );
}