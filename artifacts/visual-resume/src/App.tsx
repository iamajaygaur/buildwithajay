import { useMemo, useState, type FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CircleHelp,
  Download,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Radio,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

type Project = {
  id: string;
  index: string;
  title: string;
  type: string;
  summary: string;
  outcome: string;
  tags: string[];
  accent: string;
  detail: string;
  role: string;
  method: string;
};

const projects: Project[] = [
  {
    id: 'aws-ecs',
    index: '01',
    title: 'Scalable Node.js App on AWS ECS/Fargate',
    type: 'Cloud deployment · Infrastructure',
    summary: 'Containerized a Node.js application and automated the path from infrastructure changes to release.',
    outcome: '40% faster provisioning',
    tags: ['AWS ECS/Fargate', 'Terraform', 'GitHub Actions'],
    accent: 'blue',
    detail: 'Architected a containerized deployment with Terraform, reducing infrastructure provisioning time by 40%. Implemented automated CI/CD through GitHub Actions to accelerate release cycles.',
    role: 'Cloud and DevOps engineer',
    method: 'Containerization → infrastructure as code → automated delivery',
  },
  {
    id: 'healthcare-cicd',
    index: '02',
    title: 'Healthcare Application CI/CD Deployment',
    type: 'Release engineering · Observability',
    summary: 'Designed an end-to-end delivery pipeline with automated testing and real-time monitoring.',
    outcome: 'Validated release confidence',
    tags: ['Prometheus', 'Grafana', 'automated testing'],
    accent: 'coral',
    detail: 'Designed an end-to-end CI/CD pipeline with automated testing and real-time monitoring. Enforced correctness through Prometheus and Grafana alerting plus simulation-based validation.',
    role: 'CI/CD and reliability engineer',
    method: 'Pipeline design → test automation → monitoring and validation',
  },
  {
    id: 'zomato-microservices',
    index: '03',
    title: 'Containerized Zomato Clone',
    type: 'Microservices · Secure delivery',
    summary: 'Embedded quality and dependency scanning into a containerized service workflow.',
    outcome: '25% fewer vulnerabilities',
    tags: ['SonarQube', 'OWASP scanning', 'CI/CD'],
    accent: 'yellow',
    detail: 'Automated CI/CD pipelines by embedding SonarQube and OWASP dependency scanning. Collaborated with stakeholders to curtail security vulnerabilities by 25% and present improved code quality standards.',
    role: 'DevOps and platform engineer',
    method: 'Service containerization → security scanning → release automation',
  },
  {
    id: 'waste-iot',
    index: '04',
    title: 'Waste Management System using IoT',
    type: 'IoT application · Real-time systems',
    summary: 'Connected monitoring and automated alerts to reduce overflow and improve operational response.',
    outcome: '20% cost reduction',
    tags: ['IoT', 'real-time monitoring', 'automated alerts'],
    accent: 'blue',
    detail: 'Constructed an IoT-enabled waste management system with real-time monitoring and automated disposal alerts, mitigating overflow and supporting a scalable smart-city initiative with a 20% operational cost reduction.',
    role: 'Software engineer',
    method: 'Sensor signals → real-time monitoring → automated response',
  },
  {
    id: 'xray-vr',
    index: '05',
    title: '3D Modeling of X-Ray Images using VR',
    type: 'Computer vision · Virtual reality',
    summary: 'Turned X-ray data into a 3D knee-bone model for an immersive clinical workflow.',
    outcome: 'Refined diagnostic precision',
    tags: ['Canny edge detection', 'VR', '3D modeling'],
    accent: 'coral',
    detail: 'Constructed a 3D model of knee bones from X-rays using Canny edge detection and integrated VR technology, augmenting bone implantation accuracy and refining diagnostic precision over CT scans.',
    role: 'Computer vision developer',
    method: 'Image processing → 3D reconstruction → VR integration',
  },
];

const sourceFacts = [
  'Target role: Software Engineer',
  'Published proof: the attached resume and the five projects summarized on this page',
  'Approved public contact: iamajaygaurx@gmail.com',
  'Not published: phone number, street address, or unapproved social links',
];

const starterQuestions = [
  'What role is Ajay targeting?',
  'What are Ajay’s strongest proof points?',
  'What changed in the AWS project?',
  'Where has Ajay improved delivery?',
];

function downloadResume() {
  const content = `AJAY GAUR\nSoftware Engineer\nDenver, Colorado, United States | iamajaygaurx@gmail.com\n\nPROFESSIONAL SUMMARY\nSoftware Engineer and M.S. Computer Science student at CU Denver with experience in Python development, automation, statistical algorithms, and CI/CD practices. Skilled in building modular applications, test-driven development, and cloud-native delivery.\n\nPROOF\n01 Python automation at scale — supported 10,000+ enterprise users and cut incident resolution time by 60%.\n02 Reliable cloud delivery — built CI/CD and infrastructure automation that reduced provisioning time from hours to minutes across 50+ deployments.\n03 Full-stack systems ownership — built an equipment rental application with real-time inventory, approval workflows, and email notifications while leading a judging platform for the Senior Design Capstone Expo.\n\nSELECTED PROJECTS\n01 Scalable Node.js App on AWS ECS/Fargate — Terraform reduced provisioning time by 40%; GitHub Actions automated CI/CD.\n02 Healthcare Application CI/CD Deployment — automated testing, real-time monitoring, Prometheus/Grafana alerting, and simulation-based validation.\n03 Containerized Zomato Clone — SonarQube and OWASP scanning helped curtail security vulnerabilities by 25%.\n04 Waste Management System using IoT — real-time monitoring and automated alerts supported a 20% operational cost reduction.\n05 3D Modeling of X-Ray Images using VR — Canny edge detection and VR refined diagnostic precision over CT scans.\n\nEXPERIENCE\nCU Denver Graduate Research Assistant; CU Denver Student Assistant II; Concentrix Technical IT Support Engineer; Thinking Hut IT Solutions DevOps Trainee; Elite Softwares Django Developer Intern.\n\nEDUCATION\nM.S. Computer Science, University of Colorado Denver, Aug 2025–May 2027.\nB.E. Computer Engineering, RMD Sinhgad School of Engineering, Jun 2020–Jul 2023.\n\nThis public download intentionally excludes phone number, street address, and unapproved social links.\n`;
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'ajay-gaur-public-resume.txt';
  anchor.click();
  URL.revokeObjectURL(url);
}

function Nav({ onOpenChat }: { onOpenChat: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);
  return (
    <header className="nav-shell sticky top-0 z-40 border-b border-[rgba(24,31,56,.12)]">
      <div className="wrap flex h-[70px] items-center justify-between">
        <a href="#top" onClick={close} className="flex items-center gap-3" data-testid="link-home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2447f7] text-[#f7f1e7] display text-lg font-semibold">A</span>
          <span className="hidden text-sm font-extrabold tracking-[-.03em] sm:block">Ajay Gaur<span className="text-[#ff674d]">.</span></span>
        </a>
        <nav className={`nav-links ${mobileOpen ? 'open' : ''} flex items-center gap-7 text-[11px] font-bold uppercase tracking-[.12em]`} aria-label="Main navigation">
          <a href="#proof" onClick={close} className="nav-link" data-testid="link-proof">Proof</a>
          <a href="#work" onClick={close} className="nav-link" data-testid="link-work">Selected work</a>
          <a href="#guardrails" onClick={close} className="nav-link" data-testid="link-guardrails">Sources</a>
          <button onClick={() => { close(); onOpenChat(); }} className="nav-link text-left" data-testid="button-nav-ambassador">Ask the ambassador</button>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={downloadResume} className="btn-primary hidden items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[.08em] sm:flex" data-testid="button-download-resume">
            <Download size={14} /> Resume
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full p-2 sm:hidden" aria-label="Toggle navigation" data-testid="button-toggle-navigation">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section id="top" className="wrap grid min-h-[680px] items-center gap-14 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
      <div className="reveal">
        <div className="mb-7 flex flex-wrap items-center gap-3">
          <span className="eyebrow rounded-full border border-[#2447f7] px-3 py-2 text-[#2447f7]">Software Engineer</span>
          <span className="mono text-[10px] tracking-[.08em] text-[rgba(24,31,56,.55)]">Evidence-led profile</span>
        </div>
        <h1 className="display max-w-[750px] text-[clamp(4rem,9.2vw,8.3rem)] font-semibold leading-[.86] tracking-[-.075em]">
          Build the<br /><span className="text-[#2447f7]">reliable</span> path<br /><span className="relative inline-block">forward<span className="absolute -right-7 -top-3 h-3 w-3 rounded-full bg-[#ff674d] pulse-dot" /></span>.
        </h1>
        <p className="mt-9 max-w-[560px] text-lg leading-8 text-[rgba(24,31,56,.7)]">
          Ajay Gaur is a <strong className="text-[#181f38]">Software Engineer</strong> and M.S. Computer Science student focused on Python automation, cloud-native delivery, and modular systems that scale.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#work" className="btn-primary inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-sm font-extrabold" data-testid="link-see-work">See selected work <ArrowDownToLine size={17} /></a>
          <button onClick={onOpenChat} className="btn-quiet inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-sm font-bold" data-testid="button-hero-chat"><MessageCircle size={17} /> Ask a bounded question</button>
        </div>
        <div className="mt-11 flex items-center gap-5 text-[11px] text-[rgba(24,31,56,.58)]">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#ff674d]" /> Public facts only</span>
          <span className="hidden h-4 w-px bg-[rgba(24,31,56,.18)] sm:block" />
          <span className="flex items-center gap-2"><MapPin size={13} /> Denver, Colorado</span>
        </div>
      </div>
      <div className="reveal delay-2 relative mx-auto w-full max-w-[530px]">
        <div className="relative aspect-square rotate-[3deg] rounded-[34px] bg-[#2447f7] p-4 shadow-[0_28px_70px_rgba(36,71,247,.22)]">
          <div className="absolute inset-4 overflow-hidden rounded-[25px] border border-[rgba(247,241,231,.35)]">
            <div className="absolute -right-14 -top-14 h-56 w-56 rounded-full border-[22px] border-[#ff674d]" />
            <div className="absolute -bottom-16 -left-12 h-56 w-56 rounded-full border-[32px] border-[#f8d67b]" />
            <div className="absolute left-[13%] top-[17%] h-[58%] w-[48%] rounded-[45%_55%_48%_52%] bg-[#f7f1e7] hero-orbit" />
            <div className="absolute left-[28%] top-[29%] h-20 w-20 rounded-full bg-[#ff674d]" />
            <div className="absolute left-[34%] top-[35%] h-8 w-8 rounded-full bg-[#181f38]" />
            <div className="absolute bottom-[17%] left-[16%] right-[15%] flex items-end justify-between">
              <div className="mono text-[10px] uppercase tracking-[.18em] text-[#f7f1e7]">Software / cloud</div>
              <div className="display text-6xl font-semibold leading-none text-[#f8d67b]">AG</div>
            </div>
            <div className="absolute right-[13%] top-[22%] writing-vertical mono text-[9px] uppercase tracking-[.2em] text-[#f7f1e7]">Ship with confidence</div>
          </div>
        </div>
        <div className="absolute -bottom-6 -left-5 rounded-2xl border border-[rgba(24,31,56,.14)] bg-[#f8d67b] px-4 py-3 shadow-[0_14px_34px_rgba(24,31,56,.12)]">
          <div className="eyebrow mb-1 text-[rgba(24,31,56,.58)]">Current signal</div>
          <div className="text-sm font-extrabold">Reliable delivery is a feature.</div>
        </div>
        <div className="absolute -right-3 top-8 hidden rounded-full bg-[#ff674d] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#181f38] md:block">Open to good problems</div>
      </div>
    </section>
  );
}

function ProofSection() {
  const points = [
    { number: '01', title: 'Python automation at scale', body: 'Supported 10,000+ enterprise users, cutting incident resolution time by 60% and manual intervention by 70% across 15+ rollouts.', accent: 'blue' },
    { number: '02', title: 'Reliable cloud delivery', body: 'Built CI/CD, Terraform, and Ansible workflows that cut environment errors by 25% and moved provisioning from hours to minutes across 50+ deployments.', accent: 'coral' },
    { number: '03', title: 'Full-stack systems ownership', body: 'Built an equipment rental platform with real-time inventory, approval workflows, and email notifications while leading a judging platform for the Senior Design Capstone Expo.', accent: 'yellow' },
  ];
  return (
    <section id="proof" className="border-y border-[rgba(24,31,56,.13)] bg-[#efe8dc]">
      <div className="wrap py-16 lg:py-24">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-[#2447f7]">01 / Proof in three beats</p>
            <h2 className="display max-w-[550px] text-5xl font-semibold leading-[.95] tracking-[-.055em] md:text-7xl">The short version<br />worth remembering.</h2>
          </div>
          <p className="max-w-[260px] text-sm leading-6 text-[rgba(24,31,56,.62)]">Three evidence-backed reasons to remember Ajay when a software team needs reliable systems and measurable delivery.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {points.map((point) => (
            <article key={point.number} className={`proof-card min-h-[255px] rounded-[22px] border border-[rgba(24,31,56,.13)] p-6 ${point.accent === 'blue' ? 'bg-[#2447f7] text-[#f7f1e7]' : point.accent === 'coral' ? 'bg-[#ff674d]' : 'bg-[#f8d67b]'}`} data-testid={`card-proof-${point.number}`}>
              <div className="flex items-start justify-between"><span className="mono text-xs opacity-65">{point.number}</span><ArrowUpRight size={18} /></div>
              <h3 className="display mt-16 text-3xl font-semibold leading-[.95] tracking-[-.04em]">{point.title}</h3>
              <p className="mt-4 max-w-[270px] text-sm leading-6 opacity-75">{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <section id="work" className="wrap py-20 lg:py-28">
      <div className="mb-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div><p className="eyebrow mb-4 text-[#ff674d]">02 / Selected work</p><h2 className="display text-5xl font-semibold leading-[.93] tracking-[-.055em] md:text-7xl">Relevance,<br /><span className="text-[#2447f7]">not volume.</span></h2></div>
        <div className="flex justify-between gap-6 lg:pb-2"><p className="max-w-[385px] text-base leading-7 text-[rgba(24,31,56,.68)]">Five projects ordered for a recruiter scanning for cloud delivery, automation, security, and practical software systems.</p><span className="mono hidden text-[10px] uppercase tracking-[.15em] text-[rgba(24,31,56,.45)] sm:block">Scroll / click a case</span></div>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <button key={project.id} onClick={() => onSelect(project)} className="project-card group grid w-full gap-6 rounded-[24px] border border-[rgba(24,31,56,.16)] bg-[#f7f1e7] p-6 text-left md:grid-cols-[90px_1fr_240px_44px] md:items-center md:p-8" data-testid={`button-project-${project.id}`}>
            <span className={`mono text-xs ${project.accent === 'blue' ? 'text-[#2447f7]' : project.accent === 'coral' ? 'text-[#ff674d]' : 'text-[#9b7412]'}`}>{project.index}</span>
            <div><div className="eyebrow mb-2 text-[rgba(24,31,56,.5)]">{project.type}</div><h3 className="display text-3xl font-semibold tracking-[-.04em] md:text-4xl">{project.title}</h3><p className="mt-2 max-w-[500px] text-sm leading-6 text-[rgba(24,31,56,.64)]">{project.summary}</p></div>
            <div className="md:border-l md:border-[rgba(24,31,56,.15)] md:pl-7"><div className="eyebrow mb-2 text-[rgba(24,31,56,.5)]">Signal</div><p className="text-sm font-extrabold">{project.outcome}</p><div className="mt-3 flex flex-wrap gap-1.5">{project.tags.map(tag => <span key={tag} className="rounded-full bg-[#efe8dc] px-2 py-1 text-[10px] text-[rgba(24,31,56,.65)]">{tag}</span>)}</div></div>
            <span className="project-arrow flex h-10 w-10 items-center justify-center rounded-full bg-[#2447f7] text-[#f7f1e7]"><ArrowUpRight size={18} /></span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const experience = [
    { company: 'CU Denver · College of Engineering, Design, and Computing', role: 'Graduate Research Assistant', dates: 'May 2026 — present', detail: 'Built a full-stack equipment rental application with real-time inventory, automated admin approval workflows, and email notifications. Now leading development of a judging platform for the Senior Design Capstone Expo and its reporting capabilities.' },
    { company: 'CU Denver · College of Engineering, Design, and Computing', role: 'Student Assistant II', dates: 'Oct 2025 — present', detail: 'Architected Python and DevOps automation for 10+ faculty research labs, improving operational efficiency by 25%. Delivered 5+ research-oriented software projects and documentation that reduced onboarding time by 30%.' },
    { company: 'Concentrix', role: 'Technical IT Support Engineer', dates: 'Feb 2025 — Jul 2025', detail: 'Built Python and Bash/PowerShell automation for 10,000+ enterprise users, reducing incident resolution time by 60%. Validated deployment scripts and cut manual intervention by 70% across 15+ production rollouts.' },
    { company: 'Thinking Hut IT Solutions', role: 'DevOps Trainee', dates: 'Sep 2023 — Oct 2024', detail: 'Built Jenkins and GitHub Actions pipelines with regression and integration tests, cutting environment errors by 25%. Authored modular Ansible and Terraform configurations that reduced provisioning from hours to minutes across 50+ deployments.' },
    { company: 'Elite Softwares', role: 'Django Developer Intern', dates: 'Apr 2023 — Sep 2023', detail: 'Programmed 12+ Python Django features using MVC architecture and generated 8+ modular Python components, reducing system bugs by 40% and advancing maintainability by 20%.' },
  ];
  const skills = [
    ['Languages', 'Python · R · Java · C/C++ · JavaScript · Bash · SQL'],
    ['Frameworks', 'Django · Spring Boot · React · NumPy · Pandas'],
    ['Data', 'PostgreSQL · MySQL · MongoDB'],
    ['Cloud & DevOps', 'AWS · Docker · Kubernetes · Terraform · Ansible · Jenkins · GitHub Actions · CI'],
  ];
  return (
    <section id="experience" className="border-y border-[rgba(24,31,56,.13)] bg-[#efe8dc]">
      <div className="wrap py-20 lg:py-28">
        <div className="mb-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="eyebrow mb-4 text-[#2447f7]">03 / Experience & toolkit</p><h2 className="display text-5xl font-semibold leading-[.93] tracking-[-.055em] md:text-7xl">Systems built<br /><span className="text-[#ff674d]">in the real world.</span></h2></div>
          <p className="max-w-[385px] text-base leading-7 text-[rgba(24,31,56,.68)]">A concise view of the teams, systems, and technologies behind the project evidence.</p>
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.25fr_.75fr]">
          <div className="space-y-7">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="border-t border-[rgba(24,31,56,.18)] pt-5">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start"><div><h3 className="text-lg font-extrabold">{item.role}</h3><p className="mt-1 text-sm text-[rgba(24,31,56,.6)]">{item.company}</p></div><span className="mono text-[10px] uppercase tracking-[.1em] text-[rgba(24,31,56,.52)]">{item.dates}</span></div>
                <p className="mt-4 max-w-[660px] text-sm leading-6 text-[rgba(24,31,56,.7)]">{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="space-y-5">
            <div className="rounded-[22px] bg-[#f7f1e7] p-6 md:p-7"><p className="eyebrow mb-5 text-[#ff674d]">Core toolkit</p><div className="space-y-5">{skills.map(([label, value]) => <div key={label}><p className="text-xs font-extrabold uppercase tracking-[.08em]">{label}</p><p className="mt-2 text-sm leading-6 text-[rgba(24,31,56,.65)]">{value}</p></div>)}</div></div>
            <div className="rounded-[22px] bg-[#f8d67b] p-6 md:p-7"><p className="eyebrow mb-5 text-[#9b7412]">Education</p><h3 className="font-extrabold">M.S. Computer Science</h3><p className="mt-1 text-sm text-[rgba(24,31,56,.7)]">University of Colorado Denver · Aug 2025 — May 2027</p><h3 className="mt-5 font-extrabold">B.E. Computer Engineering</h3><p className="mt-1 text-sm text-[rgba(24,31,56,.7)]">RMD Sinhgad School of Engineering · Jun 2020 — Jul 2023</p></div>
            <div className="rounded-[22px] bg-[#2447f7] p-6 text-[#f7f1e7] md:p-7"><p className="eyebrow mb-5 text-[#f8d67b]">Certifications</p><p className="text-sm leading-7 text-[#f7f1e7]/80">Microsoft Azure Fundamentals · AWS Cloud Foundation · NDG Linux Essentials · Programming Essentials in C++ and Python</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Guardrails() {
  return (
    <section id="guardrails" className="bg-[#181f38] text-[#f7f1e7]">
      <div className="wrap grid gap-14 py-20 lg:grid-cols-[.8fr_1.2fr] lg:py-28">
          <div><p className="eyebrow mb-4 text-[#f8d67b]">04 / Trust layer</p><h2 className="display max-w-[440px] text-5xl font-semibold leading-[.94] tracking-[-.055em] md:text-7xl">The source<br />is the story.</h2><p className="mt-7 max-w-[360px] text-sm leading-6 text-[#f7f1e7]/65">This experience is designed to be legible about what is published, what is private, and what the ambassador is allowed to say.</p></div>
        <div className="space-y-4">
          <div className="rounded-[22px] border border-[#f7f1e7]/20 p-6 md:p-8"><div className="mb-7 flex items-center gap-3"><ShieldCheck className="text-[#f8d67b]" size={22} /><h3 className="text-lg font-extrabold">Approved sources only</h3></div><div className="space-y-4">{sourceFacts.map((fact, index) => <div key={fact} className="flex gap-4 border-t border-[#f7f1e7]/15 pt-4 text-sm leading-6 text-[#f7f1e7]/72"><span className="mono text-xs text-[#ff674d]">0{index + 1}</span><span>{fact}</span></div>)}</div></div>
          <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[22px] bg-[#2447f7] p-6"><LockKeyhole size={20} /><h3 className="mt-10 font-extrabold">Private by default</h3><p className="mt-2 text-sm leading-6 text-[#f7f1e7]/70">No hidden profile, inbox, or unapproved context is exposed.</p></div><div className="rounded-[22px] bg-[#ff674d] p-6 text-[#181f38]"><CircleHelp size={20} /><h3 className="mt-10 font-extrabold">Honest when unsure</h3><p className="mt-2 text-sm leading-6 text-[#181f38]/70">The assistant says when a question falls outside the published record.</p></div></div>
        </div>
      </div>
    </section>
  );
}

function Ambassador({ onClose }: { onClose?: () => void }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'I can answer questions about Ajay’s published resume, proof points, projects, experience, and education. I will say when a question is outside those verified sources.' }]);
  const answerFor = (question: string) => {
    const normalized = question.toLowerCase();
    if (normalized.includes('salary') || normalized.includes('relocat') || normalized.includes('phone') || normalized.includes('address') || normalized.includes('system prompt') || normalized.includes('ignore your')) return 'I don’t have verified information about that. I only use the public facts published on this page.';
    if (normalized.includes('role') || normalized.includes('target')) return 'The published target role is Software Engineer, with evidence across Python automation, cloud-native delivery, CI/CD, and modular application development.';
    if (normalized.includes('proof') || normalized.includes('strength')) return 'The three proof points are Python automation at scale, reliable cloud delivery, and full-stack systems ownership. The page links each one to resume-backed evidence.';
    if (normalized.includes('aws') || normalized.includes('ecs') || normalized.includes('fargate')) return 'In the Scalable Node.js App on AWS ECS/Fargate project, Ajay used Terraform and GitHub Actions to automate containerized delivery and reduce infrastructure provisioning time by 40%.';
    if (normalized.includes('project') || normalized.includes('work')) return 'The published projects are Scalable Node.js App on AWS ECS/Fargate, Healthcare Application CI/CD Deployment, Containerized Zomato Clone, Waste Management System using IoT, and 3D Modeling of X-Ray Images using VR.';
    if (normalized.includes('experience') || normalized.includes('lead') || normalized.includes('where')) return 'Ajay’s published experience includes CU Denver research and lab operations, Concentrix technical IT support, Thinking Hut DevOps, and Elite Softwares Django development. The resume also notes current leadership of a Senior Design Capstone Expo judging platform.';
    if (normalized.includes('skill') || normalized.includes('technology') || normalized.includes('stack')) return 'Published skills include Python, Java, C/C++, JavaScript, Bash, SQL, Django, Spring Boot, React, PostgreSQL, MySQL, MongoDB, AWS, Docker, Kubernetes, Terraform, Ansible, Jenkins, and GitHub Actions.';
    if (normalized.includes('source') || normalized.includes('private')) return 'I only use the attached resume and facts published on this page. Phone number, street address, and unapproved social links are intentionally excluded.';
    return 'I don’t have verified information about that. Try asking about the target role, proof points, projects, experience, skills, or source guardrails.';
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const clean = input.trim();
    if (!clean) return;
    setMessages(current => [...current, { role: 'user', text: clean }, { role: 'assistant', text: answerFor(clean) }]);
    setInput('');
  };
  return (
    <section id="ambassador" className="bg-[#f8d67b]">
      <div className="wrap grid gap-12 py-20 lg:grid-cols-[.8fr_1.2fr] lg:py-28">
        <div><p className="eyebrow mb-4 text-[#2447f7]">04 / Virtual ambassador</p><h2 className="display max-w-[430px] text-5xl font-semibold leading-[.94] tracking-[-.055em] md:text-7xl">Ask the page.<br /><span className="text-[#2447f7]">Not the void.</span></h2><p className="mt-7 max-w-[350px] text-sm leading-6 text-[rgba(24,31,56,.68)]">A deliberately narrow conversation layer for recruiter-speed questions. It will not invent a career, fill in a gap, or pretend to know what is not published.</p><div className="mt-8 flex items-center gap-3 text-xs font-bold"><span className="pulse-dot h-2.5 w-2.5 rounded-full bg-[#2447f7]" /> Source-bounded and ready</div></div>
        <div className="overflow-hidden rounded-[26px] border border-[rgba(24,31,56,.18)] bg-[#f7f1e7] shadow-[0_18px_55px_rgba(24,31,56,.12)]">
          <div className="flex items-center justify-between border-b border-[rgba(24,31,56,.14)] px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2447f7] text-[#f7f1e7]"><Bot size={17} /></span><div><div className="text-sm font-extrabold">Ajay's ambassador</div><div className="mono text-[9px] uppercase tracking-[.12em] text-[rgba(24,31,56,.5)]">Published facts only</div></div></div>{onClose && <button onClick={onClose} className="rounded-full p-2 hover:bg-[#efe8dc]" aria-label="Close ambassador" data-testid="button-close-ambassador"><X size={17} /></button>}</div>
          <div className="chat-scroll flex h-[300px] flex-col gap-3 overflow-y-auto p-5">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`chat-bubble max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'assistant' ? 'self-start rounded-tl-sm bg-[#efe8dc]' : 'self-end rounded-tr-sm bg-[#2447f7] text-[#f7f1e7]'}`} data-testid={`text-chat-message-${index}`}>{message.text}</div>)}</div>
          <div className="border-t border-[rgba(24,31,56,.14)] p-4"><div className="mb-3 flex flex-wrap gap-2">{starterQuestions.map(question => <button key={question} onClick={() => { setInput(question); }} className="rounded-full border border-[rgba(24,31,56,.18)] px-3 py-1.5 text-[10px] font-bold hover:border-[#2447f7]" data-testid={`button-starter-${question.slice(0, 8).replaceAll(' ', '-')}`}>{question}</button>)}</div><form onSubmit={submit} className="flex gap-2"><input value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about the published profile…" className="min-w-0 flex-1 rounded-full border border-[rgba(24,31,56,.2)] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[rgba(24,31,56,.42)] focus:border-[#2447f7]" aria-label="Ask the ambassador" data-testid="input-ambassador-question" /><button className="btn-ink flex h-11 w-11 shrink-0 items-center justify-center rounded-full" aria-label="Send question" data-testid="button-send-question"><Send size={16} /></button></form></div>
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181f38]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${project.title} details`}><div className="relative max-h-[90vh] w-full max-w-[650px] overflow-auto rounded-[28px] bg-[#f7f1e7] p-7 shadow-2xl md:p-10"><button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 hover:bg-[#efe8dc]" aria-label="Close project details" data-testid="button-close-project"><X size={18} /></button><div className={`eyebrow mb-5 ${project.accent === 'blue' ? 'text-[#2447f7]' : project.accent === 'coral' ? 'text-[#ff674d]' : 'text-[#9b7412]'}`}>Resume project / {project.index}</div><h2 className="display max-w-[500px] text-5xl font-semibold leading-[.94] tracking-[-.055em]">{project.title}</h2><p className="mt-6 text-lg leading-8 text-[rgba(24,31,56,.7)]">{project.detail}</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-[#efe8dc] p-5"><div className="eyebrow mb-2 text-[rgba(24,31,56,.5)]">Role</div><p className="text-sm font-extrabold">{project.role}</p></div><div className="rounded-2xl bg-[#f8d67b] p-5"><div className="eyebrow mb-2 text-[rgba(24,31,56,.5)]">Method</div><p className="text-sm font-extrabold">{project.method}</p></div></div><button onClick={onClose} className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold" data-testid="button-return-to-work">Back to selected work <ArrowRight size={16} /></button></div></div>;
}

function Footer({ onOpenChat }: { onOpenChat: () => void }) {
  return <footer className="border-t border-[rgba(24,31,56,.14)]"><div className="wrap py-14"><div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow mb-5 text-[#ff674d]">Ready for the next system to improve</p><h2 className="display max-w-[620px] text-5xl font-semibold leading-[.93] tracking-[-.055em] md:text-7xl">Let’s build the<br /><span className="text-[#2447f7]">reliable path.</span></h2></div><div className="flex flex-wrap gap-3 md:justify-end"><a href="mailto:iamajaygaurx@gmail.com" className="btn-ink inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold" data-testid="link-email"><Mail size={16} /> Email Ajay</a></div></div><div className="mt-16 flex flex-col justify-between gap-4 border-t border-[rgba(24,31,56,.14)] pt-5 text-[11px] text-[rgba(24,31,56,.55)] sm:flex-row"><span>© 2026 Ajay Gaur — public profile</span><button onClick={onOpenChat} className="flex items-center gap-2 font-bold text-[#2447f7]" data-testid="button-footer-chat"><MessageCircle size={14} /> Ask the ambassador</button></div></div></footer>;
}

function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const activeProject = useMemo(() => selectedProject, [selectedProject]);
  return <div className="noise page-shell">
    <Nav onOpenChat={() => { setChatOpen(true); setTimeout(() => document.getElementById('ambassador')?.scrollIntoView({ behavior: 'smooth' }), 0); }} />
    <main>
      <Hero onOpenChat={() => { setChatOpen(true); document.getElementById('ambassador')?.scrollIntoView({ behavior: 'smooth' }); }} />
      <ProofSection />
      <WorkSection onSelect={setSelectedProject} />
      <ExperienceSection />
      <Guardrails />
      <Ambassador onClose={chatOpen ? () => setChatOpen(false) : undefined} />
    </main>
    <Footer onOpenChat={() => { setChatOpen(true); document.getElementById('ambassador')?.scrollIntoView({ behavior: 'smooth' }); }} />
    {activeProject && <ProjectModal project={activeProject} onClose={() => setSelectedProject(null)} />}
    <button onClick={() => { setChatOpen(true); document.getElementById('ambassador')?.scrollIntoView({ behavior: 'smooth' }); }} className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#ff674d] px-4 py-3 text-xs font-extrabold text-[#181f38] shadow-[0_12px_30px_rgba(255,103,77,.3)] transition-transform hover:-translate-y-1" data-testid="button-floating-chat"><Radio size={15} /> Ask ambassador</button>
  </div>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;