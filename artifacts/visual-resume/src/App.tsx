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
  Github,
  Linkedin,
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
    id: 'northstar',
    index: '01',
    title: 'Northstar onboarding',
    type: 'Product strategy · B2B SaaS',
    summary: 'Turning a product tour into a moment of earned confidence.',
    outcome: 'Activation concept',
    tags: ['journey mapping', 'prototype', 'positioning'],
    accent: 'blue',
    detail: 'A demo case study placeholder for a complex B2B onboarding flow. The work connects a sharper first-run narrative to the decisions users need to make before they can experience value.',
    role: 'Product strategist + interaction designer',
    method: 'Research synthesis → narrative system → tested prototype',
  },
  {
    id: 'fieldnotes',
    index: '02',
    title: 'Fieldnotes / mobile',
    type: 'Product design · Consumer',
    summary: 'A calmer way to collect the small signals that become big ideas.',
    outcome: 'Prototype direction',
    tags: ['information architecture', 'visual design', 'motion'],
    accent: 'coral',
    detail: 'A demo case study placeholder about giving a lightweight capture tool enough structure to become a trusted habit, without asking the user to manage another system.',
    role: 'Lead product designer',
    method: 'Concept framing → interaction model → motion language',
  },
  {
    id: 'signal-room',
    index: '03',
    title: 'Signal room',
    type: 'Brand + product · Early-stage',
    summary: 'Making product intelligence legible before it becomes a dashboard.',
    outcome: 'Narrative framework',
    tags: ['systems thinking', 'workshop', 'content design'],
    accent: 'yellow',
    detail: 'A demo case study placeholder exploring how a product team can align around signals, not screens. The output is a shared language for deciding what deserves attention.',
    role: 'Strategy partner + design lead',
    method: 'Workshop prompts → signal taxonomy → decision principles',
  },
];

const sourceFacts = [
  'Target role: Product Designer / Product Strategist hybrid',
  'Published proof: three demo case studies on this page',
  'Working style: clarity before decoration; evidence before volume',
];

const starterQuestions = [
  'What role is this person targeting?',
  'What are the three proof points?',
  'What projects are published here?',
];

function downloadResume() {
  const content = `EDITABLE DEMO PROFILE\nMara Voss — Product Designer / Product Strategist\n\nThis is a clearly labelled demo resume for the Visual Resume & Ambassador product.\n\nFOCUS\nProduct thinking, interaction design, and narrative systems for teams making complex things easier to choose.\n\nPROOF\n01 Clarity under constraint — turns ambiguity into a decision surface.\n02 Systems with a pulse — designs reusable patterns with human texture.\n03 Useful conviction — brings a point of view and makes it testable.\n\nSELECTED DEMO WORK\nNorthstar onboarding / Fieldnotes / Signal room\n\nReplace this content before publishing as a personal resume.\n`;
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'mara-voss-editable-demo-resume.txt';
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
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2447f7] text-[#f7f1e7] display text-lg font-semibold">M</span>
          <span className="hidden text-sm font-extrabold tracking-[-.03em] sm:block">Mara Voss<span className="text-[#ff674d]">.</span></span>
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
          <span className="eyebrow rounded-full border border-[#ff674d] px-3 py-2 text-[#ff674d]">Editable demo profile</span>
          <span className="mono text-[10px] tracking-[.08em] text-[rgba(24,31,56,.55)]">Replace before publishing</span>
        </div>
        <h1 className="display max-w-[750px] text-[clamp(4rem,9.2vw,8.3rem)] font-semibold leading-[.86] tracking-[-.075em]">
          Make the<br /><span className="text-[#2447f7]">complex</span> feel<br /><span className="relative inline-block">obvious<span className="absolute -right-7 -top-3 h-3 w-3 rounded-full bg-[#ff674d] pulse-dot" /></span>.
        </h1>
        <p className="mt-9 max-w-[560px] text-lg leading-8 text-[rgba(24,31,56,.7)]">
          Mara Voss is a demo profile for a <strong className="text-[#181f38]">Product Designer / Product Strategist</strong> who gives ambitious products a sharper point of view — then makes that point testable.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#work" className="btn-primary inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-sm font-extrabold" data-testid="link-see-work">See selected work <ArrowDownToLine size={17} /></a>
          <button onClick={onOpenChat} className="btn-quiet inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-sm font-bold" data-testid="button-hero-chat"><MessageCircle size={17} /> Ask a bounded question</button>
        </div>
        <div className="mt-11 flex items-center gap-5 text-[11px] text-[rgba(24,31,56,.58)]">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#ff674d]" /> Demo content is clearly marked</span>
          <span className="hidden h-4 w-px bg-[rgba(24,31,56,.18)] sm:block" />
          <span className="flex items-center gap-2"><MapPin size={13} /> Remote / GMT±0</span>
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
              <div className="mono text-[10px] uppercase tracking-[.18em] text-[#f7f1e7]">Design / strategy</div>
              <div className="display text-6xl font-semibold leading-none text-[#f8d67b]">MV</div>
            </div>
            <div className="absolute right-[13%] top-[22%] writing-vertical mono text-[9px] uppercase tracking-[.2em] text-[#f7f1e7]">Make room for clarity</div>
          </div>
        </div>
        <div className="absolute -bottom-6 -left-5 rounded-2xl border border-[rgba(24,31,56,.14)] bg-[#f8d67b] px-4 py-3 shadow-[0_14px_34px_rgba(24,31,56,.12)]">
          <div className="eyebrow mb-1 text-[rgba(24,31,56,.58)]">Current signal</div>
          <div className="text-sm font-extrabold">Clarity is a product feature.</div>
        </div>
        <div className="absolute -right-3 top-8 hidden rounded-full bg-[#ff674d] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#181f38] md:block">Open to good problems</div>
      </div>
    </section>
  );
}

function ProofSection() {
  const points = [
    { number: '01', title: 'Clarity under constraint', body: 'Turns ambiguity into a decision surface people can actually use.', accent: 'blue' },
    { number: '02', title: 'Systems with a pulse', body: 'Builds reusable patterns that still leave room for human texture.', accent: 'coral' },
    { number: '03', title: 'Useful conviction', body: 'Brings a point of view — then makes it testable with evidence.', accent: 'yellow' },
  ];
  return (
    <section id="proof" className="border-y border-[rgba(24,31,56,.13)] bg-[#efe8dc]">
      <div className="wrap py-16 lg:py-24">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-[#2447f7]">01 / Proof in three beats</p>
            <h2 className="display max-w-[550px] text-5xl font-semibold leading-[.95] tracking-[-.055em] md:text-7xl">The short version<br />worth remembering.</h2>
          </div>
          <p className="max-w-[260px] text-sm leading-6 text-[rgba(24,31,56,.62)]">Not a personality quiz. Three working beliefs that shape how this demo profile approaches the work.</p>
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
        <div className="flex justify-between gap-6 lg:pb-2"><p className="max-w-[385px] text-base leading-7 text-[rgba(24,31,56,.68)]">Three demo projects ordered for a recruiter scanning for product judgment, range, and a bias toward outcomes.</p><span className="mono hidden text-[10px] uppercase tracking-[.15em] text-[rgba(24,31,56,.45)] sm:block">Scroll / click a case</span></div>
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

function Guardrails() {
  return (
    <section id="guardrails" className="bg-[#181f38] text-[#f7f1e7]">
      <div className="wrap grid gap-14 py-20 lg:grid-cols-[.8fr_1.2fr] lg:py-28">
        <div><p className="eyebrow mb-4 text-[#f8d67b]">03 / Trust layer</p><h2 className="display max-w-[440px] text-5xl font-semibold leading-[.94] tracking-[-.055em] md:text-7xl">The source<br />is the story.</h2><p className="mt-7 max-w-[360px] text-sm leading-6 text-[#f7f1e7]/65">This experience is designed to be legible about what is published, what is private, and what the ambassador is allowed to say.</p></div>
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
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'I can answer questions about this published demo profile, its proof points, and the three projects shown here. What would you like to verify?' }]);
  const answerFor = (question: string) => {
    const normalized = question.toLowerCase();
    if (normalized.includes('role') || normalized.includes('target')) return 'The published target role is a Product Designer / Product Strategist hybrid.';
    if (normalized.includes('proof') || normalized.includes('strength')) return 'The three proof points are clarity under constraint, systems with a pulse, and useful conviction.';
    if (normalized.includes('project') || normalized.includes('work')) return 'The published demo projects are Northstar onboarding, Fieldnotes / mobile, and Signal room.';
    if (normalized.includes('source') || normalized.includes('private')) return 'I only use the facts published on this page. Private context and unapproved claims are out of bounds.';
    return 'I cannot verify that from the published demo profile. Try asking about the target role, proof points, projects, or source guardrails.';
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
          <div className="flex items-center justify-between border-b border-[rgba(24,31,56,.14)] px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2447f7] text-[#f7f1e7]"><Bot size={17} /></span><div><div className="text-sm font-extrabold">Mara's ambassador</div><div className="mono text-[9px] uppercase tracking-[.12em] text-[rgba(24,31,56,.5)]">Published facts only</div></div></div>{onClose && <button onClick={onClose} className="rounded-full p-2 hover:bg-[#efe8dc]" aria-label="Close ambassador" data-testid="button-close-ambassador"><X size={17} /></button>}</div>
          <div className="chat-scroll flex h-[300px] flex-col gap-3 overflow-y-auto p-5">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`chat-bubble max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'assistant' ? 'self-start rounded-tl-sm bg-[#efe8dc]' : 'self-end rounded-tr-sm bg-[#2447f7] text-[#f7f1e7]'}`} data-testid={`text-chat-message-${index}`}>{message.text}</div>)}</div>
          <div className="border-t border-[rgba(24,31,56,.14)] p-4"><div className="mb-3 flex flex-wrap gap-2">{starterQuestions.map(question => <button key={question} onClick={() => { setInput(question); }} className="rounded-full border border-[rgba(24,31,56,.18)] px-3 py-1.5 text-[10px] font-bold hover:border-[#2447f7]" data-testid={`button-starter-${question.slice(0, 8).replaceAll(' ', '-')}`}>{question}</button>)}</div><form onSubmit={submit} className="flex gap-2"><input value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about the published profile…" className="min-w-0 flex-1 rounded-full border border-[rgba(24,31,56,.2)] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[rgba(24,31,56,.42)] focus:border-[#2447f7]" aria-label="Ask the ambassador" data-testid="input-ambassador-question" /><button className="btn-ink flex h-11 w-11 shrink-0 items-center justify-center rounded-full" aria-label="Send question" data-testid="button-send-question"><Send size={16} /></button></form></div>
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181f38]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${project.title} details`}><div className="relative max-h-[90vh] w-full max-w-[650px] overflow-auto rounded-[28px] bg-[#f7f1e7] p-7 shadow-2xl md:p-10"><button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 hover:bg-[#efe8dc]" aria-label="Close project details" data-testid="button-close-project"><X size={18} /></button><div className={`eyebrow mb-5 ${project.accent === 'blue' ? 'text-[#2447f7]' : project.accent === 'coral' ? 'text-[#ff674d]' : 'text-[#9b7412]'}`}>Demo case study / {project.index}</div><h2 className="display max-w-[500px] text-5xl font-semibold leading-[.94] tracking-[-.055em]">{project.title}</h2><p className="mt-6 text-lg leading-8 text-[rgba(24,31,56,.7)]">{project.detail}</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-[#efe8dc] p-5"><div className="eyebrow mb-2 text-[rgba(24,31,56,.5)]">Role</div><p className="text-sm font-extrabold">{project.role}</p></div><div className="rounded-2xl bg-[#f8d67b] p-5"><div className="eyebrow mb-2 text-[rgba(24,31,56,.5)]">Method</div><p className="text-sm font-extrabold">{project.method}</p></div></div><button onClick={onClose} className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold" data-testid="button-return-to-work">Back to selected work <ArrowRight size={16} /></button></div></div>;
}

function Footer({ onOpenChat }: { onOpenChat: () => void }) {
  return <footer className="border-t border-[rgba(24,31,56,.14)]"><div className="wrap py-14"><div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow mb-5 text-[#ff674d]">Ready when the problem is good</p><h2 className="display max-w-[620px] text-5xl font-semibold leading-[.93] tracking-[-.055em] md:text-7xl">Let's make the<br /><span className="text-[#2447f7]">right thing clear.</span></h2></div><div className="flex flex-wrap gap-3 md:justify-end"><a href="mailto:demo@example.com" className="btn-ink inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold" data-testid="link-email"><Mail size={16} /> Email</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="btn-quiet inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold" data-testid="link-linkedin"><Linkedin size={16} /> LinkedIn</a><a href="https://github.com" target="_blank" rel="noreferrer" className="btn-quiet inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold" data-testid="link-github"><Github size={16} /> GitHub</a></div></div><div className="mt-16 flex flex-col justify-between gap-4 border-t border-[rgba(24,31,56,.14)] pt-5 text-[11px] text-[rgba(24,31,56,.55)] sm:flex-row"><span>© 2025 Mara Voss — editable demo profile</span><button onClick={onOpenChat} className="flex items-center gap-2 font-bold text-[#2447f7]" data-testid="button-footer-chat"><MessageCircle size={14} /> Ask the ambassador</button></div></div></footer>;
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