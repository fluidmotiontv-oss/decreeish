import { FormEvent, useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { buildCharterMarkdown } from '../data/charterData';
import { CommunityEndorsement, EndorsementDiscipline } from '../types/protocol';

interface EndorsementLedgerProps {
  endorsements: CommunityEndorsement[];
  onAddEndorsement: (
    endorsement: Omit<CommunityEndorsement, 'id' | 'dateSigned'>
  ) => void;
}

const DISCIPLINES: EndorsementDiscipline[] = [
  'All',
  'Community Member',
  'Educator & Researcher',
  'Creative & Media',
  'Civic & Restorative',
];

export function EndorsementLedger({
  endorsements,
  onAddEndorsement,
}: EndorsementLedgerProps) {
  const [filter, setFilter] = useState<EndorsementDiscipline>('All');
  const [name, setName] = useState('');
  const [discipline, setDiscipline] =
    useState<Exclude<EndorsementDiscipline, 'All'>>('Community Member');
  const [locationOrContext, setLocationOrContext] = useState('');
  const [statement, setStatement] = useState('');
  const [voluntaryAffirmation, setVoluntaryAffirmation] = useState(false);
  const [formError, setFormError] = useState('');
  const [signedSuccess, setSignedSuccess] = useState(false);
  const [copiedCharter, setCopiedCharter] = useState(false);

  const visibleEndorsements =
    filter === 'All'
      ? endorsements
      : endorsements.filter((item) => item.discipline === filter);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !statement.trim()) {
      setFormError('Please enter your name (or preferred alias) and a brief statement of support.');
      return;
    }
    if (!voluntaryAffirmation) {
      setFormError('Please confirm that your endorsement is offered freely and voluntarily.');
      return;
    }

    onAddEndorsement({
      name: name.trim(),
      discipline,
      locationOrContext: locationOrContext.trim() || 'Independent Signatory',
      statement: statement.trim(),
    });

    setName('');
    setLocationOrContext('');
    setStatement('');
    setVoluntaryAffirmation(false);
    setFormError('');
    setSignedSuccess(true);
    setTimeout(() => setSignedSuccess(false), 3500);
  };

  const handleCopyCharter = async () => {
    try {
      await navigator.clipboard.writeText(buildCharterMarkdown(endorsements));
      setCopiedCharter(true);
      setTimeout(() => setCopiedCharter(false), 2500);
    } catch {
      // Fallback: trigger file download if clipboard permission is unavailable
      handleDownloadCharter();
    }
  };

  const handleDownloadCharter = () => {
    const markdown = buildCharterMarkdown(endorsements);
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dragon-nine-protocol-charter.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="endorse"
      className="scroll-mt-20 bg-[#F2EFE9]/50 dark:bg-[#191714]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              An Open Invitation &amp; Living Registry
            </div>
            <h2
              className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-stone-100"
              style={{ textWrap: 'balance' }}
            >
              Community Endorsement Ledger
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700 dark:text-stone-300">
              Embracing this framework is an individual, voluntary choice. Contributors and
              supporters stand together in affirming shared responsibility, open knowledge, and
              mutual grace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start">
            <button
              type="button"
              onClick={handleCopyCharter}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-stone-800 dark:text-stone-200 bg-[#FBF9F5] dark:bg-[#141311] border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px]"
            >
              {copiedCharter ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  <span>Copied Charter</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy Charter Text</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownloadCharter}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-stone-800 dark:text-stone-200 bg-[#FBF9F5] dark:bg-[#141311] border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px]"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download Charter (.md)</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Sign the Charter Form */}
          <div id="sign-charter" className="scroll-mt-24 lg:col-span-5">
            <form
              onSubmit={handleSubmit}
              className="rounded-md border border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311] p-6 sm:p-8 space-y-5"
            >
              <div>
                <h3 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
                  Affirm &amp; Endorse the Protocol
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  Add your name, perspective, and commitment to the public ledger below.
                </p>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="rounded-sm border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-xs text-red-800 dark:text-red-200"
                >
                  {formError}
                </div>
              )}

              {signedSuccess && (
                <div
                  role="status"
                  className="rounded-sm border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3 text-xs text-emerald-900 dark:text-emerald-200"
                >
                  Thank you. Your endorsement has been recorded in the community ledger.
                </div>
              )}

              <div>
                <label
                  htmlFor="endorse-name"
                  className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Name, Collective, or Preferred Alias
                </label>
                <input
                  id="endorse-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name or organization"
                  className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="endorse-discipline"
                    className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                  >
                    Perspective / Circle
                  </label>
                  <select
                    id="endorse-discipline"
                    value={discipline}
                    onChange={(e) =>
                      setDiscipline(e.target.value as Exclude<EndorsementDiscipline, 'All'>)
                    }
                    className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                  >
                    <option value="Community Member">Community Member</option>
                    <option value="Educator & Researcher">Educator &amp; Researcher</option>
                    <option value="Creative & Media">Creative &amp; Media</option>
                    <option value="Civic & Restorative">Civic &amp; Restorative</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="endorse-context"
                    className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                  >
                    Tradition or Practice (Optional)
                  </label>
                  <input
                    id="endorse-context"
                    type="text"
                    value={locationOrContext}
                    onChange={(e) => setLocationOrContext(e.target.value)}
                    placeholder="e.g. Neighborhood Library"
                    className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="endorse-statement"
                  className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Statement of Commitment
                </label>
                <textarea
                  id="endorse-statement"
                  rows={3}
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  placeholder="How do you hope to uphold open knowledge, pluralism, and mutual grace?"
                  className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs leading-relaxed text-stone-700 dark:text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={voluntaryAffirmation}
                  onChange={(e) => setVoluntaryAffirmation(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#1E3A8A]"
                />
                <span>
                  I offer this endorsement voluntarily in a spirit of integrity, mutual respect,
                  and constructive engagement.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#1E3A8A] hover:bg-[#172D6B] dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors duration-150 min-h-[44px]"
              >
                Add Endorsement to Ledger
              </button>
            </form>
          </div>

          {/* Right: Filterable Ledger */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Recorded Signatories (<span className="font-mono tabular-nums">{visibleEndorsements.length}</span>)
              </div>

              <div
                role="tablist"
                aria-label="Filter endorsements by discipline"
                className="flex flex-wrap items-center gap-1"
              >
                {DISCIPLINES.map((item) => {
                  const active = filter === item;
                  return (
                    <button
                      key={item}
                      role="tab"
                      aria-selected={active}
                      type="button"
                      onClick={() => setFilter(item)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                          : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {visibleEndorsements.length === 0 ? (
              <div className="py-12 text-center text-sm text-stone-500 dark:text-stone-400">
                No endorsements recorded under {filter} yet. Be the first to sign on the left.
              </div>
            ) : (
              <div className="divide-y divide-stone-200 dark:divide-stone-800">
                {visibleEndorsements.map((entry) => (
                  <div key={entry.id} className="py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                        {entry.name}
                      </h4>
                      <span className="font-mono text-xs tabular-nums text-stone-500 dark:text-stone-400">
                        {entry.dateSigned}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                      <span>{entry.discipline}</span>
                      <span aria-hidden="true">·</span>
                      <span>{entry.locationOrContext}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      “{entry.statement}”
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
