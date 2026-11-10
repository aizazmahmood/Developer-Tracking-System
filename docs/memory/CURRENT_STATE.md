# Current State

**Last updated:** 2026-11-10 (Asia/Karachi).
**Current task:** DT-001-WININSTALL — DONE; local developer-machine lifecycle evidence.
**Prior bounded tasks:** WINPACKAGE, DISCOVERY, LINTFIX, TYPEFIX and DOCS-003 — DONE.
**Parent DT-001:** IN_PROGRESS; native-security/clean-machine/offline/platform gaps remain.

## Installed-app lifecycle

Started clean main at 41199047e3718bec3097a36763ac428d724412d8. Owner explicitly
assigned the temporary current-user install, installed launches/normal closes and
supported uninstall of this exact existing 0.1.0 development build (D-028).
No artifact rebuild, dependency installation, source/config or existing-test changes.

- Exact Setup/EXE/ASAR hashes match completed WINPACKAGE evidence; Setup/app
  Authenticode NotSigned. Actual application payload AMD64, version 0.1.0.
- Native Windows build 10.0.26100.9711 / x64 / non-elevated user; WSL orchestration.
  This is a developer-machine check, not a disposable/clean-machine run.
- Preflight found no matching installed root/registration/shortcut/process; existing
  Chromium static-shell cache was separately identified and preserved.
- Identified Setup WAS run with no flags: exit 0, settled 31.335 seconds.
  Created HKCU desktop_tracker registration, Desktop and Start Menu shortcuts.
- Installed app at %LOCALAPPDATA%/desktop_tracker/app-0.1.0/desktop-tracker.exe;
  real versioned EXE/ASAR hashes match known package, distinct from launcher stub.
- Installer-triggered first shell observed/closed normally; attached observer could
  not retrieve its exit code (UNKNOWN). Diagnostic ISSUE-010 is resolved for later
  observations by retaining a handle; original result stays in report.
- Two complete actual Desktop-shortcut launches from outside checkout showed all
  required states/unavailable controls/Version 0.1.0, no workspace dev server.
  Both normal closes exited 0 under one second, zero owned descendants, no kill.
- Verified registered Update.exe --uninstall WAS run only for this new install:
  exit 0, settled 8.834 seconds. Registration, both shortcuts, app EXE/ASAR gone;
  zero installed/unpacked app processes. Remnants: .dead, Update.exe, version
  directory with squirrel.exe/v8_context_snapshot.bin. No manual deletion.
- Prior Chromium profile remains (103 to 104 metadata entries, ordinary cache
  rotation/addition); no meaningful user records or unknown data source identified.
- ELECTRON_RUN_AS_NODE omitted only from controlled children; persistent setting
  unchanged. Native IsEnabled semantics NOT_RUN (UI Automation exposes no buttons).

## Current checks and integrity

Native Windows npm run typecheck, npm run lint, npm test and npm run test:candidates
PASS (0 each), once each with unfiltered JSON case reporting in the test runs:
45 cases/9 files and 43/8. Exact prior case identities retained, zero skips/todos.
Node22.19.0/npm11.14.1/Electron45.2.3/Forge8.0.1/Vitest5.1.0. Original source,
existing tests/helpers/procedures, dependencies/lockfile, policies/specs and all
configuration unchanged. Fixed new WI procedure and known build hashes unchanged.
Only new procedure/report and five canonical memory files change; ignored logs,
screenshots, helpers, installers and runtime data are not committed.

See [installed-app report](../validation/DT-001-wininstall.md) and
[fixed WI procedure](../../tests/hardware/DT-001-windows-install.md).
[Prior package evidence](../validation/DT-001-winpackage.md) retains its scope;
its installer-NOT_RUN statements describe the prior task, superseded here by an
actual temporary application installation and supported uninstall.

## Remaining parent evidence

Actual native sandbox/IPC/navigation/permission/CSP enforcement, full offline and
clean-machine operation, upgrades, signing, AI and required macOS/platform checks
remain NOT_RUN. No production readiness or independent enforcement claim. DT-000
remains separately PLANNED/NOT_CONFIGURED. No unassigned features started.

**Owner action:** None to complete this task. Smallest next separate assignment:
scoped native-security/IPC/CSP validation design for this exact artifact; no repairs
or protected-surface revision implied. No dependency installation/update or push.
This app was temporarily installed and removed through its supported uninstaller.

[Tasks](TASKS.md), [history](PROJECT_MEMORY.md), [issues](ISSUES.md),
[decisions](DECISIONS.md), [root instructions](../../AGENTS.md).
