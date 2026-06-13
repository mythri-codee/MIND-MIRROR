import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Timer, ChevronRight, AlertCircle, CheckCircle, Brain
} from 'lucide-react';
import { APTITUDE_QUESTIONS, generateSmartQuestionsForDomain, Question, DOMAINS, SKILL_SPECIFIC_QUESTIONS, deriveDomainFromSeeds } from '../data/questionBank';
import { ParsedProfile } from '../utils/pdfParser';

interface AssessmentPageProps {
  profile: ParsedProfile | null;
  onAssessmentCompleted: (results: any) => void;
}

export default function AssessmentPage({ profile, onAssessmentCompleted }: AssessmentPageProps) {
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeProfile = profile || {
    candidateName: 'Guest Candidate',
    skills: ['Python', 'SQL', 'React.js'],
    experience: '2 Years Practice',
    education: 'Self-Taught / Open Source',
    projects: 'General Project',
    location: 'Remote',
    mappedDomain: 'frontend',
    summary: 'Candidate with multi-disciplinary interest.',
    confidence: 75
  };
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>([]);
  const [derivedDomainId, setDerivedDomainId] = useState<string | null>(null);

  // Initialize verified skills from profile
  useEffect(() => {
    const seeds = Array.from(new Set([...(activeProfile.skills || []), ...(activeProfile.projectTechnologies || [])]
      .map(s => (s || '').toString().trim()).filter(Boolean)));
    setVerifiedSkills(seeds);
  }, [activeProfile.skills, activeProfile.projectTechnologies]);

  // Prepare questions from a confirmed verified skills list
  const prepareQuestionsFromSeeds = (seeds: string[]) => {
    // If the parsed profile already includes server-provided questions (e.g., sample/mythri.json), use them directly
    const providedApt = (activeProfile as any).aptitudeQuestions;
    const providedTech = (activeProfile as any).technicalQuestions;
    if (Array.isArray(providedApt) && Array.isArray(providedTech) && providedApt.length > 0 && providedTech.length > 0) {
      const mappedApt = providedApt.slice(0, 15).map((q: any, idx: number) => ({
        ...q,
        id: `aptitude-provided-${idx}-${q.id}`,
        category: q.category || `Aptitude • ${q.category}`
      }));
      const mappedTech = providedTech.slice(0, 15).map((q: any, idx: number) => ({
        ...q,
        id: `technical-provided-${idx}-${q.id}`,
        category: q.category || `Skill Verification • ${q.category}`
      }));
      setQuestions([...mappedApt, ...mappedTech]);
      return;
    }
    const aptitudeQuestions = APTITUDE_QUESTIONS.slice(0, 15).map((q, idx) => ({
      ...q,
      id: `aptitude-${idx}-${q.id}`,
      category: `Aptitude • ${q.category}`
    }));

    // Build authoritative known-skill set from DOMAINS and skill-specific questions
    const knownSkillSet = new Set<string>();
    const skillAliases: Record<string, string> = {};
    DOMAINS.forEach(d => {
      d.skills.forEach(s => {
        const lower = s.toLowerCase();
        knownSkillSet.add(lower);
        skillAliases[lower] = s; // Keep original for better matching
      });
    });
    Object.keys(SKILL_SPECIFIC_QUESTIONS).forEach(k => {
      const lower = k.toLowerCase();
      knownSkillSet.add(lower);
      skillAliases[lower] = k;
    });

    const normalizeSeed = (s: string) => s
      .replace(/\b(certification|certificate|certified|course|basics|basic|training)\b/ig, '')
      .replace(/[\s\-\_\.]+/g, ' ')
      .trim();

    const fuzzyMatchSkill = (seed: string, skillSet: Set<string>): string | null => {
      const seedLower = seed.toLowerCase();
      const seedNorm = seedLower.replace(/[\s\-\.]/g, '');
      
      // Exact match
      if (skillSet.has(seedLower)) return seedLower;
      
      // Normalized match (remove special chars)
      for (const skill of Array.from(skillSet)) {
        const skillNorm = skill.replace(/[\s\-\.]/g, '');
        if (seedNorm === skillNorm) return skill;
      }
      
      // Substring match (for skills that contain others)
      for (const skill of Array.from(skillSet)) {
        if (skill.includes(seedLower) || seedLower.includes(skill)) {
          // Avoid false positives (Java in JavaScript)
          if (skill.split(/\s+/).some(w => seedLower.split(/\s+/).some(sw => w === sw))) {
            return skill;
          }
        }
      }
      
      return null;
    };

    const seedCandidates = seeds.map(s => (s || '').toString().trim()).filter(Boolean);
    const normalized = seedCandidates.map(normalizeSeed).filter(Boolean);

    const technicalSeedSet = new Set<string>();
    [...seedCandidates, ...normalized].forEach(s => {
      const orig = s.trim();
      const matched = fuzzyMatchSkill(orig, knownSkillSet);
      if (matched) {
        technicalSeedSet.add(skillAliases[matched] || orig);
      }
    });
    const technicalSeed = Array.from(technicalSeedSet);

    const finalDomain = deriveDomainFromSeeds(normalized, activeProfile.mappedDomain);
    setDerivedDomainId(finalDomain);
    const technicalQuestions = generateSmartQuestionsForDomain(
      finalDomain,
      technicalSeed,
      'Medium'
    ).slice(0, 15).map((q, idx) => ({
      ...q,
      id: `technical-${idx}-${q.id}`,
      category: `Skill Verification • ${q.category}`
    }));

    setQuestions([...aptitudeQuestions, ...technicalQuestions]);
  };

  const handleStart = () => {
    setAssessmentStarted(true);
    setTimeLeft(60);
  };

  useEffect(() => {
    if (!assessmentStarted || isSubmitting || questions.length === 0) return;

    // Each question gets its own 60-second timer.
    setTimeLeft(60);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);

          // Mark as timed out/wrong if unanswered, reveal correct answer briefly, then move on.
          setSelectedAnswers((existing) => {
            if (existing[currentIdx] !== undefined) return existing;
            return { ...existing, [currentIdx]: -1 };
          });

          setTimeout(() => {
            if (currentIdx < questions.length - 1) {
              setCurrentIdx((idx) => idx + 1);
            } else {
              handleSubmitAssessment(true);
            }
          }, 1400);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [assessmentStarted, isSubmitting, currentIdx, questions.length]);

  const selectOption = (optIdx: number) => {
    if (selectedAnswers[currentIdx] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) setCurrentIdx(prev => prev + 1);
  };

  const handleSubmitAssessment = async (_isAutoSubmit = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    let wrongCount = 0;
    let aptitudeCorrect = 0;
    let aptitudeWrong = 0;
    let resumeSkillCorrect = 0;
    let resumeSkillWrong = 0;

    questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      const isAptitude = idx < 15;
      if (selected !== undefined) {
        if (selected === q.correctAnswer) {
          correctCount++;
          isAptitude ? aptitudeCorrect++ : resumeSkillCorrect++;
        } else {
          wrongCount++;
          isAptitude ? aptitudeWrong++ : resumeSkillWrong++;
        }
      } else {
        wrongCount++;
        isAptitude ? aptitudeWrong++ : resumeSkillWrong++;
      }
    });

    const finalPercentage = Math.round((correctCount / questions.length) * 100);
    const speedSeconds = 60 - timeLeft;

    // Decide final predicted domain by combining resume mappedDomain and derivedDomainId.
    let finalPredictedDomain = activeProfile.mappedDomain || derivedDomainId || 'fullstack';
    const TECH_SWITCH_MIN_SCORE = 60; // require reasonable performance to switch domain
    if (derivedDomainId && derivedDomainId !== activeProfile.mappedDomain && finalPercentage >= TECH_SWITCH_MIN_SCORE) {
      finalPredictedDomain = derivedDomainId;
    }

    let confidenceBoost = finalPercentage >= 70
      ? Math.round((finalPercentage - 70) / 3)
      : -Math.round((70 - finalPercentage) / 2);

    const finalConfidence = Math.max(55, Math.min(99, activeProfile.confidence + confidenceBoost));

    const assessmentResults = {
      candidateId: `MM_CANDIDATE_${Math.floor(Math.random() * 90000 + 10000)}`,
      candidateName: activeProfile.candidateName,
      skills: activeProfile.skills,
      experience: activeProfile.experience,
      education: activeProfile.education,
      projects: activeProfile.projects,
      location: activeProfile.location,
      summary: activeProfile.summary,
      mappedDomain: finalPredictedDomain,
      score: finalPercentage,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      aptitude: {
        total: 15,
        correct: aptitudeCorrect,
        wrong: aptitudeWrong,
        score: Math.round((aptitudeCorrect / 15) * 100)
      },
      resumeSkillAssessment: {
        total: questions.length - 15,
        correct: resumeSkillCorrect,
        wrong: resumeSkillWrong,
        score: Math.round((resumeSkillCorrect / Math.max(1, questions.length - 15)) * 100)
      },
      accuracy: finalPercentage,
      completionSpeedSeconds: speedSeconds,
      confidencePercentage: finalConfidence,
      categoryScores: [
        { name: 'Aptitude', score: Math.round((aptitudeCorrect / 15) * 100) },
        { name: 'Resume Skill', score: Math.round((resumeSkillCorrect / Math.max(1, questions.length - 15)) * 100) },
        { name: 'Completion Speed', score: speedSeconds < 900 ? 90 : speedSeconds < 1200 ? 75 : 55 },
        { name: 'Overall Accuracy', score: finalPercentage }
      ],
      strengths: finalPercentage >= 70 
        ? ['High operational velocity', 'Solid architectural fundamentals', 'Demonstrates logical clarity']
        : ['Consistent execution flow', 'Willingness to learn alternative pathways', 'Stable baseline reasoning'],
      weakAreas: finalPercentage >= 70
        ? ['Minor edge-case performance variances', 'Systemic time buffers']
        : ['Core syntactic accuracy under speed stress', 'Complex multi-state debugging patterns'],
      recommendedSkills: finalPercentage >= 70
        ? ['Advanced Architecture Designs', 'Asynchronous Systems Automation']
        : ['Syntax refresher courses', 'Database schema modeling', 'Time-controlled debug scenarios'],
      performanceLevel: finalPercentage >= 80 ? 'Distinguished Expert' : finalPercentage >= 50 ? 'Proficient Specialist' : 'Developing Practitioner',
      performanceDescription: finalPercentage >= 80 
        ? 'Exhibits a high level of technical competency. Handles complex problem domains effortlessly under strict deadlines.'
        : finalPercentage >= 50 
        ? 'Shows solid core comprehension. Demonstrates steady problem-solving, with opportunities to perfect edge cases.'
        : 'Displays functional potential. Benefit from targeted skill mentorship and guided repository workflows.',
      createdAt: new Date().toISOString()
    };

    // Save to MongoDB instead of localStorage
    try {
      await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessmentResults),
      });
      console.log("Assessment safely stored in MongoDB!");
    } catch (error) {
      console.error("Failed to save assessment to DB", error);
    }
    onAssessmentCompleted(assessmentResults);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  const currentQuestion = questions[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  // ── INTRO SCREEN ──
  if (!assessmentStarted) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center animate-fade-in text-slate-100">
        {/* Page-local grid */}
        <div className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 40% at 50% 35%, rgba(120,30,180,0.08), transparent 70%)' }}
        />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 space-y-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a1333] border border-purple-500/30 text-purple-300 text-[10px] font-bold tracking-[0.2em] uppercase">
            <Brain className="w-3.5 h-3.5" />
            <span>Capability Verification</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Objective Assessment
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Welcome, <span className="text-purple-300 font-bold">{activeProfile.candidateName}</span>. 
              This evaluation sequence has been structured based on your verified profile.
            </p>
          </div>

          {/* Verified skills editor */}
          <div className="bg-[#0f0b1b]/40 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 text-left max-w-lg mx-auto space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-purple-300">Verified Skills (edit before starting)</h3>
            <div className="flex flex-wrap gap-2">
              {verifiedSkills.map((s, i) => (
                <div key={i} className="inline-flex items-center gap-2 bg-black/20 border border-slate-800 rounded-full px-3 py-1 text-sm">
                  <span className="text-slate-200">{s}</span>
                  <button onClick={() => setVerifiedSkills(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-400 ml-1">×</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input id="new-skill" placeholder="Add skill or tech" className="flex-1 bg-black/10 rounded-xl px-3 py-2 border border-slate-800 text-sm text-white outline-none" />
              <button onClick={() => {
                const el = document.getElementById('new-skill') as HTMLInputElement | null;
                if (!el) return;
                const val = (el.value || '').trim();
                if (!val) return;
                setVerifiedSkills(prev => Array.from(new Set([...prev, val])));
                el.value = '';
              }} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white">Add</button>
            </div>
            <p className="text-sm text-slate-400">You can remove or add skills — questions will be generated only from this confirmed list.</p>
            <div className="flex justify-end">
              <button onClick={() => { prepareQuestionsFromSeeds(verifiedSkills); setAssessmentStarted(true); }} className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold">Confirm & Start Assessment</button>
            </div>
          </div>

          <div className="bg-[#0f0b1b]/40 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 text-left max-w-lg mx-auto space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-purple-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Verification Protocol:
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-0.5">•</span>
                <span><strong className="text-white">30 questions</strong>: first 15 aptitude, next 15 resume skill/project/internship based.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-0.5">•</span>
                <span>Each question has a strict <strong className="text-white">60-second timer</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-0.5">•</span>
                <span>Unanswered questions count as incorrect when time expires.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-0.5">•</span>
                <span>Your score will predict your domain placement confidence index.</span>
              </li>
            </ul>
          </div>

          <button onClick={handleStart}
            className="px-12 py-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-bold text-base shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] transition-all hover:-translate-y-0.5 cursor-pointer">
            Begin Cognitive Assessment
          </button>
        </div>
      </div>
    );
  }

  // ── ACTIVE TEST SCREEN ──
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden animate-fade-in text-slate-100">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f0b1b]/50 backdrop-blur-md border border-purple-500/20 p-4 rounded-2xl">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-purple-300 uppercase font-bold">ACTIVE TEST</span>
            <h3 className="text-sm font-bold text-white">{profile?.candidateName || 'Candidate'} — {questions[0]?.category || 'Capability Sequence'}</h3>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-sm ${
            timeLeft > 30 ? 'text-purple-300 border-purple-500/30' :
            timeLeft > 15 ? 'text-amber-400 border-amber-500/30' :
            'text-rose-400 border-rose-500/30 animate-pulse'
          }`}>
            <Timer className={`w-4 h-4 ${timeLeft <= 15 ? 'animate-spin' : ''}`} />
            <span>{timeLeft}s remaining</span>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="space-y-3">
          <div className="flex justify-between text-[11px] font-mono text-purple-300">
            <span>Answered: {answeredCount} / {questions.length}</span>
            <span>Question {currentIdx + 1} of {questions.length}</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((_, idx) => (
              <button key={idx} disabled={idx !== currentIdx}
                className={`w-7 py-1 rounded text-[10px] font-mono font-bold border transition-all ${
                  currentIdx === idx 
                    ? 'bg-[#7c3aed] text-white border-[#7c3aed] shadow-[0_0_10px_rgba(124,58,237,0.4)]'
                    : selectedAnswers[idx] !== undefined
                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                    : 'bg-slate-800/50 text-slate-500 border-slate-700 opacity-60'
                }`}>
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* QUESTION CARD */}
        {currentQuestion ? (
          <div className="bg-[#0f0b1b]/40 backdrop-blur-md border border-purple-500/20 rounded-[32px] p-6 sm:p-8 space-y-6 min-h-[300px] flex flex-col justify-between">
            
            <div className="space-y-5">
              {/* Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-500/10 pb-3">
                <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-mono font-bold">
                  {currentQuestion.category}
                </span>
                <span className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold ${
                  currentQuestion.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                  currentQuestion.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {currentQuestion.difficulty}
                </span>
              </div>

              {/* Question */}
              <h4 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentIdx + 1}. {currentQuestion.question}
              </h4>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((option, optIdx) => {
                  const chosen = selectedAnswers[currentIdx];
                  const hasAnswered = chosen !== undefined;
                  const isSelected = chosen === optIdx;
                  const isCorrect = currentQuestion.correctAnswer === optIdx;
                  const optionState = hasAnswered
                    ? isCorrect
                      ? 'correct'
                      : isSelected
                        ? 'wrong'
                        : 'disabled'
                    : 'default';

                  return (
                    <button key={optIdx} onClick={() => selectOption(optIdx)} disabled={hasAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between group ${
                        optionState === 'correct'
                          ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-[1.005]'
                          : optionState === 'wrong'
                            ? 'bg-rose-500/15 border-rose-500/60 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.12)] scale-[1.005]'
                            : optionState === 'disabled'
                              ? 'bg-slate-900/25 text-slate-500 border-slate-800/70 opacity-60'
                              : 'bg-slate-900/40 hover:bg-purple-500/5 text-slate-300 border-slate-700/50 hover:border-purple-500/50'
                      }`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          optionState === 'correct'
                            ? 'bg-emerald-400 text-slate-950'
                            : optionState === 'wrong'
                              ? 'bg-rose-400 text-slate-950'
                              : 'bg-slate-700/50 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        optionState === 'correct'
                          ? 'border-emerald-300 bg-emerald-300'
                          : optionState === 'wrong'
                            ? 'border-rose-300 bg-rose-300'
                            : 'border-slate-600 group-hover:border-purple-400'
                      }`}>
                        {optionState === 'correct' && <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />}
                        {optionState === 'wrong' && <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedAnswers[currentIdx] !== undefined && (
                <div className={`p-4 rounded-2xl border text-sm font-semibold animate-fade-in ${
                  selectedAnswers[currentIdx] === currentQuestion.correctAnswer
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  {selectedAnswers[currentIdx] === currentQuestion.correctAnswer ? (
                    <span>Correct answer. Great job.</span>
                  ) : selectedAnswers[currentIdx] === -1 ? (
                    <span>Time expired. Correct answer: <strong className="text-emerald-300">{currentQuestion.options[currentQuestion.correctAnswer]}</strong></span>
                  ) : (
                    <span>Incorrect answer. Correct answer: <strong className="text-emerald-300">{currentQuestion.options[currentQuestion.correctAnswer]}</strong></span>
                  )}
                </div>
              )}
            </div>

            {/* CONTROLS */}
            <div className="flex justify-end items-center pt-6 border-t border-purple-500/10">
              {currentIdx === questions.length - 1 ? (
                <button onClick={() => handleSubmitAssessment(false)} disabled={isSubmitting || selectedAnswers[currentIdx] === undefined}
                  className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white font-bold text-sm shadow-[0_0_25px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  {isSubmitting ? 'Submitting…' : (
                    <>Submit <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              ) : (
                <button onClick={handleNext} disabled={selectedAnswers[currentIdx] === undefined}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-10 text-center bg-[#0f0b1b]/40 rounded-[32px] border border-purple-500/20 space-y-4">
            <AlertCircle className="w-10 h-10 text-purple-400 mx-auto animate-bounce" />
            <p className="text-sm font-bold text-white">Compiling question sets from repository…</p>
          </div>
        )}
      </div>
    </div>
  );
}
