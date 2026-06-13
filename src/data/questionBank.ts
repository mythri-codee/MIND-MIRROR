// Complete Predefined Datasets and Question Bank for Mind Mirror
export interface Question {
  id: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'MCQ' | 'True/False' | 'Scenario' | 'Logical';
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation: string;
}

export interface DomainMeta {
  id: string;
  name: string;
  category: 'Technical' | 'Medical' | 'Engineering' | 'Business' | 'Creative' | 'Other';
  skills: string[];
  description: string;
  averageSalary: string;
  demandTrend: 'Rising' | 'Stable' | 'High Demand';
  color: string;
}

// 1. Domains Metadata
export const DOMAINS: DomainMeta[] = [
  // Technical
  {
    id: 'frontend',
    name: 'Frontend Development',
    category: 'Technical',
    skills: ['React', 'TypeScript', 'TailwindCSS', 'CSS3', 'Vite', 'Next.js', 'Redux', 'UI/UX Design'],
    description: 'Specializes in creating responsive, visual interfaces, component architectures, and web applications.',
    averageSalary: '$115,000',
    demandTrend: 'High Demand',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'backend',
    name: 'Backend Development',
    category: 'Technical',
    skills: ['Node.js', 'Python', 'SQL', 'PostgreSQL', 'Express', 'Django', 'MongoDB', 'Redis', 'REST APIs'],
    description: 'Focuses on server-side architecture, databases, security, authentication flows, and data systems.',
    averageSalary: '$125,000',
    demandTrend: 'High Demand',
    color: 'from-purple-600 to-indigo-800'
  },
  {
    id: 'fullstack',
    name: 'Full Stack Development',
    category: 'Technical',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Express', 'TypeScript', 'Docker', 'REST APIs', 'Cloud Computing'],
    description: 'End-to-end web engineering, bridging stateful frontend interfaces with structured backend databases.',
    averageSalary: '$135,000',
    demandTrend: 'High Demand',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'datascience',
    name: 'Data Science & Neural Modeling',
    category: 'Technical',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'PyTorch', 'Data Visualization', 'Statistical Analysis'],
    description: 'Extracting strategic insights from complex datasets and designing predictive modeling structures.',
    averageSalary: '$140,000',
    demandTrend: 'Rising',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Analyst',
    category: 'Technical',
    skills: ['Network Security', 'Penetration Testing', 'Cryptography', 'Linux', 'OWASP Top 10', 'IAM', 'SIEM Tools'],
    description: 'Protecting cloud assets, validating identity networks, and neutralizing cyber exploits.',
    averageSalary: '$128,000',
    demandTrend: 'High Demand',
    color: 'from-red-500 to-rose-700'
  },
  {
    id: 'devops',
    name: 'Cloud Infrastructure & DevOps',
    category: 'Technical',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Linux', 'Nginx', 'Prometheus'],
    description: 'Automating build pipelines, setting up cloud instances, and orchestrating distributed microservices.',
    averageSalary: '$138,000',
    demandTrend: 'High Demand',
    color: 'from-amber-500 to-orange-600'
  },
  // Medical
  {
    id: 'neurology',
    name: 'Neurology Specialist',
    category: 'Medical',
    skills: ['Neurology', 'Neuroanatomy', 'EEG Interpretation', 'Brain Scanning', 'Cognitive Testing', 'Patient Care'],
    description: 'Diagnosing and mapping nervous system disorders, cognitive pathways, and neurodegenerative conditions.',
    averageSalary: '$260,000',
    demandTrend: 'Rising',
    color: 'from-indigo-500 to-pink-500'
  },
  {
    id: 'cardiology',
    name: 'Cardiology Specialist',
    category: 'Medical',
    skills: ['Cardiology', 'ECG Analysis', 'Heart Anatomy', 'Hemodynamics', 'Pharmacology', 'Cardiovascular Diagnostics'],
    description: 'Diagnosing arterial dynamics, heart rhythms, and cardiovascular wellness structures.',
    averageSalary: '$280,000',
    demandTrend: 'Stable',
    color: 'from-rose-600 to-red-800'
  },
  {
    id: 'nursing',
    name: 'Clinical Nursing Care',
    category: 'Medical',
    skills: ['Patient Assessment', 'Medication Safety', 'ICU Care', 'First Aid', 'Clinical Records', 'EHR Systems'],
    description: 'Managing patient recovery, vitals administration, clinical workflows, and emergency triage operations.',
    averageSalary: '$82,000',
    demandTrend: 'High Demand',
    color: 'from-teal-400 to-emerald-600'
  },
  // Engineering
  {
    id: 'civil',
    name: 'Civil & Structural Engineering',
    category: 'Engineering',
    skills: ['Structural Analysis', 'AutoCAD', 'Concrete Design', 'Soil Mechanics', 'Project Scheduling', 'GIS'],
    description: 'Planning, testing, and structural calculation of public architecture, transit hubs, and commercial zones.',
    averageSalary: '$92,000',
    demandTrend: 'Stable',
    color: 'from-sky-600 to-blue-800'
  },
  {
    id: 'mechanical',
    name: 'Mechanical & Robotics Engineering',
    category: 'Engineering',
    skills: ['Thermodynamics', 'CAD Modeling', 'Kinematics', 'Finite Element Analysis', 'Fluid Mechanics', 'Robotics Systems'],
    description: 'Designing sensory actuators, thermal structures, mechanical gears, and robotic assembly controllers.',
    averageSalary: '$95,000',
    demandTrend: 'Rising',
    color: 'from-amber-600 to-red-600'
  },
  {
    id: 'electrical',
    name: 'Electrical & Electronics',
    category: 'Engineering',
    skills: ['Circuit Design', 'Microcontrollers', 'Signal Processing', 'FPGA', 'Power Grids', 'MATLAB'],
    description: 'Developing semiconductors, electric distribution circuits, and micro-embedded system firmware.',
    averageSalary: '$98,000',
    demandTrend: 'Stable',
    color: 'from-yellow-500 to-orange-600'
  },
  // Business
  {
    id: 'marketing',
    name: 'Strategic Marketing & SEO',
    category: 'Business',
    skills: ['Digital Marketing', 'SEO Optimizer', 'Content Strategy', 'Google Analytics', 'A/B Testing', 'Copywriting'],
    description: 'Orchestrating demographic campaigns, organic search authority, and high-impact brand funnels.',
    averageSalary: '$78,000',
    demandTrend: 'High Demand',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'finance',
    name: 'Corporate Finance & Analytics',
    category: 'Business',
    skills: ['Financial Analysis', 'Excel Modeling', 'Asset Valuation', 'Risk Assessment', 'Tax Laws', 'Accounting Codes'],
    description: 'Mitigating investment hazards, calculating growth metrics, and optimizing balance sheet allocations.',
    averageSalary: '$105,000',
    demandTrend: 'Stable',
    color: 'from-green-600 to-emerald-800'
  },
  {
    id: 'hr',
    name: 'Human Resources & Talent Management',
    category: 'Business',
    skills: ['Conflict Resolution', 'Talent Sourcing', 'Compliance', 'Performance Review', 'Interview Design', 'EEO Regulations'],
    description: 'Structuring workforce recruitment frameworks, team alignment strategies, and employment compliance audits.',
    averageSalary: '$85,000',
    demandTrend: 'Stable',
    color: 'from-violet-500 to-indigo-700'
  },
  // Creative
  {
    id: 'graphic',
    name: 'Graphic Design & Brand Identity',
    category: 'Creative',
    skills: ['Adobe Photoshop', 'Figma', 'Illustrator', 'Color Theory', 'Typography', 'Logo Design', 'Visual Hierarchy'],
    description: 'Establishing vector design languages, corporate brand style manuals, and digital advertising layouts.',
    averageSalary: '$68,000',
    demandTrend: 'Stable',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'video',
    name: 'Video Production & Animation',
    category: 'Creative',
    skills: ['Premiere Pro', 'After Effects', 'Sound Mixing', 'Motion Graphics', 'Storyboarding', 'Video Formats'],
    description: 'Editing visual narratives, syncing spatial sound overlays, and rendering modern keyframe motion graphics.',
    averageSalary: '$72,000',
    demandTrend: 'Rising',
    color: 'from-red-400 to-pink-700'
  },
  // Other
  {
    id: 'environmental',
    name: 'Environmental Science',
    category: 'Other',
    skills: ['Ecology', 'Sustained Audits', 'EIA Process', 'Water Quality', 'Carbon Tracking', 'GIS Mapping'],
    description: 'Analyzing ecosystems, evaluating carbon offset compliance, and formulating biodiversity strategies.',
    averageSalary: '$84,000',
    demandTrend: 'Rising',
    color: 'from-emerald-600 to-green-700'
  },
  {
    id: 'law',
    name: 'Corporate Law & Counsel',
    category: 'Other',
    skills: ['Contract Drafting', 'Legal Research', 'Litigation Support', 'Intellectual Property', 'Corporate Governance'],
    description: 'Drafting commercial service agreements, defending trade rights, and evaluating regulatory liability.',
    averageSalary: '$145,000',
    demandTrend: 'Stable',
    color: 'from-slate-700 to-zinc-900'
  }
  ,
  {
    id: 'product',
    name: 'Product Management',
    category: 'Business',
    skills: ['Roadmapping', 'User Research', 'A/B Testing', 'Prioritization', 'Stakeholder Management', 'OKRs'],
    description: 'Defining product strategy, running experiments, and aligning engineering with customer value.',
    averageSalary: '$130,000',
    demandTrend: 'High Demand',
    color: 'from-indigo-500 to-indigo-700'
  },
  {
    id: 'sales',
    name: 'Sales & Business Development',
    category: 'Business',
    skills: ['Lead Generation', 'CRM', 'Negotiation', 'Pipeline Management', 'Closing Deals'],
    description: 'Driving revenue through outbound/inbound sales, partnerships and customer relationships.',
    averageSalary: '$90,000',
    demandTrend: 'Stable',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'ml',
    name: 'Machine Learning Engineering',
    category: 'Technical',
    skills: ['PyTorch', 'TensorFlow', 'Model Deployment', 'Feature Engineering', 'Data Pipelines'],
    description: 'Training and deploying machine learning models into production with scalable pipelines.',
    averageSalary: '$150,000',
    demandTrend: 'Rising',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'dataeng',
    name: 'Data Engineering',
    category: 'Technical',
    skills: ['ETL', 'Spark', 'Airflow', 'Data Modeling', 'BigQuery', 'Redshift'],
    description: 'Designing large-scale data pipelines and maintaining reliable data infrastructure.',
    averageSalary: '$140,000',
    demandTrend: 'High Demand',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'qa',
    name: 'Quality Assurance & Test Engineering',
    category: 'Technical',
    skills: ['Test Automation', 'Selenium', 'Unit Testing', 'Integration Testing', 'TDD'],
    description: 'Ensuring product quality through automated and manual testing strategies.',
    averageSalary: '$95,000',
    demandTrend: 'Stable',
    color: 'from-slate-500 to-stone-600'
  },
  {
    id: 'ops',
    name: 'Operations & Support',
    category: 'Business',
    skills: ['Process Improvement', 'SOPs', 'Customer Support', 'KPI Tracking', 'Logistics'],
    description: 'Running core business operations, support functions, and process optimization.',
    averageSalary: '$75,000',
    demandTrend: 'Stable',
    color: 'from-yellow-500 to-amber-600'
  }
];

// Mapping of individual skills to targeted technical questions
export const SKILL_SPECIFIC_QUESTIONS: Record<string, Question[]> = {
  'React': [
    { id: 'skill-react-1', category: 'React Hooks', difficulty: 'Medium', type: 'MCQ', question: 'Which Hook should you use to handle responsive side-effects after render?', options: ['useEffect', 'useLayoutEffect', 'useInsertionEffect', 'useMemo'], correctAnswer: 0, explanation: 'useEffect runs asynchronously after paint commit.' },
    { id: 'skill-react-2', category: 'React Performance', difficulty: 'Hard', type: 'Scenario', question: 'Metrics page locks with 500 items. How to maintain 60 FPS?', options: ['Implement windowing/virtualization', 'Run in Web Worker', 'Convert to SVG', 'Inject delay'], correctAnswer: 0, explanation: 'DOM virtualization renders only visible elements.' },
    { id: 'skill-react-3', category: 'React State', difficulty: 'Medium', type: 'MCQ', question: 'How prevent unnecessary re-renders with Context API?', options: ['Use useMemo + split contexts', 'Use absolute positioning', 'Call forceUpdate', 'Use useInsertionEffect'], correctAnswer: 0, explanation: 'Memoization and context splitting localize updates.' }
  ],
  'TypeScript': [
    { id: 'skill-ts-1', category: 'Type Safety', difficulty: 'Medium', type: 'MCQ', question: 'Why is "unknown" safer than "any" in TypeScript?', options: ['Forces type checking before use', 'Faster compilation', 'Reduces bundle size', 'Better debugging'], correctAnswer: 0, explanation: 'unknown requires type guards before operations.' },
    { id: 'skill-ts-2', category: 'Generics', difficulty: 'Medium', type: 'MCQ', question: 'What advantage do generics provide?', options: ['Type-safe reusable code', 'Faster runtime', 'Smaller file size', 'Auto-fixes errors'], correctAnswer: 0, explanation: 'Generics enable type-safe polymorphic functions.' }
  ],
  'Node.js': [
    { id: 'skill-node-1', category: 'Node Async', difficulty: 'Medium', type: 'MCQ', question: 'What is the event loop in Node.js?', options: ['Handles async operations and callbacks', 'Controls server restart timing', 'Manages memory allocation', 'Optimizes file I/O'], correctAnswer: 0, explanation: 'Event loop executes callbacks as I/O completes.' },
    { id: 'skill-node-2', category: 'Node Modules', difficulty: 'Easy', type: 'MCQ', question: 'What does require() do?', options: ['Loads CommonJS modules', 'Creates HTTP requests', 'Starts server', 'Formats JSON'], correctAnswer: 0, explanation: 'require() imports Node.js modules synchronously.' }
  ],
  'Python': [
    { id: 'skill-python-1', category: 'Concurrency', difficulty: 'Medium', type: 'MCQ', question: 'What is the purpose of the GIL in CPython?', options: ['Prevents concurrent thread execution', 'Speeds calculations', 'Manages memory', 'Provides sandboxing'], correctAnswer: 0, explanation: 'GIL protects object access in Python.' },
    { id: 'skill-python-2', category: 'Data Structures', difficulty: 'Easy', type: 'MCQ', question: 'What collection stores key-value pairs?', options: ['Dictionary', 'List', 'Tuple', 'Set'], correctAnswer: 0, explanation: 'Dictionaries store key-value pairs in Python.' },
    { id: 'skill-python-3', category: 'OOP', difficulty: 'Medium', type: 'MCQ', question: 'What does inheritance allow?', options: ['Code reusability via subclassing', 'Parallel execution', 'Memory optimization', 'Network communication'], correctAnswer: 0, explanation: 'Inheritance enables code reuse through subclasses.' }
  ],
  'SQL': [
    { id: 'skill-sql-1', category: 'Optimization', difficulty: 'Hard', type: 'Scenario', question: '45M row table, email lookup slow. Index strategy?', options: ['Composite index (email, created_at)', 'Single-column indexes on all', 'Convert to binary blob', 'Move to backend code'], correctAnswer: 0, explanation: 'Composite indexes enable efficient seeking.' },
    { id: 'skill-sql-2', category: 'Queries', difficulty: 'Easy', type: 'MCQ', question: 'Which statement retrieves records?', options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'], correctAnswer: 0, explanation: 'SELECT retrieves data from tables.' },
    { id: 'skill-sql-3', category: 'Joins', difficulty: 'Medium', type: 'MCQ', question: 'What does INNER JOIN do?', options: ['Returns matching rows from both tables', 'Returns all left table rows', 'Returns all rows from both', 'Returns no rows'], correctAnswer: 0, explanation: 'INNER JOIN returns only matching records.' }
  ],
  'PostgreSQL': [
    { id: 'skill-pg-1', category: 'Database Features', difficulty: 'Medium', type: 'MCQ', question: 'What is a PostgreSQL transaction?', options: ['Atomic sequence of operations', 'User login session', 'Backup process', 'Query log'], correctAnswer: 0, explanation: 'Transactions ensure data consistency.' },
    { id: 'skill-pg-2', category: 'Performance', difficulty: 'Medium', type: 'MCQ', question: 'How to improve slow PostgreSQL queries?', options: ['Add indexes and analyze plan', 'Increase RAM', 'Upgrade CPU', 'Delete old data'], correctAnswer: 0, explanation: 'Indexing and query analysis improve performance.' }
  ],
  'MongoDB': [
    { id: 'skill-mongo-1', category: 'NoSQL', difficulty: 'Medium', type: 'MCQ', question: 'What format does MongoDB use?', options: ['BSON (JSON-like)', 'SQL tables', 'XML documents', 'CSV files'], correctAnswer: 0, explanation: 'MongoDB stores BSON documents flexibly.' },
    { id: 'skill-mongo-2', category: 'Collections', difficulty: 'Easy', type: 'MCQ', question: 'What is a collection in MongoDB?', options: ['Group of documents', 'Single document', 'Database connection', 'Query result'], correctAnswer: 0, explanation: 'Collections group related documents.' }
  ],
  'Express': [
    { id: 'skill-express-1', category: 'Middleware', difficulty: 'Medium', type: 'MCQ', question: 'What is Express middleware?', options: ['Functions handling requests/responses', 'Database library', 'Frontend framework', 'Build tool'], correctAnswer: 0, explanation: 'Middleware processes HTTP requests and responses.' },
    { id: 'skill-express-2', category: 'Routing', difficulty: 'Easy', type: 'MCQ', question: 'How to define a route in Express?', options: ['app.get("/path", handler)', 'express.route("/path")', 'app.endpoint()', 'Router.define()'], correctAnswer: 0, explanation: 'app.get() defines GET routes in Express.' }
  ],
  'Django': [
    { id: 'skill-django-1', category: 'MVT Pattern', difficulty: 'Medium', type: 'MCQ', question: 'What is Django\'s architecture pattern?', options: ['Model-View-Template', 'Model-View-Controller', 'Model-Controller', 'Template-View'], correctAnswer: 0, explanation: 'Django uses Model-View-Template architecture.' },
    { id: 'skill-django-2', category: 'ORM', difficulty: 'Medium', type: 'MCQ', question: 'What is Django ORM?', options: ['Database abstraction layer', 'Frontend framework', 'Template engine', 'URL router'], correctAnswer: 0, explanation: 'ORM maps Python objects to database records.' }
  ],
  'Docker': [
    { id: 'skill-docker-1', category: 'Containers', difficulty: 'Easy', type: 'MCQ', question: 'What is a Docker container?', options: ['Lightweight isolated application environment', 'Virtual machine', 'Database backup', 'Network interface'], correctAnswer: 0, explanation: 'Containers package apps with dependencies.' },
    { id: 'skill-docker-2', category: 'Images', difficulty: 'Medium', type: 'MCQ', question: 'What is a Dockerfile?', options: ['Build instructions for image', 'Container runtime', 'Registry URL', 'Volume mount'], correctAnswer: 0, explanation: 'Dockerfile defines image build steps.' }
  ],
  'Kubernetes': [
    { id: 'skill-k8s-1', category: 'Orchestration', difficulty: 'Medium', type: 'MCQ', question: 'What does Kubernetes do?', options: ['Orchestrates containerized applications', 'Builds Docker images', 'Stores container data', 'Creates networks'], correctAnswer: 0, explanation: 'Kubernetes manages container deployment and scaling.' },
    { id: 'skill-k8s-2', category: 'Pods', difficulty: 'Easy', type: 'MCQ', question: 'What is a pod in Kubernetes?', options: ['Smallest deployable unit', 'Container registry', 'Network policy', 'Storage volume'], correctAnswer: 0, explanation: 'Pods are the smallest K8s resources.' }
  ],
  'AWS': [
    { id: 'skill-aws-1', category: 'Cloud Services', difficulty: 'Easy', type: 'MCQ', question: 'What is EC2?', options: ['Elastic cloud computing instances', 'Email service', 'Database solution', 'API gateway'], correctAnswer: 0, explanation: 'EC2 provides scalable virtual servers.' },
    { id: 'skill-aws-2', category: 'Storage', difficulty: 'Easy', type: 'MCQ', question: 'What is S3 used for?', options: ['Object storage', 'Databases', 'Compute', 'Networking'], correctAnswer: 0, explanation: 'S3 stores objects and files at scale.' }
  ],
  'REST APIs': [
    { id: 'skill-rest-1', category: 'REST Principles', difficulty: 'Medium', type: 'MCQ', question: 'What HTTP method creates a resource?', options: ['POST', 'GET', 'PUT', 'DELETE'], correctAnswer: 0, explanation: 'POST creates new resources.' },
    { id: 'skill-rest-2', category: 'Status Codes', difficulty: 'Easy', type: 'MCQ', question: 'What does 404 mean?', options: ['Resource not found', 'Server error', 'Unauthorized', 'Success'], correctAnswer: 0, explanation: '404 indicates a resource does not exist.' }
  ],
  'Git': [
    { id: 'skill-git-1', category: 'Version Control', difficulty: 'Easy', type: 'MCQ', question: 'What does git commit do?', options: ['Saves changes to repository', 'Pushes to remote', 'Creates branch', 'Views history'], correctAnswer: 0, explanation: 'Commit saves staged changes locally.' },
    { id: 'skill-git-2', category: 'Branching', difficulty: 'Medium', type: 'MCQ', question: 'When to use git branches?', options: ['Feature development and isolation', 'Backing up code', 'Creating tags', 'Merging databases'], correctAnswer: 0, explanation: 'Branches isolate work safely.' }
  ],
  'CI/CD': [
    { id: 'skill-cicd-1', category: 'Automation', difficulty: 'Medium', type: 'MCQ', question: 'What is CI/CD?', options: ['Automated build, test, deploy pipeline', 'Code documentation', 'Database management', 'API testing'], correctAnswer: 0, explanation: 'CI/CD automates software delivery.' },
    { id: 'skill-cicd-2', category: 'Tools', difficulty: 'Easy', type: 'MCQ', question: 'Which tool is a CI/CD platform?', options: ['Jenkins', 'VS Code', 'Git', 'Docker'], correctAnswer: 0, explanation: 'Jenkins automates build and deployment.' }
  ],
  'MS Excel': [
    { id: 'skill-excel-1', category: 'Functions', difficulty: 'Easy', type: 'MCQ', question: 'SUM function calculates?', options: ['Total of range', 'Average', 'Count', 'Maximum'], correctAnswer: 0, explanation: 'SUM returns sum of numeric values.' },
    { id: 'skill-excel-2', category: 'Analysis', difficulty: 'Medium', type: 'MCQ', question: 'Summarize datasets by category using?', options: ['Pivot Table', 'Formatting', 'Text to Columns', 'Sparklines'], correctAnswer: 0, explanation: 'Pivot Tables aggregate data.' }
  ],
  'Problem Solving': [
    { id: 'skill-problem-1', category: 'Analysis', difficulty: 'Medium', type: 'Scenario', question: 'Survey with missing entries. First step?', options: ['Assess missingness pattern', 'Delete dataset', 'Replace with zeros', 'Ignore missing'], correctAnswer: 0, explanation: 'Analyze missingness to choose strategy.' }
  ],
  // Digital Marketing Skills
  'SEO': [
    { id: 'skill-seo-1', category: 'SEO Basics', difficulty: 'Easy', type: 'MCQ', question: 'What does SEO stand for?', options: ['Search Engine Optimization', 'Social Email Optimization', 'Site Engine Optimization', 'Search Element Optimization'], correctAnswer: 0, explanation: 'SEO stands for Search Engine Optimization.' },
    { id: 'skill-seo-2', category: 'SEO Tools', difficulty: 'Medium', type: 'MCQ', question: 'Which platform is mainly used for SEO analysis?', options: ['Google Analytics', 'VS Code', 'Eclipse', 'GitHub'], correctAnswer: 0, explanation: 'Google Analytics is widely used for SEO analysis.' },
    { id: 'skill-seo-3', category: 'Keyword Research', difficulty: 'Medium', type: 'MCQ', question: 'What is a keyword in SEO?', options: ['Words people search for', 'Website colors', 'Server location', 'Database tables'], correctAnswer: 0, explanation: 'Keywords are the terms people search for in search engines.' },
    { id: 'skill-seo-4', category: 'On-Page SEO', difficulty: 'Medium', type: 'MCQ', question: 'What is backlink building?', options: ['Getting links from other websites', 'Deleting old content', 'Hiding keywords', 'Removing images'], correctAnswer: 0, explanation: 'Backlink building improves search rankings.' },
    { id: 'skill-seo-5', category: 'Technical SEO', difficulty: 'Hard', type: 'MCQ', question: 'What is crawl budget?', options: ['Pages search engines crawl per visit', 'Server cost', 'Team salary', 'Software license'], correctAnswer: 0, explanation: 'Crawl budget determines how many pages Google will crawl.' }
  ],
  'Google Analytics': [
    { id: 'skill-ga-1', category: 'Analytics Basics', difficulty: 'Easy', type: 'MCQ', question: 'What does Google Analytics measure?', options: ['Website traffic and user behavior', 'Server temperature', 'Database size', 'Network speed'], correctAnswer: 0, explanation: 'Google Analytics tracks website visitors and their interactions.' },
    { id: 'skill-ga-2', category: 'Metrics', difficulty: 'Medium', type: 'MCQ', question: 'What does bounce rate indicate?', options: ['Percentage of single-page visits', 'Server error rate', 'Traffic source', 'Conversion rate'], correctAnswer: 0, explanation: 'Bounce rate shows visitors who leave without interaction.' },
    { id: 'skill-ga-3', category: 'Conversion', difficulty: 'Medium', type: 'MCQ', question: 'What is a conversion in GA?', options: ['Desired user action completed', 'Page load speed', 'Image size', 'Font color'], correctAnswer: 0, explanation: 'A conversion is a goal completion by a user.' }
  ],
  'Social Media Marketing': [
    { id: 'skill-smm-1', category: 'Platform Strategy', difficulty: 'Easy', type: 'MCQ', question: 'Which platform is best for B2B marketing?', options: ['LinkedIn', 'TikTok', 'Snapchat', 'Pinterest'], correctAnswer: 0, explanation: 'LinkedIn is the primary platform for B2B professional networking.' },
    { id: 'skill-smm-2', category: 'Engagement', difficulty: 'Medium', type: 'MCQ', question: 'What is engagement rate?', options: ['Interaction relative to audience', 'Number of posts', 'Follower count', 'Profile views'], correctAnswer: 0, explanation: 'Engagement rate measures how actively involved your audience is.' }
  ],
  'Content Strategy': [
    { id: 'skill-cs-1', category: 'Content Planning', difficulty: 'Medium', type: 'MCQ', question: 'What is a content calendar used for?', options: ['Planning and scheduling content', 'Storing images', 'Writing code', 'Managing servers'], correctAnswer: 0, explanation: 'Content calendars help organize and schedule content publication.' },
    { id: 'skill-cs-2', category: 'Content Types', difficulty: 'Medium', type: 'MCQ', question: 'What is evergreen content?', options: ['Content that stays relevant over time', 'Green-colored graphics', 'Seasonal posts', 'News articles'], correctAnswer: 0, explanation: 'Evergreen content remains valuable and relevant for years.' }
  ],
  // HR Skills
  'Talent Sourcing': [
    { id: 'skill-ts-1', category: 'Recruitment', difficulty: 'Medium', type: 'MCQ', question: 'What does sourcing mean in recruitment?', options: ['Finding and engaging passive candidates', 'Writing job descriptions', 'Conducting interviews', 'Signing contracts'], correctAnswer: 0, explanation: 'Sourcing involves proactively finding qualified candidates.' },
    { id: 'skill-ts-2', category: 'Platforms', difficulty: 'Easy', type: 'MCQ', question: 'Which platform is popular for sourcing tech talent?', options: ['LinkedIn', 'Instagram', 'TikTok', 'Snapchat'], correctAnswer: 0, explanation: 'LinkedIn is the primary platform for professional networking.' }
  ],
  'Employee Relations': [
    { id: 'skill-er-1', category: 'HR Management', difficulty: 'Medium', type: 'MCQ', question: 'What is the main goal of employee relations?', options: ['Maintaining positive workplace culture', 'Reducing salaries', 'Limiting vacation days', 'Increasing workload'], correctAnswer: 0, explanation: 'Employee relations focuses on positive workplace relationships.' },
    { id: 'skill-er-2', category: 'Conflict Resolution', difficulty: 'Hard', type: 'MCQ', question: 'What is mediation?', options: ['Neutral third-party facilitation', 'Salary negotiation', 'Termination process', 'Training session'], correctAnswer: 0, explanation: 'Mediation involves a neutral party helping resolve conflicts.' }
  ],
  // Finance Skills
  'Financial Analysis': [
    { id: 'skill-fa-1', category: 'Financial Metrics', difficulty: 'Medium', type: 'MCQ', question: 'What does ROI stand for?', options: ['Return on Investment', 'Rate of Income', 'Revenue on Interest', 'Risk of Investment'], correctAnswer: 0, explanation: 'ROI measures return on an investment.' },
    { id: 'skill-fa-2', category: 'Valuation', difficulty: 'Medium', type: 'MCQ', question: 'What is NPV?', options: ['Net Present Value', 'New Payment Volume', 'Net Profit Variable', 'National Payment Visa'], correctAnswer: 0, explanation: 'NPV discounts future cash flows to present value.' },
    { id: 'skill-fa-3', category: 'Ratios', difficulty: 'Easy', type: 'MCQ', question: 'What does P/E ratio measure?', options: ['Price to Earnings', 'Profit Equity', 'Portfolio Expense', 'Personal Equity'], correctAnswer: 0, explanation: 'P/E ratio compares stock price to earnings per share.' }
  ],
  'Excel Modeling': [
    { id: 'skill-em-1', category: 'Financial Modeling', difficulty: 'Medium', type: 'MCQ', question: 'What is a financial model used for?', options: ['Forecasting and decision making', 'Storing photos', 'Playing games', 'Writing emails'], correctAnswer: 0, explanation: 'Financial models help predict outcomes and make business decisions.' },
    { id: 'skill-em-2', category: 'Functions', difficulty: 'Easy', type: 'MCQ', question: 'What does VLOOKUP do?', options: ['Search for values in table', 'Create charts', 'Format cells', 'Delete rows'], correctAnswer: 0, explanation: 'VLOOKUP searches for a value in the first column of a table.' }
  ],
  // Cybersecurity Skills
  'Network Security': [
    { id: 'skill-ns-1', category: 'Security Fundamentals', difficulty: 'Easy', type: 'MCQ', question: 'What is a firewall?', options: ['Network security system', 'Email client', 'Database', 'Search engine'], correctAnswer: 0, explanation: 'A firewall protects networks from unauthorized access.' },
    { id: 'skill-ns-2', category: 'Threats', difficulty: 'Medium', type: 'MCQ', question: 'What is phishing?', options: ['Fraudulent email attack', 'Network hardware', 'Security software', 'Data backup method'], correctAnswer: 0, explanation: 'Phishing is a social engineering attack via deceptive emails.' },
    { id: 'skill-ns-3', category: 'Encryption', difficulty: 'Medium', type: 'MCQ', question: 'What is end-to-end encryption?', options: ['Data encrypted between sender and receiver only', 'Data stored in plain text', 'Data backed up hourly', 'Data compressed'], correctAnswer: 0, explanation: 'Only the communicating parties can read the messages.' },
    { id: 'skill-ns-4', category: 'Protocols', difficulty: 'Easy', type: 'MCQ', question: 'What does HTTPS provide?', options: ['Secure encrypted connection', 'Fast internet', 'Email service', 'Cloud storage'], correctAnswer: 0, explanation: 'HTTPS encrypts data between browser and server.' }
  ],
  'Penetration Testing': [
    { id: 'skill-pt-1', category: 'Security Testing', difficulty: 'Hard', type: 'MCQ', question: 'What is penetration testing?', options: ['Authorized security attack simulation', 'Software development', 'Data backup', 'Network monitoring'], correctAnswer: 0, explanation: 'Pen testing simulates attacks to find vulnerabilities.' },
    { id: 'skill-pt-2', category: 'Methodology', difficulty: 'Medium', type: 'MCQ', question: 'What is reconnaissance in pen testing?', options: ['Information gathering phase', 'Attacking servers', 'Deleting logs', 'Uninstalling software'], correctAnswer: 0, explanation: 'Reconnaissance is the initial information gathering stage.' }
  ],
  // Cloud Computing Skills
  'Cloud Infrastructure': [
    { id: 'skill-ci-1', category: 'Cloud Concepts', difficulty: 'Medium', type: 'MCQ', question: 'What is auto-scaling in cloud?', options: ['Automatic resource adjustment', 'Manual server setup', 'Data encryption', 'Network cabling'], correctAnswer: 0, explanation: 'Auto-scaling adjusts resources based on demand.' },
    { id: 'skill-ci-2', category: 'Services', difficulty: 'Easy', type: 'MCQ', question: 'What is load balancing?', options: ['Distributing traffic across servers', 'Physical weight lifting', 'Database optimization', 'Code debugging'], correctAnswer: 0, explanation: 'Load balancing distributes network traffic across multiple servers.' }
  ],
  // Data Science Skills
  'Pandas': [
    { id: 'skill-pandas-1', category: 'Data Manipulation', difficulty: 'Medium', type: 'MCQ', question: 'What is Pandas primarily used for?', options: ['Data analysis and manipulation', 'Web development', 'Game design', 'Hardware control'], correctAnswer: 0, explanation: 'Pandas is a Python library for data analysis.' },
    { id: 'skill-pandas-2', category: 'DataFrame', difficulty: 'Easy', type: 'MCQ', question: 'What is a DataFrame?', options: ['2-dimensional data structure', 'Movie frame', 'Image file', 'Database table'], correctAnswer: 0, explanation: 'DataFrame is a tabular data structure in Pandas.' }
  ],
  'NumPy': [
    { id: 'skill-numpy-1', category: 'Numerical Computing', difficulty: 'Medium', type: 'MCQ', question: 'What does NumPy provide?', options: ['Numerical computing tools', 'Database drivers', 'GUI components', 'Web frameworks'], correctAnswer: 0, explanation: 'NumPy provides support for large multi-dimensional arrays.' },
    { id: 'skill-numpy-2', category: 'Arrays', difficulty: 'Easy', type: 'MCQ', question: 'What is an ndarray?', options: ['N-dimensional array', 'Network data', 'New database', 'Number display'], correctAnswer: 0, explanation: 'ndarray is the fundamental array object in NumPy.' }
  ],
  // Machine Learning Skills
  'TensorFlow': [
    { id: 'skill-tf-1', category: 'ML Frameworks', difficulty: 'Hard', type: 'MCQ', question: 'What is TensorFlow?', options: ['Machine learning framework', 'Web browser', 'Database system', 'Game engine'], correctAnswer: 0, explanation: 'TensorFlow is an open-source ML framework.' },
    { id: 'skill-tf-2', category: 'Neural Networks', difficulty: 'Medium', type: 'MCQ', question: 'What is a tensor?', options: ['Multi-dimensional array', 'Scalar value', 'Text file', 'Image'], correctAnswer: 0, explanation: 'A tensor is a generalized array in TensorFlow.' }
  ],
  'PyTorch': [
    { id: 'skill-pth-1', category: 'Deep Learning', difficulty: 'Medium', type: 'MCQ', question: 'PyTorch is primarily used for?', options: ['Building neural networks', 'Web development', 'Data visualization', 'Text editing'], correctAnswer: 0, explanation: 'PyTorch is designed for deep learning and neural networks.' },
    { id: 'skill-pth-2', category: 'Autograd', difficulty: 'Medium', type: 'MCQ', question: 'What is autograd in PyTorch?', options: ['Automatic differentiation', 'Gradient colors', 'Automatic grading', 'Audio recording'], correctAnswer: 0, explanation: 'Autograd automatically computes gradients for optimization.' }
  ],
  // Testing/QA Skills
  'Test Automation': [
    { id: 'skill-ta-1', category: 'QA Fundamentals', difficulty: 'Medium', type: 'MCQ', question: 'What is test automation?', options: ['Running tests without manual intervention', 'Manual testing only', 'No testing needed', 'Guessing test results'], correctAnswer: 0, explanation: 'Test automation executes tests programmatically.' },
    { id: 'skill-ta-2', category: 'Benefits', difficulty: 'Easy', type: 'MCQ', question: 'What is a benefit of test automation?', options: ['Faster test execution', 'Higher costs', 'Manual only', 'Slower feedback'], correctAnswer: 0, explanation: 'Automation speeds up test execution significantly.' }
  ],
  'Selenium': [
    { id: 'skill-sel-1', category: 'Testing Tools', difficulty: 'Easy', type: 'MCQ', question: 'What is Selenium used for?', options: ['Automating web browsers', 'Database queries', 'Mobile apps', 'Desktop apps'], correctAnswer: 0, explanation: 'Selenium automates web browser testing.' },
    { id: 'skill-sel-2', category: 'Web Testing', difficulty: 'Medium', type: 'MCQ', question: 'What does Selenium WebDriver do?', options: ['Directly controls browsers', 'Creates databases', 'Sends emails', 'Compiles code'], correctAnswer: 0, explanation: 'WebDriver directly communicates with browsers.' }
  ],
  // DevOps Skills
  'Terraform': [
    { id: 'skill-tf-iac-1', category: 'Infrastructure as Code', difficulty: 'Medium', type: 'MCQ', question: 'What is Terraform?', options: ['Infrastructure provisioning tool', 'Programming language', 'Database', 'Web server'], correctAnswer: 0, explanation: 'Terraform manages infrastructure through code.' },
    { id: 'skill-tf-iac-2', category: 'State Management', difficulty: 'Hard', type: 'MCQ', question: 'What is Terraform state?', options: ['Mapping of resources to configuration', 'Database table', 'Log file', 'Backup archive'], correctAnswer: 0, explanation: 'State file maps real infrastructure to configuration.' }
  ]
};

// 2. Large Predefined Question Bank (categorized for our domains)
// Fully simulated database mapping with highly professional questions
export const QUESTION_BANK: Record<string, Question[]> = {
  frontend: [
    {
      id: 'fe-1',
      category: 'React Component Life',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'Which Hook should you use to handle responsive side-effects that execute after all layout paint actions?',
      options: [
        'useEffect',
        'useLayoutEffect',
        'useInsertionEffect',
        'useMemo'
      ],
      correctAnswer: 0,
      explanation: 'useEffect runs asynchronously after the render paint is committed to the screen, which is ideal for most responsive side effects.'
    },
    {
      id: 'fe-2',
      category: 'TypeScript Typing',
      difficulty: 'Easy',
      type: 'True/False',
      question: 'True or False: In TypeScript, the "unknown" type is safer than the "any" type because it forces you to perform type checking before invoking operations.',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'TypeScript requires that variables typed as "unknown" undergo a type guard or casting before performing property accesses or function calls.'
    },
    {
      id: 'fe-3',
      category: 'CSS Performance',
      difficulty: 'Hard',
      type: 'Scenario',
      question: 'Your web dashboard features an animated glowing node layout with 500 nodes. Rendering is experiencing heavy layout thrashing on browser resize. What is the most effective CSS optimization?',
      options: [
        'Apply "transform: translate3d(0,0,0)" and "will-change: transform" to the moving nodes to delegate them to the GPU.',
        'Convert all Tailwind classes to raw absolute inline style calculations on every render.',
        'Replace all grid elements with flexible margins calculated via standard JavaScript requestAnimationFrame.',
        'Increase the transition-duration of all background colors to over 10 seconds to buffer the paint times.'
      ],
      correctAnswer: 0,
      explanation: 'Using GPU layers via "will-change" or 3D transform matrices prevents browser layout cycles, relying purely on compositor passes.'
    },
    {
      id: 'fe-4',
      category: 'State Management',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'When using Context API, how can you prevent unnecessary re-renders of consuming subcomponents when only a slice of the context updates?',
      options: [
        'Memoize the context value object using useMemo and split distinct states into multiple contexts.',
        'Wrap the consumer components in a standard HTML section with absolute positioning.',
        'Call the React forceUpdate() hook directly from within the parent renderer.',
        'Use the useInsertionEffect hook to mutate state variables directly without triggering render.'
      ],
      correctAnswer: 0,
      explanation: 'Splitting unrelated data slices into separate contexts, combined with memoized child trees, is the native React pattern to localize context updates.'
    },
    {
      id: 'fe-5',
      category: 'Logical Reasoning',
      difficulty: 'Medium',
      type: 'Logical',
      question: 'An application loads list data in chunks of 20 items. If the viewport height allows exactly 22 items to be visible, what is the recursive outcome on an automated scroll listener that only triggers when bottom padding is less than 5px?',
      options: [
        'The scrolling triggers once, fetches the next 20 items, fills the space, and enters a stable state.',
        'The user remains stuck with 22 items forever as the bottom padding never reaches under 5px without active manual scrolling.',
        'The program immediately crashes with an out-of-memory exception.',
        'The layout falls back automatically to flex-wrap with horizontal pagination.'
      ],
      correctAnswer: 1,
      explanation: 'If the items do not fill the viewport such that manual scroll travel is possible, the scroll event listener is never fired again to fetch more data.'
    },
    {
      id: 'fe-6',
      category: 'Vite & Bundling',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What mechanism does Vite utilize during development to deliver instantaneous module reloading compared to traditional bundlers?',
      options: [
        'Native ES Modules (ESM) over HTTP, letting the browser parse module relationships directly.',
        'Pre-rendering all components as raw web-assembly static binaries.',
        'Injecting custom iframe containers for every imported typescript file.',
        'Utilizing native Django REST templating internally to proxy style imports.'
      ],
      correctAnswer: 0,
      explanation: 'Vite serves source code over native ESM, allowing browsers to perform HTTP requests for imports on demand, with lightning-fast dynamic recompiles via esbuild.'
    },
    {
      id: 'fe-7',
      category: 'Performance',
      difficulty: 'Hard',
      type: 'Scenario',
      question: 'A large metrics report page causes the browser main thread to lock up for 1.2 seconds when plotting 50,000 data rows. How would you solve this to maintain 60 FPS responsiveness?',
      options: [
        'Implement windowing/virtualization (e.g., react-window) to only render visible rows in the DOM.',
        'Run the entire React render loop inside a background HTML5 Web Worker.',
        'Convert all tabular data elements to localized SVG icons for faster paint times.',
        'Inject a hard recursive delay of 5ms between every single row in the array map.'
      ],
      correctAnswer: 0,
      explanation: 'DOM virtualization ensures that only the ~20 visible elements are mounted in the browser layout, keeping the node count constant regardless of dataset size.'
    }
  ],
  backend: [
    {
      id: 'be-1',
      category: 'Database Optimization',
      difficulty: 'Hard',
      type: 'Scenario',
      question: 'A transaction records table contains 45 million rows. A query looking up specific candidate records by "email" and "created_at" is executing in 4.5 seconds. What is the correct database index strategy?',
      options: [
        'Create a composite index on (email, created_at) to allow index-only search and sorting.',
        'Add isolated single-column indexes on every table column individually.',
        'Convert the entire email column to a binary blob structure to decrease character comparison overhead.',
        'Disable indexing entirely and move search operations into standard backend Django code filters.'
      ],
      correctAnswer: 0,
      explanation: 'A composite index covering both columns allows the relational planner to seek the exact email slice and instantly obtain sorted timestamps without full table scans.'
    },
    {
      id: 'be-2',
      category: 'Auth Flow Protocols',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'In a secure OAuth 2.0 PKCE flow, what is the role of the "Code Verifier" and "Code Challenge"?',
      options: [
        'The client creates a random Code Verifier, sends its hash (Challenge) to get an Auth Code, then presents the original Verifier to get the Access Token.',
        'The database encrypts the user’s master password with the Challenge before returning JWT tokens.',
        'The mail server transmits the Verifier to the user’s mobile app using a secondary SMS verification route.',
        'It prevents the frontend from requesting any API assets unless the CORS origin is completely cleared.'
      ],
      correctAnswer: 0,
      explanation: 'PKCE ensures that even if an interceptor captures the authorization code, they cannot exchange it for tokens without the original, unhashed code verifier.'
    },
    {
      id: 'be-3',
      category: 'NodeJS Engine',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What happens to the Node.js process when the Event Loop has no active callbacks, timers, or network listeners registered?',
      options: [
        'The process exits immediately with code 0.',
        'It goes into an infinite idle block waiting for CPU temperature changes.',
        'It restarts automatically by calling the main entry point file again.',
        'The runtime emits a warning that the machine must be rebooted.'
      ],
      correctAnswer: 0,
      explanation: 'Node.js exits the main process automatically when the event loop is empty of active event queues, interval timers, and socket handles.'
    },
    {
      id: 'be-4',
      category: 'REST API Design',
      difficulty: 'Easy',
      type: 'True/False',
      question: 'True or False: An idempotent HTTP request method means that making multiple identical requests will produce the exact same database state as a single request.',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'Methods like GET, PUT, and DELETE are designed to be idempotent; repeating the call yields identical side effects on the server resource.'
    }
  ],
  neurology: [
    {
      id: 'neur-1',
      category: 'Neuroanatomy',
      difficulty: 'Hard',
      type: 'MCQ',
      question: 'Damage to the arcuate fasciculus most typically results in which neurological condition?',
      options: [
        'Conduction Aphasia, where comprehension and speech are intact but repetition is severely impaired.',
        'Broca’s Aphasia, characterized by non-fluent, halting output speech structures.',
        'Wernicke’s Aphasia, marked by fluent but meaningless jargon language.',
        'Visual Agnosia, where patients fail to identify objects visually.'
      ],
      correctAnswer: 0,
      explanation: 'The arcuate fasciculus is the white matter pathway connecting Broca and Wernicke areas. Disconnection leads to conduction aphasia.'
    },
    {
      id: 'neur-2',
      category: 'Diagnostics',
      difficulty: 'Medium',
      type: 'Scenario',
      question: 'An EEG shows generalized 3 Hz spike-and-wave discharges. This clinical finding is most pathognomonic for which pediatric neurological presentation?',
      options: [
        'Absence Epilepsy, where brief staring spells occur without postictal confusion.',
        'Temporal Lobe Complex Partial Seizures with lateralized motor movements.',
        'Juvenile Myoclonic Epilepsy triggered by early morning light flashes.',
        'Subacute Sclerosing Panencephalitis showing slow delta periodic waves.'
      ],
      correctAnswer: 0,
      explanation: 'Classic 3Hz spike-and-wave patterns are the defining electrographic signature of childhood absence seizures.'
    }
  ],
  marketing: [
    {
      id: 'mkt-1',
      category: 'SEO Fundamentals',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Which platform is mainly used for SEO analysis?',
      options: [
        'Google Analytics',
        'VS Code',
        'Eclipse',
        'GitHub'
      ],
      correctAnswer: 0,
      explanation: 'Google Analytics is the primary platform for analyzing SEO and website traffic.'
    },
    {
      id: 'mkt-2',
      category: 'Digital Advertising',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What does PPC stand for in digital marketing?',
      options: [
        'Pay Per Click',
        'Pay Per Conversion',
        'Performance Page Control',
        'Personalized Promotion Criteria'
      ],
      correctAnswer: 0,
      explanation: 'PPC is Pay Per Click advertising model.'
    },
    {
      id: 'mkt-3',
      category: 'Content Strategy',
      difficulty: 'Medium',
      type: 'Scenario',
      question: 'A blog post has high bounce rate. What is the best first step?',
      options: [
        'Improve headline and opening paragraph',
        'Delete the post immediately',
        'Change server hosting',
        'Remove all images'
      ],
      correctAnswer: 0,
      explanation: 'Engaging headlines and introductions reduce bounce rates.'
    }
  ],
  finance: [
    {
      id: 'fin-1',
      category: 'Financial Analysis',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What does ROI stand for?',
      options: [
        'Return on Investment',
        'Rate of Income',
        'Revenue on Interest',
        'Risk of Investment'
      ],
      correctAnswer: 0,
      explanation: 'ROI measures return on an investment.'
    },
    {
      id: 'fin-2',
      category: 'Financial Modeling',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What is a discounted cash flow used for?',
      options: [
        'Valuing investments',
        'Calculating payroll',
        'Tracking expenses',
        'Managing inventory'
      ],
      correctAnswer: 0,
      explanation: 'DCF is used to estimate investment value.'
    }
  ],
  hr: [
    {
      id: 'hr-1',
      category: 'Talent Acquisition',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is the main purpose of an interview?',
      options: [
        'Assess candidate qualifications',
        'Sell company products',
        'Provide training',
        'Process payroll'
      ],
      correctAnswer: 0,
      explanation: 'Interviews assess candidate fit and qualifications.'
    },
    {
      id: 'hr-2',
      category: 'Employee Relations',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What does performance management involve?',
      options: [
        'Evaluating and improving employee performance',
        'Hiring new employees',
        'Terminating employees',
        'All of the above'
      ],
      correctAnswer: 0,
      explanation: 'Performance management focuses on improvement.'
    }
  ],
  cybersecurity: [
    {
      id: 'cyber-1',
      category: 'Network Security',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is a firewall?',
      options: [
        'Network security system',
        'Email client',
        'Database',
        'Search engine'
      ],
      correctAnswer: 0,
      explanation: 'A firewall protects networks from unauthorized access.'
    },
    {
      id: 'cyber-2',
      category: 'Threats',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What is phishing?',
      options: [
        'Fraudulent email attack',
        'Network hardware',
        'Security software',
        'Data backup method'
      ],
      correctAnswer: 0,
      explanation: 'Phishing is a social engineering attack via deceptive emails.'
    }
  ],
  datascience: [
    {
      id: 'ds-1',
      category: 'Data Analysis',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What is Pandas primarily used for?',
      options: [
        'Data analysis and manipulation',
        'Web development',
        'Game design',
        'Hardware control'
      ],
      correctAnswer: 0,
      explanation: 'Pandas is a Python library for data analysis.'
    },
    {
      id: 'ds-2',
      category: 'Statistical Analysis',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What does mean represent in statistics?',
      options: [
        'Average value',
        'Highest value',
        'Lowest value',
        'Most frequent value'
      ],
      correctAnswer: 0,
      explanation: 'Mean is the arithmetic average of values.'
    }
  ],
  ml: [
    {
      id: 'ml-1',
      category: 'Machine Learning',
      difficulty: 'Hard',
      type: 'MCQ',
      question: 'What is supervised learning?',
      options: [
        'Learning with labeled data',
        'Learning without data',
        'Learning through reinforcement',
        'Learning by clustering'
      ],
      correctAnswer: 0,
      explanation: 'Supervised learning uses labeled training data.'
    }
  ],
  qa: [
    {
      id: 'qa-1',
      category: 'Testing Concepts',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is the purpose of unit testing?',
      options: [
        'Verify individual components work correctly',
        'Test entire application',
        'Fix bugs automatically',
        'Write documentation'
      ],
      correctAnswer: 0,
      explanation: 'Unit tests verify individual functions or components.'
    }
  ],
  devops: [
    {
      id: 'devops-1',
      category: 'CI/CD',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What is continuous integration?',
      options: [
        'Merging code frequently with automated tests',
        'Manual testing only',
        'No testing required',
        'Weekly deployments'
      ],
      correctAnswer: 0,
      explanation: 'CI involves frequent integration with automated testing.'
    }
  ],
  sales: [
    {
      id: 'sales-1',
      category: 'Sales Process',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What does CRM stand for?',
      options: [
        'Customer Relationship Management',
        'Cost Reduction Method',
        'Computerized Records Management',
        'Central Resource Monitor'
      ],
      correctAnswer: 0,
      explanation: 'CRM manages customer relationships and data.'
    }
  ],
  graphic: [
    {
      id: 'graphic-1',
      category: 'Design Principles',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What is the rule of thirds in design?',
      options: [
        'Dividing composition into nine equal parts',
        'Using three colors only',
        'Creating three font styles',
        'Designing for three devices'
      ],
      correctAnswer: 0,
      explanation: 'Rule of thirds creates balanced compositions.'
    }
  ],
  product: [
    {
      id: 'product-1',
      category: 'Product Management',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'What is a product roadmap?',
      options: [
        'Strategic plan showing product evolution',
        'List of features completed',
        'Bug tracking document',
        'Code documentation'
      ],
      correctAnswer: 0,
      explanation: 'Roadmaps guide product strategy and timeline.'
    }
  ]
};

// 15 Aptitude Questions used as the first half of the assessment
export const APTITUDE_QUESTIONS: Question[] = [
  {
    id: 'apt-1', category: 'Numerical Ability', difficulty: 'Easy', type: 'MCQ',
    question: 'If 20% of a number is 120, then what is 120% of that number?',
    options: ['480', '720', '600', '360'], correctAnswer: 1,
    explanation: '20% = 120, so 100% = 600 and 120% = 720.'
  },
  {
    id: 'apt-2', category: 'Logical Reasoning', difficulty: 'Medium', type: 'Logical',
    question: 'If no competent candidate fails validation, which statement must be true?',
    options: ['If a candidate fails validation, they are not competent', 'If a candidate passes, they are an expert', 'Every non-competent candidate fails', 'Passing is random'],
    correctAnswer: 0,
    explanation: 'This is the contrapositive of the original statement.'
  },
  {
    id: 'apt-3', category: 'Verbal Ability', difficulty: 'Easy', type: 'MCQ',
    question: 'Choose the synonym of ADAPT.',
    options: ['Adjust', 'Reject', 'Ignore', 'Delay'], correctAnswer: 0,
    explanation: 'Adapt means to adjust to new conditions.'
  },
  {
    id: 'apt-4', category: 'Quantitative Aptitude', difficulty: 'Medium', type: 'MCQ',
    question: 'The average of 3, 6, 9, 12 and 15 is:',
    options: ['9', '8', '10', '12'], correctAnswer: 0,
    explanation: 'Sum is 45 and average is 45/5 = 9.'
  },
  {
    id: 'apt-5', category: 'Logical Reasoning', difficulty: 'Medium', type: 'MCQ',
    question: 'Find the next number: 2, 6, 12, 20, 30, ?',
    options: ['42', '36', '40', '44'], correctAnswer: 0,
    explanation: 'Pattern is n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, so 6×7 = 42.'
  },
  {
    id: 'apt-6', category: 'Verbal Ability', difficulty: 'Medium', type: 'MCQ',
    question: 'Choose the opposite of TRANSPARENT.',
    options: ['Opaque', 'Clear', 'Visible', 'Shiny'], correctAnswer: 0,
    explanation: 'Opaque is the opposite of transparent.'
  },
  {
    id: 'apt-7', category: 'Quantitative Aptitude', difficulty: 'Hard', type: 'MCQ',
    question: 'A sum amounts to 815 in 3 years and 854 in 4 years at simple interest. Find the principal.',
    options: ['698', '650', '720', '780'], correctAnswer: 0,
    explanation: 'One year interest = 39, so principal = 815 - 117 = 698.'
  },
  {
    id: 'apt-8', category: 'Logical Reasoning', difficulty: 'Medium', type: 'MCQ',
    question: 'Which one is the odd one out?',
    options: ['January', 'May', 'July', 'November'], correctAnswer: 3,
    explanation: 'November has 30 days; the others have 31.'
  },
  {
    id: 'apt-9', category: 'Numerical Ability', difficulty: 'Easy', type: 'MCQ',
    question: 'If a person walks 600m in 5 minutes, what is the speed in km/hr?',
    options: ['7.2', '6.5', '8.0', '5.4'], correctAnswer: 0,
    explanation: '600m/300s = 2 m/s = 7.2 km/hr.'
  },
  {
    id: 'apt-10', category: 'Logical Reasoning', difficulty: 'Hard', type: 'MCQ',
    question: 'Pointing to a photo, a man says: “That man\'s father is my father\'s son.” Whose photo is it?',
    options: ['His son', 'His father', 'His brother', 'His nephew'], correctAnswer: 0,
    explanation: 'My father\'s son = myself, so the man is his son.'
  },
  {
    id: 'apt-11', category: 'Verbal Ability', difficulty: 'Easy', type: 'MCQ',
    question: 'Complete the sentence: She _____ to the office every day.',
    options: ['goes', 'go', 'going', 'gone'], correctAnswer: 0,
    explanation: 'Third person singular present tense is “goes”.'
  },
  {
    id: 'apt-12', category: 'Quantitative Aptitude', difficulty: 'Medium', type: 'MCQ',
    question: 'If 3 workers complete a task in 12 days, how many days will 6 workers take?',
    options: ['6', '8', '4', '12'], correctAnswer: 0,
    explanation: 'Doubling workers halves the time.'
  },
  {
    id: 'apt-13', category: 'Logical Reasoning', difficulty: 'Medium', type: 'MCQ',
    question: 'SCD, TEF, UGH, ____, WKL',
    options: ['VIJ', 'UJI', 'CMN', 'IJT'], correctAnswer: 0,
    explanation: 'Letter patterns progress alphabetically: S,T,U,V,W and CD,EF,GH,IJ,KL.'
  },
  {
    id: 'apt-14', category: 'Verbal Ability', difficulty: 'Medium', type: 'MCQ',
    question: 'Choose the synonym for ADVERSITY.',
    options: ['Misfortune', 'Prosperity', 'Advantage', 'Pleasure'], correctAnswer: 0,
    explanation: 'Adversity means hardship or misfortune.'
  },
  {
    id: 'apt-15', category: 'Quantitative Aptitude', difficulty: 'Medium', type: 'MCQ',
    question: 'The average age of 5 people is 24. If one person leaves, the average of the remaining 4 is 22. What is the age of the person who left?',
    options: ['32', '30', '28', '26'], correctAnswer: 0,
    explanation: 'Total age = 120, remaining total = 88, difference = 32.'
  }
];

// Fallback questions for any domain to ensure we ALWAYS have 15 beautiful questions
export const GENERAL_CAPABILITY_QUESTIONS: Question[] = [
  {
    id: 'gen-1',
    category: 'Systemic Logical Reasoning',
    difficulty: 'Medium',
    type: 'Logical',
    question: 'A critical workflow fails. System A sends data to B, which queues it for C. If B’s buffer limit is 1000 items and B receives 200 items/minute but C only reads 150 items/minute, how long does the team have to resolve the bottleneck before data is dropped?',
    options: [
      '20 minutes',
      '50 minutes',
      '10 minutes',
      '5 minutes'
    ],
    correctAnswer: 0,
    explanation: 'B accumulates 200 - 150 = 50 items per minute. With a 1000-item capacity limit, it takes 1000 / 50 = 20 minutes to completely saturate B’s buffer.'
  },
  {
    id: 'gen-2',
    category: 'Analysis Frameworks',
    difficulty: 'Easy',
    type: 'MCQ',
    question: 'In system diagnostics, what is the core purpose of a "Root Cause Analysis" (RCA) diagram?',
    options: [
      'To systematically trace past failure symptoms down to their primary structural failure source.',
      'To schedule annual payroll increments based on chronological performance review scores.',
      'To render three-dimensional vector graphics for user login modules.',
      'To estimate the exact server RAM requirements using random floating numbers.'
    ],
    correctAnswer: 0,
    explanation: 'RCA is designed to pinpoint the underlying origin of a system failure, rather than simply addressing the visible symptoms.'
  },
  {
    id: 'gen-3',
    category: 'Operational Risk',
    difficulty: 'Medium',
    type: 'Scenario',
    question: 'A diagnostic process requires 99% accuracy. During high-throughput testing, a technician registers a 3% error rate on 200 items. To correct the overall cycle metric, what condition must the next batch meet?',
    options: [
      'The next 400 items must be processed with 100% error-free execution.',
      'The next batch must be run twice as fast to dilute the error timeline.',
      'The technician must immediately switch the testing machine to standby mode.',
      'The system should increase its error budget to 5% without alerting supervisors.'
    ],
    correctAnswer: 0,
    explanation: '200 items * 3% = 6 errors. To get a 1% overall error rate (99% accuracy) on total items, 6 / Total = 0.01 -> Total = 600 items. Hence, we need 400 more items with 0 errors.'
  },
  {
    id: 'gen-4',
    category: 'Information Integrity',
    difficulty: 'Easy',
    type: 'True/False',
    question: 'True or False: Relational constraints, like Foreign Keys, are primarily used to accelerate bulk data exports rather than maintaining referential integrity.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'Foreign keys guarantee logical links between tables, ensuring children rows do not reference non-existent parents, which maintains transactional truth.'
  },
  {
    id: 'gen-5',
    category: 'System Performance',
    difficulty: 'Medium',
    type: 'MCQ',
    question: 'If latency increases by 200% but throughput drops by exactly 50%, what is the immediate relative pressure on the system queue length under steady incoming request rate?',
    options: [
      'The queue length will grow exponentially as items take longer to process and clear slower.',
      'The queue length decreases because throughput has dropped.',
      'The latency increases but is offset entirely by high network speeds.',
      'The request rate automatically drops to zero by server command.'
    ],
    correctAnswer: 0,
    explanation: 'Longer latency (processing duration) combined with lower throughput creates a severe backlog, driving a steep increase in queue backlogs.'
  },
  {
    id: 'gen-6',
    category: 'Critical Thinking',
    difficulty: 'Medium',
    type: 'Logical',
    question: 'A digital capability index matches candidate experience (years) and skill count. If Candidate X has 4 years and 8 verified skills, and Candidate Y has 6 years and 4 verified skills, and the weighting is 0.6 for skills and 0.4 for experience, who has the higher normalized score?',
    options: [
      'Candidate X (Weighted score: 6.4 units vs Y: 4.8 units)',
      'Candidate Y (Weighted score: 5.6 units vs X: 5.2 units)',
      'They score exactly equal due to reciprocal skill-to-experience ratios.',
      'The score cannot be computed without direct integration with Django REST frameworks.'
    ],
    correctAnswer: 0,
    explanation: 'X score = (8 * 0.6) + (4 * 0.4) = 4.8 + 1.6 = 6.4. Y score = (4 * 0.6) + (6 * 0.4) = 2.4 + 2.4 = 4.8. Candidate X has a higher score.'
  },
  {
    id: 'gen-7',
    category: 'Technical Integrity',
    difficulty: 'Hard',
    type: 'Scenario',
    question: 'An enterprise service requires 99.99% availability ("four nines"). What is the maximum allowable cumulative unscheduled downtime across a single calendar year?',
    options: [
      'Approximately 52.6 minutes',
      'Exactly 8.76 hours',
      'Roughly 3.65 days',
      'No downtime is permitted at any time'
    ],
    correctAnswer: 0,
    explanation: 'A year has 525,600 minutes. 99.99% availability means 0.01% downtime allowed, which equals 52.56 minutes of unscheduled outage.'
  },
  {
    id: 'gen-8',
    category: 'Validation States',
    difficulty: 'Easy',
    type: 'True/False',
    question: 'True or False: Ensuring fields undergo strict input length checks on the client side replaces the necessity for validation constraints on the persistent database layer.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'Client-side checks can be bypassed by direct API calls or specialized proxy tools. Database-level constraints are mandatory for true data safety.'
  },
  {
    id: 'gen-9',
    category: 'Analytical Competence',
    difficulty: 'Medium',
    type: 'MCQ',
    question: 'What statistical metric represents the dispersion of candidate test scores relative to the mean, allowing evaluators to see score variance?',
    options: [
      'Standard Deviation',
      'Median Frequency',
      'Geometric Mean',
      'Simple Range Difference'
    ],
    correctAnswer: 0,
    explanation: 'Standard deviation quantifies the amount of variation or dispersion of a set of values from its statistical mean.'
  },
  {
    id: 'gen-10',
    category: 'Operational Logic',
    difficulty: 'Medium',
    type: 'Logical',
    question: 'If "No competent candidate fails the validation check" is true, which of the following statements must mathematically be true?',
    options: [
      'If a candidate fails the validation check, they are not competent.',
      'If a candidate passes the validation check, they are highly competent.',
      'Every candidate who is not competent fails the check.',
      'Passing or failing is purely random regardless of capability level.'
    ],
    correctAnswer: 0,
    explanation: 'The statement is a contrapositive: if A (competence) implies B (no fail), then not-B (fails validation check) implies not-A (not competent).'
  },
  {
    id: 'gen-11',
    category: 'Troubleshooting Systems',
    difficulty: 'Hard',
    type: 'Scenario',
    question: 'When evaluating logs, a series of "429 Too Many Requests" codes suddenly spikes on the auth route. What is the most immediate threat scenario?',
    options: [
      'A brute force or credential stuffing attempt targeting candidate accounts.',
      'The database has exceeded its free-tier storage allocation thresholds.',
      'The user has logged out and tried to access their dashboard without signing in.',
      'The styling files failed to build correctly during the production deploy pass.'
    ],
    correctAnswer: 0,
    explanation: 'HTTP 429 indicates rate-limiting thresholds have been triggered, which commonly points to scripted automated attacks or abuse on authentication resources.'
  },
  {
    id: 'gen-12',
    category: 'System Integration',
    difficulty: 'Easy',
    type: 'MCQ',
    question: 'What format is widely recognized as the industry standard for lightweight, key-value data transmissions between responsive web frontends and microservice backends?',
    options: [
      'JSON (JavaScript Object Notation)',
      'CSV (Comma-Separated Values)',
      'XML (Extensible Markup Language)',
      'Binary Raw Octet Streams'
    ],
    correctAnswer: 0,
    explanation: 'JSON is highly readable, universally parsed by browsers, lightweight, and standard for RESTful and WebSockets architectures.'
  },
  {
    id: 'gen-13',
    category: 'Professional Ethics',
    difficulty: 'Medium',
    type: 'Scenario',
    question: 'During resume scanning, a candidate lists 4 years of skill experience. However, the system verifies that the corresponding technology was only invented 2 years ago. How should the system handle this conflict?',
    options: [
      'Flag the skill block as high-discrepancy and reduce the confidence score of the predicted domain.',
      'Automatically rewrite the date of invention in the system database to prevent conflicts.',
      'Reject the resume and lock the user out from taking any assessments forever.',
      'Instantly pass the candidate to the maximum assessment level to observe their behavior.'
    ],
    correctAnswer: 0,
    explanation: 'Flagging discrepancies while maintaining assessment opportunities preserves data integrity while alerting hiring metrics of potential inaccuracies.'
  },
  {
    id: 'gen-14',
    category: 'Data Lifecycle',
    difficulty: 'Easy',
    type: 'True/False',
    question: 'True or False: To ensure user confidentiality, standard systems should provide clear options to delete uploaded files and associated parsed indices on demand.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'User privacy guidelines require that platforms allow full on-demand removal of uploaded artifacts, resumes, and personal parameters.'
  },
  {
    id: 'gen-15',
    category: 'Strategic Planning',
    difficulty: 'Hard',
    type: 'Scenario',
    question: 'An organization needs to scale its candidate validation pipeline to process 10,000 registrations daily. The current system takes 30 seconds per resume analysis. What is the minimum parallel scale factor required to process all candidates within an 8-hour window?',
    options: [
      'At least 11 concurrent threads or workers',
      'Exactly 2 parallel instances',
      'No parallel workers are required',
      'At least 500 server nodes operating on custom network paths'
    ],
    correctAnswer: 0,
    explanation: 'Total seconds required = 10,000 * 30 seconds = 300,000 seconds. Total seconds available in 8 hours = 8 * 3,600 = 28,800 seconds. Scale factor required = 300,000 / 28,800 = 10.41, meaning a minimum of 11 concurrent worker processes is required.'
  }
];

/**
 * Intelligent question generator helper
 * Given a domain string, custom skills list, and education level, it will
 * compile a custom array of 15 premium questions. It extracts specific domain questions
 * first, and fills up the rest with general capability/reasoning questions to hit exactly 15 questions,
 * then randomizes options to guarantee professional behavior and unique sequences!
 */
export function generateSmartQuestionsForDomain(
  domainId: string,
  customSkills: string[] = [],
  difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium'
): Question[] {
  const domainQuestions = QUESTION_BANK[domainId] || [];
  const finalPool: Question[] = [];
  const addedIds = new Set<string>();

  // 1) Prioritize skill-specific verification questions
  const normalizeKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/(certification|certificate|course|basics|basic|training)/g, '').trim();

  const skillKeys = Object.keys(SKILL_SPECIFIC_QUESTIONS || {});
  customSkills.forEach((skill) => {
    const orig = (skill || '').toString().trim();
    const lookup = orig;
    // Try exact match first
    let matches: string[] = [];
    if (SKILL_SPECIFIC_QUESTIONS[lookup]) matches.push(lookup);
    // Attempt normalized matches
    const norm = normalizeKey(lookup);
    skillKeys.forEach(k => {
      if (normalizeKey(k) === norm) matches.push(k);
    });
    // Also try substring matches (fuzzy)
    if (matches.length === 0) {
      skillKeys.forEach(k => {
        if (k.toLowerCase().includes(orig.toLowerCase()) || orig.toLowerCase().includes(k.toLowerCase())) matches.push(k);
      });
    }

    matches = Array.from(new Set(matches));
    matches.forEach(mk => {
      const skillQuestions = SKILL_SPECIFIC_QUESTIONS[mk] || [];
      skillQuestions.forEach((q) => {
        if (!addedIds.has(q.id)) {
          finalPool.push(q);
          addedIds.add(q.id);
        }
      });
    });
  });

  // 2) Add domain-specific questions next
  domainQuestions.forEach(q => {
    if (!addedIds.has(q.id)) {
      finalPool.push(q);
      addedIds.add(q.id);
    }
  });

  // 3) If still not enough, fill with general capability questions
  const availableGeneral = [...GENERAL_CAPABILITY_QUESTIONS];
  availableGeneral.forEach(q => {
    if (finalPool.length < 15 && !addedIds.has(q.id)) {
      finalPool.push(q);
      addedIds.add(q.id);
    }
  });

  // 4) Difficulty hint can lightly bias selection in future; kept for compatibility
  if (difficulty) {
    // retained for compatibility
  }

  // Shuffle the pool and take the first 15
  const selectedQuestions = [...finalPool].sort(() => 0.5 - Math.random()).slice(0, 15);
  
  // Ensure that options are always valid and we have exactly 15 questions
  // Let's randomize option orders for extra fidelity and adjust correctAnswer pointer!
  return selectedQuestions.map((q) => {
    const originalAnswerOption = q.options[q.correctAnswer];
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    const newCorrectIndex = shuffledOptions.indexOf(originalAnswerOption);
    
    return {
      ...q,
      options: shuffledOptions,
      correctAnswer: newCorrectIndex !== -1 ? newCorrectIndex : q.correctAnswer
    };
  });
}

// 3. Simulated Resume Databases for direct matching based on keyword matching
export const RESUME_KEYWORD_DATABASE = [
  {
    keywords: ['react', 'vue', 'tailwind', 'css', 'javascript', 'frontend', 'html', 'next', 'figma'],
    domainId: 'frontend',
    skills: ['React', 'TypeScript', 'TailwindCSS', 'CSS3', 'Vite', 'Next.js', 'Redux', 'UI/UX Design'],
    experience: '3 Years Developer',
    education: 'B.Sc. in Computer Science',
    projects: 'Dynamic Portfolio Platform, Fintech Dashboard Interface',
    location: 'San Francisco, CA'
  },
  {
    keywords: ['python', 'django', 'node', 'sql', 'postgres', 'backend', 'mongodb', 'api', 'server'],
    domainId: 'backend',
    skills: ['Node.js', 'Python', 'SQL', 'PostgreSQL', 'Express', 'Django', 'MongoDB', 'Redis', 'REST APIs'],
    experience: '4 Years System Engineer',
    education: 'M.Sc. in Software Engineering',
    projects: 'High-Throughput Authentication Gateway, Ledger Database Engine',
    location: 'Austin, TX'
  },
  {
    keywords: ['neurology', 'brain', 'eeg', 'anatomy', 'spine', 'neuro', 'clinic', 'medical'],
    domainId: 'neurology',
    skills: ['Neurology', 'Neuroanatomy', 'EEG Interpretation', 'Brain Scanning', 'Cognitive Testing', 'Patient Care'],
    experience: '5 Years Resident Neurologist',
    education: 'Doctor of Medicine (M.D.)',
    projects: 'Vascular Dementia Diagnostics Study, Neuro-Stimulus Rehabilitation Pathway',
    location: 'Boston, MA'
  },
  {
    keywords: ['cardio', 'heart', 'ecg', 'cardiology', 'pulse', 'arterial'],
    domainId: 'cardiology',
    skills: ['Cardiology', 'ECG Analysis', 'Heart Anatomy', 'Hemodynamics', 'Pharmacology', 'Cardiovascular Diagnostics'],
    experience: '6 Years Cardiology Fellow',
    education: 'Doctor of Medicine (M.D.), FACC',
    projects: 'Arrhythmia Signal Mapping Software, Arterial Stiffness Assessment Protocol',
    location: 'Chicago, IL'
  },
  {
    keywords: ['civil', 'concrete', 'structure', 'autocad', 'soil', 'gis', 'building', 'bridge'],
    domainId: 'civil',
    skills: ['Structural Analysis', 'AutoCAD', 'Concrete Design', 'Soil Mechanics', 'Project Scheduling', 'GIS'],
    experience: '4 Years Structural Engineer',
    education: 'B.Tech in Civil Engineering',
    projects: 'Eco-Bridge Truss Calculation, High-Rise Retaining Wall Design',
    location: 'Seattle, WA'
  },
  {
    keywords: ['robot', 'mechanical', 'gear', 'cad', 'thermo', 'fluid', 'robotics'],
    domainId: 'mechanical',
    skills: ['Thermodynamics', 'CAD Modeling', 'Kinematics', 'Finite Element Analysis', 'Fluid Mechanics', 'Robotics Systems'],
    experience: '3 Years Robotics Developer',
    education: 'B.S. in Mechanical Engineering',
    projects: 'Multi-Axis Assembly Arm, Thermal Management Plate Assembly',
    location: 'Denver, CO'
  },
  {
    keywords: ['marketing', 'seo', 'campaign', 'analytics', 'content', 'advert', 'ads', 'google'],
    domainId: 'marketing',
    skills: ['Digital Marketing', 'SEO Optimizer', 'Content Strategy', 'Google Analytics', 'A/B Testing', 'Copywriting'],
    experience: '3 Years Growth Marketer',
    education: 'B.A. in Communications',
    projects: 'Organic Authority Scale Program (+240% traffic), SaaS Lead Generation Funnel',
    location: 'New York, NY'
  },
  {
    keywords: ['law', 'legal', 'contract', 'counsel', 'corporate', 'patent', 'litigation'],
    domainId: 'law',
    skills: ['Contract Drafting', 'Legal Research', 'Litigation Support', 'Intellectual Property', 'Corporate Governance'],
    experience: '5 Years Corporate Counsel',
    education: 'Juris Doctor (J.D.)',
    projects: 'SaaS Multi-Tenant licensing frame, IP Patent filings defense strategy',
    location: 'Washington, D.C.'
  },
  {
    keywords: ['seo', 'google ads', 'social media', 'content strategy', 'digital marketing', 'keyword research', 'search engine', 'analytics', 'ppc', 'sem'],
    domainId: 'marketing',
    skills: ['Digital Marketing', 'SEO Optimizer', 'Content Strategy', 'Google Analytics', 'Google Ads', 'Social Media Marketing', 'PPC', 'SEM'],
    experience: '3 Years Digital Marketing Specialist',
    education: 'B.A. in Marketing',
    projects: 'SEO Optimization Campaign, Social Media Growth Strategy',
    location: 'Remote'
  },
  {
    keywords: ['hr', 'human resources', 'talent acquisition', 'recruitment', 'hiring', 'employee relations', 'onboarding', 'benefits', 'compensation', 'performance management'],
    domainId: 'hr',
    skills: ['Talent Sourcing', 'Employee Relations', 'Compliance', 'Performance Review', 'Interview Design'],
    experience: '4 Years HR Generalist',
    education: 'B.A. in Human Resources',
    projects: 'Employee Retention Program, Interview Process Optimization',
    location: 'Chicago, IL'
  },
  {
    keywords: ['finance', 'financial analysis', 'budgeting', 'financial modeling', 'investment', 'portfolio', 'risk assessment', 'valuation', 'accounting', 'financial planning'],
    domainId: 'finance',
    skills: ['Financial Analysis', 'Excel Modeling', 'Asset Valuation', 'Risk Assessment', 'Financial Planning'],
    experience: '5 Years Financial Analyst',
    education: 'B.S. in Finance',
    projects: 'Budget Forecasting Model, Investment Portfolio Analysis',
    location: 'New York, NY'
  },
  {
    keywords: ['cybersecurity', 'security', 'network security', 'penetration testing', 'cissp', 'cryptography', 'firewall', 'incident response', 'vulnerability', 'threat'],
    domainId: 'cybersecurity',
    skills: ['Network Security', 'Penetration Testing', 'Cryptography', 'IAM', 'SIEM Tools', 'Incident Response'],
    experience: '4 Years Security Analyst',
    education: 'B.S. in Cybersecurity',
    projects: 'Vulnerability Assessment, Security Framework Implementation',
    location: 'Remote'
  },
  {
    keywords: ['data science', 'machine learning', 'python', 'pandas', 'numpy', 'scikit', 'tensorflow', 'pytorch', 'statistics', 'data analysis'],
    domainId: 'datascience',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Statistical Analysis', 'Data Visualization'],
    experience: '3 Years Data Scientist',
    education: 'M.S. in Data Science',
    projects: 'Customer Churn Prediction, Recommendation System',
    location: 'San Francisco, CA'
  },
  {
    keywords: ['sales', 'business development', 'lead generation', 'crm', 'negotiation', 'pipeline', 'account management', 'revenue'],
    domainId: 'sales',
    skills: ['Lead Generation', 'CRM', 'Negotiation', 'Pipeline Management', 'Closing Deals'],
    experience: '5 Years Sales Representative',
    education: 'B.A. in Business',
    projects: 'Sales Process Optimization, Client Relationship Management',
    location: 'Austin, TX'
  },
  {
    keywords: ['testing', 'qa', 'quality assurance', 'automation', 'selenium', 'test cases', 'bug tracking', 'manual testing'],
    domainId: 'qa',
    skills: ['Test Automation', 'Selenium', 'Unit Testing', 'Integration Testing', 'TDD'],
    experience: '3 Years QA Engineer',
    education: 'B.S. in Computer Science',
    projects: 'Automated Test Suite, Quality Process Improvement',
    location: 'Remote'
  }
];

// Fallback metadata for default parses
export const FALLBACK_RESUME_INFO = {
  candidateName: 'Alex Carter',
  skills: ['Python', 'SQL', 'React', 'TypeScript', 'Project Management', 'Data Visualization'],
  experience: '3 Years General Analyst',
  education: 'B.S. in Quantitative Science',
  projects: 'Automated Operations Pipeline, Integrated User Feedback Tracker',
  location: 'Atlanta, GA',
  mappedDomain: 'Full Stack Development',
  summary: 'Detail-oriented technical professional with key accomplishments in automated parsing workflows, structural code optimization, and analytics-driven platform design.'
};

// Derive a domain id from a set of seed tokens with improved matching
export function deriveDomainFromSeeds(seeds: string[], currentDomainId?: string, switchThreshold = 2): string {
  if (!seeds || seeds.length === 0) return currentDomainId || 'fullstack';
  
  // Normalize seeds more carefully to preserve intent
  const normalizeSeed = (s: string) => {
    return (s || '').toString()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special chars
      .replace(/\b(certification|certificate|certified|course|basics|basic|training)\b/g, '') // Remove noise words
      .trim();
  };

  const normalized = seeds.map(normalizeSeed).filter(Boolean);
  const scoreByDomain: Record<string, number> = {};
  DOMAINS.forEach(d => scoreByDomain[d.id] = 0);

  // Domain-specific keyword boosts for non-IT domains
  const domainKeywordBoosts: Record<string, string[]> = {
    marketing: ['seo', 'google ads', 'social media', 'content strategy', 'ppc', 'sem', 'analytics', 'campaign', 'advertising', 'brand'],
    hr: ['talent acquisition', 'recruitment', 'employee relations', 'performance management', 'onboarding', 'benefits', 'compensation', 'hiring'],
    finance: ['financial analysis', 'financial modeling', 'investment', 'portfolio', 'valuation', 'budgeting', 'risk assessment', 'financial planning'],
    cybersecurity: ['penetration testing', 'cissp', 'incident response', 'vulnerability', 'threat', 'infosec', 'compliance'],
    datascience: ['machine learning', 'deep learning', 'neural networks', 'predictive modeling', 'statistics'],
    sales: ['lead generation', 'business development', 'account management', 'revenue', 'pipeline'],
    qa: ['test automation', 'manual testing', 'quality assurance', 'bug tracking'],
    product: ['roadmapping', 'user research', 'product strategy'],
    ml: ['neural networks', 'deep learning', 'nlp', 'computer vision']
  };

  // Score each domain based on skill matches
  normalized.forEach(token => {
    if (!token) return;
    
    DOMAINS.forEach(domain => {
      // Skill-level matches (most important)
      domain.skills.forEach(sk => {
        const skNorm = sk.toLowerCase().replace(/[^a-z0-9]/g, '');
        const tokenWords = token.split(/\s+/);
        const skillWords = skNorm.split(/\s+/);
        
        // Exact match (highest priority)
        if (token === skNorm) {
          scoreByDomain[domain.id] += 4;
        }
        // Word-level substring match
        else if (token.includes(skNorm) || skNorm.includes(token)) {
          scoreByDomain[domain.id] += 3;
        }
        // Partial word matches
        else if (skillWords.some(sw => tokenWords.some(tw => tw === sw))) {
          scoreByDomain[domain.id] += 2;
        }
      });
      
      // Domain name matches (secondary)
      const domainNameNorm = domain.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (token.includes(domainNameNorm) || domainNameNorm.includes(token)) {
        scoreByDomain[domain.id] += 1;
      }
    });

    // Additional boost for domain-specific keywords
    Object.entries(domainKeywordBoosts).forEach(([domId, keywords]) => {
      keywords.forEach(kw => {
        if (token.includes(kw) || kw.includes(token)) {
          scoreByDomain[domId] += 2;
        }
      });
    });
  });

  // Find the best matching domain
  const sorted = Object.entries(scoreByDomain)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, score]) => score > 0);

  if (sorted.length === 0) return currentDomainId || 'fullstack';

  const [bestDomain, bestScore] = sorted[0];
  const currentScore = currentDomainId && scoreByDomain[currentDomainId] ? scoreByDomain[currentDomainId] : 0;

  // Only switch domains if significantly better
  if (bestDomain !== currentDomainId && (bestScore - currentScore) < switchThreshold) {
    return currentDomainId || bestDomain;
  }

  return bestDomain;
}
