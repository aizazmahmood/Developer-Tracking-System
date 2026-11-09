# Decision Register

Accepted user directions are distinct from proposed technical choices. No technical proposal below is silently treated as owner-approved. Change a decision by adding a superseding record with reason, alternatives, impact, approval and evidence.

| ID | Status | Decision / proposal | Reason |
|---|---|---|---|
| D-001 | USER_SELECTED | Electron rather than the Rust desktop stack | Chosen in the preceding planning discussion. |
| D-002 | USER_SELECTED | Windows release first; macOS release later | Explicit release sequence. |
| D-003 | USER_SELECTED | Test-first development; Codex may not weaken tests to justify code | Explicit development requirement. |
| D-004 | USER_SELECTED | Markdown task history and issue/solution memory | Explicit continuity requirement. |
| D-005 | PROPOSED | One codebase; shared domain/application modules and platform adapters | Avoid a second product or scattered OS branches. |
| D-006 | PROPOSED | Local-first SQLite records; AI and sync are non-blocking | Preserve time independently of connectivity or inference. |
| D-007 | PROPOSED | React/TypeScript; Electron Forge with Webpack/TypeScript initially | Forge's Vite plugin is currently marked experimental; avoid this risk for the first shell. |
| D-008 | PROPOSED | better-sqlite3 in a single-writer utility process | Keep native database work away from the UI/main event loop; validate packaging first. |
| D-009 | PROPOSED | Ollama, local vision model, model/prompt versions recorded | Avoid hosted inference fees and keep default processing local. Model not yet selected. |
| D-010 | PROPOSED | Recording pauses on lock/sleep; resumes explicitly | Avoid silently counting unattended intervals or restarting capture. |
| D-011 | PROPOSED | No automatic deduction based on mouse/keyboard inactivity | Screen activity is not a reliable account of all work. |
| D-012 | PROPOSED | Windows 11 x64 initial reference target; macOS Apple Silicon first candidate | Limit the first validation matrix. Exact supported versions require owner approval. |
| D-013 | PROPOSED | One sample every five minutes; no continuous video retention | Starting cadence for validation, not a completeness guarantee. |
| D-014 | PROPOSED | Raw images remain local; delete after observation; encrypted retry buffer capped at 24h/250MB | Bound sensitive retention and disk use. No claim of forensic secure erasure. |
| D-015 | PROPOSED | Human-approved test contract and external trusted acceptance evaluator | Agent instructions alone cannot enforce test integrity. |
| D-016 | PROPOSED | Playwright desktop automation plus real-device release checks | Electron support is experimental; simulated CI cannot establish every native interaction. |

## Approval record template

Decision ID:  
Reviewer and date:  
Approved revision / PR:  
Evidence reviewed:  
Any conditions or expiry:  
Supersedes:

## 2026-11-10 — Initial bootstrap choices (no feature acceptance)

| ID | Status | Choice and evidence | Remaining approval |
|---|---|---|---|
| D-017 | BOOTSTRAP_AUTHORIZED | Owner requested execution of CODEX_BOOTSTRAP_PROMPT.md in this workspace; its BOOTSTRAP_ONLY limit permits local repo, initial config, candidate tests and static shell. | Does not approve DT-000, DT-001 contract or later feature work. |
| D-018 | PROPOSED_SCAFFOLD | Forge 8.0.1 Webpack, Electron 45.2.3, React 19.3.1, TypeScript 5.9.3; build Node 22.19.0 / npm 11.14.1. All 27 direct pins checked against registry metadata; docs/TOOLCHAIN.md explains compatibility and source checks. | Owner installation, generated lockfile review, real builds and independent contract approval pending. |
| D-019 | PROPOSED_SCAFFOLD | Metadata-only typed bridge; bundled sandbox preload, strict CSP with external CSS; loopback development without HMR/client/live reload. Forge 8 requires explicit main index.cjs. | Actual Electron and packaged runtime security checks pending; custom protocol/fuse hardening reserved for reviewed work. |

Initial pins/config were created under the bootstrap authorization. These entries
are not independent approval of future changes to the now-created toolchain or
protected configuration. No timers, storage/model dependencies or hosted services
were added. No prior decision/approval record was altered.
