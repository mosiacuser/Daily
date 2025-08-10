"use client"

import React, { useState } from 'react';
import { Globe, Search, Brain, FileText, BarChart3, Zap, Users, Download, Star, Calendar, ArrowRight, Play, ExternalLink } from 'lucide-react';

const FeloAIShowcase: React.FC = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  const content = {
    zh: {
      hero: {
        title: 'FeloAI',
        subtitle: '免费多语言 AI 搜索引擎',
        description: '打破语言障碍，访问全球信息。支持 AI 演示文稿、心智图、海报生成等强大功能。',
        cta: '立即体验'
      },
      overview: {
        title: 'FeloAI 概述',
        description: 'FeloAI 是一个免费的多语言 AI 搜索引擎和工具平台，支持自然语言查询，提供实时答案，并扩展到创建 AI 演示文稿、心智图、海报等功能。它打破语言障碍，帮助用户访问全球信息，支持多种模式如研究模式、智能代理等。',
        lastUpdated: '最新更新：2025年7月8日'
      },
      features: {
        title: '最新功能更新',
        subtitle: '2025年7月8日重大发布'
      },
      getStarted: '开始使用',
      viewDemo: '查看演示',
      learnMore: '了解更多'
    },
    en: {
      hero: {
        title: 'FeloAI',
        subtitle: 'Free Multilingual AI Search Engine',
        description: 'Break down language barriers and access global information. Support powerful features like AI presentations, mind maps, and poster generation.',
        cta: 'Get Started'
      },
      overview: {
        title: 'FeloAI Overview',
        description: 'FeloAI is a free multilingual AI search engine and tool platform that supports natural language queries, provides real-time answers, and extends to creating AI presentations, mind maps, posters and more. It breaks down language barriers, helps users access global information, and supports various modes like research mode and intelligent agents.',
        lastUpdated: 'Last Updated: July 8, 2025'
      },
      features: {
        title: 'Latest Feature Updates',
        subtitle: 'Major Release on July 8, 2025'
      },
      getStarted: 'Get Started',
      viewDemo: 'View Demo',
      learnMore: 'Learn More'
    }
  };

  const t = content[language];

  const latestFeatures = [
    { 
      zh: 'Felo Create 品牌升级推出', 
      en: 'Felo Create Brand Upgrade Launch',
      icon: <Star className="w-5 h-5" />
    },
    { 
      zh: 'AI Slides 功能正式推出', 
      en: 'AI Slides Feature Official Launch',
      icon: <FileText className="w-5 h-5" />
    },
    { 
      zh: 'AI Web 功能正式推出', 
      en: 'AI Web Feature Official Launch',
      icon: <Globe className="w-5 h-5" />
    },
    { 
      zh: 'Felo 完全支持 ZEN 模式', 
      en: 'Felo Full ZEN Mode Support',
      icon: <Zap className="w-5 h-5" />
    },
    { 
      zh: 'Sonnet 模型升级至 4.0', 
      en: 'Sonnet Model Upgrade to 4.0',
      icon: <Brain className="w-5 h-5" />
    }
  ];

  const coreFeatures = [
    {
      icon: <Search className="w-6 h-6 text-white" />,
      title: language === 'zh' ? 'AI 搜索' : 'AI Search',
      desc: language === 'zh' ? '自然语言查询，实时全球答案' : 'Natural language queries with real-time global answers',
      color: 'purple'
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: language === 'zh' ? '内容创建' : 'Content Creation',
      desc: language === 'zh' ? '生成演示文稿、心智图和报告' : 'Generate presentations, mind maps, and reports',
      color: 'blue'
    },
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      title: language === 'zh' ? '智能代理' : 'Smart Agents',
      desc: language === 'zh' ? 'AI 驱动的各种任务助手' : 'AI-powered assistants for various tasks',
      color: 'indigo'
    }
  ];

  const allFeatures = [
    {
      icon: <Globe className="w-5 h-5 text-white" />,
      title: language === 'zh' ? '多语言搜索' : 'Multilingual Search',
      desc: language === 'zh' ? '支持自然语言查询，实时从全球来源获取答案' : 'Natural language queries with real-time global answers',
      color: 'purple'
    },
    {
      icon: <Brain className="w-5 h-5 text-white" />,
      title: language === 'zh' ? 'AI 生成工具' : 'AI Generation Tools',
      desc: language === 'zh' ? '创建演示文稿、心智图、海报' : 'Create presentations, mind maps, and posters',
      color: 'blue'
    },
    {
      icon: <FileText className="w-5 h-5 text-white" />,
      title: language === 'zh' ? '文档处理' : 'Document Processing',
      desc: language === 'zh' ? '上传 PDF、Word、Excel 文件，自动分析生成内容' : 'Upload PDF, Word, Excel files for automatic analysis',
      color: 'green'
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-white" />,
      title: language === 'zh' ? '研究模式' : 'Research Mode',
      desc: language === 'zh' ? '生成结构化报告、智能图形、图表' : 'Generate structured reports, smart graphics, and charts',
      color: 'orange'
    },
    {
      icon: <Users className="w-5 h-5 text-white" />,
      title: language === 'zh' ? '智能代理' : 'Smart Agents',
      desc: language === 'zh' ? 'AI 新闻代理、幻灯片代理等' : 'AI news agents, slides agents, and more',
      color: 'indigo'
    },
    {
      icon: <Download className="w-5 h-5 text-white" />,
      title: language === 'zh' ? '导出选项' : 'Export Options',
      desc: language === 'zh' ? '支持 PPT、PDF、CSV、Markdown、SVG 格式' : 'Support PPT, PDF, CSV, Markdown, SVG formats',
      color: 'pink'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                FeloAI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Switch language"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'zh' ? '中文' : 'EN'}</span>
              </button>
              <a
                href="https://felo.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                {t.getStarted}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200">
            <Star className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">2025 Latest Updates Available</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t.hero.title}
            </span>
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
            {t.hero.subtitle}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://felo.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 font-medium"
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <button className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white transition-all border border-gray-200 font-medium">
              <Play className="w-5 h-5 mr-2" />
              {t.viewDemo}
            </button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.overview.title}
            </h2>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-full">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{t.overview.lastUpdated}</span>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed text-center mb-12">
              {t.overview.description}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {coreFeatures.map((feature, index) => (
                <div key={index} className={`text-center p-6 rounded-xl bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 border border-${feature.color}-200`}>
                  <div className={`w-12 h-12 bg-${feature.color}-600 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Features Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.features.title}
            </h2>
            <p className="text-lg text-gray-600">{t.features.subtitle}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                <div className="flex-1 h-px bg-gray-300 ml-4"></div>
                <span className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium">
                  2025-07-08
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {latestFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {language === 'zh' ? feature.zh : feature.en}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {language === 'zh' ? '完整功能列表' : 'Complete Feature List'}
            </h2>
            <p className="text-lg text-gray-600">Comprehensive AI-powered tools and capabilities</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {allFeatures.map((feature, index) => (
              <div key={index} className={`p-6 bg-gradient-to-r from-${feature.color}-50 to-${feature.color}-100 rounded-xl border border-${feature.color}-200`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-2 bg-${feature.color}-600 rounded-lg`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {language === 'zh' ? '准备好改变您的工作流程了吗？' : 'Ready to Transform Your Workflow?'}
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            {language === 'zh' ? '加入数百万用户，使用 FeloAI 提升生产力和创造力。' : 'Join millions of users who are already using FeloAI to boost their productivity and creativity.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://felo.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-medium"
            >
              {t.getStarted}
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <button className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-purple-600 transition-all font-medium">
              {t.learnMore}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">FeloAI</span>
            </div>
            <p className="text-gray-400 mb-6">
              {language === 'zh' ? '用 AI 驱动的搜索和内容创建打破语言屏障' : 'Breaking language barriers with AI-powered search and content creation'}
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://felo.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {language === 'zh' ? '官方网站' : 'Official Website'}
              </a>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">© 2025 FeloAI. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeloAIShowcase;