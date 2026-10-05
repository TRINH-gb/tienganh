export type VocabCategory =
  | 'Single word'
  | 'Phrasal verb'
  | 'Collocation'
  | 'Idiom'
  | 'Preposition';

export type MasteryStatus = 'Chưa thuộc' | 'Đang học' | 'Đã thành thạo';

export const normalizeStatus = (status: any): MasteryStatus => {
  if (!status) return 'Chưa thuộc';
  const s = String(status).trim().toLowerCase().normalize('NFC');
  if (s.includes('thành thạo') || s.includes('thanh thao') || s.includes('mastered')) {
    return 'Đã thành thạo';
  }
  if (s.includes('đang học') || s.includes('dang hoc') || s.includes('learning')) {
    return 'Đang học';
  }
  return 'Chưa thuộc';
};

export type CefrLevel = 'B1' | 'B2' | 'C1';

export interface VocabularyItem {
  id: string;
  term: string;
  type: VocabCategory;
  ipa: string;
  meaning: string;
  context: string;
  cefrLevel: CefrLevel;
  examTip?: string;
  sourceExam?: string;
  status: MasteryStatus;
  interactionCount: number;
  quizCorrectCount: number;
  quizTotalCount: number;
  addedAt: string;
  isHighlighted?: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'Fill-in-the-blank' | 'Synonyms/Antonyms' | 'Sentence Completion';
  subtype?: 'Synonym' | 'Antonym' | 'None';
  targetTerm: string;
  instruction: string;
  question: string;
  testedFocus?: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  userAnswer?: 'A' | 'B' | 'C' | 'D';
  suggestedSynonyms?: string[];
  suggestedAntonyms?: string[];
  wordBoxOptions?: string[]; // 3 words from vocabulary notebook for Sentence Completion
  correctWordAnswer?: string; // Correct word string to be typed (with correct inflection if needed)
  acceptableAnswers?: string[]; // Optional alternative accepted inflections
}

export interface WordDeepDive {
  term: string;
  wordFamily: Array<{ pos: string; word: string; meaning: string }>;
  commonCollocations: Array<{ phrase: string; meaning: string; example: string }>;
  examTraps: string[];
  sampleSentences: Array<{ en: string; vi: string }>;
}

export interface SampleExam {
  id: string;
  title: string;
  source: string;
  year: string;
  tag: string;
  description: string;
  content: string;
  initialVocab: Omit<VocabularyItem, 'id' | 'status' | 'interactionCount' | 'quizCorrectCount' | 'quizTotalCount' | 'addedAt'>[];
}

export type ActiveTab = 'extract' | 'notebook' | 'grammar' | 'flashcards' | 'quiz';

export interface GrammarPracticeQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  clue?: string;
  translation?: string;
}

export interface GrammarTheorySection {
  title: string;
  subtitle?: string;
  formula?: string[];
  rules?: { label: string; text: string }[];
  examples: {
    en: string;
    vi: string;
    highlight?: string;
    note?: string;
  }[];
  examTips?: string[];
}

export interface GrammarTopic {
  id: string;
  topicNumber: number;
  title: string;
  shortTitle: string;
  englishTitle: string;
  badge: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Trọng tâm';
  summary: string;
  keyPoints: string[];
  theorySections: GrammarTheorySection[];
  questions: GrammarPracticeQuestion[];
}
