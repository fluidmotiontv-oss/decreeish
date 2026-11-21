import { FormEvent, useState } from 'react';
import { ChevronDown, ChevronUp, Plus, ThumbsUp } from 'lucide-react';
import {
  ConstructiveAlternative,
  DeliberationTopic,
  PillarCategory,
} from '../types/protocol';

interface ParticipatoryWorkbenchProps {
  deliberations: DeliberationTopic[];
  supportedIds: string[];
  onToggleSupport: (topicId: string, altId: string) => void;
  onAddAlternative: (
    topicId: string,
    alternative: Omit<ConstructiveAlternative, 'id' | 'supportCount' | 'createdAt'>
  ) => void;
}

const PILLARS: PillarCategory[] = [
  'All',
  'Open Knowledge',
  'Pluralism',
  'Accountability',
  'Self-Governance',
];

export function ParticipatoryWorkbench({
  deliberations,
  supportedIds,
  onToggleSupport,
  onAddAlternative,
}: ParticipatoryWorkbenchProps) {
  const [selectedPillar, setSelectedPillar] = useState<PillarCategory>('All');
  const [openComposerTopicId, setOpenComposerTopicId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [traditionOrRole, setTraditionOrRole] = useState('');
  const [proposalText, setProposalText] = useState('');
  const [analyticalRationale, setAnalyticalRationale] = useState('');
  const [accessibilityNote, setAccessibilityNote] = useState('');
  const [formError, setFormError] = useState('');

  const filteredTopics =
    selectedPillar === 'All'
      ? deliberations
      : deliberations.filter((topic) => topic.pillar === selectedPillar);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setTraditionOrRole('');
    setProposalText('');
    setAnalyticalRationale('');
    setAccessibilityNote('');
    setFormError('');
  };

  const handleOpenComposer = (topicId: string) => {
    if (openComposerTopicId === topicId) {
      setOpenComposerTopicId(null);
      resetForm();
    } else {
      setOpenComposerTopicId(topicId);
      resetForm();
    }
  };

  const handleSubmit = (e: FormEvent, topicId: string) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !proposalText.trim() || !analyticalRationale.trim()) {
      setFormError('Please provide a proposal title, your name or alias, the alternative proposal, and its analytical rationale.');
      return;
    }

    onAddAlternative(topicId, {
      title: title.trim(),
      author: author.trim(),
      traditionOrRole: traditionOrRole.trim() || 'Community Contributor',
      proposalText: proposalText.trim(),
      analyticalRationale: analyticalRationale.trim(),
      accessibilityNote:
        accessibilityNote.trim() || 'Written in plain language for open community review.',
    });

    resetForm();
    setOpenComposerTopicId(null);
  };

  return (
    <section
      id="deliberation"
      className="scroll-mt-20 border-b border-stone-200 dark:border-stone-800 bg-[#F2EFE9]/50 dark:bg-[#191714]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Participatory Decision-Making &amp; Pluralism
            </div>
            <h2
              className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-stone-100"
              style={{ textWrap: 'balance' }}
            >
              Constructive Alternatives Studio
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700 dark:text-stone-300">
              Rather than limiting participants to predefined options, every deliberation invites
              community members to propose, refine, and support constructive alternatives rooted
              in clarity and plural traditions.
            </p>
          </div>

          {/* Interactive Pillar Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter deliberations by pillar"
            className="flex flex-wrap items-center gap-1.5 rounded-md border border-stone-300 dark:border-stone-700 bg-[#FBF9F5] dark:bg-[#141311] p-1 self-start"
          >
            {PILLARS.map((pillar) => {
              const active = selectedPillar === pillar;
              return (
                <button
                  key={pillar}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedPillar(pillar)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                      : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100'
                  }`}
                >
                  {pillar}
                </button>
              );
            })}
          </div>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="mt-10 rounded-md border border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311] p-10 text-center">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              No active deliberations are filed under {selectedPillar} yet. Select All to review
              open community topics.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {filteredTopics.map((topic) => {
              const isComposerOpen = openComposerTopicId === topic.id;
              return (
                <div
                  key={topic.id}
                  className="rounded-md border border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311] p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                        <span className="font-mono tabular-nums">{topic.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{topic.pillar}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {topic.alternatives.length}{' '}
                          {topic.alternatives.length === 1 ? 'Alternative' : 'Alternatives'}
                        </span>
                      </div>
                      <h3 className="mt-2 font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                        {topic.title}
                      </h3>
                      <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                        {topic.context}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenComposer(topic.id)}
                      aria-expanded={isComposerOpen}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1E3A8A] hover:bg-[#172D6B] dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 self-start min-h-[40px]"
                    >
                      {isComposerOpen ? (
                        <>
                          <ChevronUp className="h-4 w-4" aria-hidden="true" />
                          <span>Close Proposal Form</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" aria-hidden="true" />
                          <span>Propose Alternative</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Predefined Options Context */}
                  <div className="mt-6">
                    <div className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Initial Predefined Options
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {topic.predefinedOptions.map((option, oIdx) => (
                        <div
                          key={oIdx}
                          className="rounded-sm border border-stone-200 dark:border-stone-800 bg-[#F2EFE9]/60 dark:bg-[#1D1B18] px-4 py-3 text-sm text-stone-700 dark:text-stone-300"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Constructive Alternative Composer */}
                  {isComposerOpen && (
                    <form
                      onSubmit={(e) => handleSubmit(e, topic.id)}
                      className="mt-6 border-y border-stone-300 dark:border-stone-700 py-6 space-y-5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                          Draft a Constructive Alternative
                        </h4>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          Grounded in values, deliberation &amp; analytical logic
                        </span>
                      </div>

                      {formError && (
                        <div
                          role="alert"
                          className="rounded-sm border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-xs text-red-800 dark:text-red-200"
                        >
                          {formError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <label
                            htmlFor={`alt-title-${topic.id}`}
                            className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                          >
                            Proposal Title
                          </label>
                          <input
                            id={`alt-title-${topic.id}`}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Dual-Language Community Primer"
                            className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`alt-author-${topic.id}`}
                            className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                          >
                            Contributor Name or Alias
                          </label>
                          <input
                            id={`alt-author-${topic.id}`}
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Your name"
                            className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`alt-role-${topic.id}`}
                            className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                          >
                            Tradition, Discipline, or Role
                          </label>
                          <input
                            id={`alt-role-${topic.id}`}
                            type="text"
                            value={traditionOrRole}
                            onChange={(e) => setTraditionOrRole(e.target.value)}
                            placeholder="e.g. Educator, Guild Member"
                            className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor={`alt-body-${topic.id}`}
                          className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                        >
                          Constructive Alternative Proposal
                        </label>
                        <textarea
                          id={`alt-body-${topic.id}`}
                          rows={3}
                          value={proposalText}
                          onChange={(e) => setProposalText(e.target.value)}
                          placeholder="Describe the practical alternative you are proposing..."
                          className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`alt-logic-${topic.id}`}
                            className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                          >
                            Analytical Logic &amp; Values Alignment
                          </label>
                          <textarea
                            id={`alt-logic-${topic.id}`}
                            rows={2}
                            value={analyticalRationale}
                            onChange={(e) => setAnalyticalRationale(e.target.value)}
                            placeholder="Why does this serve the community more fairly?"
                            className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`alt-access-${topic.id}`}
                            className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                          >
                            Clarity &amp; Accessibility Safeguard
                          </label>
                          <textarea
                            id={`alt-access-${topic.id}`}
                            rows={2}
                            value={accessibilityNote}
                            onChange={(e) => setAccessibilityNote(e.target.value)}
                            placeholder="How is this kept plain and accessible to all?"
                            className="w-full rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1D1B18] px-3 py-2 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => handleOpenComposer(topic.id)}
                          className="px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 min-h-[40px]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-medium text-white bg-[#1E3A8A] hover:bg-[#172D6B] dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md min-h-[40px]"
                        >
                          Publish Alternative
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Community Constructive Alternatives */}
                  <div className="mt-7 space-y-5">
                    <div className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Community Constructive Alternatives
                    </div>
                    {topic.alternatives.map((alt) => {
                      const isSupported = supportedIds.includes(alt.id);
                      return (
                        <div
                          key={alt.id}
                          className="border-t border-stone-200 dark:border-stone-800 pt-5"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                                {alt.title}
                              </h4>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                                <span>{alt.author}</span>
                                <span aria-hidden="true">·</span>
                                <span>{alt.traditionOrRole}</span>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono tabular-nums">{alt.createdAt}</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => onToggleSupport(topic.id, alt.id)}
                              aria-pressed={isSupported}
                              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md border transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] ${
                                isSupported
                                  ? 'border-[#1E3A8A] bg-[#1E3A8A]/10 text-[#1E3A8A] dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-200'
                                  : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                              }`}
                            >
                              <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>{isSupported ? 'Supported' : 'Support'}</span>
                              <span className="font-mono tabular-nums">
                                ({alt.supportCount})
                              </span>
                            </button>
                          </div>

                          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                            {alt.proposalText}
                          </p>

                          <dl className="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                            <div>
                              <dt className="font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                                Analytical Rationale
                              </dt>
                              <dd className="mt-1 leading-relaxed text-stone-700 dark:text-stone-300">
                                {alt.analyticalRationale}
                              </dd>
                            </div>
                            <div>
                              <dt className="font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                                Clarity &amp; Accessibility
                              </dt>
                              <dd className="mt-1 leading-relaxed text-stone-700 dark:text-stone-300">
                                {alt.accessibilityNote}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
