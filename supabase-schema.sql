-- ============================================================================
-- PALM BEACH DIRECTORY DATABASE SCHEMA
-- Supabase PostgreSQL Schema with Row Level Security
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE (extends auth.users)
-- ============================================================================

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  bio TEXT,
  join_date TIMESTAMPTZ DEFAULT NOW(),
  membership_tier TEXT NOT NULL DEFAULT 'standard' CHECK (membership_tier IN ('standard', 'premium', 'vip')),
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT false,
  offer_alerts BOOLEAN DEFAULT true,
  event_notifications BOOLEAN DEFAULT true,
  newsletter_subscription BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  personalized_recommendations BOOLEAN DEFAULT true,
  favorite_categories TEXT[],
  budget_range TEXT,
  preferred_areas TEXT[],
  styling_preferences TEXT,
  clothing_size TEXT,
  shoe_size TEXT,
  accessories_size TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- AREAS TABLE
-- ============================================================================

CREATE TABLE public.areas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  image TEXT,
  hero_image TEXT,
  key_features TEXT[],
  atmosphere TEXT,
  best_for TEXT[],
  highlights TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- STORES TABLE
-- ============================================================================

CREATE TABLE public.stores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  area_id UUID REFERENCES public.areas(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  email TEXT,
  price_range TEXT NOT NULL CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
  rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  image TEXT,
  gallery TEXT[],
  amenities TEXT[],
  hours JSONB,
  specialties TEXT[],
  instagram TEXT,
  facebook TEXT,
  twitter TEXT,
  featured BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- OFFERS TABLE
-- ============================================================================

CREATE TABLE public.offers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  image TEXT,
  value TEXT NOT NULL,
  original_price DECIMAL(10,2),
  discounted_price DECIMAL(10,2),
  discount_percentage INTEGER,
  valid_until TIMESTAMPTZ NOT NULL,
  is_flash BOOLEAN DEFAULT false,
  offer_type TEXT NOT NULL CHECK (offer_type IN ('percent', 'dollar', 'experience', 'gift')),
  terms TEXT[],
  highlights TEXT[],
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  max_redemptions INTEGER,
  current_redemptions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- EVENTS TABLE
-- ============================================================================

CREATE TABLE public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  capacity INTEGER NOT NULL,
  current_bookings INTEGER DEFAULT 0,
  event_type TEXT NOT NULL CHECK (event_type IN ('fashion-show', 'trunk-show', 'vip-event', 'workshop', 'opening', 'seasonal')),
  featured BOOLEAN DEFAULT false,
  tags TEXT[],
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- FAVORITES TABLE
-- ============================================================================

CREATE TABLE public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  notes TEXT,
  notify_of_offers BOOLEAN DEFAULT true,
  notify_of_events BOOLEAN DEFAULT true,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, store_id)
);

-- ============================================================================
-- CLAIMED OFFERS TABLE
-- ============================================================================

CREATE TABLE public.claimed_offers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  offer_id UUID REFERENCES public.offers(id) ON DELETE CASCADE,
  qr_code TEXT NOT NULL,
  redemption_code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired')),
  claimed_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  location TEXT,
  UNIQUE(user_id, offer_id)
);

-- ============================================================================
-- EVENT BOOKINGS TABLE
-- ============================================================================

CREATE TABLE public.event_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  guests INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  special_requests TEXT,
  booked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- ============================================================================
-- CONCIERGE BOOKINGS TABLE
-- ============================================================================

CREATE TABLE public.concierge_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  service_title TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration TEXT NOT NULL,
  location TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  special_requests TEXT,
  preferred_stylist TEXT,
  budget_preference TEXT,
  service_categories TEXT[],
  booked_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('store-images', 'store-images', true),
  ('offer-images', 'offer-images', true),
  ('event-images', 'event-images', true),
  ('area-images', 'area-images', true);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claimed_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concierge_bookings ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Areas: Public read access
CREATE POLICY "Areas are viewable by everyone" ON public.areas
  FOR SELECT USING (true);

-- Stores: Public read access
CREATE POLICY "Stores are viewable by everyone" ON public.stores
  FOR SELECT USING (true);

-- Offers: Public read access for active offers
CREATE POLICY "Active offers are viewable by everyone" ON public.offers
  FOR SELECT USING (active = true AND valid_until > NOW());

-- Events: Public read access
CREATE POLICY "Events are viewable by everyone" ON public.events
  FOR SELECT USING (true);

-- Favorites: Users can manage their own favorites
CREATE POLICY "Users can view own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own favorites" ON public.favorites
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Claimed Offers: Users can manage their own claimed offers
CREATE POLICY "Users can view own claimed offers" ON public.claimed_offers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own claimed offers" ON public.claimed_offers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own claimed offers" ON public.claimed_offers
  FOR UPDATE USING (auth.uid() = user_id);

-- Event Bookings: Users can manage their own bookings
CREATE POLICY "Users can view own event bookings" ON public.event_bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own event bookings" ON public.event_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own event bookings" ON public.event_bookings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own event bookings" ON public.event_bookings
  FOR DELETE USING (auth.uid() = user_id);

-- Concierge Bookings: Users can manage their own bookings
CREATE POLICY "Users can view own concierge bookings" ON public.concierge_bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own concierge bookings" ON public.concierge_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own concierge bookings" ON public.concierge_bookings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own concierge bookings" ON public.concierge_bookings
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- Store images bucket policies
CREATE POLICY "Store images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'store-images');

CREATE POLICY "Authenticated users can upload store images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'store-images' AND auth.role() = 'authenticated');

-- Offer images bucket policies
CREATE POLICY "Offer images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'offer-images');

CREATE POLICY "Authenticated users can upload offer images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'offer-images' AND auth.role() = 'authenticated');

-- Event images bucket policies
CREATE POLICY "Event images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-images');

CREATE POLICY "Authenticated users can upload event images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'event-images' AND auth.role() = 'authenticated');

-- Area images bucket policies
CREATE POLICY "Area images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'area-images');

CREATE POLICY "Authenticated users can upload area images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'area-images' AND auth.role() = 'authenticated');

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (new.id, 
    COALESCE(new.raw_user_meta_data->>'first_name', 'User'), 
    COALESCE(new.raw_user_meta_data->>'last_name', ''));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_areas_updated_at BEFORE UPDATE ON public.areas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON public.stores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON public.offers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Stores indexes
CREATE INDEX idx_stores_area_id ON public.stores(area_id);
CREATE INDEX idx_stores_category ON public.stores(category);
CREATE INDEX idx_stores_featured ON public.stores(featured) WHERE featured = true;
CREATE INDEX idx_stores_slug ON public.stores(slug);

-- Offers indexes
CREATE INDEX idx_offers_store_id ON public.offers(store_id);
CREATE INDEX idx_offers_valid_until ON public.offers(valid_until);
CREATE INDEX idx_offers_active ON public.offers(active) WHERE active = true;
CREATE INDEX idx_offers_featured ON public.offers(featured) WHERE featured = true;

-- Events indexes
CREATE INDEX idx_events_date ON public.events(date);
CREATE INDEX idx_events_store_id ON public.events(store_id);
CREATE INDEX idx_events_featured ON public.events(featured) WHERE featured = true;

-- Favorites indexes
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_store_id ON public.favorites(store_id);

-- Claimed offers indexes
CREATE INDEX idx_claimed_offers_user_id ON public.claimed_offers(user_id);
CREATE INDEX idx_claimed_offers_status ON public.claimed_offers(status);
CREATE INDEX idx_claimed_offers_expires_at ON public.claimed_offers(expires_at);

-- Event bookings indexes
CREATE INDEX idx_event_bookings_user_id ON public.event_bookings(user_id);
CREATE INDEX idx_event_bookings_event_id ON public.event_bookings(event_id);

-- Concierge bookings indexes
CREATE INDEX idx_concierge_bookings_user_id ON public.concierge_bookings(user_id);
CREATE INDEX idx_concierge_bookings_date ON public.concierge_bookings(date);