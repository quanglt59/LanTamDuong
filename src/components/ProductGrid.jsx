import { useState } from 'react';

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const diseaseGroups = [
    {
      id: 'xuong-khop',
      category: 'xuong-khop',
      name: ' NHÓM XƯƠNG KHỚP – CƠ XƯƠNG',
      icon: '🦴',
      color: 'from-blue-600 to-blue-700',
      items: [
        { name: 'Thoái hóa cột sống, thoái hóa khớp' },
        { name: 'Đau vai gáy – Đau lưng' },
        { name: 'Thoát vị đĩa đệm' },
        { name: 'Gout – Viêm đa khớp' },
        { name: 'Đau dây thần kinh tọa' }
      ],
      suitable: 'Xoa bóp bấm huyệt – Tác động cột sống – Thiết bị trị liệu hỗ trợ'
    },
    {
      id: 'than-kinh',
      category: 'than-kinh',
      name: ' NHÓM THẦN KINH – TUẦN HOÀN',
      icon: '🧠',
      color: 'from-purple-600 to-purple-700',
      items: [
        { name: 'Đau đầu – Rối loạn tiền đình' },
        { name: 'Mất ngủ kéo dài' },
        { name: 'Huyết áp cao/thấp' },
        { name: 'Di chứng tai biến' }
      ],
      suitable: 'Bấm huyệt – Điều hòa khí huyết – Kết hợp máy trị liệu'
    },
    {
      id: 'ho-hap',
      category: 'ho-hap',
      name: ' NHÓM HÔ HẤP',
      icon: '🌬️',
      color: 'from-green-600 to-green-700',
      items: [
        { name: 'Hen phế quản' },
        { name: 'Viêm phổi' },
        { name: 'Viêm xoang mãn tính' }
      ],
      suitable: 'Day ấn huyệt – Hỗ trợ tăng tuần hoàn – Kết hợp thảo dược'
    },
    {
      id: 'phuc-hoi',
      category: 'phuc-hoi',
      name: ' NHÓM PHỤC HỒI CHỨC NĂNG',
      icon: '💪',
      color: 'from-amber-600 to-amber-700',
      items: [
        { name: 'Bó gãy xương' },
        { name: 'Sau chấn thương' },
        { name: 'Teo cơ – Yếu cơ' }
      ],
      suitable: 'Vật lý trị liệu chuyên sâu – Máy hỗ trợ phục hồi'
    },
    {
      id: 'suy-nhuoc',
      category: 'suy-nhuoc',
      name: ' NHÓM SUY NHƯỢC – THỂ TRẠNG',
      icon: '🌱',
      color: 'from-emerald-600 to-emerald-700',
      items: [
        { name: 'Suy nhược cơ thể' },
        { name: 'Đau mỏi toàn thân' },
        { name: 'Rối loạn sinh lý' }
      ],
      suitable: 'Bồi bổ khí huyết – Điều hòa nội tiết – Tăng cường sinh lực'
    },
    {
    id: 'phu-nu',
    category: 'phu-nu',
    name: '  NHÓM CHĂM SÓC PHỤ NỮ – NỘI TIẾT',
    icon: '🌸',
    color: 'from-pink-600 to-pink-700',
    items: [
      { name: 'Khô hạn – Giảm đàn hồi' },
      { name: 'Sau sinh – Tiền mãn kinh' },
      { name: 'Rối loạn nội tiết nữ' },
      { name: 'Thâm sạm – Giảm săn chắc' }
    ],
    suitable: 'Chăm sóc chuyên sâu – Trẻ hóa công nghệ – Điều hòa nội tiết Đông y'
  }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'xuong-khop', name: 'Xương khớp' },
    { id: 'than-kinh', name: 'Thần kinh' },
    { id: 'ho-hap', name: 'Hô hấp' },
    { id: 'phuc-hoi', name: 'Phục hồi' },
    { id: 'suy-nhuoc', name: 'Suy nhược' },
    { id: 'phu-nu', name: 'Phụ nữ' }
  ];

  const filteredGroups = diseaseGroups.filter(group => {
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.items.some(item => 
                           item.name.toLowerCase().includes(searchQuery.toLowerCase())
                         ) ||
                         (group.suitable && group.suitable.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCall = () => {
    window.location.href = 'tel:0356859566';
  };

  return (
    <section id="products-grid" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Đã sửa tiêu đề */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-wood-900 mb-2 uppercase">
            THUỐC NAM GIA TRUYỀN ĐÀO TỘC
          </h2>
          <div className="w-24 h-1 bg-nature-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Thành tựu */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
  <div className="bg-gradient-to-br from-nature-green-50 to-beige-50 rounded-xl p-6 text-center border border-nature-green-200">
    <div className="text-3xl sm:text-4xl font-bold text-nature-green-700 mb-2">50+</div>
    <p className="text-wood-700 text-sm">Năm kinh nghiệm</p>
  </div>
  <div className="bg-gradient-to-br from-nature-green-50 to-beige-50 rounded-xl p-6 text-center border border-nature-green-200">
    <div className="text-3xl sm:text-4xl font-bold text-nature-green-700 mb-2">5000+</div>
    <p className="text-wood-700 text-sm">Bệnh nhân đã điều trị</p>
  </div>
  <div className="bg-gradient-to-br from-nature-green-50 to-beige-50 rounded-xl p-6 text-center border border-nature-green-200">
    <div className="text-3xl sm:text-4xl font-bold text-nature-green-700 mb-2">5</div>
    <p className="text-wood-700 text-sm">Đời gia truyền</p>
  </div>
  <div className="bg-gradient-to-br from-nature-green-50 to-beige-50 rounded-xl p-6 text-center border border-nature-green-200">
    <div className="text-3xl sm:text-4xl font-bold text-nature-green-700 mb-2">20+</div>
    <p className="text-wood-700 text-sm">Bài thuốc đặc trị</p>
  </div>
</div>

        {/* Danh mục hỗ trợ - ĐÃ SỬA */}
{/* Danh mục hỗ trợ - CHỮ NÂU - NỀN XANH */}
<div className="text-center mb-8 sm:mb-10">
  <p className="text-base sm:text-lg text-wood-700 max-w-2xl mx-auto px-4 sm:px-0 font-medium">
    <span className="inline-block border-b-2 border-nature-green-300 pb-1 px-4">
      Danh mục hỗ trợ & chăm sóc sức khỏe
    </span>
  </p>
  
  {/* Container với gradient hai đầu */}
  <div className="mt-6 relative">
    {/* Gradient mờ hai đầu - điều chỉnh màu cho phù hợp */}
    <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white via-white to-transparent z-10"></div>
    <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white via-white to-transparent z-10"></div>
    
    {/* Marquee */}
    <div className="overflow-hidden py-3">
      <div className="flex gap-3 text-sm sm:text-base animate-marquee-slow whitespace-nowrap" 
           style={{ animationDuration: '10s' }}>
        
        {/* Item 1 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse"></span>
          <span className="font-medium text-wood-700">Hỗ trợ các vấn đề về sinh lý – hiếm muộn nam & nữ</span>
        </span>
        
        {/* Item 2 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-200"></span>
          <span className="font-medium text-wood-700">Các bệnh lý về Gan</span>
        </span>
        
        {/* Item 3 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-300"></span>
          <span className="font-medium text-wood-700">Các bệnh lý về Thận</span>
        </span>
        
        {/* Item 4 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-400"></span>
          <span className="font-medium text-wood-700">Hen phế quản – Viêm phổi – U phổi</span>
        </span>
        
        {/* Item 5 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-500"></span>
          <span className="font-medium text-wood-700">Tim mạch – Thần kinh – Huyết áp cao/thấp – Viêm đa khớp</span>
        </span>
        
        {/* Item 6 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse"></span>
          <span className="font-medium text-wood-700">Thoái hóa xương khớp – Đau đầu – Đau dây thần kinh – Gout</span>
        </span>
        
        {/* Item 7 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-200"></span>
          <span className="font-medium text-wood-700">Viêm loét dạ dày – Đại tràng – Trĩ nội – Trĩ ngoại</span>
        </span>
        
        {/* Item 8 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-300"></span>
          <span className="font-medium text-wood-700">Viêm xoang mũi</span>
        </span>
        
        {/* Item 9 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-400"></span>
          <span className="font-medium text-wood-700">Các bệnh có khối u – U bướu – U nang</span>
        </span>
        
        {/* Item 10 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-500"></span>
          <span className="font-medium text-wood-700">Lở loét – Ngứa do huyết nhiệt</span>
        </span>
        
        {/* Item 11 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse"></span>
          <span className="font-medium text-wood-700">Bó gãy xương – Phục hồi sau chấn thương</span>
        </span>
        
        {/* Item 12 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-200"></span>
          <span className="font-medium text-wood-700">Các vấn đề về Tiểu tiện</span>
        </span>
        
        {/* Item 1 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse"></span>
          <span className="font-medium text-wood-700">Hỗ trợ các vấn đề về sinh lý – hiếm muộn nam & nữ</span>
        </span>
        
        {/* Item 2 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-200"></span>
          <span className="font-medium text-wood-700">Các bệnh lý về Gan</span>
        </span>
        
        {/* Item 3 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-300"></span>
          <span className="font-medium text-wood-700">Các bệnh lý về Thận</span>
        </span>
        
        {/* Item 4 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-400"></span>
          <span className="font-medium text-wood-700">Hen phế quản – Viêm phổi – U phổi</span>
        </span>
        
        {/* Item 5 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-500"></span>
          <span className="font-medium text-wood-700">Tim mạch – Thần kinh – Huyết áp cao/thấp – Viêm đa khớp</span>
        </span>
        
        {/* Item 6 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse"></span>
          <span className="font-medium text-wood-700">Thoái hóa xương khớp – Đau đầu – Đau dây thần kinh – Gout</span>
        </span>
        
        {/* Item 7 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-200"></span>
          <span className="font-medium text-wood-700">Viêm loét dạ dày – Đại tràng – Trĩ nội – Trĩ ngoại</span>
        </span>
        
        {/* Item 8 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-300"></span>
          <span className="font-medium text-wood-700">Viêm xoang mũi</span>
        </span>
        
        {/* Item 9 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-400"></span>
          <span className="font-medium text-wood-700">Các bệnh có khối u – U bướu – U nang</span>
        </span>
        
        {/* Item 10 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-500"></span>
          <span className="font-medium text-wood-700">Lở loét – Ngứa do huyết nhiệt</span>
        </span>
        
        {/* Item 11 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse"></span>
          <span className="font-medium text-wood-700">Bó gãy xương – Phục hồi sau chấn thương</span>
        </span>
        
        {/* Item 12 */}
        <span className="bg-nature-green-100 px-4 py-2.5 rounded-full border-2 border-nature-green-300 shadow-md flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="w-2.5 h-2.5 bg-wood-600 rounded-full animate-pulse animation-delay-200"></span>
          <span className="font-medium text-wood-700">Các vấn đề về Tiểu tiện</span>
        </span>
      </div>
    </div>
  </div>
</div>

        {/* Search and Filter */}
        <div className="mb-8 sm:mb-10 space-y-4">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm bệnh lý, triệu chứng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors text-sm sm:text-base"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-wood-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-nature-green-600 text-white shadow-md'
                    : 'bg-beige-100 text-wood-700 hover:bg-beige-200 border border-wood-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Disease Groups Grid - Bố cục 3-3 cho 6 nhóm */}
{filteredGroups.length > 0 ? (
  <div className="flex flex-col items-center">
    {/* Hàng 1: 3 nhóm */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mx-auto mb-6 sm:mb-8">
      {filteredGroups.slice(0, 3).map((group) => (
        <GroupCard key={group.id} group={group} handleCall={handleCall} />
      ))}
    </div>
    
    {/* Hàng 2: 3 nhóm còn lại */}
    {filteredGroups.length > 3 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mx-auto">
        {filteredGroups.slice(3).map((group) => (
          <GroupCard key={group.id} group={group} handleCall={handleCall} />
        ))}
      </div>
    )}
  </div>
) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-wood-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-wood-600 text-lg">Không tìm thấy bệnh lý nào</p>
            <p className="text-wood-500 text-sm mt-2">Vui lòng thử lại với từ khóa khác</p>
          </div>
        )}

        {/* Bottom Contact Banner */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-nature-green-50 to-beige-50 rounded-2xl p-6 sm:p-8 border-2 border-nature-green-200">
            <p className="text-wood-700 text-lg sm:text-xl mb-4">
              Bạn đang gặp vấn đề về sức khỏe? Hãy để chúng tôi tư vấn!
            </p>
            <button
              onClick={handleCall}
              className="inline-flex items-center gap-3 bg-nature-green-600 text-white px-8 py-4 rounded-full hover:bg-nature-green-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>GỌI TƯ VẤN MIỄN PHÍ: 0356.85.95.66</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Tách GroupCard thành component riêng để code gọn hơn
function GroupCard({ group, handleCall }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 border border-wood-100 group flex flex-col h-full">
      {/* Group Header với màu sắc riêng */}
      <div className={`bg-gradient-to-r ${group.color} p-4 sm:p-5 flex-shrink-0`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl filter drop-shadow-lg">{group.icon}</span>
          <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
            {group.name}
          </h3>
        </div>
      </div>

      {/* Disease Items */}
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="space-y-3 flex-1">
          {group.items.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className={`text-${group.color.split('-')[1]}-600 font-bold mt-1`}>•</span>
              <p className="text-sm sm:text-base text-wood-700">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* Suitable For */}
        {group.suitable && (
          <div className="mt-4 pt-4 border-t border-dashed border-wood-200">
            <p className="text-xs sm:text-sm text-nature-green-600 italic leading-relaxed">
              <span className="font-semibold">👉 Phù hợp:</span> {group.suitable}
            </p>
          </div>
        )}

        {/* Contact Button */}
        <div className="mt-6 pt-2 flex-shrink-0">
          <button
            onClick={handleCall}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-nature-green-500 to-nature-green-600 text-white px-4 py-3.5 rounded-lg hover:from-nature-green-600 hover:to-nature-green-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer group min-h-[52px]"
          >
            <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform">👉</span>
            <span className="text-sm sm:text-base font-semibold whitespace-nowrap">LIÊN HỆ TƯ VẤN NGAY</span>
            <svg className="w-4 h-4 group-hover:animate-pulse ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}