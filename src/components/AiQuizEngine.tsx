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
  FileText,
  AlertCircle,
  Package,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabularyItem, QuizQuestion, MasteryStatus } from '../types';
import { speakEnglish } from '../utils/tts';
import {
  generateQuizWithFallback,
  getStoredApiKey,
  PreviousQuestionHistory,
  getStoredQuizHistory,
  saveStoredQuizHistory,
  extractSuggestedWords
} from '../services/geminiService';
import { downloadDocxFile } from '../utils/documentExport';

/**
 * Prioritizes vocabulary items:
 * 1. Items tested in only 1 direction (Synonym without Antonym, or vice versa) get top priority to flip perspective!
 * 2. Untested items.
 * 3. Items tested in other formats (least recently tested).
 */
function interleaveVocabByCategory(items: VocabularyItem[]): VocabularyItem[] {
  // Group by category while preserving priority order within each category
  const buckets = new Map<string, VocabularyItem[]>();
  items.forEach((item) => {
    const cat = item.type || 'Single word';
    if (!buckets.has(cat)) buckets.set(cat, []);
    buckets.get(cat)!.push(item);
  });

  const result: VocabularyItem[] = [];
  const bucketList = Array.from(buckets.values());

  let hasMore = true;
  let round = 0;
  while (hasMore) {
    hasMore = false;
    for (const bucket of bucketList) {
      if (round < bucket.length) {
        result.push(bucket[round]);
        hasMore = true;
      }
    }
    round++;
  }

  return result;
}

/**
 * Prioritizes vocabulary items with exhaustive coverage and category diversity:
 * 1. Brand new items never tested get HIGHEST priority (Score 0).
 * 2. Items never tested in the currently selected question types get SECOND priority (Score 1).
 * 3. Flippable items (tested in 1 direction: Synonym without Antonym, or vice versa) get THIRD priority (Score 2).
 * 4. Interleaves vocabulary across all 5 categories (Single word, Phrasal verb, Collocation, Idiom, Preposition)
 *    so AI generates questions for diverse lexical types, ensuring ALL words in the notebook are covered!
 */
function sortVocabByHistory(
  vocabList: VocabularyItem[],
  history: PreviousQuestionHistory[],
  selectedTypes: string[] = []
): VocabularyItem[] {
  if (!vocabList || vocabList.length === 0) return [];
  if (!history || history.length === 0) {
    return interleaveVocabByCategory([...vocabList].sort(() => Math.random() - 0.5));
  }

  const isSynAntSelected = selectedTypes.length === 0 || selectedTypes.includes('Synonyms/Antonyms');

  const countTotalMap = new Map<string, number>();
  const countThisTypeMap = new Map<string, number>();
  const testedSubtypesMap = new Map<string, Set<string>>();
  const lastIndexMap = new Map<string, number>();

  history.forEach((h, idx) => {
    if (!h || !h.term) return;
    const key = String(h.term).toLowerCase().trim();
    countTotalMap.set(key, (countTotalMap.get(key) || 0) + 1);
    lastIndexMap.set(key, idx);

    if (h.type && selectedTypes.includes(h.type)) {
      countThisTypeMap.set(key, (countThisTypeMap.get(key) || 0) + 1);
    }

    if (!testedSubtypesMap.has(key)) {
      testedSubtypesMap.set(key, new Set());
    }
    if (h.subtype) {
      testedSubtypesMap.get(key)!.add(h.subtype);
    }
  });

  const sorted = [...vocabList].sort((a, b) => {
    const keyA = String(a?.term || '').toLowerCase().trim();
    const keyB = String(b?.term || '').toLowerCase().trim();

    const thisTypeA = countThisTypeMap.get(keyA) || 0;
    const thisTypeB = countThisTypeMap.get(keyB) || 0;

    const totalA = countTotalMap.get(keyA) || 0;
    const totalB = countTotalMap.get(keyB) || 0;

    const subA = testedSubtypesMap.get(keyA);
    const subB = testedSubtypesMap.get(keyB);

    const flippableA = isSynAntSelected && subA && (
      (subA.has('Synonym') && !subA.has('Antonym')) ||
      (subA.has('Antonym') && !subA.has('Synonym'))
    );
    const flippableB = isSynAntSelected && subB && (
      (subB.has('Synonym') && !subB.has('Antonym')) ||
      (subB.has('Antonym') && !subB.has('Synonym'))
    );

    // Score hierarchy:
    // Score 0: Never tested at all across any quiz!
    // Score 1: Tested before in other formats, but NEVER tested in current format!
    // Score 2: Flippable in current format (tested in 1 direction)
    // Score 3 + count: Already tested in this format
    const getScore = (total: number, thisType: number, flippable?: boolean) => {
      if (total === 0) return 0; // Pure brand new word
      if (thisType === 0) return 1; // Untested in this format
      if (flippable) return 2; // Flippable
      return 3 + thisType;
    };

    const scoreA = getScore(totalA, thisTypeA, flippableA);
    const scoreB = getScore(totalB, thisTypeB, flippableB);

    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }

    // Secondary: least recently tested (older index first)
    const lastA = lastIndexMap.get(keyA) ?? -1;
    const lastB = lastIndexMap.get(keyB) ?? -1;
    if (lastA !== lastB) {
      return lastA - lastB;
    }

    return Math.random() - 0.5;
  });

  return interleaveVocabByCategory(sorted);
}

function renderFormattedInstruction(instructionText: string) {
  const parts = instructionText.split(/(CLOSEST|OPPOSITE)/gi);

  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-xs sm:text-sm">
      <span className="font-bold text-slate-800 mr-2">Yêu cầu:</span>
      <span className="italic leading-relaxed font-medium text-slate-700">
        {parts.map((part, idx) => {
          if (/^OPPOSITE$/i.test(part)) {
            return (
              <span
                key={idx}
                className="inline-block px-2.5 py-0.5 mx-1 rounded-md bg-rose-600 text-white font-black not-italic text-xs tracking-wider shadow-2xs uppercase"
              >
                OPPOSITE
              </span>
            );
          }
          if (/^CLOSEST$/i.test(part)) {
            return (
              <span
                key={idx}
                className="inline-block px-2.5 py-0.5 mx-1 rounded-md bg-emerald-600 text-white font-black not-italic text-xs tracking-wider shadow-2xs uppercase"
              >
                CLOSEST
              </span>
            );
          }
          return part;
        })}
      </span>
    </div>
  );
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
  // Default to empty so the 3 cards start with faint borders, and light up upon student selection
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
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
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [inputAnswers, setInputAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizHistory, setQuizHistory] = useState<PreviousQuestionHistory[]>(() => getStoredQuizHistory());
  const [quizRound, setQuizRound] = useState<number>(1);

  // Helper to determine if student's answer is correct (case-insensitive & inflected form check)
  const isAnswerCorrect = (q: QuizQuestion, userAns?: string): boolean => {
    if (!userAns || !userAns.trim()) return false;
    if (q.type === 'Sentence Completion') {
      const cleanUser = userAns.trim().replace(/[.,;!?]+$/, '').toLowerCase();
      const targetAnswer = (q.correctWordAnswer || q.targetTerm || q.options[q.correctAnswer] || '').trim().replace(/[.,;!?]+$/, '').toLowerCase();
      if (cleanUser === targetAnswer) return true;

      if (q.acceptableAnswers && Array.isArray(q.acceptableAnswers)) {
        return q.acceptableAnswers.some(
          (alt) => alt.trim().replace(/[.,;!?]+$/, '').toLowerCase() === cleanUser
        );
      }
      return false;
    }
    return userAns === q.correctAnswer;
  };

  // Filter Target Vocabulary for Quiz Generation
  const targetVocabList = examScopedVocab.filter((v) => {
    if (filterVocabMode === 'needReview') return v.status === 'Chưa thuộc';
    if (filterVocabMode === 'learning') return v.status === 'Đang học';
    return true;
  });

  // Calculate vocabulary coverage statistics in current scope
  const coverageStats = React.useMemo(() => {
    const testedSet = new Set<string>();
    quizHistory.forEach((h) => {
      if (h.term && (selectedTypes.length === 0 || (h.type && selectedTypes.includes(h.type)))) {
        testedSet.add(h.term.trim().toLowerCase());
      }
    });
    const covered = targetVocabList.filter((v) => testedSet.has(v.term.trim().toLowerCase())).length;
    return {
      covered,
      total: targetVocabList.length,
      untested: Math.max(0, targetVocabList.length - covered)
    };
  }, [quizHistory, targetVocabList, selectedTypes]);

  const handleToggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleGenerateQuiz = async () => {
    if (selectedTypes.length === 0) {
      setErrorMsg('Vui lòng chọn ít nhất 1 dạng bài tập ở trên.');
      return;
    }

    if (targetVocabList.length === 0) {
      setErrorMsg('Chưa có từ vựng nào trong danh sách. Hãy thêm từ vựng vào sổ tay trước.');
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
      const currentRoundItems: PreviousQuestionHistory[] = questions.map((q) => {
        const extracted = extractSuggestedWords(q.explanation);
        const syns = q.suggestedSynonyms && q.suggestedSynonyms.length > 0
          ? q.suggestedSynonyms
          : extracted.synonyms;
        const ants = q.suggestedAntonyms && q.suggestedAntonyms.length > 0
          ? q.suggestedAntonyms
          : extracted.antonyms;

        return {
          term: q.targetTerm,
          type: q.type,
          subtype: q.subtype,
          question: q.question,
          testedFocus: q.testedFocus || q.options[q.correctAnswer] || '',
          correctAnswerText: q.options[q.correctAnswer] || '',
          suggestedSynonyms: syns,
          suggestedAntonyms: ants
        };
      });
      accumulatedHistory = [...accumulatedHistory, ...currentRoundItems];
      setQuizHistory(accumulatedHistory);
      saveStoredQuizHistory(accumulatedHistory);
      setQuizRound((r) => r + 1);
    }

    setIsLoading(true);
    setErrorMsg(null);
    setAnswers({});
    setInputAnswers({});
    setIsSubmitted(false);
    setActiveQuestionIdx(0);

    // Prioritize flippable words (Synonym <-> Antonym) and untested words
    const prioritizedVocab = sortVocabByHistory(targetVocabList, accumulatedHistory, selectedTypes);

    try {
      const generatedQuestions = await generateQuizWithFallback(
        prioritizedVocab,
        questionCount,
        selectedTypes,
        (failedModel, nextModel, error) => {
          console.warn(`[EVM Gemini] Model ${failedModel} failed (${error.slice(0, 80)}...). Fallback to ${nextModel}.`);
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
      const isCorrect = isAnswerCorrect(q, optionKey);
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

  const handleConfirmTypedAnswer = (questionIdx: number) => {
    if (isSubmitted && quizMode === 'exam') return;
    const currentQ = questions[questionIdx];
    const typedText = (inputAnswers[questionIdx] ?? (answers[questionIdx] || '')).trim();
    if (!typedText) return;

    const newAnswers = { ...answers, [questionIdx]: typedText };
    setAnswers(newAnswers);

    if (quizMode === 'instant') {
      const isCorrect = isAnswerCorrect(currentQ, typedText);
      onUpdateQuizResult(currentQ.targetTerm, isCorrect);
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
      const isCorrect = isAnswerCorrect(q, userAns);
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
    (q, idx) => isAnswerCorrect(q, answers[idx])
  ).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Quiz Configuration Panel */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
          <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-base">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
            <span>Cấu hình đề thi</span>
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
              Độ phủ: <strong>{coverageStats.covered}/{coverageStats.total}</strong> từ
            </span>
            {quizHistory.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setQuizHistory([]);
                  saveStoredQuizHistory([]);
                }}
                className="text-xs text-slate-400 hover:text-rose-600 underline cursor-pointer"
                title="Xóa lịch sử để làm lại từ đầu"
              >
                Đặt lại
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Target Exam Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Đề thi:
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
              Trạng thái:
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
              Số câu:
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
              Chế độ:
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
          <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl font-medium flex items-center justify-between">
            <span>Phạm vi: <strong>{filterExam}</strong> ({targetVocabList.length} từ khả dụng)</span>
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
            Dạng bài:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleToggleType('Fill-in-the-blank')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedTypes.includes('Fill-in-the-blank')
                  ? 'border-2 border-emerald-600 bg-emerald-50 text-slate-900 shadow-md ring-2 ring-emerald-500/20 scale-[1.01]'
                  : 'border border-slate-200/80 bg-slate-50/50 text-slate-500 opacity-70 hover:opacity-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${selectedTypes.includes('Fill-in-the-blank') ? 'text-emerald-950 font-extrabold' : 'text-slate-700'}`}>
                  Điền từ
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  selectedTypes.includes('Fill-in-the-blank')
                    ? 'text-emerald-800 bg-emerald-200/80'
                    : 'text-slate-400 bg-slate-200/60'
                }`}>
                  Fill-in-the-blank
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Điền từ phù hợp ngữ cảnh câu.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleToggleType('Synonyms/Antonyms')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedTypes.includes('Synonyms/Antonyms')
                  ? 'border-2 border-emerald-600 bg-emerald-50 text-slate-900 shadow-md ring-2 ring-emerald-500/20 scale-[1.01]'
                  : 'border border-slate-200/80 bg-slate-50/50 text-slate-500 opacity-70 hover:opacity-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${selectedTypes.includes('Synonyms/Antonyms') ? 'text-emerald-950 font-extrabold' : 'text-slate-700'}`}>
                  Đồng nghĩa / Trái nghĩa
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  selectedTypes.includes('Synonyms/Antonyms')
                    ? 'text-emerald-800 bg-emerald-200/80'
                    : 'text-slate-400 bg-slate-200/60'
                }`}>
                  Synonyms / Antonyms
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Tìm từ đồng nghĩa hoặc trái nghĩa.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleToggleType('Sentence Completion')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedTypes.includes('Sentence Completion')
                  ? 'border-2 border-emerald-600 bg-emerald-50 text-slate-900 shadow-md ring-2 ring-emerald-500/20 scale-[1.01]'
                  : 'border border-slate-200/80 bg-slate-50/50 text-slate-500 opacity-70 hover:opacity-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${selectedTypes.includes('Sentence Completion') ? 'text-emerald-950 font-extrabold' : 'text-slate-700'}`}>
                  Hoàn thành câu
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  selectedTypes.includes('Sentence Completion')
                    ? 'text-emerald-800 bg-emerald-200/80'
                    : 'text-slate-400 bg-slate-200/60'
                }`}>
                  Sentence Completion
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Nhìn 3 từ gợi ý, tự gõ đáp án & chia đúng form nếu cần.
              </p>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium flex items-center justify-between gap-2">
            <span>{errorMsg}</span>
            {onOpenApiKeyModal && (
              <button
                type="button"
                onClick={onOpenApiKeyModal}
                className="px-2.5 py-1 bg-white border border-rose-300 rounded text-rose-700 text-xs font-bold cursor-pointer shrink-0"
              >
                Đổi Key
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          disabled={isLoading || targetVocabList.length === 0 || selectedTypes.length === 0}
          onClick={handleGenerateQuiz}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-emerald-200 disabled:opacity-50 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI đang tạo câu hỏi...</span>
            </>
          ) : selectedTypes.length === 0 ? (
            <span>Vui lòng chọn ít nhất 1 dạng bài ở trên để bắt đầu</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tạo đề trắc nghiệm</span>
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
                      isAnswerCorrect(q, userAns)
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
            {/* Instruction Box: Chỉ làm nổi bật từ khóa trong yêu cầu đề tiếng Anh */}
            {renderFormattedInstruction(
              currentQ.instruction ||
                (currentQ.type === 'Synonyms/Antonyms'
                  ? currentQ.subtype === 'Antonym'
                    ? 'Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) OPPOSITE in meaning to the underlined word in the following question.'
                    : 'Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) CLOSEST in meaning to the underlined word in the following question.'
                  : currentQ.type === 'Fill-in-the-blank'
                  ? 'Mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase to complete the following sentence.'
                  : 'Complete the sentence by typing the correct form of one of the words provided in the box (change the form if necessary).')
            )}

            {/* Sentence Box */}
            <div className="pt-2">
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {renderFormattedQuestionSentence(currentQ.question)}
              </p>
            </div>
          </div>

          {/* Options Section: Dạng Sentence Completion (Ô 3 từ + Tự gõ) vs Trắc nghiệm A,B,C,D thông thường */}
          {currentQ.type === 'Sentence Completion' ? (
            <div className="space-y-4">
              {/* Word Box Container: Gồm chính xác 3 từ trong sổ tay từ vựng để học sinh nhìn và tự gõ */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border-2 border-dashed border-indigo-300 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
                    <Package className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>3 từ gợi ý trong sổ tay:</span>
                  </div>
                  <span className="text-[11px] text-indigo-700 font-medium italic">
                    Nhìn 3 từ gợi ý và tự gõ bằng bàn phím (chia đúng form từ nếu ngữ cảnh yêu cầu)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(currentQ.wordBoxOptions && currentQ.wordBoxOptions.length === 3
                    ? currentQ.wordBoxOptions
                    : [currentQ.targetTerm]
                  ).map((word, wIdx) => (
                    <div
                      key={wIdx}
                      className="py-3 px-4 rounded-xl bg-white border border-indigo-200 text-center font-bold text-sm text-slate-800 shadow-2xs tracking-wide select-none"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>

              {/* Typing Input Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <label className="block text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Gõ câu trả lời (chia đúng form từ nếu ngữ cảnh yêu cầu):</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    disabled={
                      (quizMode === 'instant' && answers[activeQuestionIdx] !== undefined) ||
                      isSubmitted
                    }
                    value={
                      inputAnswers[activeQuestionIdx] ??
                      (answers[activeQuestionIdx] || '')
                    }
                    onChange={(e) =>
                      setInputAnswers((prev) => ({
                        ...prev,
                        [activeQuestionIdx]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleConfirmTypedAnswer(activeQuestionIdx);
                      }
                    }}
                    placeholder="Gõ từ vào đây bằng bàn phím (không phân biệt hoa thường)..."
                    className={`flex-1 px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none transition-all ${
                      ((quizMode === 'instant' && answers[activeQuestionIdx] !== undefined) ||
                        isSubmitted)
                        ? isAnswerCorrect(currentQ, answers[activeQuestionIdx])
                          ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 ring-2 ring-emerald-500/20 font-bold'
                          : 'border-rose-500 bg-rose-50/50 text-rose-950 ring-2 ring-rose-500/20 font-bold'
                        : 'border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 bg-slate-50/40'
                    }`}
                  />
                  {!((quizMode === 'instant' && answers[activeQuestionIdx] !== undefined) ||
                    isSubmitted) && (
                    <button
                      type="button"
                      onClick={() => handleConfirmTypedAnswer(activeQuestionIdx)}
                      disabled={
                        !(
                          inputAnswers[activeQuestionIdx] ??
                          answers[activeQuestionIdx] ??
                          ''
                        ).trim()
                      }
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap"
                    >
                      {quizMode === 'instant' ? 'Kiểm tra' : 'Lưu đáp án'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* 4 Options (A, B, C, D) */
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
          )}

          {/* Explanation Box (When answered in instant mode or submitted in exam mode) */}
          {((quizMode === 'instant' && answers[activeQuestionIdx] !== undefined) ||
            isSubmitted) && (
            <div
              className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-2 animate-in fade-in duration-300 ${
                isAnswerCorrect(currentQ, answers[activeQuestionIdx])
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/90 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {isAnswerCorrect(currentQ, answers[activeQuestionIdx]) ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>
                      Chính xác! Đáp án đúng là{' '}
                      <strong>
                        {currentQ.type === 'Sentence Completion'
                          ? currentQ.correctWordAnswer || currentQ.targetTerm
                          : `${currentQ.correctAnswer} (${currentQ.options[currentQ.correctAnswer]})`}
                      </strong>
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>
                      Chưa chính xác! Bạn đã chọn / gõ:{' '}
                      <strong className="underline">
                        {answers[activeQuestionIdx] || 'Chưa trả lời'}
                      </strong>
                      , đáp án đúng là{' '}
                      <strong className="text-emerald-700 font-extrabold">
                        {currentQ.type === 'Sentence Completion'
                          ? currentQ.correctWordAnswer || currentQ.targetTerm
                          : `${currentQ.correctAnswer} (${currentQ.options[currentQ.correctAnswer]})`}
                      </strong>
                    </span>
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200/60 leading-relaxed text-slate-800">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 font-bold">
                      Giải thích:
                    </strong>
                    {currentQ.type === 'Synonyms/Antonyms' && (
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                          currentQ.subtype === 'Antonym'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {currentQ.subtype === 'Antonym' ? 'Từ trái nghĩa (Opposite)' : 'Từ đồng nghĩa (Closest)'}
                      </span>
                    )}
                  </div>
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

                <div className="whitespace-pre-line leading-relaxed">
                  {currentQ.explanation}
                </div>
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
