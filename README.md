# 🎓 AI English Exam Vocabulary Architect (EVM)
> **Kiến trúc sư từ vựng đề thi tiếng Anh THPT Quốc Gia** – Ứng dụng ngôn ngữ học ngữ liệu (Corpus Linguistics) trích xuất Collocations, Phrasal Verbs, Idioms, Prepositions, tạo Flashcards và AI Quiz cá nhân hóa.

---

## 🌟 Các chức năng cốt lõi (Core Features)

Ứng dụng tập trung chuẩn xác vào 4 chức năng chính theo mô tả chuẩn EVM:

1. **📄 Phân tích & Trích xuất Từ vựng Đề thi (Exam Extractor)**:
   - Tải tệp đề thi (.PDF / .TXT) hoặc chọn đề mẫu THPT Quốc Gia.
   - AI bóc tách chính xác 5 nhóm từ vựng: **Collocations, Phrasal verbs, Idioms, Prepositions, Single words**.
   - Cung cấp đầy đủ: Từ gốc, phiên âm IPA, nghĩa tiếng Việt sát bài thi, câu gốc trong đề thi (Contextual Example) và mẹo bẫy thi THPT.
   - Thao tác nhanh: Chọn từ để lưu vào Sổ tay, mở Flashcard hoặc tạo AI Quiz.

2. **📖 Sổ tay Từ vựng Cá nhân (Vocabulary Notebook)**:
   - Quản lý danh sách từ vựng đã lưu, tra cứu tìm kiếm và lọc theo 5 nhóm từ hoặc trạng thái (Chưa thuộc / Đang học / Đã thành thạo).
   - Nghe phát âm IPA chuẩn Anh - Anh (UK) hoặc Anh - Mỹ (US).
   - Thêm từ mới thủ công hoặc xuất dữ liệu ôn tập.

3. **🎴 Thẻ ghi nhớ Flashcards (Flashcard Deck)**:
   - Thẻ lật 2 mặt trực quan (Mặt trước: từ vựng + loại từ + phát âm; Mặt sau: nghĩa tiếng Việt + câu ví dụ gốc + mẹo thi).
   - Nghe phát âm tự động, đánh dấu mức độ thuộc, hỗ trợ phím tắt tiện lợi (Space để lật, Mũi tên để chuyển thẻ).

4. **📝 Luyện thi AI Quiz (Adaptive Quiz Engine)**:
   - Tạo bài tập trắc nghiệm 4 lựa chọn trực tiếp từ danh mục từ vựng cá nhân (Dạng điền từ, Đồng/trái nghĩa, Hoàn thành câu).
   - Chấm điểm ngay, giải thích chi tiết đáp án và tự động cập nhật độ thành thạo từ vựng.

5. **⚡ Cơ chế Fallback AI 3 Tầng & Quản lý API Key (Rule 1 & Rule 3)**:
   - Tự động luân chuyển model dự phòng khi gặp sự cố/hạn ngạch: `gemini-3.8-flash` &rarr; `gemini-2.5-flash` &rarr; `gemini-1.5-flash`.
   - Lưu trữ API Key an toàn trong trình duyệt (`localStorage`) của người dùng.

---

## 🌐 Hướng dẫn Triển khai Vercel (Deployment Guide)

Dự án đã được cấu hình tối ưu để triển khai tĩnh trên **Vercel** chỉ với 1 click:

### 1. File cấu hình đã sẵn sàng:
- `vercel.json`: Đã thiết lập rewrite SPA:
  ```json
  {
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
  ```
- `index.html`: Đã liên kết đầy đủ font Google Plus Jakarta Sans, JetBrains Mono và script `/src/main.tsx`.

### 2. Các bước triển khai qua GitHub:
1. Đẩy mã nguồn dự án lên kho lưu trữ **GitHub** cá nhân của bạn.
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
3. Nhấn **"Add New..."** &rarr; **"Project"**.
4. Chọn repository `ai-english-exam-vocabulary-architect-(evm)` và bấm **Import**.
5. Cấu hình Build:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - *(Tùy chọn)* Nếu muốn cấp sẵn key mặc định cho cả app, thêm biến môi trường: `VITE_GEMINI_API_KEY = your_gemini_api_key`. Nếu không, người dùng sẽ tự nhập key trên giao diện web.
6. Nhấn **Deploy**. Chỉ sau 1–2 phút, ứng dụng của bạn sẽ hoạt động trực tiếp trên tên miền Vercel (ví dụ: `https://your-app.vercel.app`)!

---

## 🔑 Hướng dẫn Người dùng Nhập Gemini API Key

1. Người dùng truy cập [Google AI Studio (aistudio.google.com/api-keys)](https://aistudio.google.com/api-keys).
2. Đăng nhập bằng tài khoản Google bất kỳ và nhấn **"Create API key"**.
3. Sao chép chuỗi mã API Key (bắt đầu bằng `AIzaSy...`).
4. Trên giao diện app EVM:
   - Nhấn nút **Settings (API Key)** (kèm dòng chữ đỏ *"Lấy API key để sử dụng app"*) ở góc trên bên phải Header.
   - Dán mã API Key vào ô nhập.
   - Chọn Model ưu tiên (`gemini-3-flash-preview` hoặc `gemini-3-pro-preview`).
   - Nhấn **"Kiểm tra kết nối"** để thử ping API.
   - Nhấn **"Lưu & Sử dụng"**. Key sẽ được lưu trên trình duyệt của riêng bạn (an toàn, bảo mật).

---

## 💻 Chạy cục bộ trên máy tính (Local Development)

```bash
# Cài đặt thư viện
npm install

# Khởi chạy máy chủ phát triển
npm run dev

# Kiểm tra bản build
npm run build
npm run preview
```
