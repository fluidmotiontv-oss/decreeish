import { useEffect, useState } from 'react';
import { AccountabilityGuide } from './components/AccountabilityGuide';
import { CharterReader } from './components/CharterReader';
import { EndorsementLedger } from './components/EndorsementLedger';
import { FeaturedBroadcast } from './components/FeaturedBroadcast';
import { HeroSection } from './components/HeroSection';
import { ParticipatoryWorkbench } from './components/ParticipatoryWorkbench';
import { TopBar } from './components/TopBar';
import {
  INITIAL_ACCOUNTABILITY_CASES,
  INITIAL_DELIBERATIONS,
  INITIAL_ENDORSEMENTS,
} from './data/charterData';
import {
  AccountabilityCase,
  CommunityEndorsement,
  ConstructiveAlternative,
  DeliberationTopic,
  ReadingMode,
} from './types/protocol';

const STORAGE_KEYS = {
  deliberations: 'dnp_deliberations_v1',
  supported: 'dnp_supported_alts_v1',
  cases: 'dnp_accountability_cases_v1',
  endorsements: 'dnp_endorsements_v1',
  theme: 'dnp_theme_v1',
};

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEYS.theme) === 'dark';
    } catch {
      return false;
    }
  });

  const [readingMode, setReadingMode] = useState<ReadingMode>('charter');

  const [deliberations, setDeliberations] = useState<DeliberationTopic[]>(() =>
    readStored(STORAGE_KEYS.deliberations, INITIAL_DELIBERATIONS)
  );
  const [supportedIds, setSupportedIds] = useState<string[]>(() =>
    readStored(STORAGE_KEYS.supported, [])
  );
  const [accountabilityCases, setAccountabilityCases] = useState<AccountabilityCase[]>(() =>
    readStored(STORAGE_KEYS.cases, INITIAL_ACCOUNTABILITY_CASES)
  );
  const [endorsements, setEndorsements] = useState<CommunityEndorsement[]>(() =>
    readStored(STORAGE_KEYS.endorsements, INITIAL_ENDORSEMENTS)
  );

  useEffect(() => {
    const activeUrl =
      window.location.hostname === 'fluidmotiontv.site' ||
      window.location.hostname === 'www.fluidmotiontv.site'
        ? 'https://fluidmotiontv.site/'
        : window.location.origin + window.location.pathname;

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.href = activeUrl;
    }
    const ogUrlEl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrlEl) {
      ogUrlEl.content = activeUrl;
    }
    const twitterUrlEl = document.querySelector<HTMLMetaElement>('meta[name="twitter:url"]');
    if (twitterUrlEl) {
      twitterUrlEl.content = activeUrl;
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(STORAGE_KEYS.theme, isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage quota errors
    }
  }, [isDark]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.deliberations, JSON.stringify(deliberations));
    } catch {
      // Ignore storage errors
    }
  }, [deliberations]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.supported, JSON.stringify(supportedIds));
    } catch {
      // Ignore storage errors
    }
  }, [supportedIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.cases, JSON.stringify(accountabilityCases));
    } catch {
      // Ignore storage errors
    }
  }, [accountabilityCases]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.endorsements, JSON.stringify(endorsements));
    } catch {
      // Ignore storage errors
    }
  }, [endorsements]);

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleSupport = (topicId: string, altId: string) => {
    const alreadySupported = supportedIds.includes(altId);
    setSupportedIds((prev) =>
      alreadySupported ? prev.filter((id) => id !== altId) : [...prev, altId]
    );
    setDeliberations((prev) =>
      prev.map((topic) =>
        topic.id !== topicId
          ? topic
          : {
              ...topic,
              alternatives: topic.alternatives.map((alt) =>
                alt.id !== altId
                  ? alt
                  : {
                      ...alt,
                      supportCount: Math.max(0, alt.supportCount + (alreadySupported ? -1 : 1)),
                    }
              ),
            }
      )
    );
  };

  const handleAddAlternative = (
    topicId: string,
    alternative: Omit<ConstructiveAlternative, 'id' | 'supportCount' | 'createdAt'>
  ) => {
    const today = new Date().toISOString().slice(0, 10);
    const newAlt: ConstructiveAlternative = {
      ...alternative,
      id: `alt-${Date.now()}`,
      supportCount: 1,
      createdAt: today,
    };
    setSupportedIds((prev) => [...prev, newAlt.id]);
    setDeliberations((prev) =>
      prev.map((topic) =>
        topic.id !== topicId
          ? topic
          : {
              ...topic,
              alternatives: [newAlt, ...topic.alternatives],
            }
      )
    );
  };

  const handleAddAccountabilityCase = (
    newCase: Omit<AccountabilityCase, 'id' | 'reference' | 'dateRecorded'>
  ) => {
    const today = new Date().toISOString().slice(0, 10);
    const nextNum = String(accountabilityCases.length + 10).padStart(2, '0');
    const created: AccountabilityCase = {
      ...newCase,
      id: `case-${Date.now()}`,
      reference: `REV-2026-${nextNum}`,
      dateRecorded: today,
    };
    setAccountabilityCases((prev) => [created, ...prev]);
  };

  const handleAddEndorsement = (
    endorsement: Omit<CommunityEndorsement, 'id' | 'dateSigned'>
  ) => {
    const today = new Date().toISOString().slice(0, 10);
    const created: CommunityEndorsement = {
      ...endorsement,
      id: `end-${Date.now()}`,
      dateSigned: today,
    };
    setEndorsements((prev) => [created, ...prev]);
  };

  const totalAlternatives = deliberations.reduce(
    (sum, topic) => sum + topic.alternatives.length,
    0
  );

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#141311] text-stone-900 dark:text-stone-100 antialiased selection:bg-[#1E3A8A]/15 selection:text-stone-900 dark:selection:bg-blue-500/30 dark:selection:text-stone-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#1E3A8A] focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>

      <TopBar onNavigate={navigateToSection} />

      <main id="main-content">
        <HeroSection
          endorsementCount={endorsements.length}
          alternativeCount={totalAlternatives}
          onNavigate={navigateToSection}
        />

        <FeaturedBroadcast />

        <CharterReader
          readingMode={readingMode}
          onChangeReadingMode={setReadingMode}
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
        />

        <ParticipatoryWorkbench
          deliberations={deliberations}
          supportedIds={supportedIds}
          onToggleSupport={handleToggleSupport}
          onAddAlternative={handleAddAlternative}
        />

        <AccountabilityGuide
          cases={accountabilityCases}
          onAddCase={handleAddAccountabilityCase}
        />

        <EndorsementLedger
          endorsements={endorsements}
          onAddEndorsement={handleAddEndorsement}
        />
      </main>

      <footer className="border-t border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141311]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between text-xs text-stone-500 dark:text-stone-400">
          <div>
            Fluid Motion TV · fluidmotiontv.site · Dragon Nine Protocol Framework
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#broadcast"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('broadcast');
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Nov 21 Event
            </a>
            <a
              href="#declaration"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('declaration');
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Declaration
            </a>
            <a
              href="#deliberation"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('deliberation');
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Alternatives
            </a>
            <a
              href="#accountability"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('accountability');
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Accountability
            </a>
            <a
              href="#endorse"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('endorse');
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Endorsements
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
