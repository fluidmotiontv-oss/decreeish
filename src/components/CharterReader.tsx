import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { CHARTER_SECTIONS } from '../data/charterData';
import { ReadingMode } from '../types/protocol';
import { ReadingProgressIndicator } from './ReadingProgressIndicator';
import { ResilientImage } from './ResilientImage';

interface CharterReaderProps {
  readingMode: ReadingMode;
  onChangeReadingMode: (mode: ReadingMode) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function CharterReader({
  readingMode,
  onChangeReadingMode,
  isDark,
  onToggleTheme,
}: CharterReaderProps) {
  const [activeChapterId, setActiveChapterId] = useState<string>(CHARTER_SECTIONS[0].id);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const container = document.getElementById('declaration');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportOffset = 140;
      const scrollableDistance = Math.max(container.offsetHeight - window.innerHeight * 0.55, 1);
      const traveled = Math.min(Math.max(-rect.top + viewportOffset, 0), scrollableDistance);
      const nextProgress = rect.top > window.innerHeight * 0.65
        ? 0
        : (traveled / scrollableDistance) * 100;

      setScrollProgress(Math.min(100, Math.max(0, nextProgress)));

      for (let i = CHARTER_SECTIONS.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(`chapter-${CHARTER_SECTIONS[i].id}`);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 210) {
            setActiveChapterId(CHARTER_SECTIONS[i].id);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateProgress();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToChapter = (id: string) => {
    const target = document.getElementById(`chapter-${id}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveChapterId(id);
    }
  };

  return (
    <section
      id="declaration"
      className="border-b border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311]"
    >
      <ReadingProgressIndicator
        progress={scrollProgress}
        sections={CHARTER_SECTIONS}
        activeSectionId={activeChapterId}
        onSelectSection={scrollToChapter}
      />

      {/* Workspace Reading Toolbar (below the fold, keeping Top Bar clean) */}
      <div className="border-b border-stone-200 dark:border-stone-800 bg-[#F2EFE9]/70 dark:bg-[#1D1B18]/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Reading Lens
            </span>
            <div
              role="group"
              aria-label="Reading mode"
              className="inline-flex items-center rounded-md border border-stone-300 dark:border-stone-700 bg-[#FBF9F5] dark:bg-[#141311] p-1"
            >
              <button
                type="button"
                onClick={() => onChangeReadingMode('charter')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  readingMode === 'charter'
                    ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                    : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100'
                }`}
              >
                Full Declaration
              </button>
              <button
                type="button"
                onClick={() => onChangeReadingMode('digest')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  readingMode === 'digest'
                    ? 'bg-[#1E3A8A] text-white dark:bg-blue-700'
                    : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100'
                }`}
              >
                Plain-Language Digest
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to archival paper light theme' : 'Switch to obsidian dark theme'}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-200 bg-[#FBF9F5] dark:bg-[#141311] border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px]"
            >
              {isDark ? (
                <>
                  <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Paper Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Ink Dark</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Horizontal Chapter Navigation Rail */}
        <div className="mx-auto max-w-6xl px-6 pb-3 overflow-x-auto">
          <div className="flex items-center gap-6 border-t border-stone-200/80 dark:border-stone-800/80 pt-3">
            {CHARTER_SECTIONS.map((section) => {
              const active = activeChapterId === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToChapter(section.id)}
                  className={`text-xs font-medium whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors duration-150 ${
                    active
                      ? 'border-[#1E3A8A] dark:border-blue-400 text-stone-900 dark:text-stone-100'
                      : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <span className="font-mono tabular-nums mr-1.5 text-stone-400 dark:text-stone-500">
                    {section.indexLabel}
                  </span>
                  <span>{section.navLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Asymmetric 70% Reading Column / 30% Margin Notes Canvas */}
      <div className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
        <div className="space-y-16 lg:space-y-20">
          {CHARTER_SECTIONS.map((section, idx) => (
            <article
              key={section.id}
              id={`chapter-${section.id}`}
              className="scroll-mt-32 grid grid-cols-1 gap-8 border-b border-stone-200 dark:border-stone-800 pb-14 lg:grid-cols-12 lg:gap-12 last:border-b-0 last:pb-0"
            >
              {/* Main Reading Column (~67%) */}
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  <span className="font-mono tabular-nums">Article {section.indexLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{section.pillar}</span>
                </div>

                <h2
                  className="mt-2 font-serif text-2xl sm:text-3xl font-semibold leading-snug text-stone-900 dark:text-stone-100"
                  style={{ textWrap: 'balance' }}
                >
                  {section.title}
                </h2>

                {readingMode === 'charter' ? (
                  <div className="mt-6 max-w-prose space-y-5 text-base leading-[1.78] text-stone-800 dark:text-stone-200">
                    {section.paragraphs.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className={
                          idx === 0 && pIdx === 0
                            ? 'first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-stone-900 dark:first-letter:text-stone-100'
                            : ''
                        }
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 max-w-prose space-y-5">
                    <p className="text-base sm:text-lg font-medium leading-relaxed text-stone-900 dark:text-stone-100">
                      {section.plainDigest.summary}
                    </p>
                    <ul className="space-y-3 border-t border-stone-200 dark:border-stone-800 pt-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      {section.plainDigest.keyTakeaways.map((point, kIdx) => (
                        <li key={kIdx} className="flex items-baseline gap-3">
                          <span className="font-mono text-xs tabular-nums text-stone-400 dark:text-stone-500">
                            0{kIdx + 1}.
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.pullQuote && (
                  <blockquote className="my-8 max-w-prose border-y border-stone-300 dark:border-stone-700 py-6 font-serif text-xl sm:text-2xl italic leading-relaxed text-stone-800 dark:text-stone-200">
                    “{section.pullQuote}”
                  </blockquote>
                )}

                {section.figure && (
                  <div className="mt-8 max-w-2xl">
                    <ResilientImage
                      src={section.figure.src}
                      alt={section.figure.alt}
                      figureNumber={section.figure.figureNumber}
                      caption={section.figure.caption}
                      aspectClass="aspect-[4/3]"
                    />
                  </div>
                )}
              </div>

              {/* Margin Annotation Sidebar (~33%) */}
              <aside
                aria-label={`Margin notes for ${section.title}`}
                className="lg:col-span-4 lg:pt-8"
              >
                <div className="space-y-6 border-t border-stone-200 dark:border-stone-800 pt-5 lg:border-t-0 lg:pt-0">
                  {section.marginNotes.map((note) => (
                    <div
                      key={note.reference}
                      className="rounded-md border border-stone-200 dark:border-stone-800 bg-[#F2EFE9]/60 dark:bg-[#1D1B18] p-5"
                    >
                      <div className="font-mono text-xs text-stone-500 dark:text-stone-400">
                        {note.reference}
                      </div>
                      <h3 className="mt-1.5 text-sm font-semibold text-stone-900 dark:text-stone-100">
                        {note.heading}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                        {note.body}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
