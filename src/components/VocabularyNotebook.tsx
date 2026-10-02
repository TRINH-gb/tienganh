import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  Trash2,
  Volume2,
  ExternalLink,
  Layers,
  HelpCircle,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { VocabularyItem, VocabCategory, MasteryStatus, CefrLevel } from '../types';
import { speakEnglish } from '../utils/tts';
import { downloadDocxFile } from '../utils/documentExport';

interface VocabularyNotebookProps {
  vocabulary: VocabularyItem[];
  onUpdateStatus: (id: string, status: MasteryStatus) => void;
  onDeleteItem: (id: string) => void;
  onAddNewWord: (item: VocabularyItem) => void;
  onInspectWord: (word: VocabularyItem) => void;
  onStartFlashcards: (items: VocabularyItem[], examTitle?: string) => void;
  onStartQuiz: (items: VocabularyItem[], examTitle?: string) => void;
  accent: 'UK' | 'US';
  selectedExamFilter?: string;
  onSelectExamFilter?: (examTitle: string) => void;
}

export const VocabularyNotebook: React.FC<VocabularyNotebookProps> = ({
  vocabulary,
  onUpdateStatus,
  onDeleteItem,
  onAddNewWord,
  onInspectWord,
  onStartFlashcards,
  onStartQuiz,
  accent,
  selectedExamFilter = 'ALL',
  onSelectExamFilter
}) => {
  const [currentExamFilter, setCurrentExamFilter] = useState<string>(selectedExamFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<MasteryStatus | 'ALL'>('ALL');
  const [selectedCefr, setSelectedCefr] = useState<CefrLevel | 'ALL'>('ALL');

  // Synchronize internal filter with selectedExamFilter prop
  React.useEffect(() => {
    if (selectedExamFilter) {
      setCurrentExamFilter(selectedExamFilter);
    }
  }, [selectedExamFilter]);

  const handleExamChange = (exam: string) => {
    setCurrentExamFilter(exam);
    if (onSelectExamFilter) {
      onSelectExamFilter(exam);
    }
    setSelectedIds(new Set());
  };

  // Extract list of unique exams uploaded by user (zero machine suggestions)
  const examOptions = React.useMemo(() => {
    const map = new Map<string, number>();
    vocabulary.forEach((v) => {
      const examName = v.sourceExam?.trim();
      if (!examName) return;
      if (
        examName.includes('THPT 2024 (Mã đề 401)') ||
        examName.includes('Đề Tham Khảo Bộ GD&ĐT 2025') ||
        examName.includes('Chuyên đề 9+:')
      ) {
        return;
      }
      map.set(examName, (map.get(examName) || 0) + 1);
    });
    return Array.from(map.entries()).map(([exam, count]) => ({ exam, count }));
  }, [vocabulary]);

  // Words belonging to the selected exam (or all words if 'ALL')
  const examWords = React.useMemo(() => {
    if (currentExamFilter === 'ALL') return vocabulary;
    return vocabulary.filter(
      (v) => v.sourceExam?.trim() === currentExamFilter
    );
  }, [vocabulary, currentExamFilter]);

  // Manual Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTerm, setNewTerm] = useState('');
  const [newType, setNewType] = useState<VocabCategory>('Collocation');
  const [newIpa, setNewIpa] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newContext, setNewContext] = useState('');
  const [newCefr, setNewCefr] = useState<CefrLevel>('B2');
  const [newExamTip, setNewExamTip] = useState('');
  const [newSourceExam, setNewSourceExam] = useState('');

  // Selected items for bulk operations
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Statistics for the currently selected exam scope
  const masteredCount = examWords.filter((v) => v.status === 'Đã thành thạo').length;
  const learningCount = examWords.filter((v) => v.status === 'Đang học').length;
  const needReviewCount = examWords.filter((v) => v.status === 'Chưa thuộc').length;

  // Filtered List
  const filteredVocabulary = React.useMemo(() => {
    return examWords.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.context.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'ALL' || item.type === selectedCategory;

      const matchesStatus =
        selectedStatus === 'ALL' || item.status === selectedStatus;

      const matchesCefr =
        selectedCefr === 'ALL' || item.cefrLevel === selectedCefr;

      return matchesSearch && matchesCategory && matchesStatus && matchesCefr;
    });
  }, [examWords, searchQuery, selectedCategory, selectedStatus, selectedCefr]);

  const handleSelectAllFiltered = () => {
    if (selectedIds.size === filteredVocabulary.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredVocabulary.map((i) => i.id)));
    }
  };

  const handleToggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleOpenAddModal = () => {
    setNewSourceExam(
      currentExamFilter !== 'ALL'
        ? currentExamFilter
        : examOptions[0]?.exam || 'Từ vựng tự nhập / Khác'
    );
    setShowAddModal(true);
  };

  const handleSaveNewWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm.trim() || !newMeaning.trim()) return;

    const newItem: VocabularyItem = {
      id: `manual-${Date.now()}`,
      term: newTerm.trim(),
      type: newType,
      ipa: newIpa.trim() || `/${newTerm.trim()}/`,
      meaning: newMeaning.trim(),
      context: newContext.trim() || `Example with **${newTerm.trim()}**.`,
      cefrLevel: newCefr,
      examTip: newExamTip.trim(),
      sourceExam: newSourceExam.trim() || 'Từ vựng tự nhập / Khác',
      status: 'Chưa thuộc',
      interactionCount: 0,
      quizCorrectCount: 0,
      quizTotalCount: 0,
      addedAt: new Date().toISOString()
    };

    onAddNewWord(newItem);
    setShowAddModal(false);
    // Reset
    setNewTerm('');
    setNewIpa('');
    setNewMeaning('');
    setNewContext('');
    setNewExamTip('');
  };

  const getSelectedItemsOrFiltered = () => {
    if (selectedIds.size > 0) {
      return vocabulary.filter((v) => selectedIds.has(v.id));
    }
    return filteredVocabulary;
  };

  return (
    <div className="space-y-6">
      {/* Title & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <span>Sổ tay Từ vựng Cá nhân</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Quản lý từ vựng mục tiêu, tra cứu và ôn luyện trực tiếp qua Flashcard & AI Quiz
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              Tổng số: <strong className="text-slate-900">{vocabulary.length}</strong> từ
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              ● Đã thuộc: <strong>{masteredCount}</strong>
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
              ● Đang học: <strong>{learningCount}</strong>
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
              ● Chưa thuộc: <strong>{needReviewCount}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm từ mới</span>
          </button>

          {/* Chỉ tải xuống định dạng Word (.doc) theo yêu cầu */}
          <button
            type="button"
            onClick={() =>
              downloadDocxFile(
                'So_Tay_Tu_Vung_THPT_QG',
                'BẢNG TỔNG HỢP TỪ VỰNG TRỌNG TÂM ÔN THI THPT QUỐC GIA',
                [],
                getSelectedItemsOrFiltered()
              )
            }
            className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            title="Xuất phiếu từ vựng định dạng Microsoft Word (.doc) kèm bảng tra cứu & mẹo thi"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất Word (.doc)</span>
          </button>
        </div>
      </div>

      {/* EXAM DIVISION & SELECTION TABS */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                Phân Loại Từ Vựng Theo Từng Đề Thi
              </h3>
              <p className="text-[11px] text-slate-500">
                Chọn một đề thi cụ thể để chỉ ôn luyện các từ thuộc đề đó (Flashcards & AI Quiz)
              </p>
            </div>
          </div>
          {currentExamFilter !== 'ALL' && (
            <button
              type="button"
              onClick={() => handleExamChange('ALL')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer underline self-start sm:self-auto"
            >
              Xem tất cả ({vocabulary.length} từ)
            </button>
          )}
        </div>

        {/* Scrollable / Wrap Pill Buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleExamChange('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              currentExamFilter === 'ALL'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span>Tất cả đề</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                currentExamFilter === 'ALL'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {vocabulary.length}
            </span>
          </button>

          {examOptions.map(({ exam, count }) => {
            const isActive = currentExamFilter === exam;
            return (
              <button
                key={exam}
                type="button"
                onClick={() => handleExamChange(exam)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer max-w-full text-left ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
                title={exam}
              >
                <span className="truncate max-w-[240px] sm:max-w-[320px]">{exam}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count} từ
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FOCUSED EXAM STUDY BANNER (When an exam is specifically selected) */}
      {currentExamFilter !== 'ALL' && (
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-md border border-indigo-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/40">
                Đang ôn theo đề thi
              </span>
              <span className="text-xs text-indigo-200 font-semibold">
                ● Quy mô: <strong>{examWords.length}</strong> từ vựng
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-snug">
              {currentExamFilter}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-indigo-200 pt-1">
              <span>● Đã thuộc: <strong className="text-emerald-300 font-bold">{masteredCount}</strong></span>
              <span>● Đang học: <strong className="text-amber-300 font-bold">{learningCount}</strong></span>
              <span>● Chưa thuộc: <strong className="text-rose-300 font-bold">{needReviewCount}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo từ, nghĩa tiếng Việt hoặc câu ngữ cảnh..."
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white text-slate-700"
            >
              <option value="ALL">Tất cả loại từ (5)</option>
              <option value="Collocation">Collocation</option>
              <option value="Phrasal verb">Phrasal verb</option>
              <option value="Idiom">Idiom</option>
              <option value="Preposition">Preposition</option>
              <option value="Single word">Single word</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white text-slate-700"
            >
              <option value="ALL">Mọi trạng thái (3)</option>
              <option value="Chưa thuộc">Chưa thuộc (Cần ôn)</option>
              <option value="Đang học">Đang học (50-80%)</option>
              <option value="Đã thành thạo">Đã thành thạo (&gt;90%)</option>
            </select>
          </div>

          {/* CEFR Level Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedCefr}
              onChange={(e) => setSelectedCefr(e.target.value as any)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white text-slate-700"
            >
              <option value="ALL">Mọi cấp độ CEFR</option>
              <option value="B1">B1 (Cơ bản THPT)</option>
              <option value="B2">B2 (Vận dụng 7-8)</option>
              <option value="C1">C1 (Phân loại 9+)</option>
            </select>
          </div>
        </div>

        {/* Action Bar for Current Filter / Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              Hiển thị <strong>{filteredVocabulary.length}</strong> / {examWords.length} từ
              {currentExamFilter !== 'ALL' && ` (trong đề đã chọn)`}
            </span>
            {selectedIds.size > 0 && (
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                Đã chọn: {selectedIds.size}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStartFlashcards(getSelectedItemsOrFiltered(), currentExamFilter !== 'ALL' ? currentExamFilter : undefined)}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Học Flashcards ({getSelectedItemsOrFiltered().length})</span>
            </button>

            <button
              type="button"
              onClick={() => onStartQuiz(getSelectedItemsOrFiltered(), currentExamFilter !== 'ALL' ? currentExamFilter : undefined)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Làm bài Quiz ({getSelectedItemsOrFiltered().length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vocabulary Items Grid / Cards */}
      {filteredVocabulary.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">
            Không tìm thấy từ vựng nào phù hợp
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Thử thay đổi bộ lọc tìm kiếm hoặc vào tab "Phân tích Đề thi" để trích xuất thêm các cụm từ mới.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVocabulary.map((item) => {
            const isSelected = selectedIds.has(item.id);

            // Status styling
            const statusConfig = {
              'Đã thành thạo': {
                bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                icon: CheckCircle2,
                dot: 'bg-emerald-500'
              },
              'Đang học': {
                bg: 'bg-amber-50 text-amber-700 border-amber-200',
                icon: Clock,
                dot: 'bg-amber-500'
              },
              'Chưa thuộc': {
                bg: 'bg-rose-50 text-rose-700 border-rose-200',
                icon: AlertTriangle,
                dot: 'bg-rose-500'
              }
            }[item.status];

            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Top Bar: Checkbox, Type, CEFR & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(item.id)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {item.type}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {item.cefrLevel}
                      </span>
                    </div>

                    {/* Status Toggle Dropdown / Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const order: MasteryStatus[] = ['Chưa thuộc', 'Đang học', 'Đã thành thạo'];
                        const nextIdx = (order.indexOf(item.status) + 1) % order.length;
                        onUpdateStatus(item.id, order[nextIdx]);
                      }}
                      title="Bấm để đổi trạng thái thuộc từ vựng"
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 cursor-pointer transition-all ${statusConfig.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                      <span>{item.status}</span>
                    </button>
                  </div>

                  {/* Term & Audio */}
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      onClick={() => onInspectWord(item)}
                      className="text-base sm:text-lg font-black text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors"
                    >
                      {item.term}
                    </h3>
                    <button
                      type="button"
                      onClick={() => speakEnglish(item.term, accent)}
                      title={`Nghe phát âm (${accent})`}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* IPA */}
                  <p className="text-xs font-mono text-slate-500 mb-2">
                    {item.ipa}
                  </p>

                  {/* Meaning in Vietnamese */}
                  <p className="text-sm font-semibold text-slate-800 mb-3">
                    {item.meaning}
                  </p>

                  {/* Context in exam */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 italic leading-relaxed mb-3">
                    "{item.context.replace(/\*\*/g, '')}"
                  </div>

                  {/* Exam Tip */}
                  {item.examTip && (
                    <div className="text-[11px] text-amber-900 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60 mb-3">
                      💡 {item.examTip}
                    </div>
                  )}

                  {/* Source Exam Tag */}
                  {item.sourceExam && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80 mb-3" title={`Đề thi: ${item.sourceExam}`}>
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="truncate">{item.sourceExam}</span>
                    </div>
                  )}
                </div>

                {/* Footer: Tracking info & Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span title="Số lượt tương tác Flashcards">
                      Lật: <strong>{item.interactionCount}</strong>
                    </span>
                    <span>•</span>
                    <span title="Tỉ lệ đúng Quiz">
                      Quiz: <strong>{item.quizCorrectCount}/{item.quizTotalCount}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onInspectWord(item)}
                      title="Mở rộng word family & bẫy đề thi"
                      className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-100"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteItem(item.id)}
                      title="Xóa khỏi sổ tay"
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Manual Add Word Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-600" />
              <span>Thêm Từ vựng / Cụm từ Mới vào Sổ tay</span>
            </h3>

            <form onSubmit={handleSaveNewWord} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Thuộc Đề thi / Chuyên đề:
                </label>
                <input
                  type="text"
                  list="exam-options-list"
                  value={newSourceExam}
                  onChange={(e) => setNewSourceExam(e.target.value)}
                  placeholder="VD: Đề thi Chính thức 2024, Đề Tham Khảo 2025..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
                <datalist id="exam-options-list">
                  {examOptions.map(({ exam }) => (
                    <option key={exam} value={exam} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Từ / Cụm từ gốc (Term): *
                </label>
                <input
                  type="text"
                  required
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  placeholder="VD: make a fortune, take for granted..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phân loại:
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as VocabCategory)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white"
                  >
                    <option value="Collocation">Collocation</option>
                    <option value="Phrasal verb">Phrasal verb</option>
                    <option value="Idiom">Idiom</option>
                    <option value="Preposition">Preposition</option>
                    <option value="Single word">Single word</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Trình độ CEFR:
                  </label>
                  <select
                    value={newCefr}
                    onChange={(e) => setNewCefr(e.target.value as CefrLevel)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white"
                  >
                    <option value="B1">B1 (Cơ bản)</option>
                    <option value="B2">B2 (Khá)</option>
                    <option value="C1">C1 (Nâng cao 9+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Phiên âm IPA:
                </label>
                <input
                  type="text"
                  value={newIpa}
                  onChange={(e) => setNewIpa(e.target.value)}
                  placeholder="VD: /meɪk ə ˈfɔːtʃuːn/"
                  className="w-full px-3.5 py-2 font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nghĩa tiếng Việt chuẩn ngữ cảnh: *
                </label>
                <input
                  type="text"
                  required
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  placeholder="VD: phát tài, kiếm được cả gia tài..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Câu ngữ cảnh trong đề thi (Context):
                </label>
                <textarea
                  rows={2}
                  value={newContext}
                  onChange={(e) => setNewContext(e.target.value)}
                  placeholder="VD: He managed to make a fortune by investing in technology stocks."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mẹo thi THPT (Exam Tip / Bẫy đề):
                </label>
                <input
                  type="text"
                  value={newExamTip}
                  onChange={(e) => setNewExamTip(e.target.value)}
                  placeholder="VD: Phân biệt make a fortune với make a living..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  Lưu từ vựng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
