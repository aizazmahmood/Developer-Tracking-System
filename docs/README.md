# Developer Work Tracker

**DT-001: SCAFFOLDED_NOT_VERIFIED.** Electron + React + strict TypeScript,
Electron Forge with Webpack. This is a static desktop shell. Tracking is not
implemented, capture is off, AI is not configured and the app is local-only /
not connected. All session controls are disabled. No time, screenshots, records
or descriptions are created. Windows is the first intended target; macOS is later.

## Owner setup and commands

Use a native Windows terminal in this folder with Node **22.19.0** and npm
**11.14.1** (the inspected build tools). The owner runs `npm i` and reviews the
resulting lockfile; no dependencies have been installed by the bootstrap agent.
See [TOOLCHAIN.md](TOOLCHAIN.md) for metadata checks and compatibility limits. Electron's
embedded Node is separate from the build Node. No global Forge, Vitest or compiler
installation is needed.

All npm commands below run from the repository root (the parent of this docs
folder). After **you** run `npm i`:

| Command | Purpose / prerequisite |
|---|---|
| `npm run typecheck` | TypeScript checks for all source/candidates, pure shared code without Node/DOM, then renderer without Node globals. |
| `npm run lint` | ESLint and hooks rules; zero warnings required. |
| `npm run test:candidates` | Proposed DT-001 Vitest / React Testing Library checks. NOT approved acceptance. |
| `npm test` | Ordinary approved-suite discovery. Currently expected to **fail on no tests**; no approved tests exist. |
| `npm start` | Compile and open the static Electron window. Requires a graphical native OS. Development serves bundled UI on loopback; HMR/client/live reload are disabled. Restart after editing. |
| `npm run package` | Build unpacked app for the host platform. No signing or runtime verification is implied. |
| `npm run make` | Windows Squirrel installer on Windows; unsigned ZIP on macOS. Native maker prerequisites and artifact smoke tests are still required. |

No custom installation hooks, publishing, automatic updates or signing
credentials are configured. Start/package/make need the Electron binary already
obtained through the owner's installation. If a tool requests an additional
download, the owner controls that action. No Linux maker or Linux support is
claimed. No Windows/macOS launch or packaging has been verified.

## Layout

```text
src/
  main/                 Electron lifecycle, read-only metadata and restrictions
  preload/              sandbox-bundled, typed getAppMetadata bridge
  renderer/             static React interface
  contracts/            pure metadata types and response validation
  core/                 reserved for approved domain work
  application/          reserved for approved use cases/ports
  adapters/             reserved for infrastructure
  platform/windows/     reserved Windows adapters
  platform/macos/       reserved macOS adapters
  workers/storage/      reserved single-writer storage process
  workers/analysis/     reserved image/inference worker
tests/{unit,integration,acceptance,fixtures,hardware}/
test-candidates/         proposed checks, outside ordinary discovery
specs/                  proposed acceptance contracts
docs/                   architecture, policies, toolchain and owner setup
templates/              work, task and issue record templates
```

The renderer receives no raw IPC, filesystem, SQL, credentials or network bridge.
Main validates metadata arguments, owner webContents, main frame and document
URL. The configured sandbox, isolation, navigation/permission denials and CSP
require actual Electron verification; source inspection cannot prove runtime
enforcement. No workers or OS adapters are started.

## Approval and later work

`specs/DT-001-bootstrap.md` revision 0.1 and `test-candidates/` are **PROPOSED**.
No genuine red/green run or independent acceptance has occurred. `npm test`
cannot be called green because candidate tests pass or approved tests are absent.
DT-000 remains pending. Owner-controlled approval, frozen contracts, repository
permissions and the external evaluator in [OWNER_SETUP.md](OWNER_SETUP.md) are not established.

DT-002 must validate native SQLite packaging/ABI and packaged utility-process
paths before storage implementation. There is no better-sqlite3 or Ollama
dependency here. Timer, persistence, capture, inference, sync, tray and updater
work are outside this bootstrap. Future features need independently reviewed
contracts and meaningful behavioural red evidence before implementation.

## Planning pack and durable records

The original planning pack was prepared on 9 November 2026. Its architecture,
policies, release plan, source references and templates remain planning evidence,
not proof of implementation or protection enforcement. Source locations:

- [Root instructions](../AGENTS.md): working rules and unchanged approval boundaries.
- [Architecture](ARCHITECTURE.md) and [test policy](TEST_POLICY.md).
- [Current state](memory/CURRENT_STATE.md) and [task backlog](memory/TASKS.md).
- [Work history](memory/PROJECT_MEMORY.md), [issues and solutions](memory/ISSUES.md),
  and [decisions](memory/DECISIONS.md).
- [Toolchain](TOOLCHAIN.md), [registry metadata](toolchain-metadata.json),
  [release plan](RELEASE_PLAN.md), [sources](SOURCES.md), and
  [owner setup](OWNER_SETUP.md).
- Specifications: [DT-001 bootstrap proposal](../specs/DT-001-bootstrap.md) and
  [DT-010 timer draft](../specs/DT-010-timer.md). Neither is approved by this cleanup.
- Templates: [work entry](../templates/WORK_ENTRY.md),
  [issue entry](../templates/ISSUE_ENTRY.md), and [task specification](../templates/TASK_SPEC.md).
- Current assigned prompt: [documentation reorganisation](prompts/CODEX_BOOTSTRAP_PROMPT.md).
  Its filename is retained from the owner's working file; its content now assigns DOCS-001.
- Historical prompt: [original bootstrap](prompts/archive/CODEX_BOOTSTRAP_PROMPT.bootstrap.md),
  preserved verbatim from commit `ed096d2`. It is obsolete and must not be executed
  as current instructions.

## DOCS-001 path migration

AGENTS.md is the only loose root Markdown document. Source, tests, specifications,
templates, package/lock files and build configuration retain their established
locations. Memory has one canonical active location; no root copies remain.

| Earlier repository-root path | Canonical path from repository root |
|---|---|
| CURRENT_STATE.md | [docs/memory/CURRENT_STATE.md](memory/CURRENT_STATE.md) |
| PROJECT_MEMORY.md | [docs/memory/PROJECT_MEMORY.md](memory/PROJECT_MEMORY.md) |
| ISSUES.md | [docs/memory/ISSUES.md](memory/ISSUES.md) |
| DECISIONS.md | [docs/memory/DECISIONS.md](memory/DECISIONS.md) |
| TASKS.md | [docs/memory/TASKS.md](memory/TASKS.md) |
| README.md | [docs/README.md](README.md) |
| CODEX_BOOTSTRAP_PROMPT.md (current owner revision) | [docs/prompts/CODEX_BOOTSTRAP_PROMPT.md](prompts/CODEX_BOOTSTRAP_PROMPT.md) |

Old paths inside historical memory, recorded commands and specifications describe
the earlier layout. They were preserved as evidence, not active path instructions.
The bootstrap spec's old prompt reference identifies the original bootstrap
prompt in the archive above; the current prompt contains this documentation task.
Follow canonical instructions in [AGENTS.md](../AGENTS.md) for future sessions.

Local commits are permitted; every push belongs to the owner. No real staff
evidence belongs in this repository.
