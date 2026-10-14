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
  ChevronLeft,
  Eye,
  User,
  School,
  LogOut,
  ShieldCheck,
  Award
} from 'lucide-react';
import { VocabularyItem, normalizeStatus, ActiveTab, VisitorStats, UserProfile } from '../types';
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
  visitorStats?: VisitorStats;
  onOpenVisitorStatsModal?: () => void;
  userProfile?: UserProfile | null;
  onOpenLoginModal?: () => void;
  onLogout?: () => void;
  isServerHost?: boolean;
  onOpenSchoolStatsModal?: () => void;
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
  setIsCollapsed,
  visitorStats,
  onOpenVisitorStatsModal,
  userProfile,
  onOpenLoginModal,
  onLogout,
  isServerHost = false,
  onOpenSchoolStatsModal
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
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
    },
    {
      id: 'notebook' as const,
      name: 'Sổ tay Từ vựng',
      sub: 'Kho từ cá nhân & tra cứu',
      icon: BookOpen,
      iconColor: 'text-blue-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
    },
    {
      id: 'flashcards' as const,
      name: 'Thẻ Flashcards',
      sub: 'Lật thẻ ghi nhớ phản xạ',
      icon: Layers,
      iconColor: 'text-amber-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
    },
    {
      id: 'quiz' as const,
      name: 'Luyện thi AI Quiz',
      sub: 'Trắc nghiệm thông minh',
      icon: HelpCircle,
      iconColor: 'text-emerald-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
    },
    {
      id: 'grammar' as const,
      name: 'Sổ tay Cấu trúc',
      sub: '20 chuyên đề ngữ pháp thi THPT',
      icon: BookMarked,
      iconColor: 'text-purple-600',
      activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-200',
      badge: '20'
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
        <div
          onClick={onOpenLoginModal}
          className="flex items-center gap-2.5 p-2 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-sky-50/50 to-purple-50/60 border border-indigo-100/90 shadow-2xs cursor-pointer hover:border-indigo-300 hover:shadow-xs transition-all"
          title="Developed by Ms. Trinh (Nhấp để đăng nhập Quản trị viên)"
        >
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

        {/* Thông tin tài khoản người dùng đăng nhập */}
        {userProfile ? (
          <div className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 shadow-2xs ${
            userProfile.isAdmin
              ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
              : 'bg-indigo-50/70 border-indigo-100'
          }`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-xl text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
                userProfile.isAdmin
                  ? 'bg-gradient-to-tr from-amber-600 to-amber-700 ring-2 ring-amber-300'
                  : 'bg-gradient-to-tr from-indigo-600 to-blue-600'
              }`}>
                {userProfile.isAdmin ? '👑' : userProfile.username.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-slate-900 truncate flex items-center gap-1" title={userProfile.username}>
                  <span>{userProfile.username}</span>
                </div>
                <div className={`text-[10px] font-semibold truncate flex items-center gap-1 ${
                  userProfile.isAdmin ? 'text-amber-800 font-bold' : 'text-indigo-700'
                }`} title={userProfile.school}>
                  {userProfile.isAdmin ? (
                    <ShieldCheck className="w-2.5 h-2.5 shrink-0 text-amber-600" />
                  ) : (
                    <School className="w-2.5 h-2.5 shrink-0 text-indigo-500" />
                  )}
                  <span>{userProfile.isAdmin ? 'Quản trị viên THPT' : userProfile.school}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={onOpenLoginModal}
                className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                title="Đổi thông tin đăng nhập"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                title="Đăng xuất"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenLoginModal}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>Đăng nhập tài khoản</span>
          </button>
        )}
      </div>

      {/* 2. Scrollable Body: Features */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
        <div>
          {/* Header */}
          <div className="px-2 mb-2 flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Chức năng ứng dụng
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
                      : 'hover:bg-slate-50 border-transparent text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : `bg-slate-100 ${item.iconColor} group-hover:bg-slate-200/80`
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs sm:text-sm font-bold truncate ${
                            isActive ? 'text-white' : 'text-slate-800'
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
                  {item.badge && (
                    <div className="ml-2 shrink-0 flex items-center gap-1">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
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

        {/* Thống kê chỉ hiển thị khi là Quản trị viên (Cô Trinh) */}
        {isServerHost && (
          <div className="space-y-4 pt-3 border-t border-slate-100 animate-in fade-in duration-300">
            <div className="px-2 flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Khu Vực Quản Trị Viên
              </span>
              <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                Ms. Trinh
              </span>
            </div>

            {/* 1. Thống kê Lượt truy cập toàn trang */}
            <div>
              <div className="px-2 mb-1.5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Thống kê truy cập
                </span>
                <span className="flex items-center gap-1 text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {visitorStats?.activeNow || 2} online
                </span>
              </div>

              <div
                onClick={onOpenVisitorStatsModal}
                className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md shadow-indigo-950/20 border border-indigo-900/60 cursor-pointer hover:border-indigo-500/60 hover:shadow-lg transition-all group"
                title="Nhấp để xem chi tiết thống kê lượt truy cập"
              >
                <div className="flex items-center justify-between text-indigo-200 mb-1">
                  <span className="text-[10.5px] font-bold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span>Tổng lượt truy cập</span>
                  </span>
                  <span className="text-[9px] font-bold text-indigo-300 bg-white/10 px-1.5 py-0.5 rounded-md">
                    Admin
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-1">
                  <div className="text-2xl font-black font-mono tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                    {(visitorStats?.totalVisits || 1280).toLocaleString('vi-VN')}
                  </div>
                  <span className="text-[10px] text-slate-400">lượt</span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10.5px] text-slate-300">
                  <span>Hôm nay: <strong className="text-emerald-400">+{visitorStats?.todayVisits || 42}</strong></span>
                  <span className="text-indigo-300 group-hover:text-white flex items-center gap-0.5 font-bold underline">
                    Xem chi tiết &raquo;
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Thống kê Đăng nhập Theo Trường */}
            <div>
              <div
                onClick={onOpenSchoolStatsModal}
                className="p-3 rounded-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-indigo-950 text-white shadow-md border border-amber-500/40 cursor-pointer hover:border-amber-400 hover:shadow-lg transition-all group"
                title="Nhấp để xem bảng thống kê số lượt đăng nhập từ các trường"
              >
                <div className="flex items-center justify-between text-amber-200 mb-1">
                  <span className="text-[10.5px] font-bold flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Lượt Dùng Theo Trường</span>
                  </span>
                  <span className="text-[9px] font-bold text-amber-300 bg-white/10 px-1.5 py-0.5 rounded-md">
                    Chỉ riêng cô
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Theo dõi 9 trường THPT</span>
                  <span className="text-xs text-amber-400 font-bold group-hover:underline flex items-center gap-0.5">
                    Xem báo cáo &raquo;
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
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
