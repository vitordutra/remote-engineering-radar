import {
  JOB_FOCUS_ALL,
  JOB_FOCUS_FILTER_OPTIONS,
  JOB_FOCUS_JAVA,
  JOB_FOCUS_PRODUCT,
} from '@/lib/jobs/constants';
import { parseFocusFilter } from '../parse-focus-filter';
import { focusSearchValue } from './focus-search-value';

const FOCUS_VALUES = [
  ...JOB_FOCUS_FILTER_OPTIONS.map(({ slug }) => slug),
  undefined,
];

describe('focusSearchValue', () => {
  it('leaves the default Java track out of the URL', () => {
    expect(focusSearchValue(JOB_FOCUS_JAVA)).toBeUndefined();
  });

  it('names the unfiltered view all', () => {
    expect(focusSearchValue(undefined)).toBe(JOB_FOCUS_ALL);
  });

  it('names every other track by its slug', () => {
    expect(focusSearchValue(JOB_FOCUS_PRODUCT)).toBe(JOB_FOCUS_PRODUCT);
  });

  it.each(FOCUS_VALUES)('reads %s back through parseFocusFilter', (focus) => {
    expect(parseFocusFilter(focusSearchValue(focus))).toBe(focus);
  });
});
