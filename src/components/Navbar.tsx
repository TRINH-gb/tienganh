import React from 'react';
import {
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  Code2,
  GraduationCap,
  Volume2,
  KeyRound,
  Settings,
  Cpu,
  Gamepad2
} from 'lucide-react';
import { VocabularyItem } from '../types';
import { getStoredApiKey, getStoredModel } from '../services/geminiService';

interface NavbarProps {
  activeTab: 'extract' | 'notebook' | 'flashcards' | 'quiz' | 'game' | 'prompt';
  setActiveTab: (tab: 'extract' | 'notebook' | 'flashcards' | 'quiz' | 'game' | 'prompt') => void;
  vocabulary: VocabularyItem[];
  accent: 'UK' | 'US';
  setAccent: (accent: 'UK' | 'US') => void;
  onOpenApiKeyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  vocabulary,
  accent,
  setAccent,
  onOpenApiKeyModal
}) => {
  const masteredCount = vocabulary.filter((v) => v.status === 'Đã thành thạo').length;
  const learningCount = vocabulary.filter((v) => v.status === 'Đang học').length;
  const reviewCount = vocabulary.filter((v) => v.status === 'Chưa thuộc').length;

  const currentApiKey = getStoredApiKey();
  const currentModel = getStoredModel();
  const hasApiKey = Boolean(currentApiKey);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('extract')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                  EVM <span className="text-indigo-600 font-semibold text-base hidden sm:inline">Architect</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  THPT QG
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                AI English Exam Vocabulary Architect & Learning Coordinator
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('extract')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'extract'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Phân tích Đề thi</span>
            </button>

            <button
              onClick={() => setActiveTab('notebook')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'notebook'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>Sổ tay ({vocabulary.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              <span>Luyện thi AI Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('game')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'game'
                  ? 'bg-orange-50 text-orange-700 border border-orange-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-orange-500" />
              <span>Đấu trường 60s</span>
            </button>

            <button
              onClick={() => setActiveTab('prompt')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'prompt'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Code2 className="w-4 h-4 text-purple-500" />
              <span>System Prompt</span>
            </button>
          </nav>

          {/* Quick Controls, Settings (API Key) & Accent Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Pronunciation Accent Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setAccent('US')}
                className={`px-2 py-1 rounded-md flex items-center space-x-1 font-semibold transition-all ${
                  accent === 'US'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Phát âm chuẩn Anh - Mỹ"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>US</span>
              </button>
              <button
                type="button"
                onClick={() => setAccent('UK')}
                className={`px-2 py-1 rounded-md flex items-center space-x-1 font-semibold transition-all ${
                  accent === 'UK'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Phát âm chuẩn Anh - Anh"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>UK</span>
              </button>
            </div>

            {/* MANDATORY Settings (API Key) Button with red indicator text */}
            <button
              type="button"
              onClick={onOpenApiKeyModal}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs cursor-pointer ${
                hasApiKey
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                  : 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-700 ring-2 ring-rose-400/30 animate-pulse'
              }`}
              title="Thiết lập Model & API Key Gemini"
            >
              <div className="flex items-center gap-1.5">
                <KeyRound className={`w-3.5 h-3.5 ${hasApiKey ? 'text-indigo-600' : 'text-rose-600'}`} />
                <span className="hidden sm:inline">Settings (API Key)</span>
              </div>
              <span className="inline-block text-[11px] font-bold text-rose-600 bg-rose-100/90 px-2 py-0.5 rounded-md border border-rose-200">
                Lấy API key để sử dụng app
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  hasApiKey ? 'bg-emerald-500' : 'bg-rose-500 animate-ping'
                }`}
                title={hasApiKey ? 'API Key đã thiết lập' : 'Chưa có API Key'}
              />
            </button>

            {/* Vocabulary stats badges for desktop */}
            <div className="hidden xl:flex items-center space-x-1.5 text-xs">
              <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md font-medium" title="Đã thành thạo (>90%)">
                ★ {masteredCount}
              </span>
              <span className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-md font-medium" title="Đang học (50-80%)">
                ● {learningCount}
              </span>
              <span className="px-2 py-1 bg-rose-50 border border-rose-200 text-rose-700 rounded-md font-medium" title="Chưa thuộc (Sai nhiều)">
                ▲ {reviewCount}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('extract')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'extract'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Phân tích Đề
          </button>
          <button
            onClick={() => setActiveTab('notebook')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'notebook'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Sổ tay ({vocabulary.length})
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'flashcards'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            AI Quiz
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'game'
                ? 'bg-orange-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Đấu trường 60s
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'prompt'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            System Instruction
          </button>
        </div>
      </div>
    </header>
  );
};
