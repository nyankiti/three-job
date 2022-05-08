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
        smcaruso: resolve(__dirname, root, "smcaruso/index.html"),
        subdividePlane: resolve(
          __dirname,
          root,
          "WealYasminaTutorial/subdividePlane/index.html"
        ),
        GLTFmodelGui: resolve(
          __dirname,
          root,
          "WealYasminaTutorial/GLTFmodelGui/index.html"
        ),
        cloneGLTFmodel: resolve(
          __dirname,
          root,
          "WealYasminaTutorial/cloneGLTFmodel/index.html"
        ),
        cameraMovement: resolve(
          __dirname,
          root,
          "WealYasminaTutorial/cameraMovement/index.html"
        ),
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
        worldCoordinate: resolve(
          __dirname,
          root,
          "icsTutorial/worldCoordinate/index.html"
        ),
        raycast: resolve(__dirname, root, "icsTutorial/raycast/index.html"),
        particle: resolve(__dirname, root, "icsTutorial/particle/index.html"),
        // mergeGeometry: resolve(
        //   __dirname,
        //   root,
        //   "icsTutorial/mergeGeometry/index.html"
        // ),
      },
    },
  },
};
