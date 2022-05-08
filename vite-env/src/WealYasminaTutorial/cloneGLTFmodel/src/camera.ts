import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import App from "./app";

export default class Camera {
  app: App;
  instance: THREE.PerspectiveCamera;
  orbit: OrbitControls;
  constructor() {
    this.app = new App();
    this.setInstance();
    this.setOrbitControls();
  }
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.app.sizes.width / this.app.sizes.height,
      0.1,
      1000
    );
    this.instance.position.set(10, 6, 10);
    // this.app.scene?.add(this.instance);
  }
  setOrbitControls() {
    this.orbit = new OrbitControls(this.instance, this.app.canvas);
    this.orbit.update();
  }
  resize() {
    this.instance.aspect = this.app.sizes.width / this.app.sizes.height;
    this.instance?.updateProjectionMatrix();
  }
  update() {
    this.orbit?.update();
  }
}
