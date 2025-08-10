"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mic, Camera, FileText, Video, Palette, Music, Globe, Code, Brain, Sparkles } from 'lucide-react';

interface Feature {
  id: number;
  icon: React.ReactNode;
  titleCN: string;
  titleEN: string;
  descriptionCN: string;
  descriptionEN: string;
  guideCN: string;
  guideEN: string;
  screenshotCN: string;
  screenshotEN: string;
  color: string;
}

const TongyiAppShowcase: React.FC = () => {
  const [language, setLanguage] = useState<'cn' | 'en'>('cn');
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const features: Feature[] = [
    {
      id: 1,
      icon: <Brain className="w-8 h-8" />,
      titleCN: "强大语言模型（核心引擎）",
      titleEN: "Powerful Language Model (Core Engine)",
      descriptionCN: "基于Qwen3模型，支持119种语言及方言，擅长代码、逻辑推理、翻译和多轮对话。2025年更新包括思考模式切换和QwQ-32B推理模型接入。",
      descriptionEN: "Based on Qwen3 model, supporting 119 languages and dialects, excelling in code, logical reasoning, translation, and multi-turn conversations. 2025 updates include thinking mode switching and QwQ-32B reasoning model integration.",
      guideCN: "打开App首页，输入文本/语音问题，点击发送；支持连续追问。启用思考模式：在设置中切换参数。",
      guideEN: "Open the app homepage, input text/voice questions, click send; supports continuous follow-up questions. Enable thinking mode: switch parameters in settings.",
      screenshotCN: "首页聊天界面显示简洁输入框、智能体头像、推荐问题列表，下方有历史对话记录。",
      screenshotEN: "Homepage chat interface shows clean input box, AI avatar, recommended question list, with conversation history below.",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      icon: <Sparkles className="w-8 h-8" />,
      titleCN: "知识问答",
      titleEN: "Knowledge Q&A",
      descriptionCN: "提供百科式回答，涵盖天文地理、情感支持和专业知识。2025年增强多模态理解，支持拍照找bug。",
      descriptionEN: "Provides encyclopedic answers covering astronomy, geography, emotional support, and professional knowledge. 2025 enhanced multimodal understanding with photo bug detection.",
      guideCN: "在聊天界面输入问题，App自动回复；上传图片/语音追问细节。",
      guideEN: "Input questions in chat interface, app automatically replies; upload images/voice for detailed follow-up.",
      screenshotCN: "问答界面展示用户输入框、AI详细文本回复、图片上传按钮和多语言切换选项。",
      screenshotEN: "Q&A interface shows user input box, detailed AI text replies, image upload button, and multilingual switching options.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      icon: <Mic className="w-8 h-8" />,
      titleCN: "实时记录与脑图生成",
      titleEN: "Real-time Recording & Mind Map Generation",
      descriptionCN: "录音转文字、重点总结、多语言翻译。新增生成会议脑图、定义发言人身份功能。",
      descriptionEN: "Voice-to-text, key point summarization, multilingual translation. New features include meeting mind map generation and speaker identity definition.",
      guideCN: "点击&ldquo;实时记录&rdquo;按钮，开始录音；结束后自动总结并生成脑图。",
      guideEN: "Click &ldquo;Real-time Recording&rdquo; button, start recording; automatically summarizes and generates mind maps after completion.",
      screenshotCN: "记录界面显示录音波形图、实时文字转写、脑图预览和总结弹窗。",
      screenshotEN: "Recording interface shows audio waveform, real-time text transcription, mind map preview, and summary popup.",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      icon: <FileText className="w-8 h-8" />,
      titleCN: "智能写作与文案创作",
      titleEN: "Smart Writing & Content Creation",
      descriptionCN: "生成创意文案、文章、小说或学术论文。2025更新：集成AI PPT，支持小红书文案、剧本续写。",
      descriptionEN: "Generate creative copy, articles, novels, or academic papers. 2025 updates: integrated AI PPT, supports Xiaohongshu copy and script continuation.",
      guideCN: "输入主题，选择模板；App生成草稿，编辑后点击&ldquo;完善&rdquo;。",
      guideEN: "Input topic, select template; app generates draft, edit and click &ldquo;Improve&rdquo;.",
      screenshotCN: "写作界面包括主题输入区、文案预览、编辑工具栏和导出按钮。",
      screenshotEN: "Writing interface includes topic input area, copy preview, editing toolbar, and export button.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      icon: <Video className="w-8 h-8" />,
      titleCN: "音视频处理（通义听悟）",
      titleEN: "Audio/Video Processing (Tongyi Tingwu)",
      descriptionCN: "识别、摘要、翻译音视频，支持同时处理50个文件。2025新增：AI实时记录、章节速览。",
      descriptionEN: "Recognize, summarize, and translate audio/video, supporting simultaneous processing of 50 files. 2025 additions: AI real-time recording, chapter overview.",
      guideCN: "上传音视频文件，App自动转写文字和生成摘要。批量处理：多选文件上传。",
      guideEN: "Upload audio/video files, app automatically transcribes text and generates summaries. Batch processing: multi-select file upload.",
      screenshotCN: "音视频界面展示上传进度条、转写文本、摘要弹窗和多语言翻译选项。",
      screenshotEN: "Audio/video interface shows upload progress, transcribed text, summary popup, and multilingual translation options.",
      color: "from-red-500 to-pink-500"
    },
    {
      id: 6,
      icon: <Palette className="w-8 h-8" />,
      titleCN: "视觉生成与文生图（通义万相）",
      titleEN: "Visual Generation & Text-to-Image (Tongyi Wanxiang)",
      descriptionCN: "文字作画、AI生视频、图片理解/生成。2025更新：局部风格化，视频模式识别。",
      descriptionEN: "Text-to-art, AI video generation, image understanding/generation. 2025 updates: local stylization, video mode recognition.",
      guideCN: "输入描述，选择风格；上传图片编辑。生视频：描述场景，点击生成。",
      guideEN: "Input description, select style; upload images for editing. Video generation: describe scene, click generate.",
      screenshotCN: "生图界面显示文字输入框、风格模板网格、生成预览图和分享按钮。",
      screenshotEN: "Image generation interface shows text input box, style template grid, generated preview, and share button.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 7,
      icon: <Music className="w-8 h-8" />,
      titleCN: "创新娱乐应用（全民舞台）",
      titleEN: "Innovative Entertainment Apps (Universal Stage)",
      descriptionCN: "包括&ldquo;全民舞王&rdquo;（照片生成舞蹈视频）、&ldquo;全民唱演&rdquo;（音频驱动肖像唱歌）。",
      descriptionEN: "Includes &ldquo;Universal Dance King&rdquo; (photo-to-dance video) and &ldquo;Universal Singing&rdquo; (audio-driven portrait singing).",
      guideCN: "进入&ldquo;全民舞台&rdquo;频道，上传照片/音频，选择模板；生成后分享。",
      guideEN: "Enter &ldquo;Universal Stage&rdquo; channel, upload photos/audio, select templates; share after generation.",
      screenshotCN: "舞台界面展示上传区、模板选择、视频预览播放器和社区分享功能。",
      screenshotEN: "Stage interface shows upload area, template selection, video preview player, and community sharing features.",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 8,
      icon: <Globe className="w-8 h-8" />,
      titleCN: "实时翻译",
      titleEN: "Real-time Translation",
      descriptionCN: "支持中文与英语、日语等6种语言互译。2025优化：旅行场景、同声传译和语音模式。",
      descriptionEN: "Supports mutual translation between Chinese and 6 languages including English and Japanese. 2025 optimizations: travel scenarios, simultaneous interpretation, and voice mode.",
      guideCN: "语音输入中文，App实时翻译；设置目标语言。旅行模式：开启后自动检测场景。",
      guideEN: "Voice input in Chinese, app translates in real-time; set target language. Travel mode: automatically detects scenarios when enabled.",
      screenshotCN: "翻译界面包括语音输入按钮、实时文本转换、语言切换下拉菜单和历史记录。",
      screenshotEN: "Translation interface includes voice input button, real-time text conversion, language switching dropdown, and history records.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: 9,
      icon: <Camera className="w-8 h-8" />,
      titleCN: "语音交互模式",
      titleEN: "Voice Interaction Mode",
      descriptionCN: "口语陪练、情感陪聊、商务谈判、角色扮演。2025新增：视频模式下识别真实场景。",
      descriptionEN: "Oral practice, emotional companionship, business negotiation, role-playing. 2025 addition: real scene recognition in video mode.",
      guideCN: "点击语音按钮，选择模式；说话后App回应。角色扮演：输入角色描述开始。",
      guideEN: "Click voice button, select mode; app responds after speaking. Role-playing: input character description to start.",
      screenshotCN: "语音界面显示波形录音、AI头像动画、模式选择卡片和文本转语音输出。",
      screenshotEN: "Voice interface shows waveform recording, AI avatar animation, mode selection cards, and text-to-speech output.",
      color: "from-emerald-500 to-green-500"
    },
    {
      id: 10,
      icon: <Code className="w-8 h-8" />,
      titleCN: "文档与编码助手",
      titleEN: "Document & Coding Assistant",
      descriptionCN: "解析1000万字长文档、智能编码。2025更新：同时处理100份不同格式文档。",
      descriptionEN: "Parse 10-million-word long documents, intelligent coding. 2025 update: simultaneously process 100 documents in different formats.",
      guideCN: "上传文档，App总结/解析；编码：输入代码问题，生成/调试。",
      guideEN: "Upload documents, app summarizes/parses; coding: input code questions, generate/debug.",
      screenshotCN: "文档界面展示上传列表、解析总结文本、代码编辑器和高亮bug区域。",
      screenshotEN: "Document interface shows upload list, parsed summary text, code editor, and highlighted bug areas.",
      color: "from-slate-500 to-gray-600"
    }
  ];

  const toggleFeature = (id: number) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'cn' ? 'en' : 'cn');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 animate-pulse">
              {language === 'cn' ? '通义App功能展示' : 'Tongyi App Features Showcase'}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {language === 'cn' 
                ? '阿里巴巴旗下全能AI助手，基于Qwen3大模型，支持多模态交互，为您提供智能化体验'
                : 'Alibaba&rsquo;s all-in-one AI assistant based on Qwen3 large model, supporting multimodal interaction for intelligent experiences'
              }
            </p>
            <button
              onClick={toggleLanguage}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm border border-white/30"
              aria-label={language === 'cn' ? 'Switch to English' : '切换到中文'}
            >
              {language === 'cn' ? 'English' : '中文'}
            </button>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`bg-gradient-to-r ${feature.color} p-6`}>
                <div className="flex items-center gap-4 text-white">
                  {feature.icon}
                  <h2 className="text-xl font-bold">
                    {language === 'cn' ? feature.titleCN : feature.titleEN}
                  </h2>
                </div>
              </div>
              
              <div className="p-6 text-white">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {language === 'cn' ? feature.descriptionCN : feature.descriptionEN}
                </p>
                
                <button
                  onClick={() => toggleFeature(feature.id)}
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200"
                  aria-expanded={expandedFeature === feature.id}
                  aria-label={language === 'cn' ? '查看详情' : 'View Details'}
                >
                  {language === 'cn' ? '查看详情' : 'View Details'}
                  {expandedFeature === feature.id ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </button>
                
                {expandedFeature === feature.id && (
                  <div className="mt-4 space-y-4 animate-in slide-in-from-top duration-300">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h3 className="font-semibold text-purple-300 mb-2">
                        {language === 'cn' ? '使用指导' : 'Usage Guide'}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {language === 'cn' ? feature.guideCN : feature.guideEN}
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h3 className="font-semibold text-purple-300 mb-2">
                        {language === 'cn' ? '界面描述' : 'Interface Description'}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {language === 'cn' ? feature.screenshotCN : feature.screenshotEN}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* App Info */}
      <section className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 py-16">
        <div className="container mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {language === 'cn' ? '应用信息' : 'App Information'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'cn' ? '免费使用' : 'Free to Use'}
                </h3>
                <p className="text-gray-300 text-sm">
                  {language === 'cn' 
                    ? '支持iOS/Android平台下载使用' 
                    : 'Available for iOS/Android download'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'cn' ? '多语言支持' : 'Multilingual Support'}
                </h3>
                <p className="text-gray-300 text-sm">
                  {language === 'cn' 
                    ? '支持119种语言及方言' 
                    : 'Supports 119 languages and dialects'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'cn' ? '持续更新' : 'Continuous Updates'}
                </h3>
                <p className="text-gray-300 text-sm">
                  {language === 'cn' 
                    ? '最新版本V3.49.0，定期更新功能' 
                    : 'Latest version V3.49.0, regular feature updates'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            {language === 'cn' 
              ? '© 2025 阿里巴巴通义App - 让AI触手可及' 
              : '© 2025 Alibaba Tongyi App - Making AI Accessible'
            }
          </p>
        </div>
      </footer>
    </main>
  );
};

export default TongyiAppShowcase;