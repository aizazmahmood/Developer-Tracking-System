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
