import * as THREE from "three";
import { EventEmitter } from "events";

export default class Loaders extends EventEmitter {
  toLoad: number;
  loaded: number;
  fill: number;
  border: number;
  textureLoader: THREE.TextureLoader;

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
  }

  startLoading() {}

  sourceLoaded() {
    setTimeout(() => {}, 500);
  }
}
