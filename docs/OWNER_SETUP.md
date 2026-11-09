# Owner setup — DT-000 infrastructure planning

**2026-11-10: DT-000 is PLANNED; independent infrastructure NOT_CONFIGURED.
New tests, implementation and verified ordinary task completion need no generic
review checkpoint.** This document is an
action list, not a record that safeguards have been activated. The bootstrap
exception authorizes only an unverified static scaffold.

1. Identify the owner, supported Windows/macOS matrix and reference devices.
   Assign a QA reviewer only for a concrete task that requires review. Review architecture defaults and decisions; no new
   technical approval is inferred from invoking the bootstrap prompt.
2. If the selected Git lacks an identity, configure it yourself before committing;
   the agent must not invent one. The prior validation found existing configured
   Windows Git usable through WSL while Linux Git was unconfigured. No identity
   change is required merely to complete an ordinary task. Local initialization
   does not create a remote.
3. Run `npm i` yourself with the documented build tool versions. Review generated
   `package-lock.json`, install output and lifecycle downloads. The agent has
   not installed packages, created a lockfile or downloaded Electron/models.
4. Run the [documentation-index checks](README.md) and review every result. Empty ordinary-suite discovery
   must be a failure. Resolve dependency/build failures explicitly; they are
   not behavioural red evidence. Record Windows launch/package results and
   separate macOS results. An unsigned ZIP/installer is not release approval.
5. Record initial test baselines and source revisions. Codex may write new tests
   and implement against them immediately when assigned; no initial review,
   approval or candidate promotion is required. Codex may mark the bounded task
   DONE after its outcome and required checks pass with recorded evidence and
   updated memory. Local verification is legitimate for its stated scope.
   Existing-test revisions, including tests written earlier in the same task, require
   explicit, scoped owner approval. Retain all native/release evidence required
   by the assigned task; an initial baseline is content recording,
   not owner sign-off. Do not drop required checks or add exclusions after failure.
6. Establish repository permissions and a trusted acceptance controller outside
   candidate-write authority as a separately tracked improvement, not a gate
   before implementing or completing unrelated local work. Protect accepted tests/specs, policies, discovery,
   dependencies, evaluators and CI configuration. Run candidate code in restricted
   disposable workers, without signing/production/reporting credentials. Verify
   exact candidate SHA and inventory; fail on missing/skipped/zero suites or
   incomplete results. Exercise rejection of an unauthorized protected-path
   change. Local Markdown and agent-editable hashes cannot supply this authority.
7. If hosting is chosen, configure reviews/rules under the owner's account.
   Nothing here creates remotes, CI workflows, CODEOWNERS, host controls or an
   authoritative check. Where enforced separation is unavailable, record that
   limitation; do not claim equivalent enforcement or create a replacement
   initial-test or task-completion review gate. Obey actually configured rules
   and mandatory checks. Separate release/signing controls remain intact.
8. Assign the next bounded task; new-test creation and implementation need no
   initial contract approval or a generic completion review. Currently the next
   technical work is ISSUE-006 lint and ISSUE-007 ordinary discovery repair, each
   requiring its own exact protected-surface authorization before revision.
   DT-002 is the later native packaging spike; timer work remains DT-010 with
   new tests designed and recorded before implementation. Completion does not
   authorize starting these unassigned tasks.

Preserve successful/failed runs with exact source/contract revision, commands,
environment, outcomes and artifact identity. Candidate checks supply local
evidence, not independent acceptance. DT-001-TYPEFIX is DONE based on its prior
local evidence at cbc55c4; DT-001 is IN_PROGRESS, partially verified. Its lint,
ordinary discovery, packaging/installation and required native/platform gaps
remain visible in [current state](memory/CURRENT_STATE.md). Native/model checks
and configured release controls remain mandatory in tasks that require them.
Task DONE does not establish production readiness or release/platform validation.
Use PLANNED, IN_PROGRESS, DONE or BLOCKED for tasks and PASS, FAIL or NOT_RUN for
checks. Owner action is None for completing this task unless a specific permission
is genuinely needed. AWAITING_OWNER_APPROVAL is only a qualifier for such a need;
AWAITING_REVIEW applies only to explicitly assigned or configured review.
See [TEST_POLICY.md](TEST_POLICY.md).
