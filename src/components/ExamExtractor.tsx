import React, { useState, useRef } from 'react';
import {
  Sparkles,
  FileText,
  UploadCloud,
  CheckCircle,
  Volume2,
  BookmarkPlus,
  Layers,
  HelpCircle,
  ExternalLink,
  Loader2,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { VocabularyItem, VocabCategory } from '../types';
import { speakEnglish } from '../utils/tts';
import {
  extractVocabularyWithFallback,
  getStoredApiKey,
  getStoredModel
} from '../services/geminiService';

interface ExamExtractorProps {
  onAddVocabBatch: (items: VocabularyItem[]) => void;
  onOpenFlashcardsWithWords: (items: VocabularyItem[], examTitle?: string) => void;
  onGenerateQuizWithWords: (items: VocabularyItem[], examTitle?: string) => void;
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
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);
  const [examTitle, setExamTitle] = useState<string>('');
  const [examText, setExamText] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showManualInput, setShowManualInput] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [isReadingPdf, setIsReadingPdf] = useState<boolean>(false);
  const [pdfStatusMsg, setPdfStatusMsg] = useState<{
    type: 'info' | 'success' | 'warning' | 'error';
    text: string;
  } | null>(null);
  const [uploadedPdfBase64, setUploadedPdfBase64] = useState<string | null>(null);
  const [prioritizeHighlights, setPrioritizeHighlights] = useState<boolean>(true);
  const [filterOnlyHighlighted, setFilterOnlyHighlighted] = useState<boolean>(false);

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

  // Clean initial state: no sample vocabulary loaded
  const [extractedList, setExtractedList] = useState<VocabularyItem[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [selectedWordIds, setSelectedWordIds] = useState<Set<string>>(new Set());

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

  const isFileUploaded = Boolean(uploadedFile || uploadedPdfBase64 || examText.trim());

  const handleRunAiExtraction = async () => {
    if (!isFileUploaded) {
      setErrorMsg('Vui lòng tải tệp đề thi PDF cần phân tích.');
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
        examText || 'Nội dung đề thi từ tệp PDF',
        examTitle || uploadedFile?.name || 'Đề thi trích dẫn',
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
        },
        uploadedPdfBase64 || undefined,
        prioritizeHighlights
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

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result as string;
        const b64 = res.includes(',') ? res.split(',')[1] : res;
        resolve(b64);
      };
      reader.onerror = () => reject(new Error('Không thể đọc file base64.'));
      reader.readAsDataURL(file);
    });
  };

  const extractTextFromPdf = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) {
      throw new Error('Thư viện xử lý PDF chưa sẵn sàng trên trình duyệt. Vui lòng thử lại sau vài giây hoặc kiểm tra kết nối mạng.');
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';
    const highlightAnnotations: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');

      // Also scan annotations for yellow highlights if available
      try {
        const annotations = await page.getAnnotations();
        for (const annot of annotations) {
          if (annot.subtype === 'Highlight' || annot.type === 'Highlight') {
            if (annot.contents && typeof annot.contents === 'string' && annot.contents.trim()) {
              highlightAnnotations.push(annot.contents.trim());
            }
          }
        }
      } catch (e) {
        // Annotation scanning is non-blocking
      }

      if (pageText.trim()) {
        fullText += (fullText ? '\n\n' : '') + `=== Trang ${i} ===\n` + pageText;
      }
    }

    if (highlightAnnotations.length > 0) {
      fullText += `\n\n=== DANH SÁCH TỪ ĐƯỢC BÔI VÀNG (PDF HIGHLIGHTS) ===\n` +
        highlightAnnotations.map((item) => `- ${item}`).join('\n');
    }

    return fullText;
  };

  const processUploadedFile = async (file: File) => {
    const cleanTitle = file.name.replace(/\.[^/.]+$/, '');
    setExamTitle(cleanTitle);
    setUploadedFile({ name: file.name, size: file.size });
    setPdfStatusMsg(null);
    setErrorMsg(null);

    // If PDF file
    if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
      setIsReadingPdf(true);
      setPdfStatusMsg({
        type: 'info',
        text: `Đang giải mã và đọc nội dung văn bản & thị giác từ tệp PDF "${file.name}"...`
      });

      try {
        // Load base64 for multimodal vision and extracted text in parallel
        const [b64, text] = await Promise.all([
          readFileAsBase64(file),
          extractTextFromPdf(file)
        ]);

        setUploadedPdfBase64(b64);
        setPrioritizeHighlights(true);

        if (!text.trim()) {
          setExamText(`[Tệp PDF Scan: ${file.name}]`);
          setPdfStatusMsg({
            type: 'warning',
            text: `⚠️ Tệp PDF "${file.name}" là tệp scan dạng ảnh. Đã kích hoạt chế độ Quét Thị Giác (Vision PDF) trực tiếp để nhận diện 100% các từ bôi vàng!`
          });
        } else {
          setExamText(text);
          setPdfStatusMsg({
            type: 'success',
            text: `✔ Đã nạp tệp PDF "${file.name}" (${text.length} ký tự). Đã kích hoạt Chế độ Quét Thị Giác (Vision) nhận diện 100% các từ bôi vàng!`
          });
        }
      } catch (err: any) {
        console.error('Lỗi khi đọc file PDF:', err);
        // Try fallback to just base64 so Gemini Vision can still read it
        try {
          const b64 = await readFileAsBase64(file);
          setUploadedPdfBase64(b64);
          setExamText(`[Tệp PDF: ${file.name}]`);
          setPrioritizeHighlights(true);
        } catch {}
        setPdfStatusMsg({
          type: 'info',
          text: `Đã nạp tệp PDF "${file.name}". AI Gemini Vision sẽ quét thị giác trực tiếp tệp gốc để nhận diện các từ bôi vàng.`
        });
      } finally {
        setIsReadingPdf(false);
      }
      return;
    }

    // If TXT or other text file
    setUploadedPdfBase64(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setExamText(content);
        setPdfStatusMsg({
          type: 'success',
          text: `✔ Đã tải tệp "${file.name}" (${content.length} ký tự).`
        });
      }
    };
    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleRemoveUploadedFile = () => {
    setUploadedFile(null);
    setUploadedPdfBase64(null);
    setExamText('');
    setExamTitle('');
    setPdfStatusMsg(null);
    setErrorMsg(null);
    setFallbackNotice(null);
    setExtractedList([]);
    setSelectedWordIds(new Set());
    setAiSummary('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
    const selected = getSelectedItems().map((item) => ({
      ...item,
      sourceExam: item.sourceExam?.trim() || examTitle || 'Đề thi trích dẫn'
    }));
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

  const renderContextWithHighlight = (context: string, isHighlighted?: boolean) => {
    if (!context) return null;
    if (!context.includes('**')) {
      return <span>{context}</span>;
    }
    const parts = context.split(/(\*\*.*?\*\*)/g);
    return (
      <span>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2);
            return (
              <span
                key={i}
                className={
                  isHighlighted
                    ? 'bg-amber-300 text-amber-950 font-bold px-1.5 py-0.5 rounded border border-amber-400'
                    : 'font-bold text-indigo-900 underline'
                }
              >
                {inner}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  };

  const highlightedCount = extractedList.filter((item) => item.isHighlighted).length;
  const displayedList = filterOnlyHighlighted
    ? extractedList.filter((item) => item.isHighlighted)
    : extractedList;

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
    <div className="space-y-6">
      {/* Sleek, Modern Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Phân tích & Trích xuất Từ vựng Đề thi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tải lên tệp đề thi PDF của bạn để AI tự động trích xuất Collocations, Idioms, Phrasal verbs & từ vựng bôi vàng.
          </p>
        </div>
      </div>

      {/* RULE 1 & 3: Multi-Step Visual Pipeline & Fallback Monitor (Shown when running, failed, completed, or notice) */}
      {(isLoading || hasFailed || completedCount > 0 || errorMsg || fallbackNotice) && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 text-indigo-600 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Tiến trình Xử lý Ngữ liệu & Giám sát Fallback</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cơ chế tự động chuyển đổi giữa các model: <code>gemini-3.8-flash</code> &rarr; <code>gemini-2.5-flash</code> &rarr; <code>gemini-1.5-flash</code>
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
    )}

      {/* Minimalist & Professional PDF Exam Workspace Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isReadingPdf}
        />

        {/* Upload Zone ("Tải đề thi PDF") */}
        {!uploadedFile ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3.5 group select-none ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50/60 scale-[1.01]'
                : 'border-slate-300 hover:border-indigo-500 bg-slate-50/60 hover:bg-indigo-50/30'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/80 shadow-xs group-hover:scale-105 group-hover:bg-indigo-100 transition-all">
              <UploadCloud className="w-8 h-8 text-indigo-600" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                Tải đề thi PDF
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Kéo thả tệp đề thi <span className="font-bold text-indigo-600">.PDF</span> vào đây hoặc bấm để chọn tệp từ máy tính
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium mt-1">
              <span>Hỗ trợ tệp .PDF • Tự động quét thị giác & nhận diện 100% từ bôi vàng</span>
            </div>
          </div>
        ) : isReadingPdf ? (
          <div className="border-2 border-indigo-200 bg-indigo-50/40 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 animate-pulse">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-indigo-900">
                Đang đọc và giải mã tệp PDF...
              </h4>
              <p className="text-xs text-indigo-700">
                Hệ thống đang trích xuất nội dung văn bản và chuẩn bị quét thị giác các trang đề thi
              </p>
            </div>
          </div>
        ) : (
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-2xl p-5 sm:p-6 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                  PDF
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 break-all">
                      {uploadedFile.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Đã tải xong • Sẵn sàng phân tích</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kích thước: {(uploadedFile.size / 1024).toFixed(1)} KB • {examText ? `${examText.length} ký tự trích xuất` : 'Quét thị giác Gemini Vision'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                >
                  Đổi tệp PDF khác
                </button>
                <button
                  type="button"
                  onClick={handleRemoveUploadedFile}
                  className="p-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-all cursor-pointer shadow-2xs"
                  title="Xóa tệp và đặt lại"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback / Status Alert for PDF */}
        {pdfStatusMsg && (
          <div
            className={`p-3 rounded-xl border text-xs font-medium flex items-start gap-2.5 animate-in fade-in ${
              pdfStatusMsg.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : pdfStatusMsg.type === 'warning'
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : pdfStatusMsg.type === 'error'
                ? 'bg-rose-50 border-rose-300 text-rose-800'
                : 'bg-indigo-50 border-indigo-300 text-indigo-800'
            }`}
          >
            {pdfStatusMsg.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
            {pdfStatusMsg.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
            {pdfStatusMsg.type === 'error' && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
            {pdfStatusMsg.type === 'info' && <Loader2 className="w-4 h-4 animate-spin text-indigo-600 shrink-0 mt-0.5" />}
            <div className="flex-1">{pdfStatusMsg.text}</div>
          </div>
        )}

        {/* Action Row: Highlight Option & Dynamic Analyze Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700 select-none bg-amber-50/80 hover:bg-amber-100/70 px-3 py-1.5 rounded-xl border border-amber-200/80 transition-colors">
              <input
                type="checkbox"
                checked={prioritizeHighlights}
                onChange={(e) => setPrioritizeHighlights(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span className="text-amber-950 font-bold text-[11px]">⭐ Ưu tiên bóc tách từ bôi vàng</span>
            </label>
          </div>

          {/* Analyze Button: Ban đầu hiện mờ, sau khi tải đề xong thì sáng lên */}
          <button
            type="button"
            disabled={!isFileUploaded || isLoading || isReadingPdf}
            onClick={handleRunAiExtraction}
            className={`w-full sm:w-auto px-7 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-300 ${
              !isFileUploaded
                ? 'opacity-40 bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed select-none shadow-none font-bold'
                : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black shadow-lg shadow-indigo-300 ring-2 ring-indigo-400/50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Đang phân tích đề thi...</span>
              </>
            ) : (
              <>
                <Sparkles className={`w-4 h-4 ${isFileUploaded ? 'text-amber-300 animate-pulse' : 'text-slate-400'}`} />
                <span>
                  {isFileUploaded ? 'Phân tích & Trích xuất Từ vựng ngay' : 'Phân tích (Vui lòng tải đề thi PDF trước)'}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Collapsible Manual Input (Clean & unobtrusive, collapsed by default) */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowManualInput(!showManualInput)}
            className="text-[11px] text-slate-400 hover:text-indigo-600 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showManualInput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{showManualInput ? 'Ẩn khung nhập thủ công' : 'Hoặc dán nội dung văn bản thủ công / đặt tiêu đề'}</span>
          </button>

          {showManualInput && (
            <div className="mt-3 space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in">
              <input
                type="text"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="Tiêu đề đề thi / Mã đề (tùy chọn)..."
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
              />
              <textarea
                rows={5}
                value={examText}
                onChange={(e) => setExamText(e.target.value)}
                placeholder="Dán nội dung đề thi tiếng Anh tại đây..."
                className="w-full p-3 text-xs font-mono border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {extractedList.length > 0 && (
        <div className="space-y-4">
          {/* Corpus Insight Summary Card */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Đánh giá Ngữ liệu Đề thi (Corpus Insight)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {aiSummary}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-300 shrink-0 border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-5">
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Độ dài ngữ liệu</div>
                <strong className="text-slate-100 font-bold">~{examText.split(/\s+/).filter(Boolean).length} từ</strong>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Đã bóc tách</div>
                <strong className="text-emerald-400 font-bold">{extractedList.length} mục từ</strong>
              </div>
            </div>
          </div>

          {/* Quick Batch Action Toolbar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                Đã chọn: <strong className="text-indigo-600">{selectedWordIds.size}</strong> / {extractedList.length} mục từ
              </span>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline cursor-pointer ml-1"
              >
                {selectedWordIds.size === extractedList.length
                  ? 'Bỏ chọn'
                  : 'Chọn tất cả'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={selectedWordIds.size === 0}
                onClick={handleAddSelectedToNotebook}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>Lưu vào Sổ tay ({selectedWordIds.size})</span>
              </button>

              <button
                type="button"
                disabled={selectedWordIds.size === 0}
                onClick={() => onOpenFlashcardsWithWords(getSelectedItems(), examTitle)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Xem Flashcards</span>
              </button>

              <button
                type="button"
                disabled={selectedWordIds.size === 0}
                onClick={() => onGenerateQuizWithWords(getSelectedItems(), examTitle)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Tạo đề AI Quiz</span>
              </button>
            </div>
          </div>

      {/* Extracted Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-slate-900 text-base">
                Danh sách Từ vựng Trích xuất
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                {extractedList.length} mục từ
              </span>
              {highlightedCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-300 text-amber-950 border border-amber-400 shadow-2xs">
                  ⭐ {highlightedCount} từ bôi vàng trong đề
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dữ liệu được chuẩn hóa và gắn thẻ theo quy tắc ngôn ngữ học ứng dụng EVM
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter buttons if any highlighted items exist */}
            {highlightedCount > 0 && (
              <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg mr-1">
                <button
                  type="button"
                  onClick={() => setFilterOnlyHighlighted(false)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    !filterOnlyHighlighted
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả ({extractedList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterOnlyHighlighted(true)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                    filterOnlyHighlighted
                      ? 'bg-amber-300 text-amber-950 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>⭐ Từ bôi vàng ({highlightedCount})</span>
                </button>
              </div>
            )}
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
                      displayedList.length > 0 &&
                      displayedList.every((item) => selectedWordIds.has(item.id))
                    }
                    onChange={() => {
                      if (displayedList.every((item) => selectedWordIds.has(item.id))) {
                        const next = new Set(selectedWordIds);
                        displayedList.forEach((item) => next.delete(item.id));
                        setSelectedWordIds(next);
                      } else {
                        const next = new Set(selectedWordIds);
                        displayedList.forEach((item) => next.add(item.id));
                        setSelectedWordIds(next);
                      }
                    }}
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
              {displayedList.map((item) => {
                const isSelected = selectedWordIds.has(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-indigo-50/40 transition-colors ${
                      isSelected ? 'bg-indigo-50/20' : ''
                    } ${item.isHighlighted ? 'bg-amber-50/20' : ''}`}
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
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.isHighlighted && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-300 text-amber-950 border border-amber-400 shadow-2xs">
                            ⭐ Bôi vàng
                          </span>
                        )}
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
                      {renderContextWithHighlight(item.context, item.isHighlighted)}
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
      )}
    </div>
  );
};
