# 🎓 AI English Exam Vocabulary Architect (EVM)
> **Kiến trúc sư từ vựng đề thi tiếng Anh THPT Quốc Gia** – Ứng dụng ngôn ngữ học ngữ liệu (Corpus Linguistics) trích xuất Collocations, Phrasal Verbs, Idioms, Prepositions, tạo Flashcards và AI Quiz cá nhân hóa.

---

## 🌟 Tối ưu hóa từ Bộ Skill Giáo dục (Educational Skills Integration)

Ứng dụng được nâng cấp toàn diện dựa trên bộ tiêu chuẩn kỹ năng sư phạm hiện đại:

1. **📄 Xuất Đề thi & Phiếu Bài tập Word (.doc) chuẩn Bộ GD&ĐT (`docx-official`)**:
   - Tự động xuất phiếu từ vựng hoặc đề trắc nghiệm AI ra tệp Microsoft Word (`.doc`) với đầy đủ tiêu đề Sở GD&ĐT/Trường THPT, khung điền thông tin thí sinh, câu hỏi trắc nghiệm, **Bảng đáp án (Answer Key Matrix)** và phần **Lời giải chi tiết từng câu**.
   - Hỗ trợ in ấn trực tiếp hoặc tải file phục vụ giáo viên phát cho học sinh làm bài trên lớp.

2. **🎮 Đấu Trường Phản Xạ 60 Giây - Gamification (`game-development`)**:
   - Chế độ **Quick-Fire Vocab Arena**: 60 giây đếm ngược kiểm tra phản xạ chọn nghĩa tiếng Việt của các cụm từ vựng.
   - Cơ chế tính điểm nhân số (Combo Streak Multiplier x2, x3, x4), âm thanh phát âm Cambridge/Oxford và hiệu ứng pháo hoa Confetti khi phá kỷ lục điểm (High Score lưu trên `localStorage`).

3. **📊 Phân tích Ngữ liệu & Chẩn đoán Sư phạm Điểm yếu (`d3-visualization`)**:
   - Biểu đồ phân bổ độ khó theo khung tham chiếu châu Âu: **B1** (Cơ bản), **B2** (Khá - Phổ biến THPT), **C1** (Phân loại điểm 9+).
   - **Hệ thống chẩn đoán điểm yếu (Weakness Diagnosis)**: Tự động phát hiện nhóm từ vựng mà học sinh hay làm sai nhất (VD: cụm giới từ phụ thuộc hay thành ngữ), đưa ra cảnh báo và chiến thuật ôn tập bẫy đề thi.

4. **🧠 Thuật toán Lặp lại Ngắt quãng (Spaced Repetition System - Leitner Box)**:
   - Gắn nhãn chu kỳ ghi nhớ cho từng Flashcard:
     - 📦 **Hộp 1**: *Chưa thuộc* (Cần ôn hàng ngày)
     - 📦 **Hộp 2**: *Đang học* (Ôn ngắt quãng sau 3 ngày)
     - 📦 **Hộp 3**: *Đã thành thạo* (Ôn kiểm tra sau 7 ngày)
   - Tích hợp trọn bộ phím tắt (Space để lật, phím Mũi tên trái/phải, phím số 1, 2, 3).

5. **⚡ Cơ chế Fallback AI 3 Tầng & Trực tiếp Phía Client (Rule 1 & Rule 3)**:
   - Tự động luân chuyển: `gemini-3-flash-preview` &rarr; `gemini-3-pro-preview` &rarr; `gemini-2.5-flash`.
   - Giữ nguyên kết quả các bước trước, chỉ retry bước gặp sự cố.
   - Hiển thị nguyên văn lỗi API màu đỏ khi hết quota (VD: `429 RESOURCE_EXHAUSTED`), chuyển trạng thái các cột đang chờ thành **"Đã dừng do lỗi"**.

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
