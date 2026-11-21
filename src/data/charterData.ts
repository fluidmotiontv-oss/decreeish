import {
  AccountabilityCase,
  CharterSection,
  CommunityEndorsement,
  DeliberationTopic,
} from '../types/protocol';

export const HERO_FIGURE = {
  src: '/src/assets/images/hero_charter_library_1795273668655.jpg',
  alt: 'Sunlight illuminating an open archival charter volume and brass compass on a honed oak table inside a quiet limestone archive hall',
  figureNumber: 'Fig. 1',
  caption:
    'Fig. 1 — Archival study table representing transparent public access to foundational records and calm deliberation.',
};

export const CHARTER_SECTIONS: CharterSection[] = [
  {
    id: 'preamble',
    indexLabel: '00',
    navLabel: 'Preamble',
    title: 'Declaration of Goodwill and Constructive Purpose',
    pillar: 'Self-Governance',
    paragraphs: [
      'This declaration—the Fluid Motion TV Dragon Nine Protocol framework—is extended to all individuals, recognizing diverse perspectives while extending a message of goodwill and respect. Recognizing that existing structures may not serve everyone equally, this initiative is dedicated to fostering community well-being, mutual support, and constructive solutions to address systemic challenges.',
    ],
    plainDigest: {
      summary:
        'An open declaration inviting everyone, across differing backgrounds and viewpoints, to work together respectfully toward fairer systems and shared community care.',
      keyTakeaways: [
        'Extends goodwill and respect to every participant regardless of background.',
        'Acknowledges that existing institutions do not always serve everyone equitably.',
        'Commits to practical, constructive solutions anchored in mutual support.',
      ],
    },
    marginNotes: [
      {
        reference: 'Scope 00.1',
        heading: 'Universal Extension',
        body: 'Participation begins with goodwill rather than prior alignment. Diverse perspectives are treated as essential civic inputs.',
      },
      {
        reference: 'Scope 00.2',
        heading: 'Constructive Orientation',
        body: 'Critique of systemic gaps is always paired with actionable, community-centered alternatives.',
      },
    ],
  },
  {
    id: 'self-governance',
    indexLabel: '01',
    navLabel: 'Self-Governance',
    title: 'Core Philosophy and Self-Governance',
    pillar: 'Self-Governance',
    paragraphs: [
      'This framework affirms that true governance and integrity originate from within, balancing core values, conscious deliberation, and analytical logic to maintain personal responsibility and authentic self-governance. By prioritizing open access to true information and educational resources, it seeks to empower individuals to participate meaningfully in collective decision-making. Emphasizing healing from past harms and upholding personal autonomy, it invites voluntary participation in building a supportive, harmonious future grounded in shared responsibility.',
    ],
    plainDigest: {
      summary:
        'Lasting integrity starts with personal responsibility—combining ethical values, thoughtful reflection, and clear logic—while protecting individual autonomy and healing.',
      keyTakeaways: [
        'Self-governance rests on three pillars: core values, conscious deliberation, and analytical logic.',
        'Informed participation requires open access to accurate facts and educational materials.',
        'Involvement is strictly voluntary and respects healing from past harms.',
      ],
    },
    pullQuote:
      'True governance and integrity originate from within, balancing core values, conscious deliberation, and analytical logic.',
    marginNotes: [
      {
        reference: 'Triad 01.A',
        heading: 'The Internal Triad',
        body: 'Values set ethical direction; conscious deliberation guards against impulse; analytical logic tests coherence against real-world evidence.',
      },
      {
        reference: 'Autonomy 01.B',
        heading: 'Voluntary Covenant',
        body: 'Coercion undermines genuine responsibility. Every commitment inside this protocol remains freely chosen.',
      },
    ],
  },
  {
    id: 'participatory-pluralism',
    indexLabel: '02',
    navLabel: 'Pluralism',
    title: 'Participatory Decision-Making and Pluralism',
    pillar: 'Pluralism',
    paragraphs: [
      'Affirming that significant decisions shape our collective future, this framework advocates for inclusive dialogue, ensuring that comprehensive information and educational resources are made universally accessible prior to determining a path forward. It establishes that the direction of society should be guided by collective insight, empowering individuals not merely to choose between predefined options, but to actively propose and develop constructive alternatives.',
      'Furthermore, this initiative values pluralism—ensuring that while foundational knowledge is broadly accessible to all, specialized disciplines, traditions, and cultural practices are preserved and respected. This commitment to participatory governance ensures that governance remains a shared responsibility, rooted in the collective wisdom and active contribution of all members of society.',
    ],
    plainDigest: {
      summary:
        'Before big decisions are made, everyone should have the same clear facts—and the freedom to invent better choices rather than picking from a narrow menu.',
      keyTakeaways: [
        'Educational access comes before voting or policy adoption.',
        'Contributors can author new alternatives instead of being limited to pre-set options.',
        'Pluralism protects cultural traditions and specialized crafts alongside shared civic literacy.',
      ],
    },
    figure: {
      src: '/src/assets/images/pluralism_traditions_study_1795273668988.jpg',
      alt: 'Overhead museum-style study of handwoven indigo textile, ceramic tea vessel, timber joinery, and open botanical and mathematical notebooks on limestone',
      figureNumber: 'Fig. 2',
      caption:
        'Fig. 2 — Material study of pluralism: shared foundational notebooks alongside distinct craft, cultural, and analytical traditions.',
    },
    marginNotes: [
      {
        reference: 'Design 02.A',
        heading: 'Beyond Binary Menus',
        body: 'Predefined ballots constrain imagination. Any participant may introduce a documented constructive alternative.',
      },
      {
        reference: 'Culture 02.B',
        heading: 'Preserving Plural Traditions',
        body: 'Universal accessibility never requires erasing specialized knowledge, local customs, or cultural stewardship.',
      },
    ],
  },
  {
    id: 'knowledge-clarity',
    indexLabel: '03',
    navLabel: 'Open Knowledge',
    title: 'Access to Knowledge and Clarity',
    pillar: 'Open Knowledge',
    paragraphs: [
      'Recognizing that informed participation is essential, this initiative is dedicated to making true information and educational resources freely and easily accessible. By simplifying complex concepts, it seeks to empower individuals with the understanding necessary to participate meaningfully in community life. This commitment to transparent communication ensures that the path forward is grounded in clarity, honesty, and accessible knowledge for all.',
    ],
    plainDigest: {
      summary:
        'Complex ideas should be explained plainly and shared freely so that no one is shut out of community decisions by jargon or paywalls.',
      keyTakeaways: [
        'True information and learning tools remain free and easy to reach.',
        'Plain-language translation is a core duty, not an afterthought.',
        'Honest, transparent communication builds durable public trust.',
      ],
    },
    marginNotes: [
      {
        reference: 'Standard 03.A',
        heading: 'Plain-Language Parity',
        body: 'Every technical proposal in this workspace is paired with a plain-language digest so specialized terms never act as gatekeepers.',
      },
    ],
  },
  {
    id: 'mutual-grace',
    indexLabel: '04',
    navLabel: 'Accountability',
    title: 'Mutual Grace, Accountability, and Amnesty',
    pillar: 'Accountability',
    paragraphs: [
      'Recognizing that limitations in knowledge or conduct often stem from systemic shortcomings rather than individual malice, this initiative promotes a spirit of forgiveness and collective learning. It affirms that moving forward requires extending patience to those seeking to grow, focusing on rehabilitation and the shared endeavor of building a wiser, more compassionate community together. At the same time, fairness and public accountability remain essential, ensuring that claims and actions are evaluated with transparency, evidence, and care for those facing communication or recovery barriers.',
    ],
    plainDigest: {
      summary:
        'People often stumble because systems fail them, not out of malice—so we lead with patience and rehabilitation while keeping accountability fair, transparent, and evidence-based.',
      keyTakeaways: [
        'Distinguishes systemic gaps from intentional harm.',
        'Prioritizes collective learning, patience, and rehabilitation.',
        'Evaluates claims strictly with evidence, transparency, and care for communication or recovery barriers.',
      ],
    },
    pullQuote:
      'Fairness and public accountability remain essential, ensuring that claims and actions are evaluated with transparency, evidence, and care.',
    figure: {
      src: '/src/assets/images/civic_dialogue_forum_1795273668924.jpg',
      alt: 'Curved natural oak seating circle inside a sunlit alabaster and travertine community forum where participants read and converse calmly',
      figureNumber: 'Fig. 3',
      caption:
        'Fig. 3 — Civic dialogue forum designed for unhurried listening, transparent inquiry, and restorative conversation.',
    },
    marginNotes: [
      {
        reference: 'Care 04.A',
        heading: 'Barrier-Aware Review',
        body: 'Evaluators explicitly check whether neurodivergence, trauma recovery, language access, or resource gaps affected communication before drawing conclusions.',
      },
      {
        reference: 'Proof 04.B',
        heading: 'Evidence Over Rumor',
        body: 'Amnesty and grace coexist with factual rigor: claims are tested against verifiable records rather than assumption.',
      },
    ],
  },
  {
    id: 'open-invitation',
    indexLabel: '05',
    navLabel: 'Invitation',
    title: 'An Open Invitation',
    pillar: 'Self-Governance',
    paragraphs: [
      'All who seek positive change and mutual support are invited to participate in this path toward personal and collective renewal. Embracing this transition is a matter of individual choice, offering an opportunity to align with principles of integrity, mutual respect, and constructive engagement. Support and solidarity are offered to all who wish to join in building a foundation for a more supportive and harmonious future.',
    ],
    plainDigest: {
      summary:
        'Anyone seeking positive change and mutual support is welcome to step in freely, at their own pace, with community solidarity alongside them.',
      keyTakeaways: [
        'Entry is open to all who act in good faith.',
        'Alignment is an individual choice free of coercion.',
        'Solidarity and support accompany every step toward renewal.',
      ],
    },
    marginNotes: [
      {
        reference: 'Access 05.A',
        heading: 'Open Threshold',
        body: 'No credential or institutional status is required to contribute constructive proposals or affirm the charter.',
      },
    ],
  },
  {
    id: 'community-endorsement',
    indexLabel: '06',
    navLabel: 'Endorsement',
    title: 'Community Endorsement',
    pillar: 'Pluralism',
    paragraphs: [
      'We, the contributors and supporters of this framework, stand together in affirming these principles of shared responsibility, open knowledge, and mutual grace. By committing to transparent dialogue and active participation, we dedicate ourselves to supporting one another and building a resilient, equitable community for generations to come.',
    ],
    plainDigest: {
      summary:
        'Contributors and supporters publicly affirm shared responsibility, open knowledge, and mutual grace for present and future generations.',
      keyTakeaways: [
        'Commits signatories to transparent dialogue and active participation.',
        'Grounds long-term resilience in intergenerational care.',
      ],
    },
    marginNotes: [
      {
        reference: 'Record 06.A',
        heading: 'Living Registry',
        body: 'Signatories below record their discipline, perspective, and personal commitment as part of the public commons.',
      },
    ],
  },
];

export const INITIAL_DELIBERATIONS: DeliberationTopic[] = [
  {
    id: 'delib-knowledge-commons',
    code: 'DNP-01',
    pillar: 'Open Knowledge',
    title: 'Pre-Decision Educational Briefings for Community Proposals',
    context:
      'Before any community-wide decision proceeds to consensus or polling, contributors often encounter dense technical documents that favor specialists over everyday residents.',
    predefinedOptions: [
      'Option A: Publish the full technical draft 7 days prior to voting.',
      'Option B: Require an executive summary written by the original author.',
    ],
    alternatives: [
      {
        id: 'alt-1',
        title: 'Dual-Layer Plain-Language & Visual Primer Standard',
        author: 'Miriam Vance',
        traditionOrRole: 'Public Literacy Educator',
        proposalText:
          'Pair every technical policy draft with a community-reviewed Plain-Language Primer, audio narration, and worked local examples released 14 days before deliberation opens.',
        analyticalRationale:
          'Separates factual comprehension from specialist vocabulary, allowing participants with varied reading speeds or accessibility needs to formulate informed alternatives.',
        accessibilityNote:
          'Includes high-contrast printable leaflets and plain-English audio summaries for non-native speakers and screen-reader users.',
        supportCount: 28,
        createdAt: '2026-10-14',
      },
    ],
  },
  {
    id: 'delib-plural-stewardship',
    code: 'DNP-02',
    pillar: 'Pluralism',
    title: 'Protecting Specialized Craft & Cultural Protocols in Shared Spaces',
    context:
      'Shared digital and physical commons frequently flatten local cultural practices into a single uniform rulebook, eroding distinct lineages of stewardship.',
    predefinedOptions: [
      'Option A: Adopt a single standardized governance template for all groups.',
      'Option B: Allow informal exceptions handled on an ad-hoc basis.',
    ],
    alternatives: [
      {
        id: 'alt-2',
        title: 'Federated Pluralism Charters with Shared Core Safeguards',
        author: 'Kenji Takahashi',
        traditionOrRole: 'Architectural Craft & Guild Archivist',
        proposalText:
          'Maintain a universal baseline of transparency, non-coercion, and open safety standards while granting each cultural or craft circle autonomy over its internal pedagogy and rituals.',
        analyticalRationale:
          'Preserves specialized mastery and cultural dignity without sacrificing interoperability or mutual accountability across the broader community.',
        accessibilityNote:
          'Publishes clear boundary maps showing where universal community rights apply and where tradition-specific stewardship governs.',
        supportCount: 34,
        createdAt: '2026-10-29',
      },
    ],
  },
  {
    id: 'delib-restorative-review',
    code: 'DNP-03',
    pillar: 'Accountability',
    title: 'Evaluating Conduct Disputes Under Communication or Recovery Barriers',
    context:
      'Standard moderation queues often treat delayed responses, missed deadlines, or blunt phrasing as bad faith without accounting for medical recovery or communication differences.',
    predefinedOptions: [
      'Option A: Enforce automatic 48-hour response deadlines for all disputes.',
      'Option B: Suspend all review activity indefinitely when a barrier is cited.',
    ],
    alternatives: [
      {
        id: 'alt-3',
        title: 'Barrier-Aware Fact Finding with Paired Advocate & Grace Window',
        author: 'Dr. Nadia Osei',
        traditionOrRole: 'Restorative Mediator',
        proposalText:
          'Establish an evidence-first timeline separated from tone policing: assign a neutral communication liaison, extend flexible response windows for documented recovery needs, and prioritize restorative repair.',
        analyticalRationale:
          'Protects both evidentiary rigor and human dignity—preventing systemic communication barriers from being misread as malice while keeping unresolved harm visible.',
        accessibilityNote:
          'Supports asynchronous written, voice-note, or supported advocate submissions in place of adversarial live hearings.',
        supportCount: 41,
        createdAt: '2026-11-08',
      },
    ],
  },
];

export const INITIAL_ACCOUNTABILITY_CASES: AccountabilityCase[] = [
  {
    id: 'case-01',
    reference: 'REV-2026-04',
    subject: 'Incomplete Financial Archive Handover During Volunteer Transition',
    dateRecorded: '2026-10-21',
    contextSummary:
      'Outgoing volunteer treasurer missed two quarterly ledger uploads following an unexpected family medical emergency, prompting concern over missing receipts.',
    criteria: {
      systemicVsMaliceNote:
        'Ledger gap traced to single-person custody without automated backup rather than intentional concealment; all bank deposits matched verified receipts once recovered.',
      barriersIdentified: [
        'Single-custodian workflow bottleneck',
        'Acute caregiver medical recovery window',
      ],
      evidenceSummary:
        'Cross-checked 14 months of bank statements against community workshop invoices; zero unauthorized disbursements found ($0.00 variance).',
      rehabilitativePath:
        'Granted formal amnesty from penalty; transitioned archive to dual-steward monthly reconciliation with plain-language public summaries.',
    },
  },
  {
    id: 'case-02',
    reference: 'REV-2026-09',
    subject: 'Jargon-Heavy Policy Rollout Excluding Non-Specialist Contributors',
    dateRecorded: '2026-11-03',
    contextSummary:
      'A working group published a 22-page technical bylaws update with 72 hours for feedback, leaving several community circles unable to parse key obligations.',
    criteria: {
      systemicVsMaliceNote:
        'Working group followed inherited bureaucratic templates without realizing the barrier created for newcomers and multilingual members.',
      barriersIdentified: [
        'Dense legalistic phrasing without plain-language digest',
        'Compressed 72-hour consultation window',
      ],
      evidenceSummary:
        'Review of thread timestamps showed 0 comments from non-legal circles prior to deadline despite high interest in the underlying resource allocation.',
      rehabilitativePath:
        'Pause ratification; co-author a 1-page clarity guide with community editors and reopen participatory alternatives for 14 days.',
    },
  },
];

export const INITIAL_ENDORSEMENTS: CommunityEndorsement[] = [
  {
    id: 'end-1',
    name: 'Fluid Motion TV Editorial Collective',
    discipline: 'Creative & Media',
    locationOrContext: 'Founding Charter Stewardship',
    statement:
      'We commit to keeping foundational knowledge clear, open, and free of gatekeeping while honoring diverse voices across every broadcast and community table.',
    dateSigned: '2026-10-01',
  },
  {
    id: 'end-2',
    name: 'Elena Rostova',
    discipline: 'Educator & Researcher',
    locationOrContext: 'Open Curriculum Working Group',
    statement:
      'Plain-language clarity transforms passive audiences into self-governing peers capable of building constructive alternatives together.',
    dateSigned: '2026-10-12',
  },
  {
    id: 'end-3',
    name: 'Marcus Bellweather',
    discipline: 'Civic & Restorative',
    locationOrContext: 'Community Mediation Circle',
    statement:
      'Pairing transparent evidence with genuine care for recovery and communication barriers is how communities heal without abandoning accountability.',
    dateSigned: '2026-10-27',
  },
  {
    id: 'end-4',
    name: 'Soraia Mendes',
    discipline: 'Community Member',
    locationOrContext: 'Local Craft & Mutual Aid Network',
    statement:
      'I endorse the voluntary, pluralistic spirit of the Dragon Nine Protocol—protecting distinct traditions while sharing tools for collective well-being.',
    dateSigned: '2026-11-11',
  },
];

export function buildCharterMarkdown(endorsements: CommunityEndorsement[]): string {
  const sectionsMd = CHARTER_SECTIONS.map(
    (s) => `## ${s.indexLabel}. ${s.title}\n\n${s.paragraphs.join('\n\n')}`
  ).join('\n\n---\n\n');

  const endorsementsMd = endorsements
    .map(
      (e) =>
        `- **${e.name}** (${e.discipline} — ${e.locationOrContext}, ${e.dateSigned}): "${e.statement}"`
    )
    .join('\n');

  return `# THE FLUID MOTION TV DRAGON NINE PROTOCOL FRAMEWORK\n\n${sectionsMd}\n\n---\n\n## Recorded Community Endorsements (${endorsements.length})\n\n${endorsementsMd}\n`;
}
