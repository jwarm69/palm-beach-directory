// ============================================================================
// CENTRALIZED TYPE DEFINITIONS
// Palm Beach Directory - All TypeScript interfaces and types
// ============================================================================

// ============================================================================
// USER & AUTHENTICATION TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  joinDate: string;
  membershipTier: 'standard' | 'premium' | 'vip';
  preferences?: UserPreferences;
  shopping?: ShoppingProfile;
}

export interface UserPreferences {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  offerAlerts?: boolean;
  eventNotifications?: boolean;
  newsletterSubscription?: boolean;
  marketingEmails?: boolean;
  personalizedRecommendations?: boolean;
}

export interface ShoppingProfile {
  favoriteCategories?: string[];
  budgetRange?: string;
  preferredAreas?: string[];
  stylingPreferences?: string;
  sizeInformation?: {
    clothing?: string;
    shoes?: string;
    accessories?: string;
  };
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (data: SignupData) => Promise<boolean>;
  signOut: () => void;
  updateUser?: (userData: Partial<User>) => Promise<void>;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

// ============================================================================
// STORE & BUSINESS TYPES
// ============================================================================

export interface Store {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  subcategory?: string;
  area: string;
  address: string;
  phone: string;
  website?: string;
  email?: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  amenities: string[];
  hours: {
    [key: string]: string;
  };
  specialties?: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  heroImage: string;
  keyFeatures: string[];
  atmosphere: string;
  bestFor: string[];
  highlights: string[];
  stores: Store[];
}

export interface SearchResult {
  type: 'store' | 'area' | 'offer';
  title: string;
  description: string;
  url: string;
  category?: string;
  area?: string;
}

// ============================================================================
// EVENT & BOOKING TYPES
// ============================================================================

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  type: 'fashion-show' | 'trunk-show' | 'vip-event' | 'workshop' | 'opening' | 'seasonal';
  featured?: boolean;
  tags?: string[];
}

export interface EventBooking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  location: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: string;
  guests: number;
  specialRequests?: string;
}

export interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
}

export interface ServiceData {
  type: string;
  title: string;
  duration: string;
  price: number;
}

export interface BookingDetails {
  date: string;
  time: string;
  location?: string;
  specialRequests?: string;
  preferences?: ServicePreferences;
}

export interface ServicePreferences {
  stylist?: string;
  budget?: string;
  categories?: string[];
}

export interface ConciergeBooking {
  id: string;
  serviceType: string;
  serviceTitle: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: string;
  price: number;
  specialRequests?: string;
  preferences?: ServicePreferences;
}

export interface BookingContextType {
  eventBookings: EventBooking[];
  conciergeBookings: ConciergeBooking[];
  isLoading: boolean;
  bookEvent: (eventId: string, eventData: EventData, guests: number, specialRequests?: string) => Promise<boolean>;
  bookConciergeService: (serviceData: ServiceData, bookingDetails: BookingDetails) => Promise<boolean>;
  cancelEventBooking: (bookingId: string) => Promise<boolean>;
  cancelConciergeBooking: (bookingId: string) => Promise<boolean>;
  getEventBooking: (eventId: string) => EventBooking | undefined;
  isEventBooked: (eventId: string) => boolean;
}

// ============================================================================
// FAVORITES & PREFERENCES TYPES
// ============================================================================

export interface FavoriteStore {
  id: string;
  storeId: string;
  storeName: string;
  storeSlug: string;
  category: string;
  area: string;
  priceRange: string;
  addedAt: string;
  notes?: string;
  notifyOfOffers: boolean;
  notifyOfEvents: boolean;
}

export interface StoreData {
  id: string;
  name: string;
  slug: string;
  category: string;
  area: string;
  priceRange: string;
}

export interface FavoriteSettings {
  notes?: string;
  notifyOfOffers: boolean;
  notifyOfEvents: boolean;
}

export interface FavoritesContextType {
  favorites: FavoriteStore[];
  isLoading: boolean;
  addToFavorites: (storeData: StoreData) => Promise<boolean>;
  removeFromFavorites: (storeId: string) => Promise<boolean>;
  updateFavoriteSettings: (favoriteId: string, settings: FavoriteSettings) => Promise<boolean>;
  isFavorite: (storeId: string) => boolean;
  getFavoritesByCategory: (category: string) => FavoriteStore[];
  getFavoritesByArea: (area: string) => FavoriteStore[];
}

// ============================================================================
// OFFER & REDEMPTION TYPES
// ============================================================================

export interface Offer {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  store: string;
  storeSlug: string;
  category: string;
  area: string;
  image: string;
  value: string;
  originalPrice?: number;
  discountedPrice?: number;
  discountPercentage?: number;
  validUntil: string;
  isFlash: boolean;
  type: 'percent' | 'dollar' | 'experience' | 'gift';
  terms?: string[];
  highlights?: string[];
  featured?: boolean;
}

export interface ClaimedOffer {
  id: string;
  offerId: string;
  offerTitle: string;
  store: string;
  storeSlug: string;
  value: string;
  claimedAt: string;
  expiresAt: string;
  status: 'active' | 'used' | 'expired';
  qrCode: string;
  redemptionCode: string;
  usedAt?: string;
  location?: string;
}

export interface OfferData {
  id: string;
  title: string;
  store: string;
  storeSlug: string;
  value: string;
  validUntil: string;
  terms?: string[];
}

export interface OfferRedemptionContextType {
  claimedOffers: ClaimedOffer[];
  isLoading: boolean;
  claimOffer: (offerData: OfferData) => Promise<boolean>;
  useOffer: (offerId: string, location?: string) => Promise<boolean>;
  getClaimedOffer: (offerId: string) => ClaimedOffer | undefined;
  isOfferClaimed: (offerId: string) => boolean;
  getActiveOffers: () => ClaimedOffer[];
  getUsedOffers: () => ClaimedOffer[];
}

// ============================================================================
// UI COMPONENT TYPES
// ============================================================================

export interface FilterOptions {
  category: string[];
  priceRange: string[];
  area: string[];
  amenities: string[];
  rating?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface ButtonVariant {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type StatusType = 'confirmed' | 'pending' | 'cancelled' | 'active' | 'used' | 'expired';

export type MembershipTier = 'standard' | 'premium' | 'vip';

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export type EventType = 'fashion-show' | 'trunk-show' | 'vip-event' | 'workshop' | 'opening' | 'seasonal';

export type OfferType = 'percent' | 'dollar' | 'experience' | 'gift';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export interface MembershipBadgeProps {
  tier: MembershipTier;
  joinDate: string;
  className?: string;
}

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

// ============================================================================
// SEARCH & FILTER TYPES
// ============================================================================

export interface SearchFilters {
  query?: string;
  category?: string[];
  area?: string[];
  priceRange?: string[];
  rating?: number;
  amenities?: string[];
  sortBy?: 'name' | 'rating' | 'price' | 'distance';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  results: SearchResult[];
  isLoading: boolean;
}