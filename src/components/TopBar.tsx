import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface TopBarProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'broadcast', label: 'Nov 21 Event' },
  { id: 'declaration', label: 'Declaration' },
  { id: 'deliberation', label: 'Deliberation' },
  { id: 'accountability', label: 'Accountability' },
  { id: 'endorse', label: 'Endorsements' },
];

export function TopBar({ onNavigate }: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 dark:border-stone-800 bg-[#FBF9F5]/95 dark:bg-[#141311]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('top');
          }}
          className="font-serif text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-blue-400 rounded-sm"
        >
          Dragon Nine Protocol
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-blue-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('sign-charter')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-medium tracking-wide text-white bg-[#1E3A8A] hover:bg-[#172D6B] dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E3A8A]"
          >
            Endorse Charter
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center p-2.5 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-800 rounded-md min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311] px-6 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className="py-3 text-sm font-medium text-stone-800 dark:text-stone-200 border-b border-stone-200/70 dark:border-stone-800/70"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => handleLinkClick('sign-charter')}
              className="mt-3 w-full py-3 px-4 text-sm font-medium text-white bg-[#1E3A8A] hover:bg-[#172D6B] dark:bg-blue-700 rounded-md"
            >
              Endorse Charter
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
