import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { VocabularyItem, WordDeepDive } from '../types';
import { speakEnglish } from '../utils/tts';
import { expandWordWithFallback, getStoredApiKey } from '../services/geminiService';

interface WordDetailModalProps {
  item: VocabularyItem | null;
  onClose: () => void;
  accent: 'UK' | 'US';
  onOpenApiKeyModal?: () => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  item,
  onClose,
  accent,
  onOpenApiKeyModal
}) => {
  const [deepDiveData, setDeepDiveData] = useState<WordDeepDive | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!item) {
      setDeepDiveData(null);
      return;
    }

    const currentKey = getStoredApiKey();
    if (!currentKey) {
      setErrorMsg('Vui lòng thiết lập Google Gemini API Key để tra cứu mở rộng ngữ liệu chuyên sâu.');
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setErrorMsg(null);

    expandWordWithFallback(item.term, item.context)
      .then((data) => {
        if (!isMounted) return;
        setDeepDiveData(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        setErrorMsg(err.message || 'Không thể tải dữ liệu mở rộng từ vựng.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-100 text-indigo-800">
                {item.type}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs font-black bg-slate-100 text-slate-700">
                CEFR {item.cefrLevel}
              </span>
              <span className="text-xs text-slate-400">
                {item.status}
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {item.term}
              </h2>
              <button
                type="button"
                onClick={() => speakEnglish(item.term, accent)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 cursor-pointer"
                title={`Nghe phát âm (${accent})`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="font-mono text-xs text-slate-500">{item.ipa}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meaning and Exam Context */}
        <div className="space-y-3">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Nghĩa tiếng Việt:
            </span>
            <p className="text-base font-bold text-slate-900 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
              {item.meaning}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Ngữ cảnh trong đề:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              "{item.context.replace(/\*\*/g, '')}"
            </div>
          </div>
        </div>

        {/* AI Deep Dive Section */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Phân tích chuyên sâu & Mẹo thi
            </h3>
          </div>

          {isLoading ? (
            <div className="p-8 rounded-2xl bg-slate-50 text-center space-y-2 border border-slate-200">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mx-auto" />
              <p className="text-xs text-slate-600 font-medium">
                AI đang trích xuất họ từ (Word Family), Collocations & Bẫy đề thi THPT...
              </p>
            </div>
          ) : errorMsg ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2">
              <p className="font-semibold">{errorMsg}</p>
              {onOpenApiKeyModal && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenApiKeyModal();
                  }}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Cài đặt API Key ngay
                </button>
              )}
            </div>
          ) : deepDiveData ? (
            <div className="space-y-4 text-xs sm:text-sm">
              {/* Word Family */}
              {deepDiveData.wordFamily && deepDiveData.wordFamily.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Họ từ vựng (Word Family):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {deepDiveData.wordFamily.map((wf, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs"
                      >
                        <span className="text-[10px] font-bold text-indigo-600 uppercase block">
                          {wf.pos}
                        </span>
                        <strong className="text-xs text-slate-900 block font-bold">
                          {wf.word}
                        </strong>
                        <span className="text-[11px] text-slate-500 line-clamp-1">
                          {wf.meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Exam Traps */}
              {deepDiveData.examTraps && deepDiveData.examTraps.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2">
                  <span className="font-bold text-rose-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    Bẫy Đề thi THPT Thường Gặp (Common Exam Traps):
                  </span>
                  <ul className="space-y-1.5 pl-4 list-disc text-rose-950 text-xs">
                    {deepDiveData.examTraps.map((trap, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {trap}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Collocations */}
              {deepDiveData.commonCollocations && deepDiveData.commonCollocations.length > 0 && (
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/70 space-y-2">
                  <span className="font-bold text-indigo-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                    Cụm Collocation Hay Gặp trong Đề thi:
                  </span>
                  <div className="space-y-2 pt-1">
                    {deepDiveData.commonCollocations.map((col, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-indigo-100 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-indigo-900 font-bold">
                            {col.phrase}
                          </strong>
                          <span className="text-slate-600 font-medium">
                            {col.meaning}
                          </span>
                        </div>
                        {col.example && (
                          <p className="text-[11px] text-slate-500 italic mt-1">
                            "{col.example}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sample Sentences */}
              {deepDiveData.sampleSentences && deepDiveData.sampleSentences.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                    Câu ví dụ điểm cao:
                  </span>
                  <div className="space-y-2">
                    {deepDiveData.sampleSentences.map((s, idx) => (
                      <div key={idx} className="text-xs">
                        <p className="text-slate-900 font-medium">"{s.en}"</p>
                        <p className="text-slate-500 italic mt-0.5">→ {s.vi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
