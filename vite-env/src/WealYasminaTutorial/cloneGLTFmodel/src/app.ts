// 参考: https://www.youtube.com/watch?v=oQbfy8QP8Lc&t=339s

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import Renderer from "./utils/renderer";
import Camera from "./camera";
import DisplayMeshes from "./displaymeshes";
import Environment from "./environment";
/* utils */
import Sizes from "./utils/sizes";
import Time from "./utils/time";
import Mouse from "./utils/mouse";
import Loaders from "./utils/loaders";

let instance: App | null = null;

export default class App {
  canvas?: HTMLCanvasElement;
  sizes: Sizes;
  time: Time;
  mouse: Mouse;
  scene: THREE.Scene;
  loaders: Loaders;
  isLoaded: boolean = false;
  camera: Camera;
  renderer: Renderer;
  displayMeshes: DisplayMeshes;
  environment: Environment;
  raycaster: THREE.Raycaster;
  // raycasterとmouseの交差を管理する配列
  intersects: THREE.Intersection[];

  _time: any;

  constructor(canvas?: HTMLCanvasElement) {
    // 2回目以降のアクセスを防ぐ
    if (instance) {
      return instance;
    }

    instance = this;

    // setup
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.mouse = new Mouse();
    this.scene = new THREE.Scene();
    this.loaders = new Loaders();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.raycaster = new THREE.Raycaster();

    this._time = new THREE.Clock();

    // event emitterのonメソッドの第二引数で、追加したい処理を追加できる
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("tick", () => {
      this.animate();
    });
    this.mouse.on("mousemove", () => {
      this.onMousemove();
    });
    this.mouse.on("mousedown", () => {
      this.onMouseDown();
    });
    this.loaders.on("ready", () => {
      this.environment = new Environment();
      this.displayMeshes = new DisplayMeshes();
      this.isLoaded = true;
    });
  }

  resize() {
    this.renderer.resize();
    this.camera.resize();
  }

  animate() {
    if (this.isLoaded) {
      // highlightを点滅させる
      const elapsed_time = this.time.elapsed;
      this.displayMeshes.highlightMesh.material.opacity =
        1 + Math.sin(elapsed_time / 120);

      this.displayMeshes.mixers.forEach((mixer) => {
        mixer.update(this.time.delta / 1000);
      });

      this.renderer.update();
      this.camera.update();
    }
  }

  // mouseの移動
  onMousemove() {
    this.raycaster.setFromCamera(this.mouse.position, this.camera.instance);
    this.intersects = this.raycaster.intersectObjects(this.scene.children);
    // console.log(this.intersects);
    this.intersects.forEach((intersect) => {
      if (intersect.object.name === "ground") {
        this.displayMeshes.updateHighlight(intersect.point);
      }
    }, this);
  }

  onMouseDown() {
    // clickした位置に既にobejctが存在するかどうかをチェックするメソッド
    const objectExist = this.displayMeshes.isObjectExist();

    if (!objectExist) {
      this.intersects.forEach((intersect) => {
        if (intersect.object.name === "ground") {
          this.displayMeshes.addCloneMesh();
        }
      }, this);
    }
  }
}
