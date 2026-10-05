import React, { useState, useMemo } from 'react';
import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  XCircle,
  Lightbulb,
  AlertCircle,
  Volume2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Search,
  Award,
  Sparkles,
  HelpCircle,
  Check,
  BrainCircuit,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GRAMMAR_TOPICS_DATA } from '../data/grammarHandbookData';
import { GrammarTopic, GrammarPracticeQuestion } from '../types';
import { speakEnglish } from '../utils/tts';
import { getStoredApiKey } from '../services/geminiService';

interface GrammarHandbookProps {
  accent: 'UK' | 'US';
  onOpenApiKeyModal: () => void;
}

export const GrammarHandbook: React.FC<GrammarHandbookProps> = ({
  accent,
  onOpenApiKeyModal
}) => {
  // Currently active topic ID
  const [selectedTopicId, setSelectedTopicId] = useState<string>('topic-1');
  
  // Current tab within the topic: 'theory' | 'practice'
  const [activeSubTab, setActiveSubTab] = useState<'theory' | 'practice'>('theory');

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | 'Trọng tâm' | 'Nâng cao'>('ALL');

  // Quiz state: user answers per question { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});

  // Active topic object
  const currentTopic = useMemo(() => {
    return GRAMMAR_TOPICS_DATA.find((t) => t.id === selectedTopicId) || GRAMMAR_TOPICS_DATA[0];
  }, [selectedTopicId]);

  // Current topic index
  const currentIndex = useMemo(() => {
    return GRAMMAR_TOPICS_DATA.findIndex((t) => t.id === currentTopic.id);
  }, [currentTopic]);

  // Filtered topics list based on search and difficulty
  const filteredTopics = useMemo(() => {
    return GRAMMAR_TOPICS_DATA.filter((topic) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        topic.title.toLowerCase().includes(q) ||
        topic.englishTitle.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.keyPoints.some((k) => k.toLowerCase().includes(q));

      const matchesDifficulty =
        difficultyFilter === 'ALL' ||
        (difficultyFilter === 'Trọng tâm' && (topic.difficulty === 'Trọng tâm' || topic.difficulty === 'Cơ bản')) ||
        (difficultyFilter === 'Nâng cao' && topic.difficulty === 'Nâng cao');

      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  // Calculate quiz score for current topic
  const topicQuestions = currentTopic.questions;
  const answeredCount = useMemo(() => {
    return topicQuestions.filter((q) => userAnswers[q.id] !== undefined).length;
  }, [topicQuestions, userAnswers]);

  const correctCount = useMemo(() => {
    return topicQuestions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
  }, [topicQuestions, userAnswers]);

  const isTopicQuizCompleted = answeredCount === topicQuestions.length && topicQuestions.length > 0;

  // Fire confetti when completing quiz with good score
  const handleSelectAnswer = (questionId: string, choice: 'A' | 'B' | 'C' | 'D', correctAnswer: 'A' | 'B' | 'C' | 'D') => {
    if (userAnswers[questionId]) return; // Answered already

    const updated = { ...userAnswers, [questionId]: choice };
    setUserAnswers(updated);

    // Check if this answer was correct and was the last one
    const newAnsweredCount = topicQuestions.filter((q) => updated[q.id] !== undefined).length;
    if (newAnsweredCount === topicQuestions.length) {
      const newCorrect = topicQuestions.filter((q) => updated[q.id] === q.correctAnswer).length;
      if (newCorrect / topicQuestions.length >= 0.7) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      }
    }
  };

  const handleResetTopicQuiz = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      topicQuestions.forEach((q) => {
        delete copy[q.id];
      });
      return copy;
    });
  };

  const handleGoPreviousTopic = () => {
    if (currentIndex > 0) {
      const prevTopic = GRAMMAR_TOPICS_DATA[currentIndex - 1];
      setSelectedTopicId(prevTopic.id);
      setActiveSubTab('theory');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoNextTopic = () => {
    if (currentIndex < GRAMMAR_TOPICS_DATA.length - 1) {
      const nextTopic = GRAMMAR_TOPICS_DATA[currentIndex + 1];
      setSelectedTopicId(nextTopic.id);
      setActiveSubTab('theory');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePronounce = (text: string) => {
    speakEnglish(text, accent);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-indigo-100">
              <BookMarked className="w-3.5 h-3.5 text-amber-300" />
              <span>Chương trình Trọng tâm THPT Quốc Gia 2026</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-amber-300 font-extrabold">18 Chuyên đề</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Sổ tay Cấu trúc & Ngữ pháp Ứng dụng
            </h1>
            <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed">
              Trọn bộ 18 dạng ngữ pháp then chốt trong đề thi tốt nghiệp THPT môn Tiếng Anh. Mỗi chuyên đề gồm tóm tắt lý thuyết, bảng công thức, ví dụ song ngữ và bài tập trắc nghiệm giải chi tiết.
            </p>
          </div>

          {/* Quick stats badge card */}
          <div className="flex md:flex-col gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center min-w-[130px]">
              <div className="text-2xl sm:text-3xl font-black text-amber-300">18 / 18</div>
              <div className="text-xs text-indigo-100 font-medium mt-0.5">Dạng bài thi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center min-w-[130px]">
              <div className="text-2xl sm:text-3xl font-black text-emerald-300">100%</div>
              <div className="text-xs text-indigo-100 font-medium mt-0.5">Có lời giải chi tiết</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Split Layout: Topic Drawer/List + Topic Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (lg:col-span-4 xl:col-span-4): Topics Navigator */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3.5">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm chuyên đề (VD: câu chẻ, đảo ngữ, bị động)..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => setDifficultyFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                  difficultyFilter === 'ALL'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tất cả (18)
              </button>
              <button
                type="button"
                onClick={() => setDifficultyFilter('Trọng tâm')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                  difficultyFilter === 'Trọng tâm'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Trọng tâm
              </button>
              <button
                type="button"
                onClick={() => setDifficultyFilter('Nâng cao')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                  difficultyFilter === 'Nâng cao'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Nâng cao (8+)
              </button>
            </div>

            {/* Topic List (Scrollable) */}
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredTopics.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Không tìm thấy chuyên đề phù hợp với từ khóa "{searchQuery}"
                </div>
              ) : (
                filteredTopics.map((topic) => {
                  const isSelected = topic.id === currentTopic.id;
                  const answeredInTopic = topic.questions.filter((q) => userAnswers[q.id] !== undefined).length;
                  const totalInTopic = topic.questions.length;
                  const hasDoneQuiz = answeredInTopic === totalInTopic && totalInTopic > 0;

                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => {
                        setSelectedTopicId(topic.id);
                        setActiveSubTab('theory');
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                          : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Topic number badge */}
                        <div
                          className={`w-7 h-7 rounded-lg font-mono text-xs font-black flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {String(topic.topicNumber).padStart(2, '0')}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs sm:text-sm font-bold truncate ${
                              isSelected ? 'text-indigo-900 font-black' : 'text-slate-800'
                            }`}
                          >
                            {topic.shortTitle}
                          </p>
                          <p className="text-[10.5px] text-slate-500 truncate mt-0.5">
                            {topic.englishTitle}
                          </p>
                        </div>
                      </div>

                      {/* Right badge */}
                      <div className="ml-2 shrink-0 flex items-center gap-1.5">
                        {hasDoneQuiz && (
                          <span
                            className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-100 font-bold px-1.5 py-0.5 rounded-md"
                            title="Đã hoàn thành bài tập"
                          >
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            topic.difficulty === 'Nâng cao'
                              ? 'bg-purple-100 text-purple-700'
                              : topic.difficulty === 'Trọng tâm'
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {topic.difficulty}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-8 xl:col-span-8): Active Topic Detail */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-6">
          {/* Active Topic Banner Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-black tracking-wider uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                    Chuyên đề {String(currentTopic.topicNumber).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                      currentTopic.difficulty === 'Nâng cao'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {currentTopic.badge}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {currentTopic.title}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                  {currentTopic.englishTitle}
                </p>
              </div>

              {/* Progress pill */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:text-right shrink-0">
                <span className="text-[11px] font-bold text-slate-500 block">Bài tập ứng dụng:</span>
                <span className="text-sm font-black text-indigo-600">
                  {answeredCount} / {topicQuestions.length} câu đã làm
                </span>
              </div>
            </div>

            {/* Quick summary and key bullets */}
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 sm:p-5 space-y-2.5">
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                <strong className="text-indigo-950 font-bold">Mục tiêu trọng tâm: </strong>
                {currentTopic.summary}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {currentTopic.keyPoints.map((point, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white text-slate-700 px-3 py-1 rounded-lg border border-indigo-200/60 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span>{point}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Sub-Tabs: Lý thuyết vs Bài tập ứng dụng */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveSubTab('theory')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSubTab === 'theory'
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Tóm tắt Lý thuyết & Ví dụ minh họa</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('practice')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSubTab === 'practice'
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-purple-600" />
                <span>
                  Bài tập Ứng dụng trắc nghiệm ({topicQuestions.length} câu)
                </span>
                {answeredCount > 0 && (
                  <span className="ml-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    {correctCount}/{answeredCount} đúng
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* TAB 1: TÓM TẮT LÝ THUYẾT */}
          {activeSubTab === 'theory' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {currentTopic.theorySections.map((section, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-5"
                >
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
                      <span className="w-2 h-5 rounded-full bg-indigo-600" />
                      <span>{section.title}</span>
                    </h3>
                    {section.subtitle && (
                      <p className="text-xs text-slate-500 font-medium mt-0.5 ml-4.5">
                        {section.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Formula Boxes (if any) */}
                  {section.formula && section.formula.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Công thức & Cấu trúc cốt lõi:</span>
                      </div>
                      <div className="space-y-2">
                        {section.formula.map((f, fIdx) => (
                          <div
                            key={fIdx}
                            className="p-3.5 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-amber-300 font-mono text-xs sm:text-sm font-bold shadow-xs border border-indigo-800/50 overflow-x-auto"
                          >
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rules list */}
                  {section.rules && section.rules.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {section.rules.map((rule, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-1"
                        >
                          <p className="text-xs font-black text-indigo-700 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                            <span>{rule.label}</span>
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            {rule.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Illustrative Bilingual Examples */}
                  {section.examples && section.examples.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Ví dụ minh họa ngữ cảnh thực tế (Bilingual):</span>
                      </div>
                      <div className="space-y-2.5">
                        {section.examples.map((ex, exIdx) => (
                          <div
                            key={exIdx}
                            className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100 hover:border-indigo-200 transition-all space-y-2"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                                {ex.en}
                              </p>
                              <button
                                type="button"
                                onClick={() => handlePronounce(ex.en)}
                                className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-100/80 transition-colors shrink-0 cursor-pointer"
                                title="Nghe phát âm câu mẫu"
                                aria-label="Phát âm câu tiếng Anh"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-slate-600 font-medium italic">
                              👉 {ex.vi}
                            </p>
                            {ex.note && (
                              <div className="text-[11px] font-semibold text-indigo-700 bg-white/80 px-2.5 py-1 rounded-md border border-indigo-100 inline-block">
                                💡 {ex.note}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Exam Traps & Tips (Alert Box) */}
                  {section.examTips && section.examTips.length > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black text-amber-900">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>Mẹo tránh bẫy đề thi THPTQG & Bí quyết nhớ nhanh:</span>
                      </div>
                      <ul className="space-y-1.5 pl-5 list-disc text-xs text-amber-900/90 font-medium">
                        {section.examTips.map((tip, tIdx) => (
                          <li key={tIdx} className="leading-relaxed whitespace-pre-line">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {/* Call to action to practice quiz */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl border border-indigo-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm sm:text-base font-black text-indigo-950">
                    Bạn đã nắm vững lý thuyết {currentTopic.shortTitle}?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Hãy làm {topicQuestions.length} câu hỏi trắc nghiệm thực chiến để củng cố kiến thức và kiểm tra mức độ hiểu bài ngay!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSubTab('practice');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-200 flex items-center gap-2 shrink-0 transition-all cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Bắt đầu làm bài tập ngay</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: BÀI TẬP ỨNG DỤNG TRẮC NGHIỆM */}
          {activeSubTab === 'practice' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Quiz Header Tracker */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="text-xs font-black text-slate-800">
                      Tiến độ làm bài:
                    </span>
                    <span className="text-xs font-black text-indigo-600">
                      {answeredCount} / {topicQuestions.length} câu
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-48 sm:w-64 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(answeredCount / topicQuestions.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] text-emerald-700 font-bold block">Đúng</span>
                    <span className="text-sm font-black text-emerald-700">{correctCount}</span>
                  </div>
                  <div className="text-center px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200">
                    <span className="text-[10px] text-rose-700 font-bold block">Sai</span>
                    <span className="text-sm font-black text-rose-700">
                      {answeredCount - correctCount}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetTopicQuiz}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                    title="Làm lại tất cả câu hỏi của chuyên đề này"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Completion Banner */}
              {isTopicQuizCompleted && (
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200 rounded-3xl p-6 text-center space-y-3 shadow-sm animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    Hoàn thành xuất sắc: {correctCount} / {topicQuestions.length} câu đúng!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    {correctCount === topicQuestions.length
                      ? 'Tuyệt vời! Bạn đã trả lời chính xác 100% câu hỏi của chuyên đề này.'
                      : 'Chúc mừng bạn! Hãy xem lại các câu chưa chính xác bên dưới để ghi nhớ sâu sắc kiến thức nhé.'}
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetTopicQuiz}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      Làm lại bài này
                    </button>
                    {currentIndex < GRAMMAR_TOPICS_DATA.length - 1 && (
                      <button
                        type="button"
                        onClick={handleGoNextTopic}
                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-200 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Sang chuyên đề kế tiếp</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-5">
                {topicQuestions.map((q, qIndex) => {
                  const userAnswer = userAnswers[q.id];
                  const isAnswered = userAnswer !== undefined;
                  const isCorrect = isAnswered && userAnswer === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 space-y-4 shadow-xs ${
                        isAnswered
                          ? isCorrect
                            ? 'border-emerald-300 bg-emerald-50/20'
                            : 'border-rose-300 bg-rose-50/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Question top row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                            {qIndex + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            Câu hỏi trắc nghiệm
                          </span>
                        </div>

                        {/* Speaker button to pronounce question */}
                        <button
                          type="button"
                          onClick={() => handlePronounce(q.question)}
                          className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                          title="Nghe phát âm câu hỏi"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Question Sentence */}
                      <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                        {q.question}
                      </p>

                      {/* 4 Choices */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {(['A', 'B', 'C', 'D'] as const).map((choiceKey) => {
                          const optionText = q.options[choiceKey];
                          const isThisChoiceSelected = userAnswer === choiceKey;
                          const isThisChoiceCorrect = q.correctAnswer === choiceKey;

                          let buttonStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                          if (isAnswered) {
                            if (isThisChoiceCorrect) {
                              buttonStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-sm';
                            } else if (isThisChoiceSelected && !isCorrect) {
                              buttonStyle = 'bg-rose-600 text-white border-rose-600 shadow-sm';
                            } else {
                              buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={choiceKey}
                              type="button"
                              disabled={isAnswered}
                              onClick={() => handleSelectAnswer(q.id, choiceKey, q.correctAnswer)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${buttonStyle}`}
                            >
                              <span
                                className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                                  isAnswered && (isThisChoiceCorrect || isThisChoiceSelected)
                                    ? 'bg-white/20 text-white'
                                    : 'bg-white border border-slate-200 text-slate-700'
                                }`}
                              >
                                {choiceKey}
                              </span>
                              <span className="flex-1 truncate">{optionText}</span>

                              {/* Icon indicator */}
                              {isAnswered && isThisChoiceCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                              )}
                              {isAnswered && isThisChoiceSelected && !isCorrect && (
                                <XCircle className="w-4 h-4 text-white shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Reveal Box */}
                      {isAnswered && (
                        <div
                          className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in-50 duration-200 ${
                            isCorrect
                              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                              : 'bg-rose-50/80 border-rose-200 text-rose-950'
                          }`}
                        >
                          <div className="flex items-center gap-2 font-black text-xs">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span className="text-emerald-800">
                                  Chính xác! Đáp án đúng là {q.correctAnswer}
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                <span className="text-rose-800">
                                  Chưa chính xác! Đáp án đúng là {q.correctAnswer}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Clue / Formula */}
                          {q.clue && (
                            <div className="font-semibold text-indigo-900 bg-white/80 p-2 rounded-lg border border-indigo-100">
                              🎯 <strong>Dấu hiệu nhận biết:</strong> {q.clue}
                            </div>
                          )}

                          {/* Detailed Explanation */}
                          <p className="leading-relaxed font-medium text-slate-700">
                            <strong>Giải thích:</strong> {q.explanation}
                          </p>

                          {/* Vietnamese Translation */}
                          {q.translation && (
                            <p className="italic text-slate-600 pt-1 border-t border-slate-200/60">
                              🌐 <strong>Dịch nghĩa:</strong> {q.translation}
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

          {/* Navigation Bar: Previous / Next Topic */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 flex items-center justify-between shadow-xs">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={handleGoPreviousTopic}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Chuyên đề trước</span>
            </button>

            <span className="text-xs font-bold text-slate-400">
              {currentTopic.topicNumber} / {GRAMMAR_TOPICS_DATA.length}
            </span>

            <button
              type="button"
              disabled={currentIndex === GRAMMAR_TOPICS_DATA.length - 1}
              onClick={handleGoNextTopic}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentIndex === GRAMMAR_TOPICS_DATA.length - 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-100 cursor-pointer'
              }`}
            >
              <span>Chuyên đề kế tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
