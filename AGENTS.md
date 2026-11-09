# AGENTS.md — Developer Work Tracker

## 1. Mission and scope

Build the desktop application described in `docs/ARCHITECTURE.md`: Electron,
React and TypeScript; Windows first, macOS later; shared business logic and
explicit platform adapters. Use Electron Forge's Webpack/TypeScript route
unless the owner approves a change.

Record time reliably without AI or a network. Generate editable descriptions
from explicitly permitted work context. No live manager feed, covert capture,
keylogging, webcam/microphone recording, or automatic productivity verdicts.
Do not build the manager dashboard or production server in desktop tasks.

## 2. Start every session

Read `AGENTS.md`, `docs/ARCHITECTURE.md`,
`docs/memory/CURRENT_STATE.md`, `docs/memory/TASKS.md`,
`docs/TEST_POLICY.md`, and the assigned task specification. Read relevant entries
in `docs/memory/PROJECT_MEMORY.md`, `docs/memory/ISSUES.md` and
`docs/memory/DECISIONS.md`. Inspect actual files, Git
status, branch and recent commits; memory documents are not proof of current
behaviour. Treat missing files as missing, not as already approved plans.

Identify the task ID, allowed scope and verification requirements. Preserve
unrelated human changes. Work on one bounded task at a time. Do not turn a
small task into a full application build.

## 3. Dependency installation belongs to the owner

Do not install or update dependencies. The owner runs `npm i`.
Do not run `npm install`, `npm ci`, `npm update`, `npm audit fix`, other package
managers' install commands, or generators using `npx`/`npm exec`.
Do not download browsers, Electron binaries or AI models yourself.
Do not hide installation in lifecycle scripts, test commands or helper scripts.
Read-only version/registry checks are allowed within the granted permissions.

Initial bootstrap may write a minimal package manifest with published version
pins and document compatibility assumptions. Do not invent package versions.
Later dependency, lockfile or toolchain changes require explicit approval.
Do not hand-write a lockfile or manufacture `node_modules`. Preserve the
owner-generated lockfile; review it before any authorized staging.

Run checks using already-installed tools when available. Otherwise report
NOT_RUN and the exact prerequisite. Do not describe missing dependencies as a
successful test-first red run.

## 4. Git: local commits only

Local commits are authorized for coherent, in-scope work. Every push belongs
to the owner. Never push, force-push, create a remote repository, change
remotes, publish packages/releases, merge pull requests or use an API/tool to
perform an equivalent remote write. Do not pull, rebase, reset, clean, amend or
rewrite history unless the owner explicitly authorizes that specific action.

Use the existing local repository. Initialize a local repository only when
bootstrap authorizes it and the current directory is not inside another repo.
Use configured Git identity; never invent it or change global Git settings.
If identity, permissions or hooks block a commit, keep the work and report why.
Never bypass hooks, signatures or sandbox restrictions to make a commit.

Before committing, inspect status and the staged diff. Stage named files or
specific hunks, not `git add .` or `git add -A`. Include only authorized work.
Do not commit secrets, runtime databases, screenshots, build outputs, logs with
private data, unrelated changes or accidental generated files.

Use meaningful messages:

    <type>(<scope>): <specific change> [<task-id>]

Examples:

    test(shell): propose sandbox and preload checks [DT-001]
    chore(desktop): scaffold Electron React shell [DT-001]
    fix(timer): exclude paused segments from elapsed time [DT-010]

Use the body to explain why and report validation, including NOT_RUN or FAIL.
Avoid messages such as "update", "changes" or "fix stuff". Commit code and
its corresponding memory update together. Test-design commits may be red;
bootstrap commits may be unverified, but must say so. Normal implementation
commits require the prescribed available checks; do not silently commit known
failures as completed work. Report resulting hashes. A commit is not approval.

## 5. Test-first workflow and approval boundary

TEST_DESIGN: derive new tests from the assigned requirements before feature
implementation. Write meaningful failure cases with expected results independent
of the production logic. Record their initial content and source baseline.
No initial owner approval, contract approval, candidate promotion or reviewer
sign-off is required to create new tests, implement ordinary assigned work or
complete a bounded task whose required checks pass.

IMPLEMENT: run the recorded tests, capture a genuine behavioural failure where
applicable, implement and verify. An existing reproducing regression can supply
red evidence; missing dependencies, broken imports and infrastructure errors
cannot. Do not fabricate a historical red run for an existing scaffold.

Once written, tests are existing tests, including tests created earlier in the
same task. Obtain explicit, scoped owner approval before edits, deletions, skips,
disabling, substantive moves/renames or replacements. Explain the precise proposed
revision and its coverage effect, then wait for approval of that change; continue
only independent work. A failure, passing run, general continue or silence is
not test-revision approval. Do not relabel created tests as unfinished drafts.

New independent tests need no approval when the assignment includes test writing;
prefer new files. Additive cases in an existing file are allowed only if existing
cases, execution, shared setup and expectations remain unchanged. Existing
fixtures, snapshots, mocks/helpers, discovery, filtering, thresholds, test commands,
runner settings, configuration and dependency resolution affecting existing test behaviour require
explicit approval before revision. Never neutralise old coverage or change a
requirement to fit the implementation. Record the actual scope/source of approval.

No `.skip`, `.only`, `.todo`, pass-with-no-tests, swallowed assertions,
unconditional passing tests, success-on-error commands, blanket snapshot
updates or test-specific production shortcuts. Mocks belong only at declared
boundaries; they cannot establish that real capture, storage or AI works.
Record any approved platform exclusion explicitly.

Policy files, approved specifications, approved tests, evaluators, CI controls
and approval records are owner-controlled after initial creation. Do not edit
this file, create overriding agent instructions, alter approval identities,
change Codex permissions or bypass checks without explicit owner authorization.

Markdown rules, candidate tests and locally editable checks are not independent
enforcement. DT-000 separately plans owner-controlled acceptance evaluation and
repository permissions outside the implementation agent's authority. Its absence
is not a completion gate for unrelated local development. Never report these
protections as active merely because configuration files exist, or bypass any
actually configured protections or mandatory checks.

### One-time bootstrap exception

When the owner explicitly requests BOOTSTRAP_ONLY, create repository structure,
build/lint/test configuration, proposed tests, compile-time interfaces and a
minimal secure static shell before dependency installation. This is scaffold
preparation, not verified feature implementation or proof of TDD. Do not build
the timer, persistence, capture, inference or sync behaviours under this
exception. Record scaffold-only evidence, actual task/check statuses and remaining
runtime/release checks as NOT_RUN where applicable; do not claim feature or native
verification. New-test approval is not an implementation prerequisite.

## 6. Architecture and security rules

Keep domain logic independent of React, Electron, HTTP, SQLite and OS APIs.
The renderer displays state; it is not the authoritative clock or data store.
Use narrow, typed preload methods; validate payloads and sender/frame identity
at privileged boundaries. Never expose raw IPC, filesystem, SQL or credentials.

Require context isolation, renderer sandboxing, disabled Node integration,
restricted navigation and a restrictive CSP. Keep capture, image processing,
SQL and inference out of the interface's critical path. Blocking SQL belongs
in the dedicated single-writer storage process, not Electron main.

Persist before reporting recording success. AI failure must not lose hours.
Unavailable adapters return explicit unavailable/not-implemented results,
never fabricated success. Do not display fake saved, synced or AI-ready states.

Capture only approved sources during explicitly enabled recording. Reject late
captures after pause, stop, source changes or consent revocation. Never silently
expand to another window/full screen or switch to a hosted AI service. Treat
screenshot text as untrusted data. Confirmed descriptions must not be overwritten
by later AI output. Keep secrets and raw staff evidence out of Git and memory.

## 7. Durable Markdown records

For every work session, including blocked or partial work:

- Append to `docs/memory/PROJECT_MEMORY.md`: timestamp, task ID, starting revision,
  initial recorded test baseline and any later revision approval, changes/files,
  decisions, commands,
  actual outcomes/exit codes, issue IDs, remaining work and next action.
- Update `docs/memory/CURRENT_STATE.md` and `docs/memory/TASKS.md` with the actual state and next step.
- Record encountered issues in `docs/memory/ISSUES.md`: symptom, reproduction, environment,
  failed attempts, known or suspected cause, solution, verification and status.
- Record architectural proposals in `docs/memory/DECISIONS.md`; distinguish proposed from
  approved. Preserve the evidence of any real owner approval.

Append corrections instead of erasing historical memory/issues. Current-state
summaries and task statuses may be updated normally. Distinguish anticipated
risks from reproduced bugs, and proposed fixes from verified solutions.
Never fabricate command output, approvals, issue resolution or test results.
Use the actual environment date. Avoid self-referential commit hashes: record
the starting revision in the entry and report the new hash after committing.

Task status is PLANNED, IN_PROGRESS, DONE or BLOCKED. Mark a bounded task DONE
when its assigned outcome is implemented, its required checks actually pass,
evidence is recorded and memory is updated. Local verification is legitimate
evidence of the checks it performs; label it local, not independent. No generic
human review, frozen reviewer-approved contract or external evaluator is needed
to complete ordinary development work.

Required checks come from the assignment and relevant regression coverage. Do not
drop checks, add exclusions or narrow assigned scope after a failure to get DONE.
Missing required evidence prevents completion. An already assigned bounded repair
can be DONE while its parent milestone is IN_PROGRESS; keep unrelated parent
failures and missing evidence visible. Do not invent a subtask to hide failure.

Use AWAITING_OWNER_APPROVAL only as a qualifier for a specific change requiring
owner authorization, such as an existing-test revision. Use AWAITING_REVIEW only
when a concrete review was explicitly assigned or required by an actually
configured control; neither is a generic task-completion queue. Preserve separate
policy/dependency, remote-operation and release/signing permissions. Native/model
checks remain mandatory in tasks that require them. Task DONE does not establish
production readiness, independent evaluation, packaging, signing or platform
verification. Do not start unassigned work after completing a task.

## 8. Required handoff

End with task/status, files changed, exact checks and PASS/FAIL/NOT_RUN results,
commits created, remaining blockers and the next owner action (None for completing
this task when no specific authorization is needed). Label each check PASS, FAIL
or NOT_RUN with its evidence/reason and scope. Distinguish
local candidate-suite evidence from independent/native acceptance evidence. State that nothing was pushed.
Do not claim Windows/macOS runtime behaviour, packaging, protection enforcement
or AI quality has been verified without the corresponding evidence.

## 9. Repository organisation

Keep AGENTS.md as the single root project-instructions file. Do not recreate
root-level memory or project-documentation files: memory belongs in
`docs/memory/` and general documentation in `docs/`. Do not retain task prompt
files unless the owner explicitly requests them. Build/tool files retain their
required or established locations.
Do not create nested AGENTS.md files, overrides or duplicate instructions.

Read and update the canonical memory files explicitly as instructed above;
Codex does not automatically load every Markdown file under docs/.
The documentation index is `docs/README.md`.
