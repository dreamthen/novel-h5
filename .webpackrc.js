const path = require("path");

const PUBLIC_DIR = "/";
const BUILD_DIR = path.resolve(__dirname, "./build");

const novelH5_webpack = {
  devtool: "source-map",
  entry: "./src/*.js",
  externals: {
    "jquery": "jQuery"
  },
  browserslist: [
    "Android >= 4",
    "IOS >= 9",
    "Chrome >= 35",
    "Firefox >= 31",
    "Explorer >= 9",
    "Opera >= 12",
    "Safari >= 7.1"
  ],
  publicPath: PUBLIC_DIR,
  hash: true,
  commons: [{
    name: "manifest",
    filename: "manifest.[hash].js",
    minChunks: Infinity
  }],
  outputPath: BUILD_DIR,
  html: {
    publicPath: PUBLIC_DIR,
    template: "./src/index.ejs"
  },
  proxy: {
    "/novel_h5/": {
      target: "http://public.1jtec.com/",
      secure: false,
      pathRewrite: {"/novel_h5/": "/novel_h5/"},
      changeOrigin: true
    }
  },
  extraBabelPlugins: [
    ["import", {libraryName : "antd-mobile", style : true }]
  ],
};

export default novelH5_webpack;
