// No "use client" needed, this is a Server Component.
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// --- TYPE DEFINITIONS for this page ---
interface PageRoute {
  path: string;
  title: string;
  description: string;
}

// Corrected function to find page routes
function findPageRoutes(dir: string): PageRoute[] {
  let routes: PageRoute[] = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Recursively find routes in subdirectories
        routes = routes.concat(findPageRoutes(fullPath));
      } else if (entry.name === 'page.tsx') {
        const routePath = dir.replace(path.join(process.cwd(), 'src/app'), '').replace(/\\/g, '/');
        
        // **THE FIX IS HERE:**
        // Only create a card if it's in a subdirectory (not the root app directory).
        if (routePath) {
          const title = path.basename(dir).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          const description = `Explore the ${title} page.`;
          
          routes.push({
            path: routePath,
            title: title,
            description: description,
          });
        }
      }
    }
  } catch (error) {
    // Silently fail if a directory can't be read
  }
  return routes;
}

const pages = findPageRoutes(path.join(process.cwd(), 'src/app'));

// --- COMPONENTS ---

const Header = () => (
    <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">AI for Education Training Resources</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A collection of interactive pages and resources from the AI for Education training course. Click on a card to explore a specific module.
        </p>
    </header>
);

const PageCard = ({ page }: { page: PageRoute }) => (
    <Link href={page.path} className="block group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border overflow-hidden">
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">{page.title}</h3>
            <p className="text-gray-600 text-sm">{page.description}</p>
        </div>
        <div className="px-6 pb-4">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                View Module →
            </span>
        </div>
    </Link>
);


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="container mx-auto px-4 py-12">
        <Header />
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((page) => (
                <PageCard key={page.path} page={page} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}