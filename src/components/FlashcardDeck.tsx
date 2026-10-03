import React, { useState, useEffect } from 'react';
import {
  Layers,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Volume2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  VolumeX,
  Keyboard
} from 'lucide-react';
import { VocabularyItem, MasteryStatus, VocabCategory } from '../types';
import { speakEnglish } from '../utils/tts';

interface FlashcardDeckProps {
  vocabulary: VocabularyItem[];
  onUpdateStatus: (id: string, status: MasteryStatus) => void;
  onIncrementInteraction: (id: string) => void;
  onInspectWord: (word: VocabularyItem) => void;
  accent: 'UK' | 'US';
  selectedExamFilter?: string;
  onSelectExamFilter?: (exam: string) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  vocabulary,
  onUpdateStatus,
  onIncrementInteraction,
  onInspectWord,
  accent,
  selectedExamFilter = 'ALL',
  onSelectExamFilter
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [filterExam, setFilterExam] = useState<string>(selectedExamFilter);
  const [filterCategory, setFilterCategory] = useState<VocabCategory | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<MasteryStatus | 'ALL'>('ALL');
  const [autoPronounce, setAutoPronounce] = useState<boolean>(true);
  const [shuffledIds, setShuffledIds] = useState<string[] | null>(null);

  // Sync with selectedExamFilter prop
  useEffect(() => {
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

  // Filter vocabulary based on active filters
  const filteredVocabulary = React.useMemo(() => {
    return vocabulary.filter((v) => {
      const vExam = v.sourceExam?.trim() || 'Từ vựng tự nhập / Khác';
      const matchExam = filterExam === 'ALL' || vExam === filterExam;
      const matchCat = filterCategory === 'ALL' || v.type === filterCategory;
      const matchStat = filterStatus === 'ALL' || v.status === filterStatus;
      return matchExam && matchCat && matchStat;
    });
  }, [vocabulary, filterExam, filterCategory, filterStatus]);

  // Reset deck position and state ONLY when user intentionally changes filters
  useEffect(() => {
    setShuffledIds(null);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filterExam, filterCategory, filterStatus]);

  // Build deck adhering to shuffled order if active
  const deck = React.useMemo(() => {
    if (!shuffledIds || shuffledIds.length === 0) {
      return filteredVocabulary;
    }
    const map = new Map(filteredVocabulary.map((item) => [item.id, item]));
    const result: VocabularyItem[] = [];
    for (const id of shuffledIds) {
      const item = map.get(id);
      if (item) {
        result.push(item);
      }
    }
    // Any remaining items not yet in shuffledIds
    for (const item of filteredVocabulary) {
      if (!shuffledIds.includes(item.id)) {
        result.push(item);
      }
    }
    return result;
  }, [filteredVocabulary, shuffledIds]);

  // Safely clamp currentIndex if deck size shrinks
  useEffect(() => {
    if (deck.length > 0 && currentIndex >= deck.length) {
      setCurrentIndex(Math.max(0, deck.length - 1));
      setIsFlipped(false);
    }
  }, [deck.length, currentIndex]);

  const currentItem = deck[currentIndex];

  // Auto pronounce front card when changed
  useEffect(() => {
    if (currentItem && autoPronounce && !isFlipped) {
      speakEnglish(currentItem.term, accent);
    }
  }, [currentIndex, currentItem?.id, autoPronounce]);

  // Flip Handler
  const handleFlip = () => {
    if (!currentItem) return;
    if (!isFlipped) {
      onIncrementInteraction(currentItem.id);
    }
    setIsFlipped((prev) => !prev);
  };

  // Navigation Handlers
  const handleNext = () => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    if (filteredVocabulary.length === 0) return;
    const shuffled = [...filteredVocabulary]
      .sort(() => Math.random() - 0.5)
      .map((item) => item.id);
    setShuffledIds(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleSetStatus = (status: MasteryStatus) => {
    if (!currentItem) return;
    const targetId = currentItem.id;
    onUpdateStatus(targetId, status);
    onIncrementInteraction(targetId);

    // Proceed to next card smoothly
    setTimeout(() => {
      setIsFlipped(false);
      if (filterStatus !== 'ALL' && filterStatus !== status) {
        setCurrentIndex((prev) => {
          const nextLength = deck.length - 1;
          if (nextLength <= 0) return 0;
          return prev >= nextLength ? 0 : prev;
        });
      } else {
        setCurrentIndex((prev) => (deck.length > 0 ? (prev + 1) % deck.length : 0));
      }
    }, 250);
  };

  // Keyboard Shortcuts (Space: Flip, Left/Right: Navigate, 1/2/3: Status)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1') {
        handleSetStatus('Chưa thuộc');
      } else if (e.key === '2') {
        handleSetStatus('Đang học');
      } else if (e.key === '3') {
        handleSetStatus('Đã thành thạo');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentItem, isFlipped, deck.length, filterStatus]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Nhiệm vụ 3: Hệ thống hóa Flashcards Tương tác (Cấu trúc 2)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-500" />
            <span>Smart Flashcards - Ghi nhớ Ngữ cảnh Đề thi</span>
          </h2>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Exam Selector */}
          <select
            value={filterExam}
            onChange={(e) => {
              setFilterExam(e.target.value);
              if (onSelectExamFilter) onSelectExamFilter(e.target.value);
            }}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:outline-hidden max-w-[190px] truncate"
            title="Lọc theo Đề thi"
          >
            <option value="ALL">Tất cả đề ({vocabulary.length})</option>
            {examOptions.map((exam) => {
              const count = vocabulary.filter(
                (v) => (v.sourceExam?.trim() || 'Từ vựng tự nhập / Khác') === exam
              ).length;
              return (
                <option key={exam} value={exam}>
                  {exam.length > 22 ? exam.slice(0, 22) + '...' : exam} ({count})
                </option>
              );
            })}
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:outline-hidden"
          >
            <option value="ALL">Tất cả nhóm từ</option>
            <option value="Collocation">Collocations</option>
            <option value="Phrasal verb">Phrasal verbs</option>
            <option value="Idiom">Idioms</option>
            <option value="Preposition">Prepositions</option>
            <option value="Single word">Single words</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:outline-hidden"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="Chưa thuộc">Chưa thuộc</option>
            <option value="Đang học">Đang học</option>
            <option value="Đã thành thạo">Đã thành thạo</option>
          </select>

          <button
            type="button"
            onClick={handleShuffle}
            className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-300 rounded-xl flex items-center gap-1 text-slate-700 shadow-xs cursor-pointer"
            title="Xáo trộn thứ tự thẻ"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xáo trộn</span>
          </button>

          <button
            type="button"
            onClick={() => setAutoPronounce(!autoPronounce)}
            className={`p-1.5 text-xs font-semibold border rounded-xl flex items-center gap-1 shadow-xs cursor-pointer transition-all ${
              autoPronounce
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-slate-300 text-slate-400'
            }`}
            title="Tự động phát âm khi chuyển thẻ"
          >
            {autoPronounce ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Active Exam Notice */}
      {filterExam !== 'ALL' && (
        <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-2xl text-xs text-indigo-950 animate-in fade-in">
          <div className="flex items-center gap-2 truncate">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-indigo-200 text-indigo-800">
              Đang ôn đề
            </span>
            <span className="font-bold truncate">{filterExam}</span>
            <span className="text-slate-500">({deck.length} thẻ khả dụng)</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setFilterExam('ALL');
              if (onSelectExamFilter) onSelectExamFilter('ALL');
            }}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold ml-2 underline shrink-0 cursor-pointer"
          >
            Xem tất cả đề
          </button>
        </div>
      )}

      {deck.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">
            Không có Flashcard nào trong danh mục đã chọn
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Hãy chọn "Tất cả trạng thái" hoặc vào tab "Phân tích Đề thi" để thêm từ vựng mới vào bộ thẻ.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
            <span>
              Thẻ {currentIndex + 1} / {deck.length}
            </span>
            <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
              />
            </div>
            <span className="flex items-center gap-1 text-indigo-600 font-bold">
              {currentItem.type} • {currentItem.cefrLevel}
            </span>
          </div>

          {/* 3D Flashcard Container */}
          <div
            className="card-perspective w-full min-h-[380px] sm:min-h-[420px] cursor-pointer select-none"
            style={{
              perspective: '1200px',
              WebkitPerspective: '1200px'
            }}
            onClick={handleFlip}
          >
            <div
              className={`card-inner relative w-full h-full min-h-[380px] sm:min-h-[420px] ${
                isFlipped ? 'is-flipped' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                WebkitTransform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* FRONT OF CARD (Mặt trước: [Từ/Cụm từ]) */}
              <div
                className="card-front absolute inset-0 w-full h-full bg-gradient-to-br from-white via-indigo-50/20 to-slate-50 rounded-3xl p-8 sm:p-10 border-2 border-indigo-100 shadow-xl flex flex-col justify-between select-none"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)',
                  WebkitTransform: 'rotateY(0deg)',
                  zIndex: isFlipped ? 0 : 2,
                  pointerEvents: isFlipped ? 'none' : 'auto'
                }}
              >
                {/* Header Front */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                      {currentItem.type}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-700 border border-slate-200">
                      CEFR {currentItem.cefrLevel}
                    </span>
                    {currentItem.sourceExam && (
                      <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 truncate max-w-[190px]" title={`Đề thi: ${currentItem.sourceExam}`}>
                        {currentItem.sourceExam}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        currentItem.status === 'Đã thành thạo'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : currentItem.status === 'Đang học'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      ● {currentItem.status}
                    </span>
                    <span
                      className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200"
                      title="Thuật toán lặp lại ngắt quãng (Leitner Spaced Repetition System)"
                    >
                      {currentItem.status === 'Đã thành thạo'
                        ? '📦 Hộp 3 (Ôn sau 7 ngày)'
                        : currentItem.status === 'Đang học'
                        ? '📦 Hộp 2 (Ôn sau 3 ngày)'
                        : '📦 Hộp 1 (Ôn hàng ngày)'}
                    </span>
                  </div>
                </div>

                {/* Main Content Front */}
                <div className="text-center my-auto py-6">
                  <span className="text-xs uppercase font-extrabold text-slate-400 tracking-widest block mb-2">
                    MẶT TRƯỚC (TARGET VOCABULARY)
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                    {currentItem.term}
                  </h1>

                  <div className="inline-flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakEnglish(currentItem.term, accent);
                      }}
                      className="px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-2 border border-indigo-200 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4 text-indigo-600" />
                      <span>Nghe phát âm ({accent})</span>
                    </button>
                  </div>
                </div>

                {/* Footer Hint Front */}
                <div className="text-center pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Lượt lật: <strong>{currentItem.interactionCount}</strong></span>
                  <span className="flex items-center gap-1 font-semibold text-indigo-600 animate-pulse">
                    <RotateCw className="w-3.5 h-3.5" />
                    Bấm vào thẻ hoặc nhấn Phím Cách (Space) để lật
                  </span>
                  <span>Quiz: <strong>{currentItem.quizCorrectCount}/{currentItem.quizTotalCount}</strong></span>
                </div>
              </div>

              {/* BACK OF CARD (Mặt sau: IPA, Meaning, Example, Audio Hint) */}
              <div
                className="card-back absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border-2 border-indigo-500/40 shadow-2xl flex flex-col justify-between select-none overflow-y-auto"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  WebkitTransform: 'rotateY(180deg)',
                  zIndex: isFlipped ? 2 : 0,
                  pointerEvents: isFlipped ? 'auto' : 'none'
                }}
              >
                {/* Header Back */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/10 text-indigo-200 border border-white/20">
                      MẶT SAU (EVM ARCHITECT DETAILS)
                    </span>
                    <span className="text-xs text-indigo-300 font-mono">
                      {currentItem.ipa}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspectWord(currentItem);
                    }}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                    <span>Mở rộng bẫy đề</span>
                  </button>
                </div>

                {/* Main Content Back */}
                <div className="my-auto py-4 space-y-4">
                  {/* Term + Meaning */}
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {currentItem.term}
                      </h2>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakEnglish(currentItem.term, accent);
                        }}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                        title="Nghe lại"
                      >
                        <Volume2 className="w-4 h-4 text-amber-300" />
                      </button>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-amber-300 mt-1">
                      {currentItem.meaning}
                    </p>
                    {currentItem.sourceExam && (
                      <p className="text-[11px] text-indigo-300 font-semibold mt-1 truncate" title={currentItem.sourceExam}>
                        📑 Đề thi: {currentItem.sourceExam}
                      </p>
                    )}
                  </div>

                  {/* Context Sentence in Exam */}
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    <span className="not-italic text-xs font-bold text-indigo-300 block mb-1">
                      Ngữ cảnh trong đề thi (Exam Context):
                    </span>
                    "{currentItem.context.replace(/\*\*/g, '')}"
                  </div>

                  {/* Pedagogical Exam Tip */}
                  {currentItem.examTip && (
                    <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200">
                      💡 <strong>Mẹo thi THPT:</strong> {currentItem.examTip}
                    </div>
                  )}
                </div>

                {/* Footer Back: Quick Rating Buttons */}
                <div
                  className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    Đánh giá độ nhớ (Phím 1-2-3):
                  </span>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleSetStatus('Chưa thuộc')}
                      className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Phím [1] Chưa thuộc (Cần ôn lại)"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>[1] Chưa thuộc</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSetStatus('Đang học')}
                      className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Phím [2] Đang học (Nhớ 50-80%)"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>[2] Đang học</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSetStatus('Đã thành thạo')}
                      className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Phím [3] Đã thành thạo (Nhớ >90%)"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>[3] Thành thạo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Thẻ trước (←)</span>
            </button>

            <button
              type="button"
              onClick={handleFlip}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                isFlipped
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
              }`}
            >
              <RotateCw className={`w-4 h-4 transition-transform duration-300 ${isFlipped ? 'rotate-180' : ''}`} />
              <span>{isFlipped ? '↺ Xem mặt trước' : '↻ Lật xem đáp án'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span>Thẻ kế (→)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Keyboard hints banner */}
          <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5 text-indigo-500" />
              <strong>Phím tắt:</strong> [Space]: Lật thẻ
            </span>
            <span>•</span>
            <span>[← / →]: Chuyển thẻ</span>
            <span>•</span>
            <span>[1 / 2 / 3]: Đánh giá độ thuộc</span>
          </div>
        </div>
      )}
    </div>
  );
};
