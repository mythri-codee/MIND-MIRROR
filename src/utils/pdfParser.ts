import { DOMAINS } from '../data/questionBank';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.mjs', import.meta.url).toString();

export interface ParsedProfile {
  candidateName: string;
  skills: string[]; // verified core skills only
  tools?: string[];
  projectTechnologies?: string[];
  certificationsList?: string[];
  experience: string;
  education: string;
  projects: string;
  internships?: string;
  location: string;
  mappedDomain: string;
  summary: string;
  confidence: number;
  rawText?: string;
}

export function parseResumeText(text: string, filename: string = 'resume.pdf'): ParsedProfile {
  // Normalize common PDF camelCase and concatenation issues (e.g., GenAIPoweredDataAnalytics -> Gen AI Powered Data Analytics)
  const normalizedText = text
    .replace(/([a-z])([A-Z0-9])/g, '$1 $2')
    .replace(/([0-9])([A-Za-z])/g, '$1 $2')
    .replace(/\s+\u2013\s+/g, ' - ') // normalize en-dash to hyphen spacing
    .replace(/\u2014/g, ' - ');

  const lines = normalizedText.split('\n').map(l => l.trim()).filter(Boolean);

  const headerKeywords = ['education', 'skills', 'technical skills', 'soft skills', 'tools', 'projects', 'project', 'internship', 'internships', 'intern', 'experience', 'certifications', 'certification', 'courses', 'extra-curricular', 'objective', 'languages', 'interests', 'projects', 'project technologies', 'project description'];

  const isLikelyHeader = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    const lower = trimmed.toLowerCase().replace(/[:\s]+$/, '');

    // Direct keyword match at start or startsWith keyword + ':' is a strong indicator
    if (headerKeywords.some(k => new RegExp(`^${k}(\\b|[:\\s])`, 'i').test(lower))) return true;

    // Lines that are short and majority uppercase (or contain digits with punctuation) often are headings
    if (trimmed.length <= 60 && /^[A-Z0-9\s\-().,&%]+$/.test(trimmed.replace(/[:]+$/g, ''))) return true;

    return false;
  };

  // Fallback extractor for resumes where headings and content are on a single line
  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const extractSectionFromRawText = (keys: string[], source: string) => {
    if (!source) return '';
    const keyPattern = keys.map(k => escapeRegex(k)).join('|');
    const nextPattern = headerKeywords.map(k => escapeRegex(k)).join('|');
    const re = new RegExp(`(?:\\b(?:${keyPattern})\\b)[:\\s\-–]*([\\s\\S]*?)(?=\\b(?:${nextPattern})\\b|$)`, 'i');
    const m = source.match(re);
    if (!m) return '';
    // Clean common list bullets/markers and collapse spaces
    return m[1].replace(/[\u2022\u25CF\u25AA\u2023]/g, ' ').replace(/\s{2,}/g, ' ').trim();
  };

  // Pre-scan headings to find clear section boundaries
  const headings: { index: number; text: string; key?: string }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (isLikelyHeader(l)) {
      const lower = l.toLowerCase();
      const matchedKey = headerKeywords.find(k => new RegExp(`^${k}(\\b|[:\\s])`, 'i').test(lower));
      headings.push({ index: i, text: l, key: matchedKey });
    }
  }

  const extractSection = (keys: string[]) => {
    // Prefer to find a header from the pre-scanned headings (match at start)
    let heading = headings.find(h => keys.some(k => new RegExp(`^${k}(\\b|[:\\s])`, 'i').test(h.text.toLowerCase())));

    // Fallback: find anywhere in lines but require start-like match
    let startIdx = -1;
    if (heading) startIdx = heading.index;
    else startIdx = lines.findIndex(line => keys.some(k => new RegExp(`^${k}(\\b|[:\\s])`, 'i').test(line.toLowerCase())));

    if (startIdx === -1) return '';

    const currentLine = lines[startIdx];
    const lowerCurrent = currentLine.toLowerCase();

    // capture same-line content after label (important for ATS resumes)
    let inlineContent = '';
    keys.forEach((key) => {
      const idx = lowerCurrent.indexOf(key.toLowerCase());
      if (idx !== -1) {
        const after = currentLine.slice(idx + key.length).replace(/^\s*[:\-–]?\s*/, '').trim();
        if (after) inlineContent += (inlineContent ? ', ' : '') + after;
      }
    });

    // Determine next heading boundary
    const nextHeading = headings.find(h => h.index > startIdx);
    const endIdx = nextHeading ? nextHeading.index : lines.length;

    const collected: string[] = [];
    if (inlineContent) collected.push(inlineContent);

    for (let i = startIdx + 1; i < endIdx; i++) {
      const ln = lines[i].replace(/^[-–*•\s]+/, '').trim();
      if (!ln) continue;
      collected.push(ln);
      if (collected.length >= 50) break; // safety cap for very long sections
    }

    return collected.join(', ');
  };

  const cleanHumanName = (raw: string) => {
    const withoutEmail = raw.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, ' ');
    const withoutPhone = withoutEmail.replace(/(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3,5}\)?[\s-]?)?\d{3,5}[\s-]?\d{4,}/g, ' ');
    const withoutUrls = withoutPhone.replace(/https?:\/\/\S+|linkedin\.com\/\S+/gi, ' ');
    const withoutArrows = withoutUrls.replace(/[→|•·,:;|]/g, ' ');
    const rawTokens = withoutArrows.split(/\s+/).filter(Boolean).filter(t => /^[A-Za-z]+$/.test(t));

    const locationStopWords = new Set([
      'bengaluru','bangalore','karnataka','india','mysore','mumbai','delhi','pune','hyderabad','chennai','kolkata'
    ]);

    const tokens: string[] = [];
    for (const token of rawTokens) {
      const lower = token.toLowerCase();
      if (locationStopWords.has(lower)) break;
      tokens.push(token);
      // Usually names are 2-4 tokens max; stop once likely initials/name pattern is captured.
      if (tokens.length >= 4) break;
    }

    const nameTokens = tokens.slice(0, 4);
    return nameTokens
      .map(word => word.length === 1 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
  };

  let internshipText = extractSection(['internship', 'internships', 'intern']);
  let experienceText = extractSection(['experience']);
  let projectTextFromResume = extractSection(['project', 'projects']);
  let technicalSkillsSection = extractSection(['technical skills']);
  let fallbackSkillsSection = technicalSkillsSection || extractSection(['skills']);
  let toolsSection = extractSection(['tools']);
  let certificationsSection = extractSection(['certifications', 'certification', 'courses']);

  // If any core sections came back empty, try raw-text fallback (works when text has few newlines)
  const raw = normalizedText || text;
  if (!internshipText) internshipText = extractSectionFromRawText(['internship', 'internships', 'intern'], raw);
  if (!experienceText) experienceText = extractSectionFromRawText(['experience'], raw);
  if (!projectTextFromResume) projectTextFromResume = extractSectionFromRawText(['project', 'projects', 'project technologies', 'project description'], raw);
  if (!technicalSkillsSection) technicalSkillsSection = extractSectionFromRawText(['technical skills', 'skills'], raw);
  if (!fallbackSkillsSection) fallbackSkillsSection = technicalSkillsSection;
  if (!toolsSection) toolsSection = extractSectionFromRawText(['tools'], raw);
  if (!certificationsSection) certificationsSection = extractSectionFromRawText(['certifications', 'certification', 'courses'], raw);

  let candidateName = '';
  if (lines.length > 0) {
    const extractedFromFirstLine = cleanHumanName(lines[0]);
    if (extractedFromFirstLine && extractedFromFirstLine.length >= 4) {
      candidateName = extractedFromFirstLine;
    }
  }
  if (!candidateName) {
    const cleanName = filename.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
    candidateName = cleanName.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const allKnownSkills: string[] = [];
  DOMAINS.forEach(d => allKnownSkills.push(...d.skills));

  const aliasMap: Record<string, string> = {
    'js': 'JavaScript',
    'javascript': 'JavaScript',
    'react': 'React',
    'react.js': 'React',
    'reactjs': 'React',
    'node': 'Node.js',
    'nodejs': 'Node.js',
    'node.js': 'Node.js',
    'express': 'Express',
    'expressjs': 'Express',
    'express.js': 'Express',
    'express js': 'Express',
    'html': 'HTML',
    'html5': 'HTML',
    'css': 'CSS',
    'css3': 'CSS',
    'mysql': 'MySQL',
    'dbms(mysql)': 'MySQL',
    'git hub': 'GitHub',
    'github': 'GitHub',
    'jenkin': 'Jenkins',
    'jenkins': 'Jenkins',
    'postgresql': 'PostgreSQL',
    'postgres': 'PostgreSQL',
    'mongodb': 'MongoDB',
    'mongo': 'MongoDB',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'k8s': 'Kubernetes',
    'aws': 'AWS',
    'python': 'Python',
    'sql': 'SQL',
    'typescript': 'TypeScript',
    'ts': 'TypeScript',
    'django': 'Django',
    'rest api': 'REST APIs',
    'restapi': 'REST APIs',
    'rest': 'REST APIs',
    'ci cd': 'CI/CD',
    'cicd': 'CI/CD',
    'git': 'Git',
    'ms power point': 'Microsoft PowerPoint',
    'power point': 'Microsoft PowerPoint',
    'ms excel': 'MS Excel',
    'excel': 'MS Excel',
    'react-select': 'React-Select',
    'news api': 'News API',
    'data structure and algorithm': 'Data Structures & Algorithms',
    'datastructure and algorithm': 'Data Structures & Algorithms',
    'dsa': 'Data Structures & Algorithms',
    // Digital Marketing skills
    'seo': 'SEO Optimizer',
    'google ads': 'Google Ads',
    'social media marketing': 'Social Media Marketing',
    'content strategy': 'Content Strategy',
    'google analytics': 'Google Analytics',
    'analytics': 'Google Analytics',
    'ppc': 'Google Ads',
    'sem': 'SEO Optimizer',
    'digital marketing': 'Digital Marketing',
    'ab testing': 'A/B Testing',
    'copywriting': 'Copywriting',
    // HR skills
    'talent acquisition': 'Talent Sourcing',
    'recruitment': 'Talent Sourcing',
    'hiring': 'Talent Sourcing',
    'employee relations': 'Employee Relations',
    'performance management': 'Performance Review',
    'onboarding': 'Employee Relations',
    'hr': 'Employee Relations',
    'human resources': 'Employee Relations',
    // Finance skills
    'financial analysis': 'Financial Analysis',
    'financial modeling': 'Excel Modeling',
    'investment': 'Asset Valuation',
    'valuation': 'Asset Valuation',
    'budgeting': 'Financial Analysis',
    'risk assessment': 'Risk Assessment',
    'financial planning': 'Financial Analysis',
    'excel modeling': 'Excel Modeling',
    // Cybersecurity skills
    'network security': 'Network Security',
    'penetration testing': 'Penetration Testing',
    'cissp': 'Network Security',
    'cryptography': 'Cryptography',
    'iam': 'IAM',
    'siem': 'SIEM Tools',
    'incident response': 'IAM',
    'vulnerability': 'OWASP Top 10',
    // Data Science skills
    'pandas': 'Pandas',
    'numpy': 'NumPy',
    'scikit-learn': 'Scikit-Learn',
    'scikit learn': 'Scikit-Learn',
    'data visualization': 'Data Visualization',
    'statistical analysis': 'Statistical Analysis',
    // Machine Learning skills
    'tensorflow': 'TensorFlow',
    'pytorch': 'PyTorch',
    'model deployment': 'Model Deployment',
    'feature engineering': 'Feature Engineering',
    // QA skills
    'test automation': 'Test Automation',
    'selenium': 'Selenium',
    'manual testing': 'Integration Testing',
    'quality assurance': 'Test Automation',
    'bug tracking': 'Unit Testing',
    // DevOps skills
    'terraform': 'Terraform',
    'ci/cd': 'CI/CD',
    'continuous integration': 'CI/CD',
    'continuous deployment': 'CI/CD',
    // Sales skills
    'lead generation': 'Lead Generation',
    'business development': 'Sales & Business Development',
    'account management': 'Pipeline Management',
    'pipeline management': 'Pipeline Management',
    'crm': 'CRM',
    // Product skills
    'roadmapping': 'Roadmapping',
    'user research': 'User Research',
    'product strategy': 'OKRs'
  };

  const normalizeSkill = (skill: string) => {
    const key = skill.toLowerCase().trim();
    return aliasMap[key] || skill;
  };

  const noisePatterns = /(^(and|&|or|to|tools|description|technologiesused|description:|deployment:|certifications|certificates|interests|languages)$)|where i can|contribute to the company|gain practical/i;

  const extractListedItems = (section: string) => {
    const items = new Set<string>();
    section
      .split(/[\n,;•]+/)
      .map(s => s.replace(/^[\-–•\s]+/, '').trim())
      .filter(Boolean)
      .forEach(item => {
        let cleaned = item
          .replace(/^technical skills:?/i, '')
          .replace(/^skills:?/i, '')
          .replace(/^soft skills:?/i, '')
          .replace(/^tools:?/i, '')
          .replace(/^certifications?\s*&\s*courses:?/i, '')
          .replace(/^certifications?:?/i, '')
          .replace(/^courses?:?/i, '')
          .trim();
        if (!cleaned) return;

        // Normalize spacing and remove trailing punctuation
        cleaned = cleaned.replace(/\s{2,}/g, ' ').replace(/[\.;:,]+$/g, '').trim();
        if (noisePatterns.test(cleaned)) return;

        cleaned
          .split(/\//)
          .map(s => s.trim())
          .filter(Boolean)
          .forEach(part => {
            const partClean = part.replace(/\s{2,}/g, ' ').replace(/[\.;:,]+$/g, '').trim();
            if (!partClean || noisePatterns.test(partClean)) return;
            const norm = normalizeSkill(partClean);
            if (/^[A-Za-z][A-Za-z0-9+.#()\-\s]{1,80}$/.test(partClean)) {
              items.add(norm);
            }
          });
      });
    return Array.from(items);
  };

  const findKnownFromText = (source: string) => {
    if (!source) return [];
    const found = new Set<string>();
    const lowerSource = source.toLowerCase();
    
    Array.from(new Set(allKnownSkills)).forEach(skill => {
      const skillLower = skill.toLowerCase();
      
      // Try word boundary match first (strict)
      const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
      if (regex.test(source)) {
        found.add(normalizeSkill(skill));
        return;
      }
      
      // Try case-insensitive substring for skills with dots/hyphens (e.g., Node.js, React-Select)
      if (skill.includes('.') || skill.includes('-')) {
        const cleanedSkill = skillLower.replace(/[.\-]/g, '');
        const cleanedSource = lowerSource.replace(/[.\-]/g, '');
        if (cleanedSource.includes(cleanedSkill)) {
          found.add(normalizeSkill(skill));
          return;
        }
      }
      
      // Try fuzzy matching for skills that might be abbreviated (e.g., "Python" in "Py")
      if (skillLower.length > 4 && lowerSource.includes(skillLower)) {
        found.add(normalizeSkill(skill));
      }
    });
    
    return Array.from(found);
  };

  let verifiedCoreSkills = Array.from(new Set([
    ...extractListedItems(fallbackSkillsSection),
    ...findKnownFromText(fallbackSkillsSection)
  ]))
    .filter(Boolean)
    .filter(skill => !/communication|teamwork|presentation|public speaking|english|kannada|hindi|reading|teaching|art works?|coding\.?$/i.test(skill));

  // Fallback: if no skills found via sections, try extracting from raw text 'Technical Skills' line
  if (!verifiedCoreSkills.length) {
    const skillsMatch = raw.match(/technical\s*skills\s*[:\-–]?\s*([\s\S]*?)(?=\bprojects\b|\bcertificat|\bcertifications\b|\bextra-curricular\b|$)/i);
    if (skillsMatch && skillsMatch[1]) {
      const rawSkills = skillsMatch[1]
        .replace(/\band\b/gi, ',')
        .split(/[;,•\n]+/)
        .map(s => s.replace(/^[\-–•\s]+/, '').trim())
        .filter(Boolean)
        .map(s => s.replace(/[\.;:,]+$/g, '').trim());

      const candidates: string[] = [];
      rawSkills.forEach(token => {
        const tok = token.trim();
        if (!tok || noisePatterns.test(tok)) return;
        const words = tok.split(/\s+/).filter(Boolean);
        if (words.length > 4) {
          const found = findKnownFromText(tok);
          found.forEach(f => candidates.push(f));
          return;
        }

        const known = findKnownFromText(tok);
        if (known.length) {
          known.forEach(k => candidates.push(k));
          return;
        }

        if (/^[A-Za-z0-9+.#()\-\s]{2,60}$/.test(tok) && words.length <= 3 && !/education|bachelor|semester|cgpa|percentage|college|university|project|description/i.test(tok)) {
          candidates.push(normalizeSkill(tok));
        }
      });

      verifiedCoreSkills = Array.from(new Set(candidates)).filter(s => !/communication|teamwork|presentation|public speaking|english|kannada|hindi|reading|teaching|art works?|coding/i.test(s));
    }
  }

  const extractedTools = Array.from(new Set([
    ...extractListedItems(toolsSection),
    ...findKnownFromText(toolsSection)
  ])).filter(Boolean);

  // Build project technologies by matching against known skills only (avoid non-tech items)
  const allKnownLower = Array.from(new Set(allKnownSkills.map(s => s.toLowerCase())));
  const projectCandidates = new Set<string>();

  findKnownFromText(projectTextFromResume).forEach(s => projectCandidates.add(s));

  extractListedItems(projectTextFromResume).forEach(item => {
    const low = item.toLowerCase();
    const aliasMapped = aliasMap[low];
    if (aliasMapped && allKnownLower.includes(aliasMapped.toLowerCase())) {
      projectCandidates.add(aliasMapped);
    } else {
      allKnownLower.forEach(k => {
        if (low.includes(k) || k.includes(low)) {
          projectCandidates.add(normalizeSkill(k));
        }
      });
    }
  });

  const extractedProjectTechnologies = Array.from(projectCandidates)
    .filter(Boolean)
    .filter(skill => !verifiedCoreSkills.includes(skill));

  let extractedCertifications = Array.from(new Set(
    certificationsSection
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(/[\n•]+/)
      .map(s => s.replace(/^[\-–•\s]+/, '').trim())
      .map(s => s.replace(/\s{2,}/g, ' '))
      .map(s => s.replace(/[\.;:,]+$/g, '').trim())
      .filter(Boolean)
      .filter(item => !/^(and|&)$/i.test(item))
      .filter(item => !/languages|interests|extra-curricular/i.test(item))
  ));

  // Post-process certifications: split entries that were concatenated without bullets
  if (extractedCertifications.length) {
    const providerBoundary = /(?=\b(?:Tata\s*Forage|Coursera|Udemy|Microsoft|Google|edX|Pluralsight)\b)/i;
    const splitCandidates: string[] = [];
    extractedCertifications.forEach(entry => {
      if (!entry) return;
      // normalize fused tokens
      let e = entry.replace(/GenAIPowered/gi, 'Gen AI Powered').replace(/([a-z])([A-Z])/g, '$1 $2');
      // insert artificial boundary before provider names if they repeat
      e = e.replace(/(Tata\s*Forage)/gi, '|||$1');
      // primary split points: inserted |||, bullets, semicolons, newlines
      const parts = e.split(/\|\|\||\u2022|\u2023|\u25CF|•||;|\n/).map(p => p.trim()).filter(Boolean);
      parts.forEach(p => {
        // further split when multiple provider mentions are found
        if ((p.match(/Tata\s*Forage/gi) || []).length > 1) {
          p.split(/(?=Tata\s*Forage)/i).map(x => x.trim()).forEach(x => x && splitCandidates.push(x));
        } else if (providerBoundary.test(p) && /\b(Aug|Sep|Oct|Nov|Dec|Jan|Feb|Mar|Apr|May|Jun)\b/i.test(p)) {
          // likely a certification with provider+date; keep as-is
          splitCandidates.push(p);
        } else {
          splitCandidates.push(p);
        }
      });
    });
    extractedCertifications = Array.from(new Set(splitCandidates.map(s => s.replace(/[\.;:,]+$/g, '').replace(/^AND\s+COURSES/i, '').trim()).filter(Boolean)));
  }

  // Fallback: extract certifications directly from raw text if none found
  if (!extractedCertifications.length) {
    const certMatch = raw.match(/certificat(?:ions?|ion)\s*(?:&\s*courses)?\s*[:\-–]?\s*([\s\S]*?)(?=\bextra-curricular\b|\blanguages\b|$)/i);
    if (certMatch && certMatch[1]) {
      const parts = certMatch[1]
        .split(/\u2022|\u2023|\u25CF|\n|•|\-|–|;/)
        .map(s => s.replace(/^[\-–•\s]+/, '').trim())
        .map(s => s.replace(/\s{2,}/g, ' ').trim())
        .filter(Boolean)
        .map(s => s.replace(/[\.;,:]+$/g, '').trim());

      const grouped: string[] = [];
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (!p) continue;
        if (/\b(\(|Aug|Sep|Oct|Nov|Dec|Jan|Feb|Mar|Apr|May|Jun)\b/i.test(p) && grouped.length) {
          grouped[grouped.length - 1] = (grouped[grouped.length - 1] + ' ' + p).trim();
        } else if (/tata forage|coursera|udemy|microsoft|google|edx|pluralsight/i.test(p) && grouped.length) {
          grouped[grouped.length - 1] = (grouped[grouped.length - 1] + ' - ' + p).trim();
        } else {
          grouped.push(p);
        }
      }

      extractedCertifications = Array.from(new Set(grouped)).filter(Boolean);
    }
  }

  // 3) Infer a neutral location only from known cities if found
  const locationMatch = text.match(/\b(Bengaluru|Bangalore|Karnataka|Chennai|Hyderabad|Pune|Mumbai|Delhi|Kolkata)\b/i);
  const detectedLocation = locationMatch ? locationMatch[0] : 'Location not explicitly listed';

  const confidenceBase = Math.min(98, 60 + Math.min(verifiedCoreSkills.length * 4, 28));

  // Automatically infer the domain based on skill overlap
  let mappedDomain = 'frontend'; // Default fallback
  let maxOverlap = 0;
  const skillSet = new Set(verifiedCoreSkills.map(s => s.toLowerCase()));
  DOMAINS.forEach(d => {
    const overlap = d.skills.filter(s => skillSet.has(s.toLowerCase())).length;
    if (overlap > maxOverlap) {
      maxOverlap = overlap;
      mappedDomain = d.id;
    }
  });

  return {
    candidateName: candidateName || 'Candidate',
    skills: verifiedCoreSkills,
    tools: extractedTools,
    projectTechnologies: extractedProjectTechnologies,
    certificationsList: extractedCertifications,
    experience: experienceText || internshipText || 'Experience not explicitly listed',
    education: extractSection(['education', 'degree', 'academic']) || 'Education details not explicitly listed',
    projects: projectTextFromResume || 'Projects not explicitly listed',
    // If the internship section is missing or contains only objective/education noise,
    // display a clear "Not Specified" instead of leaking other sections.
    internships: (() => {
      const v = (internshipText || '').trim();
      if (!v) return 'Not Specified';
      const lower = v.toLowerCase();
      // treat sentences that look like objective/education as not specified
      if (noisePatterns.test(lower) || /where i can|contribute to the company|education|bachelor|semester|cgpa|percentage|objective/i.test(lower)) return 'Not Specified';
      // require at least one short token or known internship keyword
      if (/intern(ship)?|trainee|summer intern|internship at|interned at/i.test(lower)) return v;
      // if it's very short and not clearly an internship, mark Not Specified
      if (v.split(/\s+/).length < 3) return 'Not Specified';
      return v;
    })(),
    location: detectedLocation,
    mappedDomain: mappedDomain,
    summary: 'Resume parsed successfully. Verified core skills extracted from the uploaded document. Domain prediction is hidden until assessment is completed.',
    confidence: confidenceBase,
    rawText: text
  };
}

async function extractPdfText(file: File) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages: string[] = [];
  for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
    const page = await pdf.getPage(pageNo);
    const content = await page.getTextContent();
    pages.push(content.items.map((item: any) => item.str).join(' '));
  }
  return pages.join('\n');
}

async function extractDocxText(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

export async function simulateResumeParsing(file: File): Promise<ParsedProfile> {
  try {
    let text = '';
    const lowerName = file.name.toLowerCase();

    if (file.type === 'application/pdf' || lowerName.endsWith('.pdf')) {
      text = await extractPdfText(file);
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      lowerName.endsWith('.docx')
    ) {
      text = await extractDocxText(file);
    } else {
      text = await file.text();
    }

    return parseResumeText(text, file.name);
  } catch (error) {
    console.error('Resume parsing fallback:', error);
    return parseResumeText(file.name, file.name);
  }
}