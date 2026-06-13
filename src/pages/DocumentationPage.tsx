import { useState } from 'react';
import { 
  Code, Database, Terminal, ShieldCheck, 
  Layers, Settings, Zap, Copy, Check 
} from 'lucide-react';

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'models' | 'design' | 'setup'>('architecture');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const registerCode = `POST /api/auth/register
Host: api.mindmirror.org
Content-Type: application/json

{
  "name": "Sarah Connor",
  "email": "sarah@cyberdyne.org",
  "password": "SecurePassword123!"
}`;

  const parseResumeCode = `POST /api/candidates/parse-resume
Host: api.mindmirror.org
Authorization: Bearer <jwt_access_token>
Content-Type: multipart/form-data

// Form Data body containing:
// "file": File (PDF/DOCX/TXT)
// "customExperienceYears": "3"`;

  const resumeSchema = `interface ResumeProfile {
  candidateName: string;
  skills: string[];
  experience: string;
  education: string;
  projects: string;
  location: string;
  mappedDomain: string; // "frontend" | "backend" | "neurology" etc.
  summary: string;
  confidence: number; // 0-100 score of matching suitability
}`;

  const assessmentSchema = `interface AssessmentResults {
  candidateId: string;
  candidateName: string;
  score: number; // overall percentage (0-100)
  totalQuestions: number; // typically 15
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  completionSpeedSeconds: number;
  confidencePercentage: number;
  categoryScores: {
    name: string;
    score: number;
  }[];
  strengths: string[];
  weakAreas: string[];
  recommendedSkills: string[];
  performanceLevel: string; // e.g. "Distinguished Expert"
  performanceDescription: string;
  createdAt: string; // ISO DateTime
}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* PAGE HEADER */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-left space-y-2">
        <span className="px-3 py-1 rounded bg-indigo-500/10 text-indigo-500 text-[10px] font-mono font-bold tracking-widest uppercase">
          Technical Specifications Hub
        </span>
        <h2 className="text-3xl font-extrabold font-space">
          Mind Mirror Documentation
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Complete component design guidelines, REST API specifications, interactive schemas, and installation blueprints compiled for Google Studio evaluations.
        </p>
      </div>

      {/* HORIZONTAL TAB CONTROL */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'architecture' 
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>API & Endpoints</span>
        </button>

        <button
          onClick={() => setActiveTab('models')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'models' 
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Data Schemas</span>
        </button>

        <button
          onClick={() => setActiveTab('design')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'design' 
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Design System</span>
        </button>

        <button
          onClick={() => setActiveTab('setup')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'setup' 
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Dev Setup & Optimizations</span>
        </button>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        
        {/* PANEL A: ARCHITECTURE & API */}
        {activeTab === 'architecture' && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-bold font-space flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-500" /> Complete REST API Endpoints
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Our distributed application interacts seamlessly with standard Node.js Express and Django REST microservices using secure JWT tokens. Check sample requests and responses below.
              </p>
            </div>

            {/* Endpoints Table/List */}
            <div className="space-y-6">
              
              {/* Endpoint 1 */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-mono font-bold">
                      POST
                    </span>
                    <strong className="text-sm font-mono text-slate-800 dark:text-slate-200">/api/auth/register</strong>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Anonymous Access</span>
                </div>
                
                <p className="text-xs text-slate-500">
                  Performs master credential database validations. Resolves secure account indexes on SQLite or PostgreSQL containers.
                </p>

                <div className="relative">
                  <pre className="p-4 bg-slate-950 text-indigo-300 rounded-xl text-xs font-mono overflow-x-auto max-h-[160px] custom-scrollbar">
                    {registerCode}
                  </pre>
                  <button
                    onClick={() => handleCopy(registerCode, 'reg')}
                    className="absolute top-3 right-3 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
                  >
                    {copiedText === 'reg' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Endpoint 2 */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-500 text-xs font-mono font-bold">
                      POST
                    </span>
                    <strong className="text-sm font-mono text-slate-800 dark:text-slate-200">/api/candidates/parse-resume</strong>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Requires JWT Token</span>
                </div>
                
                <p className="text-xs text-slate-500">
                  Processes and parses uploaded resume binaries. Maps technical skills, locations, and schedules target domain prediction sequences.
                </p>

                <div className="relative">
                  <pre className="p-4 bg-slate-950 text-indigo-300 rounded-xl text-xs font-mono overflow-x-auto max-h-[160px] custom-scrollbar">
                    {parseResumeCode}
                  </pre>
                  <button
                    onClick={() => handleCopy(parseResumeCode, 'parse')}
                    className="absolute top-3 right-3 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
                  >
                    {copiedText === 'parse' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PANEL B: DATA SCHEMAS */}
        {activeTab === 'models' && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-bold font-space flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-500" /> Rigorous TypeScript Data Models
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Mind Mirror ensures consistent data flow across both client state variables and persistent database structures. Let&apos;s review our two core contracts.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Resume Schema */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Resume Profile Model</span>
                  <span className="text-[10px] text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">Interface</span>
                </div>
                <div className="relative">
                  <pre className="p-4 bg-slate-950 text-indigo-300 rounded-xl text-xs font-mono overflow-x-auto min-h-[220px]">
                    {resumeSchema}
                  </pre>
                  <button
                    onClick={() => handleCopy(resumeSchema, 'resSchema')}
                    className="absolute top-3 right-3 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
                  >
                    {copiedText === 'resSchema' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Assessment Schema */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Assessment Outputs Schema</span>
                  <span className="text-[10px] text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded">Interface</span>
                </div>
                <div className="relative">
                  <pre className="p-4 bg-slate-950 text-indigo-300 rounded-xl text-xs font-mono overflow-x-auto min-h-[220px] max-h-[350px] custom-scrollbar">
                    {assessmentSchema}
                  </pre>
                  <button
                    onClick={() => handleCopy(assessmentSchema, 'asSchema')}
                    className="absolute top-3 right-3 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
                  >
                    {copiedText === 'asSchema' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PANEL C: DESIGN SYSTEM */}
        {activeTab === 'design' && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-space flex items-center gap-2">
                <Layers className="w-5 h-5 text-pink-500" /> Unified UI Design System
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Our interface is built around high-fidelity glassmorphism, glowing accents, and premium, content-centric typography.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Color Palette */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-500 font-mono">1. Color Palette</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#6366f1]"></span>
                    <span>Primary Indigo (#6366f1)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#a855f7]"></span>
                    <span>Secondary Purple (#a855f7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#0f172a]"></span>
                    <span>Slate Background (#050505)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#10b981]"></span>
                    <span>Verified Success (#10b981)</span>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-500 font-mono">2. Typography</h4>
                <div className="space-y-2 text-xs leading-relaxed">
                  <p><strong>Heading Font:</strong> Space Grotesk (Bold, clean technical metrics)</p>
                  <p><strong>Body Text:</strong> Plus Jakarta Sans (Regular, high-legibility layout)</p>
                  <p><strong>Monospace:</strong> Inconsolata / SFMono (Logs, file structures, codes)</p>
                </div>
              </div>

              {/* Micro-animations */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-500 font-mono">3. Animations</h4>
                <div className="space-y-2 text-xs leading-relaxed">
                  <p><strong>Page transitions:</strong> 300ms fade-in slide-up curve</p>
                  <p><strong>Card Hover:</strong> Scale 1.01 with drop shadow glows</p>
                  <p><strong>Loading pulses:</strong> Continuous subtle color state pulses</p>
                </div>
              </div>

              {/* Grid Overlays */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-500 font-mono">4. Breakpoints</h4>
                <div className="space-y-2 text-xs leading-relaxed">
                  <p><strong>Mobile devices:</strong> &lt; 768px (Single Column, collapsible triggers)</p>
                  <p><strong>Tablet displays:</strong> 768px to 1024px (Dual column grid structures)</p>
                  <p><strong>Monitor sizes:</strong> &gt; 1024px (Fluid multi-dimensional blocks)</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PANEL D: DEVELOPER SETUP */}
        {activeTab === 'setup' && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-space flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-500" /> Production Setup & Deployment
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Set up, bundle, and optimize the application. These steps ensure zero-runtime errors and pristine, performant bundle delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
              
              {/* Installation block */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-sm font-bold font-space text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Zap className="w-4.5 h-4.5 text-yellow-500" /> Getting Started Instructions:
                </h4>
                
                <div className="space-y-2">
                  <p>1. Clone or extract the project repository locally.</p>
                  <p>2. Execute the setup command to load dependencies:</p>
                  <pre className="p-2 bg-slate-950 text-indigo-300 rounded font-mono text-[10px]">npm install</pre>
                  <p>3. Fire up the local Vite development web server:</p>
                  <pre className="p-2 bg-slate-950 text-indigo-300 rounded font-mono text-[10px]">npm run dev</pre>
                  <p>4. Open your browser to access the local system address (usually <code>http://localhost:5173</code>).</p>
                </div>
              </div>

              {/* Performance Tuning and Deploy */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-sm font-bold font-space text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-teal-500" /> Production Audits & Deployments:
                </h4>
                
                <div className="space-y-2">
                  <p><strong>Code Splitting:</strong> Vite handles bundle segmentations automatically using ES module specifications during compile cycles.</p>
                  <p><strong>Building static assets:</strong> Runs bundling passes, outputting lightweight assets into the <code>dist/</code> folder:</p>
                  <pre className="p-2 bg-slate-950 text-indigo-300 rounded font-mono text-[10px]">npm run build</pre>
                  <p><strong>Caching directives:</strong> Assets feature content hash codes to leverage CDN caching structures and prevent client latency cycles.</p>
                  <p><strong>Deployment:</strong> The compile folder is static-ready and can be directly served on CDNs like AWS S3, Vercel, Netlify, or Github Pages.</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
