#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import {
  parseSiaReceptionReport,
  summarizeSiaReceptionReport,
  validateCbo,
  validateCnes,
  validateCompetence,
  validateMunicipalityCode,
  validateProcedureCode,
} from "./index.js";

const [, , command, subtype, value] = process.argv;

function printHelp(): void {
  console.log(`sus-toolkit

Usage:
  sus-toolkit validate cnes <value>
  sus-toolkit validate cbo <value>
  sus-toolkit validate procedure <value>
  sus-toolkit validate municipality <value>
  sus-toolkit validate competence <YYYYMM>
  sus-toolkit parse sia-report <file>
`);
}

async function main(): Promise<void> {
  if (!command || command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "validate") {
    if (!subtype || value === undefined) {
      printHelp();
      process.exitCode = 2;
      return;
    }

    const validators = {
      cnes: validateCnes,
      cbo: validateCbo,
      procedure: validateProcedureCode,
      municipality: validateMunicipalityCode,
      competence: validateCompetence,
    } as const;

    const validator = validators[subtype as keyof typeof validators];
    if (!validator) {
      console.error(`Unknown validator: ${subtype}`);
      process.exitCode = 2;
      return;
    }

    const result = validator(value);
    console.log(JSON.stringify(result, null, 2));
    if (!result.valid) process.exitCode = 1;
    return;
  }

  if (command === "parse" && subtype === "sia-report" && value) {
    const text = await readFile(value, "utf8");
    const report = parseSiaReceptionReport(text);
    console.log(JSON.stringify({ report, summary: summarizeSiaReceptionReport(report) }, null, 2));
    return;
  }

  printHelp();
  process.exitCode = 2;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
