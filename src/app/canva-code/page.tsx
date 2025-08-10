"use client"

import React, { useState } from 'react';
import { Play, Clock, Users, BookOpen, Sparkles, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface VideoData {
  id: string;
  title: string;
  url: string;
  duration: string;
  description: string;
  keyPoints: string[];
  timestamps: Array<{
    time: string;
    description: string;
  }>;
}

const CanvaCodeVideos: React.FC = () => {
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

  const videos: VideoData[] = [
    {
      id: "1",
      title: "Introduction to Canva Code and Quick Widget Creation",
      url: "https://www.youtube.com/watch?v=68tY9_KIUN0&t=4s",
      duration: "6:47",
      description: "Canva Code empowers educators to effortlessly create interactive classroom tools without coding, enabling personalized learning experiences, gamified activities, and quick customization using AI prompts for enhanced student engagement.",
      keyPoints: [
        "Eliminates the need for coding skills in creating digital resources",
        "Allows quick development of custom educational games and tools",
        "Features a prompt library with templates for lesson design",
        "Real-time AI code generation with impressive capabilities",
        "Easy integration into various Canva projects with included instructions"
      ],
      timestamps: [
        { time: "00:00", description: "Introduction to Canva Code - simplifying interactive digital resource creation for educators" },
        { time: "01:42", description: "Creating gamified activities that spark student creativity and encourage participation" },
        { time: "03:27", description: "Exploring AI-powered coding features and widget creation capabilities" },
        { time: "05:13", description: "Demonstrating easy widget modification and AI-driven customizations" }
      ]
    },
    {
      id: "2",
      title: "Code That Connects from Teaching to Learning",
      url: "https://www.youtube.com/watch?v=vrhuq_u25F0&t=173s",
      duration: "8:15",
      description: "Canva Code empowers educators to create interactive tools like simulations, leaderboards, and math quests, enhancing student engagement while saving time through customizable AI-driven solutions.",
      keyPoints: [
        "Hands-on experimentation with specific prompts for better AI results",
        "Creates accessible and adaptable educational tools",
        "Features leaderboard functionality for student motivation",
        "Interactive simulations for science concepts like states of matter",
        "AI-generated math quests and adventure maps for different skill levels"
      ],
      timestamps: [
        { time: "00:00", description: "Introduction to Canva Code&rsquo;s transformative potential for educators" },
        { time: "02:00", description: "Creating customizable educational tools with accessibility and interactivity focus" },
        { time: "04:02", description: "Developing interactive simulations and games to enhance student engagement" },
        { time: "06:09", description: "Showcasing math practice tools and encouraging personalized classroom creation" }
      ]
    },
    {
      id: "3",
      title: "Use Canva Code to Empower Student Learning",
      url: "https://www.youtube.com/watch?v=E2gtXq0-pRw",
      duration: "5:42",
      description: "Canva Code empowers students to learn through interactive tools like flashcards, game shows, and teaching widgets, fostering engagement, creativity, and peer collaboration in education.",
      keyPoints: [
        "Students take ownership of their learning through engaging projects",
        "Quick creation of interactive flashcard games (1-5 minutes)",
        "Real-time voice transcription capabilities",
        "Customized game show formats for collaborative learning",
        "Peer teaching opportunities with user-friendly widgets"
      ],
      timestamps: [
        { time: "00:00", description: "How Canva Code empowers students to take ownership of their learning" },
        { time: "01:19", description: "Creating interactive flashcard games with voice integration features" },
        { time: "02:38", description: "Developing customized game shows for collaborative student experiences" },
        { time: "03:58", description: "Engaging students in content creation and peer teaching activities" }
      ]
    }
  ];

  const toggleExpanded = (videoId: string): void => {
    setExpandedVideo(expandedVideo === videoId ? null : videoId);
  };

  const openVideo = (url: string): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Sparkles className="h-12 w-12 text-yellow-300" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Canva Code
              <span className="block text-yellow-300">Educational Series</span>
            </h1>
            <p className="text-xl sm:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Discover how to create interactive classroom tools without coding. 
              Empower educators and students with AI-driven educational solutions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <BookOpen className="h-5 w-5" />
                <span>3 Comprehensive Videos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Users className="h-5 w-5" />
                <span>For Educators &amp; Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="h-5 w-5" />
                <span>20+ Minutes of Content</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Videos Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Master Canva Code in Three Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From basic widget creation to empowering student-led learning, 
            explore the full potential of Canva Code in education.
          </p>
        </div>

        <div className="space-y-8">
          {videos.map((video, index) => (
            <article 
              key={video.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Video Header */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Video Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {video.title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {video.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => openVideo(video.url)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        aria-label={`Watch ${video.title}`}
                      >
                        <Play className="h-5 w-5" />
                        Watch Video
                      </button>
                      
                      <button
                        onClick={() => toggleExpanded(video.id)}
                        className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                        aria-label={`${expandedVideo === video.id ? 'Hide' : 'Show'} details for ${video.title}`}
                      >
                        {expandedVideo === video.id ? 'Hide Details' : 'Show Details'}
                        {expandedVideo === video.id ? 
                          <ChevronUp className="h-5 w-5" /> : 
                          <ChevronDown className="h-5 w-5" />
                        }
                      </button>
                    </div>
                  </div>

                  {/* YouTube Video Embed */}
                  <div className="lg:w-80 xl:w-96">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.url.split('v=')[1]?.split('&')[0]}?rel=0&modestbranding=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedVideo === video.id && (
                <div className="border-t border-gray-100 bg-gray-50">
                  <div className="p-6 sm:p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Key Points */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-purple-600" />
                          Key Learning Points
                        </h4>
                        <ul className="space-y-3">
                          {video.keyPoints.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-3">
                              <ArrowRight className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Timestamps */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Clock className="h-5 w-5 text-blue-600" />
                          Video Timeline
                        </h4>
                        <div className="space-y-4">
                          {video.timestamps.map((timestamp, timestampIndex) => (
                            <div key={timestampIndex} className="flex gap-4">
                              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-mono text-sm font-semibold flex-shrink-0">
                                {timestamp.time}
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {timestamp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Classroom?
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            Start creating interactive educational experiences with Canva Code today. 
            No coding experience required &ndash; just creativity and imagination.
          </p>
          <button
            onClick={() => window.open('https://www.canva.com', '_blank', 'noopener,noreferrer')}
            className="inline-flex items-center gap-3 bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Get started with Canva Code"
          >
            Get Started with Canva Code
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              &copy; 2025 Canva Code Educational Series. Created to empower educators and students worldwide.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default CanvaCodeVideos;