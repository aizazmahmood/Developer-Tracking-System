# Bootstrap toolchain — metadata verified, execution pending

**Checked:** 2026-11-10 Asia/Karachi. Status: SCAFFOLDED_NOT_VERIFIED.

Build reference: **Node 22.19.0, npm 11.14.1**, inspected through the installed
Windows executables (both exit 0). Git is 2.43.0 and Python is 3.12.3 in the
Linux/WSL shell. Bare `node` is absent; bare `npm` reports WSL 1 unsupported.
Windows executable interop required sandbox escalation. Prefer native Windows
PowerShell for installation, checks, development and Windows packaging.

## Direct pins and evidence

Each exact manifest pin below matched a published npm registry JSON response.
`toolchain-metadata.json` retains selected metadata fields and exact source URLs.
It is a read-only metadata snapshot, **not a lockfile**, integrity audit,
installation, build result or independent acceptance artifact. No package
archives, binaries or models were downloaded. Latest endpoints selected most
pins; subsequent runs must use these explicit pins rather than select latest.

| Package | Pin | Declared Node engine |
|---|---|---|
| `@electron-forge/cli` | `8.0.1` | `>= 22.13.0` |
| `@electron-forge/maker-squirrel` | `8.0.1` | `>= 22.13.0` |
| `@electron-forge/maker-zip` | `8.0.1` | `>= 22.13.0` |
| `@electron-forge/plugin-webpack` | `8.0.1` | `>= 22.13.0` |
| `@eslint/js` | `9.39.1` | `^18.18.0 || ^20.9.0 || >=21.1.0` |
| `@testing-library/dom` | `10.4.2` | `>=18` |
| `@testing-library/jest-dom` | `7.0.1` | `>=22` |
| `@testing-library/react` | `16.3.3` | `>=18` |
| `@types/node` | `22.19.0` | `not declared` |
| `@types/react` | `19.3.0` | `not declared` |
| `@types/react-dom` | `19.3.0` | `not declared` |
| `css-loader` | `7.1.5` | `>= 18.12.0` |
| `electron` | `45.2.3` | `>= 22.12.0` |
| `electron-squirrel-startup` | `1.0.1` | `not declared` |
| `eslint` | `9.39.1` | `^18.18.0 || ^20.9.0 || >=21.1.0` |
| `eslint-plugin-react-hooks` | `7.1.1` | `>=18` |
| `globals` | `17.14.0` | `>=18` |
| `jsdom` | `26.1.0` | `>=18` |
| `mini-css-extract-plugin` | `2.10.2` | `>= 12.13.0` |
| `react` | `19.3.1` | `>=0.10.0` |
| `react-dom` | `19.3.1` | `not declared` |
| `ts-loader` | `9.6.2` | `>=12.0.0` |
| `typescript` | `5.9.3` | `>=14.17` |
| `typescript-eslint` | `8.72.2` | `^18.18.0 || ^20.9.0 || >=21.1.0` |
| `vite` | `8.3.7` | `^20.19.0 || >=22.12.0` |
| `vitest` | `5.1.0` | `^22.12.0 || ^24.0.0 || >=26.0.0` |
| `webpack` | `5.112.2` | `>=10.13.0` |

## Compatibility rationale and outstanding checks

- All Forge packages use 8.0.1; their build minimum is Node 22.13.0. Electron
  45.2.3 installer metadata requires Node 22.12.0. The inspected build Node
  satisfies these minima. Electron's embedded Node has not been inspected.
- Forge declares Webpack ^5.69.1; 5.112.2 satisfies it. The loaders and CSS
  extraction plugin declare compatible Webpack 5 peers. CSS is extracted to
  files so the shell CSP need not permit inline styles.
- React and React DOM are both 19.3.1; React types are both 19.3.0. Testing
  Library peers include React 19 and DOM Testing Library 10.
- TypeScript 5.9.3 remains within typescript-eslint's >=4.8.4 <6.1.0 range.
  ESLint and @eslint/js use matching 9.39.1 pins, within lint adapter/hooks peers.
- Vitest 5.1.0 declares Node ^22.12.0 / ^24 / >=26 and Vite ^6.4 / ^7 / ^8.
  Vite 8.3.7 declares Node ^20.19 / >=22.12. Build Node 22.19 satisfies both.
  Vite is only for tests; application bundling remains Webpack.
- jsdom 26.1.0 declares Node >=18. Latest jsdom 31.0.0 required ^22.22.2 /
  ^24.15 / >=26, so was not selected for build Node 22.19.0. No canvas or browser
  downloads are needed for the proposed component checks.
- npm 11.14.1 declares Node ^20.17 / >=22.9. Direct pins do not freeze transitive
  resolution. Review the owner-generated lockfile, npm peer/engine diagnostics
  and real installation/build results before claiming compatibility.

[Forge Webpack configuration](https://www.electronforge.io/config/plugins/webpack)
was checked for entry globals and sandboxed preload bundling. Tagged
[8.0.1 plugin source](https://github.com/electron/forge/blob/v8.0.1/packages/plugin/webpack/src/WebpackPlugin.ts)
requires `.webpack/main/index.cjs`; the manifest names that file explicitly.
The tagged [config generator](https://github.com/electron/forge/blob/v8.0.1/packages/plugin/webpack/src/WebpackConfig.ts)
was inspected for preload output and renderer URL generation. Main canonicalizes
the document URL before loading and checking IPC sender URLs. These are source
compatibility checks, not an executed Forge build.

[Electron sandbox guidance](https://www.electronjs.org/docs/latest/tutorial/sandbox)
and [security guidance](https://www.electronjs.org/docs/latest/tutorial/security)
informed the restrictions. Preload uses supported Electron bridge APIs and
bundled pure modules. Navigation, windows and permissions are configured to deny.
CSP forbids connections, frames, inline script and eval. Development serves files
on loopback with client/HMR/live reload disabled; restart for changes. Actual
CSP/sandbox enforcement is unverified. Production uses Forge's file URL output;
a reviewed custom-protocol migration and release fuse audit remain future work.

## Validation limits and later spike

No installation, peer resolution, TypeScript/lint/Vitest execution, runtime
launch, Windows installer, macOS compilation or signed artifact was verified.
Squirrel maker authors/description are provisional project metadata, not a
verified publisher identity. Signing and notarization are not configured.

DT-002 must choose/approve native SQLite pins, test Electron ABI rebuilds and
packaged utility-process paths, and verify database access in that runtime.
Host-Node success cannot establish Electron-native compatibility. Ollama/model
setup and real capture are also reserved for later approved tasks.
