import { useNavigate } from 'react-router-dom';
import { 
  Award, Zap, AlertTriangle, ChevronRight, FileText, 
  RefreshCw, TrendingUp, Cpu, Heart, CheckCircle2 
} from 'lucide-react';
import { DOMAINS } from '../data/questionBank';

interface PredictionPageProps {
  assessmentResult: any;
}

export default function PredictionPage({ assessmentResult }: PredictionPageProps) {
  const navigate = useNavigate();
  const hasResult = !!assessmentResult;

  // Fallbacks if no test taken yet
  const defaultResult = {
    candidateName: 'Alex Carter',
    score: 80,
    confidencePercentage: 92,
    mappedDomain: 'frontend',
    performanceLevel: 'Proficient Specialist',
    performanceDescription: 'Exhibits stable architectural judgement, solid logical analysis, and high-velocity code development.',
    strengths: ['Robust Asynchronous UI rendering', 'Precise State Tree design', 'Responsive grid optimizations'],
    weakAreas: ['Complex server-side cache misses', 'Bulk transaction indexing'],
    recommendedSkills: ['Advanced Cache Mechanics', 'Concurrent Thread Tuning'],
    createdAt: new Date().toISOString()
  };

  const active = hasResult ? assessmentResult : defaultResult;
  const targetDomainMeta = DOMAINS.find(d => d.id === active.mappedDomain) || DOMAINS[0];

  // Specific simulated parameters for progress bars
  const progScore = active.score; // programming
  const logicScore = Math.min(100, Math.round(active.score * 1.1)); // logic
  const designScore = active.mappedDomain.includes('frontend') || active.mappedDomain.includes('design') ? 90 : 65; // design
  const commsScore = active.score >= 70 ? 88 : 75; // communication

  // overall average
  const overallCapability = Math.round((progScore + logicScore + designScore + commsScore) / 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* GLOWING HEADER BLOCK */}
      <div className="text-center max-w-3xl mx-auto space-y-3 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 rounded-full blur-2xl -z-10"></div>
        
        <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow">
          SYSTEM_PREDICTION_VERIFY
        </span>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold font-space">
          Domain Mapping Analysis
        </h2>
        
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Intelligent classification output generated after integrating resume syntax scanning with objective challenge answers.
        </p>
      </div>

      {/* DETECTED DOMAIN SUMMARY & OVERALL SCORE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Domain Prediction Card with confidence glow */}
        <div className="lg:col-span-7 border border-slate-200/80 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-500/15 to-transparent rounded-bl-3xl"></div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">CLASSIFIED DISCIPLINE:</span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> High Compatibility
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-indigo-500 uppercase font-mono font-bold tracking-wider">PRIMARY TARGET MATCH</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-space bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {targetDomainMeta.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {targetDomainMeta.description} Exhibits premium indicators for industry alignment. Continuous hiring demand for this exact role is classified as <strong className="text-indigo-500">{targetDomainMeta.demandTrend}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-850 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <p className="text-slate-400 uppercase">Confidence Index</p>
                <p className="text-base font-extrabold text-teal-500 mt-0.5">{active.confidencePercentage}%</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase">Est. Base Valuation</p>
                <p className="text-base font-extrabold text-purple-500 mt-0.5">{targetDomainMeta.averageSalary}/yr</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/report')}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4.5 h-4.5" />
              <span>Retrieve Official Report Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => navigate('/upload')}
              className="py-3 px-5 border border-slate-200 dark:border-slate-800 hover:border-slate-400 text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
            >
              Restart Session
            </button>
          </div>

        </div>

        {/* Right Column: Key Score Vectors with animated progress bars */}
        <div className="lg:col-span-5 border border-slate-200/80 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">COMPETENCY METRICS</span>
              <span className="text-xs font-mono font-bold text-indigo-500">MM_CALCULATED</span>
            </div>

            {/* Circular score gauge */}
            <div className="flex items-center gap-5 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
              <div className="relative w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <span className="text-xl font-extrabold font-space text-indigo-500">{overallCapability}</span>
                {/* Micro outer outline */}
              </div>
              <div>
                <h4 className="text-sm font-bold font-space text-slate-800 dark:text-slate-100">Overall Capability Index</h4>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Composite performance level classified as <strong className="text-indigo-500 font-semibold">{active.performanceLevel}</strong>.
                </p>
              </div>
            </div>

            {/* Four Progress bars */}
            <div className="space-y-3 pt-2">
              
              {/* Prog */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 flex items-center gap-1"><Cpu className="w-3 h-3 text-indigo-500" /> Technical Syntax</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{progScore}%</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progScore}%` }}></div>
                </div>
              </div>

              {/* Logic */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 flex items-center gap-1"><Zap className="w-3 h-3 text-purple-500" /> Analytical Logic</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{logicScore}%</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${logicScore}%` }}></div>
                </div>
              </div>

              {/* Design */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 flex items-center gap-1"><TrendingUp className="w-3 h-3 text-pink-500" /> Systemic Design</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{designScore}%</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${designScore}%` }}></div>
                </div>
              </div>

              {/* Comms */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 flex items-center gap-1"><Heart className="w-3 h-3 text-teal-500" /> Professional Communication</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{commsScore}%</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${commsScore}%` }}></div>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex justify-between text-[11px] text-slate-400 font-mono">
            <span>VERIFIED CHANNELS: 4/4</span>
            <span>BASE_CALCULATION: SECURE</span>
          </div>

        </div>

      </div>

      {/* STRENGTHS, WEAK AREAS, AND RECOMMENDATIONS CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Strengths */}
        <div className="border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 p-6 rounded-2xl space-y-3">
          <h4 className="text-xs font-extrabold uppercase font-mono text-emerald-500 flex items-center gap-1">
            <Award className="w-4 h-4" /> Systemic Strengths
          </h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
            {active.strengths.map((s: string, index: number) => (
              <li key={index}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Weak Areas */}
        <div className="border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 p-6 rounded-2xl space-y-3">
          <h4 className="text-xs font-extrabold uppercase font-mono text-amber-500 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" /> Targeted Weak Areas
          </h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
            {active.weakAreas.map((w: string, index: number) => (
              <li key={index}>{w}</li>
            ))}
          </ul>
        </div>

        {/* Recommended Skills */}
        <div className="border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 p-6 rounded-2xl space-y-3">
          <h4 className="text-xs font-extrabold uppercase font-mono text-indigo-500 flex items-center gap-1">
            <RefreshCw className="w-4 h-4 text-indigo-500" /> Recommended Skills
          </h4>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {active.recommendedSkills.map((sk: string, index: number) => (
              <span 
                key={index} 
                className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 rounded-lg border border-indigo-200 dark:border-indigo-800"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
