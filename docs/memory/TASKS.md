# Task Backlog

**DT-001 is SCAFFOLDED_NOT_VERIFIED under the explicit BOOTSTRAP_ONLY exception; DT-000 remains PENDING and all feature tasks remain PLANNED.** Work in dependency order. Every task needs a reviewed acceptance contract and a memory entry. A task can be TEST_DESIGN, READY_FOR_IMPLEMENTATION, SCAFFOLDED_NOT_VERIFIED, IN_PROGRESS, BLOCKED, IMPLEMENTED_PENDING_REVIEW or DONE; DONE requires independent evidence.

| ID | Deliverable | Dependencies | Required evidence before DONE |
|---|---|---|---|
| DT-000 | Governance, protected test workflow, approved defaults and reviewer setup | None | Owner-configured controls; unauthorized test/config alteration is rejected; no agent bypass. |
| DT-001 | Secure Electron shell, proposed command scripts, pinned toolchain, packaged Windows smoke build | DT-000 | Window opens; sandbox/IPC checks; clean install/launch; first macOS compile and shared tests where available. |
| DT-002 | Platform interfaces and native dependency packaging spike | DT-001 | SQLite opens in packaged utility process; selected-window capture proof on Windows; macOS adapter contract compiles. |
| DT-010 | Pure timer/session state machine | DT-001 | Approved unit/property tests, meaningful red run, independent green run; pause, overlap and clock-change cases. |
| DT-020 | SQLite journal, checkpoints, recovery, corrections and outbox | DT-002, DT-010 | Real-database restart/crash/disk-error tests; no imaginary recovered hours; transactional outbox. |
| DT-030 | Timer UI, tray, single-instance and lifecycle behaviour | DT-020 | Start/pause/resume/stop UI tests; window-close behaviour; real lock/sleep/quit checks. |
| DT-040 | Consent, selected-source capture, race cancellation and retention | DT-002, DT-030 | Zero accepted post-pause captures; no source fallback; real capture/permission tests; encrypted-buffer deletion policy. |
| DT-050 | Local AI adapter, bounded jobs and observation pipeline | DT-040 | Deterministic failure tests plus real model evaluation; malformed/unsupported responses handled; no hosted fallback. |
| DT-060 | Work-description review, edits, split/merge and confirmation | DT-050 | Original AI draft retained; confirmed revision separated; estimated task allocation not presented as measured fact. |
| DT-070 | Sync adapter and approved identity/API integration | DT-020, API contract | Idempotent replay, conflict visibility, secure credentials and real endpoint smoke test. Not a server build task. |
| DT-080 | Windows release candidate | DT-030..060; DT-070 if connected release | Packaged app smoke tests; signing; migration/update test; performance and privacy gates; acceptance artifacts. |
| DT-090 | macOS production adapter and release | DT-080 plus early Mac test evidence | Native permission/retina/sleep/tray tests; signing/notarization; validated supported architecture matrix. |

DT-080 can be a clearly labeled local-only pilot without DT-070. It must not pretend to synchronise with a manager dashboard that has not been built. A connected production release requires DT-070 and a separately delivered server.

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
