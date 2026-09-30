export type VocabCategory =
  | 'Single word'
  | 'Phrasal verb'
  | 'Collocation'
  | 'Idiom'
  | 'Preposition';

export type MasteryStatus = 'Chưa thuộc' | 'Đang học' | 'Đã thành thạo';

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
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  userAnswer?: 'A' | 'B' | 'C' | 'D';
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
