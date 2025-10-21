"use client"
import React, { useState, useEffect } from 'react'
export default function LinearProgrammingTutorial() {
const [activeSection, setActiveSection] = useState<string>('intro')
const [language, setLanguage] = useState<'zh' | 'en'>('zh')
const [expandedExample, setExpandedExample] = useState<string | null>(null)
useEffect(() => {
// Load MathJax
const script = document.createElement('script')
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML'
script.async = true
document.head.appendChild(script)
return () => {
  document.head.removeChild(script)
}
}, [])
const content = {
zh: {
title: '线性规划及单纯形法',
subtitle: 'CHAPTER 1 - 第一章',
nav: {
intro: '引言',
models: '数学模型',
graphical: '图解法',
principles: '单纯形法原理',
calculation: '计算步骤',
dea: '数据包络分析',
examples: '应用例子'
},
intro: {
title: '线性规划问题及其数学模型',
problem: '问题的提出',
description: '在生产和经营等管理工作中，需要经常进行计划或规划。虽然各行各业计划和规划的内容千差万别，但其共同点均可归结为：在现有各项资源条件的限制下，如何确定方案，使预期目标达到最优；或为了达到预期目标，确定使资源消耗为最少的方案。'
}
},
en: {
title: 'Linear Programming and Simplex Method',
subtitle: 'CHAPTER 1',
nav: {
intro: 'Introduction',
models: 'Mathematical Models',
graphical: 'Graphical Method',
principles: 'Simplex Principles',
calculation: 'Calculation Steps',
dea: 'DEA Analysis',
examples: 'Applications'
},
intro: {
title: 'Linear Programming Problems and Mathematical Models',
problem: 'Problem Introduction',
description: 'In production and management work, planning and scheduling are frequently required. Although the content of plans and schedules varies greatly across industries, they all share a common goal: under existing resource constraints, how to determine a plan that achieves optimal objectives, or to achieve expected goals with minimum resource consumption.'
}
}
}
const t = content[language]
return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
{/* Header */}
<header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
<div className="container mx-auto px-4 py-6">
<div className="flex justify-between items-center">
<div>
<h1 className="text-4xl font-bold mb-2">{t.title}</h1>
<p className="text-blue-100 text-lg">{t.subtitle}</p>
</div>
<button
onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg"
aria-label="Switch language"
>
{language === 'zh' ? 'English' : '中文'}
</button>
</div>
</div>
</header>
  <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
    {/* Sidebar Navigation */}
    <nav className="lg:w-1/4 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24" role="navigation">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
        {language === 'zh' ? '目录' : 'Contents'}
      </h2>
      <ul className="space-y-3">
        {Object.entries(t.nav).map(([key, value]) => (
          <li key={key}>
            <button
              onClick={() => setActiveSection(key)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === key
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'hover:bg-blue-50 text-gray-700'
              }`}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </nav>

    {/* Main Content */}
    <main className="lg:w-3/4 space-y-8">
      {/* Introduction Section */}
      {activeSection === 'intro' && (
        <section className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">
            {t.intro.title}
          </h2>
          
          <div className="prose max-w-none">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">{t.intro.problem}</h3>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              {t.intro.description}
            </p>

            {/* Example 1 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 my-6 border-l-4 border-green-500">
              <h4 className="text-xl font-bold text-green-700 mb-4">
                {language === 'zh' ? '例1 美佳公司计划' : 'Example 1: Meijia Company Planning'}
              </h4>
              <p className="text-gray-700 mb-4">
                {language === 'zh' 
                  ? '美佳公司计划制造Ⅰ、Ⅱ两种家电产品。已知各制造一件时分别占用的设备A、设备B的台时、调试工序时间及每天可用于这两种家电的能力、各售出一件时的获利情况，如表1-1所示。问该公司应制造两种家电各多少件，使获取的利润为最大。'
                  : 'Meijia Company plans to manufacture two types of household appliances, I and II. Given the equipment usage time for equipment A and B, debugging time, daily capacity available for these appliances, and profit per unit sold as shown in Table 1-1. How many units of each appliance should the company manufacture to maximize profit?'
                }
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">{language === 'zh' ? '项目' : 'Item'}</th>
                      <th className="px-6 py-3 text-center">Ⅰ</th>
                      <th className="px-6 py-3 text-center">Ⅱ</th>
                      <th className="px-6 py-3 text-center">{language === 'zh' ? '每天可用能力' : 'Daily Capacity'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4">{language === 'zh' ? '设备A/h' : 'Equipment A/h'}</td>
                      <td className="px-6 py-4 text-center">0</td>
                      <td className="px-6 py-4 text-center">5</td>
                      <td className="px-6 py-4 text-center">15</td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4">{language === 'zh' ? '设备B/h' : 'Equipment B/h'}</td>
                      <td className="px-6 py-4 text-center">6</td>
                      <td className="px-6 py-4 text-center">2</td>
                      <td className="px-6 py-4 text-center">24</td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4">{language === 'zh' ? '调试工序/h' : 'Debugging/h'}</td>
                      <td className="px-6 py-4 text-center">1</td>
                      <td className="px-6 py-4 text-center">1</td>
                      <td className="px-6 py-4 text-center">5</td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4">{language === 'zh' ? '利润/元' : 'Profit/Yuan'}</td>
                      <td className="px-6 py-4 text-center">2</td>
                      <td className="px-6 py-4 text-center">1</td>
                      <td className="px-6 py-4 text-center">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mathematical Model */}
            <div className="bg-blue-50 rounded-lg p-6 my-6 border-l-4 border-blue-500">
              <h4 className="text-xl font-bold text-blue-700 mb-4">
                {language === 'zh' ? '数学模型' : 'Mathematical Model'}
              </h4>
              <div className="space-y-4 text-gray-800">
                <p>{language === 'zh' ? '目标函数：' : 'Objective Function:'}</p>
                <div className="bg-white p-4 rounded-lg shadow-sm font-mono text-blue-600">
                  {'\\[ \\max z = 2x_1 + x_2 \\]'}
                </div>
                
                <p>{language === 'zh' ? '约束条件：' : 'Constraints:'}</p>
                <div className="bg-white p-4 rounded-lg shadow-sm font-mono text-blue-600 space-y-2">
                  {'\\[ \\begin{align*}'}<br/>
                  {'5x_2 &\\leq 15 \\\\'}<br/>
                  {'6x_1 + 2x_2 &\\leq 24 \\\\'}<br/>
                  {'x_1 + x_2 &\\leq 5 \\\\'}<br/>
                  {'x_1, x_2 &\\geq 0'}<br/>
                  {'\\end{align*} \\]'}
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 my-6 border-l-4 border-purple-500">
              <h4 className="text-xl font-bold text-purple-700 mb-4">
                {language === 'zh' ? '例2 捷运公司仓库租赁' : 'Example 2: Jieyun Company Warehouse Rental'}
              </h4>
              <p className="text-gray-700 mb-4">
                {language === 'zh'
                  ? '捷运公司在下一年度的1-4月的4个月内拟租用仓库堆放物资。已知各月份所需仓库面积列于表1-2。仓库租借费用随合同期固定，期限越长，折扣越大，具体数字见表1-3。试确定该公司签订租借合同的最优决策，目的是使所付租借费用最小。'
                  : 'Jieyun Company plans to rent warehouses for storage during months 1-4 of the next year. The required warehouse area for each month is listed in Table 1-2. Rental costs depend on contract duration - longer contracts get bigger discounts, as shown in Table 1-3. Determine the optimal rental contract strategy to minimize rental costs.'
                }
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="overflow-x-auto">
                  <p className="font-semibold mb-2">{language === 'zh' ? '表1-2 所需仓库面积' : 'Table 1-2: Required Warehouse Area'}</p>
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md text-sm">
                    <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <tr>
                        <th className="px-4 py-2">{language === 'zh' ? '月份' : 'Month'}</th>
                        <th className="px-4 py-2">1</th>
                        <th className="px-4 py-2">2</th>
                        <th className="px-4 py-2">3</th>
                        <th className="px-4 py-2">4</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-purple-50">
                        <td className="px-4 py-2 text-center">{language === 'zh' ? '面积(100m²)' : 'Area(100m²)'}</td>
                        <td className="px-4 py-2 text-center">15</td>
                        <td className="px-4 py-2 text-center">10</td>
                        <td className="px-4 py-2 text-center">20</td>
                        <td className="px-4 py-2 text-center">12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto">
                  <p className="font-semibold mb-2">{language === 'zh' ? '表1-3 租借费用' : 'Table 1-3: Rental Costs'}</p>
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md text-sm">
                    <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <tr>
                        <th className="px-4 py-2">{language === 'zh' ? '期限' : 'Duration'}</th>
                        <th className="px-4 py-2">1{language === 'zh' ? '月' : 'mo'}</th>
                        <th className="px-4 py-2">2{language === 'zh' ? '月' : 'mo'}</th>
                        <th className="px-4 py-2">3{language === 'zh' ? '月' : 'mo'}</th>
                        <th className="px-4 py-2">4{language === 'zh' ? '月' : 'mo'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-purple-50">
                        <td className="px-4 py-2 text-center">{language === 'zh' ? '费用(元/100m²)' : 'Cost(¥/100m²)'}</td>
                        <td className="px-4 py-2 text-center">2800</td>
                        <td className="px-4 py-2 text-center">4500</td>
                        <td className="px-4 py-2 text-center">6000</td>
                        <td className="px-4 py-2 text-center">7300</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Graphical Method Section */}
      {activeSection === 'graphical' && (
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-indigo-500 pl-4">
            {language === 'zh' ? '第二节 图解法' : 'Section 2: Graphical Method'}
          </h2>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              {language === 'zh'
                ? '对模型中只含2个变量的线性规划问题，可以通过在平面上作图的方法求解。一个线性规划问题有解，是指能找出一组xⱼ(j=1,...,n)，满足约束条件，称这组xⱼ为问题的可行解。'
                : 'For linear programming problems with only 2 variables in the model, solutions can be found through graphical methods on a plane. A linear programming problem has a solution if we can find a set of xⱼ(j=1,...,n) that satisfies the constraints, called a feasible solution.'
              }
            </p>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 my-6">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                {language === 'zh' ? '图解法的步骤' : 'Steps of Graphical Method'}
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li className="pl-2">
                  {language === 'zh'
                    ? '在平面上建立直角坐标系；图示约束条件，找出可行域或判别是否存在可行域'
                    : 'Establish a rectangular coordinate system on the plane; illustrate constraints and find the feasible region or determine if it exists'
                  }
                </li>
                <li className="pl-2">
                  {language === 'zh'
                    ? '图示目标函数和寻找最优解'
                    : 'Illustrate the objective function and find the optimal solution'
                  }
                </li>
              </ol>
            </div>

            {/* Interactive Example with Collapsible Details */}
            <div className="my-8">
              <button
                onClick={() => setExpandedExample(expandedExample === 'graphical' ? null : 'graphical')}
                className="w-full flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                aria-expanded={expandedExample === 'graphical'}
              >
                <span className="text-lg">{language === 'zh' ? '查看图解法详细示例' : 'View Detailed Graphical Example'}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${expandedExample === 'graphical' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedExample === 'graphical' && (
                <div className="mt-4 p-6 bg-gray-50 rounded-lg border-2 border-blue-200 animate-fadeIn">
                  <h4 className="text-xl font-bold text-blue-700 mb-4">
                    {language === 'zh' ? '例1的图解法求解' : 'Solving Example 1 by Graphical Method'}
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="font-semibold text-gray-800 mb-2">
                        {language === 'zh' ? '步骤1：建立坐标系' : 'Step 1: Establish Coordinate System'}
                      </p>
                      <p className="text-gray-700">
                        {language === 'zh'
                          ? '以变量x₁为横坐标轴，x₂为纵坐标轴画出直角平面坐标系，并适当选取单位坐标长度。'
                          : 'Draw a rectangular coordinate system with x₁ as the horizontal axis and x₂ as the vertical axis, choosing appropriate unit lengths.'
                        }
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="font-semibold text-gray-800 mb-2">
                        {language === 'zh' ? '步骤2：图示约束条件' : 'Step 2: Illustrate Constraints'}
                      </p>
                      <div className="font-mono text-sm text-blue-600 bg-blue-50 p-3 rounded">
                        {'\\[ 5x_2 \\leq 15 \\quad (x_2 = 3) \\]'}<br/>
                        {'\\[ 6x_1 + 2x_2 \\leq 24 \\]'}<br/>
                        {'\\[ x_1 + x_2 \\leq 5 \\]'}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="font-semibold text-gray-800 mb-2">
                        {language === 'zh' ? '步骤3：确定最优解' : 'Step 3: Determine Optimal Solution'}
                      </p>
                      <p className="text-gray-700 mb-2">
                        {language === 'zh'
                          ? '将目标函数的直线向右上方移动，直到与可行域相切为止，切点即为最优解。'
                          : 'Move the objective function line upward and to the right until it is tangent to the feasible region. The tangent point is the optimal solution.'
                        }
                      </p>
                      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mt-3">
                        <p className="font-semibold text-green-700">
                          {language === 'zh' ? '最优解：' : 'Optimal Solution:'}
                        </p>
                        <div className="font-mono text-green-800">
                          {'\\[ x_1^* = 3.5, \\quad x_2^* = 1.5 \\]'}<br/>
                          {'\\[ z^* = 2(3.5) + 1.5 = 8.5 \\]'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Possible Solution Outcomes */}
            <div className="bg-yellow-50 rounded-lg p-6 my-6 border-l-4 border-yellow-500">
              <h3 className="text-2xl font-semibold text-yellow-700 mb-4">
                {language === 'zh' ? '线性规划问题求解的几种可能结局' : 'Possible Outcomes of Linear Programming'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">
                    {language === 'zh' ? '1. 无穷多最优解' : '1. Infinite Optimal Solutions'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'zh'
                      ? '当目标函数的直线与可行域的某条边平行时，该边上所有点都是最优解。'
                      : 'When the objective function line is parallel to an edge of the feasible region, all points on that edge are optimal solutions.'
                    }
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">
                    {language === 'zh' ? '2. 无界解' : '2. Unbounded Solution'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'zh'
                      ? '可行域可伸展到无穷，变量取值也可无限增大，目标函数值可增大至无穷。'
                      : 'The feasible region extends to infinity, variables can increase without limit, and the objective function can increase indefinitely.'
                    }
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">
                    {language === 'zh' ? '3. 无解（无可行解）' : '3. No Solution (Infeasible)'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'zh'
                      ? '不存在满足所有约束的公共区域（可行域），说明问题无解。'
                      : 'There is no common region (feasible region) satisfying all constraints, indicating no solution exists.'
                    }
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">
                    {language === 'zh' ? '4. 唯一最优解' : '4. Unique Optimal Solution'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'zh'
                      ? '目标函数在可行域的某个顶点达到最优，该点为唯一最优解。'
                      : 'The objective function reaches its optimum at a single vertex of the feasible region, which is the unique optimal solution.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Simplex Method Principles */}
      {activeSection === 'principles' && (
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-purple-500 pl-4">
            {language === 'zh' ? '第三节 单纯形法原理' : 'Section 3: Simplex Method Principles'}
          </h2>

          <div className="prose max-w-none">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                {language === 'zh' ? '线性规划问题的解的概念' : 'Concepts of Solutions in Linear Programming'}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-purple-600 mb-2">
                    {language === 'zh' ? '可行解 (Feasible Solution)' : 'Feasible Solution'}
                  </h4>
                  <p className="text-gray-700">
                    {language === 'zh'
                      ? '满足约束条件的解X=(x₁,...,xₙ)ᵀ，称为线性规划问题的可行解。全部可行解的集合称为可行域。'
                      : 'A solution X=(x₁,...,xₙ)ᵀ that satisfies the constraints is called a feasible solution. The set of all feasible solutions is called the feasible region.'
                    }
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-purple-600 mb-2">
                    {language === 'zh' ? '最优解 (Optimal Solution)' : 'Optimal Solution'}
                  </h4>
                  <p className="text-gray-700">
                    {language === 'zh'
                      ? '使目标函数达到最大值的可行解称为最优解。'
                      : 'A feasible solution that maximizes the objective function is called an optimal solution.'
                    }
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-purple-600 mb-2">
                    {language === 'zh' ? '基 (Basis)' : 'Basis'}
                  </h4>
                  <p className="text-gray-700">
                    {language === 'zh'
                      ? '设A为约束方程组的m×n阶系数矩阵（设n>m），其秩为m，B是矩阵A中的一个m×m阶的满秩子矩阵，称B是线性规划问题的一个基。'
                      : 'Let A be the m×n coefficient matrix of the constraint equations (with n>m) and rank m. B is an m×m full-rank submatrix of A, called a basis of the linear programming problem.'
                    }
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-purple-600 mb-2">
                    {language === 'zh' ? '基可行解 (Basic Feasible Solution)' : 'Basic Feasible Solution'}
                  </h4>
                  <p className="text-gray-700">
                    {language === 'zh'
                      ? '满足变量非负约束条件的基解称为基可行解。'
                      : 'A basic solution that satisfies the non-negativity constraints is called a basic feasible solution.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Key Theorems */}
            <div className="bg-blue-50 rounded-lg p-6 my-6 border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                {language === 'zh' ? '几个基本定理' : 'Fundamental Theorems'}
              </h3>

              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500">
                  <h4 className="font-bold text-green-700 mb-3">
                    {language === 'zh' ? '定理1' : 'Theorem 1'}
                  </h4>
                  <p className="text-gray-800 font-semibold mb-2">
                    {language === 'zh'
                      ? '若线性规划问题存在可行解，则问题的可行域是凸集。'
                      : 'If a linear programming problem has a feasible solution, then the feasible region is a convex set.'
                    }
                  </p>
                  <p className="text-gray-600 text-sm italic">
                    {language === 'zh'
                      ? '证明：对任意两点X₁,X₂∈C，连线上的点也在C内，因此C为凸集。'
                      : 'Proof: For any two points X₁,X₂∈C, points on the line segment connecting them are also in C, hence C is convex.'
                    }
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500">
                  <h4 className="font-bold text-green-700 mb-3">
                    {language === 'zh' ? '定理2' : 'Theorem 2'}
                  </h4>
                  <p className="text-gray-800 font-semibold mb-2">
                    {language === 'zh'
                      ? '线性规划问题的基可行解X对应线性规划问题可行域（凸集）的顶点。'
                      : 'A basic feasible solution X of a linear programming problem corresponds to a vertex of the feasible region (convex set).'
                    }
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500">
                  <h4 className="font-bold text-green-700 mb-3">
                    {language === 'zh' ? '定理3' : 'Theorem 3'}
                  </h4>
                  <p className="text-gray-800 font-semibold mb-2">
                    {language === 'zh'
                      ? '若线性规划问题有最优解，一定存在一个基可行解是最优解。'
                      : 'If a linear programming problem has an optimal solution, there must exist a basic feasible solution that is optimal.'
                    }
                  </p>
                  <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-300">
                    <p className="text-gray-700 text-sm">
                      {language === 'zh'
                        ? '💡 启示：求解线性规划问题时，只需在基可行解（顶点）中寻找最优解即可。'
                        : '💡 Insight: When solving linear programming problems, we only need to search for the optimal solution among basic feasible solutions (vertices).'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Iteration Principle */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 my-6">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-4">
                {language === 'zh' ? '单纯形法迭代原理' : 'Simplex Method Iteration Principle'}
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li className="pl-2 leading-relaxed">
                  {language === 'zh'
                    ? '先找出一个基可行解，判断其是否为最优解'
                    : 'First find a basic feasible solution and determine if it is optimal'
                  }
                </li>
                <li className="pl-2 leading-relaxed">
                  {language === 'zh'
                    ? '如为否，则转换到相邻的基可行解，并使目标函数值不断增大'
                    : 'If not, move to an adjacent basic feasible solution while increasing the objective function value'
                  }
                </li>
                <li className="pl-2 leading-relaxed">
                  {language === 'zh'
                    ? '一直找到最优解为止'
                    : 'Continue until the optimal solution is found'
                  }
                </li>
              </ol>

              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                <p className="text-gray-700">
                  {language === 'zh'
                    ? '关键步骤：从一个基可行解转换为相邻的基可行解，需要用换入变量替换基变量中的换出变量。'
                    : 'Key step: To move from one basic feasible solution to an adjacent one, we need to replace an exiting variable in the basis with an entering variable.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Simplex Method Calculation Steps */}
      {activeSection === 'calculation' && (
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-red-500 pl-4">
            {language === 'zh' ? '第四节 单纯形法计算步骤' : 'Section 4: Simplex Method Calculation Steps'}
          </h2>

          <div className="prose max-w-none">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 mb-6 border-2 border-red-200">
              <h3 className="text-2xl font-semibold text-red-700 mb-4">
                {language === 'zh' ? '计算步骤概览' : 'Calculation Steps Overview'}
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: language === 'zh' ? '求初始基可行解，列出初始单纯形表' : 'Find initial basic feasible solution, create initial simplex tableau',
                    description: language === 'zh' 
                      ? '化为标准形式，找到单位矩阵作为初始基，令非基变量为0得到初始基可行解。'
                      : 'Convert to standard form, find unit matrix as initial basis, set non-basic variables to 0 to get initial basic feasible solution.'
                  },
                  {
                    step: 2,
                    title: language === 'zh' ? '最优性检验' : 'Optimality test',
                    description: language === 'zh'
                      ? '如表中所有检验数σⱼ≤0，且基变量中不含有人工变量时，表中的基可行解即为最优解。'
                      : 'If all test numbers σⱼ≤0 in the table and no artificial variables in basic variables, the basic feasible solution is optimal.'
                  },
                  {
                    step: 3,
                    title: language === 'zh' ? '基变换' : 'Basis exchange',
                    description: language === 'zh'
                      ? '确定换入变量和换出变量，进行基变换，列出新的单纯形表。'
                      : 'Determine entering and leaving variables, perform basis exchange, create new simplex tableau.'
                  },
                  {
                    step: 4,
                    title: language === 'zh' ? '重复步骤2、3' : 'Repeat steps 2 and 3',
                    description: language === 'zh'
                      ? '一直到计算结束为止。'
                      : 'Continue until calculation is complete.'
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {item.step}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simplex Tableau Structure */}
            <div className="bg-blue-50 rounded-lg p-6 my-6 border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                {language === 'zh' ? '单纯形表结构' : 'Simplex Tableau Structure'}
              </h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-center" colSpan={2}>cⱼ→</th>
                      <th className="px-4 py-3 text-center">c₁</th>
                      <th className="px-4 py-3 text-center">c₂</th>
                      <th className="px-4 py-3 text-center">...</th>
                      <th className="px-4 py-3 text-center">cₙ</th>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 text-center">Cʙ</th>
                      <th className="px-4 py-3 text-center">{language === 'zh' ? '基' : 'Basis'}</th>
                      <th className="px-4 py-3 text-center">b</th>
                      <th className="px-4 py-3 text-center">x₁</th>
                      <th className="px-4 py-3 text-center">x₂</th>
                      <th className="px-4 py-3 text-center">...</th>
                      <th className="px-4 py-3 text-center">xₙ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-blue-50">
                      <td className="px-4 py-3 text-center">c₁</td>
                      <td className="px-4 py-3 text-center">x₁</td>
                      <td className="px-4 py-3 text-center">b₁</td>
                      <td className="px-4 py-3 text-center">1</td>
                      <td className="px-4 py-3 text-center">0</td>
                      <td className="px-4 py-3 text-center">...</td>
                      <td className="px-4 py-3 text-center">a₁ₙ</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="px-4 py-3 text-center">c₂</td>
                      <td className="px-4 py-3 text-center">x₂</td>
                      <td className="px-4 py-3 text-center">b₂</td>
                      <td className="px-4 py-3 text-center">0</td>
                      <td className="px-4 py-3 text-center">1</td>
                      <td className="px-4 py-3 text-center">...</td>
                      <td className="px-4 py-3 text-center">a₂ₙ</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="px-4 py-3 text-center">...</td>
                      <td className="px-4 py-3 text-center">...</td>
                      <td className="px-4 py-3 text-center">...</td>
                      <td className="px-4 py-3 text-center">...</td>
                      <td className="px-4 py-3 text-center">...</td>
                      <td className="px-4 py-3 text-center">...</td>
                      <td className="px-4 py-3 text-center">...</td>
                    </tr>
                    <tr className="bg-blue-100 font-semibold">
                      <td className="px-4 py-3 text-center" colSpan={2}>cⱼ - zⱼ</td>
                      <td className="px-4 py-3 text-center">-</td>
                      <td className="px-4 py-3 text-center">σ₁</td>
                      <td className="px-4 py-3 text-center">σ₂</td>
                      <td className="px-4 py-3 text-center">...</td>
                      <td className="px-4 py-3 text-center">σₙ</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold text-blue-700">{language === 'zh' ? '检验数计算：' : 'Test number calculation:'}</span>
                </p>
                <div className="font-mono text-blue-600 bg-blue-50 p-3 rounded text-sm">
                  {'\\[ \\sigma_j = c_j - z_j = c_j - \\sum_{i=1}^{m} c_i a_{ij} \\]'}
                </div>
              </div>
            </div>

            {/* Interactive Example */}
            <div className="my-8">
              <button
                onClick={() => setExpandedExample(expandedExample === 'simplex' ? null : 'simplex')}
                className="w-full flex items-center justify-between bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-red-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
                aria-expanded={expandedExample === 'simplex'}
              >
                <span className="text-lg">
                  {language === 'zh' ? '查看完整单纯形法求解示例（例5）' : 'View Complete Simplex Method Example (Example 5)'}
                </span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${expandedExample === 'simplex' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedExample === 'simplex' && (
                <div className="mt-4 p-6 bg-gray-50 rounded-lg border-2 border-red-200 animate-fadeIn">
                  <h4 className="text-xl font-bold text-red-700 mb-4">
                    {language === 'zh' ? '例5：用单纯形法求解' : 'Example 5: Solving by Simplex Method'}
                  </h4>
                  
                  <div className="bg-white p-4 rounded-lg mb-4 shadow">
                    <p className="font-semibold mb-2">{language === 'zh' ? '问题：' : 'Problem:'}</p>
                    <div className="font-mono text-sm text-gray-700">
                      max z = 2x₁ + x₂<br/>
                      s.t. 5x₂ ≤ 15<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6x₁ + 2x₂ ≤ 24<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x₁ + x₂ ≤ 5<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x₁, x₂ ≥ 0
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="font-semibold text-green-700 mb-2">
                      {language === 'zh' ? '最优解：' : 'Optimal Solution:'}
                    </p>
                    <div className="font-mono text-green-800">
                      x₁* = 7/2 = 3.5<br/>
                      x₂* = 3/2 = 1.5<br/>
                      z* = 17/2 = 8.5
                    </div>
                    <p className="text-gray-700 mt-3 text-sm">
                      {language === 'zh'
                        ? '即美佳公司每天制造3.5件家电Ⅰ，1.5件家电Ⅱ，能获利最大。'
                        : 'That is, Meijia Company should manufacture 3.5 units of appliance I and 1.5 units of appliance II daily to maximize profit.'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Key Rules */}
            <div className="bg-yellow-50 rounded-lg p-6 my-6 border-l-4 border-yellow-500">
              <h3 className="text-2xl font-semibold text-yellow-700 mb-4">
                {language === 'zh' ? '关键规则' : 'Key Rules'}
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-800 mb-1">
                    {language === 'zh' ? '换入变量的确定：' : 'Determining entering variable:'}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {'\\[ \\sigma_k = \\max\\{\\sigma_j | \\sigma_j > 0\\} \\]'}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-800 mb-1">
                    {language === 'zh' ? '换出变量的确定（最小比值规则）：' : 'Determining leaving variable (minimum ratio rule):'}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {'\\[ \\theta = \\min\\left\\{\\frac{b_i}{a_{ik}} \\mid a_{ik} > 0\\right\\} = \\frac{b_l}{a_{lk}} \\]'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DEA Analysis Section */}
      {activeSection === 'dea' && (
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-green-500 pl-4">
            {language === 'zh' ? '第六节 数据包络分析' : 'Section 6: Data Envelopment Analysis (DEA)'}
          </h2>

          <div className="prose max-w-none">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                {language === 'zh' ? '什么是DEA？' : 'What is DEA?'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'zh'
                  ? '数据包络分析（Data Envelopment Analysis, DEA）是一种基于线性规划的用于评价同类型组织工作绩效相对有效性的工具手段。这类组织例如学校、医院、银行的分支机构、超市的各营业部等，各自具有相同的投入和相同的产出。'
                  : 'Data Envelopment Analysis (DEA) is a linear programming-based tool for evaluating the relative efficiency of similar organizational units. These units, such as schools, hospitals, bank branches, or supermarket departments, have similar inputs and outputs.'
                }
              </p>
            </div>

            {/* Key Concepts */}
            <div className="bg-blue-50 rounded-lg p-6 my-6 border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                {language === 'zh' ? '核心概念' : 'Core Concepts'}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-blue-600 mb-2">
                    {language === 'zh' ? 'DMU (决策单元)' : 'DMU (Decision Making Unit)'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'zh'
                      ? '在DEA中通常称被衡量绩效的组织为决策单元（Decision Making Unit, DMU）。'
                      : 'In DEA, the organizations being evaluated are typically called Decision Making Units (DMUs).'
                    }
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-blue-600 mb-2">
                    {language === 'zh' ? 'Pareto最优' : 'Pareto Optimality'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'zh'
                      ? '不可能保持其中一项投入不变的情况下，减少另一项投入的水平，达到相同产出目标。'
                      : 'Cannot reduce one input while keeping other inputs constant to achieve the same output level.'
                    }
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-blue-600 mb-2">
                    {language === 'zh' ? '生产前沿面 (Production Frontier)' : 'Production Frontier'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'zh'
                      ? '由Pareto最优点连成的包络线，代表现有绩效水平下投入资源的最低极限。'
                      : 'The envelope line formed by Pareto optimal points, representing the minimum resource input limit under current performance levels.'
                    }
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-blue-600 mb-2">
                    {language === 'zh' ? 'DEA有效' : 'DEA Efficient'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'zh'
                      ? '处于生产前沿面上的点称为DEA有效。'
                      : 'Points on the production frontier are called DEA efficient.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* DEA Mathematical Model */}
            <div className="bg-purple-50 rounded-lg p-6 my-6 border-l-4 border-purple-500">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                {language === 'zh' ? 'DEA线性规划模型' : 'DEA Linear Programming Model'}
              </h3>
              
              <div className="bg-white p-5 rounded-lg shadow-md">
                <p className="text-gray-700 mb-4">
                  {language === 'zh'
                    ? '设有n个决策单元(j=1,...,n)，每个决策单元有相同的m项投入(i=1,...,m)和相同的s项产出(r=1,...,s)。用xᵢⱼ表示第j决策单元的第i项投入，用yᵣⱼ表示第j决策单元的第r项产出。'
                    : 'Suppose there are n decision units (j=1,...,n), each with m inputs (i=1,...,m) and s outputs (r=1,...,s). Let xᵢⱼ denote the i-th input of DMU j, and yᵣⱼ denote the r-th output of DMU j.'
                  }
                </p>

                <div className="bg-purple-50 p-4 rounded border border-purple-200">
                  <p className="font-semibold mb-2">{language === 'zh' ? '评价DMU j₀是否DEA有效的模型：' : 'Model to evaluate if DMU j₀ is DEA efficient:'}</p>
                  <div className="font-mono text-sm text-purple-700 space-y-2">
                    <div>min E</div>
                    <div className="ml-4">
                      s.t. {'\\[ \\sum_{j=1}^{n} \\lambda_j y_{rj} \\geq y_{r0} \\quad (r=1,\\ldots,s) \\]'}
                    </div>
                    <div className="ml-8">
                      {'\\[ \\sum_{j=1}^{n} \\lambda_j x_{ij} \\leq E \\cdot x_{i0} \\quad (i=1,\\ldots,m) \\]'}
                    </div>
                    <div className="ml-8">
                      {'\\[ \\sum_{j=1}^{n} \\lambda_j = 1 \\]'}
                    </div>
                    <div className="ml-8">
                      {'\\[ \\lambda_j \\geq 0 \\quad (j=1,\\ldots,n) \\]'}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded border border-green-300">
                  <p className="text-gray-700 text-sm">
                    {language === 'zh'
                      ? '✅ 当求解结果有E=1时，则j₀决策单元DEA有效；当E<1时，j₀决策单元非DEA有效。'
                      : '✅ When the solution yields E=1, DMU j₀ is DEA efficient; when E<1, DMU j₀ is not DEA efficient.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Example */}
            <div className="my-8">
              <button
                onClick={() => setExpandedExample(expandedExample === 'dea' ? null : 'dea')}
                className="w-full flex items-center justify-between bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
                aria-expanded={expandedExample === 'dea'}
              >
                <span className="text-lg">
                  {language === 'zh' ? '查看DEA实际应用案例（例8：振华银行）' : 'View DEA Application Example (Example 8: Zhenhua Bank)'}
                </span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${expandedExample === 'dea' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedExample === 'dea' && (
                <div className="mt-4 p-6 bg-gray-50 rounded-lg border-2 border-green-200 animate-fadeIn">
                  <h4 className="text-xl font-bold text-green-700 mb-4">
                    {language === 'zh' ? '例8：振华银行分理处绩效评价' : 'Example 8: Zhenhua Bank Branch Performance Evaluation'}
                  </h4>
                  
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                      <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                        <tr>
                          <th className="px-4 py-3 text-center" rowSpan={2}>{language === 'zh' ? '分理处' : 'Branch'}</th>
                          <th className="px-4 py-3 text-center" colSpan={2}>{language === 'zh' ? '投入' : 'Input'}</th>
                          <th className="px-4 py-3 text-center" colSpan={3}>{language === 'zh' ? '产出（处理笔数/月）' : 'Output (Transactions/Month)'}</th>
                        </tr>
                        <tr>
                          <th className="px-4 py-2 text-sm">{language === 'zh' ? '职员数' : 'Staff'}</th>
                          <th className="px-4 py-2 text-sm">{language === 'zh' ? '营业面积(m²)' : 'Area(m²)'}</th>
                          <th className="px-4 py-2 text-sm">{language === 'zh' ? '储蓄存取' : 'Savings'}</th>
                          <th className="px-4 py-2 text-sm">{language === 'zh' ? '贷款' : 'Loans'}</th>
                          <th className="px-4 py-2 text-sm">{language === 'zh' ? '中间业务' : 'Intermediary'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {[
                          { branch: 1, staff: 15, area: 140, savings: 1800, loans: 200, inter: 1600 },
                          { branch: 2, staff: 20, area: 130, savings: 1000, loans: 350, inter: 1000 },
                          { branch: 3, staff: 21, area: 120, savings: 800, loans: 450, inter: 1300 },
                          { branch: 4, staff: 20, area: 135, savings: 900, loans: 420, inter: 1500 }
                        ].map((row) => (
                          <tr key={row.branch} className="hover:bg-green-50 transition-colors">
                            <td className="px-4 py-3 text-center font-semibold">{language === 'zh' ? '分理处' : 'Branch'}{row.branch}</td>
                            <td className="px-4 py-3 text-center">{row.staff}</td>
                            <td className="px-4 py-3 text-center">{row.area}</td>
                            <td className="px-4 py-3 text-center">{row.savings}</td>
                            <td className="px-4 py-3 text-center">{row.loans}</td>
                            <td className="px-4 py-3 text-center">{row.inter}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="font-semibold text-green-700 mb-2">
                      {language === 'zh' ? '评价结果：' : 'Evaluation Results:'}
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>✅ {language === 'zh' ? '分理处1：E=1，DEA有效' : 'Branch 1: E=1, DEA efficient'}</li>
                      <li>❌ {language === 'zh' ? '分理处2：E=0.966，非DEA有效' : 'Branch 2: E=0.966, not DEA efficient'}</li>
                      <li>✅ {language === 'zh' ? '分理处3：E=1，DEA有效' : 'Branch 3: E=1, DEA efficient'}</li>
                      <li>✅ {language === 'zh' ? '分理处4：E=1，DEA有效' : 'Branch 4: E=1, DEA efficient'}</li>
                    </ul>
                    <p className="text-gray-600 mt-3 text-sm italic">
                      {language === 'zh'
                        ? '💡 分理处2的运行非DEA有效。若将28%的分理处1与72%的分理处3组合，其各项产出不低于分理处2的各项产出，但其投入只有分理处2的96.6%。'
                        : '💡 Branch 2&rsquo;s operation is not DEA efficient. A combination of 28% Branch 1 and 72% Branch 3 can achieve Branch 2&rsquo;s outputs with only 96.6% of Branch 2&rsquo;s inputs.'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Application Examples Section */}
      {activeSection === 'examples' && (
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-4">
            {language === 'zh' ? '第七节 其他应用例子' : 'Section 7: Other Application Examples'}
          </h2>

          <div className="prose max-w-none">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                {language === 'zh'
                  ? '应用线性规划解决经济、管理领域的实际问题，最重要的一步是建立实际问题的线性规划模型。这是一项技巧性很强的创造性工作，既要求对研究的问题有深入了解，又要求很好地掌握线性规划模型的结构特点，并具有对实际问题进行数学描述的较强的能力。'
                  : 'Applying linear programming to solve practical problems in economics and management requires building mathematical models. This is a highly creative task requiring both deep understanding of the problem and strong mathematical modeling skills.'
                }
              </p>
            </div>

            {/* Application Categories */}
            <div className="grid md:grid-cols-2 gap-6 my-8">
              {[
                {
                  title: language === 'zh' ? '混合配料问题' : 'Blending Problems',
                  icon: '🧪',
                  description: language === 'zh' 
                    ? '如糖果制造、饲料配方等，在满足成分要求下使成本最小。'
                    : 'Such as candy production, feed formulation, minimizing costs while meeting composition requirements.',
                  example: language === 'zh' ? '例9：糖果厂混合配料' : 'Example 9: Candy Factory Blending'
                },
                {
                  title: language === 'zh' ? '产品计划问题' : 'Production Planning',
                  icon: '🏭',
                  description: language === 'zh'
                    ? '确定多种产品的生产数量，在设备和工序限制下使利润最大。'
                    : 'Determining production quantities for multiple products to maximize profit under equipment and process constraints.',
                  example: language === 'zh' ? '例10：某厂产品计划' : 'Example 10: Factory Production Plan'
                },
                {
                  title: language === 'zh' ? '人员安排问题' : 'Staffing Problems',
                  icon: '👥',
                  description: language === 'zh'
                    ? '如邮局、公交公司的职员排班，满足各时段需求下使人员总数最少。'
                    : 'Such as post office or bus company staff scheduling, minimizing total staff while meeting time-period demands.',
                  example: language === 'zh' ? '例11：邮局职员排班' : 'Example 11: Post Office Scheduling'
                },
                {
                  title: language === 'zh' ? '运输问题' : 'Transportation Problems',
                  icon: '🚚',
                  description: language === 'zh'
                    ? '货物运输、仓库选址等，在容量约束下使运输成本或费用最小。'
                    : 'Freight transportation, warehouse location, minimizing transport costs under capacity constraints.',
                  example: language === 'zh' ? '例15：货轮装载问题' : 'Example 15: Cargo Ship Loading'
                },
                {
                  title: language === 'zh' ? '生产存储问题' : 'Production-Inventory',
                  icon: '📦',
                  description: language === 'zh'
                    ? '平衡生产能力与需求变化，考虑库存成本使总成本最小。'
                    : 'Balancing production capacity with demand fluctuations, considering inventory costs to minimize total cost.',
                  example: language === 'zh' ? '例17：生产存储计划' : 'Example 17: Production-Inventory Plan'
                },
                {
                  title: language === 'zh' ? '投资组合问题' : 'Portfolio Optimization',
                  icon: '💰',
                  description: language === 'zh'
                    ? '资金投资决策，在风险约束下使收益最大或使资金需求最少。'
                    : 'Investment decisions, maximizing returns or minimizing capital requirements under risk constraints.',
                  example: language === 'zh' ? '例18：宏银公司投资' : 'Example 18: Hongyin Investment'
                }
              ].map((app, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{app.icon}</div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{app.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{app.description}</p>
                      <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {app.example}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Modeling Principles */}
            <div className="bg-blue-50 rounded-lg p-6 my-6 border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                {language === 'zh' ? '建模关键原则' : 'Key Modeling Principles'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <p className="text-gray-700 pt-1">
                    {language === 'zh'
                      ? '目标能用某种效益指标度量大小，并能用线性函数描述目标的要求'
                      : 'The objective can be measured by some efficiency indicator and described by a linear function'
                    }
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <p className="text-gray-700 pt-1">
                    {language === 'zh'
                      ? '为达到这个目标存在多种方案'
                      : 'Multiple alternative plans exist to achieve this objective'
                    }
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <p className="text-gray-700 pt-1">
                    {language === 'zh'
                      ? '要达到的目标是在一定约束条件下实现的，这些条件可用线性等式或不等式描述'
                      : 'The objective is achieved under certain constraints that can be described by linear equations or inequalities'
                    }
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <p className="text-gray-700 pt-1">
                    {language === 'zh'
                      ? '决策变量取值是连续的，可以是小数、分数或任意实数'
                      : 'Decision variable values are continuous and can be decimals, fractions, or any real numbers'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Practice Problems Teaser */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 my-6 border-2 border-purple-300">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
                <span>📝</span>
                {language === 'zh' ? '习题练习' : 'Practice Problems'}
              </h3>
              <p className="text-gray-700 mb-4">
                {language === 'zh'
                  ? '本章末尾提供了丰富的练习题，涵盖图解法、单纯形法、DEA分析等各个主题。通过练习可以：'
                  : 'The end of this chapter provides abundant practice problems covering graphical methods, simplex method, DEA analysis, and more. Through practice you can:'
                }
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>{language === 'zh' ? '巩固理论知识，加深对线性规划原理的理解' : 'Consolidate theoretical knowledge and deepen understanding of LP principles'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>{language === 'zh' ? '掌握单纯形法的计算步骤和技巧' : 'Master calculation steps and techniques of the simplex method'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>{language === 'zh' ? '学会将实际问题转化为线性规划模型' : 'Learn to transform real-world problems into LP models'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>{language === 'zh' ? '培养分析和解决优化问题的能力' : 'Develop ability to analyze and solve optimization problems'}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </main>
  </div>

  {/* Footer */}
  <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
    <div className="container mx-auto px-4 text-center">
      <p className="text-lg mb-2">
        {language === 'zh' 
          ? '《运筹学教程》第一章 - 线性规划及单纯形法' 
          : 'Operations Research Tutorial - Chapter 1: Linear Programming and Simplex Method'}
      </p>
      <p className="text-gray-400 text-sm">
        {language === 'zh'
          ? '本教程为交互式学习材料，包含完整的数学公式、示例和练习题'
          : 'This interactive tutorial includes complete mathematical formulas, examples, and practice problems'}
      </p>
    </div>
  </footer>

  {/* Scroll to Top Button */}
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 z-40"
    aria-label="Scroll to top"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>

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
      animation: fadeIn 0.3s ease-in-out;
    }
  `}</style>
</div>
)
}