# Windows-First Delivery and macOS Release Plan

**Status:** Proposed. No release artifact or CI job has been produced.

## Scope and support matrix

Initial proposed reference target: Windows 11 x64. Select exact Windows versions during bootstrap from the team's actual devices and supported Electron baseline. Windows ARM64 and other architectures are not implied by an x64 release.

macOS follows from the same codebase. Apple Silicon is the initial candidate target; Intel support requires its own decision and validation. Pin supported macOS versions when the platform phase begins. Do not promise a universal binary before native dependencies and signing have been tested.

## Delivery sequence

### Phase 0 — Guardrails before feature implementation

Approve architecture defaults and reviewer roles. Configure independent acceptance checks and repository protection. Establish AGENTS.md and Markdown memory. Approve a small first test contract. Validate the rejection path by intentionally proposing an unauthorized protected-test/config change. This is a governance test, not permission for Codex to bypass settings.

### Phase 1 — Small installable shell and platform seams

Build the smallest secure Electron window, typed preload bridge and tray state. Pin tools. Produce a Windows packaged launch smoke test. Validate the SQLite utility process/native module in that package and prove the chosen window-capture approach using a synthetic test window. Establish macOS compilation/shared-core jobs early when a Mac runner is available. Report NOT_RUN when it is not.

### Phase 2 — Reliable recording before AI

Implement the pure timer contract, transactional segments/checkpoints and visible recovery. Add timer UI, tray, single-instance handling, pause on lock/sleep and explicit resume. Verify missing final shutdown callbacks do not erase prior committed progress. A recording build must work without internet or Ollama.

### Phase 3 — Permitted context

Add source selection, capture indicators, generation cancellation, unavailable-source handling and raw-image lifecycle. Verify real Windows capture and permission boundaries on a physical machine with sanitized windows. Add sensitive-data and time-only controls.

### Phase 4 — AI descriptions and developer review

Connect the local model via the bounded worker queue. Introduce observation extraction and summary revision history. Run the real-model corpus. Developer confirmation is separate from the original AI draft. No automatic task-completion verdict.

### Phase 5 — Local pilot or connected release

A local pilot can review and export its own records without a manager service. Label it honestly. A connected release additionally requires real authentication, an approved sync API, secure credential storage and duplicate/conflict tests. Desktop development does not secretly imply that the server/dashboard exist.

### Phase 6 — Windows release candidate

Sign the installer, verify provenance and test the same final packaged artifact on clean supported machines. Exercise installation, launch, capture selection, recording, restart, an upgrade migration and uninstall/data-retention behaviour. Do not erase records by default without explicit consent. Validate rollback/forward repair for a failed migration before enabling automatic updates.

Signing keys and release approval remain outside Codex implementation permissions. A signed package is not a guarantee that Windows will never show a security/reputation warning. No unreviewed update installation while a session is recording; save and use an explicit restart flow.

### Phase 7 — macOS production release

Complete macOS-specific permissions, menu-bar/tray, display/Retina, protected-source and lock/sleep checks. Sign and notarize the package through a protected Mac release environment. Test first-run and revoked/re-granted permission flows and upgrades on supported architectures. Passing shared unit tests is not a substitute for these checks [S13].

## CI strategy

Every candidate: trusted policy/inventory gate; type checking; linting; unit/property tests; real persistence integration; key renderer tests; Windows desktop acceptance. Shared-code changes should also run macOS compilation and shared-core tests from early development. Test failures on an existing Mac job cannot simply be made optional because release is later.

Scheduled/release gates: targeted mutation tests, real-model evaluation and reference-device performance. Native capture permission dialogs, interactive lock/sleep, actual installer behaviour and hardware acceleration require real-device evidence; do not infer coverage from a headless hosted runner.

The authoritative result is attached to the exact candidate commit by a trusted controller. Release signing executes only after acceptance; candidate tests never receive signing secrets. Pin build actions and dependencies and retain provenance/artifacts.

## Performance evidence

Freeze reference hardware, OS versions, power mode, capture settings, model digest, workload and measurement method. Measure whole tracker process-group memory/CPU and separate/combined Ollama resource use. Record warm/cold startup, Start/Stop persistence p95, idle cost, sustained capture, long-session growth and queue recovery.

The initial p95 250 ms persistence target is a proposed budget, not a measured promise. Approve budgets after baseline. Changes require reviewed justification rather than automatic threshold relaxation.

## Release evidence checklist

Approved feature contract and exact artifact hash; actual OS/architecture matrix; test inventory and results; migration/recovery proof; source-permission/cancellation checks; model evaluation with limitations; retention/deletion behaviour; security/configuration review; performance record; signed artifact/provenance; open risks; updated memory and independent release approval.

For anything not executed, record NOT_RUN and the reason. Do not describe that platform/feature as verified.
