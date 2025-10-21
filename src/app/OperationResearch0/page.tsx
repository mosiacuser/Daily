"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen, Calculator, Users, TrendingUp, Target, GitBranch } from 'lucide-react'

interface SectionProps {
  title: string
  titleEn: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const CollapsibleSection: React.FC<SectionProps> = ({ title, titleEn, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-6 border border-blue-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 flex justify-between items-center hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
        aria-expanded={isOpen}
        aria-label={`Toggle ${title} section`}
      >
        <div className="flex flex-col items-start">
          <span className="text-xl font-bold">{title}</span>
          <span className="text-sm opacity-90 mt-1">{titleEn}</span>
        </div>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isOpen && (
        <div className="p-6 bg-white animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  )
}

const OperationsResearchTutorial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('intro')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">
              运筹学教程 | Operations Research Tutorial
            </h1>
            <div className="flex gap-2 flex-wrap justify-center">
              {[
                { id: 'intro', label: '简介 | Intro', icon: BookOpen },
                { id: 'methods', label: '方法 | Methods', icon: Calculator },
                { id: 'branches', label: '分支 | Branches', icon: GitBranch },
                { id: 'applications', label: '应用 | Applications', icon: TrendingUp }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 font-semibold shadow-lg'
                      : 'bg-blue-500 hover:bg-blue-400'
                  }`}
                  aria-label={`Navigate to ${tab.label}`}
                >
                  <tab.icon size={18} />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction Section */}
        {activeTab === 'intro' && (
          <section className="space-y-6" role="region" aria-label="Introduction Section">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
              <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center gap-3">
                <BookOpen size={32} />
                <span>第一节 运筹学释义与发展简史</span>
              </h2>
              <h3 className="text-xl text-gray-600 mb-6">
                Section 1: Definition and Brief History of Operations Research
              </h3>

              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                  <h4 className="text-2xl font-semibold text-blue-800 mb-4">
                    运筹学定义 | Definitions
                  </h4>
                  
                  <div className="space-y-4 text-gray-700">
                    <p className="leading-relaxed">
                      <strong className="text-blue-600">《大英百科全书》(Encyclopedia Britannica)：</strong>
                      &ldquo;运筹学是一门应用于管理有组织系统的科学&rdquo;，&ldquo;运筹学为掌管这类系统的人提供决策目标和数量分析的工具&rdquo;。
                    </p>
                    <p className="leading-relaxed italic text-gray-600">
                      Operations Research is a science applied to managing organized systems, providing tools for decision objectives and quantitative analysis.
                    </p>

                    <p className="leading-relaxed">
                      <strong className="text-indigo-600">《中国大百科全书》(Encyclopedia of China)：</strong>
                      运筹学，是用数学方法研究经济、民政和国防等部门在内外环境的约束条件下合理分配人力、物力、财力等资源，使实际系统有效运行的技术科学，已可以用来预测发展趋势，制订行动规划或优选可行方案。
                    </p>
                    <p className="leading-relaxed italic text-gray-600">
                      Operations Research uses mathematical methods to study the rational allocation of human, material, and financial resources in economic, civil, and defense departments under internal and external environmental constraints.
                    </p>

                    <p className="leading-relaxed">
                      <strong className="text-purple-600">《中国企业管理百科全书》(Encyclopedia of Chinese Enterprise Management)：</strong>
                      运筹学&ldquo;应用分析、试验、量化的方法，对经济管理系统中人、财、物等有限资源进行统筹安排，为决策者提供有依据的最优方案，以实现最有效的管理&rdquo;。
                    </p>
                    <p className="leading-relaxed italic text-gray-600">
                      Operations Research applies analytical, experimental, and quantitative methods to coordinate limited resources in economic management systems, providing evidence-based optimal solutions for decision-makers.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
                  <h4 className="text-xl font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                    <Target size={24} />
                    <span>术语由来 | Etymology</span>
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    运筹学一词在英国称为 <code className="bg-gray-200 px-2 py-1 rounded text-sm">operational research</code>，在美国称为 <code className="bg-gray-200 px-2 py-1 rounded text-sm">operations research</code> (缩写为 O.R.)，可直译为&ldquo;运用研究&rdquo;或&ldquo;作业研究&rdquo;。
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>1957年我国</strong>从&ldquo;夫运筹帷幄之中，决胜千里之外&rdquo;（见《史记·高祖本纪》）这句古语中摘取&ldquo;运筹&rdquo;二字，将 O.R. 正式译作<strong className="text-blue-600">运筹学</strong>，包含运用筹划，以策略取胜等意义。
                  </p>
                  <p className="text-gray-600 italic">
                    In 1957, China officially translated O.R. as &ldquo;运筹学&rdquo; (Yùnchóuxué), derived from the ancient phrase &ldquo;strategizing within the command tent to achieve victory a thousand miles away&rdquo; from the Records of the Grand Historian.
                  </p>
                </div>
              </div>
            </div>

            <CollapsibleSection 
              title="历史起源 | Historical Origins" 
              titleEn="Ancient Examples and Modern Development"
              defaultOpen={true}
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <h5 className="text-lg font-bold text-green-700 mb-3">
                      🐎 齐王与田忌赛马 | Tian Ji&rsquo;s Horse Racing
                    </h5>
                    <p className="text-gray-700 leading-relaxed">
                      齐王与田忌赛马，规定双方各出上、中、下三个等级的马各一匹。田忌采取的策略是以下马对齐王的上马，以上马对齐王的中马，以中马对齐王的下马，结果田忌反以二比一获胜。
                    </p>
                    <p className="text-gray-600 text-sm mt-2 italic">
                      Ancient Chinese example of strategic optimization: Tian Ji won 2-1 by strategically matching his horses against the King&rsquo;s horses in a non-obvious order.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                    <h5 className="text-lg font-bold text-purple-700 mb-3">
                      🏗️ 丁渭修复皇宫 | Ding Wei&rsquo;s Palace Restoration
                    </h5>
                    <p className="text-gray-700 leading-relaxed">
                      北宋时代，皇宫因火焚毁，由丁渭主持修复工作。他计划在宫前大街取土烧砖，挖成大沟后灌水成渠，利用水渠运来各种建筑用材料，工程完毕后再以废砖烂瓦等填沟修复大街。
                    </p>
                    <p className="text-gray-600 text-sm mt-2 italic">
                      Song Dynasty example of project optimization: Used excavated earth for bricks, the resulting channel for transporting materials, then filled it with construction waste.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h5 className="text-xl font-bold text-blue-700 mb-4">
                    📅 1938年 - 运筹学正式诞生 | Formal Birth of OR
                  </h5>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>1938年7月</strong>，英国波德塞 (Bawdsey) 雷达站的负责人罗伊 (A. P. Rowe) 提出立即进行整个防空作战系统运行的研究，并用 <code className="bg-white px-2 py-1 rounded">&ldquo;operational research&rdquo;</code> 一词作为这方面研究的描述，这就是 O.R. (运筹学) 这个术语的起源。
                  </p>
                  <p className="text-gray-600 italic mb-3">
                    In July 1938, A. P. Rowe at Britain&rsquo;s Bawdsey radar station proposed research into the entire air defense system operations, coining the term &ldquo;operational research&rdquo; &mdash; marking the birth of OR.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>1940年9月</strong>英国成立了由物理学家布莱克特 (P. M. S. Blackett) 领导的第一个运筹学小组。<strong>1942年</strong>美国和加拿大也都相继成立运筹学小组。
                  </p>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection 
              title="发展阶段 | Development Stages" 
              titleEn="Three Major Phases"
            >
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-lg">
                  <h5 className="text-xl font-bold text-green-700 mb-3">
                    📚 (1) 1945 - 1950年代初：创建阶段 | Establishment Phase
                  </h5>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>1948年成立&ldquo;运筹学俱乐部&rdquo;，在煤炭、电力等部门推广应用</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>1950年《运筹学季刊》(O.R. Quarterly) 创刊</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>1952年美国运筹学会成立，出版《运筹学学报》(Journal of ORSA)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>1947年丹齐克 (G. B. Dantzig)</strong> 提出线性规划及单纯形法</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
                  <h5 className="text-xl font-bold text-blue-700 mb-3">
                    🚀 (2) 1950年代初 - 1950年代末：成长阶段 | Growth Phase
                  </h5>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>电子计算机技术迅速发展，使单纯形法、动态规划等方法得以实际应用</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>1950年代末美国约半数大公司应用运筹学于生产计划、物资储备等</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>1956-1959年10个国家成立运筹学学会，6种刊物问世</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>1957年牛津大学召开第一次国际运筹学会议</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>1959年成立国际运筹学联合会 (IFORS)</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-lg">
                  <h5 className="text-xl font-bold text-purple-700 mb-3">
                    🌍 (3) 1960年代以来：普及与快速发展阶段 | Popularization Phase
                  </h5>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>运筹学细分为各个分支，专业学术团体迅速增多</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>更多期刊创办，运筹学书籍大量出版</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>更多学校将运筹学纳入教学计划</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>第三代电子计算机出现，研究大型复杂系统（城市交通、环境污染、国民经济计划等）</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <h5 className="text-xl font-bold text-red-700 mb-3">
                    🇨🇳 中国运筹学发展 | OR Development in China
                  </h5>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>1956年</strong> 中国科学院力学研究所成立第一个运筹学小组</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>1958年</strong> 建立运筹学研究室</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>1960年</strong> 山东济南召开全国应用运筹学经验交流会议</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>1980年4月</strong> 成立中国运筹学学会</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleSection>
          </section>
        )}

        {/* Methods Section */}
        {activeTab === 'methods' && (
          <section className="space-y-6" role="region" aria-label="Methods Section">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-indigo-500">
              <h2 className="text-3xl font-bold text-indigo-700 mb-4 flex items-center gap-3">
                <Calculator size={32} />
                <span>第二节 运筹学研究的基本特征与基本方法</span>
              </h2>
              <h3 className="text-xl text-gray-600 mb-6">
                Section 2: Basic Characteristics and Methods of OR Research
              </h3>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-6">
                <h4 className="text-2xl font-semibold text-indigo-800 mb-4">
                  三大基本特征 | Three Key Characteristics
                </h4>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-lg shadow-md border-t-4 border-blue-500">
                    <h5 className="text-lg font-bold text-blue-700 mb-2">
                      🎯 1. 系统的整体观念
                    </h5>
                    <p className="text-gray-600 text-sm">
                      System-Wide Perspective
                    </p>
                    <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                      从系统整体利益出发，寻找优化协调的方案，而不是孤立评价各子系统的决策行为。
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg shadow-md border-t-4 border-green-500">
                    <h5 className="text-lg font-bold text-green-700 mb-2">
                      👥 2. 多学科的综合
                    </h5>
                    <p className="text-gray-600 text-sm">
                      Multidisciplinary Integration
                    </p>
                    <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                      吸收来自不同领域、具有不同经验和技能的专家，增强集体智慧和问题解决能力。
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg shadow-md border-t-4 border-purple-500">
                    <h5 className="text-lg font-bold text-purple-700 mb-2">
                      📊 3. 模型方法的应用
                    </h5>
                    <p className="text-gray-600 text-sm">
                      Model-Based Approach
                    </p>
                    <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                      建立问题的数学模型或模拟模型，这是运筹学方法的精髓。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CollapsibleSection 
              title="研究步骤 | Research Process" 
              titleEn="Six-Step Methodology"
              defaultOpen={true}
            >
              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: "分析表述问题及收集数据",
                    titleEn: "Problem Analysis and Data Collection",
                    desc: "确定决策目标，辨识关键因素，明确资源和环境限制，收集相关数据。",
                    color: "blue"
                  },
                  {
                    num: 2,
                    title: "建立模型",
                    titleEn: "Model Construction",
                    desc: "表达问题中可控决策变量、不可控变量、工艺技术条件及目标有效度量之间的相互关系。尽可能选择建立数学模型。",
                    color: "green"
                  },
                  {
                    num: 3,
                    title: "求解模型和优化方案",
                    titleEn: "Model Solution and Optimization",
                    desc: "用数学方法或其他工具对模型求解，根据问题要求求出最优解、次优解或满意解。",
                    color: "purple"
                  },
                  {
                    num: 4,
                    title: "测试模型及修正",
                    titleEn: "Model Testing and Refinement",
                    desc: "将实际问题的数据代入模型，检验得到的解是否正确，必要时对模型进行修正。",
                    color: "yellow"
                  },
                  {
                    num: 5,
                    title: "建立对解的有效控制",
                    titleEn: "Solution Control Establishment",
                    desc: "根据灵敏度分析，确定最优解保持稳定时的参数变化范围。",
                    color: "red"
                  },
                  {
                    num: 6,
                    title: "方案的实施",
                    titleEn: "Solution Implementation",
                    desc: "明确方案由谁实施，什么时间实施，如何实施，估计实施过程可能遇到的阻力并制定相应措施。",
                    color: "indigo"
                  }
                ].map((step) => (
                  <div 
                    key={step.num}
                    className={`border-l-4 border-${step.color}-500 bg-${step.color}-50 p-5 rounded-r-lg hover:shadow-lg transition-shadow duration-300`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-${step.color}-500 text-white flex items-center justify-center font-bold text-lg`}>
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <h5 className={`text-lg font-bold text-${step.color}-700 mb-1`}>
                          {step.title}
                        </h5>
                        <p className="text-gray-600 text-sm italic mb-2">
                          {step.titleEn}
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-orange-700">注意：</strong>
                  上述步骤往往需要交叉反复进行。除对系统进行定性分析和收集必要的资料外，一项主要工作是努力建立一个用以描述现实世界复杂问题的数学模型。
                </p>
              </div>
            </CollapsibleSection>
          </section>
        )}

        {/* Branches Section */}
        {activeTab === 'branches' && (
          <section className="space-y-6" role="region" aria-label="Branches Section">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
              <h2 className="text-3xl font-bold text-green-700 mb-4 flex items-center gap-3">
                <GitBranch size={32} />
                <span>第三节 运筹学主要分支简介</span>
              </h2>
              <h3 className="text-xl text-gray-600 mb-6">
                Section 3: Major Branches of Operations Research
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "线性规划",
                    titleEn: "Linear Programming",
                    icon: "📐",
                    desc: "目标函数和约束条件均为线性时的规划模型。线性规划建模相对简单，有通用算法和计算机软件，是运筹学中应用最为广泛的一个分支。",
                    color: "blue"
                  },
                  {
                    title: "非线性规划",
                    titleEn: "Nonlinear Programming",
                    icon: "📈",
                    desc: "目标函数或约束条件不全是线性的规划模型。由于大多数工程物理量的表达式是非线性的，因此在各类工程的优化设计中得到较多应用。",
                    color: "green"
                  },
                  {
                    title: "整数规划",
                    titleEn: "Integer Programming",
                    icon: "🔢",
                    desc: "变量的取值必须为整数的规划模型。包括0-1整数规划，对应方案的&lsquo;舍&rsquo;或&lsquo;取&rsquo;，对问题的建模起到特殊作用。",
                    color: "purple"
                  },
                  {
                    title: "目标规划",
                    titleEn: "Goal Programming",
                    icon: "🎯",
                    desc: "对多个目标进行优化，这些目标间既在优化方向上存在矛盾，又缺乏公度性，无法综合成统一目标。",
                    color: "yellow"
                  },
                  {
                    title: "动态规划",
                    titleEn: "Dynamic Programming",
                    icon: "⏩",
                    desc: "研究多阶段决策过程最优化的运筹学分支。从系统总体出发，要求各阶段决策所构成的决策序列使目标函数值达到最优。",
                    color: "red"
                  },
                  {
                    title: "图论与网络分析",
                    titleEn: "Graph Theory & Network Analysis",
                    icon: "🕸️",
                    desc: "研究由节点和边所组成图形的数学理论和方法。根据具体网络对象，赋予图中各边某个具体的参数进行优化分析。",
                    color: "indigo"
                  },
                  {
                    title: "存储论",
                    titleEn: "Inventory Theory",
                    icon: "📦",
                    desc: "研究最优存储策略的理论和方法。确定在什么时间点及一次提出多大批量的订货，使订购、储存和短缺费用总和为最少。",
                    color: "pink"
                  },
                  {
                    title: "排队论",
                    titleEn: "Queueing Theory",
                    icon: "⏳",
                    desc: "研究顾客不同输入、各类服务时间分布、不同服务员数及排队规则情况下，排队系统的工作性能和状态。",
                    color: "teal"
                  },
                  {
                    title: "对策论",
                    titleEn: "Game Theory",
                    icon: "♟️",
                    desc: "研究具有对抗局势的模型。为局中人在高度不确定和充满竞争的环境中，提供一套完整的、定量化和程序化的选择策略的理论与方法。",
                    color: "orange"
                  },
                  {
                    title: "决策论",
                    titleEn: "Decision Theory",
                    icon: "🤔",
                    desc: "对整个决策过程中涉及方案目标选取、度量、概率值确定、效用值计算，一直到最优方案和策略选取的有关科学理论。",
                    color: "cyan"
                  }
                ].map((branch, index) => (
                  <div 
                    key={index}
                    className={`bg-gradient-to-br from-${branch.color}-50 to-${branch.color}-100 p-6 rounded-lg border border-${branch.color}-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{branch.icon}</span>
                      <div>
                        <h4 className={`text-xl font-bold text-${branch.color}-700`}>
                          {branch.title}
                        </h4>
                        <p className="text-sm text-gray-600 italic">
                          {branch.titleEn}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {branch.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Users size={28} />
                <span>国际著名运筹学刊物 | Major International OR Journals</span>
              </h4>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "Management Science",
                  "Operations Research",
                  "Interfaces",
                  "Journal of Operational Research Society",
                  "European Journal of Operations Research"
                ].map((journal, i) => (
                  <li key={i} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                    <span className="text-blue-600 font-bold">📚</span>
                    <span className="text-gray-700 font-medium">{journal}</span>
                  </li>
                ))}
              </ul>

              <h5 className="text-xl font-semibold text-indigo-700 mt-6 mb-3">
                国内主要刊物 | Major Chinese Journals
              </h5>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "《运筹学学报》",
                  "《运筹与管理》",
                  "《系统工程学报》",
                  "《系统工程理论与实践》",
                  "《系统管理学报》",
                  "《中国管理科学》"
                ].map((journal, i) => (
                  <li key={i} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                    <span className="text-indigo-600 font-bold">📖</span>
                    <span className="text-gray-700">{journal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Applications Section */}
        {activeTab === 'applications' && (
          <section className="space-y-6" role="region" aria-label="Applications Section">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500">
              <h2 className="text-3xl font-bold text-purple-700 mb-4 flex items-center gap-3">
                <TrendingUp size={32} />
                <span>第四节 运筹学与管理科学</span>
              </h2>
              <h3 className="text-xl text-gray-600 mb-6">
                Section 4: Operations Research and Management Science
              </h3>

              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    一般认为运筹学诞生的3个来源是<strong className="text-purple-700">军事、管理和经济</strong>，但其中<strong className="text-pink-700">管理是运筹学孕育的主要土壤</strong>。基于军事和经济研究中产生的运筹学方法或分支最终都移植到管理中应用和发展。
                  </p>
                  <p className="text-gray-600 italic">
                    Operations Research originated from three sources: military, management, and economics, with <strong>management being the primary foundation</strong> for its development.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                  <h4 className="text-xl font-semibold text-blue-800 mb-4">
                    运筹学对管理的贡献 | OR&rsquo;s Contributions to Management
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">✓</span>
                      <div>
                        <strong className="text-blue-700">训练逻辑思维能力：</strong>
                        <span className="text-gray-700">通过6个研究步骤锻炼观察问题、归纳问题的能力，辨别可控因素和非可控因素。</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">✓</span>
                      <div>
                        <strong className="text-blue-700">培养直觉洞察力：</strong>
                        <span className="text-gray-700">应用运筹学求解分析将有助于培养对问题的直觉洞察和全局分析能力。</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl">✓</span>
                      <div>
                        <strong className="text-blue-700">提供科学决策依据：</strong>
                        <span className="text-gray-700">建立模型是运筹学方法的精髓，为制定决策提供科学依据。</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <CollapsibleSection 
              title="成功应用案例 | Success Stories" 
              titleEn="Real-World Applications and Benefits"
              defaultOpen={true}
            >
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg mb-6">
                <h4 className="text-2xl font-semibold text-orange-800 mb-4 flex items-center gap-2">
                  🏆 Franz Edelman奖获奖案例精选
                </h4>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  由国际运筹学联合会和美国运筹学学会联合主办的<em>Interfaces</em>杂志每年评选6篇最优秀的运筹学应用成果。以下是部分获奖成果的概况及效益：
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      <th className="p-4 text-left font-semibold">组织 | Organization</th>
                      <th className="p-4 text-left font-semibold">成果概况 | Achievement</th>
                      <th className="p-4 text-left font-semibold">发表年份 | Year</th>
                      <th className="p-4 text-left font-semibold">效益 | Benefits (亿美元/年)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { org: "联合航空公司", achievement: "机场和后备部门职员的工作计划安排", year: "1986", benefit: "0.06" },
                      { org: "Citgo石油公司", achievement: "炼油过程及产品供应、分配、销售的整体优化", year: "1987", benefit: "0.7" },
                      { org: "旧金山警署", achievement: "应用计算机系统实现巡警值班与调度的优化", year: "1989", benefit: "0.11" },
                      { org: "美国电报电话公司", achievement: "商用客户营业中心的优化选址", year: "1990", benefit: "4.06" },
                      { org: "IBM公司", achievement: "备件库存的全国网络的整合用以改进服务支持", year: "1990", benefit: "0.02 及降低库存2.5" },
                      { org: "美洲航空公司", achievement: "设计票价结构、订票和协调航班的系统用来增加收入", year: "1992", benefit: "5.0 及更多收入" },
                      { org: "中国", achievement: "满足国家未来能源需求的发电、交通、采煤等大型项目的优选及投产安排", year: "1995", benefit: "4.25" },
                      { org: "数字设备公司", achievement: "供应商、工厂、分销中心、潜在厂址和市场区域的全球供应链重构", year: "1995", benefit: "8.0" },
                      { org: "联邦快递", achievement: "物流计划与运送投递", year: "1997", benefit: "未估算" },
                      { org: "新西兰航空公司", achievement: "航空公司机组的安排", year: "2001", benefit: "0.067" },
                      { org: "美林证券", achievement: "设计基于资产和在线的定价方案提供金融服务", year: "2002", benefit: "大于0.8" },
                      { org: "大陆航空公司", achievement: "飞行计划受干扰时重新优化分配机组人员", year: "2003", benefit: "0.9" },
                      { org: "通用汽车", achievement: "提高生产线效率", year: "2006", benefit: "0.9" },
                      { org: "挪威公司", achievement: "通过沿海管道的改造极大化天然气的输送能力", year: "2009", benefit: "1.4" },
                      { org: "MISO (美国中西部独立电网运营机构)", achievement: "美国13个州电力输送的管理", year: "2012", benefit: "7.0" }
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="p-4 border-b border-gray-200 font-medium text-gray-800">{row.org}</td>
                        <td className="p-4 border-b border-gray-200 text-gray-700 text-sm">{row.achievement}</td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-700">{row.year}</td>
                        <td className="p-4 border-b border-gray-200 text-right font-semibold text-green-700">{row.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-green-700">注：</strong>
                  运筹学的研究应用已经给企业和国民经济各部门带来了巨大的财富节约。表中数据仅为部分案例，更多详细信息可查阅<em>Interfaces</em>杂志历年首期（1-2月号）。
                </p>
              </div>
            </CollapsibleSection>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg border border-indigo-200">
              <h4 className="text-2xl font-semibold text-indigo-800 mb-4">
                第五节 运筹学应用软件简介
              </h4>
              <h5 className="text-lg text-gray-600 mb-6">
                Section 5: Introduction to OR Software Tools
              </h5>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "LINDO", desc: "线性、整数和二次规划", color: "blue" },
                  { name: "LINGO", desc: "非线性和全局优化", color: "green" },
                  { name: "WinQSB", desc: "综合运筹学软件包", color: "purple" },
                  { name: "MATLAB", desc: "数值计算和可视化", color: "red" }
                ].map((software, i) => (
                  <div 
                    key={i}
                    className={`bg-gradient-to-br from-${software.color}-100 to-${software.color}-200 p-5 rounded-lg border-2 border-${software.color}-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <h6 className={`text-xl font-bold text-${software.color}-800 mb-2`}>
                      💻 {software.name}
                    </h6>
                    <p className="text-gray-700 text-sm">
                      {software.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-300 p-5 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-yellow-800">📌 重要提示：</strong>
                  即使是一个只含几十个到上百个变量的线性规划模型，通过手工求解十分繁杂甚至不可能。而实际问题的数学模型要远远复杂得多，变量个数甚至多达几十万个、上百万个，因此<strong>必须借助计算机软件进行求解</strong>。
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Quote Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 p-8 rounded-xl shadow-2xl border-2 border-purple-300">
          <blockquote className="text-center">
            <p className="text-2xl md:text-3xl font-serif text-gray-800 italic mb-4">
              &ldquo;一门科学只有成功地应用数学时，才算达到了完善的地步。&rdquo;
            </p>
            <footer className="text-lg text-gray-600">
              &mdash; 马克思 (Karl Marx)
            </footer>
            <p className="text-md text-gray-500 italic mt-2">
              &ldquo;A science is only perfected when it successfully applies mathematics.&rdquo;
            </p>
          </blockquote>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">
            运筹学教程（第5版） | Operations Research Tutorial (5th Edition)
          </p>
          <p className="text-sm text-gray-400">
            A comprehensive guide to the foundations and applications of Operations Research
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">参考资料 | References</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-400 transition-colors">更多资源 | More Resources</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-400 transition-colors">联系我们 | Contact</a>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5568d3 0%, #653a8a 100%);
        }

        /* Math rendering improvements */
        .MathJax {
          font-size: 1.1em !important;
          color: #1e3a8a !important;
        }

        /* Responsive table */
        @media (max-width: 768px) {
          table {
            font-size: 0.875rem;
          }
          th, td {
            padding: 0.5rem !important;
          }
        }
      `}</style>

      {/* MathJax Library for LaTeX rendering */}
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
        async
      ></script>
    </div>
  )
}

export default OperationsResearchTutorial