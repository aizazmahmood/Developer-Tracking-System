# Decision Register

Accepted user directions are distinct from proposed technical choices. No technical proposal below is silently treated as owner-approved. Change a decision by adding a superseding record with reason, alternatives, impact, approval and evidence.

| ID | Status | Decision / proposal | Reason |
|---|---|---|---|
| D-001 | USER_SELECTED | Electron rather than the Rust desktop stack | Chosen in the preceding planning discussion. |
| D-002 | USER_SELECTED | Windows release first; macOS release later | Explicit release sequence. |
| D-003 | USER_SELECTED | Test-first development; Codex may not weaken tests to justify code | Explicit development requirement. |
| D-004 | USER_SELECTED | Markdown task history and issue/solution memory | Explicit continuity requirement. |
| D-005 | PROPOSED | One codebase; shared domain/application modules and platform adapters | Avoid a second product or scattered OS branches. |
| D-006 | PROPOSED | Local-first SQLite records; AI and sync are non-blocking | Preserve time independently of connectivity or inference. |
| D-007 | PROPOSED | React/TypeScript; Electron Forge with Webpack/TypeScript initially | Forge's Vite plugin is currently marked experimental; avoid this risk for the first shell. |
| D-008 | PROPOSED | better-sqlite3 in a single-writer utility process | Keep native database work away from the UI/main event loop; validate packaging first. |
| D-009 | PROPOSED | Ollama, local vision model, model/prompt versions recorded | Avoid hosted inference fees and keep default processing local. Model not yet selected. |
| D-010 | PROPOSED | Recording pauses on lock/sleep; resumes explicitly | Avoid silently counting unattended intervals or restarting capture. |
| D-011 | PROPOSED | No automatic deduction based on mouse/keyboard inactivity | Screen activity is not a reliable account of all work. |
| D-012 | PROPOSED | Windows 11 x64 initial reference target; macOS Apple Silicon first candidate | Limit the first validation matrix. Exact supported versions require owner approval. |
| D-013 | PROPOSED | One sample every five minutes; no continuous video retention | Starting cadence for validation, not a completeness guarantee. |
| D-014 | PROPOSED | Raw images remain local; delete after observation; encrypted retry buffer capped at 24h/250MB | Bound sensitive retention and disk use. No claim of forensic secure erasure. |
| D-015 | PROPOSED | Human-approved test contract and external trusted acceptance evaluator | Agent instructions alone cannot enforce test integrity. |
| D-016 | PROPOSED | Playwright desktop automation plus real-device release checks | Electron support is experimental; simulated CI cannot establish every native interaction. |

## Approval record template

Decision ID:  
Reviewer and date:  
Approved revision / PR:  
Evidence reviewed:  
Any conditions or expiry:  
Supersedes:

## 2026-11-10 — Initial bootstrap choices (no feature acceptance)

| ID | Status | Choice and evidence | Remaining approval |
|---|---|---|---|
| D-017 | BOOTSTRAP_AUTHORIZED | Owner requested execution of CODEX_BOOTSTRAP_PROMPT.md in this workspace; its BOOTSTRAP_ONLY limit permits local repo, initial config, candidate tests and static shell. | Does not approve DT-000, DT-001 contract or later feature work. |
| D-018 | PROPOSED_SCAFFOLD | Forge 8.0.1 Webpack, Electron 45.2.3, React 19.3.1, TypeScript 5.9.3; build Node 22.19.0 / npm 11.14.1. All 27 direct pins checked against registry metadata; docs/TOOLCHAIN.md explains compatibility and source checks. | Owner installation, generated lockfile review, real builds and independent contract approval pending. |
| D-019 | PROPOSED_SCAFFOLD | Metadata-only typed bridge; bundled sandbox preload, strict CSP with external CSS; loopback development without HMR/client/live reload. Forge 8 requires explicit main index.cjs. | Actual Electron and packaged runtime security checks pending; custom protocol/fuse hardening reserved for reviewed work. |

Initial pins/config were created under the bootstrap authorization. These entries
are not independent approval of future changes to the now-created toolchain or
protected configuration. No timers, storage/model dependencies or hosted services
were added. No prior decision/approval record was altered.

## 2026-11-10 — D-020 — Owner-requested canonical documentation layout

**Status:** OWNER_REQUESTED for DOCS-001; implementation review PENDING.
**Evidence:** Owner asked to read and execute the revised
[stored documentation prompt](../prompts/CODEX_BOOTSTRAP_PROMPT.md), whose explicit
authorization permits documentation moves, reference updates and limited root
AGENTS.md path/organisation changes.

Canonical locations: general docs in docs/, five memory files in docs/memory/,
current prompts in docs/prompts/, obsolete prompts in docs/prompts/archive/.
AGENTS.md remains the only root instruction file; build/tool paths stay in place.
The original bootstrap prompt was recovered verbatim from `ed096d2` into the
archive; its replacement was preserved as the current documentation prompt.
[The index](../README.md#docs-001-path-migration) maps earlier locations.

This authorizes organisation only. It grants no feature-contract acceptance,
weaker tests/security/approval rules, dependency changes, remote writes or push.
Existing decision and approval records above are preserved, including old paths.

## 2026-11-10 — D-021 — Remove stored task prompts

**Status:** OWNER_REQUESTED; DOCS-002 implementation review pending.
Owner explicitly said there is no need to keep prompts and authorized removing
the folder and files. This supersedes only D-020's prompt-retention arrangement.
Removed docs/prompts/ including its archived bootstrap file; Git history retains
the former contents. Historical entries are preserved, including earlier links
that refer to the removed files. General documentation/memory locations and all
security, test, approval, dependency and push rules remain unchanged.

## 2026-11-10 — D-022 — Owner correction: approval for test revisions only

**Status:** EXPLICIT_OWNER_CORRECTION; effective for active workflow.
**Evidence/source:** User asked to read and run the externally supplied
DT-001-VERIFY-corrected-test-policy.md on 2026-11-10. It explicitly authorizes the
narrow documentation-policy updates and forbids new/changed executable tests,
source repairs or infrastructure changes in this validation task. The assignment
is kept outside the repository; no prompt storage is recreated.

> Codex may write new tests and implement against them without owner approval.
> Only changes to existing tests or existing test behaviour require explicit,
> scoped owner approval.

This supersedes only conflicting initial-test/contract approval, candidate
promotion and prerequisite reviewer-sign-off wording in prior decisions/policy
and historical next steps (including initial-approval portions of D-003/D-015
and bootstrap records). Tests become existing once written, including earlier
in the same task; authorship, a general continue, passing results or silence is
not authority to revise them. New independent tests may be authored when assigned;
additive cases must preserve all prior cases, setup, expectations and execution.

Revisions to existing tests, fixtures, snapshots, mocks/helpers, discovery,
thresholds, commands/configuration and dependency resolution affecting existing
checks need explicit scoped approval. Record the exact scope/source of any real
approval; do not relabel tests as drafts or change harness/production solely to
hide failure. No revision approval is issued by this entry.

Independent infrastructure remains separately tracked and unconfigured; it is
not a replacement initial-approval gate. Security/privacy, owner-only dependency
installation/pushes, meaningful local commits, truthful results and separately
established release controls are retained. Historical approval records and
acceptance cases remain unchanged. Existing test-candidates naming/discovery
stays in place; any execution integration is a separately scoped revision.

## 2026-11-10T03:14:37+05:00 — D-023 — Narrow standalone DOM matcher integration

**Status:** OWNER_AUTHORIZED scope; implementation LOCALLY_VERIFIED, review pending.
**Evidence/source:** owner explicitly requested reading and executing the external
DT-001-TYPEFIX-dom-matcher-compatibility.md task. The submission, rather than an
assistant suggestion or earlier generic acknowledgement, authorizes this change.
The task document is not retained in the repository and no prompt folder returns.

Authorization covers exactly replacing the shell test's jest-dom/vitest import
with ../tests/fixtures/register-dom-matchers, developing that adapter and its
declaration under tests/fixtures, and creating independent regression checks.
Every existing test assertion, expected value, mock, hook and environment must
remain unchanged. Newly recorded checks were not revised. No broader test,
discovery, dependency, source, policy or configuration authorization is implied.

The adapter registers genuine @testing-library/jest-dom/matchers through Vitest
expect.extend. Ambient Matchers<R,T> augmentation reuses exported upstream types,
preserving overloads and R (void or Promise<void>) without an assertion catch-all.
This avoids the incompatible one-parameter Assertion augmentation. Existing
compiler includes already cover the files; no discovery/config update is needed.

Typecheck and 27 candidates pass locally. Lint and ordinary-suite failures remain
as documented in ISSUE-006/007. This is not full DT-001 acceptance, independent
enforcement, package/platform verification or permission to change those controls.
See [validation](../validation/DT-001-typefix.md) and D-022 for the revision boundary.

## 2026-11-10T03:36:33+05:00 — D-024 — Verified bounded tasks may be completed locally

**Status:** EXPLICIT_OWNER_CORRECTION, effective for active workflow.
**Source:** owner explicitly requested execution of external
DOCS-003-task-completion-policy.md. This authorizes the active policy/template
and status edits in DOCS-003; it does not authorize code, test, configuration,
dependency, installation, remote or release changes. No prompt copy is retained.

New tests may be written first, recorded/run and implemented against without
initial approval. Bounded work may be DONE after its assigned outcome and required
checks pass, evidence is recorded and memory updated. Local checks establish
local results; ordinary completion needs no generic human review, frozen
reviewer-approved contract, candidate promotion or unconfigured evaluator artifact.
Required checks cannot be dropped, excluded or downgraded after failure.

Existing tests include those authored earlier in the same task. Their assertions,
expectations, fixtures, snapshots, helpers, discovery/filtering, thresholds, runner
settings and dependency resolution affecting execution retain the explicit scoped
owner-approval boundary. New coverage cannot neutralise existing coverage.
Policy/dependency changes, owner-only installation/pushes, remote operations and
release/signing permissions remain separate; no configured control is bypassed.

Use PLANNED, IN_PROGRESS, DONE or BLOCKED for tasks and PASS, FAIL or NOT_RUN for
checks. AWAITING_OWNER_APPROVAL qualifies a specific authorization need;
AWAITING_REVIEW applies only to a concrete assigned/configured review. No generic
IMPLEMENTED_PENDING_REVIEW queue. Owner action: None for completing this task
unless an actual specific permission is required. Completed work does not
permit starting unassigned follow-on features.

DT-000 remains infrastructure planning, NOT_CONFIGURED; it is not an unrelated
local-completion gate. Task-specific native/model checks and actual configured
release controls remain mandatory. DONE is not a production-readiness, independent
evaluation, signing, installation or macOS claim. An already assigned bounded
repair may finish while its parent is IN_PROGRESS; keep all parent gaps visible
and do not invent subtasks after failure to hide incomplete work.

This supersedes conflicting active completion/review wording and historical
completion-gate portions of D-015/D-022/D-023 without erasing their evidence or
changing technical acceptance cases. Local cbc55c4b51c869ca9fb1ca71ae3eecdb3e731265
and the unchanged typefix report support DT-001-TYPEFIX DONE; DT-001 is IN_PROGRESS,
partially verified with lint/discovery failures and packaging/native/platform gaps.
No new application run or independent acceptance is claimed. No review is needed
merely to complete that repair or DOCS-003 after its documentation checks pass.
