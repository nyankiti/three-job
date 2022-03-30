const { resolve } = require("path");

const root = "src";

module.exports = {
  root: root,
  publicDir: "public",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, root, "index.html"),
        boxAndPlane: resolve(__dirname, root, "boxAndPlane/index.html"),
      },
    },
  },
};
