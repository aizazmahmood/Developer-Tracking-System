const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, use: {
        loader: 'ts-loader', options: {
          transpileOnly: true,
          compilerOptions: { noEmit: false, allowImportingTsExtensions: false },
        },
      } },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  plugins: [new MiniCssExtractPlugin()],
};
