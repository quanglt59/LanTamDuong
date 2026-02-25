import { useState, useEffect } from 'react';

export default function OrderForm({ customBasketItems = [], onRemoveItem, onUpdateQuantity, selectedProduct = '', onSelectedProductChange }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    appointmentDate: '',
    appointmentTime: '',
    message: '',
    products: '' // Thêm trường để lưu thông tin sản phẩm đã chọn
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState('');

  // Load Google Sheets URL từ environment variable
  useEffect(() => {
    const url = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    if (url) {
      setGoogleSheetsUrl(url);
    }
  }, []);

  // Format thông tin sản phẩm từ giỏ hàng
  useEffect(() => {
    if (customBasketItems && customBasketItems.length > 0) {
      const productsText = customBasketItems.map(item => 
        `${item.name} (Số lượng: ${item.quantity}, Giá: ${formatPrice(item.price)}đ)`
      ).join('\n');
      
      setFormData(prev => ({
        ...prev,
        products: productsText
      }));
    }
  }, [customBasketItems]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // Tạo danh sách ngày (7 ngày tiếp theo)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const formattedDate = date.toLocaleDateString('vi-VN', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(',', '');
      
      const value = date.toISOString().split('T')[0];
      
      dates.push({
        label: formattedDate,
        value: value
      });
    }
    
    return dates;
  };

  // Giờ làm việc
  const workingHours = [
    { value: '08:00', label: '08:00' },
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '13:00', label: '13:00' },
    { value: '14:00', label: '14:00' },
    { value: '15:00', label: '15:00' },
    { value: '16:00', label: '16:00' },
    { value: '17:00', label: '17:00' },
    { value: '18:00', label: '18:00' }
  ];

  // Hàm gửi dữ liệu đến Google Sheets
  const sendToGoogleSheets = async (data) => {
    const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    
    if (!googleSheetsUrl) {
      console.warn('VITE_GOOGLE_SHEETS_URL chưa được cấu hình');
      return false;
    }

    try {
      // Thêm timestamp và thông tin sản phẩm
      const submissionData = {
        ...data,
        timestamp: new Date().toLocaleString('vi-VN'),
        products: data.products || 'Không có sản phẩm',
        totalAmount: customBasketItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
      };

      // Gửi dữ liệu đến Google Sheets
      const response = await fetch(googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      return true;
    } catch (error) {
      console.error('Lỗi gửi dữ liệu:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Validate ngày và giờ
    if (!formData.appointmentDate || !formData.appointmentTime) {
      setSubmitError('Vui lòng chọn ngày và giờ khám');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Chuẩn bị dữ liệu
      const appointmentData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        address: formData.address,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        message: formData.message || '',
        products: formData.products || 'Không có sản phẩm',
        totalAmount: customBasketItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
      };
      
      // Gửi dữ liệu đến Google Sheets
      const sent = await sendToGoogleSheets(appointmentData);
      
      if (sent) {
        // Hiển thị thông báo thành công
        const productInfo = customBasketItems?.length > 0 
          ? `\n\nSản phẩm đã chọn:\n${customBasketItems.map(item => 
              `• ${item.name} (SL: ${item.quantity}, Giá: ${formatPrice(item.price)}đ)`
            ).join('\n')}\nTổng tiền: ${formatPrice(appointmentData.totalAmount)}đ`
          : '';

        showSuccessNotification(
          `Đặt lịch khám thành công!\n\nThông tin lịch hẹn:\n• Họ tên: ${formData.name}\n• SĐT: ${formData.phone}\n• Ngày: ${new Date(formData.appointmentDate).toLocaleDateString('vi-VN')}\n• Giờ: ${formData.appointmentTime}${productInfo}\n\nChúng tôi sẽ liên hệ xác nhận trong vòng 2 giờ làm việc.`
        );
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          appointmentDate: '',
          appointmentTime: '',
          message: '',
          products: ''
        });

        // Mở link Google Sheets sau 2 giây
        setTimeout(() => {
          window.open(googleSheetsUrl, '_blank');
        }, 2000);
      } else {
        // Nếu không có URL, chỉ log ra console
        console.log('Dữ liệu đặt lịch:', appointmentData);
        showSuccessNotification(
          `Đặt lịch khám thành công (Chế độ test)!\n\nThông tin lịch hẹn:\n• Họ tên: ${formData.name}\n• SĐT: ${formData.phone}\n• Ngày: ${new Date(formData.appointmentDate).toLocaleDateString('vi-VN')}\n• Giờ: ${formData.appointmentTime}`
        );
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Có lỗi xảy ra khi đặt lịch khám. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi.');
      showErrorNotification('Có lỗi xảy ra khi đặt lịch khám. Vui lòng thử lại hoặc liên hệ trực tiếp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hàm hiển thị notification thành công
  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setNotificationType('success');
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Hàm hiển thị notification lỗi
  const showErrorNotification = (message) => {
    setNotificationMessage(message);
    setNotificationType('error');
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Hiển thị tổng tiền nếu có sản phẩm
  const totalAmount = customBasketItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  return (
    <>
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 animate-slide-in-right">
          <div className={`max-w-md rounded-xl shadow-2xl border-2 ${
            notificationType === 'success' 
              ? 'bg-white border-nature-green-200' 
              : 'bg-white border-red-200'
          }`}>
            <div className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  notificationType === 'success' 
                    ? 'bg-nature-green-100' 
                    : 'bg-red-100'
                }`}>
                  {notificationType === 'success' ? (
                    <svg className="w-6 h-6 text-nature-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-lg mb-1 ${
                    notificationType === 'success' ? 'text-nature-green-800' : 'text-red-800'
                  }`}>
                    {notificationType === 'success' ? 'Đặt lịch thành công!' : 'Có lỗi xảy ra'}
                  </h3>
                  <p className="text-sm text-wood-700 whitespace-pre-line">
                    {notificationMessage}
                  </p>
                </div>
                <button
                  onClick={() => setShowNotification(false)}
                  className="flex-shrink-0 text-wood-400 hover:text-wood-600 transition-colors"
                  aria-label="Đóng thông báo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section id="order" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-nature-green-50 to-earth-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-wood-900 mb-3 sm:mb-4 uppercase">
              Đặt Lịch Khám
            </h2>
            <p className="text-base sm:text-lg text-wood-600 px-4 sm:px-0">
              Điền thông tin bên dưới, chúng tôi sẽ liên hệ xác nhận lịch hẹn trong vòng 2 giờ làm việc
            </p>
          </div>
          
          {/* Hiển thị sản phẩm đã chọn nếu có */}
          {customBasketItems && customBasketItems.length > 0 && (
            <div className="mb-6 p-4 bg-white rounded-lg border-2 border-nature-green-200">
              <h3 className="font-bold text-wood-800 mb-2">Sản phẩm đã chọn:</h3>
              {customBasketItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-wood-100 last:border-0">
                  <span className="text-wood-700">{item.name} (x{item.quantity})</span>
                  <span className="font-semibold text-nature-green-700">{formatPrice(item.price * item.quantity)}đ</span>
                </div>
              ))}
              <div className="flex justify-between items-center mt-2 pt-2 font-bold">
                <span className="text-wood-800">Tổng tiền:</span>
                <span className="text-lg text-nature-green-700">{formatPrice(totalAmount)}đ</span>
              </div>
            </div>
          )}
        
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-wood-100">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-wood-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-wood-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors"
                    placeholder="0901234567"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-wood-700 mb-2">
                  Email <span className="text-wood-500 font-normal">(không bắt buộc)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-wood-700 mb-2">
                  Nhập vấn đề sức khỏe cần khám: <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors resize-none"
                  placeholder="Nhập tình trạng sức khỏe của bạn, câu hỏi dành cho bác sĩ và các vấn đề sức khỏe cần khám"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="appointmentDate" className="block text-sm font-medium text-wood-700 mb-2">
                    Ngày cần khám <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="appointmentDate"
                    name="appointmentDate"
                    required
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors bg-white"
                  >
                    <option value="">Chọn ngày khám</option>
                    {generateDates().map((date) => (
                      <option key={date.value} value={date.value}>
                        {date.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-wood-500 mt-1">
                    Lịch làm việc: Thứ 2 - Chủ Nhật
                  </p>
                </div>
                
                <div>
                  <label htmlFor="appointmentTime" className="block text-sm font-medium text-wood-700 mb-2">
                    Giờ cần khám <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="appointmentTime"
                    name="appointmentTime"
                    required
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors bg-white"
                  >
                    <option value="">Chọn giờ khám</option>
                    {workingHours.map((time) => (
                      <option key={time.value} value={time.value}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-wood-500 mt-1">
                    Giờ làm việc: 8:00 - 18:00 (Nghỉ trưa: 12:00 - 13:00)
                  </p>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-wood-700 mb-2">
                  Ghi chú thêm <span className="text-wood-500 font-normal">(không bắt buộc)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors resize-none"
                  placeholder="Dị ứng thuốc, tiền sử bệnh, hoặc yêu cầu đặc biệt..."
                />
              </div>
              
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                  {submitError}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-nature-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-nature-green-700 focus:outline-none focus:ring-2 focus:ring-nature-green-500 focus:ring-offset-2 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang đặt lịch...</span>
                  </>
                ) : (
                  'Đăng Kí Tư Vấn'
                )}
              </button>
              
              <p className="text-sm text-wood-500 text-center">
                Bằng cách gửi form này, bạn đồng ý với chính sách bảo mật của chúng tôi.
              </p>

              {/* Link đến Google Sheets */}
              {googleSheetsUrl && (
                <div className="mt-4 text-center">
                  <a
                    href={googleSheetsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-nature-green-600 hover:text-nature-green-700 underline focus:outline-none inline-flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Xem danh sách đặt lịch (Google Sheets)
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}