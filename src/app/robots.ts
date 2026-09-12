import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://qr-code-generator-saas-platform-al-afzal-solution.vercel.app';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/', '/r/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
