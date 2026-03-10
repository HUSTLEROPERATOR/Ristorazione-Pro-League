/**
 * RPL Score Engine — CLI
 *
 * Minimal command-line wrapper around the evaluate() domain function.
 * Accepts a path to a JSON input file, runs the engine, and prints
 * the result as formatted JSON to stdout.
 *
 * Usage:
 *   npx tsx src/scripts/rpl-score-cli.ts <path-to-input.json>
 *   npm run rpl:score -- <path-to-input.json>
 *
 * Exit codes:
 *   0 — evaluation completed (check result.outcome for the decision)
 *   1 — file not found, invalid JSON, or invalid score values
 */

import fs from 'fs';
import path from 'path';
import { evaluate } from '../domain/rpl/stage-transition-engine';
import { RPLScoreInput } from '../domain/rpl/scoring-types';

function fail(message: string): never {
  process.stderr.write(`[rpl-score] error: ${message}\n`);
  process.exit(1);
}

function main(): void {
  const filePath = process.argv[2];

  if (!filePath) {
    fail('no input file specified.\n\nUsage: npx tsx src/scripts/rpl-score-cli.ts <path-to-input.json>');
  }

  const resolved = path.resolve(filePath);

  if (!fs.existsSync(resolved)) {
    fail(`file not found: ${resolved}`);
  }

  let raw: string;
  try {
    raw = fs.readFileSync(resolved, 'utf-8');
  } catch (err) {
    fail(`could not read file: ${(err as Error).message}`);
  }

  let input: RPLScoreInput;
  try {
    input = JSON.parse(raw) as RPLScoreInput;
  } catch {
    fail('file is not valid JSON');
  }

  let result;
  try {
    result = evaluate(input);
  } catch (err) {
    fail((err as Error).message);
  }

  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
}

main();
