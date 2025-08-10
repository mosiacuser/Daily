# AI Training Project Documentation

## Project Overview

**Project Name**: ai-training  
**Project Type**: Next.js 15 React Application  
**Purpose**: Educational platform for AI training resources and tools  
**Technologies**: Next.js 15, React 19, TypeScript, Tailwind CSS v4

This is a comprehensive educational hub for AI-related training content, featuring multiple interactive modules covering various AI tools and educational resources.

## Directory Structure

```
ai-training/
├── README.md                    # Project documentation
├── package.json                 # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── next.config.ts              # Next.js configuration
├── next-env.d.ts               # Next.js TypeScript declarations
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mjs           # ESLint configuration
├── postcss.config.mjs          # PostCSS configuration
├── node_modules/               # Installed dependencies
├── public/                     # Static assets
│   ├── BingSiteAuth.xml        # Bing site verification
│   ├── file.svg                # File icon
│   ├── globe.svg               # Globe icon
│   ├── next.svg                # Next.js logo
│   ├── vercel.svg              # Vercel logo
│   └── window.svg              # Window icon
└── src/                        # Source code
    ├── app/                    # Next.js App Router pages
    │   ├── layout.tsx          # Root layout component
    │   ├── page.tsx            # Homepage with dynamic module discovery
    │   ├── globals.css         # Global styles and Tailwind imports
    │   ├── favicon.ico         # Site favicon
    │   ├── aa-general/         # AI Tools Navigator module
    │   │   └── page.tsx        # Bilingual AI tools directory (300+ tools)
    │   ├── ai-activities/      # Educational AI Activities module
    │   │   └── page.tsx        # Interactive activity templates
    │   ├── canva-code/         # Canva Code Video Series module
    │   │   └── page.tsx        # YouTube video tutorials with timeline
    │   ├── canva2025/          # Canva Education Webinar module
    │   │   └── page.tsx        # Interactive webinar summary
    │   ├── education-prompt/   # Prompt Library module
    │   │   └── page.tsx        # 24 categorized educational prompts
    │   ├── gemini2_5/          # Gemini 2.5 Pro module
    │   │   └── page.tsx        # Marketing landing page with animations
    │   ├── grok/               # Grok AI Guide module
    │   │   └── page.tsx        # Comprehensive Grok AI tutorial
    │   └── teachercopilot/     # Teacher's AI Co-Pilot module
    │       └── page.tsx        # NotebookLM analysis for educators
    ├── components/             # Reusable React components (empty)
    └── lib/                    # Utility functions and helpers (empty)
```

## File Details

### Configuration Files

#### `package.json`
- **Framework**: Next.js 15.4.1
- **React**: Version 19.1.0
- **TypeScript**: Version 5
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React v0.525.0
- **Scripts**: 
  - `dev`: Development server with Turbopack
  - `build`: Production build
  - `start`: Production server
  - `lint`: ESLint checking

#### `tsconfig.json`
- Strict TypeScript configuration
- Path aliases: `@/*` maps to `./src/*`
- Next.js optimized settings

#### `next.config.ts`
- Minimal Next.js configuration
- Uses default settings for most options

#### `eslint.config.mjs`
- ESLint configuration for Next.js and TypeScript
- Extends recommended rules

#### `postcss.config.mjs`
- PostCSS configuration for Tailwind CSS processing

### Source Code Files

#### `/src/app/layout.tsx`
- Root layout component
- Implements Geist font (Sans and Mono variants)
- Sets up HTML structure and metadata
- Configures global styling

#### `/src/app/page.tsx`
- Dynamic homepage with auto-discovery functionality
- Server-side component using Node.js filesystem API
- Automatically generates navigation cards for all modules
- Responsive grid layout with modern design

#### `/src/app/globals.css`
- Tailwind CSS imports and directives
- CSS custom properties for theming
- Global style resets and utilities

### Module Pages

#### `/src/app/aa-general/page.tsx`
- **Purpose**: Comprehensive AI tools directory
- **Features**: 
  - Bilingual support (Chinese/English)
  - 300+ AI tools across 13 categories
  - Modal-based tool details
  - Search and filtering functionality
- **Categories**: Multimedia, Business, Learning, Development, etc.

#### `/src/app/ai-activities/page.tsx`
- **Purpose**: Educational activity templates and prompts
- **Features**:
  - Interactive modal system
  - Template generation for educators
  - Copy-to-clipboard functionality
  - Gradient-heavy modern UI

#### `/src/app/canva-code/page.tsx`
- **Purpose**: Video tutorial series for Canva Code
- **Features**:
  - Embedded YouTube videos
  - Expandable content sections
  - Timeline and key points tracking
  - Responsive video embeds
- **Content**: Multi-part tutorial series with detailed descriptions

#### `/src/app/canva2025/page.tsx`
- **Purpose**: Interactive webinar summary
- **Features**:
  - Tabbed interface for different content sections
  - Next.js Image optimization
  - YouTube embed integration
- **Note**: Contains placeholder images for production deployment

#### `/src/app/education-prompt/page.tsx`
- **Purpose**: Comprehensive prompt library for educators
- **Features**:
  - 24 categorized educational prompts
  - Search and filter functionality
  - Expandable template views
  - Copy-to-clipboard integration
- **Categories**: Assessment, Creative Writing, Critical Thinking, etc.

#### `/src/app/gemini2_5/page.tsx`
- **Purpose**: Marketing/landing page for Gemini AI
- **Features**:
  - Animated components with custom CSS
  - Gradient backgrounds and visual effects
  - Feature showcase sections
  - Call-to-action buttons
- **Design**: Modern marketing page with animations

#### `/src/app/grok/page.tsx`
- **Purpose**: Comprehensive Grok AI tutorial and guide
- **Features**:
  - Interactive timeline
  - Demo functionality
  - Tabbed content sections
  - Feature cards with hover effects
- **Content**: Step-by-step guide for using Grok AI

#### `/src/app/teachercopilot/page.tsx`
- **Purpose**: NotebookLM analysis for educators
- **Features**:
  - Expandable feature cards
  - Progress tracking
  - Smooth scrolling navigation
- **Status**: Incomplete implementation (only 1 of multiple features)

### Static Assets (`/public/`)

- **BingSiteAuth.xml**: Bing search engine verification file
- **SVG Icons**: Various UI icons (file, globe, next, vercel, window)
- **Images**: Logo and branding assets

## Architecture Patterns

### 1. Module-Based Architecture
Each AI tool/topic has its own dedicated page under `/src/app/`, creating a scalable modular structure.

### 2. Dynamic Homepage Generation
The homepage uses Node.js filesystem APIs to automatically discover and generate navigation for all available modules.

### 3. Consistent Component Patterns
- TypeScript interfaces for type safety
- React hooks for state management
- Tailwind CSS for consistent styling
- Responsive design principles

### 4. Performance Optimizations
- Next.js App Router for optimal loading
- Server components where appropriate
- Image optimization with Next.js Image component
- Strategic use of React.useMemo for expensive computations

## Key Features

### Educational Focus
- Comprehensive AI tool directories
- Educational activity templates
- Video tutorial integration
- Prompt libraries for educators

### User Experience
- Responsive design across all devices
- Interactive modals and expandable content
- Search and filtering capabilities
- Copy-to-clipboard functionality

### Technical Excellence
- Modern React and Next.js patterns
- TypeScript for type safety
- Tailwind CSS for consistent styling
- Performance-optimized components

## Development Status

### Completed Features
- Dynamic homepage with module discovery
- AI tools directory with 300+ tools
- Educational activity templates
- Video tutorial series integration
- Prompt library with 24 categories
- Marketing pages with animations

### Areas for Enhancement
- Complete Teacher Copilot module implementation
- Replace placeholder images in Canva2025
- Externalize hardcoded content to data files
- Add error handling for dynamic content
- Implement global state management if needed

## Security Considerations

- Clean codebase with no malicious content detected
- Proper external link handling with security attributes
- Limited user input surfaces (mostly read-only content)
- No sensitive data or credentials in source code

## Usage and Deployment

This application is designed to be deployed on modern hosting platforms like Vercel or Netlify, with optimal performance on Next.js-compatible environments. The modular architecture makes it easy to add new AI educational content by creating new page modules following the established patterns.