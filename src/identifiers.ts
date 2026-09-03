export type ValidationResult = {
  valid: boolean;
  normalized: string;
  errors: string[];
};

function digits(value: string | number): string {
  return String(value).replace(/\D/g, "");
}

function validateFixedDigits(
  value: string | number,
  length: number,
  label: string,
): ValidationResult {
  const raw = String(value).trim();
  const normalized = digits(raw);
  const errors: string[] = [];

  if (!/^\d+$/.test(raw)) {
    errors.push(`${label} must contain digits only.`);
  }

  if (normalized.length !== length) {
    errors.push(`${label} must contain exactly ${length} digits.`);
  }

  return {
    valid: errors.length === 0,
    normalized,
    errors,
  };
}

/** CNES establishment identifier. DATASUS integration documentation defines it as 7 characters. */
export function validateCnes(value: string | number): ValidationResult {
  return validateFixedDigits(value, 7, "CNES");
}

/** Brazilian Classification of Occupations (CBO) code used in SUS production records. */
export function validateCbo(value: string | number): ValidationResult {
  return validateFixedDigits(value, 6, "CBO");
}

/** SIGTAP/SUS procedure code. */
export function validateProcedureCode(value: string | number): ValidationResult {
  return validateFixedDigits(value, 10, "SUS procedure code");
}

/** IBGE municipality code commonly represented with 7 digits in health datasets. */
export function validateMunicipalityCode(value: string | number): ValidationResult {
  return validateFixedDigits(value, 7, "IBGE municipality code");
}

/** Competence in YYYYMM format; YYYY-MM and YYYY/MM are accepted and normalized. */
export function validateCompetence(value: string | number): ValidationResult {
  const raw = String(value).trim();
  const normalized = digits(raw);
  const errors: string[] = [];

  if (!/^\d{6}$/.test(raw) && !/^\d{4}[-/]\d{2}$/.test(raw)) {
    errors.push("Competence must use YYYYMM, YYYY-MM or YYYY/MM format.");
  }

  if (normalized.length === 6) {
    const year = Number(normalized.slice(0, 4));
    const month = Number(normalized.slice(4, 6));

    if (year < 1990 || year > 2100) {
      errors.push("Competence year is outside the supported range 1990-2100.");
    }
    if (month < 1 || month > 12) {
      errors.push("Competence month must be between 01 and 12.");
    }
  } else if (errors.length === 0) {
    errors.push("Competence must contain a four-digit year and two-digit month.");
  }

  return {
    valid: errors.length === 0,
    normalized,
    errors,
  };
}

/** Extracts the first CNES value found in a CNES-style XML document. */
export function extractCnesFromXml(xml: string): string | null {
  const match = xml.match(
    /<(?:[A-Za-z0-9_-]+:)?CNES\b[^>]*>\s*(\d{7})\s*<\/(?:[A-Za-z0-9_-]+:)?CNES\s*>/i,
  );
  return match?.[1] ?? null;
}
