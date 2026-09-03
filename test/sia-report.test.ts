import assert from "node:assert/strict";
import test from "node:test";
import { parseSiaReceptionReport, summarizeSiaReceptionReport } from "../src/index.js";

const sample = `
------------- Versão:03.2026 - RELATÓRIO DE RECEPCAO DE REMESSA (FTP) ---------------------------
USUÁRIO RESPONSÁVEL: SIA_OPER
Arquivo de Remessa : AM41032001N202606.DTS  BOM SUCESSO/PR(M)
Data    de Chegada : 28/07/2026 14:02:41
Data    da Carga   : 29/07/26 03:44:43
Passo 001  - Arquivo de Histórico CRIADO com SUCESSO!
Passo 002  - Conectando ao FTP
Passo 003  - FTP Conectado com SUCESSO!
`;

test("parses SIA reception report metadata", () => {
  const report = parseSiaReceptionReport(sample);
  assert.equal(report.version, "03.2026");
  assert.equal(report.user, "SIA_OPER");
  assert.equal(report.remittanceFile, "AM41032001N202606.DTS");
  assert.equal(report.arrivalDate, "28/07/2026 14:02:41");
  assert.equal(report.steps.length, 3);
});

test("summarizes successful and failed steps", () => {
  const report = parseSiaReceptionReport(`${sample}\nPasso 004 - ERRO ao processar arquivo`);
  const summary = summarizeSiaReceptionReport(report);
  assert.equal(summary.totalSteps, 4);
  assert.equal(summary.successfulSteps, 2);
  assert.equal(summary.failedSteps, 1);
  assert.equal(summary.hasFailure, true);
});
