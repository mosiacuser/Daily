"use client";

import React, { useState } from 'react';

interface TimelineItemProps {
  time: string;
  title: string;
  description: string;
  isOdd: boolean;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

interface TipCardProps {
  number: string;
  title: string;
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ time, title, description, isOdd }) => (
  <div className={`relative mb-12 w-full md:w-1/2 px-8 ${isOdd ? 'md:left-0 md:pr-16 md:text-right' : 'md:left-1/2 md:pl-16 md:text-left'}`}>
    <div className={`absolute top-8 w-5 h-5 bg-gradient-to-br from-red-400 to-teal-400 rounded-full border-4 border-white shadow-lg ${isOdd ? 'md:-right-2.5' : 'md:-left-2.5'} left-5 md:left-auto`}></div>
    <div className="bg-white p-10 rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="inline-block bg-gradient-to-r from-red-400 to-teal-400 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
        {time}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, onClick }) => (
  <div 
    className="bg-gray-50 p-12 rounded-3xl text-center transition-all duration-300 cursor-pointer border-2 border-transparent hover:-translate-y-3 hover:shadow-2xl hover:border-red-400 hover:bg-white group relative overflow-hidden"
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={`Learn more about ${title}`}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    <span className="text-6xl mb-8 block relative z-10">{icon}</span>
    <h3 className="text-2xl font-bold mb-6 text-gray-900 relative z-10">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-lg relative z-10">{description}</p>
  </div>
);

const TipCard: React.FC<TipCardProps> = ({ number, title, description }) => (
  <div className="bg-white bg-opacity-10 p-10 rounded-3xl backdrop-blur-xl border border-white border-opacity-20 transition-all duration-300 hover:-translate-y-2 hover:bg-opacity-15 hover:shadow-2xl">
    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-400 to-teal-400 text-white rounded-full text-xl font-bold mb-6">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-base leading-relaxed opacity-90">{description}</p>
  </div>
);

const GrokAIGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('setup');
  const [demoResult, setDemoResult] = useState<boolean>(false);

  const handleTabClick = (tabId: string): void => {
    setActiveTab(tabId);
  };

  const handleDemoSubmit = (): void => {
    setDemoResult(true);
    setTimeout(() => setDemoResult(false), 5000);
  };

  const animateCard = (element: HTMLElement): void => {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 150);
  };

  const timelineData = [
    {
      time: "00:00",
      title: "Introduction & Setup",
      description: "Comprehensive guide introduction, Grok AI overview as ChatGPT alternative, user interface walkthrough, and importance of understanding core features for optimal usage."
    },
    {
      time: "03:37", 
      title: "Artistic Creation & Recraft",
      description: "Utilizing Grok AI and Recraft for artistic projects, browsing styles, creating consistent brand identity, style mixing techniques, and business applications for non-designers."
    },
    {
      time: "07:19",
      title: "Text Improvement & Web Search", 
      description: "Essential tips for effective Grok usage, text enhancement techniques, web search activation, canvas mode exploration, and specifying requirements for optimal results."
    },
    {
      time: "10:58",
      title: "Advanced Image Generation",
      description: "Practical image generation tips, detailed prompt crafting, style incorporation, editing panel usage, and manual adjustment techniques for professional results."
    },
    {
      time: "14:37",
      title: "Deep Search Capabilities",
      description: "Research options exploration, deep and deeper search functionalities, question framing strategies, result refinement techniques, and reasoning capabilities breakdown."
    },
    {
      time: "18:19",
      title: "Data Analysis & Scenario Planning", 
      description: "Effective data analysis techniques, scenario planning implementation, what-if analysis, reference file uploading, report generation, and persona switching for tailored responses."
    }
  ];

  const featuresData = [
    {
      icon: "🎨",
      title: "Advanced Image Generation",
      description: "Create stunning visuals with detailed prompts, style mixing, and professional editing capabilities. Perfect for businesses and creative projects."
    },
    {
      icon: "🔍", 
      title: "Deep Web Search",
      description: "Access real-time information with advanced search capabilities. Get reliable, up-to-date results from across the web with source validation."
    },
    {
      icon: "📊",
      title: "Data Analysis Tools",
      description: "Upload files and analyze data with sophisticated AI capabilities. Generate reports, visualizations, and insights from your datasets."
    },
    {
      icon: "✍️",
      title: "Text Enhancement",
      description: "Improve your writing with advanced language processing. Get suggestions for clarity, tone, and structure to enhance your content."
    },
    {
      icon: "🎭",
      title: "Persona Switching",
      description: "Switch between different AI personalities and expertise areas to get tailored responses for specific use cases and industries."
    },
    {
      icon: "🔒",
      title: "Privacy Focused",
      description: "Built with privacy in mind, offering secure interactions and data handling for sensitive business and personal use cases."
    }
  ];

  const tipsData = [
    {
      number: "1",
      title: "Be Specific with Prompts",
      description: "The more detailed your requests, the better results you'll get. Include context, desired output format, and specific requirements."
    },
    {
      number: "2", 
      title: "Use Canvas Mode",
      description: "Leverage canvas mode for complex projects that require multiple iterations and collaborative editing capabilities."
    },
    {
      number: "3",
      title: "Enable Web Search",
      description: "Activate web search for real-time information and current events to get the most up-to-date and accurate responses."
    },
    {
      number: "4",
      title: "Upload Reference Files", 
      description: "Upload documents, images, and data files to provide context and enable more accurate analysis and recommendations."
    },
    {
      number: "5",
      title: "Experiment with Styles",
      description: "Try different artistic styles and combinations in image generation to find the perfect aesthetic for your projects."
    },
    {
      number: "6",
      title: "Use Scenario Planning",
      description: "Leverage Grok's scenario planning capabilities for business strategy, risk assessment, and decision-making processes."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">


      {/* Header */}
      <header className="bg-gradient-to-br from-gray-900 via-gray-700 to-gray-600 text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-transparent opacity-5 animate-pulse"></div>
        <div className="container mx-auto px-5 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4 animate-fade-in">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-400 to-teal-400 rounded-2xl flex items-center justify-center text-4xl md:text-5xl border-4 border-white border-opacity-30 shadow-xl">
              🤖
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">Grok AI</h1>
          </div>
                      <p className="text-xl md:text-3xl opacity-95 max-w-4xl mx-auto mb-6 font-light leading-relaxed">
            Ultimate Beginner&rsquo;s Guide 2025 - Master AI Like Never Before
          </p>
                        <p className="text-lg md:text-xl opacity-90 mb-12 max-w-3xl mx-auto">
            Comprehensive tutorial covering customization, image generation, data analysis, and advanced features
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="bg-white bg-opacity-15 px-6 py-3 rounded-full text-base font-medium backdrop-blur-md border border-white border-opacity-20 transition-all duration-300 hover:bg-opacity-25 hover:-translate-y-1">
              🎨 Image Generation
            </span>
            <span className="bg-white bg-opacity-15 px-6 py-3 rounded-full text-base font-medium backdrop-blur-md border border-white border-opacity-20 transition-all duration-300 hover:bg-opacity-25 hover:-translate-y-1">
              📊 Data Analysis
            </span>
            <span className="bg-white bg-opacity-15 px-6 py-3 rounded-full text-base font-medium backdrop-blur-md border border-white border-opacity-20 transition-all duration-300 hover:bg-opacity-25 hover:-translate-y-1">
              🔍 Deep Search
            </span>
            <span className="bg-white bg-opacity-15 px-6 py-3 rounded-full text-base font-medium backdrop-blur-md border border-white border-opacity-20 transition-all duration-300 hover:bg-opacity-25 hover:-translate-y-1">
              ✍️ Text Enhancement
            </span>
          </div>
        </div>
      </header>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Goodbye ChatGPT o3... Hello Grok 3!
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Discover why Grok AI is becoming the go-to choice for advanced AI users
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a 
              href="https://grok.x.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-5 text-xl font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl no-underline relative overflow-hidden group"
              aria-label="Try Grok AI Now - Opens in new tab"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
              🚀 Try Grok AI Now
            </a>
            <a 
              href="https://www.youtube.com/watch?v=yut6vtu2tQU" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-5 text-xl font-semibold text-gray-900 bg-white border-2 border-gray-900 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-gray-50 no-underline"
              aria-label="Watch Full Tutorial on YouTube - Opens in new tab"
            >
              📺 Watch Full Tutorial
            </a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-5">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Complete Grok AI Masterclass
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light">
              Everything you need to know to become a Grok AI power user
            </p>
            
            <div className="bg-gradient-to-r from-red-400 to-teal-400 text-white p-10 rounded-3xl mb-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full opacity-10">
                <div className="w-96 h-96 bg-white rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 relative z-10">🎯 What You&rsquo;ll Learn</h3>
              <p className="relative z-10 text-lg">
                From basic setup to advanced features - this comprehensive guide covers customization, privacy settings, artistic creation, text improvement, web search, and data analysis
              </p>
            </div>
            
            <div className="relative w-full aspect-video mb-12 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105">
              <iframe 
                src="https://www.youtube.com/embed/yut6vtu2tQU" 
                title="Goodbye ChatGPT o3… Ultimate Grok 3 Guide 2025 (How to use Grok AI for beginners)"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            </div>
            <a 
              href="https://www.youtube.com/watch?v=yut6vtu2tQU" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-5 text-xl font-semibold text-gray-900 bg-white border-2 border-gray-900 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-gray-50 no-underline"
              aria-label="Open video in YouTube - Opens in new tab"
            >
              🔗 Open in YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 to-blue-100">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Video Timeline & Key Topics
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              Navigate through the comprehensive tutorial with these timestamped sections
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-teal-400 transform -translate-x-1/2 hidden md:block"></div>
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-teal-400 md:hidden"></div>
            
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                time={item.time}
                title={item.title}
                description={item.description}
                isOdd={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Key Grok AI Features
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              Discover what makes Grok AI stand out from other AI assistants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuresData.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onClick={() => animateCard(document.querySelector(`.feature-card:nth-child(${index + 1})`) as HTMLElement)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pro Tips for Grok AI
            </h2>
            <p className="text-xl md:text-2xl opacity-90 font-light">
              Master these techniques to get the most out of Grok AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {tipsData.map((tip, index) => (
              <TipCard
                key={index}
                number={tip.number}
                title={tip.title}
                description={tip.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Try Grok AI Features
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              Experience the power of Grok AI with these interactive examples
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white p-16 rounded-3xl shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 mb-12 border-b-2 border-gray-200">
              {[
                { id: 'setup', label: 'Setup Guide' },
                { id: 'prompts', label: 'Prompt Examples' },
                { id: 'features', label: 'Feature Demo' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`px-8 py-4 text-lg font-semibold cursor-pointer border-b-4 transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'text-gray-900 border-red-400' 
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                  aria-label={`Switch to ${tab.label} tab`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className={`transition-opacity duration-300 ${activeTab === 'setup' ? 'block' : 'hidden'}`}>
              <div className="mb-8">
                <label className="block mb-4 font-semibold text-gray-900">
                  Getting Started with Grok AI
                </label>
                <textarea
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl text-lg transition-colors duration-300 focus:outline-none focus:border-red-400 resize-vertical"
                  rows={4}
                  placeholder="Enter your question or task for Grok AI..."
                  defaultValue="How can I use Grok AI for my business content creation?"
                />
              </div>
              <button
                className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-5 rounded-full font-semibold text-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                onClick={handleDemoSubmit}
                aria-label="Submit demo query"
              >
                Try with Grok AI
              </button>
            </div>
            
            <div className={`transition-opacity duration-300 ${activeTab === 'prompts' ? 'block' : 'hidden'}`}>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Image Generation Prompt</h4>
                  <p className="text-gray-700">&ldquo;Create a modern, minimalist logo for a tech startup focused on AI solutions, using blue and silver colors&rdquo;</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Data Analysis Prompt</h4>
                  <p className="text-gray-700">&ldquo;Analyze the uploaded sales data and provide insights on quarterly performance trends with recommendations&rdquo;</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Content Enhancement Prompt</h4>
                  <p className="text-gray-700">&ldquo;Improve this blog post for better readability and SEO optimization while maintaining the original tone&rdquo;</p>
                </div>
              </div>
            </div>
            
            <div className={`transition-opacity duration-300 ${activeTab === 'features' ? 'block' : 'hidden'}`}>
              <div className="text-center">
                <h4 className="text-2xl font-semibold text-gray-900 mb-6">Explore Grok AI Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl">
                    <h5 className="font-semibold text-gray-900 mb-2">🎨 Creative Tools</h5>
                    <p className="text-gray-700">Image generation, style mixing, and artistic creation</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl">
                    <h5 className="font-semibold text-gray-900 mb-2">📊 Analytics</h5>
                    <p className="text-gray-700">Data analysis, reporting, and insights generation</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                    <h5 className="font-semibold text-gray-900 mb-2">🔍 Research</h5>
                    <p className="text-gray-700">Deep web search and information gathering</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                    <h5 className="font-semibold text-gray-900 mb-2">✍️ Writing</h5>
                    <p className="text-gray-700">Content creation and text enhancement</p>
                  </div>
                </div>
              </div>
            </div>
            
            {demoResult && (
              <div className="mt-12 p-10 bg-blue-50 rounded-2xl border-l-4 border-red-400">
                <h4 className="font-semibold text-gray-900 mb-2">✅ Demo Result</h4>
                <p className="text-gray-700">
                  Great! This is how Grok AI would respond to your query. The actual response would include detailed, contextual information tailored to your specific needs and requirements.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="mb-6 text-red-400 text-xl font-semibold">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="https://grok.x.ai" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-400 transition-colors duration-300 no-underline">Grok AI Platform</a></li>
                <li><a href="https://www.youtube.com/watch?v=yut6vtu2tQU" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-400 transition-colors duration-300 no-underline">Full Tutorial</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-red-400 transition-colors duration-300 no-underline">Features</a></li>
                <li><a href="#timeline" className="text-gray-300 hover:text-red-400 transition-colors duration-300 no-underline">Video Timeline</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-red-400 text-xl font-semibold">Features</h4>
              <ul className="space-y-3">
                <li><span className="text-gray-300">Image Generation</span></li>
                <li><span className="text-gray-300">Data Analysis</span></li>
                <li><span className="text-gray-300">Web Search</span></li>
                <li><span className="text-gray-300">Text Enhancement</span></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-red-400 text-xl font-semibold">Resources</h4>
              <ul className="space-y-3">
                <li><span className="text-gray-300">Beginner Guide</span></li>
                <li><span className="text-gray-300">Pro Tips</span></li>
                <li><span className="text-gray-300">Best Practices</span></li>
                <li><span className="text-gray-300">Advanced Features</span></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-red-400 text-xl font-semibold">Support</h4>
              <ul className="space-y-3">
                <li><span className="text-gray-300">Documentation</span></li>
                <li><span className="text-gray-300">Community</span></li>
                <li><span className="text-gray-300">FAQ</span></li>
                <li><span className="text-gray-300">Contact</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Grok AI Ultimate Guide. This is an educational resource for learning about Grok AI features and capabilities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GrokAIGuide;