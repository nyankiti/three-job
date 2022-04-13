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

// 球体ジオメトリ
const sphereGeometry = new THREE.SphereGeometry(100);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// console.log(sphere.position);
sphere.position.set(-300, 100, 100);
// 3D空間にメッシュを追加
scene.add(sphere);

// 立方体ジオメトリ
const cubeGeometry = new THREE.BoxGeometry(100, 100, 200);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(100, 100, 100);
scene.add(cube);

// 平面ジオメトリ
const planeGeometry = new THREE.PlaneGeometry(200, 200, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(200, -300, 30);
scene.add(plane);

// 円錐ジオメトリ
const coneGeometry = new THREE.ConeGeometry(50, 200, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(-450, -200, 0);
scene.add(cone);

// 円柱ジオメトリ
const cylinderGeometry = new THREE.CylinderGeometry(50, 50, 200, 32);
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(400, 200, 20);
scene.add(cylinder);

// ドーナツ型ジオメトリ
const torusGeometry = new THREE.TorusGeometry(100, 30, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-50, -50, 0);
scene.add(torus);

// // 平行光源
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0, 1);
// シーンに追加
scene.add(directionalLight);

tick();

// 毎フレーム時に実行されるループイベントです
function tick() {
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
