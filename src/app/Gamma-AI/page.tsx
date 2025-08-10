"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Globe, Zap, Users, BarChart3, Palette, Bot, FileText, Monitor, Share2, Star, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

interface LanguageToggleProps {
  language: 'zh' | 'en';
  onToggle: (lang: 'zh' | 'en') => void;
}

interface ExpandableSectionProps {
  title: string;
  titleEn: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onToggle }) => (
  <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-purple-200">
    <div className="flex items-center p-2">
      <button
        onClick={() => onToggle('zh')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'zh' 
            ? 'bg-purple-600 text-white shadow-md' 
            : 'text-purple-600 hover:bg-purple-50'
        }`}
        aria-label="Switch to Chinese"
      >
        中文
      </button>
      <button
        onClick={() => onToggle('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'en' 
            ? 'bg-purple-600 text-white shadow-md' 
            : 'text-purple-600 hover:bg-purple-50'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  </div>
);

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ 
  title, 
  titleEn, 
  children, 
  defaultExpanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all flex items-center justify-between text-left"
        aria-expanded={isExpanded}
        aria-controls={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-purple-600" />
        ) : (
          <ChevronRight className="h-5 w-5 text-purple-600" />
        )}
      </button>
      {isExpanded && (
        <div 
          id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="px-6 py-4 bg-white"
        >
          {children}
        </div>
      )}
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  language: 'zh' | 'en';
}> = ({ icon, title, titleEn, description, descriptionEn, language }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200">
    <div className="flex items-center mb-4">
      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
        {icon}
      </div>
      <h4 className="ml-3 text-lg font-semibold text-gray-800">
        {language === 'zh' ? title : titleEn}
      </h4>
    </div>
    <p className="text-gray-600 leading-relaxed">
      {language === 'zh' ? description : descriptionEn}
    </p>
  </div>
);

const ComparisonTable: React.FC<{ language: 'zh' | 'en' }> = ({ language }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
    <table className="w-full">
      <thead>
        <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <th className="px-6 py-4 text-left font-semibold">
            {language === 'zh' ? '特性/工具' : 'Feature/Tool'}
          </th>
          <th className="px-6 py-4 text-left font-semibold">Gamma.app</th>
          <th className="px-6 py-4 text-left font-semibold">Canva</th>
          <th className="px-6 py-4 text-left font-semibold">PowerPoint/Slides</th>
          <th className="px-6 py-4 text-left font-semibold">Tome/Presentations.AI</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
          <td className="px-6 py-4 font-semibold text-purple-700">
            {language === 'zh' ? '核心理念' : 'Core Philosophy'}
          </td>
          <td className="px-6 py-4">
            {language === 'zh' ? 'AI 设计伙伴 (速度与自动化)' : 'AI Design Partner (Speed & Automation)'}
          </td>
          <td className="px-6 py-4">
            {language === 'zh' ? '人人都能设计 (灵活性与素材库)' : 'Design for Everyone (Flexibility & Assets)'}
          </td>
          <td className="px-6 py-4">
            {language === 'zh' ? '传统幻灯片 (手动控制与普及性)' : 'Traditional Slides (Manual Control & Ubiquity)'}
          </td>
          <td className="px-6 py-4">
            {language === 'zh' ? 'AI 叙事伙伴 (叙事与结构)' : 'AI Narrative Partner (Storytelling & Structure)'}
          </td>
        </tr>
        <tr className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
          <td className="px-6 py-4 font-semibold text-green-700">
            {language === 'zh' ? '主要优势' : 'Main Advantages'}
          </td>
          <td className="px-6 py-4 text-sm">
            {language === 'zh' 
              ? '从单一提示在数分钟内生成完整的、设计精良的初稿。交互式的网页原生感。' 
              : 'Generate complete, well-designed drafts from a single prompt in minutes. Interactive web-native feel.'}
          </td>
          <td className="px-6 py-4 text-sm">
            {language === 'zh' 
              ? '庞大的模板、图形和素材库。高度的设计灵活性和手动定制能力。' 
              : 'Vast library of templates, graphics, and assets. High design flexibility and manual customization.'}
          </td>
          <td className="px-6 py-4 text-sm">
            {language === 'zh' 
              ? '对每个元素拥有完全的手动控制权。普遍的兼容性和离线编辑能力。' 
              : 'Complete manual control over every element. Universal compatibility and offline editing.'}
          </td>
          <td className="px-6 py-4 text-sm">
            {language === 'zh' 
              ? 'AI 驱动的叙事结构化和战略性说服力架构设计。' 
              : 'AI-driven narrative structuring and strategic persuasive architecture design.'}
          </td>
        </tr>
        <tr className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
          <td className="px-6 py-4 font-semibold text-red-700">
            {language === 'zh' ? '主要劣势' : 'Main Disadvantages'}
          </td>
          <td className="px-6 py-4 text-sm">
            {language === 'zh' 
              ? '输出内容可能泛化，需要大量编辑。PowerPoint 导出保真度差。无离线模式。' 
              : 'Output may be generic, requires extensive editing. Poor PowerPoint export fidelity. No offline mode.'}
          </td>
          <td className="px-6 py-4 text-sm">
            {language === 'zh' 
              ? 'AI 功能集成度较低，从零创建可能更耗时。' 
              : 'Lower AI integration, creating from scratch may be more time-consuming.'}
          </td>
          <td className="px-6 py-4 text-sm">
            {language === 'zh' 
              ? '&ldquo;空白页综合症&rdquo;；设计完全手动，耗时且依赖设计能力。' 
              : '&ldquo;Blank page syndrome&rdquo;; completely manual design, time-consuming and design-dependent.'}
          </td>
          <td className="px-6 py-4 text-sm">
            {language === 'zh' 
              ? '叙事优先的方法可能较为死板。美学主题选择相对较少。' 
              : 'Narrative-first approach may be rigid. Relatively fewer aesthetic theme choices.'}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const GammaAnalysis: React.FC = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI 内容生成",
      titleEn: "AI Content Generation",
      description: "利用超过20种不同的AI模型，从简单提示自动生成完整的内容大纲、文本和视觉元素。",
      descriptionEn: "Utilize over 20 different AI models to automatically generate complete content outlines, text, and visual elements from simple prompts."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "一键重塑风格",
      titleEn: "One-Click Style Transformation",
      description: "不改变内容的情况下，通过单击彻底更换整个作品的视觉主题，包括颜色、字体、背景和布局。",
      descriptionEn: "Completely change the visual theme of your entire work, including colors, fonts, backgrounds, and layouts, without altering content."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "实时协作",
      titleEn: "Real-time Collaboration",
      description: "类似Google Docs的多用户同时编辑功能，实时显示协作者光标和修改，支持评论和反应。",
      descriptionEn: "Multi-user simultaneous editing like Google Docs, real-time display of collaborator cursors and changes, with comments and reactions support."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "内置分析",
      titleEn: "Built-in Analytics",
      description: "追踪独立观看者、卡片参与度和观看时长，帮助创作者了解内容传播效果和观众互动情况。",
      descriptionEn: "Track unique viewers, card engagement, and viewing time to help creators understand content reach and audience interaction."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "多平台嵌入",
      titleEn: "Multi-platform Embedding",
      description: "无缝嵌入YouTube、Figma、Miro、Airtable等平台内容，创建真正交互式的动态演示。",
      descriptionEn: "Seamlessly embed content from YouTube, Figma, Miro, Airtable, and other platforms to create truly interactive dynamic presentations."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "智能布局",
      titleEn: "Smart Layouts",
      description: "AI分析内容并实时推荐最有效的布局方案，提供布局快速切换器进行即时优化。",
      descriptionEn: "AI analyzes content and provides real-time recommendations for the most effective layout options, with a quick layout switcher for instant optimization."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <LanguageToggle language={language} onToggle={setLanguage} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              <Star className="h-4 w-4 mr-2" />
              {language === 'zh' ? '2025年深度分析报告' : '2025 In-Depth Analysis Report'}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {language === 'zh' ? (
                <>
                  Gamma App<br />
                  <span className="text-pink-200">深度解析</span>
                </>
              ) : (
                <>
                  Gamma App<br />
                  <span className="text-pink-200">Deep Analysis</span>
                </>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              {language === 'zh' 
                ? '功能、用法与战略定位综合指南 - 重新定义数字内容的创作与分享方式'
                : 'Comprehensive Guide to Features, Usage & Strategic Positioning - Redefining Digital Content Creation and Sharing'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Globe className="h-5 w-5" />
                <span>{language === 'zh' ? '网页应用' : 'Web Application'}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Bot className="h-5 w-5" />
                <span>{language === 'zh' ? 'AI 驱动' : 'AI-Powered'}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Users className="h-5 w-5" />
                <span>{language === 'zh' ? '团队协作' : 'Team Collaboration'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Executive Summary */}
        <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {language === 'zh' ? '执行摘要' : 'Executive Summary'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {language === 'zh' ? (
                  <>
                    Gamma 将自身定位为<strong>&ldquo;AI 设计伙伴&rdquo;</strong>，而非简单的软件工具。它旨在将繁琐、耗时的设计与格式化工作自动化，从而解放用户，使其能够完全专注于内容的实质、叙事和思想本身。
                  </>
                ) : (
                  <>
                    Gamma positions itself as an <strong>&ldquo;AI Design Partner&rdquo;</strong> rather than a simple software tool. It aims to automate tedious, time-consuming design and formatting work, thereby freeing users to focus entirely on content substance, narrative, and ideas themselves.
                  </>
                )}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <FileText className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-semibold text-purple-800">
                    {language === 'zh' ? '演示文稿' : 'Presentations'}
                  </h4>
                  <p className="text-sm text-purple-600">
                    {language === 'zh' ? '数分钟内创建精美幻灯片' : 'Create beautiful slides in minutes'}
                  </p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <Monitor className="h-8 w-8 text-pink-600 mb-2" />
                  <h4 className="font-semibold text-pink-800">
                    {language === 'zh' ? '网站' : 'Websites'}
                  </h4>
                  <p className="text-sm text-pink-600">
                    {language === 'zh' ? '无需编码快速构建' : 'Build quickly without coding'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
                  <Bot className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {language === 'zh' ? '关键概念' : 'Key Concept'}
                </h3>
                <p className="text-gray-700">
                  {language === 'zh' ? (
                    <>
                      理解<strong>&ldquo;卡片&rdquo;</strong>而非<strong>&ldquo;幻灯片&rdquo;</strong> - 一种灵活、可自动调整大小的内容容器，更像是网页的区块或章节。
                    </>
                  ) : (
                    <>
                      Understanding <strong>&ldquo;Cards&rdquo;</strong> instead of <strong>&ldquo;Slides&rdquo;</strong> - flexible, auto-resizing content containers that work more like web page blocks or sections.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {language === 'zh' ? '核心功能特性' : 'Core Features'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'zh' 
                ? 'Gamma 提供了一套完整的 AI 驱动工具，重新定义了内容创作的工作流程'
                : 'Gamma provides a comprehensive suite of AI-driven tools that redefine content creation workflows'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                titleEn={feature.titleEn}
                description={feature.description}
                descriptionEn={feature.descriptionEn}
                language={language}
              />
            ))}
          </div>
        </section>

        {/* 2025 Updates */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-semibold mb-4">
              <Zap className="h-4 w-4 mr-2" />
              {language === 'zh' ? '2025年最新更新' : '2025 Latest Updates'}
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              {language === 'zh' ? '最新功能发布' : 'Latest Feature Releases'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {language === 'zh' ? '2025年6月' : 'June 2025'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'zh' ? '内容风格微调' : 'Content Style Fine-tuning'}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                {language === 'zh' 
                  ? '新增四个详细程度选项：极简、简洁、详细、详尽，让用户对AI生成内容有更精细的控制。'
                  : 'Added four detail level options: Minimal, Concise, Detailed, Extensive, giving users finer control over AI-generated content.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {language === 'zh' ? '2025年5月' : 'May 2025'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'zh' ? '17个全新主题' : '17 New Themes'}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                {language === 'zh' 
                  ? '一次性新增17个设计主题，满足从大胆、简约到俏皮、精致等各种风格需求。'
                  : 'Added 17 design themes at once, catering to various style needs from bold and minimalist to playful and sophisticated.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Bot className="h-6 w-6 text-pink-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {language === 'zh' ? '2025年4月' : 'April 2025'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'zh' ? 'AI图像编辑与动画' : 'AI Image Editing & Animation'}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                {language === 'zh' 
                  ? '推出AI图像编辑功能，支持局部修改、背景更换；Pro用户可为图像添加动态效果。'
                  : 'Launched AI image editing with local modifications and background replacement; Pro users can add dynamic effects to images.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {language === 'zh' ? '2025年3月' : 'March 2025'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'zh' ? '协作增强' : 'Collaboration Enhancement'}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                {language === 'zh' 
                  ? '新增隐藏卡片功能和跨文稿复制功能，提升团队协作效率。'
                  : 'Added hidden card functionality and cross-document copying to enhance team collaboration efficiency.'}
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Analysis */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {language === 'zh' ? '竞争格局分析' : 'Competitive Landscape Analysis'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'zh' 
                ? 'Gamma与主要竞争对手的深度对比分析，帮助您选择最适合的工具'
                : 'In-depth comparison analysis of Gamma with major competitors to help you choose the right tool'}
            </p>
          </div>
          
          <ComparisonTable language={language} />
        </section>

        {/* Use Cases & Strategic Recommendations */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {language === 'zh' ? '应用场景与战略建议' : 'Use Cases & Strategic Recommendations'}
            </h2>
          </div>
          
          <div className="space-y-6">
            <ExpandableSection 
              title="顾问/销售专业人士" 
              titleEn="Consultants/Sales Professionals"
              defaultExpanded={true}
            >
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'zh' ? '核心用途' : 'Core Uses'}
                  </h4>
                  <p className="text-green-700">
                    {language === 'zh' 
                      ? '快速生成客户提案和项目初期演示，将会议记录转化为精美的跟进方案。'
                      : 'Quickly generate client proposals and initial project presentations, transform meeting notes into polished follow-up proposals.'}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {language === 'zh' ? '战略建议' : 'Strategic Recommendations'}
                  </h4>
                  <p className="text-blue-700">
                    {language === 'zh' 
                      ? '充分利用"粘贴文本"功能，密切关注"分析"功能来判断客户最感兴趣的部分。'
                      : 'Make full use of the "Paste Text" feature and closely monitor "Analytics" to identify the parts that interest clients most.'}
                  </p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="教育工作者/学生" 
              titleEn="Educators/Students"
            >
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    {language === 'zh' ? '核心用途' : 'Core Uses'}
                  </h4>
                  <p className="text-purple-700">
                    {language === 'zh' 
                      ? '创建互动式课件、教学材料和项目演示，嵌入教学视频和在线测验。'
                      : 'Create interactive courseware, teaching materials, and project presentations, embed instructional videos and online quizzes.'}
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                  <h4 className="font-semibold text-indigo-800 mb-2">
                    {language === 'zh' ? '战略建议' : 'Strategic Recommendations'}
                  </h4>
                  <p className="text-indigo-700">
                    {language === 'zh' 
                      ? '善用嵌入功能创造丰富的学习体验，制作深度报告时选用"详尽"的内容风格。'
                      : 'Make good use of embedding features to create rich learning experiences, choose "Extensive" content style for in-depth reports.'}
                  </p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="初创公司创始人" 
              titleEn="Startup Founders"
            >
              <div className="space-y-4">
                <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                  <h4 className="font-semibold text-pink-800 mb-2">
                    {language === 'zh' ? '核心用途' : 'Core Uses'}
                  </h4>
                  <p className="text-pink-700">
                    {language === 'zh' 
                      ? '制作投资人路演PPT和快速验证商业想法的单页网站。'
                      : 'Create investor pitch decks and single-page websites for quickly validating business ideas.'}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    {language === 'zh' ? '战略建议' : 'Strategic Recommendations'}
                  </h4>
                  <p className="text-orange-700">
                    {language === 'zh' 
                      ? '利用速度优势快速迭代测试，使用"跨文稿复制卡片"为不同受众创建定制版本。'
                      : 'Leverage speed advantages for rapid iteration testing, use "cross-document card copying" to create customized versions for different audiences.'}
                  </p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="市场营销人员" 
              titleEn="Marketing Professionals"
            >
              <div className="space-y-4">
                <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                  <h4 className="font-semibold text-teal-800 mb-2">
                    {language === 'zh' ? '核心用途' : 'Core Uses'}
                  </h4>
                  <p className="text-teal-700">
                    {language === 'zh' 
                      ? '生成社交媒体图文、营销活动简报和项目提案。'
                      : 'Generate social media graphics and copy, marketing campaign briefs, and project proposals.'}
                  </p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                  <h4 className="font-semibold text-cyan-800 mb-2">
                    {language === 'zh' ? '战略建议' : 'Strategic Recommendations'}
                  </h4>
                  <p className="text-cyan-700">
                    {language === 'zh' 
                      ? '务必设置"品牌套件"确保视觉一致性，利用网站功能快速创建营销活动登陆页面。'
                      : 'Be sure to set up "Brand Kit" to ensure visual consistency, use website features to quickly create marketing campaign landing pages.'}
                  </p>
                </div>
              </div>
            </ExpandableSection>
          </div>
        </section>

        {/* Limitations & Considerations */}
        <section className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {language === 'zh' ? '性能与局限性' : 'Performance & Limitations'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-semibold text-gray-800">
                  {language === 'zh' ? '导出保真度' : 'Export Fidelity'}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {language === 'zh' 
                  ? '导出为PowerPoint时可能出现格式错乱、文本溢出或字体不匹配等问题。'
                  : 'May experience format distortion, text overflow, or font mismatches when exporting to PowerPoint.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
              <div className="flex items-center mb-3">
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-semibold text-gray-800">
                  {language === 'zh' ? '网络依赖' : 'Network Dependency'}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {language === 'zh' 
                  ? '完全基于云端，需要持续稳定的网络连接，不提供离线编辑功能。'
                  : 'Completely cloud-based, requires continuous stable internet connection, no offline editing available.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
              <div className="flex items-center mb-3">
                <Palette className="h-5 w-5 text-purple-500 mr-2" />
                <h3 className="font-semibold text-gray-800">
                  {language === 'zh' ? '模板重复性' : 'Template Repetition'}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {language === 'zh' 
                  ? '底层卡片布局种类相对有限，频繁使用可能导致作品在结构上显得千篇一律。'
                  : 'Relatively limited underlying card layout varieties, frequent use may lead to structurally similar works.'}
              </p>
            </div>
          </div>
        </section>

        {/* Final Conclusion */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'zh' ? '最终结论' : 'Final Conclusion'}
            </h2>
            <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              {language === 'zh' ? (
                <>
                  Gamma 是一款为特定目的而生的革命性工具。它最大的价值在于消除内容创作过程中最耗时、最令人头疼的两个环节：<strong>初始结构搭建</strong>和<strong>视觉设计</strong>。
                </>
              ) : (
                <>
                  Gamma is a revolutionary tool built for specific purposes. Its greatest value lies in eliminating the two most time-consuming and frustrating aspects of content creation: <strong>initial structure building</strong> and <strong>visual design</strong>.
                </>
              )}
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto">
              <p className="text-lg text-purple-100">
                {language === 'zh' ? (
                  <>
                    它应该被视为一个<strong>&ldquo;初稿加速器&rdquo;</strong>和<strong>&ldquo;创意放大器&rdquo;</strong>。在这个新的人机协作范式中，用户的角色被提升了——从手动的排版工转变为战略性的编辑和思想的提炼者。
                  </>
                ) : (
                  <>
                    It should be viewed as a <strong>&ldquo;Draft Accelerator&rdquo;</strong> and <strong>&ldquo;Creative Amplifier&rdquo;</strong>. In this new human-AI collaboration paradigm, the user&rsquo;s role is elevated—from manual typesetter to strategic editor and idea refiner.
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <a 
                href="https://gamma.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                {language === 'zh' ? '访问 Gamma.app' : 'Visit Gamma.app'}
              </a>
              <div className="flex items-center space-x-2 text-purple-100">
                <Share2 className="h-5 w-5" />
                <span className="text-sm">
                  {language === 'zh' ? '分享这份分析报告' : 'Share this analysis report'}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <p className="text-gray-400">
              {language === 'zh' ? (
                <>
                  本报告基于 Gamma App 2025年功能分析 | 
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors ml-1">
                    详细文档参考
                  </a>
                </>
              ) : (
                <>
                  This report is based on Gamma App 2025 feature analysis | 
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors ml-1">
                    Detailed documentation reference
                  </a>
                </>
              )}
            </p>
            <p className="text-sm text-gray-500">
              {language === 'zh' 
                ? '© 2025 Gamma App 深度分析。本报告仅供参考，所有商标归其各自所有者所有。'
                : '© 2025 Gamma App Deep Analysis. This report is for reference only. All trademarks belong to their respective owners.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GammaAnalysis;