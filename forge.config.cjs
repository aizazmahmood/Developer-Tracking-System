const path = require('node:path');

const developmentCsp = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self'",
  "connect-src 'none'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
].join('; ');

module.exports = {
  packagerConfig: {
    asar: true,
    executableName: 'desktop-tracker',
  },
  rebuildConfig: {},
  makers: [
    { name: '@electron-forge/maker-squirrel', platforms: ['win32'], config: {
      name: 'desktop_tracker',
      authors: 'Developer Work Tracker owner',
      description: 'Developer Work Tracker static shell',
    } },
    { name: '@electron-forge/maker-zip', platforms: ['darwin'], config: {} },
  ],
  plugins: [{
    name: '@electron-forge/plugin-webpack',
    config: {
      mainConfig: path.join(__dirname, 'webpack.main.config.cjs'),
      devContentSecurityPolicy: developmentCsp,
      devServer: {
        host: '127.0.0.1',
        hot: false,
        liveReload: false,
        client: false,
      },
      renderer: {
        config: path.join(__dirname, 'webpack.renderer.config.cjs'),
        nodeIntegration: false,
        entryPoints: [{
          name: 'main_window',
          html: path.join(__dirname, 'src/renderer/index.html'),
          js: path.join(__dirname, 'src/renderer/index.tsx'),
          preload: { js: path.join(__dirname, 'src/preload/index.ts') },
        }],
      },
    },
  }],
};
