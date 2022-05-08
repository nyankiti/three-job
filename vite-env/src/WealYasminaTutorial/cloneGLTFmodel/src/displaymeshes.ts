import * as THREE from "three";
import { gsap } from "gsap/all";
import App from "./app.js";

export default class DisplayMeshes {
  app: App;
  models: any[];
  initial: boolean;
  // meshs
  groundMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  grid: THREE.GridHelper;
  highlightMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  sphereMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

  constructor() {
    this.initial = false;

    this.app = new App();
    this.models = [];

    this.addGroud();
    this.addGrid();
    this.initHighlight();

    this.sphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 4, 2),
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xffea00,
      })
    );
  }

  addGroud() {
    this.groundMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        visible: false,
      })
    );
    this.groundMesh.rotateX(-Math.PI / 2);
    this.app.scene.add(this.groundMesh);
    // 名前をつけて管理できる
    this.groundMesh.name = "ground";
  }

  addGrid() {
    this.grid = new THREE.GridHelper(20, 20);
    this.app.scene.add(this.grid);
  }

  // HighLightはmousemoveによって位置が変化していくので、addではなくinitとした
  initHighlight() {
    this.highlightMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    this.highlightMesh.rotateX(-Math.PI / 2);
    this.highlightMesh.position.set(0.5, 0, 0.5);
    this.app.scene.add(this.highlightMesh);
  }
  addModels() {}

  createProjects() {}
}
