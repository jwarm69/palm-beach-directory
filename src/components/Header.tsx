"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import UserMenu from "@/components/auth/UserMenu";
import AuthModal from "@/components/auth/AuthModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <header className="sticky top-0 z-50 header-glass shadow-glass border-b border-white/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover-lift">
            <h1 className="text-2xl font-display font-bold text-luxury">
              Palm Beach
              <span className="text-gold-glow"> Luxe</span>
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
              className="text-gray-700 hover:text-gold transition-all duration-300 font-medium hover:scale-105"
            >
              Stores
            </Link>
            <Link
              href="/areas"
              className="text-gray-700 hover:text-gold transition-all duration-300 font-medium hover:scale-105"
            >
              Areas
            </Link>
            <Link
              href="/offers"
              className="text-gray-700 hover:text-gold transition-all duration-300 font-medium hover:scale-105"
            >
              Offers
            </Link>
            <Link
              href="/events"
              className="text-gray-700 hover:text-gold transition-all duration-300 font-medium hover:scale-105"
            >
              Events
            </Link>
            <Link
              href="/concierge"
              className="text-gray-700 hover:text-gold transition-all duration-300 font-medium hover:scale-105"
            >
              Concierge
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gold transition-all duration-300 font-medium hover:scale-105"
            >
              About
            </Link>
            <UserMenu onAuthClick={() => setShowAuthModal(true)} />
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
              <div className="pt-4 border-t border-sand/20">
                <UserMenu onAuthClick={() => setShowAuthModal(true)} />
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  );
}