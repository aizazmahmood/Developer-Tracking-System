Organise this repository’s documentation and persistent memory without changing
application behaviour.

TASK
Use DOCS-001, or the next unused DOCS task ID if DOCS-001 already exists.

Read the current root AGENTS.md, architecture, current state, task list and
relevant memory before making changes. Inspect the actual repository; do not
assume every file from the original planning pack exists.

This is a documentation-only task. Do not continue into feature development.

OWNER AUTHORIZATION

I explicitly authorize:
- Moving project documentation and memory files into the folders below.
- Updating documentation links and active instructions to the new locations.
- Updating AGENTS.md only as needed for this organisation and its read/write
  paths.
- Recording this task and creating a meaningful local commit.

This does NOT authorize weakening any rule about tests, approvals, security,
dependency installation, Git permissions or independent verification.

I will install dependencies and push changes myself. Do neither.

1. INSPECT BEFORE CHANGING ANYTHING

Identify the repository root, current branch, Git status, existing documentation
and references to the files being moved.

Preserve unrelated changes and existing history. Do not initialise another
repository, change remotes, switch branches, reset, clean or rewrite commits.

Check whether tests, package scripts, CI, approval rules or other tooling depend
on a document’s current location. Do not silently break those dependencies or
weaken their protections.

If an affected move needs a protected configuration or test change, leave that
specific move pending and report the dependency. Complete independent safe
moves instead.

2. USE THIS DOCUMENTATION LAYOUT

Keep root AGENTS.md as the single root project-instructions file.

Use:

AGENTS.md

docs/
  README.md
  ARCHITECTURE.md
  TEST_POLICY.md
  RELEASE_PLAN.md
  SOURCES.md
  TOOLCHAIN.md
  OWNER_SETUP.md

  memory/
    CURRENT_STATE.md
    PROJECT_MEMORY.md
    ISSUES.md
    DECISIONS.md
    TASKS.md

  prompts/
    CODEX_BOOTSTRAP_PROMPT.md

This is a destination map, not a requirement to invent missing documents.

Move existing root files as follows:

CURRENT_STATE.md  -> docs/memory/CURRENT_STATE.md
PROJECT_MEMORY.md -> docs/memory/PROJECT_MEMORY.md
ISSUES.md         -> docs/memory/ISSUES.md
DECISIONS.md      -> docs/memory/DECISIONS.md
TASKS.md          -> docs/memory/TASKS.md
README.md        -> docs/README.md

Move existing prompt documents into docs/prompts/.
Do not execute any stored prompt during this task.

Leave existing architecture, policy and other documentation already in docs/
there unless a specific move above requires otherwise.

Existing source, tests, specifications and templates are already in dedicated
folders. Leave their directory structures unchanged:
src/, tests/, test-candidates/, specs/, templates/, and similar existing folders.

Leave package.json, package-lock.json, build/lint/test configuration, dotfiles,
.github/, assets and other tool-related files in their existing locations.
Do not restructure the build just to make the root visually empty.

For additional loose root documentation, choose a clear destination under
docs/ after checking its purpose and references. Do not relocate files that
need their current paths without reporting the dependency.

3. PRESERVE CONTENT AND AVOID DUPLICATES

Move files rather than copying them and leaving two active versions.
Use Git-aware moves for tracked files where appropriate.

Do not overwrite a destination that already contains different content.
Compare conflicting versions and report the conflict instead of silently
choosing, merging or deleting one.

Do not summarise, truncate or rewrite historical memory entries.
Preserve unresolved issues, failed attempts, previous verification results,
existing task statuses and approval evidence.

Do not mark earlier work completed because its files have been reorganised.

Do not fabricate missing history or create empty files just to match the layout.
For genuinely missing required memory files, create clearly labelled initial
records explaining that previous history was not available.

When an obsolete prompt is already present, preserve it under
docs/prompts/archive/ and identify it as historical in the documentation index.
Do not treat it as current instructions.

4. UPDATE AGENTS.md AND ACTIVE REFERENCES

Update AGENTS.md in place. Do not replace it with a shortened version.

Preserve every existing rule about:
- Test-first development and independent approval.
- Protected tests, fixtures and test configuration.
- Meaningful local commits.
- Owner-only dependency installation and pushes.
- Security, privacy and truthful verification.
- Append-only historical records.

Update its startup instructions to read:

- AGENTS.md
- docs/ARCHITECTURE.md
- docs/memory/CURRENT_STATE.md
- docs/memory/TASKS.md
- docs/TEST_POLICY.md
- The assigned task specification.
- Relevant entries in docs/memory/PROJECT_MEMORY.md,
  docs/memory/ISSUES.md and docs/memory/DECISIONS.md.

Update its logging instructions to write to those same canonical memory paths.

Add a concise repository-organisation rule:
- Do not recreate root-level memory or project-documentation files.
- Memory belongs in docs/memory/.
- General project documentation belongs in docs/.
- Stored prompts belong in docs/prompts/.
- AGENTS.md stays at the repository root.
- Build/tool files keep their required or established locations.

State explicitly that the memory files must be read and updated as instructed;
do not assume Codex automatically loads every Markdown file under docs/.

Do not create nested AGENTS.md files, override files or duplicate instructions.

Fix links and path references in active documentation and templates, respecting
each document’s relative location. Keep commands intended to run from the
repository root correct.

Do not perform a blanket search-and-replace inside historical memory, captured
command output, immutable approval records or frozen test specifications.
Historical paths may remain as evidence of the earlier layout. Append a
migration note mapping old paths to new paths instead.

Do not change approved tests, snapshots, acceptance expectations, runner
configuration or CI to make this cleanup appear successful.

5. MAKE docs/README.md THE DOCUMENTATION INDEX

Preserve the useful content of the existing README when moving it.

Add a concise index pointing to:
- Architecture.
- Test policy.
- Current state and task list.
- Work history.
- Issues and solutions.
- Decisions.
- Existing toolchain, release and owner-setup documentation.
- Existing specifications, templates and current prompts.

Use working relative links. List only documents that actually exist.
Avoid duplicating the complete contents of other documents.

6. VERIFY THE REORGANISATION

Define the checks before moving files, then verify the result.

Check that:
- AGENTS.md is the only loose root project-documentation Markdown file,
  except for explicitly reported dependencies or conflicts.
- The memory files have one canonical active location in docs/memory/.
- Root copies have not been left behind.
- Existing historical entries and unresolved issues remain intact.
- Active instructions and local documentation links use the correct paths.
- Historical old-path references are documented, not mistaken for active paths.
- No source code, dependencies, approved tests, build configuration or
  security/approval rules changed.
- The Git diff contains only the authorised moves, path updates, documentation
  index and task/memory records.

Use available dependency-free checks and inspect the Git rename diff.
Run git diff --check.

Do not install a link checker or any other dependency.
Do not invent passing checks or claim that file inspection proves the
application works.

If existing local tooling is used, record the exact commands and outcomes.
Any check that cannot run must be reported as NOT_RUN with its reason.
Do not change an existing failing test or configuration during this task.

7. RECORD THE TASK IN THE NEW MEMORY LOCATION

Append a work entry in docs/memory/PROJECT_MEMORY.md containing:
- Actual timestamp and task ID.
- Starting Git revision.
- Old-to-new path mapping.
- Changes to active instructions.
- Checks performed and their actual results.
- Conflicts, blockers or unresolved references.
- Next action.

Update docs/memory/CURRENT_STATE.md and docs/memory/TASKS.md.

Record actual problems and solutions in docs/memory/ISSUES.md.
Record the owner-requested canonical layout in docs/memory/DECISIONS.md.

Do not invent issues just to populate the files.
Preserve all previous entries.

Use IMPLEMENTED_PENDING_REVIEW when the migration is complete but awaiting
owner review. Use BLOCKED or a clear partial status where necessary.
Do not self-approve independent acceptance.

8. COMMIT LOCALLY AND STOP

Inspect the final diff and stage only explicit in-scope paths.
Do not use git add . or git add -A.
Do not include unrelated user changes.

Create one coherent local commit, for example:

docs(repo): organise project documentation and memory [DOCS-001]

Use the actual task ID. In the commit body, explain the layout change and
report validation honestly.

Do not invent Git identity, bypass hooks, amend earlier commits or push.
If committing is blocked, preserve the changes and explain the blocker.

FINAL RESPONSE

Report:
- The resulting folder structure.
- Files moved and important references updated.
- Checks with PASS, FAIL or NOT_RUN.
- Any remaining root documentation and why it was retained.
- The commit hash and message, or the reason no commit was created.
- Any owner action still required.

Explicitly confirm that no dependencies were installed and nothing was pushed.

Stop after this documentation task.