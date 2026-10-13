import React from 'react';
import {
  X,
  Eye,
  Users,
  Calendar,
  Radio,
  RefreshCw,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { VisitorStats } from '../types';

interface VisitorStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: VisitorStats;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const VisitorStatsModal: React.FC<VisitorStatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onRefresh,
  isRefreshing
}) => {
  if (!isOpen) return null;

  // Calculate device percentages
  const totalDevices =
    (stats.deviceStats?.desktop || 0) +
    (stats.deviceStats?.mobile || 0) +
    (stats.deviceStats?.tablet || 0);

  const desktopPct = totalDevices > 0 ? Math.round(((stats.deviceStats?.desktop || 0) / totalDevices) * 100) : 60;
  const mobilePct = totalDevices > 0 ? Math.round(((stats.deviceStats?.mobile || 0) / totalDevices) * 100) : 35;
  const tabletPct = totalDevices > 0 ? Math.max(0, 100 - desktopPct - mobilePct) : 5;

  // 7-day chart calculations
  const dailyHistory = stats.dailyStats && stats.dailyStats.length > 0 ? stats.dailyStats.slice(-7) : [];
  const maxVisitsInHistory = Math.max(...dailyHistory.map((d) => d.visits), 10);

  // Format date helper (YYYY-MM-DD -> DD/MM)
  const formatShortDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}`;
      }
    } catch {}
    return dateStr;
  };

  // Format last updated time
  const formatLastUpdated = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return 'Vừa xong';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto">
        {/* Header banner */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                    Thống Kê Lượt Truy Cập
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Toàn hệ thống
                  </span>
                </div>
                <p className="text-xs text-indigo-100 mt-0.5">
                  Lưu lượng truy cập thực tế của học sinh ôn thi THPT Quốc Gia từ tất cả người dùng
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Đóng cửa sổ thống kê"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* 4 Main Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* 1. Tổng lượt truy cập */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 border border-indigo-200/80 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-indigo-700">
                <span className="text-[11px] font-bold uppercase tracking-wider">Tổng truy cập</span>
                <Eye className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-indigo-950 font-mono tracking-tight">
                {stats.totalVisits.toLocaleString('vi-VN')}
              </div>
              <p className="text-[10px] text-indigo-600 font-medium">
                Tất cả người dùng
              </p>
            </div>

            {/* 2. Khách riêng biệt */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200/80 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-emerald-700">
                <span className="text-[11px] font-bold uppercase tracking-wider">Khách truy cập</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-950 font-mono tracking-tight">
                {stats.uniqueVisitors.toLocaleString('vi-VN')}
              </div>
              <p className="text-[10px] text-emerald-700 font-medium">
                Thiết bị riêng biệt
              </p>
            </div>

            {/* 3. Truy cập hôm nay */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200/80 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-amber-700">
                <span className="text-[11px] font-bold uppercase tracking-wider">Hôm nay</span>
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-950 font-mono tracking-tight">
                +{stats.todayVisits.toLocaleString('vi-VN')}
              </div>
              <p className="text-[10px] text-amber-700 font-medium">
                Lượt trong ngày
              </p>
            </div>

            {/* 4. Đang trực tuyến */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/60 border border-sky-200/80 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-sky-700">
                <span className="text-[11px] font-bold uppercase tracking-wider">Đang online</span>
                <Radio className="w-4 h-4 text-sky-600" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-2xl sm:text-3xl font-black text-sky-950 font-mono tracking-tight">
                  {stats.activeNow}
                </span>
              </div>
              <p className="text-[10px] text-sky-700 font-medium">
                Đang học cùng bạn
              </p>
            </div>
          </div>

          {/* 7-Day Chart Section */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Lưu lượng 7 ngày gần nhất
                </h4>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                (Đơn vị: lượt truy cập/ngày)
              </span>
            </div>

            {dailyHistory.length > 0 ? (
              <div className="pt-4 pb-2">
                <div className="grid grid-cols-7 gap-2 items-end h-32 sm:h-36">
                  {dailyHistory.map((item, idx) => {
                    const heightPercent = Math.max(12, Math.round((item.visits / maxVisitsInHistory) * 100));
                    const isToday = idx === dailyHistory.length - 1;

                    return (
                      <div key={item.date} className="flex flex-col items-center h-full justify-end group">
                        {/* Tooltip number on hover/active */}
                        <div className="mb-1 text-[11px] font-extrabold text-slate-700 group-hover:text-indigo-600 transition-colors">
                          {item.visits}
                        </div>

                        {/* Bar */}
                        <div className="w-full max-w-[36px] bg-slate-200 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`w-full rounded-t-lg transition-all duration-500 ${
                              isToday
                                ? 'bg-gradient-to-t from-indigo-600 to-indigo-500 shadow-sm shadow-indigo-300'
                                : 'bg-gradient-to-t from-blue-400 to-indigo-400 group-hover:from-indigo-500 group-hover:to-indigo-400'
                            }`}
                            title={`${item.date}: ${item.visits} lượt (${item.unique} khách)`}
                          />
                        </div>

                        {/* Date label */}
                        <span
                          className={`mt-2 text-[10px] font-semibold text-center truncate ${
                            isToday ? 'text-indigo-600 font-extrabold' : 'text-slate-500'
                          }`}
                        >
                          {isToday ? 'Hôm nay' : formatShortDate(item.date)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">
                Đang ghi nhận số liệu những ngày đầu tiên...
              </div>
            )}
          </div>

          {/* Device Usage Breakdown */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Monitor className="w-4 h-4 text-indigo-600" />
              <span>Phân bố thiết bị truy cập</span>
            </h4>

            {/* Segmented bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${desktopPct}%` }}
                className="bg-indigo-600 transition-all duration-500"
                title={`Máy tính: ${desktopPct}%`}
              />
              <div
                style={{ width: `${mobilePct}%` }}
                className="bg-sky-500 transition-all duration-500"
                title={`Điện thoại: ${mobilePct}%`}
              />
              <div
                style={{ width: `${tabletPct}%` }}
                className="bg-purple-500 transition-all duration-500"
                title={`Máy tính bảng: ${tabletPct}%`}
              />
            </div>

            {/* Legend items */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-indigo-600 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 font-bold text-slate-800">
                    <Monitor className="w-3 h-3 text-slate-500" />
                    <span>Máy tính</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{desktopPct}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-sky-500 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 font-bold text-slate-800">
                    <Smartphone className="w-3 h-3 text-slate-500" />
                    <span>Di động</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{mobilePct}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-purple-500 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 font-bold text-slate-800">
                    <Tablet className="w-3 h-3 text-slate-500" />
                    <span>Tablet</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{tabletPct}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Methodology Note */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-2.5 text-xs text-indigo-900">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-indigo-950">
                Đồng bộ hóa an toàn & Bảo vệ quyền riêng tư:
              </span>
              <p className="text-[11px] text-indigo-800 leading-relaxed">
                Hệ thống chỉ đếm lượt truy cập và số phiên học tập tổng quát của học sinh và thầy cô trên toàn quốc mà không thu thập bất kỳ thông tin cá nhân, định danh hay dữ liệu riêng tư nào.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <span>Cập nhật lúc:</span>
            <span className="font-mono font-bold text-slate-700">
              {formatLastUpdated(stats.lastVisitAt)}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
              <span>{isRefreshing ? 'Đang làm mới...' : 'Làm mới số liệu'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
