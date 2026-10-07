import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Volume2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  Library,
  Compass,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLEAN_GRAMMAR_TOPICS, CleanGrammarTopic } from '../data/grammarHandbookData';
import { GrammarPracticeQuestion } from '../types';
import { speakEnglish } from '../utils/tts';
import { generateGrammarQuizWithFallback, getStoredApiKey } from '../services/geminiService';

interface GrammarHandbookProps {
  accent: 'UK' | 'US';
  onOpenApiKeyModal: () => void;
}

export const GrammarHandbook: React.FC<GrammarHandbookProps> = ({
  accent,
  onOpenApiKeyModal
}) => {
  // Current active topic ID
  const [activeTopicId, setActiveTopicId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('evm_grammar_topic_id');
      if (saved) return saved;
    }
    return 'topic-1';
  });

  // Strictly either 'theory' or 'practice'
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('evm_grammar_tab');
      if (saved === 'theory' || saved === 'practice') return saved;
    }
    return 'theory';
  });

  // Search keyword to find topics
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('evm_grammar_topic_id', activeTopicId);
    }
  }, [activeTopicId]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('evm_grammar_tab', activeTab);
    }
  }, [activeTab]);

  // Practice state: active questions for each topic
  // Allows student to regenerate or swap question sets endlessly
  const [topicQuestionsMap, setTopicQuestionsMap] = useState<Record<string, GrammarPracticeQuestion[]>>(() => {
    const initMap: Record<string, GrammarPracticeQuestion[]> = {};
    CLEAN_GRAMMAR_TOPICS.forEach((t) => {
      initMap[t.id] = t.questions;
    });
    return initMap;
  });

  // Track which question pool version is active (0 = default, 1 = pool)
  const [poolVersionMap, setPoolVersionMap] = useState<Record<string, number>>({});

  // User answers per question ID { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});

  // AI Generation loading state
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiErrorMsg, setAiErrorMsg] = useState<string | null>(null);
  const [fallbackStatus, setFallbackStatus] = useState<string | null>(null);

  // Active topic object
  const currentTopic = useMemo(() => {
    return CLEAN_GRAMMAR_TOPICS.find((t) => t.id === activeTopicId) || CLEAN_GRAMMAR_TOPICS[0];
  }, [activeTopicId]);

  const currentIndex = useMemo(() => {
    return CLEAN_GRAMMAR_TOPICS.findIndex((t) => t.id === currentTopic.id);
  }, [currentTopic]);

  // Current active questions for this topic
  const currentQuestions = useMemo(() => {
    return topicQuestionsMap[currentTopic.id] || currentTopic.questions;
  }, [topicQuestionsMap, currentTopic]);

  // Filtered topics for the top selector
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return CLEAN_GRAMMAR_TOPICS;
    const q = searchQuery.toLowerCase().trim();
    return CLEAN_GRAMMAR_TOPICS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.shortTitle.toLowerCase().includes(q) ||
        t.englishTitle.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Score stats for current topic
  const answeredCount = useMemo(() => {
    return currentQuestions.filter((q) => userAnswers[q.id] !== undefined).length;
  }, [currentQuestions, userAnswers]);

  const correctCount = useMemo(() => {
    return currentQuestions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
  }, [currentQuestions, userAnswers]);

  // Handle answering a question
  const handleAnswer = (questionId: string, choice: 'A' | 'B' | 'C' | 'D') => {
    if (userAnswers[questionId]) return; // Answered already

    const updated = { ...userAnswers, [questionId]: choice };
    setUserAnswers(updated);

    // Confetti if finished with high score
    const newAnswered = currentQuestions.filter((q) => updated[q.id] !== undefined).length;
    if (newAnswered === currentQuestions.length && currentQuestions.length > 0) {
      const newCorrect = currentQuestions.filter((q) => updated[q.id] === q.correctAnswer).length;
      if (newCorrect / currentQuestions.length >= 0.7) {
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  // Reset quiz for current topic
  const handleResetQuiz = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      currentQuestions.forEach((q) => {
        delete copy[q.id];
      });
      return copy;
    });
  };

  // Swap to another set from the Teacher's Question Bank (Offline / Built-in)
  const handleSwapBankQuestions = () => {
    const currentVer = poolVersionMap[currentTopic.id] || 0;
    const nextVer = currentVer === 0 ? 1 : 0;

    // Clear answers for this topic
    handleResetQuiz();

    let newQuestions: GrammarPracticeQuestion[] = [];
    if (nextVer === 1 && currentTopic.questionPool && currentTopic.questionPool.length > 0) {
      newQuestions = currentTopic.questionPool;
    } else {
      newQuestions = currentTopic.questions;
    }

    setPoolVersionMap((prev) => ({ ...prev, [currentTopic.id]: nextVer }));
    setTopicQuestionsMap((prev) => ({ ...prev, [currentTopic.id]: newQuestions }));
  };

  // Generate brand new questions with Gemini AI
  const handleGenerateAiQuestions = async () => {
    const key = getStoredApiKey();
    if (!key) {
      onOpenApiKeyModal();
      return;
    }

    setIsGeneratingAi(true);
    setAiErrorMsg(null);
    setFallbackStatus(null);

    try {
      const newQuestions = await generateGrammarQuizWithFallback(
        currentTopic.title,
        currentTopic.englishTitle,
        5,
        (failedModel, nextModel) => {
          setFallbackStatus(`Mô hình ${failedModel} bận hoặc vượt giới hạn, đang tự động chuyển sang ${nextModel}...`);
        }
      );

      if (newQuestions && newQuestions.length > 0) {
        // Clear old answers
        handleResetQuiz();
        setTopicQuestionsMap((prev) => ({
          ...prev,
          [currentTopic.id]: newQuestions
        }));
      }
    } catch (err: any) {
      console.error('Error generating AI grammar questions:', err);
      setAiErrorMsg(err.message || 'Không thể tạo câu hỏi từ AI lúc này. Vui lòng thử lại sau.');
    } finally {
      setIsGeneratingAi(false);
      setFallbackStatus(null);
    }
  };

  const handlePronounce = (text: string) => {
    speakEnglish(text, accent);
  };

  return (
    <div className="space-y-5">
      {/* 1. Thanh chọn nhanh 18 Chuyên đề (Gọn gàng, dễ nhìn, không rườm rà) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
            <h2 className="text-sm sm:text-base font-black text-slate-800">
              18 Chuyên đề Ngữ pháp Trọng tâm THPT Quốc Gia
            </h2>
          </div>

          {/* Ô tìm kiếm chuyên đề nhanh */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhanh chuyên đề..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Thanh cuộn ngang 18 chuyên đề */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {filteredTopics.map((topic) => {
            const isSelected = topic.id === currentTopic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => {
                  setActiveTopicId(topic.id);
                  // Giữ nguyên tab đang xem (hoặc default)
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10.5px] font-mono font-black ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {String(topic.topicNumber).padStart(2, '0')}
                </span>
                <span>{topic.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Tiêu đề chuyên đề đang chọn & Bộ chọn 2 Tab rõ ràng: LÝ THUYẾT vs BÀI TẬP */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                CHUYÊN ĐỀ {String(currentTopic.topicNumber).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {currentTopic.englishTitle}
              </span>
              {currentTopic.difficulty && (
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
                    currentTopic.difficulty === 'Nâng cao'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {currentTopic.difficulty}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {currentTopic.title}
            </h1>
          </div>

          {/* Chuyển nhanh bài trước / sau */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => {
                if (currentIndex > 0) setActiveTopicId(CLEAN_GRAMMAR_TOPICS[currentIndex - 1].id);
              }}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              title="Chuyên đề trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-500 px-1">
              {currentTopic.topicNumber} / 18
            </span>
            <button
              type="button"
              disabled={currentIndex === CLEAN_GRAMMAR_TOPICS.length - 1}
              onClick={() => {
                if (currentIndex < CLEAN_GRAMMAR_TOPICS.length - 1) setActiveTopicId(CLEAN_GRAMMAR_TOPICS[currentIndex + 1].id);
              }}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              title="Chuyên đề sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2 TAB TO RÕ: CHỌN LÝ THUYẾT HIỆN LÝ THUYẾT - CHỌN BÀI TẬP HIỆN BÀI TẬP */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('theory')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'theory'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>1. Tóm tắt Lý thuyết & Ví dụ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('practice')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-600" />
            <span>2. Bài tập Thực hành Trắc nghiệm</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          NỘI DUNG 1: LÝ THUYẾT (Trình bày khoa học, hệ thống, dễ hiểu)
          ======================================================== */}
      {activeTab === 'theory' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Thanh mục lục điều hướng nhanh */}
          <div className="bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-2xs flex items-center gap-2 overflow-x-auto text-xs font-bold scrollbar-thin">
            <span className="text-[11px] text-slate-400 font-semibold shrink-0 flex items-center gap-1 mr-1">
              <Compass className="w-3.5 h-3.5 text-indigo-500" />
              Mục lục nhanh:
            </span>
            <a
              href="#sec-overview"
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 transition-colors whitespace-nowrap border border-slate-200"
            >
              🎯 1. Bản chất & Dấu hiệu
            </a>
            <a
              href="#sec-formulas"
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-800 text-slate-600 transition-colors whitespace-nowrap border border-slate-200"
            >
              📐 2. Bảng Công thức Vàng
            </a>
            <a
              href="#sec-details"
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 transition-colors whitespace-nowrap border border-slate-200"
            >
              📚 3. Lý thuyết Chi tiết
            </a>
            {currentTopic.comparisonTable && (
              <a
                href="#sec-comparison"
                className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition-colors whitespace-nowrap border border-slate-200"
              >
                🔄 4. Bảng Đối chiếu
              </a>
            )}
            <a
              href="#sec-examples"
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-sky-50 hover:text-sky-700 text-slate-600 transition-colors whitespace-nowrap border border-slate-200"
            >
              🔊 5. Ví dụ Minh họa
            </a>
            <a
              href="#sec-traps"
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-rose-50 hover:text-rose-700 text-slate-600 transition-colors whitespace-nowrap border border-slate-200"
            >
              ⚠️ 6. Bẫy Đề thi THPTQG
            </a>
          </div>

          {/* I. Bản chất Ngữ pháp & Dấu hiệu nhận diện dạng bài */}
          <div id="sec-overview" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5 scroll-mt-20">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-800 uppercase tracking-wider">
              <span className="w-2 h-4 rounded-full bg-indigo-600" />
              <span>I. Bản chất Ngữ pháp & Nguyên lý Giải đề</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pl-3 border-l-2 border-indigo-300">
              {currentTopic.concept}
            </p>

            {currentTopic.recognitionSignals && currentTopic.recognitionSignals.length > 0 && (
              <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dấu hiệu nhận diện dạng câu hỏi trong đề thi THPTQG:</span>
                </p>
                <ul className="space-y-1.5 pl-1">
                  {currentTopic.recognitionSignals.map((sig, sIdx) => (
                    <li key={sIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* II. Bảng Công thức Vàng cốt lõi */}
          <div id="sec-formulas" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 scroll-mt-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-amber-800 uppercase tracking-wider">
                <span className="w-2 h-4 rounded-full bg-amber-500" />
                <span>II. Bảng Công thức Vàng cốt lõi (Ghi nhớ nhanh)</span>
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                Key Formulas
              </span>
            </div>
            <div className="space-y-2.5">
              {currentTopic.formulas.map((form, fIdx) => (
                <div
                  key={fIdx}
                  className="p-3.5 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs sm:text-sm font-bold shadow-xs border border-slate-800 overflow-x-auto leading-relaxed flex items-center gap-2.5"
                >
                  <span className="text-slate-500 select-none text-[11px] font-sans">#{fIdx + 1}</span>
                  <span>{form}</span>
                </div>
              ))}
            </div>
          </div>

          {/* III. Hệ thống Lý thuyết & Quy tắc Trọng tâm Chi tiết */}
          <div id="sec-details" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-black text-indigo-800 uppercase tracking-wider">
                <span className="w-2 h-4 rounded-full bg-indigo-600" />
                <span>III. Hệ thống Lý thuyết & Quy tắc Trọng tâm Chi tiết</span>
              </div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                Chuẩn THPTQG
              </span>
            </div>

            {currentTopic.detailedSections && currentTopic.detailedSections.length > 0 ? (
              <div className="space-y-3.5">
                {currentTopic.detailedSections.map((sec, secIdx) => (
                  <div
                    key={secIdx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 transition-all hover:bg-slate-50/90"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10.5px] font-mono shrink-0">
                          {secIdx + 1}
                        </span>
                        <span>{sec.heading}</span>
                      </h3>
                      {sec.badge && (
                        <span className="text-[10px] font-black text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                          {sec.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
                      {sec.content}
                    </p>

                    {sec.formula && (
                      <div className="p-2.5 rounded-lg bg-slate-900 text-amber-300 font-mono text-xs font-bold border border-slate-800 overflow-x-auto">
                        👉 {sec.formula}
                      </div>
                    )}

                    {sec.rules && sec.rules.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {sec.rules.map((r, rIdx) => (
                          <div key={rIdx} className="text-xs text-slate-700 font-medium leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {sec.bulletPoints.map((bp, bpIdx) => (
                          <div key={bpIdx} className="text-xs text-slate-700 font-medium leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{bp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentTopic.rules.map((rule, rIdx) => (
                  <div key={rIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <p className="text-xs font-black text-indigo-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <span>{rule.label}</span>
                    </p>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {rule.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* IV. Bảng Đối chiếu So sánh nếu có */}
          {currentTopic.comparisonTable && (
            <div id="sec-comparison" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 scroll-mt-20">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-800 uppercase tracking-wider">
                <span className="w-2 h-4 rounded-full bg-emerald-600" />
                <span>IV. {currentTopic.comparisonTable.title}</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-xs text-left divide-y divide-slate-200">
                  <thead className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider">
                    <tr>
                      {currentTopic.comparisonTable.headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-3.5 py-2.5 font-black text-[11px]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {currentTopic.comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-3.5 py-2.5 font-medium leading-relaxed whitespace-pre-line ${
                              cIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-700'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* V. Ví dụ Song ngữ Điển hình & Phân tích Đề thi */}
          <div id="sec-examples" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 scroll-mt-20">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-800 uppercase tracking-wider">
              <span className="w-2 h-4 rounded-full bg-indigo-600" />
              <span>V. Ví dụ Minh họa Điển hình & Phân tích Đề thi</span>
            </div>
            <div className="space-y-2.5">
              {currentTopic.examples.map((ex, exIdx) => (
                <div
                  key={exIdx}
                  className="p-3.5 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                      {ex.en}
                    </p>
                    <button
                      type="button"
                      onClick={() => handlePronounce(ex.en)}
                      className="p-1 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors shrink-0 cursor-pointer"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 font-medium italic">
                    👉 {ex.vi}
                  </p>
                  {ex.note && (
                    <p className="text-[11px] font-semibold text-indigo-700 bg-white/90 px-2.5 py-1 rounded-md border border-indigo-100 inline-block">
                      💡 {ex.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* VI. Cẩm nang Bẫy Đề thi THPT Quốc Gia (Trúng tủ) */}
          {currentTopic.examTips.length > 0 && (
            <div id="sec-traps" className="bg-amber-50/90 rounded-2xl border border-amber-200 p-5 shadow-xs space-y-2.5 scroll-mt-20">
              <div className="flex items-center gap-2 text-xs font-black text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>VI. Cẩm nang Bẫy Đề thi THPT Quốc Gia (Trúng tủ)</span>
              </div>
              <ul className="space-y-2 pl-2 list-none text-xs text-amber-950 font-medium">
                {currentTopic.examTips.map((tip, tIdx) => (
                  <li key={tIdx} className="leading-relaxed flex items-start gap-2">
                    <span className="text-amber-600 font-bold shrink-0">⚡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Nút chuyển sang làm bài tập */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('practice');
                window.scrollTo({ top: 150, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Chuyển sang làm Bài tập thực hành ngay</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          NỘI DUNG 2: BÀI TẬP THỰC HÀNH (Tạo bài mới bao nhiêu lần cũng được)
          ======================================================== */}
      {activeTab === 'practice' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Thanh công cụ bài tập: Tạo mới với AI, Đổi câu hỏi ngân hàng, Làm lại */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-700">Tiến độ:</span>
              <span className="text-xs font-black text-indigo-600">
                {answeredCount} / {currentQuestions.length} câu đã làm
              </span>
              {answeredCount > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {correctCount} đúng
                </span>
              )}
            </div>

            {/* Các nút tạo bài tập mới */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Nút Tạo bài tập mới bằng AI */}
              <button
                type="button"
                disabled={isGeneratingAi}
                onClick={handleGenerateAiQuestions}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
                title="Tạo 5 câu hỏi mới hoàn toàn bằng Gemini AI"
              >
                {isGeneratingAi ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang tạo câu hỏi mới...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tạo bài tập mới với AI</span>
                  </>
                )}
              </button>

              {/* Nút Đổi câu hỏi từ Ngân hàng đề của cô */}
              <button
                type="button"
                onClick={handleSwapBankQuestions}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer border border-slate-200"
                title="Đổi sang bộ câu hỏi khác trong ngân hàng đề"
              >
                <Library className="w-3.5 h-3.5 text-indigo-600" />
                <span>Đổi bộ đề khác</span>
              </button>

              {/* Nút Làm lại bài tập */}
              <button
                type="button"
                onClick={handleResetQuiz}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                title="Làm lại lượt này"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Trạng thái chuyển đổi model dự phòng */}
          {fallbackStatus && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center gap-2 animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{fallbackStatus}</span>
            </div>
          )}

          {/* Lỗi AI nếu có */}
          {aiErrorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-rose-900">Không thể tạo câu hỏi với AI</p>
                  <p className="text-slate-700 mt-0.5">{aiErrorMsg}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setAiErrorMsg(null);
                    handleSwapBankQuestions();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Làm đề có sẵn ngay
                </button>
                <button
                  type="button"
                  onClick={() => setAiErrorMsg(null)}
                  className="px-2 py-1.5 text-slate-500 hover:text-slate-800 text-xs font-medium cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}

          {/* Danh sách câu hỏi trắc nghiệm */}
          <div className="space-y-4">
            {currentQuestions.map((q, qIndex) => {
              const userAnswer = userAnswers[q.id];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = isAnswered && userAnswer === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 space-y-3.5 shadow-xs ${
                    isAnswered
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/15'
                        : 'border-rose-300 bg-rose-50/15'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {qIndex + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Chọn đáp án đúng nhất
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePronounce(q.question)}
                      className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                      title="Nghe câu hỏi"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Câu hỏi */}
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                    {q.question}
                  </p>

                  {/* 4 Phương án A, B, C, D */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(['A', 'B', 'C', 'D'] as const).map((key) => {
                      const text = q.options[key];
                      const isSelected = userAnswer === key;
                      const isCorrectChoice = q.correctAnswer === key;

                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                      if (isAnswered) {
                        if (isCorrectChoice) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-600 text-white border-rose-600';
                        } else {
                          btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={isAnswered}
                          onClick={() => handleAnswer(q.id, key)}
                          className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${btnStyle}`}
                        >
                          <span
                            className={`w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 ${
                              isAnswered && (isCorrectChoice || isSelected)
                                ? 'bg-white/20 text-white'
                                : 'bg-white border border-slate-200 text-slate-700'
                            }`}
                          >
                            {key}
                          </span>
                          <span className="flex-1 truncate">{text}</span>
                          {isAnswered && isCorrectChoice && (
                            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-white shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Khung giải thích chi tiết khi đã trả lời */}
                  {isAnswered && (
                    <div
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 animate-in fade-in duration-150 ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {isCorrect ? (
                          <span className="text-emerald-700">✓ Đúng rồi! Đáp án: {q.correctAnswer}</span>
                        ) : (
                          <span className="text-rose-700">✗ Chưa đúng! Đáp án đúng là: {q.correctAnswer}</span>
                        )}
                      </div>
                      {q.clue && (
                        <p className="font-semibold text-indigo-900 bg-white/70 p-1.5 rounded-md">
                          🎯 <strong>Dấu hiệu:</strong> {q.clue}
                        </p>
                      )}
                      <p className="leading-relaxed font-medium">
                        💡 <strong>Giải thích:</strong> {q.explanation}
                      </p>
                      {q.translation && (
                        <p className="italic text-slate-600 pt-1 border-t border-slate-200/50">
                          🌐 <strong>Dịch câu:</strong> {q.translation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
