# Gemini RAG 多媒体智能助手

基于Google Gemini和RAG技术的多媒体智能问答系统，支持文档、图片、音频、视频文件处理，并可自动索引网站内容。

## 🌟 功能特性

- 🤖 **Google Gemini AI集成**: 使用最新的Gemini 1.5 Pro模型
- 📚 **RAG系统**: 基于向量数据库的检索增强生成
- 📁 **多媒体文件支持**: 
  - 📄 文档：PDF、DOC、DOCX、TXT、MD、HTML
  - 🖼️ 图片：JPG、PNG、GIF、WEBP、BMP、SVG (自动OCR和描述生成)
  - 🎵 音频：MP3、WAV、M4A、AAC、OGG、WEBM (自动语音转文字)
  - 🎬 视频：MP4、AVI、MOV、WMV (提取音频转文字)
- 🔍 **智能检索**: 基于语义相似度的文档检索
- 🌐 **网站内容索引**: 自动爬取和索引网站现有内容
- 💬 **实时对话**: 流畅的聊天体验，基于知识库智能回答
- 🚀 **Vercel部署**: 一键部署到Vercel

## 🛠️ 技术栈

- **前端**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI模型**: Google Gemini 2.0 Flash (可配置), Text Embedding 004
- **语音识别**: OpenAI Whisper
- **图像处理**: Sharp, Google Gemini Vision
- **向量数据库**: Pinecone
- **文档处理**: pdf-parse, mammoth, cheerio
- **部署**: Vercel

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd ai-training
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入你的API密钥：

```bash
cp .env.example .env.local
```

在 `.env.local` 中配置以下变量：

```env
# Google Gemini AI API Key
GOOGLE_API_KEY=your_google_gemini_api_key_here

# Gemini Model Configuration (optional)
# Main model for chat and generation
GEMINI_MODEL=gemini-2.0-flash-exp
# Available models:
# - gemini-2.0-flash-exp (latest experimental)
# - gemini-1.5-pro-latest (stable pro)
# - gemini-1.5-flash-latest (fast)

# Embedding model for vector generation
GEMINI_EMBEDDING_MODEL=text-embedding-004

# Gemini Generation Parameters (optional)
GEMINI_TEMPERATURE=0.7
GEMINI_TOP_P=0.8
GEMINI_TOP_K=40
GEMINI_MAX_TOKENS=8192

# Pinecone Vector Database Configuration (SDK v6+)
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=ai-training-rag

# Optional: Pinecone deployment configuration (defaults to AWS us-east-1)
# PINECONE_CLOUD=aws         # aws, gcp, or azure
# PINECONE_REGION=us-east-1  # Specific region for your cloud provider

# OpenAI API Key (required for audio transcription)
OPENAI_API_KEY=your_openai_api_key_here

# OpenAI API Base URL (optional, for custom endpoints or proxies)
# Leave empty to use the default OpenAI endpoint
# Examples:
# OPENAI_BASE_URL=https://api.openai.com/v1  (default)
# OPENAI_BASE_URL=https://your-proxy.com/v1  (custom proxy)
# OPENAI_BASE_URL=https://api.openai-proxy.com/v1  (alternative endpoint)
OPENAI_BASE_URL=
```

### 4. 获取API密钥

#### Google Gemini API
1. 访问 [Google AI Studio](https://aistudio.google.com/)
2. 创建新项目并获取API密钥
3. 将密钥添加到 `GOOGLE_API_KEY`

#### Pinecone (向量数据库)
1. 访问 [Pinecone Console](https://app.pinecone.io/)
2. 创建账户和项目
3. 获取API密钥 (⚠️ **注意**: 使用最新SDK v6+，无需PINECONE_ENVIRONMENT)
4. 将API密钥添加到 `PINECONE_API_KEY`
5. (可选) 配置云服务商和区域到 `PINECONE_CLOUD` 和 `PINECONE_REGION`

#### OpenAI API (语音转文字)
1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 创建账户和API密钥
3. 将密钥添加到 `OPENAI_API_KEY`
4. (可选) 配置自定义端点到 `OPENAI_BASE_URL`
   - 用于代理服务或第三方兼容端点
   - 留空使用默认OpenAI端点

### 5. 本地开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

访问 [http://localhost:3000/gemini-rag-chat](http://localhost:3000/gemini-rag-chat) 使用RAG聊天机器人。

## Vercel部署

### 1. 方法一：通过Vercel CLI

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署
vercel
```

### 2. 方法二：通过GitHub集成

1. 将代码推送到GitHub仓库
2. 在Vercel仪表板中导入项目
3. 配置环境变量
4. 部署

### 3. 配置Vercel环境变量

在Vercel项目设置中添加以下环境变量：

- `GOOGLE_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_INDEX_NAME`
- `PINECONE_CLOUD` (可选)
- `PINECONE_REGION` (可选)
- `OPENAI_API_KEY`

## 📖 使用说明

### 1. 上传多媒体文件

1. 访问RAG聊天页面
2. 点击"上传文档"按钮  
3. 选择支持的文件格式：
   - 📄 **文档**: PDF, DOC, DOCX, TXT, MD, HTML
   - 🖼️ **图片**: JPG, PNG, GIF, WEBP, BMP, SVG
   - 🎵 **音频**: MP3, WAV, M4A, AAC, OGG, WEBM
   - 🎬 **视频**: MP4, AVI, MOV, WMV
4. 等待文件处理和向量化完成

### 2. 索引网站内容

1. 点击"索引网站内容"按钮
2. 系统自动扫描网站所有页面和文档
3. 将内容分块并存储到向量数据库
4. 构建完整的网站知识库

### 3. 开始智能对话

1. 在输入框中输入你的问题
2. 系统自动搜索相关文档/图片/音频内容
3. 基于多媒体知识库生成准确回答
4. 查看回答下方的参考来源

## 🔧 API接口

### POST /api/upload

上传并处理多媒体文件

**请求**:
- Content-Type: multipart/form-data
- Body: file (支持文档/图片/音频/视频文件)

**响应**:
```json
{
  "success": true,
  "message": "Document processed successfully",
  "data": {
    "fileName": "example.pdf",
    "totalChunks": 10,
    "successfulChunks": 10,
    "isMediaFile": false,
    "mediaResult": null
  }
}
```

### POST /api/index-website

索引网站内容到知识库

**请求**:
```json
{}
```

**响应**:
```json
{
  "success": true,
  "message": "Successfully indexed 25 content items",
  "data": {
    "indexed": 25,
    "errors": []
  }
}
```

### POST /api/test-openai

测试OpenAI连接状态

**请求**:
```bash
GET /api/test-openai
```

**响应**:
```json
{
  "success": true,
  "message": "OpenAI connection successful",
  "baseURL": "https://api.openai.com/v1",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/test-gemini

测试Gemini连接状态和模型配置

**请求**:
```bash
GET /api/test-gemini
```

**响应**:
```json
{
  "success": true,
  "message": "Gemini connection successful", 
  "modelInfo": {
    "mainModel": "gemini-2.0-flash-exp",
    "embeddingModel": "text-embedding-004",
    "config": {
      "temperature": 0.7,
      "topP": 0.8,
      "topK": 40,
      "maxOutputTokens": 8192
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/test-pinecone

测试Pinecone连接状态和索引信息

**请求**:
```bash
GET /api/test-pinecone
```

**响应**:
```json
{
  "success": true,
  "message": "Pinecone connection successful",
  "details": {
    "totalIndexes": 2,
    "indexes": [
      {
        "name": "ai-training-rag",
        "dimension": 768,
        "metric": "cosine",
        "status": "ready"
      }
    ]
  },
  "sdk": {
    "version": "6.1.2+",
    "note": "Using latest Pinecone SDK without PINECONE_ENVIRONMENT"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/chat

发送消息并获取AI回复

**请求**:
```json
{
  "message": "用户问题",
  "history": [...]
}
```

**响应**:
```json
{
  "message": "AI回复",
  "sources": ["document1.pdf", "document2.docx"]
}
```

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # 聊天API
│   │   └── upload/route.ts        # 文档上传API
│   ├── gemini-rag-chat/
│   │   └── page.tsx               # RAG聊天页面
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── gemini.ts                  # Gemini AI集成
│   ├── pinecone.ts                # Pinecone向量数据库
│   └── document-processor.ts      # 文档处理
```

## 🤖 Gemini模型配置

本系统支持配置不同的Gemini模型，默认使用最新的Gemini 2.0 Flash实验版本。

### 可用模型

| 模型名称 | 环境变量值 | 特点 | 适用场景 |
|---------|------------|------|----------|
| **Gemini 2.0 Flash (实验版)** | `gemini-2.0-flash-exp` | 🚀 最新技术，速度快，性能强 | 实验性应用，追求最新功能 |
| **Gemini 1.5 Pro** | `gemini-1.5-pro-latest` | 🎯 稳定可靠，平衡性能 | 生产环境，稳定性优先 |
| **Gemini 1.5 Flash** | `gemini-1.5-flash-latest` | ⚡ 快速响应，成本优化 | 实时交互，大量请求 |

### 配置方法

1. **使用默认模型** (Gemini 2.0 Flash):
   ```env
   GOOGLE_API_KEY=your_api_key_here
   # 其他配置项可留空，将使用默认值
   ```

2. **选择稳定模型** (Gemini 1.5 Pro):
   ```env
   GOOGLE_API_KEY=your_api_key_here
   GEMINI_MODEL=gemini-1.5-pro-latest
   ```

3. **快速响应模型** (Gemini 1.5 Flash):
   ```env
   GOOGLE_API_KEY=your_api_key_here
   GEMINI_MODEL=gemini-1.5-flash-latest
   ```

4. **自定义生成参数**:
   ```env
   GEMINI_MODEL=gemini-2.0-flash-exp
   GEMINI_TEMPERATURE=0.5        # 创造性 (0.0-1.0)
   GEMINI_TOP_P=0.9             # 词汇多样性 (0.0-1.0)
   GEMINI_TOP_K=30              # 候选词数量
   GEMINI_MAX_TOKENS=4096       # 最大输出长度
   ```

### 参数说明

- **Temperature** (0.0-1.0): 控制输出的随机性，值越高越有创造性
- **Top P** (0.0-1.0): 核采样，控制词汇选择的多样性
- **Top K**: 限制每步选择的候选词数量
- **Max Tokens**: 单次响应的最大令牌数

### 模型测试

在聊天界面点击"测试Gemini连接"按钮，可以：
- ✅ 验证API密钥和模型可用性
- 📊 查看当前使用的模型和参数配置
- 🔍 获取详细的连接状态信息
- ⚠️ 诊断配置问题和错误

## 📦 Pinecone SDK 迁移指南 (2025年更新)

本项目已更新到最新的Pinecone SDK v6+，以下是重要变更：

### ⚠️ 重大变更

1. **PINECONE_ENVIRONMENT 已弃用**
   - ❌ 旧版本: `PINECONE_ENVIRONMENT=us-east-1-aws`
   - ✅ 新版本: 自动通过API密钥检测区域

2. **简化的初始化方式**
   ```javascript
   // ❌ 旧版本 (SDK v0.x)
   const client = new PineconeClient();
   await client.init({
     apiKey: process.env.PINECONE_API_KEY,
     environment: process.env.PINECONE_ENVIRONMENT,
   });

   // ✅ 新版本 (SDK v6+)
   const pinecone = new Pinecone({
     apiKey: process.env.PINECONE_API_KEY,
   });
   ```

### 🔍 如何查找旧环境值 (如果需要)

如果您有旧的Pinecone项目需要迁移，可以在以下位置找到环境信息：

1. **Pinecone控制台**: https://app.pinecone.io/
2. **索引页面**: 查看现有索引的区域信息
3. **项目URL**: `https://app.pinecone.io/organization/{org-id}/projects/{environment}:{project-id}`

### ✅ 迁移优势

- 🚀 **配置更简单**: 只需API密钥
- 🔄 **自动区域检测**: 无需手动配置环境
- 📦 **更好的错误处理**: 改进的错误信息
- 🛡️ **类型安全**: 更好的TypeScript支持

### 🧪 测试功能

在聊天界面点击"测试Pinecone连接"，可以：
- ✅ 验证最新SDK兼容性
- 📊 查看所有索引信息
- 🔍 显示详细的连接状态
- 📈 监控索引就绪状态

## 🔧 OpenAI自定义端点配置

本系统支持自定义OpenAI API端点，适用于以下场景：

### 使用场景
- 🌐 **代理服务**: 通过代理访问OpenAI API
- 🏢 **企业环境**: 使用内网代理或网关
- 🔄 **第三方兼容**: 使用兼容OpenAI API的服务
- 🌏 **区域访问**: 解决网络访问限制

### 配置方法

1. **默认配置** (使用官方端点):
   ```env
   OPENAI_API_KEY=your_api_key_here
   OPENAI_BASE_URL=
   ```

2. **代理配置**:
   ```env
   OPENAI_API_KEY=your_api_key_here
   OPENAI_BASE_URL=https://your-proxy.com/v1
   ```

3. **第三方服务**:
   ```env
   OPENAI_API_KEY=your_api_key_here
   OPENAI_BASE_URL=https://api.third-party.com/v1
   ```

### 连接测试

在聊天界面点击"测试OpenAI连接"按钮，系统会：
- ✅ 验证API密钥有效性
- 🌐 测试自定义端点连接
- 📊 显示连接状态和端点信息
- ⚠️ 提供详细的错误诊断

## ⚠️ 注意事项

1. **文件大小限制**: 
   - 文档文件最大10MB
   - 图片/音频/视频文件最大50MB
2. **支持格式**: 
   - 📄 文档：PDF, DOC, DOCX, TXT, MD, HTML
   - 🖼️ 图片：JPG, PNG, GIF, WEBP, BMP, SVG  
   - 🎵 音频：MP3, WAV, M4A, AAC, OGG, WEBM
   - 🎬 视频：MP4, AVI, MOV, WMV
3. **API配额**: 注意Google Gemini、OpenAI和Pinecone的API配额限制
4. **安全性**: 不要在客户端暴露API密钥
5. **语音识别**: 需要OpenAI API密钥用于音频转文字功能
6. **自定义端点**: 确保OPENAI_BASE_URL格式正确，以/v1结尾

## 故障排除

### 常见问题

1. **Pinecone连接失败**
   - 检查API密钥和环境配置
   - 确保Pinecone索引已创建

2. **文档上传失败**
   - 检查文件格式是否支持
   - 确认文件大小不超过限制

3. **OpenAI连接失败**
   - 检查API密钥是否有效
   - 验证OPENAI_BASE_URL配置
   - 使用"测试OpenAI连接"功能诊断

4. **自定义端点问题**
   - 确保URL以/v1结尾
   - 检查网络连接和防火墙设置
   - 验证第三方服务兼容性

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License