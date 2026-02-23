import { useState } from 'react';
import { products, categories } from '../data/products';

export default function ProductGrid({ onAddToCustomBasket }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Giới hạn số sản phẩm hiển thị: 4 cho mobile, 8 cho desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const limit = isMobile ? 4 : 8;
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, limit);
  const hasMore = filteredProducts.length > limit;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <section id="products-grid" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-wood-900 mb-3 sm:mb-4 uppercase">
            DÒNG SẢN PHẨM
          </h2>
          <p className="text-base sm:text-lg text-wood-600 max-w-2xl mx-auto px-4 sm:px-0">
            Những sản phẩm được chọn cho "Vị Bắc Kạn" gồm:
          </p>
          <div className="mt-4 overflow-hidden relative">
            <div className="flex gap-2 sm:gap-3 text-sm sm:text-base text-wood-700 animate-marquee whitespace-nowrap">
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Miến dong</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Gạo nếp nương</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Thịt gác bếp</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Măng khô rừng</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Mộc nhĩ, nấm hương</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Rượu men lá, rượu ngô</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Mật ong rừng</span>
              {/* Duplicate for seamless loop */}
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Miến dong</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Gạo nếp nương</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Thịt gác bếp</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Măng khô rừng</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Mộc nhĩ, nấm hương</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Rượu men lá, rượu ngô</span>
              <span className="bg-beige-100 px-3 py-1 rounded-full inline-block">Mật ong rừng</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-wood-600 max-w-2xl mx-auto px-4 sm:px-0 mt-4">
            Mỗi sản phẩm đều có thẻ treo kể lại nguồn gốc và cách dùng phù hợp.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 sm:mb-10 space-y-4">
          {/* Title above search */}
          <div className="text-center mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-wood-900 uppercase">
              CHỌN SẢN PHẨM CHO GIỎ QUÀ TÙY CHỈNH
            </h3>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
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

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 border border-wood-100 cursor-pointer group flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="relative h-48 sm:h-56 bg-gradient-to-br from-nature-green-50 to-earth-50 overflow-hidden flex-shrink-0">
                  {/* Try to load actual image, fallback to placeholder */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:opacity-90 transition-opacity duration-200"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-4 hidden">
                    {/* Placeholder - hiển thị khi không có hình ảnh */}
                    <svg className="w-20 h-20 sm:w-24 sm:h-24 text-nature-green-300 opacity-50 group-hover:opacity-70 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </div>
                  {product.featured && (
                    <div className="absolute top-2 right-2 bg-nature-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Nổi bật
                    </div>
                  )}
                  {product.requiresPreOrder && (
                    <div className="absolute top-2 left-2 bg-earth-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Đặt trước
                    </div>
                  )}
                </div>

                {/* Product Info - Flex column để đẩy nút xuống dưới */}
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <div className="mb-2">
                    <span className="text-xs sm:text-sm text-nature-green-600 font-medium">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-wood-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-wood-600 mb-3 line-clamp-2 flex-shrink-0">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-nature-green-600">
                        {formatPrice(product.price)}đ
                      </p>
                      <p className="text-xs text-wood-500">
                        / {product.unit}
                      </p>
                    </div>
                    {product.requiresPreOrder && (
                      <div className="text-xs text-wood-500 text-right">
                        <p>Đặt trước</p>
                        <p>{product.preOrderDays} ngày</p>
                      </div>
                    )}
                  </div>

                  {/* Nút luôn ở dưới cùng */}
                  <button
                    type="button"
                    onClick={(e) => {
                      if (onAddToCustomBasket) {
                        onAddToCustomBasket(product);
                      }
                    }}
                    className="w-full bg-nature-green-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-nature-green-700 active:bg-nature-green-800 transition-colors duration-200 cursor-pointer mt-auto"
                  >
                    Chọn cho giỏ quà
                  </button>
                </div>
              </div>
              ))}
            </div>

            {/* Nút "Xem thêm" / "Thu gọn" */}
            {hasMore && (
              <div className="mt-10 sm:mt-12 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-nature-green-600 to-nature-green-700 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Background animation on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-nature-green-700 to-nature-green-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  
                  {/* Button content */}
                  <span className="relative z-10 text-base sm:text-lg">
                    {showAll ? 'Thu gọn' : `Xem thêm ${filteredProducts.length - limit} sản phẩm`}
                  </span>
                  
                  {/* Icon with animation */}
                  <svg 
                    className={`relative z-10 w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-1'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  
                  {/* Pulse effect */}
                  <span className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></span>
                </button>
                
                {/* Helper text */}
                {!showAll && (
                  <p className="mt-4 text-sm text-wood-500 animate-fade-in">
                    Hiển thị {displayedProducts.length} / {filteredProducts.length} sản phẩm
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-wood-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-wood-600 text-lg">Không tìm thấy sản phẩm nào</p>
            <p className="text-wood-500 text-sm mt-2">Vui lòng thử lại với từ khóa khác</p>
          </div>
        )}
      </div>
    </section>
  );
}
