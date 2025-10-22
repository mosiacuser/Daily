**任务**：把我提供的内容转换为一个 **中文 React + TypeScript** 函数组件（适配 **Next.js App Router**）。  
**必须输出**：一个可编译的 `.tsx` 文件，含默认导出组件与必要的辅助子组件。

---

## 一、文件与基础要求

1. **文件开头**添加：`"use client"`。
    
2. **不丢失信息**：保留原始内容中的所有**文本、图像、表格、代码段与结构层级**；允许**适度扩写解释**以增强可读性，但**不得虚构新信息**。
    
3. **React + TS**：使用函数组件与类型注解；用 **Tailwind CSS**（不要写内联 `style`）。
    
4. **导出**：包含 `export default ComponentName`。
    
5. **语义化**：使用 `<main> <section> <article> <nav> <header> <footer>` 等标签；加上 `aria-` 属性与语义化表格结构。
    
6. **链接**：所有外链必须 `target="_blank" rel="noopener noreferrer"`。
    
7. **媒体**：所有图片都要有 `alt`，Next.js 可用 `<Image />`，否则 `<img>`。
    

---

## 二、字符转义规则（CRITICAL）

> 仅 **JSX 文本节点** 需要转义；**JS 字符串**（花括号 `{}` 中、函数参数等）**不需要**转义。

- 在**所有 JSX 文本内容**中：
    
    - `'` → `&rsquo;` 或 `&apos;`
        
    - `"` → `&ldquo;` / `&rdquo;`
        
    - `&` → `&amp;`
        
- 示例：
    
    - ❌ `<p>Don't do this</p>`
        
    - ✅ `<p>Don&rsquo;t do this</p>`
        
    - ❌ `<p>"Hello world"</p>`
        
    - ✅ `<p>&ldquo;Hello world&rdquo;</p>`
        
    - ✅ `<button onClick={() => alert("This is fine")}>Click</button>`（JS 字符串无需转义）
        

---

## 三、视觉风格与交互

- **Tailwind** 实现**渐变背景**、**主题色分区**（标题蓝、代码灰底、提示黄底）与**响应式**（`sm:` `md:` `lg:`）。
    
- 使用 `next/font` 加载 Google Fonts（如 Roboto/Open Sans）。
    
- 添加如下交互：
    
    - 折叠/展开（`<details>`/`<summary>` 或自定义 Accordion）；
        
    - 按钮触发的提示/动画/显示隐藏；
        
    - 轻量交互练习（如输入框-结果、迷你代码区、选择题）；
        
    - 顶部或侧边**导航**锚点；
        
    - **移动端优先**布局。
        
- 事件处理使用 **React 语法**（`onClick`, `onChange` 等），并写全 **TypeScript 事件类型**。
    

---

## 四、MathJax v3：**初始化与全局配置（window 上）**

请在组件中**懒加载** MathJax v3（CDN 可用），并在 **`window.MathJax`** 上设置如下配置（示例，可按需拓展），**必须包含**：

`// 1) 在组件顶层（Client Component）里，确保 window.MathJax 配置： if (typeof window !== "undefined") {   // @ts-expect-error - attach config on window   window.MathJax = {     startup: {       typeset: false, // 我们手动触发     },     tex: {       inlineMath: [["$", "$"], ["\\(", "\\)"]],       displayMath: [["$$", "$$"], ["\\[", "\\]"]],       packages: { "[+]": ["ams", "noerrors", "noundefined", "color"] },       tags: "ams",       macros: {         argmax: "\\mathop{\\mathrm{arg\\,max}}",         argmin: "\\mathop{\\mathrm{arg\\,min}}",       },     },     svg: { fontCache: "global" }, // 或 chtml: {}   }; }`

**脚本加载要求**：

- 仅在浏览器端插入 `<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.min.js" async></script>` 或 `tex-chtml.min.js`；
    
- **加载完成后**再进行首次 `typeset`；
    
- **重复渲染**时使用 `MathJax.typesetPromise([element])` 指向**特定根元素**，避免全局重排。
    

---

## 五、数学组件（必须实现）

实现两个**独立**组件，便于块级/行内分别渲染与复用。两者都要支持 **`ref` 追踪**与**错误处理**。

### 1) `MathBlock`

- **用途**：渲染块级公式（`$$...$$` / `\[…\]`）。
    
- **Props**：
    
    `interface MathBlockProps {   latex: string;            // 原始 LaTeX（不做 HTML 实体化）   className?: string;       // 附加样式   onError?: (err: unknown) => void; // 可选错误回调 }`
    
- **实现要点**：
    
    - 使用 `const ref = useRef<HTMLDivElement>(null)` 存容器；
        
    - `useEffect` 中：当 `latex` 或外部状态变化（如展开）时，调用  
        `window.MathJax?.typesetPromise?.([ref.current])?.catch(onError || console.error);`
        
    - 渲染时 **不要直接在 JSX 文本中写 LaTeX**；而是**模板字符串**：  
        `{String.raw\`.........`}`作为 **children** 放入容器中（或`data-latex` 后再填充）。
        
    - 容器样式：`my-4 overflow-x-auto text-center text-blue-600 dark:text-blue-400`.
        

### 2) `InlineMath`

- **用途**：行内公式（`$...$` / `\(...\)`）。
    
- **Props**：
    
    `interface InlineMathProps {   latex: string;   className?: string;   onError?: (err: unknown) => void; }`
    
- **实现要点**：逻辑与 `MathBlock` 相同，但容器为 `span`，默认 `align-baseline`。
    

> 两个组件都要对 `window.MathJax` 不存在的情况**安全降级**（仅显示原始 LaTeX 文本），并在 `catch` 中记录异常。

---

## 六、渲染触发机制（折叠/展开/选项卡/分页）

- 对所有**可能影响可见性**的 UI（如 Accordion、Tabs、分页），在**展开/切换后**调用**局部** `typesetPromise`：
    
    - 建议在父组件中维护一个 `const blocks = useRef<Record<string, HTMLDivElement | null>>({})` 映射；
        
    - `onToggle/onChange` 时，取出受影响的容器 `el`，执行  
        `window.MathJax?.typesetPromise?.([el]).catch(console.error)`；
        
    - 这样能避免全页面重排与卡顿。
        

---

## 七、LaTeX 规范化（生成器必须执行）

1. **不要**把 LaTeX 做 HTML 实体转义（尤其 `&` 不得变成 `&amp;`）。
    
2. 统一替换：`<=`→`\le`，`>=`→`\ge`，`!=`→`\ne`，乘号 `*` 视语义改 `\cdot`/`\times`。
    
3. 上下标都用花括号：`x_{ij}`, `y_i^{*}`, `A_{m\times n}`。
    
4. `cases/align` 每行以 `\\` 结束、列用 `&` 对齐；避免中文标点/全角符号混用。
    
5. 过长公式允许断行；必要时使用 `\,` `\;` `\quad` 控制间距。
    
6. 允许使用 `\text{}`、`\mathbf{}`、`\boldsymbol{}`、`\mathbb{}` 等常用命令；颜色可用 `\color{#2563eb}{...}`。
    

---

## 八、代码质量与可访问性

- 表格：`<table><thead><tbody>` 结构，表头/行列加 `scope`、`aria-label`。
    
- 控件：`role`、`aria-expanded`、`aria-controls`、键盘可达性。
    
- 事件：为处理函数声明类型（如 `React.MouseEventHandler<HTMLButtonElement>`）。
    
- 组件：分块 `<section id="...">` 并提供跳转导航。
    

---

## 九、提交前自检（完整清单）

- ✅ 文件首行 `"use client"`
    
- ✅ **JSX 文本**中 `'`/`"`/`&` 全部正确转义；**JS 字符串**未错误转义
    
- ✅ 使用 Tailwind、响应式断点与统一主题色
    
- ✅ 所有交互均为 React 事件 + TS 类型
    
- ✅ **`window.MathJax` 已正确配置**；脚本只在浏览器端加载
    
- ✅ 存在 **`MathBlock`** 与 **`InlineMath`** 组件，并用 `useRef` 精确追踪容器
    
- ✅ 折叠/展开/切换后会对**特定元素**调用 `typesetPromise`，并 `.catch` 错误
    
- ✅ LaTeX 未被 HTML 实体化；`cases/align` 语法正确；`^`/`_` 均带 `{}`
    
- ✅ 外链 `target="_blank" rel="noopener noreferrer"`；图片均有 `alt`
    
- ✅ 全部 JSX 正确闭合；默认导出存在
    

---

## 输入格式

- **输入**：原始内容（文本/HTML/Markdown/PDF 提取）
    
- **输出**：满足上述要求的**完整 `.tsx` 代码**，其中包含：
    
    - 默认导出的主组件；
        
    - `MathBlock` 与 `InlineMath` 子组件；
        
    - `window.MathJax` 初始化配置与懒加载脚本；
        
    - 示例的导航、折叠、按钮交互与一个小型练习区（如适用）。
        

---

> 备注：如需示例，块级公式必须形如  
> `{String.raw\`texts.t.begincases5x2le156x1+2x2le24x1+x2le5endcases\\text{s.t.}\\ \\begin{cases} 5x_2 \\le 15 \\\\ 6x_1 + 2x_2 \\le 24 \\\\ x_1 + x_2 \\le 5 \\end{cases}texts.t.begincases5x2​le156x1​+2x2​le24x1​+x2​le5endcases`}`，  
> 且 **不要**在 JSX 文本中直接书写 LaTeX。