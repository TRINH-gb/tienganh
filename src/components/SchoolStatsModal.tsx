import React, { useState, useEffect } from 'react';
import {
  X,
  School,
  Users,
  ShieldCheck,
  RefreshCw,
  Download,
  Trash2,
  Lock,
  KeyRound,
  TrendingUp,
  Clock,
  Laptop,
  Smartphone,
  Tablet,
  CheckCircle2,
  AlertTriangle,
  Award
} from 'lucide-react';
import { SchoolLoginStats, SchoolOption } from '../types';
import {
  fetchSchoolStats,
  verifyAdminPasscode,
  resetSchoolStatsOnServer,
  checkServerHostStatus,
  SCHOOL_OPTIONS
} from '../services/authService';

interface SchoolStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isServerHost: boolean;
}

export const SchoolStatsModal: React.FC<SchoolStatsModalProps> = ({
  isOpen,
  onClose,
  isServerHost: initialIsServerHost
}) => {
  const [stats, setStats] = useState<SchoolLoginStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(initialIsServerHost);
  const [adminPin, setAdminPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState<string>('ALL');
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const loadData = async () => {
    setIsRefreshing(true);
    const hostStatus = await checkServerHostStatus();
    setIsAuthorized(hostStatus);

    if (hostStatus) {
      const data = await fetchSchoolStats();
      if (data) {
        setStats(data);
      }
    } else {
      setStats(null);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUnlockWithPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    if (!adminPin.trim()) return;

    const success = await verifyAdminPasscode(adminPin.trim());
    if (success) {
      setIsAuthorized(true);
      await loadData();
    } else {
      setPinError('Mã PIN quản trị máy chủ không chính xác.');
    }
  };

  const handleResetStats = async () => {
    const success = await resetSchoolStatsOnServer();
    if (success) {
      setShowResetConfirm(false);
      await loadData();
    }
  };

  const handleExportCSV = () => {
    if (!stats) return;

    // Build CSV content with UTF-8 BOM
    let csv = '\uFEFF';
    csv += 'BÁO CÁO THỐNG KÊ SỐ LƯỢT ĐĂNG NHẬP SỬ DỤNG APP THEO TRƯỜNG\r\n';
    csv += `Thời gian xuất báo cáo: ${new Date().toLocaleString('vi-VN')}\r\n`;
    csv += `Tổng số lượt đăng nhập toàn hệ thống: ${stats.totalLogins}\r\n`;
    csv += `Số người dùng khác nhau: ${stats.uniqueUsersCount}\r\n\r\n`;

    csv += '--- BẢNG THỐNG KÊ THEO TỪNG TRƯỜNG THPT ---\r\n';
    csv += 'STT,Tên Trường THPT,Số Lượt Đăng Nhập,Tỷ Lệ Phần Trăm (%)\r\n';

    const total = Math.max(stats.totalLogins, 1);
    const sortedSchools = [...SCHOOL_OPTIONS].sort((a, b) => {
      const countA = stats.schoolCounts[a] || 0;
      const countB = stats.schoolCounts[b] || 0;
      return countB - countA;
    });

    sortedSchools.forEach((school, index) => {
      const count = stats.schoolCounts[school] || 0;
      const pct = ((count / total) * 100).toFixed(1);
      csv += `${index + 1},"${school}",${count},${pct}%\r\n`;
    });

    if (stats.customSchoolCounts && Object.keys(stats.customSchoolCounts).length > 0) {
      csv += '\r\n--- CHI TIẾT CÁC TRƯỜNG KHÁC ---\r\n';
      csv += 'Tên trường khác,Số lượt đăng nhập\r\n';
      Object.entries(stats.customSchoolCounts).forEach(([name, count]) => {
        csv += `"${name}",${count}\r\n`;
      });
    }

    if (stats.recentLogins && stats.recentLogins.length > 0) {
      csv += '\r\n--- NHẬT KÝ ĐĂNG NHẬP GẦN ĐÂY ---\r\n';
      csv += 'Thời gian,Tên đăng nhập,Trường,Ghi chú trường khác,Thiết bị\r\n';
      stats.recentLogins.forEach((log) => {
        const time = new Date(log.timestamp).toLocaleString('vi-VN');
        csv += `"${time}","${log.username}","${log.school}","${log.customSchool || ''}","${log.deviceType || 'desktop'}"\r\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `evm-thong-ke-dang-nhap-theo-truong-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalLogins = stats?.totalLogins || 0;
  const sortedSchools = [...SCHOOL_OPTIONS].sort((a, b) => {
    const countA = stats?.schoolCounts[a] || 0;
    const countB = stats?.schoolCounts[b] || 0;
    return countB - countA;
  });

  const topSchool = sortedSchools[0] ? {
    name: sortedSchools[0],
    count: stats?.schoolCounts[sortedSchools[0]] || 0
  } : null;

  const filteredLogs = (stats?.recentLogins || []).filter((log) => {
    if (selectedSchoolFilter === 'ALL') return true;
    return log.school === selectedSchoolFilter;
  });

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return iso;
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

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/60 shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 backdrop-blur-md flex items-center justify-center text-amber-400 border border-indigo-400/30 shadow-inner">
                <School className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                    Thống Kê Đăng Nhập Theo Trường
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30 text-[10.5px] font-bold">
                    <ShieldCheck className="w-3 h-3 text-amber-300" />
                    Chỉ Máy Chủ Quản Trị
                  </span>
                </div>
                <p className="text-xs text-indigo-200/80 mt-0.5">
                  Giám sát độc quyền số lượt truy cập và học tập của học sinh từ các trường THPT
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthorized && (
                <>
                  <button
                    type="button"
                    onClick={loadData}
                    disabled={isRefreshing}
                    className="p-2 rounded-xl text-indigo-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Làm mới dữ liệu"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="p-2 rounded-xl text-indigo-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Xuất file CSV báo cáo"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* If NOT authorized */}
          {!isAuthorized ? (
            <div className="max-w-md mx-auto py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-800">
                  Xác Thực Quản Trị Viên
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Vui lòng nhập mật khẩu quản trị viên để mở khóa bảng thống kê.
                </p>
              </div>

              <form onSubmit={handleUnlockWithPin} className="space-y-3 pt-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Nhập mật khẩu quản trị viên..."
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
                    autoFocus
                  />
                </div>

                {pinError && (
                  <p className="text-xs text-rose-600 font-bold">{pinError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  Xác Thực & Mở Khóa Thống Kê
                </button>
              </form>
            </div>
          ) : isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3 text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
              <span className="text-sm font-medium">Đang tải dữ liệu từ máy chủ...</span>
            </div>
          ) : (
            <>
              {/* Top 3 Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                      Tổng Lượt Đăng Nhập
                    </span>
                    <div className="text-2xl font-black text-slate-900 mt-0.5">
                      {totalLogins.toLocaleString('vi-VN')}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {stats?.uniqueUsersCount || 0} học sinh / người dùng
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                      Trường Sử Dụng Nhiều Nhất
                    </span>
                    <div className="text-sm font-extrabold text-slate-900 truncate mt-0.5" title={topSchool?.name}>
                      {topSchool?.name || 'Chưa có'}
                    </div>
                    <span className="text-[11px] text-amber-700 font-bold">
                      {topSchool?.count || 0} lượt đăng nhập
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      Lần Đăng Nhập Gần Nhất
                    </span>
                    <div className="text-xs font-bold text-slate-800 mt-1">
                      {stats?.lastLoginAt ? formatTime(stats.lastLoginAt) : 'Vừa xong'}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      Thời gian thực
                    </span>
                  </div>
                </div>
              </div>

              {/* Main School Breakdown Section */}
              <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 bg-white shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-2">
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-800 flex items-center gap-2">
                      <School className="w-4 h-4 text-indigo-600" />
                      <span>Số Lượng Đăng Nhập Chi Tiết Theo Từng Trường</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Tỷ lệ phần trăm và tổng số lượt học viên tham gia học tập
                    </p>
                  </div>

                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 self-start sm:self-auto">
                    {SCHOOL_OPTIONS.length} lựa chọn trường THPT
                  </span>
                </div>

                <div className="divide-y divide-slate-100 mt-2">
                  {sortedSchools.map((schoolName, idx) => {
                    const count = stats?.schoolCounts[schoolName] || 0;
                    const pct = totalLogins > 0 ? Math.round((count / totalLogins) * 100) : 0;
                    const isTop1 = idx === 0 && count > 0;

                    return (
                      <div
                        key={schoolName}
                        className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 sm:w-1/2">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                              isTop1
                                ? 'bg-amber-500 text-white shadow-xs'
                                : idx === 1 && count > 0
                                ? 'bg-slate-300 text-slate-800'
                                : idx === 2 && count > 0
                                ? 'bg-amber-700/60 text-white'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <span className="text-xs sm:text-sm font-bold text-slate-800 block truncate">
                              {schoolName}
                            </span>
                            {schoolName === 'Khác' && stats?.customSchoolCounts && Object.keys(stats.customSchoolCounts).length > 0 && (
                              <span className="text-[10.5px] text-indigo-600 block truncate">
                                Gồm: {Object.keys(stats.customSchoolCounts).join(', ')}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 sm:w-1/2 justify-between sm:justify-end">
                          {/* Progress Bar */}
                          <div className="flex-1 max-w-[180px] bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isTop1 ? 'bg-amber-500' : 'bg-indigo-600'
                              }`}
                              style={{ width: `${Math.max(pct, count > 0 ? 4 : 0)}%` }}
                            />
                          </div>

                          <div className="flex items-baseline gap-1.5 shrink-0 text-right min-w-[70px]">
                            <span className="text-sm font-extrabold text-slate-900 font-mono">
                              {count}
                            </span>
                            <span className="text-[11px] text-slate-400">lượt</span>
                            <span className="text-[10px] font-bold text-slate-500 ml-1">
                              ({pct}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Login Log Table */}
              <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 bg-white shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-2">
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-800 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>Nhật Ký Đăng Nhập Gần Đây</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Ghi nhận lượt truy cập thực tế theo từng học sinh
                    </p>
                  </div>

                  {/* Filter select */}
                  <select
                    value={selectedSchoolFilter}
                    onChange={(e) => setSelectedSchoolFilter(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="ALL">Tất cả các trường</option>
                    {SCHOOL_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-3 overflow-x-auto">
                  {filteredLogs.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      Chưa có lượt đăng nhập nào từ bộ lọc này.
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-2.5 px-3">Thời gian</th>
                          <th className="py-2.5 px-3">Tên học sinh</th>
                          <th className="py-2.5 px-3">Trường THPT</th>
                          <th className="py-2.5 px-3 text-right">Thiết bị</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                        {filteredLogs.slice(0, 25).map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-2.5 px-3 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                              {formatTime(log.timestamp)}
                            </td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">
                              {log.username}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="inline-block px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-100">
                                {log.school}
                                {log.customSchool ? ` (${log.customSchool})` : ''}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                                {log.deviceType === 'mobile' ? (
                                  <>
                                    <Smartphone className="w-3 h-3 text-slate-400" />
                                    <span>Mobile</span>
                                  </>
                                ) : log.deviceType === 'tablet' ? (
                                  <>
                                    <Tablet className="w-3 h-3 text-slate-400" />
                                    <span>Tablet</span>
                                  </>
                                ) : (
                                  <>
                                    <Laptop className="w-3 h-3 text-slate-400" />
                                    <span>Máy tính</span>
                                  </>
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Action Buttons & Server Reset footer */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Báo Cáo CSV (Excel)</span>
                  </button>

                  <button
                    type="button"
                    onClick={loadData}
                    disabled={isRefreshing}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>Làm mới</span>
                  </button>
                </div>

                <div>
                  {!showResetConfirm ? (
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Đặt lại dữ liệu kiểm thử</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 animate-in fade-in duration-150">
                      <span className="text-[11px] text-rose-600 font-bold">Xác nhận xóa hết?</span>
                      <button
                        type="button"
                        onClick={handleResetStats}
                        className="px-2 py-1 bg-rose-600 text-white rounded-lg text-[11px] font-bold hover:bg-rose-700"
                      >
                        Đồng ý
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="px-2 py-1 bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold"
                      >
                        Hủy
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
