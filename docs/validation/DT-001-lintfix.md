# DT-001-LINTFIX — CommonJS configuration lint scope

## 2026-11-10T03:59:19+05:00 — DONE

Starting revision: `9a9ff4b98ae5ad7b8ead8dab4ffd5db2cd6f9891`; main, clean at inspection,
matching reviewed 9a9ff4b. The owner explicitly assigned the external lint-fix
task, authorizing exactly the override below, new independent regressions,
report/memory and a local commit. The prompt remains outside this repository.

### Cause and exact repair

The recommended TypeScript no-require-imports rule also covered intentional
CommonJS build configuration. Baseline lint exited 1 with two errors, zero
warnings: forge.config.cjs:1:14 and webpack.renderer.config.cjs:1:30.

Added immediately after the recommended configurations in eslint.config.mjs:

```javascript
{
  files: ['forge.config.cjs', 'webpack.renderer.config.cjs'],
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
  },
},
```

All other configuration bytes are unchanged. These files remain linted; this
is neither a global nor an all-.cjs exception. The actual build files are unchanged.
The exact authorized fix passed on its first implementation; no broader repair
or test revision was attempted.

### Environment and fixed initial regression contract

Native Windows Node v22.19.0, process win32 x64; npm 11.14.1; ESLint 9.39.1,
typescript-eslint 8.72.2, TypeScript 5.9.3, Vitest 5.1.0. Invoked through WSL2
(Linux 6.6.87.2-microsoft-standard-WSL2), using installed dependencies only.
Public ESLint exports/types for ESLint, lintFiles, lintText, findConfigFile,
isPathIgnored and LintResult, and the configured unused-variable rule were read
before writing tests. The new suite uses real ESLint with the actual repo config;
it does not import/execute Forge or start Electron. Synthetic snippets stay in memory.

Initial test content recorded at 2026-11-10T03:55:18+05:00 before its first run
and before configuration implementation; the initial and final SHA-256 match:

- test-candidates/lint-config.candidate.test.ts: `cfe99c9966387b2c1fdf631e75f7c9d6932bba0c2431a084822ed403636d2841`.
- Starting eslint.config.mjs: `20f054ebc847366e05280b34d68cbec6104bf0833dc5128747f94d3a668c564e`.

The fixed 16 cases cover: two real target files (actual config path, not ignored,
one genuine result, no fatal errors/suppressions/errors/warnings); three non-exempt
CommonJS paths, including webpack.main and nested target basenames; five TypeScript
require negatives across main/preload/renderer/core/tests; two target unused-variable
negatives; and four renderer/core electron/node:fs import negatives. Negative
controls assert the intended rule ID at severity 2. Existing cases remain intact.

### Actual commands and red/green evidence

Each npm command below ran separately from the repository root via
`/mnt/c/Windows/System32/cmd.exe /c`, with no filtering/configuration flags added.

| Phase | Command | Exit | Actual result |
|---|---|---:|---|
| Before tests/fix | npm run lint | 1 | FAIL: exactly the two known CommonJS import errors; zero warnings |
| New tests, before fix | npm run test:candidates | 1 | Genuine red: 2 fail, 41 pass, 43 cases in 8 files; original 27 and all 14 negative controls pass |
| After fix | npm run lint | 0 | PASS with original eslint . --max-warnings 0 |
| After fix | npm run typecheck | 0 | PASS: unchanged aggregate root/shared/renderer checks, no suppressions |
| After fix | npm run test:candidates | 0 | PASS: 8 files, 43 cases (original 27 + new 16), zero skips |
| After fix | npm test | 1 | FAIL — pre-existing ISSUE-007: No test files found under unchanged ordinary discovery |
| Integrity | git diff --check | 0 | PASS |

Red run: 03:55:28, 15.80 seconds; only the two actual target checks fail at
lint-config.candidate.test.ts:24, errorCount expected 0 / received 1. Their prior
config-path, non-ignored, genuine-result, fatal-count and suppression assertions
already passed. This is meaningful scope-regression evidence, not a load/parse
failure. Green run: 03:56:30, 9.00 seconds, all 43 pass. No .skip/.only/.todo or
test expectation changed between runs. The ordinary-suite empty result is preserved,
not relabelled a pass; it does not block this originally bounded repair.

| Candidate file | Existing cases still passing | Added cases |
|---|---:|---:|
| boundaries / discovery | 1 / 1 | 0 |
| metadata / preload / security | 3 / 11 / 3 | 0 |
| shell / dom-matchers | 3 / 5 | 0 |
| lint-config | 0 | 16 |
| Total | 27 | 16 |

### Integrity, completion and remaining work

Captured all 70 original tracked-file hashes before edits. 64 protected originals
remain byte-identical, including every existing test/fixture/helper, application
source, CommonJS build file, other configuration, manifest/lockfile, policy and
specification. Six changed originals are only eslint.config.mjs and five memory
records; two additions are the new test and this report. The config equals its
baseline plus exactly the authorized insertion, and the test equals its initial
recorded bytes. Historical memory prefixes and dated TASKS entries remain intact.
Local hashes document content, not independent enforcement.

Protected baseline/current manifest SHA-256: `74bc895b6f3872a5442c4961b29bb4cf00565817de7d63a8528d3dd377baca23`
(UTF-8 sorted relative path + NUL + file SHA-256 rows joined with newline).

DT-001-LINTFIX — DONE. No owner review is required for completion. DOCS-003 and
DT-001-TYPEFIX remain DONE. Parent DT-001 remains IN_PROGRESS, partially verified.
ISSUE-006 is resolved locally; ISSUE-007 ordinary discovery remains open and is the
next separate task, needing a specifically scoped existing-test/config assignment.
Packaging/make/installer, native Windows enforcement, AI and macOS checks are
NOT_RUN/out of scope here; required parent/runtime evidence remains outstanding.
No application launch, installation, downloads, dependency changes or push.
The local commit hash/message will be supplied in handoff after staged review.
