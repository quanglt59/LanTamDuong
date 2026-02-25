export default function BrandStory() {
  return (
    <section id="brand-story" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-nature-green-50 via-beige-50 to-earth-50"></div>
      
      {/* Decorative Pattern - Lá cây nhẹ */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 20 Q60 40 40 80 Q20 120 40 160 Q60 200 100 180 Q140 200 160 160 Q180 120 160 80 Q140 40 100 20 Z" fill="#3a8f5c"/>
            <path d="M100 50 Q80 60 70 80 Q60 100 70 120 Q80 140 100 130 Q120 140 130 120 Q140 100 130 80 Q120 60 100 50 Z" fill="#5cb07d"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-20 w-48 h-48">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 20 Q60 40 40 80 Q20 120 40 160 Q60 200 100 180 Q140 200 160 160 Q180 120 160 80 Q140 40 100 20 Z" fill="#b5854f"/>
          </svg>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-wood-900 mb-3 sm:mb-4 uppercase">
            Hành trình cùng sức khỏe của bạn
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Ảnh Ông chú bên trái */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl">
  <img 
    src="/images/anh1_aoBlue.jpg" 
    className="w-full h-full object-cover"
    loading="lazy"
  />
</div>
          </div>
          
          {/* Chữ bên phải */}
          <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg md:text-xl text-wood-700 leading-relaxed">
              Hành Trình Gìn Giữ Tinh Hoa Đông Y Gia Truyền – Lan Tâm Đường là sự tiếp nối đầy tự hào của dòng thuốc Nam gia truyền họ Đào – nơi tri thức Đông y được lưu truyền qua nhiều thế hệ bằng thực hành, trải nghiệm thực tế và đạo làm nghề chuẩn mực.
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-wood-700 leading-relaxed">
              Đông Y – Không Chỉ Là Nghề, Mà Là Sứ Mệnh - Bắt nguồn từ những bài thuốc dân gian, từ khu vườn thảo dược xanh mát và kinh nghiệm nhận biết cây thuốc trong tự nhiên, Đông y đối với gia đình họ Đào không đơn thuần là một nghề nghiệp. Đó là nếp sống, là trách nhiệm thiêng liêng và cũng là lời hứa gìn giữ truyền thống với tổ tiên.
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-wood-700 leading-relaxed font-medium">
              Người sáng lập Lan Tâm Đường sinh ra và trưởng thành trong môi trường đậm chất Đông y ấy. Từ sớm đã được tiếp cận với thảo dược, những bài thuốc cổ truyền và tư duy điều hòa cơ thể theo học thuyết Đông y truyền thống, tạo nên nền tảng vững chắc cho hành trình kế thừa và phát triển hôm nay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
