import { JOB_FOCUS_ALL, JOB_FOCUS_JAVA } from '@/lib/jobs/constants';
import { JOBS_PAGE_LIMIT } from './constants';
import { parseJobFilters } from './parse-job-filters';

const UNKNOWN_FOCUS = 'quantum-ops';

describe('parseJobFilters', () => {
  it('collapses default remote and score-zero spellings into the unfiltered cache key', () => {
    for (const minimumScore of ['0', '00', '000', ' 0 ']) {
      expect(
        parseJobFilters({ remote: ' REMOTE ', minimumScore }),
      ).toStrictEqual(parseJobFilters({}));
    }
  });
  it('drops ambiguous repeated query parameters', () => {
    expect(
      parseJobFilters({
        technology: ['React', 'TypeScript'],
        minimumScore: ['10', '90'],
      }),
    ).toEqual({
      technology: undefined,
      seniority: undefined,
      remote: undefined,
      location: undefined,
      focus: JOB_FOCUS_JAVA,
      minimumScore: undefined,
      limit: JOBS_PAGE_LIMIT,
    });
  });

  it('keeps single values and rejects an out-of-range score', () => {
    expect(
      parseJobFilters({ technology: ' React ', minimumScore: '900' }),
    ).toMatchObject({ technology: 'React', minimumScore: undefined });
    expect(parseJobFilters({ minimumScore: '90' })).toMatchObject({
      minimumScore: 90,
    });
  });

  it('drops filter values outside the known domain', () => {
    // Every distinct value is a separate `use cache` key and therefore a
    // separate database read, so unknown values must not reach the query.
    expect(
      parseJobFilters({
        technology: 'not-a-tracked-technology',
        seniority: 'wizard',
        remote: 'lunar',
        country: 'atlantis',
        focus: UNKNOWN_FOCUS,
      }),
    ).toEqual({
      technology: undefined,
      seniority: undefined,
      remote: undefined,
      country: undefined,
      focus: JOB_FOCUS_JAVA,
      minimumScore: undefined,
      limit: JOBS_PAGE_LIMIT,
    });
  });

  it('keeps values inside the known domain', () => {
    expect(
      parseJobFilters({
        technology: 'react',
        seniority: 'Senior',
        remote: 'hybrid',
        country: 'Brazil',
        focus: ' Cloud-Ops ',
      }),
    ).toMatchObject({
      technology: 'React',
      seniority: 'senior',
      remote: 'hybrid',
      country: 'brazil',
      focus: 'cloud-ops',
    });
  });

  it('opens on the Java track and lifts the lane filter for all', () => {
    expect(parseJobFilters({})).toMatchObject({ focus: JOB_FOCUS_JAVA });
    expect(
      parseJobFilters({ focus: ` ${JOB_FOCUS_ALL.toUpperCase()} ` }),
    ).toMatchObject({
      focus: undefined,
    });
  });

  it('accepts a slug-shaped company and rejects anything else', () => {
    expect(parseJobFilters({ company: ' Acme-Robotics ' })).toMatchObject({
      company: 'acme-robotics',
    });
    for (const company of [
      'acme robotics',
      '../acme',
      '-acme',
      'a'.repeat(81),
    ]) {
      expect(parseJobFilters({ company })).toMatchObject({
        company: undefined,
      });
    }
  });
});
