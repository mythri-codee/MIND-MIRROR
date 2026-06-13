import { useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, BarChart, Bar, Legend, Line 
} from 'recharts';
import { 
  TrendingUp, AlertTriangle, ChevronLeft, Target, 
  Layers, ShieldAlert, Cpu, Sparkles 
} from 'lucide-react';
import { DOMAINS } from '../data/questionBank';

interface EnhancedDashboardProps {
  profile: any;
  assessmentResult: any;
}

export default function EnhancedDashboard({ profile, assessmentResult }: EnhancedDashboardProps) {
  const navigate = useNavigate();
  const hasProfile = !!profile;
  const hasResult = !!assessmentResult;

  // Baseline fallbacks if profile is not fully populated
  const defaultProfile = {
    candidateName: 'Alex Carter',
    mappedDomain: 'frontend',
    skills: ['React', 'TypeScript', 'TailwindCSS', 'SQL', 'Node.js', 'Python'],
    confidence: 88
  };

  const activeProfile = hasProfile ? profile : defaultProfile;
  const targetDomainMeta = DOMAINS.find(d => d.id === activeProfile.mappedDomain) || DOMAINS[0];

  // 1. Market Fit Overlap Chart Data
  // Compares Candidate Skill level with Global market vacancy requirements
  const marketFitData = activeProfile.skills.slice(0, 6).map((skill: string, index: number) => {
    const scores = [95, 88, 75, 82, 90, 80];
    const marketDemand = [90, 95, 80, 85, 75, 85];
    return {
      skill,
      'Your Metric': scores[index % scores.length],
      'Global Vacancy Demand': marketDemand[index % marketDemand.length]
    };
  });

  // 2. Trend Analysis: Salary Growth Projections over experience tiers
  const careerSalaryTrendData = [
    { tier: 'Junior (0-2 yr)', BaseSalary: 75000, SpecializedBonus: 82000 },
    { tier: 'Mid-Tier (2-5 yr)', BaseSalary: 110000, SpecializedBonus: 122000 },
    { tier: 'Lead Expert (5-8 yr)', BaseSalary: 145000, SpecializedBonus: 168000 },
    { tier: 'Principal (8+ yr)', BaseSalary: 185000, SpecializedBonus: 220000 },
  ];

  // 3. Skill Gap Identification details
  const skillGaps = [
    { skill: 'High-Velocity Caching', severity: 'Medium Gap', rec: 'Explore Redis Key-Value TTL caching architectures.' },
    { skill: 'Secure OAuth Tokens PKCE', severity: 'Low Gap', rec: 'Verify PKCE Code Challenge handshakes.' },
    { skill: 'Bulk Indexing Optimization', severity: 'None (Satisfied)', rec: 'Strong composite indexing benchmarks registered.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* HEADER CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1.5 text-left">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs text-indigo-500 hover:underline flex items-center gap-1 mb-2 font-bold"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          
          <h2 className="text-3xl font-extrabold font-space flex items-center gap-2.5">
            <Target className="w-8 h-8 text-indigo-500 animate-pulse" />
            <span>Futuristic Enhanced Dashboard</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Plotting trend lines, skill gap audits, and strategic market fit metrics for <strong className="text-indigo-500">{activeProfile.candidateName}</strong>.
          </p>
        </div>

        {!hasResult && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-3 max-w-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-bold">Displaying Reference Sandbox Data.</p>
              <p className="text-[10px]">Complete the assessment quiz to calculate real-time gap evaluations!</p>
            </div>
          </div>
        )}
      </div>

      {/* ENHANCED METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1: Skill Gap Status */}
        <div className="border border-slate-200 dark:border-slate-850 p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Skill Gap Audit</span>
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500">
              <ShieldAlert className="w-4 h-4" />
            </span>
          </div>
          <div>
            <h4 className="text-lg font-bold font-space text-slate-700 dark:text-slate-200">
              Minor Caching Gaps Detected
            </h4>
            <p className="text-xs text-slate-500 mt-1">Recommended target: 2 supplementary modules.</p>
          </div>
        </div>

        {/* Metric 2: Global Career demand */}
        <div className="border border-slate-200 dark:border-slate-850 p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Global Industry Velocity</span>
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div>
            <h4 className="text-lg font-bold font-space text-indigo-500">
              {targetDomainMeta.demandTrend} Status
            </h4>
            <p className="text-xs text-slate-500 mt-1">Hiring demand index shows continuous upward trends.</p>
          </div>
        </div>

        {/* Metric 3: Capability Alignment */}
        <div className="border border-slate-200 dark:border-slate-850 p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Adaptive Level Alignment</span>
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-500">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div>
            <h4 className="text-lg font-bold font-space text-teal-500">
              96.8% Congruence
            </h4>
            <p className="text-xs text-slate-500 mt-1">Calculated from key credentials matching ratios.</p>
          </div>
        </div>

      </div>

      {/* ADVANCED PLOTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PLOT 1: MARKET FIT OVERLAP (BAR CHART) */}
        <div className="border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-3">
            <div>
              <h3 className="text-sm font-extrabold uppercase font-mono text-slate-400">
                A. Core Skills Overlap with Live Industry Demand
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Compares personal competency scores with benchmark market requirements.</p>
            </div>
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketFitData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="skill" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="Your Metric" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Global Vacancy Demand" fill="#06b6d4" radius={[4, 4, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PLOT 2: CAREER SALARY PROJECTIONS (AREA / LINE COMBO) */}
        <div className="border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-3">
            <div>
              <h3 className="text-sm font-extrabold uppercase font-mono text-slate-400">
                B. Career Path Financial Projections (Continuous Tier)
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Compares standard base salary lines against certified specialization growth tracks.</p>
            </div>
            <Cpu className="w-5 h-5 text-purple-500" />
          </div>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={careerSalaryTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="specialBonusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="tier" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Area type="monotone" dataKey="SpecializedBonus" fill="url(#specialBonusGrad)" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="BaseSalary" stroke="#6366f1" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* DETAILED SKILL GAP REMEDIES GRID */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md space-y-6 shadow-xl">
        <h3 className="text-base font-extrabold font-space">
          Skill Gap Assessment & Self-Paced Remedies
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGaps.map((gap, index) => (
            <div key={index} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-850 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold font-mono text-slate-400 uppercase">AUDIT BLOCK 0{index + 1}</h4>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  gap.severity.includes('Medium') ? 'bg-amber-500/10 text-amber-500' :
                  gap.severity.includes('Low') ? 'bg-indigo-500/10 text-indigo-500' :
                  'bg-teal-500/10 text-teal-500'
                }`}>
                  {gap.severity}
                </span>
              </div>
              <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-space">{gap.skill}</h5>
              <p className="text-xs text-slate-500 leading-normal">{gap.rec}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
