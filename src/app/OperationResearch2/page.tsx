"use client"

import { useEffect, useState } from 'react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })

interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const CollapsibleSection: React.FC<SectionProps> = ({ id, title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <section id={id} className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-left flex justify-between items-center hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
      >
        <span className="text-xl">{title}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={`${id}-content`}
        className={`transition-all duration-300 ${isOpen ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="p-6">{children}</div>
      </div>
    </section>
  )
}

export default function DualityTheoryAndSensitivityAnalysis() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [mathJaxLoaded, setMathJaxLoaded] = useState(false)

  useEffect(() => {
    // Load MathJax
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js'
    script.async = true
    script.onload = () => {
      setMathJaxLoaded(true)
      if (window.MathJax) {
        window.MathJax.typesetPromise?.()
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (mathJaxLoaded && window.MathJax) {
      window.MathJax.typesetPromise?.()
    }
  }, [mathJaxLoaded])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      let current = ''
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id') || ''
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className={`${roboto.className} min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              第二章 线性规划的对偶理论与灵敏度分析
            </h1>
            <button
              onClick={() => scrollToSection('top')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="返回顶部"
            >
              ↑ 顶部
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { id: 'section1', label: '第一节 对偶问题' },
              { id: 'section2', label: '第二节 基本性质' },
              { id: 'section3', label: '第三节 影子价格' },
              { id: 'section4', label: '第四节 对偶单纯形法' },
              { id: 'section5', label: '第五节 灵敏度分析' },
              { id: 'section6', label: '第六节 参数线性规划' },
              { id: 'exercises', label: '习题' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  activeSection === id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div id="top" className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            CHAPTER 2 第二章
          </h1>
          <p className="text-3xl font-semibold text-gray-700">
            线性规划的对偶理论与灵敏度分析
          </p>
        </div>

        {/* Section 1: 对偶问题 */}
        <CollapsibleSection id="section1" title="第一节 线性规划的对偶问题" defaultOpen>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-3 text-yellow-800">一、对偶问题的提出</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                在《现代汉语词典》（修订本）中有关&ldquo;对偶&rdquo;的释义为：&ldquo;修辞方式，用对称的句子加强语言的效果。&rdquo;
                在《中国企业管理百科全书》中，对偶理论词条的释义为：&ldquo;实质相同但从不同角度提出的不同提法的一对互为对偶的问题。
                如企业怎样充分利用现有人力、物力完成更多任务和怎样用最少人力物力去完成给定的任务，就是互为对偶的一对问题。&rdquo;
              </p>
              <p className="text-gray-700 leading-relaxed">
                对偶理论是从数量关系上研究这一对问题的性质、关系及应用的理论和方法。因此无论从理论或实践角度，
                对偶理论都是线性规划中的一个最重要和有趣的概念。对偶理论的基本思想是，每一个线性规划问题都存在一个与其对偶的问题，
                在求出一个问题解的时候，也同时给出了另一问题的解。
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-lg font-bold mb-3 text-blue-800">例1 美佳公司问题</h4>
              <p className="text-gray-700 mb-4">
                第一章例1美佳公司利用该公司资源生产两种家电产品时，其线性规划问题为：
              </p>
              <div className="bg-white p-4 rounded-lg my-4 overflow-x-auto">
                {String.raw`$$
                \begin{align}
                \text{(LP1)} \quad \max z &= 2x_1 + x_2 \\
                \text{s.t.} \quad & 5x_2 \le 15 \\
                & 6x_1 + 2x_2 \le 24 \\
                & x_1 + x_2 \le 5 \\
                & x_1, x_2 \ge 0
                \end{align}
                $$`}
              </div>
              <p className="text-gray-700 mb-4">
                现从另一角度提出问题：假定有某个公司想把美佳公司的资源收买过来，它至少应付出多大代价，
                才能使美佳公司愿意放弃生产活动，出让自己的资源？显然美佳公司愿出让自己资源的条件是，
                出让代价应不低于用同等数量资源由自己组织生产活动时获取的赢利。
              </p>
              <p className="text-gray-700 mb-4">
                设分别用 {String.raw`$y_1, y_2, y_3$`} 代表单位时间（h）设备A、设备B和调试工序的出让代价。
                因美佳公司用6h设备B和1h调试可生产一件家电I，赢利2元；用5h设备A、2h设备B及1h调试可生产一件家电II，
                赢利1元。由此 {String.raw`$y_1, y_2, y_3$`} 的取值应满足：
              </p>
              <div className="bg-white p-4 rounded-lg my-4">
                {String.raw`$$
                \begin{cases}
                6y_2 + y_3 \ge 2 \\
                5y_1 + 2y_2 + y_3 \ge 1
                \end{cases}
                \tag{2.1}
                $$`}
              </div>
              <p className="text-gray-700 mb-4">
                又该公司希望用最小代价把美佳公司的全部资源收买过来，故有：
              </p>
              <div className="bg-white p-4 rounded-lg my-4">
                {String.raw`$$\min w = 15y_1 + 24y_2 + 5y_3 \tag{2.2}$$`}
              </div>
              <p className="text-gray-700 mb-4">
                显然 {String.raw`$y_i \ge 0 \, (i=1,2,3)$`}。综合式(2.1)和式(2.2)，有：
              </p>
              <div className="bg-white p-4 rounded-lg my-4">
                {String.raw`$$
                \begin{align}
                \text{(LP2)} \quad \min w &= 15y_1 + 24y_2 + 5y_3 \\
                \text{s.t.} \quad & 6y_2 + y_3 \ge 2 \\
                & 5y_1 + 2y_2 + y_3 \ge 1 \\
                & y_1, y_2, y_3 \ge 0
                \end{align}
                $$`}
              </div>
              <p className="text-gray-700">
                上述LP1和LP2两个线性规划问题，通常称前者为原问题，后者是前者的对偶问题。
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-green-800">二、对称形式下对偶问题的一般形式</h3>
              
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-bold text-gray-800 mb-2">定义：</h4>
                <p className="text-gray-700">
                  满足下列条件的线性规划问题称为具有对称形式：其变量均具有非负约束，
                  其约束条件当目标函数求极大时均取&ldquo;≤&rdquo;号，当目标函数求极小时均取&ldquo;≥&rdquo;号。
                </p>
              </div>

              <h4 className="font-semibold text-gray-800 mb-3">对称形式下线性规划原问题的一般形式为：</h4>
              <div className="bg-white p-4 rounded-lg my-4 overflow-x-auto">
                {String.raw`$$
                \begin{align}
                \max z &= c_1x_1 + c_2x_2 + \cdots + c_nx_n \\
                \text{s.t.} \quad & a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n \le b_1 \\
                & a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n \le b_2 \\
                & \vdots \\
                & a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n \le b_m \\
                & x_j \ge 0 \quad (j=1,\ldots,n)
                \end{align}
                \tag{2.3}
                $$`}
              </div>

              <h4 className="font-semibold text-gray-800 mb-3 mt-6">其对偶问题的一般形式为：</h4>
              <div className="bg-white p-4 rounded-lg my-4 overflow-x-auto">
                {String.raw`$$
                \begin{align}
                \min w &= b_1y_1 + b_2y_2 + \cdots + b_my_m \\
                \text{s.t.} \quad & a_{11}y_1 + a_{21}y_2 + \cdots + a_{m1}y_m \ge c_1 \\
                & a_{12}y_1 + a_{22}y_2 + \cdots + a_{m2}y_m \ge c_2 \\
                & \vdots \\
                & a_{1n}y_1 + a_{2n}y_2 + \cdots + a_{mn}y_m \ge c_n \\
                & y_i \ge 0 \quad (i=1,\ldots,m)
                \end{align}
                \tag{2.4}
                $$`}
              </div>

              <h4 className="font-semibold text-gray-800 mb-3 mt-6">用矩阵形式表示：</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-center mb-2 text-blue-600">原问题</p>
                  <div className="overflow-x-auto">
                    {String.raw`$$
                    \begin{align}
                    \max z &= \mathbf{C}^\top\mathbf{X} \\
                    \text{s.t.} \quad & \mathbf{AX} \le \mathbf{b} \\
                    & \mathbf{X} \ge \mathbf{0}
                    \end{align}
                    \tag{2.5}
                    $$`}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-center mb-2 text-green-600">对偶问题</p>
                  <div className="overflow-x-auto">
                    {String.raw`$$
                    \begin{align}
                    \min w &= \mathbf{Y}^\top\mathbf{b} \\
                    \text{s.t.} \quad & \mathbf{A}^\top\mathbf{Y} \ge \mathbf{C} \\
                    & \mathbf{Y} \ge \mathbf{0}
                    \end{align}
                    \tag{2.6}
                    $$`}
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <h4 className="font-semibold text-gray-800 mb-3">对应关系表：</h4>
                <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">项目</th>
                      <th className="px-4 py-3 text-left">原问题</th>
                      <th className="px-4 py-3 text-left">对偶问题</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-semibold">A</td>
                      <td className="px-4 py-3">约束系数矩阵</td>
                      <td className="px-4 py-3">其约束系数矩阵的转置</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-semibold">b</td>
                      <td className="px-4 py-3">约束条件的右端项向量</td>
                      <td className="px-4 py-3">目标函数中的价格系数向量</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-semibold">C</td>
                      <td className="px-4 py-3">目标函数中的价格系数向量</td>
                      <td className="px-4 py-3">约束条件的右端项向量</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-semibold">目标函数</td>
                      <td className="px-4 py-3">{String.raw`$\max z = \mathbf{C}^\top\mathbf{X}$`}</td>
                      <td className="px-4 py-3">{String.raw`$\min w = \mathbf{Y}^\top\mathbf{b}$`}</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-semibold">约束条件</td>
                      <td className="px-4 py-3">{String.raw`$\mathbf{AX} \le \mathbf{b}$`}</td>
                      <td className="px-4 py-3">{String.raw`$\mathbf{A}^\top\mathbf{Y} \ge \mathbf{C}$`}</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-semibold">决策变量</td>
                      <td className="px-4 py-3">{String.raw`$\mathbf{X} \ge \mathbf{0}$`}</td>
                      <td className="px-4 py-3">{String.raw`$\mathbf{Y} \ge \mathbf{0}$`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-gray-700 font-semibold mb-2">重要结论：</p>
                <p className="text-gray-700">
                  对偶问题的对偶即原问题。因此也可以把表2-1右端的线性规划问题作为原问题，写出其左端形式的对偶问题。
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-purple-800">三、非对称形式的原—对偶问题关系</h3>
              <p className="text-gray-700 mb-4">
                因为并非所有线性规划问题只有对称形式，故下面讨论一般形式下线性规划问题如何写出其对偶问题。
              </p>

              <div className="bg-white p-4 rounded-lg my-4">
                <h4 className="font-bold text-gray-800 mb-3">例2 写出下述线性规划问题的对偶问题</h4>
                <div className="overflow-x-auto">
                  {String.raw`$$
                  \begin{align}
                  \max z &= c_1x_1 + c_2x_2 + c_3x_3 \\
                  \text{s.t.} \quad & a_{11}x_1 + a_{12}x_2 + a_{13}x_3 \le b_1 \\
                  & a_{21}x_1 + a_{22}x_2 + a_{23}x_3 = b_2 \\
                  & a_{31}x_1 + a_{32}x_2 + a_{33}x_3 \ge b_3 \\
                  & x_1 \ge 0, \quad x_2 \le 0, \quad x_3 \text{ 无约束}
                  \end{align}
                  \tag{2.7}
                  $$`}
                </div>
                <p className="text-gray-700 mt-4 mb-2">转换步骤：</p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>将约束(2.7b)转换成两个不等式</li>
                  <li>将约束(2.7c)两端乘&ldquo;-1&rdquo;</li>
                  <li>将无约束变量 {String.raw`$x_3$`} 表示为两个非负变量之差</li>
                </ol>
              </div>

              <div className="mt-6 overflow-x-auto">
                <h4 className="font-semibold text-gray-800 mb-3">一般对应关系表：</h4>
                <table className="w-full bg-white rounded-lg shadow-md overflow-hidden text-sm">
                  <thead className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                    <tr>
                      <th className="px-3 py-3 text-left">项目</th>
                      <th className="px-3 py-3 text-left">原问题（对偶问题）</th>
                      <th className="px-3 py-3 text-left">对偶问题（原问题）</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3 font-semibold">A</td>
                      <td className="px-3 py-3">约束系数矩阵</td>
                      <td className="px-3 py-3">约束系数矩阵的转置</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3 font-semibold">b</td>
                      <td className="px-3 py-3">约束条件右端项向量</td>
                      <td className="px-3 py-3">目标函数中的价格系数向量</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3 font-semibold">C</td>
                      <td className="px-3 py-3">目标函数中的价格系数向量</td>
                      <td className="px-3 py-3">约束条件右端项向量</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3 font-semibold">目标函数</td>
                      <td className="px-3 py-3">{String.raw`$\max z = \sum_{j=1}^n c_jx_j$`}</td>
                      <td className="px-3 py-3">{String.raw`$\min w = \sum_{i=1}^m b_iy_i$`}</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3 font-semibold" rowSpan={4}>变量</td>
                      <td className="px-3 py-3">{String.raw`$x_j \, (j=1,\ldots,n)$`}</td>
                      <td className="px-3 py-3 bg-blue-50">
                        有 n 个{String.raw`$(j=1,\ldots,n)$`}<br/>
                        {String.raw`$\sum_{i=1}^m a_{ij}y_i \ge c_j$`}（约束条件）
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3">{String.raw`$x_j \ge 0$`}</td>
                      <td className="px-3 py-3">{String.raw`$y_i \ge 0$`}</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3">{String.raw`$x_j \le 0$`}</td>
                      <td className="px-3 py-3">{String.raw`$\sum_{i=1}^m a_{ij}y_i \le c_j$`}</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3">{String.raw`$x_j$`} 无约束</td>
                      <td className="px-3 py-3">{String.raw`$\sum_{i=1}^m a_{ij}y_i = c_j$`}</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3 font-semibold" rowSpan={4}>约束条件</td>
                      <td className="px-3 py-3 bg-green-50">
                        有 m 个{String.raw`$(i=1,\ldots,m)$`}<br/>
                        {String.raw`$\sum_{j=1}^n a_{ij}x_j \le b_i$`}
                      </td>
                      <td className="px-3 py-3">{String.raw`$y_i \, (i=1,\ldots,m)$`}</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3">{String.raw`$\sum_{j=1}^n a_{ij}x_j \ge b_i$`}</td>
                      <td className="px-3 py-3">{String.raw`$y_i \ge 0$`}</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3">{String.raw`$\sum_{j=1}^n a_{ij}x_j = b_i$`}</td>
                      <td className="px-3 py-3">{String.raw`$y_i \le 0$`}</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-3 py-3">&nbsp;</td>
                      <td className="px-3 py-3">{String.raw`$y_i$`} 无约束</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Section 2: 基本性质 */}
        <CollapsibleSection id="section2" title="第二节 对偶问题的基本性质">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                本节的讨论先假定原问题及对偶问题为对称形式线性规划问题，然后说明对偶问题的基本性质在非对称形式时也适用。
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-indigo-600 mb-2">原问题</h4>
                  <div className="overflow-x-auto">
                    {String.raw`$$
                    \begin{align}
                    \max z &= \sum_{j=1}^n c_jx_j \\
                    \text{s.t.} \quad & \sum_{j=1}^n a_{ij}x_j \le b_i \\
                    & x_j \ge 0
                    \end{align}
                    \tag{2.9}
                    $$`}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-purple-600 mb-2">对偶问题</h4>
                  <div className="overflow-x-auto">
                    {String.raw`$$
                    \begin{align}
                    \min w &= \sum_{i=1}^m b_iy_i \\
                    \text{s.t.} \quad & \sum_{i=1}^m a_{ij}y_i \ge c_j \\
                    & y_i \ge 0
                    \end{align}
                    \tag{2.10}
                    $$`}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Property 1 */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-3 text-blue-800">1. 弱对偶性</h3>
                <p className="text-gray-700 mb-3">
                  如果 {String.raw`$\bar{x}_j \, (j=1,\ldots,n)$`} 是原问题的可行解，
                  {String.raw`$\bar{y}_i \, (i=1,\ldots,m)$`} 是对偶问题的可行解，则必有：
                </p>
                <div className="bg-white p-4 rounded-lg">
                  {String.raw`$$\sum_{j=1}^n c_j\bar{x}_j \le \sum_{i=1}^m b_i\bar{y}_i$$`}
                </div>
                <div className="mt-4 bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">证明：</p>
                  <div className="overflow-x-auto">
                    {String.raw`$$
                    \begin{align}
                    \sum_{j=1}^n c_j\bar{x}_j &\le \sum_{j=1}^n \left(\sum_{i=1}^m a_{ij}\bar{y}_i\right)\bar{x}_j 
                    = \sum_{i=1}^m \sum_{j=1}^n a_{ij}\bar{x}_j\bar{y}_i \\
                    &\le \sum_{i=1}^m b_i\bar{y}_i
                    \end{align}
                    $$`}
                  </div>
                </div>
                <div className="mt-4 bg-yellow-100 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">推论：</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>原问题最优解的目标函数值是对偶问题目标函数值的下界；反之对偶问题最优解的目标函数值是其原问题目标函数值的上界</li>
                    <li>如原问题有可行解且目标函数值无界（具有无界解），则其对偶问题无可行解</li>
                    <li>若原问题有可行解而其对偶问题无可行解，则原问题目标函数值无界</li>
                  </ul>
                </div>
              </div>

              {/* Property 2 */}
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-3 text-green-800">2. 最优性</h3>
                <p className="text-gray-700 mb-3">
                  如果 {String.raw`$\bar{x}_j \, (j=1,\ldots,n)$`} 是原问题的可行解，
                  {String.raw`$\bar{y}_i \, (i=1,\ldots,m)$`} 是对偶问题的可行解，且有：
                </p>
                <div className="bg-white p-4 rounded-lg">
                  {String.raw`$$\sum_{j=1}^n c_j\bar{x}_j = \sum_{i=1}^m b_i\bar{y}_i$$`}
                </div>
                <p className="text-gray-700 mt-3">
                  则 {String.raw`$\bar{x}_j$`} 是原问题的最优解，{String.raw`$\bar{y}_i$`} 是对偶问题的最优解。
                </p>
              </div>

              {/* Property 3 */}
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-3 text-purple-800">3. 强对偶性（或称对偶定理）</h3>
                <p className="text-gray-700 mb-3">
                  若原问题及其对偶问题均具有可行解，则两者均具有最优解，且它们最优解的目标函数值相等。
                </p>
                <div className="bg-white p-4 rounded-lg mt-4">
                  <p className="text-gray-700">
                    证明要点：由于两者均有可行解，根据弱对偶性的推论(1)，对原问题的目标函数值具有上界，
                    对偶问题的目标函数值具有下界，因此两者均具有最优解。由式(2.19)和式(2.20)知，
                    当原问题为最优解时，其对偶问题的解为可行解，且有 {String.raw`$z=w$`}，由最优性知，
                    这时两者的解均为最优解。
                  </p>
                </div>
              </div>

              {/* Property 4 */}
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
                <h3 className="text-xl font-bold mb-3 text-orange-800">4. 互补松弛性</h3>
                <p className="text-gray-700 mb-3">
                  在线性规划问题的最优解中，如果对应某一约束条件的对偶变量值为非零，则该约束条件取严格等式；
                  反之如果约束条件取严格不等式，则其对应的对偶变量一定为零。也即：
                </p>
                <div className="bg-white p-4 rounded-lg space-y-3">
                  <p className="text-gray-700">
                    若 {String.raw`$\bar{y}_i > 0$`}，则有 {String.raw`$\sum_{j=1}^n a_{ij}\bar{x}_j = b_i$`}，
                    即 {String.raw`$\bar{x}_{n+i} = 0$`}
                  </p>
                  <p className="text-gray-700">
                    若 {String.raw`$\sum_{j=1}^n a_{ij}\bar{x}_j < b_i$`}，即 {String.raw`$\bar{x}_{n+i} > 0$`}，
                    则有 {String.raw`$\bar{y}_i = 0$`}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    因此一定有 {String.raw`$\bar{x}_{n+i} \cdot \bar{y}_i = 0$`}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg mt-4">
                  <p className="font-semibold text-gray-800 mb-2">证明：</p>
                  <p className="text-gray-700">
                    由弱对偶性知 {String.raw`$\sum_{j=1}^n c_j\bar{x}_j \le \sum_{i=1}^m b_i\bar{y}_i$`}，
                    又根据最优性 {String.raw`$\sum_{j=1}^n c_j\bar{x}_j = \sum_{i=1}^m b_i\bar{y}_i$`}，
                    故式中应全为等式。从右端等式得到互补松弛关系。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Section 3: 影子价格 */}
        <CollapsibleSection id="section3" title="第三节 影子价格">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                从上节对偶问题的基本性质可以看出，当线性规划原问题求得最优解 {String.raw`$x_j^* \, (j=1,\ldots,n)$`} 时，
                其对偶问题也得到最优解 {String.raw`$y_i^* \, (i=1,\ldots,m)$`}，且代入各自的目标函数后有：
              </p>
              <div className="bg-white p-4 rounded-lg">
                {String.raw`$$z^* = \sum_{j=1}^n c_jx_j^* = \sum_{i=1}^m b_iy_i^* = w^* \tag{2.23}$$`}
              </div>
              <p className="text-gray-700 mt-4">
                式中 {String.raw`$b_i$`} 是线性规划原问题约束条件的右端项，它代表第 i 种资源的拥有量；
                对偶变量 {String.raw`$y_i^*$`} 的意义代表在资源最优利用条件下对单位第 i 种资源的估价。
                这种估价不是资源的市场价格，而是单位第 i 种资源在所给问题的最优方案中作出的贡献的估价，
                为区别起见，称为<span className="font-bold text-teal-700">影子价格（shadow price）</span>。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-5 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">💰</span>
                  市场价格 vs 影子价格
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  资源的市场价格是其价值的客观体现，随供求关系的变化，价格围绕价值波动。
                  而资源的影子价格则有赖于资源的利用情况，它是当目前一组基变量用于获得原问题最优解时，
                  对偶变量 {String.raw`$y_i^*$`}（即第 i 种资源）每单位对利润的贡献。
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg">
                <h4 className="font-bold text-green-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">📈</span>
                  边际价格
                </h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  影子价格是一种边际价格，在式(2.23)中对 z 求 {String.raw`$b_i$`} 的偏导，得：
                </p>
                <div className="bg-white p-3 rounded-lg">
                  {String.raw`$$\frac{\partial z}{\partial b_i} = y_i^*$$`}
                </div>
                <p className="text-gray-700 mt-3">
                  这说明 {String.raw`$y_i^*$`} 的值理论上相当于在资源得到最优利用的生产条件下，
                  {String.raw`$b_i$`} 每增加一个单位时目标函数 z 的增量。
                </p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">💼</span>
                  机会成本
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  资源的影子价格实际上又是一种机会成本。在完全市场经济条件下，当第2种资源的市场价格
                  低于资源成本加上1/4时，可以买进这种资源；相反，当市场价格高于某种资源的成本加上其影子价格时，
                  就可以卖出这种资源。
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🔍</span>
                  资源利用分析
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  在上一节对偶问题的互补松弛性质中有：当 {String.raw`$\sum_{j=1}^n a_{ij}\bar{x}_j < b_i$`} 时，
                  {String.raw`$\bar{y}_i = 0$`}；当 {String.raw`$\bar{y}_i > 0$`} 时，
                  有 {String.raw`$\sum_{j=1}^n a_{ij}\bar{x}_j = b_i$`}。
                  这表明生产过程中如果某种资源未得到充分利用时，该种资源的影子价格为零；
                  又当资源的影子价格不为零时，表明该种资源在生产中已耗费完毕。
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border-l-4 border-indigo-600">
              <h4 className="font-bold text-indigo-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                检验数的经济意义
              </h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                从影子价格的含义上再来考察单纯形表的计算。因为由表2-4得知：
              </p>
              <div className="bg-white p-4 rounded-lg">
                {String.raw`$$\sigma_j = c_j - z_j = c_j - \mathbf{C}_B\mathbf{B}^{-1}\mathbf{P}_j = c_j - \sum_{i=1}^m a_{ij}y_i^* \tag{2.24}$$`}
              </div>
              <p className="text-gray-700 mt-3 leading-relaxed">
                式(2.24)中 {String.raw`$c_j$`} 代表第 j 种产品的利润，{String.raw`$\sum_{i=1}^m a_{ij}y_i^*$`} 是生产该种产品所消耗各项资源的影子价格的总和，
                即产品的隐含成本。当产品利润大于各项资源隐含成本总和时，表明生产该项产品有利，可在计划中安排，
                否则用这些资源来生产别的产品更为有利，就不在生产计划中安排。这就是单纯形表中各个检验数的经济意义。
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-bold text-orange-800 mb-4">💡 影子价格的应用</h4>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li className="leading-relaxed">
                  <span className="font-semibold">资源的最优利用：</span>
                  一般来说对线性规划问题的求解是确定资源的最优分配方案，而对于对偶问题的求解则是确定对资源的恰当估价，
                  这种估价直接涉及资源的最有效利用。
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">内部结算价格：</span>
                  在一个大公司内部，可借助资源的影子价格确定一些内部结算价格，
                  以便控制有限资源的使用和考核下属企业经营的好坏。
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">社会资源配置：</span>
                  在社会上可对一些最紧缺的资源，借助影子价格规定使用这种资源一单位时必须上缴的利润额，
                  以强制一些经济效益低的企业自觉地节约使用紧缺资源，使有限资源发挥更大的经济效益。
                </li>
              </ol>
            </div>
          </div>
        </CollapsibleSection>

        {/* Section 4: 对偶单纯形法 */}
        <CollapsibleSection id="section4" title="第四节 对偶单纯形法">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-rose-800">一、对偶单纯形法的基本思路</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                对偶单纯形法是应用对偶理论求解线性规划问题的方法。求解线性规划的单纯形法的思路是：
                对原问题的一个基可行解，判别是否所有检验数 {String.raw`$c_j - z_j \le 0 \, (j=1,\ldots,n)$`}。
                若是，又基变量中无非零人工变量，即找到了问题最优解；若为否，再找出相邻的目标函数值更大的基可行解，
                并继续判别，只要最优解存在，就一直循环进行到找出最优解为止。
              </p>
              <div className="bg-white p-5 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-3">
                  根据对偶问题的性质，因为 {String.raw`$c_j - z_j = c_j - \mathbf{C}_B\mathbf{B}^{-1}\mathbf{P}_j$`}，
                  当 {String.raw`$c_j - z_j \le 0 \, (j=1,\ldots,n)$`}，即有 {String.raw`$\mathbf{Y}^\top\mathbf{P}_j \ge c_j$`} 
                  或 {String.raw`$\sum_{i=1}^m a_{ij}y_i^* \ge c_j \, (j=1,\ldots,n)$`}，也即其对偶问题的解为可行解，
                  由此原问题和对偶问题均为最优解。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  反之，如果存在一个对偶问题的可行基 B，即对 {String.raw`$j=1,\ldots,n$`}，
                  有 {String.raw`$\mathbf{C}_B\mathbf{B}^{-1}\mathbf{P}_j \ge c_j$`} 或 {String.raw`$c_j - z_j \le 0$`}，
                  这时只要有 {String.raw`$\mathbf{X}_B = \mathbf{B}^{-1}\mathbf{b} \ge \mathbf{0}$`}，
                  即原问题的解也为可行解，即两者均为可行解。
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-4 text-blue-800">二、对偶单纯形法的计算步骤</h3>
              <p className="text-gray-700 mb-4">
                设对某标准形式的线性规划问题存在一个对偶问题的可行基 B，不妨设 {String.raw`$\mathbf{B} = (\mathbf{P}_1, \mathbf{P}_2, \ldots, \mathbf{P}_m)$`}，
                列出单纯形表。表中必须有 {String.raw`$c_j - z_j \le 0 \, (j=1,\ldots,n)$`}，{String.raw`$\bar{b}_i \, (i=1,\ldots,m)$`} 的值不要求为正。
              </p>

              <div className="space-y-4">
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-3">步骤1：确定换出基的变量</h4>
                  <p className="text-gray-700 mb-2">
                    因为总存在 {String.raw`$\bar{b}_i < 0$`} 的 {String.raw`$\bar{b}_i$`}，令：
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    {String.raw`$$\bar{b}_r = \min_i \{\bar{b}_i\}$$`}
                  </div>
                  <p className="text-gray-700 mt-2">
                    其对应变量 {String.raw`$x_r$`} 为换出基的变量。
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-3">步骤2：确定换入基的变量</h4>
                  <p className="text-gray-700 mb-2">
                    为了使下一个表中第 r 行基变量为正值，只有对应 {String.raw`$a_{rj} < 0 \, (j=m+1,\ldots,n)$`} 的非基变量才可以考虑作为换入基的变量。
                    为了使下一个表中对偶问题的解仍为可行解，令：
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    {String.raw`$$\theta = \min_j \left\{\frac{c_j - z_j}{a_{rj}} \mid a_{rj} < 0\right\} = \frac{c_s - z_s}{a_{rs}} \tag{2.26}$$`}
                  </div>
                  <p className="text-gray-700 mt-2">
                    称 {String.raw`$a_{rs}$`} 为主元素，{String.raw`$x_s$`} 为换入基的变量。
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-3">步骤3：迭代计算</h4>
                  <p className="text-gray-700">
                    用换入变量替换换出变量，得到一个新的基。对新的基再检查是否所有 {String.raw`$\bar{b}_i \, (i=1,\ldots,m) \ge 0$`}。
                    如是，则找到了两者的最优解；如为否，则回到第1步再循环进行。
                  </p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg mt-4 border-l-4 border-red-500">
                <h4 className="font-semibold text-red-800 mb-2">⚠️ 无可行解判断准则</h4>
                <p className="text-gray-700">
                  对 {String.raw`$\bar{b}_i < 0$`}，而对所有 {String.raw`$j=1,\ldots,n$`}，
                  有 {String.raw`$a_{rj} \ge 0$`}。因为这种情况，若把表中第 r 行的约束方程列出有：
                </p>
                <div className="bg-white p-3 rounded mt-2">
                  {String.raw`$$x_r + a_{r,m+1}x_{m+1} + \cdots + a_{rn}x_n = \bar{b}_r \tag{2.28}$$`}
                </div>
                <p className="text-gray-700 mt-2">
                  因 {String.raw`$a_{rj} \ge 0 \, (j=m+1,\ldots,n)$`}，又 {String.raw`$\bar{b}_r < 0$`}，
                  故不可能存在 {String.raw`$x_j \ge 0 \, (j=1,\ldots,n)$`} 的解。故原问题无可行解，这时对偶问题的目标函数值无界。
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-bold text-green-800 mb-4">📝 例3 对偶单纯形法求解示例</h4>
              <p className="text-gray-700 mb-3">用对偶单纯形法求解下述线性规划问题：</p>
              <div className="bg-white p-4 rounded-lg">
                {String.raw`$$
                \begin{align}
                \min w &= 15y_1 + 24y_2 + 5y_3 \\
                \text{s.t.} \quad & 6y_2 + y_3 \ge 2 \\
                & 5y_1 + 2y_2 + y_3 \ge 1 \\
                & y_1, y_2, y_3 \ge 0
                \end{align}
                $$`}
              </div>
              <p className="text-gray-700 mt-4 mb-3">
                <span className="font-semibold">解：</span>先将问题改写为：
              </p>
              <div className="bg-white p-4 rounded-lg">
                {String.raw`$$
                \begin{align}
                \max w' &= -15y_1 - 24y_2 - 5y_3 \\
                \text{s.t.} \quad & -6y_2 - y_3 + y_4 = -2 \\
                & -5y_1 - 2y_2 - y_3 + y_5 = -1 \\
                & y_i \ge 0 \, (i=1,\ldots,5)
                \end{align}
                $$`}
              </div>
              <p className="text-gray-700 mt-4">
                列出单纯形表，并用对偶单纯形法求解步骤进行计算，其过程见下表（略）。
                从表中看出，用对偶单纯形法求解线性规划问题，当约束条件为&ldquo;≥&rdquo;时，不必引进人工变量，使计算简化。
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Section 5: 灵敏度分析 */}
        <CollapsibleSection id="section5" title="第五节 灵敏度分析">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-amber-800">灵敏度分析概述</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                灵敏度分析一词的含义是指对系统或事物因周围条件变化呈示出来的敏感程度的分析。
                在之前讲的线性规划问题中，都假定问题中的 {String.raw`$a_{ij}, b_i, c_j$`} 是已知常数。
                但实际上这些参数往往是一些估计和预测的数字。
              </p>
              <div className="bg-white p-5 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">参数变化的实际原因：</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>随市场条件变化，{String.raw`$c_j$`} 值就会变化</li>
                  <li>{String.raw`$a_{ij}$`} 随工艺技术条件的改变而改变</li>
                  <li>{String.raw`$b_i$`} 值则是根据资源投入后能产生多大经济效果来决定的一种决策选择</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-4 text-blue-800">灵敏度分析的核心问题</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-700">
                    ❓ 当这些参数中的一个或几个发生变化时，问题的最优解会有什么变化？
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-700">
                    ❓ 这些参数在一个多大范围内变化时，问题的最优解或最优基不变？
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-purple-800">灵敏度分析的步骤</h3>
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li className="leading-relaxed">
                  <span className="font-semibold">将参数的改变通过计算反映到最终单纯形表上来</span>
                  <div className="ml-6 mt-2 bg-white p-4 rounded-lg">
                    <p className="mb-2">具体计算方法是，按下列公式计算出由参数 {String.raw`$a_{ij}, b_i, c_j$`} 的变化而引起的最终单纯形表上有关数字的变化：</p>
                    <div className="space-y-2">
                      {String.raw`$$\Delta \bar{\mathbf{b}} = \mathbf{B}^{-1}\Delta\mathbf{b} \tag{2.30}$$`}
                      {String.raw`$$\Delta\mathbf{P}_j' = \mathbf{B}^{-1}\Delta\mathbf{P}_j \tag{2.31}$$`}
                      {String.raw`$$(c_j - z_j)' = c_j - \sum_{i=1}^m a_{ij}y_i^* \tag{2.32}$$`}
                    </div>
                  </div>
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">检查原问题是否仍为可行解</span>
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">检查对偶问题是否仍为可行解</span>
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">按下表所列情况得出结论或决定继续计算的步骤</span>
                  <div className="ml-6 mt-3 overflow-x-auto">
                    <table className="w-full bg-white rounded-lg shadow-md">
                      <thead className="bg-purple-600 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left">原问题</th>
                          <th className="px-4 py-3 text-left">对偶问题</th>
                          <th className="px-4 py-3 text-left">结论或继续计算的步骤</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-purple-50">
                          <td className="px-4 py-3">可行解</td>
                          <td className="px-4 py-3">可行解</td>
                          <td className="px-4 py-3">问题的最优解或最优基不变</td>
                        </tr>
                        <tr className="hover:bg-purple-50">
                          <td className="px-4 py-3">可行解</td>
                          <td className="px-4 py-3">非可行解</td>
                          <td className="px-4 py-3">用单纯形法继续迭代求最优解</td>
                        </tr>
                        <tr className="hover:bg-purple-50">
                          <td className="px-4 py-3">非可行解</td>
                          <td className="px-4 py-3">可行解</td>
                          <td className="px-4 py-3">用对偶单纯形法继续迭代求最优解</td>
                        </tr>
                        <tr className="hover:bg-purple-50">
                          <td className="px-4 py-3">非可行解</td>
                          <td className="px-4 py-3">非可行解</td>
                          <td className="px-4 py-3">引进人工变量，编制新的单纯形表重新计算</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              </ol>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-green-800">一、分析 c<sub>j</sub> 的变化</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  线性规划目标函数中变量系数 {String.raw`$c_j$`} 的变化仅仅影响到检验数 {String.raw`$(c_j - z_j)$`} 的变化。
                  所以将 {String.raw`$c_j$`} 的变化直接反映到最终单纯形表中，只可能出现表2-9中的前两种情况。
                </p>
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-3">🔍 例5 美佳公司利润变化分析</h4>
                  <p className="text-gray-700 mb-3">
                    在第一章例1的美佳公司例子中：
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>(1) 若家电I的利润降至1.5元/件，而家电II的利润增至2元/件时，美佳公司最优生产计划有何变化？</li>
                    <li>(2) 若家电I的利润不变，则家电II的利润在什么范围内变化时，该公司的最优生产计划将不发生变化？</li>
                  </ul>
                  <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <span className="font-semibold">解：</span>通过将利润变化反映到最终单纯形表中，
                      如果所有检验数仍然满足最优性条件，则最优基不变；否则需要继续用单纯形法迭代。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-orange-800">二、分析 b<sub>i</sub> 的变化</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  右端项 {String.raw`$b_i$`} 的变化在实际问题中反映为可用资源数量的变化。
                  由式(2.30)看出 {String.raw`$b_i$`} 变化反映到最终单纯形表上将引起 b 列数字的变化，
                  在表2-9中可能出现第一或第三的两种情况。
                </p>
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-orange-700 mb-3">🔍 例6 设备能力变化分析</h4>
                  <p className="text-gray-700 mb-3">
                    在上述美佳公司的例子中：
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>(1) 若设备A和调试工序的每天能力不变，而设备B每天的能力增加到32h，分析公司最优计划的变化</li>
                    <li>(2) 若设备A和设备B每天可用能力不变，则调试工序能力在什么范围内变化时，问题的最优基不变</li>
                  </ul>
                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      通过计算 {String.raw`$\Delta\bar{\mathbf{b}} = \mathbf{B}^{-1}\Delta\mathbf{b}$`}，
                      将变化反映到最终单纯形表。如果原问题仍为可行解，则最优基不变；否则用对偶单纯形法继续求解。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-pink-800">三、增加一个变量 x<sub>j</sub> 的分析</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  增加一个变量在实际问题中反映为增加一种新的产品。分析步骤如下：
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
                  <li>计算 {String.raw`$\sigma_j' = c_j - z_j = c_j - \sum_{i=1}^m a_{ij}y_i^*$`}</li>
                  <li>计算 {String.raw`$\mathbf{P}_j' = \mathbf{B}^{-1}\mathbf{P}_j$`}</li>
                  <li>若 {String.raw`$\sigma_j' \le 0$`}，原最优解不变，只需将计算得到的 {String.raw`$\mathbf{P}_j'$`} 和 {String.raw`$\sigma_j'$`} 直接写入最终单纯形表中</li>
                  <li>若 {String.raw`$\sigma_j' > 0$`}，则按单纯形法继续迭代计算找出最优解</li>
                </ol>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-cyan-800">四、分析参数 a<sub>ij</sub> 的变化</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {String.raw`$a_{ij}$`} 的变化使线性规划的约束系数矩阵 A 发生变化。
                  若变量 {String.raw`$x_j$`} 在最终单纯形表中为非基变量，其约束条件中系数 {String.raw`$a_{ij}$`} 的变化分析步骤可参照上述第三部分。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  若变量 {String.raw`$x_j$`} 在最终单纯形表中为基变量，则 {String.raw`$a_{ij}$`} 的变化将使相应的 B 和 {String.raw`$\mathbf{B}^{-1}$`} 发生变化，
                  因此有可能出现原问题和对偶问题均为非可行解的情况。出现这种情况时，需引进人工变量先将原问题的解转化为可行解，
                  再用单纯形法求解。
                </p>
              </div>

              <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-violet-800">五、增加一个约束条件的分析</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  增加一个约束条件在实际问题中相当于增添一道工序。分析的方法是先将原问题最优解的变量值代入新增的约束条件，
                  如满足，说明新增的约束未起到限制作用，原最优解不变。否则，将新增的约束直接反映到最终单纯形表中再进一步分析。
                </p>
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-violet-700 mb-3">🔍 例9 环境试验工序的增加</h4>
                  <p className="text-gray-700">
                    仍以美佳公司为例，设家电I、II经调试后，还需经过一道环境试验工序。
                    家电I每件需环境试验3h，家电II每件需2h，又环境试验工序每天生产能力为12h。
                    试分析增加该工序后的美佳公司最优生产计划。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Section 6: 参数线性规划 */}
        <CollapsibleSection id="section6" title="第六节 参数线性规划">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-sky-800">参数线性规划概述</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                灵敏度分析中研究 {String.raw`$c_j, b_i$`} 等参数有保持最优解或最优基不变时的允许变化范围或改变到某一值时对问题最优解的影响。
                若 C 按 {String.raw`$(C + \lambda C^*)$`} 或 b 按 {String.raw`$(b + \lambda b^*)$`} 连续变化，
                而目标函数值 {String.raw`$z(\lambda)$`} 是参数 {String.raw`$\lambda$`} 的线性函数时，
                式(2.36)或式(2.37)被称为参数线性规划。
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-3">目标函数中 c<sub>j</sub> 连续变化</h4>
                  <div className="overflow-x-auto">
                    {String.raw`$$
                    \begin{align}
                    \max z(\lambda) &= (\mathbf{C} + \lambda\mathbf{C}^*)\mathbf{X} \\
                    \text{s.t.} \quad & \mathbf{AX} = \mathbf{b} \\
                    & \mathbf{X} \ge \mathbf{0}
                    \end{align}
                    \tag{2.36}
                    $$`}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    其中 C 为原线性规划问题的价值向量，{String.raw`$C^*$`} 为变动向量，{String.raw`$\lambda$`} 为参数
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-3">约束条件右端项连续变化</h4>
                  <div className="overflow-x-auto">
                    {String.raw`$$
                    \begin{align}
                    \max z(\lambda) &= \mathbf{C}\mathbf{X} \\
                    \text{s.t.} \quad & \mathbf{AX} = \mathbf{b} + \lambda\mathbf{b}^* \\
                    & \mathbf{X} \ge \mathbf{0}
                    \end{align}
                    \tag{2.37}
                    $$`}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    其中 b 为原线性规划问题的资源向量，{String.raw`$b^*$`} 为变动向量，{String.raw`$\lambda$`} 为参数
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-xl font-bold mb-4 text-green-800">参数线性规划问题的分析步骤</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li className="leading-relaxed">令 {String.raw`$\lambda = 0$`} 求解得最终单纯形表</li>
                <li className="leading-relaxed">将 {String.raw`$\lambda C^*$`} 或 {String.raw`$\lambda b^*$`} 项反映到最终单纯形表中去</li>
                <li className="leading-relaxed">
                  随 {String.raw`$\lambda$`} 值的增大或减小，观察原问题或对偶问题：
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>一是确定表中现有解（基）允许 {String.raw`$\lambda$`} 值的变动范围</li>
                    <li>二是当 {String.raw`$\lambda$`} 值的变动超出这个范围时，用单纯形法或对偶单纯形法求取新的解</li>
                  </ul>
                </li>
                <li className="leading-relaxed">
                  重复第(3)步，一直到 {String.raw`$\lambda$`} 值继续增大或减小时，表中的解（基）不再出现变化时为止
                </li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <h4 className="font-bold text-indigo-800 mb-4">💡 例10 参数线性规划求解示例</h4>
              <p className="text-gray-700 mb-3">
                分析 {String.raw`$\lambda$`} 值变化时，下述参数线性规划问题最优解的变化：
              </p>
              <div className="bg-white p-4 rounded-lg">
                {String.raw`$$
                \begin{align}
                \max z(\lambda) &= (2 + \lambda)x_1 + (1 + 2\lambda)x_2 \\
                \text{s.t.} \quad & 5x_2 \le 15 \\
                & 6x_1 + 2x_2 \le 24 \\
                & x_1 + x_2 \le 5 \\
                & x_1, x_2 \ge 0
                \end{align}
                $$`}
              </div>
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">解：</span>先令 {String.raw`$\lambda = 0$`} 求得最优解，
                  并将 {String.raw`$\lambda C^*$`} 反映到最终单纯形表中。通过分析不同 {String.raw`$\lambda$`} 值范围，
                  可以得到目标函数值 {String.raw`$z(\lambda)$`} 随 {String.raw`$\lambda$`} 的变化关系图。
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h4 className="font-bold text-yellow-800 mb-4">📊 关键结论</h4>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-700">
                    • 当 {String.raw`$-\frac{1}{5} \le \lambda \le 1$`} 时，表中解为最优，
                    且 {String.raw`$z = \frac{17}{2} + \frac{13}{2}\lambda$`}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-700">
                    • 当 {String.raw`$\lambda \ge 1$`} 时，{String.raw`$z = 7 + 8\lambda$`}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-700">
                    • 通过这样的分析，可以清楚地看到目标函数值随参数变化的完整情况
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Exercises Section */}
        <CollapsibleSection id="exercises" title="习题">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">第二章习题</h3>
              
              <div className="space-y-8">
                {/* Exercise 2.1 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-blue-700 mb-4">2.1 写出下列线性规划问题的对偶问题</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">(1)</p>
                      <div className="overflow-x-auto">
                        {String.raw`$$
                        \begin{align}
                        \min z &= 2x_1 + 2x_2 + 4x_3 \\
                        \text{s.t.} \quad & 2x_1 - 3x_2 + 4x_3 \ge 10 \\
                        & 2x_1 + x_2 + x_3 \ge 8 \\
                        & -x_1 + 4x_2 + 3x_3 = 5 \\
                        & x_1, x_2 \ge 0, \, x_3 \text{ 无约束}
                        \end{align}
                        $$`}
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">(2)</p>
                      <div className="overflow-x-auto">
                        {String.raw`$$
                        \begin{align}
                        \max z &= 5x_1 + 6x_2 + 3x_3 \\
                        \text{s.t.} \quad & x_1 + 2x_2 + 2x_3 = 5 \\
                        & -x_1 + 5x_2 - 6x_3 \ge 4 \\
                        & 4x_1 + 7x_2 + 3x_3 \le 8 \\
                        & x_1 \text{ 无约束}, \, x_2 \ge 0, \, x_3 \le 0
                        \end{align}
                        $$`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exercise 2.2 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-green-700 mb-4">2.2 判断下列说法是否正确</h4>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li className="leading-relaxed">如果线性规划的原问题存在可行解，则其对偶问题也一定存在可行解</li>
                    <li className="leading-relaxed">如果线性规划的对偶问题无可行解，则原问题也一定无可行解</li>
                    <li className="leading-relaxed">在互为对偶的一对原问题与对偶问题中，不管原问题是求极大或极小，原问题可行解的目标函数值一定不超过其对偶问题可行解的目标函数值</li>
                    <li className="leading-relaxed">任何线性规划问题具有唯一的对偶问题</li>
                  </ol>
                </div>

                {/* Exercise 2.3 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-purple-700 mb-4">2.3 对本章第三节影子价格的6点叙述试分别举例说明其实际应用</h4>
                </div>

                {/* Exercise 2.4 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-orange-700 mb-4">2.4 对偶问题关系分析</h4>
                  <p className="text-gray-700 mb-3">下列两个线性规划问题：</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">(LP1)</p>
                      <div className="text-sm">
                        {String.raw`$$
                        \begin{align}
                        \max z &= c_1x_1 + c_2x_2 \\
                        \text{s.t.} \quad & a_{11}x_1 + a_{12}x_2 \le b_1 \\
                        & a_{21}x_1 + a_{22}x_2 \le b_2 \\
                        & x_1, x_2 \ge 0
                        \end{align}
                        $$`}
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">(LP2)</p>
                      <div className="text-sm">
                        {String.raw`$$
                        \begin{align}
                        \max z &= 100c_1x_1 + 100c_2x_2 \\
                        \text{s.t.} \quad & 100a_{11}x_1 + 100a_{12}x_2 \le b_1 \\
                        & 100a_{21}x_1 + 100a_{22}x_2 \le b_2 \\
                        & x_1, x_2 \ge 0
                        \end{align}
                        $$`}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-4">
                    已知对(LP1)有最优解 {String.raw`$\mathbf{X}^* = (50, 500)$`}，{String.raw`$z^* = 550$`}，
                    求(LP2)的最优解。
                  </p>
                </div>

                {/* More exercises... */}
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg">
                  <p className="text-gray-700 text-center italic">
                    更多习题请参考教材原文...本组件展示了主要内容结构和交互功能。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Interactive Quiz */}
        <div className="mt-12 bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-rose-800">💡 互动练习</h2>
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">快速测验：对偶理论基础</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">问题1：弱对偶性告诉我们什么？</p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                    <input type="radio" name="q1" className="form-radio" />
                    <span>A. 原问题和对偶问题的最优解相等</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                    <input type="radio" name="q1" className="form-radio" />
                    <span>B. 原问题可行解的目标函数值不超过对偶问题可行解的目标函数值</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                    <input type="radio" name="q1" className="form-radio" />
                    <span>C. 原问题和对偶问题都有可行解</span>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">问题2：影子价格反映的是什么？</p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-green-100 p-2 rounded transition-colors">
                    <input type="radio" name="q2" className="form-radio" />
                    <span>A. 资源的市场价格</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-green-100 p-2 rounded transition-colors">
                    <input type="radio" name="q2" className="form-radio" />
                    <span>B. 单位资源在最优方案中对利润的边际贡献</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-green-100 p-2 rounded transition-colors">
                    <input type="radio" name="q2" className="form-radio" />
                    <span>C. 资源的历史成本</span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => alert('答案：\n问题1：B（弱对偶性）\n问题2：B（影子价格是边际贡献）')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                查看答案
              </button>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => scrollToSection('top')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            aria-label="返回顶部"
          >
            ↑ 返回顶部
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">运筹学教程（第5版）</p>
          <p className="text-sm text-gray-400">第二章 线性规划的对偶理论与灵敏度分析</p>
          <p className="text-xs text-gray-500 mt-4">
            本组件仅用于学习交流，内容来源于教材。© 2024
          </p>
        </div>
      </footer>
    </div>
  )
}

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: () => Promise<void>
    }
  }
}