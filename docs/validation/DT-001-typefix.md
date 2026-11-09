# DT-001 DOM matcher compatibility repair

## 2026-11-10T03:14:37+05:00 — DT-001-TYPEFIX

**Starting revision:** f23d78ef2beb2f51406362d20262bed38918bee1, main, initially clean; matches requested
f23d78e. **Bounded result:** LOCALLY_VERIFIED / IMPLEMENTED_PENDING_REVIEW.
**Overall DT-001:** NOT_VERIFIED; no independent acceptance or release claim.

### Authorization and exact change

Owner explicitly assigned the external DT-001-TYPEFIX task. That assignment
authorizes the exact existing-test setup delta below, a new adapter/declaration
and new independent regression checks. It grants no other test/config change.
The assignment stays outside the repository; no prompt folder was recreated.

```diff
-import '@testing-library/jest-dom/vitest';
+import '../tests/fixtures/register-dom-matchers';
```

This is the entire executable diff in the existing shell test. A byte comparison
requires the complete current file to equal baseline after that one replacement.
All existing cases, assertions, expectations, mocks, hooks and environments remain
identical; all other existing executable tests remain byte-identical.

Added files: tests/fixtures/register-dom-matchers.ts (real upstream expect.extend
registration); tests/fixtures/dom-matchers.d.ts (public typed augmentation);
tests/fixtures/dom-matchers.typecheck.ts (compile-time regression contract);
test-candidates/dom-matchers.candidate.test.ts (five independent jsdom checks).
The five canonical memory records and this report complete the in-scope changes.

### Reproduced cause and supported APIs

Installed public jest-dom/vitest declarations augment Assertion<T>, whereas
Vitest 5 declares Assertion<R,T>, so the existing import produces three TS2428
declaration-merge errors. The installed standalone ./matchers export exposes both
runtime matchers and the TestingLibraryMatchers<E,R> type; public Vitest Matchers
has R constrained to void | Promise<void> and a second received-value parameter T.
These installed files were inspected directly, without editing node_modules.

The adapter registers the genuine standalone matchers with actual Vitest expect.
The declaration extends upstream TestingLibraryMatchers<unknown,R>, retaining
the upstream acceptance of asymmetric expectation arguments without introducing
an assertion index signature. Its explicit toHaveClass property reuses the
upstream indexed overload type, including regex classes and exact options. The
augmentation matches Vitest's R/T signature and returns R for each matcher, so
sync calls return void and resolves calls return Promise<void>. The existing
compiler include covers all new fixture/type files with skipLibCheck still false.

The [Vitest 5 migration guide](https://vitest.dev/guide/migration/) and
[matcher extension API](https://vitest.dev/guide/extending-matchers) document
the current R/T interface and return distinction. The
[jest-dom standalone registration documentation](https://github.com/testing-library/jest-dom#with-another-jest-compatible-expect)
describes importing matchers and calling expect.extend. The
[jest-dom 7.0.1 Vitest declaration](https://github.com/testing-library/jest-dom/blob/v7.0.1/types/vitest.d.ts)
corresponds to the conflicting installed entry point. Local installed exports,
rather than assumed signatures from older examples, governed this repair.

The original integration is the reproduced failing approach. No failed alternative
repair iteration occurred; the new adapter/declarations passed on their first run.
TS2428 is static compatibility evidence, not an application-behaviour red run.

### Test-first record and preserved inventory

At 2026-11-10T03:10:06+05:00, new runtime and compile-time test contents were
recorded before adapter creation in PROJECT_MEMORY and an external /tmp snapshot.
The committed files retain those initial bytes. No revision was made to either
new test after recording. New runtime tests were NOT_RUN before the adapter existed;
no missing-import failure is claimed as behavioural evidence.

The new five runtime cases test enabled/disabled buttons, attached visible/hidden
elements, explicit throws for incorrect disabled and visible assertions (including
negation), awaited resolves/not and rejection of an incorrect async assertion.
Each uses synthetic DOM and afterEach cleanup; no upstream matcher mocks exist.
Compile-time assertions require exact void and Promise<void> return types, valid
attribute/class overloads and asymmetric accessibility arguments. Four documented
@ts-expect-error negative calls require rejection of a misspelling, disabled
argument, numeric attribute name and nonboolean exact option. These directives
appear only in deliberate negative tests; implementation uses no suppressions.

| Existing candidate file | Before cases | After cases |
|---|---:|---:|
| test-candidates/boundaries.candidate.test.ts | 1 | 1 |
| test-candidates/discovery.candidate.test.ts | 1 | 1 |
| test-candidates/metadata.candidate.test.ts | 3 | 3 |
| test-candidates/preload.candidate.test.ts | 11 | 11 |
| test-candidates/security.candidate.test.ts | 3 | 3 |
| test-candidates/shell.candidate.test.tsx | 3 | 3 |
| New dom-matchers.candidate.test.ts | — | 5 |
| Total | 22 (6 files) | 27 (7 files) |

Existing identity preservation follows the unchanged source bytes, not just equal
counts. The preload's eight malformed-metadata rows and its three other cases
remain intact. Zero cases were skipped; no only/todo or discovery change.
These remain candidate checks; they were not promoted to independent acceptance.

### Exact commands and outcomes

Environment: native Windows Node v22.19.0 (win32 x64), npm 11.14.1, TypeScript
5.9.3, Vitest 5.1.0, jest-dom 7.0.1; host Linux x86_64 kernel
6.6.87.2-microsoft-standard-WSL2. Existing configured Windows Git is used for
the local commit; identity/settings are unchanged. Commands below ran separately
from the workspace through the established WSL bridge, with installed tooling.

| Phase | Exact shell command | Exit | Result |
|---|---|---:|---|
| Before | /mnt/c/Windows/System32/cmd.exe /c npm run typecheck | 2 | FAIL: three TS2428 diagnostics |
| Before | /mnt/c/Windows/System32/cmd.exe /c npm run test:candidates | 0 | PASS: 6 files, 22 cases |
| After | /mnt/c/Windows/System32/cmd.exe /c npm run typecheck | 0 | PASS: aggregate plus compile-time regression checks |
| After | /mnt/c/Windows/System32/cmd.exe /c npm run test:candidates | 0 | PASS: 7 files, 27 cases, zero skips |
| After | /mnt/c/Windows/System32/cmd.exe /c npm run lint | 1 | FAIL: existing two CJS errors only, zero warnings |
| After | /mnt/c/Windows/System32/cmd.exe /c npm test | 1 | FAIL: zero ordinary test files |

The unchanged aggregate script invokes all three compiler commands in order:

```text
tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.shared.json && tsc --noEmit -p tsconfig.renderer.json
```

Its exit 0 establishes all three succeeded. New fixture declarations/type checks
are included by the unchanged root tsconfig; negative test directives are checked
for use. Existing compiler/library checks were not disabled or excluded.

Before typecheck output:

```text
> desktop-tracker@0.1.0 typecheck
> tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.shared.json && tsc --noEmit -p tsconfig.renderer.json

node_modules/@testing-library/jest-dom/types/vitest.d.ts(5,13): error TS2428: All declarations of 'Assertion' must have identical type parameters.
node_modules/vitest/dist/chunks/config.d.B3YV4t0O.d.ts(1755,11): error TS2428: All declarations of 'Assertion' must have identical type parameters.
node_modules/vitest/dist/chunks/task-utils.d.D-gFPNFi.d.ts(41,12): error TS2428: All declarations of 'Assertion' must have identical type parameters.
```

After candidate output:

```text
> desktop-tracker@0.1.0 test:candidates
> vitest run --config vitest.candidates.config.mts


 RUN  v5.1.0 E:/Aizaz/Projects/DeveloperTrackingSystem

 ✓ test-candidates/security.candidate.test.ts (3 tests) 34ms
 ✓ test-candidates/metadata.candidate.test.ts (3 tests) 34ms
 ✓ test-candidates/preload.candidate.test.ts (11 tests) 66ms
 ✓ test-candidates/discovery.candidate.test.ts (1 test) 16ms
 ✓ test-candidates/boundaries.candidate.test.ts (1 test) 128ms
 ✓ test-candidates/dom-matchers.candidate.test.ts (5 tests) 431ms
 ✓ test-candidates/shell.candidate.test.tsx (3 tests) 765ms
   ✓ B01–B03 static shell (PROPOSED) (3)
     ✓ shows honest unavailable states and disabled controls without a bridge 637ms

 Test Files  7 passed (7)
      Tests  27 passed (27)
   Start at  03:10:30
   Duration  9.71s (environment 50%, import 35%, tests 7%, transform 7%, worker 1%)
```

After lint output (unrepaired):

```text
> desktop-tracker@0.1.0 lint
> eslint . --max-warnings 0


E:\Aizaz\Projects\DeveloperTrackingSystem\forge.config.cjs
  1:14  error  A `require()` style import is forbidden  @typescript-eslint/no-require-imports

E:\Aizaz\Projects\DeveloperTrackingSystem\webpack.renderer.config.cjs
  1:30  error  A `require()` style import is forbidden  @typescript-eslint/no-require-imports

✖ 2 problems (2 errors, 0 warnings)
```

After ordinary test output (unrepaired):

```text
> desktop-tracker@0.1.0 test
> vitest run --config vitest.config.mts


 RUN  v5.1.0 E:/Aizaz/Projects/DeveloperTrackingSystem

No test files found, exiting with code 1

include: tests/unit/**/*.test.{ts,tsx}, tests/integration/**/*.test.{ts,tsx}, tests/acceptance/**/*.test.{ts,tsx}
exclude:  node_modules/**, .webpack/**, out/**, test-candidates/**
```

### Integrity comparison

SHA-256 baselines covered all 65 original tracked files before editing.
59 remain byte-identical. Six changed originals comprise only the authorized
shell import and five canonical memory documents. PROJECT_MEMORY/ISSUES/DECISIONS
retain their entire historical prefixes; TASKS retains prior sections after its
active summary, with a dated append. CURRENT_STATE is the updated active summary.
Source, manifest/owner-generated lockfile, configuration, policy, architecture,
specifications and other existing tests are unchanged. Hashes are local evidence,
not independently enforced protection.

Shell before SHA-256: `48cb1843fca90d60f0c376a2b075437883e18df7ddf457cdc56c8d232f92eb03`.
Shell after SHA-256: `717b6ccb02b2c8e8f831d03ea5c570edb9529d7d2ab5c4f279d568e27e885bf2`.

Initial/final new-test SHA-256 (identical):

| Test | SHA-256 |
|---|---|
| test-candidates/dom-matchers.candidate.test.ts | `99029883edac3a187e2ade529a7005518e9632902b2cccc3c85245ec1a167e7f` |
| tests/fixtures/dom-matchers.typecheck.ts | `db1f8e07ba77ce8ec52205e4b3f8c9c48c1e44ff2093e2508a7427fc1eae2d93` |

Protected original inventory (each baseline hash equals its final hash):

| Path | SHA-256 before = after |
|---|---|
| .editorconfig | `a6b98ea7cb6d61ed8d430dd0dffa46c87012b5cf859d4ce7207898954951fdcd` |
| .gitignore | `0406cd663145b477e6e9aca85c0f0c54079187389ff09a420e1a4728d9f8d8eb` |
| AGENTS.md | `d769761faa0e99154b1f35346e65f61eda5aa6a6e0c23fc4e0308ed81fc6ccd4` |
| docs/ARCHITECTURE.md | `5ec4cacfcff31406ec1c579ed8ea71d9df17d0f30fcf4989567b285851b6e665` |
| docs/OWNER_SETUP.md | `732eb4aba0ebe6b14ba9de466c9a44bf9a5e882d89fd83a84e3b0d74a8295025` |
| docs/README.md | `329e0b6b56180629477e751f41f18e71724e3cdee123b68d1cb870893a5c1018` |
| docs/RELEASE_PLAN.md | `7bcd22a4e791359b173750394fe710fb140d588b25fe99e846ae3ded34e1a62c` |
| docs/SOURCES.md | `1fa8b6274ece908b22f03f7c43a79961f40d21fd773e30f673ef277837d7b091` |
| docs/TEST_POLICY.md | `6dd044c97365a374fe548c29447cddb860f6f5ad3c7807feb3eb91717c02363a` |
| docs/TOOLCHAIN.md | `62ed5dd40aaff51981a14b38f3a49a1eee5d38513ba5f60da005a0a5ef143d2e` |
| docs/toolchain-metadata.json | `905bd374d2727cb7c687bdf76d738f2e2e3f04824c9fb8f100724141f406c6ea` |
| docs/validation/DT-001-baseline.md | `dfcaa551cf9c5d6285695a6ab130509763eac77846e70fa167d3b25edba9c130` |
| eslint.config.mjs | `20f054ebc847366e05280b34d68cbec6104bf0833dc5128747f94d3a668c564e` |
| forge.config.cjs | `9b497a36c6ab899db38e7da2849d293bec7cd65855b8b05f759897ec2a57771e` |
| package-lock.json | `0b0dee6050e403ff230e0b8d84799906bc9e44dcab731fbe713fadfbc04b7db8` |
| package.json | `845fbf581a7a02c99993e3222ea7be3aa778566205b8868e8ab17874bd5eaee5` |
| specs/DT-001-bootstrap.md | `d445efd62de38168335117321f2fe7bc033fa02ece6d5cc1ce06fbccc081ca05` |
| specs/DT-010-timer.md | `3227e5da7b06261b8c9b513fc2e4c52d5f1e2d4d65f147d432ce2be5392126aa` |
| src/adapters/README.md | `9224f105c59dcb5e382ad33865defb23dc91af26f8e4c4b1110dcbc09327201d` |
| src/application/README.md | `49a75d60073b1a73b138e343b00476aebd0201794fe5ff99a580a93fd4678fe2` |
| src/contracts/metadata.ts | `1d5c21a0305137f5ff62b92df6776304f55d273b30294d9fd71e2d2966a1fc40` |
| src/core/README.md | `aee288541f507abc9ba19ba9b7d6b5f2051c0cf6685b0d09221ad5942fb3fea5` |
| src/main/index.ts | `2a2b925882af0f45cee9c23178d33aad0965c3c41ea7b3afbd59d6caf92a029d` |
| src/main/metadata.ts | `25c8a12972e6084b942f4d7d01fd3f89bbbac21a299a115e6eb4b7f362746ffa` |
| src/main/security.ts | `ff14be4e9e2b8fbf09ad1e77baf2effa0647daa743a00d1228cda54320b84877` |
| src/main/squirrel.d.ts | `7a153067916811de8c311b9ed7471097220bee670cd4e90ed3f060a354c98353` |
| src/platform/macos/README.md | `46d50424f9e429882f735944b749b5a91311f6ecfedde988a0a214a6fcc2a994` |
| src/platform/windows/README.md | `eed8eaa4744ec9cdf8574ff37d11a19c7c38c013a963ed8ab9254bdfc37fc058` |
| src/preload/api.ts | `ff1cec3652c08af656ed143d98dc8323776156e528eafe71b75e838e7fbc71fb` |
| src/preload/index.ts | `76216593b32c227bf56a90f1a7bfb95a4136a1afe411c58f0e0fbc40bff4e3ab` |
| src/renderer/App.tsx | `9fa468848a4f638e8373abb4b85c4a92a5a8a5a16a68e7150c6736ab20ccaa68` |
| src/renderer/assets.d.ts | `da5bf71d48cf909584a01c80b445f730507068f5b34c920f352e2bfcf0315e4c` |
| src/renderer/global.d.ts | `2b5c661e1f68bd9c5dfe60810874f8a5d9df10b6ff30f8a9a53b69a1e2af33b1` |
| src/renderer/index.html | `d14d5e56ba46a1095436d08a99f0d38067de35b32b8d34e692602ac9b3947748` |
| src/renderer/index.tsx | `473e12d7223f68a1ff8590ba9c61d3259e276da8a0dc8d64c16429894eee088e` |
| src/renderer/styles.css | `1e9720e324204bd07d551391b10d4625cdf3f13450dc544c145cbbf2cd097559` |
| src/workers/analysis/README.md | `cc96d977f5bab556e6e91e8d7f342cef13010be9e1fc3ab21ab63682e6584a5c` |
| src/workers/storage/README.md | `a3af31144261fddc9d10b4a0389d1637e23da18eedff08357dfe2f0bf1d78bab` |
| templates/ISSUE_ENTRY.md | `52e8cb21ca9461f838ef89e342afd32436f0545097020beb749e01ddc8e8bd74` |
| templates/TASK_SPEC.md | `b821b8354557ece3ed7a98e45b48935eb8a7addf600c2b0a1e33ad6f489054f6` |
| templates/WORK_ENTRY.md | `8997ebf59d70b6f64cee922505cd95a0c45ad923d12e63855a5f682dc8baaeb9` |
| test-candidates/README.md | `44cc6753ef6f5634202cfe0b355630ffd9ba33476f85f0cc634d723bfdb4d7a4` |
| test-candidates/boundaries.candidate.test.ts | `0da87fe7337f9535ecd9ce006614a5d4e8414133beabdbc1ee25f197ed9f24aa` |
| test-candidates/discovery.candidate.test.ts | `c99a0490c025de961ea6cfe27b39ee5c4c94324fe49a733d4fca397fab0c715e` |
| test-candidates/metadata.candidate.test.ts | `361689597c6044f3c3508888138b6cbd03a4ab3835c4a9b771e63ad702869039` |
| test-candidates/preload.candidate.test.ts | `20e210fdfbd912c3dadf26cf844b9977165491cccfd127929969bbffe1a3b714` |
| test-candidates/security.candidate.test.ts | `54e43bed66cbaa6307c67d83e286b7c9a0015fa46afdfd3c912c8fea3498962a` |
| tests/acceptance/README.md | `bc39f5c6f5861df3ac152d7fbec6893ce76a1bda8b3ffdbcf9efb675521b8569` |
| tests/fixtures/README.md | `af80fb66abba9e68dd93c7b73d8fad58bb005a0178ac316ee6cb2708fd9a0d53` |
| tests/hardware/README.md | `7a4841520ace5b5d173a7cd784f2d4b35bdbf3c5cef8d1c9ed18000ebd2b7b0a` |
| tests/integration/README.md | `189f3c9ec242780ec6c367cb155d4bff2786f3d5bb698f02151199a1c5d29ca3` |
| tests/unit/README.md | `84232c4c41c09469d7fd0bc3ca5f28481de1f22f9ed52c071ce0c77ebd449707` |
| tsconfig.json | `2997f86f15f61eedbee763972ac5cbb4bc939a91dd43d48a91cde4f41abcfa84` |
| tsconfig.renderer.json | `535fe3bd783d60001741a86c6155fba63c0aba674156195e1abd7a3694b8488a` |
| tsconfig.shared.json | `6493377aed09409b8624a1c0e7a5f72cce6a53b197d845a5c1cf12723202b2f5` |
| vitest.candidates.config.mts | `d0b1fde9bc414abf252d3666d3cbf97101bfa82cd0157246c738823b4d44178c` |
| vitest.config.mts | `8f8aa21be79bb1b983daf2953ac351721124141326e019c16d2c021d137fb1e5` |
| webpack.main.config.cjs | `a2eaf3c38b61b68da26ce8d761de321b1cc2222fe191ca0571bad049f8a6f994` |
| webpack.renderer.config.cjs | `78889bff113f77f29ec49d26feb2a83bd0eb72a7fd31897598fe9f0550dc28d0` |

### Remaining work and handoff

ISSUE-005 is locally verified for this bounded repair. ISSUE-006 remains open:
lint fails in forge.config.cjs:1:14 and webpack.renderer.config.cjs:1:30 under
@typescript-eslint/no-require-imports. ISSUE-007 remains open: ordinary discovery
contains zero tests and correctly fails; candidate success does not make it pass.
No changes or waivers to those controls were made. DT-001 is not DONE.

App launch, package/make/installer, macOS, actual native security enforcement
and AI checks are NOT_RUN / OUT_OF_SCOPE for this repair. Prior baseline runtime
evidence remains separate. No new external enforcement or release claim is made.

Owner next reviews this local repair and can separately authorize the precise
bounded CJS lint-config revision; discovery integration needs separate existing
test/configuration authorization. Do not start either or feature work here.
No dependencies installed, binaries/models downloaded, prompts stored, remotes
changed or changes pushed. Local commit hash/message are supplied in the handoff
after staged scope and whitespace inspection; this report records starting HEAD.
