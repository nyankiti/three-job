import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { gsap } from "gsap/all";
import App from "./app.js";

export default class DisplayMeshes {
  app: App;
  models: any[];
  initial: boolean;

  // meshs
  groundMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  grid: THREE.GridHelper;
  // マウスが乗っている位置のマス目をハイライトするためのMesh。obejectが乗っているとき赤色、乗っていない時白色にハイライトする
  highlightMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

  // gltf model
  objects: THREE.Object3D[] = []; // cloneによって生み出されたmodelを管理するobject
  mixers: THREE.AnimationMixer[] = []; // animationを管理するobject
  donkeyModel: THREE.Group; // cloneのコピー元となるモデル
  clips: THREE.AnimationClip[];

  constructor() {
    this.initial = false;

    this.app = new App();
    this.models = [];

    this.addGroud();
    this.addGrid();
    this.initHighlight();
    this.initGLTFModel();
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

  // cloneのコピー元のmodelの作成
  initGLTFModel() {
    const model = this.app.loaders.items["Donkey"].scene;
    model.scale.set(0.3, 0.3, 0.3);

    this.donkeyModel = model;
    this.clips = this.app.loaders.items["Donkey"].animations;
  }

  // 現在のhihtLightされている位置にオブジェクトがあるかどうかを判定する
  isObjectExist() {
    return this.objects.find((object) => {
      return (
        object.position.x === this.highlightMesh.position.x &&
        object.position.z === this.highlightMesh.position.z
      );
    });
  }

  // mouseがgroundに乗った時の、highlightの色替え処理
  updateHighlight(point: THREE.Vector3) {
    const highlightPos = new THREE.Vector3()
      .copy(point)
      .floor()
      // addScalarで0.5ずらすことでunitの中心にhighligtPosを移動している
      .addScalar(0.5);

    // ハイライトの位置をマウスとクロスしているマス目の位置に更新
    this.highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);

    const objectExist = this.isObjectExist();

    if (!objectExist) {
      this.highlightMesh.material.color.setHex(0xffffff);
    } else {
      this.highlightMesh.material.color.setHex(0xff0000);
    }
  }

  addCloneMesh() {
    const donkeyModelClone = (SkeletonUtils as any).clone(this.donkeyModel);
    donkeyModelClone.position.copy(this.highlightMesh.position);
    this.app.scene.add(donkeyModelClone);
    this.objects.push(donkeyModelClone);
    this.highlightMesh.material.color.setHex(0xff0000);

    const mixer = new THREE.AnimationMixer(donkeyModelClone);
    const clip = THREE.AnimationClip.findByName(this.clips, "Idle_2");
    const action = mixer.clipAction(clip);
    action.play();
    this.mixers.push(mixer);
  }
}
