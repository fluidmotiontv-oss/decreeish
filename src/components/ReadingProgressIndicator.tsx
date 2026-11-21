import { CharterSection } from '../types/protocol';

interface ReadingProgressIndicatorProps {
  progress: number;
  sections: CharterSection[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
}

export function ReadingProgressIndicator({
  progress,
  sections,
  activeSectionId,
  onSelectSection,
}: ReadingProgressIndicatorProps) {
  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeSectionId)
  );
  const activeSection = sections[activeIndex] ?? sections[0];
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className="sticky top-[69px] sm:top-[73px] z-30 border-b border-stone-200 dark:border-stone-800 bg-[#FBF9F5]/95 dark:bg-[#141311]/95 backdrop-blur-sm"
      aria-label="Document reading progress"
    >
      {/* Full-bleed continuous hairline progress bar */}
      <div
        role="progressbar"
        aria-label="Reading progress through the Dragon Nine Protocol Charter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clampedProgress)}
        className="relative h-[3px] w-full overflow-hidden bg-stone-200 dark:bg-stone-800"
      >
        <div
          className="h-full w-full bg-[#1E3A8A] dark:bg-blue-500 origin-left transition-transform duration-100 ease-out"
          style={{ transform: `scaleX(${clampedProgress / 100})` }}
        />
      </div>

      {/* Compact editorial reading status & chapter progress rail */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2">
        <div className="flex min-w-0 items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
          <span className="font-mono tabular-nums text-stone-500 dark:text-stone-400 shrink-0">
            Article {activeSection.indexLabel} / {sections[sections.length - 1]?.indexLabel ?? '06'}
          </span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700 shrink-0">
            ·
          </span>
          <span className="truncate font-medium text-stone-900 dark:text-stone-100">
            {activeSection.title}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {/* Interactive chapter step bars (desktop/tablet) */}
          <nav
            aria-label="Charter section progress steps"
            className="hidden md:flex items-center gap-1"
          >
            {sections.map((section, idx) => {
              const isCurrent = section.id === activeSection.id;
              const isCompleted = idx < activeIndex || clampedProgress >= 99;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => onSelectSection(section.id)}
                  title={`${section.indexLabel}. ${section.title}`}
                  aria-label={`Jump to Article ${section.indexLabel}: ${section.title}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  className="group py-1.5 px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] rounded-xs"
                >
                  <span
                    className={`block h-1.5 transition-all duration-150 ${
                      isCurrent
                        ? 'w-6 bg-[#1E3A8A] dark:bg-blue-400'
                        : isCompleted
                        ? 'w-3.5 bg-stone-500 dark:bg-stone-400 group-hover:bg-stone-800 dark:group-hover:bg-stone-200'
                        : 'w-3.5 bg-stone-300 dark:bg-stone-700 group-hover:bg-stone-500 dark:group-hover:bg-stone-500'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="hidden sm:inline text-stone-500 dark:text-stone-400">Read</span>
            <span className="font-mono font-medium tabular-nums text-stone-900 dark:text-stone-100">
              {Math.round(clampedProgress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
