import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Award,
  Layers,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { VocabularyItem, VocabCategory, normalizeStatus } from '../types';

interface StatsOverviewProps {
  vocabulary: VocabularyItem[];
  onFilterCategory?: (category: VocabCategory | 'ALL') => void;
  onFilterStatus?: (status: string) => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  vocabulary,
  onFilterCategory,
  onFilterStatus
}) => {
  const total = vocabulary.length;
  const mastered = vocabulary.filter((v) => normalizeStatus(v.status) === 'Đã thành thạo').length;
  const learning = vocabulary.filter((v) => normalizeStatus(v.status) === 'Đang học').length;
  const needReview = vocabulary.filter((v) => normalizeStatus(v.status) === 'Chưa thuộc').length;

  const masteredPercent = total > 0 ? Math.round((mastered / total) * 100) : 0;
  const learningPercent = total > 0 ? Math.round((learning / total) * 100) : 0;
  const needReviewPercent = total > 0 ? Math.round((needReview / total) * 100) : 0;

  // Categories count
  const categoryCounts: Record<VocabCategory, number> = {
    'Single word': 0,
    'Phrasal verb': 0,
    'Collocation': 0,
    'Idiom': 0,
    'Preposition': 0
  };

  vocabulary.forEach((v) => {
    if (categoryCounts[v.type] !== undefined) {
      categoryCounts[v.type]++;
    }
  });

  const totalInteractions = vocabulary.reduce((acc, v) => acc + (v.interactionCount || 0), 0);
  const totalQuizDone = vocabulary.reduce((acc, v) => acc + (v.quizTotalCount || 0), 0);
  const totalQuizCorrect = vocabulary.reduce((acc, v) => acc + (v.quizCorrectCount || 0), 0);
  const quizAccuracy = totalQuizDone > 0 ? Math.round((totalQuizCorrect / totalQuizDone) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <span>Tiến trình Ngữ liệu & Độ Thành thạo (EVM Tracking)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Theo dõi phân hóa 3 cấp độ: "Chưa thuộc" (Sai nhiều) • "Đang học" (50-80%) • "Đã thành thạo" (&gt;90%)
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium">Chỉ số thành thạo</span>
            <p className="text-base font-extrabold text-indigo-600 leading-none">{masteredPercent}%</p>
          </div>
          <div className="w-28 sm:w-36 h-3 bg-slate-200 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${masteredPercent}%` }}
              className="bg-emerald-500 transition-all duration-500"
              title={`Đã thành thạo: ${masteredPercent}%`}
            />
            <div
              style={{ width: `${learningPercent}%` }}
              className="bg-amber-400 transition-all duration-500"
              title={`Đang học: ${learningPercent}%`}
            />
            <div
              style={{ width: `${needReviewPercent}%` }}
              className="bg-rose-400 transition-all duration-500"
              title={`Chưa thuộc: ${needReviewPercent}%`}
            />
          </div>
        </div>
      </div>

      {/* 3 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div
          onClick={() => onFilterStatus && onFilterStatus('Đã thành thạo')}
          className="cursor-pointer group p-4 rounded-xl bg-gradient-to-br from-emerald-50/70 to-emerald-100/40 border border-emerald-200/80 hover:border-emerald-300 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Đã thành thạo
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-200">
              {masteredPercent}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{mastered}</span>
            <span className="text-xs text-slate-500">/ {total} mục từ</span>
          </div>
          <p className="text-xs text-emerald-700 mt-2 font-medium">
            Làm đúng liên tục &gt; 90%
          </p>
        </div>

        <div
          onClick={() => onFilterStatus && onFilterStatus('Đang học')}
          className="cursor-pointer group p-4 rounded-xl bg-gradient-to-br from-amber-50/70 to-amber-100/40 border border-amber-200/80 hover:border-amber-300 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              Đang học
            </span>
            <span className="text-xs font-bold text-amber-600 bg-white/80 px-2 py-0.5 rounded-full border border-amber-200">
              {learningPercent}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{learning}</span>
            <span className="text-xs text-slate-500">/ {total} mục từ</span>
          </div>
          <p className="text-xs text-amber-700 mt-2 font-medium">
            Độ chính xác Quiz 50% - 80%
          </p>
        </div>

        <div
          onClick={() => onFilterStatus && onFilterStatus('Chưa thuộc')}
          className="cursor-pointer group p-4 rounded-xl bg-gradient-to-br from-rose-50/70 to-rose-100/40 border border-rose-200/80 hover:border-rose-300 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Chưa thuộc (Cần ôn)
            </span>
            <span className="text-xs font-bold text-rose-600 bg-white/80 px-2 py-0.5 rounded-full border border-rose-200">
              {needReviewPercent}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{needReview}</span>
            <span className="text-xs text-slate-500">/ {total} mục từ</span>
          </div>
          <p className="text-xs text-rose-700 mt-2 font-medium">
            Sai nhiều hoặc chưa làm quiz
          </p>
        </div>
      </div>

      {/* 5 Core Categories Bar */}
      <div className="pt-4 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
          Phân bố 5 nhóm ngôn ngữ chuẩn đề thi THPT:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <button
            onClick={() => onFilterCategory && onFilterCategory('Collocation')}
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50/80 border border-slate-200/70 hover:border-indigo-300 transition-all text-left"
          >
            <div>
              <span className="text-xs font-bold text-slate-800 block">Collocations</span>
              <span className="text-[11px] text-slate-500">Cụm từ cố định</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-xs font-extrabold">
              {categoryCounts['Collocation']}
            </span>
          </button>

          <button
            onClick={() => onFilterCategory && onFilterCategory('Phrasal verb')}
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-sky-50/80 border border-slate-200/70 hover:border-sky-300 transition-all text-left"
          >
            <div>
              <span className="text-xs font-bold text-slate-800 block">Phrasal verbs</span>
              <span className="text-[11px] text-slate-500">Cụm động từ</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-xs font-extrabold">
              {categoryCounts['Phrasal verb']}
            </span>
          </button>

          <button
            onClick={() => onFilterCategory && onFilterCategory('Idiom')}
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-purple-50/80 border border-slate-200/70 hover:border-purple-300 transition-all text-left"
          >
            <div>
              <span className="text-xs font-bold text-slate-800 block">Idioms</span>
              <span className="text-[11px] text-slate-500">Thành ngữ điểm 9+</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-extrabold">
              {categoryCounts['Idiom']}
            </span>
          </button>

          <button
            onClick={() => onFilterCategory && onFilterCategory('Preposition')}
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50/80 border border-slate-200/70 hover:border-emerald-300 transition-all text-left"
          >
            <div>
              <span className="text-xs font-bold text-slate-800 block">Prepositions</span>
              <span className="text-[11px] text-slate-500">Cụm giới từ</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              {categoryCounts['Preposition']}
            </span>
          </button>

          <button
            onClick={() => onFilterCategory && onFilterCategory('Single word')}
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50/80 border border-slate-200/70 hover:border-amber-300 transition-all text-left"
          >
            <div>
              <span className="text-xs font-bold text-slate-800 block">Single words</span>
              <span className="text-[11px] text-slate-500">Từ đơn B1 - C1</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-extrabold">
              {categoryCounts['Single word']}
            </span>
          </button>
        </div>
      </div>

      {/* CEFR Level & Weakness Diagnosis Banner (d3-visualization & educational analytics) */}
      {(() => {
        const cefrCounts = { B1: 0, B2: 0, C1: 0 };
        vocabulary.forEach((v) => {
          if (v.cefrLevel && cefrCounts[v.cefrLevel] !== undefined) {
            cefrCounts[v.cefrLevel]++;
          }
        });

        // Find weakest category
        const unmasteredPerCat: Record<string, number> = {};
        vocabulary.forEach((v) => {
          if (v.status !== 'Đã thành thạo') {
            unmasteredPerCat[v.type] = (unmasteredPerCat[v.type] || 0) + 1;
          }
        });

        let weakestCat = 'Collocation';
        let maxUnmastered = 0;
        Object.entries(unmasteredPerCat).forEach(([cat, count]) => {
          if (count > maxUnmastered) {
            maxUnmastered = count;
            weakestCat = cat;
          }
        });

        return (
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
            {/* CEFR Distribution Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-600">Phân bố độ khó CEFR:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                  B1 (Cơ bản): {cefrCounts.B1} từ
                </span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                  B2 (Khá - Phổ biến THPT): {cefrCounts.B2} từ
                </span>
                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-bold">
                  C1 (Phân loại 9+): {cefrCounts.C1} từ
                </span>
              </div>
            </div>

            {/* Educational Weakness Diagnosis Alert */}
            {maxUnmastered > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-amber-800">
                    Chẩn đoán Sư phạm EVM (Pedagogical Insight):
                  </span>
                  <p className="text-amber-900">
                    Bạn hiện có <strong>{maxUnmastered} từ/cụm từ</strong> thuộc nhóm <strong>{weakestCat}</strong> chưa thành thạo. Trong ma trận đề thi THPT Quốc Gia, nhóm này thường là các câu hỏi bẫy phân hóa điểm 8–9. Hãy tập trung luyện Flashcard và làm bài AI Quiz chuyên biệt cho nhóm này!
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Interaction Summary */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            Tổng lượt lật thẻ: <strong className="text-slate-700">{totalInteractions}</strong>
          </span>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-500" />
            Luyện tập Quiz: <strong className="text-slate-700">{totalQuizDone} lượt</strong> (Chính xác {quizAccuracy}%)
          </span>
        </div>
        <span className="text-indigo-600 font-semibold cursor-pointer hover:underline flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          Mục tiêu: Đạt 100% "Đã thành thạo" trước ngày thi
        </span>
      </div>
    </div>
  );
};
