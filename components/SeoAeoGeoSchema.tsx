import React from 'react';

export default function SeoAeoGeoSchema() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'NeuralAutomate.dev',
    'url': 'https://neuralautomate.dev',
    'description': 'End-to-End AI Automation, Website Development, E-Commerce Engineering & Digital Marketing Agency.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://neuralautomate.dev/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://neuralautomate.dev/#organization',
    'name': 'NeuralAutomate.dev',
    'url': 'https://neuralautomate.dev',
    'logo': 'https://neuralautomate.dev/logo.png',
    'sameAs': [
      'https://twitter.com/neuralautomate',
      'https://linkedin.com/company/neuralautomate',
      'https://github.com/neuralautomate'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer support',
      'email': 'info@neuralautomate.dev',
      'availableLanguage': ['English', 'Hindi']
    },
    'knowsAbout': [
      'AI Workflow Automation',
      'Custom Web Development',
      'E-Commerce Store Engineering',
      'Generative Engine Optimization (GEO)',
      'Answer Engine Optimization (AEO)',
      'Search Engine Optimization (SEO)',
      'Digital Marketing & CRO'
    ]
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'NeuralAutomate.dev Agency',
    'image': 'https://neuralautomate.dev/og-image.png',
    '@id': 'https://neuralautomate.dev/#service',
    'url': 'https://neuralautomate.dev',
    'telephone': '+17537231090',
    'priceRange': '$$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Plot no 225, yuvis complex, halwara airport',
      'postalCode': '141106',
      'addressCountry': 'IN'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'NeuralAutomate Core Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'AI & Workflow Automations',
            'description': 'Custom autonomous AI agents, CRM sync, auto-lead workflows, and Zapier/Make custom integrations.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Custom Website & Web Application Development',
            'description': 'Ultra-fast Next.js/React digital platforms engineered for conversion and SEO performance.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'E-Commerce Store Engineering',
            'description': 'High-converting Shopify, Headless Next.js, and WooCommerce digital storefronts.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'AEO & GEO Optimization',
            'description': 'Rank top-of-funnel across Google AI Overviews, ChatGPT, Perplexity, and SearchGPT.'
          }
        }
      ]
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What services does NeuralAutomate.dev provide?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'NeuralAutomate.dev provides end-to-end (A-Z) digital development services including AI workflow automations, custom website & web app engineering, e-commerce development, digital growth marketing, and SEO/AEO/GEO optimization.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is AEO and GEO optimization?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) are next-generation techniques designed to ensure your business brand is cited, recommended, and ranked inside AI search systems like ChatGPT, Perplexity, Claude, SearchGPT, and Google AI Overviews.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How fast can NeuralAutomate deploy AI automations for my business?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Most core AI automations and website builds are launched within 2 to 4 weeks, delivering instant operational efficiency and automated lead management.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
