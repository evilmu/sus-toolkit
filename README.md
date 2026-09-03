# SUS Toolkit

[![CI](https://github.com/evilmu/sus-toolkit/actions/workflows/ci.yml/badge.svg)](https://github.com/evilmu/sus-toolkit/actions/workflows/ci.yml)

Open-source TypeScript toolkit for validating, parsing and automating operational data exchanged with Brazilian SUS/DATASUS systems.

> **Status:** early alpha. The project is independent and is **not** an official Ministry of Health or DATASUS product. Always validate production files with the official systems before submission.

## Why this project exists

Brazilian health teams and software vendors frequently need to validate identifiers, inspect SIA reception reports and troubleshoot production/remittance files. Much of this work is still performed manually or reimplemented independently by each integration.

SUS Toolkit aims to provide small, testable and reusable building blocks for these workflows, with a focus on operational interoperability rather than analytics over DATASUS microdata.

## Current features

- CNES structural validation and normalization
- CBO structural validation and normalization
- SUS/SIGTAP procedure-code structural validation
- IBGE municipality-code structural validation
- `YYYYMM` competence validation
- CNES extraction from XML documents
- SIA reception-report parsing
- SIA step success/failure summary
- CLI for common validations and SIA report parsing
- TypeScript types and automated tests

## Install for development

```bash
git clone https://github.com/evilmu/sus-toolkit.git
cd sus-toolkit
npm install
npm test
```

The npm package has not been published yet. Until the first release, consume the source directly from GitHub.

## Library usage

```ts
import {
  parseSiaReceptionReport,
  summarizeSiaReceptionReport,
  validateCnes,
  validateCompetence,
} from "sus-toolkit";

console.log(validateCnes("1234567"));
console.log(validateCompetence("202609"));

const report = parseSiaReceptionReport(reportText);
console.log(summarizeSiaReceptionReport(report));
```

## CLI

```bash
sus-toolkit validate cnes 1234567
sus-toolkit validate cbo 225125
sus-toolkit validate procedure 0301010064
sus-toolkit validate municipality 4103206
sus-toolkit validate competence 202609
sus-toolkit parse sia-report ./relatorio.txt
```

Example validation output:

```json
{
  "valid": true,
  "normalized": "1234567",
  "errors": []
}
```

## Roadmap

The next milestones are intentionally focused on workflows that are painful for municipal health teams and integrators:

- [ ] BPA-C fixed-width parser based on documented layouts
- [ ] BPA-I fixed-width parser based on documented layouts
- [ ] pre-submission validation rules for CNES, CBO, procedure and competence combinations
- [ ] structured SIA rejection/error catalog
- [ ] SIGTAP rule lookup and competence-aware validation
- [ ] richer CNES XML parsing
- [ ] CSV/JSON reports for inconsistencies
- [ ] anonymized fixtures from real-world failure patterns
- [ ] plugin API for municipality/vendor-specific checks

## Scope and correctness

Some identifiers currently receive **structural validation only**. A structurally valid code is not necessarily active or valid for a specific competence, establishment, occupation or procedure. Semantic validation against official datasets will be introduced incrementally and documented per module.

## Official references

- CNES: https://cnes.datasus.gov.br/
- DATASUS: https://datasus.saude.gov.br/
- SIGTAP: http://sigtap.datasus.gov.br/

DATASUS integration documentation defines the CNES establishment identifier with length 7. The toolkit keeps source-specific assumptions documented and covered by tests.

## Contributing

Contributions are welcome, especially from SUS professionals, municipal health IT teams and healthcare software developers. See [CONTRIBUTING.md](CONTRIBUTING.md).

Please do not submit real patient data, credentials or personally identifiable health information in issues, fixtures or pull requests.

## Security

See [SECURITY.md](SECURITY.md).

## License

MIT. See [LICENSE](LICENSE).
