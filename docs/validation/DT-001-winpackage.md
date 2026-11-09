# DT-001-WINPACKAGE — Windows artifact smoke evidence

**Latest result: DONE** after the owner's explicit build delegation. The final
dated run below records the successful build, artifact inspection and native
smoke evidence. The initial blocked checkpoint is retained as history.

## 2026-11-10T04:35:33+05:00 — BLOCKED: owner-built artifact unavailable

Source baseline: `5fc4e40a4ff84e24acbca58d8ee996c325ce9bf0`, main, initially clean; matches reviewed
5fc4e40. Source manifest version is 0.1.0; this is not an inspected artifact version.
Owner explicitly assigned artifact/native smoke validation, a fixed new procedure,
source checks and documentation/local commit. No build, download, installer
execution, source repair, test/config/dependency revision or push is authorized.

### Build provenance and artifact facts

- **Owner-reported evidence:** no build log, build revision/working state, make
  outcome or captured exit code supplied. Requested those inputs; no response
  received when this entry was written. Owner build success/failure is UNKNOWN.
- **Inspected now:** no out/ directory, confirmed both by WSL filesystem checks
  and native Windows Node fs.existsSync. Expected out/dist roots contain no
  artifacts. A read-only workspace scan outside dependency/Git directories finds
  no .exe, .asar or .nupkg files. No packaged app or installer was substituted.
- **Runtime evidence now:** no app launched, no PID/process tree/window observed,
  no screenshots/accessibility checks or close/relaunch performed. Their results
  are NOT_RUN, not inferred from passing source tests or an old development window.

| Required artifact identity | Result |
|---|---|
| Packaged app EXE, path/size/SHA-256/PE architecture | NOT_RUN: no artifact found |
| resources/app.asar, size/SHA-256/manifest/assets/dependencies | NOT_RUN: no package found |
| Squirrel installer, package and RELEASES paths/sizes/hashes | NOT_RUN: no maker output found |
| Build-to-source provenance | NOT_RUN: owner command/log/revision/outcome missing |

There is no build exit code to report and no reproduced packaging defect. Missing
output could only establish the missing prerequisite here; no speculative source
or packaging repair is proposed. package/make were not invoked, because this
assignment explicitly reserves the normal prerequisite-fetching build to the owner.
Checksums/TLS/application protections were not changed. No installer was run.

### Fixed manual/native procedure and WP results

Created [DT-001-windows-package.md](../../tests/hardware/DT-001-windows-package.md)
before regression/native smoke execution at 2026-11-10T04:32:46+05:00. It fixes
WP01–WP08 inputs, observations and failure conditions; a 30-second window-open
bound and 15-second normal-close bound; two launch/close cycles when artifacts
exist. Initial/final SHA-256: `d88f28c15356993d993a6904d63fe44c5ba6ceae3981666405b75b4ecbb49165`.
Results stay in this report; no expectations were revised after recording.
This is a manual procedure, not an executable suite or independent evaluator.

| Case | Result | Evidence/limitation |
|---|---|---|
| WP01 — Build identity | NOT_RUN | Owner build/provenance absent; source identity known, artifact identity unknown |
| WP02 — Package completeness | NOT_RUN | No EXE/ASAR to inspect; PE, embedded manifest/main/preload/HTML/JS/CSS/runtime dependencies unverified |
| WP03 — Installer output | NOT_RUN | No installer/Squirrel output; installer execution remains unauthorized |
| WP04 — Standalone launch | NOT_RUN | No generated executable; no dev-server independence or offline evidence established |
| WP05 — Packaged UI/bridge | NOT_RUN | No actual packaged window/version/control observation; no native disabled-state claim |
| WP06 — Close and repeat | NOT_RUN | No task-owned app processes launched, closed or force-cleaned |
| WP07 — Source regression | PASS | Typecheck/lint/default 45/focused 43 all exit 0, unchanged executed identities and test contents |
| WP08 — Integrity | PASS for source/procedure; artifact portion NOT_RUN | 70 unrelated originals unchanged, fixed procedure hash retained; no artifact exists to hash |

### Actual environment and commands

Microsoft Windows 10.0.26100.9711, native Node v22.19.0/win32 x64; npm 11.14.1,
Vitest 5.1.0, Forge 8.0.1, installed Electron package 45.2.3. WSL orchestrates
Windows executables; this is not Linux or macOS app validation. Version/platform/
output-directory probes exited 0. The specifically inspected ELECTRON_RUN_AS_NODE
value is 1. No app child was launched, so no child or persistent environment was
changed. A future actual launch must remove it only from that child's environment.

Each command ran separately from repository root with installed tools, using
`/mnt/c/Windows/System32/cmd.exe /c`. Reporter flags only provide inventory; no
test filter/config/setup/expectation changed and no duplicate full runs were made.

| Exact npm command after that prefix | Exit | Result |
|---|---:|---|
| npm run typecheck | 0 | PASS, aggregate root/shared/renderer |
| npm run lint | 0 | PASS, unchanged --max-warnings 0 |
| npm test -- --reporter=json --outputFile=.vitest/json/winpackage-standard.json | 0 | PASS, 9 files / 45 cases |
| npm run test:candidates -- --reporter=json --outputFile=.vitest/json/winpackage-focused.json | 0 | PASS, 8 files / 43 cases |

Real JSON execution rows (relative file/declaration ordinal/full name/status) match
the discovery task's verified default inventory SHA-256
`fb78576410c2f390c15a180112d6046246335ee24944a68a042529964e2b4e51` exactly.
The focused run matches its 43 scaffold rows. No skips/todos, renamed cases or
hardware Markdown suites. Machine-local reports remain ignored/outside tracked
files; no raw local-path/process/environment dumps are committed.

### Integrity, diagnosis and smallest next action

Only six paths change: this report, the new fixed hardware procedure and four
canonical records (PROJECT_MEMORY, CURRENT_STATE, TASKS, ISSUES). All 74 original
tracked-file hashes were captured before work; 70 originals remain byte-identical,
including application source, all executable tests/helpers/fixtures, dependencies,
lockfile, configurations, policies, acceptance criteria and DECISIONS. Historical
prefixes/dated TASKS entries remain intact. No new technical decision/proposal
requires a DECISIONS entry. Content/history/link/whitespace checks recorded in
memory complete the documentation verification, not the blocked native smoke.

ISSUE-009 records the missing build/artifact prerequisite; it does not reopen the
resolved typing/lint/discovery issues. Task remains BLOCKED, not DONE. Parent
DT-001 remains IN_PROGRESS. No generic review gate was added.

Owner next runs the prompt's normal make command in native Windows PowerShell
from this checkout, preserving the captured source revision, working-tree state,
full output and exit code. If it already ran elsewhere or failed, supply the
actual output/artifact location or failure log. Codex can then inspect the real
outputs and execute the unchanged WP procedure; no new test approval is needed.
No build/download/installation/signing/publishing was performed here; nothing
pushed. Do not run Setup.exe/Update.exe. Clean-install, actual offline/clean-machine,
native sandbox/IPC/navigation/permission/CSP enforcement, signing and macOS checks
remain separate and NOT_RUN. No timer/storage/capture/AI/release work started.

## 2026-11-10T04:49:24+05:00 — Completed build and native smoke — DONE

This dated run supersedes the initial prerequisite blocker above. Owner later
explicitly replied **"run it yourself"**, authorizing Codex to execute the normal
Windows make command, including its ordinary verification/prerequisite fetches.
This did not authorize dependency-install/update commands, security bypasses,
installer execution or push. No original owner build log was supplied: the build
and artifact/native facts below were observed by Codex after that delegation.

### Actual build and provenance

`cmd.exe /c npm run make -- --platform=win32 --arch=x64` exited **0**, completing
Webpack bundles, Windows x64 packaging and the Squirrel maker. Before this run
out/ was absent; outputs below were newly generated. Build source HEAD was
`5fc4e40a4ff84e24acbca58d8ee996c325ce9bf0`; working changes at build start were
only this task's procedure/report/four memory records. Technical source, original
tests, manifests/lockfile and configurations match that revision. Local execution
and hashes support that relationship; no independent/reproducible-build attestation
is claimed. Raw build output and maker metadata remain ignored locally.

| Artifact relative path | Bytes | SHA-256 |
|---|---:|---|
| out/Developer Work Tracker-win32-x64/desktop-tracker.exe | 249832448 | `4c5e0a1d0536294504c78d24fb0da89b683750b50c43e513b3483ad83e083c26` |
| out/make-results/1bb87cf5eb23f02dba4459aedeac51af80c38a3615e31c261e0e7093b029f395.forge-make.json | 2327 | `ef3ea46d595cdf9ce9ddc7f3bb49fb9ced68ccd6b386d09db234bdaf57e93dd9` |
| out/Developer Work Tracker-win32-x64/resources/app.asar | 239381 | `a9749e363e1bdec240e5157490c3c3ba3a6a422ce00e180e31e96bdb0a5102c4` |
| out/make/squirrel.windows/x64/desktop_tracker-0.1.0-full.nupkg | 154246985 | `9e71718efae00634c3221525a8ed0bbe9dd2f31b37aff6745e13c225666f6aa3` |
| out/make/squirrel.windows/x64/Developer Work Tracker-0.1.0 Setup.exe | 155011072 | `67dd7bfb961b769e7a0ab56b8681ecbbd10cb3a9f5e05e800119dcf323e4654f` |
| out/make/squirrel.windows/x64/RELEASES | 86 | `ddd2c807582fd387ad219f9a974814aa59f7dce176ce61eb32aac5ab4db720f3` |

The app EXE PE machine is 0x8664 (AMD64). The Setup EXE has machine 0x14c (I386);
the actual application payload is x64, and no installer was executed. Treat this
as an internal development/test artifact, not a release-signing/publisher claim.
RELEASES package name, size and declared SHA-1 match the actual full nupkg; its
embedded EXE and ASAR SHA-256 match the unpacked package exactly. Its nuspec ID
desktop_tracker, title and 0.1.0 version agree with the embedded app manifest.

### Package completeness and native observation

Read-only installed @electron/asar inspection verified package.json version 0.1.0
and main .webpack/main/index.cjs, renderer main_window/index.html and index.js,
main_window/preload.cjs and renderer/main_window.css. HTML script/style relative
references resolve to those entries. Packaged main constructs a file URL for the
HTML and resolves the bundled preload; no dev URL is needed. Its literal external
requires are Electron/Node built-ins, preload requires Electron, and React/Squirrel
code is bundled. The actual installed Electron runtime DLL/PAK/BIN/DAT file inventory
and the English locale exist beside the EXE. Nothing was extracted and executed
as build code, modified or patched to pass inspection.

PowerShell launched the exact packaged EXE directly, with its adjacent resources,
from the Windows temporary directory outside the source checkout. No npm/Node
launcher or Forge dev server was used. Workspace development-process queries and
the configured default dev-server port 3000 listener check both returned zero.
This establishes no required development server in these runs, not fully offline
or clean-machine operation; no network disconnection/interception was performed.

| Native cycle | Root PID | Tree PIDs | Normal close | App exit | Remaining owned |
|---|---:|---|---|---:|---:|
| 1 | 19696 | 19696, 4924, 21584, 18576 | true | 0 | 0 |
| 2 | 21984 | 21984, 24496, 10904, 4156 | true | 0 | 0 |
| 3 | 24492 | 24492, 23576, 2392, 23352 | true | 0 | 0 |

Cycle 1 established initial visible shell/normal close, but its top capture did
not include the footer. Cycles 2 and 3 captured both top and lower content and
each established the complete UI/bridge expectation, supplying the repeat check.
Only this app's window was captured with DPI-aware PrintWindow, maximized and
scrolled through its own window messages when foreground input was unavailable.
No other desktop image was captured; screenshots and native logs stay ignored.

Actual captures show Developer Work Tracker, Tracking not implemented, Capture
off, AI not configured, Local-only / not connected, visible unavailable-control
text and four grey Start/Pause/Resume/Stop controls, and **Version 0.1.0**. Native
UI Automation returned zero button elements: native IsEnabled semantics remain
NOT_RUN/inaccessible, not passed from their colour. Existing component tests
separately establish disabled properties. The rendered package version establishes
working metadata bridge behaviour, not a source-string or process-only inference.

Each launched child alone omitted inherited ELECTRON_RUN_AS_NODE=1; persistent
environment was untouched. Each CloseMainWindow returned true and exited within
the 15-second bound with no task-owned descendants remaining and no forced kill.
No hidden background process was observed in the tracked trees; no covert-capture
or full security-enforcement proof is inferred from those process checks.

### Fixed WP01–WP08 and final checks

| Case | Final result and scope |
|---|---|
| WP01 | PASS: owner-delegated make exit 0, known source/working state, identified fresh Windows x64/versioned artifacts; provenance limits explicit |
| WP02 | PASS: actual PE/ASAR/bundled assets/runtime files inspected and packaged app runs |
| WP03 | PASS: Setup, nupkg, RELEASES and maker result identified and linked; installer execution NOT_RUN |
| WP04 | PASS: direct exact-EXE native launch from outside checkout, no workspace dev server/default-port listener |
| WP05 | PASS for rendered states/controls/version/bridge; native enabled-state inspection explicitly NOT_RUN |
| WP06 | PASS: two complete launch/UI/close cycles, exit 0 and zero remaining task-owned processes; initial partial-view cycle also closed normally |
| WP07 | PASS: unchanged final source checks and exact default 45/focused 43 identities |
| WP08 | PASS: source/procedure/artifact hashes retained; only authorized records/procedure committed |

After the later build authorization and native runs, final regressions were run
once per suite with unfiltered JSON reporters (no separate reporter-only repeats):

| Command via Windows cmd.exe /c | Exit | Actual outcome |
|---|---:|---|
| npm run make -- --platform=win32 --arch=x64 | 0 | PASS: package and maker outputs generated |
| npm run typecheck | 0 | PASS: root/shared/renderer |
| npm run lint | 0 | PASS: unchanged zero-warning rule |
| npm test -- --reporter=json --outputFile=.vitest/json/winpackage-final-standard.json | 0 | PASS: 9 files / 45 unchanged cases |
| npm run test:candidates -- --reporter=json --outputFile=.vitest/json/winpackage-final-focused.json | 0 | PASS: 8 files / 43 unchanged cases |

Earlier source checks preceded the late build authorization; their recorded results
remain historical. Final post-build reports exactly match their identities and the
prior discovery digest. No skips/todos or changed test/helper expectations. All
inspected EXE/ASAR/installer/package/release/maker-metadata hashes match their
post-build baseline after the launch/close and final regression runs.

Inspection-method corrections, not application repairs: a Windows ASAR API read
first failed (exit 1) with forward-slash entry names; using its installed native
separator API succeeded (0). PowerShell's display projection of a hashtable first
showed nulls while its full JSON log retained real results; a typed projection
corrected display only. An inventory helper assumed legacy libEGL.dll and failed;
that file is absent from this installed Electron 45 distribution, so inspection
used the actual installed runtime-file inventory, which matches the package.
The initial capture's hidden footer was inspected through app-only scrolling in
later cycles. No production, artifact, test, helper-registration or fixed-procedure
expectation changed to resolve any of these observation-tool issues.

ISSUE-009 is resolved after the owner delegation and actual build. Task
DT-001-WINPACKAGE is DONE with scoped local Windows evidence; parent DT-001 remains
IN_PROGRESS. Current allowed changes total seven files: fixed hardware procedure,
this append-only report and five canonical records. 69 original tracked files
remain byte-identical; fixed procedure SHA-256 remains unchanged. No screenshots,
artifacts, raw logs/process/environment dumps or ignored native observer are staged.
No dependency-install/update command or installer was run; nothing pushed.
Normal make may fetch its normal verification/prerequisite data under the owner's
explicit delegation; the earlier no-download/no-build statements describe the
pre-delegation checkpoint only. Signing/publisher verification, clean installation,
fully offline/clean-machine operation, native sandbox/IPC/navigation/permission/CSP
enforcement, AI and macOS remain NOT_RUN and need separate assignments. No further
feature or release work starts here; no owner review is needed for this completion.
