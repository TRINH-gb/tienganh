import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  X,
  Loader2,
  Cpu,
  Layers,
  HelpCircle,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import {
  SUPPORTED_MODELS,
  getStoredApiKey,
  setStoredApiKey,
  getStoredModel,
  setStoredModel,
  testApiKey
} from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: () => void;
  isMandatory?: boolean;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onKeySaved,
  isMandatory = false
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>(getStoredModel());
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
      setSelectedModel(getStoredModel());
      setTestResult(null);
      setSaveSuccessMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!apiKey.trim()) {
      setTestResult({
        success: false,
        message: 'Vui lòng nhập API Key trước khi lưu.'
      });
      return;
    }

    setStoredApiKey(apiKey.trim());
    setStoredModel(selectedModel);
    setSaveSuccessMsg('Đã lưu cấu hình API Key và Model thành công vào trình duyệt!');
    setTestResult(null);

    if (onKeySaved) {
      onKeySaved();
    }

    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setTestResult({
        success: false,
        message: 'Vui lòng nhập API Key để kiểm tra kết nối.'
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);
    setSaveSuccessMsg(null);

    const result = await testApiKey(apiKey.trim(), selectedModel);
    setIsTesting(false);
    setTestResult(result);
  };

  const handleClearKey = () => {
    setStoredApiKey('');
    setApiKey('');
    setTestResult(null);
    setSaveSuccessMsg('Đã xóa API Key khỏi bộ nhớ trình duyệt.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Thiết lập Model & API Key
              </h2>
              <p className="text-xs text-slate-500">
                Cấu hình API Key Gemini cá nhân & danh sách model dự phòng tự động
              </p>
            </div>
          </div>
          {!isMandatory && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Notice & How to get API Key */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-amber-900 leading-relaxed">
            <p className="font-bold">
              Lấy API Key Gemini miễn phí để sử dụng ứng dụng:
            </p>
            <p className="text-amber-800">
              Mỗi người dùng sử dụng API Key riêng từ Google AI Studio để đảm bảo tốc độ và không bị nghẽn quota. Khóa được lưu trực tiếp tại trình duyệt của bạn (<code>localStorage</code>), tuyệt đối bảo mật.
            </p>
            <a
              href="https://aistudio.google.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-indigo-700 hover:text-indigo-900 underline pt-1"
            >
              <span>Truy cập Google AI Studio lấy Key ngay (miễn phí)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Section 1: AI Model Selection Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span>1. Chọn Model AI Ưu tiên (Kèm Fallback dự phòng)</span>
            </label>
            <span className="text-[11px] text-slate-400">
              Tự động fallback nếu quá tải
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SUPPORTED_MODELS.map((model) => {
              const isSelected = selectedModel === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${model.badgeClass}`}
                      >
                        {model.tag}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      )}
                    </div>
                    <h3 className="font-bold text-xs text-slate-900">
                      {model.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug line-clamp-3">
                      {model.description}
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <code>{model.id}</code>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>
              <strong>Cơ chế tự động dự phòng:</strong> Nếu model hiện tại bị giới hạn tần suất (429 RESOURCE_EXHAUSTED) hoặc quá tải, hệ thống sẽ tự động chuyển sang model tiếp theo trong chuỗi fallback mà không làm gián đoạn bài học.
            </span>
          </div>
        </div>

        {/* Section 2: API Key Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-indigo-600" />
            <span>2. Nhập Google Gemini API Key</span>
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Dán mã AIzaSy... vào đây"
              className="w-full px-4 py-3 pr-24 text-sm font-mono border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                title={showKey ? 'Ẩn key' : 'Xem key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Lưu an toàn trong bộ nhớ trình duyệt cá nhân (localStorage)
            </span>
            {apiKey && (
              <button
                type="button"
                onClick={handleClearKey}
                className="text-rose-600 hover:underline cursor-pointer font-medium"
              >
                Xóa Key này
              </button>
            )}
          </div>
        </div>

        {/* Test Result / Feedback Messages */}
        {testResult && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-medium flex items-center gap-2.5 ${
              testResult.success
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="break-all">{testResult.message}</span>
          </div>
        )}

        {saveSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            disabled={isTesting || !apiKey.trim()}
            onClick={handleTestConnection}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {isTesting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Đang kiểm tra kết nối...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Kiểm tra kết nối</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!isMandatory && (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
              >
                Đóng
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold shadow-md shadow-indigo-200 cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Lưu & Sử dụng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
