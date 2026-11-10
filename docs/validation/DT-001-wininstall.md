# DT-001-WININSTALL — Windows installed-app lifecycle

## 2026-11-10T05:16:22+05:00 — Completed developer-machine run — DONE

**Task:** bounded native validation of the existing artifact; no application
implementation. All WI01–WI08 requirements pass within the scope below. Parent
DT-001 remains IN_PROGRESS. DT-001-WINPACKAGE remains DONE; its prior results are
referenced as provenance, not reported as reruns here.

### Authorization and baseline

Owner explicitly assigned the external installed-app validation prompt with
"read and run". It authorizes this exact 0.1.0 current-user installation, installed
launches/normal closes and supported uninstall of only this task's new install,
plus the new fixed procedure, report/memory and local commit. It does not authorize
npm dependencies/tools, rebuilding, pre-existing installation removal, user-data
deletion, manual registry cleanup, elevation, security bypass or source/config/
existing-test changes. D-028 records that scope. The prompt is not stored here.

Started clean main at `41199047e3718bec3097a36763ac428d724412d8`, the specified
reviewed baseline. Actual Git root was the existing DeveloperTrackingSystem
workspace; no branch/remotes/history changes. The preceding commit changes only
package-smoke records/procedure. Technical build source remains
`5fc4e40a4ff84e24acbca58d8ee996c325ce9bf0`; the identified prior local build's
EXE/ASAR/Setup hashes match actual bytes before installation and after uninstall.
No make/package/rebuild command was run in this task.

New fixed [WI procedure](../../tests/hardware/DT-001-windows-install.md) was written
before installer execution. Initial SHA-256, unchanged at final integrity check:
`aeb5c52c2b672fbc95c5e7a388083e9ca5217a74302545556e78c01961bae2d1`.
Finite bounds stayed fixed: install/uninstall completion and settling 180 seconds
each, shell opening 30 seconds, normal close including owned tree exit 15 seconds.
No procedure expectation was revised and no behavioural red run is manufactured.

### Actual environment and preflight — WI01

Native Windows x64, build **10.0.26100.9711**, display version 24H2; PowerShell
5.1.26100.9711, 64-bit, non-elevated current Windows user. WSL2/bash orchestrated
Windows executables; this is local **developer-machine evidence**, not a clean
machine or disposable-environment test. No owner-designated disposable environment
was supplied or provisioned. Windows timezone Pakistan Standard Time; dates here
use Asia/Karachi. Installed native Node v22.19.0 / win32 / x64, npm 11.14.1,
Electron 45.2.3, Forge 8.0.1 and Vitest 5.1.0 were read from actual tools/packages.

Read-only application-specific preflight found zero matching HKCU uninstall
entries, zero matching native/WOW6432Node HKLM uninstall entries, zero matching
shortcuts and zero installed/unpacked app processes. Expected current-user product
roots and Program Files product roots were absent. No existing installation was
upgraded, reused, overwritten or removed. Only matching registry/shortcut/process
results were retained; raw personal paths/identities are omitted here.

Profile presence was checked separately: `%APPDATA%\Developer Work Tracker`
already existed with 103 metadata entries. They were recognizable Chromium
cache/state/network/LevelDB files from prior static-shell runs, including GPU/
shader/preload caches, empty blob subdirectory, Local Storage, Session Storage,
Preferences, Cookies, DIPS and browser performance databases. These browser
runtime databases are not tracker sessions. Current shell source has no session,
credential or persistence implementation. No meaningful work records, separate
tracker database or unknown data source was identified from scoped metadata and
source; private file contents were not dumped. `%APPDATA%\desktop-tracker` and
`%LOCALAPPDATA%\desktop-tracker-updater` were absent. Prior profile reuse and
normal cache writes were permitted; no profile was manually deleted.

### Exact artifact and installed identity — WI01/WI03

| Artifact | Bytes | Actual SHA-256 |
|---|---:|---|
| out/make/squirrel.windows/x64/Developer Work Tracker-0.1.0 Setup.exe | 155011072 | `67dd7bfb961b769e7a0ab56b8681ecbbd10cb3a9f5e05e800119dcf323e4654f` |
| Unpacked and installed versioned desktop-tracker.exe | 249832448 | `4c5e0a1d0536294504c78d24fb0da89b683750b50c43e513b3483ad83e083c26` |
| Unpacked and installed resources/app.asar | 239381 | `a9749e363e1bdec240e5157490c3c3ba3a6a422ce00e180e31e96bdb0a5102c4` |

All three match the completed [package report](DT-001-winpackage.md). Native
Get-AuthenticodeSignature returned **NotSigned**, no signer certificate, for Setup
and the unpacked app EXE. Matching installed EXE bytes have the same identity.
This is an unsigned development build, with no publisher/trust/signing claim.
No trust/security setting or policy was changed; no observed OS prompt was bypassed.

Discovered installed versioned payload:
`%LOCALAPPDATA%\desktop_tracker\app-0.1.0\desktop-tracker.exe`, with ASAR at
`app-0.1.0\resources\app.asar`. Installed EXE PE machine **0x8664 (AMD64)** and
file version **0.1.0** were inspected. Installed ASAR, read as data using already
installed @electron/asar, contains desktop-tracker / Developer Work Tracker,
version 0.1.0, main `.webpack/main/index.cjs`. No archive code was evaluated.
The known 32-bit Setup wrapper does not change the actual x64 payload finding.

The root `desktop_tracker\desktop-tracker.exe` is a **292864-byte launcher stub**,
not the 249832448-byte versioned Electron app. Root Update.exe is 1899520 bytes.
Shortcut resolution and observed versioned process paths establish which app ran;
no launcher stub was substituted for the payload hash check.

### Install and registered launch path — WI02

Invoked the exact identified Setup **with no arguments**, using a non-elevated
native ProcessStartInfo and temporary-directory working directory outside checkout.
Its initial PID 21508 exited **0**; attributed installer/update activity settled
in **31.335 seconds**, within the unchanged 180-second bound. Observed installer
startup invoked `--squirrel-install 0.1.0`, its updater `--createShortcut=desktop-tracker.exe`,
and then the app `--squirrel-firstrun`. Those are installer-generated actions,
not invented flags added to Setup. Installer exit alone was not the pass criterion.

Created registration:
`HKCU\Software\Microsoft\Windows\CurrentVersion\Uninstall\desktop_tracker`,
DisplayName Developer Work Tracker, DisplayVersion 0.1.0, InstallLocation
`%LOCALAPPDATA%\desktop_tracker`. Registered UninstallString is
`"%LOCALAPPDATA%\desktop_tracker\Update.exe" --uninstall`.

Created shortcuts:

- `<Desktop>\Developer Work Tracker.lnk`.
- `<Start Menu>\Programs\GitHub, Inc\Developer Work Tracker.lnk`.

Both target `%LOCALAPPDATA%\desktop_tracker\desktop-tracker.exe`, with empty
arguments and working directory `%LOCALAPPDATA%\desktop_tracker\app-0.1.0`.
The maker/runtime's actual Start Menu folder is recorded as observed; it does not
establish a verified publisher. Neither registration nor shortcuts were repaired
or created manually.

### Installed UI, normal close and repeat — WI04/WI05

Deliberately observed and normally closed the installer-triggered first launch
before any explicit shortcut launch. Then twice opened the actual installer-created
Desktop shortcut through Windows shell association. A clean-environment child
PowerShell invoked Start-Process on the .lnk from the Windows temporary directory;
no npm/Node app launcher, direct unpacked EXE or development Electron was used.
Both resulting app root and child executable paths resolve to the installed
`app-0.1.0\desktop-tracker.exe`, not the workspace out/ executable. Each run found
zero workspace development instances and zero default-port-3000 listeners.

Inherited `ELECTRON_RUN_AS_NODE=1` was omitted only from controlled installer,
shortcut-launcher and uninstaller child environments. First launch inherited the
clean installer context. Persistent/user/global environment stayed untouched;
the final observer still read the original value 1. No extra runtime/debug port,
preload API, disabled sandbox or relaxed CSP was introduced.

DPI-aware native PrintWindow captured only this app window, with top and scrolled
bottom views inspected visually in each cycle. App-targeted wheel messages exposed
the footer without sending keyboard input to another foreground window. Actual
rendered title/states were Developer Work Tracker; Tracking not implemented;
Capture off; AI not configured; Local-only / not connected; unavailable-control
text with Start/Pause/Resume/Stop; and **Version 0.1.0**. Thus installed metadata
bridge success is observed, not inferred from source or process existence.
Images and raw diagnostic logs remain ignored/uncommitted.

| Run | Root / owned process IDs | Shell observation/open | Normal close / tree exit | App exit |
|---|---|---|---|---|
| Installer first launch | 22456 / 22456, 15956, 21888, 18704 | Already-open first-run window observed, complete UI/version | true; 0.980 s; zero remaining | UNKNOWN: attached observer did not retain exit handle |
| Desktop shortcut 1 | 16568 / 16568, 19084, 21652, 20084 | 2.870 s; complete UI/version | true; 0.920 s; zero remaining | 0 |
| Same Desktop shortcut 2 | 19396 / 19396, 5912, 8416, 16004 | 2.294 s; complete UI/version | true; 0.990 s; zero remaining | 0 |

The cycle-2 child IDs are taken from the retained native log. Every required
shortcut shell opened within 30 seconds; both repeated normal closes emptied the owned tree within 15 seconds.
No forced termination was used and no unrelated application was closed.

Diagnostic limitation retained: the first attached-observer command exited **1**
because Get-Process had not retained a process handle before exit, so ExitCode
was null. The same log records successful CloseMainWindow, process disappearance,
zero descendants and complete images; no application crash/nonzero exit is
established. Retaining the native process handle in the task-local observer before
closing made both later shortcut observations return actual exit 0 (helper exit 0).
The initial unknown exit is not rewritten or rerun as fabricated evidence.
ISSUE-010 records this observer issue; no existing test/procedure/app was revised.
Native UI Automation again returned zero buttons; strict native IsEnabled/button
interaction remains **NOT_RUN**. Grey appearance is not disabled-semantics proof.

### Supported uninstall and retained state — WI06/WI07

Before uninstall, rechecked initial absence, this task's new registration and
exact install root/version, matching installed payload hashes, and zero processes
under that installation. Parsed the registered quoted executable and the single
`--uninstall` argument without Invoke-Expression or equivalent eval; required its
path to be exactly this owned root's Update.exe. No broadly discovered Update.exe,
pre-existing install, quiet flags or administrator action was used.

Invoked `"%LOCALAPPDATA%\desktop_tracker\Update.exe" --uninstall` from outside
checkout. Root PID 15064 exited **0** and attributed installer activity/registration/
shortcut removal settled in **8.834 seconds**, within 180 seconds. Observed its
normal `--removeShortcut=desktop-tracker.exe` action; no manual deletion/registry
write or repeated cleanup invocation. Supported uninstall **WAS run**, following
this task's actual temporary application installation.

Post-uninstall read-only inspection at 05:12:15 +05:00 found zero matching HKCU/
HKLM uninstall entries, both exact created shortcuts absent, launcher target
absent, installed app EXE and ASAR absent, and zero installed or unpacked app
processes. No usable installed shortcut/registration/application payload remains;
normal installed launch is no longer available. The original workspace build
artifacts are intentionally preserved and are distinct from installed launch.

Retained below `%LOCALAPPDATA%\desktop_tracker`:

| Remnant | Bytes | Classification |
|---|---:|---|
| .dead | 1 | Uninstall marker |
| Update.exe | 1899520 | Squirrel updater/removal infrastructure; no app payload/shortcut/registration |
| app-0.1.0/ | directory | Residual version directory |
| app-0.1.0/squirrel.exe | 1899520 | Squirrel infrastructure remnant |
| app-0.1.0/v8_context_snapshot.bin | 753352 | Runtime data remnant; no app EXE/ASAR |

These actual remnants were present at settling and the later post-check. Their
exact retention cause is not established; no claim of total removal or secure
erasure is made. They do not supply the tested normal application launch route.
No remnant was manually removed or executed.

The pre-existing `%APPDATA%\Developer Work Tracker` profile remains, now 104
metadata entries. All prior file names remain: one empty blob subdirectory rotated
to a new empty blob subdirectory and one installed-preload cache file was added.
Normal cache/state writes are expected under the authorized reuse. Other two
checked profile roots remain absent. No meaningful user records were identified,
read into the report, or manually deleted. This is metadata preservation evidence,
not a forensic byte-identical cache or secure-erasure guarantee.

### Current regression commands and repository integrity — WI08

Each existing native Windows command ran **once**, independently, using installed
tools. JSON reporting is unfiltered in the same test run; no extra reporter-only
repeat, case filter, skip, threshold/configuration or test change.

| Command via cmd.exe /c | Exit | Result |
|---|---:|---|
| npm run typecheck | 0 | PASS: root/shared/renderer TypeScript |
| npm run lint | 0 | PASS: unchanged --max-warnings 0 |
| npm test -- --reporter=json --outputFile=.vitest/json/wininstall-standard.json | 0 | PASS: 9 files, 45 cases |
| npm run test:candidates -- --reporter=json --outputFile=.vitest/json/wininstall-focused.json | 0 | PASS: 8 files, 43 cases |

Actual per-file ordinal/full-name/status rows exactly match prior package-final
reports in each suite; all passed, zero skips/todos. Passing counts are supplemented
by unchanged original file bytes and case identities. These are local default/
focused scaffold checks, not independent acceptance or native-security tests.

Native observation/inspection commands: preflight **0**; Setup lifecycle **0**;
installed snapshot **0**; installed ASAR/PE/version inspection **0**; attached
first-window observer **1** (exit-code reporting limitation above); shortcut
observers **0/0**; supported uninstall lifecycle **0**; post-state inspection
**0**; npm/tool/platform probes **0**. No application failure or repair was hidden.

Before changes, recorded all 76 tracked-file paths and SHA-256 at starting HEAD.
Manifest digest (sorted path + NUL + SHA-256 + newline, UTF-8):
`e03a4f6a560405f337bb24c59b31ca003218d7376a7cd53d93b9555099f6f587`.
After executable checks and uninstall, all 76 originals were still byte-identical.
Only then were the five permitted memory records updated. Final protected-original
set excludes exactly those five memory files: **71 original files**, digest
`214c289997d0397e72ad22e422791c708ac76da0c5bb815155b928504a74022b`;
all remain unchanged, including source, all existing tests/helpers/hardware WP
procedure, dependencies/lockfile, policies/specs and every build/test configuration.
The starting Git revision makes the manifest reproducible. The new fixed WI
procedure hash and the three artifact hashes remain unchanged. Local hashes
establish byte identity, not independent enforcement or reproducible-build proof.

Final scope/full-diff/staged-diff/whitespace checks are recorded in the session
handoff entry. Only seven files are permitted: new WI procedure, this report and
five canonical memory records. No prompt, binary, installer, cache, profile,
screenshot, helper or raw log is committed. No dependency installation/update,
existing-test revision, rebuild, remote write or push occurred.

### WI case disposition and next action

| Case | Result | Evidence |
|---|---|---|
| WI01 | PASS | Exact hashes/unsigned status, non-elevated scoped preflight, prior cache distinguished from absent install |
| WI02 | PASS | Setup exit 0/31.335 s, correct current-user registration and two created shortcuts |
| WI03 | PASS | Actual installed AMD64/versioned EXE/ASAR hashes and embedded version match known build |
| WI04 | PASS | First launch handled; real installed Desktop shortcut opens complete rendered shell/version without dev server |
| WI05 | PASS | Same shortcut repeated; both complete UI cycles close normally under 1 s, exit 0, zero owned processes |
| WI06 | PASS | Verified fresh ownership and registered supported uninstaller; exit 0/8.834 s |
| WI07 | PASS | Registration/shortcuts/app payload/processes gone; inert infrastructure/runtime remnants and prior profile accounted for |
| WI08 | PASS | Existing checks 0; 45/43 unchanged identities; original source/tests/config/policy/dependencies and fixed procedure intact |

No confirmed product defect was reproduced. ISSUE-010 is a resolved observation-
tool limitation for subsequent cycles; the first exit remains unknown. Native
enabled-state semantics, actual sandbox/IPC/CSP/navigation/permission enforcement,
fully offline/clean-machine operation, upgrades, signing, AI and macOS remain
NOT_RUN/outside this task. Existing fake Electron/component checks do not establish
those properties. Developer-machine install evidence does not satisfy a separate
clean-machine release check.

**Owner action for this task:** None. **Smallest next separately assigned task:**
read-only native security/IPC/CSP validation design against this exact artifact,
with a scoped harness and explicit authorization before any source/test revision.
Parent DT-001 stays IN_PROGRESS; no security repair or feature work starts here.
Nothing was pushed. See [current state](../memory/CURRENT_STATE.md),
[tasks](../memory/TASKS.md), [history](../memory/PROJECT_MEMORY.md),
[issue](../memory/ISSUES.md) and [authorization](../memory/DECISIONS.md).
