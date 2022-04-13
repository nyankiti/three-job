import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

// グラフィカルにプロパティをいじるための設定---------------------------------------------------
const gui = new dat.GUI();
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10,
  },
};

// add(編集する値, ラベル, min value, max value)
gui.add(world.plane, "width", 1, 20).onChange(generatePlane);

gui.add(world.plane, "height", 1, 20).onChange(generatePlane);
gui.add(world.plane, "widthSegments", 1, 20).onChange(generatePlane);
gui.add(world.plane, "heightSegments", 1, 20).onChange(generatePlane);

function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );
  const { array } = planeMesh.geometry.attributes.position as any;
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    // array[i] = x + 3;
    array[i + 2] = z + Math.random();
  }
}
// --------------------------------------------------------------------------------------

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

// OrbitControlsを用いることで、ドラッグ操作によって視点を変える
new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);

// DoubleSideを渡すことで、平面の両面に色付けする
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: true,
});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

const { array } = planeMesh.geometry.attributes.position as any;
for (let i = 0; i < array.length; i += 3) {
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];

  // array[i] = x + 3;
  array[i + 2] = z + Math.random();
}

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // planeMesh.rotation.x += 0.01;
}

animate();
