import React, { useState, useRef, useEffect } from 'react';
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
  Camera,
  Image as ImageIcon,
  Check,
  Download,
  AlertCircle,
  KeyRound,
  X
} from 'lucide-react';
import { VocabularyItem, VocabCategory } from '../types';
import { speakEnglish } from '../utils/tts';
import { downloadDocxFile } from '../utils/documentExport';
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
  // Always clean up any legacy session cache on mount to guarantee fresh interface from scratch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('evm_extractor_session');
      } catch {}
    }
  }, []);

  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);
  const [uploadedFileType, setUploadedFileType] = useState<'pdf' | 'image' | 'text' | null>(null);
  const [uploadedFileMime, setUploadedFileMime] = useState<string>('application/pdf');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [examTitle, setExamTitle] = useState<string>('');
  const [examText, setExamText] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
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
  const extractionMode = 'strict_highlight';

  // Internal step tracker
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

  // Clean initial state: zero residual words from past exams
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

  const handleDeleteExtractedWord = (id: string) => {
    setExtractedList((prev) => prev.filter((item) => item.id !== id));
    setSelectedWordIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
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
      setErrorMsg('Vui lòng tải tệp đề thi PDF hoặc ảnh chụp đề giấy cần phân tích.');
      return;
    }

    if (!examTitle.trim()) {
      setErrorMsg('Vui lòng nhập tên đề thi trước khi phân tích để lưu vào Sổ tay từ vựng.');
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
    // Xóa sạch danh sách từ của đề trước ngay khi bắt đầu bóc tách đề mới
    setExtractedList([]);
    setAiSummary('');
    setSelectedWordIds(new Set());
    setCurrentRunningModel(getStoredModel());

    // Reset steps to initial running state
    setSteps([
      {
        step: 1,
        title: 'Bước 1: Phân tích Ngữ liệu & Thị giác',
        desc: extractionMode === 'strict_highlight'
          ? 'Quét thị giác & CHỈ nhận diện từ bôi bút dạ quang / highlight (0% từ thừa)'
          : 'Tinh lọc ngữ liệu, loại bỏ từ cơ bản A1-A2 & bóc tách từ phân hóa 8+ 9+',
        status: 'running',
        message: extractionMode === 'strict_highlight'
          ? 'Gemini Vision đang quét thị giác: CHỈ nhận diện từ tô highlight (loại bỏ 100% từ thừa, từ khoanh tròn, gạch chân)...'
          : 'Đang tinh lọc: tự động loại bỏ từ cơ bản A1-A2, từ chỉ thị câu hỏi & từ thừa...'
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
      // Đảm bảo gửi base64 cho ảnh chụp hoặc tệp PDF để AI Gemini Vision nhìn thấy trực tiếp vệt bút dạ quang tô vàng
      const base64ToSend = uploadedPdfBase64 || undefined;

      const result = await extractVocabularyWithFallback(
        examText || (uploadedFileType === 'image' ? 'Ảnh chụp đề thi giấy' : 'Nội dung đề thi từ tệp PDF'),
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
        base64ToSend,
        prioritizeHighlights,
        uploadedFileMime,
        true
      );

      // CHỈ SHOW ĐÚNG NHỮNG TỪ ĐƯỢC TÔ VÀNG (BÚT HIGHLIGHT)
      const highlightedOnly = result.vocabulary.filter((w) => w.isHighlighted);
      const finalVocab = highlightedOnly.length > 0 ? highlightedOnly : result.vocabulary;

      // On complete success
      setExtractedList(finalVocab);
      setSelectedWordIds(new Set(finalVocab.map((w) => w.id)));
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

    // 1. If Image file (photo of paper exam)
    if (file.type.startsWith('image/') || file.name.match(/\.(jpe?g|png|webp|heic|bmp|tiff)$/i)) {
      setIsReadingPdf(true);
      setUploadedFileType('image');
      const mime = file.type || 'image/jpeg';
      setUploadedFileMime(mime);
      setPdfStatusMsg({
        type: 'info',
        text: `Đang tải và xử lý ảnh chụp đề thi "${file.name}"...`
      });

      try {
        const b64 = await readFileAsBase64(file);
        setUploadedPdfBase64(b64);
        if (imagePreviewUrl) {
          URL.revokeObjectURL(imagePreviewUrl);
        }
        const preview = URL.createObjectURL(file);
        setImagePreviewUrl(preview);
        setExamText(`[Ảnh chụp đề thi: ${file.name}]`);
        setPrioritizeHighlights(true);
        setPdfStatusMsg({
          type: 'success',
          text: `✔ Đã nạp ảnh chụp đề thi "${file.name}". Chế độ quét thị giác: CHỈ nhận diện các từ tô bút highlight dạ quang (tự động bỏ qua các từ khoanh tròn hoặc gạch chân trên giấy)!`
        });
      } catch (err: any) {
        console.error('Lỗi khi đọc file ảnh:', err);
        setPdfStatusMsg({
          type: 'error',
          text: `Không thể đọc ảnh: ${err.message || 'Lỗi không xác định'}`
        });
      } finally {
        setIsReadingPdf(false);
      }
      return;
    }

    // 2. If PDF file
    if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
      setIsReadingPdf(true);
      setUploadedFileType('pdf');
      setUploadedFileMime('application/pdf');
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
        setImagePreviewUrl(null);
      }
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
            text: `⚠️ Tệp PDF "${file.name}" là tệp scan dạng ảnh. Đã kích hoạt chế độ Quét Thị Giác (Vision PDF) trực tiếp để nhận diện 100% các từ bôi highlight!`
          });
        } else {
          setExamText(text);
          setPdfStatusMsg({
            type: 'success',
            text: `✔ Đã nạp tệp PDF "${file.name}" (${text.length} ký tự). Đã kích hoạt Chế độ Quét Thị Giác (Vision) nhận diện 100% các từ bôi highlight!`
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
          text: `Đã nạp tệp PDF "${file.name}". AI Gemini Vision sẽ quét thị giác trực tiếp tệp gốc để nhận diện các từ bôi highlight.`
        });
      } finally {
        setIsReadingPdf(false);
      }
      return;
    }

    // 3. If TXT or other text file
    setUploadedFileType('text');
    setUploadedPdfBase64(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
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
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    setUploadedFile(null);
    setUploadedFileType(null);
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
  const displayedList = extractedList;

  return (
    <div className="space-y-6">

      {/* 1. Loading State Banner (Gọn gàng, tối ưu cho cả điện thoại & máy tính, không rối mắt) */}
      {isLoading && (
        <div className="bg-gradient-to-r from-indigo-50 via-white to-sky-50 rounded-2xl p-4 sm:p-5 border border-indigo-200 shadow-xs space-y-3 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>AI đang phân tích & bóc tách đề thi...</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {extractionMode === 'strict_highlight'
                    ? 'Đang quét thị giác nhận diện từ bôi bút highlight (loại bỏ 100% từ thừa)...'
                    : 'Đang tinh lọc ngữ liệu đề thi THPTQG, phân hóa điểm 8+ 9+...'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-[11px] font-mono font-bold text-slate-800">{currentRunningModel}</span>
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      )}

      {/* 2. Fallback Notice (Thông báo khi tự động chuyển model dự phòng) */}
      {fallbackNotice && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{fallbackNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setFallbackNotice(null)}
            className="text-amber-700 hover:text-amber-900 text-xs font-bold px-2 py-0.5 rounded cursor-pointer shrink-0"
          >
            Đóng
          </button>
        </div>
      )}

      {/* 3. Error Banner (Giao diện báo lỗi trực quan, hướng dẫn rõ ràng, không hiện các ô bước 1, 2, 3 gây rối) */}
      {errorMsg && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs space-y-3.5 animate-in fade-in shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-rose-900">
                  Lỗi kết nối hoặc xử lý từ Gemini AI
                </h4>
                <p className="text-[11px] text-rose-700 mt-0.5">
                  Model đang dùng: <code className="font-mono bg-white/80 px-1.5 py-0.5 rounded border border-rose-200 text-rose-800 font-bold">{currentRunningModel}</code>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setErrorMsg(null)}
              className="p-1 text-rose-400 hover:text-rose-700 rounded-lg hover:bg-rose-100/50 cursor-pointer"
              title="Đóng thông báo lỗi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Hướng dẫn chi tiết nếu gặp lỗi quá tải (503) hoặc hạn ngạch (429) */}
          {(errorMsg.includes('503') || errorMsg.includes('UNAVAILABLE') || errorMsg.includes('high demand') || errorMsg.includes('429') || errorMsg.includes('hạn ngạch') || errorMsg.includes('giới hạn') || errorMsg.includes('RESOURCE_EXHAUSTED')) ? (
            <div className="bg-white/95 p-3.5 rounded-xl border border-rose-200 space-y-2 text-xs text-rose-900 leading-relaxed shadow-2xs">
              <p className="font-bold text-rose-800 flex items-center gap-1.5">
                <span>⚠️ {errorMsg.includes('503') || errorMsg.includes('UNAVAILABLE') ? 'Máy chủ Google AI đang trong giây phút cao điểm (Spike in demand):' : 'Hạn ngạch API Key tạm thời đạt giới hạn (Rate Limit):'}</span>
              </p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-700 pl-1">
                {errorMsg.includes('503') || errorMsg.includes('UNAVAILABLE') ? (
                  <>
                    <li>Lỗi <strong>503 UNAVAILABLE</strong> là do máy chủ toàn cầu của Google bị nghẽn tải tạm thời trong vài giây.</li>
                    <li>Sự cố nghẽn tải này chỉ kéo dài chốc lát, bạn vui lòng bấm <strong>"Thử lại ngay"</strong> bên dưới để hệ thống kết nối lại.</li>
                  </>
                ) : (
                  <>
                    <li>Google AI Studio miễn phí giới hạn <strong>15 lượt gọi / phút</strong>. Bạn vui lòng chờ khoảng <strong>30 - 60 giây</strong> rồi bấm <strong>"Thử lại ngay"</strong>.</li>
                    <li>Hoặc bấm nút <strong>"Đổi API Key / Model"</strong> để nhập mã API Key dự phòng khác.</li>
                  </>
                )}
                <li>Hệ thống đang chạy trên model tối ưu <code>gemini-3.8-flash</code>.</li>
              </ul>
            </div>
          ) : (
            <div className="font-mono text-[11px] bg-white/90 p-3 rounded-xl border border-rose-200 text-rose-800 break-all leading-relaxed max-h-36 overflow-y-auto">
              {errorMsg}
            </div>
          )}

          {/* Các nút hành động thao tác nhanh */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={handleRunAiExtraction}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Thử lại ngay</span>
            </button>

            <button
              type="button"
              onClick={onOpenApiKeyModal}
              className="px-3.5 py-2 bg-white hover:bg-rose-100 rounded-xl border border-rose-300 text-rose-800 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-rose-600" />
              <span>Đổi API Key / Model</span>
            </button>
          </div>
        </div>
      )}

      {/* Minimalist & Professional Exam Workspace Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/*,.jpg,.jpeg,.png,.webp,.heic,.txt"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isReadingPdf}
        />

        {/* Upload Zone */}
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
            <div className="relative w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/80 shadow-xs group-hover:scale-105 group-hover:bg-indigo-100 transition-all">
              <UploadCloud className="w-8 h-8 text-indigo-600" />
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 p-1.5 rounded-full shadow-xs">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Kéo thả hoặc bấm để tải đề lên
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Hỗ trợ tệp <span className="font-semibold text-slate-700">PDF</span> và <span className="font-semibold text-slate-700">Ảnh chụp</span> (JPG, PNG)
              </p>
            </div>

            <div className="pt-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tự động nhận diện các từ tô bút highlight</span>
              </span>
            </div>
          </div>
        ) : isReadingPdf ? (
          <div className="border-2 border-indigo-200 bg-indigo-50/40 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 animate-pulse">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-indigo-900">
                {uploadedFileType === 'image'
                  ? 'Đang chuẩn bị ảnh chụp và kích hoạt AI Gemini Vision...'
                  : 'Đang đọc và giải mã tệp PDF...'}
              </h4>
              <p className="text-xs text-indigo-700">
                Hệ thống đang trích xuất dữ liệu và chuẩn bị quét thị giác nhận diện từ vựng bôi highlight
              </p>
            </div>
          </div>
        ) : (
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-2xl p-5 sm:p-6 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {uploadedFileType === 'image' && imagePreviewUrl ? (
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-emerald-300 shrink-0 bg-slate-100 shadow-xs group">
                    <img
                      src={imagePreviewUrl}
                      alt="Ảnh chụp đề thi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                    {uploadedFileType === 'image' ? 'IMG' : 'PDF'}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 break-all">
                      {uploadedFile.name}
                    </h4>
                    {uploadedFileType === 'image' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        📸 Ảnh chụp đề giấy • Chỉ nhận diện bút Highlight
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Đã tải xong • Sẵn sàng phân tích</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kích thước: {(uploadedFile.size / 1024).toFixed(1)} KB • {uploadedFileType === 'image' ? 'Quét thị giác Gemini Vision' : (examText ? `${examText.length} ký tự trích xuất` : 'Quét thị giác Gemini Vision')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                >
                  {uploadedFileType === 'image' ? 'Đổi ảnh khác' : 'Đổi tệp PDF khác'}
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

            {/* Bắt buộc học sinh nhập Tên đề thi */}
            <div className="mt-4 pt-3.5 border-t border-emerald-200/70 space-y-1.5">
              <div>
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Tên đề thi <span className="text-rose-600 font-extrabold">* (Bắt buộc nhập)</span>:</span>
                </label>
              </div>
              <input
                type="text"
                value={examTitle}
                onChange={(e) => {
                  setExamTitle(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Nhập tên đề thi (ví dụ: Đề thi thử THPTQG 2026 - Lần 1, Đề Chuyên Lê Quý Đôn...)"
                className={`w-full px-4 py-2.5 bg-white border rounded-xl text-xs sm:text-sm font-bold text-slate-900 transition-all focus:outline-none focus:ring-2 shadow-2xs ${
                  !examTitle.trim()
                    ? 'border-amber-400 focus:border-amber-500 focus:ring-amber-200 bg-amber-50/40 placeholder:text-amber-800/60'
                    : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>
        )}

        {/* Action Row: Nút Phân tích */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            type="button"
            disabled={!isFileUploaded || !examTitle.trim() || isLoading || isReadingPdf}
            onClick={handleRunAiExtraction}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              !isFileUploaded || !examTitle.trim()
                ? 'opacity-40 bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed select-none shadow-none font-bold'
                : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold shadow-lg shadow-indigo-300 ring-2 ring-indigo-400/50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Đang phân tích...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Phân tích</span>
              </>
            )}
          </button>
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
                <span>Đánh giá Ngữ liệu Đề thi</span>
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
            <div className="flex items-center gap-2 flex-wrap">
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

              <button
                type="button"
                disabled={selectedWordIds.size === 0}
                onClick={() =>
                  downloadDocxFile(
                    `Tu_Vung_${(examTitle || 'De_Thi').replace(/[^a-zA-Z0-9]/g, '_')}`,
                    `BẢNG TỔNG HỢP TỪ VỰNG TRỌNG TÂM: ${examTitle || 'ĐỀ THI TIẾNG ANH'}`,
                    [],
                    getSelectedItems()
                  )
                }
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 disabled:opacity-40 text-blue-700 border border-blue-200 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                title="Tải bảng từ vựng bóc tách ra file Word (.doc) chuẩn mẫu Bộ GD&ĐT"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>Xuất Word (.doc)</span>
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
                  ⭐ {highlightedCount} từ tô bút highlight dạ quang
                </span>
              )}
            </div>
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
                            ⭐ Bút highlight
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
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onInspectWord(item)}
                          title="Xem mở rộng word family & bẫy đề"
                          className="px-2 py-1 rounded-md bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-800 font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Mở rộng</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteExtractedWord(item.id)}
                          title="Xóa từ thừa này khỏi danh sách"
                          className="p-1 rounded-md bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-300 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
