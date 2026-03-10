/**
 * RPL Score Engine — Core Scoring Primitives
 *
 * Implements the numeric scoring rules defined in docs/RPL_SCORING_MODEL.md.
 * This module is pure computation — no side effects, no I/O.
 */

import { AreaKey, AreaScores } from './scoring-types';

/**
 * Maximum points per area as defined in docs/RPL_SCORING_MODEL.md.
 * These values are the authoritative caps — changing them here changes the engine.
 */
export const AREA_MAX_SCORES: Record<AreaKey, number> = {
  A1: 20, // Contratti e Compliance
  A2: 20, // Team e Formazione
  A3: 15, // Operazioni e Sistemi
  A4: 15, // KPI e Disciplina dei Dati
  A5: 10, // Sostenibilità
  A6: 10, // Reputazione Cliente
  A7: 10, // Cultura ed Etica
};

export const TOTAL_MAX_SCORE = 100;

/**
 * Stage entry thresholds — authoritative values from docs/RPL_SCORING_MODEL.md
 * and docs/RPL_STAGE_TRANSITIONS.md.
 */
export const THRESHOLDS = {
  LITE: {
    totalScore: 35,
    A1_MIN: 14,
  },
  STANDARD: {
    totalScore: 60,
    A1_MIN: 16,
    MIN_MONTHS_IN_LITE: 12,
    MIN_KPI_IMPROVEMENTS: 3,
  },
  EXCELLENCE: {
    totalScore: 85,
    A7_MIN: 8,
    CONSECUTIVE_YEARS: 2,
  },
} as const;

/**
 * Validates that all area scores are within their allowed ranges.
 * Returns an array of error strings; empty array means valid.
 */
export function validateAreaScores(scores: AreaScores): string[] {
  const errors: string[] = [];

  for (const area of Object.keys(AREA_MAX_SCORES) as AreaKey[]) {
    const score = scores[area];
    const max = AREA_MAX_SCORES[area];

    if (!Number.isFinite(score) || score < 0 || score > max) {
      errors.push(`${area}: score ${score} is invalid — must be a number between 0 and ${max}`);
    }
  }

  return errors;
}

/**
 * Returns the sum of all seven area scores.
 * Uses explicit key iteration to guard against object spread issues.
 */
export function calculateTotalScore(scores: AreaScores): number {
  return (Object.keys(AREA_MAX_SCORES) as AreaKey[]).reduce(
    (sum, area) => sum + scores[area],
    0
  );
}

/**
 * Returns true if any area has a score of exactly zero.
 * A zero area is a hard blocker for Lite entry.
 */
export function hasZeroArea(scores: AreaScores): boolean {
  return (Object.keys(AREA_MAX_SCORES) as AreaKey[]).some(area => scores[area] === 0);
}

/**
 * Returns the keys of all areas with a score of zero.
 */
export function getZeroAreas(scores: AreaScores): AreaKey[] {
  return (Object.keys(AREA_MAX_SCORES) as AreaKey[]).filter(area => scores[area] === 0);
}

/**
 * Returns areas where the score is below 50% of the area's maximum.
 * For Standard stage: no area may fall below half its maximum score.
 * Source: docs/RPL_STAGE_TRANSITIONS.md — Lite→Standard upgrade criteria.
 */
export function getAreasBelowHalfMax(scores: AreaScores): AreaKey[] {
  return (Object.keys(AREA_MAX_SCORES) as AreaKey[]).filter(
    area => scores[area] < AREA_MAX_SCORES[area] / 2
  );
}

/**
 * Returns a score as a percentage of its area maximum.
 * Useful for display and reporting.
 */
export function areaScorePercent(area: AreaKey, score: number): number {
  return Math.round((score / AREA_MAX_SCORES[area]) * 100);
}
