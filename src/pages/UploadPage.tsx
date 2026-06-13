import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, CheckCircle2, ChevronRight, 
  Terminal, Sparkles, Brain, Loader2, Target
} from 'lucide-react';
import { simulateResumeParsing, ParsedProfile } from '../utils/pdfParser';

interface UploadPageProps {
  onProfileLoaded: (profile: ParsedProfile) => void;
}

export default function UploadPage({ onProfileLoaded }: UploadPageProps) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [stage, setStage] = useState<'idle' | 'uploading' | 'parsing' | 'ai_analysis' | 'matching' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [profile, setProfile] = useState<ParsedProfile | null>(null);
  const [ownershipError, setOwnershipError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const namesLikelyMatch = (userName: string, resumeName: string, userEmail?: string) => {
    const normalize = (v: string) => v.toLowerCase().replace(/[^a-z]/g, ' ').trim();
    const compact = (v: string) => normalize(v).replace(/\s+/g, '');

    const a = normalize(userName);
    const b = normalize(resumeName);
    const aCompact = compact(userName);
    const bCompact = compact(resumeName);
    const emailCompact = userEmail ? compact(userEmail.split('@')[0]) : '';

    if (!aCompact || !bCompact) return false;
    if (aCompact === bCompact) return true;
    if (emailCompact && emailCompact === bCompact) return true;

    // Direct containment only when the contained value is reasonably long.
    if (aCompact.length >= 5 && bCompact.includes(aCompact)) return true;
    if (bCompact.length >= 5 && aCompact.includes(bCompact)) return true;
    if (emailCompact.length >= 5 && bCompact.includes(emailCompact)) return true;

    const aTokens = a.split(/\s+/).filter(Boolean);
    const bTokens = b.split(/\s+/).filter(Boolean);
    const meaningfulATokens = aTokens.filter(t => t.length >= 4);
    const meaningfulBTokens = bTokens.filter(t => t.length >= 4);

    // Require a strong name token overlap (e.g. mythri ↔ rkmythri / mythri)
    const strongOverlap = meaningfulATokens.some(at =>
      meaningfulBTokens.some(bt => at === bt || at.includes(bt) || bt.includes(at))
    );
    if (strongOverlap) return true;

    // Initials check only if there are at least 2 initials on one side.
    const initialsOfB = bTokens.map(t => t[0]).join('').toLowerCase();
    const initialsOfA = aTokens.map(t => t[0]).join('').toLowerCase();
    if (initialsOfB.length >= 2 && aCompact.includes(initialsOfB)) return true;
    if (initialsOfA.length >= 2 && bCompact.includes(initialsOfA)) return true;
    if (initialsOfB.length >= 2 && emailCompact.includes(initialsOfB)) return true;

    // Fuzzy match only if there is already at least one shared meaningful substring or no long tokens exist.
    const hasMeaningfulTokens = meaningfulBTokens.length > 0;
    const sharedSubword = hasMeaningfulTokens && 
      meaningfulBTokens.some(bt => aCompact.includes(bt) || (emailCompact && emailCompact.includes(bt)));
    
    if (hasMeaningfulTokens && !sharedSubword) return false;

    const bigrams = (s: string) => {
      const t = s.replace(/\s+/g, '');
      const list: string[] = [];
      for (let i = 0; i < t.length - 1; i++) list.push(t.slice(i, i + 2));
      return list;
    };
    const A = bigrams(a);
    const B = bigrams(b);
    if (!A.length || !B.length) return false;
    const common = A.filter(x => B.includes(x)).length;
    const dice = (2 * common) / (A.length + B.length);
    return dice >= 0.55;
  };

  const processSelectedFile = async (selectedFile: File) => {
    setOwnershipError('');
    const validExtensions = ['pdf', 'docx', 'txt'];
    const fileExt = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!fileExt || !validExtensions.includes(fileExt)) {
      alert('Error: Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    setStage('uploading');
    
    // Detailed Progress Simulation
    for (let i = 0; i <= 25; i += 5) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 100));
    }

    setStage('parsing');
    for (let i = 26; i <= 50; i += 5) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 150));
    }

    setStage('ai_analysis');
    for (let i = 51; i <= 75; i += 3) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 180));
    }

    setStage('matching');
    for (let i = 76; i <= 95; i += 4) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 120));
    }

    const parsed = await simulateResumeParsing(selectedFile);

    const savedUser = localStorage.getItem('mm_user');
    const currentUser = savedUser ? JSON.parse(savedUser) : null;
    if (
      currentUser?.name &&
      parsed.candidateName &&
      !namesLikelyMatch(currentUser.name, parsed.candidateName, currentUser.email)
    ) {
      setStage('idle');
      setProgress(0);
      setProfile(null);
      setOwnershipError('Kindly upload your own resume.');
      return;
    }
    
    setProgress(100);
    setStage('complete');
    setProfile(parsed);
    onProfileLoaded(parsed);
  };

  const handleLaunchAssessment = () => {
    if (!profile) return;
    navigate('/assessment');
  };

  

  const [copied, setCopied] = useState(false);
  const copyProfileJSON = async () => {
    if (!profile) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(profile, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Unable to copy to clipboard. You can inspect the profile in browser console.');
      // also log for manual inspection
      // eslint-disable-next-line no-console
      console.log('Extracted profile:', profile);
    }
  };

  const projectTech = profile?.projectTechnologies || [];
  const certs = profile?.certificationsList || [];
  const internshipSummary = profile?.internships || 'Not Specified';

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 sm:px-6 py-16 lg:py-20 animate-fade-in text-slate-100">
      {/* Page-local grid so upload screen matches the front hero style */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 50% 35%, rgba(120,30,180,0.08), transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1a1333] border border-purple-500/30 text-purple-300 text-[10px] font-bold tracking-[0.2em] uppercase">
          <Sparkles className="w-3 h-3" />
          <span>Resume Analysis</span>
        </div>
        <h2
          className="text-5xl sm:text-6xl font-extrabold tracking-tight"
          style={{
            background: 'linear-gradient(90deg,#818cf8 0%,#a78bfa 42%,#c084fc 70%,#ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Upload Your Resume
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Let our system analyze your skills and experience to find your ideal career domain.
        </p>
      </div>

      {ownershipError && (
        <div className="max-w-5xl mx-auto rounded-2xl border border-rose-500/25 bg-rose-500/10 px-5 py-4 text-rose-300 text-sm font-semibold animate-fade-in">
          {ownershipError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch max-w-5xl mx-auto">
        
        {/* LEFT COLUMN: UPLOAD BOX */}
        <div className="space-y-6 flex flex-col">
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`flex-1 border-2 border-dashed rounded-[32px] p-10 text-center transition-all relative overflow-hidden bg-[#0f0b1b]/45 backdrop-blur-md flex flex-col items-center justify-center min-h-[360px] ${
              isDragging 
                ? 'border-purple-500 bg-purple-500/5' 
                : 'border-purple-500/20 hover:border-purple-500/50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
              className="hidden"
            />

            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-[#1a1333] rounded-2xl flex items-center justify-center border border-purple-500/25 shadow-[0_0_30px_rgba(168,85,247,0.16)] group transition-all">
                <UploadCloud className="w-10 h-10 text-purple-400" />
              </div>
              
              <div className="space-y-2">
                <p className="text-xl font-bold text-white tracking-tight">
                  Drag and drop your resume
                </p>
                <p className="text-sm text-slate-500">
                  Supports PDF, DOCX (Max 5MB)
                </p>
              </div>

              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-10 py-3.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold text-sm shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Browse Files
              </button>
            </div>
          </div>

          
          {/* Progress indicators when active */}
          {(stage !== 'idle' && stage !== 'complete') && (
            <div className="space-y-3 animate-fade-in bg-[#0a0a14]/60 p-6 rounded-[24px] border border-slate-800/50">
               <div className="flex justify-between text-[11px] font-mono mb-2">
                  <span className="text-purple-400 font-bold uppercase flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    {stage.replace('_', ' ')}...
                  </span>
                  <span className="text-slate-400">{progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/50">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PREDICTED PROFILE OR PENDING STATE */}
        <div className="flex flex-col h-full min-h-[360px]">
          {profile ? (
            <div className="flex-1 border border-slate-800/60 bg-slate-900/20 backdrop-blur-md rounded-[32px] p-8 space-y-6 shadow-2xl relative animate-fade-in flex flex-col">
              <div className="absolute top-4 right-6 inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded-md">
                <CheckCircle2 className="w-3 h-3" />
                <span>Extracted</span>
              </div>

              <div className="space-y-6">
                <div className="text-sm text-slate-400">These are the details mentioned in the resume.</div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Candidate Identity</p>
                  <h3 className="text-2xl font-bold text-white">{profile.candidateName}</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Target className="w-3.5 h-3.5" />
                      <p className="text-[10px] font-bold uppercase tracking-widest">Domain Prediction</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-400">Locked until assessment</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Sparkles className="w-3.5 h-3.5" />
                      <p className="text-[10px] font-bold uppercase tracking-widest">Resume Score</p>
                    </div>
                      <p className="text-sm font-semibold text-emerald-400">Locked until assessment</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verified Core Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {(profile.skills || []).length > 0 ? profile.skills.map((sk: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-purple-500/5 border border-purple-500/20 text-purple-300 text-[11px] font-semibold">
                          {sk}
                        </span>
                      )) : <span className="text-xs text-slate-500">No explicit core skills found.</span>}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {projectTech.length > 0 ? projectTech.map((sk: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
                          {sk}
                        </span>
                      )) : <span className="text-xs text-slate-500">No project technologies detected.</span>}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Internship</p>
                    <div className="rounded-2xl bg-black/20 border border-slate-800 p-4 text-sm text-slate-300 leading-relaxed">
                      {internshipSummary || 'Not Specified'}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {certs.length > 0 ? certs.map((item: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 text-[11px] font-semibold">
                          {item}
                        </span>
                      )) : <span className="text-xs text-slate-500">No certifications detected.</span>}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-black/20 border border-slate-800 p-4 text-sm text-slate-400 leading-relaxed">
                  Resume validated successfully. Verified core skills have been extracted. The assessment will now verify those skills: the first 15 questions cover aptitude and the next 15 questions focus on skill verification.
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleLaunchAssessment}
                    className="w-full py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:from-[#5a58e0] hover:to-[#9b4de6] text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] group"
                  >
                    <Brain className="w-5 h-5" />
                    <span>Proceed to Assessment</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      onClick={copyProfileJSON}
                      className="w-full py-2 bg-slate-800/60 text-slate-200 rounded-xl border border-slate-700 text-sm hover:bg-slate-700/60"
                    >
                      Copy extracted JSON
                    </button>
                    <button
                      onClick={() => { /* quick inspect in console */ console.log('Extracted profile:', profile); alert('Profile logged to console. Open devtools to inspect.'); }}
                      className="w-full py-2 bg-slate-800/60 text-slate-200 rounded-xl border border-slate-700 text-sm hover:bg-slate-700/60"
                    >
                      Log to console
                    </button>
                  </div>
                  {copied && <div className="mt-2 text-sm text-emerald-300">Copied to clipboard</div>}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 border border-slate-800/70 bg-black/20 backdrop-blur-md rounded-[32px] p-10 text-center flex flex-col items-center justify-center space-y-6 opacity-70">
              <div className="w-16 h-16 bg-slate-900/60 rounded-2xl flex items-center justify-center border border-slate-800">
                <Terminal className="w-8 h-8 text-slate-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">Analysis Pending</h3>
                <p className="text-sm text-slate-500 max-w-[280px]">
                  Upload and analyze your resume to see extracted skills and domain mapping.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
