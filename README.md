# Palm Beach Luxury Shopping Directory

A sophisticated digital directory showcasing Palm Beach's finest shopping destinations, featuring premium store listings and exclusive welcome offers for first-time visitors.

## Project Overview

This luxury shopping directory serves as the definitive guide to Palm Beach's retail landscape, connecting discerning shoppers with the area's most prestigious boutiques, galleries, and specialty stores.

### Key Features

- **Curated Store Listings**: Hand-selected premium retailers across Palm Beach
- **Welcome Offers**: Exclusive first-time visitor privileges from participating stores
- **Interactive Map**: Custom-styled map with luxury store locations
- **Area Guides**: Comprehensive coverage of Worth Avenue, Royal Poinciana, and beyond
- **Mobile-First Design**: Optimized for on-the-go shopping discovery

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom luxury theme
- **UI Components**: shadcn/ui with Radix primitives
- **Content Management**: Sanity CMS
- **Authentication**: Clerk (for store owners)
- **Payments**: Stripe (for premium listings)
- **Deployment**: Vercel
- **Analytics**: Plausible Analytics

## Color Palette

- **Navy**: #1B2951 (Primary)
- **Gold**: #D4AF37 (Accent)
- **Coral**: #FF6B6B (Highlights)
- **Sage**: #87A96B (Natural touch)
- **Sand**: #F5E6D3 (Neutral base)

## Project Structure

```
palm-beach-directory/
├── app/                 # Next.js app directory
│   ├── (routes)/       # Route groups
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/             # shadcn/ui components
│   └── custom/         # Project-specific components
├── lib/                # Utility functions
├── sanity/             # Sanity CMS configuration
├── public/             # Static assets
└── docs/               # Documentation
```

## Development Workflow

1. **Phase 0**: Brand identity and repository setup
2. **Phase 1**: Technical foundation (Next.js, Sanity, deployment)
3. **Phase 2**: Data architecture and schemas
4. **Phase 3**: Design system and component library
5. **Phase 4**: Core pages and features
6. **Phase 5**: Authentication and payments
7. **Phase 6**: Store onboarding system
8. **Phase 7**: Social media integration
9. **Phase 8**: SEO and analytics
10. **Phase 9**: Quality assurance
11. **Phase 10**: Soft launch
12. **Phase 11**: Growth and optimization

## Getting Started

```bash
# Clone the repository
git clone https://github.com/jwarm69/palm-beach-directory.git
cd palm-beach-directory

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## Contributing

This project follows strict quality standards:
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Small, focused components (<50 lines)
- Comprehensive testing
- Responsive design principles
- Accessibility compliance (WCAG 2.1 AA)

## Business Model

- **Premium Listings**: Featured placement for participating stores
- **Welcome Offers**: Revenue share from redemption tracking
- **Directory Advertising**: Seasonal campaigns and events
- **Partnership Programs**: Hotel concierge and tourism board collaborations

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

*Connecting Palm Beach's finest retailers with discerning shoppers since 2025*