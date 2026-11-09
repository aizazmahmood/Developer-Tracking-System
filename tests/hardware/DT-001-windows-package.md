# DT-001 — Fixed Windows package smoke procedure

This is a native/manual procedure, not an automated suite or independent
evaluator. Record results in docs/validation/DT-001-winpackage.md. Expectations
are fixed upon creation; later revisions require explicit scoped owner approval.
No historical behavioural red run is claimed for the existing static shell.

## Inputs and prerequisites

- Starting source: 5fc4e40a4ff84e24acbca58d8ee996c325ce9bf0; source version 0.1.0.
- Owner supplies build revision, working-tree state, complete normal Windows
  make output and captured exit code. Codex does not run package/make or install
  dependencies/download prerequisites. Missing evidence remains explicit.
- Discover actual output paths; require the complete Windows x64 package with
  its adjacent resources, rather than a lone EXE or development Electron binary.
- Use native Windows tools. Record tool/runtime platform and architecture; WSL
  orchestration does not establish Linux or macOS validation.
- Observe only this application. Do not run Setup.exe/Update.exe, change OS or
  security settings, add debugging/instrumentation or inspect unrelated windows.

## Fixed cases

| Case | Input/action | Required observation | Failure or incomplete evidence |
|---|---|---|---|
| WP01 — Build identity | Owner build record and discovered package | Windows x64 artifact, version, owner build revision/working state/outcome identifiable; provenance limits explicit | Missing/stale artifact or unresolved build/source identity prevents complete smoke verification; folder existence alone is insufficient |
| WP02 — Package completeness | Read-only PE/ASAR inspection with installed tools | App executable and resources exist; app PE is AMD64; embedded version 0.1.0 and main entry resolve; bundled preload, renderer HTML/JS/CSS and needed runtime dependencies are present/resolvable | Missing, wrong-architecture, unresolved or mismatched assets; source strings alone do not establish package completeness |
| WP03 — Installer output | Discovered maker output and metadata | Configured Windows installer and associated Squirrel package/release outputs exist for this build; paths/sizes/SHA-256 recorded separately | Missing or inconsistent maker output is partial completion, even if unpacked app works; never describe creation as installation |
| WP04 — Standalone launch | Exact packaged app EXE, full resources, external working directory | Native Windows window opens within 30 seconds without this workspace's Forge/Webpack dev server or launch through npm/Node | Startup error, wrong executable, required dev server, unresolved process ownership or no rendered window |
| WP05 — Packaged UI/bridge | Actual packaged window | Developer Work Tracker; Tracking not implemented; Capture off; AI not configured; Local-only / not connected; unavailable Start/Pause/Resume/Stop controls; Version 0.1.0 | Missing/misleading state or App information unavailable fails UI/bridge expectation; process/source/HTML alone is not rendered evidence |
| WP06 — Close and repeat | Normal window close, then one relaunch/close | Each normal close ends this task-owned process tree within 15 seconds; second launch repeats WP04/WP05 without hidden background recording | Forced cleanup is a normal-close failure, not success; record lingering PIDs/timeouts without killing unrelated processes |
| WP07 — Source regression | Existing installed typecheck/lint/default/focused commands | All exit 0; original zero-warning lint; default 45 and focused 43 cases pass with unchanged identities/contents and no skips | Missing tools, test failures, changed identities, skips or weaker settings prevent complete verification |
| WP08 — Integrity | Starting/final source, procedure and artifact hashes | Source, existing tests/helpers, dependencies/configuration and inspected artifacts unchanged; only authorized procedure/docs/records committed | Unexpected mutation or unverifiable required identity remains explicit; hashes identify bytes, not independent build provenance |

## Execution and evidence rules

1. Record owner-reported outcome separately from artifact facts and observations
   performed now. Never invent an absent exit code. Inspect actual output paths,
   sizes and SHA-256 for EXE, app.asar, installer and relevant Squirrel metadata.
   Inspect archives as data, not by executing packaged build code.
2. Inspect workspace-specific development instances/server availability before
   launch. Stop only task-owned instances. Unrelated interference is a limitation.
3. Check ELECTRON_RUN_AS_NODE alone. If set, remove it only from the launched
   child's environment; do not change persistent settings or dump the environment.
4. Launch directly from outside the checkout, retaining all package resources.
   Record executable identity, root/child PIDs, working directory and exit result.
   Capture only this app's window if necessary, keeping screenshots/logs ignored.
5. Record observation method and UI/accessibility limits. If native enabled-state
   inspection is inaccessible, report it as NOT_RUN; grey appearance is not proof
   of disabled semantics. Component evidence remains separately scoped.
6. Close normally with the bounded wait, verify only this task's process tree,
   then repeat once when safe. Forceful task-owned cleanup must be disclosed.
7. Run each unchanged regression command independently. An unfiltered JSON
   reporter may provide actual case identities in the same run; do not add filters
   or duplicate runs merely for reporting. Preserve parameterized identity rows.
8. No internet disconnection, firewall/registry/install action or security bypass.
   Absence of a dev server does not prove full offline/clean-machine operation.
   Installed-app behaviour, signing, native sandbox/IPC/navigation/permission/CSP
   enforcement, AI and macOS remain separate unless actual scoped evidence exists.
