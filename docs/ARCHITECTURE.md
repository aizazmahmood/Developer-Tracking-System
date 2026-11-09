# Desktop Architecture — Windows First, macOS Ready

**Version:** Proposed architecture 0.1, 9 November 2026.  
**Implementation status:** Not built. Numbers below are proposed settings, not measured performance or model accuracy.

## 1. Scope

Build a desktop application that records work sessions with Start, Pause, Resume and Stop; automatically persists elapsed time; optionally gathers visible, explicitly permitted work context; and generates an editable account of what was worked on. Ship Windows first, then macOS, from one repository and one shared domain model.

This phase is the developer desktop application. The manager web dashboard, production backend, billing/payroll, workforce scoring, repository integrations and advanced automatic task verification are outside the initial desktop implementation. Define interfaces for later connectivity without requiring a server to record time.

No live manager video feed, covert capture, webcam/microphone recording or keystroke collection. Screen evidence does not establish continuous effort or completed output. A generated description is a draft, never automatic proof that a task is finished.

## 2. Stack

Electron + React + TypeScript, with a small renderer and a domain core independent of Electron. Use Electron Forge's Webpack/TypeScript route initially. Forge's Vite plugin is currently experimental, so a switch would require an explicit decision rather than an unreviewed dependency change [S1].

SQLite, initially via better-sqlite3, in a dedicated single-writer utility process. Electron native-module ABI/rebuild and packaged paths must be validated before extensive feature work [S2, S3]. Use SQL migrations, transactions and repository interfaces; do not introduce a large ORM merely for this small local schema.

Ollama as a separate, user-visible local dependency in the pilot. Access a configured vision-capable model through a worker; store the selected model digest, prompt version and schema version. Ollama supports image input and schema-constrained responses, but a correct response shape is not evidence of a correct description [S4, S5].

Vitest for pure domain and unit tests; a separate Electron-runtime integration harness for the packaged native driver; React Testing Library for user-facing component behaviour; Playwright for desktop flows after a compatibility spike. Playwright's Electron support is explicitly experimental [S6]. Mutation tests target the core timer/capture policies, not every animation [S7].

Pin compatible Electron, Node build-tool, native driver and test-tool versions in a reviewed toolchain manifest/lockfile. Do not confuse Node used by build tools with Electron's embedded Node runtime.

## 3. Runtime boundaries

```text
React renderer — display and user intent only
          |
Typed, validated preload bridge
          |
Electron main — lifecycle, native APIs, command orchestration
          |                         |
Pure domain/application core       Native platform adapters
          |
          +-- Storage utility process -- SQLite journal + outbox
          +-- Analysis worker --------- image preparation + Ollama HTTP
          +-- Sync adapter ------------ future authenticated server API
```

The renderer holds a display snapshot, not authoritative time or credentials. It receives narrow commands such as startSession, pauseSession and reviewDescription. No raw ipcRenderer exposure, filesystem access, arbitrary HTTP endpoint input or database handles. Validate payloads, message size, frame/sender identity and authorization at the main boundary [S8].

The main process registers native capture, tray and lifecycle APIs, serializes commands, and coordinates the domain. It performs no inference, image compression or blocking SQL. Native capture source acquisition stays in the process supported by Electron; worker separation does not move a main-only API into an unsupported context [S9, S10].

The storage process is the only database writer. A failed storage process must cause a clear recording error, not a UI that continues claiming hours are safely saved. The analysis worker has no privileged execution tools. Worker crashes and model failures do not crash or erase the timer. Pass minimal environment variables to child processes rather than inherited credentials [S11].

Avoid spawning a process per sample. Start the analysis worker when needed and keep a bounded job queue. Local AI remains a separate process under the user's control.

## 4. Shared core and platform adapters

Domain modules depend on interfaces: Clock, SessionRepository, CapturePort, LifecyclePort, SecretStore, ModelPort and SyncPort. Shared code does not import Electron, browser globals, Windows APIs or macOS APIs. React has no timer mathematics.

Adapters expose capabilities and explicit unavailable/denied results. Share the Electron implementation where behaviour is genuinely common, then override platform-specific details under platform/windows and platform/macos. Confine operating-system detection to the adapter factory. Do not scatter process.platform branches throughout business logic.

Every adapter has contract tests. A stub macOS adapter must return NOT_IMPLEMENTED rather than simulate success. A Windows release does not prove macOS capture works. Run shared-core tests and compilation on macOS early; defer its public release and complete native acceptance later.

## 5. Session state machine

Primary states: IDLE → RECORDING ↔ PAUSED → STOPPED. STOPPED sessions are retained, not reused. Recovery can put a prior session in NEEDS_REVIEW without silently resuming it.

Track independent states for capture (OFF/ACTIVE/UNAVAILABLE), analysis (PENDING/RUNNING/READY/FAILED) and sync (LOCAL/PENDING/SYNCED/CONFLICT). An unavailable model must not move recording to FAILED. Denied capture must not silently become whole-screen capture.

Proposed behaviour:

| Event | Time behaviour | Capture behaviour |
|---|---|---|
| Start | Persist start transaction, then acknowledge RECORDING | Begins only after permission/source selection and explicit enablement |
| Pause | Persist completed active segment | Cancel future work and reject late results |
| Resume | Open a new active segment | Revalidate approved source and permission |
| Stop | Commit final segment and STOPPED state before AI | No new capture; previously permitted observations may finish processing |
| Lock / suspend | Pause with reason; record last known valid point | Stop capture; manual resume after unlock/wake |
| Close window | Continue in tray only under the visible, approved behaviour | Remains subject to current recording/capture state |
| Quit | End or pause via an explicit prompt; flush committed state | Stop capture; do not silently keep recording |
| AI outage | No change to timer | Bounded retry/coverage gap, not unlimited capture storage |
| Capture failure | Time may continue with conspicuous UNAVAILABLE status | No fallback to another source or a public provider |
| Disk/storage failure | Do not acknowledge an unsaved transition; stop claiming durable recording | Stop capture and show recovery action |

Electron provides lock/suspend/resume events, but Windows and macOS shutdown events are not identical. Do not depend on receiving a final shutdown callback to save the day [S10]. Inactivity is not an automatic deduction in version one.

Use unique command IDs so double-clicks/retries are idempotent. Enforce one running session per local application profile and a single desktop instance. This does not prevent the same person running on another device; future server conflict handling must report that separately.

## 6. Accurate time and crash recovery

Use a monotonic elapsed-time source within each process lifetime. Keep UTC timestamps plus local timezone metadata for display and reporting. Never calculate all work from a difference of two wall-clock timestamps or increment a counter once a second and assume no ticks were missed.

Store active segments and append session events. Pause/Resume/Stop are transactions. Preserve original recorded values; manual corrections create attributed adjustment records and a reason. Sum segments; round only for display under an approved rule.

Checkpoint durable progress at a proposed five-second interval while recording. A crash can leave a gap beyond the last committed checkpoint; scheduling and storage delays mean five seconds is not a guaranteed loss bound. On restart, recover only committed progress, label the unknown interval, and allow an explicit correction. Do not fabricate hours from the crash-to-relaunch wall-clock gap.

Serialize commands and persist before reporting success. Display RECORDING_PENDING/SAVING briefly rather than a false durable success. Retain an outbox event in the same transaction as a change that must later sync. Clock changes, timezone changes, daylight-saving changes and crossing midnight must not alter elapsed-duration correctness.

## 7. Proposed local data model

| Entity | Important data |
|---|---|
| projects / task_cache | Stable ID, label, workspace, server version when connected |
| sessions | ID, owner/device, project, optional selected task, state, timestamps |
| session_events | Ordered events, reason, command ID, captured timestamp |
| active_segments | Segment ID, session ID, elapsed milliseconds, wall-clock references |
| checkpoints | Last durable elapsed progress and process/boot context |
| time_adjustments | Original reference, delta, reason, author and review state |
| capture_consents | Versioned scope, chosen sources, effective period and processing destination |
| capture_metadata | Sample ID, session/time, approved source, status and missing-data reason |
| observations | Sample references, description, uncertainty and model/prompt versions |
| summary_revisions | AI draft, developer edits, confirmation, provenance, revision history |
| outbox | Operation ID, payload version, attempt status and acknowledgement |
| settings / schema_migrations | Retention/capture policies and migration history |

Raw images are not ordinary database blobs. Default processing is memory-first; a bounded encrypted local buffer handles approved retries. Persist its metadata and lifecycle separately. Do not log tokens, screenshot bytes, sensitive window titles or private source code to diagnostics.

SQLite is not automatically encrypted. An initial local pilot can use ordinary SQLite for session metadata with OS-user access controls, but the limitation must be disclosed; observations may themselves contain sensitive content. Full-database encryption is a separate reviewed decision. Use OS-backed secret storage for tokens and image-buffer keys; Electron safeStorage is not whole-database encryption and does not protect against every process running as the same user [S12].

## 8. Capture and privacy pipeline

A developer explicitly enables capture, sees the capture indicator and selects specific work windows. Proposed initial cadence: once every five minutes. It is a sampling strategy, not comprehensive coverage. One or a small approved set of windows is sufficient for the pilot; do not enumerate and retain thumbnails of unrelated windows unnecessarily.

```text
Schedule → Check recording + consent + source
         → Acquire permitted sample
         → Recheck session/capture generation
         → Validate image / optional duplicate suppression
         → Bounded local analysis queue
```

Increment a capture-generation token on pause, stop, source change or revoked consent. Every async result checks the token before it can be stored or analysed. An in-flight operating-system request may complete after pause; discard that result. Explicit deletion/revocation also cancels associated pending analysis and discards late output.

If the selected window disappears, is protected, minimized or produces an unusable frame, record a gap or prompt for a new selection; never silently widen the scope. Sources must be revalidated after restart and permission changes. Test high-DPI and multiple-monitor behaviour on real systems.

Delete raw images after successful observation extraction. Proposed retry-buffer ceiling: 24 hours or 250 MB, whichever is reached first. On expiry/pressure, remove samples under a documented policy and record coverage gaps. Exclude raw captures from routine diagnostics and backups. Deletion is not a promise of forensic secure erasure from every storage device.

Time-only mode remains valid and visibly labelled. No automatic inference that a missing observation means the developer did not work. Redaction is an additional precaution, not a guarantee that every secret can be removed. Obtain appropriate workplace/privacy review before real staff capture; this document does not establish legal compliance.

## 9. AI and task descriptions

Local Ollama is the first provider. Keep the endpoint restricted to the approved local/private destination; do not expose it casually on the network. A hosted provider requires a separate policy and explicit authorization. No cloud fallback on local failure.

Use two operations: image-to-observation, then observation-to-session-summary. Reuse a tested model initially; do not build a multi-agent workflow. Compact observations reduce repeated image processing, but their quality must be evaluated.

Validate output schema and referential integrity. Every evidence ID must belong to the relevant session and permitted input set. Reject malformed outputs and unsupported claims; allow NEEDS_CLARIFICATION rather than forcing a task label. A model can still hallucinate within a valid schema. Screenshot instructions are untrusted content, and the summarizer has no tools to execute commands or change projects.

Store model digest, prompt version, schema version, input IDs, generated draft and developer-confirmed revision. Pin model/prompt versions for evaluation. Never overwrite a confirmed description with a later automatic result; create a new draft revision instead.

Proposed task-summary fields: title, work_description, evidence_ids, uncertainty, completion_not_established, and optional matched_task_id. Do not supply a numerical honesty score. Automatically apportioned time among inferred tasks must be labelled estimated until reviewed; do not confuse the precise total timer duration with inferred task allocations.

One inference request at a time initially, explicit timeout/cancellation, bounded retry count, bounded image count and bytes. Battery/resource mode can defer inference without discarding recorded time. Stop saves time first; description generation can complete afterward. The app remains usable without Ollama.

## 10. Desktop screens

Onboarding/connection and local-model status; project/task picker; timer with visible capture mode; current session and generated descriptions; session history/recovery; settings/privacy/source selection; diagnostics with sanitized export. Task selection may be optional once a project is selected. No manager dashboard inside this desktop scope.

Keep AI_DRAFT, DEVELOPER_CONFIRMED and REVIEW_REQUIRED visually distinct. Show recording, capture, analysis and sync separately. Never display SYNCED when only a local write or test adapter succeeded.

## 11. Synchronisation seam

A SyncPort consumes versioned outbox operations with stable IDs. Retry delivery is at least once; the receiving API must deduplicate by operation ID. Never promise network-level exactly-once delivery. Server acknowledgements advance local state. Edits use versions and conflict handling rather than silent last-writer-wins for approved timesheets.

Offline recording uses cached authorised project information under an approved account policy. Development fixtures are isolated from production. A local-only pilot is explicitly local-only; connected release requires real identity/API integration. Do not embed server AI keys or privileged database keys in the desktop binary. Session credentials remain outside the renderer.

## 12. Security and operations

Renderer configuration: contextIsolation enabled, sandbox enabled, nodeIntegration disabled, restrictive CSP and local bundled content. Expose a method per allowed action; validate sender and payload. Deny unexpected navigation/new windows and restrict external-link schemes/hosts. Treat SQL values as parameters and all files/paths as untrusted inputs [S8].

Persist in the platform application-data location, not the installation folder. Sign release artifacts and protect signing credentials in a release environment inaccessible to implementation agents. Windows signing and macOS signing/notarization are separate release work; signing is not a universal promise that no warning will appear [S13].

Measure the complete tracker process group separately from Ollama, then measure them together. Proposed initial reference-device targets: persisted Start/Stop acknowledgement p95 below 250 ms; no waiting for AI; no sustained queue growth; no accepted capture after pause/stop. These are targets requiring owner approval and real measurement, not claims of current performance. Freeze agreed budgets and benchmark conditions; do not loosen them to make a regression pass.

## 13. Main risks to retire early

Native SQLite packaging/ABI mismatch; permission and capture differences across OS versions; selected-window behaviour under minimisation; AI latency/memory contention; unexpectedly sensitive image content; crashes during persistence; test-only assumptions hiding real native failures. DT-001/002 deliberately validate packaging and native boundaries before UI expansion.

## 14. Repository layout

```text
desktop-tracker/
  AGENTS.md
  docs/
    README.md
    memory/
      CURRENT_STATE.md
      PROJECT_MEMORY.md
      ISSUES.md
      DECISIONS.md
      TASKS.md
  specs/
  src/
    main/
    preload/
    renderer/
    core/            # pure state machines and policies
    application/     # use cases and ports
    contracts/       # validated IPC/data schemas
    adapters/        # Electron, storage, AI, sync
    platform/windows/
    platform/macos/
    workers/storage/
    workers/analysis/
  tests/
    unit/
    integration/
    acceptance/
    fixtures/
    hardware/
  test-candidates/    # proposed additions; not an acceptance bypass
```

The trusted evaluator and approved acceptance snapshot have separate owner-controlled permissions. They need not be another large application, but their authority must not be editable by the implementation agent. See the test policy.
