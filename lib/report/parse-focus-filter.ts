import {
  DEFAULT_JOB_FOCUS,
  JOB_FOCUS_ALL,
  JOB_FOCUS_FILTER_OPTIONS,
  type JobFocusSlug,
} from '@/lib/jobs/constants';

/**
 * The lane a `?focus=` value selects. No value, or one we do not know, is the
 * default Java track; `all` lifts the lane filter.
 */
export const parseFocusFilter = (
  value: string | string[] | undefined,
): JobFocusSlug | undefined => {
  const raw =
    typeof value === 'string' ? value.trim().toLowerCase() : undefined;
  return raw === JOB_FOCUS_ALL
    ? undefined
    : (JOB_FOCUS_FILTER_OPTIONS.find((option) => option.slug === raw)?.slug ??
        DEFAULT_JOB_FOCUS);
};
