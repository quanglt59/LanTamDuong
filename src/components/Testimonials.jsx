import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Chị Minh Anh",
    role: "Giám đốc công ty",
    location: "Hà Nội",
    avatar: "https://ui-avatars.com/api/?name=Minh+Anh&background=2a7148&color=fff&size=128",
    rating: 5,
    comment: "Giỏ quà từ Vị Bắc Kạn thật sự khác biệt! Sản phẩm sạch, đóng gói đẹp, và có câu chuyện đằng sau mỗi món. Đối tác và nhân viên đều rất hài lòng khi nhận quà Tết từ công ty.",
    date: "Tết Nguyên Đán 2025"
  },
  {
    id: 2,
    name: "Anh Tuấn Hùng",
    role: "Khách hàng cá nhân",
    location: "TP. Hồ Chí Minh",
    avatar: "https://ui-avatars.com/api/?name=Tuan+Hung&background=a7703f&color=fff&size=128",
    rating: 5,
    comment: "Lần đầu tặng quà nông sản cho bố mẹ vợ mà được khen ngợi như vậy. Mật ong rừng và thịt gác bếp chất lượng quá, giá cả hợp lý. Chắc chắn sẽ đặt lại!",
    date: "Tháng 12/2024"
  },
  {
    id: 3,
    name: "Chị Thu Hằng",
    role: "Chủ doanh nghiệp",
    location: "Đà Nẵng",
    avatar: "https://ui-avatars.com/api/?name=Thu+Hang&background=3a8f5c&color=fff&size=128",
    rating: 5,
    comment: "Tôi đã tặng combo 'An Khang Thịnh Vượng' cho các đối tác quan trọng. Ai cũng hỏi mua ở đâu và khen ngợi sự tinh tế trong cách chọn sản phẩm và đóng gói.",
    date: "Tết 2024"
  },
  {
    id: 4,
    name: "Anh Đức Minh",
    role: "Nhân viên văn phòng",
    location: "Hà Nội",
    avatar: "https://ui-avatars.com/api/?name=Duc+Minh&background=b5854f&color=fff&size=128",
    rating: 5,
    comment: "Tự chọn giỏ quà theo ý mình thật tuyệt! Tôi chọn được những món mẹ thích, ship nhanh, đóng gói cẩn thận. Dịch vụ tư vấn nhiệt tình, giải đáp mọi thắc mắc.",
    date: "Tháng 1/2025"
  },
  {
    id: 5,
    name: "Chị Lan Phương",
    role: "Giáo viên",
    location: "Bắc Giang",
    avatar: "https://ui-avatars.com/api/?name=Lan+Phuong&background=c49f6f&color=fff&size=128",
    rating: 5,
    comment: "Mình rất thích concept 'quà tặng từ núi rừng Bắc Kạn'. Sản phẩm đều có nguồn gốc rõ ràng, mỗi món đều có thẻ kể câu chuyện. Tặng quà mà yên tâm về chất lượng!",
    date: "Tháng 11/2024"
  },
  {
    id: 6,
    name: "Anh Hoàng Nam",
    role: "Chủ nhà hàng",
    location: "Hải Phòng",
    avatar: "https://ui-avatars.com/api/?name=Hoang+Nam&background=2a7148&color=fff&size=128",
    rating: 5,
    comment: "Tôi đặt miến dong và măng khô rừng để dùng cho nhà hàng. Chất lượng tuyệt vời, giá cả phải chăng. Đặc biệt là team support rất chuyên nghiệp và nhiệt tình!",
    date: "Tháng 12/2024"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play carousel - chuyển slide mỗi 8 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // 8000ms = 8 giây

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
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <p className="text-base sm:text-lg text-wood-600 max-w-2xl mx-auto">
            Niềm tin và sự hài lòng của khách hàng là động lực lớn nhất để chúng tôi không ngừng hoàn thiện
          </p>
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
                  <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-nature-green-100 min-h-[400px] sm:min-h-[380px] md:min-h-[380px] lg:min-h-[360px]">
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
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-nature-green-200 mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>

                        {/* Rating */}
                        <div className="flex flex-wrap gap-1 mb-3 justify-center md:justify-start">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-earth-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* Comment */}
                        <p className="text-base sm:text-lg text-wood-700 leading-relaxed mb-4 italic break-words">
                          "{testimonial.comment}"
                        </p>

                        {/* Customer Info */}
                        <div className="border-t border-wood-100 pt-4">
                          <h4 className="text-lg sm:text-xl font-bold text-wood-900 mb-1 break-words">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm sm:text-base text-wood-600 break-words">
                            {testimonial.role} • {testimonial.location}
                          </p>
                          <p className="text-xs sm:text-sm text-wood-500 mt-1">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white hover:bg-nature-green-50 text-nature-green-600 rounded-full p-2 sm:p-3 transition-all duration-200 cursor-pointer border-2 border-nature-green-200 z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white hover:bg-nature-green-50 text-nature-green-600 rounded-full p-2 sm:p-3 transition-all duration-200 cursor-pointer border-2 border-nature-green-200 z-10"
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

        {/* Trust Badges */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-white rounded-xl border border-wood-100">
            <div className="text-2xl sm:text-3xl font-bold text-nature-green-600 mb-1">500+</div>
            <div className="text-xs sm:text-sm text-wood-600">Khách hàng hài lòng</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-wood-100">
            <div className="text-2xl sm:text-3xl font-bold text-nature-green-600 mb-1">4.9/5</div>
            <div className="text-xs sm:text-sm text-wood-600">Đánh giá trung bình</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-wood-100">
            <div className="text-2xl sm:text-3xl font-bold text-nature-green-600 mb-1">100%</div>
            <div className="text-xs sm:text-sm text-wood-600">Sản phẩm sạch</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-wood-100">
            <div className="text-2xl sm:text-3xl font-bold text-nature-green-600 mb-1">24/7</div>
            <div className="text-xs sm:text-sm text-wood-600">Hỗ trợ tư vấn</div>
          </div>
        </div>
      </div>
    </section>
  );
}
