import * as THREE from "three";
import { EventEmitter } from "events";

export default class Mouse extends EventEmitter {
  // -1 ~ 1に正規化されたposition
  position: THREE.Vector2;

  constructor() {
    super();
    // Setup variables
    this.position = new THREE.Vector2();
    this.position.x = 0;
    this.position.y = 0;

    // Mouse move event
    window.addEventListener("mousemove", (event) => {
      this.position.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.position.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.emit("mousemove");
    });

    // Mouse down event
    window.addEventListener("mousedown", (event) => {
      this.emit("mousedown");
    });
  }
}
