import { useState } from 'react';

export default function ValuesAndCommitment() {
  const [activeTab, setActiveTab] = useState('commitments');
  
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

  const purposes = [
    {
      id: 1,
      title: "Chia sẻ tri thức",
      description: "Lan tỏa kiến thức Đông y đến cộng đồng một cách chính xác và có trách nhiệm",
      icon: "📚"
    },
    {
      id: 2,
      title: "Gìn giữ giá trị gia truyền",
      description: "Bảo tồn di sản thuốc Nam dòng họ Đào, tránh thất truyền và biến tướng",
      icon: "🔐"
    },
    {
      id: 3,
      title: "Kết nối những người cùng chí hướng",
      description: "Tạo cộng đồng yêu thích, nghiên cứu và phát triển Đông y một cách đúng đắn",
      icon: "🤝"
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
                GIÁ TRỊ & CAM KẾT
              </h1>
            </div>
            <div className="mt-6 max-w-3xl">
              <p className="text-lg sm:text-xl text-wood-600 leading-relaxed">
                Lan Tâm Đường - Nơi tinh hoa thuốc Nam được gìn giữ, chia sẻ với trách nhiệm và tâm huyết
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full border border-wood-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('commitments')}
              className={`px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === 'commitments'
                  ? 'bg-nature-green-600 text-white shadow-sm'
                  : 'text-wood-700 hover:text-nature-green-600 hover:bg-nature-green-50'
              }`}
            >
              Cam Kết
            </button>
            <button
              onClick={() => setActiveTab('purposes')}
              className={`px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === 'purposes'
                  ? 'bg-earth-600 text-white shadow-sm'
                  : 'text-wood-700 hover:text-earth-600 hover:bg-earth-50'
              }`}
            >
              Mục Đích
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          {/* Cam Kết Content */}
          {activeTab === 'commitments' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-nature-green-800 mb-4">
                  Lan Tâm Đường cam kết
                </h2>
                <p className="text-wood-600 max-w-2xl mx-auto">
                  Những nguyên tắc cốt lõi định hình cách chúng tôi hoạt động và phục vụ cộng đồng
                </p>
              </div>

              <div className="space-y-6">
                {commitments.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-xl border border-wood-100 hover:border-nature-green-200 transition-all duration-300 overflow-hidden"
                  >
                    {/* Left accent line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-nature-green-400 to-nature-green-600 group-hover:from-nature-green-500 group-hover:to-nature-green-700 transition-all duration-300"></div>
                    
                    <div className="pl-8 pr-6 py-6">
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-nature-green-50 to-nature-green-100 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform duration-300">
                          {item.icon}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-nature-green-100 text-nature-green-700 text-sm font-bold">
                              {item.id}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-wood-900 group-hover:text-nature-green-700 transition-colors duration-300">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-wood-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Arrow indicator */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-6 h-6 text-nature-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mục Đích Content */}
          {activeTab === 'purposes' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-earth-800 mb-4">
                  Website Lan Tâm Đường được xây dựng với mục đích
                </h2>
                <p className="text-wood-600 max-w-2xl mx-auto">
                  Tầm nhìn và sứ mệnh đằng sau sự ra đời của trang web này
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {purposes.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-gradient-to-br from-white to-earth-50 rounded-xl border border-wood-100 hover:border-earth-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      {/* Top Section */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-earth-100 to-earth-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-wood-900 group-hover:text-earth-700 transition-colors duration-300 mb-3">
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-wood-600 text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>
                      
                      {/* Bottom Line */}
                      <div className="flex items-center justify-between pt-4 border-t border-wood-100">
                        <span className="text-wood-500 text-xs font-medium">Lan Tâm Đường</span>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-earth-300 to-earth-500 group-hover:w-12 transition-all duration-300"></div>
                      </div>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-earth-100 to-transparent"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Additional Context */}
              <div className="mt-12 pt-8 border-t border-wood-100">
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-wood-700 text-lg leading-relaxed">
                    "Với những mục đích trên, Lan Tâm Đường mong muốn tạo dựng một không gian đáng tin cậy 
                    cho việc học hỏi, trao đổi và phát triển kiến thức về Đông y một cách đúng đắn và có trách nhiệm."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Divider Line */}
          <div className="mt-16 pt-8 border-t border-wood-100">
            <div className="text-center">
              <p className="text-wood-500 text-sm">
                Lan Tâm Đường • Tinh hoa thuốc Nam gia truyền dòng họ Đào
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}