import { TECHNOLOGY_PATTERNS } from '../constants';
import { VOCABULARY } from '../vocabulary/vocabulary';

/**
 * React the library, in a title: a poster who writes "React" there has chosen
 * the stack. "React Native" is deliberately included — it is still React.
 */
export const REACT_TITLE_ANCHORS = [/\breact\b/i] as const;

/**
 * React the library, in a body. A bare "react" is the English verb, and
 * "work with React engineers" describes the neighbours, not the job.
 */
export const REACT_BODY_ANCHORS = [
  /\breact\s*\.?js\b/i,
  /\breact\s*native\b/i,
  /\breact\s*[+/,]/i,
  /\breact\s+and\b/i,
  // "work with React engineers" describes the neighbours, not the job.
  /\b(?:with|in|using)\s+react\b(?!\s+(?:engineers?|developers?))/i,
  /\b(?:with|in|using)\s+react\b(?!\s+(?:devs?|teams?))/i,
  /\breact\s+(?:application|applications|app|apps|component|components|codebase|ecosystem|hooks|stack)\b/i,
] as const;

export const REACT_SUPPORT_TERMS = [
  /\breact\s*native\b/i,
  /\bjest\b/i,
  /\bmaterial[\s-]?ui\b|\bmui\b/i,
  /\btailwind\b/i,
  /\btypescript\b/i,
  /\bnext\s*\.?js\b/i,
  /\breact testing library\b|\b@testing-library\/react\b/i,
  /\bredux\b|\breact query\b|\btanstack query\b/i,
] as const;

export const REACT_SUPPORT_MINIMUM = 3;

/** A competing stack in the title outranks anything the body lists. */
export const REACT_TITLE_VETOES = [
  /\bangular\b/i,
  /\bvue\s*\.?js\b|\bvue\b/i,
  /\b\.net\b/i,
  /\bjava\b(?!script)/i,
  /\bdata\s+engineer(?:ing)?\b/i,
] as const;

/** The cloud half of the shared technology vocabulary, reused verbatim. */
export const CLOUD_SUPPORT_TERMS = TECHNOLOGY_PATTERNS.filter(
  (entry) => entry.kind === 'cloud',
).map((entry) => entry.pattern);

export const CLOUD_SUPPORT_MINIMUM = 2;

/** A title that names mobile work. The posting must still name a platform. */
export const MOBILE_TITLE_NAMES = [
  /\bmobile\b/i,
  /\bios\b/i,
  /\bandroid\b/i,
  /\breact\s*native\b/i,
  /\bflutter\b/i,
] as const;

/**
 * React Native and Flutter are absent on purpose: a cross-platform framework
 * says what the job is built with, not that the job targets a phone.
 */
export const MOBILE_TERMS = [/\bios\b/i, /\bandroid\b/i] as const;

/** Positions that test software rather than build it. */
export const QA_POSITIONS = [
  /\bqa\b|\bquality\s+assurance\b|\bsdet\b/i,
  /\btest(?:ing)?\s+(?:engineer|analyst|automation)\b/i,
] as const;

/** Positions that own or design a product rather than build it. */
export const PRODUCT_POSITIONS = [
  ...VOCABULARY.productTitle,
  /\bproduct\s+designer\b/i,
] as const;

/** A JVM language the poster chose: in a title, or anchoring a body. */
export const JAVA_ANCHORS = [/\bjava\b/i, /\bkotlin\b/i] as const;

/** One term per tool family, so "Spring Boot + Spring Data" counts once. */
export const JAVA_SUPPORT_TERMS = [
  /\bspring\b/i,
  /\bhibernate\b|\bjpa\b/i,
  /\bmaven\b|\bgradle\b/i,
  /\bquarkus\b/i,
  /\bmicronaut\b/i,
  /\bjunit\b|\bmockito\b/i,
  /\bjakarta\s*ee\b|\bj2ee\b|\bjava\s*ee\b/i,
  /\bktor\b/i,
] as const;

export const JAVA_SUPPORT_MINIMUM = 2;

/**
 * Java jobs the fork does not track, even with Java in the title: internships,
 * levels above senior, leadership, other disciplines, and mobile platforms,
 * which Mobile keeps. "Staff augmentation" is an engagement, not a level.
 */
export const JAVA_EXCLUDED_POSITIONS = [
  /\bintern(?:ship)?s?\b|\bestagi(?:o|ari[oa])\b/i,
  /\bstaff\b(?![\s-]+augmentation)/i,
  /\bprincipal\b|\bespecialista\b/i,
  /\blead\b|\blider\b/i,
  /\barchitect\b|\barquitet[oa]\b/i,
  /\bmanager\b|\bgerente\b|\bhead\b|\bdirector\b|\bdiretor(?:a)?\b/i,
  ...QA_POSITIONS,
  /\bdata\s+engineer(?:ing)?\b|\bengenheir[oa]\s+de\s+dados\b/i,
  /\bandroid\b|\bios\b|\bmobile\b|\bmultiplatform\b|\bkmp\b/i,
] as const;

/**
 * A title that names another stack or discipline and no JVM language. A
 * leading `\b` would miss " .NET", whose dot is not a word character.
 */
export const JAVA_TITLE_VETOES = [
  /\bpython\b/i,
  /\bgo(?:lang)?\b/i,
  /\.net\b|\bdotnet\b|\bc#/i,
  /\bruby\b|\brails\b/i,
  /\bphp\b|\blaravel\b/i,
  /\bnode(?:\.?js)?\b/i,
  /\breact\b|\bangular\b|\bvue(?:\.?js)?\b/i,
  /\bfront[-\s]?end\b/i,
  ...VOCABULARY.cloudOpsTitle,
] as const;
