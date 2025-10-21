"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, BookOpen, Lightbulb, Target, Award, Rocket, Menu, X } from 'lucide-react'

export default function AISystemEngineeringGuide() {
  const [activeSection, setActiveSection] = useState<string>('intro')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['1']))
  const [language, setLanguage] = useState<'zh' | 'en' | 'both'>('both')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <BookOpen className="text-indigo-600" size={32} />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {language !== 'en' && 'AI赋能系统工程学习路线图'}
                  {language === 'both' && ' | '}
                  {language !== 'zh' && 'AI-Enhanced System Engineering Learning Roadmap'}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLanguage('zh')}
                className={`px-3 py-1 rounded-lg transition-all ${language === 'zh' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                中文
              </button>
              <button
                onClick={() => setLanguage('both')}
                className={`px-3 py-1 rounded-lg transition-all ${language === 'both' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                双语
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg transition-all ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className={`lg:w-80 ${sidebarOpen ? 'block' : 'hidden lg:block'} lg:sticky lg:top-24 h-fit`}>
            <nav className="bg-white rounded-2xl shadow-lg p-6 space-y-2">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                {language !== 'en' ? '目录' : ''}
                {language === 'both' ? ' | ' : ''}
                {language !== 'zh' ? 'Contents' : ''}
              </h2>
              {[
                { id: 'intro', icon: Rocket, zh: '引言', en: 'Introduction' },
                { id: 'part1', icon: Target, zh: '第一部分：基础设置', en: 'Part 1: Foundation Setup' },
                { id: 'part2', icon: Lightbulb, zh: '第二部分：知识获取', en: 'Part 2: Knowledge Acquisition' },
                { id: 'part3', icon: Target, zh: '第三部分：实践应用', en: 'Part 3: Practice & Application' },
                { id: 'part4', icon: Award, zh: '第四部分：考试精通', en: 'Part 4: Exam Mastery' },
                { id: 'part5', icon: Rocket, zh: '第五部分：理论实践', en: 'Part 5: Theory to Practice' },
                { id: 'appendix', icon: BookOpen, zh: '附录：提示手册', en: 'Appendix: Prompt Guide' }
              ].map(({ id, icon: Icon, zh, en }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-left text-sm">
                    {language !== 'en' ? zh : ''}
                    {language === 'both' ? ' | ' : ''}
                    {language !== 'zh' ? en : ''}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Introduction */}
            <section id="intro" className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <Rocket className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">
                  {language !== 'en' && '引言'}
                  {language === 'both' && ' | '}
                  {language !== 'zh' && 'Introduction'}
                </h2>
              </div>
              <div className="prose max-w-none">
                {language !== 'en' && (
                  <div className="mb-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      欢迎来到<strong className="text-indigo-600">AI增强型系统工程师</strong>完整学习蓝图。本指南将帮助您运用谷歌AI生态系统，包括NotebookLM、Gemini、Canvas和AI Studio，打造一个个性化、高效的学习系统。
                    </p>
                    <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 rounded-r-lg">
                      <p className="text-yellow-800 font-semibold">
                        💡 核心理念：将静态教材转化为动态、交互式学习体验，通过AI工具加速知识获取和技能掌握。
                      </p>
                    </div>
                  </div>
                )}
                {language !== 'zh' && (
                  <div className={`${language === 'both' ? 'mt-6 pt-6 border-t-2 border-gray-200' : ''} text-gray-700 leading-relaxed`}>
                    <p className="text-lg">
                      Welcome to the comprehensive learning blueprint for <strong className="text-purple-600">AI-Enhanced System Engineers</strong>. This guide will help you leverage the Google AI ecosystem, including NotebookLM, Gemini, Canvas, and AI Studio, to create a personalized and efficient learning system.
                    </p>
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-r-lg">
                      <p className="text-blue-800 font-semibold">
                        💡 Core Concept: Transform static textbooks into dynamic, interactive learning experiences, accelerating knowledge acquisition and skill mastery through AI tools.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Part 1: Foundation Setup */}
            <section id="part1" className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Target className="text-indigo-600" size={32} />
                  <h2 className="text-3xl font-bold text-gray-800">
                    {language !== 'en' && '第一部分：基础设置'}
                    {language === 'both' && ' | '}
                    {language !== 'zh' && 'Part 1: Foundation Setup'}
                  </h2>
                </div>
                <button
                  onClick={() => toggleSection('1')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Toggle section"
                >
                  {expandedSections.has('1') ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                </button>
              </div>

              {expandedSections.has('1') && (
                <div className="space-y-6">
                  {language !== 'en' && (
                    <div className="text-gray-700">
                      <h3 className="text-2xl font-semibold text-indigo-600 mb-4">构建您的个性化AI学习环境</h3>
                      <p className="leading-relaxed mb-4">
                        这一初始阶段至关重要，它为整个学习系统奠定了架构基础。我们将配置两个主要组件：作为&ldquo;单一事实来源&rdquo;知识库的NotebookLM，以及作为将与该知识库互动的专业&ldquo;AI导师&rdquo;的自定义Gemini Gem。
                      </p>

                      {/* Section 1.1 */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-indigo-700 mb-3">1.1 在NotebookLM中构建您的知识核心</h4>
                        <p className="mb-3"><strong className="text-indigo-600">目标：</strong>利用用户的PDF库（运筹学、科学管理、现代控制论）创建一个集中、私密且可靠的知识库。</p>
                        
                        <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="font-semibold text-gray-800 mb-2">操作步骤：</h5>
                          <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            <li><strong>访问NotebookLM：</strong>导航至 <code className="bg-gray-100 px-2 py-1 rounded">notebooklm.google.com</code> 并创建一个新的专用笔记本，命名为&ldquo;系统工程核心&rdquo;。</li>
                            <li><strong>上传资料源：</strong>系统地上传PDF教科书。NotebookLM支持多种格式，包括PDF、谷歌文档和文本文件。</li>
                            <li><strong>初步处理：</strong>上传后，NotebookLM会自动为每个资料源生成摘要和关键主题。</li>
                            <li><strong>按主题组织：</strong>可以为每个核心学科创建独立的笔记本，或将它们保存在一个主笔记本中。</li>
                          </ol>
                        </div>

                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                          <p className="text-yellow-800">
                            <strong>💡 关键洞察：</strong>将学习资料整合到NotebookLM中，建立了&ldquo;有根据的&rdquo;AI与&ldquo;生成式&rdquo;AI之间的关键区分。最佳策略是创建一个将它们串联起来的审慎工作流程。
                          </p>
                        </div>
                      </div>

                      {/* Section 1.2 */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-purple-700 mb-3">1.2 铸造您的专家AI导师：为系统工程定制Gemini Gem</h4>
                        <p className="mb-3"><strong className="text-purple-600">目标：</strong>创建一个专业化、可复用的AI角色——一个Gem——它被预先编程，能够像系统工程专家一样思考、推理和交流。</p>
                        
                        <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="font-semibold text-gray-800 mb-2">编写指令示例：</h5>
                          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`**角色：** 你是"SE-Tutor"，一位世界级的系统工程教授，
拥有博士学位。你的专业知识涵盖运筹学、科学管理和
现代控制论。你是一位苏格拉底式的导师。

**任务：** 你的主要任务是：
1. **解释概念：** 使用费曼学习法进行分解。
2. **生成练习题：** 创建切合实际的题目。
3. **分析解决方案：** 分析方法论，指出逻辑缺陷。
4. **连接学科：** 识别并解释各学科之间的联系。

**背景：** 优先处理我在提示中提供的信息。
语气应是学术、耐心和鼓励的。

**格式：** 使用结构化标题和项目符号。`}
                          </pre>
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                          <p className="text-blue-800">
                            <strong>🎯 专家建议：</strong>创建一个专业化的Gems<em>套件</em>，而不仅仅是一个。建议构建：SE-Tutor（解释者）、SE-Socrates（挑战者）、SE-Case-Analyst（实践者）。
                          </p>
                        </div>
                      </div>

                      {/* Section 1.3 - Tool Selection Matrix */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-green-700 mb-3">1.3 谷歌AI工具选择矩阵</h4>
                        <p className="mb-4">下表为整个学习过程提供了一个高层次的战略指南：</p>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full bg-white rounded-lg shadow-sm">
                            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                              <tr>
                                <th className="px-4 py-3 text-left">学习活动</th>
                                <th className="px-4 py-3 text-left">主要工具</th>
                                <th className="px-4 py-3 text-left">次要工具</th>
                                <th className="px-4 py-3 text-left">理由与工作流程</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium">吸收与总结核心教材</td>
                                <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">NotebookLM</span></td>
                                <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Gemini</span></td>
                                <td className="px-4 py-3 text-sm">NotebookLM提供基于资料源的摘要和引文</td>
                              </tr>
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium">记忆关键术语与公式</td>
                                <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">NotebookLM (Flashcards)</span></td>
                                <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Gemini (Canvas)</span></td>
                                <td className="px-4 py-3 text-sm">NotebookLM可即时生成抽认卡</td>
                              </tr>
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium">深化概念理解</td>
                                <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Gemini (自定义Gem)</span></td>
                                <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">NotebookLM</span></td>
                                <td className="px-4 py-3 text-sm">自定义的SE-Tutor Gem提供苏格拉底式的解释</td>
                              </tr>
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium">可视化动态系统</td>
                                <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Gemini (Canvas)</span></td>
                                <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">Canva</span></td>
                                <td className="px-4 py-3 text-sm">Canvas用于创建交互式可视化和模拟</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {language !== 'zh' && (
                    <div className={`${language === 'both' ? 'mt-8 pt-8 border-t-2 border-gray-200' : ''} text-gray-700`}>
                      <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Building Your Personalized AI Learning Environment</h3>
                      <p className="leading-relaxed mb-4">
                        This initial phase is crucial as it lays the architectural foundation for the entire learning system. We will configure two main components: NotebookLM as the &ldquo;single source of truth&rdquo; knowledge base, and a custom Gemini Gem as the specialized &ldquo;AI Tutor&rdquo; that will interact with this knowledge base.
                      </p>

                      {/* Section 1.1 English */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-indigo-700 mb-3">1.1 Building Your Knowledge Core in NotebookLM</h4>
                        <p className="mb-3"><strong className="text-indigo-600">Objective:</strong> Create a centralized, private, and reliable knowledge base using your PDF library (Operations Research, Scientific Management, Modern Cybernetics).</p>
                        
                        <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="font-semibold text-gray-800 mb-2">Action Steps:</h5>
                          <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            <li><strong>Access NotebookLM:</strong> Navigate to <code className="bg-gray-100 px-2 py-1 rounded">notebooklm.google.com</code> and create a new dedicated notebook named &ldquo;System Engineering Core&rdquo;.</li>
                            <li><strong>Upload Sources:</strong> Systematically upload PDF textbooks. NotebookLM supports multiple formats including PDFs, Google Docs, and text files.</li>
                            <li><strong>Initial Processing:</strong> After upload, NotebookLM automatically generates summaries and key topics for each source.</li>
                            <li><strong>Organize by Topic:</strong> You can create separate notebooks for each core discipline or keep them in one main notebook.</li>
                          </ol>
                        </div>

                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                          <p className="text-yellow-800">
                            <strong>💡 Key Insight:</strong> Integrating learning materials into NotebookLM establishes a critical distinction between &ldquo;grounded&rdquo; AI and &ldquo;generative&rdquo; AI. The optimal strategy is to create a deliberate workflow that chains them together.
                          </p>
                        </div>
                      </div>

                      {/* Section 1.2 English */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-purple-700 mb-3">1.2 Forging Your Expert AI Tutor: Customizing Gemini Gem for System Engineering</h4>
                        <p className="mb-3"><strong className="text-purple-600">Objective:</strong> Create a specialized, reusable AI persona—a Gem—that is pre-programmed to think, reason, and communicate like a systems engineering expert.</p>
                        
                        <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="font-semibold text-gray-800 mb-2">Example Instructions:</h5>
                          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`**Role:** You are "SE-Tutor", a world-class systems 
engineering professor with a PhD. Your expertise spans 
operations research, scientific management, and modern 
cybernetics. You are a Socratic tutor.

**Tasks:** Your primary tasks are:
1. **Explain Concepts:** Break down using Feynman technique.
2. **Generate Exercises:** Create realistic problems.
3. **Analyze Solutions:** Analyze methodology, identify flaws.
4. **Connect Disciplines:** Identify and explain connections.

**Background:** Prioritize information I provide in prompts.
Tone should be academic, patient, and encouraging.

**Format:** Use structured headings and bullet points.`}
                          </pre>
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                          <p className="text-blue-800">
                            <strong>🎯 Expert Tip:</strong> Create a <em>suite</em> of specialized Gems rather than just one. Build: SE-Tutor (Explainer), SE-Socrates (Challenger), SE-Case-Analyst (Practitioner).
                          </p>
                        </div>
                      </div>

                      {/* Section 1.3 - Tool Selection Matrix English */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-green-700 mb-3">1.3 Google AI Tool Selection Matrix</h4>
                        <p className="mb-4">The table below provides a high-level strategic guide for the entire learning process:</p>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full bg-white rounded-lg shadow-sm">
                            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                              <tr>
                                <th className="px-4 py-3 text-left">Learning Activity</th>
                                <th className="px-4 py-3 text-left">Primary Tool</th>
                                <th className="px-4 py-3 text-left">Secondary Tool</th>
                                <th className="px-4 py-3 text-left">Rationale &amp; Workflow</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium">Absorb &amp; Summarize Core Materials</td>
                                <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">NotebookLM</span></td>
                                <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Gemini</span></td>
                                <td className="px-4 py-3 text-sm">NotebookLM provides source-based summaries and citations</td>
                              </tr>
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium">Memorize Key Terms &amp; Formulas</td>
                                <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">NotebookLM (Flashcards)</span></td>
                                <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Gemini (Canvas)</span></td>
                                <td className="px-4 py-3 text-sm">NotebookLM instantly generates flashcards</td>
                              </tr>
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium">Deepen Conceptual Understanding</td>
                                <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Gemini (Custom Gem)</span></td>
                                <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">NotebookLM</span></td>
                                <td className="px-4 py-3 text-sm">Custom SE-Tutor Gem provides Socratic explanations</td>
                              </tr>
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium">Visualize Dynamic Systems</td>
                                <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Gemini (Canvas)</span></td>
                                <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">Canva</span></td>
                                <td className="px-4 py-3 text-sm">Canvas creates interactive visualizations and simulations</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Part 2: Knowledge Acquisition */}
            <section id="part2" className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Lightbulb className="text-yellow-600" size={32} />
                  <h2 className="text-3xl font-bold text-gray-800">
                    {language !== 'en' && '第二部分：知识获取与理解'}
                    {language === 'both' && ' | '}
                    {language !== 'zh' && 'Part 2: Knowledge Acquisition & Understanding'}
                  </h2>
                </div>
                <button
                  onClick={() => toggleSection('2')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Toggle section"
                >
                  {expandedSections.has('2') ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                </button>
              </div>

              {expandedSections.has('2') && (
                <div className="space-y-6">
                  {language !== 'en' && (
                    <div className="text-gray-700">
                      <p className="text-lg mb-4">
                        此阶段专注于将静态的PDF内容转化为动态、多模态和互动的学习体验，目标是从被动阅读转向与材料的主动互动。
                      </p>

                      {/* Section 2.1 */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-blue-700 mb-3">2.1 从文本到主动学习：NotebookLM的应用</h4>
                        
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">🎧 音频概览（Audio Overviews）</h5>
                            <p>为每个章节的PDF生成一个音频概览。尝试不同的格式：</p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                              <li><strong>深度探讨（Deep Dive）：</strong>用于全面讨论</li>
                              <li><strong>简报（Brief）：</strong>用于快速总结</li>
                              <li><strong>辩论（Debate）：</strong>用于探讨冲突概念</li>
                            </ul>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">📇 抽认卡（Flashcards）</h5>
                            <p>在复习完一个章节后，使用抽认卡功能自动为关键术语、定义和重要人物生成卡片。</p>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">📝 测验（Quizzes）</h5>
                            <p>为每个章节生成一个理解性测验，进行初步的知识检查。关键功能是能够在答错的题目上点击&ldquo;解释&rdquo;。</p>
                          </div>
                        </div>
                      </div>

                      {/* Section 2.2 */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-purple-700 mb-3">2.2 可视化复杂性：使用Gemini Canvas创建互动模型</h4>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                          <h5 className="font-semibold text-purple-600 mb-2">排队论模拟提示示例：</h5>
                          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mt-2">
{`扮演数据可视化和Web开发专家的角色。使用HTML、CSS和JavaScript，
创建一个M/M/1排队系统的交互式模拟。该模拟应包含：

1. 一个"服务器"和一个"队列"的视觉表示
2. 用于"添加顾客"和"处理顾客"的按钮
3. 显示当前队列中顾客数量（Lq）和服务器状态的显示器
4. 使用从NotebookLM获取的解释作为模型的逻辑

生成一个实时的、可交互的预览。`}
                          </pre>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                          <h5 className="font-semibold text-purple-600 mb-2">控制系统可视化提示示例：</h5>
                          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mt-2">
{`为恒温器的简单负反馈控制系统创建一个交互式HTML可视化。
该可视化应包括：

1. 一个用于设置"期望温度"（设定点）的滑块
2. 一个显示"当前温度"的显示器
3. 一个代表"加热器"的视觉元素
4. 一个引入"干扰"的按钮

逻辑应在当前温度 < 期望温度时开启加热器。
提供一个实时预览。`}
                          </pre>
                        </div>
                      </div>

                      {/* Section 2.3 */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-green-700 mb-3">2.3 苏格拉底式导师：通过AI驱动的对话深化理解</h4>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                          <h5 className="font-semibold text-green-600 mb-2">对话示例：</h5>
                          <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                              <p className="text-sm text-gray-600 font-semibold mb-1">用户输入：</p>
                              <p className="text-gray-800">&ldquo;根据文本，我的理解是，准时制（JIT）生产的主要好处是降低库存成本。这正确吗？&rdquo;</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                              <p className="text-sm text-gray-600 font-semibold mb-1">SE-Socrates回应：</p>
                              <p className="text-gray-800">&ldquo;你的前提关注于成本降低，这是一个显著的好处。然而，为了使JIT成功，我们正在做出哪些未言明的关于供应链稳定性的假设？当发生重大中断时，JIT系统会怎样？&rdquo;</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                          <p className="text-yellow-800">
                            <strong>💡 关键价值：</strong>苏格拉底式对话迫使学习者积极捍卫自己的理解，并考虑边缘案例和不同视角。这不仅用于澄清疑点，它还是一个强大的<em>综合</em>工具。
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {language !== 'zh' && (
                    <div className={`${language === 'both' ? 'mt-8 pt-8 border-t-2 border-gray-200' : ''} text-gray-700`}>
                      <p className="text-lg mb-4">
                        This phase focuses on transforming static PDF content into dynamic, multimodal, and interactive learning experiences, with the goal of moving from passive reading to active engagement with the material.
                      </p>

                      {/* Section 2.1 English */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-blue-700 mb-3">2.1 From Text to Active Learning: NotebookLM Applications</h4>
                        
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">🎧 Audio Overviews</h5>
                            <p>Generate an audio overview for each chapter PDF. Try different formats:</p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                              <li><strong>Deep Dive:</strong> For comprehensive discussion</li>
                              <li><strong>Brief:</strong> For quick summaries</li>
                              <li><strong>Debate:</strong> For exploring conflicting concepts</li>
                            </ul>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">📇 Flashcards</h5>
                            <p>After reviewing a chapter, use the flashcard feature to automatically generate cards for key terms, definitions, and important figures.</p>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">📝 Quizzes</h5>
                            <p>Generate a comprehension quiz for each chapter as an initial knowledge check. The key feature is the ability to click &ldquo;Explain&rdquo; on incorrect answers.</p>
                          </div>
                        </div>
                      </div>

                      {/* Section 2.2 English */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-purple-700 mb-3">2.2 Visualizing Complexity: Creating Interactive Models with Gemini Canvas</h4>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                          <h5 className="font-semibold text-purple-600 mb-2">Queueing Theory Simulation Prompt Example:</h5>
                          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mt-2">
{`Act as a data visualization and web development expert. Using HTML, 
CSS, and JavaScript, create an interactive simulation of an M/M/1 
queueing system. The simulation should include:

1. A visual representation of a "server" and a "queue"
2. Buttons to "Add Customer" and "Process Customer"
3. A display showing current customers in queue (Lq) and server status
4. Use the explanation from NotebookLM as the model logic

Generate a live, interactive preview.`}
                          </pre>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                          <h5 className="font-semibold text-purple-600 mb-2">Control System Visualization Prompt Example:</h5>
                          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mt-2">
{`Create an interactive HTML visualization for a simple negative 
feedback control system of a thermostat. The visualization should include:

1. A slider to set the "desired temperature" (setpoint)
2. A display showing the "current temperature"
3. A visual element representing the "heater"
4. A button to introduce a "disturbance"

Logic should turn on heater when current temp < desired temp.
Provide a live preview.`}
                          </pre>
                        </div>
                      </div>

                      {/* Section 2.3 English */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-green-700 mb-3">2.3 Socratic Tutoring: Deepening Understanding Through AI-Driven Dialogue</h4>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                          <h5 className="font-semibold text-green-600 mb-2">Dialogue Example:</h5>
                          <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                              <p className="text-sm text-gray-600 font-semibold mb-1">User Input:</p>
                              <p className="text-gray-800">&ldquo;Based on the text, my understanding is that the main benefit of Just-In-Time (JIT) production is reducing inventory costs. Is this correct?&rdquo;</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                              <p className="text-sm text-gray-600 font-semibold mb-1">SE-Socrates Response:</p>
                              <p className="text-gray-800">&ldquo;Your premise focuses on cost reduction, which is a significant benefit. However, what unstated assumptions are we making about supply chain stability for JIT to succeed? What happens to a JIT system during major disruptions?&rdquo;</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                          <p className="text-yellow-800">
                            <strong>💡 Key Value:</strong> Socratic dialogue forces learners to actively defend their understanding and consider edge cases and different perspectives. This is not only for clarifying doubts, it&rsquo;s also a powerful <em>synthesis</em> tool.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Part 3: Practice & Application */}
            <section id="part3" className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Target className="text-green-600" size={32} />
                  <h2 className="text-3xl font-bold text-gray-800">
                    {language !== 'en' && '第三部分：实践与应用'}
                    {language === 'both' && ' | '}
                    {language !== 'zh' && 'Part 3: Practice & Application'}
                  </h2>
                </div>
                <button
                  onClick={() => toggleSection('3')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Toggle section"
                >
                  {expandedSections.has('3') ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                </button>
              </div>

              {expandedSections.has('3') && (
                <div className="space-y-6">
                  {language !== 'en' && (
                    <div className="text-gray-700">
                      <p className="text-lg mb-4">
                        此阶段从理论理解过渡到实际应用，重点是解决问题、分析真实场景并获得有针对性的反馈。
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-orange-700 mb-3">3.1 应用问题解决</h4>
                          <p className="mb-3">使用自定义Gem生成与教材内容直接相关的、源源不断的练习题。</p>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-orange-600 mb-2">问题生成提示：</h5>
                            <p className="text-sm">使用我的教科书中关于线性规划的以下关键概念，生成三个练习题：初级、中级和高级问题。</p>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-teal-700 mb-3">3.2 使用Deep Research扩展视野</h4>
                          <p className="mb-3">寻找并分析能够展示所学理论应用的真实案例研究。</p>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-teal-600 mb-2">Deep Research提示：</h5>
                            <p className="text-sm">对约束理论在制造业供应链中的应用进行一次Deep Research报告。报告应至少确定三个真实案例。</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-indigo-700 mb-3">3.3 反思性实践循环</h4>
                        <p className="mb-3">创建一个结构化的流程，用于获取关于练习题尝试的详细、解释性反馈。</p>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="font-semibold text-indigo-600 mb-2">反馈请求提示：</h5>
                          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mt-2">
{`这是你给我的问题：[粘贴问题]
这是我的分步解决方案：[粘贴你的完整解决方案]

请分析我的工作。不要只告诉我最终答案是否正确。
相反，请评估我的方法论：
- 我是否正确地确定了决策变量？
- 约束条件是否构建得当？
- 我应用算法的过程是否正确？

请指出任何错误发生的具体步骤，并解释正确的推理。`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}

                  {language !== 'zh' && (
                    <div className={`${language === 'both' ? 'mt-8 pt-8 border-t-2 border-gray-200' : ''} text-gray-700`}>
                      <p className="text-lg mb-4">
                        This phase transitions from theoretical understanding to practical application, focusing on problem-solving, analyzing real scenarios, and receiving targeted feedback.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-orange-700 mb-3">3.1 Applied Problem Solving</h4>
                          <p className="mb-3">Use custom Gems to generate a continuous stream of practice problems directly related to textbook content.</p>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-orange-600 mb-2">Problem Generation Prompt:</h5>
                            <p className="text-sm">Using the following key concepts from my textbook on linear programming, generate three practice problems: beginner, intermediate, and advanced.</p>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-teal-700 mb-3">3.2 Expanding Horizons with Deep Research</h4>
                          <p className="mb-3">Find and analyze real case studies that demonstrate the application of learned theories.</p>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-teal-600 mb-2">Deep Research Prompt:</h5>
                            <p className="text-sm">Conduct a Deep Research report on the application of Theory of Constraints in manufacturing supply chains. Identify at least three real cases.</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl">
                        <h4 className="text-xl font-semibold text-indigo-700 mb-3">3.3 Reflective Practice Loop</h4>
                        <p className="mb-3">Create a structured process for receiving detailed, explanatory feedback on practice problem attempts.</p>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="font-semibold text-indigo-600 mb-2">Feedback Request Prompt:</h5>
                          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mt-2">
{`Here is the problem you gave me: [paste problem]
Here is my step-by-step solution: [paste your complete solution]

Please analyze my work. Don't just tell me if the final answer is correct.
Instead, evaluate my methodology:
- Did I correctly identify the decision variables?
- Are the constraints properly formulated?
- Is my algorithm application process correct?

Point out specific steps where errors occurred and explain the correct reasoning.`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Part 4: Exam Mastery */}
            <section id="part4" className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Award className="text-purple-600" size={32} />
                  <h2 className="text-3xl font-bold text-gray-800">
                    {language !== 'en' && '第四部分：考试与精通'}
                    {language === 'both' && ' | '}
                    {language !== 'zh' && 'Part 4: Exam & Mastery'}
                  </h2>
                </div>
                <button
                  onClick={() => toggleSection('4')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Toggle section"
                >
                  {expandedSections.has('4') ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                </button>
              </div>

              {expandedSections.has('4') && (
                <div className="space-y-6">
                  {language !== 'en' && (
                    <div className="text-gray-700">
                      <p className="text-lg mb-4">
                        这是最终阶段，专注于严格的自我评估和实施智能、自适应的学习系统以消除知识差距。
                      </p>

                      <div className="space-y-6">
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-purple-700 mb-3">4.1 章节级考试准备</h4>
                          <p className="mb-3">使用各种AI生成的评估工具，系统地按章节准备考试。</p>
                          <ul className="list-disc list-inside space-y-2 bg-white p-4 rounded-lg shadow-sm">
                            <li>在NotebookLM中使用内置的<strong>测验</strong>和<strong>抽认卡</strong>功能</li>
                            <li>将章节摘要复制到Gemini中生成多样化问题</li>
                            <li>创建包含4道选择题、3道判断题、2道简答题的练习测试</li>
                          </ul>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-blue-700 mb-3">4.2 模拟期末考试</h4>
                          <p className="mb-3">创建一个涵盖整个课程的逼真模拟期末考试。</p>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">期末考试生成提示：</h5>
                            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`你是一名大学系统工程期末考试的主考官。
使用以下来自整个课程的关键主题列表，
生成一份3小时的模拟期末考试。

考试权重：
- 30%运筹学
- 30%现代控制论
- 20%科学管理
- 20%综合题

请包含多种题型，并提供详细的答案解析。`}
                            </pre>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-green-700 mb-3">4.3 自适应学习循环</h4>
                          <p className="mb-3">创建一个闭环的、个性化的学习系统，根据模拟考试表现自动识别并解决特定的知识差距。</p>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-green-600 mb-2">自适应学习提示：</h5>
                            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`分析我的学习差距。我完成了一次模拟考试，
现向你提供我答错的题目列表。

对于每个错误答案，首先诊断错误的可能原因：
- "概念误解"
- "计算错误"
- "公式误用"

然后，根据诊断生成有针对性的学习模块：
- 如果是概念误解：详细解释核心概念，生成两个新的定性测试题
- 如果是计算错误：提供分步正确解题过程，生成两个相同类型的练习题

以下是我的错误：[列出所有错误项目]`}
                            </pre>
                          </div>

                          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                            <p className="text-yellow-800">
                              <strong>🔄 持续改进：</strong>完成新生成的目标模块。如果仍然有困难，你可以将新的错误答案再次输入循环中，创建一个持续改进的循环，直到掌握为止。
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {language !== 'zh' && (
                    <div className={`${language === 'both' ? 'mt-8 pt-8 border-t-2 border-gray-200' : ''} text-gray-700`}>
                      <p className="text-lg mb-4">
                        This is the final phase, focusing on rigorous self-assessment and implementing intelligent, adaptive learning systems to eliminate knowledge gaps.
                      </p>

                      <div className="space-y-6">
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-purple-700 mb-3">4.1 Chapter-Level Exam Preparation</h4>
                          <p className="mb-3">Use various AI-generated assessment tools to systematically prepare for exams by chapter.</p>
                          <ul className="list-disc list-inside space-y-2 bg-white p-4 rounded-lg shadow-sm">
                            <li>Use NotebookLM&rsquo;s built-in <strong>Quiz</strong> and <strong>Flashcard</strong> features</li>
                            <li>Copy chapter summaries to Gemini to generate diverse questions</li>
                            <li>Create practice tests with 4 multiple choice, 3 true/false, 2 short answer questions</li>
                          </ul>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-blue-700 mb-3">4.2 Simulated Final Exam</h4>
                          <p className="mb-3">Create a realistic simulated final exam covering the entire course.</p>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">Final Exam Generation Prompt:</h5>
                            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`You are the chief examiner for a university systems engineering 
final exam. Using the following list of key topics from the entire 
course, generate a 3-hour simulated final exam.

Exam weighting:
- 30% Operations Research
- 30% Modern Cybernetics
- 20% Scientific Management
- 20% Synthesis questions

Include multiple question types and provide detailed answer explanations.`}
                            </pre>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-green-700 mb-3">4.3 Adaptive Learning Loop</h4>
                          <p className="mb-3">Create a closed-loop, personalized learning system that automatically identifies and addresses specific knowledge gaps based on simulated exam performance.</p>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-green-600 mb-2">Adaptive Learning Prompt:</h5>
                            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`Analyze my learning gaps. I completed a simulated exam and 
now provide you with a list of questions I got wrong.

For each incorrect answer, first diagnose the possible cause:
- "Conceptual misunderstanding"
- "Calculation error"
- "Formula misapplication"

Then, generate a targeted learning module based on diagnosis:
- If conceptual: Explain core concept in detail, generate two qualitative test questions
- If calculation: Provide step-by-step correct solution, generate two similar practice problems

Here are my errors: [list all incorrect items]`}
                            </pre>
                          </div>

                          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                            <p className="text-yellow-800">
                              <strong>🔄 Continuous Improvement:</strong> Complete the newly generated targeted modules. If you still struggle, input new incorrect answers back into the loop, creating a cycle of continuous improvement until mastery is achieved.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Part 5: Theory to Practice */}
            <section id="part5" className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Rocket className="text-red-600" size={32} />
                  <h2 className="text-3xl font-bold text-gray-800">
                    {language !== 'en' && '第五部分：连接理论与实践'}
                    {language === 'both' && ' | '}
                    {language !== 'zh' && 'Part 5: Connecting Theory & Practice'}
                  </h2>
                </div>
                <button
                  onClick={() => toggleSection('5')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Toggle section"
                >
                  {expandedSections.has('5') ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                </button>
              </div>

              {expandedSections.has('5') && (
                <div className="space-y-6">
                  {language !== 'en' && (
                    <div className="text-gray-700">
                      <p className="text-lg mb-4">
                        最后一部分专注于将所学知识应用于复杂的现实世界问题，并掌握该行业的专业工具。
                      </p>

                      <div className="space-y-6">
                        <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-red-700 mb-3">5.1 使用Google AI Studio进行高级案例分析</h4>
                          <p className="mb-3">对于高度复杂、涉及多份文件的案例研究，使用AI Studio创建一个专用的专家聊天机器人进行精细分析。</p>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-red-600 mb-2">AI Studio系统指令提示：</h5>
                            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`你是一名专业的系统工程故障分析师。
你已获得关于[案例名称]的完整案卷。

你的任务是仅根据所提供的文件回答问题。
你将帮助我识别问题描述中的根本原因，
重点关注需求工程、系统集成、验证与确认
以及项目管理方面的失败。

引用证据时，请注明具体文件和页码。`}
                            </pre>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-blue-700 mb-3">5.2 AI辅助的软件掌握</h4>
                          <p className="mb-3">通过使用AI作为实时、互动的导师，加速学习必要的数学和工程软件。</p>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">Gemini Live口头提示示例：</h5>
                            <ul className="list-disc list-inside space-y-2">
                              <li>&ldquo;我正在尝试在MATLAB中为这个传递函数绘制波特图，但我遇到了一个错误。你能看到我屏幕上的语法有什么问题吗？&rdquo;</li>
                              <li>&ldquo;我这里有一个NumPy数组在我的Python代码里。我需要进行矩阵求逆。你能带我过一遍命令吗？&rdquo;</li>
                            </ul>
                          </div>

                          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                            <p className="text-green-800">
                              <strong>💻 学习加速：</strong>这种方法将AI从一个知识库转变为工程实践工作中的积极参与者。学习过程变得动态和情境化，与手头的任务直接相关。
                            </p>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-purple-700 mb-3">5.3 高管级问题解决：顶点项目</h4>
                          <p className="mb-3"><strong>挑战：</strong>&ldquo;为一家需要将货物从两个制造厂分销到十个区域配送中心的公司设计一个有弹性且成本效益高的物流网络。&rdquo;</p>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-purple-600 mb-2">集成AI工作流程：</h5>
                            <ol className="list-decimal list-inside space-y-3">
                              <li><strong>初步范围界定（Deep Research）：</strong>生成关于设计弹性物流网络的最佳实践综合报告</li>
                              <li><strong>知识整合（NotebookLM）：</strong>将Deep Research报告和教科书章节上传到新笔记本</li>
                              <li><strong>头脑风暴与建模（Gemini SE-Socrates）：</strong>挑战轴辐模型的假设，探讨替代模型</li>
                              <li><strong>交互式模拟（Gemini Canvas）：</strong>构建物流网络的交互式地图可视化</li>
                              <li><strong>最终报告生成（NotebookLM + Gemini）：</strong>生成结构化大纲并撰写专业报告</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {language !== 'zh' && (
                    <div className={`${language === 'both' ? 'mt-8 pt-8 border-t-2 border-gray-200' : ''} text-gray-700`}>
                      <p className="text-lg mb-4">
                        This final section focuses on applying learned knowledge to complex real-world problems and mastering professional tools in the field.
                      </p>

                      <div className="space-y-6">
                        <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-red-700 mb-3">5.1 Advanced Case Analysis Using Google AI Studio</h4>
                          <p className="mb-3">For highly complex case studies involving multiple documents, use AI Studio to create a dedicated expert chatbot for detailed analysis.</p>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-red-600 mb-2">AI Studio System Instructions Prompt:</h5>
                            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`You are a professional systems engineering failure analyst.
You have been provided with the complete file on [Case Name].

Your task is to answer questions based solely on the provided documents.
You will help me identify root causes in the problem description,
focusing on failures in requirements engineering, system integration,
verification & validation, and project management.

When citing evidence, specify the exact document and page number.`}
                            </pre>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-blue-700 mb-3">5.2 AI-Assisted Software Mastery</h4>
                          <p className="mb-3">Accelerate learning of essential mathematical and engineering software by using AI as a real-time, interactive tutor.</p>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-blue-600 mb-2">Gemini Live Verbal Prompt Examples:</h5>
                            <ul className="list-disc list-inside space-y-2">
                              <li>&ldquo;I&rsquo;m trying to plot a Bode diagram for this transfer function in MATLAB, but I&rsquo;m getting an error. Can you see what&rsquo;s wrong with my syntax on the screen?&rdquo;</li>
                              <li>&ldquo;I have this NumPy array in my Python code. I need to do matrix inversion. Can you walk me through the command?&rdquo;</li>
                            </ul>
                          </div>

                          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                            <p className="text-green-800">
                              <strong>💻 Learning Acceleration:</strong> This approach transforms AI from a knowledge repository into an active participant in engineering practice. The learning process becomes dynamic and contextualized, directly relevant to the task at hand.
                            </p>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                          <h4 className="text-xl font-semibold text-purple-700 mb-3">5.3 Executive-Level Problem Solving: Capstone Project</h4>
                          <p className="mb-3"><strong>Challenge:</strong> &ldquo;Design a resilient and cost-effective logistics network for a company that needs to distribute goods from two manufacturing plants to ten regional distribution centers.&rdquo;</p>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-semibold text-purple-600 mb-2">Integrated AI Workflow:</h5>
                            <ol className="list-decimal list-inside space-y-3">
                              <li><strong>Initial Scoping (Deep Research):</strong> Generate comprehensive report on best practices for designing resilient logistics networks</li>
                              <li><strong>Knowledge Integration (NotebookLM):</strong> Upload Deep Research report and textbook chapters to new notebook</li>
                              <li><strong>Brainstorming &amp; Modeling (Gemini SE-Socrates):</strong> Challenge hub-and-spoke model assumptions, explore alternatives</li>
                              <li><strong>Interactive Simulation (Gemini Canvas):</strong> Build interactive map visualization of logistics network</li>
                              <li><strong>Final Report Generation (NotebookLM + Gemini):</strong> Generate structured outline and write professional report</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Appendix */}
            <section id="appendix" className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BookOpen className="text-teal-600" size={32} />
                  <h2 className="text-3xl font-bold text-gray-800">
                    {language !== 'en' && '附录A：系统工程提示工程手册'}
                    {language === 'both' && ' | '}
                    {language !== 'zh' && 'Appendix A: System Engineering Prompt Engineering Handbook'}
                  </h2>
                </div>
                <button
                  onClick={() => toggleSection('appendix')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Toggle section"
                >
                  {expandedSections.has('appendix') ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                </button>
              </div>

              {expandedSections.has('appendix') && (
                <div className="space-y-6">
                  {language !== 'en' && (
                    <div className="text-gray-700">
                      <p className="text-lg mb-4">
                        下表提供了一个快速参考、可即时复制粘贴的高质量提示库，涵盖了学习计划中最常见的任务。
                      </p>

                      <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg shadow-sm">
                          <thead className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                            <tr>
                              <th className="px-4 py-3 text-left">任务/目标</th>
                              <th className="px-4 py-3 text-left">工具</th>
                              <th className="px-4 py-3 text-left">提示模板</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 text-sm">
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">创建自定义导师</td>
                              <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Gemini (Gem)</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">**角色：** 你是&ldquo;SE-Tutor&rdquo;，一位世界级的系统工程教授... **任务：** 使用费曼学习法解释概念... **背景：** 优先处理我提供的信息... **格式：** 使用结构化标题...</code>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">生成章节测验</td>
                              <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">NotebookLM</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">根据选定的资料源，生成一个10道题的选择题测验。为每个正确答案提供答案解析和简要解释，并注明来源。</code>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">创建交互式模拟</td>
                              <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Gemini (Canvas)</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">扮演数据可视化专家的角色。使用HTML、CSS和JavaScript，创建一个交互式模拟。该模拟必须包括：[交互元素列表]和[视觉输出列表]。使用以下解释作为模型的逻辑：[在此粘贴从NotebookLM获取的解释]。</code>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">创建游戏化活动</td>
                              <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Canva</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">为[学科]创建一个交互式的拖放配对游戏。主题应为[主题]。提供以下配对项：[配对列表]。当正确配对时，播放一个积极的音效。完成后，显示分数。</code>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">发起苏格拉底式对话</td>
                              <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Gemini (Gem)</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">我一直在学习[概念]。我目前的理解是[你的理解/前提]。请严格审视这个前提。揭示我隐藏的假设，并提出有力的反驳论点。</code>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">运行自适应学习循环</td>
                              <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Gemini</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">分析我的学习差距。我提供一份我答错的题目列表... 对于每一项，诊断错误的可能原因... 根据你的诊断，生成一个有针对性的学习模块...</code>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">请求软件帮助</td>
                              <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Gemini (Live)</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">（口头，带屏幕共享）&ldquo;我正在使用[软件名称]，试图实现[目标]。我在屏幕上遇到了这个错误信息。你能看到我的代码/设置中哪里出错了吗？&rdquo;</code>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {language !== 'zh' && (
                    <div className={`${language === 'both' ? 'mt-8 pt-8 border-t-2 border-gray-200' : ''} text-gray-700`}>
                      <p className="text-lg mb-4">
                        The table below provides a quick reference library of high-quality prompts that can be immediately copied and pasted, covering the most common tasks in the learning plan.
                      </p>

                      <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg shadow-sm">
                          <thead className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                            <tr>
                              <th className="px-4 py-3 text-left">Task/Goal</th>
                              <th className="px-4 py-3 text-left">Tool</th>
                              <th className="px-4 py-3 text-left">Prompt Template</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 text-sm">
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">Create Custom Tutor</td>
                              <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Gemini (Gem)</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">**Role:** You are &ldquo;SE-Tutor&rdquo;, a world-class systems engineering professor... **Tasks:** Explain concepts using Feynman technique... **Background:** Prioritize information I provide... **Format:** Use structured headings...</code>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">Generate Chapter Quiz</td>
                              <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">NotebookLM</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">Based on the selected sources, generate a 10-question multiple-choice quiz. Provide answer explanations and brief commentary for each correct answer, citing sources.</code>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">Create Interactive Simulation</td>
                              <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Gemini (Canvas)</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">Act as a data visualization expert. Using HTML, CSS, and JavaScript, create an interactive simulation. The simulation must include: [list of interactive elements] and [list of visual outputs]. Use the following explanation as the model logic: [paste explanation from NotebookLM here].</code>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium">Create Gamified Activity</td>
                              <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Canva</span></td>
                              <td className="px-4 py-3">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs block">Create an interactive drag-and-drop matching game for [subject]. Theme should be [theme]. Provide the following pairs: [list of pairs]. When correctly matched, play a positive sound effect. Upon completion, display score.</code>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
<td className="px-4 py-3 font-medium">Initiate Socratic Dialogue</td>
<td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Gemini (Gem)</span></td>
<td className="px-4 py-3">
<code className="bg-gray-100 px-2 py-1 rounded text-xs block">I’ve been studying [concept]. My current understanding is [your understanding/premise]. Please rigorously examine this premise. Reveal my hidden assumptions and present strong counterarguments.</code>
</td>
</tr>
<tr className="hover:bg-gray-50 transition-colors">
<td className="px-4 py-3 font-medium">Run Adaptive Learning Loop</td>
<td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Gemini</span></td>
<td className="px-4 py-3">
<code className="bg-gray-100 px-2 py-1 rounded text-xs block">Analyze my learning gaps. I provide a list of questions I got wrong... For each item, diagnose the possible cause... Based on your diagnosis, generate a targeted learning module...</code>
</td>
</tr>
<tr className="hover:bg-gray-50 transition-colors">
<td className="px-4 py-3 font-medium">Request Software Help</td>
<td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Gemini (Live)</span></td>
<td className="px-4 py-3">
<code className="bg-gray-100 px-2 py-1 rounded text-xs block">(Verbal, with screen sharing) “I’m using [software name] trying to achieve [goal]. I’m encountering this error message on my screen. Can you see what’s wrong with my code/setup?”</code>
</td>
</tr>
</tbody>
</table>
</div>
</div>
)}
</div>
)}
</section>
{/* Conclusion & Call to Action */}
     {/* Conclusion & Call to Action */}
<section className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
  <div className="text-center">
    <h2 className="text-3xl font-bold mb-4">
      {language !== 'en' && '开始您的AI增强学习之旅'}
      {language === 'both' && ' | '}
      {language !== 'zh' && 'Begin Your AI-Enhanced Learning Journey'}
    </h2>
    <p className="text-lg mb-6 text-indigo-100">
      {language !== 'en' && '将这些工具和策略付诸实践，转变您的系统工程学习体验。'}
      {language === 'both' && ' '}
      {language !== 'zh' && 'Put these tools and strategies into practice to transform your systems engineering learning experience.'}
    </p>

    {/* ✅ 修复后结构：先 div，再三个完整的链接按钮 */}
    <div className="flex flex-wrap justify-center gap-4">
      <a
        href="https://notebooklm.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg"
      >
        {language !== 'en' ? '访问 NotebookLM' : ''}
        {language === 'both' ? ' | ' : ''}
        {language !== 'zh' ? 'Visit NotebookLM' : ''}
      </a>

      <a
        href="https://gemini.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all shadow-md hover:shadow-lg"
      >
        {language !== 'en' ? '访问 Gemini' : ''}
        {language === 'both' ? ' | ' : ''}
        {language !== 'zh' ? 'Visit Gemini' : ''}
      </a>

      <a
        href="https://aistudio.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-all shadow-md hover:shadow-lg"
      >
        {language !== 'en' ? '访问 AI Studio' : ''}
        {language === 'both' ? ' | ' : ''}
        {language !== 'zh' ? 'Visit AI Studio' : ''}
      </a>
    </div>
  </div>
</section>
   

        {/* Key Takeaways */}
        <section className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-3xl mr-3">💡</span>
            {language !== 'en' && '关键要点'}
            {language === 'both' && ' | '}
            {language !== 'zh' && 'Key Takeaways'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {language !== 'en' && (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">🎯 战略性工具使用</h4>
                  <p className="text-gray-700 text-sm">NotebookLM用于有根据的知识，Gemini用于创造性探索，Canvas用于可视化，AI Studio用于复杂案例分析。</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">🔄 闭环学习</h4>
                  <p className="text-gray-700 text-sm">通过自适应学习循环，AI识别弱点并生成针对性内容，实现持续改进直至精通。</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">💬 苏格拉底式方法</h4>
                  <p className="text-gray-700 text-sm">通过挑战假设和探究性对话，深化理解而非被动接收信息。</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800 mb-2">🎨 多模态学习</h4>
                  <p className="text-gray-700 text-sm">结合音频概览、交互式模拟、游戏化活动和实时编码辅导，适应不同学习风格。</p>
                </div>
              </div>
            )}
            {language !== 'zh' && (
              <div className={`space-y-4 ${language === 'both' ? '' : ''}`}>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">🎯 Strategic Tool Usage</h4>
                  <p className="text-gray-700 text-sm">NotebookLM for grounded knowledge, Gemini for creative exploration, Canvas for visualization, AI Studio for complex case analysis.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">🔄 Closed-Loop Learning</h4>
                  <p className="text-gray-700 text-sm">Through adaptive learning loops, AI identifies weaknesses and generates targeted content, achieving continuous improvement until mastery.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">💬 Socratic Method</h4>
                  <p className="text-gray-700 text-sm">Deepen understanding through challenging assumptions and exploratory dialogue rather than passive information reception.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800 mb-2">🎨 Multimodal Learning</h4>
                  <p className="text-gray-700 text-sm">Combine audio overviews, interactive simulations, gamified activities, and real-time coding tutorials to adapt to different learning styles.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  </div>

  {/* Footer */}
  <footer className="bg-gray-800 text-white py-8 mt-16">
    <div className="container mx-auto px-4 text-center">
      <p className="mb-2">
        {language !== 'en' && '© 2025 AI赋能系统工程学习路线图'}
        {language === 'both' && ' | '}
        {language !== 'zh' && '© 2025 AI-Enhanced System Engineering Learning Roadmap'}
      </p>
      <p className="text-gray-400 text-sm">
        {language !== 'en' && '基于谷歌AI生态系统：NotebookLM、Gemini、Canvas、AI Studio'}
        {language === 'both' && ' | '}
        {language !== 'zh' && 'Powered by Google AI Ecosystem: NotebookLM, Gemini, Canvas, AI Studio'}
      </p>
      <div className="mt-4 flex justify-center space-x-4">
        <a href="https://docs.google.com/document" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          {language !== 'en' ? '文档' : ''}
          {language === 'both' ? ' | ' : ''}
          {language !== 'zh' ? 'Documentation' : ''}
        </a>
        <span className="text-gray-600">•</span>
        <a href="https://support.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          {language !== 'en' ? '支持' : ''}
          {language === 'both' ? ' | ' : ''}
          {language !== 'zh' ? 'Support' : ''}
        </a>
        <span className="text-gray-600">•</span>
        <a href="https://ai.google" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          {language !== 'en' ? '了解更多' : ''}
          {language === 'both' ? ' | ' : ''}
          {language !== 'zh' ? 'Learn More' : ''}
        </a>
      </div>
    </div>
  </footer>

  {/* Scroll to Top Button */}
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-110"
    aria-label="Scroll to top"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</div>
);
}