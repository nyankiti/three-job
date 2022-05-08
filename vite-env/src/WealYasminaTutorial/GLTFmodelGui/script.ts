import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from "dat.gui";

const fileUrl = new URL("./assets/Donkey.gltf", import.meta.url);

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
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(10, 10, 10);
orbit.update();

// 地面を作成
const grid = new THREE.GridHelper(30, 30);
scene.add(grid);

// light
const ambientLight = new THREE.AmbientLight(0xededed, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);
directionalLight.position.set(10, 11, 7);

// gui
const gui = new dat.GUI();

const options = {
  Main: 0x2f3130,
  "Main light": 0x7c7c7c,
  "Main dark": 0x0a0a0a,
  Hooves: 0x0f0b0d,
  Hair: 0x0a0a0a,
  Muzzle: 0x0b0804,
  "Eye dark": 0x020202,
  "Eye white": 0xbebebe,
};

// asset loader
const assetLoader = new GLTFLoader();
let mixer: THREE.AnimationMixer;
assetLoader.load(
  fileUrl.href,
  (gltf) => {
    const model: any = gltf.scene;
    scene.add(model);
    gui.addColor(options, "Main").onChange((e) => {
      model.getObjectByName("Cube").material.color.setHex(e);
    });
    gui.addColor(options, "Main light").onChange((e) => {
      model.getObjectByName("Cube_1").material.color.setHex(e);
    });
    gui.addColor(options, "Main dark").onChange((e) => {
      model.getObjectByName("Cube_2").material.color.setHex(e);
    });
    gui.addColor(options, "Hooves").onChange((e) => {
      model.getObjectByName("Cube_3").material.color.setHex(e);
    });
    gui.addColor(options, "Hair").onChange((e) => {
      model.getObjectByName("Cube_4").material.color.setHex(e);
    });
    gui.addColor(options, "Muzzle").onChange((e) => {
      model.getObjectByName("Cube_5").material.color.setHex(e);
    });
    gui.addColor(options, "Eye dark").onChange((e) => {
      model.getObjectByName("Cube_6").material.color.setHex(e);
    });
    gui.addColor(options, "Eye white").onChange((e) => {
      model.getObjectByName("Cube_7").material.color.setHex(e);
    });
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;

    // Play all animations at the same time
    clips.forEach(function (clip) {
      const action = mixer.clipAction(clip);
      action.play();
    });
  },
  undefined,
  (err) => {
    console.error(err);
  }
);

const clock = new THREE.Clock();

// 毎フレーム時に実行されるループイベント
function tick() {
  if (mixer) {
    mixer.update(clock.getDelta());
  }
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
