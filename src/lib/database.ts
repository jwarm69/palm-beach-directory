import { supabase } from './supabase'
import type { 
  Store, 
  Area, 
  Offer, 
  Event, 
  FavoriteStore, 
  ClaimedOffer, 
  EventBooking, 
  ConciergeBooking,
  User 
} from '@/types'

// ============================================================================
// AREA FUNCTIONS
// ============================================================================

export async function getAreas(): Promise<Area[]> {
  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching areas:', error)
    return []
  }

  return data.map(area => ({
    id: area.id,
    name: area.name,
    slug: area.slug,
    description: area.description,
    longDescription: area.long_description || area.description,
    image: area.image || '',
    heroImage: area.hero_image || area.image || '',
    keyFeatures: area.key_features || [],
    atmosphere: area.atmosphere || '',
    bestFor: area.best_for || [],
    highlights: area.highlights || [],
    stores: [] // Will be populated separately
  }))
}

export async function getAreaBySlug(slug: string): Promise<Area | null> {
  const { data: areaData, error: areaError } = await supabase
    .from('areas')
    .select('*')
    .eq('slug', slug)
    .single()

  if (areaError || !areaData) {
    console.error('Error fetching area:', areaError)
    return null
  }

  // Get stores for this area
  const stores = await getStoresByArea(areaData.id)

  return {
    id: areaData.id,
    name: areaData.name,
    slug: areaData.slug,
    description: areaData.description,
    longDescription: areaData.long_description || areaData.description,
    image: areaData.image || '',
    heroImage: areaData.hero_image || areaData.image || '',
    keyFeatures: areaData.key_features || [],
    atmosphere: areaData.atmosphere || '',
    bestFor: areaData.best_for || [],
    highlights: areaData.highlights || [],
    stores
  }
}

// ============================================================================
// STORE FUNCTIONS
// ============================================================================

export async function getStores(): Promise<Store[]> {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      *,
      areas (name)
    `)
    .order('featured', { ascending: false })
    .order('name')

  if (error) {
    console.error('Error fetching stores:', error)
    return []
  }

  return data.map(store => ({
    id: store.id,
    name: store.name,
    slug: store.slug,
    description: store.description,
    longDescription: store.long_description || store.description,
    category: store.category,
    subcategory: store.subcategory,
    area: store.areas?.name || '',
    address: store.address,
    phone: store.phone,
    website: store.website,
    email: store.email,
    priceRange: store.price_range as '$' | '$$' | '$$$' | '$$$$',
    rating: store.rating,
    reviewCount: store.review_count,
    image: store.image || '',
    gallery: store.gallery || [],
    amenities: store.amenities || [],
    hours: store.hours || {},
    specialties: store.specialties || [],
    socialMedia: {
      instagram: store.instagram,
      facebook: store.facebook,
      twitter: store.twitter
    }
  }))
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      *,
      areas (name)
    `)
    .eq('slug', slug)
    .single()

  if (error || !data) {
    console.error('Error fetching store:', error)
    return null
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    longDescription: data.long_description || data.description,
    category: data.category,
    subcategory: data.subcategory,
    area: data.areas?.name || '',
    address: data.address,
    phone: data.phone,
    website: data.website,
    email: data.email,
    priceRange: data.price_range as '$' | '$$' | '$$$' | '$$$$',
    rating: data.rating,
    reviewCount: data.review_count,
    image: data.image || '',
    gallery: data.gallery || [],
    amenities: data.amenities || [],
    hours: data.hours || {},
    specialties: data.specialties || [],
    socialMedia: {
      instagram: data.instagram,
      facebook: data.facebook,
      twitter: data.twitter
    }
  }
}

export async function getStoresByArea(areaId: string): Promise<Store[]> {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      *,
      areas (name)
    `)
    .eq('area_id', areaId)
    .order('featured', { ascending: false })
    .order('name')

  if (error) {
    console.error('Error fetching stores by area:', error)
    return []
  }

  return data.map(store => ({
    id: store.id,
    name: store.name,
    slug: store.slug,
    description: store.description,
    longDescription: store.long_description || store.description,
    category: store.category,
    subcategory: store.subcategory,
    area: store.areas?.name || '',
    address: store.address,
    phone: store.phone,
    website: store.website,
    email: store.email,
    priceRange: store.price_range as '$' | '$$' | '$$$' | '$$$$',
    rating: store.rating,
    reviewCount: store.review_count,
    image: store.image || '',
    gallery: store.gallery || [],
    amenities: store.amenities || [],
    hours: store.hours || {},
    specialties: store.specialties || [],
    socialMedia: {
      instagram: store.instagram,
      facebook: store.facebook,
      twitter: store.twitter
    }
  }))
}

// ============================================================================
// OFFER FUNCTIONS
// ============================================================================

export async function getOffers(): Promise<Offer[]> {
  const { data, error } = await supabase
    .from('offers')
    .select(`
      *,
      stores (name, slug, area_id,
        areas (name)
      )
    `)
    .eq('active', true)
    .gte('valid_until', new Date().toISOString())
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching offers:', error)
    return []
  }

  return data.map(offer => ({
    id: offer.id,
    title: offer.title,
    description: offer.description,
    shortDescription: offer.short_description,
    store: offer.stores?.name || '',
    storeSlug: offer.stores?.slug || '',
    category: offer.category,
    area: offer.stores?.areas?.name || '',
    image: offer.image || '',
    value: offer.value,
    originalPrice: offer.original_price,
    discountedPrice: offer.discounted_price,
    discountPercentage: offer.discount_percentage,
    validUntil: offer.valid_until,
    isFlash: offer.is_flash,
    type: offer.offer_type as 'percent' | 'dollar' | 'experience' | 'gift',
    terms: offer.terms || [],
    highlights: offer.highlights || [],
    featured: offer.featured || false
  }))
}

export async function getOfferById(id: string): Promise<Offer | null> {
  const { data, error } = await supabase
    .from('offers')
    .select(`
      *,
      stores (name, slug, area_id,
        areas (name)
      )
    `)
    .eq('id', id)
    .eq('active', true)
    .gte('valid_until', new Date().toISOString())
    .single()

  if (error || !data) {
    console.error('Error fetching offer:', error)
    return null
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    shortDescription: data.short_description,
    store: data.stores?.name || '',
    storeSlug: data.stores?.slug || '',
    category: data.category,
    area: data.stores?.areas?.name || '',
    image: data.image || '',
    value: data.value,
    originalPrice: data.original_price,
    discountedPrice: data.discounted_price,
    discountPercentage: data.discount_percentage,
    validUntil: data.valid_until,
    isFlash: data.is_flash,
    type: data.offer_type as 'percent' | 'dollar' | 'experience' | 'gift',
    terms: data.terms || [],
    highlights: data.highlights || [],
    featured: data.featured || false
  }
}

// ============================================================================
// EVENT FUNCTIONS
// ============================================================================

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0])
    .order('featured', { ascending: false })
    .order('date')

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }

  return data.map((event, index) => ({
    id: index + 1, // Convert UUID to number for compatibility
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    description: event.description,
    image: event.image || '',
    price: event.price,
    capacity: event.capacity,
    type: event.event_type as 'fashion-show' | 'trunk-show' | 'vip-event' | 'workshop' | 'opening' | 'seasonal',
    featured: event.featured || false,
    tags: event.tags || []
  }))
}

// ============================================================================
// USER PROFILE FUNCTIONS
// ============================================================================

export async function getUserProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error || !data) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return {
    id: data.id,
    email: '', // Will be populated from auth
    firstName: data.first_name,
    lastName: data.last_name,
    phone: data.phone,
    bio: data.bio,
    joinDate: data.join_date,
    membershipTier: data.membership_tier as 'standard' | 'premium' | 'vip',
    preferences: {
      emailNotifications: data.email_notifications,
      smsNotifications: data.sms_notifications,
      offerAlerts: data.offer_alerts,
      eventNotifications: data.event_notifications,
      newsletterSubscription: data.newsletter_subscription,
      marketingEmails: data.marketing_emails,
      personalizedRecommendations: data.personalized_recommendations
    },
    shopping: {
      favoriteCategories: data.favorite_categories,
      budgetRange: data.budget_range,
      preferredAreas: data.preferred_areas,
      stylingPreferences: data.styling_preferences,
      sizeInformation: {
        clothing: data.clothing_size,
        shoes: data.shoe_size,
        accessories: data.accessories_size
      }
    }
  }
}

export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<boolean> {
  const profileUpdates: any = {
    updated_at: new Date().toISOString()
  }

  if (updates.firstName) profileUpdates.first_name = updates.firstName
  if (updates.lastName) profileUpdates.last_name = updates.lastName
  if (updates.phone) profileUpdates.phone = updates.phone
  if (updates.bio) profileUpdates.bio = updates.bio
  if (updates.membershipTier) profileUpdates.membership_tier = updates.membershipTier

  if (updates.preferences) {
    Object.keys(updates.preferences).forEach(key => {
      profileUpdates[key] = updates.preferences![key as keyof typeof updates.preferences]
    })
  }

  if (updates.shopping) {
    if (updates.shopping.favoriteCategories) profileUpdates.favorite_categories = updates.shopping.favoriteCategories
    if (updates.shopping.budgetRange) profileUpdates.budget_range = updates.shopping.budgetRange
    if (updates.shopping.preferredAreas) profileUpdates.preferred_areas = updates.shopping.preferredAreas
    if (updates.shopping.stylingPreferences) profileUpdates.styling_preferences = updates.shopping.stylingPreferences
    if (updates.shopping.sizeInformation) {
      if (updates.shopping.sizeInformation.clothing) profileUpdates.clothing_size = updates.shopping.sizeInformation.clothing
      if (updates.shopping.sizeInformation.shoes) profileUpdates.shoe_size = updates.shopping.sizeInformation.shoes
      if (updates.shopping.sizeInformation.accessories) profileUpdates.accessories_size = updates.shopping.sizeInformation.accessories
    }
  }

  const { error } = await supabase
    .from('profiles')
    .update(profileUpdates)
    .eq('id', userId)

  if (error) {
    console.error('Error updating user profile:', error)
    return false
  }

  return true
}

// ============================================================================
// FAVORITES FUNCTIONS
// ============================================================================

export async function getUserFavorites(userId: string): Promise<FavoriteStore[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      *,
      stores (
        id, name, slug, category, price_range,
        areas (name)
      )
    `)
    .eq('user_id', userId)
    .order('added_at', { ascending: false })

  if (error) {
    console.error('Error fetching favorites:', error)
    return []
  }

  return data.map(fav => ({
    id: fav.id,
    storeId: fav.stores?.id || '',
    storeName: fav.stores?.name || '',
    storeSlug: fav.stores?.slug || '',
    category: fav.stores?.category || '',
    area: fav.stores?.areas?.name || '',
    priceRange: fav.stores?.price_range || '$',
    addedAt: fav.added_at,
    notes: fav.notes,
    notifyOfOffers: fav.notify_of_offers,
    notifyOfEvents: fav.notify_of_events
  }))
}

export async function addToFavorites(userId: string, storeId: string): Promise<boolean> {
  const { error } = await supabase
    .from('favorites')
    .insert({
      user_id: userId,
      store_id: storeId,
      notify_of_offers: true,
      notify_of_events: true
    })

  if (error) {
    console.error('Error adding to favorites:', error)
    return false
  }

  return true
}

export async function removeFromFavorites(userId: string, storeId: string): Promise<boolean> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('store_id', storeId)

  if (error) {
    console.error('Error removing from favorites:', error)
    return false
  }

  return true
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export async function searchStores(query: string, filters?: {
  category?: string
  area?: string
  priceRange?: string
}): Promise<Store[]> {
  let queryBuilder = supabase
    .from('stores')
    .select(`
      *,
      areas (name)
    `)

  if (query) {
    queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
  }

  if (filters?.category) {
    queryBuilder = queryBuilder.eq('category', filters.category)
  }

  if (filters?.priceRange) {
    queryBuilder = queryBuilder.eq('price_range', filters.priceRange)
  }

  if (filters?.area) {
    queryBuilder = queryBuilder.eq('areas.name', filters.area)
  }

  const { data, error } = await queryBuilder
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })

  if (error) {
    console.error('Error searching stores:', error)
    return []
  }

  return data.map(store => ({
    id: store.id,
    name: store.name,
    slug: store.slug,
    description: store.description,
    longDescription: store.long_description || store.description,
    category: store.category,
    subcategory: store.subcategory,
    area: store.areas?.name || '',
    address: store.address,
    phone: store.phone,
    website: store.website,
    email: store.email,
    priceRange: store.price_range as '$' | '$$' | '$$$' | '$$$$',
    rating: store.rating,
    reviewCount: store.review_count,
    image: store.image || '',
    gallery: store.gallery || [],
    amenities: store.amenities || [],
    hours: store.hours || {},
    specialties: store.specialties || [],
    socialMedia: {
      instagram: store.instagram,
      facebook: store.facebook,
      twitter: store.twitter
    }
  }))
}