"use client"

import React, { useState } from 'react'

interface QuizQuestion {
  id: number
  question: string
  questionEn: string
  options: string[]
  optionsEn: string[]
  correctAnswer: number
  explanation: string
  explanationEn: string
}

const DerivativesAndDifferentials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'zh' | 'en'>('zh')
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  // Custom SVG Chart Component
  const TangentLineChart = () => {
    const width = 600
    const height = 400
    const padding = 40

    // Generate points for y = x²
    const curvePoints: Array<{ x: number; y: number }> = []
    for (let i = -25; i <= 25; i++) {
      const x = i / 5
      const y = x * x
      curvePoints.push({ x, y })
    }

    // Transform coordinates to SVG space
    const xScale = (x: number) => ((x + 5) / 10) * (width - 2 * padding) + padding
    const yScale = (y: number) => height - padding - (y / 25) * (height - 2 * padding)

    // Generate path for curve
    const curvePath = curvePoints
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.x)} ${yScale(p.y)}`)
      .join(' ')

    // Tangent line: y = 2(x - 1) + 1 = 2x - 1
    const tangentPoints = [
      { x: -3, y: 2 * (-3) - 1 },
      { x: 5, y: 2 * 5 - 1 }
    ]
    const tangentPath = `M ${xScale(tangentPoints[0].x)} ${yScale(tangentPoints[0].y)} L ${xScale(tangentPoints[1].x)} ${yScale(tangentPoints[1].y)}`

    return (
      <div className="w-full overflow-x-auto bg-white p-4 rounded-lg">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="max-w-full">
          {/* Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#grid)" />

          {/* Axes */}
          <line
            x1={padding}
            y1={yScale(0)}
            x2={width - padding}
            y2={yScale(0)}
            stroke="#374151"
            strokeWidth="2"
          />
          <line
            x1={xScale(0)}
            y1={padding}
            x2={xScale(0)}
            y2={height - padding}
            stroke="#374151"
            strokeWidth="2"
          />

          {/* Axis labels */}
          <text x={width - padding + 10} y={yScale(0) + 5} fontSize="14" fill="#374151">
            x
          </text>
          <text x={xScale(0) + 5} y={padding - 10} fontSize="14" fill="#374151">
            y
          </text>

          {/* Grid labels */}
          {[-4, -2, 2, 4].map(val => (
            <g key={`x-${val}`}>
              <text x={xScale(val)} y={yScale(0) + 20} fontSize="12" fill="#6b7280" textAnchor="middle">
                {val}
              </text>
            </g>
          ))}
          {[5, 10, 15, 20].map(val => (
            <g key={`y-${val}`}>
              <text x={xScale(0) - 10} y={yScale(val) + 5} fontSize="12" fill="#6b7280" textAnchor="end">
                {val}
              </text>
            </g>
          ))}

          {/* Curve y = x² */}
          <path d={curvePath} fill="none" stroke="#3b82f6" strokeWidth="3" />

          {/* Tangent line */}
          <path d={tangentPath} fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />

          {/* Point (1, 1) */}
          <circle cx={xScale(1)} cy={yScale(1)} r="5" fill="#ef4444" />
          <text x={xScale(1) + 10} y={yScale(1) - 10} fontSize="14" fill="#ef4444" fontWeight="bold">
            (1, 1)
          </text>

          {/* Legend */}
          <g transform={`translate(${width - 180}, 60)`}>
            <rect x="0" y="0" width="160" height="60" fill="white" stroke="#d1d5db" rx="5" />
            <line x1="10" y1="20" x2="40" y2="20" stroke="#3b82f6" strokeWidth="3" />
            <text x="45" y="25" fontSize="12" fill="#374151">
              {activeTab === 'zh' ? '曲线 y = x²' : 'Curve y = x²'}
            </text>
            <line x1="10" y1="40" x2="40" y2="40" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
            <text x="45" y="45" fontSize="12" fill="#374151">
              {activeTab === 'zh' ? '切线 y = 2x - 1' : 'Tangent y = 2x - 1'}
            </text>
          </g>
        </svg>
      </div>
    )
  }

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "设 f(x) = (2/3)x³ (x ≤ 1) 和 f(x) = x³ (x > 1)，则 f&rsquo;(1) = ?",
      questionEn: "If f(x) = (2/3)x³ (x ≤ 1) and f(x) = x³ (x > 1), then f&rsquo;(1) = ?",
      options: [
        "左、右导数都存在",
        "左导数存在但右导数不存在",
        "左导数不存在但右导数存在",
        "左、右导数都不存在"
      ],
      optionsEn: [
        "Both left and right derivatives exist",
        "Left derivative exists but right derivative does not",
        "Left derivative does not exist but right derivative exists",
        "Neither left nor right derivative exists"
      ],
      correctAnswer: 1,
      explanation: "左导数 f&rsquo;₋(1) = 2，右导数 f&rsquo;₊(1) = ∞，所以左导数存在但右导数不存在",
      explanationEn: "Left derivative f&rsquo;₋(1) = 2, right derivative f&rsquo;₊(1) = ∞, so left derivative exists but right derivative does not"
    },
    {
      id: 2,
      question: "函数 f(x) 在点 x₀ 可导的充分必要条件是什么？",
      questionEn: "What is the necessary and sufficient condition for f(x) to be differentiable at x₀?",
      options: [
        "f(x) 在 x₀ 连续",
        "左导数和右导数都存在",
        "左导数和右导数都存在且相等",
        "f(x) 在 x₀ 的某个邻域内有定义"
      ],
      optionsEn: [
        "f(x) is continuous at x₀",
        "Both left and right derivatives exist",
        "Both left and right derivatives exist and are equal",
        "f(x) is defined in some neighborhood of x₀"
      ],
      correctAnswer: 2,
      explanation: "函数在某点可导的充要条件是：该点的左导数和右导数都存在且相等",
      explanationEn: "The necessary and sufficient condition for differentiability is that both left and right derivatives exist and are equal"
    },
    {
      id: 3,
      question: "若 y = sin(3x)，则 y⁽ⁿ⁾ = ?",
      questionEn: "If y = sin(3x), then y⁽ⁿ⁾ = ?",
      options: [
        "3ⁿ sin(3x + nπ/2)",
        "3ⁿ cos(3x + nπ/2)",
        "sin(3x + nπ/2)",
        "nⁿ sin(3x + nπ/2)"
      ],
      optionsEn: [
        "3ⁿ sin(3x + nπ/2)",
        "3ⁿ cos(3x + nπ/2)",
        "sin(3x + nπ/2)",
        "nⁿ sin(3x + nπ/2)"
      ],
      correctAnswer: 0,
      explanation: "根据高阶导数公式：(sin(ax))⁽ⁿ⁾ = aⁿ sin(ax + nπ/2)",
      explanationEn: "According to the higher-order derivative formula: (sin(ax))⁽ⁿ⁾ = aⁿ sin(ax + nπ/2)"
    }
  ]

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleSubmitQuiz = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setSelectedAnswers({})
    setShowResults(false)
  }

  const calculateScore = () => {
    let correct = 0
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {activeTab === 'zh' ? '导数与微分' : 'Derivatives and Differentials'}
          </h1>
          <p className="text-center text-lg md:text-xl opacity-90">
            {activeTab === 'zh' 
              ? '高等数学基础篇 - 第二章' 
              : 'Advanced Mathematics Foundation - Chapter 2'}
          </p>
          
          {/* Language Toggle */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setActiveTab('zh')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === 'zh'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-blue-500 text-white hover:bg-blue-400'
              }`}
              aria-label="Switch to Chinese"
            >
              中文
            </button>
            <button
              onClick={() => setActiveTab('en')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === 'en'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-purple-500 text-white hover:bg-purple-400'
              }`}
              aria-label="Switch to English"
            >
              English
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Introduction Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8" aria-labelledby="introduction">
          <h2 id="introduction" className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2">
            {activeTab === 'zh' ? '📚 课程导言' : '📚 Introduction'}
          </h2>
          
          {activeTab === 'zh' ? (
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                导数是微积分中最核心的概念之一，它描述了函数在某一点处的瞬时变化率。
                本章将系统学习导数的概念、计算方法及其应用。
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-xl mb-3 text-blue-800">核心内容包括：</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>导数的定义与几何意义</li>
                  <li>导数的基本公式与运算法则</li>
                  <li>复合函数、隐函数与参数方程求导</li>
                  <li>高阶导数的概念与计算</li>
                  <li>微分的概念及其应用</li>
                  <li>导数在几何与物理中的应用</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                The derivative is one of the most fundamental concepts in calculus, describing the instantaneous rate of change of a function at a given point.
                This chapter systematically covers the concept, calculation methods, and applications of derivatives.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-xl mb-3 text-purple-800">Core Topics Include:</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Definition and Geometric Meaning of Derivatives</li>
                  <li>Basic Derivative Formulas and Rules</li>
                  <li>Derivatives of Composite, Implicit, and Parametric Functions</li>
                  <li>Concept and Calculation of Higher-Order Derivatives</li>
                  <li>Concept of Differentials and Applications</li>
                  <li>Applications in Geometry and Physics</li>
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Definition Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8" aria-labelledby="definitions">
          <h2 id="definitions" className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-green-500 pb-2">
            {activeTab === 'zh' ? '📖 基本定义' : '📖 Basic Definitions'}
          </h2>

          <div className="space-y-6">
            {/* Derivative Definition */}
            <article className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-800">
                {activeTab === 'zh' ? '1. 导数的定义' : '1. Definition of Derivative'}
              </h3>
              {activeTab === 'zh' ? (
                <div className="space-y-3">
                  <p>设函数 y = f(x) 在点 x₀ 的某个邻域内有定义，如果极限</p>
                  <div className="bg-white p-4 rounded border-l-4 border-green-500 font-mono text-center">
                    lim<sub>Δx→0</sub> [f(x₀ + Δx) - f(x₀)] / Δx
                  </div>
                  <p>存在，则称 f(x) 在点 x₀ 处<strong>可导</strong>，并称此极限值为 f(x) 在点 x₀ 处的导数，记为 f&rsquo;(x₀) 或 dy/dx|<sub>x=x₀</sub></p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p>If function y = f(x) is defined in some neighborhood of point x₀, and if the limit</p>
                  <div className="bg-white p-4 rounded border-l-4 border-green-500 font-mono text-center">
                    lim<sub>Δx→0</sub> [f(x₀ + Δx) - f(x₀)] / Δx
                  </div>
                  <p>exists, then f(x) is said to be <strong>differentiable</strong> at x₀, and this limit value is called the derivative of f(x) at x₀, denoted as f&rsquo;(x₀) or dy/dx|<sub>x=x₀</sub></p>
                </div>
              )}
            </article>

            {/* Left and Right Derivatives */}
            <article className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-4 text-yellow-800">
                {activeTab === 'zh' ? '2. 左导数与右导数' : '2. Left and Right Derivatives'}
              </h3>
              {activeTab === 'zh' ? (
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-2">左导数 f&rsquo;₋(x₀):</p>
                    <div className="bg-white p-3 rounded border-l-4 border-yellow-500 font-mono">
                      lim<sub>Δx→0⁻</sub> [f(x₀ + Δx) - f(x₀)] / Δx
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">右导数 f&rsquo;₊(x₀):</p>
                    <div className="bg-white p-3 rounded border-l-4 border-yellow-500 font-mono">
                      lim<sub>Δx→0⁺</sub> [f(x₀ + Δx) - f(x₀)] / Δx
                    </div>
                  </div>
                  <p className="mt-4 p-3 bg-yellow-100 rounded">
                    <strong>重要定理：</strong>f(x) 在点 x₀ 可导的充要条件是左导数与右导数都存在且相等。
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-2">Left Derivative f&rsquo;₋(x₀):</p>
                    <div className="bg-white p-3 rounded border-l-4 border-yellow-500 font-mono">
                      lim<sub>Δx→0⁻</sub> [f(x₀ + Δx) - f(x₀)] / Δx
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Right Derivative f&rsquo;₊(x₀):</p>
                    <div className="bg-white p-3 rounded border-l-4 border-yellow-500 font-mono">
                      lim<sub>Δx→0⁺</sub> [f(x₀ + Δx) - f(x₀)] / Δx
                    </div>
                  </div>
                  <p className="mt-4 p-3 bg-yellow-100 rounded">
                    <strong>Important Theorem:</strong> f(x) is differentiable at x₀ if and only if both left and right derivatives exist and are equal.
                  </p>
                </div>
              )}
            </article>

            {/* Continuity and Differentiability */}
            <article className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-4 text-purple-800">
                {activeTab === 'zh' ? '3. 连续性与可导性的关系' : '3. Relationship Between Continuity and Differentiability'}
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-lg mb-2 text-purple-700">
                    {activeTab === 'zh' ? '定理：' : 'Theorem:'}
                  </p>
                  <p className="text-gray-700">
                    {activeTab === 'zh' 
                      ? '若函数 f(x) 在点 x₀ 可导，则 f(x) 在点 x₀ 必连续。'
                      : 'If function f(x) is differentiable at x₀, then f(x) must be continuous at x₀.'}
                  </p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <p className="font-semibold mb-2 text-purple-800">
                    {activeTab === 'zh' ? '⚠️ 注意：' : '⚠️ Note:'}
                  </p>
                  <p className="text-gray-700">
                    {activeTab === 'zh'
                      ? '反过来不成立！连续不一定可导。例如：f(x) = |x| 在 x = 0 处连续但不可导。'
                      : 'The converse is not true! Continuity does not imply differentiability. Example: f(x) = |x| is continuous but not differentiable at x = 0.'}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Basic Derivative Formulas */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8" aria-labelledby="formulas">
          <h2 id="formulas" className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-red-500 pb-2">
            {activeTab === 'zh' ? '🧮 基本求导公式' : '🧮 Basic Derivative Formulas'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { formula: "(C)' = 0", desc: activeTab === 'zh' ? '常数' : 'Constant' },
              { formula: "(x^a)' = ax^(a-1)", desc: activeTab === 'zh' ? '幂函数' : 'Power function' },
              { formula: "(a^x)' = a^x ln(a)", desc: activeTab === 'zh' ? '指数函数' : 'Exponential' },
              { formula: "(e^x)' = e^x", desc: activeTab === 'zh' ? '自然指数' : 'Natural exponential' },
              { formula: "(log_a x)' = 1/(x ln a)", desc: activeTab === 'zh' ? '对数函数' : 'Logarithm' },
              { formula: "(ln |x|)' = 1/x", desc: activeTab === 'zh' ? '自然对数' : 'Natural log' },
              { formula: "(sin x)' = cos x", desc: activeTab === 'zh' ? '正弦' : 'Sine' },
              { formula: "(cos x)' = -sin x", desc: activeTab === 'zh' ? '余弦' : 'Cosine' },
              { formula: "(tan x)' = sec²x", desc: activeTab === 'zh' ? '正切' : 'Tangent' },
              { formula: "(cot x)' = -csc²x", desc: activeTab === 'zh' ? '余切' : 'Cotangent' },
              { formula: "(sec x)' = sec x tan x", desc: activeTab === 'zh' ? '正割' : 'Secant' },
              { formula: "(csc x)' = -csc x cot x", desc: activeTab === 'zh' ? '余割' : 'Cosecant' },
              { formula: "(arcsin x)' = 1/√(1-x²)", desc: activeTab === 'zh' ? '反正弦' : 'Arcsine' },
              { formula: "(arccos x)' = -1/√(1-x²)", desc: activeTab === 'zh' ? '反余弦' : 'Arccosine' },
              { formula: "(arctan x)' = 1/(1+x²)", desc: activeTab === 'zh' ? '反正切' : 'Arctangent' },
              { formula: "(arccot x)' = -1/(1+x²)", desc: activeTab === 'zh' ? '反余切' : 'Arccotangent' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border border-red-200 hover:shadow-md transition-shadow"
              >
                <div className="font-mono text-lg mb-2 text-center text-red-800 font-bold">
                  {item.formula}
                </div>
                <div className="text-center text-gray-600 text-sm">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Derivative Rules */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8" aria-labelledby="rules">
          <h2 id="rules" className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-indigo-500 pb-2">
            {activeTab === 'zh' ? '⚙️ 求导法则' : '⚙️ Derivative Rules'}
          </h2>

          <div className="space-y-6">
            <article className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
              <h3 className="text-xl font-bold mb-4 text-indigo-800">
                {activeTab === 'zh' ? '1. 四则运算法则' : '1. Arithmetic Operation Rules'}
              </h3>
              <div className="space-y-3 font-mono bg-white p-4 rounded">
                <div>(u ± v)&rsquo; = u&rsquo; ± v&rsquo;</div>
                <div>(uv)&rsquo; = u&rsquo;v + uv&rsquo;</div>
                <div>(u/v)&rsquo; = (u&rsquo;v - uv&rsquo;) / v² (v ≠ 0)</div>
              </div>
            </article>

            <article className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold mb-4 text-green-800">
                {activeTab === 'zh' ? '2. 复合函数求导法（链式法则）' : '2. Chain Rule for Composite Functions'}
              </h3>
              <div className="space-y-3">
                <p>
                  {activeTab === 'zh'
                    ? '设 u = φ(x) 在点 x 可导，y = f(u) 在对应点 u 可导，则复合函数 y = f[φ(x)] 在点 x 可导，且：'
                    : 'If u = φ(x) is differentiable at x, and y = f(u) is differentiable at corresponding u, then the composite function y = f[φ(x)] is differentiable at x, and:'}
                </p>
                <div className="font-mono bg-white p-4 rounded text-center text-lg">
                  dy/dx = dy/du · du/dx = f&rsquo;(u)φ&rsquo;(x)
                </div>
              </div>
            </article>

            <article className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-4 text-yellow-800">
                {activeTab === 'zh' ? '3. 反函数求导法' : '3. Inverse Function Derivative Rule'}
              </h3>
              <div className="space-y-3">
                <p>
                  {activeTab === 'zh'
                    ? '若 y = f(x) 在某区间内单调且 f&rsquo;(x) ≠ 0，则其反函数 x = φ(y) 也可导，且：'
                    : 'If y = f(x) is monotonic in an interval and f&rsquo;(x) ≠ 0, then its inverse function x = φ(y) is also differentiable, and:'}
                </p>
                <div className="font-mono bg-white p-4 rounded text-center text-lg">
                  dx/dy = 1/(dy/dx)
                </div>
              </div>
            </article>

            <article className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-bold mb-4 text-purple-800">
                {activeTab === 'zh' ? '4. 参数方程求导' : '4. Parametric Equations Derivative'}
              </h3>
              <div className="space-y-3">
                <p>
                  {activeTab === 'zh'
                    ? '设 y = y(x) 由参数方程 x = φ(t), y = ψ(t) 确定，若 φ(t) 和 ψ(t) 都可导且 φ&rsquo;(t) ≠ 0，则：'
                    : 'If y = y(x) is defined by parametric equations x = φ(t), y = ψ(t), and both φ(t) and ψ(t) are differentiable with φ&rsquo;(t) ≠ 0, then:'}
                </p>
                <div className="font-mono bg-white p-4 rounded space-y-2">
                  <div className="text-center">dy/dx = (dy/dt)/(dx/dt) = ψ&rsquo;(t)/φ&rsquo;(t)</div>
                  <div className="text-center text-sm text-gray-600">
                    d²y/dx² = d/dt(dy/dx) · 1/(dx/dt)
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Visualization Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8" aria-labelledby="visualization">
          <h2 id="visualization" className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-cyan-500 pb-2">
            {activeTab === 'zh' ? '📊 几何意义可视化' : '📊 Geometric Visualization'}
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              {activeTab === 'zh'
                ? '导数的几何意义：函数 f(x) 在点 x₀ 处的导数 f&rsquo;(x₀) 表示曲线 y = f(x) 在点 (x₀, f(x₀)) 处切线的斜率。'
                : 'Geometric meaning of derivative: The derivative f&rsquo;(x₀) represents the slope of the tangent line to the curve y = f(x) at point (x₀, f(x₀)).'}
            </p>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-cyan-800 text-center">
                {activeTab === 'zh' ? '示例：y = x² 在点 (1, 1) 处的切线' : 'Example: Tangent line to y = x² at point (1, 1)'}
              </h3>
              <TangentLineChart />
              <div className="mt-4 bg-white p-4 rounded">
                <p className="font-semibold mb-2">
                  {activeTab === 'zh' ? '计算过程：' : 'Calculation:'}
                </p>
                <div className="font-mono text-sm space-y-1">
                  <div>f(x) = x², f&rsquo;(x) = 2x</div>
                  <div>f&rsquo;(1) = 2(1) = 2 {activeTab === 'zh' ? '（斜率）' : '(slope)'}</div>
                  <div>{activeTab === 'zh' ? '切线方程：' : 'Tangent equation:'} y - 1 = 2(x - 1)</div>
                  <div>∴ y = 2x - 1</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Quiz Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8" aria-labelledby="quiz">
          <h2 id="quiz" className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-pink-500 pb-2">
            {activeTab === 'zh' ? '🎯 互动测验' : '🎯 Interactive Quiz'}
          </h2>

          <div className="space-y-6">
            {quizQuestions.map((q, qIndex) => (
              <article
                key={q.id}
                className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-lg border-2 border-pink-200"
              >
                <h3 className="text-lg font-bold mb-4 text-gray-800">
                  {activeTab === 'zh' ? `问题 ${qIndex + 1}:` : `Question ${qIndex + 1}:`} {activeTab === 'zh' ? q.question : q.questionEn}
                </h3>
                
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() => handleAnswerSelect(q.id, oIndex)}
                      disabled={showResults}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showResults
                          ? oIndex === q.correctAnswer
                            ? 'bg-green-100 border-green-500 font-semibold'
                            : selectedAnswers[q.id] === oIndex
                            ? 'bg-red-100 border-red-500'
                            : 'bg-gray-50 border-gray-200'
                          : selectedAnswers[q.id] === oIndex
                          ? 'bg-blue-100 border-blue-500'
                          : 'bg-white border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                      aria-label={`Option ${String.fromCharCode(65 + oIndex)}`}
                    >
                      <span className="font-semibold mr-2">({String.fromCharCode(65 + oIndex)})</span>
                      {activeTab === 'zh' ? option : q.optionsEn[oIndex]}
                    </button>
                  ))}
                </div>

                {showResults && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold mb-2 text-blue-800">
                      {activeTab === 'zh' ? '解析：' : 'Explanation:'}
                    </p>
                    <p className="text-gray-700">
                      {activeTab === 'zh' ? q.explanation : q.explanationEn}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {!showResults ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Submit quiz"
              >
                {activeTab === 'zh' ? '提交答案' : 'Submit Answers'}
              </button>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold text-gray-800">
                  {activeTab === 'zh' ? '得分：' : 'Score:'} {calculateScore()}/{quizQuestions.length}
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition-all"
                  aria-label="Retry quiz"
                >
                  {activeTab === 'zh' ? '重新测试' : 'Retry Quiz'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Key Examples Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8" aria-labelledby="examples">
          <h2 id="examples" className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-orange-500 pb-2">
            {activeTab === 'zh' ? '💡 典型例题' : '💡 Key Examples'}
          </h2>

          <div className="space-y-6">
            <article className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-bold mb-4 text-orange-800">
                {activeTab === 'zh' ? '例题 1：求 y = sin(3x) 的 n 阶导数' : 'Example 1: Find the nth derivative of y = sin(3x)'}
              </h3>
              <div className="space-y-3 bg-white p-4 rounded">
                <p className="font-semibold">{activeTab === 'zh' ? '解：' : 'Solution:'}</p>
                <div className="font-mono space-y-2 text-sm">
                  <div>y&rsquo; = 3cos(3x) = 3sin(3x + π/2)</div>
                  <div>y&rsquo;&rsquo; = 3²cos(3x + π/2) = 3²sin(3x + 2·π/2)</div>
                  <div>y&rsquo;&rsquo;&rsquo; = 3³cos(3x + 2·π/2) = 3³sin(3x + 3·π/2)</div>
                  <div className="text-green-700 font-bold">∴ y⁽ⁿ⁾ = 3ⁿsin(3x + n·π/2)</div>
                </div>
              </div>
            </article>

            <article className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-4 text-blue-800">
                {activeTab === 'zh' ? '例题 2：隐函数求导' : 'Example 2: Implicit Differentiation'}
              </h3>
              <div className="space-y-3 bg-white p-4 rounded">
                <p>{activeTab === 'zh' ? '求由方程 x² + xy + y³ = 3 确定的隐函数 y = y(x) 的导数' : 'Find dy/dx for the implicit function defined by x² + xy + y³ = 3'}</p>
                <p className="font-semibold">{activeTab === 'zh' ? '解：' : 'Solution:'}</p>
                <div className="font-mono space-y-2 text-sm">
                  <div>{activeTab === 'zh' ? '对 x 求导：' : 'Differentiate with respect to x:'}</div>
                  <div>2x + y + x(dy/dx) + 3y²(dy/dx) = 0</div>
                  <div>{activeTab === 'zh' ? '整理得：' : 'Rearranging:'}</div>
                  <div className="text-green-700 font-bold">dy/dx = -(2x + y)/(x + 3y²)</div>
                </div>
              </div>
            </article>

            <article className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-bold mb-4 text-purple-800">
                {activeTab === 'zh' ? '例题 3：参数方程求导' : 'Example 3: Parametric Derivative'}
              </h3>
              <div className="space-y-3 bg-white p-4 rounded">
                <p>{activeTab === 'zh' ? '设 x = √(t² + 1), y = ln(t + √(t² + 1))，求 d²y/dx²|ₜ₌₁' : 'Given x = √(t² + 1), y = ln(t + √(t² + 1)), find d²y/dx²|ₜ₌₁'}</p>
                <p className="font-semibold">{activeTab === 'zh' ? '解：' : 'Solution:'}</p>
                <div className="font-mono space-y-2 text-sm">
                  <div>dx/dt = t/√(t² + 1)</div>
                  <div>dy/dt = 1/√(t² + 1)</div>
                  <div>dy/dx = (dy/dt)/(dx/dt) = 1/t</div>
                  <div>d²y/dx² = d/dt(1/t) · dt/dx = -1/t² · √(t² + 1)/t</div>
                  <div>{activeTab === 'zh' ? '当 t = 1 时：' : 'When t = 1:'}</div>
                  <div className="text-green-700 font-bold">d²y/dx²|ₜ₌₁ = -√2</div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Applications Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8" aria-labelledby="applications">
          <h2 id="applications" className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-teal-500 pb-2">
            {activeTab === 'zh' ? '🔬 导数的应用' : '🔬 Applications of Derivatives'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <article className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-lg border-2 border-teal-200">
              <h3 className="text-xl font-bold mb-4 text-teal-800 flex items-center">
                <span className="text-2xl mr-2">📐</span>
                {activeTab === 'zh' ? '几何应用' : 'Geometric Applications'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  {activeTab === 'zh' ? '求曲线的切线和法线方程' : 'Finding tangent and normal lines'}
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  {activeTab === 'zh' ? '曲线的单调性分析' : 'Analyzing curve monotonicity'}
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  {activeTab === 'zh' ? '求函数的极值和最值' : 'Finding extrema and maximum/minimum values'}
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  {activeTab === 'zh' ? '曲线的凹凸性和拐点' : 'Concavity and inflection points'}
                </li>
              </ul>
            </article>

            <article className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-800 flex items-center">
                <span className="text-2xl mr-2">⚡</span>
                {activeTab === 'zh' ? '物理应用' : 'Physics Applications'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {activeTab === 'zh' ? '瞬时速度：v(t) = s&rsquo;(t)' : 'Instantaneous velocity: v(t) = s&rsquo;(t)'}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {activeTab === 'zh' ? '瞬时加速度：a(t) = v&rsquo;(t) = s&rsquo;&rsquo;(t)' : 'Instantaneous acceleration: a(t) = v&rsquo;(t) = s&rsquo;&rsquo;(t)'}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {activeTab === 'zh' ? '变化率问题' : 'Rate of change problems'}
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {activeTab === 'zh' ? '相关变化率' : 'Related rates'}
                </li>
              </ul>
            </article>

            <article className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-lg border-2 border-pink-200">
              <h3 className="text-xl font-bold mb-4 text-pink-800 flex items-center">
                <span className="text-2xl mr-2">💰</span>
                {activeTab === 'zh' ? '经济应用' : 'Economics Applications'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  {activeTab === 'zh' ? '边际成本、边际收益' : 'Marginal cost and revenue'}
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  {activeTab === 'zh' ? '弹性分析' : 'Elasticity analysis'}
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  {activeTab === 'zh' ? '最优化问题' : 'Optimization problems'}
                </li>
              </ul>
            </article>

            <article className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-4 text-yellow-800 flex items-center">
                <span className="text-2xl mr-2">🔧</span>
                {activeTab === 'zh' ? '工程应用' : 'Engineering Applications'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  {activeTab === 'zh' ? '信号处理与滤波' : 'Signal processing and filtering'}
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  {activeTab === 'zh' ? '控制系统设计' : 'Control system design'}
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  {activeTab === 'zh' ? '误差分析' : 'Error analysis'}
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* Summary Section */}
        <section className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-xl shadow-lg p-8 mb-8" aria-labelledby="summary">
          <h2 id="summary" className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {activeTab === 'zh' ? '📝 章节总结' : '📝 Chapter Summary'}
          </h2>

          <div className="bg-white rounded-lg p-6 shadow-inner">
            {activeTab === 'zh' ? (
              <div className="space-y-4 text-gray-700">
                <p className="text-lg font-semibold text-indigo-800">
                  本章核心要点：
                </p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                  <li>
                    <strong>导数定义</strong>：理解导数的极限定义，掌握左导数和右导数的概念，理解可导与连续的关系。
                  </li>
                  <li>
                    <strong>基本公式</strong>：熟记16个基本初等函数的导数公式。
                  </li>
                  <li>
                    <strong>求导法则</strong>：掌握四则运算、复合函数、反函数、隐函数和参数方程的求导方法。
                  </li>
                  <li>
                    <strong>高阶导数</strong>：理解高阶导数的定义，掌握常见函数的n阶导数公式。
                  </li>
                  <li>
                    <strong>微分概念</strong>：理解微分的定义，掌握微分的计算和应用。
                  </li>
                  <li>
                    <strong>几何意义</strong>：深刻理解导数作为切线斜率的几何意义。
                  </li>
                  <li>
                    <strong>实际应用</strong>：能够运用导数解决几何、物理、经济等实际问题。
                  </li>
                </ol>
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                  <p className="font-semibold text-indigo-800 mb-2">学习建议：</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>多做练习题，熟练掌握各种求导技巧</li>
                    <li>注意特殊点（如分段函数连接点）的可导性判断</li>
                    <li>重视导数的几何和物理意义，培养直觉理解</li>
                    <li>系统总结常见函数的高阶导数规律</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-gray-700">
                <p className="text-lg font-semibold text-purple-800">
                  Key Points of This Chapter:
                </p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                  <li>
                    <strong>Derivative Definition</strong>: Understand the limit definition of derivatives, master left and right derivatives, and understand the relationship between differentiability and continuity.
                  </li>
                  <li>
                    <strong>Basic Formulas</strong>: Memorize the derivative formulas of 16 basic elementary functions.
                  </li>
                  <li>
                    <strong>Derivative Rules</strong>: Master arithmetic operations, chain rule, inverse function, implicit differentiation, and parametric equations.
                  </li>
                  <li>
                    <strong>Higher-Order Derivatives</strong>: Understand the definition and master nth-order derivative formulas for common functions.
                  </li>
                  <li>
                    <strong>Differential Concept</strong>: Understand the definition and master the calculation and application of differentials.
                  </li>
                  <li>
                    <strong>Geometric Meaning</strong>: Deeply understand derivatives as slopes of tangent lines.
                  </li>
                  <li>
                    <strong>Practical Applications</strong>: Apply derivatives to solve problems in geometry, physics, economics, etc.
                  </li>
                </ol>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <p className="font-semibold text-purple-800 mb-2">Study Recommendations:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Practice extensively to master various derivative techniques</li>
                    <li>Pay attention to differentiability at special points (e.g., connection points in piecewise functions)</li>
                    <li>Emphasize geometric and physical meanings to develop intuitive understanding</li>
                    <li>Systematically summarize patterns of higher-order derivatives for common functions</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Resources Section */}
        <section className="bg-white rounded-xl shadow-lg p-8" aria-labelledby="resources">
          <h2 id="resources" className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-green-500 pb-2">
            {activeTab === 'zh' ? '📚 学习资源' : '📚 Learning Resources'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold mb-4 text-green-800">
                {activeTab === 'zh' ? '推荐教材' : 'Recommended Textbooks'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {activeTab === 'zh' ? '《高等数学》同济大学' : 'Advanced Mathematics by Tongji University'}</li>
                <li>• Calculus by James Stewart</li>
                <li>• Thomas&rsquo; Calculus</li>
                <li>• MIT OpenCourseWare - Single Variable Calculus</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-4 text-blue-800">
                {activeTab === 'zh' ? '在线资源' : 'Online Resources'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Khan Academy - Calculus</li>
                <li>• Wolfram Alpha (computational tool)</li>
                <li>• Desmos Graphing Calculator</li>
                <li>• Paul&rsquo;s Online Math Notes</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
            <p className="text-center text-gray-700">
              {activeTab === 'zh' 
                ? '💡 提示：建议结合视频教程、练习题和实际应用案例进行学习，以加深理解。'
                : '💡 Tip: Combine video tutorials, practice problems, and real-world applications to deepen your understanding.'}
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">
            {activeTab === 'zh' 
              ? '希望本教程对您的学习有所帮助！' 
              : 'Hope this tutorial helps your learning!'}
          </p>
          <p className="text-sm text-gray-400">
            {activeTab === 'zh'
              ? '© 2025 高等数学学习平台 - 导数与微分'
              : '© 2025 Advanced Mathematics Learning Platform - Derivatives and Differentials'}
          </p>
        </div>
      </footer>
    </main>
  )
}

export default DerivativesAndDifferentials