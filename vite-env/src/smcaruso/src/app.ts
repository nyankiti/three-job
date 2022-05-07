import * as THREE from "three";
/* utils */
import Sizes from "./utils/sizes";
import Time from "./utils/time";
import Loaders from "./utils/loaders";
/* data */
import sources from "./sources.json";

let instance: App | null = null;

export default class App {
  canvas?: HTMLCanvasElement;
  sizes?: Sizes;
  time?: Time;
  scene?: THREE.Scene;
  loaders?: Loaders;

  constructor(canvas: HTMLCanvasElement) {
    // 2回目以降のアクセスを防ぐ
    if (instance) {
      return instance;
    }

    instance = this;

    // setup
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.loaders = new Loaders(sources);

    // event emitterのonメソッドの第二引数で、追加したい処理を追加できる
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    // this.renderer.resize();
    // this.camera.resize();
  }

  update() {
    // this.renderer.update();
    // this.camera.update();
  }
}
