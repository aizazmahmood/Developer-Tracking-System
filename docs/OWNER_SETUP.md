# Owner setup — DT-000 remains pending

**2026-11-10: NOT_CONFIGURED; acceptance approval PENDING.** This document is an
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
4. Run the README checks and review every result. Empty approved-suite discovery
   must be a failure. Resolve dependency/build failures explicitly; they are
   not behavioural red evidence. Record Windows launch/package results and
   separate macOS results. An unsigned ZIP/installer is not release approval.
5. Review `specs/DT-001-bootstrap.md` revision 0.1 and each candidate test. Choose
   additional independent cases and a real Electron/native harness. Freeze
   contract, fixtures, discovery, toolchain, baseline and allowed scaffolding
   outside the implementation identity's control. Record reviewer identity/date,
   hashes and real approval evidence there.
6. Establish repository permissions and a trusted acceptance controller outside
   candidate-write authority. Protect accepted tests/specs, policies, discovery,
   dependencies, evaluators and CI configuration. Run candidate code in restricted
   disposable workers, without signing/production/reporting credentials. Verify
   exact candidate SHA and inventory; fail on missing/skipped/zero suites or
   incomplete results. Exercise rejection of an unauthorized protected-path
   change. Local Markdown and agent-editable hashes cannot supply this authority.
7. If hosting is chosen, configure reviews/rules under the owner's account.
   Nothing here creates remotes, CI workflows, CODEOWNERS, host controls or an
   authoritative check. Where enforced separation is unavailable, record that
   limitation and require human review; do not claim equivalent enforcement.
8. Approve the next bounded task and contract. DT-002 is the native packaging
   spike; future timer work remains DT-010 TEST_DESIGN before implementation.

Preserve successful/failed runs with exact source/contract revision, commands,
environment, outcomes and artifact identity. Candidate checks are review aids,
not independent acceptance. DT-001 cannot be DONE until required native/platform
evidence and independent approval exist. See `TEST_POLICY.md`.
