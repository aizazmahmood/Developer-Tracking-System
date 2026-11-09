# Task Backlog

**DT-001 — IN_PROGRESS; partially verified. DT-001-TYPEFIX — DONE; locally verified
at cbc55c4b51c869ca9fb1ca71ae3eecdb3e731265. DOCS-003 — DONE. DT-001-LINTFIX — DONE. DT-001-DISCOVERY — DONE.**
DT-000 is PLANNED (infrastructure NOT_CONFIGURED); other unassigned features remain PLANNED.

Write new tests first, record/run them, implement and verify without initial test
approval or a generic human-review checkpoint. Existing-test/effective-execution
revisions require explicit scoped owner approval, including tests just written.
Mark an assigned bounded task DONE when its outcome and required checks pass,
evidence is recorded and memory updated. Local checks are legitimate evidence
for their scope; do not require an unconfigured evaluator or call them independent.
Do not drop checks or invent a subtask after failure to disguise unfinished work.

Task status: PLANNED, IN_PROGRESS, DONE or BLOCKED. Each relevant check: PASS,
FAIL or NOT_RUN with reason and evidence scope. AWAITING_OWNER_APPROVAL is only
an actual authorization qualifier; AWAITING_REVIEW requires an explicitly assigned
review or actually configured control. Owner action is None for completing a task
unless a specific permission is genuinely required. Preserve assigned native/model,
release, installation, dependency, policy and remote-operation rules.

## Current bounded work and evidence

| Task | Status | Evidence and remaining work |
|---|---|---|
| DT-001-DISCOVERY | DONE | Local typecheck/lint/default/focused PASS (0): default 45, focused 43; 42 unchanged + authorized B10 + two new cases. No-match safeguard PASS (expected exit 1). ISSUE-007 resolved. |
| DT-001-LINTFIX | DONE | Prior local lint/typecheck PASS (0), 43 candidates PASS (0: original 27 + new 16), genuine two-case red; exact override/integrity PASS. Its ordinary-discovery failure is superseded by DISCOVERY. |
| DOCS-003 | DONE | Documentation consistency, preserved controls/history, local links, prior evidence, exact scope/hashes and whitespace PASS. Application checks NOT_RUN in DOCS-003; no review required. |
| DT-001-TYPEFIX | DONE | Local cbc55c4b51c869ca9fb1ca71ae3eecdb3e731265: typecheck PASS (0); original 22 + five new candidates PASS (0); integrity/whitespace PASS. Prior failures retained in its report; current lint result is in LINTFIX. |
| DT-001 | IN_PROGRESS | Partially verified; typecheck/lint/default/focused PASS (0), ordinary discovery integrated. Packaging/installer, actual native security/device checks and required macOS evidence NOT_RUN. Prior Windows development-window observation has limited scope. |
| DT-000 | PLANNED | Separate infrastructure improvement; NOT_CONFIGURED; no blanket completion gate for unrelated local development. |

Latest verification: [discovery](../validation/DT-001-discovery.md); prior
[lint](../validation/DT-001-lintfix.md), [typefix](../validation/DT-001-typefix.md)
and [baseline](../validation/DT-001-baseline.md) results retain their original scope.
ISSUE-007 is locally resolved. Next parent work is packaging/installation and
native/platform evidence, requiring a new bounded assignment; not started here.
Do not start unassigned features. Technical requirements below remain unchanged.

## Technical backlog and task-specific evidence

| ID | Deliverable | Dependencies | Required evidence before DONE |
|---|---|---|---|
| DT-000 | Separately tracked governance/enforcement improvement, defaults and reviewer setup | None | Owner-configured controls; unauthorized test/config alteration is rejected; no agent bypass. |
| DT-001 | Secure Electron shell, proposed command scripts, pinned toolchain, packaged Windows smoke build | None for assigned scaffold work; DT-000 tracked separately | Window opens; sandbox/IPC checks; clean install/launch; first macOS compile and shared tests where available. |
| DT-002 | Platform interfaces and native dependency packaging spike | DT-001 | SQLite opens in packaged utility process; selected-window capture proof on Windows; macOS adapter contract compiles. |
| DT-010 | Pure timer/session state machine | DT-001 | Recorded initial unit/property tests, meaningful red run, verified green and any later approved test revisions; pause, overlap and clock-change cases. |
| DT-020 | SQLite journal, checkpoints, recovery, corrections and outbox | DT-002, DT-010 | Real-database restart/crash/disk-error tests; no imaginary recovered hours; transactional outbox. |
| DT-030 | Timer UI, tray, single-instance and lifecycle behaviour | DT-020 | Start/pause/resume/stop UI tests; window-close behaviour; real lock/sleep/quit checks. |
| DT-040 | Consent, selected-source capture, race cancellation and retention | DT-002, DT-030 | Zero accepted post-pause captures; no source fallback; real capture/permission tests; encrypted-buffer deletion policy. |
| DT-050 | Local AI adapter, bounded jobs and observation pipeline | DT-040 | Deterministic failure tests plus real model evaluation; malformed/unsupported responses handled; no hosted fallback. |
| DT-060 | Work-description review, edits, split/merge and confirmation | DT-050 | Original AI draft retained; confirmed revision separated; estimated task allocation not presented as measured fact. |
| DT-070 | Sync adapter and approved identity/API integration | DT-020, API contract | Idempotent replay, conflict visibility, secure credentials and real endpoint smoke test. Not a server build task. |
| DT-080 | Windows release candidate | DT-030..060; DT-070 if connected release | Packaged app smoke tests; signing; migration/update test; performance and privacy gates; acceptance artifacts. |
| DT-090 | macOS production adapter and release | DT-080 plus early Mac test evidence | Native permission/retina/sleep/tray tests; signing/notarization; validated supported architecture matrix. |

DT-080 can be a clearly labeled local-only pilot without DT-070. It must not pretend to synchronise with a manager dashboard that has not been built. A connected production release requires DT-070 and a separately delivered server.

## Historical status entries

Dated entries below preserve their original wording; the current summary above
and D-024 supply the superseding completion rule without rewriting history.

## 2026-11-10 bootstrap status

- **DT-000 — PENDING:** owner/reviewer approval and external safeguards are still
  required; docs/OWNER_SETUP.md describes owner actions without claiming enforcement.
- **DT-001 — SCAFFOLDED_NOT_VERIFIED:** local `main` repo, package/build/lint/test
  config, static shell and six proposed candidate test files are prepared.
  Contract specs/DT-001-bootstrap.md r0.1 is PROPOSED, approval PENDING. No
  dependencies installed or genuine red/green evidence. Typecheck, lint, tests,
  launch, Windows packaging and macOS checks NOT_RUN. Local commits blocked by
  missing Git identity (ISSUE-002); full staged whitespace check flags preserved
  planning Markdown hard breaks (ISSUE-004). Nothing pushed.
- **Next:** owner configures Git identity, runs `npm i`, reviews lockfile and runs
  the README commands; independently reviews contract and sets up DT-000.
  This exception does not authorize proceeding to DT-002 or timer implementation.

## 2026-11-10 — DOCS-001 documentation migration

**Status:** IMPLEMENTED_PENDING_REVIEW. Owner explicitly assigned the revised
[documentation prompt](../prompts/CODEX_BOOTSTRAP_PROMPT.md). Moved the five memory
files here, root README to [docs/README.md](../README.md), and current prompt into
docs/prompts/. Root AGENTS.md is the only loose root Markdown instructions file.
Updated active links, architecture layout and templates; historical entries and
prior task statuses remain unchanged. Earlier path strings refer to the old
layout; [the migration map](../README.md#docs-001-path-migration) is canonical.

Dependency-free layout/history/link/hash checks and diff review are recorded in
[work history](PROJECT_MEMORY.md). Application checks NOT_RUN (documentation only).
Linux Git identity was absent (ISSUE-002); subsequent Windows Git checks found
the existing configured identity, permitting the authorized local commit without
configuration changes. Review remains pending; no independent approval is implied.
Next: owner reviews migration and its local commit. No dependency
installation, remote change or push performed; no feature work is part of DOCS-001.

## 2026-11-10 — DOCS-002 remove stored prompts

**Status:** IMPLEMENTED_PENDING_REVIEW. Owner requested removal of the prompt
folder and files. Removed both docs/prompts files and empty directories; updated
active index/instructions/layout references. Earlier DOCS-001 entries and their
historical links remain unchanged; prior contents are recoverable from `923d9ea`.
Application files and test contracts are unchanged. Next: owner reviews cleanup.

## 2026-11-10 — DT-001-VERIFY baseline and policy alignment

**Status:** NOT_VERIFIED overall; authorized policy correction implemented.
Owner clarified that Codex may write new tests and implement against them without
initial approval. Existing-test/test-behaviour revisions require explicit scoped
approval, including tests just authored in the same task. This supersedes earlier
initial-contract/candidate-approval next steps above without rewriting history.
DT-000 enforcement infrastructure is separately tracked, not a feature-start gate.

Actual results: candidate suite 6 files/22 cases PASS (0); typecheck FAIL (2,
Assertion declaration mismatch); lint FAIL (1, two CJS import rules); ordinary
npm test FAIL (1, no files). Shared/renderer compiler checks PASS (0 each).
Windows development window/metadata/close observed; npm start exit 0.
Package/make/packaged launch/installed app/Mac NOT_RUN under documented limits.
[Report and B01–B12 map](../validation/DT-001-baseline.md).

No executable tests, source, specs/acceptance cases, dependencies, lockfile or
build/test configuration changed; no initial test approval remains a blocker.
Smallest next task: inspect a compatible typing repair and present the precise
existing-surface revision for approval. CJS lint override and discovery integration
are separate proposed revisions (ISSUE-005..007); none applied here. No dependency
installation or push performed. The validation task does not authorize features.

## 2026-11-10T03:14:37+05:00 — DT-001-TYPEFIX — DOM matcher compatibility

**Status:** IMPLEMENTED_PENDING_REVIEW; bounded repair LOCALLY_VERIFIED.
Starting revision: f23d78ef2beb2f51406362d20262bed38918bee1. Owner explicitly assigned the external
DT-001-TYPEFIX task, authorizing only the existing shell matcher import change,
new adapter/declaration and new independent regression checks. Initial regression
contents were recorded first and not revised. No initial approval gate applies.

Aggregate typecheck PASS (0), original 22 plus five new candidate cases PASS
(0, seven files, zero skips). Lint FAIL (1, same two CJS errors); ordinary suite
FAIL (1, no files). Application source, dependencies/lockfile, all configurations,
policy/specs and all existing assertions remain unchanged. ISSUE-005 is locally
verified; DT-001 overall is NOT_VERIFIED, not DONE. Native runtime, release and
independent acceptance evidence remain open. See [report](../validation/DT-001-typefix.md).

Next owner action: review the local repair, then separately authorize the exact
ISSUE-006 lint-config revision; ISSUE-007 discovery/expectation integration remains
separate. Neither is started here. No installation, prompt storage or push.

## 2026-11-10T03:39:46+05:00 — DOCS-003 completion/status correction

**DOCS-003 — DONE.** Active rules and templates now allow new-test creation,
implementation and ordinary bounded completion without a generic review gate.
Explicit scoped approval still protects existing tests/effective execution,
including tests written earlier in the same task. All task-specific checks,
security, dependency/policy, owner-only installation/push and release rules remain.

**DT-001-TYPEFIX — DONE; locally verified at
cbc55c4b51c869ca9fb1ca71ae3eecdb3e731265.** The unchanged local report/commit
substantiate required typecheck/candidate/integrity criteria. This is a dated
workflow/status correction, not a new verification run or independent review.
Historical pending-review wording and original results remain preserved above.
No other historical task is retroactively marked DONE and no tests are approved
by this status correction.

**DT-001 — IN_PROGRESS; partially verified.** Last recorded lint FAIL (1),
ordinary discovery FAIL (1, no files); packaging/make/installed artifact, native
security/device validation and required macOS evidence NOT_RUN. Prior Windows
development observation remains limited. No parent failure is waived or hidden.
DT-000 remains PLANNED/NOT_CONFIGURED as separate infrastructure work.

Documentation consistency, local links, history/technical-requirement preservation,
58 unrelated file hashes, prior-evidence/source attribution and git diff --check
PASS (0). Application checks NOT_RUN this session (documentation only).
Owner action: None for completing this task; no generic review required.
Next technical tasks remain unassigned ISSUE-006 lint and ISSUE-007 discovery
repairs, each needing exact protected-revision authorization. Neither started.
No source/tests/fixtures/dependencies/configuration/CI change, installation or push.

## 2026-11-10T03:59:19+05:00 — DT-001-LINTFIX — DONE

Starting 9a9ff4b98ae5ad7b8ead8dab4ffd5db2cd6f9891; exact owner-authorized two-file ESLint exception.
Genuine red: 2 fail/41 pass; green: 43 pass (original 27 + new 16), zero skips.
Lint/typecheck PASS (0); ordinary npm test FAIL (1), pre-existing ISSUE-007.
Integrity/whitespace PASS; fixed new tests and all existing tests preserved.
See [report](../validation/DT-001-lintfix.md). ISSUE-006 resolved locally;
DOCS-003/typefix remain DONE and DT-001 IN_PROGRESS with discovery/runtime gaps.
No owner review required; next separate task is specifically scoped ISSUE-007.
No installation or push; no discovery, packaging or feature work started.

## 2026-11-10T04:19:45+05:00 — DT-001-DISCOVERY — DONE

Started 659fe8c931ef007062fb76879aeefccc3c1f066a; exact owner-authorized default discovery/B10 revision.
Real red assertions preceded the runner edits; all required commands now PASS
(0). Default executes 45 cases, focused 43: 42 unchanged + revised B10 + two new
ordinary cases in default only. Actual inventory comparison and no-match control
PASS (expected exit 1 for no files), with fixed tests/history/integrity preserved.
See [report](../validation/DT-001-discovery.md). ISSUE-007 resolved locally;
prior bounded tasks remain DONE and DT-001 IN_PROGRESS for runtime/platform gaps.
No review needed; next parent work is unassigned packaging/native validation.
No installation, push, packaging or features started.
