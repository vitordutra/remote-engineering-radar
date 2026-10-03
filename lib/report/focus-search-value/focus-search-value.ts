import {
  DEFAULT_JOB_FOCUS,
  JOB_FOCUS_ALL,
  type JobFocusSlug,
} from '@/lib/jobs/constants';

/**
 * The `?focus=` value `parseFocusFilter` reads back as `focus`: none for the
 * default track, so `/jobs` stays its canonical URL, and `all` for no lane.
 */
export const focusSearchValue = (
  focus: JobFocusSlug | undefined,
): string | undefined =>
  focus === DEFAULT_JOB_FOCUS ? undefined : (focus ?? JOB_FOCUS_ALL);
