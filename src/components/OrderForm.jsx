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
  // Miền Bắc (21 tỉnh)
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
  // ==================== MIỀN BẮC ====================
  
  // Hà Nội - 30 quận/huyện
  hanoi: [
    { id: 'badinh', name: 'Quận Ba Đình' },
    { id: 'hoankiem', name: 'Quận Hoàn Kiếm' },
    { id: 'tayho', name: 'Quận Tây Hồ' },
    { id: 'longbien', name: 'Quận Long Biên' },
    { id: 'caugiay', name: 'Quận Cầu Giấy' },
    { id: 'dongda', name: 'Quận Đống Đa' },
    { id: 'haibatrung', name: 'Quận Hai Bà Trưng' },
    { id: 'hoangmai', name: 'Quận Hoàng Mai' },
    { id: 'thanhxuan', name: 'Quận Thanh Xuân' },
    { id: 'hadong', name: 'Quận Hà Đông' },
    { id: 'namtuliem', name: 'Quận Nam Từ Liêm' },
    { id: 'bactuliem', name: 'Quận Bắc Từ Liêm' },
    { id: 'thanhtri', name: 'Huyện Thanh Trì' },
    { id: 'gialam', name: 'Huyện Gia Lâm' },
    { id: 'donganh', name: 'Huyện Đông Anh' },
    { id: 'socson', name: 'Huyện Sóc Sơn' },
    { id: 'badinh', name: 'Huyện Ba Vì' },
    { id: 'phuc tho', name: 'Huyện Phúc Thọ' },
    { id: 'thachthat', name: 'Huyện Thạch Thất' },
    { id: 'quocoai', name: 'Huyện Quốc Oai' },
    { id: 'chuongmy', name: 'Huyện Chương Mỹ' },
    { id: 'danphuong', name: 'Huyện Đan Phượng' },
    { id: 'hoaiduc', name: 'Huyện Hoài Đức' },
    { id: 'thanh oai', name: 'Huyện Thanh Oai' },
    { id: 'myduc', name: 'Huyện Mỹ Đức' },
    { id: 'ung hoa', name: 'Huyện Ứng Hòa' },
    { id: 'thuong tin', name: 'Huyện Thường Tín' },
    { id: 'phuxuyen', name: 'Huyện Phú Xuyên' },
    { id: 'me linh', name: 'Huyện Mê Linh' },
    { id: 'sontay', name: 'Thị xã Sơn Tây' }
  ],
  
  // Hải Phòng - 15 quận/huyện
  haiphong: [
    { id: 'hongbang', name: 'Quận Hồng Bàng' },
    { id: 'lechan', name: 'Quận Lê Chân' },
    { id: 'ngoquyen', name: 'Quận Ngô Quyền' },
    { id: 'kienan', name: 'Quận Kiến An' },
    { id: 'haian', name: 'Quận Hải An' },
    { id: 'duongkinh', name: 'Quận Dương Kinh' },
    { id: 'doson', name: 'Quận Đồ Sơn' },
    { id: 'thuynguyen', name: 'Huyện Thủy Nguyên' },
    { id: 'anduong', name: 'Huyện An Dương' },
    { id: 'anlao', name: 'Huyện An Lão' },
    { id: 'kienthuy', name: 'Huyện Kiến Thụy' },
    { id: 'tienlang', name: 'Huyện Tiên Lãng' },
    { id: 'vinhbao', name: 'Huyện Vĩnh Bảo' },
    { id: 'catba', name: 'Huyện Cát Hải' },
    { id: 'bachlongvi', name: 'Huyện Bạch Long Vĩ' }
  ],
  
  // Thái Nguyên - 9 quận/huyện
  thainguyen: [
    { id: 'tpthainguyen', name: 'Thành phố Thái Nguyên' },
    { id: 'songcong', name: 'Thành phố Sông Công' },
    { id: 'phoyen', name: 'Thị xã Phổ Yên' },
    { id: 'dinhoa', name: 'Huyện Định Hóa' },
    { id: 'daitu', name: 'Huyện Đại Từ' },
    { id: 'dohung', name: 'Huyện Đồng Hỷ' },
    { id: 'vunhai', name: 'Huyện Vũ Nhai' },
    { id: 'phubinh', name: 'Huyện Phú Bình' },
    { id: 'phuluong', name: 'Huyện Phú Lương' }
  ],
  
  // Bắc Ninh - 8 quận/huyện
  bacninh: [
    { id: 'tpbacninh', name: 'Thành phố Bắc Ninh' },
    { id: 'tyson', name: 'Thị xã Từ Sơn' },
    { id: 'yenphong', name: 'Huyện Yên Phong' },
    { id: 'tiendu', name: 'Huyện Tiên Du' },
    { id: 'quegia', name: 'Huyện Quế Gia' },
    { id: 'thuanthanh', name: 'Huyện Thuận Thành' },
    { id: 'giabinh', name: 'Huyện Gia Bình' },
    { id: 'luongtai', name: 'Huyện Lương Tài' }
  ],
  
  // Bắc Giang - 10 quận/huyện
  bacgiang: [
    { id: 'tpbacgiang', name: 'Thành phố Bắc Giang' },
    { id: 'vietyen', name: 'Huyện Việt Yên' },
    { id: 'hiephoa', name: 'Huyện Hiệp Hòa' },
    { id: 'langgiang', name: 'Huyện Lạng Giang' },
    { id: 'tan hung', name: 'Huyện Tân Hưng' },
    { id: 'yendung', name: 'Huyện Yên Dũng' },
    { id: 'lucnam', name: 'Huyện Lục Nam' },
    { id: 'lucngan', name: 'Huyện Lục Ngạn' },
    { id: 'sondong', name: 'Huyện Sơn Động' },
    { id: 'tanyen', name: 'Huyện Tân Yên' }
  ],
  
  // Hưng Yên - 10 quận/huyện
  hungyen: [
    { id: 'tphungyen', name: 'Thành phố Hưng Yên' },
    { id: 'vanlam', name: 'Huyện Văn Lâm' },
    { id: 'myhao', name: 'Thị xã Mỹ Hào' },
    { id: 'yenmy', name: 'Huyện Yên Mỹ' },
    { id: 'khoaichau', name: 'Huyện Khoái Châu' },
    { id: 'antam', name: 'Huyện Ân Thi' },
    { id: 'kimdong', name: 'Huyện Kim Động' },
    { id: 'phucu', name: 'Huyện Phù Cừ' },
    { id: 'tiendong', name: 'Huyện Tiên Động' },
    { id: 'van giang', name: 'Huyện Văn Giang' }
  ],
  
  // Hải Dương - 12 quận/huyện
  haiduong: [
    { id: 'tphaiduong', name: 'Thành phố Hải Dương' },
    { id: 'chilinh', name: 'Thành phố Chí Linh' },
    { id: 'namgiang', name: 'Huyện Nam Giang' },
    { id: 'kimthanh', name: 'Huyện Kim Thành' },
    { id: 'kienxuong', name: 'Huyện Kiến Xương' },
    { id: 'gia loc', name: 'Huyện Gia Lộc' },
    { id: 'tuky', name: 'Huyện Tứ Kỳ' },
    { id: 'thanhmien', name: 'Huyện Thanh Miện' },
    { id: 'ninhgiang', name: 'Huyện Ninh Giang' },
    { id: 'camgiang', name: 'Huyện Cẩm Giàng' },
    { id: 'binhgiang', name: 'Huyện Bình Giàng' },
    { id: 'thanhha', name: 'Huyện Thanh Hà' }
  ],
  
  // Vĩnh Phúc - 9 quận/huyện
  vinhphuc: [
    { id: 'vinhyen', name: 'Thành phố Vĩnh Yên' },
    { id: 'phucyen', name: 'Thành phố Phúc Yên' },
    { id: 'binhxuyen', name: 'Huyện Bình Xuyên' },
    { id: 'laphach', name: 'Huyện Lập Thạch' },
    { id: 'tamduong', name: 'Huyện Tam Dương' },
    { id: 'tamdao', name: 'Huyện Tam Đảo' },
    { id: 'vinhtuong', name: 'Huyện Vĩnh Tường' },
    { id: 'yenlac', name: 'Huyện Yên Lạc' },
    { id: 'songlo', name: 'Huyện Sông Lô' }
  ],
  
  // Phú Thọ - 13 quận/huyện
  phutho: [
    { id: 'viettri', name: 'Thành phố Việt Trì' },
    { id: 'txphutho', name: 'Thị xã Phú Thọ' },
    { id: 'doanhung', name: 'Huyện Đoan Hùng' },
    { id: 'thanhba', name: 'Huyện Thanh Ba' },
    { id: 'hamy', name: 'Huyện Hạ My' },
    { id: 'camkhe', name: 'Huyện Cẩm Khê' },
    { id: 'yenlap', name: 'Huyện Yên Lập' },
    { id: 'thanhson', name: 'Huyện Thanh Sơn' },
    { id: 'phuninh', name: 'Huyện Phù Ninh' },
    { id: 'lamthao', name: 'Huyện Lâm Thao' },
    { id: 'tamnong', name: 'Huyện Tam Nông' },
    { id: 'thanhthuy', name: 'Huyện Thanh Thủy' },
    { id: 'tanson', name: 'Huyện Tân Sơn' }
  ],
  
  // Hòa Bình - 10 quận/huyện
  hoabinh: [
    { id: 'tphoabinh', name: 'Thành phố Hòa Bình' },
    { id: 'dabac', name: 'Huyện Đà Bắc' },
    { id: 'luongson', name: 'Huyện Lương Sơn' },
    { id: 'kimboi', name: 'Huyện Kim Bôi' },
    { id: 'tanlac', name: 'Huyện Tân Lạc' },
    { id: 'maichau', name: 'Huyện Mai Châu' },
    { id: 'lacson', name: 'Huyện Lạc Sơn' },
    { id: 'yenthuy', name: 'Huyện Yên Thủy' },
    { id: 'lacthuy', name: 'Huyện Lạc Thủy' },
    { id: 'caonguyen', name: 'Huyện Cao Nguyên' }
  ],
  
  // Sơn La - 12 quận/huyện
  sonla: [
    { id: 'tpsonla', name: 'Thành phố Sơn La' },
    { id: 'quynhnhai', name: 'Huyện Quỳnh Nhai' },
    { id: 'muongla', name: 'Huyện Mường La' },
    { id: 'thuanchau', name: 'Huyện Thuận Châu' },
    { id: 'bacnhat', name: 'Huyện Bắc Nhật' },
    { id: 'maison', name: 'Huyện Mai Sơn' },
    { id: 'songma', name: 'Huyện Sông Mã' },
    { id: 'yenchau', name: 'Huyện Yên Châu' },
    { id: 'muonglo', name: 'Huyện Mường Lò' },
    { id: 'phuyen', name: 'Huyện Phù Yên' },
    { id: 'quynhnhai', name: 'Huyện Quỳnh Nhai' },
    { id: 'muongte', name: 'Huyện Mường Tè' }
  ],
  
  // Điện Biên - 10 quận/huyện
  dienbien: [
    { id: 'tpdienbien', name: 'Thành phố Điện Biên Phủ' },
    { id: 'munglay', name: 'Thị xã Mường Lay' },
    { id: 'dienbien', name: 'Huyện Điện Biên' },
    { id: 'dienbiendong', name: 'Huyện Điện Biên Đông' },
    { id: 'muongnhe', name: 'Huyện Mường Nhé' },
    { id: 'muongcha', name: 'Huyện Mường Chà' },
    { id: 'tuagiao', name: 'Huyện Tuần Giáo' },
    { id: 'tuanhuy', name: 'Huyện Tủa Chùa' },
    { id: 'muongang', name: 'Huyện Mường Ảng' },
    { id: 'nampho', name: 'Huyện Nậm Pồ' }
  ],
  
  // Lai Châu - 8 quận/huyện
  laichau: [
    { id: 'tplaichau', name: 'Thành phố Lai Châu' },
    { id: 'tamduong', name: 'Huyện Tam Đường' },
    { id: 'phongtho', name: 'Huyện Phong Thổ' },
    { id: 'sinho', name: 'Huyện Sìn Hồ' },
    { id: 'muongte', name: 'Huyện Mường Tè' },
    { id: 'namnham', name: 'Huyện Nậm Nhùn' },
    { id: 'thanuyen', name: 'Huyện Than Uyên' },
    { id: 'tanuyen', name: 'Huyện Tân Uyên' }
  ],
  
  // Lào Cai - 9 quận/huyện
  laocai: [
    { id: 'tplaocai', name: 'Thành phố Lào Cai' },
    { id: 'sapa', name: 'Thị xã Sa Pa' },
    { id: 'baothang', name: 'Huyện Bảo Thắng' },
    { id: 'baoyen', name: 'Huyện Bảo Yên' },
    { id: 'batxat', name: 'Huyện Bát Xát' },
    { id: 'bacan', name: 'Huyện Bắc Cạn' },
    { id: 'muongkhuong', name: 'Huyện Mường Khương' },
    { id: 'simaicai', name: 'Huyện Si Ma Cai' },
    { id: 'vanban', name: 'Huyện Văn Bàn' }
  ],
  
  // Yên Bái - 9 quận/huyện
  yenbai: [
    { id: 'tpyenbai', name: 'Thành phố Yên Bái' },
    { id: 'nghialo', name: 'Thị xã Nghĩa Lộ' },
    { id: 'lucngan', name: 'Huyện Lục Ngạn' },
    { id: 'vanchan', name: 'Huyện Văn Chấn' },
    { id: 'vanyen', name: 'Huyện Văn Yên' },
    { id: 'muongte', name: 'Huyện Mường Tè' },
    { id: 'tramtau', name: 'Huyện Trạm Tấu' },
    { id: 'tranyen', name: 'Huyện Trấn Yên' },
    { id: 'yenbinh', name: 'Huyện Yên Bình' }
  ],
  
  // Tuyên Quang - 7 quận/huyện
  tuyenquang: [
    { id: 'tptuyenquang', name: 'Thành phố Tuyên Quang' },
    { id: 'nahang', name: 'Huyện Na Hang' },
    { id: 'chiemhoa', name: 'Huyện Chiêm Hóa' },
    { id: 'hamyen', name: 'Huyện Hàm Yên' },
    { id: 'yenson', name: 'Huyện Yên Sơn' },
    { id: 'sonduong', name: 'Huyện Sơn Dương' },
    { id: 'lamthach', name: 'Huyện Lâm Thạch' }
  ],
  
  // Hà Giang - 11 quận/huyện
  hagiang: [
    { id: 'tphagiang', name: 'Thành phố Hà Giang' },
    { id: 'dongvan', name: 'Huyện Đồng Văn' },
    { id: 'meovac', name: 'Huyện Mèo Vạc' },
    { id: 'yenminh', name: 'Huyện Yên Minh' },
    { id: 'quangba', name: 'Huyện Quảng Bạ' },
    { id: 'vinhthuy', name: 'Huyện Vĩnh Thủy' },
    { id: 'bacme', name: 'Huyện Bắc Mê' },
    { id: 'hoangsuphi', name: 'Huyện Hoàng Su Phì' },
    { id: 'xaman', name: 'Huyện Xà Mần' },
    { id: 'bacquang', name: 'Huyện Bắc Quang' },
    { id: 'quangbinh', name: 'Huyện Quang Bình' }
  ],
  
  // Cao Bằng - 13 quận/huyện
  caobang: [
    { id: 'tpcaobang', name: 'Thành phố Cao Bằng' },
    { id: 'baolac', name: 'Huyện Bảo Lạc' },
    { id: 'thongnong', name: 'Huyện Thông Nông' },
    { id: 'halang', name: 'Huyện Hà Lang' },
    { id: 'tralinh', name: 'Huyện Trà Lĩnh' },
    { id: 'trungnguyen', name: 'Huyện Trùng Nguyên' },
    { id: 'nguyenbinh', name: 'Huyện Nguyên Bình' },
    { id: 'hoaan', name: 'Huyện Hòa An' },
    { id: 'quanguyen', name: 'Huyện Quảng Nguyên' },
    { id: 'thachan', name: 'Huyện Thạch An' },
    { id: 'haquang', name: 'Huyện Hà Quảng' },
    { id: 'baolam', name: 'Huyện Bảo Lâm' },
    { id: 'phuchoa', name: 'Huyện Phục Hòa' }
  ],
  
  // Lạng Sơn - 11 quận/huyện
  langson: [
    { id: 'tplangson', name: 'Thành phố Lạng Sơn' },
    { id: 'trangdinh', name: 'Huyện Tràng Định' },
    { id: 'vanlang', name: 'Huyện Văn Lãng' },
    { id: 'vanquan', name: 'Huyện Văn Quan' },
    { id: 'binhgia', name: 'Huyện Bình Gia' },
    { id: 'bacson', name: 'Huyện Bắc Sơn' },
    { id: 'huhung', name: 'Huyện Hữu Hưng' },
    { id: 'chilang', name: 'Huyện Chi Lăng' },
    { id: 'caoloc', name: 'Huyện Cao Lộc' },
    { id: 'locbinh', name: 'Huyện Lộc Bình' },
    { id: 'dinhlap', name: 'Huyện Đình Lập' }
  ],
  
  // Quảng Ninh - 14 quận/huyện
  quangninh: [
    { id: 'halong', name: 'Thành phố Hạ Long' },
    { id: 'campha', name: 'Thành phố Cẩm Phả' },
    { id: 'uongbi', name: 'Thành phố Uông Bí' },
    { id: 'mongcai', name: 'Thành phố Móng Cái' },
    { id: 'quangyen', name: 'Thị xã Quảng Yên' },
    { id: 'dongtrieu', name: 'Thị xã Đông Triều' },
    { id: 'binhlieu', name: 'Huyện Bình Liêu' },
    { id: 'damha', name: 'Huyện Đầm Hà' },
    { id: 'haiduong', name: 'Huyện Hải Dương' },
    { id: 'tienyen', name: 'Huyện Tiên Yên' },
    { id: 'bache', name: 'Huyện Ba Chẽ' },
    { id: 'vanhon', name: 'Huyện Vân Hồ' },
    { id: 'co to', name: 'Huyện Cô Tô' },
    { id: 'hoanhbo', name: 'Huyện Hoành Bồ' }
  ],
  
  // Bắc Kạn - 8 quận/huyện
  backan: [
    { id: 'tpbackan', name: 'Thành phố Bắc Kạn' },
    { id: 'chodon', name: 'Huyện Chợ Đồn' },
    { id: 'bachthong', name: 'Huyện Bạch Thông' },
    { id: 'namdu', name: 'Huyện Nam Dư' },
    { id: 'nganson', name: 'Huyện Ngân Sơn' },
    { id: 'ba bang', name: 'Huyện Ba Bể' },
    { id: 'chomoi', name: 'Huyện Chợ Mới' },
    { id: 'pacnam', name: 'Huyện Pác Nặm' }
  ],
  
  // ==================== MIỀN TRUNG ====================
  
  // Thanh Hóa - 27 quận/huyện
  thanhhoa: [
    { id: 'tpthanhhoa', name: 'Thành phố Thanh Hóa' },
    { id: 'samson', name: 'Thành phố Sầm Sơn' },
    { id: 'bimson', name: 'Thị xã Bỉm Sơn' },
    { id: 'nghison', name: 'Thị xã Nghi Sơn' },
    { id: 'quanhoa', name: 'Huyện Quan Hóa' },
    { id: 'quanson', name: 'Huyện Quan Sơn' },
    { id: 'muonglat', name: 'Huyện Mường Lát' },
    { id: 'baothuoc', name: 'Huyện Bảo Thược' },
    { id: 'thuongxuan', name: 'Huyện Thường Xuân' },
    { id: 'ngaloc', name: 'Huyện Ngã Lộc' },
    { id: 'thachthanh', name: 'Huyện Thạch Thành' },
    { id: 'vinhloc', name: 'Huyện Vĩnh Lộc' },
    { id: 'thoxuan', name: 'Huyện Thọ Xuân' },
    { id: 'trieuson', name: 'Huyện Triệu Sơn' },
    { id: 'thieutrung', name: 'Huyện Thiệu Trung' },
    { id: 'langchanh', name: 'Huyện Lang Chánh' },
    { id: 'ngoctac', name: 'Huyện Ngọc Tặc' },
    { id: 'camthuy', name: 'Huyện Cẩm Thủy' },
    { id: 'hatrung', name: 'Huyện Hà Trung' },
    { id: 'hadong', name: 'Huyện Hà Đông' },
    { id: 'nongcong', name: 'Huyện Nông Cống' },
    { id: 'tinhgia', name: 'Huyện Tĩnh Gia' },
    { id: 'dongson', name: 'Huyện Đông Sơn' },
    { id: 'quangxuong', name: 'Huyện Quảng Xương' },
    { id: 'thoxuan', name: 'Huyện Thọ Xuân' },
    { id: 'yenphong', name: 'Huyện Yên Phong' },
    { id: 'nhu xuân', name: 'Huyện Như Xuân' }
  ],
  
  // Nghệ An - 21 quận/huyện
  nghean: [
    { id: 'tpvinh', name: 'Thành phố Vinh' },
    { id: 'cualo', name: 'Thị xã Cửa Lò' },
    { id: 'thaixuan', name: 'Thị xã Thái Xuân' },
    { id: 'hoangmai', name: 'Thị xã Hoàng Mai' },
    { id: 'que phong', name: 'Huyện Quế Phong' },
    { id: 'quychau', name: 'Huyện Quỳ Châu' },
    { id: 'quyhop', name: 'Huyện Quỳ Hợp' },
    { id: 'nghiadan', name: 'Huyện Nghĩa Đàn' },
    { id: 'quynhluu', name: 'Huyện Quỳnh Lưu' },
    { id: 'yen thanh', name: 'Huyện Yên Thành' },
    { id: 'dienchau', name: 'Huyện Diễn Châu' },
    { id: 'anhson', name: 'Huyện Anh Sơn' },
    { id: 'tanky', name: 'Huyện Tân Kỳ' },
    { id: 'thanhchuong', name: 'Huyện Thanh Chương' },
    { id: 'concuong', name: 'Huyện Con Cuông' },
    { id: 'tungduong', name: 'Huyện Tương Dương' },
    { id: 'kyson', name: 'Huyện Kỳ Sơn' },
    { id: 'hnguyen', name: 'Huyện Hưng Nguyên' },
    { id: 'namdan', name: 'Huyện Nam Đàn' },
    { id: 'dothanh', name: 'Huyện Đô Thành' },
    { id: 'nghi loc', name: 'Huyện Nghi Lộc' }
  ],
  
  // Hà Tĩnh - 13 quận/huyện
  hatinh: [
    { id: 'tphatinh', name: 'Thành phố Hà Tĩnh' },
    { id: 'honglinh', name: 'Thị xã Hồng Lĩnh' },
    { id: 'nghexuan', name: 'Huyện Nghi Xuân' },
    { id: 'ductho', name: 'Huyện Đức Thọ' },
    { id: 'hnguyen', name: 'Huyện Hưng Nguyên' },
    { id: 'canloc', name: 'Huyện Can Lộc' },
    { id: 'thachha', name: 'Huyện Thạch Hà' },
    { id: 'camxuyen', name: 'Huyện Cẩm Xuyên' },
    { id: 'ky anh', name: 'Huyện Kỳ Anh' },
    { id: 'vuquang', name: 'Huyện Vũ Quang' },
    { id: 'huongson', name: 'Huyện Hương Sơn' },
    { id: 'huongkhe', name: 'Huyện Hương Khê' },
    { id: 'loc ha', name: 'Huyện Lộc Hà' }
  ],
  
  // Quảng Bình - 8 quận/huyện
  quangbinh: [
    { id: 'tpdonghoi', name: 'Thành phố Đồng Hới' },
    { id: 'tuyenhoa', name: 'Huyện Tuyên Hóa' },
    { id: 'minhhoa', name: 'Huyện Minh Hóa' },
    { id: 'quangninh', name: 'Huyện Quảng Ninh' },
    { id: 'bachtrach', name: 'Huyện Bạch Trạch' },
    { id: 'quangtrach', name: 'Huyện Quảng Trạch' },
    { id: 'leduy', name: 'Huyện Lệ Duy' },
    { id: 'donghai', name: 'Huyện Đông Hải' }
  ],
  
  // Quảng Trị - 10 quận/huyện
  quangtri: [
    { id: 'tpdongha', name: 'Thành phố Đông Hà' },
    { id: 'quangtri', name: 'Thị xã Quảng Trị' },
    { id: 'vientu', name: 'Huyện Vĩnh Tú' },
    { id: 'hailang', name: 'Huyện Hải Lăng' },
    { id: 'gio linh', name: 'Huyện Gio Linh' },
    { id: 'camlo', name: 'Huyện Cam Lộ' },
    { id: 'trieuphong', name: 'Huyện Triệu Phong' },
    { id: 'dakrong', name: 'Huyện Đa Krông' },
    { id: 'huonghoa', name: 'Huyện Hướng Hóa' },
    { id: 'conco', name: 'Huyện Cồn Cỏ' }
  ],
  
  // Thừa Thiên Huế - 9 quận/huyện
  thuathienhue: [
    { id: 'tphue', name: 'Thành phố Huế' },
    { id: 'huongthuy', name: 'Thị xã Hương Thủy' },
    { id: 'huongtra', name: 'Thị xã Hương Trà' },
    { id: 'phongdien', name: 'Huyện Phong Điền' },
    { id: 'quangdien', name: 'Huyện Quảng Điền' },
    { id: 'phuvang', name: 'Huyện Phú Vang' },
    { id: 'phuloc', name: 'Huyện Phú Lộc' },
    { id: 'a luoi', name: 'Huyện A Lưới' },
    { id: 'nambay', name: 'Huyện Nam Đông' }
  ],
  
  // Đà Nẵng - 8 quận/huyện
  danang: [
    { id: 'haichau', name: 'Quận Hải Châu' },
    { id: 'thanhkhe', name: 'Quận Thanh Khê' },
    { id: 'son tra', name: 'Quận Sơn Trà' },
    { id: 'nguhanhson', name: 'Quận Ngũ Hành Sơn' },
    { id: 'lienchieu', name: 'Quận Liên Chiểu' },
    { id: 'cam le', name: 'Quận Cẩm Lệ' },
    { id: 'hoavang', name: 'Huyện Hòa Vang' },
    { id: 'hoangsa', name: 'Huyện Hoàng Sa' }
  ],
  
  // ==================== MIỀN NAM ====================
  
  // TP. Hồ Chí Minh - 24 quận/huyện
  hcm: [
    { id: 'quan1', name: 'Quận 1' },
    { id: 'quan2', name: 'Quận 2' },
    { id: 'quan3', name: 'Quận 3' },
    { id: 'quan4', name: 'Quận 4' },
    { id: 'quan5', name: 'Quận 5' },
    { id: 'quan6', name: 'Quận 6' },
    { id: 'quan7', name: 'Quận 7' },
    { id: 'quan8', name: 'Quận 8' },
    { id: 'quan9', name: 'Quận 9' },
    { id: 'quan10', name: 'Quận 10' },
    { id: 'quan11', name: 'Quận 11' },
    { id: 'quan12', name: 'Quận 12' },
    { id: 'thuduc', name: 'Quận Thủ Đức' },
    { id: 'go vap', name: 'Quận Gò Vấp' },
    { id: 'binh thanh', name: 'Quận Bình Thạnh' },
    { id: 'tan binh', name: 'Quận Tân Bình' },
    { id: 'tan phu', name: 'Quận Tân Phú' },
    { id: 'phunhuan', name: 'Quận Phú Nhuận' },
    { id: 'binh tan', name: 'Quận Bình Tân' },
    { id: 'cu chi', name: 'Huyện Củ Chi' },
    { id: 'hoc mon', name: 'Huyện Hóc Môn' },
    { id: 'binh chanh', name: 'Huyện Bình Chánh' },
    { id: 'nha be', name: 'Huyện Nhà Bè' },
    { id: 'can gio', name: 'Huyện Cần Giờ' }
  ],
  
  // Bình Dương - 9 quận/huyện
  binhduong: [
    { id: 'thudaumot', name: 'Thành phố Thủ Dầu Một' },
    { id: 'thuanan', name: 'Thành phố Thuận An' },
    { id: 'dian', name: 'Thành phố Dĩ An' },
    { id: 'bencat', name: 'Thị xã Bến Cát' },
    { id: 'tanuyen', name: 'Thị xã Tân Uyên' },
    { id: 'phugiao', name: 'Huyện Phú Giáo' },
    { id: 'dauteng', name: 'Huyện Dầu Tiếng' },
    { id: 'bau bang', name: 'Huyện Bàu Bàng' },
    { id: 'bac tanuyen', name: 'Huyện Bắc Tân Uyên' }
  ],
  
  // Đồng Nai - 11 quận/huyện
  dongnai: [
    { id: 'bienhoa', name: 'Thành phố Biên Hòa' },
    { id: 'longkhanh', name: 'Thành phố Long Khánh' },
    { id: 'tanphu', name: 'Huyện Tân Phú' },
    { id: 'dinhtuyen', name: 'Huyện Định Tuyến' },
    { id: 'vinhcuu', name: 'Huyện Vĩnh Cửu' },
    { id: 'thongnhat', name: 'Huyện Thống Nhất' },
    { id: 'trang bom', name: 'Huyện Trảng Bom' },
    { id: 'nhontrach', name: 'Huyện Nhơn Trạch' },
    { id: 'longthanh', name: 'Huyện Long Thành' },
    { id: 'cammy', name: 'Huyện Cẩm Mỹ' },
    { id: 'xuanloc', name: 'Huyện Xuân Lộc' }
  ],
  
  // Bà Rịa - Vũng Tàu - 8 quận/huyện
  'baria-vungtau': [
    { id: 'vungtau', name: 'Thành phố Vũng Tàu' },
    { id: 'baria', name: 'Thành phố Bà Rịa' },
    { id: 'phumy', name: 'Thị xã Phú Mỹ' },
    { id: 'chauduc', name: 'Huyện Châu Đức' },
    { id: 'xuyenmoc', name: 'Huyện Xuyên Mộc' },
    { id: 'longdien', name: 'Huyện Long Điền' },
    { id: 'datdo', name: 'Huyện Đất Đỏ' },
    { id: 'con dao', name: 'Huyện Côn Đảo' }
  ],
  
  // Long An - 15 quận/huyện
  longan: [
    { id: 'tplongan', name: 'Thành phố Long An' },
    { id: 'kientuong', name: 'Thị xã Kiến Tường' },
    { id: 'dientho', name: 'Huyện Điện Thọ' },
    { id: 'duchoa', name: 'Huyện Đức Hòa' },
    { id: 'bencau', name: 'Huyện Bến Cầu' },
    { id: 'chau thanh', name: 'Huyện Châu Thành' },
    { id: 'tan hung', name: 'Huyện Tân Hưng' },
    { id: 'tan thanh', name: 'Huyện Tân Thạnh' },
    { id: 'tan tru', name: 'Huyện Tân Trụ' },
    { id: 'can duoc', name: 'Huyện Cần Đước' },
    { id: 'can giuoc', name: 'Huyện Cần Giuộc' },
    { id: 'thu thua', name: 'Huyện Thủ Thừa' },
    { id: 'vinh hung', name: 'Huyện Vĩnh Hưng' },
    { id: 'moc hoa', name: 'Huyện Mộc Hóa' },
    { id: 'thanh hoa', name: 'Huyện Thanh Hóa' }
  ],
  
  // Tiền Giang - 11 quận/huyện
  tiengiang: [
    { id: 'tpmytho', name: 'Thành phố Mỹ Tho' },
    { id: 'gocong', name: 'Thị xã Gò Công' },
    { id: 'caibay', name: 'Huyện Cái Bày' },
    { id: 'chauthanh', name: 'Huyện Châu Thành' },
    { id: 'cho gao', name: 'Huyện Chợ Gạo' },
    { id: 'gocong dong', name: 'Huyện Gò Công Đông' },
    { id: 'gocong tay', name: 'Huyện Gò Công Tây' },
    { id: 'tan phuoc', name: 'Huyện Tân Phước' },
    { id: 'tanphudong', name: 'Huyện Tân Phú Đông' },
    { id: 'caibe', name: 'Huyện Cái Bè' },
    { id: 'caolang', name: 'Huyện Cao Lãnh' }
  ],
  
  // Bến Tre - 9 quận/huyện
  bentre: [
    { id: 'tpbentre', name: 'Thành phố Bến Tre' },
    { id: 'chauthanh', name: 'Huyện Châu Thành' },
    { id: 'cholon', name: 'Huyện Chợ Lách' },
    { id: 'mocay', name: 'Huyện Mỏ Cày' },
    { id: 'giong trom', name: 'Huyện Giồng Trôm' },
    { id: 'binh dai', name: 'Huyện Bình Đại' },
    { id: 'ba tri', name: 'Huyện Ba Tri' },
    { id: 'thanh phu', name: 'Huyện Thạnh Phú' },
    { id: 'mocay nam', name: 'Huyện Mỏ Cày Nam' }
  ]
};

// Dữ liệu phường xã đầy đủ cho 34 tỉnh thành
const wards = {
  // ==================== HÀ NỘI ====================
  
  // Quận Ba Đình
  badinh: [
    { id: 'phucxuyen', name: 'Phường Phúc Xá' },
    { id: 'ngocha', name: 'Phường Ngọc Hà' },
    { id: 'ngocthanh', name: 'Phường Ngọc Thành' },
    { id: 'dienbien', name: 'Phường Điện Biên' },
    { id: 'doican', name: 'Phường Đội Cấn' },
    { id: 'kimma', name: 'Phường Kim Mã' },
    { id: 'giangvo', name: 'Phường Giảng Võ' },
    { id: 'thanhcong', name: 'Phường Thành Công' },
    { id: 'congvi', name: 'Phường Cống Vị' },
    { id: 'lieugiai', name: 'Phường Liễu Giai' },
    { id: 'vinhphuc', name: 'Phường Vĩnh Phúc' },
    { id: 'trucbach', name: 'Phường Trúc Bạch' },
    { id: 'quanthanh', name: 'Phường Quán Thánh' }
  ],
  
  // Quận Hoàn Kiếm
  hoankiem: [
    { id: 'hangbac', name: 'Phường Hàng Bạc' },
    { id: 'hangdao', name: 'Phường Hàng Đào' },
    { id: 'hangbuom', name: 'Phường Hàng Buồm' },
    { id: 'hangbo', name: 'Phường Hàng Bồ' },
    { id: 'hangma', name: 'Phường Hàng Mã' },
    { id: 'hanggai', name: 'Phường Hàng Gai' },
    { id: 'hangtrong', name: 'Phường Hàng Trống' },
    { id: 'cuadong', name: 'Phường Cửa Đông' },
    { id: 'cuanam', name: 'Phường Cửa Nam' },
    { id: 'lythuongkiet', name: 'Phường Lý Thường Kiệt' },
    { id: 'hangbai', name: 'Phường Hàng Bài' },
    { id: 'hangbe', name: 'Phường Hàng Bè' },
    { id: 'hangkhay', name: 'Phường Hàng Khay' },
    { id: 'hangchong', name: 'Phường Hàng Chồng' }
  ],
  
  // Quận Tây Hồ
  tayho: [
    { id: 'buoi', name: 'Phường Bưởi' },
    { id: 'thuykhue', name: 'Phường Thụy Khuê' },
    { id: 'yenphu', name: 'Phường Yên Phụ' },
    { id: 'tulien', name: 'Phường Tứ Liên' },
    { id: 'nhattan', name: 'Phường Nhật Tân' },
    { id: 'quangan', name: 'Phường Quảng An' },
    { id: 'xuanla', name: 'Phường Xuân La' },
    { id: 'phuthuong', name: 'Phường Phú Thượng' }
  ],
  
  // Quận Long Biên
  longbien: [
    { id: 'ngocthuy', name: 'Phường Ngọc Thụy' },
    { id: 'ngoclam', name: 'Phường Ngọc Lâm' },
    { id: 'boede', name: 'Phường Bồ Đề' },
    { id: 'cuakhong', name: 'Phường Cự Khối' },
    { id: 'gia thuy', name: 'Phường Gia Thụy' },
    { id: 'duc giang', name: 'Phường Đức Giang' },
    { id: 'viet hung', name: 'Phường Việt Hưng' },
    { id: 'sai dong', name: 'Phường Sài Đồng' },
    { id: 'thach ban', name: 'Phường Thạch Bàn' },
    { id: 'phuc dong', name: 'Phường Phúc Đồng' },
    { id: 'phuc loi', name: 'Phường Phúc Lợi' },
    { id: 'longbien', name: 'Phường Long Biên' },
    { id: 'giang bien', name: 'Phường Giang Biên' },
    { id: 'thuong thanh', name: 'Phường Thượng Thanh' }
  ],
  
  // Quận Cầu Giấy
  caugiay: [
    { id: 'nghiadol', name: 'Phường Nghĩa Đô' },
    { id: 'nghiatan', name: 'Phường Nghĩa Tân' },
    { id: 'maidich', name: 'Phường Mai Dịch' },
    { id: 'dichvong', name: 'Phường Dịch Vọng' },
    { id: 'dichvonghau', name: 'Phường Dịch Vọng Hậu' },
    { id: 'quanhoa', name: 'Phường Quan Hoa' },
    { id: 'yenhoa', name: 'Phường Yên Hòa' },
    { id: 'trunghoa', name: 'Phường Trung Hòa' }
  ],
  
  // Quận Đống Đa
  dongda: [
    { id: 'catlinh', name: 'Phường Cát Linh' },
    { id: 'hangbong', name: 'Phường Hàng Bột' },
    { id: 'khammthien', name: 'Phường Khâm Thiên' },
    { id: 'phuongmai', name: 'Phường Phương Mai' },
    { id: 'quoc tu giam', name: 'Phường Quốc Tử Giám' },
    { id: 'thinhquang', name: 'Phường Thịnh Quang' },
    { id: 'trungphung', name: 'Phường Trung Phụng' },
    { id: 'trunglieu', name: 'Phường Trung Liệt' },
    { id: 'trungtu', name: 'Phường Trung Tự' },
    { id: 'vanchuong', name: 'Phường Văn Chương' },
    { id: 'vanmieu', name: 'Phường Văn Miếu' },
    { id: 'langthuong', name: 'Phường Láng Thượng' },
    { id: 'langha', name: 'Phường Láng Hạ' },
    { id: 'kimlien', name: 'Phường Kim Liên' },
    { id: 'othocho', name: 'Phường Ô Chợ Dừa' },
    { id: 'namdong', name: 'Phường Nam Đồng' },
    { id: 'quangtrung', name: 'Phường Quang Trung' },
    { id: 'tho quan', name: 'Phường Thổ Quan' },
    { id: 'vanchuong', name: 'Phường Văn Chương' }
  ],
  
  // Quận Hai Bà Trưng
  haibatrung: [
    { id: 'bachkhoa', name: 'Phường Bách Khoa' },
    { id: 'bachdang', name: 'Phường Bạch Đằng' },
    { id: 'bachmai', name: 'Phường Bạch Mai' },
    { id: 'buiductai', name: 'Phường Bùi Đức Tài' },
    { id: 'cau den', name: 'Phường Cầu Dền' },
    { id: 'dong mac', name: 'Phường Đống Mác' },
    { id: 'dongnhan', name: 'Phường Đồng Nhân' },
    { id: 'dongtam', name: 'Phường Đồng Tâm' },
    { id: 'le dai hanh', name: 'Phường Lê Đại Hành' },
    { id: 'minhkhai', name: 'Phường Minh Khai' },
    { id: 'nguyendu', name: 'Phường Nguyễn Du' },
    { id: 'pham dinh ho', name: 'Phường Phạm Đình Hổ' },
    { id: 'phohue', name: 'Phường Phố Huế' },
    { id: 'quynhloi', name: 'Phường Quỳnh Lôi' },
    { id: 'quynhmai', name: 'Phường Quỳnh Mai' },
    { id: 'thanhluong', name: 'Phường Thanh Lương' },
    { id: 'thanhnhan', name: 'Phường Thanh Nhàn' },
    { id: 'truongdinh', name: 'Phường Trương Định' },
    { id: 'vinhtuy', name: 'Phường Vĩnh Tuy' }
  ],
  
  // Quận Hoàng Mai
  hoangmai: [
    { id: 'dai kim', name: 'Phường Đại Kim' },
    { id: 'dinh cong', name: 'Phường Định Công' },
    { id: 'giang bien', name: 'Phường Giang Biên' },
    { id: 'hoang liet', name: 'Phường Hoàng Liệt' },
    { id: 'hoang van thu', name: 'Phường Hoàng Văn Thụ' },
    { id: 'linh nam', name: 'Phường Linh Nam' },
    { id: 'mai dong', name: 'Phường Mai Động' },
    { id: 'tan mai', name: 'Phường Tân Mai' },
    { id: 'thanh tri', name: 'Phường Thanh Trì' },
    { id: 'thinh liet', name: 'Phường Thịnh Liệt' },
    { id: 'truong dinh', name: 'Phường Trương Định' },
    { id: 'tuong mai', name: 'Phường Tương Mai' },
    { id: 'vinh hung', name: 'Phường Vĩnh Hưng' },
    { id: 'yen so', name: 'Phường Yên Sở' }
  ],
  
  // Quận Thanh Xuân
  thanhxuan: [
    { id: 'ha dinh', name: 'Phường Hạ Đình' },
    { id: 'khuong dinh', name: 'Phường Khương Đình' },
    { id: 'khuong mai', name: 'Phường Khương Mai' },
    { id: 'khuong trung', name: 'Phường Khương Trung' },
    { id: 'nhan chinh', name: 'Phường Nhân Chính' },
    { id: 'phuong liet', name: 'Phường Phương Liệt' },
    { id: 'thanh xuan bac', name: 'Phường Thanh Xuân Bắc' },
    { id: 'thanh xuan nam', name: 'Phường Thanh Xuân Nam' },
    { id: 'thanh xuan trung', name: 'Phường Thanh Xuân Trung' },
    { id: 'thuong dinh', name: 'Phường Thượng Đình' },
    { id: 'kim giang', name: 'Phường Kim Giang' }
  ],
  
  // Quận Hà Đông
  hadong: [
    { id: 'bien giang', name: 'Phường Biên Giang' },
    { id: 'duong noi', name: 'Phường Dương Nội' },
    { id: 'dong mai', name: 'Phường Đồng Mai' },
    { id: 'ha cau', name: 'Phường Hà Cầu' },
    { id: 'kien hung', name: 'Phường Kiến Hưng' },
    { id: 'la khe', name: 'Phường La Khê' },
    { id: 'mo lao', name: 'Phường Mộ Lao' },
    { id: 'nguyen trai', name: 'Phường Nguyễn Trãi' },
    { id: 'phuc la', name: 'Phường Phúc La' },
    { id: 'phu la', name: 'Phường Phú La' },
    { id: 'phu luong', name: 'Phường Phú Lương' },
    { id: 'phuc la', name: 'Phường Phúc La' },
    { id: 'quang trung', name: 'Phường Quang Trung' },
    { id: 'van phuc', name: 'Phường Vạn Phúc' },
    { id: 'van quang', name: 'Phường Văn Quán' },
    { id: 'yen nghia', name: 'Phường Yên Nghĩa' },
    { id: 'yen phuc', name: 'Phường Yết Kiêu' }
  ],
  
  // Quận Nam Từ Liêm
  namtuliem: [
    { id: 'cau dien', name: 'Phường Cầu Diễn' },
    { id: 'dai mo', name: 'Phường Đại Mỗ' },
    { id: 'me tri', name: 'Phường Mễ Trì' },
    { id: 'my dinh 1', name: 'Phường Mỹ Đình 1' },
    { id: 'my dinh 2', name: 'Phường Mỹ Đình 2' },
    { id: 'phu do', name: 'Phường Phú Đô' },
    { id: 'phuong canh', name: 'Phường Phương Canh' },
    { id: 'tay mo', name: 'Phường Tây Mỗ' },
    { id: 'trung van', name: 'Phường Trung Văn' },
    { id: 'xuan phuong', name: 'Phường Xuân Phương' }
  ],
  
  // Quận Bắc Từ Liêm
  bactuliem: [
    { id: 'co nhue 1', name: 'Phường Cổ Nhuế 1' },
    { id: 'co nhue 2', name: 'Phường Cổ Nhuế 2' },
    { id: 'dong ngac', name: 'Phường Đông Ngạc' },
    { id: 'duc thang', name: 'Phường Đức Thắng' },
    { id: 'lien mac', name: 'Phường Liên Mạc' },
    { id: 'minh khai', name: 'Phường Minh Khai' },
    { id: 'phu dien', name: 'Phường Phú Diễn' },
    { id: 'phuc dien', name: 'Phường Phúc Diễn' },
    { id: 'tan hung', name: 'Phường Tân Hưng' },
    { id: 'thuong cat', name: 'Phường Thượng Cát' },
    { id: 'thuy phuong', name: 'Phường Thụy Phương' },
    { id: 'xuan dinh', name: 'Phường Xuân Đỉnh' },
    { id: 'xuan tao', name: 'Phường Xuân Tảo' }
  ],
  
  // Huyện Thanh Trì
  thanhtri: [
    { id: 'dai ang', name: 'Xã Đại Áng' },
    { id: 'dong my', name: 'Xã Đông Mỹ' },
    { id: 'duyen ha', name: 'Xã Duyên Hà' },
    { id: 'hieu giang', name: 'Xã Hiệu Giang' },
    { id: 'hoang dong', name: 'Xã Hoàng Động' },
    { id: 'hoang lieu', name: 'Xã Hoàng Liệt' },
    { id: 'huu hoa', name: 'Xã Hữu Hòa' },
    { id: 'lien ninh', name: 'Xã Liên Ninh' },
    { id: 'ngoc hoi', name: 'Xã Ngọc Hồi' },
    { id: 'ngu hiep', name: 'Xã Ngũ Hiệp' },
    { id: 'ta thanh oai', name: 'Xã Tả Thanh Oai' },
    { id: 'tam hiep', name: 'Xã Tam Hiệp' },
    { id: 'tan trieu', name: 'Xã Tân Triều' },
    { id: 'thanh liet', name: 'Xã Thanh Liệt' },
    { id: 'tu hiep', name: 'Xã Tứ Hiệp' },
    { id: 'van dien', name: 'Xã Vạn Điện' },
    { id: 'van phuc', name: 'Xã Vạn Phúc' },
    { id: 'vinh quynh', name: 'Xã Vĩnh Quỳnh' },
    { id: 'yen my', name: 'Xã Yên Mỹ' }
  ],
  
  // Huyện Gia Lâm
  gialam: [
    { id: 'bat trang', name: 'Xã Bát Tràng' },
    { id: 'co bi', name: 'Xã Cổ Bi' },
    { id: 'da ton', name: 'Xã Đa Tốn' },
    { id: 'dang xa', name: 'Xã Đặng Xá' },
    { id: 'duong ha', name: 'Xã Dương Hà' },
    { id: 'duong quang', name: 'Xã Dương Quang' },
    { id: 'duong xa', name: 'Xã Dương Xá' },
    { id: 'kieu ky', name: 'Xã Kiêu Kỵ' },
    { id: 'kim lan', name: 'Xã Kim Lan' },
    { id: 'kim son', name: 'Xã Kim Sơn' },
    { id: 'le chi', name: 'Xã Lệ Chi' },
    { id: 'ninh hiep', name: 'Xã Ninh Hiệp' },
    { id: 'phu thi', name: 'Xã Phú Thị' },
    { id: 'phu dong', name: 'Xã Phù Đổng' },
    { id: 'trung mau', name: 'Xã Trung Mầu' },
    { id: 'van duc', name: 'Xã Văn Đức' },
    { id: 'yen thuong', name: 'Xã Yên Thường' },
    { id: 'yen vien', name: 'Xã Yên Viên' },
    { id: 'thach ban', name: 'Xã Thạch Bàn' },
    { id: 'cu khue', name: 'Xã Cự Khối' }
  ],
  
  // Huyện Đông Anh
  donganh: [
    { id: 'bac hong', name: 'Xã Bắc Hồng' },
    { id: 'co loa', name: 'Xã Cổ Loa' },
    { id: 'dong hoi', name: 'Xã Đông Hội' },
    { id: 'duong ha', name: 'Xã Dương Hà' },
    { id: 'hai boi', name: 'Xã Hải Bối' },
    { id: 'kim chung', name: 'Xã Kim Chung' },
    { id: 'kim no', name: 'Xã Kim Nỗ' },
    { id: 'lien ha', name: 'Xã Liên Hà' },
    { id: 'mai lam', name: 'Xã Mai Lâm' },
    { id: 'nguyen khe', name: 'Xã Nguyên Khê' },
    { id: 'tan hoi', name: 'Xã Tân Hội' },
    { id: 'thuy lam', name: 'Xã Thụy Lâm' },
    { id: 'tien duong', name: 'Xã Tiên Dương' },
    { id: 'uy no', name: 'Xã Uy Nỗ' },
    { id: 'van ha', name: 'Xã Vân Hà' },
    { id: 'van noi', name: 'Xã Vân Nội' },
    { id: 'viet hung', name: 'Xã Việt Hùng' },
    { id: 'vinh ngoc', name: 'Xã Vĩnh Ngọc' },
    { id: 'xuan canh', name: 'Xã Xuân Canh' },
    { id: 'xuan non', name: 'Xã Xuân Nộn' }
  ],
  
  // Huyện Sóc Sơn
  socson: [
    { id: 'bac phu', name: 'Xã Bắc Phú' },
    { id: 'bac son', name: 'Xã Bắc Sơn' },
    { id: 'dong xuan', name: 'Xã Đông Xuân' },
    { id: 'duc hoa', name: 'Xã Đức Hòa' },
    { id: 'hien ninh', name: 'Xã Hiền Ninh' },
    { id: 'hong ky', name: 'Xã Hồng Kỳ' },
    { id: 'kim lu', name: 'Xã Kim Lũ' },
    { id: 'lien quan', name: 'Xã Liên Quan' },
    { id: 'minh phu', name: 'Xã Minh Phú' },
    { id: 'minh tri', name: 'Xã Minh Trí' },
    { id: 'nam son', name: 'Xã Nam Sơn' },
    { id: 'phu cuong', name: 'Xã Phú Cường' },
    { id: 'phu linh', name: 'Xã Phú Linh' },
    { id: 'phu lo', name: 'Xã Phù Lỗ' },
    { id: 'phu minh', name: 'Xã Phú Minh' },
    { id: 'quang tien', name: 'Xã Quang Tiến' },
    { id: 'son dong', name: 'Xã Sơn Đông' },
    { id: 'tan dan', name: 'Xã Tân Dân' },
    { id: 'tan hung', name: 'Xã Tân Hưng' },
    { id: 'tan minh', name: 'Xã Tân Minh' },
    { id: 'thanh xuan', name: 'Xã Thanh Xuân' },
    { id: 'tien duoc', name: 'Xã Tiên Dược' },
    { id: 'trung gia', name: 'Xã Trung Giã' },
    { id: 'viet long', name: 'Xã Việt Long' },
    { id: 'xuan giang', name: 'Xã Xuân Giang' },
    { id: 'xuan thu', name: 'Xã Xuân Thu' }
  ],
  
  // Thị xã Sơn Tây
  sontay: [
    { id: 'le loi', name: 'Phường Lê Lợi' },
    { id: 'quang trung', name: 'Phường Quang Trung' },
    { id: 'ngo quyen', name: 'Phường Ngô Quyền' },
    { id: 'phan chu trinh', name: 'Phường Phan Chu Trinh' },
    { id: 'son loc', name: 'Phường Sơn Lộc' },
    { id: 'trung hung', name: 'Phường Trung Hưng' },
    { id: 'trung son tram', name: 'Phường Trung Sơn Trầm' },
    { id: 'vien son', name: 'Phường Viên Sơn' },
    { id: 'xuan khanh', name: 'Phường Xuân Khanh' },
    { id: 'co dong', name: 'Xã Cổ Đông' },
    { id: 'duong lam', name: 'Xã Đường Lâm' },
    { id: 'kim son', name: 'Xã Kim Sơn' },
    { id: 'son dong', name: 'Xã Sơn Đông' },
    { id: 'thanh my', name: 'Xã Thanh Mỹ' },
    { id: 'xuan son', name: 'Xã Xuân Sơn' }
  ],
  
  // ==================== HẢI PHÒNG ====================
  
  // Quận Hồng Bàng
  hongbang: [
    { id: 'hoangvanthu', name: 'Phường Hoàng Văn Thụ' },
    { id: 'quangtrung', name: 'Phường Quang Trung' },
    { id: 'phanboichau', name: 'Phường Phan Bội Châu' },
    { id: 'minhkhai', name: 'Phường Minh Khai' },
    { id: 'thuongly', name: 'Phường Thượng Lý' },
    { id: 'hatruc', name: 'Phường Hạ Trục' },
    { id: 'sonbo', name: 'Phường Sơn Bộ' },
    { id: 'daitu', name: 'Phường Đại Từ' },
    { id: 'hungvuong', name: 'Phường Hùng Vương' },
    { id: 'phamhongthai', name: 'Phường Phạm Hồng Thái' }
  ],
  
  // Quận Lê Chân
  lechan: [
    { id: 'cautre', name: 'Phường Cầu Tre' },
    { id: 'lanam', name: 'Phường Lạc Nam' },
    { id: 'dongkhe', name: 'Phường Đông Khê' },
    { id: 'nghiaxuyen', name: 'Phường Nghĩa Xuyên' },
    { id: 'hangkenh', name: 'Phường Hàng Kênh' },
    { id: 'annien', name: 'Phường An Niên' },
    { id: 'vinh niem', name: 'Phường Vĩnh Niệm' },
    { id: 'truc chinh', name: 'Phường Trúc Chính' },
    { id: 'thuy son', name: 'Phường Thủy Sơn' },
    { id: 'lam ha', name: 'Phường Lam Hạ' },
    { id: 'du hang', name: 'Phường Dư Hàng' },
    { id: 'du hang ken', name: 'Phường Dư Hàng Kênh' },
    { id: 'nghia phuc', name: 'Phường Nghĩa Phúc' },
    { id: 'thien tai', name: 'Phường Thiên Tái' }
  ],
  
  // Quận Ngô Quyền
  ngoquyen: [
    { id: 'cau dai', name: 'Phường Cầu Đất' },
    { id: 'cay son', name: 'Phường Cây Sơn' },
    { id: 'dong quoc', name: 'Phường Đông Quốc' },
    { id: 'gia vien', name: 'Phường Gia Viên' },
    { id: 'lang thuong', name: 'Phường Lạng Thương' },
    { id: 'le loi', name: 'Phường Lê Lợi' },
    { id: 'may chai', name: 'Phường Máy Chai' },
    { id: 'may to', name: 'Phường Máy Tơ' },
    { id: 'ngoc xuyen', name: 'Phường Ngọc Xuyên' },
    { id: 'phan boi chau', name: 'Phường Phan Bội Châu' },
    { id: 'phuc loc', name: 'Phường Phúc Lộc' },
    { id: 'tan thanh', name: 'Phường Tân Thành' },
    { id: 'van my', name: 'Phường Vạn Mỹ' }
  ],
  
  // Quận Kiến An
  kienan: [
    { id: 'bac son', name: 'Phường Bắc Sơn' },
    { id: 'dong hoa', name: 'Phường Đồng Hòa' },
    { id: 'lam son', name: 'Phường Lâm Sơn' },
    { id: 'nam son', name: 'Phường Nam Sơn' },
    { id: 'ngoc son', name: 'Phường Ngọc Sơn' },
    { id: 'phu lien', name: 'Phường Phù Liễn' },
    { id: 'quan tru', name: 'Phường Quán Trữ' },
    { id: 'tan thanh', name: 'Phường Tân Thành' },
    { id: 'trai chuoi', name: 'Phường Trại Chuối' },
    { id: 'van dau', name: 'Phường Văn Đầu' }
  ],
  
  // Quận Đồ Sơn
  doson: [
    { id: 'bang la', name: 'Phường Bàng La' },
    { id: 'hop duc', name: 'Phường Hợp Đức' },
    { id: 'minh duc', name: 'Phường Minh Đức' },
    { id: 'ngoc hoi', name: 'Phường Ngọc Hải' },
    { id: 'ngoc xuyen', name: 'Phường Ngọc Xuyên' },
    { id: 'van huong', name: 'Phường Vạn Hương' }
  ],
  
  // Quận Dương Kinh
  duongkinh: [
    { id: 'anh dung', name: 'Phường Anh Dũng' },
    { id: 'da do', name: 'Phường Đa Độ' },
    { id: 'hai thanh', name: 'Phường Hải Thành' },
    { id: 'hoa nghia', name: 'Phường Hòa Nghĩa' },
    { id: 'hung dao', name: 'Phường Hưng Đạo' },
    { id: 'tan thanh', name: 'Phường Tân Thành' }
  ],
  
  // Huyện Thủy Nguyên
  thuynguyen: [
    { id: 'nui deo', name: 'Thị trấn Núi Đèo' },
    { id: 'minh duc', name: 'Thị trấn Minh Đức' },
    { id: 'an lu', name: 'Xã An Lư' },
    { id: 'an son', name: 'Xã An Sơn' },
    { id: 'cao nhan', name: 'Xã Cao Nhân' },
    { id: 'chinh my', name: 'Xã Chính Mỹ' },
    { id: 'dong son', name: 'Xã Đông Sơn' },
    { id: 'duong quan', name: 'Xã Dương Quan' },
    { id: 'gia duc', name: 'Xã Gia Đức' },
    { id: 'gia minh', name: 'Xã Gia Minh' },
    { id: 'hoa binh', name: 'Xã Hoa Động' },
    { id: 'hoang dong', name: 'Xã Hoàng Động' },
    { id: 'hop thanh', name: 'Xã Hợp Thành' },
    { id: 'kien bai', name: 'Xã Kiền Bái' },
    { id: 'kinh mon', name: 'Xã Kinh Môn' },
    { id: 'lam dong', name: 'Xã Lâm Động' },
    { id: 'lap le', name: 'Xã Lập Lễ' },
    { id: 'lien khe', name: 'Xã Liên Khê' },
    { id: 'luu kiem', name: 'Xã Lưu Kiếm' },
    { id: 'luu ky', name: 'Xã Lưu Kỳ' },
    { id: 'my dong', name: 'Xã Mỹ Đồng' },
    { id: 'nguyet duc', name: 'Xã Nguyệt Đức' },
    { id: 'phu ninh', name: 'Xã Phù Ninh' },
    { id: 'phuc le', name: 'Xã Phục Lễ' },
    { id: 'quang thanh', name: 'Xã Quảng Thanh' },
    { id: 'son dong', name: 'Xã Sơn Động' },
    { id: 'tan duong', name: 'Xã Tân Dương' },
    { id: 'thien huong', name: 'Xã Thiên Hương' },
    { id: 'thuy duong', name: 'Xã Thủy Đường' },
    { id: 'thuy son', name: 'Xã Thủy Sơn' },
    { id: 'thuy trieu', name: 'Xã Thủy Triều' },
    { id: 'trung ha', name: 'Xã Trung Hà' }
  ],
  
  // ==================== THÁI NGUYÊN ====================
  
  // TP. Thái Nguyên
  tpthainguyen: [
    { id: 'hoang van thu', name: 'Phường Hoàng Văn Thụ' },
    { id: 'phan dinh phung', name: 'Phường Phan Đình Phùng' },
    { id: 'phan thanh', name: 'Phường Phan Thanh' },
    { id: 'quang trung', name: 'Phường Quang Trung' },
    { id: 'quang vinh', name: 'Phường Quang Vinh' },
    { id: 'tan lap', name: 'Phường Tân Lập' },
    { id: 'tan long', name: 'Phường Tân Long' },
    { id: 'tan thanh', name: 'Phường Tân Thành' },
    { id: 'tan thien', name: 'Phường Tân Thiện' },
    { id: 'thinh dan', name: 'Phường Thịnh Đán' },
    { id: 'tuc duyen', name: 'Phường Túc Duyên' },
    { id: 'trung thanh', name: 'Phường Trung Thành' },
    { id: 'trung vuong', name: 'Phường Trưng Vương' },
    { id: 'cam gia', name: 'Xã Cẩm Già' },
    { id: 'cao ngan', name: 'Xã Cao Ngạn' },
    { id: 'dong bam', name: 'Xã Đồng Bẩm' },
    { id: 'huong son', name: 'Xã Hương Sơn' },
    { id: 'linh son', name: 'Xã Linh Sơn' },
    { id: 'phuc ha', name: 'Xã Phúc Hà' },
    { id: 'phuc xuan', name: 'Xã Phúc Xuân' },
    { id: 'quyet thang', name: 'Xã Quyết Thắng' },
    { id: 'son cam', name: 'Xã Sơn Cẩm' },
    { id: 'tan cuong', name: 'Xã Tân Cương' },
    { id: 'thinh duc', name: 'Xã Thịnh Đức' }
  ],
  
  // ==================== BẮC NINH ====================
  
  // TP. Bắc Ninh
  tpbacninh: [
    { id: 'dai phuc', name: 'Phường Đại Phúc' },
    { id: 'dinh bang', name: 'Phường Đình Bảng' },
    { id: 'do ngo', name: 'Phường Đỗ Ngô' },
    { id: 'dong ky', name: 'Phường Đông Kỳ' },
    { id: 'dong nguyen', name: 'Phường Đông Nguyên' },
    { id: 'ha phat', name: 'Phường Hà Phát' },
    { id: 'haphong', name: 'Phường Hạ Phong' },
    { id: 'hoa long', name: 'Phường Hòa Long' },
    { id: 'khu cu', name: 'Phường Khúc Xuyên' },
    { id: 'kim chan', name: 'Phường Kim Chân' },
    { id: 'kinh bac', name: 'Phường Kinh Bắc' },
    { id: 'nam son', name: 'Phường Nam Sơn' },
    { id: 'ninh xa', name: 'Phường Ninh Xá' },
    { id: 'phong khe', name: 'Phường Phong Khê' },
    { id: 'sui hoa', name: 'Phường Suối Hoa' },
    { id: 'thi cau', name: 'Phường Thị Cầu' },
    { id: 'tien an', name: 'Phường Tiền An' },
    { id: 'van duong', name: 'Phường Vạn Dương' },
    { id: 've an', name: 'Phường Vệ An' },
    { id: 'vo cuong', name: 'Phường Võ Cường' },
    { id: 'vu ninh', name: 'Phường Vũ Ninh' }
  ],
  
  // ==================== QUẢNG NINH ====================
  
  // TP. Hạ Long
  halong: [
    { id: 'bach dang', name: 'Phường Bạch Đằng' },
    { id: 'bai chay', name: 'Phường Bãi Cháy' },
    { id: 'cao thang', name: 'Phường Cao Thắng' },
    { id: 'cao xanh', name: 'Phường Cao Xanh' },
    { id: 'dong tien', name: 'Phường Đông Tiến' },
    { id: 'gieng day', name: 'Phường Giếng Đáy' },
    { id: 'ha khanh', name: 'Phường Hà Khánh' },
    { id: 'ha khe', name: 'Phường Hà Khẩu' },
    { id: 'ha lam', name: 'Phường Hà Lầm' },
    { id: 'ha phong', name: 'Phường Hà Phong' },
    { id: 'ha trung', name: 'Phường Hà Trung' },
    { id: 'ha tuan', name: 'Phường Hà Tuấn' },
    { id: 'hong hai', name: 'Phường Hồng Hải' },
    { id: 'hong ha', name: 'Phường Hồng Hà' },
    { id: 'hung thang', name: 'Phường Hùng Thắng' },
    { id: 'yet kieu', name: 'Phường Yết Kiêu' },
    { id: 'tien ong', name: 'Phường Tiên Ông' },
    { id: 'tran hung dao', name: 'Phường Trần Hưng Đạo' },
    { id: 'tuan chau', name: 'Phường Tuần Châu' },
    { id: 'viet hung', name: 'Phường Việt Hưng' },
    { id: 'dai yen', name: 'Xã Đại Yên' },
    { id: 'son duong', name: 'Xã Sơn Dương' },
    { id: 'thong nhat', name: 'Xã Thống Nhất' }
  ],
  
  // TP. Cẩm Phả
  campha: [
    { id: 'cam binh', name: 'Phường Cẩm Bình' },
    { id: 'cam dong', name: 'Phường Cẩm Đông' },
    { id: 'cam ha', name: 'Phường Cẩm Hà' },
    { id: 'cam phu', name: 'Phường Cẩm Phú' },
    { id: 'cam son', name: 'Phường Cẩm Sơn' },
    { id: 'cam thanh', name: 'Phường Cẩm Thanh' },
    { id: 'cam thach', name: 'Phường Cẩm Thạch' },
    { id: 'cam thuy', name: 'Phường Cẩm Thủy' },
    { id: 'cam trung', name: 'Phường Cẩm Trung' },
    { id: 'cam tay', name: 'Phường Cẩm Tây' },
    { id: 'cong hoa', name: 'Phường Cộng Hòa' },
    { id: 'quang hung', name: 'Phường Quang Hưng' },
    { id: 'quang trung', name: 'Phường Quang Trung' },
    { id: 'duong huy', name: 'Xã Dương Huy' },
    { id: 'mong duong', name: 'Xã Mông Dương' },
    { id: 'tan dan', name: 'Xã Tân Dân' }
  ],
  
  // ==================== HẢI DƯƠNG ====================
  
  // TP. Hải Dương
  tphaiduong: [
    { id: 'ai quoc', name: 'Phường Ái Quốc' },
    { id: 'binh han', name: 'Phường Bình Hàn' },
    { id: 'cam thuong', name: 'Phường Cẩm Thượng' },
    { id: 'hai tan', name: 'Phường Hải Tân' },
    { id: 'le thanh nghi', name: 'Phường Lê Thanh Nghị' },
    { id: 'nam dong', name: 'Phường Nam Đồng' },
    { id: 'ngoc chau', name: 'Phường Ngọc Châu' },
    { id: 'nguyen trai', name: 'Phường Nguyễn Trãi' },
    { id: 'pham ngu lao', name: 'Phường Phạm Ngũ Lão' },
    { id: 'quang trung', name: 'Phường Quang Trung' },
    { id: 'tan binh', name: 'Phường Tân Bình' },
    { id: 'tan hung', name: 'Phường Tân Hưng' },
    { id: 'thanh binh', name: 'Phường Thanh Bình' },
    { id: 'tran hung dao', name: 'Phường Trần Hưng Đạo' },
    { id: 'tran phu', name: 'Phường Trần Phú' },
    { id: 'truong chinh', name: 'Phường Trường Chinh' },
    { id: 'viet hoa', name: 'Phường Việt Hòa' },
    { id: 'an cha', name: 'Xã An Châu' },
    { id: 'nam trung', name: 'Xã Nam Trung' },
    { id: 'tan huong', name: 'Xã Tân Hương' },
    { id: 'thach khoi', name: 'Xã Thạch Khôi' }
  ],
  
  // ==================== VĨNH PHÚC ====================
  
  // TP. Vĩnh Yên
  vinhyen: [
    { id: 'dong da', name: 'Phường Đống Đa' },
    { id: 'dong tam', name: 'Phường Đồng Tâm' },
    { id: 'hoi hop', name: 'Phường Hội Hợp' },
    { id: 'khai quang', name: 'Phường Khai Quang' },
    { id: 'li bao', name: 'Phường Liên Bảo' },
    { id: 'nguyen trai', name: 'Phường Nguyễn Trãi' },
    { id: 'quang trung', name: 'Phường Quang Trung' },
    { id: 'tich son', name: 'Phường Tích Sơn' },
    { id: 'thanh tru', name: 'Xã Thanh Trù' },
    { id: 'trung nhi', name: 'Xã Trung Nhì' },
    { id: 'vinh thanh', name: 'Xã Vĩnh Thành' }
  ],
  
  // ==================== BẮC GIANG ====================
  
  // TP. Bắc Giang
  tpbacgiang: [
    { id: 'da mai', name: 'Phường Đa Mai' },
    { id: 'dinh ke', name: 'Phường Đỉnh Kế' },
    { id: 'hoang van thu', name: 'Phường Hoàng Văn Thụ' },
    { id: 'le loi', name: 'Phường Lê Lợi' },
    { id: 'my do', name: 'Phường Mỹ Độ' },
    { id: 'ngoquyen', name: 'Phường Ngô Quyền' },
    { id: 'nham son', name: 'Phường Nhả Sơn' },
    { id: 'tho xuong', name: 'Phường Thọ Xương' },
    { id: 'tran nguyen han', name: 'Phường Trần Nguyên Hãn' },
    { id: 'tran phu', name: 'Phường Trần Phú' },
    { id: 'xuan hoa', name: 'Phường Xuân Hòa' },
    { id: 'dinh tri', name: 'Xã Định Trí' },
    { id: 'dong tien', name: 'Xã Đồng Tiến' },
    { id: 'song mai', name: 'Xã Song Mai' },
    { id: 'tan my', name: 'Xã Tân Mỹ' },
    { id: 'tan tien', name: 'Xã Tân Tiến' }
  ],
  
  // ==================== HƯNG YÊN ====================
  
  // TP. Hưng Yên
  tphungyen: [
    { id: 'an tao', name: 'Phường An Tảo' },
    { id: 'hien nam', name: 'Phường Hiến Nam' },
    { id: 'hong chau', name: 'Phường Hồng Châu' },
    { id: 'lam son', name: 'Phường Lâm Sơn' },
    { id: 'le loi', name: 'Phường Lê Lợi' },
    { id: 'minh khai', name: 'Phường Minh Khai' },
    { id: 'quang trung', name: 'Phường Quang Trung' },
    { id: 'trung nghia', name: 'Xã Trung Nghĩa' },
    { id: 'lien phuong', name: 'Xã Liên Phương' },
    { id: 'phuong chieu', name: 'Xã Phương Chiểu' },
    { id: 'tan hung', name: 'Xã Tân Hưng' },
    { id: 'hoang hanh', name: 'Xã Hoàng Hanh' },
    { id: 'quang chau', name: 'Xã Quảng Châu' },
    { id: 'bao khe', name: 'Xã Bảo Khê' }
  ],
  
  // ==================== PHÚ THỌ ====================
  
  // TP. Việt Trì
  viettri: [
    { id: 'bach hac', name: 'Phường Bạch Hạc' },
    { id: 'ben got', name: 'Phường Bến Gót' },
    { id: 'duu lau', name: 'Phường Dữu Lâu' },
    { id: 'gia cam', name: 'Phường Gia Cẩm' },
    { id: 'minh khai', name: 'Phường Minh Khai' },
    { id: 'minh nong', name: 'Phường Minh Nông' },
    { id: 'minh phuong', name: 'Phường Minh Phương' },
    { id: 'nong trang', name: 'Phường Nông Trang' },
    { id: 'tan dan', name: 'Phường Tân Dân' },
    { id: 'thanh mieu', name: 'Phường Thanh Miếu' },
    { id: 'tho son', name: 'Phường Thọ Sơn' },
    { id: 'tien cat', name: 'Phường Tiên Cát' },
    { id: 'van co', name: 'Phường Vân Cơ' },
    { id: 'van phu', name: 'Phường Vân Phú' },
    { id: 'bach hong', name: 'Xã Bạch Hồng' },
    { id: 'chu hoa', name: 'Xã Chu Hóa' },
    { id: 'hy cuong', name: 'Xã Hy Cương' },
    { id: 'kim duc', name: 'Xã Kim Đức' },
    { id: 'phuong lau', name: 'Xã Phượng Lâu' },
    { id: 'son vi', name: 'Xã Sơn Vi' },
    { id: 'tan duc', name: 'Xã Tân Đức' },
    { id: 'thanh dinh', name: 'Xã Thanh Đình' },
    { id: 'thu linh', name: 'Xã Thụy Linh' },
    { id: 'trung vuong', name: 'Xã Trưng Vương' }
  ],
  
  // ==================== HÒA BÌNH ====================
  
  // TP. Hòa Bình
  tphoabinh: [
    { id: 'chin giao', name: 'Phường Chín Giáo' },
    { id: 'dong tien', name: 'Phường Đồng Tiến' },
    { id: 'huu nghi', name: 'Phường Hữu Nghị' },
    { id: 'phuong lam', name: 'Phường Phương Lâm' },
    { id: 'tan hiep', name: 'Phường Tân Hiệp' },
    { id: 'tan hoa', name: 'Phường Tân Hòa' },
    { id: 'tan thinh', name: 'Phường Tân Thịnh' },
    { id: 'thai binh', name: 'Phường Thái Bình' },
    { id: 'thinh lang', name: 'Phường Thịnh Lang' },
    { id: 'da phuc', name: 'Xã Đà Phúc' },
    { id: 'dan ha', name: 'Xã Dân Hạ' },
    { id: 'dan hoa', name: 'Xã Dân Hòa' },
    { id: 'doan ket', name: 'Xã Đoàn Kết' },
    { id: 'hoa binh', name: 'Xã Hòa Bình' },
    { id: 'thai binh', name: 'Xã Thái Bình' },
    { id: 'thinh minh', name: 'Xã Thịnh Minh' },
    { id: 'yen mong', name: 'Xã Yên Mông' }
  ],
  
  // ==================== SƠN LA ====================
  
  // TP. Sơn La
  tpsonla: [
    { id: 'chieang ban', name: 'Phường Chiềng Ban' },
    { id: 'chieang coi', name: 'Phường Chiềng Cơi' },
    { id: 'chieang le', name: 'Phường Chiềng Lề' },
    { id: 'chieang sinh', name: 'Phường Chiềng Sinh' },
    { id: 'chieang an', name: 'Xã Chiềng An' },
    { id: 'chieang den', name: 'Xã Chiềng Đen' },
    { id: 'chieang khoi', name: 'Xã Chiềng Khỏi' },
    { id: 'chieang ngam', name: 'Xã Chiềng Ngàm' },
    { id: 'chieang xom', name: 'Xã Chiềng Xôm' },
    { id: 'hua la', name: 'Xã Hua La' }
  ],
  
  // ==================== ĐIỆN BIÊN ====================
  
  // TP. Điện Biên Phủ
  tpdienbien: [
    { id: 'him lam', name: 'Phường Him Lam' },
    { id: 'muong thanh', name: 'Phường Mường Thanh' },
    { id: 'nam thanh', name: 'Phường Nam Thanh' },
    { id: 'noong bua', name: 'Phường Noong Bua' },
    { id: 'tan thanh', name: 'Phường Tân Thanh' },
    { id: 'thanh binh', name: 'Phường Thanh Bình' },
    { id: 'thanh truong', name: 'Phường Thanh Trường' },
    { id: 'thanh minh', name: 'Xã Thanh Minh' }
  ],
  
  // ==================== LAI CHÂU ====================
  
  // TP. Lai Châu
  tplaichau: [
    { id: 'dong phong', name: 'Phường Đông Phong' },
    { id: 'quyet thang', name: 'Phường Quyết Thắng' },
    { id: 'tan phong', name: 'Phường Tân Phong' },
    { id: 'doan ket', name: 'Xã Đoàn Kết' },
    { id: 'nung hang', name: 'Xã Nùng Háng' },
    { id: 'san thang', name: 'Xã San Thàng' },
    { id: 'sung phai', name: 'Xã Sùng Phài' }
  ],
  
  // ==================== LÀO CAI ====================
  
  // TP. Lào Cai
  tplaocai: [
    { id: 'bac cuong', name: 'Phường Bắc Cường' },
    { id: 'bac lenh', name: 'Phường Bắc Lệnh' },
    { id: 'bình minh', name: 'Phường Bình Minh' },
    { id: 'coc leu', name: 'Phường Cốc Lếu' },
    { id: 'dunghai', name: 'Phường Duyên Hải' },
    { id: 'kim tan', name: 'Phường Kim Tân' },
    { id: 'lao cai', name: 'Phường Lào Cai' },
    { id: 'nam cuong', name: 'Phường Nam Cường' },
    { id: 'phan xi pang', name: 'Phường Phan Xi Păng' },
    { id: 'thanh pho', name: 'Phường Thành Phố' },
    { id: 'van hoa', name: 'Phường Văn Hóa' },
    { id: 'dong tuyen', name: 'Xã Đồng Tuyển' },
    { id: 'hop thanh', name: 'Xã Hợp Thành' },
    { id: 'thong nhat', name: 'Xã Thống Nhất' },
    { id: 'van hoa', name: 'Xã Vạn Hòa' }
  ],
  
  // ==================== YÊN BÁI ====================
  
  // TP. Yên Bái
  tpyenbai: [
    { id: 'am thuong', name: 'Phường Âm Thượng' },
    { id: 'dong tam', name: 'Phường Đồng Tâm' },
    { id: 'hong ha', name: 'Phường Hồng Hà' },
    { id: 'hop minh', name: 'Phường Hợp Minh' },
    { id: 'minh tan', name: 'Phường Minh Tân' },
    { id: 'nam cuong', name: 'Phường Nam Cường' },
    { id: 'nguyen phuc', name: 'Phường Nguyễn Phúc' },
    { id: 'nguyen thai hoc', name: 'Phường Nguyễn Thái Học' },
    { id: 'tan phong', name: 'Phường Tân Phong' },
    { id: 'yen ninh', name: 'Phường Yên Ninh' },
    { id: 'yen thinh', name: 'Phường Yên Thịnh' },
    { id: 'gioi phien', name: 'Xã Giới Phiên' },
    { id: 'phuc loc', name: 'Xã Phúc Lộc' },
    { id: 'tan thinh', name: 'Xã Tân Thịnh' },
    { id: 'tuy loc', name: 'Xã Tuy Lộc' },
    { id: 'van phu', name: 'Xã Văn Phú' }
  ],
  
  // ==================== TUYÊN QUANG ====================
  
  // TP. Tuyên Quang
  tptuyenquang: [
    { id: 'an tuong', name: 'Phường An Tường' },
    { id: 'hung thanh', name: 'Phường Hưng Thành' },
    { id: 'minh xuan', name: 'Phường Minh Xuân' },
    { id: 'my lam', name: 'Phường Mỹ Lâm' },
    { id: 'nong tien', name: 'Phường Nông Tiến' },
    { id: 'phan thiet', name: 'Phường Phan Thiết' },
    { id: 'tan ha', name: 'Phường Tân Hà' },
    { id: 'tan quan', name: 'Phường Tân Quang' },
    { id: 'uy lo', name: 'Phường Ủy Lỗ' },
    { id: 'an khang', name: 'Xã An Khang' },
    { id: 'kim phu', name: 'Xã Kim Phú' },
    { id: 'luong vuong', name: 'Xã Lưỡng Vượng' },
    { id: 'thai long', name: 'Xã Thái Long' },
    { id: 'trang da', name: 'Xã Tràng Đà' }
  ],
  
  // ==================== HÀ GIANG ====================
  
  // TP. Hà Giang
  tphagiang: [
    { id: 'minh khai', name: 'Phường Minh Khai' },
    { id: 'ngoc duong', name: 'Phường Ngọc Đường' },
    { id: 'nguyen trai', name: 'Phường Nguyễn Trãi' },
    { id: 'quang trung', name: 'Phường Quang Trung' },
    { id: 'tran phu', name: 'Phường Trần Phú' },
    { id: 'kim linh', name: 'Xã Kim Linh' },
    { id: 'phuong do', name: 'Xã Phương Độ' },
    { id: 'phuong thien', name: 'Xã Phương Thiện' }
  ],
  
  // ==================== CAO BẰNG ====================
  
  // TP. Cao Bằng
  tpcaobang: [
    { id: 'hop giang', name: 'Phường Hợp Giang' },
    { id: 'song bang', name: 'Phường Sông Bằng' },
    { id: 'song hien', name: 'Phường Sông Hiến' },
    { id: 'tan giang', name: 'Phường Tân Giang' },
    { id: 'de tham', name: 'Xã Đề Thám' },
    { id: 'hoa chung', name: 'Xã Hòa Chung' },
    { id: 'hung dao', name: 'Xã Hưng Đạo' },
    { id: 'ngoc xuan', name: 'Xã Ngọc Xuân' },
    { id: 'nguyen binh', name: 'Xã Nguyễn Bình' },
    { id: 'vinh quang', name: 'Xã Vĩnh Quang' }
  ],
  
  // ==================== LẠNG SƠN ====================
  
  // TP. Lạng Sơn
  tplangson: [
    { id: 'chi lang', name: 'Phường Chi Lăng' },
    { id: 'dong kinh', name: 'Phường Đông Kinh' },
    { id: 'hoang van thu', name: 'Phường Hoàng Văn Thụ' },
    { id: 'tam thanh', name: 'Phường Tam Thanh' },
    { id: 'vinh trai', name: 'Phường Vĩnh Trại' },
    { id: 'mai pha', name: 'Xã Mai Pha' },
    { id: 'quang lac', name: 'Xã Quảng Lạc' }
  ],
  
  // ==================== BẮC KẠN ====================
  
  // TP. Bắc Kạn
  tpbackan: [
    { id: 'duc xuan', name: 'Phường Đức Xuân' },
    { id: 'nguyen thi minh khai', name: 'Phường Nguyễn Thị Minh Khai' },
    { id: 'phung chi kien', name: 'Phường Phùng Chí Kiên' },
    { id: 'song cau', name: 'Phường Sông Cầu' },
    { id: 'xuat hoa', name: 'Phường Xuất Hóa' },
    { id: 'duong quang', name: 'Xã Dương Quang' },
    { id: 'huyen tung', name: 'Xã Huyền Tụng' },
    { id: 'nong thuong', name: 'Xã Nông Thượng' },
    { id: 'vinh hung', name: 'Xã Vĩnh Hưng' }
  ],
  
  // ==================== MIỀN TRUNG (7 TỈNH) ====================
  
  // 22. Thanh Hóa - 27 quận/huyện
  'tp-thanhhoa': [
    { id: 'ba-dinh', name: 'Phường Ba Đình' },
    { id: 'dien-bien', name: 'Phường Điện Biên' },
    { id: 'dong-son', name: 'Phường Đông Sơn' },
    { id: 'dong-tho', name: 'Phường Đông Thọ' },
    { id: 'dong-ve', name: 'Phường Đông Vệ' },
    { id: 'ham-rong', name: 'Phường Hàm Rồng' },
    { id: 'lam-son', name: 'Phường Lam Sơn' },
    { id: 'nam-ngan', name: 'Phường Nam Ngạn' },
    { id: 'ngoc-trac', name: 'Phường Ngọc Trạo' },
    { id: 'phu-son', name: 'Phường Phú Sơn' },
    { id: 'quang-hung', name: 'Phường Quảng Hưng' },
    { id: 'quang-thanh', name: 'Phường Quảng Thành' },
    { id: 'tan-son', name: 'Phường Tân Sơn' },
    { id: 'tao-xuyen', name: 'Phường Tào Xuyên' },
    { id: 'truong-thi', name: 'Phường Trường Thi' },
    { id: 'dong-cuong', name: 'Xã Đông Cương' },
    { id: 'dong-huong', name: 'Xã Đông Hương' },
    { id: 'dong-linh', name: 'Xã Đông Linh' },
    { id: 'dong-hoa', name: 'Xã Đông Hòa' },
    { id: 'hoang-quang', name: 'Xã Hoằng Quang' }
  ],
  'sam-son': [
    { id: 'quang-chau', name: 'Phường Quảng Châu' },
    { id: 'quang-cu', name: 'Phường Quảng Cư' },
    { id: 'quang-tho', name: 'Phường Quảng Thọ' },
    { id: 'quang-tien', name: 'Phường Quảng Tiến' },
    { id: 'quang-vinh', name: 'Phường Quảng Vinh' },
    { id: 'truong-son', name: 'Phường Trường Sơn' },
    { id: 'quang-dai', name: 'Xã Quảng Đại' },
    { id: 'quang-hung', name: 'Xã Quảng Hùng' },
    { id: 'quang-minh', name: 'Xã Quảng Minh' }
  ],
  
  // 23. Nghệ An - 21 quận/huyện
  'tp-vinh': [
    { id: 'ben-thuy', name: 'Phường Bến Thủy' },
    { id: 'cua-nam', name: 'Phường Cửa Nam' },
    { id: 'doi-cung', name: 'Phường Đội Cùng' },
    { id: 'dong-ve', name: 'Phường Đông Vĩnh' },
    { id: 'ha-huy-tap', name: 'Phường Hà Huy Tập' },
    { id: 'hung-binh', name: 'Phường Hưng Bình' },
    { id: 'hung-dung', name: 'Phường Hưng Dũng' },
    { id: 'hung-phuc', name: 'Phường Hưng Phúc' },
    { id: 'le-loi', name: 'Phường Lê Lợi' },
    { id: 'le-mao', name: 'Phường Lê Mao' },
    { id: 'quang-trung', name: 'Phường Quang Trung' },
    { id: 'truong-thi', name: 'Phường Trường Thi' },
    { id: 'vinh-tan', name: 'Phường Vinh Tân' },
    { id: 'nghi-phu', name: 'Xã Nghi Phú' },
    { id: 'nghi-kim', name: 'Xã Nghi Kim' },
    { id: 'nghi-lien', name: 'Xã Nghi Liên' },
    { id: 'nghi-an', name: 'Xã Nghi Ân' },
    { id: 'hung-chinh', name: 'Xã Hưng Chính' },
    { id: 'hung-dong', name: 'Xã Hưng Đông' },
    { id: 'hung-hoa', name: 'Xã Hưng Hòa' },
    { id: 'hung-loc', name: 'Xã Hưng Lộc' }
  ],
  
  // 24. Hà Tĩnh - 13 quận/huyện
  'tp-ha-tinh': [
    { id: 'bac-ha', name: 'Phường Bắc Hà' },
    { id: 'ha-huy-tap', name: 'Phường Hà Huy Tập' },
    { id: 'nam-ha', name: 'Phường Nam Hà' },
    { id: 'tan-giang', name: 'Phường Tân Giang' },
    { id: 'thach-linh', name: 'Phường Thạch Linh' },
    { id: 'thach-quy', name: 'Phường Thạch Quý' },
    { id: 'tran-phu', name: 'Phường Trần Phú' },
    { id: 'van-yen', name: 'Phường Văn Yên' },
    { id: 'dai-nai', name: 'Xã Đại Nài' },
    { id: 'thach-binh', name: 'Xã Thạch Bình' },
    { id: 'thach-ha', name: 'Xã Thạch Hạ' },
    { id: 'thach-hung', name: 'Xã Thạch Hưng' },
    { id: 'thach-trung', name: 'Xã Thạch Trung' },
    { id: 'thach-dong', name: 'Xã Thạch Đồng' }
  ],
  
  // 25. Quảng Bình - 8 quận/huyện
  'tp-dong-hoi': [
    { id: 'bac-ly', name: 'Phường Bắc Lý' },
    { id: 'bac-nghia', name: 'Phường Bắc Nghĩa' },
    { id: 'dong-my', name: 'Phường Đồng Mỹ' },
    { id: 'dong-phu', name: 'Phường Đồng Phú' },
    { id: 'dong-son', name: 'Phường Đồng Sơn' },
    { id: 'duc-ninh-dong', name: 'Phường Đức Ninh Đông' },
    { id: 'hai-dinh', name: 'Phường Hải Đình' },
    { id: 'hai-thanh', name: 'Phường Hải Thành' },
    { id: 'nam-ly', name: 'Phường Nam Lý' },
    { id: 'phu-hai', name: 'Phường Phú Hải' },
    { id: 'bao-ninh', name: 'Xã Bảo Ninh' },
    { id: 'duc-ninh', name: 'Xã Đức Ninh' },
    { id: 'loc-ninh', name: 'Xã Lộc Ninh' },
    { id: 'nghia-ninh', name: 'Xã Nghĩa Ninh' },
    { id: 'quang-phu', name: 'Xã Quang Phú' },
    { id: 'thuan-duc', name: 'Xã Thuận Đức' }
  ],
  
  // 26. Quảng Trị - 10 quận/huyện
  'tp-dong-ha': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: 'dong-giang', name: 'Phường Đông Giang' },
    { id: 'dong-le', name: 'Phường Đông Lễ' },
    { id: 'dong-thanh', name: 'Phường Đông Thanh' }
  ],
  
  // 27. Thừa Thiên Huế - 9 quận/huyện
  'tp-hue': [
    { id: 'an-cuu', name: 'Phường An Cựu' },
    { id: 'an-dong', name: 'Phường An Đông' },
    { id: 'an-hoa', name: 'Phường An Hòa' },
    { id: 'an-tay', name: 'Phường An Tây' },
    { id: 'huong-long', name: 'Phường Hương Long' },
    { id: 'huong-so', name: 'Phường Hương Sơ' },
    { id: 'kim-long', name: 'Phường Kim Long' },
    { id: 'phu-bai', name: 'Phường Phú Bài' },
    { id: 'phu-cat', name: 'Phường Phú Cát' },
    { id: 'phu-hau', name: 'Phường Phú Hậu' },
    { id: 'phu-hiep', name: 'Phường Phú Hiệp' },
    { id: 'phu-hoi', name: 'Phường Phú Hội' },
    { id: 'phu-nhuan', name: 'Phường Phú Nhuận' },
    { id: 'phu-thuan', name: 'Phường Phú Thuận' },
    { id: 'phuoc-vinh', name: 'Phường Phước Vĩnh' },
    { id: 'phuong-duc', name: 'Phường Phường Đức' },
    { id: 'tay-loc', name: 'Phường Tây Lộc' },
    { id: 'thuan-hoa', name: 'Phường Thuận Hòa' },
    { id: 'thuan-loc', name: 'Phường Thuận Lộc' },
    { id: 'thuan-thanh', name: 'Phường Thuận Thành' },
    { id: 'thuy-bieu', name: 'Phường Thủy Biều' },
    { id: 'thuy-xuan', name: 'Phường Thủy Xuân' },
    { id: 'truong-an', name: 'Phường Trường An' },
    { id: 'vinh-ninh', name: 'Phường Vĩnh Ninh' },
    { id: 'thuy-thanh', name: 'Xã Thủy Thanh' },
    { id: 'thuy-van', name: 'Xã Thủy Vân' },
    { id: 'thuy-duong', name: 'Xã Thủy Dương' },
    { id: 'thuy-phuong', name: 'Xã Thủy Phương' },
    { id: 'huong-phong', name: 'Xã Hương Phong' },
    { id: 'huong-tho', name: 'Xã Hương Thọ' },
    { id: 'huong-vinh', name: 'Xã Hương Vinh' }
  ],
  
  // 28. Đà Nẵng - 8 quận/huyện
  'hai-chau': [
    { id: 'binh-hien', name: 'Phường Bình Hiên' },
    { id: 'binh-thuan', name: 'Phường Bình Thuận' },
    { id: 'hai-chau-1', name: 'Phường Hải Châu I' },
    { id: 'hai-chau-2', name: 'Phường Hải Châu II' },
    { id: 'hoa-cuong-bac', name: 'Phường Hòa Cường Bắc' },
    { id: 'hoa-cuong-nam', name: 'Phường Hòa Cường Nam' },
    { id: 'hoa-thuan-dong', name: 'Phường Hòa Thuận Đông' },
    { id: 'hoa-thuan-tay', name: 'Phường Hòa Thuận Tây' },
    { id: 'nam-duong', name: 'Phường Nam Dương' },
    { id: 'phuoc-ninh', name: 'Phường Phước Ninh' },
    { id: 'thach-thang', name: 'Phường Thạch Thang' },
    { id: 'thuan-phuoc', name: 'Phường Thuận Phước' }
  ],
  'thanh-khe': [
    { id: 'an-khe', name: 'Phường An Khê' },
    { id: 'chanh-gian', name: 'Phường Chính Gián' },
    { id: 'hoa-khe', name: 'Phường Hòa Khê' },
    { id: 'tan-chinh', name: 'Phường Tân Chính' },
    { id: 'thac-gian', name: 'Phường Thạc Gián' },
    { id: 'thanh-khe-dong', name: 'Phường Thanh Khê Đông' },
    { id: 'thanh-khe-tay', name: 'Phường Thanh Khê Tây' },
    { id: 'xuan-ha', name: 'Phường Xuân Hà' },
    { id: 'vinh-trung', name: 'Phường Vĩnh Trung' }
  ],
  'son-tra': [
    { id: 'an-hai-bac', name: 'Phường An Hải Bắc' },
    { id: 'an-hai-dong', name: 'Phường An Hải Đông' },
    { id: 'an-hai-tay', name: 'Phường An Hải Tây' },
    { id: 'man-thai', name: 'Phường Mân Thái' },
    { id: 'nai-hien-dong', name: 'Phường Nại Hiên Đông' },
    { id: 'phuoc-my', name: 'Phường Phước Mỹ' },
    { id: 'tho-quang', name: 'Phường Thọ Quang' }
  ],
  'ngu-hanh-son': [
    { id: 'hoa-hai', name: 'Phường Hòa Hải' },
    { id: 'hoa-quy', name: 'Phường Hòa Quý' },
    { id: 'khue-my', name: 'Phường Khuê Mỹ' },
    { id: 'my-an', name: 'Phường Mỹ An' }
  ],
  'lien-chieu': [
    { id: 'hoa-hiep-bac', name: 'Phường Hòa Hiệp Bắc' },
    { id: 'hoa-hiep-nam', name: 'Phường Hòa Hiệp Nam' },
    { id: 'hoa-khanh-bac', name: 'Phường Hòa Khánh Bắc' },
    { id: 'hoa-khanh-nam', name: 'Phường Hòa Khánh Nam' },
    { id: 'hoa-minh', name: 'Phường Hòa Minh' }
  ],
  'cam-le': [
    { id: 'hoa-an', name: 'Phường Hòa An' },
    { id: 'hoa-phat', name: 'Phường Hòa Phát' },
    { id: 'hoa-tho-dong', name: 'Phường Hòa Thọ Đông' },
    { id: 'hoa-tho-tay', name: 'Phường Hòa Thọ Tây' },
    { id: 'hoa-xuan', name: 'Phường Hòa Xuân' },
    { id: 'khue-trung', name: 'Phường Khuê Trung' }
  ],
  
  // ==================== MIỀN NAM (6 TỈNH) ====================
  
  // 29. TP.HCM - 22 quận/huyện
  'q1': [
    { id: 'ben-nghe', name: 'Phường Bến Nghé' },
    { id: 'ben-thanh', name: 'Phường Bến Thành' },
    { id: 'co-giang', name: 'Phường Cô Giang' },
    { id: 'cau-kho', name: 'Phường Cầu Kho' },
    { id: 'cau-ong-lanh', name: 'Phường Cầu Ông Lãnh' },
    { id: 'da-kao', name: 'Phường Đa Kao' },
    { id: 'nguyen-cu-trinh', name: 'Phường Nguyễn Cư Trinh' },
    { id: 'nguyen-thai-binh', name: 'Phường Nguyễn Thái Bình' },
    { id: 'phan-chu-trinh', name: 'Phường Phạm Ngũ Lão' },
    { id: 'tan-dinh', name: 'Phường Tân Định' }
  ],
  'q3': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' }
  ],
  'q4': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' },
    { id: '15', name: 'Phường 15' },
    { id: '16', name: 'Phường 16' },
    { id: '18', name: 'Phường 18' }
  ],
  'q5': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' },
    { id: '15', name: 'Phường 15' }
  ],
  'q6': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' }
  ],
  'q7': [
    { id: 'binh-thuan', name: 'Phường Bình Thuận' },
    { id: 'phu-my', name: 'Phường Phú Mỹ' },
    { id: 'phu-thuan', name: 'Phường Phú Thuận' },
    { id: 'tan-hung', name: 'Phường Tân Hưng' },
    { id: 'tan-kien', name: 'Phường Tân Kiểng' },
    { id: 'tan-phong', name: 'Phường Tân Phong' },
    { id: 'tan-phu', name: 'Phường Tân Phú' },
    { id: 'tan-quy', name: 'Phường Tân Quy' },
    { id: 'tan-thuan-dong', name: 'Phường Tân Thuận Đông' },
    { id: 'tan-thuan-tay', name: 'Phường Tân Thuận Tây' }
  ],
  'q8': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' },
    { id: '15', name: 'Phường 15' },
    { id: '16', name: 'Phường 16' }
  ],
  'q10': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' },
    { id: '15', name: 'Phường 15' }
  ],
  'q11': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' },
    { id: '15', name: 'Phường 15' },
    { id: '16', name: 'Phường 16' }
  ],
  'q12': [
    { id: 'an-phu-dong', name: 'Phường An Phú Đông' },
    { id: 'dong-hung-thuan', name: 'Phường Đông Hưng Thuận' },
    { id: 'hiep-thanh', name: 'Phường Hiệp Thành' },
    { id: 'tan-chanh-hiep', name: 'Phường Tân Chánh Hiệp' },
    { id: 'tan-hung-thuan', name: 'Phường Tân Hưng Thuận' },
    { id: 'tan-thoi-hiep', name: 'Phường Tân Thới Hiệp' },
    { id: 'tan-thoi-nhat', name: 'Phường Tân Thới Nhất' },
    { id: 'thanh-loc', name: 'Phường Thạnh Lộc' },
    { id: 'thanh-xuan', name: 'Phường Thạnh Xuân' },
    { id: 'thoi-an', name: 'Phường Thới An' },
    { id: 'trung-my-tay', name: 'Phường Trung Mỹ Tây' }
  ],
  'binh-thanh': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' },
    { id: '15', name: 'Phường 15' },
    { id: '17', name: 'Phường 17' },
    { id: '19', name: 'Phường 19' },
    { id: '21', name: 'Phường 21' },
    { id: '22', name: 'Phường 22' },
    { id: '24', name: 'Phường 24' },
    { id: '25', name: 'Phường 25' },
    { id: '26', name: 'Phường 26' },
    { id: '27', name: 'Phường 27' },
    { id: '28', name: 'Phường 28' }
  ],
  'phu-nhuan': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' },
    { id: '15', name: 'Phường 15' },
    { id: '17', name: 'Phường 17' }
  ],
  'go-vap': [
    { id: '1', name: 'Phường 1' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' },
    { id: '15', name: 'Phường 15' },
    { id: '16', name: 'Phường 16' },
    { id: '17', name: 'Phường 17' }
  ],
  'tan-binh': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: '13', name: 'Phường 13' },
    { id: '14', name: 'Phường 14' },
    { id: '15', name: 'Phường 15' }
  ],
  'tan-phu': [
    { id: 'hiep-tan', name: 'Phường Hiệp Tân' },
    { id: 'hoa-thanh', name: 'Phường Hòa Thạnh' },
    { id: 'phu-thanh', name: 'Phường Phú Thạnh' },
    { id: 'phu-tho-hoa', name: 'Phường Phú Thọ Hòa' },
    { id: 'phu-trung', name: 'Phường Phú Trung' },
    { id: 'son-ky', name: 'Phường Sơn Kỳ' },
    { id: 'tan-quy', name: 'Phường Tân Quý' },
    { id: 'tan-son-nhi', name: 'Phường Tân Sơn Nhì' },
    { id: 'tan-thanh', name: 'Phường Tân Thành' },
    { id: 'tan-thoi-hoa', name: 'Phường Tân Thới Hòa' },
    { id: 'tay-thanh', name: 'Phường Tây Thạnh' }
  ],
  'binh-tan': [
    { id: 'an-lac', name: 'Phường An Lạc' },
    { id: 'an-lac-a', name: 'Phường An Lạc A' },
    { id: 'binh-hung-hoa', name: 'Phường Bình Hưng Hòa' },
    { id: 'binh-hung-hoa-a', name: 'Phường Bình Hưng Hòa A' },
    { id: 'binh-hung-hoa-b', name: 'Phường Bình Hưng Hòa B' },
    { id: 'binh-tri-dong', name: 'Phường Bình Trị Đông' },
    { id: 'binh-tri-dong-a', name: 'Phường Bình Trị Đông A' },
    { id: 'binh-tri-dong-b', name: 'Phường Bình Trị Đông B' },
    { id: 'tan-tao', name: 'Phường Tân Tạo' },
    { id: 'tan-tao-a', name: 'Phường Tân Tạo A' }
  ],
  'thu-duc': [
    { id: 'binh-chieu', name: 'Phường Bình Chiểu' },
    { id: 'binh-tho', name: 'Phường Bình Thọ' },
    { id: 'hiep-binh-chanh', name: 'Phường Hiệp Bình Chánh' },
    { id: 'hiep-binh-phuoc', name: 'Phường Hiệp Bình Phước' },
    { id: 'linh-chieu', name: 'Phường Linh Chiểu' },
    { id: 'linh-dong', name: 'Phường Linh Đông' },
    { id: 'linh-tay', name: 'Phường Linh Tây' },
    { id: 'linh-trung', name: 'Phường Linh Trung' },
    { id: 'linh-xuan', name: 'Phường Linh Xuân' },
    { id: 'tam-binh', name: 'Phường Tam Bình' },
    { id: 'tam-phu', name: 'Phường Tam Phú' },
    { id: 'tang-nhon-phu-a', name: 'Phường Tăng Nhơn Phú A' },
    { id: 'tang-nhon-phu-b', name: 'Phường Tăng Nhơn Phú B' },
    { id: 'thu-thiem', name: 'Phường Thủ Thiêm' },
    { id: 'truong-tho', name: 'Phường Trường Thọ' },
    { id: 'an-khanh', name: 'Phường An Khánh' },
    { id: 'an-phu', name: 'Phường An Phú' },
    { id: 'binh-an', name: 'Phường Bình An' },
    { id: 'binh-khang', name: 'Phường Bình Khánh' },
    { id: 'binh-trung-dong', name: 'Phường Bình Trưng Đông' },
    { id: 'binh-trung-tay', name: 'Phường Bình Trưng Tây' },
    { id: 'cat-lai', name: 'Phường Cát Lái' },
    { id: 'long-binh', name: 'Phường Long Bình' },
    { id: 'long-phuoc', name: 'Phường Long Phước' },
    { id: 'long-thanh-my', name: 'Phường Long Thạnh Mỹ' },
    { id: 'phu-huu', name: 'Phường Phú Hữu' },
    { id: 'phuoc-binh', name: 'Phường Phước Bình' },
    { id: 'phuoc-long-a', name: 'Phường Phước Long A' },
    { id: 'phuoc-long-b', name: 'Phường Phước Long B' },
    { id: 'thanh-my-loi', name: 'Phường Thạnh Mỹ Lợi' }
  ],
  
  // 30. Bình Dương - 9 quận/huyện
  'tp-thu-dau-mot': [
    { id: 'phu-cuong', name: 'Phường Phú Cường' },
    { id: 'phu-hoa', name: 'Phường Phú Hòa' },
    { id: 'phu-loi', name: 'Phường Phú Lợi' },
    { id: 'phu-my', name: 'Phường Phú Mỹ' },
    { id: 'phu-tan', name: 'Phường Phú Tân' },
    { id: 'phu-tho', name: 'Phường Phú Thọ' },
    { id: 'tan-an', name: 'Phường Tân An' },
    { id: 'tuong-binh-hiep', name: 'Phường Tương Bình Hiệp' },
    { id: 'chanh-nghia', name: 'Phường Chánh Nghĩa' },
    { id: 'dinh-hoa', name: 'Phường Định Hòa' },
    { id: 'hiep-thanh', name: 'Phường Hiệp Thành' },
    { id: 'hoa-phu', name: 'Phường Hòa Phú' }
  ],
  'tp-thuan-an': [
    { id: 'an-phu', name: 'Phường An Phú' },
    { id: 'binh-chuan', name: 'Phường Bình Chuẩn' },
    { id: 'binh-hoa', name: 'Phường Bình Hòa' },
    { id: 'binh-nham', name: 'Phường Bình Nhâm' },
    { id: 'hung-dinh', name: 'Phường Hưng Định' },
    { id: 'lai-thieu', name: 'Phường Lái Thiêu' },
    { id: 'thuan-giao', name: 'Phường Thuận Giao' },
    { id: 'vinh-phu', name: 'Phường Vĩnh Phú' },
    { id: 'an-son', name: 'Xã An Sơn' }
  ],
  'tp-di-an': [
    { id: 'an-binh', name: 'Phường An Bình' },
    { id: 'binh-an', name: 'Phường Bình An' },
    { id: 'binh-thang', name: 'Phường Bình Thắng' },
    { id: 'di-an', name: 'Phường Dĩ An' },
    { id: 'dong-hoa', name: 'Phường Đông Hòa' },
    { id: 'tan-binh', name: 'Phường Tân Bình' },
    { id: 'tan-dong-hiep', name: 'Phường Tân Đông Hiệp' }
  ],
  'tx-ben-cat': [
    { id: 'my-phuoc', name: 'Phường Mỹ Phước' },
    { id: 'tan-dinh', name: 'Phường Tân Định' },
    { id: 'thoi-hoa', name: 'Phường Thới Hòa' },
    { id: 'chon-thanh', name: 'Phường Chánh Phú Hòa' },
    { id: 'hoa-loi', name: 'Phường Hòa Lợi' },
    { id: 'phu-an', name: 'Xã Phú An' },
    { id: 'an-dien', name: 'Xã An Điền' },
    { id: 'an-tay', name: 'Xã An Tây' }
  ],
  'tx-tan-uyen': [
    { id: 'uyen-hung', name: 'Phường Uyên Hưng' },
    { id: 'tan-phuoc-khanh', name: 'Phường Tân Phước Khánh' },
    { id: 'tan-hiep', name: 'Phường Tân Hiệp' },
    { id: 'thanh-phuoc', name: 'Phường Thạnh Phước' },
    { id: 'vinh-tan', name: 'Phường Vĩnh Tân' },
    { id: 'hoi-nghia', name: 'Xã Hội Nghĩa' },
    { id: 'khanh-binh', name: 'Xã Khánh Bình' },
    { id: 'phu-chanh', name: 'Xã Phú Chánh' },
    { id: 'tru-van-tho', name: 'Xã Trừ Văn Thố' },
    { id: 'tan-thanh', name: 'Xã Tân Thành' },
    { id: 'bach-dang', name: 'Xã Bạch Đằng' }
  ],
  
  // 31. Đồng Nai - 11 quận/huyện
  'tp-bien-hoa': [
    { id: 'an-binh', name: 'Phường An Bình' },
    { id: 'buu-hoa', name: 'Phường Bửu Hòa' },
    { id: 'buu-long', name: 'Phường Bửu Long' },
    { id: 'hoa-binh', name: 'Phường Hòa Bình' },
    { id: 'hoa-an', name: 'Xã Hóa An' },
    { id: 'long-binh', name: 'Phường Long Bình' },
    { id: 'long-binh-tan', name: 'Phường Long Bình Tân' },
    { id: 'phuoc-tan', name: 'Phường Phước Tân' },
    { id: 'quang-vinh', name: 'Phường Quang Vinh' },
    { id: 'quyet-thang', name: 'Phường Quyết Thắng' },
    { id: 'tam-hiep', name: 'Phường Tam Hiệp' },
    { id: 'tam-phuoc', name: 'Xã Tam Phước' },
    { id: 'tan-bien', name: 'Phường Tân Biên' },
    { id: 'tan-ha', name: 'Phường Tân Hạnh' },
    { id: 'tan-hoa', name: 'Phường Tân Hòa' },
    { id: 'tan-hiep', name: 'Phường Tân Hiệp' },
    { id: 'tan-mai', name: 'Phường Tân Mai' },
    { id: 'tan-phong', name: 'Phường Tân Phong' },
    { id: 'tan-tien', name: 'Phường Tân Tiến' },
    { id: 'tan-van', name: 'Phường Tân Vạn' },
    { id: 'thanh-binh', name: 'Phường Thanh Bình' },
    { id: 'thong-nhat', name: 'Phường Thống Nhất' },
    { id: 'trung-dung', name: 'Phường Trung Dũng' }
  ],
  'tp-long-khanh': [
    { id: 'xuan-an', name: 'Phường Xuân An' },
    { id: 'xuan-binh', name: 'Phường Xuân Bình' },
    { id: 'xuan-hoa', name: 'Phường Xuân Hòa' },
    { id: 'xuan-thanh', name: 'Phường Xuân Thanh' },
    { id: 'xuan-trung', name: 'Phường Xuân Trung' },
    { id: 'bau-sen', name: 'Xã Bàu Sen' },
    { id: 'bao-quang', name: 'Xã Bảo Quang' },
    { id: 'bao-vinh', name: 'Xã Bảo Vinh' },
    { id: 'bau-trang', name: 'Xã Bàu Trâm' },
    { id: 'binh-loc', name: 'Xã Bình Lộc' },
    { id: 'hang-gon', name: 'Xã Hàng Gòn' }
  ],
  
  // 32. Bà Rịa - Vũng Tàu - 8 quận/huyện
  'tp-vung-tau': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: '11', name: 'Phường 11' },
    { id: '12', name: 'Phường 12' },
    { id: 'nguyen-an-ninh', name: 'Phường Nguyễn An Ninh' },
    { id: 'thang-nhat', name: 'Phường Thắng Nhất' },
    { id: 'thang-nhi', name: 'Phường Thắng Nhì' },
    { id: 'thang-tam', name: 'Phường Thắng Tam' }
  ],
  'tp-ba-ria': [
    { id: 'long-toan', name: 'Phường Long Toàn' },
    { id: 'long-huong', name: 'Phường Long Hương' },
    { id: 'phuoc-hung', name: 'Phường Phước Hưng' },
    { id: 'phuoc-nguyen', name: 'Phường Phước Nguyên' },
    { id: 'phuoc-trung', name: 'Phường Phước Trung' },
    { id: 'phuoc-hiep', name: 'Xã Phước Hiệp' },
    { id: 'phuoc-hoi', name: 'Xã Phước Hội' },
    { id: 'phuoc-tan', name: 'Xã Phước Tân' },
    { id: 'hoa-long', name: 'Xã Hòa Long' },
    { id: 'long-phuoc', name: 'Xã Long Phước' }
  ],
  'tx-phu-my': [
    { id: 'phu-my', name: 'Phường Phú Mỹ' },
    { id: 'phuoc-hoa', name: 'Phường Phước Hòa' },
    { id: 'tan-hoa', name: 'Phường Tân Hòa' },
    { id: 'tan-hai', name: 'Phường Tân Hải' },
    { id: 'tan-phuoc', name: 'Phường Tân Phước' },
    { id: 'my-xuan', name: 'Xã Mỹ Xuân' },
    { id: 'song-xoai', name: 'Xã Sông Xoài' },
    { id: 'hac-dich', name: 'Xã Hắc Dịch' },
    { id: 'chau-pha', name: 'Xã Châu Pha' },
    { id: 'tan-thanh', name: 'Xã Tân Thành' }
  ],
  
  // 33. Long An - 15 quận/huyện
  'tp-tan-an': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: 'khanh-hau', name: 'Xã Khánh Hậu' },
    { id: 'tan-khanh', name: 'Xã Tân Khánh' },
    { id: 'huong-tho-phu', name: 'Xã Hướng Thọ Phú' }
  ],
  'tx-kien-tuong': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: 'binh-hiep', name: 'Xã Bình Hiệp' },
    { id: 'binh-tan', name: 'Xã Bình Tân' },
    { id: 'thanh-hung', name: 'Xã Thạnh Hưng' },
    { id: 'thanh-tri', name: 'Xã Thạnh Trị' },
    { id: 'tuyen-thanh', name: 'Xã Tuyên Thạnh' }
  ],
  
  // 34. Tiền Giang - 11 quận/huyện
  'tp-my-tho': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: '6', name: 'Phường 6' },
    { id: '7', name: 'Phường 7' },
    { id: '8', name: 'Phường 8' },
    { id: '9', name: 'Phường 9' },
    { id: '10', name: 'Phường 10' },
    { id: 'dao-thanh', name: 'Xã Đạo Thạnh' },
    { id: 'my-phong', name: 'Xã Mỹ Phong' },
    { id: 'tan-long', name: 'Xã Tân Long' },
    { id: 'tan-my-chanh', name: 'Xã Tân Mỹ Chánh' },
    { id: 'trung-an', name: 'Xã Trung An' }
  ],
  'tp-go-cong': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '5', name: 'Phường 5' },
    { id: 'long-binh', name: 'Xã Long Bình' },
    { id: 'long-chanh', name: 'Xã Long Chánh' },
    { id: 'long-hoa', name: 'Xã Long Hòa' },
    { id: 'long-huong', name: 'Xã Long Hương' },
    { id: 'long-thuan', name: 'Xã Long Thuận' },
    { id: 'binh-xuan', name: 'Xã Bình Xuân' },
    { id: 'binh-dong', name: 'Xã Bình Đông' },
    { id: 'tan-trung', name: 'Xã Tân Trung' }
  ],
  'tx-cai-lay': [
    { id: '1', name: 'Phường 1' },
    { id: '2', name: 'Phường 2' },
    { id: '3', name: 'Phường 3' },
    { id: '4', name: 'Phường 4' },
    { id: '5', name: 'Phường 5' },
    { id: 'long-khanh', name: 'Xã Long Khánh' },
    { id: 'my-hanh-dong', name: 'Xã Mỹ Hạnh Đông' },
    { id: 'my-hanh-trung', name: 'Xã Mỹ Hạnh Trung' },
    { id: 'my-phuoc-tay', name: 'Xã Mỹ Phước Tây' },
    { id: 'my-thanh-bac', name: 'Xã Mỹ Thành Bắc' },
    { id: 'my-thanh-nam', name: 'Xã Mỹ Thành Nam' },
    { id: 'nhi-binh', name: 'Xã Nhị Bình' },
    { id: 'nhi-quy', name: 'Xã Nhị Quý' },
    { id: 'phu-an', name: 'Xã Phú An' },
    { id: 'phu-quoi', name: 'Xã Phú Quới' },
    { id: 'tam-binh', name: 'Xã Tam Bình' },
    { id: 'thanh-hoa', name: 'Xã Thanh Hòa' }
  ],
  
  // 35. Bến Tre - 9 quận/huyện
  'tp-ben-tre': [
    { id: 'phu-huong', name: 'Phường Phú Hương' },
    { id: 'phu-tan', name: 'Phường Phú Tân' },
    { id: 'son-dong', name: 'Phường Sơn Đông' },
    { id: 'binh-phu', name: 'Xã Bình Phú' },
    { id: 'my-thanh-an', name: 'Xã Mỹ Thạnh An' },
    { id: 'nhan-thanh', name: 'Xã Nhơn Thạnh' },
    { id: 'phu-my', name: 'Xã Phú Mỹ' },
    { id: 'phu-ninh', name: 'Xã Phú Ninh' }
  ],
  'chau-thanh': [
    { id: 'chau-thanh', name: 'Thị trấn Châu Thành' },
    { id: 'an-hiep', name: 'Xã An Hiệp' },
    { id: 'an-hoa', name: 'Xã An Hóa' },
    { id: 'an-khanh', name: 'Xã An Khánh' },
    { id: 'an-phuoc', name: 'Xã An Phước' },
    { id: 'giao-long', name: 'Xã Giao Long' },
    { id: 'huu-dinh', name: 'Xã Hữu Định' },
    { id: 'long-tan', name: 'Xã Long Tán' },
    { id: 'phu-an-hoa', name: 'Xã Phú An Hòa' },
    { id: 'phu-duc', name: 'Xã Phú Đức' },
    { id: 'phu-huu', name: 'Xã Phú Hữu' },
    { id: 'phu-tuc', name: 'Xã Phú Túc' },
    { id: 'quoi-son', name: 'Xã Quới Sơn' },
    { id: 'tam-phuoc', name: 'Xã Tam Phước' },
    { id: 'tan-phu', name: 'Xã Tân Phú' },
    { id: 'thanh-trieu', name: 'Xã Thành Triệu' },
    { id: 'tien-long', name: 'Xã Tiên Long' },
    { id: 'tien-thuy', name: 'Xã Tiên Thủy' }
  ],
  'cho-lach': [
    { id: 'cho-lach', name: 'Thị trấn Chợ Lách' },
    { id: 'hoa-nghia', name: 'Xã Hòa Nghĩa' },
    { id: 'hung-khanh-trung-b', name: 'Xã Hưng Khánh Trung B' },
    { id: 'long-thoi', name: 'Xã Long Thới' },
    { id: 'phu-phung', name: 'Xã Phú Phụng' },
    { id: 'phu-son', name: 'Xã Phú Sơn' },
    { id: 'son-dinh', name: 'Xã Sơn Định' },
    { id: 'tan-thieng', name: 'Xã Tân Thiềng' },
    { id: 'vinh-binh', name: 'Xã Vĩnh Bình' },
    { id: 'vinh-hoa', name: 'Xã Vĩnh Hòa' },
    { id: 'vinh-thanh', name: 'Xã Vĩnh Thành' }
  ],
  'giong-trom': [
    { id: 'giong-trom', name: 'Thị trấn Giồng Trôm' },
    { id: 'binh-thanh', name: 'Xã Bình Thạnh' },
    { id: 'chau-binh', name: 'Xã Châu Bình' },
    { id: 'chau-hoa', name: 'Xã Châu Hòa' },
    { id: 'hung-le', name: 'Xã Hưng Lễ' },
    { id: 'hung-nhan', name: 'Xã Hưng Nhượng' },
    { id: 'hung-phong', name: 'Xã Hưng Phong' },
    { id: 'long-my', name: 'Xã Long Mỹ' },
    { id: 'luong-hoa', name: 'Xã Lương Hòa' },
    { id: 'luong-phu', name: 'Xã Lương Phú' },
    { id: 'luong-quoi', name: 'Xã Lương Quới' },
    { id: 'my-thanh', name: 'Xã Mỹ Thạnh' },
    { id: 'phong-my', name: 'Xã Phong Mỹ' },
    { id: 'phuoc-long', name: 'Xã Phước Long' },
    { id: 'son-phu', name: 'Xã Sơn Phú' },
    { id: 'tan-ha', name: 'Xã Tân Hà' },
    { id: 'tan-hoa', name: 'Xã Tân Hòa' },
    { id: 'tan-loi-thanh', name: 'Xã Tân Lợi Thạnh' },
    { id: 'tan-thanh', name: 'Xã Tân Thanh' },
    { id: 'thuan-dien', name: 'Xã Thuận Điền' }
  ],
  'ba-tri': [
    { id: 'ba-tri', name: 'Thị trấn Bình Đại' },
    { id: 'binh-dong', name: 'Xã Bình Đông' },
    { id: 'binh-phu', name: 'Xã Bình Phú' },
    { id: 'binh-thang', name: 'Xã Bình Thắng' },
    { id: 'chau-hung', name: 'Xã Châu Hưng' },
    { id: 'dai-hoa-loc', name: 'Xã Đại Hòa Lộc' },
    { id: 'dinh-trung', name: 'Xã Định Trung' },
    { id: 'loc-thuan', name: 'Xã Lộc Thuận' },
    { id: 'long-dinh', name: 'Xã Long Định' },
    { id: 'long-hoa', name: 'Xã Long Hòa' },
    { id: 'phu-long', name: 'Xã Phú Long' },
    { id: 'phu-thuan', name: 'Xã Phú Thuận' },
    { id: 'phu-vang', name: 'Xã Phú Vang' },
    { id: 'tam-hiep', name: 'Xã Tam Hiệp' },
    { id: 'thanh-phuoc', name: 'Xã Thạnh Phước' },
    { id: 'thanh-tri', name: 'Xã Thạnh Trị' },
    { id: 'thoi-thuan', name: 'Xã Thới Thuận' },
    { id: 'thua-duc', name: 'Xã Thừa Đức' },
    { id: 'vang-quoi-dong', name: 'Xã Vang Quới Đông' },
    { id: 'vang-quoi-tay', name: 'Xã Vang Quới Tây' }
  ],
  'thanh-phu': [
    { id: 'thanh-phu', name: 'Thị trấn Thạnh Phú' },
    { id: 'an-dien', name: 'Xã An Điền' },
    { id: 'an-nhon', name: 'Xã An Nhơn' },
    { id: 'an-quy', name: 'Xã An Quy' },
    { id: 'an-thanh', name: 'Xã An Thạnh' },
    { id: 'an-thuan', name: 'Xã An Thuận' },
    { id: 'binh-thanh', name: 'Xã Bình Thạnh' },
    { id: 'dai-dien', name: 'Xã Đại Điền' },
    { id: 'gia-thanh', name: 'Xã Giao Thạnh' },
    { id: 'hoa-loi', name: 'Xã Hòa Lợi' },
    { id: 'my-an', name: 'Xã Mỹ An' },
    { id: 'my-hung', name: 'Xã Mỹ Hưng' },
    { id: 'phu-khanh', name: 'Xã Phú Khánh' },
    { id: 'quoi-dien', name: 'Xã Quới Điền' },
    { id: 'tan-phong', name: 'Xã Tân Phong' },
    { id: 'thanh-hai', name: 'Xã Thạnh Hải' },
    { id: 'thanh-phong', name: 'Xã Thạnh Phong' },
    { id: 'thoi-thanh', name: 'Xã Thới Thạnh' }
  ],
  'mo-cay-nam': [
    { id: 'mo-cay', name: 'Thị trấn Mỏ Cày' },
    { id: 'an-dinh', name: 'Xã An Định' },
    { id: 'an-thoi', name: 'Xã An Thới' },
    { id: 'binh-khanh', name: 'Xã Bình Khánh' },
    { id: 'cam-son', name: 'Xã Cẩm Sơn' },
    { id: 'da-phuoc-hoi', name: 'Xã Đa Phước Hội' },
    { id: 'dinh-thuy', name: 'Xã Định Thủy' },
    { id: 'huong-my', name: 'Xã Hương Mỹ' },
    { id: 'minh-duc', name: 'Xã Minh Đức' },
    { id: 'ngai-dang', name: 'Xã Ngãi Đăng' },
    { id: 'phuoc-hiep', name: 'Xã Phước Hiệp' },
    { id: 'tan-hoi', name: 'Xã Tân Hội' },
    { id: 'tan-trung', name: 'Xã Tân Trung' },
    { id: 'thanh-an', name: 'Xã Thạnh An' },
    { id: 'thanh-phuoc', name: 'Xã Thạnh Phước' }
  ],
  'mo-cay-bac': [
    { id: 'phuoc-my-trung', name: 'Thị trấn Phước Mỹ Trung' },
    { id: 'hung-khanh-trung-a', name: 'Xã Hưng Khánh Trung A' },
    { id: 'my-an', name: 'Xã Mỹ An' },
    { id: 'my-hung', name: 'Xã Mỹ Hưng' },
    { id: 'phu-my', name: 'Xã Phú Mỹ' },
    { id: 'phuoc-my', name: 'Xã Phước Mỹ' },
    { id: 'tan-thanh-tay', name: 'Xã Tân Thành Tây' },
    { id: 'tan-thanh-dong', name: 'Xã Tân Thành Đông' },
    { id: 'thanh-an', name: 'Xã Thạnh An' }
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
    const cityObj = cities.find(c => c.id === data.city);
    const cityName = cityObj?.name || '';
    
    const districtObj = districts[data.city]?.find(d => d.id === data.district);
    const districtName = districtObj?.name || '';
    
    const wardObj = wards[data.district]?.find(w => w.id === data.ward);
    const wardName = wardObj?.name || '';

    // Lấy tên vấn đề sức khỏe
    const healthIssueObj = healthIssues.find(i => i.value === data.healthIssue);
    const healthIssueLabel = healthIssueObj?.label || '';

    // Chuẩn bị dữ liệu gửi đi - ĐẢM BẢO KHỚP VỚI HEADERS TRONG SHEET
    const submissionData = {
      timestamp: new Date().toLocaleString('vi-VN'),
      fullName: data.name,
      phone: data.phone,
      email: data.email || '',
      city: cityName, // Gửi tên thành phố thay vì ID
      district: districtName, // Gửi tên quận/huyện thay vì ID
      ward: wardName, // Gửi tên phường/xã thay vì ID
      street: data.street,
      fullAddress: `${data.street}, ${wardName}, ${districtName}, ${cityName}`.replace(/^, |, $/g, ''),
      healthIssue: healthIssueLabel,
      healthIssueDetail: data.healthIssue === 'khac' ? data.healthIssueOther : '',
      notes: data.message || '',
      products: data.products || 'Không có sản phẩm',
      totalAmount: customBasketItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime
    };

    console.log('Đang gửi dữ liệu:', submissionData);

    // THỬ CÁCH 1: Dùng mode: 'no-cors' (đơn giản nhất)
    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      mode: 'no-cors', // TẠM THỜI DÙNG no-cors để test
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    });

    // Với no-cors, response sẽ là opaque, không thể đọc được
    // Nhưng request vẫn được gửi đi
    console.log('Đã gửi request với mode no-cors');
    
    // Tạm thời return true để không hiện chế độ test
    // Sau đó kiểm tra trong Google Sheet xem có dữ liệu không
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
          `Đặt lịch thành công!\n\nThông tin lịch hẹn:\n• Họ tên: ${formData.name}\n• SĐT: ${formData.phone}\n• Địa chỉ: ${fullAddress}\n• Vấn đề: ${healthIssueDisplay}\n\nChúng tôi sẽ liên hệ xác nhận trong vòng 2 giờ làm việc.`
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
          `Đặt lịch khám thành công (Chế độ test)!\n\nThông tin lịch hẹn:\n• Họ tên: ${formData.name}\n• SĐT: ${formData.phone}\n• Vấn đề sức khỏe: ${formData.healthIssueDisplay}\n`
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