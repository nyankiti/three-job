import * as THREE from "three";
import Earth from "./earth.jpg";

const width = window.innerWidth;
const height = window.innerHeight;
let rot = 0; // 角度
// マウスを押した状態かどうかを判別するフラグ
let isMouseDown = false;
// 一時的なマウスの値を格納する変数
let oldX = 0;
let targetRot = 0;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#myCanvas") as HTMLCanvasElement,
});
renderer.setSize(width, height);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height);

// 平行光源を作成
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// マテリアルを作成
const material = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(Earth),
  side: THREE.DoubleSide,
});

// 球体の形状を作成します
const geometry = new THREE.SphereGeometry(300, 30, 30);
// 形状とマテリアルからメッシュを作成します
const earthMesh = new THREE.Mesh(geometry, material);
// シーンにメッシュを追加します
scene.add(earthMesh);

// 星屑を作成します (カメラの動きをわかりやすくするため)
createStarField();

/** 星屑を作成します */
function createStarField() {
  // 頂点情報を格納する配列
  const vertices = [];
  // 1000 個の頂点を作成
  for (let i = 0; i < 1000; i++) {
    const x = 3000 * (Math.random() - 0.5);
    const y = 3000 * (Math.random() - 0.5);
    const z = 3000 * (Math.random() - 0.5);

    vertices.push(x, y, z);
  }

  // 形状データを作成
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  // マテリアルを作成
  const material = new THREE.PointsMaterial({
    size: 10,
    color: 0xffffff,
  });

  // 物体を作成
  const mesh = new THREE.Points(geometry, material);
  scene.add(mesh);
}

// イベントの設定
document.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  oldX = event.pageX;
});
document.addEventListener("mouseup", (event) => {
  isMouseDown = false;
});
document.addEventListener("mousemove", (event) => {
  console.log(event);

  if (isMouseDown === true) {
    const dy = event.pageX - oldX;
    targetRot += dy * 0.25;
    oldX = event.pageX;
  }
});

tick();

// 毎フレーム時に実行されるループイベントです
function tick() {
  // イージングの公式を用いて滑らかにする
  // 値 += (目標値 - 現在の値) * 減速値
  rot += (targetRot - rot) * 0.05;

  // ラジアンに変換する
  const radian = (rot * Math.PI) / 180;
  // 角度に応じてカメラの位置を設定
  camera.position.x = 1000 * Math.sin(radian);
  camera.position.z = 1000 * Math.cos(radian);
  // 原点方向を見つめる
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  // 地球は常に回転させておく
  earthMesh.rotation.y += 0.01;

  // レンダリング
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
