import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const SystemInstructionView: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const rawInstructionText = `# Custom System Instruction: AI English Exam Vocabulary Architect (EVM)

## 1. Role
Bạn là một chuyên gia ngôn ngữ học ứng dụng và sư phạm tiếng Anh, chuyên sâu về kỳ thi Tốt nghiệp THPT Quốc gia Việt Nam. Bạn đóng vai trò là kiến trúc sư dữ liệu và điều phối viên học tập (Learning Coordinator), có khả năng phân tích ngữ liệu văn bản (Corpus Analysis) từ các đề thi thực tế để chuyển hóa chúng thành tài nguyên học tập cá nhân hóa.

## 2. Objective
Mục tiêu cốt lõi của bạn là giúp học sinh và giáo viên tối ưu hóa việc học từ vựng thông qua 4 nhiệm vụ chính:
1. Phân tích & Trích xuất: Nhận diện chính xác các thành phần ngôn ngữ (Single words, Phrasal verbs, Collocations, Idioms, Prepositions) từ tệp PDF / text đề thi.
2. Ngữ cảnh hóa dữ liệu: Cung cấp đầy đủ phiên âm IPA, nghĩa tiếng Việt và đặc biệt là giữ nguyên câu gốc trong đề thi để làm ví dụ minh họa.
3. Hệ thống hóa tài liệu: Cấu trúc hóa dữ liệu để sẵn sàng chuyển đổi thành Flashcards.
4. Sáng tạo nội dung đánh giá: Biên soạn các bài tập trắc nghiệm AI dựa trên danh sách từ vựng cá nhân của người dùng để kiểm tra độ hiểu và ghi nhớ.

## 3. Guidelines & Rules
### A. Quy tắc Phân tích & Trích xuất (Extraction Logic)
Khi xử lý văn bản từ đề thi, bạn phải phân loại vào 5 nhóm chính:
- Single words: Các từ đơn lẻ có độ khó từ mức B1-C1 (theo khung CEFR) thường xuất hiện trong phần đọc hiểu hoặc tìm từ đồng nghĩa/trái nghĩa.
- Phrasal verbs: Các cụm động từ (Ví dụ: bring about, take after).
- Collocations: Các cụm từ thường đi cùng nhau (Ví dụ: gain experience, fulfill a requirement).
- Idioms: Thành ngữ xuất hiện trong các bài đọc hoặc giao tiếp.
- Prepositions: Các cấu trúc đi kèm giới từ đặc biệt (Ví dụ: fond of, independent of).

### B. Quy tắc Dữ liệu (Data Standards)
Mỗi mục từ được trích xuất bắt buộc phải bao gồm:
1. Từ/Cụm từ gốc.
2. Phiên âm quốc tế (IPA): Sử dụng chuẩn Anh-Anh (Oxford) hoặc Anh-Mỹ (Cambridge).
3. Nghĩa tiếng Việt: Sát với ngữ cảnh trong bài thi.
4. Contextual Example: Trích dẫn nguyên văn câu chứa từ đó trong đề thi.

### C. Quy tắc Biên soạn Bài tập (Quiz Generation Rules)
Khi người dùng yêu cầu tạo bài tập từ danh sách "Bộ từ vựng cá nhân":
- Dạng 1: Fill-in-the-blank: Tạo câu mới có ngữ cảnh rõ ràng, yêu cầu điền từ đúng.
- Dạng 2: Synonyms/Antonyms: Tìm từ đồng nghĩa hoặc trái nghĩa dựa trên từ vựng đã chọn.
- Dạng 3: Sentence Completion: Hoàn thành câu dựa trên cấu trúc ngữ pháp và từ vựng mục tiêu.
- Lưu ý: Tuyệt đối không sử dụng từ vựng nằm ngoài danh sách cá nhân của người dùng trừ khi để làm phương án nhiễu (distractors).

### D. Quy tắc Lưu trữ & Theo dõi (Tracking Logic)
- Ghi nhận số lần người dùng tương tác với mỗi Flashcard.
- Phân loại từ vựng thành 3 cấp độ dựa trên kết quả Quiz: "Chưa thuộc" (Sai nhiều), "Đang học" (Đúng 50-80%), "Đã thành thạo" (Đúng >90% liên tục).

## 4. Tone & Persona
- Phong cách: Chuyên nghiệp (Professional), Học thuật (Academic) nhưng phải Gần gũi và Khích lệ (Supportive).
- Ngôn ngữ: Sử dụng song ngữ Anh - Việt để giải thích.
- Tính cách: Tỉ mỉ trong việc phân tích ngôn ngữ, logic trong việc tổ chức dữ liệu và luôn hướng tới mục tiêu cá nhân hóa cho người học.

## 5. Output Format
- Cấu trúc 1: Kết quả phân tích đề thi (Vocabulary Extraction Table)
- Cấu trúc 2: Nội dung Flashcard (Mặt trước / Mặt sau)
- Cấu trúc 3: Bài tập trắc nghiệm (AI Quiz Question / Options / Answer / Explanation)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawInstructionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20 text-xs font-semibold mb-2">
            <Code2 className="w-3.5 h-3.5 text-purple-300" />
            Hồ sơ Kiến trúc Sư Sư phạm (EVM Specification)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Custom System Instruction: EVM Architect
          </h1>
          <p className="mt-1 text-slate-300 text-xs sm:text-sm">
            Nguyên lý thiết kế prompt và chuẩn mực ngôn ngữ học vận hành hệ thống
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Đã sao chép System Prompt!' : 'Sao chép System Prompt'}</span>
        </button>
      </div>

      {/* 4 Core Pillars Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm">
            1
          </div>
          <h4 className="font-bold text-slate-900 text-sm">
            Phân tích & Trích xuất
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Phân loại chuẩn 5 nhóm: Single words (B1-C1), Phrasal verbs, Collocations, Idioms và Prepositions.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
            2
          </div>
          <h4 className="font-bold text-slate-900 text-sm">
            Ngữ cảnh hóa Dữ liệu
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Giữ nguyên câu gốc trong đề thi (Contextual Example), cung cấp phiên âm IPA chuẩn và nghĩa dịch sát bài thi.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-sm">
            3
          </div>
          <h4 className="font-bold text-slate-900 text-sm">
            Hệ thống hóa Flashcards
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Cấu trúc 2 mặt trực quan với Audio Hint TTS, mẹo thi và cơ chế theo dõi lượt lật tương tác.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-sm">
            4
          </div>
          <h4 className="font-bold text-slate-900 text-sm">
            Đánh giá Thích ứng (Quiz)
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Biên soạn 3 dạng đề thi THPT, giải thích sư phạm chi tiết và tự động xếp loại 3 cấp độ thành thạo.
          </p>
        </div>
      </div>

      {/* Code / Markdown View */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-slate-100 font-mono text-xs shadow-xl space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
          <span className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            system_instruction_evm.md
          </span>
          <span className="text-[11px] text-slate-500">Bản chuẩn hóa sản phẩm</span>
        </div>
        <pre className="text-slate-200 leading-relaxed whitespace-pre-wrap select-all font-sans text-xs sm:text-sm">
          {rawInstructionText}
        </pre>
      </div>
    </div>
  );
};
