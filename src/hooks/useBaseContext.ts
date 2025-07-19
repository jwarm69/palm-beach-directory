"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { safeLocalStorage } from "@/lib/utils";

interface UseBaseContextOptions<T> {
  storageKey: string;
  initialValue: T;
  validateData?: (data: unknown) => data is T;
  transformData?: (data: unknown) => T;
}

interface UseBaseContextReturn<T> {
  data: T;
  setData: (data: T | ((prev: T) => T)) => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  updateData: (updater: (prev: T) => T) => Promise<boolean>;
  resetData: () => void;
  refresh: () => void;
}

export function useBaseContext<T>({
  storageKey,
  initialValue,
  validateData,
  transformData
}: UseBaseContextOptions<T>): UseBaseContextReturn<T> {
  const { user, isAuthenticated } = useAuth();
  const [data, setDataState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate user-specific storage key
  const getUserStorageKey = useCallback(() => {
    return user ? `${storageKey}_${user.id}` : storageKey;
  }, [storageKey, user]);

  // Load data from localStorage
  const loadData = useCallback(() => {
    if (!isAuthenticated || !user) {
      setDataState(initialValue);
      return;
    }

    try {
      const key = getUserStorageKey();
      const storedData = safeLocalStorage.getJSON<T>(key);
      
      if (storedData) {
        // Validate data if validator is provided
        if (validateData && !validateData(storedData)) {
          console.warn(`Invalid data found in localStorage for key: ${key}`);
          setDataState(initialValue);
          return;
        }

        // Transform data if transformer is provided
        const finalData = transformData ? transformData(storedData) : storedData;
        setDataState(finalData);
      } else {
        setDataState(initialValue);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
      setError('Failed to load data');
      setDataState(initialValue);
    }
  }, [isAuthenticated, user, getUserStorageKey, initialValue, validateData, transformData]);

  // Save data to localStorage
  const saveData = useCallback((dataToSave: T) => {
    if (!user) return false;

    try {
      const key = getUserStorageKey();
      const success = safeLocalStorage.setJSON(key, dataToSave);
      
      if (!success) {
        setError('Failed to save data');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
      setError('Failed to save data');
      return false;
    }
  }, [user, getUserStorageKey]);

  // Set data with automatic persistence
  const setData = useCallback((newData: T | ((prev: T) => T)) => {
    setDataState(prev => {
      const updatedData = typeof newData === 'function' 
        ? (newData as (prev: T) => T)(prev) 
        : newData;
      
      // Save to localStorage
      saveData(updatedData);
      
      return updatedData;
    });
  }, [saveData]);

  // Update data with loading state and error handling
  const updateData = useCallback(async (updater: (prev: T) => T): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate async operation (replace with actual API call if needed)
      await new Promise(resolve => setTimeout(resolve, 300));

      setDataState(prev => {
        const updatedData = updater(prev);
        saveData(updatedData);
        return updatedData;
      });

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to update data:', error);
      setError('Failed to update data');
      setIsLoading(false);
      return false;
    }
  }, [saveData]);

  // Reset data to initial value
  const resetData = useCallback(() => {
    setDataState(initialValue);
    
    if (user) {
      const key = getUserStorageKey();
      safeLocalStorage.removeItem(key);
    }
  }, [initialValue, user, getUserStorageKey]);

  // Refresh data from localStorage
  const refresh = useCallback(() => {
    loadData();
  }, [loadData]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load data on mount and when user changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Save data whenever it changes
  useEffect(() => {
    if (isAuthenticated && user && data !== initialValue) {
      saveData(data);
    }
  }, [data, isAuthenticated, user, saveData, initialValue]);

  return {
    data,
    setData,
    isLoading,
    error,
    clearError,
    updateData,
    resetData,
    refresh
  };
}

// Specialized hook for array data
export function useArrayContext<T>(options: UseBaseContextOptions<T[]>) {
  const baseContext = useBaseContext<T[]>(options);

  const addItem = useCallback(async (item: T): Promise<boolean> => {
    return baseContext.updateData(prev => [...prev, item]);
  }, [baseContext]);

  const removeItem = useCallback(async (predicate: (item: T) => boolean): Promise<boolean> => {
    return baseContext.updateData(prev => prev.filter(item => !predicate(item)));
  }, [baseContext]);

  const updateItem = useCallback(async (
    predicate: (item: T) => boolean, 
    updater: (item: T) => T
  ): Promise<boolean> => {
    return baseContext.updateData(prev => 
      prev.map(item => predicate(item) ? updater(item) : item)
    );
  }, [baseContext]);

  const findItem = useCallback((predicate: (item: T) => boolean): T | undefined => {
    return baseContext.data.find(predicate);
  }, [baseContext.data]);

  const hasItem = useCallback((predicate: (item: T) => boolean): boolean => {
    return baseContext.data.some(predicate);
  }, [baseContext.data]);

  return {
    ...baseContext,
    addItem,
    removeItem,
    updateItem,
    findItem,
    hasItem,
    items: baseContext.data,
    setItems: baseContext.setData
  };
}

// Error handling hook
export function useErrorHandler() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setError = useCallback((key: string, message: string) => {
    setErrors(prev => ({ ...prev, [key]: message }));
  }, []);

  const clearError = useCallback((key: string) => {
    setErrors(prev => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasError = useCallback((key?: string) => {
    if (key) return key in errors;
    return Object.keys(errors).length > 0;
  }, [errors]);

  const getError = useCallback((key: string) => {
    return errors[key] || null;
  }, [errors]);

  return {
    errors,
    setError,
    clearError,
    clearAllErrors,
    hasError,
    getError
  };
}