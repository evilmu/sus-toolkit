# Security Policy

## Reporting a vulnerability

Please do not publish security vulnerabilities or sensitive production data in a public issue.

For now, use GitHub's private security advisory feature for this repository when available. If that is not available, open a minimal issue asking the maintainer for a private contact channel without including exploit details or sensitive data.

## Sensitive health data

SUS Toolkit must not require real patient data for development or testing. Bug reports and fixtures should use synthetic or irreversibly anonymized data.

Never include:

- patient names;
- CPF or CNS numbers tied to real people;
- addresses or phone numbers;
- clinical narratives or diagnoses linked to identifiable people;
- production database credentials;
- API keys, tokens or certificates.

## Supported versions

Until the first stable release, only the latest commit on `main` is supported.
