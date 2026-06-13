import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Activity, ArrowLeft, Award, BarChart3, Brain, Gauge, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';
import PageBackground from '../components/PageBackground';

interface AnalyticsPageProps {
  assessmentResult: any;
}

const palette = ['#7c3aed', '#a855f7', '#c084fc', '#ec4899', '#6366f1', '#22d3ee', '#10b981', '#f59e0b'];

export default function AnalyticsPage({ assessmentResult }: AnalyticsPageProps) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('mm_profile');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  const fallbackResult = {
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: 15,
    candidateName: profile?.candidateName || 'Candidate',
    performanceLevel: 'Pending Assessment',
    categoryScores: [
      { name: 'Resume Parsed', score: profile?.confidence || 0 },
      { name: 'Skills Found', score: Math.min((profile?.skills?.length || 0) * 8, 90) },
      { name: 'Projects', score: profile?.projects ? 65 : 0 },
      { name: 'Assessment', score: 0 }
    ],
    skills: profile?.skills || [],
    strengths: ['Resume parsing completed', 'Skill extraction ready'],
    weakAreas: ['Complete assessment to unlock deeper analytics']
  };

  const activeResult = assessmentResult || fallbackResult;
  const skills = profile?.skills?.length ? profile.skills : activeResult.skills || [];
  const skillConfidence = profile?.skillConfidence || {};

  const skillData = useMemo(() => {
    const source = skills.length ? skills : ['Resume', 'Projects', 'Skills', 'Assessment'];
    return source.slice(0, 8).map((skill: string, index: number) => ({
      skill,
      score: skillConfidence[skill] || Math.max(35, (profile?.confidence || 65) - index * 4),
      benchmark: 70
    }));
  }, [skills, skillConfidence, profile]);

  const categoryData = useMemo(() => {
    const base = activeResult.categoryScores?.length
      ? activeResult.categoryScores
      : [
          { name: 'Resume Quality', score: profile?.confidence || 0 },
          { name: 'Skill Coverage', score: Math.min((skills.length || 0) * 8, 90) },
          { name: 'Project Evidence', score: profile?.projects ? 70 : 20 },
          { name: 'Assessment', score: activeResult.score || 0 }
        ];
    return base.map((item: any) => ({ subject: item.name, score: item.score, fullMark: 100 }));
  }, [activeResult, profile, skills.length]);

  const answerData = [
    { name: 'Correct', value: activeResult.correctAnswers || 0, color: '#10b981' },
    { name: 'Wrong / Skipped', value: activeResult.wrongAnswers || 0, color: '#ef4444' },
    { name: 'Aptitude %', value: activeResult.aptitude?.score || 0, color: '#22d3ee' },
    { name: 'Resume Skill %', value: activeResult.resumeSkillAssessment?.score || 0, color: '#a855f7' }
  ];

  const timelineData = [
    { step: 'Upload', score: profile ? 28 : 0 },
    { step: 'Parse', score: profile ? profile.confidence || 60 : 0 },
    { step: 'Map', score: Math.min((skills.length || 0) * 9, 92) },
    { step: 'Assess', score: activeResult.score || 0 },
    { step: 'Ready', score: Math.round(((profile?.confidence || 0) * 0.5) + ((activeResult.score || 0) * 0.5)) }
  ];

  const evidenceData = [
    { label: 'Skills', value: skills.length || 0 },
    { label: 'Projects', value: profile?.projectsDetailed?.length || (profile?.projects ? 1 : 0) },
    { label: 'Internships', value: profile?.internshipsDetailed?.length || (profile?.internships ? 1 : 0) },
    { label: 'Certificates', value: profile?.certifications?.length || 0 }
  ];

  const readiness = Math.round(((profile?.confidence || 0) * 0.45) + ((activeResult.score || 0) * 0.4) + Math.min(skills.length * 3, 15));

  const kpis = [
    { label: 'Overall Score', value: `${activeResult.score || 0}%`, icon: <Gauge className="w-5 h-5" />, color: 'text-purple-300' },
    { label: 'Aptitude Score', value: `${activeResult.aptitude?.score || 0}%`, icon: <Activity className="w-5 h-5" />, color: 'text-cyan-300' },
    { label: 'Skill Coverage', value: skills.length || 0, icon: <Brain className="w-5 h-5" />, color: 'text-cyan-300' },
    { label: 'Readiness', value: `${readiness}%`, icon: <Award className="w-5 h-5" />, color: 'text-amber-300' }
  ];

  return (
    <PageBackground>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14 space-y-8 text-slate-100 animate-fade-in">
        <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div className="space-y-3">
            <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 text-xs font-bold text-purple-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Analytics Engine
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Performance analytics</h1>
            <p className="text-slate-400 max-w-2xl">
              A focused analytics view of skill confidence, assessment accuracy, evidence strength, and readiness trends.
            </p>
          </div>

          {!assessmentResult && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-300 max-w-sm">
              <p className="text-sm font-bold">Assessment pending</p>
              <p className="text-xs text-amber-200/70 mt-1">Complete the test to unlock final accuracy and readiness indicators.</p>
            </div>
          )}
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <div key={index} className="rounded-[26px] border border-slate-800 bg-[#0f0b1b]/45 backdrop-blur-md p-5">
              <div className={`inline-flex p-2.5 rounded-xl bg-white/5 ${kpi.color}`}>{kpi.icon}</div>
              <p className="mt-4 text-3xl font-extrabold text-white">{kpi.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-slate-500 font-mono font-bold">{kpi.label}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="soft-card xl:col-span-8 rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/45 backdrop-blur-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Skill Confidence</p>
                <h2 className="text-2xl font-extrabold text-white mt-1">Extracted skill performance</h2>
              </div>
              <BarChart3 className="w-6 h-6 text-purple-300" />
            </div>
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="skill" tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#cbd5e1', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(168,85,247,0.04)' }} 
                    contentStyle={{ 
                      background: 'rgba(11, 11, 20, 0.98)', 
                      border: '1px solid rgba(168,85,247,0.3)', 
                      borderRadius: 16, 
                      backdropFilter: 'blur(10px)',
                      color: '#fff',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                    labelStyle={{ color: '#cbd5e1', fontWeight: 600 }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="score" radius={[10, 10, 0, 0]} barSize={32}>{skillData.map((_item: any, index: number) => <Cell key={index} fill={palette[index % palette.length]} />)}</Bar>
                  <Bar dataKey="benchmark" fill="rgba(168,85,247,0.08)" radius={[10, 10, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="soft-card xl:col-span-4 rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/45 backdrop-blur-md p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Accuracy Mix</p>
            <h2 className="text-xl font-extrabold text-white mt-1 mb-6">Question outcomes</h2>
            <div className="h-[280px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={answerData} cx="50%" cy="50%" innerRadius={72} outerRadius={105} paddingAngle={4} dataKey="value">
                    {answerData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(11, 11, 20, 0.98)', 
                      border: '1px solid rgba(168,85,247,0.3)', 
                      borderRadius: 16, 
                      backdropFilter: 'blur(10px)',
                      color: '#fff',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                    labelStyle={{ color: '#cbd5e1', fontWeight: 600 }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-3xl font-extrabold text-white">{activeResult.correctAnswers || 0}/{activeResult.totalQuestions || 15}</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 font-bold">Correct</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="soft-card rounded-[32px] border border-slate-800 bg-[#0f0b1b]/45 backdrop-blur-md p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Capability Profile</p>
            <h3 className="text-xl font-extrabold text-white mt-1 mb-5">Radar view</h3>
            <div className="h-[270px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="78%" data={categoryData}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                  <Radar dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.35} strokeWidth={2} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(11, 11, 20, 0.98)', 
                      border: '1px solid rgba(168,85,247,0.3)', 
                      borderRadius: 16, 
                      backdropFilter: 'blur(10px)',
                      color: '#fff',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                    labelStyle={{ color: '#cbd5e1', fontWeight: 600 }}
                    itemStyle={{ color: '#fff' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="soft-card rounded-[32px] border border-slate-800 bg-[#0f0b1b]/45 backdrop-blur-md p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Resume Evidence</p>
            <h3 className="text-xl font-extrabold text-white mt-1 mb-5">Signals found</h3>
            <div className="h-[270px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evidenceData} margin={{ top: 20, right: 10, left: -25, bottom: 20 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#cbd5e1', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(168,85,247,0.05)' }}
                    contentStyle={{ background: 'rgba(11, 11, 20, 0.9)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 16, backdropFilter: 'blur(10px)', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#8b5cf6" barSize={28}>
                    {evidenceData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={palette[(index + 4) % palette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="soft-card rounded-[32px] border border-slate-800 bg-[#0f0b1b]/45 backdrop-blur-md p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Readiness Trend</p>
            <h3 className="text-xl font-extrabold text-white mt-1 mb-5">Progress curve</h3>
            <div className="h-[270px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="analyticsArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="step" tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(11, 11, 20, 0.98)', 
                      border: '1px solid rgba(168,85,247,0.3)', 
                      borderRadius: 16, 
                      backdropFilter: 'blur(10px)',
                      color: '#fff',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                    labelStyle={{ color: '#cbd5e1', fontWeight: 600 }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#c084fc" strokeWidth={3} fill="url(#analyticsArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[32px] border border-emerald-500/15 bg-emerald-500/5 p-6">
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Strengths
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {(activeResult.strengths || []).map((item: string, index: number) => (
                <li key={index} className="flex gap-2"><span className="text-emerald-400">✓</span>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[32px] border border-purple-500/15 bg-purple-500/5 p-6">
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-purple-300 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Improvement Areas
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {(activeResult.weakAreas || []).map((item: string, index: number) => (
                <li key={index} className="flex gap-2"><span className="text-purple-400">•</span>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </PageBackground>
  );
}