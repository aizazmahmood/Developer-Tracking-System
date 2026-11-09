# Protected Test-First Development Policy

**Status:** Proposed workflow, not configured infrastructure.  
**Goal:** Prevent implementation work from being accepted by weakening its tests, while still allowing legitimate, reviewed changes to requirements and tests.

## 1. What this does and does not guarantee

AGENTS.md expresses instructions; it is not access control. A same-account agent with administrator access can edit tests, change CI or bypass protection. Separate authority over requirements, test acceptance, evaluation and release. No test suite proves all behaviour correct, and another AI session with the same permissions is not automatically independent QA.

The owner approves observable outcomes. QA/owner approves the test contract. Codex implements against that contract. A trusted evaluator reports results for the exact candidate. The owner controls merge/release permissions.

## 2. Two-stage workflow for each feature

### Stage A — TEST_DESIGN

Start from an approved specification containing a task ID, observable acceptance cases, non-goals and proposed edge cases. The test-design agent may write tests and minimal interfaces/stubs needed to execute them, but not implement the feature.

Run the existing baseline suite and the new tests on the agreed baseline plus approved scaffolding. Existing regressions should pass. The new case must fail at the intended behavioural assertion. Import errors, missing dependencies, syntax errors, OS setup failures and a skipped test are not valid behavioural red evidence. For a new user-visible feature, a failure to find a specified UI control can be a meaningful red assertion after the application launches successfully.

The reviewer checks the specification-to-test mapping, expected results, fixture origin, mock boundaries, negative cases and tests that might pass for a trivial/hardcoded implementation. Freeze a test-contract revision: tests, fixtures, snapshots, discovery config, thresholds, baseline source revision and permitted scaffolding. Record a manifest/hash in an owner-controlled location.

Do not merge known-failing feature tests into the production branch just to claim TDD. Keep the reviewed contract on a dedicated branch or in a separate acceptance store until the implementation and contract can be merged together.

### Stage B — IMPLEMENT

Codex implements the production change from the approved contract. The reviewed tests are read-only in the implementation workspace where practical. All accepted suites remain unchanged relative to their approved revisions. Additional exploratory tests are permitted but do not replace accepted tests or excuse an acceptance failure.

The trusted evaluator validates the proposed changes against the frozen contract, not merely against the previous main-branch tree. Approved new tests are allowed; unapproved edits to existing or newly frozen tests are rejected. A blanket ban on all test diffs would prevent real test-first development and is not the design.

The evaluator checks the exact merge candidate, verifies test inventory, runs approved commands/harness, records expected failure on the baseline where applicable, then verifies the candidate's result. Preserve red and green artifacts, source and contract revisions, environment, exit codes and test IDs.

Refactoring is allowed while behaviour remains protected. Legitimate requirement/test corrections require a new owner-approved contract revision; they are not forbidden forever. The agent records the conflict and proposes the correction separately instead of silently changing expectations.

## 3. Enforcement outside the implementation agent

For a GitHub repository, configure required pull-request reviews, code-owner review, no force pushes and no agent bypass. Require review of the most recent applicable changes or dismiss stale approvals. Protect CODEOWNERS itself. Availability depends on repository visibility and account plan [S14, S15].

Recommended protected surface:

- Accepted specs/tests, fixtures, snapshots, AI evaluation datasets and model/prompt acceptance settings.
- Test runner configuration, discovery patterns, setup scripts, coverage/mutation thresholds and test helper code.
- CI/workflows, harness scripts, package scripts, dependency/lock files, bundler aliases, resolver hooks and environment settings that affect evaluation.
- Root/nested AGENTS files and overrides, policy documents, CODEOWNERS and release/signing configuration.

Codex may propose changes to these surfaces, but only an authorized reviewer can approve a new baseline. The implementation identity has no repository-admin, ruleset, signing, external-evaluator or check-reporting credentials.

The acceptance workflow is loaded from a trusted pinned revision or external evaluator repository, not replaced by the PR being judged. It fetches the frozen acceptance bundle independently. Reject unauthorized protected-path changes before executing the candidate. Detect additions, deletions, renames and symlink substitutions; do not inspect only ordinary edits.

Run untrusted candidate build/test code in disposable restricted workers with no production/signing secrets or writable controller state. Keep the controller's check-reporting credential outside the process executing candidate code. Do not use a privileged pull_request_target job to execute arbitrary PR code with secrets. Read-only files help but do not make an in-process JavaScript test harness a security sandbox; pair invariant tests with external process/black-box checks and code review.

GitHub can restrict a required check to a particular GitHub App [S15]. Prefer that for the authoritative evaluator result. Merely using the same check name in an editable workflow, or trusting any source, is insufficient. An ordinary CI file that can be replaced by the candidate must not be the final authority.

The trusted gate must explicitly fail on missing jobs, skipped mandatory suites, zero tests, changed inventory, missing reports, wrong candidate SHA, worker termination or incomplete results. Do not accept a green-looking PR status that never executed the required cases.

## 4. Minimum bootstrap versus stronger isolation

Before implementation: owner-enforced branch rules, protected policy/CI/test changes, reviewer-approved contract, and a trusted acceptance controller running outside candidate-write permissions. This is the baseline for the user's requirement.

A read-only acceptance checkout, independent challenge cases and externally isolated black-box tests strengthen the design. Hidden tests can reduce overfitting but are not a substitute for sound specifications. Do not give a false guarantee that test tampering is impossible merely because a file hash or prompt exists.

When hosting permissions cannot support the gate, record the limitation and require explicit human review of each candidate. Do not call that equivalent to enforced independent verification.

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

Every code task adds an append-only PROJECT_MEMORY entry and updates CURRENT_STATE. New failures receive ISSUE entries with reproduction, attempted approaches, root cause status, solution and regression evidence. The gate checks required fields and references, while the evaluator—not self-reported Markdown—establishes pass/fail.

Definition of DONE: approved acceptance contract; meaningful red evidence where applicable; verified green for required tests at the exact candidate; no unapproved protection changes; required native/model evidence; memory/issues updated; documented residual limits; independent reviewer approval. Use NOT_RUN, BLOCKED or IMPLEMENTED_PENDING_REVIEW otherwise.

A session interrupted before completion still records its attempts and blockers. Nothing should disappear simply because an agent session ended.
