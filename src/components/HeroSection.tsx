import { ArrowDownRight } from 'lucide-react';
import { HERO_FIGURE } from '../data/charterData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  endorsementCount: number;
  alternativeCount: number;
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({
  endorsementCount,
  alternativeCount,
  onNavigate,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="border-b border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311]"
    >
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-14 lg:pt-16 lg:pb-16">
        {/* Quiet unboxed archival metadata line */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wider uppercase text-stone-500 dark:text-stone-400">
          <span>Fluid Motion TV</span>
          <span aria-hidden="true">·</span>
          <span>Open Civic Charter</span>
          <span aria-hidden="true">·</span>
          <span>Voluntary Commons</span>
        </div>

        {/* Asymmetric 2-column institutional hero split */}
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div>
              <h1
                className="font-serif text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold leading-[1.12] tracking-tight text-stone-900 dark:text-stone-100"
                style={{ textWrap: 'balance' }}
              >
                The Dragon Nine Protocol Framework
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300">
                A living declaration of goodwill, self-governance, and participatory pluralism—built
                to make true knowledge accessible, honor diverse traditions, and pair mutual grace
                with transparent accountability.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('declaration')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1E3A8A] hover:bg-[#172D6B] dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E3A8A]"
              >
                <span>Read the Declaration</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('deliberation')}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-stone-800 dark:text-stone-200 bg-[#F2EFE9] hover:bg-[#E7E2D8] dark:bg-[#1D1B18] dark:hover:bg-[#272420] border border-stone-300 dark:border-stone-700 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
              >
                Propose an Alternative
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <ResilientImage
              src={HERO_FIGURE.src}
              alt={HERO_FIGURE.alt}
              figureNumber={HERO_FIGURE.figureNumber}
              caption={HERO_FIGURE.caption}
              aspectClass="aspect-[16/10] lg:h-full"
              className="flex-1 flex flex-col justify-between"
              priority
            />
          </div>
        </div>

        {/* Full-width 4-column institutional utility ribbon */}
        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-stone-200 dark:border-stone-800 pt-8 lg:grid-cols-4">
          <div className="space-y-1">
            <dt className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Governance Basis
            </dt>
            <dd className="text-sm font-medium text-stone-900 dark:text-stone-100">
              Voluntary Self-Governance
            </dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Knowledge Standard
            </dt>
            <dd className="text-sm font-medium text-stone-900 dark:text-stone-100">
              Open Access &amp; Plain Clarity
            </dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Constructive Proposals
            </dt>
            <dd className="font-mono text-sm font-medium tabular-nums text-stone-900 dark:text-stone-100">
              {alternativeCount} Active Alternatives
            </dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Public Signatories
            </dt>
            <dd className="font-mono text-sm font-medium tabular-nums text-stone-900 dark:text-stone-100">
              {endorsementCount} Endorsements
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
