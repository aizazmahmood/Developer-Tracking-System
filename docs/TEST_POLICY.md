# Protected Test-First Development Policy

**Status:** Owner-corrected test-first workflow, 2026-11-10; independent
infrastructure remains proposed, not configured.
**Goal:** Prevent implementation work from being accepted by weakening its tests, while still allowing legitimate, reviewed changes to requirements and tests.

## 1. What this does and does not guarantee

AGENTS.md expresses instructions; it is not access control. A same-account agent with administrator access can edit tests, change CI or bypass protection. Separate authority over requirements, test acceptance, evaluation and release. No test suite proves all behaviour correct, and another AI session with the same permissions is not automatically independent QA.

The owner assigns observable outcomes. Codex may write new tests and implement
against them without initial approval. Only changes to existing tests or existing
test behaviour require explicit, scoped owner approval. An initial recorded test
baseline records content; it is not an approval request. Separately established
release controls remain with the owner. Independent evaluation is not claimed
merely because initial test approval is unnecessary.

## 2. Two-stage workflow for each feature

### Stage A — TEST_DESIGN

Start from the assigned requirements: task ID, observable acceptance cases,
non-goals and edge cases. Write new tests first and record their initial version
and source baseline. Then run and implement against them without waiting for
owner approval, candidate promotion, contract approval or reviewer sign-off.

Run the existing baseline suite and the new tests on the recorded source baseline and permitted scaffolding. Existing regressions should pass. The new case must fail at the intended behavioural assertion. Import errors, missing dependencies, syntax errors, OS setup failures and a skipped test are not valid behavioural red evidence. For a new user-visible feature, a failure to find a specified UI control can be a meaningful red assertion after the application launches successfully.

Check the requirement-to-test mapping, independently expected results, fixture
origin, mock boundaries, negative cases and trivial/hardcoded implementations.
Record the initial tests, fixtures, snapshots, discovery, thresholds and source
revision. No owner approval is needed to establish this initial baseline. Once
written, the tests are existing tests; do not revise them to match implementation
or relabel them unfinished drafts. Local hashes document content but do not
establish independent protection.

Do not merge known-failing feature tests into the production branch just to
claim TDD. Keep the initial tests unchanged while implementing, retain genuine
red/green evidence and report incomplete validation honestly. No initial approval
step is required between test creation, running and implementation.

### Stage B — IMPLEMENT

Codex implements the assigned production change against the recorded initial
test baseline. Existing tests stay unchanged unless the owner explicitly approves
the precise revision. This includes tests just created in the same task. New
independent tests are allowed when assigned; prefer new files. Additive cases in
an existing file are allowed only if existing cases, execution, shared setup and
expectations remain unchanged. New coverage cannot replace or neutralise old coverage.

Request explicit, scoped approval before editing, deleting, skipping, disabling,
substantively moving/renaming or replacing existing tests. The same rule covers
existing fixtures, snapshots, mocks/helpers, discovery, thresholds, test commands,
configuration or dependency resolution that changes what existing tests check or
whether they run. Explain the precise proposal and coverage effect, wait for that
approval and continue only independent work. A failure, passing run, general
continue or silence does not authorize revision. Do not bypass failures through
production shortcuts solely for tests or harness changes.

Verification checks the exact candidate and test inventory, runs the unchanged
commands/harness, records meaningful baseline failure where applicable and verifies
the resulting implementation. Preserve red/green artifacts, source and initial
test baselines, any later approved revisions, environment, exit codes and test IDs.
Record actual independent evaluator results separately when such a service exists.

Refactoring is allowed while existing behaviour remains protected. Legitimate
revisions to existing tests require explicit owner approval; they are not forbidden
forever. Record the actual scope and source of each approval, and never change
requirements or expectations merely to make a failing implementation pass.

## 3. Enforcement outside the implementation agent

For a GitHub repository, configure required pull-request reviews, code-owner review, no force pushes and no agent bypass. Require review of the most recent applicable changes or dismiss stale approvals. Protect CODEOWNERS itself. Availability depends on repository visibility and account plan [S14, S15].

Recommended protected surface:

- Accepted specs/tests, fixtures, snapshots, AI evaluation datasets and model/prompt acceptance settings.
- Test runner configuration, discovery patterns, setup scripts, coverage/mutation thresholds and test helper code.
- CI/workflows, harness scripts, package scripts, dependency/lock files, bundler aliases, resolver hooks and environment settings that affect evaluation.
- Root/nested AGENTS files and overrides, policy documents, CODEOWNERS and release/signing configuration.

Codex may establish new tests without initial approval. Revisions to existing
tests or existing test behaviour require explicit owner approval; other protected
surfaces retain their separately applicable owner-controlled permissions. The implementation identity has no repository-admin, ruleset, signing, external-evaluator or check-reporting credentials.

The acceptance workflow is loaded from a trusted pinned revision or external evaluator repository, not replaced by the PR being judged. It fetches the frozen acceptance bundle independently. Reject unauthorized protected-path changes before executing the candidate. Detect additions, deletions, renames and symlink substitutions; do not inspect only ordinary edits.

Run untrusted candidate build/test code in disposable restricted workers with no production/signing secrets or writable controller state. Keep the controller's check-reporting credential outside the process executing candidate code. Do not use a privileged pull_request_target job to execute arbitrary PR code with secrets. Read-only files help but do not make an in-process JavaScript test harness a security sandbox; pair invariant tests with external process/black-box checks and code review.

GitHub can restrict a required check to a particular GitHub App [S15]. Prefer that for the authoritative evaluator result. Merely using the same check name in an editable workflow, or trusting any source, is insufficient. An ordinary CI file that can be replaced by the candidate must not be the final authority.

The trusted gate must explicitly fail on missing jobs, skipped mandatory suites, zero tests, changed inventory, missing reports, wrong candidate SHA, worker termination or incomplete results. Do not accept a green-looking PR status that never executed the required cases.

## 4. Minimum bootstrap versus stronger isolation

Independent enforcement infrastructure is a separately tracked improvement, not
an initial-test approval or implementation-start gate. Owner-enforced branch
rules, protected revisions and a trusted controller outside candidate-write
permissions can enforce the existing-test revision rule when configured. Record
their actual state; do not claim they are active or invent a substitute approval
step before implementing an assigned feature against newly written tests.

A read-only acceptance checkout, independent challenge cases and externally isolated black-box tests strengthen the design. Hidden tests can reduce overfitting but are not a substitute for sound specifications. Do not give a false guarantee that test tampering is impossible merely because a file hash or prompt exists.

When hosting permissions cannot support the proposed gate, record the limitation.
Do not call local checks independently enforced. Explicit approval for revisions
to existing tests remains required; initial creation and implementation need no
new review gate. Separately established release review requirements remain intact.

## 5. Test layers

| Layer | What is real | What may be controlled/faked | Main purpose |
|---|---|---|---|
| Domain unit/property | Timer/capture policies and invariants | Clock and port implementations | Exact duration, legal transitions, no overlap, no post-stop acceptance |
| Persistence integration | SQLite, migrations, transaction/restart behaviour | Remote API | Real durable writes, recovery, data compatibility and outbox atomicity |
| Renderer component | React components and user interactions | Validated application API | Visible state and accessibility-oriented flows |
| Desktop acceptance | Electron shell, IPC, process boundaries | Explicitly designated sample/model fixture provider | End-to-end session flow without volatile model wording |
| Native device validation | Actual capture, permission, lock/sleep/tray, installed app | Sanitized demo windows | Establish OS behaviour mocks cannot prove |
| AI evaluation | Pinned local model and real inference | Frozen public/synthetic inputs | Grounding, uncertainty, useful descriptions, unsupported completion claims |
| Performance/release | Packaged candidate on reference hardware | Defined workload fixture | Idle cost, latency, resource contention, installer/update behaviour |

Do not run native-driver integration only in host Node and assume Electron works. The native module may target a different ABI; test the actual packaged runtime and keep host/Electron rebuild outputs separate [S2].

Playwright's Electron support is experimental. Confirm version compatibility and release-hardening fuses during the bootstrap spike [S6]. Do not weaken production hardening just to enable an automation debugger. Where automated test builds need instrumentation, separately smoke-test the actual hardened release artifact and document the difference.

## 6. Required acceptance cases

- Start/Stop produces exact elapsed duration; pause time is excluded.
- Repeated Start/Stop commands and task switches cannot duplicate or overlap local intervals.
- System clock/timezone changes do not change elapsed time.
- Lock/suspend pauses by policy; wake/unlock does not silently restart capture.
- A second application instance does not create a second local recording authority.
- Crash recovery preserves committed progress and labels the unknown interval.
- Database/write failure does not falsely report a saved session.
- AI unavailability or malformed output never loses a time record.
- A capture result completing after pause/stop/revocation is rejected.
- Missing/denied source never falls back to full-screen or a different window.
- Duplicate sync delivery does not duplicate records; conflicts are visible.
- AI evidence IDs cannot refer to a different session or unauthorized sample.
- Confirmed descriptions cannot be overwritten by late AI output.
- Production packages do not silently use development/fake adapters.

Use a fake monotonic clock for domain tests; do not make the test suite wait real minutes. Real sleep/wake and permission tests remain separately required.

## 7. Testing the quality of the tests

Review expected answers independently of implementation. A test that calculates its expected duration with the same production function is not a useful oracle. Test invariants across generated event sequences, not just one happy path.

Mutation/negative-control checks deliberately break core behaviour: include paused time, suppress a write, accept a late capture, remove an idempotency check or overwrite a confirmed draft. The protected tests should fail. Stryker supports JavaScript/TypeScript mutation testing [S7]. Equivalent mutants require reviewer classification, not an automatic score downgrade.

Set coverage and mutation thresholds after defining the critical scope and independent baseline. Store them in the protected policy; Codex cannot lower them. Coverage is a secondary indicator, not proof of correctness. No mandatory test may disappear because of a changed filename, discovery glob, test filter or platform guard.

Mocks are allowed only at declared boundaries. A fake model is appropriate for deterministic queue/schema tests, not evidence that screenshot descriptions are accurate. Snapshot changes require review and actual inspection; no global accept-all update.

## 8. Nondeterministic AI tests

Use a frozen evaluation corpus of synthetic/public screenshots and hand-reviewed expected facts. Never place private staff screenshots in the repository. Record model digest, prompt/schema version, runtime, hardware and actual outputs. Evaluate factual support and missing-context handling rather than requiring an exact sentence.

Include irrelevant/blank images, incomplete errors, mixed tasks, hidden sensitive information, and prompt-injection text displayed in a screenshot. Require references to permitted evidence and disallow unsupported completed/fixed/tested claims. Have a reviewer assess sample descriptions; do not let the same model write its own ground truth and then certify itself.

Model/prompt changes rerun the corpus. Repeated-run variability and limitations are recorded. Schema-valid but invented content is a failure. Passing a small corpus does not establish universal accuracy.

## 9. Memory and task-completion gate

Every code task adds an append-only [PROJECT_MEMORY](memory/PROJECT_MEMORY.md) entry and updates [CURRENT_STATE](memory/CURRENT_STATE.md). New failures receive [ISSUES](memory/ISSUES.md) entries with reproduction, attempted approaches, root cause status, solution and regression evidence. The gate checks required fields and references, while the evaluator—not self-reported Markdown—establishes pass/fail.

Definition of DONE: recorded initial test baseline; meaningful red evidence where
applicable; verified green for required checks at the exact candidate; explicit
owner approval for any later revisions to existing tests/test behaviour; no
unapproved protection changes; required native/model evidence; memory/issues
updated; residual limits documented; any separately established release/acceptance
controls satisfied. Initial test approval is not a completion or implementation
prerequisite. Use NOT_RUN, BLOCKED or IMPLEMENTED_PENDING_REVIEW otherwise.

A session interrupted before completion still records its attempts and blockers. Nothing should disappear simply because an agent session ended.

## 10. Existing scaffold suites

The existing test-candidates/ directory and current discovery remain unchanged
until a separately authorized integration change. Their names do not create an
initial approval or candidate-promotion requirement. Empty ordinary discovery
must still fail. Changing existing discovery/configuration or test execution
requires explicit approval; writing genuinely new tests under a later assigned
test/feature task does not. DT-001-VERIFY writes or changes no executable tests.
