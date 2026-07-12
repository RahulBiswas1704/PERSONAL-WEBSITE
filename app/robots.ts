import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/insights'],
    },
    sitemap: 'https://rahul-website.vercel.app/sitemap.xml',
  };
}
