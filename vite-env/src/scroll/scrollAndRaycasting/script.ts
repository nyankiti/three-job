// 参考：https://www.youtube.com/watch?v=U29j5NiSMVQ
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";
/* images */
import box from "./textures/box.png";
import sakura_coffee from "./textures/sakura_coffee.jpg";
import success_story_card from "./textures/success_story_card.jpg";
import sunflower from "./textures/sunflower.jpg";
const images = [box, sakura_coffee, success_story_card, sunflower];

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();

// Obects
const geometry = new THREE.PlaneBufferGeometry(1, 1.3);
for (let i = 0; i < 4; i++) {
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(images[i]),
  });

  const img = new THREE.Mesh(geometry, material);
  img.position.set(Math.random() + 0.3, i * 1.8, 0);

  scene.add(img);
}

// 現在3D空間にあるmeshオブジェクトをtraverseメソッドによって探索し、以下のobjs変数に保持する
let objs: THREE.Object3D<THREE.Event>[] = [];
scene.traverse((object: any) => {
  if (object.isMesh) {
    console.log(object);
    objs.push(object);
  }
});

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

gui.add(camera.position, "y").min(-5).max(10).step(0.01).name("camera Y");

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Mouse
 */
const onMouseWheel = (event: WheelEvent) => {
  y = event.deltaY * 0.0007;
};

window.addEventListener("wheel", onMouseWheel);

let y = 0;
let position = 0;

const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

/**
 * Animate
 */

const raycaster = new THREE.Raycaster();

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // y軸の値を徐々に小さくしていくことで、スムーズにcameraの動きが止まるようになる
  position += y;
  y *= 0.9;

  camera.position.y = -position;

  raycaster.setFromCamera(mouse, camera);
  // raycasterから現在マウスと交差しているオブジェクトを取得する
  const intersects = raycaster.intersectObjects(objs);

  for (const intersect of intersects) {
    // intersect.object.scale.set(1.1, 1.1, 1);
    gsap.to(intersect.object.scale, { x: 1.7, y: 1.7 });
    gsap.to(intersect.object.rotation, { y: -0.5 });
    gsap.to(intersect.object.position, { z: -0.9 });
  }

  for (const object of objs) {
    if (!intersects.find((intersect) => object === intersect.object)) {
      gsap.to(object.scale, { x: 1, y: 1 });
      gsap.to(object.rotation, { y: 0 });
      gsap.to(object.position, { z: 0 });
    }
  }

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
