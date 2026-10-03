import {
  classifyJob,
  type ClassifyJobInput,
} from '../classification/classify-job';
import {
  JAVA_ROLE_FOCUS,
  PLATFORM_ROLE_FOCUS,
} from '../classification/constants';
import type { JobClassification } from '../classification/types';
import {
  MAX_NORMALIZED_SCORE,
  MIN_NORMALIZED_SCORE,
  SCORE_WEIGHTS,
} from './constants';
import type { JobScore } from './types';

type ScoreJobInput = ClassifyJobInput & { seniority?: string };

const scoringSeniority = (
  seniority: string | undefined,
): JobClassification['seniority'] =>
  seniority === 'junior' ||
  seniority === 'mid' ||
  seniority === 'senior' ||
  seniority === 'staff' ||
  seniority === 'principal'
    ? seniority
    : undefined;

const normalizeScore = (rawScore: number): number =>
  Math.max(MIN_NORMALIZED_SCORE, Math.min(MAX_NORMALIZED_SCORE, rawScore));

type ScoreSignal = {
  reason: string;
  weight: number;
  applies: (classification: JobClassification) => boolean;
};

const isOnJavaLane = (classification: JobClassification): boolean =>
  classification.roleFocus.includes(JAVA_ROLE_FOCUS);

/** Every non-technology, non-seniority signal, in the order it is reported. */
const CLASSIFICATION_SIGNALS: readonly ScoreSignal[] = [
  {
    reason: 'Frontend',
    weight: SCORE_WEIGHTS.roleFocus.frontend,
    applies: (classification) => classification.roleFocus.includes('frontend'),
  },
  {
    reason: 'Fullstack',
    weight: SCORE_WEIGHTS.roleFocus.fullstack,
    applies: (classification) => classification.roleFocus.includes('fullstack'),
  },
  {
    reason: 'Backend',
    weight: SCORE_WEIGHTS.roleFocus.backend,
    applies: (classification) =>
      isOnJavaLane(classification) &&
      classification.roleFocus.includes('backend'),
  },
  {
    reason: 'Platform',
    weight: SCORE_WEIGHTS.roleFocus.platform,
    applies: (classification) =>
      classification.roleFocus.includes(PLATFORM_ROLE_FOCUS),
  },
  {
    reason: 'Remote',
    weight: SCORE_WEIGHTS.remote,
    applies: (classification) => classification.remotePolicy === 'remote',
  },
  {
    reason: 'On-site only',
    weight: SCORE_WEIGHTS.onsiteOnly,
    applies: (classification) => classification.remotePolicy === 'onsite',
  },
  {
    reason: 'Brazil',
    weight: SCORE_WEIGHTS.geography.brazil,
    applies: (classification) => classification.geography.includes('brazil'),
  },
  {
    reason: 'LATAM',
    weight: SCORE_WEIGHTS.geography.latam,
    applies: (classification) => classification.geography.includes('latam'),
  },
  {
    reason: 'Americas',
    weight: SCORE_WEIGHTS.geography.americas,
    applies: (classification) => classification.geography.includes('americas'),
  },
  {
    reason: 'Relocation required',
    weight: SCORE_WEIGHTS.relocationRequired,
    applies: (classification) => classification.requiresRelocation,
  },
  {
    reason: 'Contractor',
    weight: SCORE_WEIGHTS.contractor,
    applies: (classification) =>
      isOnJavaLane(classification) && classification.isContractor,
  },
  {
    reason: 'Work authorization required',
    weight: SCORE_WEIGHTS.workAuthorizationRequired,
    applies: (classification) =>
      isOnJavaLane(classification) && classification.requiresWorkAuthorization,
  },
  {
    reason: 'Unrelated stack',
    weight: SCORE_WEIGHTS.unrelatedStack,
    applies: (classification) => classification.isUnrelatedStack,
  },
  {
    reason: 'Unrelated role',
    weight: SCORE_WEIGHTS.unrelatedRole,
    applies: (classification) => classification.isUnrelatedRole,
  },
];

/**
 * A lane with its own technology table. Any other job, on React or no lane,
 * is paid by the React table.
 */
const LANE_TECHNOLOGY_WEIGHTS = [
  [PLATFORM_ROLE_FOCUS, SCORE_WEIGHTS.cloudTechnologies],
  [JAVA_ROLE_FOCUS, SCORE_WEIGHTS.javaTechnologies],
] as const;

const technologySignals = (
  classification: JobClassification,
): Omit<ScoreSignal, 'applies'>[] => {
  const technologyWeights: Readonly<Record<string, number>> =
    LANE_TECHNOLOGY_WEIGHTS.find(([lane]) =>
      classification.roleFocus.includes(lane),
    )?.[1] ?? SCORE_WEIGHTS.technologies;

  return Object.entries(technologyWeights)
    .filter(([name]) => classification.technologies.includes(name))
    .map(([name, weight]) => ({ reason: name, weight }));
};

/** Principal has no reason: it is neither rewarded nor penalized. */
const SENIORITY_REASONS = [
  ['senior', 'Senior'],
  ['staff', 'Staff'],
  ['mid', 'Mid-level'],
  ['junior', 'Junior'],
] as const;

const senioritySignals = (
  classification: JobClassification,
): Omit<ScoreSignal, 'applies'>[] => {
  const seniorityWeights = isOnJavaLane(classification)
    ? SCORE_WEIGHTS.javaSeniority
    : SCORE_WEIGHTS.seniority;

  return SENIORITY_REASONS.filter(
    ([level]) => classification.seniority === level,
  ).map(([level, reason]) => ({ reason, weight: seniorityWeights[level] }));
};

const scoreClassification = (classification: JobClassification): JobScore => {
  const signals = [
    ...technologySignals(classification),
    ...senioritySignals(classification),
    ...CLASSIFICATION_SIGNALS.filter((signal) =>
      signal.applies(classification),
    ),
  ];
  const rawScore = signals.reduce((sum, signal) => sum + signal.weight, 0);

  return {
    rawScore,
    score: normalizeScore(rawScore),
    reasons: signals.map((signal) => signal.reason),
  };
};

export const scoreJob = (input: ScoreJobInput): JobScore => {
  const classification = classifyJob(input);
  return scoreClassification({
    ...classification,
    seniority: classification.seniority ?? scoringSeniority(input.seniority),
  });
};

export const scoreClassifiedJob = (
  classification: JobClassification,
  seniorityFallback?: string,
): JobScore =>
  scoreClassification({
    ...classification,
    seniority: classification.seniority ?? scoringSeniority(seniorityFallback),
  });
