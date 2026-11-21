import { FormEvent, useState } from 'react';
import { Check, Download, Plus } from 'lucide-react';
import { AccountabilityCase } from '../types/protocol';

interface AccountabilityGuideProps {
  cases: AccountabilityCase[];
  onAddCase: (newCase: Omit<AccountabilityCase, 'id' | 'reference' | 'dateRecorded'>) => void;
}

const COMMON_BARRIERS = [
  'Communication processing or language barrier',
  'Medical, trauma, or caregiver recovery window',
  'Jargon-heavy documentation without plain digest',
  'Single-custodian workflow or missing training',
];

export function AccountabilityGuide({ cases, onAddCase }: AccountabilityGuideProps) {
  const [showBuilder, setShowBuilder] = useState(false);
  const [subject, setSubject] = useState('');
  const [contextSummary, setContextSummary] = useState('');
  const [systemicVsMaliceNote, setSystemicVsMaliceNote] = useState('');
  const [selectedBarriers, setSelectedBarriers] = useState<string[]>([]);
  const [evidenceSummary, setEvidenceSummary] = useState('');
  const [rehabilitativePath, setRehabilitativePath] = useState('');
  const [formError, setFormError] = useState('');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const toggleBarrier = (barrier: string) => {
    setSelectedBarriers((prev) =>
      prev.includes(barrier) ? prev.filter((item) => item !== barrier) : [...prev, barrier]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !subject.trim() ||
      !contextSummary.trim() ||
      !systemicVsMaliceNote.trim() ||
      !evidenceSummary.trim() ||
      !rehabilitativePath.trim()
    ) {
      setFormError(
        'Please complete the review subject, context, systemic analysis, evidence summary, and rehabilitative path.'
      );
      return;
    }

    onAddCase({
      subject: subject.trim(),
      contextSummary: contextSummary.trim(),
      criteria: {
        systemicVsMaliceNote: systemicVsMaliceNote.trim(),
        barriersIdentified:
          selectedBarriers.length > 0
            ? selectedBarriers
            : ['No specific communication or recovery barrier recorded'],
        evidenceSummary: evidenceSummary.trim(),
        rehabilitativePath: rehabilitativePath.trim(),
      },
    });

    setSubject('');
    setContextSummary('');
    setSystemicVsMaliceNote('');
    setSelectedBarriers([]);
    setEvidenceSummary('');
    setRehabilitativePath('');
    setFormError('');
    setShowBuilder(false);
  };

  const exportCaseMarkdown = (item: AccountabilityCase) => {
    const md = `# Restorative & Evidence-Based Review (${item.reference})
Date Recorded: ${item.dateRecorded}
Subject: ${item.subject}

## Context Summary
${item.contextSummary}

## 1. Systemic Context vs. Individual Malice
${item.criteria.systemicVsMaliceNote}

## 2. Communication & Recovery Barriers Identified
${item.criteria.barriersIdentified.map((b) => `- ${b}`).join('\n')}

## 3. Verifiable Documentary Evidence
${item.criteria.evidenceSummary}

## 4. Rehabilitative & Collective Learning Path
${item.criteria.rehabilitativePath}
`;
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.reference.toLowerCase()}-review.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedId(item.id);
    setTimeout(() => setDownloadedId(null), 2000);
  };

  return (
    <section
      id="accountability"
      className="scroll-mt-20 border-b border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Mutual Grace, Accountability &amp; Amnesty
            </div>
            <h2
              className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-stone-100"
              style={{ textWrap: 'balance' }}
            >
              Transparent Restorative Review Ledger
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700 dark:text-stone-300">
              Claims and conduct are evaluated with verifiable evidence and transparency while
              accounting for systemic gaps, communication barriers, and recovery needs—centering
              rehabilitation and collective learning.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowBuilder((prev) => !prev)}
            aria-expanded={showBuilder}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-900 dark:text-stone-100 bg-[#F2EFE9] hover:bg-[#E6E0D5] dark:bg-[#1D1B18] dark:hover:bg-[#272420] border border-stone-300 dark:border-stone-700 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 self-start min-h-[44px]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>{showBuilder ? 'Close Review Worksheet' : 'Conduct Restorative Review'}</span>
          </button>
        </div>

        {showBuilder && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-md border border-stone-300 dark:border-stone-700 bg-[#F2EFE9]/50 dark:bg-[#1D1B18] p-6 sm:p-8 space-y-5"
          >
            <h3 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
              Four-Part Evidence &amp; Care Assessment
            </h3>

            {formError && (
              <div
                role="alert"
                className="rounded-sm border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-xs text-red-800 dark:text-red-200"
              >
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="rev-subject"
                  className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Review Subject
                </label>
                <input
                  id="rev-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Concise title of the matter under review"
                  className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141311] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>
              <div>
                <label
                  htmlFor="rev-context"
                  className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Factual Context
                </label>
                <input
                  id="rev-context"
                  type="text"
                  value={contextSummary}
                  onChange={(e) => setContextSummary(e.target.value)}
                  placeholder="What occurred and what timelines were involved?"
                  className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141311] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Communication &amp; Recovery Barriers Considered
              </span>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {COMMON_BARRIERS.map((barrier) => {
                  const checked = selectedBarriers.includes(barrier);
                  return (
                    <label
                      key={barrier}
                      className="flex items-start gap-2.5 rounded-sm border border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311] px-3.5 py-2.5 text-xs text-stone-800 dark:text-stone-200 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleBarrier(barrier)}
                        className="mt-0.5 h-4 w-4 accent-[#1E3A8A]"
                      />
                      <span>{barrier}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="rev-systemic"
                  className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Systemic Context vs. Malice
                </label>
                <textarea
                  id="rev-systemic"
                  rows={3}
                  value={systemicVsMaliceNote}
                  onChange={(e) => setSystemicVsMaliceNote(e.target.value)}
                  placeholder="Distinguish structural gaps from intentional harm..."
                  className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141311] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>
              <div>
                <label
                  htmlFor="rev-evidence"
                  className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Verifiable Documentary Evidence
                </label>
                <textarea
                  id="rev-evidence"
                  rows={3}
                  value={evidenceSummary}
                  onChange={(e) => setEvidenceSummary(e.target.value)}
                  placeholder="Cite records, timestamps, or direct correspondence..."
                  className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141311] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>
              <div>
                <label
                  htmlFor="rev-rehab"
                  className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Rehabilitative &amp; Amnesty Path
                </label>
                <textarea
                  id="rev-rehab"
                  rows={3}
                  value={rehabilitativePath}
                  onChange={(e) => setRehabilitativePath(e.target.value)}
                  placeholder="Outline support, repair, and systemic prevention..."
                  className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141311] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowBuilder(false)}
                className="px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 rounded-md min-h-[40px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-medium text-white bg-[#1E3A8A] hover:bg-[#172D6B] dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md min-h-[40px]"
              >
                Record Assessment
              </button>
            </div>
          </form>
        )}

        {/* Ledger Rows */}
        <div className="mt-10 divide-y divide-stone-200 dark:divide-stone-800 border-y border-stone-200 dark:border-stone-800">
          {cases.map((item) => (
            <article key={item.id} className="py-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <span className="font-mono tabular-nums">{item.reference}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.dateRecorded}</span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
                    {item.subject}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                    {item.contextSummary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => exportCaseMarkdown(item)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-150 whitespace-nowrap shrink-0 self-start min-h-[40px]"
                >
                  {downloadedId === item.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                      <span>Exported</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Export Review</span>
                    </>
                  )}
                </button>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Systemic Context
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-stone-700 dark:text-stone-300">
                    {item.criteria.systemicVsMaliceNote}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Barriers Noted
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-stone-700 dark:text-stone-300">
                    <ul className="space-y-1">
                      {item.criteria.barriersIdentified.map((b, bIdx) => (
                        <li key={bIdx}>— {b}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Evidence Record
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-stone-700 dark:text-stone-300">
                    {item.criteria.evidenceSummary}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Rehabilitative Path
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-stone-700 dark:text-stone-300">
                    {item.criteria.rehabilitativePath}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
