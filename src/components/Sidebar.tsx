import React from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  BookMarked,
  Volume2,
  KeyRound,
  Settings,
  X,
  Cpu,
  ChevronLeft
} from 'lucide-react';
import { VocabularyItem, normalizeStatus, ActiveTab } from '../types';
import { getStoredApiKey, getStoredModel } from '../services/geminiService';
import msTrinhPhoto from '../assets/ms-trinh.jpg';

export interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  vocabulary: VocabularyItem[];
  accent: 'UK' | 'US';
  setAccent: (accent: 'UK' | 'US') => void;
  onOpenApiKeyModal: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  vocabulary,
  accent,
  setAccent,
  onOpenApiKeyModal,
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed
}) => {
  const currentApiKey = getStoredApiKey();
  const hasApiKey = Boolean(currentApiKey);
  const currentModel = getStoredModel();

  // Statistics
  const totalWords = vocabulary.length;
  const masteredCount = vocabulary.filter((v) => normalizeStatus(v.status) === 'Đã thành thạo').length;
  const learningCount = vocabulary.filter((v) => normalizeStatus(v.status) === 'Đang học').length;
  const needReviewCount = vocabulary.filter((v) => normalizeStatus(v.status) === 'Chưa thuộc').length;
  const masteryRate = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileOpen(false);
  };

  // 5 menu items in the requested order:
  // 1. Phân tích đề thi (Cốt lõi 1)
  // 2. Sổ tay từ vựng (Cốt lõi 2)
  // 3. Thẻ Flashcards
  // 4. Luyện thi AI Quiz
  // 5. Sổ tay cấu trúc (Cốt lõi 3 - nằm sau Luyện thi AI Quiz!)
  const navItems = [
    {
      id: 'extract' as const,
      name: 'Phân tích Đề thi',
      sub: 'Trích xuất từ vựng từ PDF / Ảnh',
      icon: Sparkles,
      iconColor: 'text-indigo-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200',
      isCore: true,
      coreTag: '⭐ CỐT LÕI 1'
    },
    {
      id: 'notebook' as const,
      name: 'Sổ tay Từ vựng',
      sub: 'Kho từ cá nhân & tra cứu',
      icon: BookOpen,
      iconColor: 'text-blue-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200',
      badge: totalWords > 0 ? `${totalWords}` : undefined,
      isCore: true,
      coreTag: '⭐ CỐT LÕI 2'
    },
    {
      id: 'flashcards' as const,
      name: 'Thẻ Flashcards',
      sub: 'Lật thẻ ghi nhớ phản xạ',
      icon: Layers,
      iconColor: 'text-amber-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200',
      isCore: false
    },
    {
      id: 'quiz' as const,
      name: 'Luyện thi AI Quiz',
      sub: 'Trắc nghiệm thông minh',
      icon: HelpCircle,
      iconColor: 'text-emerald-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200',
      isCore: false
    },
    {
      id: 'grammar' as const,
      name: 'Sổ tay Cấu trúc',
      sub: '18 chuyên đề ngữ pháp thi THPT',
      icon: BookMarked,
      iconColor: 'text-purple-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200',
      badge: '18',
      isCore: true,
      coreTag: '⭐ CỐT LÕI 3'
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-slate-800">
      {/* 1. App Header & Thu gọn button */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => handleSelectTab('extract')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-base leading-snug">
                MASTER THPTQG <span className="text-indigo-600 font-bold">TIENG ANH</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Button */}
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Giấu sidebar để màn hình rộng hơn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

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
        </div>

        {/* Khung ảnh tác giả: Developed by Ms.Trinh */}
        <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-sky-50/50 to-purple-50/60 border border-indigo-100/90 shadow-2xs">
          <div className="relative shrink-0">
            <img
              src={msTrinhPhoto}
              alt="Ms. Trinh"
              className="w-10 h-10 rounded-xl object-cover object-[center_18%] ring-2 ring-indigo-400/60 shadow-xs"
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"
              title="Online"
            />
          </div>
          <div className="min-w-0 flex-1 text-left space-y-0.5">
            <p className="text-xs font-black text-slate-900 leading-tight whitespace-nowrap">
              Developed by Ms.Trinh
            </p>
            <p className="text-[10px] font-semibold text-slate-600 leading-tight whitespace-nowrap">
              THPT Võ Thị Sáu Bà Rịa Vũng Tàu
            </p>
            <a
              href="tel:0397726024"
              className="text-[10.5px] text-indigo-700 font-mono font-bold flex items-center gap-1 hover:underline whitespace-nowrap"
            >
              📞 039.772.6024
            </a>
          </div>
        </div>
      </div>

      {/* 2. Scrollable Body: Features */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
        <div>
          {/* Header chỉ rõ 3 TRỤ CỘT CHÍNH CỦA APP */}
          <div className="px-2 mb-2 flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Chức năng ứng dụng
            </span>
            <span className="text-[9.5px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              3 Trụ Cột Chính
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left group cursor-pointer border ${
                    isActive
                      ? item.activeBg
                      : item.isCore
                      ? 'bg-white hover:bg-slate-50 border-indigo-200/80 shadow-2xs text-slate-800'
                      : 'hover:bg-slate-50 border-transparent text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.isCore
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                          : `bg-slate-100 ${item.iconColor} group-hover:bg-slate-200/80`
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs sm:text-sm font-bold truncate ${
                            isActive ? 'text-white' : item.isCore ? 'text-slate-900 font-extrabold' : 'text-slate-700'
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      <p
                        className={`text-[10px] truncate ${
                          isActive ? 'text-indigo-100' : 'text-slate-400'
                        }`}
                      >
                        {item.sub}
                      </p>
                    </div>
                  </div>

                  {/* Right Tags & Badges */}
                  <div className="ml-2 shrink-0 flex items-center gap-1">
                    {item.isCore && (
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-indigo-100/90 text-indigo-700'
                        }`}
                      >
                        CỐT LÕI
                      </span>
                    )}

                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Pronunciation Accent Selector */}
        <div>
          <div className="px-2 mb-1.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Cấu hình Phát âm
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1 text-[11px]">
                <Volume2 className="w-3 h-3 text-indigo-600" />
                <span>Giọng đọc:</span>
              </span>
              <span className="text-[11px] font-bold text-indigo-600">
                {accent === 'US' ? 'Anh - Mỹ' : 'Anh - Anh'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 p-0.5 bg-white rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setAccent('US')}
                className={`py-1 px-2 rounded-md font-bold transition-all ${
                  accent === 'US'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇺🇸 US
              </button>
              <button
                type="button"
                onClick={() => setAccent('UK')}
                className={`py-1 px-2 rounded-md font-bold transition-all ${
                  accent === 'UK'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇬🇧 UK
              </button>
            </div>
          </div>
        </div>

        {/* Gemini AI & API Key Management Box */}
        <div>
          <div className="px-2 mb-1.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Trí tuệ nhân tạo (AI)
            </span>
          </div>

          <div
            className={`p-3 rounded-xl border transition-all ${
              hasApiKey
                ? 'bg-slate-50 border-slate-200'
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
                  <KeyRound className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Gemini AI</h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Cpu className="w-3 h-3 text-indigo-500" />
                    <span className="font-mono">{currentModel}</span>
                  </div>
                </div>
              </div>

              <span
                className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                  hasApiKey
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800 animate-pulse'
                }`}
              >
                {hasApiKey ? 'Đã kết nối' : 'Chưa có key'}
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenApiKeyModal}
              className={`mt-2 w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                hasApiKey
                  ? 'bg-white hover:bg-slate-100 border border-slate-300 text-slate-700'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              <Settings className="w-3 h-3" />
              <span>{hasApiKey ? 'Cài đặt AI Key' : 'Nhập Key ngay'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Left Sidebar (Có thể thu gọn khi isCollapsed = true) */}
      {!isCollapsed && (
        <aside className="hidden lg:flex w-72 xl:w-80 h-screen sticky top-0 flex-col border-r border-slate-200 bg-white shrink-0 z-30 shadow-xs transition-all">
          {sidebarContent}
        </aside>
      )}

      {/* Mobile Drawer Overlay & Sliding Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
