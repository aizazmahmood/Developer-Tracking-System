# Technical Sources

Official project/provider documentation checked on 9 November 2026. The architecture and workflow are proposed engineering choices, not statements that the referenced projects provide the whole solution. Review current versions at bootstrap.

- **S1 — Electron Forge build plugins:** https://www.electronforge.io/config/plugins/webpack and https://www.electronforge.io/config/plugins/vite . The Vite plugin is marked experimental.
- **S2 — Electron native modules:** https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules . Native dependencies require Electron ABI compatibility/rebuilds; Forge integrates rebuild tooling.
- **S3 — better-sqlite3:** https://github.com/WiseLibs/better-sqlite3 . Candidate SQLite driver, not a claim of benchmark superiority for this app.
- **S4 — Ollama vision:** https://docs.ollama.com/capabilities/vision . Image input to compatible local models.
- **S5 — Ollama structured outputs:** https://docs.ollama.com/capabilities/structured-outputs . JSON schema output constraints, not factual guarantees.
- **S6 — Playwright Electron automation:** https://playwright.dev/docs/api/class-electron and https://www.electronjs.org/docs/latest/tutorial/automated-testing . Experimental Electron support; verify release-fuse/debugging limitations.
- **S7 — StrykerJS:** https://stryker-mutator.io/docs/stryker-js/introduction/ . JavaScript/TypeScript mutation testing.
- **S8 — Electron security and context isolation:** https://www.electronjs.org/docs/latest/tutorial/security and https://www.electronjs.org/docs/latest/tutorial/context-isolation . Sandbox, context isolation, IPC validation and narrow preload APIs.
- **S9 — Electron desktop capture:** https://www.electronjs.org/docs/latest/api/desktop-capturer . Main-process capture sources and platform-specific notes.
- **S10 — Electron power/lifecycle:** https://www.electronjs.org/docs/latest/api/power-monitor . Suspend/resume, lock/unlock and platform-specific shutdown support.
- **S11 — Electron utility processes:** https://www.electronjs.org/docs/latest/api/utility-process . Node-enabled child processes and message ports; minimal environment should be supplied by the app.
- **S12 — Electron secret storage:** https://www.electronjs.org/docs/latest/api/safe-storage . OS-specific storage semantics. Select the supported API for the pinned Electron version; do not treat this as database encryption.
- **S13 — Electron signing:** https://www.electronjs.org/docs/latest/tutorial/code-signing . Windows/macOS distribution and macOS notarization preparation.
- **S14 — GitHub code owners and branch protection:** https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners and https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches . Review requirements, base-branch ownership and protecting CODEOWNERS itself; plan/visibility limitations apply.
- **S15 — GitHub rulesets:** https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets . Required checks and expected GitHub App source; repository settings must actually be configured.
- **S16 — Codex AGENTS.md:** https://developers.openai.com/codex/guides/agents-md (currently redirects to https://learn.chatgpt.com/docs/agent-configuration/agents-md ). Recognized instructions, directory precedence and document-size limits. Other memory files in this pack are project conventions.
- **S17 — Codex workflow conventions:** https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex . Agent guidance and durable workflow/context files.
- **S18 — Vitest:** https://vitest.dev/guide/ . Unit-test tooling and compatibility requirements; pin the chosen version.
- **S19 — Electron Forge native-module unpacking:** https://www.electronforge.io/config/plugins/auto-unpack-natives . Package native dependencies correctly and verify the built artifact.
