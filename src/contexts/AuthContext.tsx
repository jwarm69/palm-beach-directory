"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  membershipTier: 'standard' | 'premium' | 'vip';
  joinDate: string;
  avatar?: string;
  preferences: {
    categories: string[];
    priceRange: string[];
    areas: string[];
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

// Mock user data for demo purposes
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "catherine@example.com",
    firstName: "Catherine",
    lastName: "Worthington",
    phone: "(561) 555-0123",
    membershipTier: "vip",
    joinDate: "2024-01-15",
    preferences: {
      categories: ["Women's Fashion", "Jewelry"],
      priceRange: ["$$$$"],
      areas: ["Worth Avenue"]
    },
    stats: {
      eventsAttended: 12,
      conciergeBookings: 8,
      favoriteStores: 15
    }
  },
  {
    id: "2",
    email: "james@example.com",
    firstName: "James",
    lastName: "Patterson",
    membershipTier: "premium",
    joinDate: "2024-03-20",
    preferences: {
      categories: ["Men's Fashion", "Luxury Goods"],
      priceRange: ["$$$", "$$$$"],
      areas: ["Worth Avenue", "Royal Poinciana"]
    },
    stats: {
      eventsAttended: 5,
      conciergeBookings: 3,
      favoriteStores: 8
    }
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount - only run on client
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('palmbeach_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Validate the stored user has required fields
          if (parsedUser && parsedUser.id && parsedUser.email) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem('palmbeach_user');
          }
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('palmbeach_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock authentication - in real app, this would be an API call
      const mockUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (mockUser && password === "password123") {
        setUser(mockUser);
        // Only use localStorage on client side
        if (typeof window !== 'undefined') {
          localStorage.setItem('palmbeach_user', JSON.stringify(mockUser));
        }
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock signup - check if email already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      membershipTier: 'standard',
      joinDate: new Date().toISOString().split('T')[0],
      preferences: {
        categories: [],
        priceRange: [],
        areas: []
      },
      stats: {
        eventsAttended: 0,
        conciergeBookings: 0,
        favoriteStores: 0
      }
    };
    
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('palmbeach_user', JSON.stringify(newUser));
    }
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('palmbeach_user');
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('palmbeach_user', JSON.stringify(updatedUser));
    }
    
    setIsLoading(false);
    return true;
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
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