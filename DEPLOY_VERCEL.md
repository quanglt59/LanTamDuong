## Hướng dẫn deploy dự án Vite + React lên Vercel

Dự án này là một landing page dùng **Vite + React** (theo `package.json`). Tài liệu này hướng dẫn bạn deploy lên **Vercel** theo cách chuẩn, dùng GitHub (khuyến nghị) và kèm thêm tùy chọn dùng Vercel CLI.

---

### 1. Chuẩn bị dự án trên máy local

- **Cài dependencies**

  ```bash
  npm install
  ```

- **Chạy thử ứng dụng**

  ```bash
  npm run dev
  ```

  Mở trình duyệt tại địa chỉ mà Vite in ra (thường là `http://localhost:5173`) và kiểm tra mọi thứ hoạt động bình thường trước khi deploy.

---

### 2. Khởi tạo Git repo và đẩy lên GitHub

Nếu dự án chưa nằm trong Git repo:

- **Khởi tạo Git**

  ```bash
  git init
  ```

- **Tạo file `.gitignore` (nếu chưa có)** và đảm bảo có dòng:

  ```bash
  node_modules
  dist
  .vercel
  ```

- **Commit mã nguồn lần đầu**

  ```bash
  git add .
  git commit -m "Initial commit"
  ```

- **Tạo repository trên GitHub**

  1. Vào `https://github.com` → New repository.
  2. Đặt tên repo (ví dụ: `landing-page`).
  3. Chọn **Private** hoặc **Public** tùy nhu cầu.
  4. Tạo repo (Create repository).

- **Kết nối repo local với GitHub và push**

  Trong thư mục dự án, chạy:

  ```bash
  git remote add origin https://github.com/<username>/<ten-repo>.git
  git branch -M main
  git push -u origin main
  ```

Thay `<username>` và `<ten-repo>` bằng thông tin thật của bạn.

---

### 3. Tạo project trên Vercel từ GitHub

- **Đăng ký / đăng nhập Vercel**

  1. Truy cập `https://vercel.com`.
  2. Đăng nhập bằng GitHub (khuyến nghị) hoặc tài khoản khác.

- **Import dự án từ GitHub**

  1. Nhấn **Add New… → Project**.
  2. Ở tab **Import Git Repository**, chọn repo mà bạn vừa push (`landing-page`).
  3. Nhấn **Import**.

- **Cấu hình build cho Vite + React**

  Vercel thường tự nhận ra đây là **Vite** project. Kiểm tra lại:

  - **Framework Preset**: chọn `Vite` (nếu chưa được chọn sẵn).
  - **Root Directory**: để trống (hoặc đường dẫn thư mục chứa `package.json` nếu bạn đặt dự án trong subfolder).
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

  Phần này cần khớp với `scripts` trong `package.json`:

  ```json
  "scripts": {
    "build": "vite build"
  }
  ```

- **Tiến hành deploy lần đầu**

  Nhấn **Deploy**. Vercel sẽ:

  - Cài dependencies.
  - Chạy `npm run build`.
  - Upload thư mục `dist` lên hạ tầng của Vercel.

  Sau khi xong, Vercel sẽ cung cấp cho bạn một URL dạng:

  ```text
  https://<ten-project>.vercel.app
  ```

---

### 4. Thiết lập biến môi trường (nếu có)

Nếu sau này bạn cần dùng API key hoặc biến môi trường:

- Vào project của bạn trên Vercel.
- Vào **Settings → Environment Variables**.
- Nhấn **Add** và thêm các biến (ví dụ: `VITE_API_URL`, `VITE_API_KEY`, …).
- Sau khi cập nhật, nhấn **Redeploy** (hoặc trigger build lại bằng cách push code mới).

Lưu ý: Với Vite, các biến môi trường dùng trong client cần bắt đầu bằng `VITE_`.

---

### 5. Quy trình deploy mỗi lần cập nhật code

Sau khi thiết lập xong lần đầu, mỗi lần bạn sửa code:

1. Commit thay đổi:

   ```bash
   git add .
   git commit -m "Cập nhật nội dung landing page"
   ```

2. Push lên GitHub:

   ```bash
   git push
   ```

3. Vercel sẽ **tự động build và deploy** phiên bản mới. Bạn có thể xem tiến trình trong tab **Deployments** của project trên Vercel.

---

### 6. (Tuỳ chọn) Deploy trực tiếp bằng Vercel CLI

Nếu bạn muốn deploy trực tiếp từ máy local (không cần GitHub), có thể dùng **Vercel CLI**:

- **Cài Vercel CLI**

  ```bash
  npm install -g vercel
  ```

- **Đăng nhập**

  ```bash
  vercel login
  ```

- **Deploy lần đầu**

  Trong thư mục dự án:

  ```bash
  vercel
  ```

  Trả lời các câu hỏi theo nhu cầu (project name, link account, v.v.). Vercel sẽ ghi cấu hình vào thư mục `.vercel`.

- **Deploy lại**

  Sau khi đã cấu hình xong lần đầu, những lần sau chỉ cần:

  ```bash
  vercel --prod
  ```

---

### 7. Ghi chú thêm

- **Kiểm tra log build**: nếu deploy thất bại, xem tab **Deployments → View Logs** trên Vercel để biết nguyên nhân (thiếu package, lỗi build, v.v.).
- **Kiểm tra Node version**: nếu gặp lỗi liên quan Node version, bạn có thể khai báo trong `package.json`:

  ```json
  "engines": {
    "node": ">=18"
  }
  ```

  Sau đó commit và push lại để Vercel dùng version phù hợp.

Từ giờ, bạn chỉ cần **push code** (hoặc chạy `vercel --prod`) là landing page sẽ được cập nhật tự động trên Vercel.

