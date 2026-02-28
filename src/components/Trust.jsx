import { useState } from 'react';

export default function ValuesAndCommitment() {
  const [activeTab, setActiveTab] = useState('vision');
  
  const commitments = [
    {
      id: 1,
      title: "Tôn trọng Đông y cổ truyền",
      description: "Giữ nguyên tắc và tinh thần của y học cổ truyền, bảo tồn tri thức gia truyền",
      icon: "🏛️"
    },
    {
      id: 2,
      title: "Không thổi phồng công dụng",
      description: "Trung thực về hiệu quả và giới hạn của thuốc Nam, không hứa hẹn phi thực tế",
      icon: "⚖️"
    },
    {
      id: 3,
      title: "Không sử dụng ngôn ngữ gây hiểu nhầm",
      description: "Minh bạch, rõ ràng trong mọi thông tin, tránh gây hiểu lầm cho người dùng",
      icon: "💬"
    },
    {
      id: 4,
      title: "Không thương mại hóa thuốc Nam một cách dễ dãi",
      description: "Chất lượng hơn số lượng, giá trị hơn lợi nhuận, không vì lợi nhuận mà làm mất giá trị thuốc Nam",
      icon: "🛡️"
    }
  ];

  const vision = {
    title: "🌏 TẦM NHÌN",
    description: "Trở thành thương hiệu Đông y chuẩn mực, tiên phong kết hợp truyền thống và công nghệ hiện đại trong chăm sóc sức khỏe toàn diện.",
    goals: [
      { icon: "🌿", text: "Xây dựng hệ sinh thái sản phẩm Đông y chuẩn mực" },
      { icon: "🥇", text: "Ứng dụng thảo dược Nam trong dưỡng sinh và trị liệu" },
      { icon: "🏡", text: "Góp phần hình thành cộng đồng sống thuận tự nhiên" }
    ]
  };

  const mission = {
    title: "💚 SỨ MỆNH",
    goals: [
      { icon: "🌿", text: "Kế thừa và nâng tầm tinh hoa thuốc Nam gia truyền", detail: "Bảo tồn và phát triển di sản thuốc Nam dòng họ Đào" },
      { icon: "⚖️", text: "Chuẩn hóa phương pháp 'Trong uống – Ngoài dưỡng', tích hợp công nghệ hiện đại trong chăm sóc và trị liệu", detail: "Kết hợp tinh hoa cổ truyền với thiết bị trị liệu tiên tiến" },
      { icon: "☯️", text: "Lan tỏa giá trị dưỡng sinh theo nguyên lý cân bằng Âm – Dương", detail: "Hướng dẫn cộng đồng sống hài hòa với tự nhiên" },
      { icon: "💚", text: "Phụng sự sức khỏe cộng đồng trên mọi miền Tổ quốc, hướng tới một xã hội 'Thân khỏe – Tâm an – Trí sáng'", detail: "Lan tỏa giá trị sức khỏe toàn diện đến mọi người dân Việt Nam" }
    ]
  };

  const coreValues = [
    {
      number: 1,
      title: "Kế thừa & Phát triển tinh hoa Đông y",
      description: "Giữ gìn tinh thần và nguyên lý cốt lõi của y học cổ truyền.",
    },
    {
      number: 2,
      title: "Y Đạo Chính Trực",
      description: "Không thổi phồng công dụng – không hứa hẹn phi thực tế.",
    },
    {
      number: 3,
      title: "Chuẩn Mực Chất Lượng",
      description: "Dược liệu rõ nguồn gốc, quy trình kiểm soát nghiêm ngặt.",
    },
    {
      number: 4,
      title: "Trị Liệu Căn Nguyên",
      description: "Ưu tiên điều trị từ gốc thay vì tác động tức thời.",
    },
    {
      number: 5,
      title: "Tận Tâm Phụng Sự",
      description: "Lắng nghe – Thấu hiểu – Đồng hành.",
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề chính */}
        <div className="text-center mb-16">
          <div className="inline-flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-nature-green-50 to-earth-50 rounded-full"></div>
              <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-wood-900 tracking-tight">
                GIÁ TRỊ ĐỒNG HÀNH
              </h1>
            </div>
            <div className="mt-8 max-w-3xl text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl text-nature-green-300 opacity-30 font-serif italic">
                ❝
              </div>
              
              <p className="text-2xl sm:text-3xl md:text-4xl mb-3 relative">
                <span className="font-bold text-nature-green-600 relative inline-block">
                  Lan Tâm Đường
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-nature-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </span>
              </p>
              
              <p className="text-xl sm:text-2xl md:text-3xl text-wood-600 italic font-light relative">
                <span className="relative">
                  Tinh Hoa Trị Liệu Cổ Truyền
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-nature-green-300 rounded-full"></span>
                </span>
              </p>
              
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-4xl text-nature-green-300 opacity-30 font-serif italic rotate-180">
                ❝
              </div>
            </div>
            
            <div className="mt-6 flex gap-2">
              <span className="w-2 h-2 rounded-full bg-nature-green-400"></span>
              <span className="w-2 h-2 rounded-full bg-nature-green-500"></span>
              <span className="w-2 h-2 rounded-full bg-nature-green-600"></span>
            </div>
          </div>
        </div>

        {/* Tab Navigation - 3 tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full border border-wood-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === 'vision'
                  ? 'bg-nature-green-600 text-white shadow-sm'
                  : 'text-wood-700 hover:text-nature-green-600 hover:bg-nature-green-50'
              }`}
            >
              Tầm Nhìn
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === 'mission'
                  ? 'bg-earth-600 text-white shadow-sm'
                  : 'text-wood-700 hover:text-earth-600 hover:bg-earth-50'
              }`}
            >
              Sứ Mệnh
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === 'values'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-wood-700 hover:text-amber-600 hover:bg-amber-50'
              }`}
            >
              Giá Trị Văn Hóa
            </button>
          </div>
        </div>

        {/* Content Area - Chỉ hiển thị nội dung của tab đang active */}
        <div className="relative">
          {/* TẦM NHÌN Content */}
          {activeTab === 'vision' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nature-green-800 mb-4">
                  {vision.title}
                </h2>
              </div>

              {/* Card lớn duy nhất */}
              <div className="relative bg-gradient-to-br from-nature-green-600 to-nature-green-800 rounded-3xl overflow-hidden shadow-2xl">
                {/* Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="vision-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="white"/>
                    </pattern>
                    <rect width="100" height="100" fill="url(#vision-pattern)"/>
                  </svg>
                </div>
                
                <div className="relative p-8 sm:p-10 md:p-12 text-white">
                  {/* Quote Icon */}
                  <svg className="w-12 h-12 text-nature-green-300 mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  
                  <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed mb-8 font-light">
                    {vision.description}
                  </p>
                  
                  <div className="border-t border-nature-green-400 pt-8">
                    <p className="text-lg sm:text-xl font-medium text-nature-green-200 mb-4">
                      Lan Tâm Đường hướng đến:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {vision.goals.map((goal, index) => (
                        <span key={index} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-nature-green-300 text-sm sm:text-base">
                          <span>{goal.icon}</span>
                          {goal.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-nature-green-500 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-nature-green-700 rounded-full opacity-20 blur-3xl"></div>
              </div>
            </div>
          )}

          {/* SỨ MỆNH Content */}
          {activeTab === 'mission' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-earth-800 mb-4">
                  {mission.title}
                </h2>
              </div>

              {/* Accordion Cards với nội dung mới */}
              <div className="space-y-4 max-w-4xl mx-auto">
                {mission.goals.map((goal, index) => (
                  <div key={index} className="group">
                    <div className="bg-white rounded-xl border border-earth-200 hover:border-earth-400 transition-all overflow-hidden shadow-sm hover:shadow-md">
                      <div className="flex items-center justify-between p-5 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-14 h-14 bg-earth-100 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform group-hover:bg-earth-200">
                            {goal.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-wood-900 group-hover:text-earth-700 transition-colors">
                              {goal.text}
                            </h3>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-earth-100 flex items-center justify-center text-earth-600 text-xl font-light group-hover:bg-earth-200 transition-colors">
                          +
                        </div>
                      </div>
                      
                      <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300 px-5">
                        <div className="pb-5 pt-2 border-t border-earth-100">
                          <p className="text-wood-500 text-sm italic flex items-center gap-2">
                            <span className="w-1 h-1 bg-earth-400 rounded-full"></span>
                            {goal.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Quote */}
              <div className="text-center pt-6">
                <div className="inline-flex items-center gap-3">
                  <span className="w-12 h-px bg-earth-300"></span>
                  <span className="text-earth-600 text-sm font-serif italic">Sứ mệnh cao cả - Hành trình bền bỉ</span>
                  <span className="w-12 h-px bg-earth-300"></span>
                </div>
              </div>
            </div>
          )}

          {/* GIÁ TRỊ VĂN HÓA Content */}
          {activeTab === 'values' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-800 mb-4">
                  🌟 GIÁ TRỊ VĂN HÓA
                </h2>
              </div>

              {/* BỐ CỤC LƯỚI 3-2 */}
              <div className="max-w-4xl mx-auto">
                {/* Hàng trên - 3 giá trị */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  {coreValues.slice(0, 3).map((value) => (
                    <div key={value.number} className="group bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-1">
                      
                      <h3 className="font-bold text-wood-900 mb-2 text-lg">{value.title}</h3>
                      <p className="text-wood-600 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>

                {/* Hàng dưới - 2 giá trị */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {coreValues.slice(3, 5).map((value) => (
                    <div key={value.number} className="group bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-1">
                      
                      <h3 className="font-bold text-wood-900 mb-2 text-lg">{value.title}</h3>
                      <p className="text-wood-600 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}