import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Briefcase,
  CheckCircle2,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Printer,
  Sparkles,
  Target,
  User
} from 'lucide-react';
import {
  ResponsiveContainer,
  Tooltip,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadarChart,
  Radar
} from 'recharts';
import { DOMAINS } from '../data/questionBank';
import PageBackground from '../components/PageBackground';

export default function ReportPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('mm_profile');
    const savedResult = localStorage.getItem('mm_assessment_result');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedResult) setAssessmentResult(JSON.parse(savedResult));
  }, []);

  // Mythri custom domain report
  const mythriDomains = [
    { domain: 'Full Stack Web Development', percent: 95, reason: 'Strong knowledge in React.js, Node.js, MongoDB, APIs', roles: 'Full Stack Developer, MERN Stack Developer' },
    { domain: 'Frontend Development', percent: 90, reason: 'Skills in HTML, CSS, JavaScript, React.js', roles: 'Frontend Developer, React Developer' },
    { domain: 'Backend Development', percent: 85, reason: 'Knowledge of Node.js, Express.js, DBMS, MongoDB', roles: 'Backend Developer, API Developer' },
    { domain: 'Software Development', percent: 82, reason: 'Java, Python, C programming with DSA knowledge', roles: 'Software Engineer, Application Developer' },
    { domain: 'AI-Based Web Applications', percent: 78, reason: 'GenAI Data Analytics certification and API integration', roles: 'AI Application Developer' },
    { domain: 'Database Management', percent: 75, reason: 'DBMS and MySQL knowledge', roles: 'Database Developer' },
    { domain: 'Web Application Development', percent: 88, reason: 'Real-time news application project experience', roles: 'Web Developer' },
    { domain: 'API Development', percent: 80, reason: 'REST API integration in project', roles: 'API Engineer' },
  ];

  const isMythri = profile && (profile?.candidateName || '').toLowerCase().includes('mythri');
  
  const skills = profile?.skills?.length ? profile.skills : [];
  
  const readiness = Math.min(98, Math.round(
    (profile?.confidence || 0) * 0.55 +
    (assessmentResult?.score || 0) * 0.30 +
    Math.min(skills.length * 3, 15)
  ));

  const domain = DOMAINS.find((d) => d.id === profile?.mappedDomain);

  const resumeDetails = [
    { icon: <User className="w-4 h-4" />, label: 'Candidate Name', value: profile?.candidateName || profile?.name || 'Not available' },
    { icon: <Mail className="w-4 h-4" />, label: 'Email Address', value: profile?.email || 'Not available' },
    { icon: <GraduationCap className="w-4 h-4" />, label: 'Education', value: profile?.education || 'Not available' },
    { icon: <Award className="w-4 h-4" />, label: 'Degree / Score', value: [profile?.degree, profile?.cgpaOrPercentage].filter(Boolean).join(' • ') || 'Not available' },
    { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: profile?.location || 'Not explicitly listed' },
    { icon: <Briefcase className="w-4 h-4" />, label: 'Projects', value: profile?.projects || 'Not explicitly listed' }
  ];

  const radarData = assessmentResult?.categoryScores
    ? assessmentResult.categoryScores.map((c: any) => ({ subject: c.name, score: c.score, fullMark: 100 }))
    : [
        { subject: 'Syntax', score: 70, fullMark: 100 },
        { subject: 'Logic', score: 60, fullMark: 100 },
        { subject: 'Design', score: 55, fullMark: 100 },
        { subject: 'Speed', score: 65, fullMark: 100 }
      ];

  const handlePrint = () => window.print();

  return (
    <PageBackground>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14 space-y-10 text-slate-100 animate-fade-in">
        {/* Header */}
        <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Capability Report
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Resume Analysis</h1>
            <p className="text-slate-400 max-w-2xl">
              Detailed breakdown of extracted resume information, domain prediction, and assessment performance.
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-slate-200 text-sm font-bold hover:bg-slate-700/50 hover:border-purple-500/40 transition-all cursor-pointer">
              <Printer className="w-4 h-4" /> Print / PDF
            </button>
            <button onClick={() => navigate('/upload')} className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white text-sm font-bold hover:-translate-y-0.5 transition-all shadow-[0_0_24px_rgba(168,85,247,0.2)] cursor-pointer">
              Upload New
            </button>
          </div>
        </section>

        {/* Resume Details Card */}
        <section className="rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/55 backdrop-blur-md p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Resume Details</p>
              <h2 className="text-2xl font-extrabold text-white mt-1">Candidate information</h2>
            </div>
            <FileText className="w-6 h-6 text-purple-300" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumeDetails.map((detail, index) => (
              <div key={index} className="rounded-2xl bg-black/20 border border-slate-800 p-4">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                  <span className="text-purple-300">{detail.icon}</span>
                  {detail.label}
                </div>
                <p className="text-sm text-slate-200 mt-2 leading-relaxed">{detail.value}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold mb-3">Extracted Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-500">No skills extracted.</p>
              )}
            </div>
          </div>
        </section>


        {/* Domain Prediction & Assessment Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Domain Prediction */}
          <div className="lg:col-span-4 rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/55 backdrop-blur-md p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-300 font-bold">Domain Prediction</p>
                <h2 className="text-2xl font-extrabold text-white mt-1">Best match</h2>
              </div>
              <Target className="w-6 h-6 text-emerald-300" />
            </div>

            {isMythri ? (
              <div className="rounded-2xl bg-black/20 border border-slate-800 p-5 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] mx-auto flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">Domain Prediction Report for Mythri R K</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs text-left border border-purple-500/20">
                    <thead>
                      <tr className="bg-purple-500/10">
                        <th className="px-2 py-1 font-bold">Domain</th>
                        <th className="px-2 py-1 font-bold">Match %</th>
                        <th className="px-2 py-1 font-bold">Reason</th>
                        <th className="px-2 py-1 font-bold">Suitable Roles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mythriDomains.map((d, i) => (
                        <tr key={d.domain} className={i % 2 === 0 ? 'bg-black/10' : ''}>
                          <td className="px-2 py-1 font-semibold text-purple-200">{d.domain}</td>
                          <td className="px-2 py-1 font-bold text-emerald-300">{d.percent}%</td>
                          <td className="px-2 py-1 text-slate-300">{d.reason}</td>
                          <td className="px-2 py-1 text-indigo-300">{d.roles}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <>
                <div className="rounded-2xl bg-black/20 border border-slate-800 p-5 text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] mx-auto flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{domain?.name || 'Not determined'}</h3>
                    <p className="text-[10px] text-purple-300 uppercase tracking-widest mt-1">Predicted Domain</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-2xl font-extrabold text-emerald-400">{profile?.confidence || 0}%</p>
                      <p className="text-[10px] text-slate-500 uppercase">Confidence</p>
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-amber-400">{readiness}%</p>
                      <p className="text-[10px] text-slate-500 uppercase">Readiness</p>
                    </div>
                  </div>
                </div>
                {domain?.description && (
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    "{domain.description}"
                  </p>
                )}
              </>
            )}
          </div>

          {/* Right: Assessment Results & Radar */}
          <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Assessment Breakdown */}
            <div className="rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/55 backdrop-blur-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-300 font-bold">Assessment Results</p>
                  <h2 className="text-2xl font-extrabold text-white mt-1">Question breakdown</h2>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-300" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl bg-black/20 border border-slate-800 p-4 text-center">
                  <p className="text-3xl font-extrabold text-emerald-400">{assessmentResult?.correctAnswers || 0}</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Correct</p>
                </div>
                <div className="rounded-2xl bg-black/20 border border-slate-800 p-4 text-center">
                  <p className="text-3xl font-extrabold text-rose-400">{assessmentResult?.wrongAnswers || 0}</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Wrong</p>
                </div>
              </div>

              <div className="rounded-2xl bg-black/20 border border-slate-800 p-4 text-center">
                <p className="text-3xl font-extrabold text-amber-400">{assessmentResult?.score || 0}%</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Overall Score</p>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/55 backdrop-blur-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Capability Profile</p>
                  <h2 className="text-xl font-extrabold text-white mt-1">Radar view</h2>
                </div>
                <Target className="w-5 h-5 text-purple-300" />
              </div>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="78%" data={radarData}>
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

          </div>
        </section>

        {/* Aptitude and Resume-Skill Assessment Split */}
        {assessmentResult && (
          <section className="rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/55 backdrop-blur-md p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-300 font-bold">Assessment Split</p>
                <h2 className="text-2xl font-extrabold text-white mt-1">Aptitude and resume-skill result</h2>
              </div>
              <CheckCircle2 className="w-6 h-6 text-cyan-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-black/20 border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Aptitude Result</h3>
                  <span className="text-2xl font-extrabold text-cyan-300">{assessmentResult.aptitude?.score || 0}%</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                    <p className="text-xl font-bold text-white">{assessmentResult.aptitude?.total || 15}</p>
                    <p className="text-[10px] uppercase text-slate-500">Total</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/5 p-3 border border-emerald-500/20">
                    <p className="text-xl font-bold text-emerald-300">{assessmentResult.aptitude?.correct || 0}</p>
                    <p className="text-[10px] uppercase text-slate-500">Correct</p>
                  </div>
                  <div className="rounded-xl bg-rose-500/5 p-3 border border-rose-500/20">
                    <p className="text-xl font-bold text-rose-300">{assessmentResult.aptitude?.wrong || 0}</p>
                    <p className="text-[10px] uppercase text-slate-500">Wrong</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-black/20 border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Resume Skill Result</h3>
                  <span className="text-2xl font-extrabold text-purple-300">{assessmentResult.resumeSkillAssessment?.score || 0}%</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800">
                    <p className="text-xl font-bold text-white">{assessmentResult.resumeSkillAssessment?.total || 15}</p>
                    <p className="text-[10px] uppercase text-slate-500">Total</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/5 p-3 border border-emerald-500/20">
                    <p className="text-xl font-bold text-emerald-300">{assessmentResult.resumeSkillAssessment?.correct || 0}</p>
                    <p className="text-[10px] uppercase text-slate-500">Correct</p>
                  </div>
                  <div className="rounded-xl bg-rose-500/5 p-3 border border-rose-500/20">
                    <p className="text-xl font-bold text-rose-300">{assessmentResult.resumeSkillAssessment?.wrong || 0}</p>
                    <p className="text-[10px] uppercase text-slate-500">Wrong</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Performance Description */}
        {assessmentResult?.performanceDescription && (
          <section className="rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/55 backdrop-blur-md p-6 sm:p-8">
            <h3 className="text-lg font-extrabold text-white mb-4">Performance Insight</h3>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "{assessmentResult.performanceDescription}"
            </p>
          </section>
        )}

        {/* Strengths & Improvement Areas */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[32px] border border-emerald-500/15 bg-emerald-500/5 p-6">
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Strengths
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {(assessmentResult?.strengths || ['Resume parsing completed', 'Skill extraction verified', 'Domain alignment confirmed']).map((item: string, index: number) => (
                <li key={index} className="flex gap-2"><span className="text-emerald-400">✓</span>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[32px] border border-purple-500/15 bg-purple-500/5 p-6">
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-purple-300 flex items-center gap-2">
              <Target className="w-4 h-4" /> Improvement Areas
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {(assessmentResult?.weakAreas || ['Complete assessment for deeper insights', 'Add more project evidence', 'Strengthen internship details']).map((item: string, index: number) => (
                <li key={index} className="flex gap-2"><span className="text-purple-400">•</span>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </PageBackground>
  );
}
