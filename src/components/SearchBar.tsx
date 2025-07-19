"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface SearchResult {
  type: 'store' | 'area' | 'offer';
  title: string;
  description: string;
  url: string;
  category?: string;
  area?: string;
}

// Mock search data - in a real app, this would come from an API
const searchData: SearchResult[] = [
  // Stores
  { type: 'store', title: 'C. Orrico', description: 'Timeless elegance and sophisticated fashion', url: '/stores/c-orrico', category: "Women's Fashion", area: 'Worth Avenue' },
  { type: 'store', title: 'Tiffany & Co.', description: 'Iconic jewelry and luxury goods since 1837', url: '/stores/tiffany-co', category: 'Jewelry', area: 'Worth Avenue' },
  { type: 'store', title: 'Hermès', description: 'French luxury goods manufacturer', url: '/stores/hermes', category: 'Luxury Goods', area: 'Worth Avenue' },
  { type: 'store', title: 'The Colony Shop', description: 'Preppy style and classic American fashion', url: '/stores/colony-shop', category: 'Fashion', area: 'Royal Poinciana' },
  { type: 'store', title: 'Stubbs & Wootton', description: 'Handcrafted needlepoint slippers', url: '/stores/stubbs-wootton', category: 'Shoes & Accessories', area: 'Worth Avenue' },
  
  // Areas
  { type: 'area', title: 'Worth Avenue', description: 'The crown jewel of luxury shopping', url: '/areas/worth-avenue' },
  { type: 'area', title: 'Royal Poinciana', description: 'Modern luxury shopping center', url: '/areas/royal-poinciana' },
  { type: 'area', title: 'CityPlace', description: 'Vibrant shopping and dining destination', url: '/areas/cityplace' },
  
  // Categories
  { type: 'store', title: 'Jewelry Stores', description: 'Discover fine jewelry and timepieces', url: '/stores?category=jewelry' },
  { type: 'store', title: 'Fashion Boutiques', description: 'Designer clothing and accessories', url: '/stores?category=fashion' },
  { type: 'store', title: 'Luxury Goods', description: 'Premium lifestyle accessories', url: '/stores?category=luxury-goods' },
];

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SearchBar({ 
  className = "", 
  placeholder = "Search stores, areas, or categories...",
  size = 'md'
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Search function with fuzzy matching
  const performSearch = (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.category?.toLowerCase().includes(lowercaseQuery) ||
      item.area?.toLowerCase().includes(lowercaseQuery)
    );

    // Sort by relevance (exact matches first, then partial matches)
    const sorted = filtered.sort((a, b) => {
      const aExact = a.title.toLowerCase().startsWith(lowercaseQuery) ? 1 : 0;
      const bExact = b.title.toLowerCase().startsWith(lowercaseQuery) ? 1 : 0;
      return bExact - aExact;
    });

    setResults(sorted.slice(0, 8)); // Limit to 8 results
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 200);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          router.push(results[selectedIndex].url);
          setIsOpen(false);
          setQuery("");
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    setQuery("");
  };

  const sizeClasses = {
    sm: 'h-9 text-sm',
    md: 'h-11 text-base',
    lg: 'h-14 text-lg'
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'store': return '🏪';
      case 'area': return '📍';
      case 'offer': return '🎁';
      default: return '🔍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'store': return 'Store';
      case 'area': return 'Area';
      case 'offer': return 'Offer';
      default: return '';
    }
  };

  return (
    <div className={`relative ${className}`} ref={resultsRef}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(query.length >= 2)}
          onKeyDown={handleKeyDown}
          className={`${sizeClasses[size]} pl-10 pr-4 bg-white/95 backdrop-blur-sm border-sand/40 focus:border-gold focus:ring-gold/20`}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 py-2 shadow-luxury border-sand/40 z-50 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleResultClick(result)}
              className={`w-full px-4 py-3 text-left hover:bg-sand/10 transition-colors border-none bg-transparent ${
                selectedIndex === index ? 'bg-sand/20' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{getTypeIcon(result.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-navy truncate">{result.title}</h4>
                    <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">
                      {getTypeLabel(result.type)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{result.description}</p>
                  {(result.category || result.area) && (
                    <div className="flex gap-2 mt-1">
                      {result.category && (
                        <span className="text-xs text-gray-500">{result.category}</span>
                      )}
                      {result.area && (
                        <span className="text-xs text-sage">• {result.area}</span>
                      )}
                    </div>
                  )}
                </div>
                <svg className="w-4 h-4 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
          
          {query.length >= 2 && (
            <div className="border-t border-sand/40 mt-2 pt-2">
              <Link 
                href={`/stores?search=${encodeURIComponent(query)}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gold hover:bg-sand/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                View all results for &ldquo;{query}&rdquo;
              </Link>
            </div>
          )}
        </Card>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 shadow-luxury border-sand/40 z-50">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm">No results found for &ldquo;{query}&rdquo;</p>
            <p className="text-xs mt-1">Try searching for store names, areas, or categories</p>
          </div>
        </Card>
      )}
    </div>
  );
}