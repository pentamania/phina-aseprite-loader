const webpack = require("webpack");
const path = require('path');
const pkg = require('./package.json');

const banner = `
${pkg.name} v${pkg.version}
${pkg.license} Licensed
Copyright (C) ${pkg.author}
`;

const entryFile = path.resolve(__dirname, 'src/index.js');
const distPath = path.resolve(__dirname, 'dist');
const isProduction = (process.env.NODE_ENV != null && process.env.NODE_ENV.trim() === "production");
const buildMode = (isProduction) ? 'production': 'development';
const filename = (isProduction) ? `${pkg.name}.min.js` : `${pkg.name}.js`;

module.exports = {
  mode: buildMode,
  entry: entryFile,
  output: {
    path: distPath,
    filename: filename,
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: banner,
    })
  ],
  devtool: (isProduction) ? false : 'inline-source-map', // 任意
  externals: {
    'phina.js': {
      commonjs: 'phina.js',
      commonjs2: 'phina.js',
      amd: 'phina.js',
      root: 'phina', // window(global)でのプロパティ名
    },
  },
};