const path = require('path')
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: 'index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-canvas-map.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new PeerDepsExternalsPlugin(),
  ],
  resolve: {
    modules: [
      path.resolve('node_modules'),
      path.resolve('src'),
    ],
  },
}
