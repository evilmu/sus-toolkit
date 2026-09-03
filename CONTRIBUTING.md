# Contributing to SUS Toolkit

Thanks for helping improve open-source interoperability tooling for Brazilian public health.

## Good first contributions

Small, well-scoped pull requests are welcome. Examples:

- add an anonymized SIA reception-report fixture;
- document a known rejection/error pattern;
- add tests for CNES/CBO/procedure validation;
- improve Portuguese or English documentation;
- implement one documented BPA field or record parser;
- improve CLI output or error messages.

## Development

```bash
npm install
npm test
```

Use Node.js 20 or newer.

## Pull requests

1. Open or reference an issue when the change is substantial.
2. Keep each pull request focused on one problem.
3. Add tests for behavior changes.
4. Document the official source for layout/rule changes whenever possible.
5. Do not include production credentials, patient data or personally identifiable health information.

## Data and fixtures

Fixtures must be synthetic or irreversibly anonymized. Never commit names, CPF, CNS, addresses, phone numbers, clinical narratives or any other data that can identify a patient or professional unless it is already a clearly public reference identifier used solely for documentation.

## Correctness

SUS/DATASUS layouts and rules can vary by competence and software version. Avoid presenting assumptions as universal rules. Prefer competence-aware behavior and cite the source used to implement a rule.

## Code style

- TypeScript with strict mode enabled.
- Small pure functions where practical.
- Explicit types for public APIs.
- Tests for parsing and validation edge cases.
- Avoid dependencies when the standard library is sufficient.
