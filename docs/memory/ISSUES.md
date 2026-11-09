# Issues and Solutions

**Application state:** No application has been built in this planning pack. No runtime issue is currently recorded as reproduced or fixed.

## Index

| ID | Related task | Symptom | State | Regression evidence |
|---|---|---|---|---|
| — | — | No reproduced issue yet | — | — |

## Policy

Record every build, runtime, dependency, packaging, test, performance or AI-output problem encountered during implementation. Repeated instances may share an issue ID with dated updates. Include unsuccessful approaches so later sessions do not repeat them. Do not call an assumed cause a confirmed root cause. Distinguish WORKAROUND, FIX_IMPLEMENTED, VERIFIED and REOPENED.

Use [the issue-entry template](../../templates/ISSUE_ENTRY.md). Each update is dated and appended. Link issues from the task's `PROJECT_MEMORY.md` entry. Never put secrets or actual staff captures in reproduction material; create sanitized fixtures.

Design risks that have not occurred belong in the architecture/release plan, not in a fabricated incident entry.

## 2026-11-10 — ISSUE-001 — Tool/sandbox access failures

**Task / starting revision:** DT-001; no repository at session start.
**Environment:** Linux/WSL shell on Windows-mounted workspace; Git 2.43.0,
Python 3.12.3. State: WORKAROUND (native project validation remains NOT_RUN).

**Reproduction/outcomes:** `node --version` exited 127 (not found);
`npm --version` exited 1 (WSL 1 unsupported / install directory undetermined).
Windows node.exe and cmd.exe initially exited 1 with WSL socket failures in the
sandbox. Python urllib registry access exited 1 with DNS resolution failure;
web registry opens also failed for several endpoints. `git init -b main` first
exited 1 because .git/info was read-only.

**Cause:** Confirmed missing Linux Node; npm wrapper/environment rejection and
sandbox restrictions evidenced by the failures. No broader WSL diagnosis claimed.
**Attempts/solution:** Authorized escalated read-only Windows version checks
exited 0: Node v22.19.0, npm 11.14.1. Escalated read-only registry JSON retrieval
succeeded; no archives installed/downloaded. Escalated local Git initialization
exited 0 on main. Four JS config syntax checks later exited 0 through Windows
Node. Native Windows terminal is documented for owner development.
**Verification limits:** These workarounds enable metadata/syntax inspection,
not builds or app launch. Do not install Linux dependencies as a hidden remedy.

## 2026-11-10 — ISSUE-002 — Local commit blocked by Git identity

**Task / starting revision:** DT-001; new unborn main. **State:** OPEN.
**Reproduction:** `git config --get user.name` and `git config --get user.email`
each exited 1 with no value; `git var GIT_AUTHOR_IDENT` exited 128 with Author
identity unknown / empty ident name. Git does not have an intended configured
author. No identity was invented and no commit was attempted with inferred
credentials. No history, hooks or signing safeguards were bypassed.
**Cause:** CONFIRMED absent Git author configuration for the inspected Git.
**Solution:** Owner must configure the intended local identity; then create
reviewed named-file commits. Existing work is preserved for that action.
**Verification:** UNRESOLVED. No commit hash exists. Candidate/shell split
commits could not be created. Nothing was pushed.

## 2026-11-10 — ISSUE-003 — Dependency validation prerequisite absent

**Task / starting revision:** DT-001; initial bootstrap. **State:** OPEN_SETUP.
This is an expected prerequisite, not a reproduced application defect.
**Reproduction:** node_modules and package-lock.json are absent. Directory
inspection exited 2 for missing node_modules (alongside absent Linux node).
**Cause:** Owner installation has intentionally not occurred.
**Failed attempts:** No install, package generator or dependency-requiring test
was attempted; missing tooling is not test-first behavioural red evidence.
**Solution/next:** Owner runs `npm i`, reviews generated lockfile and runs exact
README commands. Do not manufacture a lockfile or install on the owner's behalf.
**Verification:** typecheck/lint/Vitest/start/package/make and all Windows/macOS
runtime checks NOT_RUN. No feature defects inferred from their absence.

## 2026-11-10 — ISSUE-004 — Initial staged whitespace check fails

**Task/source:** DT-001, unborn main. **State:** OPEN_BASELINE.
**Reproduction:** After explicitly staging 64 files, `git diff --cached --check`
exited 2. It reported Markdown two-space hard breaks in supplied DECISIONS,
PROJECT_MEMORY, architecture, test policy, future timer spec and templates; it
also found a new trailing blank line in src/renderer/global.d.ts.
**Cause:** CONFIRMED via listed line contents. Initial imports appear as additions
in an unborn repository, so inherited Markdown whitespace is checked too.
**Solution:** Removed the newly introduced blank line. Preserved supplied history,
architecture/policies/specs/templates rather than silently reformat owner material.
Full check remains FAIL until the owner decides how to handle original Markdown
hard breaks. No Git whitespace configuration or mandatory check was weakened.
**Verification:** Final full and scoped staged checks are recorded in the
subsequent PROJECT_MEMORY closing entry. This is not an application runtime bug.

## 2026-11-10 — DOCS-001 observations and existing-issue updates

**Starting revision/environment:** ed096d2, main, existing Linux/WSL workspace.
**ISSUE-002 remains OPEN:** `git config --get user.name` and
`git config --get user.email` each exited 1 with no value again. The owner's
existing commit is real, but does not establish configured identity for this
Git process. No identity was inferred or changed; local commit remains blocked.
Owner must configure intended identity before the requested commit can be made.

**ISSUE-003 prerequisite observation supersedes earlier absence:** node_modules
and package-lock.json are now present at this session's start. This task did not
install packages or change the lockfile. Presence does not establish dependency
health or passing application checks; those checks were NOT_RUN here.

**ISSUE-004 historical whitespace evidence retained:** earlier diagnostics refer
to the initial unborn-repository import. DOCS-001 checks the documentation delta
against ed096d2; current results appear in work history. No original hard-break
formatting, Git whitespace configuration or mandatory checks were changed to
hide the earlier failure.

No move conflicts or tooling dependencies on old document locations were found.
The bootstrap spec's old prompt reference is historical evidence, preserved
unchanged and resolved by [the migration map](../README.md#docs-001-path-migration)
and archived original prompt. No new application defect or independent approval
is inferred from this documentation cleanup.

### 2026-11-10T01:49:08+05:00 — ISSUE-002 Windows Git workaround

The preceding DOCS-001 blocked assessment applies to Linux Git. Read-only
checks of the already-installed Windows Git returned exit 0 for both configured
user.name and user.email. No identity was invented, copied into settings or
changed. The authorized local commit can use this existing Windows Git identity;
Linux Git remains unconfigured. State: WORKAROUND_AVAILABLE, commit result to be
reported in the handoff. No hooks, signing or permissions are bypassed.

## 2026-11-10 — DOCS-002 historical-reference note

No new application or tooling issue encountered. Prompt files were intentionally
removed at the owner's request. Earlier links to docs/prompts/ in append-only
records identify former files rather than active documentation. Use commit
`923d9ea` to retrieve them; active index/current-state links were updated.

## 2026-11-10 — ISSUE-005 — Aggregate typecheck fails on Assertion declarations

**Task/source:** DT-001-VERIFY at d469076. **State:** OPEN; diagnosis recorded,
no repair authorized/applied. **Environment:** Windows Node 22.19.0, npm 11.14.1,
TypeScript 5.9.3, Vitest 5.1.0, jest-dom 7.0.1; invoked through WSL2 interop.
**Reproduce:** `npm run typecheck`, exit 2; three TS2428 diagnostics in
jest-dom/types/vitest.d.ts:5 and Vitest config/task-utils declarations.
**Confirmed cause:** Existing jest-dom augmentation declares Assertion<T> while
Vitest declares Assertion<R,T>; TypeScript rejects the merged parameter lists.
**Attempts:** Read declarations; left dependencies, tests and tsconfig unchanged.
The aggregate script stops before its later compiler commands. Invoking the
existing shared and renderer configs directly via Windows Node exited 0 each.
The first two direct .cmd wrapper attempts exited 1 because the shell consumed
unquoted backslashes; corrected executable invocation, not configuration.
**Proposed solution:** Diagnose a compatible package pair or matcher typing
strategy; present exact dependency/lock/test-import changes for scoped approval
before touching existing surfaces. Do not use skipLibCheck or edit node_modules.
**Verification:** Unresolved; candidate runtime tests independently pass 22 cases.
That success does not make typechecking pass. Full report: ../validation/DT-001-baseline.md.

## 2026-11-10 — ISSUE-006 — TypeScript lint import rule applied to CJS configs

**Task/source:** DT-001-VERIFY at d469076. **State:** OPEN.
**Reproduce:** `npm run lint`, exit 1; two errors, no warnings:
forge.config.cjs:1 and webpack.renderer.config.cjs:1, no-require-imports.
**Confirmed cause:** Existing recommended TypeScript lint rules cover these
CommonJS configuration files, where require is used to load dependencies.
**Attempts:** Inspected current config and diagnostics; made no lint/build repair.
**Proposed solution:** Add a scoped **/*.cjs override disabling only
@typescript-eslint/no-require-imports, retaining all other rules. This is an
existing-configuration revision requiring explicit approval; not applied.
**Verification:** Unresolved. Passing source compilation does not clear lint.

## 2026-11-10 — ISSUE-007 — Ordinary test command has no integrated suite

**Task/source:** DT-001-VERIFY at d469076.
**State:** OPEN_INTEGRATION; expected failure control, not a fabricated test defect.
**Reproduce:** `npm test`, exit 1: No test files found. Its configured unit,
integration and acceptance locations contain no executable tests; test-candidates
is excluded and passWithNoTests remains false.
**Actual separate evidence:** `npm run test:candidates`, exit 0; 6 files, 22 cases
pass. Existing discovery test also passes. No missing dependency/runner crash
was mistaken for this empty-suite condition.
**Solution proposed:** Separately authorize the precise ordinary discovery
include/exclusion change and corresponding existing discovery-test/B10 revision
needed to execute the same cases through the normal suite. Preserve fail-on-zero
and all behavioural coverage. No suite moved, renamed, weakened or promoted here.
**Approval boundary:** Existing execution/expectation changes require explicit
scoped approval. Initial approval of newly authored tests is not a blocker.
**Verification:** Integration not performed; ordinary test command still fails.

## 2026-11-10 — DT-001-VERIFY environment and prerequisite observations

ISSUE-001: actual current host kernel is WSL2; historical npm wrapper wording
about WSL 1 was not reused as an OS diagnosis. Installed Windows Node/npm/Git
and Electron were usable through authorized interop. Bare Linux Node is absent.
Inherited ELECTRON_RUN_AS_NODE=1 explained the initial version-only Node-style
output; a version-only child with the flag removed returned Electron v45.2.3,
exit 0. Forge already removes this flag for development GUI launch. No persistent
environment, permissions or settings were changed.

ISSUE-002: existing configured Windows Git remains the local-commit workaround;
no identity was invented or changed. ISSUE-003: all 27 direct package versions
match manifest/lock/install; npm ls --depth=0 exits 0. This establishes installed
prerequisites at this depth, not healthy declarations/build/runtime overall.

Packaging preflight (not a reproduced package defect): an Electron ZIP is cached,
but the current helper validates it by fetching checksum metadata with cache
bypass and may fall back to a binary download. Package/make were NOT_RUN under
the no-extra-fetch condition. No cache-clearing/config workaround was attempted.
Windows development rendering/metadata/normal-close were observed with no repair;
native security attacks, packaged/installed apps and Mac checks remain unexecuted.
A native accessibility read returned no controls; it was not recorded as a pass.

## 2026-11-10T03:14:37+05:00 — ISSUE-005 — Locally verified compatibility repair

**Task:** DT-001-TYPEFIX, starting f23d78ef2beb2f51406362d20262bed38918bee1.
**Status:** LOCALLY_VERIFIED; independent acceptance not claimed. Historical open
diagnosis above is preserved; this dated entry supplies the actual repair result.
**Environment:** native Windows Node 22.19.0 / npm 11.14.1 via WSL2;
TypeScript 5.9.3, Vitest 5.1.0, jest-dom 7.0.1 (installed versions inspected).
**Reproduction:** `cmd.exe /c npm run typecheck` exited 2 with the same three
TS2428 errors before edits; original candidates passed 22 cases (exit 0).
**Cause:** jest-dom's Vitest entry point augments Assertion<T>; installed Vitest
uses Assertion<R,T>. The public Matchers<R,T> interface is the supported current
augmentation surface. Standalone exports expose the library's matcher types.
**Failed approach/evidence:** existing Vitest-specific import fails declaration
merging despite passing runtime tests. No package/configuration workaround was
attempted; the authorized standalone adapter passed on its first implementation.
**Solution:** owner-authorized replacement of the shell's single side-effect
import; actual standalone matchers registered with expect.extend, with local
Matchers<R,T> declarations derived from the public upstream matcher interface.
New fixed regression checks cover real failures, negation, awaited resolves,
sync/async return types, overloads and rejection of invalid/misspelled calls.
**Verification:** aggregate typecheck PASS (0, all three compiler commands),
candidates PASS (0, seven files/27 cases: original 22 plus five new; zero skips).
Integrity comparison preserves original test bodies/expectations and protected
source/config/dependency files. No suppression of TS2428 or library checking.
**Residual limits:** ISSUE-006 lint FAIL (1, same two CJS rule errors), ISSUE-007
ordinary test FAIL (1, no files); neither repaired/waived. Runtime, package,
installer, macOS, security enforcement and AI checks NOT_RUN in this task.
See [full evidence](../validation/DT-001-typefix.md). Next: owner review, then
separately scoped lint/discovery work. No dependency installation or push.

## 2026-11-10T03:36:33+05:00 — ISSUE-008 — Conflicting ordinary task-completion gates

**Task:** DOCS-003. **Status:** IN_PROGRESS pending documentation verification.
**Starting revision/environment:** cbc55c4b51c869ca9fb1ca71ae3eecdb3e731265,
clean main, WSL2 workspace; documentation-only inspection with Python/Git/rg.
**Symptom/reproduction:** TASKS active preamble required independent evidence for
DONE; templates required reviewer/trusted-gate fields, while active summaries put
a verified typing repair in a generic pending-review state. TEST_POLICY completion
text conflated local results with an evaluator gate. Read the starting files or
search their completion/reviewer/evaluator wording to reproduce the inconsistency.
**Cause:** previous clarification removed initial-test approval gates but left
completion rules and status reporting inconsistent; README/architecture still
suggested untested scaffold or unconfigured evaluator requirements.
**Failed attempts:** none for this correction; it is a documentation inconsistency,
not a reproduced application defect or evidence of independent enforcement.
**Solution:** owner's DOCS-003 clarification (D-024) explicitly authorizes active
policy/template/memory updates: assigned outcomes plus required checks and memory
permit DONE with local evidence, without generic review. Existing-test revision,
installation/push, technical, security and release-specific controls are retained.
**Typing evidence:** existing cbc55c4 report records typecheck PASS (0), original
22 + five candidates PASS (0), integrity/whitespace PASS; unrelated CJS lint and
ordinary discovery FAIL (1 each). No rerun is fabricated. Typing subtask becomes
DONE at that full revision; parent remains IN_PROGRESS, partially verified.
**Verification:** pending dependency-free consistency, link, history, scope/hash
and whitespace checks. Original validation reports and historical records remain.
**Residuals/next:** ISSUE-006/007 and packaging/native/macOS gaps remain unchanged;
no broader task completion or test approval is inferred. No owner review is needed
for DOCS-003 completion after its own documentation checks pass.

### 2026-11-10T03:39:46+05:00 — ISSUE-008 verification and resolution

**Task:** DOCS-003. **Status:** DONE; documentation inconsistency resolved locally.
`python3 /tmp/check_docs003.py` exited 0: scope/hash, historical prefixes, technical
requirements, preserved controls, active completion/status rules, prior cbc55c4
evidence, 61 local links and git diff --check all PASS. Application commands are
NOT_RUN in DOCS-003; prior typing results are not reruns or independent evidence.

Actual failed checks retained: the initial helper exited 1 after its earlier
scope/history/protection/policy checks passed, because it expected a prose phrase
not present in the existing report. Corrected the documentation helper to inspect
the report's actual total/new-case inventory table; the report stayed unchanged.
A separate git diff --check exited 2 on five modified/new template Markdown hard
breaks (the whitespace pattern seen in ISSUE-004). Removed trailing whitespace
only on those changed lines, using paragraph separation. The rerun passed (0).
No application/test assertion, config or recorded result was revised to hide a
failure. ISSUE-006/007 and parent release/native/platform gaps remain unchanged.
No owner action or review is required to complete this documentation task.

## 2026-11-10T03:59:19+05:00 — ISSUE-006 — Verified two-file lint-scope resolution

**Task:** DT-001-LINTFIX — DONE. **Status:** RESOLVED_LOCALLY.
At 9a9ff4b98ae5ad7b8ead8dab4ffd5db2cd6f9891, unchanged lint reproduced the two known errors (exit 1,
zero warnings). Sixteen fixed real-ESLint regressions then produced meaningful
red: only two actual target checks failed; original 27 and 14 negatives passed.
Owner-authorized exact override disables only no-require-imports for
forge.config.cjs and webpack.renderer.config.cjs after recommended configs.
Unlike the older all-.cjs proposal above, no other path is exempt. No alternative
repair/failed harness attempt or test revision was needed. Installed Windows
Node 22.19.0, ESLint 9.39.1/typescript-eslint 8.72.2; full environment in report.
Verification: lint/typecheck PASS (0), 43 candidates PASS (0), negative controls
preserve non-target/TS imports, target unused-variable and privileged-import rules;
exact-delta/hash/whitespace checks PASS. ISSUE-007 remains FAIL (1, no files),
outside this repair. Native/package/installer/AI/macOS checks NOT_RUN here.
Historical failures retained; [evidence](../validation/DT-001-lintfix.md).
No owner review needed for completion; next separate task is scoped ISSUE-007.
