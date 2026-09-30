import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  UploadCloud,
  CheckCircle,
  Plus,
  Volume2,
  BookmarkPlus,
  Layers,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Loader2,
  Filter,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Clock,
  KeyRound,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { SAMPLE_EXAMS } from '../data/sampleExams';
import { VocabularyItem, VocabCategory } from '../types';
import { speakEnglish } from '../utils/tts';
import {
  extractVocabularyWithFallback,
  getStoredApiKey,
  getStoredModel,
  SUPPORTED_MODELS
} from '../services/geminiService';

interface ExamExtractorProps {
  onAddVocabBatch: (items: VocabularyItem[]) => void;
  onOpenFlashcardsWithWords: (items: VocabularyItem[]) => void;
  onGenerateQuizWithWords: (items: VocabularyItem[]) => void;
  onInspectWord: (word: VocabularyItem) => void;
  accent: 'UK' | 'US';
  onOpenApiKeyModal: () => void;
}

type StepStatus = 'idle' | 'running' | 'completed' | 'failed';

interface StepInfo {
  step: 1 | 2 | 3;
  title: string;
  desc: string;
  status: StepStatus;
  message?: string;
}

export const ExamExtractor: React.FC<ExamExtractorProps> = ({
  onAddVocabBatch,
  onOpenFlashcardsWithWords,
  onGenerateQuizWithWords,
  onInspectWord,
  accent,
  onOpenApiKeyModal
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>(SAMPLE_EXAMS[0].id);
  const [examTitle, setExamTitle] = useState<string>(SAMPLE_EXAMS[0].title);
  const [examText, setExamText] = useState<string>(SAMPLE_EXAMS[0].content);
  const [selectedCategories, setSelectedCategories] = useState<VocabCategory[]>([
    'Collocation',
    'Phrasal verb',
    'Idiom',
    'Preposition',
    'Single word'
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [currentRunningModel, setCurrentRunningModel] = useState<string>(getStoredModel());

  // 3-step state management strictly following Rule 1 & Rule 3
  const [steps, setSteps] = useState<StepInfo[]>([
    {
      step: 1,
      title: 'Bước 1: Phân tích Ngữ liệu',
      desc: 'Quét bối cảnh, chủ đề bài thi & độ khó CEFR',
      status: 'idle'
    },
    {
      step: 2,
      title: 'Bước 2: Bóc tách 5 Nhóm Từ vựng',
      desc: 'Trích xuất Collocations, Phrasal verbs, Idioms, Prepositions & IPA',
      status: 'idle'
    },
    {
      step: 3,
      title: 'Bước 3: Tổng hợp Sư phạm & Mẹo thi',
      desc: 'Ghi chú bẫy thi THPT, câu nguyên văn & hoàn thiện kết quả',
      status: 'idle'
    }
  ]);

  const [extractedList, setExtractedList] = useState<VocabularyItem[]>(
    SAMPLE_EXAMS[0].initialVocab.map((item, idx) => ({
      ...item,
      id: `sample-${SAMPLE_EXAMS[0].id}-${idx}`,
      status: 'Chưa thuộc',
      interactionCount: 0,
      quizCorrectCount: 0,
      quizTotalCount: 0,
      addedAt: new Date().toISOString()
    }))
  );

  const [aiSummary, setAiSummary] = useState<string>(
    'Ngữ liệu đề thi tập trung vào chủ đề Trí tuệ Nhân tạo & Việc làm tương lai với độ khó dao động từ B1 đến C1. Các cấu trúc phân loại cao bao gồm các Collocations động từ "make", cụm thành ngữ ẩn dụ và các giới từ phụ thuộc quan trọng.'
  );

  const [selectedWordIds, setSelectedWordIds] = useState<Set<string>>(
    new Set(extractedList.map((i) => i.id))
  );

  const handleSelectSample = (sampleId: string) => {
    const found = SAMPLE_EXAMS.find((s) => s.id === sampleId);
    if (!found) return;
    setSelectedSampleId(sampleId);
    setExamTitle(found.title);
    setExamText(found.content);

    const initial = found.initialVocab.map((item, idx) => ({
      ...item,
      id: `sample-${found.id}-${idx}`,
      status: 'Chưa thuộc' as const,
      interactionCount: 0,
      quizCorrectCount: 0,
      quizTotalCount: 0,
      addedAt: new Date().toISOString()
    }));
    setExtractedList(initial);
    setSelectedWordIds(new Set(initial.map((i) => i.id)));
    setAiSummary(`Đề: ${found.title} - ${found.description}`);
    setErrorMsg(null);
    setFallbackNotice(null);

    // Reset steps to idle
    setSteps([
      {
        step: 1,
        title: 'Bước 1: Phân tích Ngữ liệu',
        desc: 'Quét bối cảnh, chủ đề bài thi & độ khó CEFR',
        status: 'idle'
      },
      {
        step: 2,
        title: 'Bước 2: Bóc tách 5 Nhóm Từ vựng',
        desc: 'Trích xuất Collocations, Phrasal verbs, Idioms, Prepositions & IPA',
        status: 'idle'
      },
      {
        step: 3,
        title: 'Bước 3: Tổng hợp Sư phạm & Mẹo thi',
        desc: 'Ghi chú bẫy thi THPT, câu nguyên văn & hoàn thiện kết quả',
        status: 'idle'
      }
    ]);
  };

  const handleToggleCategory = (cat: VocabCategory) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length === 1) return;
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const updateStepStatus = (
    stepNum: 1 | 2 | 3,
    status: StepStatus,
    message?: string
  ) => {
    setSteps((prev) =>
      prev.map((s) => (s.step === stepNum ? { ...s, status, message: message || s.message } : s))
    );
  };

  const handleRunAiExtraction = async () => {
    if (!examText.trim()) {
      setErrorMsg('Vui lòng nhập hoặc dán nội dung đề thi tiếng Anh cần phân tích.');
      return;
    }

    const currentKey = getStoredApiKey();
    if (!currentKey) {
      onOpenApiKeyModal();
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setFallbackNotice(null);
    setCurrentRunningModel(getStoredModel());

    // Reset steps to initial running state
    setSteps([
      {
        step: 1,
        title: 'Bước 1: Phân tích Ngữ liệu',
        desc: 'Quét bối cảnh, chủ đề bài thi & độ khó CEFR',
        status: 'running',
        message: 'Đang khởi chạy phân tích cấu trúc...'
      },
      {
        step: 2,
        title: 'Bước 2: Bóc tách 5 Nhóm Từ vựng',
        desc: 'Trích xuất Collocations, Phrasal verbs, Idioms, Prepositions & IPA',
        status: 'idle'
      },
      {
        step: 3,
        title: 'Bước 3: Tổng hợp Sư phạm & Mẹo thi',
        desc: 'Ghi chú bẫy thi THPT, câu nguyên văn & hoàn thiện kết quả',
        status: 'idle'
      }
    ]);

    try {
      const result = await extractVocabularyWithFallback(
        examText,
        examTitle,
        selectedCategories,
        // Step progress callback
        (stepNum, status, message) => {
          updateStepStatus(stepNum, status, message);
        },
        // Fallback retry callback
        (failedModel, nextModel, error) => {
          setCurrentRunningModel(nextModel);
          setFallbackNotice(
            `Model "${failedModel}" gặp sự cố (${error.slice(0, 100)}...). Hệ thống tự động chuyển sang thử lại với model dự phòng "${nextModel}".`
          );
        }
      );

      // On complete success
      setExtractedList(result.vocabulary);
      setSelectedWordIds(new Set(result.vocabulary.map((w) => w.id)));
      setAiSummary(result.summary);
      setFallbackNotice(null);
    } catch (err: any) {
      console.error('Failed to extract vocab:', err);
      const rawError = err.message || 'Lỗi không xác định khi gọi AI.';
      setErrorMsg(rawError);

      // RULE 3 COMPLIANCE:
      // "Trạng thái các cột đang chờ phải chuyển thành 'Đã dừng do lỗi', tuyệt đối không được hiện 'Hoàn tất' hoặc checkmark xanh nếu quy trình bị gián đoạn."
      setSteps((prev) =>
        prev.map((s) => {
          if (s.status === 'completed') {
            return s; // keep truly completed steps
          }
          return {
            ...s,
            status: 'failed',
            message: 'Đã dừng do lỗi'
          };
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExamTitle(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setExamText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleToggleSelectWord = (id: string) => {
    const next = new Set(selectedWordIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedWordIds(next);
  };

  const handleSelectAll = () => {
    if (selectedWordIds.size === extractedList.length) {
      setSelectedWordIds(new Set());
    } else {
      setSelectedWordIds(new Set(extractedList.map((i) => i.id)));
    }
  };

  const getSelectedItems = () => {
    return extractedList.filter((item) => selectedWordIds.has(item.id));
  };

  const handleAddSelectedToNotebook = () => {
    const selected = getSelectedItems();
    if (selected.length === 0) return;
    onAddVocabBatch(selected);
  };

  const getTypeBadge = (type: VocabCategory) => {
    switch (type) {
      case 'Collocation':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Phrasal verb':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Idiom':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Preposition':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Single word':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Calculate actual completion percentage according to Rule 3
  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const hasFailed = steps.some((s) => s.status === 'failed');
  const progressPercent = isLoading
    ? Math.max(15, completedCount * 33)
    : completedCount === 3
    ? 100
    : hasFailed
    ? Math.max(10, completedCount * 33)
    : 0;

  return (
    <div className="space-y-8">
      {/* Banner / Section Title */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Nhiệm vụ 1: Phân tích & Trích xuất Ngữ liệu Đề thi
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Exam Corpus Vocabulary Extractor
          </h1>
          <p className="mt-2 text-indigo-100 text-sm sm:text-base leading-relaxed">
            Hệ thống áp dụng ngôn ngữ học ngữ liệu (Corpus Linguistics) bóc tách 5 thành phần ngôn ngữ: Single words (B1-C1), Phrasal verbs, Collocations, Idioms và Prepositions kèm IPA Cambridge/Oxford và bẫy đề thi THPT.
          </p>
        </div>
      </div>

      {/* RULE 1 & 3: Multi-Step Visual Pipeline & Fallback Monitor */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 text-indigo-600 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Tiến trình Xử lý Ngữ liệu & Giám sát Fallback</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cơ chế tự động chuyển đổi giữa các model: <code>gemini-3-flash-preview</code> &rarr; <code>gemini-3-pro-preview</code> &rarr; <code>gemini-2.5-flash</code>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Model hiện hành:</span>
              <strong className="text-slate-800 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded-md">
                {currentRunningModel}
              </strong>
            </span>
            <button
              type="button"
              onClick={onOpenApiKeyModal}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline ml-1 cursor-pointer"
            >
              Đổi key/model
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar (Rule 3: only green when truly completed) */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              hasFailed
                ? 'bg-rose-500'
                : progressPercent === 100
                ? 'bg-emerald-500'
                : 'bg-indigo-600'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Columns (Rule 3: Show "Đã dừng do lỗi" on failure, NEVER checkmark) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {steps.map((st) => {
            const isCompleted = st.status === 'completed';
            const isRunning = st.status === 'running';
            const isFailed = st.status === 'failed';

            return (
              <div
                key={st.step}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : isRunning
                    ? 'border-indigo-300 bg-indigo-50/50 ring-1 ring-indigo-400'
                    : isFailed
                    ? 'border-rose-300 bg-rose-50/70 ring-1 ring-rose-400'
                    : 'border-slate-200 bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-800">
                    {st.title}
                  </span>

                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Hoàn tất</span>
                    </span>
                  )}

                  {isRunning && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      <Loader2 className="w-3 h-3 animate-spin text-indigo-600" />
                      <span>Đang xử lý</span>
                    </span>
                  )}

                  {isFailed && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                      <XCircle className="w-3 h-3 text-rose-600" />
                      <span>Đã dừng do lỗi</span>
                    </span>
                  )}

                  {st.status === 'idle' && (
                    <span className="text-[10px] font-semibold text-slate-400">
                      Chờ thực hiện
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 leading-snug">
                  {st.desc}
                </p>

                {st.message && (
                  <p
                    className={`text-[10px] font-medium mt-1.5 pt-1 border-t ${
                      isFailed
                        ? 'border-rose-200 text-rose-700 font-bold'
                        : isCompleted
                        ? 'border-emerald-200 text-emerald-700'
                        : 'border-indigo-200 text-indigo-700'
                    }`}
                  >
                    {st.message}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Fallback Notice Banner */}
        {fallbackNotice && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium flex items-start gap-2 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Kích hoạt Fallback Model Dự phòng:</p>
              <p className="mt-0.5">{fallbackNotice}</p>
            </div>
          </div>
        )}

        {/* Red Error Banner with Verbatim API Error Message (Rule 3) */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs font-medium flex items-start gap-3 animate-in fade-in">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <strong className="text-rose-900 text-sm">
                  Lỗi xử lý từ Gemini API:
                </strong>
                <button
                  type="button"
                  onClick={onOpenApiKeyModal}
                  className="px-2.5 py-1 bg-white hover:bg-rose-100 rounded-md border border-rose-300 text-rose-700 font-bold text-[11px] cursor-pointer"
                >
                  Đổi API Key / Model
                </button>
              </div>
              <p className="font-mono bg-white/80 p-2.5 rounded-lg border border-rose-200 text-rose-800 break-all leading-relaxed">
                {errorMsg}
              </p>
              <p className="text-[11px] text-rose-700">
                Toàn bộ quy trình đã tự động dừng lại để bảo toàn dữ liệu. Bạn có thể nhấn <strong>"Cài đặt (API Key)"</strong> để kiểm tra lại key hoặc thử với key khác.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Text & Config */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>Nguồn Ngữ liệu Đề thi</span>
            </h3>

            {/* Upload or Load Sample */}
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-all">
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Tải tệp đề thi (.txt)</span>
                <input
                  type="file"
                  accept=".txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Quick Preset Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Chọn đề thi mẫu chuẩn Bộ GD&ĐT:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_EXAMS.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedSampleId === sample.id
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-700">
                      {sample.year}
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-600">
                      {sample.tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {sample.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {sample.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tiêu đề đề thi / Mã đề / Nguồn trích dẫn:
            </label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              placeholder="VD: Đề thi THPT Quốc Gia 2024 - Mã đề 401..."
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* Text Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Văn bản bài thi / Bài đọc hiểu / Đoạn văn cần bóc tách từ vựng:
              </label>
              <span className="text-xs text-slate-400">
                {examText.length} ký tự
              </span>
            </div>
            <textarea
              rows={8}
              value={examText}
              onChange={(e) => setExamText(e.target.value)}
              placeholder="Dán nội dung đoạn văn, bài đọc hoặc các câu hỏi trong đề thi tiếng Anh tại đây..."
              className="w-full p-3.5 text-sm font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden leading-relaxed"
            />
          </div>

          {/* Category Filter Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span>Nhóm ngôn ngữ ưu tiên trích xuất (EVM 5 Categories):</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  'Collocation',
                  'Phrasal verb',
                  'Idiom',
                  'Preposition',
                  'Single word'
                ] as VocabCategory[]
              ).map((cat) => {
                const isChecked = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleToggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isChecked
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {isChecked && <CheckCircle className="w-3.5 h-3.5" />}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Trigger */}
          <button
            type="button"
            disabled={isLoading || !examText.trim()}
            onClick={handleRunAiExtraction}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI đang phân tích ngữ liệu & trích xuất câu gốc...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Phân tích & Trích xuất Từ vựng Ngay ({currentRunningModel})</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Architectural Rules & Summary */}
        <div className="lg:col-span-5 space-y-4">
          {/* AI Pedagogical Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Đánh giá Ngữ liệu Đề thi (Corpus Insight)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {aiSummary}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Độ dài ngữ liệu: ~{examText.split(/\s+/).length} từ</span>
              <span className="text-emerald-400 font-semibold">
                Đã nhận diện: {extractedList.length} mục từ
              </span>
            </div>
          </div>

          {/* EVM Standard Guidelines Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Quy chuẩn Dữ liệu Trích xuất (EVM Standards)
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <div>
                  <strong className="text-slate-800">IPA chuẩn Cambridge/Oxford:</strong> Phiên âm chính xác cả trọng âm, nguyên âm đôi.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <div>
                  <strong className="text-slate-800">Nghĩa tiếng Việt sát ngữ cảnh:</strong> Dịch đúng nghĩa sử dụng trong bài thi, không liệt kê nghĩa tràn lan.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  3
                </span>
                <div>
                  <strong className="text-slate-800">Contextual Example:</strong> Bắt buộc trích dẫn nguyên văn câu chứa từ trong đề thi, in đậm từ mục tiêu.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  4
                </span>
                <div>
                  <strong className="text-slate-800">Mẹo thi THPT (Exam Tip):</strong> Nhắc nhở bẫy đề thi, từ đồng nghĩa hoặc giới từ đi kèm hay nhầm lẫn.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Batch Actions Box */}
          <div className="bg-indigo-50/80 rounded-2xl p-5 border border-indigo-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">
                Đã chọn: {selectedWordIds.size} / {extractedList.length} từ
              </span>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs text-indigo-700 hover:text-indigo-900 font-semibold underline cursor-pointer"
              >
                {selectedWordIds.size === extractedList.length
                  ? 'Bỏ chọn tất cả'
                  : 'Chọn tất cả'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                disabled={selectedWordIds.size === 0}
                onClick={handleAddSelectedToNotebook}
                className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>Lưu vào Sổ tay ({selectedWordIds.size})</span>
              </button>

              <button
                type="button"
                disabled={selectedWordIds.size === 0}
                onClick={() => onOpenFlashcardsWithWords(getSelectedItems())}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Xem Flashcards</span>
              </button>
            </div>

            <button
              type="button"
              disabled={selectedWordIds.size === 0}
              onClick={() => onGenerateQuizWithWords(getSelectedItems())}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Tạo đề trắc nghiệm AI Quiz từ nhóm này</span>
            </button>
          </div>
        </div>
      </div>

      {/* Extracted Results Table (Cấu trúc 1: Kết quả phân tích đề thi) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-900 text-base">
                Cấu trúc 1: Bảng Kết quả Phân tích Đề thi (Vocabulary Extraction)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                {extractedList.length} mục từ
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dữ liệu được chuẩn hóa và gắn thẻ theo quy tắc ngôn ngữ học ứng dụng EVM
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSelectAll}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              {selectedWordIds.size === extractedList.length
                ? 'Bỏ chọn'
                : 'Chọn tất cả'}
            </button>
            <button
              type="button"
              disabled={selectedWordIds.size === 0}
              onClick={handleAddSelectedToNotebook}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold disabled:opacity-40 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Lưu {selectedWordIds.size} mục từ</span>
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      extractedList.length > 0 &&
                      selectedWordIds.size === extractedList.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </th>
                <th className="p-3.5 w-32">Loại (Type)</th>
                <th className="p-3.5 w-52">Từ/Cụm từ (Term & IPA)</th>
                <th className="p-3.5 w-52">Nghĩa tiếng Việt</th>
                <th className="p-3.5 min-w-[280px]">Ngữ cảnh trong đề (Context)</th>
                <th className="p-3.5 w-60">Mẹo thi THPT (Exam Tip)</th>
                <th className="p-3.5 w-20 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {extractedList.map((item) => {
                const isSelected = selectedWordIds.has(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-indigo-50/40 transition-colors ${
                      isSelected ? 'bg-indigo-50/20' : ''
                    }`}
                  >
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectWord(item.id)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </td>

                    {/* Category Type */}
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${getTypeBadge(
                          item.type
                        )}`}
                      >
                        {item.type}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-mono mt-1">
                        CEFR: <strong>{item.cefrLevel}</strong>
                      </span>
                    </td>

                    {/* Term & IPA & Audio */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <strong
                          className="text-slate-900 text-sm font-extrabold hover:text-indigo-600 cursor-pointer"
                          onClick={() => onInspectWord(item)}
                        >
                          {item.term}
                        </strong>
                        <button
                          type="button"
                          onClick={() => speakEnglish(item.term, accent)}
                          title={`Nghe phát âm (${accent})`}
                          className="p-1 rounded-md hover:bg-slate-200 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-slate-500 font-mono text-xs block mt-0.5">
                        {item.ipa}
                      </span>
                    </td>

                    {/* Vietnamese Meaning */}
                    <td className="p-3.5 text-slate-800 font-medium">
                      {item.meaning}
                    </td>

                    {/* Context in exam */}
                    <td className="p-3.5 text-slate-600 leading-relaxed italic bg-slate-50/40 rounded-lg">
                      {item.context.replace(/\*\*/g, '')}
                    </td>

                    {/* Pedagogical Exam Tip */}
                    <td className="p-3.5 text-slate-600">
                      {item.examTip ? (
                        <span className="text-[11px] text-amber-800 bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200/70 block leading-normal">
                          💡 {item.examTip}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">-</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => onInspectWord(item)}
                        title="Xem mở rộng word family & bẫy đề"
                        className="px-2 py-1 rounded-md bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-800 font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Mở rộng</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
