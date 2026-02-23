export default function Benefits() {
  return (
    <section id="benefits" className="relative pt-12 sm:pt-16 md:pt-20 pb-0 bg-beige-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề chính */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-wood-900 mb-3 sm:mb-4 uppercase">
            TẠI SAO CHỌN LAN TÂM ĐƯỜNG?
          </h2>
          
          {/* Văn bản giới thiệu mới */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-nature-green-700 mb-2">
                Ý nghĩa thương hiệu
              </h3>
            
            
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-wood-100 p-6 sm:p-8 mb-8">
              <div className="space-y-4 sm:space-y-5 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-nature-green-600 font-bold text-lg">-</span>
                  <div>
                    <p className="text-wood-800 font-medium mb-1">"Lan" – Sự mềm mại, bền bỉ</p>
                    <p className="text-wood-600 text-sm sm:text-base">
                      Như bông lan vươn mình qua khó khăn, sức mạnh mềm chinh phục mọi thử thách
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-nature-green-600 font-bold text-lg">-</span>
                  <div>
                    <p className="text-wood-800 font-medium mb-1">"Tâm" – Cái tâm của người làm Đông y</p>
                    <p className="text-wood-600 text-sm sm:text-base">
                      Tâm trong sáng, đạo đức nghề nghiệp là nền tảng của mọi liều thuốc quý
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-nature-green-600 font-bold text-lg">-</span>
                  <div>
                    <p className="text-wood-800 font-medium mb-1">"Đường" – Con đường truyền thừa, không đứt gãy</p>
                    <p className="text-wood-600 text-sm sm:text-base">
                      Con đường tiếp nối truyền thống, bảo tồn và phát triển tinh hoa y học cổ truyền
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
            
            <div className="bg-nature-green-50 rounded-xl sm:rounded-2xl border-2 border-nature-green-200 p-6 sm:p-8 mb-8">
              <p className="text-wood-700 text-sm sm:text-base leading-relaxed mb-4">
                <span className="font-bold text-nature-green-700">Lan Tâm Đường</span> được hình thành từ nền tảng thuốc Nam gia truyền của dòng họ Đào – nơi tri thức thảo dược không chỉ được lưu giữ, mà còn được tiếp nối bằng trách nhiệm, hiểu biết và lòng tôn kính với Đông y cổ truyền.
              </p>
              
              <div className="border-t border-nature-green-300 pt-6 mt-6">
                <h4 className="text-lg sm:text-xl font-bold text-nature-green-700 mb-4 text-center">
                  Chúng tôi tin rằng:
                </h4>
                <p className="text-wood-700 text-sm sm:text-base leading-relaxed italic text-center">
                  "Thuốc Nam không chỉ là thảo dược – mà là trí tuệ của tổ tiên, là đạo làm nghề, là cội rễ của một dòng họ."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
  <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
    <img 
      src="/images/KieuChinh.jpg" 
      alt="Thuốc Nam gia truyền dòng họ Đào - Lan Tâm Đường"
      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
      loading="lazy"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
      <p className="text-white text-base sm:text-lg font-medium text-center">
        Thuốc Nam gia truyền dòng họ Đào
      </p>
    </div>
  </div>
</div>

{/* Văn bản KẾ THỪA & HỌC THUẬT */}
<div className="mt-8 space-y-6 sm:space-y-8">
  {/* Tiêu đề chính */}
  <div className="text-center">
    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-nature-green-800 mb-2">
      KẾ THỪA & HỌC THUẬT
    </h3>
    <div className="w-24 h-1 bg-nature-green-600 mx-auto rounded-full"></div>
  </div>
  
  {/* Phần 1 - Hành trình kế thừa */}
  <div className="bg-white rounded-xl shadow-lg border border-wood-200 overflow-hidden">
    <div className="bg-gradient-to-r from-nature-green-600 to-nature-green-700 px-6 py-4">
      <h4 className="text-lg sm:text-xl font-bold text-white">
        Hành trình kế thừa không chỉ dừng lại ở gia truyền, mà được bồi đắp bằng:
      </h4>
    </div>
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-nature-green-50 transition-colors">
          <div className="flex-shrink-0 w-8 h-8 bg-nature-green-100 rounded-full flex items-center justify-center">
            <span className="text-nature-green-700 font-bold">1</span>
          </div>
          <div>
            <p className="text-wood-800 font-medium text-sm sm:text-base">
              Bằng Y sĩ Đông y
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-nature-green-50 transition-colors">
          <div className="flex-shrink-0 w-8 h-8 bg-nature-green-100 rounded-full flex items-center justify-center">
            <span className="text-nature-green-700 font-bold">2</span>
          </div>
          <div>
            <p className="text-wood-800 font-medium text-sm sm:text-base">
              Chứng chỉ Đông y chuyên sâu
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-nature-green-50 transition-colors">
          <div className="flex-shrink-0 w-8 h-8 bg-nature-green-100 rounded-full flex items-center justify-center">
            <span className="text-nature-green-700 font-bold">3</span>
          </div>
          <div>
            <p className="text-wood-800 font-medium text-sm sm:text-base">
              Quá trình nghiên cứu, thực hành và tham gia sinh hoạt trong chi hội Đông y địa phương
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Phần 2 - Mong muốn của Lan Tâm Đường */}
  <div className="bg-white rounded-xl shadow-lg border border-wood-200 overflow-hidden">
    <div className="bg-gradient-to-r from-earth-600 to-earth-700 px-6 py-4">
      <h4 className="text-lg sm:text-xl font-bold text-white">
        Lan Tâm Đường được xây dựng với mong muốn:
      </h4>
    </div>
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-earth-50 transition-colors">
          <div className="flex-shrink-0 w-8 h-8 bg-earth-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-earth-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-wood-800 font-medium text-sm sm:text-base">
              Gìn giữ tri thức thuốc Nam họ Đào
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-earth-50 transition-colors">
          <div className="flex-shrink-0 w-8 h-8 bg-earth-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-earth-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-wood-800 font-medium text-sm sm:text-base">
              Chuẩn hóa việc chia sẻ Đông y theo hướng đúng mực
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-earth-50 transition-colors">
          <div className="flex-shrink-0 w-8 h-8 bg-earth-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-earth-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-wood-800 font-medium text-sm sm:text-base">
              Tránh thất truyền – tránh biến tướng – tránh thương mại hóa thiếu kiểm soát
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Phần 3 - Triết lý hành động */}
  <div className="bg-gradient-to-br from-nature-green-50 to-earth-50 rounded-xl shadow-lg border-2 border-nature-green-300 overflow-hidden">
    <div className="p-6">
      <div className="text-center mb-6">
        <h4 className="text-xl sm:text-2xl font-bold text-nature-green-800 mb-3">
          Lan Tâm Đường không chạy theo hiệu quả nhanh,<br className="hidden sm:block" />
          không áp đặt một khuôn mẫu cho mọi cơ thể.
        </h4>
        <p className="text-wood-700 font-medium">
          Chúng tôi lựa chọn:
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-5 text-center shadow-md hover:shadow-lg transition-shadow border border-nature-green-200">
          <div className="w-12 h-12 bg-nature-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-nature-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-wood-800 font-semibold">Lắng nghe cơ thể</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 text-center shadow-md hover:shadow-lg transition-shadow border border-nature-green-200">
          <div className="w-12 h-12 bg-nature-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-nature-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-wood-800 font-semibold">Hiểu sự khác biệt của từng người</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 text-center shadow-md hover:shadow-lg transition-shadow border border-nature-green-200">
          <div className="w-12 h-12 bg-nature-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-nature-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-wood-800 font-semibold">Tôn trọng nhịp điệu tự nhiên</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 text-center shadow-md hover:shadow-lg transition-shadow border border-nature-green-200">
          <div className="w-12 h-12 bg-nature-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-nature-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-wood-800 font-semibold">Ứng dụng Đông y như một nghệ thuật cân bằng</p>
        </div>
      </div>
    </div>
  </div>
  
  {/* Phần 4 - Câu kết luận */}
  <div className="text-center bg-gradient-to-r from-nature-green-900 to-earth-900 rounded-xl shadow-xl p-8 sm:p-10 overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nature-green-400 via-earth-300 to-nature-green-400"></div>
    <p className="text-white text-xl sm:text-2xl md:text-3xl font-serif italic leading-relaxed relative z-10">
      "Mỗi người là một thể riêng biệt.<br className="hidden sm:block" />
      Không có bài thuốc chung cho tất cả –<br className="hidden sm:block" />
      chỉ có sự thấu hiểu đúng cho từng người."
    </p>
    <div className="mt-6 text-nature-green-300 font-medium">
       "Triết lý Lan Tâm Đường"
    </div>
    <div className="absolute bottom-4 right-4 opacity-20">
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  </div>
</div>

{/* Văn bản TẦM NHÌN & SỨ MỆNH */}
<div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
  {/* Tiêu đề chính */}
  <div className="text-center">
    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-earth-800 mb-2">
      TẦM NHÌN & SỨ MỆNH
    </h3>
    <div className="w-32 h-1 bg-earth-600 mx-auto rounded-full"></div>
  </div>
  
  {/* Câu mở đầu */}
  <div className="text-center">
    <p className="text-xl sm:text-2xl font-medium text-wood-800 italic leading-relaxed max-w-3xl mx-auto">
      Lan Tâm Đường không được tạo ra để dừng lại ở một thế hệ.
    </p>
  </div>
  
  {/* Phần 1 - Hành trình dài */}
  <div className="bg-gradient-to-r from-earth-50 to-white rounded-xl shadow-lg border border-earth-200 overflow-hidden">
    <div className="p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-earth-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-earth-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h4 className="text-lg sm:text-xl font-bold text-earth-800 mb-2">
            Đây là một hành trình dài, với mong muốn:
          </h4>
          <p className="text-wood-700 text-sm sm:text-base">
            Tìm kiếm, kết nối và đồng hành cùng những người con của dòng họ Đào
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-5 text-center shadow-sm border border-earth-100 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-earth-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h5 className="font-bold text-earth-800 mb-2">Tìm kiếm</h5>
          <p className="text-sm text-wood-600">Những người con có tâm – có chí</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 text-center shadow-sm border border-earth-100 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-earth-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h5 className="font-bold text-earth-800 mb-2">Kết nối</h5>
          <p className="text-sm text-wood-600">Tạo dựng cộng đồng kế thừa</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 text-center shadow-sm border border-earth-100 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-earth-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h5 className="font-bold text-earth-800 mb-2">Đồng hành</h5>
          <p className="text-sm text-wood-600">Cùng tiếp nối Đông y gia truyền</p>
        </div>
      </div>
    </div>
  </div>
  
  {/* Phần 2 - Điểm hội tụ */}
  <div className="bg-white rounded-xl shadow-lg border border-wood-200 overflow-hidden">
    <div className="bg-gradient-to-r from-wood-700 to-wood-800 px-6 py-4">
      <h4 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Lan Tâm Đường mở ra như một điểm hội tụ, nơi:
      </h4>
    </div>
    <div className="p-6 sm:p-8">
      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 bg-wood-50 rounded-lg">
          <div className="flex-shrink-0 w-10 h-10 bg-wood-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-wood-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-wood-800 mb-1">Tri thức được chia sẻ</h5>
            <p className="text-sm text-wood-600">Bí quyết, kinh nghiệm và bài thuốc quý được truyền lại</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 bg-wood-50 rounded-lg">
          <div className="flex-shrink-0 w-10 h-10 bg-wood-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-wood-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-wood-800 mb-1">Truyền thống được tôn trọng</h5>
            <p className="text-sm text-wood-600">Giữ gìn nguyên tắc và tinh thần của Đông y cổ truyền</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 bg-wood-50 rounded-lg">
          <div className="flex-shrink-0 w-10 h-10 bg-wood-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-wood-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-wood-800 mb-1">Tìm thấy gốc rễ</h5>
            <p className="text-sm text-wood-600">Thế hệ sau có thể hiểu và tự hào về cội nguồn của mình</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Phần 3 - Thông điệp kết */}
  <div className="bg-gradient-to-br from-earth-900 to-wood-900 rounded-xl shadow-xl p-8 sm:p-10 text-center relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-earth-400 via-wood-300 to-earth-400"></div>
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-earth-800 rounded-full opacity-20"></div>
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-wood-800 rounded-full opacity-20"></div>
    
    <div className="relative z-10">
      <div className="mb-6">
        <svg className="w-12 h-12 text-earth-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      
      <p className="text-white text-lg sm:text-xl md:text-2xl font-medium leading-relaxed mb-6 max-w-3xl mx-auto">
        Đông y chỉ có thể sống lâu khi có người kế thừa –<br className="hidden sm:block" />
        và kế thừa bằng cái tâm đúng.
      </p>
      
      <div className="inline-flex items-center gap-3 bg-black/20 rounded-full px-6 py-3">
        <div className="w-3 h-3 bg-earth-400 rounded-full animate-pulse"></div>
        <p className="text-earth-200 font-semibold">
          Lan Tâm Đường - Hành trình tiếp nối
        </p>
      </div>
    </div>
  </div>
</div>




        </div>
        
        {/* Mobile: Cards stack vertically */}
        
      </div>
    </section>
  );
}