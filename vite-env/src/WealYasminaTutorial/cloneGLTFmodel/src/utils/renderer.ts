import * as THREE from "three";
import App from "../app";

export default class Renderer {
  app: App;
  instance: THREE.WebGLRenderer;

  constructor() {
    this.app = new App();
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.app.canvas,
    });
    this.instance.setSize(this.app.sizes.width, this.app.sizes.height);
    this.instance.setPixelRatio(this.app.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.app.sizes.width, this.app.sizes.height);
    this.instance.setPixelRatio(this.app.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.app.scene, this.app.camera.instance);
  }
}
