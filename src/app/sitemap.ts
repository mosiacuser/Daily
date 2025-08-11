import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

// 强制使用 Node.js 运行时
export const runtime = 'nodejs';

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: 将 'https://your-website-url.com' 替换为您的真实域名
  const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

  const projectRoot = process.cwd();
  // 关键修正：将路径指向 'src/app' 而不是 'app'
  const appDirectory = path.join(projectRoot, 'src', 'app');

  const getRoutesFromDirectory = (dir: string, prefix = ''): string[] => {
    let routes: string[] = [];
    
    // 检查目录是否存在，避免崩溃
    if (!fs.existsSync(dir)) {
      return [];
    }
    
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (file.startsWith('(') || file.startsWith('_')) {
        return;
      }
      
      if (stat.isDirectory()) {
        if (file === 'api') {
          return;
        }
        routes = routes.concat(getRoutesFromDirectory(fullPath, `/${file}`));
      } 
      else if (file.match(/^(page|route)\.(js|jsx|ts|tsx)$/)) {
        // 对于根目录的 page.tsx, prefix 是 /
        const routePath = prefix === '' ? '/' : prefix;
        if (!routes.includes(routePath)) {
            routes.push(routePath);
        }
      }
    });

    return routes;
  };

  const dynamicRoutes = getRoutesFromDirectory(appDirectory, '');

  // 确保根路径 '/' 存在 (如果 app/page.tsx 存在，它会被自动扫描到)
  if (!dynamicRoutes.includes('/')) {
      const rootPageExists = fs.existsSync(path.join(appDirectory, 'page.tsx')) || fs.existsSync(path.join(appDirectory, 'page.js'));
      if (rootPageExists) {
          dynamicRoutes.unshift('/');
      }
  }

  const allRoutes = [...new Set(dynamicRoutes)];

  const sitemapEntries: MetadataRoute.Sitemap = allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '/' ? 1 : 0.8,
  }));

  return sitemapEntries;
}