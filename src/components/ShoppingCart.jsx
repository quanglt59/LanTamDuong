import { useState, useEffect } from 'react';

export default function ShoppingCart({ cart, onUpdateQuantity, onRemoveItem, onCheckout, isOpen, onClose }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-wood-900/50 backdrop-blur-sm z-40 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-wood-200">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-wood-900">
              Giỏ hàng ({itemCount})
            </h2>
            <button
              onClick={onClose}
              className="text-wood-600 hover:text-wood-900 transition-colors cursor-pointer"
              aria-label="Đóng giỏ hàng"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-wood-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-wood-600 text-lg mb-2">Giỏ hàng trống</p>
                <p className="text-wood-500 text-sm">Thêm sản phẩm vào giỏ để tiếp tục</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-beige-50 rounded-xl border border-wood-100"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-nature-green-50 to-earth-50 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <svg className="w-10 h-10 text-nature-green-300 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-wood-900 mb-1 text-sm sm:text-base line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-wood-600 mb-2">
                        {item.unit}
                      </p>
                      <p className="text-sm sm:text-base font-bold text-nature-green-600 mb-3">
                        {formatPrice(item.price)}đ
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-wood-200 text-wood-700 hover:bg-wood-100 transition-colors flex items-center justify-center cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-10 text-center font-semibold text-wood-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-wood-200 text-wood-700 hover:bg-wood-100 transition-colors flex items-center justify-center cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="ml-auto text-wood-400 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Xóa sản phẩm"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Total and Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-wood-200 p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-wood-900">Tổng cộng:</span>
                <span className="text-2xl font-bold text-nature-green-600">
                  {formatPrice(total)}đ
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-nature-green-600 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-nature-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Thanh toán
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white text-nature-green-600 border-2 border-nature-green-600 py-3 rounded-lg text-base font-semibold hover:bg-nature-green-50 transition-colors duration-200 cursor-pointer"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
