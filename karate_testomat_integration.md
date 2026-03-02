# Integrating Karate with Testomat.io — Unique `testId` for Scenario Outline Examples

## Overview

By default, Karate Scenario Outline examples generate multiple `<testcase>` entries within the same `<testsuite>`, often with identical `@T…` test IDs. If you import the JUnit XML into Testomat.io using `TESTOMATIO_TITLE_IDS=1`, those examples are merged into a single test with multiple retries.

To ensure each example appears as a distinct test, assign a **unique `@T…` ID** in the scenario title using placeholders from the `Examples` table.

---

## Recommended `.feature` File Structure

```gherkin
Feature: Timestamp API

Background:
  * url api_host_proxy
  * def pdf = { read: 'classpath:apiTests/assets/contract.pdf', filename: 'contract.pdf', contentType: 'multipart/form-data' }

Scenario Outline: Add a timestamp signature – <env> @<testId>
  * def tokenResult = karate.call('classpath:apiTests/support/generate_jwt_token.feature', { tenant: <tenantId> })
  * def jwtToken = tokenResult.jwtToken
  Given path 'timestamp/documents'
  And header Authorization = 'Bearer ' + jwtToken
  And multipart file files = pdf
  When method post
  Then status <expectedStatus>

Examples:
| env     | tenantId          | expectedStatus | testId    |
| gcpdev  | tenant_id         | 200            | T49e2ba77 |
| sandbox | tenant_sandbox_id | 400            | T8a1bc222 |
```

### Why This Works

- The `<testId>` placeholder is replaced from the `Examples` table, ensuring each example carries a unique `@T…`.
- The XML report generates distinct `<testcase>` names (e.g., `... @T49e2ba77`, `... @T8a1bc222`), allowing Testomat.io to import them as **separate tests** rather than retries.

---

## Running Tests and Importing to Testomat.io

```bash
mvn test -Dkarate.env=$env -Dtest=KarateTest

TESTOMATIO=your_key_here TESTOMATIO_TITLE_IDS=1 npx report-xml "target/karate-reports/**/*.xml"
```

- Using `TESTOMATIO_TITLE_IDS=1` ensures Testomat.io bases test identification on the `@T…` in the scenario title.

---

## Best Practices

- **Avoid static tags** like `@T…` placed above the Scenario Outline—they apply to all examples identically and defeat uniqueness.
- Each `testId` should be:
  - **Unique** within the project.
  - Begin with `T` and contain alphanumeric characters (e.g., `T1a2b3c4d`).
  - When referencing existing tests in Testomat.io, reuse their `@T` IDs to maintain continuity.
- For brand‑new tests, generate and use fresh, unique IDs consistently moving forward.

---

## Alternative Without `testId`

If you'd prefer not to use IDs:

1. Import without `TESTOMATIO_TITLE_IDS=1`.
2. Ensure scenario titles are inherently unique (e.g., include `<env>`).

```gherkin
Scenario Outline: Add a timestamp signature – <env>
```

Testomat.io will then differentiate tests based on the full name—though without ID mapping.

---

## Implementation Checklist

| Step | Action |
|------|--------|
| 1. | Identify existing Testomat.io tests and copy their `@T` IDs. |
| 2. | Populate the `testId` column in `.feature` files accordingly or generate new ones. |
| 3. | Ensure all `testId`s are unique. |
| 4. | Run tests and import using `TESTOMATIO_TITLE_IDS=1`. |
| 5. | Verify in Testomat.io that each example appears as a distinct test. |

---

## Summary

- Use `TESTOMATIO_TITLE_IDS=1` with unique `@T` per example to achieve one-to-one mapping.
- This approach ensures clean test tracking and reliable linking in Testomat.io.
- If not using IDs, rely on unique scenario names, though mapping precision is reduced.

