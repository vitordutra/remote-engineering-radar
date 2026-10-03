/**
 * Max age for jobs shown in reports and kept active after ingest. Starts equal
 * to the hiring-signal window but is a separate policy: retuning how far back a
 * signal looks must not silently change what the site serves.
 */
export const JOB_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30;

export const REMOTE_POLICY_REMOTE = 'remote' as const;

export const JOB_SORT_OPTIONS = ['newest', 'relevance'] as const;
export type JobSort = (typeof JOB_SORT_OPTIONS)[number];
export const DEFAULT_JOB_SORT: JobSort = 'newest';

/**
 * How long a deactivated job is kept before it is deleted. Twice the display
 * window, so hiring-signal history stays intact while the table stops growing
 * without bound.
 */
export const JOB_RETENTION_MS = 1000 * 60 * 60 * 24 * 60;

export const JOB_COUNTRY_FILTER_OPTIONS = [
  { slug: 'brazil', label: 'Brazil' },
  { slug: 'chile', label: 'Chile' },
  { slug: 'argentina', label: 'Argentina' },
  { slug: 'mexico', label: 'Mexico' },
  { slug: 'colombia', label: 'Colombia' },
  { slug: 'united-states', label: 'United States' },
  { slug: 'ukraine', label: 'Ukraine' },
  { slug: 'india', label: 'India' },
  { slug: 'egypt', label: 'Egypt' },
  { slug: 'pakistan', label: 'Pakistan' },
  { slug: 'latam', label: 'LATAM' },
  { slug: 'worldwide', label: 'Worldwide' },
] as const;

export type JobCountrySlug =
  (typeof JOB_COUNTRY_FILTER_OPTIONS)[number]['slug'];

const LATAM_ELIGIBLE = ['latam', 'worldwide'] as const;
const WORLDWIDE_ELIGIBLE = ['worldwide'] as const;

/**
 * Regions whose jobs a candidate in each country filter can take: a LATAM or
 * worldwide posting is open to Brazil even though it never names Brazil.
 */
export const JOB_COUNTRY_ELIGIBLE_REGIONS: Readonly<
  Record<JobCountrySlug, readonly string[]>
> = {
  brazil: LATAM_ELIGIBLE,
  chile: LATAM_ELIGIBLE,
  argentina: LATAM_ELIGIBLE,
  mexico: LATAM_ELIGIBLE,
  colombia: LATAM_ELIGIBLE,
  'united-states': WORLDWIDE_ELIGIBLE,
  ukraine: WORLDWIDE_ELIGIBLE,
  india: WORLDWIDE_ELIGIBLE,
  egypt: WORLDWIDE_ELIGIBLE,
  pakistan: WORLDWIDE_ELIGIBLE,
  latam: WORLDWIDE_ELIGIBLE,
  worldwide: [],
};

export const JOB_FOCUS_ENGINEERING = 'engineering' as const;

export const JOB_FOCUS_CLOUD_OPS = 'cloud-ops' as const;

export const JOB_FOCUS_DATA_ANNOTATION = 'data-annotation' as const;

export const JOB_FOCUS_PRODUCT = 'product' as const;

export const JOB_FOCUS_MOBILE = 'mobile' as const;

export const JOB_FOCUS_JAVA = 'java' as const;

/** The `?focus=` value of "All roles": no lane filter. Not a lane. */
export const JOB_FOCUS_ALL = 'all' as const;

export const JOB_FOCUS_FILTER_OPTIONS = [
  { slug: JOB_FOCUS_JAVA },
  { slug: JOB_FOCUS_ENGINEERING },
  { slug: JOB_FOCUS_CLOUD_OPS },
  { slug: JOB_FOCUS_MOBILE },
  { slug: JOB_FOCUS_DATA_ANNOTATION },
  { slug: JOB_FOCUS_PRODUCT },
] as const;

export type JobFocusSlug = (typeof JOB_FOCUS_FILTER_OPTIONS)[number]['slug'];

/** Tab order on `/` and `/jobs`: the fork's Java track, every role, the rest. */
export const JOB_FOCUS_TABS = [
  JOB_FOCUS_JAVA,
  JOB_FOCUS_ALL,
  JOB_FOCUS_ENGINEERING,
  JOB_FOCUS_CLOUD_OPS,
  JOB_FOCUS_MOBILE,
  JOB_FOCUS_DATA_ANNOTATION,
  JOB_FOCUS_PRODUCT,
] as const;

/**
 * The first tab is what `/` and `/jobs` show without a `focus`. It must be a
 * track, never "All roles": `parseFocusFilter` returns it as a lane.
 */
export const DEFAULT_JOB_FOCUS = JOB_FOCUS_TABS[0];
