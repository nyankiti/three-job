import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Renderer from "./utils/renderer";
import Camera from "./camera";
import DisplayMeshes from "./displaymeshes";
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
  camera: Camera;
  renderer: Renderer;
  displayMeshes: DisplayMeshes;
  raycaster: THREE.Raycaster;
  // clickした際にできるsphereMeshを管理する配列
  objects: THREE.Mesh[] = [];
  // raycasterとmouseの交差を管理する配列
  intersects: THREE.Intersection[];

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
    this.displayMeshes = new DisplayMeshes();
    this.raycaster = new THREE.Raycaster();

    console.log(this.time);

    this.renderer.instance.setAnimationLoop(this.animate);

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
  }

  resize() {
    this.renderer.resize();
    this.camera.resize();
  }

  animate() {
    if (this) {
      const elapsed_time = this.time.elapsed;
      this.displayMeshes.highlightMesh.material.opacity =
        1 + Math.sin(elapsed_time / 120);
      this.objects.forEach(function (object) {
        object.rotation.x = elapsed_time / 1000;
        object.rotation.z = elapsed_time / 1000;
        object.position.y = 0.5 + 0.5 * Math.abs(Math.sin(elapsed_time / 1000));
      });
      this.renderer.update();
      this.camera.update();
    }
  }

  // mouseの移動
  onMousemove() {
    this.raycaster.setFromCamera(this.mouse.position, this.camera.instance);
    this.intersects = this.raycaster.intersectObjects(this.scene.children);
    this.intersects.forEach((intersect) => {
      if (intersect.object.name === "ground") {
        const highlightPos = new THREE.Vector3()
          .copy(intersect.point)
          .floor()
          // addScalarで0.5ずらすことでunitの中心にhighligtPosを移動している
          .addScalar(0.5);
        this.displayMeshes.highlightMesh.position.set(
          highlightPos.x,
          0,
          highlightPos.z
        );

        const objectExist = this.objects.find((object) => {
          return (
            object.position.x === this.displayMeshes.highlightMesh.position.x &&
            object.position.z === this.displayMeshes.highlightMesh.position.z
          );
        }, this);

        if (!objectExist) {
          this.displayMeshes.highlightMesh.material.color.setHex(0xffffff);
        } else {
          this.displayMeshes.highlightMesh.material.color.setHex(0xff0000);
        }
      }
    }, this);
  }

  onMouseDown() {
    const objectExist = this.objects.find((object) => {
      return (
        object.position.x === this.displayMeshes.highlightMesh.position.x &&
        object.position.z === this.displayMeshes.highlightMesh.position.z
      );
    });

    if (!objectExist) {
      this.intersects.forEach((intersect) => {
        if (intersect.object.name === "ground") {
          const sphereClone = this.displayMeshes.sphereMesh.clone();
          sphereClone.position.copy(this.displayMeshes.highlightMesh.position);
          this.scene.add(sphereClone);
          this.objects.push(sphereClone);
          this.displayMeshes.highlightMesh.material.color.setHex(0xff0000);
        }
      }, this);
    }
    console.log(this.scene.children.length);
  }
}
