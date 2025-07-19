"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FilterOptions {
  areas: string[];
  categories: string[];
  priceRanges: string[];
  amenities: string[];
  search: string;
  hasOffers: boolean;
  isPremium: boolean;
}

interface StoreFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
}

const AREAS = [
  "Worth Avenue",
  "Royal Poinciana",
  "CityPlace",
  "Downtown West Palm"
];

const CATEGORIES = [
  "Women's Fashion",
  "Men's Fashion",
  "Jewelry",
  "Shoes & Accessories",
  "Luxury Goods",
  "Beauty & Cosmetics",
  "Home & Lifestyle",
  "Art & Antiques"
];

const PRICE_RANGES = [
  "$", "$$", "$$$", "$$$$"
];

const AMENITIES = [
  "Personal Shopping",
  "Alterations",
  "Gift Wrapping",
  "Private Appointments",
  "Valet Parking",
  "Complimentary Refreshments",
  "VIP Services",
  "Custom Orders"
];

export default function StoreFilters({ onFiltersChange, initialFilters = {} }: StoreFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    areas: initialFilters.areas || [],
    categories: initialFilters.categories || [],
    priceRanges: initialFilters.priceRanges || [],
    amenities: initialFilters.amenities || [],
    search: initialFilters.search || "",
    hasOffers: initialFilters.hasOffers || false,
    isPremium: initialFilters.isPremium || false,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const toggleArrayFilter = (filterType: keyof Pick<FilterOptions, 'areas' | 'categories' | 'priceRanges' | 'amenities'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const toggleBooleanFilter = (filterType: 'hasOffers' | 'isPremium') => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      areas: [],
      categories: [],
      priceRanges: [],
      amenities: [],
      search: "",
      hasOffers: false,
      isPremium: false,
    });
  };

  const getActiveFilterCount = () => {
    return filters.areas.length + 
           filters.categories.length + 
           filters.priceRanges.length + 
           filters.amenities.length + 
           (filters.hasOffers ? 1 : 0) + 
           (filters.isPremium ? 1 : 0) +
           (filters.search ? 1 : 0);
  };

  const FilterSection = ({ title, options, filterKey, selectedValues }: {
    title: string;
    options: string[];
    filterKey: keyof Pick<FilterOptions, 'areas' | 'categories' | 'priceRanges' | 'amenities'>;
    selectedValues: string[];
  }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-navy">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant="outline"
            size="sm"
            onClick={() => toggleArrayFilter(filterKey, option)}
            className={`h-8 text-xs transition-colors ${
              selectedValues.includes(option)
                ? 'bg-gold text-navy border-gold hover:bg-gold/90'
                : 'bg-white border-sand/40 text-gray-700 hover:border-gold hover:text-gold'
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="mb-8 border-sand/40">
      <CardContent className="p-6">
        {/* Quick Filters Row */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex-1 min-w-64">
            <Label htmlFor="search" className="sr-only">Search stores</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search stores..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="bg-white border-sand/40 focus:border-gold"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleBooleanFilter('hasOffers')}
              className={`transition-colors ${
                filters.hasOffers
                  ? 'bg-coral text-white border-coral hover:bg-coral/90'
                  : 'bg-white border-sand/40 text-gray-700 hover:border-coral hover:text-coral'
              }`}
            >
              🎁 With Offers
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleBooleanFilter('isPremium')}
              className={`transition-colors ${
                filters.isPremium
                  ? 'bg-gold text-navy border-gold hover:bg-gold/90'
                  : 'bg-white border-sand/40 text-gray-700 hover:border-gold hover:text-gold'
              }`}
            >
              ✨ Premium
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white border-sand/40 text-gray-700 hover:border-navy hover:text-navy"
          >
            {isExpanded ? 'Fewer Filters' : 'More Filters'}
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 bg-gold text-navy text-xs px-2 py-0.5 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>

          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-red-600"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="border-t border-sand/40 pt-6 space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FilterSection
                title="Shopping Areas"
                options={AREAS}
                filterKey="areas"
                selectedValues={filters.areas}
              />
              
              <FilterSection
                title="Categories"
                options={CATEGORIES}
                filterKey="categories"
                selectedValues={filters.categories}
              />
              
              <FilterSection
                title="Price Range"
                options={PRICE_RANGES}
                filterKey="priceRanges"
                selectedValues={filters.priceRanges}
              />
              
              <FilterSection
                title="Amenities"
                options={AMENITIES}
                filterKey="amenities"
                selectedValues={filters.amenities}
              />
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <div className="border-t border-sand/40 pt-4 mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Active filters:</span>
              
              {filters.search && (
                <span className="inline-flex items-center gap-1 bg-navy text-white text-xs px-2 py-1 rounded-full">
                  Search: "{filters.search}"
                  <button 
                    onClick={() => setFilters(prev => ({ ...prev, search: "" }))}
                    className="hover:bg-white/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {[...filters.areas, ...filters.categories, ...filters.priceRanges, ...filters.amenities].map((filter) => (
                <span key={filter} className="inline-flex items-center gap-1 bg-gold text-navy text-xs px-2 py-1 rounded-full">
                  {filter}
                  <button 
                    onClick={() => {
                      if (AREAS.includes(filter)) toggleArrayFilter('areas', filter);
                      else if (CATEGORIES.includes(filter)) toggleArrayFilter('categories', filter);
                      else if (PRICE_RANGES.includes(filter)) toggleArrayFilter('priceRanges', filter);
                      else if (AMENITIES.includes(filter)) toggleArrayFilter('amenities', filter);
                    }}
                    className="hover:bg-navy/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
              
              {filters.hasOffers && (
                <span className="inline-flex items-center gap-1 bg-coral text-white text-xs px-2 py-1 rounded-full">
                  With Offers
                  <button 
                    onClick={() => toggleBooleanFilter('hasOffers')}
                    className="hover:bg-white/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {filters.isPremium && (
                <span className="inline-flex items-center gap-1 bg-sage text-white text-xs px-2 py-1 rounded-full">
                  Premium
                  <button 
                    onClick={() => toggleBooleanFilter('isPremium')}
                    className="hover:bg-white/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}