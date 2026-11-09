# Project Memory — Append-Only Work History

This file is the durable log of **all development tasks and work sessions**, including incomplete tasks. Append entries; correct earlier information with a dated superseding entry. Do not silently rewrite outcomes. CI artifacts and repository commits are the evidence; this log describes and indexes them.

## Index

| Entry | Task | Status | Summary |
|---|---|---|---|
| PLAN-000 | Planning handoff | DOCUMENTATION_ONLY | Architecture and workflow templates prepared; no application execution. |

## 2026-11-09 — PLAN-000 — Documentation-only handoff

**Author:** ChatGPT planning session, not a Codex implementation run.  
**Task:** Plan a Windows-first, macOS-ready Electron tracker with protected test-first development and Markdown history.  
**Outcome:** Planning files prepared. Implementation, tests, CI enforcement and platform validation are not performed.  
**Files:** Architecture, test policy, release plan, agent instructions, task backlog and record templates in this pack.  
**Tests:** NOT RUN — no executable application or test suite exists in this pack.  
**Issues encountered:** No application defect reproduced. Technical risks and proposed mitigations are documented, not claimed as solved.  
**Decision status:** User-selected constraints recorded separately from proposed implementation choices.  
**Next:** DT-000.

---

## Required entry format for future work

Use [the work-entry template](../../templates/WORK_ENTRY.md). Each entry must include task ID, author, timestamp, starting revision, approved contract revision, acceptance criteria, changed files, actual test commands and outcomes, issue/solution references, remaining gaps and next action. Link the resulting commit or PR from a later entry when it does not yet exist; never fabricate a self-referential commit SHA.

Preserve one task's attempts as separate entries. A later successful run does not erase earlier failures. When the file becomes large, keep this index and move historical entries into dated, version-controlled Markdown archives through a reviewed change; retain links and never discard history. `CURRENT_STATE.md` remains the small entry point.

## 2026-11-10T01:13:37+05:00 — BOOT-001 — DT-001

**Author/session:** Codex bootstrap session, owner-invoked file prompt.
**Status:** SCAFFOLDED_NOT_VERIFIED; DT-000 PENDING.
**Starting source revision:** NONE — supplied planning pack was not in a Git
repository. No parent repository found, including cross-filesystem discovery.
**Approved contract:** PENDING. specs/DT-001-bootstrap.md revision 0.1 is PROPOSED;
bootstrap authorization is the owner's request to execute CODEX_BOOTSTRAP_PROMPT.md.
**Acceptance scope:** B01–B12 proposed; static shell only under bootstrap exception.

**Changes/files:** Initialized local main. Added package.json (27 verified direct
pins), Forge/Webpack, TypeScript, ESLint and separate Vitest discovery configs;
.editorconfig/.gitignore; src/main, preload, renderer and pure metadata contract;
short reserved-directory READMEs. Wrote the proposed spec and six candidate files
before shell production files. Added docs/TOOLCHAIN.md, metadata JSON and owner
setup; updated README, CURRENT_STATE, TASKS; appended ISSUES and DECISIONS.
Preserved AGENTS.md, saved docs/ARCHITECTURE.md and docs/TEST_POLICY.md unchanged,
as well as supplied release plan, sources, future timer spec and templates.
No dependencies, lockfile, binaries, database, captures, model or server created.

**Reasoning/decisions:** D-017..019. Main exposes only read-only metadata to the
owning current main frame and exact canonical document URL with no arguments;
preload validates returned shape. Shell has explicit unavailable states and
disabled controls. Forge 8 tagged source review required explicit index.cjs;
Windows file URLs are normalized before loading/comparison. External CSS and
source-map bundling avoid inline/eval CSP allowances. Development client/HMR/live
reload disabled. Separate shared/renderer typecheck configs exclude Node globals.
No claim that configured restrictions have executed or supply independent authority.

### Actual verification

| Command / inspection | Environment | Actual exit/result |
|---|---|---|
| pwd; rg --files; cat required planning/policy/prompt/current records | workspace | 0; source pack inspected, architecture at docs/ARCHITECTURE.md |
| git status --short --branch; git log -5 --oneline; git rev-parse --show-toplevel (before init) | Git 2.43.0 | 128 each; no repository, not a behavioural test failure |
| env GIT_DISCOVERY_ACROSS_FILESYSTEM=1 git rev-parse --show-toplevel | workspace/ancestors | 128; no parent repository |
| git --version; python3 --version | shell | 0; 2.43.0 / 3.12.3 |
| node --version; npm --version | shell | 127 / 1; ISSUE-001 |
| Windows node.exe --version; cmd.exe /c npm --version | sandbox, then escalated | 1 / 1 first; 0 / 0 after authorized escalation: v22.19.0 / 11.14.1 |
| git init -b main | sandbox, then escalated | 1 read-only .git/info; then 0 initialized main |
| git symbolic-ref --short HEAD; git status --short --branch | after init | 0 / 0; unborn main, supplied/new files untracked before staging |
| git config --get remote.origin.url | local read-only | 1, no origin configured; no remotes changed |
| Python urllib registry JSON retrieval | sandbox, then escalated | 1 DNS failure; escalated batches 0; metadata only |
| official Forge/Electron docs and tagged Forge 8.0.1 source review | web read-only | inspected; some initial registry web opens inaccessible, recovered via urllib |
| python3 inline JSON/pin/layout/whitespace audit | workspace | 0; 5 JSON files parse, 27 pins match responses, 19 directories present; no node_modules/lockfile/approved tests; 6 candidate files, no skip/only/todo; fail-on-zero configured |
| node.exe --check forge.config.cjs; webpack.main.config.cjs; webpack.renderer.config.cjs; eslint.config.mjs | installed Windows Node, escalated read-only | 0 each, including after loader edits; syntax only |
| git check-ignore --stdin (11 generated/runtime/secret sample paths) | workspace | 0; all 11 ignored |
| git check-ignore package-lock.json | workspace | 1, expected: lockfile is NOT ignored |
| git diff --check (before staging) | no tracked baseline | 0; limited evidence because files were still untracked; staged review follows |
| git config --get user.name; git config --get user.email; git var GIT_AUTHOR_IDENT | inspected Git | 1 / 1 / 128; ISSUE-002 blocks local commits |
| npm run typecheck; npm run lint; npm run test:candidates; npm test | prerequisite absent | NOT_RUN — owner must run npm i; npm test then expected to fail on no approved tests |
| npm start; npm run package; npm run make | prerequisite absent | NOT_RUN — owner installation / native Windows GUI and maker prerequisites |
| Windows actual sandbox/CSP/IPC/installer checks; macOS compile/launch/package | native environments | NOT_RUN — no runtime/native harness execution |

**Red evidence:** NONE. Missing dependencies/infrastructure do not qualify.
**Green evidence:** NONE for candidate or acceptance behaviour. The PASS evidence
above is restricted to metadata, parsing, syntax and file inspection.
**Other attempt:** An apply_patch batch rejected duplicate operations on README;
no files changed by that failed batch. Reissued as a normal update successfully.
**Issues:** ISSUE-001 tool access WORKAROUND; ISSUE-002 Git identity OPEN;
ISSUE-003 installation prerequisite OPEN_SETUP. No runtime defect is fabricated.
**Independent review/gate:** PENDING; no owner approval, accepted tests, external
evaluator, branch protection or independent enforcement has been activated.
**Commits:** NONE — intended configured author absent; no inferred identity used.
**Remaining:** staged diff review; owner installation/checks, approval and native
runtime/packaging evidence. Commit separation is blocked by missing identity.
**Next owner action:** Configure intended Git identity; run npm i in native
Windows terminal, review lockfile and run README commands. Independently review
contract and establish DT-000 safeguards before later implementation. Stop here:
no timer, persistence, capture, AI, sync, tray or updater work. Nothing pushed.

## 2026-11-10T01:16:59+05:00 — BOOT-001 closing review — DT-001

**Starting revision:** NONE (unborn main); **contract:** r0.1 PROPOSED/PENDING.
**Status:** SCAFFOLDED_NOT_VERIFIED, not DONE. This entry supersedes the earlier
remaining staged-review item without replacing prior results.

Explicit `git add -- <64 named paths>` exited 0 using authorized escalation for
.git writes. `git diff --cached --stat`, staged source/config/candidate/doc diff
inspection and `git status --short --branch` exited 0: 64 files, all initial
additions on main. Python staged inventory/JSON audit exited 0: regular files,
no symlinks or generated/runtime/image/credential artifacts in the inventory.

`git diff --cached --check` first exited 2: supplied Markdown hard breaks and one
new EOF blank line. Removed the new blank line from src/renderer/global.d.ts.
Also corrected candidate malformed-response rows to preserve array/null values
as single test inputs. These candidate checks remain unapproved and NOT_RUN.
Updated ISSUE-004/current state/tasks and restaged the five named changed files.

The rerun of **full** `git diff --cached --check` exited **2 / FAIL** with exactly
42 diagnostics in original portions of eight supplied Markdown files: DECISIONS
(5), PROJECT_MEMORY (7), architecture (1), test policy (1), timer example (7),
ISSUE_ENTRY (3), TASK_SPEC (3), WORK_ENTRY (15). Preserved original formatting;
no check or Git whitespace setting was changed to turn this into a full pass.

The scoped command
`git diff --cached --check -- . ':!DECISIONS.md' ':!PROJECT_MEMORY.md' ':!docs/ARCHITECTURE.md' ':!docs/TEST_POLICY.md' ':!specs/DT-010-timer.md' ':!templates/ISSUE_ENTRY.md' ':!templates/TASK_SPEC.md' ':!templates/WORK_ENTRY.md'`
exited **0 / PASS** for the remaining scaffold files only. It does not supersede
the full-check failure. No candidate/approved tests, runtime or security checks
have executed; typecheck/lint/test/start/package/make remain NOT_RUN pending
owner installation and native validation.

**Commits:** NONE, ISSUE-002 absent intended Git author. All 64 initial files are
left staged for owner review; no push performed. ISSUE-001 workaround and
ISSUE-003 installation prerequisite persist. ISSUE-004 awaits the owner's
handling of existing Markdown hard breaks. No independent approval was given.
**Next owner action:** configure intended Git identity; run npm i in native
Windows terminal, review generated lockfile, run README checks (npm test must
currently fail on no approved tests), review contract and configure DT-000.
No feature work beyond the static scaffold is authorized by this bootstrap.

## 2026-11-10T01:46:53+05:00 — DOCS-001 — Canonical documentation layout

**Author/session:** Codex, owner-assigned documentation-only reorganisation.
**Status:** IMPLEMENTED_PENDING_REVIEW (no independent self-approval).
**Starting Git revision:** ed096d20b5bb7bb2b9c958adb182a2edf62854bd, branch main tracking origin/main.
**Assigned specification/authorization:** Owner asked to execute the revised
CODEX_BOOTSTRAP_PROMPT.md; its current bytes are preserved in
[docs/prompts/CODEX_BOOTSTRAP_PROMPT.md](../prompts/CODEX_BOOTSTRAP_PROMPT.md).
**Test-contract approval:** PENDING for application work; this task authorizes
only documentation moves, reference updates and limited AGENTS organisation.
**Starting changes:** Only the owner's revised prompt was modified. Existing
commit and package-lock/node_modules were observed, not created by this session.

### Path migration (paths relative to the repository root)

| Old path | New canonical path |
|---|---|
| CURRENT_STATE.md | docs/memory/CURRENT_STATE.md |
| PROJECT_MEMORY.md | docs/memory/PROJECT_MEMORY.md |
| ISSUES.md | docs/memory/ISSUES.md |
| DECISIONS.md | docs/memory/DECISIONS.md |
| TASKS.md | docs/memory/TASKS.md |
| README.md | docs/README.md |
| CODEX_BOOTSTRAP_PROMPT.md (owner's current content) | docs/prompts/CODEX_BOOTSTRAP_PROMPT.md |

The obsolete original bootstrap prompt was archived verbatim from the starting
commit into docs/prompts/archive/CODEX_BOOTSTRAP_PROMPT.bootstrap.md. It was not
executed. Historical old paths, captured commands, approval evidence and the
unchanged bootstrap spec describe the earlier layout. The old bootstrap spec's
prompt reference resolves to this archived original, not today's DOCS prompt.
The index migration map documents this distinction. No root copies remain.

**Files/active instructions changed:** Root AGENTS startup/logging paths and a
concise organisation section; docs/README index/relative links and repository-root
command context; architecture layout diagram; test-policy memory links only;
owner-setup links; template canonical-record links; five canonical memory records.
No rule about tests/approval/security/install/push was weakened. Only the two
active template links in memory preambles changed; dated history is retained.

### Checks defined before moving, and actual outcomes

A temporary Python standard-library verifier and baseline were written to /tmp
before the moves (not committed, not an acceptance evaluator). Checks cover
canonical files/no duplicates, original historical text preservation, protected
file hashes, prompt contents and local relative link targets. No checker installed.

| Command/check | Actual exit/result |
|---|---|
| git rev-parse --show-toplevel; git status --short --branch; git log -5 --oneline | 0 each; existing repo/main, starting revision above; only owner prompt dirty |
| Required AGENTS/architecture/policy/memory/prompt reads and rg reference discovery | Read and inspected actual files; no tooling dependency on moved paths found |
| rg DOCS task IDs excluding assigned prompt | 1, no existing DOCS task; used DOCS-001 |
| One rg query with a literal '*config*' filename | 2 (nonexistent literal path); corrected repository-wide excluded-generated-files scan exited 0 |
| Python preflight/baseline snapshot | 0; all 7 sources exist, no destination conflict, hashes of 65 tracked files captured |
| python3 -m py_compile /tmp/docs-001-verify.py | 0, syntax check for predefined temporary verifier |
| Seven explicit git mv calls | 0 each via authorized .git escalation; no branch/history/remote operation |
| python3 /tmp/docs-001-verify.py (scoped project discovery) | 0; canonical layout, retained histories/prompts, unchanged source/tests/config/lock/specs; 77 relative link targets passed before this entry |
| Python AGENTS preservation comparison | 0; existing text matches baseline after only allowed startup/path substitutions; new organisation section separately inspected |
| git diff --check | 0 / PASS |
| git diff HEAD --check | 0 / PASS against the actual starting commit |
| git diff HEAD --stat --find-renames | 0; documentation-only changes inspected; final staged rename review follows |
| git diff --name-only HEAD -- src tests test-candidates specs package.json package-lock.json .gitignore .editorconfig forge.config.cjs webpack.main.config.cjs webpack.renderer.config.cjs eslint.config.mjs tsconfig.json tsconfig.renderer.json tsconfig.shared.json vitest.config.mts vitest.candidates.config.mts | 0, empty: no application/protection/toolchain changes |
| git config --get user.name; git config --get user.email | 1 / 1, neither configured; ISSUE-002 still blocks committing |
| Application typecheck/lint/candidate/approved tests, launch and packaging | NOT_RUN — documentation-only task; no application behaviour changed |

An initial verifier invocation scanned installed third-party directories too
broadly; project discovery was limited to exclude node_modules/.git/build output
and the scoped verifier completed with exit 0. No production test/config was
changed to do this. Link checks validate target existence, not external URLs,
anchor semantics, application behaviour or independent enforcement.

**Issues/decisions:** Existing ISSUE-002 remains OPEN; ISSUE-003 presence
observation appended; ISSUE-004 old import whitespace evidence retained. No
move conflicts, protected tooling changes or new application defects found.
Owner-requested layout recorded as D-020; implementation review PENDING.
**Git/remaining work:** All work is local; requested commit blocked by absent
configured identity. Final staged review will be appended below. No hooks,
safeguards or history bypassed; no commit hash invented. No dependencies installed,
no remote changed, nothing pushed.
**Next:** Owner reviews DOCS-001 and configures intended Git identity for the local
commit. DT-000 stays pending; DT-001 remains SCAFFOLDED_NOT_VERIFIED. Stop after
this documentation task; no feature development or stored bootstrap execution.

### 2026-11-10T01:49:08+05:00 — DOCS-001 final review and identity correction

Starting revision remains ed096d2; status IMPLEMENTED_PENDING_REVIEW. Explicit
named-path staging exited 0. `git diff --cached --check`, `git diff --check`,
staged summary/stat with rename detection, and staged AGENTS/policy/layout/template
review all exited 0. The original bootstrap prompt is a 100% rename to the archive;
current owner prompt is preserved separately. Git displays CURRENT_STATE as a
removal/addition because its current summary was refreshed; the intended move
was performed with git mv, and prior historical memory is intact. The five memory
locations and documentation index have no duplicate root copies.

The updated temporary verifier exited 0 with 78 working relative link targets;
all protected/application file hashes matched the pre-move baseline. The original
unscoped verifier subsequently returned exit 1 at its instruction-file inventory
assertion after traversing installed third-party files. This was a verifier
scope error, not application/test failure or new project instructions. Its scoped
replacement excludes dependency/generated trees and passed. No repository tests
or configuration were edited to address it.

**Correction to commit blocker:** Linux Git's missing identity remains real.
The existing Windows Git executable was then found; its configured user.name
and user.email read-only queries each exited 0 using authorized escalation.
This supplies an already configured author for the requested local commit,
without inventing identity, changing settings or bypassing hooks/signatures.
ISSUE-002 has a Windows Git workaround; earlier blocked observations are retained
as session history. Final source/docs checks and this entry will be staged before
committing. Commit hash is reported in the handoff rather than self-referenced.
No dependencies installed, no remotes changed, nothing pushed. Owner review and
all earlier feature acceptance/runtime work remain pending.

## 2026-11-10T01:53:09+05:00 — DOCS-002 — Remove stored prompts

**Status:** IMPLEMENTED_PENDING_REVIEW. **Starting revision:** 923d9eaee51e9638f9cf3604a95ea9df198cf717.
**Authorization:** Owner explicitly requested removal of the prompt folder/files.
**Approved feature contract:** PENDING / not applicable to documentation cleanup;
no feature acceptance or independent review is implied.

Removed docs/prompts/CODEX_BOOTSTRAP_PROMPT.md and its archived bootstrap prompt,
then their empty directories. Updated AGENTS organisation guidance (only prompt
retention), docs/README links/migration note, architecture layout, current state
and task/decision/issue records. D-021 supersedes D-020's retention arrangement.
All earlier historical entries and specifications remain unchanged. Old prompt
links in those entries are historical evidence; recover contents from `923d9ea`
with Git rather than keeping duplicate files in the working tree.

**Checks:** Starting git status/log/reference inspection exited 0: clean main at
923d9ea before work. Python baseline and explicit-file removal/reference edits
exited 0. `git diff --check` exited 0 / PASS. The temporary standard-library
`python3 /tmp/docs-002-verify.py` exited 0 / PASS: folder absent, four append-only
history/task records retain their full previous prefixes, unrelated tracked files
(including all source/tests/specs/dependencies/build configuration) match baseline
hashes, and 62 active relative link targets exist. Historical prompt links were
intentionally excluded from active-link validation and documented. No link-checker
or dependencies installed. `git diff --stat` inspected: only requested prompt
removal, active references and memory records changed.

Application typecheck/lint/tests/launch/package NOT_RUN (documentation-only).
No new defects or blockers encountered; existing ISSUE-002 Windows Git workaround
is used for the authorized local commit. Final staged diff/whitespace review is
required before committing. No identity settings/hooks/security rules changed.
**Next:** Owner reviews cleanup; application acceptance remains pending. Nothing
pushed; no dependencies installed. Resulting commit hash is reported in handoff.

**Final staged verification:** Explicit named-file staging exited 0;
`git diff --cached --check` exited 0 / PASS; staged instruction/layout/index/
current-state diff reviewed. The final verifier rerun exited 0 with the same
62 active links and unchanged-file/history checks. Local commit is authorized;
no push will be performed.
