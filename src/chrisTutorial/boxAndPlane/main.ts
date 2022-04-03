import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  // window.innerWidth / window.innerHeight,
  // window. は省略できる
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
// index.jsにcanvasオブジェクトを追加する
document.body.appendChild(renderer.domElement);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(boxMesh);
camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);

// DoubleSideを渡すことで、平面の両面に色付けする
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(planeMesh);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  boxMesh.rotation.x += 0.01;
  boxMesh.rotation.y += 0.01;
  planeMesh.rotation.x += 0.01;
}

animate();
