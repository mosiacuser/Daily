"use client"

import React from 'react';

const GeminiProLanding = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-blue-500 via-red-500 via-yellow-400 via-green-500 to-gray-400 text-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-45 opacity-70 animate-pulse"></div>
        
        <div className="container mx-auto px-5 relative z-10">
          <div className="animate-slide-in-down">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white/25 rounded-2xl flex items-center justify-center text-5xl backdrop-blur-sm border-2 border-white/30 shadow-lg">
                💎
              </div>
              <h1 className="text-6xl font-black tracking-tight">Gemini 2.5 Pro</h1>
            </div>
          </div>
          
          <p className="text-2xl opacity-95 max-w-4xl mx-auto mb-6 font-light leading-relaxed animate-slide-in-up animation-delay-300">
            The Biggest &amp; Coolest AI Update Yet - Now Free for Everyone!
          </p>
          
          <p className="text-xl opacity-90 mb-12 max-w-3xl mx-auto animate-fade-in animation-delay-600">
            Advanced reasoning, improved coding, expanded memory, and revolutionary features that might just beat ChatGPT
          </p>
          
          <div className="flex justify-center gap-8 flex-wrap animate-fade-in animation-delay-900">
            {[
              { icon: '🧠', text: 'Chain of Thought' },
              { icon: '💻', text: 'Advanced Coding' },
              { icon: '📚', text: '1M Token Context' },
              { icon: '🎨', text: 'Canvas Mode' }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 px-8 py-6 rounded-2xl backdrop-blur-md border border-white/20 text-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-2">
                <span className="text-3xl block mb-2">{feature.icon}</span>
                <span className="text-base font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Google&apos;s Best Model - Now Available to All Free Users
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Experience the revolutionary AI assistant with smarter problem-solving and enhanced capabilities
          </p>
          <div className="flex gap-8 justify-center flex-wrap">
            <a 
              href="https://gemini.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-5 text-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-red-500 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/40"
            >
              🚀 Try Gemini 2.5 Pro Free
            </a>
            <a 
              href="https://www.youtube.com/watch?v=RNODXga669Q" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-5 text-xl font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl"
            >
              📺 Watch 30 Pro Hacks
            </a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-extrabold mb-4 text-gray-900">
              30 Gemini 2.5 Pro Hacks &amp; Features
            </h2>
            <p className="text-2xl text-gray-600 mb-12 font-light">
              Master every feature and unlock the full potential of Google&apos;s most advanced AI
            </p>
            
            <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white p-10 rounded-3xl mb-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48 animate-spin-slow"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl mb-4">🎯 What You&apos;ll Master</h3>
                <p className="text-lg">
                  Discover 30 powerful hacks including chain of thought reasoning, advanced coding, Canvas mode, Gems creation, and deep research capabilities
                </p>
              </div>
            </div>
            
            <div className="relative w-full pb-[56.25%] mb-12 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/RNODXga669Q" 
                title="30 Gemini 2.5 Pro Hacks You Need to Know"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            </div>
            
            <a 
              href="https://www.youtube.com/watch?v=RNODXga669Q" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl"
            >
              🔗 Open in YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto bg-white p-16 rounded-3xl shadow-xl text-center">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-red-500 text-white px-8 py-4 rounded-full text-xl font-semibold mb-8">
              Gemini 2.5 Pro vs ChatGPT
            </div>
            <p className="text-2xl text-gray-900 leading-relaxed italic mb-8">
              &ldquo;Gemini 2.5 might be the biggest and coolest Gemini update yet with the larger context window upgraded ways to handle different media and a whole new action plan it might just beat ChatGPT.&rdquo;
            </p>
            <p className="text-lg text-gray-600">
              - 30 Gemini 2.5 Pro Hacks
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4 text-gray-900">
              Revolutionary Core Features
            </h2>
            <p className="text-2xl text-gray-600 font-light">
              Discover the game-changing capabilities that set Gemini 2.5 Pro apart
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: '🧠',
                title: 'Chain of Thought Reasoning',
                description: 'First Gemini version with always-on reasoning that breaks complex problems into manageable tasks for organized, easy-to-follow answers.',
                features: [
                  'Automatic problem breakdown',
                  'Step-by-step solution synthesis',
                  'Explainable reasoning on demand',
                  'More organized responses'
                ]
              },
              {
                icon: '💻',
                title: 'Advanced Coding & Debugging',
                description: 'Kind of awesome coding capabilities across major programming languages with ability to handle entire codebases and debug complex issues.',
                features: [
                  'Python, JavaScript, Java, C++, Go, PHP',
                  'React, Django framework support',
                  'Entire codebase analysis',
                  'Code optimization & refactoring'
                ]
              },
              {
                icon: '📚',
                title: 'Massive 1M Token Context',
                description: 'Handle large documents, datasets, and have very long chats with ability to go back and forth refining ideas across ~1,500 pages.',
                features: [
                  'Process entire books/reports',
                  'Long conversation memory',
                  'Multiple file upload support',
                  'Iterative idea refinement'
                ]
              },
              {
                icon: '🎨',
                title: 'Canvas Mode',
                description: 'Revolutionary split-screen editor for targeted text/code editing with real-time adjustments, auto-formatting, and live preview capabilities.',
                features: [
                  'Targeted text editing',
                  'Tone & length sliders',
                  'Auto-formatting tools',
                  'Live code preview'
                ]
              },
              {
                icon: '🌐',
                title: 'Enhanced Web Browsing',
                description: 'Built-in web browsing with newest knowledge cutoff (January 2025) and ability to explicitly search for current information.',
                features: [
                  'Real-time web search',
                  'Latest knowledge cutoff',
                  'Current information access',
                  'Source verification'
                ]
              },
              {
                icon: '🔍',
                title: 'Deep Research',
                description: 'Excel at providing well-rounded answers to big open-ended questions with customizable research plans and comprehensive analysis.',
                features: [
                  'Research plan creation',
                  'Multi-source analysis',
                  'Customizable parameters',
                  'Action plan generation'
                ]
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-12 rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500 border-2 border-transparent group cursor-pointer">
                <span className="inline-block w-16 h-16 bg-gradient-to-r from-blue-500 to-red-500 text-white text-3xl rounded-full text-center leading-16 mb-8">
                  {feature.icon}
                </span>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-green-500 font-bold text-xl mr-4 mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gems Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500 to-red-500 text-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4">
              Custom Gems &amp; Extensions
            </h2>
            <p className="text-2xl opacity-90 font-light">
              Create personalized AI assistants for specific tasks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: '✍️',
                title: 'Writing Coach',
                description: 'Personalized writing assistant for blogs, essays, and creative content'
              },
              {
                icon: '💼',
                title: 'Business Analyst',
                description: 'Expert insights for strategy, market analysis, and decision making'
              },
              {
                icon: '🎓',
                title: 'Learning Tutor',
                description: 'Adaptive learning companion for any subject or skill level'
              },
              {
                icon: '🔬',
                title: 'Research Assistant',
                description: 'Deep dive research with citations and comprehensive analysis'
              }
            ].map((gem, index) => (
              <div key={index} className="bg-white/10 p-10 rounded-3xl backdrop-blur-md border border-white/20 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl">
                <span className="text-6xl block mb-6">{gem.icon}</span>
                <h3 className="text-xl font-semibold mb-4">{gem.title}</h3>
                <p className="opacity-90 leading-relaxed">{gem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4 text-gray-900">
              Pro Tips &amp; Best Practices
            </h2>
            <p className="text-2xl text-gray-600 font-light">
              Master Gemini 2.5 Pro with these expert techniques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                number: '1',
                title: 'Use Specific Prompts',
                description: 'Be detailed and specific in your requests for better, more accurate responses tailored to your needs.'
              },
              {
                number: '2',
                title: 'Leverage Context Window',
                description: 'Upload large documents and maintain long conversations for comprehensive analysis and iterative improvements.'
              },
              {
                number: '3',
                title: 'Experiment with Canvas',
                description: 'Use Canvas mode for collaborative editing, real-time adjustments, and visual content creation.'
              },
              {
                number: '4',
                title: 'Create Custom Gems',
                description: 'Build specialized AI assistants for your specific workflow, industry, or personal preferences.'
              },
              {
                number: '5',
                title: 'Chain Complex Tasks',
                description: 'Break down complex projects into steps and let Gemini reason through each phase systematically.'
              },
              {
                number: '6',
                title: 'Use Deep Research',
                description: 'Enable deep research mode for comprehensive analysis of complex topics with multiple perspectives.'
              }
            ].map((tip, index) => (
              <div key={index} className="bg-gray-50 p-12 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-white hover:shadow-xl border-2 border-transparent">
                <div className="inline-block w-12 h-12 bg-gradient-to-r from-blue-500 to-red-500 text-white text-2xl font-bold rounded-full text-center leading-12 mb-6">
                  {tip.number}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto bg-white/10 p-12 rounded-3xl backdrop-blur-md border border-white/20">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join millions using Gemini 2.5 Pro for smarter, faster, and more creative work
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: '⚡', text: 'Lightning Fast' },
                { icon: '🎯', text: 'Highly Accurate' },
                { icon: '🆓', text: 'Completely Free' }
              ].map((feature, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                  <span className="text-3xl block mb-2">{feature.icon}</span>
                  <span className="text-sm opacity-90">{feature.text}</span>
                </div>
              ))}
            </div>
            
            <a 
              href="https://gemini.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 text-xl font-semibold bg-white text-indigo-600 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              🚀 Get Started Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-blue-400 text-xl font-semibold mb-6">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 text-xl font-semibold mb-6">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 text-xl font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 text-xl font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Google LLC. All rights reserved. Gemini and the Gemini logo are trademarks of Google LLC.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-in-down {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-slide-in-down {
          animation: slide-in-down 1s ease;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 1s ease;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          animation-fill-mode: both;
        }
        
        .animation-delay-900 {
          animation-delay: 0.9s;
          animation-fill-mode: both;
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        
        .leading-16 {
          line-height: 4rem;
        }
        
        .leading-12 {
          line-height: 3rem;
        }
      `}</style>
    </div>
  );
};

export default GeminiProLanding;