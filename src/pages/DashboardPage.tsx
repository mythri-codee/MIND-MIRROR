import { useEffect, useMemo, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { Award, Check, Edit2, FileText, GraduationCap, Mail, MapPin, Sparkles, User, X } from 'lucide-react';
import PageBackground from '../components/PageBackground';

const colors = ['#7c3aed', '#a855f7', '#c084fc', '#ec4899', '#6366f1', '#22d3ee', '#10b981', '#f59e0b'];

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('mm_user');
    const savedProfile = localStorage.getItem('mm_profile');
    const savedResult = localStorage.getItem('mm_assessment_result');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setEditedName(parsed.name || 'Candidate');
      setEditedEmail(parsed.email || 'candidate@example.com');
    }
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedResult) setAssessmentResult(JSON.parse(savedResult));
  }, []);

  const handleSaveProfile = () => {
    const nextUser = { name: editedName, email: editedEmail };
    localStorage.setItem('mm_user', JSON.stringify(nextUser));
    setUser(nextUser);
    setIsEditing(false);
  };

  const skills = profile?.skills?.length ? profile.skills : [];
  const skillConfidence = profile?.skillConfidence || {};
  const skillData = useMemo(() => {
    const source = skills.length ? skills : ['Resume', 'Skills', 'Projects', 'Assessment'];
    return source.slice(0, 7).map((skill: string, index: number) => ({
      skill,
      score: skillConfidence[skill] || Math.max(45, (profile?.confidence || 70) - index * 3)
    }));
  }, [skills, skillConfidence, profile]);

  const assessmentData = [
    { name: 'Correct', value: assessmentResult?.correctAnswers || 0, color: '#10b981' },
    { name: 'Wrong', value: assessmentResult?.wrongAnswers || 0, color: '#f43f5e' },
    { name: 'Aptitude', value: assessmentResult?.aptitude?.score || 0, color: '#22d3ee' },
    { name: 'Resume Skill', value: assessmentResult?.resumeSkillAssessment?.score || 0, color: '#a855f7' },
    { name: 'Total', value: assessmentResult?.totalQuestions || 30, color: '#c084fc' }
  ];

  const readiness = Math.min(98, Math.round(
    (profile?.confidence || 0) * 0.55 +
    (assessmentResult?.score || 0) * 0.30 +
    Math.min(skills.length * 3, 15)
  ));

  const resumeFacts = [
    { icon: <User className="w-4 h-4" />, label: 'Candidate', value: profile?.candidateName || user?.name || 'Not available' },
    { icon: <Mail className="w-4 h-4" />, label: 'Email', value: profile?.email || user?.email || 'Not available' },
    { icon: <GraduationCap className="w-4 h-4" />, label: 'Education', value: profile?.education || 'Not available' },
    { icon: <Award className="w-4 h-4" />, label: 'Degree / Score', value: [profile?.degree, profile?.cgpaOrPercentage].filter(Boolean).join(' • ') || 'Not available' },
    { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: profile?.location || 'Not explicitly listed' },
    { icon: <FileText className="w-4 h-4" />, label: 'Projects', value: profile?.projects || 'Not explicitly listed' }
  ];

  const keyPoints = [
    `${skills.length || 0} technical skill${skills.length === 1 ? '' : 's'} extracted from the resume`,
    `${profile?.projectsDetailed?.length || (profile?.projects && profile.projects !== 'Projects not explicitly listed' ? 1 : 0)} project evidence point(s) detected`,
    `${profile?.internshipsDetailed?.length || (profile?.internships && !String(profile.internships).includes('not explicitly') ? 1 : 0)} internship/readiness evidence point(s) detected`,
    assessmentResult ? `Aptitude: ${assessmentResult.aptitude?.correct || 0}/${assessmentResult.aptitude?.total || 15} correct` : 'Assessment not completed yet',
    assessmentResult ? `Resume skill test: ${assessmentResult.resumeSkillAssessment?.correct || 0}/${assessmentResult.resumeSkillAssessment?.total || 15} correct` : 'Resume skill assessment pending',
    `ATS-style resume score: ${profile?.confidence || 0}%`
  ];

  return (
    <PageBackground>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14 space-y-8 text-slate-100 animate-fade-in">
        <section className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Resume Dashboard
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Candidate overview</h1>
          <p className="text-slate-400 max-w-2xl">Main resume details, key findings, skill confidence, and assessment result summary.</p>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-4 rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/55 backdrop-blur-md p-6 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-[#ec4899] p-1">
                  <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center text-purple-300">
                    <User className="w-8 h-8" />
                  </div>
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    <input value={editedName} onChange={e => setEditedName(e.target.value)} className="bg-black/30 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-purple-500" />
                    <input value={editedEmail} onChange={e => setEditedEmail(e.target.value)} className="bg-black/30 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-purple-500" />
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Profile</p>
                    <h2 className="text-2xl font-extrabold text-white mt-1">{user?.name || profile?.candidateName || 'Candidate'}</h2>
                    <p className="text-sm text-slate-400 mt-1">{user?.email || profile?.email || 'candidate@example.com'}</p>
                  </div>
                )}
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <button onClick={handleSaveProfile} className="p-2 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"><Check className="w-4 h-4" /></button>
                  <button onClick={() => setIsEditing(false)} className="p-2 rounded-xl bg-slate-800 text-slate-400 border border-slate-700"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="p-2 rounded-xl bg-black/25 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/40 transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {resumeFacts.map((fact, index) => (
                <div key={index} className="rounded-2xl bg-black/20 border border-slate-800 p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <span className="text-purple-300">{fact.icon}</span>
                    {fact.label}
                  </div>
                  <p className="text-sm text-slate-200 mt-2 leading-relaxed line-clamp-2">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-8 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'ATS Score', value: `${profile?.confidence || 0}%`, color: 'text-emerald-300' },
                { label: 'Skills', value: skills.length || 0, color: 'text-purple-300' },
                { label: 'Aptitude', value: assessmentResult ? `${assessmentResult.aptitude?.score || 0}%` : 'Pending', color: 'text-cyan-300' },
                { label: 'Readiness', value: `${readiness}%`, color: 'text-amber-300' }
              ].map((item, index) => (
                <div key={index} className="soft-card rounded-[26px] border border-slate-800 bg-[#0f0b1b]/45 p-5">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 font-bold">{item.label}</p>
                  <p className={`text-3xl font-extrabold mt-3 ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/45 backdrop-blur-md p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Key Resume Points</p>
                  <h2 className="text-2xl font-extrabold text-white mt-1">Main findings</h2>
                </div>
                <FileText className="w-5 h-5 text-purple-300" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex gap-3 rounded-2xl bg-black/20 border border-slate-800 p-4">
                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-400 flex-shrink-0" />
                    <p className="text-sm text-slate-300 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/45 p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Skill Graph</p>
                <h3 className="text-lg font-extrabold text-white mt-1 mb-4">Confidence by skill</h3>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillData} margin={{ top: 10, right: 15, left: -25, bottom: 20 }}>
                      <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
                      <XAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                      <Tooltip
                        cursor={false}
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
                      <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={22}>{skillData.map((_item: any, index: number) => <Cell key={index} fill={colors[index % colors.length]} />)}</Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[32px] border border-purple-500/15 bg-[#0f0b1b]/45 p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Test Graph</p>
                <h3 className="text-lg font-extrabold text-white mt-1 mb-4">Question breakdown</h3>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={assessmentData} layout="vertical" margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                      <CartesianGrid stroke="rgba(148,163,184,0.08)" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} />
                      <Tooltip
                        cursor={false}
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
                      <Bar dataKey="value" radius={[0, 12, 12, 0]} barSize={32}>{assessmentData.map((entry, index) => <Cell key={index} fill={entry.color} />)}</Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-[32px] border border-slate-800 bg-[#0f0b1b]/45 p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Readiness</p>
            <div className="h-[220px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: 'Readiness', value: readiness, fill: '#a855f7' }]} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={18} background={{ fill: 'rgba(148,163,184,0.12)' }} />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="30" fontWeight="800">{readiness}%</text>
                  <text x="50%" y="63%" textAnchor="middle" dominantBaseline="middle" fill="#64748b" fontSize="10" fontWeight="700">READY LEVEL</text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-[32px] border border-slate-800 bg-[#0f0b1b]/45 p-6 space-y-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">Learning Path</p>
            <h3 className="text-xl font-extrabold text-white">Recommended next steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Revise weak assessment areas first', 'Add measurable project results to the resume', 'Prepare implementation stories for top skills'].map((step, index) => (
                <div key={index} className="rounded-2xl border border-slate-800 bg-black/20 p-4">
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Step 0{index + 1}</p>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageBackground>
  );
}