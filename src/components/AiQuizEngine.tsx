import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Loader2,
  SlidersHorizontal,
  ChevronRight,
  BookOpen,
  Volume2,
  Download,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabularyItem, QuizQuestion, MasteryStatus } from '../types';
import { speakEnglish } from '../utils/tts';
import {
  generateQuizWithFallback,
  getStoredApiKey,
  PreviousQuestionHistory
} from '../services/geminiService';
import { downloadDocxFile } from '../utils/documentExport';

/**
 * Prioritizes vocabulary items that were NOT tested in previous quiz rounds.
 * If all items were tested, sorts by least recently tested.
 */
function sortVocabByHistory(
  vocabList: VocabularyItem[],
  history: PreviousQuestionHistory[]
): VocabularyItem[] {
  if (!history || history.length === 0) {
    return [...vocabList].sort(() => Math.random() - 0.5);
  }

  const countMap = new Map<string, number>();
  const lastIndexMap = new Map<string, number>();

  history.forEach((h, idx) => {
    const key = h.term.toLowerCase().trim();
    countMap.set(key, (countMap.get(key) || 0) + 1);
    lastIndexMap.set(key, idx);
  });

  return [...vocabList].sort((a, b) => {
    const keyA = a.term.toLowerCase().trim();
    const keyB = b.term.toLowerCase().trim();

    const countA = countMap.get(keyA) || 0;
    const countB = countMap.get(keyB) || 0;

    // 1st criterion: tested fewer times in history (0 times first, then 1, etc.)
    if (countA !== countB) {
      return countA - countB;
    }

    // 2nd criterion: if tested same times, pick the one tested least recently
    const lastA = lastIndexMap.get(keyA) ?? -1;
    const lastB = lastIndexMap.get(keyB) ?? -1;
    if (lastA !== lastB) {
      return lastA - lastB;
    }

    // 3rd criterion: random tie-breaker
    return Math.random() - 0.5;
  });
}

function renderFormattedQuestionSentence(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span
              key={i}
              className="underline decoration-indigo-500 decoration-2 font-black text-indigo-900 bg-indigo-50/80 px-1.5 py-0.5 rounded mx-0.5 shadow-2xs"
            >
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

interface AiQuizEngineProps {
  vocabulary: VocabularyItem[];
  onUpdateQuizResult: (term: string, isCorrect: boolean) => void;
  accent: 'UK' | 'US';
  onOpenApiKeyModal?: () => void;
  selectedExamFilter?: string;
  onSelectExamFilter?: (exam: string) => void;
}

export const AiQuizEngine: React.FC<AiQuizEngineProps> = ({
  vocabulary,
  onUpdateQuizResult,
  accent,
  onOpenApiKeyModal,
  selectedExamFilter = 'ALL',
  onSelectExamFilter
}) => {
  const [filterExam, setFilterExam] = useState<string>(selectedExamFilter);
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'Fill-in-the-blank',
    'Synonyms/Antonyms',
    'Sentence Completion'
  ]);
  const [filterVocabMode, setFilterVocabMode] = useState<'all' | 'needReview' | 'learning'>('all');
  const [quizMode, setQuizMode] = useState<'instant' | 'exam'>('instant');

  // Synchronize internal filter with selectedExamFilter prop
  React.useEffect(() => {
    if (selectedExamFilter) {
      setFilterExam(selectedExamFilter);
    }
  }, [selectedExamFilter]);

  const examOptions = React.useMemo(() => {
    const set = new Set<string>();
    vocabulary.forEach((v) => {
      set.add(v.sourceExam?.trim() || 'Từ vựng tự nhập / Khác');
    });
    return Array.from(set);
  }, [vocabulary]);

  // Words scoped to the selected exam
  const examScopedVocab = React.useMemo(() => {
    if (filterExam === 'ALL') return vocabulary;
    return vocabulary.filter(
      (v) => (v.sourceExam?.trim() || 'Từ vựng tự nhập / Khác') === filterExam
    );
  }, [vocabulary, filterExam]);

  // Generator & Quiz State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizHistory, setQuizHistory] = useState<PreviousQuestionHistory[]>([]);
  const [quizRound, setQuizRound] = useState<number>(1);

  // Filter Target Vocabulary for Quiz Generation
  const targetVocabList = examScopedVocab.filter((v) => {
    if (filterVocabMode === 'needReview') return v.status === 'Chưa thuộc';
    if (filterVocabMode === 'learning') return v.status === 'Đang học';
    return true;
  });

  const handleToggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      if (selectedTypes.length === 1) return;
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);

  const handleGenerateQuiz = async () => {
    if (targetVocabList.length === 0) {
      setErrorMsg('Không có từ vựng nào trong danh sách được chọn. Hãy thêm từ vựng vào sổ tay trước.');
      return;
    }

    const currentKey = getStoredApiKey();
    if (!currentKey && onOpenApiKeyModal) {
      onOpenApiKeyModal();
      return;
    }

    // Accumulate finished questions into history for subsequent round generation
    let accumulatedHistory = [...quizHistory];
    if (questions.length > 0) {
      const currentRoundItems: PreviousQuestionHistory[] = questions.map((q) => ({
        term: q.targetTerm,
        type: q.type,
        subtype: q.subtype,
        question: q.question,
        testedFocus: q.testedFocus || q.options[q.correctAnswer] || '',
        correctAnswerText: q.options[q.correctAnswer] || ''
      }));
      accumulatedHistory = [...accumulatedHistory, ...currentRoundItems];
      setQuizHistory(accumulatedHistory);
      setQuizRound((r) => r + 1);
    }

    setIsLoading(true);
    setErrorMsg(null);
    setFallbackNotice(null);
    setAnswers({});
    setIsSubmitted(false);
    setActiveQuestionIdx(0);

    // Prioritize words that were NOT yet tested in history
    const prioritizedVocab = sortVocabByHistory(targetVocabList, accumulatedHistory);

    try {
      const generatedQuestions = await generateQuizWithFallback(
        prioritizedVocab,
        questionCount,
        selectedTypes,
        (failedModel, nextModel, error) => {
          setFallbackNotice(
            `Model "${failedModel}" gặp sự cố (${error.slice(0, 80)}...). Tự động chuyển sang model dự phòng "${nextModel}".`
          );
        },
        accumulatedHistory
      );

      setQuestions(generatedQuestions);
    } catch (err: any) {
      console.error('Quiz generation error:', err);
      setErrorMsg(err.message || 'Không thể tạo bài tập trắc nghiệm AI. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (questionIdx: number, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted && quizMode === 'exam') return;
    if (quizMode === 'instant' && answers[questionIdx]) return; // already answered in instant mode

    const newAnswers = { ...answers, [questionIdx]: optionKey };
    setAnswers(newAnswers);

    // If instant practice mode, immediately update vocabulary tracking
    if (quizMode === 'instant') {
      const q = questions[questionIdx];
      const isCorrect = optionKey === q.correctAnswer;
      onUpdateQuizResult(q.targetTerm, isCorrect);
      if (isCorrect) {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    }
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    let correctCount = 0;

    questions.forEach((q, idx) => {
      const userAns = answers[idx];
      const isCorrect = userAns === q.correctAnswer;
      if (isCorrect) correctCount++;
      if (userAns) {
        onUpdateQuizResult(q.targetTerm, isCorrect);
      }
    });

    // Confetti celebration if score >= 70%
    if (correctCount / questions.length >= 0.7) {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  const currentQ = questions[activeQuestionIdx];
  const totalAnswered = Object.keys(answers).length;
  const correctCountTotal = questions.filter(
    (q, idx) => answers[idx] === q.correctAnswer
  ).length;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 rounded-2xl p-5 sm:p-6 text-white shadow-md">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          Luyện thi Trắc nghiệm Từ vựng AI
        </h1>
        <p className="mt-1 text-emerald-100 text-xs sm:text-sm">
          Luyện tập các dạng câu hỏi trắc nghiệm bám sát cấu trúc đề thi THPT Quốc Gia từ kho từ vựng cá nhân.
        </p>
      </div>

      {/* Quiz Configuration Panel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-base">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
            <span>Cấu hình Bài tập Trắc nghiệm</span>
          </h3>
          <span className="text-xs text-slate-500">
            Nguồn: <strong>{targetVocabList.length}</strong> từ vựng
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Target Exam Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Đề thi mục tiêu:
            </label>
            <select
              value={filterExam}
              onChange={(e) => {
                setFilterExam(e.target.value);
                if (onSelectExamFilter) onSelectExamFilter(e.target.value);
              }}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden truncate"
            >
              <option value="ALL">Tất cả đề ({vocabulary.length} từ)</option>
              {examOptions.map((exam) => {
                const count = vocabulary.filter(
                  (v) => (v.sourceExam?.trim() || 'Từ vựng tự nhập / Khác') === exam
                ).length;
                return (
                  <option key={exam} value={exam}>
                    {exam} ({count} từ)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Target Vocab Source */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Bộ lọc trạng thái:
            </label>
            <select
              value={filterVocabMode}
              onChange={(e) => setFilterVocabMode(e.target.value as any)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="all">Tất cả ({examScopedVocab.length})</option>
              <option value="needReview">
                Chưa thuộc ({examScopedVocab.filter((v) => v.status === 'Chưa thuộc').length})
              </option>
              <option value="learning">
                Đang học ({examScopedVocab.filter((v) => v.status === 'Đang học').length})
              </option>
            </select>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Số lượng câu hỏi:
            </label>
            <div className="flex items-center gap-1.5">
              {[3, 5, 8, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    questionCount === num
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Practice vs Exam Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Chế độ luyện tập:
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setQuizMode('instant')}
                className={`flex-1 py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  quizMode === 'instant'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Giải thích tức thì
              </button>
              <button
                type="button"
                onClick={() => setQuizMode('exam')}
                className={`flex-1 py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  quizMode === 'exam'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Mô phỏng thi
              </button>
            </div>
          </div>
        </div>

        {filterExam !== 'ALL' && (
          <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl font-medium flex items-center justify-between animate-in fade-in">
            <span>🎯 Phạm vi đề thi: <strong>{filterExam}</strong> ({targetVocabList.length} từ khả dụng)</span>
            <button
              type="button"
              onClick={() => {
                setFilterExam('ALL');
                if (onSelectExamFilter) onSelectExamFilter('ALL');
              }}
              className="text-emerald-700 hover:text-emerald-900 font-bold underline ml-2 cursor-pointer"
            >
              Xem tất cả đề
            </button>
          </div>
        )}

        {/* 3 Standard Formats */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Dạng bài tập trắc nghiệm:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleToggleType('Fill-in-the-blank')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedTypes.includes('Fill-in-the-blank')
                  ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">
                  Điền từ vào câu
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Fill-in-the-blank
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Điền từ/cụm từ mục tiêu vào chỗ trống phù hợp ngữ cảnh.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleToggleType('Synonyms/Antonyms')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedTypes.includes('Synonyms/Antonyms')
                  ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">
                  Đồng nghĩa / Trái nghĩa
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Synonyms / Antonyms
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Tìm từ đồng nghĩa (Closest) hoặc trái nghĩa (Opposite).
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleToggleType('Sentence Completion')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedTypes.includes('Sentence Completion')
                  ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">
                  Hoàn thành câu
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Sentence Completion
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Kiểm tra ngữ pháp, giới từ phụ thuộc và cấu trúc cụm từ.
              </p>
            </button>
          </div>
        </div>

        {fallbackNotice && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium flex items-center gap-2">
            <span className="font-bold">⚠️ Dự phòng:</span>
            <span>{fallbackNotice}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-medium space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-800">Lỗi từ Gemini API:</span>
              {onOpenApiKeyModal && (
                <button
                  type="button"
                  onClick={onOpenApiKeyModal}
                  className="px-2 py-0.5 bg-white border border-rose-300 rounded text-rose-700 text-[11px] font-bold cursor-pointer"
                >
                  Đổi Key / Model
                </button>
              )}
            </div>
            <p className="font-mono text-rose-800 bg-white/70 p-2 rounded border border-rose-200 break-all">
              {errorMsg}
            </p>
          </div>
        )}

        <button
          type="button"
          disabled={isLoading || targetVocabList.length === 0}
          onClick={handleGenerateQuiz}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-emerald-200 disabled:opacity-50 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI đang biên soạn câu hỏi & phương án nhiễu (Distractors)...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Biên soạn Đề trắc nghiệm</span>
            </>
          )}
        </button>
      </div>

      {/* Quiz Active Area */}
      {questions.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Quiz Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Đề trắc nghiệm • {questions.length} câu
                </span>
                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    type="button"
                    onClick={() =>
                      downloadDocxFile(
                        'De_Thi_Tieng_Anh_THPT_AI_Quiz',
                        'ĐỀ THI TRẮC NGHIỆM TIẾNG ANH THPT QUỐC GIA',
                        questions,
                        targetVocabList
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all cursor-pointer"
                    title="Tải đề thi dạng tài liệu Microsoft Word (.doc) chuẩn mẫu Bộ GD&ĐT"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Xuất Word (.doc)</span>
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1 flex items-center gap-2 flex-wrap">
                <span>Câu {activeQuestionIdx + 1} / {questions.length}</span>
                {currentQ.type === 'Synonyms/Antonyms' && (
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-md font-bold ${
                      currentQ.subtype === 'Antonym'
                        ? 'text-rose-700 bg-rose-50 border border-rose-200'
                        : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                    }`}
                  >
                    {currentQ.subtype === 'Antonym'
                      ? 'Tìm từ trái nghĩa (Opposite)'
                      : 'Tìm từ đồng nghĩa (Closest)'}
                  </span>
                )}
                {currentQ.type === 'Fill-in-the-blank' && (
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-md font-bold">
                    Điền từ vào chỗ trống
                  </span>
                )}
                {currentQ.type === 'Sentence Completion' && (
                  <span className="text-teal-700 bg-teal-50 border border-teal-200 text-xs px-2.5 py-0.5 rounded-md font-bold">
                    Hoàn thành câu
                  </span>
                )}
              </h3>
            </div>

            {/* Quick Question Switcher */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                const isCurrent = idx === activeQuestionIdx;
                let bgStyle = 'bg-slate-100 text-slate-700 border-slate-200';

                if (userAns) {
                  if (quizMode === 'instant' || isSubmitted) {
                    bgStyle =
                      userAns === q.correctAnswer
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-rose-500 text-white border-rose-500';
                  } else {
                    bgStyle = 'bg-indigo-600 text-white border-indigo-600';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveQuestionIdx(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all cursor-pointer ${bgStyle} ${
                      isCurrent ? 'ring-2 ring-emerald-500 ring-offset-1 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Prompt */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
            {/* Instruction Box */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-xs sm:text-sm">
              <span className="font-bold text-slate-800 mr-2">Yêu cầu:</span>
              <span className="italic leading-relaxed font-medium text-slate-700">
                {currentQ.instruction ||
                  (currentQ.type === 'Synonyms/Antonyms'
                    ? currentQ.subtype === 'Antonym'
                      ? 'Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) OPPOSITE in meaning to the underlined word in the following question.'
                      : 'Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) CLOSEST in meaning to the underlined word in the following question.'
                    : currentQ.type === 'Fill-in-the-blank'
                    ? 'Mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase to complete the following sentence.'
                    : 'Mark the letter A, B, C, or D on your answer sheet to indicate the option that best completes each of the following questions.')}
              </span>
            </div>

            {/* Sentence Box */}
            <div className="pt-2">
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {renderFormattedQuestionSentence(currentQ.question)}
              </p>
            </div>
          </div>

          {/* 4 Options (A, B, C, D) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
              const optionText = currentQ.options[optKey];
              const isSelected = answers[activeQuestionIdx] === optKey;
              const isCorrectAnswer = currentQ.correctAnswer === optKey;
              const showResult =
                (quizMode === 'instant' && answers[activeQuestionIdx] !== undefined) ||
                isSubmitted;

              let cardStyle =
                'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800';

              if (showResult) {
                if (isCorrectAnswer) {
                  cardStyle =
                    'border-emerald-500 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-500/20';
                } else if (isSelected && !isCorrectAnswer) {
                  cardStyle =
                    'border-rose-500 bg-rose-50/80 text-rose-900 ring-2 ring-rose-500/20';
                }
              } else if (isSelected) {
                cardStyle =
                  'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20';
              }

              return (
                <button
                  key={optKey}
                  type="button"
                  onClick={() => handleSelectOption(activeQuestionIdx, optKey)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${cardStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                      showResult && isCorrectAnswer
                        ? 'bg-emerald-600 text-white'
                        : showResult && isSelected && !isCorrectAnswer
                        ? 'bg-rose-600 text-white'
                        : isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {optKey}
                  </span>
                  <div className="pt-0.5">
                    <span className="text-sm font-semibold block leading-snug">
                      {optionText}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Box (When answered in instant mode or submitted in exam mode) */}
          {((quizMode === 'instant' && answers[activeQuestionIdx] !== undefined) ||
            isSubmitted) && (
            <div
              className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-2 animate-in fade-in duration-300 ${
                answers[activeQuestionIdx] === currentQ.correctAnswer
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/90 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {answers[activeQuestionIdx] === currentQ.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Chính xác! Đáp án đúng là {currentQ.correctAnswer}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>
                      Chưa chính xác! Bạn chọn {answers[activeQuestionIdx] || 'Chưa chọn'}, đáp án đúng là {currentQ.correctAnswer}
                    </span>
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200/60 leading-relaxed text-slate-800">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                  <strong className="text-slate-900 font-bold">
                    Giải thích:
                  </strong>
                  <button
                    type="button"
                    onClick={() => speakEnglish(currentQ.targetTerm, accent)}
                    className="hover:text-indigo-600 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                    title="Nghe phát âm từ vựng"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Nghe từ: <strong className="text-indigo-600">{currentQ.targetTerm}</strong></span>
                  </button>
                </div>
                {currentQ.explanation}
              </div>
            </div>
          )}

          {/* Bottom Navigation & Submit Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Đã trả lời: <strong>{totalAnswered}</strong> / {questions.length}</span>
              {quizMode === 'instant' && (
                <span>• Đúng: <strong className="text-emerald-600">{correctCountTotal}</strong></span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {activeQuestionIdx > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveQuestionIdx((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Câu trước
                </button>
              )}

              {activeQuestionIdx < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveQuestionIdx((prev) => prev + 1)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Câu tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : quizMode === 'exam' && !isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitExam}
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 cursor-pointer"
                >
                  Nộp bài thi & Chấm điểm
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerateQuiz}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  title="Tạo bộ đề mới với các câu hỏi khác"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Tạo bộ đề mới</span>
                </button>
              )}
            </div>
          </div>

          {/* Exam Mode Result Summary */}
          {quizMode === 'exam' && isSubmitted && (
            <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white text-center space-y-3">
              <Award className="w-12 h-12 text-amber-300 mx-auto" />
              <h4 className="text-xl font-black">
                Kết quả Mô phỏng Thi: {correctCountTotal} / {questions.length} câu đúng
              </h4>
              <p className="text-xs text-indigo-200 max-w-md mx-auto">
                Tỉ lệ chính xác:{' '}
                <strong>
                  {Math.round((correctCountTotal / questions.length) * 100)}%
                </strong>
                . Độ thành thạo của các từ vựng tương ứng trong sổ tay cá nhân đã được tự động cập nhật!
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleGenerateQuiz}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm đề luyện tập khác</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
