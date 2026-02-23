# Logo - Vị Bắc Kạn

## File Logo

**Tên file:** `logo.png`  
**Vị trí:** `public/images/logo.png`

## Mô tả Logo

Logo tròn với:
- Cảnh quan Bắc Kạn (núi rừng, nhà sàn, ruộng bậc thang)
- Giỏ quà nông sản đầy đủ
- Text: "VỊ BẮC KẠN"
- Tagline: "Nông Sản Sạch Ngày Tết"

## Yêu cầu kỹ thuật

**Kích thước:**
- Khuyến nghị: 200x200px (logo tròn)
- Hoặc: 300x300px cho độ phân giải cao
- Tỷ lệ: 1:1 (vuông)

**Định dạng:**
- PNG (khuyến nghị - hỗ trợ transparency)
- Hoặc: SVG (vector, scale tốt)
- Hoặc: WebP (tối ưu dung lượng)

**Background:**
- Nền trong suốt (transparent) - khuyến nghị
- Hoặc: Nền trắng/beige nếu không có transparency

**Chất lượng:**
- Độ phân giải cao (retina-ready)
- File size: < 100KB (tối ưu)

## Cách thêm Logo

1. Đặt file logo vào: `public/images/logo.png`
2. Logo sẽ tự động hiển thị trên header
3. Component Logo sẽ tự động điều chỉnh kích thước theo className

## Lưu ý

- Logo sẽ được hiển thị với `object-contain` để giữ tỷ lệ
- Kích thước trên header được điều chỉnh qua className
- Nếu không tìm thấy logo, sẽ có fallback (logo cũ)
