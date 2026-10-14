import { GrammarPracticeQuestion } from '../types';

export interface GrammarSectionItem {
  heading: string;
  badge?: string;
  formula?: string;
  content: string;
  rules?: string[];
  notes?: string[];
}

export interface GrammarComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface CleanGrammarTopic {
  id: string;
  topicNumber: number;
  title: string;
  shortTitle: string;
  englishTitle: string;
  difficulty: 'Trọng tâm' | 'Nâng cao';
  examWeight?: string; // Tần suất & Trọng số trong đề thi THPTQG
  concept: string; // Bản chất & nguyên lý tư duy giải đề
  recognitionSignals: string[]; // Dấu hiệu nhận biết dạng bài trong đề thi
  formulas: string[]; // Bảng công thức vàng cốt lõi
  detailedSections: GrammarSectionItem[]; // Hệ thống lý thuyết chi tiết phân nhánh
  comparisonTable?: GrammarComparisonTable; // Bảng đối chiếu so sánh trực quan
  rules: { label: string; text: string }[]; // Quick rules tóm tắt
  examples: { en: string; vi: string; note?: string }[]; // Ví dụ song ngữ
  examTips: string[]; // Cẩm nang bẫy đề thi THPTQG & Chiến thuật làm bài
  questions: GrammarPracticeQuestion[]; // 5 câu hỏi mặc định có giải thích chi tiết
  questionPool: GrammarPracticeQuestion[]; // Ngân hàng câu hỏi bổ sung để đổi bộ đề
}
