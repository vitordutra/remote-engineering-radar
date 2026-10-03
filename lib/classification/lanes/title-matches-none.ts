import type { LaneRule } from './types';

/**
 * The title names none of `terms`. One exclusion for every lane: a competing
 * stack ("Angular Developer") or a position the lane does not cover
 * ("Mobile QA Analyst"). A title that names one of `unless` passes anyway, so
 * "Java / Node Developer" is not vetoed by its Node.
 */
export const titleMatchesNone =
  (
    terms: readonly RegExp[],
    { unless = [] }: { unless?: readonly RegExp[] } = {},
  ): LaneRule =>
  (input) =>
    unless.some((term) => term.test(input.title)) ||
    !terms.some((term) => term.test(input.title));
