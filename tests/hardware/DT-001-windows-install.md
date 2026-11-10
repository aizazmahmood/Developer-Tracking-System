# DT-001 — Fixed Windows installed-app lifecycle procedure

Native/manual validation of the existing 0.1.0 development artifact. Record
results in docs/validation/DT-001-wininstall.md, never in this procedure. Once
written, expectations are fixed; revisions require scoped owner authorization.
No feature implementation or manufactured behavioural red run is involved.

## Inputs, authorization and bounds

- Baseline main: 41199047e3718bec3097a36763ac428d724412d8. Technical build
  source: 5fc4e40a4ff84e24acbca58d8ee996c325ce9bf0; package desktop_tracker,
  product Developer Work Tracker, version 0.1.0, Windows x64 application payload.
- Existing Setup: out/make/squirrel.windows/x64/Developer Work Tracker-0.1.0 Setup.exe.
  SHA-256: 67dd7bfb961b769e7a0ab56b8681ecbbd10cb3a9f5e05e800119dcf323e4654f.
- Payload desktop-tracker.exe SHA-256:
  4c5e0a1d0536294504c78d24fb0da89b683750b50c43e513b3483ad83e083c26.
  resources/app.asar SHA-256:
  a9749e363e1bdec240e5157490c3c3ba3a6a422ce00e180e31e96bdb0a5102c4.
- Owner assignment explicitly permits this identified install, native launches,
  normal closes and supported uninstall of only this task's fresh installation.
  No upgrade/removal of an existing install, manual registry/file cleanup, user
  data deletion, elevation, trust/security bypass, dependency installation,
  artifact rebuild, protected-test/source/config changes or remote writes.
- Use an already designated disposable Windows environment if available;
  otherwise the current non-elevated user, labelled developer-machine evidence.
- Installation and uninstallation each have a fixed 180-second completion and
  settling bound from invocation. Each shell must open within 30 seconds of
  launch; each normal close must empty its owned process tree within 15 seconds.
  Record timeout as FAIL/incomplete; do not extend bounds or kill installers.
- Use installed native tools, app-scoped registration/file/shortcut/process
  observations, and a before/after tracked-file manifest. Hash this procedure
  before installer execution. Keep raw logs/screenshots/helpers uncommitted.

## Fixed cases

| Case | Action and observation method | Expected outcome | Failure or incomplete evidence |
|---|---|---|---|
| WI01 | Hash identified Setup and unpacked payload; inspect Authenticode, app-specific HKCU/HKLM uninstall entries, expected install roots, product shortcuts, executable paths and app-profile metadata | Exact known artifact; no existing/ambiguous installation or running installed instance; current-user scope established; prior static-shell caches separately classified without reading private contents | Missing/mismatched artifact, elevated context, existing install or meaningful/unknown profile records prevent installation/launch; safe preflight stop is not an installer defect |
| WI02 | Invoke exact Setup with no invented flags; observe initial/attributable child processes and settling within 180 seconds, then inspect installed files/version, app-specific uninstall entry and installer-created shortcuts | Installer completes normally, correct current-user installation, registration and at least one usable application shortcut exist | Nonzero exit, timeout, unresolved child activity, missing registration/shortcut or OS authorization block; do not repair manually |
| WI03 | Resolve actual installed launcher/shortcut to versioned application; hash that EXE and ASAR, inspect embedded manifest using installed archive tooling as data | Version 0.1.0 and payload hashes match known build; distinguish updater/launcher stub from real AMD64 application | Wrong version/path/hash, missing resource or unverifiable launcher-to-payload relationship |
| WI04 | Deliberately observe/close any installer-triggered first launch; open an installer-created shortcut from outside checkout, inspect resolved target and installed process paths, check workspace development instances/default dev port, capture only this app window | Installed shell opens within 30 seconds without workspace dev server; correct title, Tracking not implemented, Capture off, AI not configured, Local-only / not connected, unavailable controls and visible Version 0.1.0 | Wrong/unpacked app, missing window/state/version/bridge, required dev server or inaccessible visual observation |
| WI05 | Normally close shortcut-launched app, track exact owned processes; relaunch same shortcut from outside checkout, observe complete UI/version and normally close again | Both closes empty owned process trees within 15 seconds; repeated correct installed UI; no forced termination | Timeout, failed normal close, surviving owned process, forced cleanup or incomplete repeated UI evidence |
| WI06 | Recheck task ownership using preflight absence, installation records, paths, hashes and process state; inspect registered executable/arguments; invoke supported app-specific uninstall without shell eval or elevation | Only newly created installation removed through supported uninstaller; actual exit/settling within 180 seconds, registration/shortcut changes recorded | Ambiguous ownership/command, OS block, nonzero exit, timeout, active app or unsupported/manual cleanup |
| WI07 | Inspect exact registration, shortcuts, owned processes and install/profile metadata after uninstall, compared to preflight | No usable task-created registration/shortcut or running installed app remains; retained markers/cache/data classified and pre-existing data preserved | Usable installed launch route, remaining running app, unexplained ownership/data loss or incomplete cleanup evidence; retained inert caches/markers alone are not failure |
| WI08 | Compare original tracked source/tests/procedures/dependencies/lockfile/policy/config hashes and fixed new procedure; run native Windows typecheck, lint, default and focused suites once independently with unfiltered case reporting | All four exit 0, default 45/focused 43 original identities retained with no skips/todos; only permitted procedure/report/memory paths change | Unexpected mutation, failed/missing check, changed cases or forbidden staged content |

## Execution and reporting rules

Inspect ELECTRON_RUN_AS_NODE specifically; if inherited, omit it only from the
controlled installer/launcher child environment and account for shortcut shell
inheritance. Never change user/global environment. Do not accumulate instances.
Observe only app-owned windows/processes; no broad environment/process/registry
dumps in reports, arbitrary Update.exe execution or unrestricted command eval.

Use app-window-only native observation. Native IsEnabled/button interaction is
NOT_RUN when inaccessible; grey controls alone do not establish semantics.
Security enforcement, full offline operation, signing, upgrades, clean-machine
behaviour, AI and macOS are outside this task. Do not disconnect networking,
change firewall/security settings or request unrelated permissions.

If required evidence fails after installation, preserve the failure and still
perform safely identifiable supported uninstall cleanup when possible. Cleanup
does not convert a failed case into PASS. Never manually remove retained files,
registry entries or prior user data, and never claim secure erasure.

Report WI01–WI08, exact commands/exit codes and identities, process ownership and
normal-close timing, installed-path evidence, uninstall/remnants and limitations.
Hashes are local identity evidence, not independent provenance or enforcement.
