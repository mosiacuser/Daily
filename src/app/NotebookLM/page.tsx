"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Globe, Video, Map, Headphones, Users, FileText, Calendar, HelpCircle, BookOpen, Share2, Sparkles } from 'lucide-react';

interface Feature {
  id: string;
  titleEn: string;
  titleZh: string;
  date: string;
  descriptionEn: string;
  descriptionZh: string;
  screenshotEn: string;
  screenshotZh: string;
  usageEn: string[];
  usageZh: string[];
  icon: React.ReactNode;
  category: 'newest' | 'video' | 'audio' | 'premium' | 'core';
  isNew?: boolean;
}

const NotebookLMFeatures: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const features: Feature[] = [
    {
      id: 'featured-notebooks',
      titleEn: 'Featured Notebooks',
      titleZh: '精选笔记本',
      date: 'July 2025',
      descriptionEn: 'Introduces pre-made notebooks curated by experts (authors, researchers, publications, and non-profits), covering topics like longevity advice (Eric Topol), 2025 trends (The Economist), parenting, Shakespeare, etc. Users can explore sources, ask questions, generate Audio Overviews or Mind Maps, all grounded in original materials with citations. Supports public sharing with over 140,000 public notebooks.',
      descriptionZh: '引入由专家（如作者、研究者、出版物和非营利组织）策划的预制笔记本，涵盖长寿建议（Eric Topol）、2025年趋势（The Economist）、育儿、莎士比亚等主题。用户可探索来源、提问、生成音频概览或思维导图，所有回应均基于原始材料并提供引用。支持公开分享，已有超过14万个公共笔记本。',
      screenshotEn: 'The official page shows a digital interface with &ldquo;NotebookLM&rdquo; title at the top, middle section displays detailed view of Shakespeare notebook including source list and interactive elements; below is &ldquo;Featured notebooks&rdquo; section with card-style layout showing various topics like earnings reports and complete scripts, with preview images and description text.',
      screenshotZh: '官方页面显示一个数字界面，顶部为&ldquo;NotebookLM&rdquo;标题，中间展示莎士比亚笔记本的详细视图，包括来源列表和互动元素；下方是&ldquo;精选笔记本&rdquo;部分，卡片式布局展示各种主题如收益报告和完整剧本，带有预览图像和描述文本。',
      usageEn: [
        'Visit https://notebooklm.google.com/ and login to Google account',
        'Select &ldquo;Featured notebooks&rdquo; section in desktop version, browse and open notebooks of interest',
        'Read sources, ask questions (like &ldquo;What are the key predictions for 2025?&rdquo;), generate Audio Overview or Mind Map',
        'Share notebooks publicly or collaborate with others via share button. Note: Desktop only, content based on partner sources, may need accuracy verification'
      ],
      usageZh: [
        '访问 https://notebooklm.google.com/ 并登录Google账户',
        '在桌面版中选择&ldquo;精选笔记本&rdquo;部分，浏览并打开感兴趣的笔记本',
        '阅读来源、提问（如&ldquo;2025年的主要预测是什么？&rdquo;）、生成音频概览或思维导图',
        '通过分享按钮公开笔记本或与他人协作。注意：仅桌面可用，内容基于合作伙伴来源，可能需验证准确性'
      ],
      icon: <Sparkles className="w-6 h-6" />,
      category: 'newest',
      isNew: true
    },
    {
      id: 'video-overviews',
      titleEn: 'Video Overviews',
      titleZh: '视频概览',
      date: 'May 2025',
      descriptionEn: 'Converts uploaded documents, slides, charts, images, etc. into long-form video essays narrated by AI voices. Supports custom focus topics, target audiences, and learning objectives, similar to Audio Overviews but more visual. Multilingual support coming soon.',
      descriptionZh: '将上传的文档、幻灯片、图表、图像等转化为由AI语音叙述的长形式视频论文。支持自定义焦点主题、目标受众和学习目标，与音频概览类似，但更具视觉化。即将支持多语言。',
      screenshotEn: 'The announcement shows a video player interface containing AI-generated narrative video preview, left panel shows sources, right panel shows customization options like &ldquo;Focus on small business takeaways&rdquo;; background features visual elements of document summaries like charts and text overlays.',
      screenshotZh: '公告中展示一个视频播放界面，包含AI生成的叙述视频预览，左侧为来源面板，右侧为自定义选项如&ldquo;专注于小企业要点&rdquo;；背景为文档摘要的视觉元素，如图表和文本叠加。',
      usageEn: [
        'Upload at least one source (like PDF or YouTube video)',
        'Select &ldquo;Video Overview&rdquo; in Studio panel, customize length (short/default/long) and focus (like &ldquo;Target audience: students&rdquo;)',
        'Click generate and wait a few minutes; play, download or share when ready',
        'Mobile app (iOS/Android) supports background playback and offline viewing. Experimental feature, may have inaccuracies'
      ],
      usageZh: [
        '上传至少一个来源（如PDF或YouTube视频）',
        '在Studio面板选择&ldquo;视频概览&rdquo;，自定义长度（短/默认/长）和焦点（如&ldquo;目标受众：学生&rdquo;）',
        '点击生成，等待几分钟；播放时可下载或分享',
        '在移动应用（iOS/Android）中支持后台播放和离线观看。实验性功能，可能有不准确性'
      ],
      icon: <Video className="w-6 h-6" />,
      category: 'video'
    },
    {
      id: 'mind-maps',
      titleEn: 'Interactive Mind Maps',
      titleZh: '互动思维导图',
      date: 'May 2025',
      descriptionEn: 'Automatically generates interactive mind maps from uploaded sources with color-coded branches, supporting zoom and subsection hierarchy. Helps users navigate complex topics, discover connections, downloadable as high-resolution PNG. Example: upload research paper, generate branches like &ldquo;Ocean Acidification&rdquo;.',
      descriptionZh: '从上传来源自动生成互动思维导图，颜色编码分支，支持缩放、子章节层级。帮助用户导航复杂主题、发现连接，可下载为高分辨率PNG。示例：上传研究论文，生成如&ldquo;海洋酸化&rdquo;等分支。',
      screenshotEn: 'Interface displays an interactive radial mind map with central node as main topic (like &ldquo;Coral Reef Ecosystem Decline&rdquo;), branches in different colors (like blue for &ldquo;Rising Sea Temperatures&rdquo;), supports clicking to expand sub-nodes; top-right corner has download button and zoom controls.',
      screenshotZh: '界面显示一个可交互的放射状导图，中心节点为主题（如&ldquo;珊瑚礁生态系统衰退&rdquo;），分支颜色不同（如蓝色为&ldquo;海水温度上升&rdquo;），支持点击展开子节点；右上角有下载按钮和缩放控件。',
      usageEn: [
        'After uploading sources, click &ldquo;Mind Map&rdquo; button, wait 30-60 seconds for generation',
        'Explore map: zoom to view details, click nodes to open Chat panel with pre-filled prompts (like &ldquo;Analyze this subsection&rdquo;)',
        'Download PNG for presentations or blogs',
        'Combine with other features, like generating Audio Overview from Mind Map. Supports 35+ language outputs'
      ],
      usageZh: [
        '上传来源后，点击&ldquo;思维导图&rdquo;按钮，等待30-60秒生成',
        '探索导图：缩放查看细节，点击节点打开聊天面板预填提示（如&ldquo;分析此子部分&rdquo;）',
        '下载PNG用于演示或博客',
        '结合其他功能，如从思维导图生成音频概览。支持35+语言输出'
      ],
      icon: <Map className="w-6 h-6" />,
      category: 'core'
    },
    {
      id: 'multilingual-audio',
      titleEn: 'Multilingual Audio Overviews',
      titleZh: '多语言音频概览',
      date: 'May 2025 (expanded from 2024)',
      descriptionEn: 'Converts sources into AI-hosted audio discussions, supporting 50+ languages, short (~5 minutes)/long (10+ minutes) versions, customizable scripts (like &ldquo;Focus on key takeaways&rdquo;). Downloadable and shareable, only reflects uploaded sources.',
      descriptionZh: '将来源转化为AI主持的音频讨论，支持50+语言、短（约5分钟）/长（10+分钟）版本、可自定义脚本（如&ldquo;专注于关键要点&rdquo;）。可下载分享，仅反映上传来源。',
      screenshotEn: 'Generation interface shows progress bar and &ldquo;Generate Audio Overview&rdquo; button, preview audio player has two AI host avatars; customization panel includes language selector (like English/Spanish) and length slider.',
      screenshotZh: '生成界面显示进度条和&ldquo;生成音频概览&rdquo;按钮，预览音频播放器有两个AI主持头像；自定义面板包括语言选择器（如英语/西班牙语）和长度滑块。',
      usageEn: [
        'Upload sources, go to Studio panel and click &ldquo;Audio Overview&rdquo;',
        'Customize: select language, length, focus instructions',
        'Generate and play, downloadable; large notebooks may take several minutes',
        'Note: English hosts most stable, other languages experimental, may have inaccuracies'
      ],
      usageZh: [
        '上传来源，进入Studio面板点击&ldquo;音频概览&rdquo;',
        '自定义：选择语言、长度、焦点指令',
        '生成后播放、可下载；大笔记本可能需几分钟',
        '注意：英语主持最稳定，其他语言实验中，可能有不准确'
      ],
      icon: <Headphones className="w-6 h-6" />,
      category: 'audio'
    },
    {
      id: 'notebooklm-plus',
      titleEn: 'NotebookLM Plus (Premium)',
      titleZh: 'NotebookLM Plus（高级版）',
      date: 'December 2024 (expanded 2025)',
      descriptionEn: 'Paid version providing 5x+ Audio Overviews/notebooks/source limits, customizable response styles/lengths, team sharing with usage analytics, enterprise-grade privacy. Integrated with Google One AI Premium or Workspace.',
      descriptionZh: '付费版本，提供5倍以上音频概览/笔记本/来源限额、可自定义响应风格/长度、团队共享与使用分析、企业级隐私。集成Google One AI Premium或Workspace。',
      screenshotEn: 'Comparison table shows free vs Plus: left side free limits (e.g., 50 sources), right side Plus (e.g., 300 sources); animation shows team sharing dashboard.',
      screenshotZh: '比较表显示免费vs Plus：左侧免费限额（如50个来源），右侧Plus（如300个来源）；动画展示团队共享仪表板。',
      usageEn: [
        'Subscribe through Google Workspace/Cloud, or wait for Google One integration in early 2025',
        'Enable Plus in settings, create team notebooks',
        'View analytics like usage rates. See official website for pricing details'
      ],
      usageZh: [
        '通过Google Workspace/Cloud订阅，或等待2025年初Google One集成',
        '在设置中启用Plus，创建团队笔记本',
        '查看分析如使用率。定价详见官网'
      ],
      icon: <Users className="w-6 h-6" />,
      category: 'premium'
    }
  ];

  const coreFeatures = [
    {
      nameEn: 'Study Guides',
      nameZh: '学习指南',
      descEn: 'Generates documents with quizzes, essay questions, key vocabulary, convertible to sources.',
      descZh: '生成包含测验、论文问题、关键词汇表的文档，可转为来源。',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      nameEn: 'FAQs',
      nameZh: '常见问题',
      descEn: 'Generates common question lists based on sources.',
      descZh: '基于来源生成常见问题列表。',
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      nameEn: 'Timeline',
      nameZh: '时间线',
      descEn: 'Creates event timelines with character lists.',
      descZh: '创建事件时间线，包含角色列表。',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      nameEn: 'Briefing Document',
      nameZh: '简报文档',
      descEn: 'Key topics, citations and summary snapshots.',
      descZh: '关键主题、引用和总结快照。',
      icon: <FileText className="w-5 h-5" />
    },
    {
      nameEn: 'Sharing & Mobile',
      nameZh: '分享与移动端',
      descEn: 'Share notebooks, iOS/Android support (background play, offline, dark mode).',
      descZh: '分享笔记本，支持iOS/Android（后台播放、离线、暗模式）。',
      icon: <Share2 className="w-5 h-5" />
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'newest': return 'from-purple-500 to-pink-500';
      case 'video': return 'from-blue-500 to-cyan-500';
      case 'audio': return 'from-green-500 to-teal-500';
      case 'premium': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const toggleFeature = (featureId: string) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'en' ? 'NotebookLM Features' : 'NotebookLM 功能特性'}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'en' ? 'Latest AI-powered research tools' : '最新AI驱动的研究工具'}
                </p>
              </div>
            </div>
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              aria-label={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === 'en' ? '中文' : 'English'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {language === 'en' 
                ? 'NotebookLM is Google&rsquo;s AI-powered research and note-taking tool, designed to help users upload sources and process complex information through AI analysis, summarization, and interaction. Built on Gemini AI models with source grounding to prevent hallucinations.'
                : 'NotebookLM是Google推出的AI驱动研究和笔记工具，旨在帮助用户上传来源并通过AI分析、总结和互动来处理复杂信息。基于Gemini AI模型，强调来源基础以防止幻觉。'
              }
            </p>
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Updated July 2025' : '2025年7月更新'}
            </div>
          </div>
        </section>

        {/* Feature Timeline */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            {language === 'en' ? 'Latest Features Timeline' : '最新功能时间线'}
          </h2>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <article
                key={feature.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(feature.category)} flex items-center justify-center text-white shadow-lg`}>
                        {feature.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {language === 'en' ? feature.titleEn : feature.titleZh}
                          </h3>
                          {feature.isNew && (
                            <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-sm">
                              {language === 'en' ? 'NEW' : '新'}
                            </span>
                          )}
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {feature.date}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                          {language === 'en' ? feature.descriptionEn : feature.descriptionZh}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleFeature(feature.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
                      aria-label={expandedFeature === feature.id ? 'Collapse details' : 'Expand details'}
                    >
                      {expandedFeature === feature.id ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  {/* Expanded Content */}
                  {expandedFeature === feature.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6 animate-in slide-in-from-top duration-300">
                      {/* Screenshot Description */}
                      <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {language === 'en' ? 'Interface Preview' : '界面预览'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {language === 'en' ? feature.screenshotEn : feature.screenshotZh}
                        </p>
                      </div>
                      
                      {/* Usage Instructions */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {language === 'en' ? 'How to Use' : '使用指导'}
                        </h4>
                        <div className="space-y-2">
                          {(language === 'en' ? feature.usageEn : feature.usageZh).map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                                {stepIndex + 1}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Core Features Grid */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            {language === 'en' ? 'Core Features' : '核心功能'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-500 rounded-lg flex items-center justify-center text-white group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {language === 'en' ? feature.nameEn : feature.nameZh}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {language === 'en' ? feature.descEn : feature.descZh}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'en' ? 'Platform Stats' : '平台数据'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold">180+</div>
              <div className="text-blue-100">
                {language === 'en' ? 'Regions' : '地区'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">35+</div>
              <div className="text-blue-100">
                {language === 'en' ? 'Languages' : '语言'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">500K</div>
              <div className="text-blue-100">
                {language === 'en' ? 'Words/Notebook' : '词/笔记本'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">140K+</div>
              <div className="text-blue-100">
                {language === 'en' ? 'Public Notebooks' : '公共笔记本'}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <div className="max-w-2xl mx-auto">
            <p className="mb-4">
              {language === 'en' 
                ? 'All features are experimental and outputs should be verified. For more updates, follow Google&rsquo;s official blog.'
                : '所有功能均为实验性，输出应进行验证。更多更新请关注Google官方博客。'
              }
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Globe className="w-4 h-4" />
              <span>NotebookLM Features Showcase</span>
              <span>•</span>
              <span>{language === 'en' ? 'July 2025' : '2025年7月'}</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default NotebookLMFeatures;