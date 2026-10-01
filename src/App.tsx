import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ExamExtractor } from './components/ExamExtractor';
import { VocabularyNotebook } from './components/VocabularyNotebook';
import { FlashcardDeck } from './components/FlashcardDeck';
import { AiQuizEngine } from './components/AiQuizEngine';
import { WordDetailModal } from './components/WordDetailModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SAMPLE_EXAMS } from './data/sampleExams';
import { VocabularyItem, MasteryStatus } from './types';
import { getStoredApiKey } from './services/geminiService';

const STORAGE_KEY = 'evm_vocabulary_data_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'extract' | 'notebook' | 'flashcards' | 'quiz'>('extract');
  const [accent, setAccent] = useState<'UK' | 'US'>('US');
  const [inspectedWord, setInspectedWord] = useState<VocabularyItem | null>(null);

  // Manage API Key Modal state (shows automatically if no key is stored)
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !getStoredApiKey();
    }
    return false;
  });

  // Initialize vocabulary with saved data or sample authentic words
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.error('Failed to load vocabulary from localStorage:', err);
      }
    }

    // Default starter dataset from Sample Exam (clean without simulated fake test data)
    const starter: VocabularyItem[] = [];
    if (SAMPLE_EXAMS.length > 0) {
      SAMPLE_EXAMS[0].initialVocab.forEach((item, idx) => {
        starter.push({
          ...item,
          id: `starter-${SAMPLE_EXAMS[0].id}-${idx}`,
          status: 'Chưa thuộc',
          interactionCount: 0,
          quizCorrectCount: 0,
          quizTotalCount: 0,
          addedAt: new Date().toISOString()
        });
      });
    }
    return starter;
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
      const filteredNew = newItems.filter(
        (item) => !existingTerms.has(item.term.toLowerCase().trim())
      );
      return [...filteredNew, ...prev];
    });
  };

  // Add single word manually
  const handleAddNewWord = (item: VocabularyItem) => {
    setVocabulary((prev) => [item, ...prev]);
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
  const handleOpenFlashcardsWithWords = (_items: VocabularyItem[]) => {
    setActiveTab('flashcards');
  };

  const handleGenerateQuizWithWords = (_items: VocabularyItem[]) => {
    setActiveTab('quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation with Settings (API Key) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        vocabulary={vocabulary}
        accent={accent}
        setAccent={setAccent}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

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
          />
        )}

        {/* Tab 4: AI Quiz */}
        {activeTab === 'quiz' && (
          <AiQuizEngine
            vocabulary={vocabulary}
            onUpdateQuizResult={handleUpdateQuizResult}
            accent={accent}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          />
        )}
      </main>

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

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>AI English Exam Vocabulary Architect (EVM)</strong> • Ôn thi Tốt nghiệp THPT Quốc Gia
          </span>
          <span className="text-slate-400">
            Hỗ trợ bởi Google Gemini AI • Phân tích ngữ liệu Oxford/Cambridge Phonetics
          </span>
        </div>
      </footer>
    </div>
  );
}
