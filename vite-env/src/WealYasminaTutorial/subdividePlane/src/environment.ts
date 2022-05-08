import * as THREE from "three";
import App from "./app.js";

export default class Environment {
  app: App;

  constructor() {
    this.app = new App();
    this.addLights();
    this.processStructure();
    this.app.renderer.instance.shadowMap.needsUpdate = true;
  }

  addLights() {}

  processStructure() {}
}
