import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Palm Beach Luxury Palette
        navy: '#1B2951',
        gold: '#D4AF37',
        coral: '#FF6B6B',
        sage: '#87A96B',
        sand: '#F5E6D3',
        
        // Shadcn base colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#1B2951', // Navy
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: '#F5E6D3', // Sand
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: '#D4AF37', // Gold
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "shimmer": "shimmer 2s infinite",
      },
      boxShadow: {
        'luxury': '0 10px 25px -5px rgba(27, 41, 81, 0.1), 0 10px 10px -5px rgba(27, 41, 81, 0.04)',
        'luxury-deep': '0 20px 40px -10px rgba(27, 41, 81, 0.15), 0 10px 20px -5px rgba(27, 41, 81, 0.08)',
        'luxury-glow': '0 20px 40px -10px rgba(27, 41, 81, 0.2), 0 0 30px rgba(212, 175, 55, 0.15)',
        'luxury-card': '0 15px 35px -5px rgba(27, 41, 81, 0.08), 0 5px 15px -3px rgba(27, 41, 81, 0.04)',
        'luxury-hover': '0 25px 50px -10px rgba(27, 41, 81, 0.15), 0 10px 30px -5px rgba(212, 175, 55, 0.1)',
        'gold': '0 10px 25px -5px rgba(212, 175, 55, 0.2)',
        'gold-deep': '0 20px 40px -10px rgba(212, 175, 55, 0.25), 0 10px 20px -5px rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 20px 40px -10px rgba(212, 175, 55, 0.3), 0 0 30px rgba(212, 175, 55, 0.2)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.15), 0 8px 16px rgba(31, 38, 135, 0.1)',
        'glass-glow': '0 8px 32px rgba(31, 38, 135, 0.2), 0 0 20px rgba(212, 175, 55, 0.1)',
        'premium': '0 16px 32px -8px rgba(27, 41, 81, 0.12), 0 8px 16px -4px rgba(212, 175, 55, 0.08)',
        'premium-glow': '0 20px 40px -8px rgba(27, 41, 81, 0.15), 0 8px 24px -4px rgba(212, 175, 55, 0.15)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #1B2951 0%, #87A96B 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F5E6D3 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config