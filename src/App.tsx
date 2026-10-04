import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ExamExtractor } from './components/ExamExtractor';
import { VocabularyNotebook } from './components/VocabularyNotebook';
import { FlashcardDeck } from './components/FlashcardDeck';
import { AiQuizEngine } from './components/AiQuizEngine';
import { WordDetailModal } from './components/WordDetailModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { VocabularyItem, MasteryStatus, normalizeStatus } from './types';
import { getStoredApiKey } from './services/geminiService';
import { Menu, GraduationCap, KeyRound } from 'lucide-react';

const STORAGE_KEY = 'evm_vocabulary_data_v1';

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
  const [activeTab, setActiveTab] = useState<'extract' | 'notebook' | 'flashcards' | 'quiz'>('extract');
  const [accent, setAccent] = useState<'UK' | 'US'>('US');
  const [inspectedWord, setInspectedWord] = useState<VocabularyItem | null>(null);
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>('ALL');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Manage API Key Modal state (shows automatically if no key is stored)
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !getStoredApiKey();
    }
    return false;
  });

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
      />

      {/* 2. Right Main Content Area (Nội dung chính xuất hiện bên phải) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-50">
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
            />
          )}

          {/* Tab 3: Flashcards */}
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

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
            <span>Hỗ trợ bởi Google Gemini AI • Phân tích ngữ liệu Oxford/Cambridge Phonetics</span>
          </div>
        </footer>
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
    </div>
  );
}
