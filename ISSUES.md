# Issues and Solutions

**Application state:** No application has been built in this planning pack. No runtime issue is currently recorded as reproduced or fixed.

## Index

| ID | Related task | Symptom | State | Regression evidence |
|---|---|---|---|---|
| — | — | No reproduced issue yet | — | — |

## Policy

Record every build, runtime, dependency, packaging, test, performance or AI-output problem encountered during implementation. Repeated instances may share an issue ID with dated updates. Include unsuccessful approaches so later sessions do not repeat them. Do not call an assumed cause a confirmed root cause. Distinguish WORKAROUND, FIX_IMPLEMENTED, VERIFIED and REOPENED.

Use `templates/ISSUE_ENTRY.md`. Each update is dated and appended. Link issues from the task's `PROJECT_MEMORY.md` entry. Never put secrets or actual staff captures in reproduction material; create sanitized fixtures.

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
