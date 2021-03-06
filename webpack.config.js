const path = require(`path`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `.jsx`, `json`],
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: true,
    port: 1337,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
      }, {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ]
  },
  devtool: `source-map`
};
