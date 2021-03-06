// @ts-ignore
export default {
  name: "webpack+ts+react",
  version: "1.0.0",
  private: true,
  description: "",
  main: "index.js",
  scripts: {
    dev:
      'npx concurrently "cross-env mode=development webpack --config webpack.config.js" "webpack-dev-server --open"',
    build: "npx cross-env mode=production webpack --config webpack.config.js"
  },
  keywords: [],
  author: "",
  license: "ISC",
  devDependencies: {
    "@babel/core": "^7.7.5",
    "@babel/preset-env": "^7.7.6",
    autoprefixer: "^9.7.3",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    concurrently: "^5.1.0",
    "cross-env": "^7.0.0",
    "css-loader": "^3.4.2",
    eslint: "^6.8.0",
    "file-loader": "^5.0.2",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.9.0",
    "node-sass": "^4.13.0",
    "postcss-loader": "^3.0.0",
    prettier: "^1.19.1",
    "react-router-dom": "^5.1.2",
    "sass-loader": "^8.0.0",
    "url-loader": "^3.0.0",
    webpack: "^4.41.5",
    "webpack-bundle-analyzer": "^3.6.0",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.10.3",
    "workbox-webpack-plugin": "^5.0.0"
  },
  dependencies: {
    "@babel/polyfill": "^7.7.0",
    "@babel/preset-react": "^7.8.3",
    react: "^16.12.0",
    "react-dom": "^16.12.0"
  }
};
