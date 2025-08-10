"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Globe, Microscope, Target, TrendingUp, Shield, AlertTriangle, CheckCircle, XCircle, Info, ExternalLink, Plus, Minus } from 'lucide-react';

interface ContentItem {
  zh: string;
  en: string;
}

interface Section {
  id: string;
  title: ContentItem;
  content: ContentItem[];
  subsections?: Section[];
}

interface BiomarkerData {
  name: ContentItem;
  cancers: ContentItem;
  interferences: ContentItem;
  uses: ContentItem;
  limitations: ContentItem;
}

const CancerBiomarkersGuide: React.FC = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));
  const [expandedBiomarkers, setExpandedBiomarkers] = useState<boolean>(false);
  const [expandedScreening, setExpandedScreening] = useState<Set<string>>(new Set());
  const [expandedHighRisk, setExpandedHighRisk] = useState<boolean>(false);
  const [expandedFuture, setExpandedFuture] = useState<boolean>(false);

  const content = {
    title: {
      zh: "癌症生物标志物与循证早期筛查综合指南",
      en: "Comprehensive Guide to Cancer Biomarkers and Evidence-Based Early Screening"
    },
    subtitle: {
      zh: "从科学原理到临床实践的完整解析",
      en: "Complete Analysis from Scientific Principles to Clinical Practice"
    },
    languageSwitch: {
      zh: "English",
      en: "中文"
    }
  };

  const biomarkerData: BiomarkerData[] = [
    {
      name: { zh: "甲胎蛋白 (AFP)", en: "Alpha-fetoprotein (AFP)" },
      cancers: { zh: "原发性肝细胞癌、生殖腺胚胎源性肿瘤", en: "Primary hepatocellular carcinoma, germ cell tumors" },
      interferences: { zh: "肝炎活动期、肝硬化、妊娠", en: "Active hepatitis, cirrhosis, pregnancy" },
      uses: { zh: "高危人群筛查、辅助诊断、疗效与复发监测", en: "High-risk screening, auxiliary diagnosis, treatment monitoring" },
      limitations: { zh: "约30%肝癌患者AFP正常；肝炎活动期可致假阳性", en: "~30% of liver cancer patients have normal AFP; false positives during active hepatitis" }
    },
    {
      name: { zh: "癌胚抗原 (CEA)", en: "Carcinoembryonic antigen (CEA)" },
      cancers: { zh: "结直肠癌、肺癌、胃癌、乳腺癌、胰腺癌", en: "Colorectal, lung, gastric, breast, pancreatic cancers" },
      interferences: { zh: "吸烟、炎症性肠病、胰腺炎、肝硬化、肺炎", en: "Smoking, IBD, pancreatitis, cirrhosis, pneumonia" },
      uses: { zh: "预后评估、疗效与复发监测（尤其适用于结直肠癌）", en: "Prognosis assessment, treatment monitoring (especially colorectal cancer)" },
      limitations: { zh: "特异性极低，严禁用于普通人群筛查；吸烟者基线水平偏高", en: "Very low specificity, prohibited for general population screening; elevated baseline in smokers" }
    },
    {
      name: { zh: "前列腺特异性抗原 (PSA)", en: "Prostate-specific antigen (PSA)" },
      cancers: { zh: "前列腺癌", en: "Prostate cancer" },
      interferences: { zh: "良性前列腺增生(BPH)、前列腺炎、年龄增长、射精", en: "BPH, prostatitis, aging, ejaculation" },
      uses: { zh: "筛查（需共同决策）、辅助诊断、疗效与复发监测", en: "Screening (shared decision-making), auxiliary diagnosis, treatment monitoring" },
      limitations: { zh: "无法区分惰性与侵袭性癌症，导致过度诊断与治疗；BPH是主要干扰因素", en: "Cannot distinguish indolent from aggressive cancers, leading to overdiagnosis; BPH is major interference" }
    },
    {
      name: { zh: "癌抗原125 (CA-125)", en: "Cancer antigen 125 (CA-125)" },
      cancers: { zh: "卵巢癌（上皮性）", en: "Ovarian cancer (epithelial)" },
      interferences: { zh: "子宫内膜异位症、盆腔炎、子宫肌瘤、妊娠、月经、肝病、其他多种癌症", en: "Endometriosis, PID, uterine fibroids, pregnancy, menstruation, liver disease, various cancers" },
      uses: { zh: "盆腔肿块风险评估、疗效与复发监测", en: "Pelvic mass risk assessment, treatment monitoring" },
      limitations: { zh: "特异性差，尤其在绝经前女性中假阳性率高，不用于普通人群筛查", en: "Poor specificity, high false positive rate in premenopausal women, not for general screening" }
    },
    {
      name: { zh: "癌抗原19-9 (CA19-9)", en: "Cancer antigen 19-9 (CA19-9)" },
      cancers: { zh: "胰腺癌、胆管癌、结直肠癌、胃癌", en: "Pancreatic, bile duct, colorectal, gastric cancers" },
      interferences: { zh: "胰腺炎、胆管炎、梗阻性黄疸、肝硬化", en: "Pancreatitis, cholangitis, obstructive jaundice, cirrhosis" },
      uses: { zh: "辅助诊断、疗效与复发监测（尤其适用于胰腺癌）", en: "Auxiliary diagnosis, treatment monitoring (especially pancreatic cancer)" },
      limitations: { zh: "胆道梗阻和胰腺炎是常见干扰因素；少数人先天不表达此抗原", en: "Biliary obstruction and pancreatitis are common interfering factors; some individuals congenitally lack this antigen" }
    },
    {
      name: { zh: "癌抗原15-3 (CA15-3)", en: "Cancer antigen 15-3 (CA15-3)" },
      cancers: { zh: "乳腺癌", en: "Breast cancer" },
      interferences: { zh: "肝癌、肺癌、卵巢癌等；良性乳腺疾病、肝病", en: "Liver, lung, ovarian cancers; benign breast diseases, liver diseases" },
      uses: { zh: "疗效与复发监测（尤其对转移性乳腺癌）", en: "Treatment and recurrence monitoring (especially metastatic breast cancer)" },
      limitations: { zh: "对早期乳腺癌不敏感，不用于筛查或早期诊断", en: "Not sensitive for early breast cancer, not used for screening or early diagnosis" }
    },
    {
      name: { zh: "细胞角蛋白19片段 (CYFRA21-1)", en: "Cytokeratin 19 fragment (CYFRA21-1)" },
      cancers: { zh: "非小细胞肺癌（鳞癌、腺癌）", en: "Non-small cell lung cancer (squamous, adenocarcinoma)" },
      interferences: { zh: "膀胱癌、乳腺癌等；良性肝病、肾功能衰竭", en: "Bladder, breast cancers; benign liver diseases, renal failure" },
      uses: { zh: "辅助诊断、疗效与复发监测", en: "Auxiliary diagnosis, treatment monitoring" },
      limitations: { zh: "肾功能衰竭可致假性升高", en: "Renal failure can cause false elevation" }
    },
    {
      name: { zh: "鳞状细胞癌相关抗原 (SCC)", en: "Squamous cell carcinoma antigen (SCC)" },
      cancers: { zh: "鳞状细胞癌（肺、宫颈、食管、头颈）", en: "Squamous cell carcinomas (lung, cervical, esophageal, head & neck)" },
      interferences: { zh: "某些皮肤病、肾功能衰竭", en: "Certain skin diseases, renal failure" },
      uses: { zh: "辅助诊断、疗效与复发监测", en: "Auxiliary diagnosis, treatment monitoring" },
      limitations: { zh: "特异性相对较好，但仍受肾功能等影响", en: "Relatively good specificity, but still affected by renal function" }
    },
    {
      name: { zh: "神经元特异性烯醇化酶 (NSE)", en: "Neuron-specific enolase (NSE)" },
      cancers: { zh: "小细胞肺癌、神经内分泌肿瘤", en: "Small cell lung cancer, neuroendocrine tumors" },
      interferences: { zh: "神经母细胞瘤、甲状腺髓质癌", en: "Neuroblastoma, medullary thyroid carcinoma" },
      uses: { zh: "辅助诊断、疗效与复发监测", en: "Auxiliary diagnosis, treatment monitoring" },
      limitations: { zh: "血液样本溶血会导致假性升高", en: "Hemolysis in blood samples causes false elevation" }
    }
  ];

  const screeningGuidelines = [
    {
      id: 'lung',
      cancer: { zh: "肺癌", en: "Lung Cancer" },
      population: { zh: "高危人群：50-80岁，吸烟史≥20-30包年，现吸烟或戒烟<15年", en: "High-risk: 50-80 years, ≥20-30 pack-years, current smokers or quit <15 years" },
      method: { zh: "低剂量螺旋CT (LDCT)", en: "Low-dose spiral CT (LDCT)" },
      frequency: { zh: "每年1次", en: "Annual" },
      notes: { zh: "唯一被证实能降低肺癌死亡率的筛查方法；假阳性率高是主要挑战", en: "Only proven method to reduce lung cancer mortality; high false positive rate is main challenge" },
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 'breast',
      cancer: { zh: "乳腺癌", en: "Breast Cancer" },
      population: { zh: "平均风险女性：40/45岁开始至75岁以上（个体化）", en: "Average risk women: 40/45 years to 75+ (individualized)" },
      method: { zh: "乳腺X线摄影（钼靶），可选择3D钼靶", en: "Mammography, optional 3D mammography" },
      frequency: { zh: "每年或每2年1次", en: "Annual or biennial" },
      notes: { zh: "40岁开始筛查需与医生共同决策；高危人群（如BRCA突变）需增加MRI筛查", en: "Screening from 40 requires shared decision-making; high-risk groups (BRCA mutations) need additional MRI" },
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 'colorectal',
      cancer: { zh: "结直肠癌", en: "Colorectal Cancer" },
      population: { zh: "平均风险人群：45岁开始至75岁", en: "Average risk: 45-75 years" },
      method: { zh: "1. 结肠镜 2. FIT-DNA检测 3. FIT检测", en: "1. Colonoscopy 2. FIT-DNA testing 3. FIT testing" },
      frequency: { zh: "1. 每10年 2. 每3年 3. 每年", en: "1. Every 10 years 2. Every 3 years 3. Annual" },
      notes: { zh: "结肠镜是唯一兼具诊断和预防作用的方法；粪便检测阳性者必须接受结肠镜检查", en: "Colonoscopy is the only method with both diagnostic and preventive capabilities; positive stool tests require colonoscopy" },
      color: "from-green-500 to-green-600"
    },
    {
      id: 'cervical',
      cancer: { zh: "宫颈癌", en: "Cervical Cancer" },
      population: { zh: "有宫颈者：21/25岁开始至65岁", en: "Individuals with cervix: 21/25-65 years" },
      method: { zh: "1. HPV检测 (30-65岁) 2. HPV+Pap联合检测 (30-65岁) 3. Pap检测 (21-29岁)", en: "1. HPV testing (30-65) 2. HPV+Pap co-testing (30-65) 3. Pap testing (21-29)" },
      frequency: { zh: "1. 每5年 2. 每5年 3. 每3年", en: "1. Every 5 years 2. Every 5 years 3. Every 3 years" },
      notes: { zh: "筛查可有效发现并治疗癌前病变，从而预防癌症；HPV疫苗是主要的一级预防手段", en: "Screening effectively detects and treats precancerous lesions; HPV vaccine is primary prevention" },
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 'liver',
      cancer: { zh: "肝癌", en: "Liver Cancer" },
      population: { zh: "高危人群：慢性乙肝/丙肝、肝硬化患者，通常从40岁开始", en: "High-risk: Chronic HBV/HCV, cirrhosis patients, usually starting from age 40" },
      method: { zh: "腹部超声 + 甲胎蛋白(AFP)", en: "Abdominal ultrasound + AFP" },
      frequency: { zh: "每6个月1次", en: "Every 6 months" },
      notes: { zh: "严禁用于普通人群筛查；高频次监测是关键；AFP存在假阳性和假阴性", en: "Prohibited for general population screening; high-frequency monitoring is key; AFP has false positives/negatives" },
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 'gastric',
      cancer: { zh: "胃癌", en: "Gastric Cancer" },
      population: { zh: "高危人群：如Hp感染、萎缩性胃炎、家族史者，通常从40/45岁开始", en: "High-risk: H. pylori infection, atrophic gastritis, family history, usually from 40/45 years" },
      method: { zh: "上消化道内镜（胃镜）", en: "Upper endoscopy (gastroscopy)" },
      frequency: { zh: "每2-5年（根据风险分层）", en: "Every 2-5 years (risk-stratified)" },
      notes: { zh: "不对普通人群进行筛查；可发现早期胃癌和癌前病变；内镜下可微创治疗", en: "Not for general population screening; can detect early gastric cancer and precancerous lesions; minimally invasive endoscopic treatment available" },
      color: "from-teal-500 to-teal-600"
    }
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleScreeningItem = (itemId: string) => {
    const newExpanded = new Set(expandedScreening);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedScreening(newExpanded);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Microscope className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {content.title[language]}
                </h1>
                <p className="text-gray-600 mt-1">
                  {content.subtitle[language]}
                </p>
              </div>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Globe className="h-4 w-4" />
              <span>{content.languageSwitch[language]}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-500" />
                {language === 'zh' ? '目录导航' : 'Table of Contents'}
              </h2>
              <nav className="space-y-2">
                {[
                  { id: 'overview', title: { zh: '概述', en: 'Overview' } },
                  { id: 'biomarkers', title: { zh: '生物标志物', en: 'Biomarkers' } },
                  { id: 'screening', title: { zh: '筛查指南', en: 'Screening Guidelines' } },
                  { id: 'highrisk', title: { zh: '高危筛查', en: 'High-Risk Screening' } },
                  { id: 'future', title: { zh: '未来展望', en: 'Future Outlook' } }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.title[language]}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 space-y-6">
            {/* Overview Section */}
            <section id="overview" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white">
                    <Info className="h-6 w-6 mr-3" />
                    <h2 className="text-2xl font-bold">
                      {language === 'zh' ? '概述' : 'Overview'}
                    </h2>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                      {language === 'zh' ? '什么是肿瘤标志物？' : 'What are Tumor Markers?'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'zh' 
                        ? '肿瘤标志物是反映肿瘤存在的化学类物质，可在血液、体液或组织中检测到。它们并非癌症的最终判决，而是需要结合临床背景进行解读的生物信号。' 
                        : 'Tumor markers are chemical substances that reflect the presence of tumors, detectable in blood, body fluids, or tissues. They are not final verdicts of cancer, but biological signals that need interpretation within clinical context.'}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3">
                      {language === 'zh' ? '核心应用领域' : 'Core Applications'}
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {language === 'zh' ? '辅助诊断' : 'Auxiliary Diagnosis'}
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {language === 'zh' ? '预后评估' : 'Prognosis Assessment'}
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {language === 'zh' ? '治疗监测' : 'Treatment Monitoring'}
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {language === 'zh' ? '复发监测' : 'Recurrence Monitoring'}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">
                        {language === 'zh' ? '重要提醒' : 'Important Note'}
                      </h4>
                      <p className="text-yellow-700 mt-1">
                        {language === 'zh' 
                          ? '绝大多数肿瘤标志物不适用于普通人群筛查，主要用于高危人群监测和已确诊患者的管理。' 
                          : 'Most tumor markers are not suitable for general population screening, primarily used for high-risk group monitoring and management of diagnosed patients.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Biomarkers Table - Collapsible */}
            <section id="biomarkers" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-pink-400 to-red-500 px-6 py-4 cursor-pointer hover:from-pink-500 hover:to-red-600 transition-all duration-200"
                onClick={() => setExpandedBiomarkers(!expandedBiomarkers)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white">
                    <Target className="h-6 w-6 mr-3" />
                    <h2 className="text-2xl font-bold">
                      {language === 'zh' ? '主要肿瘤标志物详表' : 'Major Tumor Markers Table'}
                    </h2>
                  </div>
                  {expandedBiomarkers ? 
                    <Minus className="h-6 w-6 text-white" /> : 
                    <Plus className="h-6 w-6 text-white" />
                  }
                </div>
              </div>

              {expandedBiomarkers && (
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            {language === 'zh' ? '标志物' : 'Marker'}
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            {language === 'zh' ? '主要关联癌症' : 'Associated Cancers'}
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            {language === 'zh' ? '干扰因素' : 'Interfering Factors'}
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            {language === 'zh' ? '主要用途' : 'Main Uses'}
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            {language === 'zh' ? '局限性' : 'Limitations'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {biomarkerData.map((marker, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 px-4 py-3 font-medium text-blue-700">
                              {marker.name[language]}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">
                              {marker.cancers[language]}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">
                              {marker.interferences[language]}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">
                              {marker.uses[language]}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-700">
                              {marker.limitations[language]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* Screening Guidelines - Collapsible by Cancer Type */}
            <section id="screening" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-400 to-teal-500 px-6 py-4">
                <div className="flex items-center text-white">
                  <Shield className="h-6 w-6 mr-3" />
                  <h2 className="text-2xl font-bold">
                    {language === 'zh' ? '主要癌症筛查指南' : 'Major Cancer Screening Guidelines'}
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {screeningGuidelines.map((guideline) => (
                  <div key={guideline.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${guideline.color} text-white px-6 py-4 cursor-pointer hover:opacity-90 transition-all duration-200`}
                      onClick={() => toggleScreeningItem(guideline.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{guideline.cancer[language]}</h3>
                        {expandedScreening.has(guideline.id) ? 
                          <ChevronDown className="h-5 w-5" /> : 
                          <ChevronRight className="h-5 w-5" />
                        }
                      </div>
                    </div>
                    
                    {expandedScreening.has(guideline.id) && (
                      <div className="p-6 bg-gray-50">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {language === 'zh' ? '目标人群' : 'Target Population'}
                            </h4>
                            <p className="text-gray-700 text-sm">{guideline.population[language]}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {language === 'zh' ? '筛查方法' : 'Screening Method'}
                            </h4>
                            <p className="text-gray-700 text-sm">{guideline.method[language]}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {language === 'zh' ? '筛查频率' : 'Frequency'}
                            </h4>
                            <p className="text-gray-700 text-sm">{guideline.frequency[language]}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {language === 'zh' ? '重要备注' : 'Important Notes'}
                            </h4>
                            <p className="text-gray-700 text-sm">{guideline.notes[language]}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* High-Risk Specific Screening - Collapsible */}
            <section id="highrisk" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-400 to-red-500 px-6 py-4 cursor-pointer hover:from-orange-500 hover:to-red-600 transition-all duration-200"
                onClick={() => setExpandedHighRisk(!expandedHighRisk)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white">
                    <AlertTriangle className="h-6 w-6 mr-3" />
                    <h2 className="text-2xl font-bold">
                      {language === 'zh' ? '高危人群专项筛查详解' : 'High-Risk Population Specific Screening'}
                    </h2>
                  </div>
                  {expandedHighRisk ? 
                    <Minus className="h-6 w-6 text-white" /> : 
                    <Plus className="h-6 w-6 text-white" />
                  }
                </div>
              </div>

              {expandedHighRisk && (
                <div className="p-6 space-y-6">
                  {/* Liver Cancer Detailed Section */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      {language === 'zh' ? '肝癌 - 聚焦高危人群的严密监视' : 'Liver Cancer - Intensive Surveillance for High-Risk Groups'}
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {language === 'zh' ? '高危人群定义' : 'High-Risk Population Definition'}
                        </h5>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {language === 'zh' ? '慢性乙型肝炎病毒（HBV）感染者' : 'Chronic hepatitis B virus (HBV) infected patients'}
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {language === 'zh' ? '慢性丙型肝炎病毒（HCV）感染者' : 'Chronic hepatitis C virus (HCV) infected patients'}
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {language === 'zh' ? '任何原因导致的肝硬化患者' : 'Cirrhosis patients of any etiology'}
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {language === 'zh' ? '有肝癌家族史者' : 'Individuals with family history of liver cancer'}
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {language === 'zh' ? '风险与局限性' : 'Risks and Limitations'}
                        </h5>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li className="flex items-start">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                            {language === 'zh' ? '超声检查准确性依赖操作者经验' : 'Ultrasound accuracy depends on operator experience'}
                          </li>
                          <li className="flex items-start">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                            {language === 'zh' ? 'AFP检测存在假阳性和假阴性' : 'AFP testing has false positives and negatives'}
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            {language === 'zh' ? '可疑结节需进一步影像学确诊' : 'Suspicious nodules require further imaging confirmation'}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Gastric Cancer Detailed Section */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                      <Microscope className="h-5 w-5 mr-2" />
                      {language === 'zh' ? '胃癌 - 针对性内镜筛查' : 'Gastric Cancer - Targeted Endoscopic Screening'}
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {language === 'zh' ? '高危人群定义' : 'High-Risk Population Definition'}
                        </h5>
                        <p className="text-gray-700 text-sm mb-2">
                          {language === 'zh' ? '年龄≥40-45岁，并满足以下任一条件：' : 'Age ≥40-45 years with any of the following:'}
                        </p>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {language === 'zh' ? '幽门螺杆菌（Hp）感染者' : 'Helicobacter pylori (H. pylori) infection'}
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {language === 'zh' ? '慢性萎缩性胃炎、胃溃疡等癌前疾病' : 'Chronic atrophic gastritis, gastric ulcers, etc.'}
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {language === 'zh' ? '胃癌患者一级亲属' : 'First-degree relatives of gastric cancer patients'}
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {language === 'zh' ? '长期高盐、腌制饮食、吸烟等' : 'Long-term high-salt diet, pickled foods, smoking, etc.'}
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {language === 'zh' ? '筛查获益' : 'Screening Benefits'}
                        </h5>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            {language === 'zh' ? '直接观察胃黏膜并活检' : 'Direct visualization of gastric mucosa and biopsy'}
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            {language === 'zh' ? '发现早期胃癌和癌前病变' : 'Detection of early gastric cancer and precancerous lesions'}
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            {language === 'zh' ? '内镜下微创切除，5年生存率>90%' : 'Endoscopic resection, 5-year survival >90%'}
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                      <p className="text-purple-800 text-sm font-medium">
                        {language === 'zh' 
                          ? '注意：胃镜检查需要患者承受一定不适，不适合作为普通人群的普查手段。' 
                          : 'Note: Endoscopy requires patient tolerance of discomfort and is not suitable for general population screening.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Future Outlook - Collapsible */}
            <section id="future" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-400 to-purple-500 px-6 py-4 cursor-pointer hover:from-indigo-500 hover:to-purple-600 transition-all duration-200"
                onClick={() => setExpandedFuture(!expandedFuture)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white">
                    <TrendingUp className="h-6 w-6 mr-3" />
                    <h2 className="text-2xl font-bold">
                      {language === 'zh' ? '未来展望' : 'Future Outlook'}
                    </h2>
                  </div>
                  {expandedFuture ? 
                    <Minus className="h-6 w-6 text-white" /> : 
                    <Plus className="h-6 w-6 text-white" />
                  }
                </div>
              </div>

              {expandedFuture && (
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-blue-500 rounded-lg mr-3">
                          <Microscope className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-blue-800">
                          {language === 'zh' ? '液体活检' : 'Liquid Biopsy'}
                        </h3>
                      </div>
                      <p className="text-gray-700">
                        {language === 'zh' 
                          ? '通过简单的血液检测，检测循环肿瘤DNA（ctDNA）、循环肿瘤细胞（CTC）等，有望实现一次性多癌种筛查。' 
                          : 'Through simple blood tests, detecting circulating tumor DNA (ctDNA), circulating tumor cells (CTC), etc., potentially enabling multi-cancer screening in a single test.'}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-purple-500 rounded-lg mr-3">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-800">
                          {language === 'zh' ? '多组学整合' : 'Multi-omics Integration'}
                        </h3>
                      </div>
                      <p className="text-gray-700">
                        {language === 'zh' 
                          ? '整合蛋白质组学、基因组学、转录组学和代谢组学数据，构建高精度癌症诊断模型。' 
                          : 'Integrating proteomics, genomics, transcriptomics, and metabolomics data to build high-precision cancer diagnostic models.'}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-green-500 rounded-lg mr-3">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-800">
                          {language === 'zh' ? 'AI辅助诊断' : 'AI-Assisted Diagnosis'}
                        </h3>
                      </div>
                      <p className="text-gray-700">
                        {language === 'zh' 
                          ? '人工智能算法辅助医学影像解读，提高筛查准确性，降低假阳性率。' 
                          : 'AI algorithms assist in medical imaging interpretation, improving screening accuracy and reducing false positive rates.'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-3">
                      {language === 'zh' ? '个性化筛查的未来' : 'Future of Personalized Screening'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'zh' 
                        ? '未来的筛查将是一个多模式、风险自适应的整合系统。从低成本的血液检测开始进行风险分层，高风险个体再接受更精准的检查，实现筛查效益最大化，同时最小化经济负担和潜在伤害。' 
                        : 'Future screening will be a multi-modal, risk-adaptive integrated system. Starting with low-cost blood tests for risk stratification, high-risk individuals will then undergo more precise examinations, maximizing screening benefits while minimizing economic burden and potential harm.'}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-lg p-8 text-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'zh' ? '重要提醒' : 'Important Reminder'}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {language === 'zh' 
                    ? '癌症筛查应基于个人风险评估，在医生指导下进行。请勿盲目进行大规模肿瘤标志物检测。' 
                    : 'Cancer screening should be based on individual risk assessment and conducted under medical guidance. Do not blindly undergo large-scale tumor marker testing.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
                    <Shield className="h-5 w-5 mr-2" />
                    {language === 'zh' ? '咨询专业医生' : 'Consult a Specialist'}
                  </button>
                  <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    {language === 'zh' ? '了解更多指南' : 'Learn More Guidelines'}
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              {language === 'zh' 
                ? '本指南仅供教育参考，不可替代专业医疗建议。如有疑问请咨询医疗专业人士。' 
                : 'This guide is for educational reference only and cannot replace professional medical advice. Please consult healthcare professionals if you have questions.'}
            </p>
            <p className="text-gray-400 mt-2 text-sm">
              {language === 'zh' 
                ? '基于最新临床指南和循证医学证据编制' 
                : 'Compiled based on latest clinical guidelines and evidence-based medical evidence'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CancerBiomarkersGuide;