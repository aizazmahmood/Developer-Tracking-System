# Owner setup — DT-000 remains pending

**2026-11-10: Independent infrastructure NOT_CONFIGURED; no initial approval
is required for new tests.** This document is an
action list, not a record that safeguards have been activated. The bootstrap
exception authorizes only an unverified static scaffold.

1. Choose the human owner/QA reviewer, supported Windows/macOS matrix and
   reference devices. Review architecture defaults and decisions; no new
   technical approval is inferred from invoking the bootstrap prompt.
2. Configure your intended local Git identity yourself before a commit can be
   made. The inspected Git has neither user.name nor user.email. The agent must
   not invent them. Local initialization does not create a remote.
3. Run `npm i` yourself with the documented build tool versions. Review generated
   `package-lock.json`, install output and lifecycle downloads. The agent has
   not installed packages, created a lockfile or downloaded Electron/models.
4. Run the [documentation-index checks](README.md) and review every result. Empty ordinary-suite discovery
   must be a failure. Resolve dependency/build failures explicitly; they are
   not behavioural red evidence. Record Windows launch/package results and
   separate macOS results. An unsigned ZIP/installer is not release approval.
5. Record initial test baselines and source revisions. Codex may write new tests
   and implement against them immediately when assigned; no initial review,
   approval or candidate promotion is required. Existing-test revisions require
   explicit, scoped owner approval. Choose any additional native/release evidence
   separately; an initial baseline is content recording, not owner sign-off.
6. Establish repository permissions and a trusted acceptance controller outside
   candidate-write authority as a separately tracked improvement, not a gate
   before implementing an assigned feature against new tests. Protect accepted tests/specs, policies, discovery,
   dependencies, evaluators and CI configuration. Run candidate code in restricted
   disposable workers, without signing/production/reporting credentials. Verify
   exact candidate SHA and inventory; fail on missing/skipped/zero suites or
   incomplete results. Exercise rejection of an unauthorized protected-path
   change. Local Markdown and agent-editable hashes cannot supply this authority.
7. If hosting is chosen, configure reviews/rules under the owner's account.
   Nothing here creates remotes, CI workflows, CODEOWNERS, host controls or an
   authoritative check. Where enforced separation is unavailable, record that
   limitation; do not claim equivalent enforcement or create a replacement
   initial-test review gate. Separately established release controls remain intact.
8. Assign the next bounded task; new-test creation and implementation need no
   initial contract approval. DT-002 is the native packaging
   spike; future timer work remains DT-010 TEST_DESIGN before implementation.

Preserve successful/failed runs with exact source/contract revision, commands,
environment, outcomes and artifact identity. Candidate checks are review aids,
not independent acceptance. DT-001 cannot be DONE until required native/platform
evidence and any separately established release/acceptance controls are satisfied. See [TEST_POLICY.md](TEST_POLICY.md).
