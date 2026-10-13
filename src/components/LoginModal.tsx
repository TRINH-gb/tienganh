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
  X
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
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  isMandatory = false
}) => {
  const [username, setUsername] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [school, setSchool] = useState<SchoolOption | ''>('');
  const [customSchool, setCustomSchool] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);

  // Inspirational slogan that rotates each time the modal opens
  const [slogan, setSlogan] = useState(() => getRandomSlogan());

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
      // Pick a fresh inspiring slogan for this login session
      setSlogan(getRandomSlogan());

      // Preload current user profile if available
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
    let next = getRandomSlogan();
    while (next.en === slogan.en && SCHOOL_OPTIONS.length > 1) {
      next = getRandomSlogan();
    }
    setSlogan(next);
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setTestResult({
        success: false,
        message: 'Vui lòng nhập mã AI key để kiểm tra kết nối.'
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
      setErrorMessage('Vui lòng nhập tên đăng nhập hoặc họ và tên của bạn.');
      return;
    }

    if (!cleanApiKey) {
      setErrorMessage('Vui lòng nhập mã AI Key (Google Gemini API Key) để kích hoạt ứng dụng.');
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

    setIsSubmitting(true);

    const profile: UserProfile = {
      username: cleanUsername,
      school: school,
      customSchool: school === 'Khác' ? customSchool.trim() : undefined,
      apiKey: cleanApiKey,
      loginAt: new Date().toISOString()
    };

    // Save locally
    saveStoredUserProfile(profile);

    // Record login event on the server
    await recordLoginOnServer(profile);

    setIsSubmitting(false);
    onLoginSuccess(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => {
          if (!isMandatory) onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto">
        {/* Top Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  Đăng Nhập EVM
                </h3>
                <p className="text-xs text-indigo-100">
                  Hệ thống Kiến trúc Sư Từ vựng Đề thi THPT Quốc Gia
                </p>
              </div>
            </div>

            {!isMandatory && (
              <button
                type="button"
                onClick={onClose}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Inspirational Slogan Banner for Students */}
        <div className="bg-gradient-to-r from-amber-50 via-amber-100/60 to-orange-50 border-b border-amber-200/70 px-5 py-3.5 relative">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-xl bg-amber-500/15 text-amber-700 shrink-0 mt-0.5">
              <Quote className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded">
                  Daily English Inspiration
                </span>
                <span className="text-[11px] font-bold text-amber-700">
                  — {slogan.author}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-bold text-slate-800 italic leading-snug">
                &ldquo;{slogan.en}&rdquo;
              </p>
              <p className="text-[11.5px] text-amber-900 mt-1 font-medium leading-relaxed">
                {slogan.vi}
              </p>
            </div>
            <button
              type="button"
              onClick={handleShuffleSlogan}
              className="absolute right-3 top-3 p-1.5 rounded-lg text-amber-700 hover:text-amber-900 hover:bg-amber-200/50 transition-colors"
              title="Đổi câu truyền cảm hứng khác"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* 1. Tên đăng nhập */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tên đăng nhập / Họ và tên <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn An - Lớp 12A1"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-400"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Nhập tên học sinh hoặc thầy/cô để cá nhân hóa kết quả học tập và sổ tay từ vựng.
            </p>
          </div>

          {/* 2. Tên trường */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Trường THPT <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <School className="w-4 h-4" />
              </div>
              <select
                value={school}
                onChange={(e) => setSchool(e.target.value as SchoolOption)}
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 font-medium cursor-pointer"
                required
              >
                <option value="" disabled>
                  -- Chọn trường THPT của bạn --
                </option>
                {SCHOOL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom school text input if 'Khác' is selected */}
            {school === 'Khác' && (
              <div className="mt-2.5 animate-in fade-in duration-200">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nhập tên trường THPT của bạn:
                </label>
                <input
                  type="text"
                  value={customSchool}
                  onChange={(e) => setCustomSchool(e.target.value)}
                  placeholder="Ví dụ: THPT Chuyên Lê Quý Đôn, THPT Vũng Tàu..."
                  className="w-full px-3.5 py-2 bg-indigo-50/50 border border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900"
                  required={school === 'Khác'}
                />
              </div>
            )}
          </div>

          {/* 3. Mã AI Key */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mã AI Key (Google Gemini API Key) <span className="text-rose-500">*</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Lấy mã miễn phí</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setTestResult(null);
                }}
                placeholder="Dán mã AI Key (AIzaSy...)"
                className="w-full pl-10 pr-20 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-mono transition-all text-slate-900"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
                  title={showKey ? 'Ẩn mã key' : 'Hiện mã key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTestingKey || !apiKey.trim()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {isTestingKey ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang kiểm tra kết nối...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kiểm tra kết nối AI</span>
                  </>
                )}
              </button>
              <span className="text-[10.5px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Lưu an toàn trong trình duyệt
              </span>
            </div>

            {/* Test result banner */}
            {testResult && (
              <div
                className={`mt-2 p-2.5 rounded-xl border text-xs flex items-start space-x-2 animate-in fade-in duration-200 ${
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
                <span className="font-medium">{testResult.message}</span>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2 font-medium animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-200 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang xử lý đăng nhập...</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4" />
                  <span>Đăng Nhập & Bắt Đầu Học</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
