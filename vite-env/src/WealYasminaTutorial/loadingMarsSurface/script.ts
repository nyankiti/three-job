import * as THREE from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

/* assets */
import gltfUrl from "./assets/mars_one_mission_-_base/scene.gltf?url";
import hdrUrl from "./assets/MR_INT-006_LoftIndustrialWindow_Griffintown.hdr?url";

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

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(5, 8, 30);

const controls = new FirstPersonControls(camera);
controls.lookSpeed = 0.4;

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
const rgbeLoader = new RGBELoader();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

rgbeLoader.load(hdrUrl, (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;

  gltfLoader.load(gltfUrl, (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
});

const clock = new THREE.Clock();
// 毎フレーム時に実行されるループイベント
function tick() {
  const delta = clock.getDelta();
  controls.update(delta);

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
