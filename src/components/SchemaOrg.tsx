import React from 'react'

interface SocialProfile {
  platform: string
  url: string
}

interface BusinessHours {
  dayOfWeek: string
  opens: string
  closes: string
}

export function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Studio E",
    "url": "https://studioe.dance",
    "logo": "https://studioe.dance/studio-e-logo.svg",
    "description": "Studio E is a dance instruction marketplace connecting passionate instructors with eager students.",
    "sameAs": [
      "https://www.instagram.com/joinstudioe",
      "https://www.facebook.com/joinstudioe",
      "https://www.tiktok.com/@joinstudioe",
      "https://www.youtube.com/@joinstudioe"
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://studioe.dance"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@studioe.dance"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  )
}

export function LocalBusinessSchema() {
  const businessHours: BusinessHours[] = [
    { dayOfWeek: "Monday", opens: "09:00", closes: "21:00" },
    { dayOfWeek: "Tuesday", opens: "09:00", closes: "21:00" },
    { dayOfWeek: "Wednesday", opens: "09:00", closes: "21:00" },
    { dayOfWeek: "Thursday", opens: "09:00", closes: "21:00" },
    { dayOfWeek: "Friday", opens: "09:00", closes: "21:00" },
    { dayOfWeek: "Saturday", opens: "10:00", closes: "18:00" },
    { dayOfWeek: "Sunday", opens: "10:00", closes: "18:00" }
  ]

  const businessData = {
    "@context": "https://schema.org",
    "@type": "DanceSchool",
    "name": "Studio E",
    "image": "https://studioe.dance/studio-e-logo.svg",
    "url": "https://studioe.dance",
    "telephone": "+1-312-555-0123",
    "email": "hello@studioe.dance",
    "description": "Studio E is a dance instruction marketplace connecting passionate instructors with eager students.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Dance Street",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60601",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.8781,
      "longitude": -87.6298
    },
    "openingHoursSpecification": businessHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": hours.dayOfWeek,
      "opens": hours.opens,
      "closes": hours.closes
    })),
    "areaServed": [
      {
        "@type": "City",
        "name": "Chicago"
      },
      {
        "@type": "City",
        "name": "Minneapolis"
      },
      {
        "@type": "City",
        "name": "Milwaukee"
      }
    ],
    "priceRange": "$$"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
    />
  )
}

export function FAQSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of dance classes do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a wide variety of dance styles including Salsa, Bachata, Hip Hop, Heels, Contemporary, and more. Each style is taught by experienced instructors who specialize in their respective genres."
        }
      },
      {
        "@type": "Question",
        "name": "How much do dance lessons cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our lesson prices vary by instructor and typically range from $50-100 per hour for private instruction. Group classes and packages may offer different pricing options."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need prior dance experience?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No prior experience is necessary! Our instructors work with students of all skill levels, from complete beginners to advanced dancers."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book a lesson?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can browse our instructor profiles, select your preferred instructor, and book directly through our platform. Each instructor's availability and booking process is clearly displayed on their profile."
        }
      },
      {
        "@type": "Question",
        "name": "What is your cancellation policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We require 24 hours notice for cancellations. Lessons cancelled with less than 24 hours notice may be subject to a cancellation fee."
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}

export default function SchemaOrg() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <FAQSchema />
    </>
  )
} 