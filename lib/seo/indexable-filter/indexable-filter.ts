import {
  DEFAULT_JOB_FOCUS,
  JOB_COUNTRY_FILTER_OPTIONS,
  JOB_FOCUS_ALL,
  JOB_FOCUS_FILTER_OPTIONS,
  type JobCountrySlug,
  type JobFocusSlug,
} from '@/lib/jobs/constants';

type OtherTrack = Exclude<JobFocusSlug, typeof DEFAULT_JOB_FOCUS>;

/** A `?focus=` value with its own page: all roles and every other track. */
type IndexableFocus = OtherTrack | typeof JOB_FOCUS_ALL;

/**
 * Shaped like the query string. A country view has no `focus` because it is
 * the default track in that country.
 */
export type IndexableFilter =
  | { country: JobCountrySlug; focus?: undefined }
  | { country?: undefined; focus: IndexableFocus };

const isOtherTrack = (slug: JobFocusSlug): slug is OtherTrack =>
  slug !== DEFAULT_JOB_FOCUS;

/** Every single-filter view search engines may see, if it has enough jobs. */
export const INDEXABLE_FILTERS: readonly IndexableFilter[] = [
  ...JOB_COUNTRY_FILTER_OPTIONS.map(({ slug }) => ({ country: slug })),
  { focus: JOB_FOCUS_ALL },
  ...JOB_FOCUS_FILTER_OPTIONS.map(({ slug }) => slug)
    .filter(isOtherTrack)
    .map((focus) => ({ focus })),
];

/**
 * The view's filter when it is exactly one country or one focus and nothing
 * else; combinations and extra filters are never indexed.
 */
export const singleIndexableFilter = (
  filters: Record<string, string | number | undefined>,
): IndexableFilter | undefined => {
  const { country, focus, ...rest } = filters;
  return Object.values(rest).some((value) => value !== undefined)
    ? undefined
    : INDEXABLE_FILTERS.find(
        (filter) => filter.country === country && filter.focus === focus,
      );
};
