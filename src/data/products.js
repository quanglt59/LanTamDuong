// Dữ liệu sản phẩm lẻ từ hình ảnh "Nông Sản Sạch Tây Bắc"
export const products = [
  // Đặc Sản
  {
    id: 'dac-san-1',
    name: 'Mật ong rừng Pác Nặm',
    category: 'Đặc Sản',
    price: 350000,
    unit: '500ml',
    description: 'Mật ong rừng nguyên chất từ Pác Nặm, Bắc Kạn. Thu hoạch từ hoa rừng tự nhiên, không pha trộn.',
    image: '/products/mat-ong-rung.png',
    inStock: true,
    featured: true
  },
  {
    id: 'dac-san-2',
    name: 'Thịt Trâu gác bếp',
    category: 'Đặc Sản',
    price: 450000,
    unit: '500g',
    description: 'Thịt trâu gác bếp truyền thống Tây Bắc, thơm ngon đậm đà, phù hợp làm quà Tết.',
    image: '/products/thit-trau-gac-bep.png',
    inStock: true,
    featured: true
  },
  {
    id: 'dac-san-3',
    name: 'Thịt Bò gác bếp',
    category: 'Đặc Sản',
    price: 420000,
    unit: '500g',
    description: 'Thịt bò gác bếp được chế biến theo phương pháp truyền thống, giữ nguyên hương vị đặc trưng.',
    image: '/products/thit-bo-gac-bep.png',
    inStock: true,
    featured: false
  },
  {
    id: 'dac-san-4',
    name: 'Thịt Lợn gác bếp',
    category: 'Đặc Sản',
    price: 380000,
    unit: '500g',
    description: 'Thịt lợn gác bếp thơm ngon, đậm đà vị Tây Bắc, phù hợp làm quà biếu.',
    image: '/products/thit-lon-gac-bep.png',
    inStock: true,
    featured: false
  },
  {
    id: 'dac-san-5',
    name: 'Lạp sườn Lợn ta',
    category: 'Đặc Sản',
    price: 320000,
    unit: '500g',
    description: 'Lạp sườn được làm từ thịt lợn ta, thơm ngon, đậm đà hương vị đặc trưng.',
    image: '/products/lap-suon.png',
    inStock: true,
    featured: false
  },
  {
    id: 'dac-san-6',
    name: 'Thịt chua',
    category: 'Đặc Sản',
    price: 280000,
    unit: '500g',
    description: 'Thịt chua lên men tự nhiên, vị chua thanh, thơm ngon đặc trưng Tây Bắc.',
    image: '/products/thit-chua.png',
    inStock: true,
    featured: false
  },
  {
    id: 'dac-san-7',
    name: 'Chẩm chéo Điện Biên',
    category: 'Đặc Sản',
    price: 150000,
    unit: '200g',
    description: 'Chẩm chéo Điện Biên cay nồng, thơm ngon, gia vị đặc trưng của vùng Tây Bắc.',
    image: '/products/cham-cheo.png',
    inStock: true,
    featured: false
  },
  
  // Miến Dong
  {
    id: 'mien-dong-1',
    name: 'Miến sợi to Hoàng Mười',
    category: 'Miến Dong',
    price: 120000,
    unit: '500g',
    description: 'Miến dong sợi to, dai ngon, làm từ củ dong riềng nguyên chất.',
    image: '/products/mien-soi-to.png',
    inStock: true,
    featured: false
  },
  {
    id: 'mien-dong-2',
    name: 'Miến sợi rút Hoàng Mười',
    category: 'Miến Dong',
    price: 110000,
    unit: '500g',
    description: 'Miến dong sợi rút mỏng, dai giòn, thơm ngon đặc trưng.',
    image: '/products/mien-soi-rut.png',
    inStock: true,
    featured: false
  },
  {
    id: 'mien-dong-3',
    name: 'Miến dong Điện Biên',
    category: 'Miến Dong',
    price: 130000,
    unit: '500g',
    description: 'Miến dong Điện Biên chất lượng cao, dai ngon, không bị nát khi nấu.',
    image: '/products/mien-dong-dien-bien.png',
    inStock: true,
    featured: true
  },
  {
    id: 'mien-dong-4',
    name: 'Miến sâm Điện Biên',
    category: 'Miến Dong',
    price: 180000,
    unit: '500g',
    description: 'Miến dong kết hợp với sâm, bổ dưỡng, thơm ngon đặc biệt.',
    image: '/products/mien-sam.png',
    inStock: true,
    featured: false
  },
  {
    id: 'mien-dong-5',
    name: 'Miến dong Tài Hoan',
    category: 'Miến Dong',
    price: 125000,
    unit: '500g',
    description: 'Miến dong Tài Hoan truyền thống, dai ngon, chất lượng cao.',
    image: '/products/mien-dong-tai-hoan.png',
    inStock: true,
    featured: false
  },
  
  // Rượu (Men Cay)
  {
    id: 'ruou-1',
    name: 'Rượu men lá',
    category: 'Rượu',
    price: 250000,
    unit: '500ml',
    description: 'Rượu men lá truyền thống Tây Bắc, thơm ngon, nồng độ vừa phải.',
    image: '/products/ruou-men-la.png',
    inStock: true,
    featured: true
  },
  {
    id: 'ruou-2',
    name: 'Rượu ngô',
    category: 'Rượu',
    price: 220000,
    unit: '500ml',
    description: 'Rượu ngô thơm ngon, được ủ từ ngô nếp địa phương.',
    image: '/products/ruou-ngo.png',
    inStock: true,
    featured: false
  },
  {
    id: 'ruou-3',
    name: 'Rượu núi đá',
    category: 'Rượu',
    price: 280000,
    unit: '500ml',
    description: 'Rượu núi đá đặc sản, thơm ngon, được ủ theo phương pháp truyền thống.',
    image: '/products/ruou-nui-da.png',
    inStock: true,
    featured: false
  },
  {
    id: 'ruou-4',
    name: 'Rượu sâm Ngọc Linh',
    category: 'Rượu',
    price: 850000,
    unit: '500ml',
    description: 'Rượu sâm Ngọc Linh cao cấp, bổ dưỡng, phù hợp làm quà biếu cao cấp.',
    image: '/products/ruou-sam-ngoc-linh.png',
    inStock: true,
    featured: true
  },
  
  // Đồ Khô
  {
    id: 'do-kho-1',
    name: 'Chè Tân Cương - Thái Nguyên',
    category: 'Đồ Khô',
    price: 200000,
    unit: '200g',
    description: 'Chè Tân Cương Thái Nguyên thơm ngon, hương vị đặc trưng, chất lượng cao.',
    image: '/products/che-tan-cuong.png',
    inStock: true,
    featured: true
  },
  {
    id: 'do-kho-2',
    name: 'Măng khô',
    category: 'Đồ Khô',
    price: 180000,
    unit: '500g',
    description: 'Măng khô rừng tự nhiên, thơm ngon, giữ nguyên hương vị đặc trưng.',
    image: '/products/mang-kho.png',
    inStock: true,
    featured: false
  },
  {
    id: 'do-kho-3',
    name: 'Nấm Hương',
    category: 'Đồ Khô',
    price: 250000,
    unit: '200g',
    description: 'Nấm hương khô chất lượng cao, thơm ngon, bổ dưỡng.',
    image: '/products/nam-huong.png',
    inStock: true,
    featured: false
  },
  {
    id: 'do-kho-4',
    name: 'Mộc nhĩ',
    category: 'Đồ Khô',
    price: 150000,
    unit: '200g',
    description: 'Mộc nhĩ khô sạch, chất lượng cao, thơm ngon.',
    image: '/products/moc-nhi.png',
    inStock: true,
    featured: false
  },
  {
    id: 'do-kho-5',
    name: 'Gạo séng cù',
    category: 'Đồ Khô',
    price: 120000,
    unit: '1kg',
    description: 'Gạo séng cù đặc sản, thơm ngon, dẻo ngọt tự nhiên.',
    image: '/products/gao-seng-cu.png',
    inStock: true,
    featured: false
  },
  {
    id: 'do-kho-6',
    name: 'Gạo nếp Khẩu Nua Lếch',
    category: 'Đồ Khô',
    price: 140000,
    unit: '1kg',
    description: 'Gạo nếp Khẩu Nua Lếch đặc sản, dẻo thơm, chất lượng cao.',
    image: '/products/gao-nep-khau-nua-lech.png',
    inStock: true,
    featured: false
  },
  {
    id: 'do-kho-7',
    name: 'Gạo nếp nương Điện Biên',
    category: 'Đồ Khô',
    price: 130000,
    unit: '1kg',
    description: 'Gạo nếp nương Điện Biên thơm ngon, dẻo ngọt tự nhiên.',
    image: '/products/gao-nep-nuong-dien-bien.png',
    inStock: true,
    featured: false
  },
  
  // Đồ Tươi (cần đặt trước 1 ngày)
  {
    id: 'do-tuoi-1',
    name: 'Thịt lợn rừng',
    category: 'Đồ Tươi',
    price: 450000,
    unit: '1kg',
    description: 'Thịt lợn rừng tươi ngon, đặt hàng trước 1 ngày. Nguồn gốc rõ ràng, chất lượng cao.',
    image: '/products/thit-lon-rung.png',
    inStock: true,
    featured: true,
    requiresPreOrder: true,
    preOrderDays: 1
  },
  {
    id: 'do-tuoi-2',
    name: 'Gà đồi',
    category: 'Đồ Tươi',
    price: 280000,
    unit: '1 con',
    description: 'Gà đồi thả vườn, thịt chắc, thơm ngon. Đặt hàng trước 1 ngày.',
    image: '/products/ga-doi.png',
    inStock: true,
    featured: false,
    requiresPreOrder: true,
    preOrderDays: 1
  },
  {
    id: 'do-tuoi-3',
    name: 'Vịt suối',
    category: 'Đồ Tươi',
    price: 320000,
    unit: '1 con',
    description: 'Vịt suối thả tự nhiên, thịt thơm ngon. Đặt hàng trước 1 ngày.',
    image: '/products/vit-suoi.png',
    inStock: true,
    featured: false,
    requiresPreOrder: true,
    preOrderDays: 1
  }
];

export const categories = [
  { id: 'all', name: 'Tất cả', icon: '📦' },
  { id: 'Đặc Sản', name: 'Đặc Sản', icon: '⭐' },
  { id: 'Miến Dong', name: 'Miến Dong', icon: '🍜' },
  { id: 'Rượu', name: 'Rượu', icon: '🍶' },
  { id: 'Đồ Khô', name: 'Đồ Khô', icon: '🌾' },
  { id: 'Đồ Tươi', name: 'Đồ Tươi', icon: '🥩' }
];
