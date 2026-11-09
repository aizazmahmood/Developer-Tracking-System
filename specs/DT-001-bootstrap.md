# DT-001 — Secure static desktop bootstrap

**Status:** PROPOSED, revision 0.1, 2026-11-10. Approval: PENDING.
**Authorization:** `CODEX_BOOTSTRAP_PROMPT.md`, invoked by the owner in this session.
**Delivery state:** BOOTSTRAP_ONLY; SCAFFOLDED_NOT_VERIFIED is the maximum status.

## Scope and observable outcomes

One Electron Forge/Webpack package with React and strict TypeScript. The window
shows a static, honest starting state. There is no timer, storage, capture, model,
account, network service, tray recording or updater implementation.

| ID | Proposed acceptance case | Candidate / evidence |
|---|---|---|
| B01 | Title is Developer Work Tracker; tracking not implemented, capture off, AI not configured and local-only/not connected are visible. | shell.candidate.test.tsx |
| B02 | Start, Pause, Resume and Stop are disabled and labelled unavailable. No recording success or invented session is displayed. | shell.candidate.test.tsx; runtime inspection |
| B03 | Missing or rejected metadata bridge shows app information unavailable without hiding the shell. | shell.candidate.test.tsx |
| B04 | The frozen preload bridge exposes only getAppMetadata; it sends one fixed read-only IPC channel and no arguments. Extra arguments are rejected before IPC. | preload.candidate.test.ts |
| B05 | Malformed metadata responses, unknown fields, empty/oversized version and wrong title are rejected. IPC rejection propagates. | preload.candidate.test.ts |
| B06 | Main accepts only the owning live webContents, its exact main frame and the exact initial document URL, with zero arguments. Reject other windows, subframes (including same URL), null frames, navigation, destroyed windows and payloads. | metadata.candidate.test.ts |
| B07 | Window has sandbox/context isolation, no Node integration/webviews, web security enabled; navigation, redirects, subframe navigation and new windows are denied. Permission requests/checks deny. | security.candidate.test.ts; actual Electron checks still required |
| B08 | Shared code has no Electron/React/Node/OS dependency; preload is bundled for the sandbox; renderer has no privileged imports. | boundaries.candidate.test.ts; shared typecheck; bundle review |
| B09 | Packaged CSP has no remote sources, inline scripts or eval. Development uses an explicit loopback server; HMR is disabled. | security.candidate.test.ts; browser CSP inspection |
| B10 | Ordinary test discovery excludes candidates and fails when approved suites are absent. | discovery.candidate.test.ts; owner must execute npm test |
| B11 | Actual Windows window opens, bridge returns package version, renderer has no require/process/IPC, forbidden navigation/popups/permissions fail and closing quits. Packaged app launches offline. | owner-run native checklist below; NOT_RUN |
| B12 | macOS compile, launch and packaging evidence are recorded separately. | Mac runner/device required; NOT_RUN |

## Test boundaries and independent evidence

Candidate Vitest tests fake Electron objects only at the Electron API boundary
and fake the typed metadata API in React component tests. They cannot prove
Chromium sandboxing, IPC serialization, CSP enforcement or native installation.
Expected titles/statuses and rejection cases are literal contract values, not
computed from implementation helpers. Source/config checks supplement behaviour
tests; neither is an independent enforcement mechanism.

All executable proposals live in `test-candidates/`. Ordinary discovery uses
only `tests/{unit,integration,acceptance}/` and explicitly fails on no tests.
No approved tests exist. No valid behavioural red/green run is claimed for this
dependency-free scaffold. The bootstrap exception permits the static shell
before independent approval; future feature implementation needs a frozen,
owner-approved contract and genuine red evidence.

## Native review checklist (proposed; NOT_RUN)

After owner installation and candidate checks, launch with `npm start` and inspect
the four states and disabled controls. Inspect actual webPreferences and renderer
globals from trusted main-process instrumentation; attempt iframe IPC, wrong
sender, altered URL, extra arguments, popup, navigation, permission and CSP
violations. Verify the preload bundle needs only sandbox-supported Electron APIs.
Build with `npm run package` and `npm run make` on Windows; install/launch the
artifact offline on a clean supported machine and repeat security checks against
that exact artifact. Confirm close exits with no hidden recording processes.
Repeat compilation and relevant shared checks on macOS; record native results
separately. The owner must choose and freeze the external harness rather than
treat this checklist or component mocks as runtime acceptance.

## Approval record

Owner/reviewer, contract hash/inventory, source baseline, permitted scaffolding,
native harness, OS exclusions and evaluator location: PENDING. DT-000 remains open.

## 2026-11-10T04:17:43+05:00 — B10 supersession: DT-001-DISCOVERY

**Owner authorization:** explicit assignment of the external
DT-001-DISCOVERY-default-test-integration.md task. The original revision 0.1 above,
including its historical approval/delivery metadata, remains unchanged. This
addendum supersedes only B10's candidate-exclusion/absent-approved-suite requirement
and its related discovery description; all other acceptance cases remain intact.

**Current B10:** unchanged npm test must execute tests/unit, tests/integration and
tests/acceptance with their explicit `**/*.test.{ts,tsx}` patterns, plus existing
scaffold checks with `test-candidates/**/*.candidate.test.{ts,tsx}`. Exclude only
`node_modules/**`, `.webpack/**` and `out/**`; retain default Node environment and
`passWithNoTests: false`. Keep the focused candidate configuration/command unchanged
and its fail-on-zero safeguard. Preserve per-file environments, including jsdom.
Do not move/copy suites or include helpers/build/hardware directories as suites.

The one authorized B10 case now reads "B10 integrated default discovery / includes
ordinary and scaffold tests while retaining zero-test failure", with the fourth
include, exact excludes and Node assertions. Both prior fail-on-zero assertions
and the focused exact include assertion remain. Other 42 existing cases are
unchanged. Two new ordinary cases supplement the exact real-config contract;
full execution inventories and a no-match run establish actual discovery.

This is a scoped requirement revision, not blanket test-edit permission,
independent test approval, retrospective bootstrap TDD or native verification.
B11/B12 runtime/platform requirements remain unchanged. Results are recorded in
[DT-001 discovery validation](../docs/validation/DT-001-discovery.md).
