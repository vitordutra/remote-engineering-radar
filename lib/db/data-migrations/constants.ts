/**
 * Rewrites every active job's roleFocus with the lane strategies from
 * SPEC-022, and deactivates what the new classifier rejects.
 */
export const LANE_STRATEGIES_DATA_MIGRATION = '022-lane-strategies';

/**
 * Strips the body-text geography that ingestion before PR #48 copied into
 * `countries`, so non-Brazil jobs leave the Brazil tab.
 */
export const LEGACY_GEOGRAPHY_COUNTRIES_DATA_MIGRATION =
  '023-drop-legacy-geography-countries';

/**
 * Rewrites every active job's roleFocus with the rule-list lanes from
 * SPEC-023, so jobs that only mentioned iOS or Android leave Mobile.
 */
export const LANE_RULES_DATA_MIGRATION = '024-lane-rules';

/**
 * Rewrites every active job's roleFocus with the Java lane from SPEC-025, so
 * a stored Java + React fullstack job moves from React to Java.
 */
export const JAVA_LANE_DATA_MIGRATION = '025-java-lane';

/**
 * Rewrites every active job's seniority and score now that a title's level
 * wins over the levels its body mentions ("mentor junior engineers").
 */
export const TITLE_FIRST_SENIORITY_DATA_MIGRATION = '026-title-first-seniority';
