import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { StatusType, MembershipTier, OfferType } from "@/types"

// ============================================================================
// CLASS NAME UTILITY
// ============================================================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================================================
// DATE FORMATTING UTILITIES
// ============================================================================

export const formatDate = (dateString: string, options?: {
  includeWeekday?: boolean;
  includeTime?: boolean;
  short?: boolean;
}) => {
  const date = new Date(dateString);
  const { includeWeekday = false, includeTime = false, short = false } = options || {};

  if (short) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  if (includeWeekday) {
    formatOptions.weekday = 'short';
  }

  if (includeTime) {
    formatOptions.hour = 'numeric';
    formatOptions.minute = '2-digit';
    formatOptions.hour12 = true;
  }

  return date.toLocaleDateString('en-US', formatOptions);
};

export const formatTime = (timeString: string) => {
  // If already formatted time, return as is
  if (timeString.includes('AM') || timeString.includes('PM')) {
    return timeString;
  }
  
  // Try to parse and format 24-hour time
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const minute = minutes || '00';
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  
  return `${displayHour}:${minute} ${period}`;
};

export const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

export const isUpcoming = (dateString: string) => {
  return new Date(dateString) > new Date();
};

export const isExpired = (dateString: string) => {
  return new Date(dateString) < new Date();
};

// ============================================================================
// STATUS & COLOR UTILITIES
// ============================================================================

export const getStatusColor = (status: StatusType): string => {
  switch (status) {
    case 'confirmed':
    case 'active':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'pending':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'cancelled':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'used':
      return 'text-gray-600 bg-gray-50 border-gray-200';
    case 'expired':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getMembershipColor = (tier: MembershipTier): string => {
  switch (tier) {
    case 'vip':
      return 'from-purple-500 to-purple-600';
    case 'premium':
      return 'from-gold to-yellow-500';
    case 'standard':
    default:
      return 'from-sage to-green-500';
  }
};

export const getMembershipLabel = (tier: MembershipTier): string => {
  switch (tier) {
    case 'vip':
      return 'VIP Member';
    case 'premium':
      return 'Premium Member';
    case 'standard':
    default:
      return 'Member';
  }
};

export const getOfferColor = (type: OfferType, isFlash: boolean = false): string => {
  const baseColors = {
    percent: isFlash ? 'bg-red-100 text-red-700' : 'bg-coral/10 text-coral',
    dollar: isFlash ? 'bg-orange-100 text-orange-700' : 'bg-gold/10 text-gold',
    experience: isFlash ? 'bg-purple-100 text-purple-700' : 'bg-sage/10 text-sage',
    gift: isFlash ? 'bg-pink-100 text-pink-700' : 'bg-navy/10 text-navy'
  };
  
  return baseColors[type] || baseColors.percent;
};

export const getOfferIconProps = (type: OfferType, isFlash: boolean = false) => {
  const size = isFlash ? 'w-5 h-5' : 'w-6 h-6';
  const strokeWidth = isFlash ? 2.5 : 2;

  const iconPaths = {
    percent: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
    experience: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    gift: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z",
    dollar: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
  };

  return {
    className: size,
    strokeWidth,
    path: iconPaths[type] || iconPaths.percent
  };
};

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercent = (value: number): string => {
  return `${value}%`;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ============================================================================
// ARRAY & OBJECT UTILITIES
// ============================================================================

export const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const group = key(item);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

export const sortBy = <T>(
  array: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const uniqueBy = <T, K>(array: T[], key: (item: T) => K): T[] => {
  const seen = new Set<K>();
  return array.filter(item => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

// ============================================================================
// STORAGE UTILITIES
// ============================================================================

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  
  getJSON: <T>(key: string): T | null => {
    const value = safeLocalStorage.getItem(key);
    if (!value) return null;
    
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  },
  
  setJSON: <T>(key: string, value: T): boolean => {
    try {
      return safeLocalStorage.setItem(key, JSON.stringify(value));
    } catch {
      return false;
    }
  }
};

// ============================================================================
// DEBOUNCE & THROTTLE UTILITIES
// ============================================================================

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
