import * as THREE from "three";

// サイズを指定
const width = window.innerWidth;
const height = window.innerHeight;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#myCanvas") as HTMLCanvasElement,
});
// レンダラーのサイズ調整
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height);
// カメラの視点を調整
camera.position.set(0, 0, 1000);

// 箱を作成
const geometry = new THREE.BoxGeometry(400, 400, 400);
const material = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(geometry, material);
scene.add(box);

tick();

// 毎フレーム時に実行されるループイベントです
function tick() {
  box.rotation.y += 0.01;
  //   box.rotation.x += 0.01;
  //   box.rotation.z += 0.01;
  // レンダリングのタイミングはここ!!
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
}

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
