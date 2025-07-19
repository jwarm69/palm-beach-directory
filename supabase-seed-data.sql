-- ============================================================================
-- PALM BEACH DIRECTORY SEED DATA
-- Initial data for areas, stores, and offers
-- ============================================================================

-- Insert Areas
INSERT INTO public.areas (id, name, slug, description, long_description, image, hero_image, key_features, atmosphere, best_for, highlights) VALUES
(
  uuid_generate_v4(),
  'Worth Avenue',
  'worth-avenue',
  'The crown jewel of luxury shopping in Palm Beach',
  'Worth Avenue stands as one of the world''s most prestigious shopping destinations, featuring an unparalleled collection of luxury boutiques, art galleries, and fine dining establishments. This historic street embodies the essence of Palm Beach elegance with its Mediterranean-inspired architecture and world-class shopping experience.',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
  ARRAY['Luxury Boutiques', 'Art Galleries', 'Fine Dining', 'Historic Architecture'],
  'Sophisticated and elegant with Mediterranean charm',
  ARRAY['High-end shopping', 'Art collectors', 'Fine dining', 'Luxury experiences'],
  ARRAY['Over 200 world-renowned shops', 'Historic Via Mizner', 'Exclusive trunk shows', 'Celebrity spotting']
),
(
  uuid_generate_v4(),
  'Royal Poinciana Plaza',
  'royal-poinciana-plaza',
  'Modern luxury shopping with waterfront dining',
  'Royal Poinciana Plaza offers a contemporary luxury shopping experience with stunning waterfront views. This beautifully redesigned destination combines high-end retail with exceptional dining, all set against the backdrop of the Intracoastal Waterway.',
  'https://images.unsplash.com/photo-1555529902-6b4d7c4ca95d?w=800',
  'https://images.unsplash.com/photo-1555529902-6b4d7c4ca95d?w=1200',
  ARRAY['Waterfront Views', 'Modern Design', 'Premium Brands', 'Gourmet Dining'],
  'Contemporary and sophisticated with waterfront elegance',
  ARRAY['Designer shopping', 'Waterfront dining', 'Family experiences', 'Special events'],
  ARRAY['Intracoastal Waterway views', 'Open-air design', 'Premium parking', 'Yacht access']
),
(
  uuid_generate_v4(),
  'Palm Beach Gardens',
  'palm-beach-gardens',
  'Upscale shopping in a beautiful garden setting',
  'Palm Beach Gardens offers a unique shopping experience surrounded by lush landscaping and tropical beauty. This area combines luxury retail with resort-style amenities, creating a serene and sophisticated shopping environment.',
  'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800',
  'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=1200',
  ARRAY['Garden Setting', 'Resort Atmosphere', 'Outdoor Shopping', 'Luxury Retailers'],
  'Tropical and relaxed with upscale sophistication',
  ARRAY['Outdoor shopping', 'Resort visitors', 'Garden enthusiasts', 'Relaxed luxury'],
  ARRAY['Beautiful landscaping', 'Resort-style amenities', 'Climate-controlled walkways', 'Ample parking']
);

-- Get area IDs for stores
DO $$
DECLARE
    worth_avenue_id UUID;
    royal_poinciana_id UUID;
    palm_beach_gardens_id UUID;
BEGIN
    SELECT id INTO worth_avenue_id FROM public.areas WHERE slug = 'worth-avenue';
    SELECT id INTO royal_poinciana_id FROM public.areas WHERE slug = 'royal-poinciana-plaza';
    SELECT id INTO palm_beach_gardens_id FROM public.areas WHERE slug = 'palm-beach-gardens';

    -- Insert Stores
    INSERT INTO public.stores (name, slug, description, long_description, category, subcategory, area_id, address, phone, website, price_range, rating, review_count, image, amenities, hours, specialties, featured) VALUES
    
    -- Worth Avenue Stores
    ('Tiffany & Co.', 'tiffany-co', 'Iconic luxury jewelry and accessories', 'The world-renowned Tiffany & Co. brings its legendary craftsmanship and timeless elegance to Worth Avenue. Discover exquisite jewelry, watches, and accessories in their signature blue box experience.', 'Jewelry', 'Fine Jewelry', worth_avenue_id, '350 Worth Ave, Palm Beach, FL 33480', '(561) 655-6016', 'https://tiffany.com', '$$$$', 4.8, 247, 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600', ARRAY['Personal Shopping', 'Gift Wrapping', 'Jewelry Cleaning', 'Custom Design'], '{"monday": "10:00 AM - 6:00 PM", "tuesday": "10:00 AM - 6:00 PM", "wednesday": "10:00 AM - 6:00 PM", "thursday": "10:00 AM - 6:00 PM", "friday": "10:00 AM - 6:00 PM", "saturday": "10:00 AM - 6:00 PM", "sunday": "12:00 PM - 5:00 PM"}', ARRAY['Engagement Rings', 'Diamond Jewelry', 'Sterling Silver', 'Luxury Watches'], true),
    
    ('Chanel', 'chanel', 'French luxury fashion and beauty', 'Experience the timeless elegance of Chanel with their complete collection of haute couture, ready-to-wear, handbags, shoes, and beauty products. The epitome of French luxury and sophistication.', 'Fashion', 'Luxury Fashion', worth_avenue_id, '450 Worth Ave, Palm Beach, FL 33480', '(561) 655-5252', 'https://chanel.com', '$$$$', 4.9, 189, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600', ARRAY['Personal Styling', 'VIP Services', 'Alterations', 'Beauty Consultation'], '{"monday": "10:00 AM - 6:00 PM", "tuesday": "10:00 AM - 6:00 PM", "wednesday": "10:00 AM - 6:00 PM", "thursday": "10:00 AM - 6:00 PM", "friday": "10:00 AM - 6:00 PM", "saturday": "10:00 AM - 6:00 PM", "sunday": "12:00 PM - 5:00 PM"}', ARRAY['Handbags', 'Perfume', 'Ready-to-Wear', 'Fine Jewelry'], true),
    
    ('Worth Avenue Gallery', 'worth-avenue-gallery', 'Fine art and contemporary masterpieces', 'Discover an exceptional collection of contemporary and classic artworks from renowned international artists. This gallery showcases paintings, sculptures, and limited editions in an elegant setting.', 'Art', 'Fine Art Gallery', worth_avenue_id, '425 Worth Ave, Palm Beach, FL 33480', '(561) 833-6658', null, '$$$', 4.7, 92, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600', ARRAY['Art Consultation', 'Framing Services', 'Authentication', 'Shipping'], '{"monday": "10:00 AM - 5:30 PM", "tuesday": "10:00 AM - 5:30 PM", "wednesday": "10:00 AM - 5:30 PM", "thursday": "10:00 AM - 5:30 PM", "friday": "10:00 AM - 5:30 PM", "saturday": "10:00 AM - 5:30 PM", "sunday": "Closed"}', ARRAY['Contemporary Art', 'Sculptures', 'Limited Editions', 'Investment Art'], false),
    
    -- Royal Poinciana Stores
    ('Pottery Barn', 'pottery-barn', 'Stylish home furnishings and decor', 'Transform your home with Pottery Barn''s expertly crafted furniture, bedding, bath, lighting and home decor. Discover timeless style and exceptional quality for every room in your home.', 'Home', 'Furniture & Decor', royal_poinciana_id, '340 Royal Poinciana Way, Palm Beach, FL 33480', '(561) 833-4500', 'https://potterybarn.com', '$$$', 4.5, 156, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600', ARRAY['Design Services', 'Delivery', 'Assembly', 'Registry'], '{"monday": "10:00 AM - 8:00 PM", "tuesday": "10:00 AM - 8:00 PM", "wednesday": "10:00 AM - 8:00 PM", "thursday": "10:00 AM - 8:00 PM", "friday": "10:00 AM - 8:00 PM", "saturday": "10:00 AM - 8:00 PM", "sunday": "11:00 AM - 6:00 PM"}', ARRAY['Furniture', 'Bedding', 'Lighting', 'Seasonal Decor'], false),
    
    ('Anthropologie', 'anthropologie', 'Unique women''s clothing and lifestyle', 'Discover Anthropologie''s unique collection of women''s clothing, shoes, accessories, beauty, and home decor. Each piece is carefully curated to reflect creativity and individuality.', 'Fashion', 'Womens Fashion', royal_poinciana_id, '320 Royal Poinciana Way, Palm Beach, FL 33480', '(561) 833-8989', 'https://anthropologie.com', '$$$', 4.4, 203, 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600', ARRAY['Personal Styling', 'Alterations', 'Gift Cards', 'Online Returns'], '{"monday": "10:00 AM - 8:00 PM", "tuesday": "10:00 AM - 8:00 PM", "wednesday": "10:00 AM - 8:00 PM", "thursday": "10:00 AM - 8:00 PM", "friday": "10:00 AM - 8:00 PM", "saturday": "10:00 AM - 8:00 PM", "sunday": "11:00 AM - 6:00 PM"}', ARRAY['Bohemian Style', 'Accessories', 'Home Goods', 'Beauty Products'], false),
    
    -- Palm Beach Gardens Stores
    ('Whole Foods Market', 'whole-foods-market', 'Premium organic and natural foods', 'Whole Foods Market offers the highest quality natural and organic products. From fresh produce to prepared foods, wine, and wellness products, discover the best ingredients for healthy living.', 'Food', 'Grocery & Gourmet', palm_beach_gardens_id, '11701 Lake Victoria Gardens Ave, Palm Beach Gardens, FL 33410', '(561) 691-8550', 'https://wholefoodsmarket.com', '$$', 4.3, 412, 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600', ARRAY['Prepared Foods', 'Wine Bar', 'Catering', 'Delivery'], '{"monday": "7:00 AM - 10:00 PM", "tuesday": "7:00 AM - 10:00 PM", "wednesday": "7:00 AM - 10:00 PM", "thursday": "7:00 AM - 10:00 PM", "friday": "7:00 AM - 10:00 PM", "saturday": "7:00 AM - 10:00 PM", "sunday": "7:00 AM - 10:00 PM"}', ARRAY['Organic Produce', 'Artisanal Cheese', 'Fresh Seafood', 'Natural Beauty'], false),
    
    ('Saks Fifth Avenue', 'saks-fifth-avenue', 'Luxury fashion destination', 'Saks Fifth Avenue presents the world''s finest designer collections for women and men. Experience exceptional service and discover the latest from top luxury brands in an elegant setting.', 'Fashion', 'Luxury Department Store', palm_beach_gardens_id, '3200 PGA Blvd, Palm Beach Gardens, FL 33410', '(561) 624-4100', 'https://saksfifthavenue.com', '$$$$', 4.6, 284, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600', ARRAY['Personal Shopping', 'Alterations', 'Beauty Services', 'Valet Parking'], '{"monday": "10:00 AM - 9:00 PM", "tuesday": "10:00 AM - 9:00 PM", "wednesday": "10:00 AM - 9:00 PM", "thursday": "10:00 AM - 9:00 PM", "friday": "10:00 AM - 9:00 PM", "saturday": "10:00 AM - 9:00 PM", "sunday": "11:00 AM - 7:00 PM"}', ARRAY['Designer Fashion', 'Luxury Handbags', 'Fine Jewelry', 'Beauty Products'], true);

END $$;

-- Insert Sample Offers
DO $$
DECLARE
    tiffany_id UUID;
    chanel_id UUID;
    pottery_barn_id UUID;
    anthro_id UUID;
BEGIN
    SELECT id INTO tiffany_id FROM public.stores WHERE slug = 'tiffany-co';
    SELECT id INTO chanel_id FROM public.stores WHERE slug = 'chanel';
    SELECT id INTO pottery_barn_id FROM public.stores WHERE slug = 'pottery-barn';
    SELECT id INTO anthro_id FROM public.stores WHERE slug = 'anthropologie';

    INSERT INTO public.offers (title, description, short_description, store_id, category, image, value, original_price, discounted_price, discount_percentage, valid_until, is_flash, offer_type, terms, highlights, featured) VALUES
    
    ('Welcome to Tiffany Gift', 'Complimentary gift with purchase over $500', 'Free Tiffany gift box and care kit', tiffany_id, 'Jewelry', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', 'Free Gift Worth $75', 500.00, 500.00, 0, NOW() + INTERVAL '30 days', false, 'gift', ARRAY['Minimum purchase $500', 'First-time customers only', 'One per customer', 'Cannot be combined with other offers'], ARRAY['Signature Tiffany Blue Box', 'Premium Care Kit', 'Welcome Package'], true),
    
    ('Chanel Beauty Consultation', '1-hour personalized beauty session', 'Complimentary makeup and skincare consultation', chanel_id, 'Beauty', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', '1-Hour Session (Value $150)', 150.00, 0.00, 100, NOW() + INTERVAL '60 days', false, 'experience', ARRAY['Appointment required', 'First-time customers', 'Valid Monday-Friday', 'Subject to availability'], ARRAY['Professional Makeup Artist', 'Skincare Analysis', 'Product Recommendations'], false),
    
    ('20% Off First Purchase', 'New customer exclusive discount', 'Save 20% on your first order', pottery_barn_id, 'Home', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', '20% Off', null, null, 20, NOW() + INTERVAL '45 days', false, 'percent', ARRAY['New customers only', 'Minimum purchase $200', 'Excludes sale items', 'Cannot be combined'], ARRAY['Applies to All Categories', 'Free Design Consultation', 'Easy Returns'], true),
    
    ('Anthropologie Style Session', 'Personal styling appointment', 'Free 1-hour styling session with purchase', anthro_id, 'Fashion', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', 'Free Styling Session', 200.00, 200.00, 0, NOW() + INTERVAL '90 days', false, 'experience', ARRAY['Minimum purchase $200', 'Appointment required', 'New customers preferred', 'Based on availability'], ARRAY['Personal Stylist', 'Wardrobe Consultation', 'Trend Guidance'], false);

END $$;

-- Insert Sample Events
INSERT INTO public.events (title, date, time, location, description, image, price, capacity, event_type, featured, tags) VALUES

('Palm Beach Fashion Week Preview', CURRENT_DATE + INTERVAL '30 days', '19:00:00', 'Worth Avenue Pavilion', 'Exclusive preview of the upcoming Fashion Week collections featuring top designers and emerging talent. Enjoy cocktails, hors d''oeuvres, and front-row access to the latest trends.', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600', 125.00, 150, 'fashion-show', true, ARRAY['Fashion', 'Preview', 'Exclusive', 'Cocktails']),

('Holiday Trunk Show at Chanel', CURRENT_DATE + INTERVAL '15 days', '14:00:00', 'Chanel Worth Avenue', 'Private trunk show featuring Chanel''s exclusive holiday collection. Meet with personal stylists and discover limited-edition pieces before they hit the floor.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600', 0.00, 50, 'trunk-show', true, ARRAY['Chanel', 'Holiday', 'Exclusive', 'Trunk Show']),

('Art & Wine Evening', CURRENT_DATE + INTERVAL '20 days', '18:30:00', 'Worth Avenue Gallery', 'Join us for an evening of fine art appreciation paired with exceptional wines. Meet local artists and discover new additions to our contemporary collection.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600', 75.00, 80, 'vip-event', false, ARRAY['Art', 'Wine', 'Gallery', 'Networking']),

('Home Design Workshop', CURRENT_DATE + INTERVAL '25 days', '10:00:00', 'Pottery Barn Design Center', 'Learn the secrets of interior design in this hands-on workshop. Discover color theory, space planning, and styling techniques from professional designers.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600', 45.00, 25, 'workshop', false, ARRAY['Home Design', 'Workshop', 'Interior Design', 'Learning']);

-- Create some indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stores_area_name ON public.stores(area_id) WHERE area_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_offers_store_name ON public.offers(store_id) WHERE store_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_events_date_future ON public.events(date) WHERE date >= CURRENT_DATE;