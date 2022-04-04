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
        boxAndPlane: resolve(
          __dirname,
          root,
          "chrisTutorial/boxAndPlane/index.html"
        ),
        guiPlane: resolve(__dirname, root, "chrisTutorial/guiPlane/index.html"),
        hoverPlane: resolve(
          __dirname,
          root,
          "chrisTutorial/hoverPlane/index.html"
        ),
        introdution: resolve(
          __dirname,
          root,
          "icsTutorial/introduction/index.html"
        ),
        meterialAndLighting: resolve(
          __dirname,
          root,
          "icsTutorial/materialAndLighting/index.html"
        ),
        geometry: resolve(__dirname, root, "icsTutorial/geometry/index.html"),
        cameraCoordinateControll: resolve(
          __dirname,
          root,
          "icsTutorial/cameraCoordinateControl/index.html"
        ),
        cameraOrbitControll: resolve(
          __dirname,
          root,
          "icsTutorial/cameraOrbitControl/index.html"
        ),
        group: resolve(__dirname, root, "icsTutorial/group/index.html"),
      },
    },
  },
};
