"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Brain, Mic, Globe, FileText, Users, Play, PauseCircle, Volume2 } from 'lucide-react';

interface TableRow {
  task: string;
  tool: string;
  reason: string;
  example: string;
}

interface PromptExample {
  goal: string;
  tool: string;
  prompt: string;
}

const GoogleAILearningGuide: React.FC = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [activeTab, setActiveTab] = useState<string>('overview');

  const translations = {
    zh: {
      title: "AI赋能型学生：运用Google NotebookLM与Gemini精通学习的综合指南",
      subtitle: "新时代的学术工具箱",
      introduction: "引言",
      overview: "概述",
      notebooklm: "NotebookLM指南",
      gemini: "Gemini探索",
      geminiLive: "Gemini Live互动",
      strategy: "综合战略",
      conclusion: "结论"
    },
    en: {
      title: "AI-Powered Students: A Comprehensive Guide to Mastering Learning with Google NotebookLM and Gemini",
      subtitle: "The Academic Toolkit for the New Era",
      introduction: "Introduction",
      overview: "Overview",
      notebooklm: "NotebookLM Guide",
      gemini: "Gemini Exploration",
      geminiLive: "Gemini Live Interactive",
      strategy: "Integrated Strategy",
      conclusion: "Conclusion"
    }
  };

  const t = translations[language];

  const toolComparisonData: TableRow[] = [
    {
      task: language === 'zh' ? "理解我的课堂笔记和教科书章节" : "Understanding my class notes and textbook chapters",
      tool: "NotebookLM",
      reason: language === 'zh' ? "NotebookLM的回答完全基于用户上传的资料，并提供引文，确保了对特定学习材料的准确理解" : "NotebookLM responses are entirely based on user-uploaded materials with citations, ensuring accurate understanding of specific learning materials",
      example: language === 'zh' ? "上传PDF和课堂笔记，然后点击学习指南按钮" : "Upload PDFs and class notes, then click the Study Guide button"
    },
    {
      task: language === 'zh' ? "为历史论文进行头脑风暴，寻找新颖的切入点" : "Brainstorming novel angles for history papers",
      tool: "Gemini",
      reason: language === 'zh' ? "Gemini能够连接互联网，进行广泛的开放式探索，生成多样化的创意和观点" : "Gemini can connect to the internet for broad open-ended exploration, generating diverse ideas and perspectives",
      example: language === 'zh' ? "提问关于罗马帝国衰落的经济因素这一主题，提供10个新颖的论文切入点" : "Ask about Economic Factors in the Fall of the Roman Empire topic, provide 10 novel thesis angles"
    },
    {
      task: language === 'zh' ? "练习西班牙语口语，准备口语考试" : "Practicing Spanish speaking for oral exams",
      tool: "Gemini Live",
      reason: language === 'zh' ? "Gemini Live提供实时的、可中断的语音对话功能，是进行语言练习和模拟对话的理想工具" : "Gemini Live provides real-time, interruptible voice conversation functionality, ideal for language practice and mock conversations",
      example: language === 'zh' ? "启动Gemini Live，说我们来练习西班牙语，你扮演一位咖啡店店员" : "Launch Gemini Live and say Let us practice Spanish, you play a coffee shop clerk"
    }
  ];

  const promptExamples: PromptExample[] = [
    {
      goal: language === 'zh' ? "深度理解核心概念" : "Deep Understanding of Core Concepts",
      tool: "NotebookLM",
      prompt: language === 'zh' 
        ? "分析我上传的所有资料，生成5个核心问题。这些问题在被回答后，应能捕捉到资料的主要观点和核心意义。"
        : "Analyze all uploaded materials and generate 5 core questions. When answered, these questions should capture the main points and core significance of the materials."
    },
    {
      goal: language === 'zh' ? "高效备考" : "Efficient Exam Preparation",
      tool: "Gemini",
      prompt: language === 'zh'
        ? "请基于这些材料，为我创建一份包含20道选择题的模拟测验。要求：题目覆盖所有关键知识点。"
        : "Based on these materials, create a mock quiz with 20 multiple-choice questions. Requirements: questions should cover all key knowledge points."
    },
    {
      goal: language === 'zh' ? "锻炼批判性思维" : "Critical Thinking Training",
      tool: "Gemini",
      prompt: language === 'zh'
        ? "请扮演一个魔鬼代言人的角色，针对我的论点，提出三个最强有力的、最难以反驳的反对意见。"
        : "Please play the role of a devil advocate and present three of the strongest, most difficult-to-refute counterarguments to my thesis."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {language === 'zh' ? 'AI学习指南' : 'AI Learning Guide'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                aria-label="Switch language"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'zh' ? 'English' : '中文'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Brain className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-gray-700 font-medium">NotebookLM</span>
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Mic className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-gray-700 font-medium">Gemini Live</span>
            </div>
            <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <FileText className="h-5 w-5 text-pink-500 mr-2" />
              <span className="text-gray-700 font-medium">Gemini</span>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg" role="tablist">
          {[
            { id: 'overview', icon: Globe, label: t.overview },
            { id: 'notebooklm', icon: BookOpen, label: t.notebooklm },
            { id: 'gemini', icon: Brain, label: t.gemini },
            { id: 'live', icon: Mic, label: t.geminiLive },
            { id: 'strategy', icon: Users, label: t.strategy }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                activeTab === id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
              role="tab"
              aria-selected={activeTab === id}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Overview Section */}
          {activeTab === 'overview' && (
            <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{t.introduction}</h2>
              
              <div className="prose max-w-none text-gray-700 mb-8">
                <p className="text-lg leading-relaxed mb-6">
                  {language === 'zh' ? 
                    "在当今学术环境中，人工智能（AI）正在经历一场范式转变，它不再是简单的信息检索工具，而是演变为能够辅助思考、深化理解的认知伙伴。Google推出的两款旗舰AI工具——NotebookLM和Gemini，正处于这场变革的核心。" :
                    "In today&rsquo;s academic environment, artificial intelligence (AI) is undergoing a paradigm shift. It is no longer just a simple information retrieval tool, but has evolved into a cognitive partner that can assist thinking and deepen understanding. Google&rsquo;s two flagship AI tools—NotebookLM and Gemini—are at the heart of this transformation."
                  }
                </p>
              </div>

              {/* Key Differences */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-blue-800">Google NotebookLM</h3>
                  </div>
                  <p className="text-blue-700 leading-relaxed">
                    {language === 'zh' ?
                      "这是一个个人化、私密且扎根于特定资料的研究助手。它的智慧完全来源于用户上传的资料，每一个回答都有据可查，直接链接回原始资料，确保了信息的准确性和可信度。" :
                      "This is a personalized, private research assistant rooted in specific materials. Its intelligence comes entirely from user-uploaded materials, with every answer being verifiable and directly linked back to original sources, ensuring information accuracy and credibility."
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-center mb-4">
                    <Brain className="h-6 w-6 text-purple-600 mr-3" />
                    <h3 className="text-xl font-bold text-purple-800">Google Gemini</h3>
                  </div>
                  <p className="text-purple-700 leading-relaxed">
                    {language === 'zh' ?
                      "这是一个开放、富有创造性且用于探索的AI助手。它连接着广阔的互联网和Google的整个生态系统，核心优势在于进行开放式头脑风暴、发现新信息、跨领域知识关联。" :
                      "This is an open, creative AI assistant for exploration. It connects to the vast internet and Google&rsquo;s entire ecosystem, with core strengths in open-ended brainstorming, discovering new information, and cross-domain knowledge connections."
                    }
                  </p>
                </div>
              </div>

              {/* Tool Comparison Table */}
              <div className="bg-white rounded-2xl p-6 shadow-lg overflow-x-auto">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  {language === 'zh' ? 'NotebookLM vs. Gemini：为不同任务选择合适的工具' : 'NotebookLM vs. Gemini: Choosing the Right Tool for Different Tasks'}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left p-4 font-semibold text-gray-700">
                          {language === 'zh' ? '学习任务' : 'Learning Task'}
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          {language === 'zh' ? '首选工具' : 'Preferred Tool'}
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          {language === 'zh' ? '选择原因' : 'Reason'}
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-700">
                          {language === 'zh' ? '示例操作' : 'Example Operation'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {toolComparisonData.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-sm text-gray-800">{row.task}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              row.tool === 'NotebookLM' 
                                ? 'bg-blue-100 text-blue-800' 
                                : row.tool === 'Gemini Live'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {row.tool}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{row.reason}</td>
                          <td className="p-4 text-sm text-gray-700 font-mono bg-gray-50 rounded">{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* NotebookLM Section */}
          {activeTab === 'notebooklm' && (
            <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <BookOpen className="h-8 w-8 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">{t.notebooklm}</h2>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                  <FileText className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-bold text-blue-800 mb-3">
                    {language === 'zh' ? '学习指南' : 'Study Guides'}
                  </h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    {language === 'zh' ? 
                      '一键生成包含关键术语、模拟测验和论文题目的全面学习指南' :
                      'Generate comprehensive study guides with key terms, mock quizzes, and essay questions with one click'
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                  <Brain className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="text-lg font-bold text-purple-800 mb-3">
                    {language === 'zh' ? '思维导图' : 'Mind Maps'}
                  </h3>
                  <p className="text-purple-700 text-sm leading-relaxed">
                    {language === 'zh' ? 
                      '将复杂概念可视化为交互式的分层级图表，帮助理解知识结构' :
                      'Visualize complex concepts as interactive hierarchical charts to help understand knowledge structure'
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                  <Volume2 className="h-8 w-8 text-pink-600 mb-4" />
                  <h3 className="text-lg font-bold text-pink-800 mb-3">
                    {language === 'zh' ? '音频概览' : 'Audio Overview'}
                  </h3>
                  <p className="text-pink-700 text-sm leading-relaxed">
                    {language === 'zh' ? 
                      '将资料转化为AI主播对话形式的播客，支持互动模式' :
                      'Transform materials into podcast-style AI host conversations with interactive mode support'
                    }
                  </p>
                </div>
              </div>

              {/* Supported File Types */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {language === 'zh' ? '支持的资料类型' : 'Supported File Types'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mr-3">📄</span>
                    <div>
                      <div className="font-medium text-gray-800">PDF</div>
                      <div className="text-xs text-gray-500">200MB</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mr-3">📝</span>
                    <div>
                      <div className="font-medium text-gray-800">Google Docs</div>
                      <div className="text-xs text-gray-500">500K words</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mr-3">📺</span>
                    <div>
                      <div className="font-medium text-gray-800">YouTube</div>
                      <div className="text-xs text-gray-500">Transcripts</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mr-3">🎵</span>
                    <div>
                      <div className="font-medium text-gray-800">Audio</div>
                      <div className="text-xs text-gray-500">200MB</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Demo */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">
                  {language === 'zh' ? '互动演示' : 'Interactive Demo'}
                </h3>
                <p className="mb-4">
                  {language === 'zh' ? 
                    '体验NotebookLM的音频概览功能：' :
                    'Experience NotebookLM&rsquo;s Audio Overview feature:'
                  }
                </p>
                <div className="flex items-center space-x-4 bg-white/20 rounded-lg p-4">
                  <Play className="h-6 w-6" />
                  <div className="flex-1">
                    <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-1/3"></div>
                    </div>
                  </div>
                  <span className="text-sm">2:34 / 8:15</span>
                </div>
              </div>
            </section>
          )}

          {/* Gemini Section */}
          {activeTab === 'gemini' && (
            <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <Brain className="h-8 w-8 text-purple-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">{t.gemini}</h2>
              </div>

              {/* Capabilities */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="relative overflow-hidden rounded-2xl p-6 text-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-3">
                      {language === 'zh' ? '深度研究' : 'Deep Research'}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-90">
                      {language === 'zh' ? 
                        '自动浏览分析数百个网站，生成全面的研究报告' :
                        'Automatically browse and analyze hundreds of websites to generate comprehensive research reports'
                      }
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl p-6 text-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-3">
                      {language === 'zh' ? '多模态查询' : 'Multimodal Queries'}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-90">
                      {language === 'zh' ? 
                        '支持文本、图像、语音多种输入方式，分析复杂文档' :
                        'Support text, image, and voice input methods, analyze complex documents'
                      }
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl p-6 text-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-3">
                      {language === 'zh' ? '创造性解释' : 'Creative Explanations'}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-90">
                      {language === 'zh' ? 
                        '用创新方式解释抽象概念，生成定制化图像和图表' :
                        'Explain abstract concepts in innovative ways, generate customized images and charts'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Integration with Google Workspace */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {language === 'zh' ? '与Google Workspace深度集成' : 'Deep Integration with Google Workspace'}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">
                      {language === 'zh' ? '写作支持' : 'Writing Support'}
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {language === 'zh' ? 'Google Docs中的实时协作' : 'Real-time collaboration in Google Docs'}
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {language === 'zh' ? '自动大纲生成和内容扩展' : 'Automatic outline generation and content expansion'}
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {language === 'zh' ? '语气调整和风格优化' : 'Tone adjustment and style optimization'}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">
                      {language === 'zh' ? '演示制作' : 'Presentation Creation'}
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        {language === 'zh' ? 'Google Slides中的图像生成' : 'Image generation in Google Slides'}
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        {language === 'zh' ? '主题一致的视觉元素' : 'Thematically consistent visual elements'}
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        {language === 'zh' ? '内容结构优化建议' : 'Content structure optimization suggestions'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Gemini Live Section */}
          {activeTab === 'live' && (
            <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <Mic className="h-8 w-8 text-pink-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">{t.geminiLive}</h2>
              </div>

              {/* Live Features */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-pink-50 to-red-100 rounded-2xl p-6 border border-pink-200">
                  <h3 className="text-xl font-bold text-pink-800 mb-4">
                    {language === 'zh' ? '语言学习与演讲练习' : 'Language Learning & Speech Practice'}
                  </h3>
                  <ul className="space-y-3 text-pink-700">
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">🗣️</span>
                      {language === 'zh' ? 
                        '实时发音纠正和语法反馈' :
                        'Real-time pronunciation correction and grammar feedback'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">🎭</span>
                      {language === 'zh' ? 
                        '模拟面试和角色扮演练习' :
                        'Mock interviews and role-playing exercises'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">📚</span>
                      {language === 'zh' ? 
                        '多语种对话练习支持' :
                        'Multi-language conversation practice support'
                      }
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-6 border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">
                    {language === 'zh' ? '辩论与批判性思维' : 'Debate & Critical Thinking'}
                  </h3>
                  <ul className="space-y-3 text-purple-700">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">⚖️</span>
                      {language === 'zh' ? 
                        '模拟辩论和论点检验' :
                        'Mock debates and argument testing'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">🔍</span>
                      {language === 'zh' ? 
                        '实时事实核查和证据分析' :
                        'Real-time fact-checking and evidence analysis'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">💭</span>
                      {language === 'zh' ? 
                        '苏格拉底式问答引导' :
                        'Socratic questioning guidance'
                      }
                    </li>
                  </ul>
                </div>
              </div>

              {/* Interactive Example */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 text-white mb-8">
                <h3 className="text-xl font-bold mb-4">
                  {language === 'zh' ? '互动示例：语言学习' : 'Interactive Example: Language Learning'}
                </h3>
                <div className="bg-white/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm opacity-90">
                      {language === 'zh' ? '正在录音...' : 'Recording...'}
                    </span>
                  </div>
                  <p className="text-sm mb-2">
                    <strong>{language === 'zh' ? '学生：' : 'Student:'}</strong> 
                    {' '} Hola, me gustaría practicar español contigo.
                  </p>
                  <p className="text-sm">
                    <strong>{language === 'zh' ? 'Gemini Live：' : 'Gemini Live:'}</strong> 
                    {' '} ¡Perfecto! Vamos a practicar. Nota que dijiste contigo correctamente. ¿De qué te gustaría hablar?
                  </p>
                </div>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-all duration-200">
                  {language === 'zh' ? '开始语音对话' : 'Start Voice Conversation'}
                </button>
              </div>

              {/* Gaming and Simulation */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {language === 'zh' ? '游戏化学习与模拟' : 'Gamified Learning & Simulation'}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {language === 'zh' ? '历史角色扮演' : 'Historical Role-Play'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'zh' ? 
                        '扮演阿波罗11号宇航员与地面控制中心对话' :
                        'Role-play as Apollo 11 astronaut communicating with ground control'
                      }
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {language === 'zh' ? '互动式测验' : 'Interactive Quizzes'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'zh' ? 
                        '自适应的口语问答，根据回答调整难度' :
                        'Adaptive verbal Q&A that adjusts difficulty based on responses'
                      }
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {language === 'zh' ? '案例研究' : 'Case Studies'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'zh' ? 
                        '商业伦理决策模拟，接受董事会质询' :
                        'Business ethics decision simulation with board questioning'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Strategy Section */}
          {activeTab === 'strategy' && (
            <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-green-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">{t.strategy}</h2>
              </div>

              {/* Workflow Example */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  {language === 'zh' ? '完整工作流：一个典型学习日' : 'Complete Workflow: A Typical Learning Day'}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-bold text-gray-800 mr-3">
                          {language === 'zh' ? '头脑风暴与初步探索' : 'Brainstorming & Initial Exploration'}
                        </h4>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          Gemini
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {language === 'zh' ? 
                          '开放式提问，获取研究方向、相关理论和关键研究者信息' :
                          'Open-ended questioning to get research directions, relevant theories, and key researcher information'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-bold text-gray-800 mr-3">
                          {language === 'zh' ? '信息搜集' : 'Information Gathering'}
                        </h4>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                          Library/Web
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {language === 'zh' ? 
                          '根据线索下载PDF论文，保存权威机构报告和文章' :
                          'Download PDF papers based on leads, save authoritative institution reports and articles'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-bold text-gray-800 mr-3">
                          {language === 'zh' ? '综合与深度理解' : 'Synthesis & Deep Understanding'}
                        </h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          NotebookLM
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {language === 'zh' ? 
                          '上传所有资料，生成思维导图和音频概览，进行精确提问' :
                          'Upload all materials, generate mind maps and audio overviews, make precise inquiries'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-bold text-gray-800 mr-3">
                          {language === 'zh' ? '大纲构建与草稿撰写' : 'Outline Building & Draft Writing'}
                        </h4>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Gemini + Docs
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {language === 'zh' ? 
                          '导出关键洞察，在Google Docs中构建大纲并撰写内容' :
                          'Export key insights, build outlines and write content in Google Docs'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      5
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-bold text-gray-800 mr-3">
                          {language === 'zh' ? '论点演练与精炼' : 'Argument Rehearsal & Refinement'}
                        </h4>
                        <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-medium rounded-full">
                          Gemini Live
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {language === 'zh' ? 
                          '口头陈述核心论点，接受批判性质疑，完善论证逻辑' :
                          'Verbally present core arguments, receive critical questioning, refine reasoning logic'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prompt Engineering */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  {language === 'zh' ? '学生成功指令精选库' : 'Student Success Prompt Library'}
                </h3>
                <div className="space-y-6">
                  {promptExamples.map((example, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">{example.goal}</h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {example.tool}
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded p-3">
                        <p className="text-sm text-gray-700 font-mono leading-relaxed">
                          {example.prompt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Integrity */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">
                  {language === 'zh' ? '学术诚信框架' : 'Academic Integrity Framework'}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      {language === 'zh' ? '脚手架原则' : 'Scaffolding Principle'}
                    </h4>
                    <p className="text-sm opacity-90">
                      {language === 'zh' ? 
                        'AI辅助理解和组织，核心思考由自己完成' :
                        'AI assists understanding and organization, core thinking done by yourself'
                      }
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      {language === 'zh' ? '透明引用' : 'Transparent Citation'}
                    </h4>
                    <p className="text-sm opacity-90">
                      {language === 'zh' ? 
                        '明确说明AI工具的使用范围和贡献' :
                        'Clearly state the scope and contribution of AI tool usage'
                      }
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      {language === 'zh' ? '数据保护' : 'Data Protection'}
                    </h4>
                    <p className="text-sm opacity-90">
                      {language === 'zh' ? 
                        '教育账户享有企业级隐私保护' :
                        'Educational accounts enjoy enterprise-level privacy protection'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Conclusion */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white text-center mt-12">
          <h2 className="text-3xl font-bold mb-6">{t.conclusion}</h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-8">
            {language === 'zh' ? 
              "Google NotebookLM和Gemini共同构成了一个前所未有的强大AI学习生态系统。掌握这套工具的核心，在于深刻理解它们各自的优势和局限，并战略性地将NotebookLM的扎根综合能力与Gemini的广泛探索能力结合起来。" :
              "Google NotebookLM and Gemini together form an unprecedented powerful AI learning ecosystem. The key to mastering this toolkit lies in deeply understanding their respective strengths and limitations, and strategically combining NotebookLM&rsquo;s grounded synthesis capabilities with Gemini&rsquo;s broad exploration abilities."
            }
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/20 rounded-lg p-4">
              <BookOpen className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '深度理解' : 'Deep Understanding'}
              </h3>
              <p className="text-sm opacity-90">
                {language === 'zh' ? 
                  '基于特定材料的精确分析' :
                  'Precise analysis based on specific materials'
                }
              </p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <Brain className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '创造性探索' : 'Creative Exploration'}
              </h3>
              <p className="text-sm opacity-90">
                {language === 'zh' ? 
                  '开放式研究与跨领域连接' :
                  'Open-ended research and cross-domain connections'
                }
              </p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <Mic className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '互动实践' : 'Interactive Practice'}
              </h3>
              <p className="text-sm opacity-90">
                {language === 'zh' ? 
                  '实时对话与技能训练' :
                  'Real-time conversation and skill training'
                }
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            {language === 'zh' ? 
              '本指南旨在帮助学生充分利用AI工具提升学习效果。请遵循所在学校的学术诚信政策。' :
              'This guide aims to help students fully utilize AI tools to improve learning outcomes. Please follow your school&rsquo;s academic integrity policies.'
            }
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GoogleAILearningGuide;