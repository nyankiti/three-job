import * as THREE from "three";
import { EventEmitter } from "events";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import App from "../app";

export default class Loaders extends EventEmitter {
  toLoad: number;
  loaded: number;
  fill: number;
  border: number;
  textureLoader: THREE.TextureLoader;
  gltfloader: GLTFLoader;

  items: {
    [name: string]: GLTF;
  };

  constructor() {
    super();

    // loadしたitemを格納しておく場所。displaymeshes.tsなどからこのitemを取り出してsceneへ追加する流れとなる
    this.items = {};

    this.toLoad = 0;
    this.loaded = 0;
    this.fill = 0;
    this.border = 300;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.textureLoader = new THREE.TextureLoader();
    this.gltfloader = new GLTFLoader();
  }

  loadOneModel(href: string, type: string, modelName: string) {
    switch (type) {
      case "glft":
        this.gltfloader.load(href, (gltfFile) => {
          this.items[modelName] = gltfFile;
        });
    }
  }

  startLoading() {
    // const fileUrl = new URL("../../assets/Donkey.gltf", import.meta.url);
    const fileUrl = new URL("../../assets/Stag.gltf", import.meta.url);
    this.gltfloader.load(fileUrl.href, (gltf) => {
      this.items["Donkey"] = gltf;
      // loadingするアイテムが全て終わったら、readyをemitすることで、app側で指定したmeshの追加処理を実行する
      this.emit("ready");
    });
  }
}
