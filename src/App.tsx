import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ExamExtractor } from './components/ExamExtractor';
import { VocabularyNotebook } from './components/VocabularyNotebook';
import { GrammarHandbook } from './components/GrammarHandbook';
import { FlashcardDeck } from './components/FlashcardDeck';
import { AiQuizEngine } from './components/AiQuizEngine';
import { WordDetailModal } from './components/WordDetailModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { VisitorStatsModal } from './components/VisitorStatsModal';
import { VocabularyItem, MasteryStatus, normalizeStatus, ActiveTab } from './types';
import { getStoredApiKey } from './services/geminiService';
import { useVisitorStats } from './services/visitorStatsService';
import { Menu, GraduationCap, KeyRound, Eye } from 'lucide-react';

const STORAGE_KEY = 'evm_vocabulary_data_v1';
const TAB_STORAGE_KEY = 'evm_active_tab';
const EXAM_FILTER_STORAGE_KEY = 'evm_selected_exam_filter';
const ACCENT_STORAGE_KEY = 'evm_accent';

const VALID_TABS: ActiveTab[] = ['extract', 'notebook', 'grammar', 'flashcards', 'quiz'];

const getInitialTab = (): ActiveTab => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#', '') as ActiveTab;
    if (VALID_TABS.includes(hash)) {
      return hash;
    }
    const saved = localStorage.getItem(TAB_STORAGE_KEY) as ActiveTab;
    if (VALID_TABS.includes(saved)) {
      return saved;
    }
  }
  return 'extract';
};

// Helper to identify and filter out computer-suggested legacy sample exams
const isMachineSuggestedExam = (item: VocabularyItem): boolean => {
  const id = (item.id || '').toLowerCase();
  const source = (item.sourceExam || '').trim();
  if (id.startsWith('starter-') || id.startsWith('sample-')) {
    return true;
  }
  if (
    source.includes('THPT 2024 (Mã đề 401)') ||
    source.includes('Đề Tham Khảo Bộ GD&ĐT 2025') ||
    source.includes('Chuyên đề 9+:')
  ) {
    return true;
  }
  return false;
};

// Helper to assign proper sourceExam
const normalizeItemSourceExam = (item: VocabularyItem): string => {
  if (item.sourceExam && item.sourceExam.trim()) {
    return item.sourceExam.trim();
  }
  return 'Đề thi trích dẫn';
};

const migrateVocabularyData = (items: VocabularyItem[]): VocabularyItem[] => {
  return items
    .filter((item) => !isMachineSuggestedExam(item))
    .map((item) => ({
      ...item,
      sourceExam: normalizeItemSourceExam(item),
      status: normalizeStatus(item.status)
    }));
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(getInitialTab);
  const [accent, setAccent] = useState<'UK' | 'US'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(ACCENT_STORAGE_KEY);
      if (saved === 'UK' || saved === 'US') return saved;
    }
    return 'US';
  });
  const [inspectedWord, setInspectedWord] = useState<VocabularyItem | null>(null);
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(EXAM_FILTER_STORAGE_KEY) || 'ALL';
    }
    return 'ALL';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Manage API Key Modal state (shows automatically if no key is stored)
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !getStoredApiKey();
    }
    return false;
  });

  // Visitor statistics tracking & analytics across all users
  const {
    stats: visitorStats,
    isRefreshing: isVisitorStatsRefreshing,
    refresh: refreshVisitorStats
  } = useVisitorStats();
  const [isVisitorStatsModalOpen, setIsVisitorStatsModalOpen] = useState<boolean>(false);

  // Initialize vocabulary: only user-uploaded exams, zero suggested exams
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return migrateVocabularyData(parsed);
          }
        }
      } catch (err) {
        console.error('Failed to load vocabulary from localStorage:', err);
      }
    }

    // Default: completely empty dataset (zero machine suggestions)
    return [];
  });

  // Save activeTab to localStorage and sync hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TAB_STORAGE_KEY, activeTab);
      if (window.location.hash !== `#${activeTab}`) {
        window.history.replaceState(null, '', `#${activeTab}`);
      }
    }
  }, [activeTab]);

  // Listen to browser navigation (back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save accent to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCENT_STORAGE_KEY, accent);
    }
  }, [accent]);

  // Save selectedExamFilter to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(EXAM_FILTER_STORAGE_KEY, selectedExamFilter);
    }
  }, [selectedExamFilter]);

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vocabulary));
    } catch (err) {
      console.error('Failed to save vocabulary to localStorage:', err);
    }
  }, [vocabulary]);

  // Add batch of items (avoid duplicate terms)
  const handleAddVocabBatch = (newItems: VocabularyItem[]) => {
    setVocabulary((prev) => {
      const existingTerms = new Set(prev.map((i) => i.term.toLowerCase().trim()));
      const filteredNew = newItems
        .filter((item) => !existingTerms.has(item.term.toLowerCase().trim()))
        .map((item) => ({
          ...item,
          sourceExam: item.sourceExam?.trim() || 'Từ vựng tự nhập / Khác'
        }));
      return [...filteredNew, ...prev];
    });
  };

  // Add single word manually
  const handleAddNewWord = (item: VocabularyItem) => {
    const itemWithExam: VocabularyItem = {
      ...item,
      sourceExam: item.sourceExam?.trim() || 'Từ vựng tự nhập / Khác'
    };
    setVocabulary((prev) => [itemWithExam, ...prev]);
  };

  // Update mastery status
  const handleUpdateStatus = (id: string, status: MasteryStatus) => {
    setVocabulary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  // Increment interaction count
  const handleIncrementInteraction = (id: string) => {
    setVocabulary((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, interactionCount: (item.interactionCount || 0) + 1 }
          : item
      )
    );
  };

  // Delete word from notebook
  const handleDeleteItem = (id: string) => {
    setVocabulary((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quiz result for a target word
  const handleUpdateQuizResult = (term: string, isCorrect: boolean) => {
    setVocabulary((prev) =>
      prev.map((item) => {
        if (item.term.toLowerCase().trim() === term.toLowerCase().trim()) {
          const newTotal = (item.quizTotalCount || 0) + 1;
          const newCorrect = (item.quizCorrectCount || 0) + (isCorrect ? 1 : 0);
          const ratio = newCorrect / newTotal;

          let newStatus: MasteryStatus = item.status;
          if (newTotal >= 2) {
            if (ratio >= 0.85) {
              newStatus = 'Đã thành thạo';
            } else if (ratio >= 0.5) {
              newStatus = 'Đang học';
            } else {
              newStatus = 'Chưa thuộc';
            }
          } else {
            newStatus = isCorrect ? 'Đang học' : 'Chưa thuộc';
          }

          return {
            ...item,
            quizTotalCount: newTotal,
            quizCorrectCount: newCorrect,
            status: newStatus
          };
        }
        return item;
      })
    );
  };

  // Navigation handlers from Extractor or Notebook
  const handleOpenFlashcardsWithWords = (_items: VocabularyItem[], examTitle?: string) => {
    if (examTitle) {
      setSelectedExamFilter(examTitle);
    }
    setActiveTab('flashcards');
  };

  const handleGenerateQuizWithWords = (_items: VocabularyItem[], examTitle?: string) => {
    if (examTitle) {
      setSelectedExamFilter(examTitle);
    }
    setActiveTab('quiz');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col lg:flex-row">
      {/* 1. Left Sidebar Navigation Column (Cột chức năng bên tay trái) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        vocabulary={vocabulary}
        accent={accent}
        setAccent={setAccent}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        visitorStats={visitorStats}
        onOpenVisitorStatsModal={() => setIsVisitorStatsModalOpen(true)}
      />

      {/* 2. Right Main Content Area (Nội dung chính xuất hiện bên phải) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-50">
        {/* Desktop Expand Bar (chỉ hiển thị khi đã giấu sidebar) */}
        {isSidebarCollapsed && (
          <div className="hidden lg:flex sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-2.5 items-center justify-between shadow-xs">
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(false)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4 text-indigo-600" />
              <span>Hiện thanh menu (Sidebar)</span>
            </button>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsVisitorStatsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer group"
                title="Xem chi tiết thống kê lượt truy cập toàn trang"
              >
                <Eye className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>{visitorStats.totalVisits.toLocaleString('vi-VN')} lượt</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <span className="font-extrabold text-slate-900 text-xs tracking-tight">
                  MASTER THPTQG <span className="text-indigo-600 font-bold">TIENG ANH</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Header (hiển thị trên màn hình nhỏ < lg khi chưa mở drawer) */}
        <header className="lg:hidden sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              aria-label="Mở danh mục chức năng"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight">
                MASTER THPTQG <span className="text-indigo-600 font-bold">TIENG ANH</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsVisitorStatsModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:bg-slate-800"
              title="Xem thống kê lượt truy cập toàn trang"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>{visitorStats.totalVisits.toLocaleString('vi-VN')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <button
              type="button"
              onClick={() => setIsApiKeyModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                getStoredApiKey()
                  ? 'bg-slate-50 text-slate-700 border-slate-200'
                  : 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-400/30 animate-pulse'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{getStoredApiKey() ? 'API Key' : 'Nhập Key'}</span>
            </button>
          </div>
        </header>

        {/* Main Content Area - Clean, focused on the active tool */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Tab 1: Phân tích & Trích xuất Đề thi */}
          {activeTab === 'extract' && (
            <ExamExtractor
              onAddVocabBatch={handleAddVocabBatch}
              onOpenFlashcardsWithWords={handleOpenFlashcardsWithWords}
              onGenerateQuizWithWords={handleGenerateQuizWithWords}
              onInspectWord={setInspectedWord}
              accent={accent}
              onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            />
          )}

          {/* Tab 2: Sổ tay từ vựng cá nhân */}
          {activeTab === 'notebook' && (
            <VocabularyNotebook
              vocabulary={vocabulary}
              onUpdateStatus={handleUpdateStatus}
              onDeleteItem={handleDeleteItem}
              onAddNewWord={handleAddNewWord}
              onInspectWord={setInspectedWord}
              onStartFlashcards={handleOpenFlashcardsWithWords}
              onStartQuiz={handleGenerateQuizWithWords}
              accent={accent}
              selectedExamFilter={selectedExamFilter}
              onSelectExamFilter={setSelectedExamFilter}
              visitorStats={visitorStats}
              onOpenVisitorStatsModal={() => setIsVisitorStatsModalOpen(true)}
            />
          )}

          {/* Tab 3: Sổ tay Cấu trúc & Ngữ pháp */}
          {activeTab === 'grammar' && (
            <GrammarHandbook
              accent={accent}
              onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            />
          )}

          {/* Tab 4: Flashcards */}
          {activeTab === 'flashcards' && (
            <FlashcardDeck
              vocabulary={vocabulary}
              onUpdateStatus={handleUpdateStatus}
              onIncrementInteraction={handleIncrementInteraction}
              onInspectWord={setInspectedWord}
              accent={accent}
              selectedExamFilter={selectedExamFilter}
              onSelectExamFilter={setSelectedExamFilter}
            />
          )}

          {/* Tab 4: AI Quiz */}
          {activeTab === 'quiz' && (
            <AiQuizEngine
              vocabulary={vocabulary}
              onUpdateQuizResult={handleUpdateQuizResult}
              accent={accent}
              onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
              selectedExamFilter={selectedExamFilter}
              onSelectExamFilter={setSelectedExamFilter}
            />
          )}
        </main>

        {/* Footer: Lượt truy cập chỉ hiện từ ban đầu lúc học sinh tải đề lên là đủ rồi */}
        {activeTab === 'extract' && (
          <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-slate-500 text-center sm:text-left">
                <span>Hỗ trợ bởi Google Gemini AI • Phân tích ngữ liệu Oxford/Cambridge Phonetics</span>
              </div>

              <button
                type="button"
                onClick={() => setIsVisitorStatsModalOpen(true)}
                className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 bg-slate-50 hover:bg-indigo-50/80 border border-slate-200 hover:border-indigo-200 rounded-full font-medium text-slate-700 hover:text-indigo-800 transition-all cursor-pointer shadow-2xs group"
                title="Nhấp để xem chi tiết biểu đồ & số liệu lượt truy cập toàn hệ thống"
              >
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
                  Tổng lượt truy cập: <strong className="text-slate-900 font-bold">{visitorStats.totalVisits.toLocaleString('vi-VN')}</strong> lượt
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {visitorStats.activeNow} online
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-slate-600">
                  Hôm nay: <strong className="text-slate-900">+{visitorStats.todayVisits}</strong>
                </span>
                <span className="text-indigo-600 font-bold text-[11px] underline ml-0.5">Chi tiết &raquo;</span>
              </button>
            </div>
          </footer>
        )}
      </div>

      {/* Word Deep Dive Modal */}
      <WordDetailModal
        item={inspectedWord}
        onClose={() => setInspectedWord(null)}
        accent={accent}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* Settings (API Key & Model Selection) Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        isMandatory={false}
      />

      {/* Visitor Analytics Modal */}
      <VisitorStatsModal
        isOpen={isVisitorStatsModalOpen}
        onClose={() => setIsVisitorStatsModalOpen(false)}
        stats={visitorStats}
        onRefresh={refreshVisitorStats}
        isRefreshing={isVisitorStatsRefreshing}
      />
    </div>
  );
}
