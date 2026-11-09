# DT-001 scaffold baseline validation

## 2026-11-10 — DT-001-VERIFY — Windows baseline and policy correction

**Starting revision:** d4690763c41823d1c0f7d53f6dd2f4d170e9d1d6 (`main`, clean working tree).
Matches the requested public baseline `d469076`; no pre-existing modifications.
**Application status:** NOT_VERIFIED overall; local candidate checks and development
render/close verified within the limits below. Not DONE or release-approved.
**Authorization:** Owner invoked the external corrected-test-policy document.
Its contents remain outside this repository; no prompt folder was recreated.

### Scope and corrected policy

Codex may write new tests and implement against them without owner approval.
Only changes to existing tests or existing test behaviour require explicit,
scoped owner approval. Tests become existing as soon as they are written,
including during the same task. Approval is not inferred from silence, passing
results, a general continue or authorship of the tests.

New independent tests may be authored when assigned; prefer new files. Additive
cases in an existing file must leave prior cases, execution, setup and expectations
unchanged. Explicit approval covers existing-test edits/deletions/disabling,
substantive moves/renames, fixtures, mocks/helpers, snapshots, discovery, thresholds,
test commands/configuration and dependency resolution affecting existing checks.
No initial contract review, candidate promotion or substitute sign-off gate is
required. Separately established security/release controls remain applicable.

Updated AGENTS.md, TEST_POLICY, OWNER_SETUP, relevant ARCHITECTURE/README wording,
TASK_SPEC/WORK_ENTRY template fields and active memory summaries. No acceptance
case or specification was edited. Historical approval metadata in
specs/DT-001-bootstrap.md and older memory entries remains historical; it is not
an initial-approval blocker under the superseding active policy. The unchanged
candidate directory/configuration and legacy proposal labels do not create one.
Independent enforcement infrastructure remains separately tracked/unconfigured.

This run created no executable tests and changed no source, existing tests,
fixtures, dependencies, lockfile, package scripts, build/test configuration or CI.
All failures below were diagnosed and left unchanged. No historical behavioural
red run is fabricated for this already-written bootstrap.

### Environment and prerequisites

| Item | Observed evidence |
|---|---|
| Host/tool bridge | Linux x86_64, kernel 6.6.87.2-microsoft-standard-WSL2; commands invoke native Windows executables through WSL interop |
| Windows target | Microsoft Windows build 10.0.26100.9711, native win32 x64 Node/Electron |
| Build Node | v22.19.0; installed Program Files/nodejs/node.exe |
| npm | 11.14.1 through Windows System32/cmd.exe |
| Git | Linux 2.43.0; Windows 2.51.0.windows.1; existing configured Windows identity used, no identity changes |
| Python | 3.12.3, used for read-only inventory/hashes and authorized documentation edits |
| Electron package / binary | Installed 45.2.3; dist/version 45.2.3; actual version-only child returned v45.2.3 / exit 0 |
| Direct dependencies | All 27 manifest pins equal root lockfile specs, locked versions and installed package versions |
| Dependency health | npm ls --depth=0 exit 0; all 27 direct packages present, no reported unmet/invalid/extraneous direct dependency |
| Installed tooling | Local compiler, ESLint, Vitest and Forge command shims present; Electron executable present |
| Cached package prerequisite | Electron v45.2.3 win32-x64 ZIP already present, 158,182,975 bytes; no binary downloaded by this task |

The host has no bare Linux node. This is not Linux proof of Windows behaviour:
checks and the observed window actually ran using the Windows binaries.
An inherited ELECTRON_RUN_AS_NODE=1 caused the first direct electron.exe
--version probe to print v24.22.2 (embedded Node). The flag was inspected alone,
not via an environment dump. A version-only child with that flag removed returned
Electron v45.2.3 / exit 0. Forge's existing start code already removes this flag
for GUI launch. No persistent environment or application settings were changed.
A PowerShell direct version probe exited 0 without captured output; the subsequent
Node spawnSync capture supplied the version evidence above.

### Actual command results

Commands ran independently from the repository root using already-installed
Windows tools. The four npm commands used the exact prefix
`/mnt/c/Windows/System32/cmd.exe /c`. No extra flags filtered failures.

| Command | Exit | Result | Evidence / counts |
|---|---:|---|---|
| npm ls --depth=0 | 0 | PASS | 27 direct dependencies healthy at this depth |
| npm run typecheck | 2 | FAIL | Three TS2428 diagnostics: incompatible Assertion generic declarations in jest-dom/Vitest; no executable tests run |
| npm run lint | 1 | FAIL | Two no-require-imports errors in forge.config.cjs:1 and webpack.renderer.config.cjs:1; zero warnings |
| npm run test:candidates | 0 | PASS | 6 test files, 22 cases passed, 0 failed/skipped; Vitest 5.1.0; 11.96 seconds |
| npm test | 1 | FAIL | No test files found in tests/unit, integration, acceptance; 0 executed; empty-suite failure intact |
| node_modules/.bin/tsc.cmd --noEmit -p tsconfig.shared.json (first WSL wrapper attempt) | 1 | FAIL, invocation only | Unquoted backslashes were consumed before cmd.exe; no compiler run |
| node_modules/.bin/tsc.cmd --noEmit -p tsconfig.renderer.json (first WSL wrapper attempt) | 1 | FAIL, invocation only | Same wrapper path error; not behavioural red evidence |
| Windows node node_modules/typescript/bin/tsc --noEmit -p tsconfig.shared.json | 0 | PASS | Existing pure shared configuration checked independently |
| Windows node node_modules/typescript/bin/tsc --noEmit -p tsconfig.renderer.json | 0 | PASS | Existing renderer configuration checked independently |
| npm start | 0 after normal close | PASS, development smoke only | Main/preload/renderer compiled; actual window observed; version 0.1.0 displayed; normal close exited |
| npm run package | — | NOT_RUN | Exact current helper fetches checksum metadata even for a cached ZIP; extra-fetch precondition not satisfied |
| Packaged-app launch | — | NOT_RUN | No package artifact produced by this run |
| npm run make | — | NOT_RUN | Default make repackages first, reaching the same extra-fetch path |
| Installer execution / installed app | — | NOT_RUN | Explicitly outside this task; no machine installation performed |
| macOS compile/runtime/package | — | NOT_RUN | No Mac environment; no platform-variable simulation |
| git diff --check | 0 | PASS | Authorized documentation delta only after correcting two newly carried Markdown trailing-space lines |

The aggregate typecheck script stops at its first tsc command because it uses
&&. The shared/renderer configurations were therefore run independently without
editing that script. The wrapper errors were corrected in command invocation
only, not by modifying configuration or tests.

| Existing candidate file | Cases passed | Boundary |
|---|---:|---|
| boundaries.candidate.test.ts | 1 | Source AST/import inspection |
| discovery.candidate.test.ts | 1 | Existing config values, including fail-on-zero |
| metadata.candidate.test.ts | 3 | Fake Electron window/frame/IPC boundary |
| preload.candidate.test.ts | 11 | Fake Electron IPC/contextBridge; schema and rejection behaviour |
| security.candidate.test.ts | 3 | Preference values, fake Electron restrictions, HTML CSP source |
| shell.candidate.test.tsx | 3 | React/jsdom with absent/success/rejected metadata API |
| **Total** | **22** | Genuine local results, no independent evaluation claim |

### Development window observation and cleanup

The native Windows window title was Developer Work Tracker. A screenshot of only
this task's application window showed Tracking not implemented, Capture off,
AI not configured, Local-only / not connected, four grey unavailable session
controls and Version 0.1.0. The first observer capture was cropped by DPI handling;
a DPI-aware observer capture showed the full window. No application code or
security preference was changed. The app was scrolled to the lower content in
the inspected view; the title was visible in its native title bar.

The existing component tests establish disabled button properties in React.
Native accessibility lookup returned no button elements, so native enabled-state
inspection was inconclusive, not a passing accessibility check. No forced IPC,
navigation, popup, permission, CSP violation or renderer-global probe was run.
Observed rendering and successful metadata do not prove all runtime hardening.

Only this run's workspace Electron process was closed using CloseMainWindow.
It returned true, the process exited within ten seconds, and a targeted workspace
query found zero remaining Electron processes. npm start then returned exit 0.
No unrelated application was terminated. The temporary app-only image is in an
ignored screenshots directory; no screenshot or raw process/environment dump is
committed. No hidden recording, capture, storage or model behaviour was implemented.

### Packaging preflight and owner installation checklist

Current Forge/Webpack/packager/maker source was inspected without modification.
The cached Electron ZIP exists, but installed @electron/get/dist/index.js calls
validateArtifact even on a cache hit (around lines 114–132). With the current
config it supplies no checksums object; lines 41–52 fetch SHASUMS256.txt with cache
bypass. A verification failure can fall back to downloading the binary. The
existing Forge packagerConfig supplies neither electronZipDir nor checksums.
Thus an unmodified package/make run cannot satisfy this task's no-extra-fetch
precondition; neither was started. No cache was cleared, no checksum check was
weakened and no offline workaround/config override was introduced.

The installed Squirrel maker and bundled vendor executables exist. No remote
release or signing configuration is set. Their presence does not prove an
installer builds or installs. No output package/installer artifact or hash exists
for this run; the cache ZIP is a prerequisite, not a produced app artifact.

Owner-run release checks after an authorized package/build environment is ready:

1. Run package and make on the intended Windows x64 environment; review any
   network prerequisite and record exact source, platform, artifact paths and hashes.
2. Launch the unpacked package separately and verify title, four states, unavailable
   controls, version metadata and normal close; repeat actual security checks.
3. On a clean supported machine, install the identified installer under the owner's
   control, then launch the installed app and repeat checks. Do not conflate
   installer creation, installation and installed-app execution.
4. Record uninstall/data-retention behaviour and separate Mac evidence before
   claiming those release properties. This task ran no installer.

### B01–B12 evidence map (acceptance cases unchanged)

| ID | Evidence from this run | Limits / missing evidence |
|---|---|---|
| B01 | 3 shell cases pass; native title and four labels observed | No packaged UI evidence |
| B02 | Component test asserts four disabled buttons; window shows grey unavailable controls and no recording state | Native accessibility supplied no control data; no packaged check |
| B03 | Absent/rejected bridge component cases pass | Real failure injection not run; normal native bridge succeeded |
| B04 | Preload test proves frozen narrow API and fixed argument-free IPC at mocked boundary; real app displays version | Actual renderer privilege/global inspection not run |
| B05 | 8 malformed response rows plus request/IPC failure coverage in 11 preload cases pass | Real serialization/attacker boundary not exercised |
| B06 | 3 main IPC-boundary cases pass | Electron frames/senders faked; native adversarial IPC not run |
| B07 | Preference/denial assertions pass; source and renderer process sandbox flag inspected | Actual sandbox, permissions, popup/navigation enforcement untested |
| B08 | Import AST case passes; shared and renderer tsc checks pass; actual sandbox-target preload compiled | Overall typecheck still fails; packaged boundaries untested |
| B09 | CSP source assertions pass; current development shell renders with unchanged CSP | No runtime violation attempts or production-package CSP check |
| B10 | Config assertions pass; actual ordinary npm test exits 1 on zero files | Normal suite not integrated; candidate success is separate evidence |
| B11 | Real Windows development render, metadata version and close/exit observed | Renderer globals/security attacks and packaged offline launch NOT_RUN |
| B12 | None | Mac compile/runtime/package NOT_RUN |

### Confirmed failures and proposed smallest repairs (not applied)

- **ISSUE-005 — Assertion type incompatibility.** Reproduce with npm run typecheck.
  jest-dom/types/vitest.d.ts:5 augments Assertion with one type parameter;
  Vitest's declarations use two. Runtime candidate tests can pass while this
  declaration merge fails. Select and verify a compatible Vitest/jest-dom pair or
  a compatible matcher typing strategy. Exact dependency/lockfile or existing-test
  import/typing changes require scoped approval; no version or fix is invented here.
  Do not hide this with skipLibCheck or edits inside node_modules.
- **ISSUE-006 — CJS lint scope.** Reproduce with npm run lint. The TypeScript rule
  no-require-imports applies to CommonJS build configs. Proposed narrow repair:
  add an ESLint override for files ['**/*.cjs'] setting only
  '@typescript-eslint/no-require-imports': 'off', keeping other rules intact.
  This changes existing lint configuration and needs explicit approval; not applied.
- **ISSUE-007 — Normal suite not integrated.** Reproduce with npm test; exit 1,
  no files. The discovery exclusion/fail-on-zero remain intact. A precise possible
  integration proposal is to add test-candidates/**/*.candidate.test.{ts,tsx} to
  ordinary Vitest include and remove only its test-candidates/** exclusion.
  The existing discovery test expectations and B10 policy/spec metadata would
  need corresponding scoped revision, preserving fail-on-zero and all existing
  behavioural cases. Obtain approval for that complete execution/expectation
  revision in a later task; initial test approval/promotion is not the issue.
- **Packaging gap (preflight, not a reproduced package defect).** Arrange an
  owner-controlled package run with its metadata prerequisites, or separately
  authorize a verified offline packaging configuration that preserves checksum
  validation. No package failure is fabricated for a command not run.

Smallest next bounded task: diagnose a compatible assertion-typing repair and
present its exact dependency/test/configuration diff for approval before changing
existing surfaces. The CJS override and suite integration are separately scoped
proposals. New independent native tests can be authored without initial approval
when assigned; this validation task did not create them. No timer, persistence,
capture, model or sync implementation is authorized here.

### Integrity and remaining controls

52 tracked files outside the authorized policy/memory edit scope match their
starting SHA256 values, including every source file, executable candidate test,
specification, fixture, dependency/lockfile and build/test configuration.
Combined path/content inventory SHA256:
`be340ef546576a9a2823b0129a4bb235bed2f32befa9357f11630a7993493174`.
Package-lock SHA256:
`0b0dee6050e403ff230e0b8d84799906bc9e44dcab731fbe713fadfbc04b7db8`.
Local hashes document changes; they do not independently enforce protection.
History is preserved; no prompt stored, dependency installed or push performed.
Policy wording changed under explicit owner authorization, so this task was not
entirely read-only. Overall typecheck/lint and missing normal-suite/runtime/release
evidence remain open; initial owner approval of new tests is not a blocker.
