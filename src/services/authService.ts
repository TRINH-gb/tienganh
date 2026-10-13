import { SchoolOption, UserProfile, SchoolLoginStats, SchoolLoginRecord } from '../types';
import { setStoredApiKey } from './geminiService';

export const SCHOOL_OPTIONS: SchoolOption[] = [
  'THPT Võ Thị Sáu Bà Rịa - Vũng Tàu',
  'THPT Xuyên Mộc',
  'THPT Hòa Bình',
  'THPT Phước Bửu',
  'THPT Long Hải Phước Tỉnh',
  'THPT Minh Đạm',
  'THPT Dương Bạch Mai',
  'THPT Trần Phú',
  'THPT Nguyễn Du',
  'Khác'
];

export const INSPIRATIONAL_SLOGANS = [
  {
    en: 'Success is the sum of small efforts, repeated day in and day out.',
    vi: 'Thành công là tổng hòa của những nỗ lực nhỏ bé, được lặp lại kiên trì mỗi ngày.',
    author: 'Robert Collier'
  },
  {
    en: 'The future belongs to those who believe in the beauty of their dreams.',
    vi: 'Tương lai thuộc về những ai dám tin tưởng vào vẻ đẹp của ước mơ chính mình.',
    author: 'Eleanor Roosevelt'
  },
  {
    en: 'Believe you can and you’re halfway there.',
    vi: 'Chỉ cần bạn tin rằng mình làm được, bạn đã đi được một nửa chặng đường.',
    author: 'Theodore Roosevelt'
  },
  {
    en: 'It always seems impossible until it is done.',
    vi: 'Mọi điều tưởng chừng bất khả thi cho đến khi bạn quyết tâm hoàn thành nó.',
    author: 'Nelson Mandela'
  },
  {
    en: 'Small daily improvements over time lead to stunning results.',
    vi: 'Những tiến bộ nhỏ bé mỗi ngày sẽ tích lũy thành kỳ tích vượt bậc trong kỳ thi.',
    author: 'Robin Sharma'
  },
  {
    en: 'Don’t count the days, make the days count.',
    vi: 'Đừng chỉ đếm từng ngày trôi qua, hãy biến mỗi ngày học tập trở nên trọn vẹn và ý nghĩa.',
    author: 'Muhammad Ali'
  },
  {
    en: 'The expert in anything was once a beginner.',
    vi: 'Mọi cao thủ chạm điểm 9+ đều từng khởi đầu từ những bài học từ vựng đầu tiên.',
    author: 'Helen Hayes'
  },
  {
    en: 'The harder you work for something, the greater you’ll feel when you achieve it.',
    vi: 'Càng nỗ lực kiên trì, niềm vui khi chạm tay vào cánh cổng trường đại học mơ ước sẽ càng rực rỡ.',
    author: 'Proverb'
  },
  {
    en: 'Consistency is what transforms average into excellence.',
    vi: 'Sự kiên trì học tập mỗi ngày là chìa khóa biến sự bình thường thành xuất sắc.',
    author: 'Tony Robbins'
  },
  {
    en: 'Dream big, study hard, and make it happen.',
    vi: 'Dám ước mơ lớn, vững vàng ôn luyện, và biến ước mơ thành hiện thực!',
    author: 'THPT Motivation'
  },
  {
    en: 'Your limitation is only your imagination.',
    vi: 'Giới hạn duy nhất của bạn chỉ nằm ở ranh giới suy nghĩ của chính bạn.',
    author: 'Inspiration'
  },
  {
    en: 'Push yourself, because no one else is going to do it for you.',
    vi: 'Hãy bứt phá giới hạn bản thân, vì kỳ thi này là tương lai của chính bạn.',
    author: 'EVM Study Guide'
  }
];

export function getRandomSlogan() {
  const index = Math.floor(Math.random() * INSPIRATIONAL_SLOGANS.length);
  return INSPIRATIONAL_SLOGANS[index];
}

const USER_PROFILE_STORAGE_KEY = 'evm_auth_user_profile';
const ADMIN_TOKEN_STORAGE_KEY = 'evm_admin_secret_key';

export function getStoredUserProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.username && parsed.school) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

export function saveStoredUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
    if (profile.apiKey && profile.apiKey.trim()) {
      setStoredApiKey(profile.apiKey.trim());
    }
  } catch (err) {
    console.error('Failed to save user profile:', err);
  }
}

export function clearStoredUserProfile(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
  } catch {}
}

export function getStoredAdminToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || '';
}

export function setStoredAdminToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token.trim());
}

export function clearStoredAdminToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function detectDeviceCategory(): 'desktop' | 'mobile' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Record a login event to the backend server.
 */
export async function recordLoginOnServer(profile: UserProfile): Promise<{
  success: boolean;
  isServerHost?: boolean;
}> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': getStoredAdminToken()
      },
      body: JSON.stringify({
        username: profile.username,
        school: profile.school,
        customSchool: profile.customSchool || '',
        deviceType: detectDeviceCategory()
      })
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        isServerHost: Boolean(data.isServerHost)
      };
    }
  } catch (err) {
    console.warn('[EVM Auth] Server offline or hit error during login record:', err);
  }
  return { success: true, isServerHost: false };
}

/**
 * Check if the current browser environment is on the server host machine or has admin rights.
 */
export async function checkServerHostStatus(): Promise<boolean> {
  // If running directly on localhost or 127.0.0.1, we are on the server machine
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return true;
    }
  }

  try {
    const adminToken = getStoredAdminToken();
    const headers: Record<string, string> = {};
    if (adminToken) {
      headers['x-admin-key'] = adminToken;
    }

    const res = await fetch('/api/auth/server-status', { headers });
    if (res.ok) {
      const data = await res.json();
      return Boolean(data.isServerHost);
    }
  } catch {}
  return false;
}

/**
 * Fetch school login statistics (Strictly protected for the server host/admin).
 */
export async function fetchSchoolStats(): Promise<SchoolLoginStats | null> {
  try {
    const adminToken = getStoredAdminToken();
    const headers: Record<string, string> = {};
    if (adminToken) {
      headers['x-admin-key'] = adminToken;
    }

    const res = await fetch('/api/admin/school-stats', { headers });
    if (res.ok) {
      const data = await res.json();
      if (data && data.stats) {
        return data.stats;
      }
    } else if (res.status === 403) {
      console.warn('[EVM Auth] Access to school stats forbidden: only the host server is permitted.');
      return null;
    }
  } catch (err) {
    console.error('[EVM Auth] Failed to fetch school stats:', err);
  }
  return null;
}

/**
 * Verify admin password if accessed remotely.
 */
export async function verifyAdminPasscode(pin: string): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/verify-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: pin.trim() })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setStoredAdminToken(pin.trim());
        return true;
      }
    }
  } catch {}
  return false;
}

/**
 * Reset school login statistics (Admin only).
 */
export async function resetSchoolStatsOnServer(): Promise<boolean> {
  try {
    const adminToken = getStoredAdminToken();
    const res = await fetch('/api/admin/reset-school-stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminToken
      }
    });
    return res.ok;
  } catch {
    return false;
  }
}
