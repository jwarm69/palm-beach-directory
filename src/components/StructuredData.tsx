interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  categories: string[];
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
  hours?: { day: string; time: string }[];
}

export function LocalBusinessSchema({
  name,
  description,
  address,
  phone,
  website,
  categories,
  rating,
  reviewCount,
  priceRange,
  hours,
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url: website,
    telephone: phone,
    priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Palm Beach",
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.7056",
      longitude: "-80.0364",
    },
    areaServed: {
      "@type": "City",
      name: "Palm Beach",
      addressRegion: "FL",
      addressCountry: "US",
    },
    ...(rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating,
        reviewCount: reviewCount || 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(hours && {
      openingHoursSpecification: hours.map((hour) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hour.day,
        opens: hour.time.split(" - ")[0],
        closes: hour.time.split(" - ")[1],
      })),
    }),
    ...(categories.length > 0 && {
      category: categories.join(", "),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OfferSchemaProps {
  name: string;
  description: string;
  validFrom: string;
  validThrough: string;
  businessName: string;
  url: string;
}

export function OfferSchema({
  name,
  description,
  validFrom,
  validThrough,
  businessName,
  url,
}: OfferSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name,
    description,
    validFrom,
    validThrough,
    url,
    offeredBy: {
      "@type": "LocalBusiness",
      name: businessName,
    },
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: {
    name: string;
    url: string;
  }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationSchemaProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
  };
}

export function OrganizationSchema({
  name,
  description,
  url,
  logo,
  contactPoint,
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url,
    ...(logo && { logo }),
    ...(contactPoint && { contactPoint }),
    areaServed: {
      "@type": "City",
      name: "Palm Beach",
      addressRegion: "FL",
      addressCountry: "US",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}