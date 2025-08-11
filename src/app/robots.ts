import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // TODO: 在 Vercel 和 Netlify 的环境变量中设置 SITE_URL
  const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/', // 可以在这里添加不想被索引的路径
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
