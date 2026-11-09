# Existing scaffold checks

The directory name is historical, not an initial test-approval gate. Run these
existing suites with either `npm test` (default, also ordinary tests) or
`npm run test:candidates` (focused scaffold-only). Owner installation remains
required; Codex does not install dependencies. Both routes fail on zero matches.

The initial shell checks were prepared under BOOTSTRAP_ONLY. No historical
behavioural red run is retroactively claimed for that scaffold. Later matcher,
lint and discovery tasks record their own dated evidence. The 2026-11-10
DT-001-DISCOVERY run executes 43 scaffold cases in eight files through both
routes, plus two new ordinary cases through the default route. B10 has one
explicitly authorized revision; the other 42 cases remain unchanged. See
[discovery evidence](../docs/validation/DT-001-discovery.md) and the dated B10
addendum in [the bootstrap specification](../specs/DT-001-bootstrap.md).

Local unit/component/configuration checks are not independent acceptance.
Electron mocks establish boundary decisions, not actual sandbox/IPC/CSP/native
installation behaviour; real Electron and packaged Windows/macOS checks remain
required in their assigned tasks. No original approval metadata is erased.
