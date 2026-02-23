export default function CustomBasketBadge({ itemCount, onClick }) {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-nature-green-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-full shadow-2xl hover:bg-nature-green-700 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
      aria-label="Xem giỏ quà tùy chỉnh"
    >
      <div className="relative">
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span className="absolute -top-2 -right-2 bg-earth-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border-2 border-white">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      </div>
      <div className="hidden sm:block">
        <p className="font-semibold text-sm sm:text-base">Giỏ quà tùy chỉnh</p>
        <p className="text-xs text-nature-green-100">{itemCount} sản phẩm</p>
      </div>
      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
