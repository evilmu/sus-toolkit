import assert from "node:assert/strict";
import test from "node:test";
import {
  extractCnesFromXml,
  validateCbo,
  validateCnes,
  validateCompetence,
  validateProcedureCode,
} from "../src/index.js";

test("validates and normalizes CNES", () => {
  assert.deepEqual(validateCnes(" 1234567 "), {
    valid: true,
    normalized: "1234567",
    errors: [],
  });
  assert.equal(validateCnes("123").valid, false);
  assert.equal(validateCnes("abc1234567").valid, false);
});

test("validates CBO and SUS procedure codes by structural length", () => {
  assert.equal(validateCbo("225125").valid, true);
  assert.equal(validateProcedureCode("0301010064").valid, true);
  assert.equal(validateProcedureCode("301010064").valid, false);
});

test("validates and normalizes competence", () => {
  assert.equal(validateCompetence("202609").valid, true);
  assert.equal(validateCompetence("2026-09").valid, true);
  assert.equal(validateCompetence("2026/09").valid, true);
  assert.equal(validateCompetence("202613").valid, false);
  assert.equal(validateCompetence("abc202609").valid, false);
  assert.equal(validateCompetence("2026-09").normalized, "202609");
});

test("extracts CNES from XML with or without namespace", () => {
  assert.equal(extractCnesFromXml("<root><CNES>1234567</CNES></root>"), "1234567");
  assert.equal(extractCnesFromXml("<root><c:CNES>7654321</c:CNES></root>"), "7654321");
  assert.equal(extractCnesFromXml("<root />"), null);
});
