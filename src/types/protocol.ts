export type ReadingMode = 'charter' | 'digest';

export type PillarCategory =
  | 'All'
  | 'Self-Governance'
  | 'Pluralism'
  | 'Open Knowledge'
  | 'Accountability';

export interface MarginAnnotation {
  reference: string;
  heading: string;
  body: string;
}

export interface CharterSection {
  id: string;
  indexLabel: string;
  navLabel: string;
  title: string;
  pillar: Exclude<PillarCategory, 'All'>;
  paragraphs: string[];
  plainDigest: {
    summary: string;
    keyTakeaways: string[];
  };
  pullQuote?: string;
  marginNotes: MarginAnnotation[];
  figure?: {
    src: string;
    alt: string;
    caption: string;
    figureNumber: string;
  };
}

export interface ConstructiveAlternative {
  id: string;
  title: string;
  author: string;
  traditionOrRole: string;
  proposalText: string;
  analyticalRationale: string;
  accessibilityNote: string;
  supportCount: number;
  createdAt: string;
}

export interface DeliberationTopic {
  id: string;
  code: string;
  pillar: Exclude<PillarCategory, 'All'>;
  title: string;
  context: string;
  predefinedOptions: string[];
  alternatives: ConstructiveAlternative[];
}

export interface AccountabilityCriteria {
  systemicVsMaliceNote: string;
  barriersIdentified: string[];
  evidenceSummary: string;
  rehabilitativePath: string;
}

export interface AccountabilityCase {
  id: string;
  reference: string;
  subject: string;
  dateRecorded: string;
  contextSummary: string;
  criteria: AccountabilityCriteria;
}

export type EndorsementDiscipline =
  | 'All'
  | 'Community Member'
  | 'Educator & Researcher'
  | 'Creative & Media'
  | 'Civic & Restorative';

export interface CommunityEndorsement {
  id: string;
  name: string;
  discipline: Exclude<EndorsementDiscipline, 'All'>;
  locationOrContext: string;
  statement: string;
  dateSigned: string;
}
