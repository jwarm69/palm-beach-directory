"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sand/20 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-display font-bold text-navy">
              Palm Beach
              <span className="text-gold"> Luxe</span>
            </h1>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <SearchBar size="sm" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/stores"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              Stores
            </Link>
            <Link
              href="/areas"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              Areas
            </Link>
            <Link
              href="/offers"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              Offers
            </Link>
            <Link
              href="/events"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              Events
            </Link>
            <Link
              href="/concierge"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              Concierge
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-navy transition-colors font-medium"
            >
              About
            </Link>
            <Button className="btn-gold">
              List Your Store
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-sand/20">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="lg:hidden">
                <SearchBar size="md" placeholder="Search..." />
              </div>
              
              <Link
                href="/stores"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Stores
              </Link>
              <Link
                href="/areas"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Areas
              </Link>
              <Link
                href="/offers"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Offers
              </Link>
              <Link
                href="/events"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/concierge"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Concierge
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Button className="btn-gold w-full">
                List Your Store
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}