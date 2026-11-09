# DT-001-DISCOVERY — Default test integration

## 2026-11-10T04:19:45+05:00 — DONE

Starting revision `659fe8c931ef007062fb76879aeefccc3c1f066a`, main, clean; matches reviewed 659fe8c.
Native Windows Node v22.19.0, win32 x64, npm 11.14.1, Vitest 5.1.0 through WSL2.
All commands use installed dependencies; no Linux/macOS execution is implied.

### Authorization and exact changed-file inventory

Owner explicitly assigned the external DT-001-DISCOVERY task, authorizing only:

- vitest.config.mts: append the scaffold include and remove its explicit exclude.
  Retain three ordinary includes, Node default, three build/dependency excludes
  and passWithNoTests: false. No other runner change or package-script change.
- test-candidates/discovery.candidate.test.ts: the specified B10 requirement/label
  revision, import-binding rename and exact exclude/Node assertions. Both existing
  fail-on-zero assertions and the focused include assertion remain unchanged.
- tests/unit/discovery-integration.test.ts: two new independent real-config cases.
- docs/README.md, test-candidates/README.md, docs/TEST_POLICY.md section 10 only,
  and an append-only B10 addendum in specs/DT-001-bootstrap.md.
- This report and five canonical memory records in docs/memory/.

This is 13 paths (11 changed originals, two additions). No other existing tests,
helpers/fixtures, application source, focused runner, lint/TS/build configuration,
manifest/lockfile, policies/templates or root instructions changed. No suites moved,
copied or renamed; the historical directory name does not create an approval gate.
Further existing-test/effective-execution revisions still need scoped authorization.

### Initial tests, requirement mapping and genuine red

At 2026-11-10T04:14:53+05:00, before red runs and runner implementation,
recorded the revised/new full contents externally and these SHA-256 identities:

- test-candidates/discovery.candidate.test.ts: `11c959b6df968a56883d3667eb16a4f612c873ee7be851127341bcfb710ae9cb` (initial = final).
- tests/unit/discovery-integration.test.ts: `5d1f48a3d2f3f37da3680b71a444e93ab706a0a9efc87d27385b487fb5d02fa8` (initial = final).

The two ordinary cases assert literal exact default and focused options, importing
the real configs without mocks or a recursive runner. Config assertions supplement
actual executions, not replace them. No test expectation was changed after recording.

Authorized B10 identity map (same file, one case):

- Before: B10 explicit discovery (PROPOSED) / keeps candidates out of ordinary
  discovery and fails on zero approved tests.
- After: B10 integrated default discovery / includes ordinary and scaffold tests
  while retaining zero-test failure.

With the original runner intact, npm test executed the two new ordinary cases:
one failed at the exact default-options assertion (missing fourth include and
extra scaffold exclude), one passed. The focused run failed only revised B10's
fourth-include assertion; all other 42 cases passed. These are real contract red
assertions, not parse/import/infrastructure errors or empty-suite substitutes.
Only the two authorized runner edits followed; both recorded test files stayed fixed.

### Commands and actual outcomes

Each npm command ran separately from repository root with prefix
`/mnt/c/Windows/System32/cmd.exe /c`. Required full runs were unfiltered.

| Phase | Command | Exit | Actual result |
|---|---|---:|---|
| Baseline | npm run typecheck | 0 | PASS |
| Baseline | npm run lint | 0 | PASS |
| Baseline | npm run test:candidates | 0 | PASS: 8 files / 43 cases |
| Baseline | npm test | 1 | FAIL: no test files, expected ISSUE-007 |
| Fixed tests, before runner fix | npm test | 1 | Genuine red: 1 fail / 1 pass in new ordinary file |
| Fixed tests, before runner fix | npm run test:candidates | 1 | Genuine red: B10 fails / other 42 pass, 8 files |
| After | npm run typecheck | 0 | PASS: root/shared/renderer aggregate |
| After | npm run lint | 0 | PASS: unchanged --max-warnings 0 |
| After | npm test | 0 | PASS: 9 files / 45 cases |
| After | npm run test:candidates | 0 | PASS: 8 files / 43 cases |
| Inventory baseline | npm run test:candidates -- --reporter=json | 0 | PASS: actual 43-case baseline |
| Inventory after | npm test -- --reporter=json --outputFile=.vitest/json/discovery-standard.json | 0 | PASS: actual 45-case default inventory |
| Inventory after | npm run test:candidates -- --reporter=json --outputFile=.vitest/json/discovery-focused.json | 0 | PASS: actual 43-case focused inventory |
| Negative control | npm test -- __DT001_DISCOVERY_NO_MATCH_659fe8c__ | 1 | PASS — zero-test safeguard retained: actual No test files found |
| Integrity/docs | content/hash/identity/link checks and git diff --check | 0 | PASS |

Installed Vitest help confirmed reporter/outputFile flags before use. Machine-local
JSON reports remain outside tracked files and were copied to /tmp. The no-match
token was first confirmed absent from test-file paths; no flags/configuration were
altered. Its actual filter appears in the diagnostic with No test files found,
exiting with code 1. This filtered negative control does not substitute for full runs.

### Executed identity comparison

| File (relative to repository root) | Baseline focused | After default | After focused |
|---|---:|---:|---:|
| test-candidates/boundaries.candidate.test.ts | 1 | 1 | 1 |
| test-candidates/discovery.candidate.test.ts | 1 | 1 | 1 |
| test-candidates/dom-matchers.candidate.test.ts | 5 | 5 | 5 |
| test-candidates/lint-config.candidate.test.ts | 16 | 16 | 16 |
| test-candidates/metadata.candidate.test.ts | 3 | 3 | 3 |
| test-candidates/preload.candidate.test.ts | 11 | 11 | 11 |
| test-candidates/security.candidate.test.ts | 3 | 3 | 3 |
| test-candidates/shell.candidate.test.tsx | 3 | 3 | 3 |
| tests/unit/discovery-integration.test.ts | 0 | 2 | 0 |
| Total | 43 | 45 | 43 |

Matched every file + declaration ordinal + full case name against real execution
reports, applying only the explicit B10 identity map. Default equals the 42
unchanged cases + revised B10 + two new ordinary cases; focused equals the same
42 + revised B10. Every file/ordinal occurs once per full reporter run, every case
passes, and no skips/todos exist. Helpers, build outputs and hardware-only
directories are absent as standalone suites. Existing shell/matcher jsdom
annotations and all other setups remain byte-identical.

Three unchanged parameterized preload rows share one truncated reporter display
name, creating two collisions. An initial inventory helper's unique-name assertion
failed (exit 1); it was corrected to retain each declaration ordinal rather than
deduplicate or rename cases. The earlier memory phrase about two colliding names
means two collisions, not two distinct display names. No test or result changed.
This was a reporting-helper correction; the exact runner fix passed first attempt.

Sanitized default inventory SHA-256: `fb78576410c2f390c15a180112d6046246335ee24944a68a042529964e2b4e51`
(JSON of sorted relative-file/ordinal/full-name/status rows, Unicode preserved,
keys sorted; complete machine-local inventories retained in /tmp).

### Integrity, records and limits

Captured all 72 original tracked-file contents/hashes before edits. 61 unrelated
originals remain byte-identical, including seven unchanged old test files (42
cases), all shared helpers, source, focused config, lint/TS/Forge/Webpack settings,
dependencies/lockfile, AGENTS, architecture and other policy/template files.
The default config equals baseline after only the two permitted edits. Both
recorded test hashes still match. Test policy sections 1–9, original specification
revision/acceptance cases, memory prefixes and dated TASKS history are preserved.
The B10 addendum alone supersedes its obsolete exclusion requirement. Local links
and whitespace checks pass. Hashes are local evidence, not independent enforcement.

ISSUE-007 is resolved locally. DT-001-DISCOVERY, LINTFIX, TYPEFIX and DOCS-003 are
DONE; parent DT-001 stays IN_PROGRESS for packaging/installation, native Windows
security/device and required platform evidence. App launch/package/install,
native security, AI and macOS checks are NOT_RUN/out of scope here. No retrospective
bootstrap TDD, independent acceptance or runtime/readiness claim is made.
No owner review is required to complete this task. Next parent work needs a new
bounded assignment; no packaging or feature work starts here. Nothing installed,
downloaded, published or pushed; prompt storage remains absent. A local commit
hash/message follows explicit staged review and is supplied in the handoff.
