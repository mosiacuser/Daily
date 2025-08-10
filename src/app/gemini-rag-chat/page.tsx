'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Upload, FileText, Loader2, Image, Music, Video, RefreshCw, Settings, CheckCircle, XCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sources?: string[];
}

interface DocumentInfo {
  name: string;
  size: number;
  type: string;
  isMediaFile?: boolean;
  mediaType?: 'image' | 'audio' | 'video' | 'document';
}

export default function GeminiRagChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isIndexing, setIsIndexing] = useState(false);
  const [isTestingOpenAI, setIsTestingOpenAI] = useState(false);
  const [isTestingPinecone, setIsTestingPinecone] = useState(false);
  const [openAIStatus, setOpenAIStatus] = useState<{ tested: boolean; success: boolean; message: string; baseURL?: string } | null>(null);
  const [pineconeStatus, setPineconeStatus] = useState<{ tested: boolean; success: boolean; message: string; details?: any } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages,
          // provider: 'openai', // Always use OpenAI
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || '抱歉，我无法处理您的请求。',
        role: 'assistant',
        timestamp: new Date(),
        sources: data.sources || [],
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '抱歉，发生了错误。请稍后再试。',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const result = await response.json();
        
        if (result.success) {
          const mediaType = getMediaType(file.type);
          setDocuments(prev => [...prev, {
            name: file.name,
            size: file.size,
            type: file.type,
            isMediaFile: result.data?.isMediaFile || false,
            mediaType,
          }]);
        }
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('文件上传失败，请重试。');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleIndexWebsite = async () => {
    setIsIndexing(true);
    
    try {
      const response = await fetch('/api/index-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to index website');
      }

      const result = await response.json();
      
      if (result.success) {
        alert(`成功索引了 ${result.data.indexed} 项网站内容到知识库！`);
      } else {
        alert(`索引完成，但有一些错误。成功索引 ${result.data.indexed} 项内容。`);
      }
    } catch (error) {
      console.error('Error indexing website:', error);
      alert('网站内容索引失败，请重试。');
    } finally {
      setIsIndexing(false);
    }
  };

  const handleTestOpenAI = async () => {
    setIsTestingOpenAI(true);
    
    try {
      const response = await fetch('/api/test-openai', {
        method: 'GET',
      });

      const result = await response.json();
      
      setOpenAIStatus({
        tested: true,
        success: result.success,
        message: result.message,
        baseURL: result.baseURL,
      });

      if (result.success) {
        console.log('✅ OpenAI connection test passed');
      } else {
        console.warn('⚠️ OpenAI connection test failed');
      }
    } catch (error) {
      console.error('❌ Error testing OpenAI:', error);
      setOpenAIStatus({
        tested: true,
        success: false,
        message: '网络错误或服务器异常',
      });
    } finally {
      setIsTestingOpenAI(false);
    }
  };

  const handleTestPinecone = async () => {
    setIsTestingPinecone(true);
    
    try {
      const response = await fetch('/api/test-pinecone', {
        method: 'GET',
      });

      const result = await response.json();
      
      setPineconeStatus({
        tested: true,
        success: result.success,
        message: result.message,
        details: result.details,
      });

      if (result.success) {
        console.log('✅ Pinecone connection test passed');
      } else {
        console.warn('⚠️ Pinecone connection test failed');
      }
    } catch (error) {
      console.error('❌ Error testing Pinecone:', error);
      setPineconeStatus({
        tested: true,
        success: false,
        message: '网络错误或服务器异常',
      });
    } finally {
      setIsTestingPinecone(false);
    }
  };

  const getMediaType = (mimeType: string): 'image' | 'audio' | 'video' | 'document' => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('video/')) return 'video';
    return 'document';
  };

  const getFileIcon = (mediaType: 'image' | 'audio' | 'video' | 'document') => {
    switch (mediaType) {
      case 'image': return <Image className="w-4 h-4 text-green-600 flex-shrink-0" />;
      case 'audio': return <Music className="w-4 h-4 text-purple-600 flex-shrink-0" />;
      case 'video': return <Video className="w-4 h-4 text-red-600 flex-shrink-0" />;
      default: return <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Bot className="w-8 h-8 text-green-600" />
                OpenAI RAG 智能助手
              </h1>
              <p className="text-gray-600 mt-1">基于OpenAI GPT和RAG技术的智能问答系统</p>
            </div>
            
            {/* Status indicators */}
            <div className="flex items-center gap-1">
              {openAIStatus?.tested && (
                <div className={`w-2 h-2 rounded-full ${openAIStatus.success ? 'bg-green-500' : 'bg-red-500'}`} title={`OpenAI: ${openAIStatus.success ? '正常' : '异常'}`}></div>
              )}
              {pineconeStatus?.tested && (
                <div className={`w-2 h-2 rounded-full ${pineconeStatus.success ? 'bg-blue-500' : 'bg-red-500'}`} title={`Pinecone: ${pineconeStatus.success ? '正常' : '异常'}`}></div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-6xl mx-auto w-full">
        {/* Sidebar for document management */}
        <div className="w-80 bg-white border-r p-4 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">知识库文档</h3>
            
            {/* Upload and Index buttons */}
            <div className="space-y-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    上传中...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    上传文档
                  </>
                )}
              </button>
              
              <button
                onClick={handleIndexWebsite}
                disabled={isIndexing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {isIndexing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    索引中...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    索引网站内容
                  </>
                )}
              </button>
              
              <button
                onClick={handleTestOpenAI}
                disabled={isTestingOpenAI}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {isTestingOpenAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    测试中...
                  </>
                ) : (
                  <>
                    <Settings className="w-4 h-4" />
                    测试OpenAI连接
                  </>
                )}
              </button>
              
              <button
                onClick={handleTestPinecone}
                disabled={isTestingPinecone}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {isTestingPinecone ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    测试中...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    测试Pinecone连接
                  </>
                )}
              </button>
            </div>
            
            {/* Pinecone Status */}
            {pineconeStatus && (
              <div className={`mt-3 p-3 rounded-lg border ${
                pineconeStatus.success 
                  ? 'bg-teal-50 border-teal-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {pineconeStatus.success ? (
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    pineconeStatus.success ? 'text-teal-800' : 'text-red-800'
                  }`}>
                    Pinecone连接{pineconeStatus.success ? '正常' : '异常'}
                  </span>
                </div>
                <p className={`text-xs ${
                  pineconeStatus.success ? 'text-teal-700' : 'text-red-700'
                }`}>
                  {pineconeStatus.message}
                </p>
                {pineconeStatus.details && (
                  <div className="mt-2 text-xs text-gray-600">
                    <p>索引数量: {pineconeStatus.details.totalIndexes}</p>
                    {pineconeStatus.details.indexes && pineconeStatus.details.indexes.length > 0 && (
                      <div className="mt-1">
                        {pineconeStatus.details.indexes.slice(0, 2).map((index: any, i: number) => (
                          <div key={i} className="text-xs bg-gray-100 p-1 rounded mt-1">
                            {index.name} ({index.dimension}d, {index.status})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* OpenAI Status */}
            {openAIStatus && (
              <div className={`mt-3 p-3 rounded-lg border ${
                openAIStatus.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {openAIStatus.success ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    openAIStatus.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    OpenAI连接{openAIStatus.success ? '正常' : '异常'}
                  </span>
                </div>
                <p className={`text-xs ${
                  openAIStatus.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {openAIStatus.message}
                </p>
                {openAIStatus.baseURL && (
                  <p className="text-xs text-gray-600 mt-1">
                    端点: {openAIStatus.baseURL}
                  </p>
                )}
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.md,.html,.jpg,.jpeg,.png,.gif,.webp,.bmp,.svg,.mp3,.wav,.m4a,.aac,.ogg,.webm,.mp4,.avi,.mov,.wmv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Document list */}
          <div className="flex-1 overflow-y-auto">
            {documents.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>暂无文档</p>
                <p className="text-sm mt-1">上传文档/图片/音频开始构建知识库</p>
                <p className="text-xs text-gray-400 mt-2">
                  支持：PDF, DOC, TXT, MD, JPG, PNG, MP3, WAV, MP4等
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 border">
                    <div className="flex items-center gap-2">
                      {getFileIcon(doc.mediaType || getMediaType(doc.type))}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-12">
                <Bot className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">欢迎使用OpenAI RAG智能助手</h3>
                <p>上传文档/图片/音频到知识库，或索引网站内容，然后开始对话吧！</p>
                <div className="mt-4 text-sm text-gray-400">
                  <p>🤖 AI模型：OpenAI GPT-4o-mini</p>
                  <p>📁 支持格式：PDF, DOC, TXT, MD, JPG, PNG, MP3, WAV, MP4等</p>
                  <p className="mt-1">✨ 自动OCR识别图片文字，语音转文本，网站内容索引</p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-3xl ${message.role === 'user' ? 'order-2' : ''}`}>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">参考来源：</p>
                          <div className="space-y-1">
                            {message.sources.map((source, index) => (
                              <div key={index} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                {source}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 order-3">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border shadow-sm rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-gray-500">思考中...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t bg-white p-4">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入您的问题..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}