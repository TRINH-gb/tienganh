import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  KeyRound,
  User,
  School,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  RefreshCw,
  Quote,
  ShieldCheck,
  Lock,
  X,
  Award,
  ChevronRight
} from 'lucide-react';
import {
  SCHOOL_OPTIONS,
  getRandomSlogan,
  getStoredUserProfile,
  saveStoredUserProfile,
  recordLoginOnServer
} from '../services/authService';
import { testApiKey } from '../services/geminiService';
import { UserProfile, SchoolOption } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: UserProfile) => void;
  isMandatory?: boolean;
  onOpenSchoolStats?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  isMandatory = false,
  onOpenSchoolStats
}) => {
  const [username, setUsername] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [school, setSchool] = useState<SchoolOption | ''>('');
  const [customSchool, setCustomSchool] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);

  // Inspirational slogan that rotates each time the modal opens
  const [slogan, setSlogan] = useState(() => getRandomSlogan());
  const [isRotatingSlogan, setIsRotatingSlogan] = useState<boolean>(false);

  // Connection testing state
  const [isTestingKey, setIsTestingKey] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSlogan(getRandomSlogan());
      const existing = getStoredUserProfile();
      if (existing) {
        setUsername(existing.username || '');
        setApiKey(existing.apiKey || '');
        setSchool((existing.school as SchoolOption) || '');
        setCustomSchool(existing.customSchool || '');
      }
      setTestResult(null);
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleShuffleSlogan = () => {
    setIsRotatingSlogan(true);
    setTimeout(() => {
      let next = getRandomSlogan();
      while (next.en === slogan.en && SCHOOL_OPTIONS.length > 1) {
        next = getRandomSlogan();
      }
      setSlogan(next);
      setIsRotatingSlogan(false);
    }, 200);
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setTestResult({
        success: false,
        message: 'Vui lòng dán mã AI key trước khi kiểm tra.'
      });
      return;
    }

    setIsTestingKey(true);
    setTestResult(null);
    setErrorMessage(null);

    const result = await testApiKey(apiKey.trim());
    setIsTestingKey(false);
    setTestResult(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanUsername = username.trim();
    const cleanApiKey = apiKey.trim();

    if (!cleanUsername) {
      setErrorMessage('Vui lòng nhập họ và tên hoặc tên đăng nhập của bạn.');
      return;
    }

    if (!school) {
      setErrorMessage('Vui lòng chọn trường THPT của bạn trong danh sách.');
      return;
    }

    if (school === 'Khác' && !customSchool.trim()) {
      setErrorMessage('Vui lòng nhập tên trường THPT cụ thể của bạn.');
      return;
    }

    if (!cleanApiKey) {
      setErrorMessage('Vui lòng nhập mã AI Key (Google Gemini API Key) để kích hoạt ứng dụng.');
      return;
    }

    setIsSubmitting(true);

    const profile: UserProfile = {
      username: cleanUsername,
      school: school,
      customSchool: school === 'Khác' ? customSchool.trim() : undefined,
      apiKey: cleanApiKey,
      loginAt: new Date().toISOString()
    };

    saveStoredUserProfile(profile);
    await recordLoginOnServer(profile);

    setIsSubmitting(false);
    onLoginSuccess(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={() => {
          if (!isMandatory) onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto flex flex-col">
        {/* 1. Top Header with Premium Gradient & Admin Button */}
        <div className="relative px-6 py-5 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-900 text-white border-b border-indigo-900/40">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-blue-600 to-indigo-400 p-0.5 shadow-lg shadow-indigo-950/50">
                <div className="w-full h-full bg-slate-950/40 backdrop-blur-md rounded-[14px] flex items-center justify-center text-white">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
                    Đăng Nhập EVM
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    THPTQG 2026
                  </span>
                </div>
                <p className="text-xs text-indigo-200/90 font-medium">
                  Kiến Trúc Sư Từ Vựng Đề Thi Tiếng Anh • Ms. Trinh (THPT Võ Thị Sáu BR-VT)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Nút Xem Thống Kê Trường Dành Cho Quản Trị Viên */}
              {onOpenSchoolStats && (
                <button
                  type="button"
                  onClick={onOpenSchoolStats}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold transition-all shadow-sm cursor-pointer hover:scale-105"
                  title="Nhấp để xem bảng thống kê số lượt đăng nhập của các trường (Chỉ riêng máy chủ quản trị)"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Thống kê trường</span>
                  <span className="sm:hidden">Thống kê</span>
                </button>
              )}

              {!isMandatory && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-white/70 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  title="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. Inspiring English Quote Card for Students */}
        <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-100/60 border-b border-amber-200/80 px-5 sm:px-6 py-4 relative shadow-inner">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Quote className="w-4 h-4 fill-amber-700/20" />
            </div>

            <div className="flex-1 min-w-0 pr-7">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                  Daily English Inspiration
                </span>
                <span className="text-[11px] font-bold text-amber-800/80">
                  — {slogan.author}
                </span>
              </div>

              <p className="text-[13px] sm:text-sm font-extrabold text-slate-900 italic leading-snug tracking-tight">
                &ldquo;{slogan.en}&rdquo;
              </p>
              <p className="text-xs text-amber-950 mt-1 font-semibold leading-relaxed">
                👉 {slogan.vi}
              </p>
            </div>

            <button
              type="button"
              onClick={handleShuffleSlogan}
              className="absolute right-3.5 top-3.5 p-2 rounded-xl text-amber-800 hover:text-amber-950 hover:bg-amber-200/60 transition-all cursor-pointer"
              title="Đổi câu truyền cảm hứng khác"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotatingSlogan ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* 3. Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4.5 overflow-y-auto">
          {/* Tên đăng nhập */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tên đăng nhập / Họ và tên <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-indigo-600">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ví dụ: Nguyễn Hoàng Nam - 12A1"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 font-bold placeholder:text-slate-400 placeholder:font-normal"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Nhập tên học sinh hoặc thầy cô để lưu trữ lịch sử làm bài và sổ tay từ vựng.
            </p>
          </div>

          {/* Trường THPT */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Trường THPT <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-indigo-600">
                <School className="w-4 h-4" />
              </div>
              <select
                value={school}
                onChange={(e) => setSchool(e.target.value as SchoolOption)}
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 font-bold cursor-pointer"
                required
              >
                <option value="" disabled>
                  -- Chọn trường THPT của bạn --
                </option>
                {SCHOOL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="font-medium text-slate-800">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom school text input if 'Khác' is selected */}
            {school === 'Khác' && (
              <div className="mt-2.5 animate-in fade-in duration-200">
                <label className="block text-[11px] font-bold text-indigo-900 mb-1">
                  Nhập tên trường THPT cụ thể của bạn:
                </label>
                <input
                  type="text"
                  value={customSchool}
                  onChange={(e) => setCustomSchool(e.target.value)}
                  placeholder="Ví dụ: THPT Chuyên Lê Quý Đôn, THPT Vũng Tàu..."
                  className="w-full px-3.5 py-2 bg-indigo-50/60 border border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 font-bold"
                  required={school === 'Khác'}
                />
              </div>
            )}
          </div>

          {/* Mã AI Key */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mã AI Key (Google Gemini API Key) <span className="text-rose-500">*</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
              >
                <span>Lấy mã miễn phí (1 phút)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-indigo-600">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setTestResult(null);
                }}
                placeholder="Dán mã API Key (bắt đầu bằng AIzaSy...)"
                className="w-full pl-10 pr-20 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-mono transition-all text-slate-900"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                  title={showKey ? 'Ẩn mã key' : 'Hiện mã key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTestingKey || !apiKey.trim()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {isTestingKey ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang kiểm tra kết nối AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kiểm tra kết nối AI</span>
                  </>
                )}
              </button>
              <span className="text-[10.5px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Lưu trữ bảo mật trong trình duyệt
              </span>
            </div>

            {/* Test result status banner */}
            {testResult && (
              <div
                className={`mt-2.5 p-2.5 rounded-xl border text-xs flex items-start space-x-2 animate-in fade-in duration-200 ${
                  testResult.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span className="font-semibold">{testResult.message}</span>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2 font-bold animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-extrabold text-sm shadow-md shadow-indigo-300/40 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang ghi nhận đăng nhập...</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4" />
                  <span>Đăng Nhập & Bắt Đầu Học Ngay</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* 4. Footer Admin Access Banner ("Chỉ riêng tôi thấy") */}
        {onOpenSchoolStats && (
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Khu vực dành riêng cho Giáo viên / Quản trị viên máy chủ</span>
            </div>

            <button
              type="button"
              onClick={onOpenSchoolStats}
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer"
            >
              <span>Xem thống kê các trường</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
