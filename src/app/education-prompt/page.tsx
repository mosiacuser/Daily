"use client";

import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Users, Target, MessageSquare, FileText, Star, LucideProps } from 'lucide-react';


// --- TYPE DEFINITIONS ---

// The shape of a single prompt object
interface Prompt {
  id: number;
  category: string;
  title: string;
  description: string;
  template: string;
}

// The shape of a single category object
interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<LucideProps>; // Type for Lucide icons
  count: number;
}

// Props for the LibraryHeader component
interface LibraryHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// Props for the CategorySidebar component
interface CategorySidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

// Props for the PromptCard component
interface PromptCardProps {
  prompt: Prompt;
  isExpanded: boolean;
  onToggle: (id: number) => void;
  onCopy: (text: string) => void;
}


// --- DATA LAYER ---

const prompts: Prompt[] = [
    {
        id: 1,
        category: 'activities',
        title: 'Develop an activity from scratch',
        description: 'Create engaging and interactive activities for specific learning outcomes',
        template: `I am a [Enter your role]. Based on the following information, suggest an engaging and interactive activity that will help my students achieve the desired learning outcomes:

Subject: [Enter subject]
Grade level: [Enter grade level]
Learning objectives:
[Enter learning objective]
[Enter learning objective]
[Enter learning objective]

Clear instructions and expectations: [Explain how the activity will be conducted and what students should accomplish]
Resources: [List required resources]
Constraints: [Note any potential limitations]
Specific theme or context: [Include information about the activity's theme or the context in which it will exist]`
    },
    {
        id: 2,
        category: 'activities',
        title: 'Generate a review activity',
        description: 'Create engaging activities for students to review specified content',
        template: `I am a [Enter your role]. Based on the following information, develop an engaging activity that will enable students to review the specified content:

Subject: [Enter subject]
Grade level: [Enter grade level]
Learning objectives:
[Enter learning objective]
[Enter learning objective]
[Enter learning objective]

Knowledge, skills, and understanding: [Note key facts, concepts, or processes covered in the material]
Critical thinking: [Explain whether the students will be analyzing information, drawing conclusions, evaluating arguments, problem-solving, etc.]
Content and material: [Specify the specific content area, lesson, or topic you want to focus on]
Materials: [Paste in textbook chapters or sections, lecture notes, handouts, or other relevant resources]
Reading level: [State the desired reading level for the review activity]
Activity type and format: [Describe the desired type of activity, such as quiz, game, simulation, collaborative project, etc.]
Difficulty and length: [Indicate the difficulty level and length]`
    },
    {
        id: 3,
        category: 'activities',
        title: 'Facilitate student introductions',
        description: 'Create ability-inclusive ideas to help students get to know each other',
        template: `I am a [Enter your role]. I need three ability-inclusive ideas to help [Enter grade level and subject] students get to know each other.`
    },
    {
        id: 4,
        category: 'activities',
        title: 'Modify activities',
        description: 'Adapt existing project activities to better suit student needs and interests',
        template: `I am a [Enter your role]. Modify the following project activities to better suit the needs and interests of my students:

Project title: [Enter the title of the project]
Subject: [State the subject of the project]
Grade level: [Enter grade level]
Topic: [Note the specific topic covered by the project]
Current project description: [Provide a brief description of the project as it currently is]
Target audience: [Describe the students who will be participating in the project and their particular interests]

Desired Modifications:
Areas for modification: [Specify which aspects of the project you want to modify, such as the difficulty level, scope, assessment methods, or specific activities]
Reasons for modification: [Explain why you want to make these modifications, such as making the project more engaging, accessible, or aligned with student interests]
Desired outcomes: [Describe what you hope to achieve by modifying the project, such as promoting deeper learning, fostering collaboration, or addressing individual needs]
Additional information: [Include any other relevant details, such as available resources, time constraints, or specific learning objectives you want to address]`
    },
    {
        id: 5,
        category: 'lesson-plans',
        title: 'Create a lesson plan from scratch',
        description: 'Write comprehensive lesson plans to achieve desired learning outcomes',
        template: `I am a [Enter your role]. Based on the following information, write a lesson plan that will help my students achieve the desired learning outcomes:

Subject: [Enter subject]
Grade level: [Enter grade level]
Learning objectives:
- [Enter learning objective]
- [Enter learning objective]
- [Enter learning objective]

Time limit: [Enter duration of lesson]
Prior knowledge: [Enter information about what students already know about the topic]
Materials: [List any required materials]
Time allotment: [Enter required time for the lesson]`
    },
    {
        id: 6,
        category: 'lesson-plans',
        title: 'Enhance your existing lesson plan',
        description: 'Improve and expand upon existing lesson plans',
        template: `I am a [Enter your role]. Write a lesson plan that will help my [Enter grade level and subject] students [Enter learning objectives]. Our class is [number] minutes long. The lesson plan should include a section for [Enter desired lesson plan structure].`
    },
    {
        id: 7,
        category: 'lesson-plans',
        title: 'Generate a slide show presentation',
        description: 'Create text content for educational slide presentations',
        template: `I am a [Enter your role]. Create the text for a slide deck about [Enter subject] for a [Enter grade level and subject] class, including speaker notes. There should be five slides of text that are formatted with a header and then a set of bullets for each slide. The first slide should include text on the lesson objectives. The last slide should include text for a formative assessment and a student activity.`
    },
    {
        id: 8,
        category: 'differentiation',
        title: 'Add differentiation for fast finishers',
        description: 'Create extensions for students who complete activities quickly',
        template: `I am a [Enter your role]. Based on the following information, suggest ways to add differentiation to the activity for students who finish quickly:

Activity: [Enter activity name]
Grade level: [Enter grade level]
Learning objectives:
- [Enter learning objective]
- [Enter learning objective]
- [Enter learning objective]

Clear instructions and expectations: [Explain how the activity will be conducted and what students should accomplish]
Resources: [List required resources]
Constraints: [Note any potential limitations]
Specific theme or context: [Include information about the activity's theme or the context in which it will exist]`
    },
    {
        id: 9,
        category: 'differentiation',
        title: 'Create project tasks for different mastery levels',
        description: 'Differentiate project tasks based on student mastery and experience',
        template: `I am a [Enter your role]. Based on the following information, suggest ways to differentiate project tasks for students with different levels of mastery and experience:

Project: [Enter project name]
Grade level: [Enter grade level]
Learning objectives:
- [Enter learning objective]
- [Enter learning objective]
- [Enter learning objective]

Clear instructions and expectations: [Explain how the activity will be conducted and what students should accomplish]
Resources: [List required resources]
Constraints: [Note any potential limitations]
Specific theme or context: [Include information about the project's theme or the context in which it will exist]`
    },
    {
        id: 10,
        category: 'differentiation',
        title: "Check assignments' reading level",
        description: 'Review and simplify assignment text for appropriate reading levels',
        template: `I am a [Enter your role]. Review this [Enter assignment] and point out areas where the writing can be simplified in order to ensure the reading level is appropriate for my [Enter grade level] students: [Enter assignment]`
    },
    {
        id: 11,
        category: 'differentiation',
        title: 'Adjust reading level',
        description: 'Modify text complexity to make content more accessible',
        template: `I am a [Enter your role]. Adjust the reading level of the following text to make it more accessible for students at a [Target reading level] level.

Original text: [Paste in the text]
Subject: [Note the subject of the text]
Topic: [Specify the specific topic covered in the text]
Target audience: [Describe the students who will be reading the adjusted text, including their age, grade level, and any relevant learning needs]
Key points to preserve: [List the essential information and main points that must be retained in the adjusted text]
Vocabulary: [Include any complex vocabulary or jargon that needs to be simplified or explained]
Sentence structure: [Reference any desired changes to sentence length or complexity]
Additional notes: [Add any other helpful information or preferences for the adjusted text, such as tone, format, or specific areas to focus on]`
    },
    {
        id: 12,
        category: 'differentiation',
        title: 'Summarize content',
        description: 'Create clear, concise summaries for absent students',
        template: `I am a [Enter your role]. Summarize the following content for any students who are not present during the classroom discussion. Ensure the summary is clear, concise, and easy to understand:

Subject and topic: [State the subject and specific topic covered in the lesson]
Reading or excerpt: [If appropriate, enter reading or excerpt name, or paste in the content]
Reading level: [Note the desired reading level]
Learning objectives:
[Enter learning objective]
[Enter learning objective]
[Enter learning objective]

Key points and details: [Summarize the main points and arguments]
Terminology: [Define or explain any important terms or concepts used in the lesson]
Format: [Specify the desired format, such as bullet points, a timeline, a comparison chart, etc.]
Specific theme or context: [Include information about the content's theme or the context in which it will exist]
Level of detail: [Adjust the level of detail to be appropriate for your objective]`
    },
    {
        id: 13,
        category: 'creative-enhancements',
        title: 'Generate engaging examples',
        description: 'Create relatable examples using famous sports players or other contexts',
        template: `I am a [Enter your role]. Based on the following details, generate five examples using famous sports players.

Subject: [Enter subject]
Grade level: [Enter grade level]
Learning objectives:
- [Enter learning objective]
- [Enter learning objective]
- [Enter learning objective]`
    },
    {
        id: 14,
        category: 'creative-enhancements',
        title: 'Develop appropriate examples',
        description: 'Enhance assignments with inclusive, classroom-appropriate examples',
        template: `I am an [Enter your role]. Here is a [Enter subject] assignment for my [Enter grade level and subject] students. Enhance it to include inclusive, classroom appropriate examples, such as by asking students to create a review of the poem for a teen literary magazine:

[Enter assignment]`
    },
    {
        id: 15,
        category: 'creative-enhancements',
        title: 'Create engaging in-class writing exercises',
        description: 'Design time-limited writing assignments for classroom use',
        template: `I am a [Enter your role]. Create an in-class writing assignment for my students about [Enter writing topic]. The in-class writing assignment should include [Enter specific goals] about [Enter topic]. Students must complete their work in [number] minutes.`
    },
    {
        id: 16,
        category: 'creative-enhancements',
        title: 'Apply instructional strategies',
        description: 'Create activities using specific instructional strategies',
        template: `I am a [Enter your role]. Based on the following details, create an activity for [Enter grade] students studying [Enter class topic] that uses [Enter instructional strategy].

Materials: [Paste in textbook chapters or sections, lecture notes, handouts, or other relevant resources]
Reading level: [State the desired reading level for the review activity]
Learning objectives:
- [Enter learning objective]
- [Enter learning objective]
- [Enter learning objective]

Format: [Specify the desired format, like bullet points, a timeline, a comparison chart, etc.]`
    },
    {
        id: 17,
        category: 'creative-enhancements',
        title: 'Add graphics to your worksheets',
        description: 'Create image descriptions for educational presentations',
        template: `I am a [Enter your role]. Based on the following details, create [number] images for a presentation about [Enter topic]:

Subject: [Enter subject]
Grade level: [Enter grade level]
Style: [Enter illustration style]
Materials: [Paste in textbook chapters or sections, lecture notes, handouts, or other relevant resources]
Learning objectives:
- [Enter learning objective]
- [Enter learning objective]
- [Enter learning objective]`
    },
    {
        id: 18,
        category: 'creative-enhancements',
        title: 'Create a story starter prompt',
        description: 'Generate creative writing prompts aligned with learning objectives',
        template: `I am a [Enter your role]. Based on the following information, create a story starter for students to use that aligns with the learning objective:

Subject: [Enter subject]
Grade level: [Enter grade level]
Learning objective: [Specify the learning objective that the story starter should align with]
Specific theme, setting, or context: [Provide details about the story's setting, time period, and genre]
Plot elements: [Provide some hints or suggestions about the plot of the story, but leave room for creativity]
Tone and style: [Indicate the desired tone and style of the story, such as serious, humorous, suspenseful, etc.]`
    },
    {
        id: 19,
        category: 'assessments',
        title: 'Create an assessment',
        description: 'Design comprehensive assessments covering learning objectives',
        template: `I am a [Enter your role]. Based on the following information, create a comprehensive and engaging assessment for my students. The assessment should:
- Cover all of the stated learning objectives
- Be aligned with the chosen assessment type and format
- Clearly evaluate the desired skills and knowledge
- Provide clear instructions and expectations for students
- Include answer keys or a rubric for grading

Subject: [Enter subject]
Grade level: [Enter grade level]
Learning objectives:
- [Enter learning objective]
- [Enter learning objective]
- [Enter learning objective]

Assessment type: [Note whether the assessment should be formative, summative, individual, group, written, oral, performance-based, etc.]
Desired skills assessed: [List specific skills or knowledge, as well as any critical thinking or higher-order skills to be evaluated]
Time allotment: [Enter estimated time for the assessment; include desired number of questions, if applicable]
Other criteria: [Include any existing rubrics or assessment criteria the AI tool should reference]`
    },
    {
        id: 20,
        category: 'assessments',
        title: 'Generate exit tickets',
        description: 'Create quick assessment activities for the end of class',
        template: `I am a [Enter your role]. Based on the following details, create [number] exit ticket activities and questions for the end of my class:

Subject: [Enter subject]
Grade level: [Enter grade level]
Materials: [Paste in a summary of topics covered in the class, lecture notes, handouts, or other relevant resources]
Learning objectives:
- [Enter learning objective]
- [Enter learning objective]
- [Enter learning objective]

These activities and questions should be concise and assess students' understanding of the lesson material.`
    },
    {
        id: 21,
        category: 'communication',
        title: 'Write a message to families about an upcoming event',
        description: 'Draft engaging emails inviting parents to school events',
        template: `I am a [Enter your role]. Based on the information provided, draft an engaging and informative email inviting parents to attend the [event name]. Encourage their participation by highlighting the benefits for students, fostering a sense of community, and clearly outlining the event details:

Subject: [Event name] invitation: Join us!
Grade level: [Enter grade level]
Event date and time: [Enter date and time]
Event description: [Provide a brief overview of the event, its purpose, and any highlights]
Target audience: [Specify if the event is for all guardians, specific grade levels, or particular student groups]
Desired outcome: [State your goal for parent participation, such as increased engagement, community building, supporting student learning, etc.]
Tone: [Note the particular tone or message to be conveyed, such as enthusiastic, informative, persuasive, etc.]
Optional additional information: [Include any special activities planned, whether refreshments will be served, if it's necessary to RSVP or register]`
    },
    {
        id: 22,
        category: 'communication',
        title: 'Create an email newsletter',
        description: 'Design regular newsletters for parent and community engagement',
        template: `I am a [Enter your role]. Based on the information provided, draft a [Enter newsletter cadence] focused on [Enter newsletter topics]. Include sections for [Enter necessary section headers]. Encourage readers' participation by highlighting the benefits for students, fostering a sense of community, and clearly outlining the [event details or upcoming events]:

Subject: [Enter the subject]
Grade: [Include grade-level]
Upcoming events: [Provide a brief overview of any events, their purpose, and any highlights]
Target audience: [Specify if the event is for all guardians, specific grade levels, or particular student groups]
Desired outcome: [State your goal for parent participation, such as increased engagement, community building, supporting student learning, etc.]
Tone: [Note the particular tone or message to be conveyed, such as enthusiastic, informative, persuasive, etc.]
Length: [Specify how many pages the newsletter should be]
Optional additional Information: [Include any special dates, additional notices, or important information]`
    },
    {
        id: 23,
        category: 'communication',
        title: 'Create a classroom reminder prompt',
        description: 'Draft helpful reminders for students about materials and assignments',
        template: `I am a [Enter your role]. Based on the information provided, draft a helpful note to students reminding them to bring a [Enter item, such as graphing calculator, current news article, or sketchbook, etc.] for this week's lesson about [Specify lesson topic]:

Lesson date: [Enter date]
Materials: [Indicate what students should bring]
Format: [Specify the desired format, such as a learning management system announcement, a text message, an email, etc.]
Level of detail: [Adjust the level of detail to be appropriate for your reminder]
Tone: [Note the tone, such as enthusiastic, persuasive, etc.]`
    },
    {
        id: 24,
        category: 'communication',
        title: 'Set classroom expectations',
        description: 'Compose professional communications about student expectations',
        template: `I am a [Enter your role] composing a class communication regarding expectations for students over the summer. The message should be about 75 words long and encourage students to [Enter expectations] in preparation for next school year. Write it with a professional, yet friendly and inclusive, tone. The format is an email.`
    }
];

const categoriesData = [
    { id: 'all', name: 'All Prompts', icon: BookOpen },
    { id: 'activities', name: 'Activities', icon: Users },
    { id: 'lesson-plans', name: 'Lesson Plans', icon: FileText },
    { id: 'differentiation', name: 'Differentiation', icon: Target },
    { id: 'creative-enhancements', name: 'Creative Enhancements', icon: Star },
    { id: 'assessments', name: 'Assessments', icon: FileText },
    { id: 'communication', name: 'Communication', icon: MessageSquare }
];

const categories: Category[] = categoriesData.map(category => ({
    ...category,
    count: category.id === 'all' ? prompts.length : prompts.filter(p => p.category === category.id).length
}));


// --- UI COMPONENTS ---

const LibraryHeader = ({ searchTerm, setSearchTerm }: LibraryHeaderProps) => (
    <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">GenAI for Educators</h1>
                    <p className="text-lg text-gray-600">Prompt Library</p>
                </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                    <strong>86%</strong> of teachers expect to save at least 2 hours per week using generative AI tools.
                    <strong> Tens of thousands</strong> of teachers have completed Generative AI for Educators since it launched in Spring 2024.
                </p>
            </div>

            <div className="relative">
                <label htmlFor="search-prompts" className="sr-only">Search prompts</label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    id="search-prompts"
                    type="text"
                    placeholder="Search prompts..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    </div>
);

const CategorySidebar = ({ selectedCategory, setSelectedCategory }: CategorySidebarProps) => (
    <div className="lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    return (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                                isSelected
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                <Icon className="w-4 h-4" />
                                <span>{category.name}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${isSelected ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'}`}>
                                {category.count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    </div>
);

const PromptCard = ({ prompt, isExpanded, onToggle, onCopy }: PromptCardProps) => {
    const { id, title, description, category, template } = prompt;
    const [copyText, setCopyText] = useState('Copy Template');

    const handleCopy = () => {
        onCopy(template);
        setCopyText('Copied!');
        setTimeout(() => setCopyText('Copy Template'), 2000);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-3">{description}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                
                <div className="flex space-x-2 mt-4">
                    <button
                        onClick={() => onToggle(id)}
                        aria-expanded={isExpanded}
                        aria-controls={`prompt-template-${id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                        {isExpanded ? 'Hide Template' : 'View Template'}
                    </button>
                    <button
                        onClick={handleCopy}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                    >
                        {copyText}
                    </button>
                </div>

                {isExpanded && (
                    <div id={`prompt-template-${id}`} className="mt-4 p-4 bg-gray-50 rounded-lg border">
                        <h4 className="font-medium text-gray-900 mb-2">Prompt Template:</h4>
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-3 rounded border overflow-x-auto">
                            {template}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

const LibraryFooter = () => (
    <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About Generative AI for Educators</h3>
                <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                    A two-hour, self-paced course designed to help teachers save time, enhance student learning, and personalize instruction with generative AI tools.
                </p>
            </div>
        </div>
    </div>
);


// --- Main Page Component ---

export default function GenAiPromptLibraryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedPromptId, setExpandedPromptId] = useState<number | null>(null);

    const filteredPrompts = useMemo(() => {
        return prompts.filter(prompt => {
            const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const handleTogglePrompt = (id: number) => {
        setExpandedPromptId(prevId => (prevId === id ? null : id));
    };
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <LibraryHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <CategorySidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    
                    <main className="flex-1">
                        <p className="text-gray-600 mb-4">
                            Showing {filteredPrompts.length} of {prompts.length} prompts
                        </p>
                        
                        <div className="space-y-4">
                            {filteredPrompts.length > 0 ? (
                                filteredPrompts.map((prompt) => (
                                    <PromptCard
                                        key={prompt.id}
                                        prompt={prompt}
                                        isExpanded={expandedPromptId === prompt.id}
                                        onToggle={handleTogglePrompt}
                                        onCopy={copyToClipboard}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts found</h3>
                                    <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            
            <LibraryFooter />
        </div>
    );
}