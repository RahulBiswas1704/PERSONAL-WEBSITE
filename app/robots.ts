import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/insights'],
    },
    sitemap: 'https://rahul-biswas.vercel.app/sitemap.xml',
  };
}
