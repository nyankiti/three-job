import * as THREE from "three";
import App from "./app.js";

export default class Environment {
  app: App;

  constructor() {
    this.app = new App();
    this.addLights();
    this.app.renderer.instance.shadowMap.needsUpdate = true;
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0x333333);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(3, 3, 3);

    this.app.scene.add(ambientLight, directionalLight);
  }
}
