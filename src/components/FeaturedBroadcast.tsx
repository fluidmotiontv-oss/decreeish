import { FormEvent, useState } from 'react';
import { Calendar, Check } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

interface SystemStage {
  id: string;
  tabLabel: string;
  headline: string;
  metric: string;
  summary: string;
  mechanics: string[];
}

const SYSTEM_STAGES: SystemStage[] = [
  {
    id: 'foundation',
    tabLabel: '01. $5.5M in 90 Days',
    headline: 'Zero-Capital 90-Day Launch Mechanics',
    metric: '$0 Starting Capital · $5.5M in 90 Days',
    summary:
      'Built from scratch without existing capital or name recognition by pairing high-trust local partnerships with disciplined daily outbound cadences.',
    mechanics: [
      'Identify an under-served local market demand before committing fixed overhead.',
      'Assemble credibility through transparent value exchange and measurable deliverables.',
      'Convert early client wins into documented proof that compounds deal velocity across weeks 4–12.',
    ],
  },
  {
    id: 'scale',
    tabLabel: '02. $700M Asset Scale',
    headline: 'Compounding Cash Flow into Durable Assets',
    metric: '$700M in Scaled Assets',
    summary:
      'Reinvesting operating surplus from repeatable sales engines into income-producing real assets with standardized operational playbooks.',
    mechanics: [
      'Separate short-term operating cash flow from long-term balance-sheet asset acquisition.',
      'Codify repeatable acquisition underwriting, financing discipline, and property stewardship.',
      'Maintain transparent performance reporting so partners and stakeholders share clarity.',
    ],
  },
  {
    id: 'ai-plugged',
    tabLabel: '03. Nov 21 AI Integration',
    headline: 'How the System Runs with AI Plugged In',
    metric: 'November 21st Live Walkthrough',
    summary:
      'Connecting modern AI workflows directly into research, deal underwriting, outreach personalization, and plain-language reporting without losing human judgment.',
    mechanics: [
      'Automated market scanning and underwriting prep cutting multi-day analysis into minutes.',
      'Structured workflow routing so small teams operate with institutional consistency.',
      'Open educational breakdown during the November 21st session honoring the promise to share the blueprint.',
    ],
  },
];

interface BroadcastRegistration {
  name: string;
  email: string;
  focus: string;
  registeredAt: string;
}

const STORAGE_KEY_RSVP = 'dnp_nov21_rsvp_v1';

export function FeaturedBroadcast() {
  const [activeStageId, setActiveStageId] = useState<string>('ai-plugged');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [focus, setFocus] = useState('AI-Plugged System Walkthrough');
  const [error, setError] = useState('');
  const [registration, setRegistration] = useState<BroadcastRegistration | null>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_RSVP);
      return raw ? (JSON.parse(raw) as BroadcastRegistration) : null;
    } catch {
      return null;
    }
  });

  const activeStage =
    SYSTEM_STAGES.find((stage) => stage.id === activeStageId) ?? SYSTEM_STAGES[2];

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedName) {
      setError('Please enter your name to reserve a seat.');
      return;
    }
    if (!emailValid) {
      setError('Please enter a valid email address for the November 21st session brief.');
      return;
    }

    const record: BroadcastRegistration = {
      name: trimmedName,
      email: trimmedEmail,
      focus,
      registeredAt: new Date().toISOString().slice(0, 10),
    };

    setRegistration(record);
    setError('');
    try {
      window.localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(record));
    } catch {
      // Ignore storage quota errors
    }
  };

  const handleDownloadCalendar = () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Fluid Motion TV//Dragon Nine Protocol//EN',
      'BEGIN:VEVENT',
      'UID:nov21-ai-system-walkthrough@fluidmotiontv',
      'DTSTAMP:20261121T150000Z',
      'DTSTART:20261121T180000Z',
      'DTEND:20261121T193000Z',
      'SUMMARY:Grant Cardone — November 21st AI-Plugged System Walkthrough',
      'DESCRIPTION:Open walkthrough of the $5.5M 90-day system scaled to $700M in assets with AI plugged in.',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nov-21-ai-system-walkthrough.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="broadcast"
      className="scroll-mt-20 border-b border-stone-200 dark:border-stone-800 bg-[#F2EFE9]/55 dark:bg-[#191714]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
          <span>Featured November 21st Broadcast</span>
          <span aria-hidden="true">·</span>
          <span>Open Knowledge Case Study</span>
          <span aria-hidden="true">·</span>
          <span>Fluid Motion TV</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Editorial Quote & Attribution Column */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div>
              <h2
                className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-stone-900 dark:text-stone-100"
                style={{ textWrap: 'balance' }}
              >
                From Zero Capital to $700M in Assets—Now with AI Plugged In
              </h2>

              <blockquote className="mt-6 border-y border-stone-300 dark:border-stone-700 py-6 font-serif text-xl sm:text-2xl italic leading-relaxed text-stone-800 dark:text-stone-200">
                “I promised my mom if I ever figured this out, I'd share it. I started with
                nothing — no money, no name. The first system I built did $5.5M in 90 days. Scaled,
                it became $700M in assets. On November 21st I'm showing you how it runs with AI
                plugged in.”
              </blockquote>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400">
                <span>Grant Cardone</span>
                <span aria-hidden="true">·</span>
                <span>Undercover Billionaire</span>
                <span aria-hidden="true">·</span>
                <span>Shared in Honor of His Mother</span>
              </div>
            </div>

            {/* Quantified Progression Strip */}
            <dl className="grid grid-cols-2 gap-6 border-t border-stone-200 dark:border-stone-800 pt-6 sm:grid-cols-4">
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Starting Capital
                </dt>
                <dd className="mt-1 font-mono text-base font-medium tabular-nums text-stone-900 dark:text-stone-100">
                  $0
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  First 90 Days
                </dt>
                <dd className="mt-1 font-mono text-base font-medium tabular-nums text-stone-900 dark:text-stone-100">
                  $5.5M
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Scaled Assets
                </dt>
                <dd className="mt-1 font-mono text-base font-medium tabular-nums text-stone-900 dark:text-stone-100">
                  $700M
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  AI Session
                </dt>
                <dd className="mt-1 font-mono text-base font-medium tabular-nums text-stone-900 dark:text-stone-100">
                  Nov 21
                </dd>
              </div>
            </dl>
          </div>

          {/* Editorial Photography Column */}
          <div className="lg:col-span-5 flex flex-col">
            <ResilientImage
              src="/src/assets/images/broadcast_legacy_desk_1795274114522.jpg"
              alt="Framed black-and-white portrait of a mother and son beside an open general ledger and studio broadcast microphone on a sunlit walnut desk"
              figureNumber="Fig. 0"
              caption="Grant Cardone with his mother — honoring the promise to share the system openly."
              aspectClass="aspect-[4/3] lg:h-full"
              className="flex-1 flex flex-col justify-between"
            />
          </div>
        </div>

        {/* Interactive System Architecture & November 21st Seat Reservation */}
        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-stone-200 dark:border-stone-800 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
                System Blueprint Breakdown
              </h3>
              <div
                role="tablist"
                aria-label="System progression stages"
                className="flex flex-wrap items-center gap-1 rounded-md border border-stone-300 dark:border-stone-700 bg-[#FBF9F5] dark:bg-[#141311] p-1"
              >
                {SYSTEM_STAGES.map((stage) => {
                  const active = stage.id === activeStageId;
                  return (
                    <button
                      key={stage.id}
                      role="tab"
                      aria-selected={active}
                      type="button"
                      onClick={() => setActiveStageId(stage.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                          : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100'
                      }`}
                    >
                      {stage.tabLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-md border border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311] p-6">
              <div className="font-mono text-xs tabular-nums text-stone-500 dark:text-stone-400">
                {activeStage.metric}
              </div>
              <h4 className="mt-1.5 font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                {activeStage.headline}
              </h4>
              <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {activeStage.summary}
              </p>
              <ul className="mt-5 space-y-2.5 border-t border-stone-200 dark:border-stone-800 pt-4 text-sm text-stone-700 dark:text-stone-300">
                {activeStage.mechanics.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-baseline gap-3">
                    <span className="font-mono text-xs tabular-nums text-stone-400 dark:text-stone-500">
                      0{sIdx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
                    November 21st Walkthrough
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                    Reserve access for the live demonstration showing how the system operates with
                    AI plugged in.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  title="Download .ics calendar invite"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 whitespace-nowrap shrink-0 min-h-[36px]"
                >
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Save Date</span>
                </button>
              </div>

              {registration ? (
                <div className="mt-6 space-y-4 border-t border-stone-200 dark:border-stone-800 pt-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>Seat Reserved for November 21st</span>
                  </div>
                  <dl className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500 dark:text-stone-400">Participant</dt>
                      <dd className="font-medium">{registration.name}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500 dark:text-stone-400">Briefing Email</dt>
                      <dd className="font-mono">{registration.email}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500 dark:text-stone-400">Focus Track</dt>
                      <dd>{registration.focus}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => {
                      setRegistration(null);
                      try {
                        window.localStorage.removeItem(STORAGE_KEY_RSVP);
                      } catch {
                        // Ignore storage error
                      }
                    }}
                    className="text-xs font-medium text-stone-600 dark:text-stone-400 underline underline-offset-4 hover:text-stone-900 dark:hover:text-stone-100"
                  >
                    Update registration details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="mt-5 space-y-4">
                  {error && (
                    <div
                      role="alert"
                      className="rounded-sm border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-800 dark:text-red-200"
                    >
                      {error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="rsvp-name"
                      className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rsvp-email"
                      className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="rsvp-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rsvp-focus"
                      className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
                    >
                      Session Focus
                    </label>
                    <select
                      id="rsvp-focus"
                      value={focus}
                      onChange={(e) => setFocus(e.target.value)}
                      className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    >
                      <option value="AI-Plugged System Walkthrough">
                        AI-Plugged System Walkthrough
                      </option>
                      <option value="Zero-to-$5.5M 90-Day Launch">
                        Zero-to-$5.5M 90-Day Launch
                      </option>
                      <option value="Scaling to $700M Asset Architecture">
                        Scaling to $700M Asset Architecture
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#1E3A8A] hover:bg-[#172D6B] dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors duration-150 min-h-[44px]"
                  >
                    Reserve November 21st Seat
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
