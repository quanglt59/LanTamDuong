export default function FloatingContacts() {
  return (
    <div className="fixed left-3 bottom-6 sm:left-4 sm:bottom-8 z-50 flex flex-col gap-2.5 sm:gap-3">
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0869063666"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        aria-label="Liên hệ qua Zalo"
      >
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping-slow"></div>
        
        {/* Main Button */}
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 animate-shake p-2">
          <svg className="w-full h-full" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M22.782 0.166016H27.199C33.2653 0.166016 36.8103 1.05701 39.9572 2.74421C43.1041 4.4314 45.5875 6.89585 47.2557 10.0428C48.9429 13.1897 49.8339 16.7347 49.8339 22.801V27.1991C49.8339 33.2654 48.9429 36.8104 47.2557 39.9573C45.5685 43.1042 43.1041 45.5877 39.9572 47.2559C36.8103 48.9431 33.2653 49.8341 27.199 49.8341H22.8009C16.7346 49.8341 13.1896 48.9431 10.0427 47.2559C6.89583 45.5687 4.41243 43.1042 2.7442 39.9573C1.057 36.8104 0.166016 33.2654 0.166016 27.1991V22.801C0.166016 16.7347 1.057 13.1897 2.7442 10.0428C4.43139 6.89585 6.89583 4.41245 10.0427 2.74421C13.1707 1.05701 16.7346 0.166016 22.782 0.166016Z" fill="white"/>
            <path d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1801 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z" fill="#0068FF"/>
            <path d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z" fill="#0068FF"/>
            <path d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z" fill="#0068FF"/>
            <path d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z" fill="#0068FF"/>
            <path d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z" fill="#0068FF"/>
          </svg>
        </div>
        
        {/* Hover Text */}
        <div className="absolute left-full ml-2 sm:ml-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          Chat Zalo
        </div>
      </a>

      {/* Phone Button */}
      <a
        href="tel:0356859566"
        className="relative group"
        aria-label="Gọi điện thoại"
      >
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-red-600 opacity-75 animate-ping-slow"></div>
        
        {/* Main Button */}
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 animate-shake">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        
        {/* Hover Text */}
        <div className="absolute left-full ml-2 sm:ml-3 top-1/2 -translate-y-1/2 bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          0356 859 566
        </div>
      </a>
    </div>
  );
}
