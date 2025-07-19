"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from '@/lib/supabase';
import { getUserProfile, updateUserProfile } from '@/lib/database';
import type { User as AuthUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  membershipTier: 'standard' | 'premium' | 'vip';
  joinDate: string;
  avatar?: string;
  preferences?: {
    categories?: string[];
    priceRange?: string[];
    areas?: string[];
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    offerAlerts?: boolean;
    eventNotifications?: boolean;
    newsletterSubscription?: boolean;
    marketingEmails?: boolean;
    personalizedRecommendations?: boolean;
  };
  shopping?: {
    favoriteCategories?: string[];
    budgetRange?: string;
    preferredAreas?: string[];
    stylingPreferences?: string;
    sizeInformation?: {
      clothing?: string;
      shoes?: string;
      accessories?: string;
    };
  };
  stats: {
    eventsAttended: number;
    conciergeBookings: number;
    favoriteStores: number;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  updateUser?: (data: Partial<User>) => Promise<boolean>;
  isAuthenticated: boolean;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await loadUserProfile(session.user);
      }
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser: AuthUser) => {
    try {
      const profile = await getUserProfile(authUser.id);
      if (profile) {
        setUser({
          ...profile,
          email: authUser.email || '',
          stats: {
            eventsAttended: 0, // TODO: Calculate from bookings
            conciergeBookings: 0, // TODO: Calculate from bookings
            favoriteStores: 0 // TODO: Calculate from favorites
          }
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        await loadUserProfile(data.user);
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        // Profile will be created automatically by the database trigger
        await loadUserProfile(data.user);
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      const success = await updateUserProfile(user.id, data);
      if (success) {
        await loadUserProfile({ id: user.id, email: user.email } as AuthUser);
      }
      setIsLoading(false);
      return success;
    } catch (error) {
      console.error('Update profile error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      const success = await updateUserProfile(user.id, data);
      if (success) {
        await loadUserProfile({ id: user.id, email: user.email } as AuthUser);
      }
      setIsLoading(false);
      return success;
    } catch (error) {
      console.error('Update user error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export type { User, SignupData };