import { useState, useEffect } from 'react';

export default function OrderForm({ customBasketItems = [], onRemoveItem, onUpdateQuantity, selectedProduct = '', onSelectedProductChange }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    ward: '',
    street: '',
    healthIssue: '',
    healthIssueOther: '',
    appointmentDate: '',
    appointmentTime: '',
    message: '',
    products: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState('');

  // Dữ liệu 34 tỉnh thành
  const cities = [
    // Miền Bắc (18 tỉnh)
    { id: 'hanoi', name: 'Hà Nội' },
    { id: 'haiphong', name: 'Hải Phòng' },
    { id: 'thainguyen', name: 'Thái Nguyên' },
    { id: 'bacninh', name: 'Bắc Ninh' },
    { id: 'bacgiang', name: 'Bắc Giang' },
    { id: 'hungyen', name: 'Hưng Yên' },
    { id: 'haiduong', name: 'Hải Dương' },
    { id: 'vinhphuc', name: 'Vĩnh Phúc' },
    { id: 'phutho', name: 'Phú Thọ' },
    { id: 'hoabinh', name: 'Hòa Bình' },
    { id: 'sonla', name: 'Sơn La' },
    { id: 'dienbien', name: 'Điện Biên' },
    { id: 'laichau', name: 'Lai Châu' },
    { id: 'laocai', name: 'Lào Cai' },
    { id: 'yenbai', name: 'Yên Bái' },
    { id: 'tuyenquang', name: 'Tuyên Quang' },
    { id: 'hagiang', name: 'Hà Giang' },
    { id: 'caobang', name: 'Cao Bằng' },
    { id: 'langson', name: 'Lạng Sơn' },
    { id: 'quangninh', name: 'Quảng Ninh' },
    { id: 'backan', name: 'Bắc Kạn' },
    
    // Miền Trung (7 tỉnh)
    { id: 'thanhhoa', name: 'Thanh Hóa' },
    { id: 'nghean', name: 'Nghệ An' },
    { id: 'hatinh', name: 'Hà Tĩnh' },
    { id: 'quangbinh', name: 'Quảng Bình' },
    { id: 'quangtri', name: 'Quảng Trị' },
    { id: 'thuathienhue', name: 'Thừa Thiên Huế' },
    { id: 'danang', name: 'Đà Nẵng' },
    
    // Miền Nam (6 tỉnh)
    { id: 'hcm', name: 'TP. Hồ Chí Minh' },
    { id: 'binhduong', name: 'Bình Dương' },
    { id: 'dongnai', name: 'Đồng Nai' },
    { id: 'baria-vungtau', name: 'Bà Rịa - Vũng Tàu' },
    { id: 'longan', name: 'Long An' },
    { id: 'tiengiang', name: 'Tiền Giang' },
    { id: 'bentre', name: 'Bến Tre' }
  ];

  // Dữ liệu quận huyện (mẫu)
  const districts = {
    hanoi: [
      { id: 'cau-giay', name: 'Quận Cầu Giấy' },
      { id: 'thanh-xuan', name: 'Quận Thanh Xuân' },
      { id: 'hoan-kiem', name: 'Quận Hoàn Kiếm' },
      { id: 'ba-dinh', name: 'Quận Ba Đình' },
      { id: 'hai-ba-trung', name: 'Quận Hai Bà Trưng' },
      { id: 'dong-da', name: 'Quận Đống Đa' },
      { id: 'tay-ho', name: 'Quận Tây Hồ' },
      { id: 'long-bien', name: 'Quận Long Biên' },
      { id: 'ha-dong', name: 'Quận Hà Đông' },
      { id: 'nam-tu-liem', name: 'Quận Nam Từ Liêm' },
      { id: 'bac-tu-liem', name: 'Quận Bắc Từ Liêm' },
      { id: 'soc-son', name: 'Huyện Sóc Sơn' },
      { id: 'dong-anh', name: 'Huyện Đông Anh' },
      { id: 'gia-lam', name: 'Huyện Gia Lâm' }
    ],
    thainguyen: [
      { id: 'tp-thainguyen', name: 'Thành phố Thái Nguyên' },
      { id: 'song-cong', name: 'Thành phố Sông Công' },
      { id: 'pho-yen', name: 'Thị xã Phổ Yên' },
      { id: 'dong-hy', name: 'Huyện Đồng Hỷ' },
      { id: 'dinh-hoa', name: 'Huyện Định Hóa' },
      { id: 'vo-nhai', name: 'Huyện Võ Nhai' },
      { id: 'phu-luong', name: 'Huyện Phú Lương' },
      { id: 'dai-tu', name: 'Huyện Đại Từ' }
    ],
    bacninh: [
      { id: 'tp-bacninh', name: 'Thành phố Bắc Ninh' },
      { id: 'tu-son', name: 'Thị xã Từ Sơn' },
      { id: 'thuan-thanh', name: 'Huyện Thuận Thành' },
      { id: 'que-vo', name: 'Huyện Quế Võ' },
      { id: 'tien-du', name: 'Huyện Tiên Du' },
      { id: 'yen-phong', name: 'Huyện Yên Phong' },
      { id: 'gia-binh', name: 'Huyện Gia Bình' },
      { id: 'luong-tai', name: 'Huyện Lương Tài' }
    ],
    hcm: [
      { id: 'q1', name: 'Quận 1' },
      { id: 'q3', name: 'Quận 3' },
      { id: 'q4', name: 'Quận 4' },
      { id: 'q5', name: 'Quận 5' },
      { id: 'q6', name: 'Quận 6' },
      { id: 'q7', name: 'Quận 7' },
      { id: 'q8', name: 'Quận 8' },
      { id: 'q10', name: 'Quận 10' },
      { id: 'q11', name: 'Quận 11' },
      { id: 'q12', name: 'Quận 12' },
      { id: 'binh-thanh', name: 'Quận Bình Thạnh' },
      { id: 'phu-nhuan', name: 'Quận Phú Nhuận' },
      { id: 'go-vap', name: 'Quận Gò Vấp' },
      { id: 'tan-binh', name: 'Quận Tân Bình' },
      { id: 'tan-phu', name: 'Quận Tân Phú' },
      { id: 'binh-tan', name: 'Quận Bình Tân' },
      { id: 'thu-duc', name: 'Thành phố Thủ Đức' },
      { id: 'hoc-mon', name: 'Huyện Hóc Môn' },
      { id: 'binh-chanh', name: 'Huyện Bình Chánh' },
      { id: 'nha-be', name: 'Huyện Nhà Bè' }
    ],
    thanhhoa: [
      { id: 'tp-thanhhoa', name: 'Thành phố Thanh Hóa' },
      { id: 'sam-son', name: 'Thành phố Sầm Sơn' },
      { id: 'nghi-son', name: 'Thị xã Nghi Sơn' },
      { id: 'hoang-hoa', name: 'Huyện Hoằng Hóa' }
    ],
    danang: [
      { id: 'hai-chau', name: 'Quận Hải Châu' },
      { id: 'thanh-khe', name: 'Quận Thanh Khê' },
      { id: 'son-tra', name: 'Quận Sơn Trà' },
      { id: 'ngu-hanh-son', name: 'Quận Ngũ Hành Sơn' },
      { id: 'lien-chieu', name: 'Quận Liên Chiểu' },
      { id: 'cam-le', name: 'Quận Cẩm Lệ' },
      { id: 'hoa-vang', name: 'Huyện Hòa Vang' }
    ]
  };

  // Dữ liệu phường xã (mẫu)
  const wards = {
    'cau-giay': [
      { id: 'dich-vong', name: 'Phường Dịch Vọng' },
      { id: 'dich-vong-hau', name: 'Phường Dịch Vọng Hậu' },
      { id: 'quan-hoa', name: 'Phường Quan Hoa' },
      { id: 'yen-hoa', name: 'Phường Yên Hòa' },
      { id: 'nghia-do', name: 'Phường Nghĩa Đô' },
      { id: 'nghia-tan', name: 'Phường Nghĩa Tân' },
      { id: 'mai-dich', name: 'Phường Mai Dịch' }
    ],
    'tp-thainguyen': [
      { id: 'phu-xa', name: 'Phường Phú Xá' },
      { id: 'quang-trung', name: 'Phường Quang Trung' },
      { id: 'phan-dinh-phung', name: 'Phường Phan Đình Phùng' },
      { id: 'tuc-duyen', name: 'Phường Túc Duyên' },
      { id: 'hoang-van-thu', name: 'Phường Hoàng Văn Thụ' },
      { id: 'trung-thanh', name: 'Xã Trung Thành' }
    ],
    'pho-yen': [
      { id: 'ba-hang', name: 'Phường Bãi Hàng' },
      { id: 'dong-tien', name: 'Xã Đông Tiến' },
      { id: 'thanh-cong', name: 'Xã Thành Công' }
    ],
    'tp-bacninh': [
      { id: 'ninh-xa', name: 'Phường Ninh Xá' },
      { id: 've-an', name: 'Phường Vệ An' },
      { id: 'suoi-hoa', name: 'Phường Suối Hoa' },
      { id: 'tien-an', name: 'Phường Tiền An' }
    ]
  };

  // Danh sách nhóm bệnh
  const healthIssues = [
    { value: 'xuong-khop', label: '🦴 NHÓM XƯƠNG KHỚP – CƠ XƯƠNG' },
    { value: 'than-kinh', label: '🧠 NHÓM THẦN KINH – TUẦN HOÀN' },
    { value: 'ho-hap', label: '🌬️ NHÓM HÔ HẤP' },
    { value: 'phuc-hoi', label: '💪 NHÓM PHỤC HỒI CHỨC NĂNG' },
    { value: 'suy-nhuoc', label: '🌱 NHÓM SUY NHƯỢC – THỂ TRẠNG' },
    { value: 'phu-nu', label: '🌸 NHÓM CHĂM SÓC PHỤ NỮ – NỘI TIẾT' },
    { value: 'khac', label: '🔹 Vấn đề khác (vui lòng ghi rõ)' }
  ];

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

  // Hàm xử lý khi chọn tỉnh/thành phố
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFormData({
      ...formData,
      city: cityId,
      district: '',
      ward: ''
    });
  };

  // Hàm xử lý khi chọn quận/huyện
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData({
      ...formData,
      district: districtId,
      ward: ''
    });
  };

  // Hàm gửi dữ liệu đến Google Sheets
  const sendToGoogleSheets = async (data) => {
    const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    
    if (!googleSheetsUrl) {
      console.warn('VITE_GOOGLE_SHEETS_URL chưa được cấu hình');
      return false;
    }

    try {
      // Lấy tên đầy đủ của địa chỉ
      const cityName = cities.find(c => c.id === data.city)?.name || '';
      const districtName = districts[data.city]?.find(d => d.id === data.district)?.name || '';
      const wardName = wards[data.district]?.find(w => w.id === data.ward)?.name || '';
      const fullAddress = `${data.street}, ${wardName}, ${districtName}, ${cityName}`.replace(/^, |, $/g, '');

      const submissionData = {
        ...data,
        timestamp: new Date().toLocaleString('vi-VN'),
        products: data.products || 'Không có sản phẩm',
        totalAmount: customBasketItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0,
        healthIssueFull: data.healthIssue === 'khac' ? `Khác: ${data.healthIssueOther}` : healthIssues.find(i => i.value === data.healthIssue)?.label || '',
        fullAddress: fullAddress
      };

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
    
    // Validate
    if (!formData.appointmentDate || !formData.appointmentTime) {
      setSubmitError('Vui lòng chọn ngày và giờ khám');
      setIsSubmitting(false);
      return;
    }

    if (!formData.healthIssue) {
      setSubmitError('Vui lòng chọn nhóm vấn đề sức khỏe');
      setIsSubmitting(false);
      return;
    }

    if (formData.healthIssue === 'khac' && !formData.healthIssueOther) {
      setSubmitError('Vui lòng ghi rõ vấn đề sức khỏe của bạn');
      setIsSubmitting(false);
      return;
    }

    if (!formData.city || !formData.district || !formData.ward || !formData.street) {
      setSubmitError('Vui lòng nhập đầy đủ địa chỉ');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const appointmentData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        city: formData.city,
        district: formData.district,
        ward: formData.ward,
        street: formData.street,
        healthIssue: formData.healthIssue,
        healthIssueOther: formData.healthIssueOther || '',
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        message: formData.message || '',
        products: formData.products || 'Không có sản phẩm',
        totalAmount: customBasketItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
      };
      
      const sent = await sendToGoogleSheets(appointmentData);
      
      if (sent) {
        const cityName = cities.find(c => c.id === formData.city)?.name || '';
        const districtName = districts[formData.city]?.find(d => d.id === formData.district)?.name || '';
        const wardName = wards[formData.district]?.find(w => w.id === formData.ward)?.name || '';
        const fullAddress = `${formData.street}, ${wardName}, ${districtName}, ${cityName}`.replace(/^, |, $/g, '');

        const healthIssueDisplay = formData.healthIssue === 'khac' 
          ? formData.healthIssueOther 
          : healthIssues.find(i => i.value === formData.healthIssue)?.label || '';

        const productInfo = customBasketItems?.length > 0 
          ? `\n\nSản phẩm đã chọn:\n${customBasketItems.map(item => 
              `• ${item.name} (SL: ${item.quantity}, Giá: ${formatPrice(item.price)}đ)`
            ).join('\n')}\nTổng tiền: ${formatPrice(appointmentData.totalAmount)}đ`
          : '';

        showSuccessNotification(
          `Đặt lịch khám thành công!\n\nThông tin lịch hẹn:\n• Họ tên: ${formData.name}\n• SĐT: ${formData.phone}\n• Địa chỉ: ${fullAddress}\n• Vấn đề: ${healthIssueDisplay}\n• Ngày: ${new Date(formData.appointmentDate).toLocaleDateString('vi-VN')}\n• Giờ: ${formData.appointmentTime}${productInfo}\n\nChúng tôi sẽ liên hệ xác nhận trong vòng 2 giờ làm việc.`
        );
        
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          district: '',
          ward: '',
          street: '',
          healthIssue: '',
          healthIssueOther: '',
          appointmentDate: '',
          appointmentTime: '',
          message: '',
          products: ''
        });

        setTimeout(() => {
          window.open(googleSheetsUrl, '_blank');
        }, 5000);
      } else {
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
    }, 60000);
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
              
              {/* Địa chỉ - Tỉnh/Thành phố và Quận/Huyện */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
  <div>
    <label htmlFor="city" className="block text-sm font-medium text-wood-700 mb-2">
      Tỉnh/Thành phố <span className="text-red-500">*</span>
    </label>
    <select
      id="city"
      name="city"
      required
      value={formData.city}
      onChange={handleCityChange}
      className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors bg-white"
    >
      <option value="">Chọn Tỉnh/Thành phố</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  </div>

  {/* Địa chỉ - Quận/Huyện */}
  {formData.city && (
    <div>
      <label htmlFor="district" className="block text-sm font-medium text-wood-700 mb-2">
        Quận/Huyện <span className="text-red-500">*</span>
      </label>
      <select
        id="district"
        name="district"
        required
        value={formData.district}
        onChange={handleDistrictChange}
        className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors bg-white"
      >
        <option value="">Chọn Quận/Huyện</option>
        {districts[formData.city]?.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>
    </div>
  )}
</div>

{/* Địa chỉ - Phường/Xã và Số nhà */}
{(formData.city && formData.district) && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
    <div>
      <label htmlFor="ward" className="block text-sm font-medium text-wood-700 mb-2">
        Phường/Xã <span className="text-red-500">*</span>
      </label>
      <select
        id="ward"
        name="ward"
        required
        value={formData.ward}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors bg-white"
      >
        <option value="">Chọn Phường/Xã</option>
        {wards[formData.district]?.map((ward) => (
          <option key={ward.id} value={ward.id}>
            {ward.name}
          </option>
        ))}
      </select>
    </div>

    {/* Địa chỉ - Số nhà, đường */}
    <div>
      <label htmlFor="street" className="block text-sm font-medium text-wood-700 mb-2">
        Số nhà, tên đường <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="street"
        name="street"
        required
        value={formData.street}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors"
        placeholder="Số nhà, tên đường"
      />
    </div>
  </div>
)}

{/* Hiển thị thông báo khi chưa chọn đủ */}
{formData.city && !formData.district && (
  <p className="text-xs text-amber-600 mt-1">
    Vui lòng chọn Quận/Huyện để tiếp tục
  </p>
)}

              {/* Vấn đề sức khỏe */}
              <div>
                <label htmlFor="healthIssue" className="block text-sm font-medium text-wood-700 mb-2">
                  Vấn đề sức khỏe cần hỗ trợ <span className="text-red-500">*</span>
                </label>
                <select
                  id="healthIssue"
                  name="healthIssue"
                  required
                  value={formData.healthIssue}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors bg-white"
                >
                  <option value="">Chọn nhóm vấn đề sức khỏe</option>
                  {healthIssues.map((issue) => (
                    <option key={issue.value} value={issue.value}>
                      {issue.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.healthIssue === 'khac' && (
                <div>
                  <label htmlFor="healthIssueOther" className="block text-sm font-medium text-wood-700 mb-2">
                    Ghi rõ vấn đề sức khỏe <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="healthIssueOther"
                    name="healthIssueOther"
                    required
                    value={formData.healthIssueOther}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 focus:border-nature-green-500 outline-none transition-colors"
                    placeholder="Nhập chi tiết vấn đề sức khỏe của bạn..."
                  />
                </div>
              )}
              
              
              {/* Ghi chú thêm */}
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
                  placeholder="Tình trạng hiện tại, có đang sử dụng phương pháp nào không?, hoặc yêu cầu đặc biệt..."
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