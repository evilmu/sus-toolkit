export type SiaReceptionStep = {
  number: number;
  message: string;
  success: boolean | null;
};

export type SiaReceptionReport = {
  version: string | null;
  user: string | null;
  remittanceFile: string | null;
  arrivalDate: string | null;
  loadDate: string | null;
  steps: SiaReceptionStep[];
};

function capture(text: string, pattern: RegExp): string | null {
  return text.match(pattern)?.[1]?.trim() ?? null;
}

export function parseSiaReceptionReport(text: string): SiaReceptionReport {
  const steps: SiaReceptionStep[] = [];
  const stepPattern = /^Passo\s+(\d+)\s*-\s*(.+)$/gim;

  for (const match of text.matchAll(stepPattern)) {
    const message = match[2].trim();
    let success: boolean | null = null;

    if (/\bSUCESSO\b/i.test(message)) success = true;
    if (/\bERRO\b|\bFALHA\b|\bREJEIT/i.test(message)) success = false;

    steps.push({
      number: Number(match[1]),
      message,
      success,
    });
  }

  return {
    version: capture(text, /Vers[aã]o:\s*([^\s-]+)/i),
    user: capture(text, /USU[AÁ]RIO\s+RESPONS[AÁ]VEL:\s*([^\r\n]+)/i),
    remittanceFile: capture(text, /Arquivo\s+de\s+Remessa\s*:\s*([^\s\r\n]+)/i),
    arrivalDate: capture(text, /Data\s+de\s+Chegada\s*:\s*([^\r\n]+)/i),
    loadDate: capture(text, /Data\s+da\s+Carga\s*:\s*([^\r\n]+)/i),
    steps,
  };
}

export function summarizeSiaReceptionReport(report: SiaReceptionReport): {
  totalSteps: number;
  successfulSteps: number;
  failedSteps: number;
  hasFailure: boolean;
} {
  const successfulSteps = report.steps.filter((step) => step.success === true).length;
  const failedSteps = report.steps.filter((step) => step.success === false).length;

  return {
    totalSteps: report.steps.length,
    successfulSteps,
    failedSteps,
    hasFailure: failedSteps > 0,
  };
}
