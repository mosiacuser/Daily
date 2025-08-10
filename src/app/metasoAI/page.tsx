"use client"

import React, { useState } from 'react';
import { ChevronDown, Search, Mic, Camera, FileText, Globe, GraduationCap, Video, Database, Settings, ExternalLink, Star, Zap, Brain, Code, BookOpen } from 'lucide-react';

interface FeatureData {
  category: string;
  categoryEn: string;
  features: {
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    isNew?: boolean;
    update?: string;
    updateEn?: string;
  }[];
}

const MetasoResearch: React.FC = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const featuresData: FeatureData[] = [
    {
      category: "搜索模式",
      categoryEn: "Search Modes",
      features: [
        {
          name: "简洁模式",
          nameEn: "Simple Mode",
          description: "快速提供核心答案，无冗余信息。",
          descriptionEn: "Quickly provides core answers without redundant information."
        },
        {
          name: "深入模式", 
          nameEn: "Deep Mode",
          description: "扩展细节，提供多角度分析。",
          descriptionEn: "Expands details with multi-perspective analysis."
        },
        {
          name: "研究模式",
          nameEn: "Research Mode", 
          description: "生成结构化报告，包括大纲和来源。",
          descriptionEn: "Generates structured reports with outlines and sources."
        },
        {
          name: "深度研究",
          nameEn: "Deep Research",
          description: "将复杂问题拆解为子任务，生成可视化问题链，逐层分析、验证，并输出完整报告。",
          descriptionEn: "Breaks down complex problems into sub-tasks, generates visual question chains for layered analysis and complete reports.",
          isNew: true,
          update: "新上线（2025年7月），优化中文场景准确率，添加可视化链条和交互性。",
          updateEn: "Newly launched (July 2025), optimized for Chinese scenarios with visual chains and interactivity."
        }
      ]
    },
    {
      category: "搜索方式与输入",
      categoryEn: "Search Methods & Input",
      features: [
        {
          name: "文字搜索",
          nameEn: "Text Search",
          description: "输入关键词或自然语言，支持语义理解意图。",
          descriptionEn: "Input keywords or natural language with semantic understanding."
        },
        {
          name: "语音搜索",
          nameEn: "Voice Search", 
          description: "通过麦克风输入查询。",
          descriptionEn: "Query input through microphone.",
          update: "支持多模态集成。",
          updateEn: "Supports multimodal integration."
        },
        {
          name: "拍照搜索",
          nameEn: "Photo Search",
          description: "上传图像进行视觉搜索。", 
          descriptionEn: "Upload images for visual search.",
          update: "支持多模态集成。",
          updateEn: "Supports multimodal integration."
        }
      ]
    },
    {
      category: "数据源与范围",
      categoryEn: "Data Sources & Scope",
      features: [
        {
          name: "全网搜索",
          nameEn: "Web Search",
          description: "覆盖互联网广泛内容。",
          descriptionEn: "Covers broad internet content."
        },
        {
          name: "学术搜索",
          nameEn: "Academic Search",
          description: "专属学术资源检索，支持专业论文等。",
          descriptionEn: "Dedicated academic resource search with professional papers.",
          update: "优化为教育工具，隐私保障。",
          updateEn: "Optimized as educational tool with privacy protection."
        },
        {
          name: "播客/视频搜索",
          nameEn: "Podcast/Video Search",
          description: "针对音频/视频内容，提供摘要或可视化报告。",
          descriptionEn: "Audio/video content with summaries and visual reports.",
          update: "可设置范围，生成视频专属报告。",
          updateEn: "Configurable scope with video-specific reports."
        },
        {
          name: "文档库搜索",
          nameEn: "Document Library Search",
          description: "上传PDF或创建专题，基于自定义文件查询。",
          descriptionEn: "Upload PDFs or create topics for custom file queries.",
          update: "支持DeepSeek-R1推理。",
          updateEn: "Supports DeepSeek-R1 reasoning."
        }
      ]
    },
    {
      category: "扩展功能",
      categoryEn: "Extended Features", 
      features: [
        {
          name: "API服务",
          nameEn: "API Service",
          description: "提供搜索、网页全文获取和问答接口，即测即用。",
          descriptionEn: "Provides search, full-text retrieval and Q&A interfaces, ready to test.",
          isNew: true,
          update: "2025年8月前上线，低至3分钱/次，填补Bing API下线空白。",
          updateEn: "Launch before August 2025, as low as 0.03 yuan per call, filling Bing API gap."
        },
        {
          name: "今天学点啥",
          nameEn: "Learn Something Today",
          description: "个性化知识呈现，如将书籍转为AI Native形式。",
          descriptionEn: "Personalized knowledge presentation, converting books to AI-native format.",
          update: "App上线，支持纸质/电子书转换。",
          updateEn: "App launched with physical/e-book conversion support."
        }
      ]
    }
  ];

  const usageSteps = [
    {
      title: "基本搜索",
      titleEn: "Basic Search",
      description: "进入主页，输入查询或使用语音/拍照功能，选择数据源，获取结构化答案。",
      descriptionEn: "Enter homepage, input query or use voice/photo features, select data source, get structured answers.",
      icon: <Search className="w-6 h-6" />
    },
    {
      title: "深度研究模式",
      titleEn: "Deep Research Mode", 
      description: "选择深度研究模式，输入复杂问题，查看问题链，获取完整报告。",
      descriptionEn: "Select deep research mode, input complex questions, view question chains, get complete reports.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "文档库查询",
      titleEn: "Document Library Query",
      description: "上传PDF，创建专题，使用DeepSeek推理进行基于文件的问答。",
      descriptionEn: "Upload PDFs, create topics, use DeepSeek reasoning for file-based Q&A.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "API使用",
      titleEn: "API Usage",
      description: "访问API入口，注册后调用接口，即测即用，费用低廉。",
      descriptionEn: "Access API portal, register and call interfaces, ready to test with low cost.",
      icon: <Code className="w-6 h-6" />
    }
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const getText = (zh: string, en: string) => {
    return language === 'zh' ? zh : en;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all duration-300"
              aria-label="Toggle language"
            >
              {language === 'zh' ? 'English' : '中文'}
            </button>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {getText('秘塔AI搜索功能研究', 'Metaso.cn Feature Research')}
          </h1>
          
          <p className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
            {getText(
              '专业、无广告的AI驱动元搜索引擎，支持语义理解和多模态交互。核心口号：没有广告，直达结果',
              'Professional, ad-free AI-driven meta search engine with semantic understanding and multimodal interaction. Core motto: No ads, direct results'
            )}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full text-green-300">
              <Zap className="w-4 h-4" />
              <span className="text-sm">{getText('2025年最新更新', '2025 Latest Updates')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300">
              <Globe className="w-4 h-4" />
              <span className="text-sm">{getText('全免费使用', 'Completely Free')}</span>
            </div>
          </div>
        </header>

        {/* Feature Categories Tabs */}
        <section className="mb-12" aria-label="Feature categories">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {featuresData.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {getText(category.category, category.categoryEn)}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresData[activeTab].features.map((feature, index) => (
              <article
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {getText(feature.name, feature.nameEn)}
                  </h3>
                  {feature.isNew && (
                    <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                      {getText('新功能', 'NEW')}
                    </span>
                  )}
                </div>
                
                <p className="text-blue-100 mb-4 leading-relaxed">
                  {getText(feature.description, feature.descriptionEn)}
                </p>
                
                {feature.update && (
                  <div className="p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border-l-4 border-green-400">
                    <p className="text-green-200 text-sm">
                      <strong>{getText('最新更新：', 'Latest Update: ')}</strong>
                      {getText(feature.update, feature.updateEn || feature.update)}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Usage Guide */}
        <section className="mb-12" aria-label="Usage guide">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            {getText('使用指导', 'Usage Guide')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {usageSteps.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {getText(step.title, step.titleEn)}
                  </h3>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  {getText(step.description, step.descriptionEn)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features Summary */}
        <section className="mb-12" aria-label="Key features summary">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              {getText('核心特性', 'Core Features')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {getText('无广告体验', 'Ad-Free Experience')}
                </h3>
                <p className="text-blue-200">
                  {getText('纯净搜索环境，直达结果', 'Clean search environment, direct results')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {getText('AI深度推理', 'AI Deep Reasoning')}
                </h3>
                <p className="text-blue-200">
                  {getText('集成DeepSeek等大模型', 'Integrated with DeepSeek and other LLMs')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {getText('多模态交互', 'Multimodal Interaction')}
                </h3>
                <p className="text-blue-200">
                  {getText('文字、语音、图像搜索', 'Text, voice, and image search')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-blue-200">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Globe className="w-5 h-5" />
            <a 
              href="https://metaso.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              metaso.cn
            </a>
            <ExternalLink className="w-4 h-4" />
          </div>
          <p className="text-sm">
            {getText(
              '基于2025年7月最新功能分析 | 所有功能当前免费使用',
              'Based on July 2025 latest feature analysis | All features currently free to use'
            )}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MetasoResearch;