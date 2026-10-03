import 'server-only';
import { cacheLife } from 'next/cache';
import { getDb } from '@/lib/db/client';
import { createJobsRepository } from '@/lib/db/repositories/jobs-repository';
import { JOB_MAX_AGE_MS } from '@/lib/jobs/constants';
import { parseFocusFilter } from '@/lib/report/parse-focus-filter';
import { SITEMAP_CACHE_LIFE } from './constants';
import type { IndexableFilter } from './indexable-filter/indexable-filter';

/** Jobs the site lists under one country or focus filter. */
export const filterJobCount = async (
  filter: IndexableFilter,
): Promise<number> => {
  'use cache';
  cacheLife(SITEMAP_CACHE_LIFE);
  return createJobsRepository(getDb()).countActive({
    country: filter.country,
    focus: parseFocusFilter(filter.focus),
    maxAgeMs: JOB_MAX_AGE_MS,
  });
};
