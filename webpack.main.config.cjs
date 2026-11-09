module.exports = {
  entry: './src/main/index.ts',
  devtool: 'source-map',
  module: {
    rules: [{ test: /\.tsx?$/, exclude: /node_modules/, use: {
      loader: 'ts-loader', options: {
        transpileOnly: true,
        compilerOptions: { noEmit: false, allowImportingTsExtensions: false },
      },
    } }],
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
};
