import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://palm-beach-directory.vercel.app'
  
  // Static pages
  const staticPages = [
    '',
    '/stores',
    '/areas', 
    '/offers',
  ]

  // Dynamic store pages
  const storePages = [
    '/stores/c-orrico',
    '/stores/tiffany-co',
  ]

  // Dynamic area pages
  const areaPages = [
    '/areas/worth-avenue',
    '/areas/royal-poinciana',
    '/areas/cityplace',
  ]

  const staticSitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const storeSitemap = storePages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const areaSitemap = areaPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticSitemap, ...storeSitemap, ...areaSitemap]
}