Bootstrap the Developer Work Tracker in the current project directory.

Read and follow root AGENTS.md first. Use the saved architecture as the design
source. Expected location: docs/ARCHITECTURE.md. If it is at the repository
root, find and read it; preserve it and document its location rather than
silently replacing it. Preserve any other planning-pack files already present.

AUTHORIZATION AND LIMITS

This task is BOOTSTRAP_ONLY: create the local repository and an unverified
boilerplate, not the full tracker. I will run npm i myself. You may create
meaningful local commits. I alone will push.

Do not install dependencies, run package generators, download binaries/models,
create a remote repository, change remotes, push, publish or merge. Do not
rewrite AGENTS.md or the saved architecture. Do not bypass permission prompts,
hooks or repository safeguards. Missing Git identity is a blocker to report,
not permission to invent an identity.

The one-time scaffold exception allows configuration, proposed tests and a
minimal static shell. It does not approve acceptance contracts, waive future
test-first development or authorize implementing application features.

1. INSPECT AND ESTABLISH THE LOCAL REPOSITORY

Inspect files, current directory, Git status/root/branch, existing instructions
and installed Node/npm/Git versions using read-only commands. Preserve existing
work. Work in this directory, not an extra nested project folder.

If it is not in any Git repository, initialize a local repository with main as
the initial branch. If it is already a repo, reuse it without renaming branches.
If it is inside a different parent repository, do not initialize a nested repo
or modify that parent; report the root conflict. Do not touch remotes.

Use desktop-tracker as the provisional package name and Developer Work Tracker
as the provisional app title unless existing files specify names.

2. CREATE THE MINIMAL STRUCTURE

Use Electron + React + TypeScript, Electron Forge with Webpack, strict
TypeScript, ESLint, Vitest and React Testing Library. Keep one npm package,
not a monorepo or a collection of unnecessary services. Preserve this layout:

src/
  main/
  preload/
  renderer/
  core/
  application/
  contracts/
  adapters/
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
test-candidates/
specs/
docs/

Use short READMEs for future directories rather than fake implementations.
Create only useful initial interfaces. Do not import Electron or OS APIs into
the shared core. Reserve SQLite/better-sqlite3 and Ollama integration for their
approved tasks; do not start them or add speculative runtime dependencies.

Create the required package/build/TypeScript/lint/test configuration, renderer
HTML/styles and entry points, .gitignore, .editorconfig and README.md. Ignore
node_modules, generated bundles/packages, runtime data, credentials, screenshots
and local logs. Do not ignore the future package-lock.json.

Use published, mutually compatible stable dependency pins. Check official
release/registry information through read-only access when available. Document
the chosen build Node/npm versions, Electron version and compatibility evidence
in docs/TOOLCHAIN.md. Distinguish metadata checks from actual install/build
verification. Do not invent versions or hand-write a lockfile. If version
verification is blocked, record the blocker rather than inventing evidence.

3. WRITE PROPOSED CHECKS BEFORE THE SHELL

Create specs/DT-001-bootstrap.md as a PROPOSED acceptance contract and place
its tests in test-candidates/. Cover the static shell, a narrow read-only
preload API and its boundary checks, visible unavailable states, and the
separation between shared code and Electron-specific code.

Do not call these approved tests. Add separate configuration for candidate
tests so they cannot silently count as approved acceptance. Keep ordinary test
discovery explicit. Zero approved tests must not produce an acceptance pass.
Never add skipped tests or unconditional passing placeholders.

No dependencies will be installed in this task, so do not claim a genuine red
or green run. Record dependency-requiring checks as NOT_RUN unless suitable
tools are genuinely already installed and executable without downloading.

4. ADD ONLY THE SECURE STATIC SHELL

Wire Electron main, a sandbox-compatible preload and React. Enable context
isolation and sandboxing; disable renderer Node integration. Restrict CSP,
navigation and new windows. Expose only a minimal typed read-only app-metadata
method if needed, with appropriate boundary validation. No arbitrary IPC,
filesystem, shell, database or network access from the renderer.

Display the app title and clearly labelled states: tracking not implemented,
capture off, AI not configured, and local-only/not connected. Any future timer
controls must be disabled and labelled unavailable. Do not simulate ticking,
saved sessions, generated descriptions or successful synchronisation.

Do not implement timer rules, SQLite storage, capture, Ollama requests, login,
remote APIs, tray recording or automatic updates. The initial window must not
start hidden activity. Keep platform-specific code behind adapter boundaries;
macOS scaffolding must not claim macOS has been tested.

5. ADD HONEST DEVELOPMENT COMMANDS AND DOCUMENTATION

Define scripts for start, typecheck, lint, test, test:candidates, package and
make. Use actual local tools, not echo-success placeholders. Document what each
script checks, its prerequisites and any platform limitation. Do not configure
publishing, signing credentials, remote update endpoints or automatic installs.

README.md must explain npm i is run by me, then the available checks and launch
commands. Document that candidate checks are not independent acceptance, and
npm test must not pass merely because approved tests are absent. Document the
later native-SQLite packaging spike rather than pretending it is verified.

Preserve existing memory/policy documents. Create missing CURRENT_STATE.md,
PROJECT_MEMORY.md, ISSUES.md, DECISIONS.md and TASKS.md. Create a proposed
docs/TEST_POLICY.md if absent, consistent with AGENTS.md and the architecture.

Add docs/OWNER_SETUP.md explaining the owner-controlled test approval and
independent evaluator/repository protections still required. Do not create a
fake approved contract, claim enforcement is active or set up remote controls.
Keep DT-000 pending. Do not mark DT-001 DONE after scaffolding.

6. INSPECT, LOG AND COMMIT LOCALLY

Use available dependency-free checks such as JSON parsing, file inspection,
and git diff --check. Inspect staged files too. Never claim these establish
runtime correctness. Record all checks, actual failures, proposed solutions and
remaining gaps in the memory documents. Use SCAFFOLDED_NOT_VERIFIED.

Create a small number of coherent local commits, with candidate-test work
separate from the shell where practical. For example:

docs(project): establish desktop bootstrap records [DT-000]
test(shell): propose bootstrap acceptance checks [DT-001]
chore(desktop): scaffold Electron React shell [DT-001]

These are examples, not a requirement for empty/artificial commits. Include
honest validation in commit bodies. Stage explicit files only. The supplied
AGENTS.md and architecture may be included unchanged in the initial commit.
Do not commit unrelated human changes. Never push.

STOP AFTER THE SCAFFOLD

Return the repository structure, created files, exact checks and outcomes,
commit hashes/messages, unresolved blockers and the commands I should run after
npm i. Explicitly state: no dependencies installed, no push performed, runtime
verification pending, and acceptance/independent safeguards pending approval.
Do not continue into timer, capture, database or AI feature implementation.
