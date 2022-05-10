// 参考：https://www.youtube.com/watch?v=U-ZiSLwicK8&t=185s

import * as THREE from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

const gltfUrl = new URL("./assets/the_king_s_hall/scene.gltf", import.meta.url);
new URL("./assets/the_king_s_hall/scene.bin", import.meta.url);
new URL(
  "./assets/the_king_s_hall/textures/model_Material_u1_v1_baseColor.jpeg",
  import.meta.url
);
// サイズを取得
const width = window.innerWidth;
const height = window.innerHeight;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#myCanvas") as HTMLCanvasElement,
});
// レンダラーのサイズを調整する
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.setClearColor(0xa3a3a3);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

// const controls = new FirstPersonControls(camera);
// controls.movementSpeed = 8;
// controls.lookSpeed = 0.08;

camera.position.set(-1.7, 0, 8.7);
camera.lookAt(1.7, 0, 8.7);

// Loading関連の処理
const loadingManager = new THREE.LoadingManager();

const progressBarContainer = document.querySelector(
  ".progress-bar-container"
) as HTMLDivElement;
const progressBar = document.getElementById(
  "progress-bar"
) as HTMLProgressElement;

loadingManager.onProgress = (url, loaded, total) => {
  progressBar.value = (loaded / total) * 100;
};

loadingManager.onLoad = () => {
  progressBarContainer.style.display = "none";
};

const gltfLoader = new GLTFLoader(loadingManager);

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

let postition = 0;

gltfLoader.load(gltfUrl.href, (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  window.addEventListener("mouseup", () => {
    // cameraを移動させる
    switch (postition) {
      case 0:
        moveCamera(-1.8, 1.6, 5);
        rotateCamera(0, 0.1, 0);
        postition = 1;
        break;
      case 1:
        moveCamera(2.8, 0, 3.6);
        rotateCamera(0, -2, 0);
        postition = 2;
        break;
      case 2:
        moveCamera(2.5, -0.9, 12.2);
        rotateCamera(0.9, 0.6, -0.6);
        postition = 3;
        break;
      case 3:
        moveCamera(-2.7, 0.6, 3.7);
        rotateCamera(0.6, 1.9, -0.6);
        postition = 4;
        break;
      case 4:
        moveCamera(-1.7, 0, 8.7);
        rotateCamera(0, 4.7, 0);
        postition = 5;
        break;
      case 5:
        moveCamera(0.5, 0.8, 10);
        rotateCamera(0.3, 1.65, -0.3);
        postition = 0;
    }
  });

  const moveCamera = (x: number, y: number, z: number) => {
    gsap.to(camera.position, { x, y, z, duration: 3.2 });
  };

  const rotateCamera = (x: number, y: number, z: number) => {
    gsap.to(camera.rotation, { x, y, z, duration: 3 });
  };
});

const clock = new THREE.Clock();
// 毎フレーム時に実行されるループイベント
function tick() {
  const delta = clock.getDelta();
  // controls.update(delta);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(tick);

window.addEventListener("resize", onResize);

function onResize() {
  // サイズを取得
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // カメラのアスペクト比を正す
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
