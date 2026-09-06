import { MetadataRoute } from 'next'
import { posts } from '@/lib/posts'
import { detailedCases } from '@/lib/case-studies'

const BASE_URL = 'https://neuralautomate.dev'

const services = [
  'whatsapp-bot',
  'crm-sync',
  'invoice-automation',
  'data-entry',
  'ai-email-responder',
  'custom-n8n',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/how-it-works`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/case-studies`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/work`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/calculator`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/demo`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const caseStudyPages: MetadataRoute.Sitemap = detailedCases.map((item) => ({
    url: `${BASE_URL}/case-studies/${item.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...blogPages, ...caseStudyPages]
}
