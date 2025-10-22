"use client"

import { useEffect, useRef, useState, type FC, type ReactNode } from 'react'

// ==================== MathJax 全局配置 ====================
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).MathJax = {
    startup: {
      typeset: false,
    },
    tex: {
      inlineMath: [["$", "$"], ["\\(", "\\)"]],
      displayMath: [["$$", "$$"], ["\\[", "\\]"]],
      packages: { "[+]": ["ams", "noerrors", "noundefined", "color"] },
      tags: "ams",
      macros: {
        argmax: "\\mathop{\\mathrm{arg\\,max}}",
        argmin: "\\mathop{\\mathrm{arg\\,min}}",
      },
    },
    svg: { fontCache: "global" },
  }
}

// ==================== 数学组件接口 ====================
interface MathBlockProps {
  latex: string
  className?: string
  onError?: (err: unknown) => void
}

interface InlineMathProps {
  latex: string
  className?: string
  onError?: (err: unknown) => void
}

// ==================== MathBlock 组件 ====================
const MathBlock: FC<MathBlockProps> = ({ latex, className = '', onError }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && typeof window !== 'undefined') {
      // @ts-expect-error - MathJax types
      window.MathJax?.typesetPromise?.([ref.current])?.catch(
        onError || console.error
      )
    }
  }, [latex, onError])

  return (
    <div
      ref={ref}
      className={`my-4 overflow-x-auto text-center text-blue-600 dark:text-blue-400 ${className}`}
    >
      {String.raw`$$${latex}$$`}
    </div>
  )
}

// ==================== InlineMath 组件 ====================
const InlineMath: FC<InlineMathProps> = ({ latex, className = '', onError }) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current && typeof window !== 'undefined') {
      // @ts-expect-error - MathJax types
      window.MathJax?.typesetPromise?.([ref.current])?.catch(
        onError || console.error
      )
    }
  }, [latex, onError])

  return (
    <span
      ref={ref}
      className={`align-baseline ${className}`}
    >
      {String.raw`$${latex}$`}
    </span>
  )
}

// ==================== 折叠组件 ====================
interface AccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

const Accordion: FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && contentRef.current && typeof window !== 'undefined') {
      // @ts-expect-error - MathJax types
      window.MathJax?.typesetPromise?.([contentRef.current])?.catch(console.error)
    }
  }, [isOpen])

  return (
    <div className="border border-gray-300 rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left font-semibold bg-gray-100 hover:bg-gray-200 transition-colors flex justify-between items-center"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div ref={contentRef} className="px-4 py-3">
          {children}
        </div>
      )}
    </div>
  )
}

// ==================== 主组件 ====================
const TransportationProblem: FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.min.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveSection('intro')}
              className={`px-4 py-2 rounded-lg transition-all ${activeSection === 'intro' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              引言
            </button>
            <button
              onClick={() => setActiveSection('section1')}
              className={`px-4 py-2 rounded-lg transition-all ${activeSection === 'section1' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              第一节：数学模型
            </button>
            <button
              onClick={() => setActiveSection('section2')}
              className={`px-4 py-2 rounded-lg transition-all ${activeSection === 'section2' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              第二节：表上作业法
            </button>
            <button
              onClick={() => setActiveSection('section3')}
              className={`px-4 py-2 rounded-lg transition-all ${activeSection === 'section3' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              第三节：进一步讨论
            </button>
            <button
              onClick={() => setActiveSection('section4')}
              className={`px-4 py-2 rounded-lg transition-all ${activeSection === 'section4' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              第四节：应用举例
            </button>
            <button
              onClick={() => setActiveSection('exercises')}
              className={`px-4 py-2 rounded-lg transition-all ${activeSection === 'exercises' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              习题
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">CHAPTER 3</h1>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">第三章</h2>
          <h3 className="text-3xl font-semibold text-gray-700">运输问题</h3>
        </header>

        <section id="intro" className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            在社会生产和消费过程中，离不开人员、物资、资金和信息的合理组织和流动，其中实体物品的流动一直受到人们特别的重视，并于20世纪50年代开始明确形成了物流的概念。
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            物流包括物品的分拣、包装、搬运、装卸、仓储、运输、保管、信息联系与处理等各项基本活动。其中，运输是要改变物品的空间位置以创造其场所效用，它是物流活动中的一个不可或缺的重要环节。随着社会和经济的发展，运输变得越来越复杂，运输量有时非常庞大，科学组织运输可有效降低物流活动的成本，及时实现需要的物品空间位置的变动，以有效提升其空间价值。
          </p>
        </section>

        <section id="section1" className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-3xl font-bold">第一节 运输问题及其数学模型</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">一、运输问题的数学模型</h3>
            
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              本章研究单一品种物资的运输调度问题，其典型情况是：设某种物品有 <InlineMath latex="m" /> 个产地 <InlineMath latex="A_1, A_2, \ldots, A_m" />，各产地的产量分别是 <InlineMath latex="a_1, a_2, \ldots, a_m" />；有 <InlineMath latex="n" /> 个销地 <InlineMath latex="B_1, B_2, \ldots, B_n" />，各销地的销量分别为 <InlineMath latex="b_1, b_2, \ldots, b_n" />。假定从产地 <InlineMath latex="A_i (i=1,2,\ldots,m)" /> 向销地 <InlineMath latex="B_j (j=1,2,\ldots,n)" /> 运输单位物品的运价是 <InlineMath latex="c_{ij}" />，问怎样调运这些物品才能使总运费最小？
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
              <p className="text-lg font-semibold mb-2">产销平衡条件</p>
              <p className="mb-4">如果运输问题的总产量等于总销量，即有：</p>
              <MathBlock latex="\sum_{i=1}^{m} a_i = \sum_{j=1}^{n} b_j" />
              <p className="mt-4">则称该运输问题为<strong>产销平衡运输问题</strong>；反之，称<strong>产销不平衡运输问题</strong>。</p>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-bold mb-4">产销平衡运输问题的数学模型</h4>
              <MathBlock latex="\begin{array}{ll}\min z = & \displaystyle\sum_{i=1}^{m} \sum_{j=1}^{n} c_{ij} x_{ij} \\\text{s.t.} & \begin{cases}\displaystyle\sum_{j=1}^{n} x_{ij} = a_i, & (i=1,2,\ldots,m) \\\displaystyle\sum_{i=1}^{m} x_{ij} = b_j, & (j=1,2,\ldots,n) \\x_{ij} \ge 0, & (i=1,2,\ldots,m; \; j=1,2,\ldots,n)\end{cases}\end{array}" />
              
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>• 目标函数表示运输总费用，要求其极小化</li>
                <li>• 第一组约束条件的意义是由某一产地运往各个销地的物品数量之和等于该产地的产量</li>
                <li>• 第二组约束条件指由各产地运往某一销地的物品数量之和等于该销地的销量</li>
                <li>• 第三组为变量非负条件</li>
              </ul>
            </div>
          </div>

          <Accordion title="二、产销平衡运输问题数学模型的特点">
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-3">1. 运输问题有有限最优解</h4>
                <p className="text-gray-700 mb-3">
                  对运输问题，若令其变量：
                </p>
                <MathBlock latex="x_{ij} = \frac{a_i b_j}{Q}, \quad \text{其中} \; Q = \sum_{i=1}^{m} a_i = \sum_{j=1}^{n} b_j" />
                <p className="text-gray-700 mt-3">
                  则上式就是运输问题的一个可行解；这说明运输问题的目标函数有下界，目标函数值不会趋于负无穷。由此可知，运输问题必存在有限最优解。
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3">2. 运输问题约束条件的系数矩阵</h4>
                <p className="text-gray-700 mb-3">
                  约束条件系数矩阵的每一列有两个非零元素，这对应于每一个变量在前 <InlineMath latex="m" /> 个约束方程中出现一次，在后 <InlineMath latex="n" /> 个约束方程中也出现一次。
                </p>
              </div>
            </div>
          </Accordion>
        </section>

        <section id="section2" className="mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-3xl font-bold">第二节 用表上作业法求解运输问题</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              表上作业法是求解运输问题的一种简便而有效的方法，其求解工作在运输表上进行。它是一种迭代法，迭代步骤为：先按某种规则找出一个初始解（初始调运方案）；再对现行解作最优性判别；若这个解不是最优解，就在运输表上对它进行调整改进，得出一个新解；再判别，再改进；直至得到运输问题的最优解为止。
            </p>
          </div>
        </section>

        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl shadow-lg p-8 mt-12">
          <h3 className="text-2xl font-bold mb-4">章节总结</h3>
          <div className="space-y-3 text-gray-200">
            <p>• 运输问题是线性规划的一类特殊问题，具有特殊的系数矩阵结构</p>
            <p>• 表上作业法是求解运输问题的高效算法</p>
            <p>• 最小元素法和沃格尔法是两种常用的初始解确定方法</p>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default TransportationProblem