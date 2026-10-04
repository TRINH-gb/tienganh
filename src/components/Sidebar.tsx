import React from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  Volume2,
  KeyRound,
  Settings,
  TrendingUp,
  X,
  Cpu
} from 'lucide-react';
import { VocabularyItem, normalizeStatus } from '../types';
import { getStoredApiKey, getStoredModel } from '../services/geminiService';

export interface SidebarProps {
  activeTab: 'extract' | 'notebook' | 'flashcards' | 'quiz';
  setActiveTab: (tab: 'extract' | 'notebook' | 'flashcards' | 'quiz') => void;
  vocabulary: VocabularyItem[];
  accent: 'UK' | 'US';
  setAccent: (accent: 'UK' | 'US') => void;
  onOpenApiKeyModal: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  vocabulary,
  accent,
  setAccent,
  onOpenApiKeyModal,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const currentApiKey = getStoredApiKey();
  const hasApiKey = Boolean(currentApiKey);
  const currentModel = getStoredModel();

  // Calculate learning progress statistics
  const totalWords = vocabulary.length;
  const masteredCount = vocabulary.filter((v) => normalizeStatus(v.status) === 'Đã thành thạo').length;
  const learningCount = vocabulary.filter((v) => normalizeStatus(v.status) === 'Đang học').length;
  const needReviewCount = vocabulary.filter((v) => normalizeStatus(v.status) === 'Chưa thuộc').length;
  const masteryRate = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;

  const handleSelectTab = (tab: 'extract' | 'notebook' | 'flashcards' | 'quiz') => {
    setActiveTab(tab);
    setIsMobileOpen(false);
  };

  const navItems = [
    {
      id: 'extract' as const,
      name: 'Phân tích Đề thi',
      icon: Sparkles,
      iconColor: 'text-indigo-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
    },
    {
      id: 'notebook' as const,
      name: 'Sổ tay Từ vựng',
      icon: BookOpen,
      iconColor: 'text-blue-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200',
      badge: totalWords > 0 ? `${totalWords}` : undefined
    },
    {
      id: 'flashcards' as const,
      name: 'Thẻ Flashcards',
      icon: Layers,
      iconColor: 'text-amber-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
    },
    {
      id: 'quiz' as const,
      name: 'Luyện thi AI Quiz',
      icon: HelpCircle,
      iconColor: 'text-emerald-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-slate-800">
      {/* 1. App Branding Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => handleSelectTab('extract')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight text-base leading-snug">
                MASTER THPTQG <span className="text-indigo-600 font-bold">TIENG ANH</span>
              </span>
            </div>
            <p className="text-[11px] text-indigo-700 font-semibold mt-0.5">
              Developed by Ms.Trinh 0397726024
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Đóng thanh chức năng"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Scrollable Body: Features & Tools */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {/* Module Section: Core Features */}
        <div>
          <div className="px-2 mb-2.5">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Chức năng
            </span>
          </div>

          <nav className="space-y-1.5" aria-label="Menu chức năng chính">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const IconComponent = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all text-left group cursor-pointer ${
                    isActive
                      ? item.activeBg
                      : 'hover:bg-slate-50 border border-transparent hover:border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : `bg-slate-100 ${item.iconColor} group-hover:bg-slate-200/80`
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-sm font-bold truncate ${
                        isActive ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Badge */}
                  {item.badge && (
                    <div className="ml-2 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Pronunciation Accent Selector */}
        <div>
          <div className="px-2 mb-2">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Cấu hình Phát âm
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Giọng đọc mẫu:</span>
              </span>
              <span className="text-[11px] font-bold text-indigo-600">
                {accent === 'US' ? 'Anh - Mỹ' : 'Anh - Anh'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-white rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setAccent('US')}
                className={`py-1 px-2 rounded-md font-bold transition-all ${
                  accent === 'US'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Phát âm chuẩn Anh - Mỹ (General American)"
              >
                🇺🇸 US (Mỹ)
              </button>
              <button
                type="button"
                onClick={() => setAccent('UK')}
                className={`py-1 px-2 rounded-md font-bold transition-all ${
                  accent === 'UK'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Phát âm chuẩn Anh - Anh (Received Pronunciation)"
              >
                🇬🇧 UK (Anh)
              </button>
            </div>
          </div>
        </div>

        {/* Learning Progress Overview Widget */}
        <div>
          <div className="px-2 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Tiến độ Học tập
            </span>
            <span className="text-[11px] font-bold text-indigo-600">{masteryRate}%</span>
          </div>
          <div className="p-3.5 bg-gradient-to-br from-indigo-50/70 via-slate-50 to-blue-50/50 rounded-xl border border-indigo-100 space-y-2.5">
            <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${masteryRate}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-1 pt-1 text-center">
              <div className="bg-white/90 p-1.5 rounded-lg border border-slate-200/60 shadow-2xs">
                <div className="text-[9px] text-slate-500 font-medium">Tổng từ</div>
                <div className="text-xs font-black text-slate-800">{totalWords}</div>
              </div>
              <div className="bg-white/90 p-1.5 rounded-lg border border-emerald-200/70 shadow-2xs">
                <div className="text-[9px] text-emerald-600 font-medium">Thuộc</div>
                <div className="text-xs font-black text-emerald-700">{masteredCount}</div>
              </div>
              <div className="bg-white/90 p-1.5 rounded-lg border border-rose-200/70 shadow-2xs">
                <div className="text-[9px] text-rose-500 font-medium">Cần ôn</div>
                <div className="text-xs font-black text-rose-700">{needReviewCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gemini AI & API Key Management Box */}
        <div>
          <div className="px-2 mb-2">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Trí tuệ nhân tạo (AI)
            </span>
          </div>

          <div
            className={`p-3.5 rounded-xl border transition-all ${
              hasApiKey
                ? 'bg-slate-50/90 border-slate-200 hover:border-slate-300'
                : 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/30'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`p-1.5 rounded-lg ${
                    hasApiKey ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Gemini API Key</h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                    <Cpu className="w-3 h-3 text-indigo-500" />
                    <span className="font-mono">{currentModel}</span>
                  </div>
                </div>
              </div>

              {/* Status indicator pill */}
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  hasApiKey
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800 animate-pulse'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    hasApiKey ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
                <span>{hasApiKey ? 'Đã kết nối' : 'Chưa có key'}</span>
              </span>
            </div>

            {/* Warning if no key */}
            {!hasApiKey && (
              <div className="mt-2.5 pt-2 border-t border-rose-200">
                <span className="inline-block text-[11px] font-bold text-rose-700 bg-rose-100/90 px-2 py-1 rounded-md w-full text-center">
                  ⚠️ Lấy API key để sử dụng app
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={onOpenApiKeyModal}
              className={`mt-2.5 w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                hasApiKey
                  ? 'bg-white hover:bg-slate-100 border border-slate-300 text-slate-700'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{hasApiKey ? 'Cài đặt Model / Key' : 'Nhập API Key ngay'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Footer Info */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/70 text-center text-[11px] text-slate-500">
        <p className="font-bold text-slate-700">MASTER THPTQG TIENG ANH</p>
        <p className="text-[10px] text-indigo-700 font-semibold mt-0.5">
          Developed by Ms.Trinh 0397726024
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Left Sidebar (Cột bên tay trái) */}
      <aside className="hidden lg:flex w-72 xl:w-80 h-screen sticky top-0 flex-col border-r border-slate-200 bg-white shrink-0 z-30 shadow-xs">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay & Sliding Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
