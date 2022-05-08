import * as THREE from "three";
import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import App from "../app";

export default class Loaders extends EventEmitter {
  toLoad: number;
  loaded: number;
  fill: number;
  border: number;
  textureLoader: THREE.TextureLoader;
  gltfloader: GLTFLoader;

  items: any;

  constructor() {
    super();
    // Setup

    this.items = {};
    this.toLoad = 0;
    this.loaded = 0;
    this.fill = 0;
    this.border = 300;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.textureLoader = new THREE.TextureLoader();
    this.gltfloader = new GLTFLoader();
  }

  loadOneModel(app: App, href: string, type: string) {
    switch (type) {
      case "glft":
        this.gltfloader.load(href, (gltf) => {
          const model = gltf.scene;
        });
    }
  }

  startLoading() {}

  sourceLoaded() {
    setTimeout(() => {}, 500);
  }
}
