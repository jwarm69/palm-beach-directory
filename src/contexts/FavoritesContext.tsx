"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface FavoriteStore {
  id: string;
  storeId: string;
  storeName: string;
  storeSlug: string;
  area: string;
  category: string;
  priceRange: string;
  rating: number;
  addedAt: string;
  notes?: string;
  notifyOfOffers: boolean;
  notifyOfEvents: boolean;
}

interface FavoritesContextType {
  favorites: FavoriteStore[];
  isLoading: boolean;
  addToFavorites: (storeData: StoreData) => Promise<boolean>;
  removeFromFavorites: (storeId: string) => Promise<boolean>;
  isFavorite: (storeId: string) => boolean;
  getFavoritesByCategory: (category: string) => FavoriteStore[];
  getFavoritesByArea: (area: string) => FavoriteStore[];
  updateFavoriteSettings: (favoriteId: string, settings: FavoriteSettings) => Promise<boolean>;
  getTotalFavorites: () => number;
}

interface StoreData {
  id: string;
  name: string;
  slug: string;
  area: string;
  category: string;
  priceRange: string;
  rating: number;
}

interface FavoriteSettings {
  notes?: string;
  notifyOfOffers: boolean;
  notifyOfEvents: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteStore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated && user) {
      try {
        const storedFavorites = localStorage.getItem(`palmbeach_favorites_${user.id}`);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, [isAuthenticated, user]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      localStorage.setItem(`palmbeach_favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addToFavorites = async (storeData: StoreData): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Check if already in favorites
      const existingFavorite = favorites.find(fav => fav.storeId === storeData.id);
      if (existingFavorite) {
        setIsLoading(false);
        return false; // Already favorited
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newFavorite: FavoriteStore = {
        id: `fav_${Date.now()}`,
        storeId: storeData.id,
        storeName: storeData.name,
        storeSlug: storeData.slug,
        area: storeData.area,
        category: storeData.category,
        priceRange: storeData.priceRange,
        rating: storeData.rating,
        addedAt: new Date().toISOString(),
        notifyOfOffers: true,
        notifyOfEvents: true
      };
      
      setFavorites(prev => [...prev, newFavorite]);
      setIsLoading(false);
      return true;
      
    } catch (error) {
      console.error('Failed to add to favorites:', error);
      setIsLoading(false);
      return false;
    }
  };

  const removeFromFavorites = async (storeId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setFavorites(prev => prev.filter(fav => fav.storeId !== storeId));
      setIsLoading(false);
      return true;
      
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
      setIsLoading(false);
      return false;
    }
  };

  const isFavorite = (storeId: string): boolean => {
    return favorites.some(fav => fav.storeId === storeId);
  };

  const getFavoritesByCategory = (category: string): FavoriteStore[] => {
    return favorites.filter(fav => fav.category === category);
  };

  const getFavoritesByArea = (area: string): FavoriteStore[] => {
    return favorites.filter(fav => fav.area === area);
  };

  const updateFavoriteSettings = async (favoriteId: string, settings: FavoriteSettings): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setFavorites(prev => 
        prev.map(fav => 
          fav.id === favoriteId 
            ? { ...fav, ...settings }
            : fav
        )
      );
      
      setIsLoading(false);
      return true;
      
    } catch (error) {
      console.error('Failed to update favorite settings:', error);
      setIsLoading(false);
      return false;
    }
  };

  const getTotalFavorites = (): number => {
    return favorites.length;
  };

  const value: FavoritesContextType = {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoritesByCategory,
    getFavoritesByArea,
    updateFavoriteSettings,
    getTotalFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export type { FavoriteStore, StoreData, FavoriteSettings };