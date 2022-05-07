import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EventEmitter } from "events";

type DataSource = {
  date: string;
  id: string;
  image_url: string;
  post_permalink: string;
  title: string;
  type: string;
};

export default class Loaders extends EventEmitter {
  sources: DataSource[];
  progressbar?: HTMLDivElement | null;
  splashscreen?: HTMLDivElement | null;

  items: any;
  toLoad: number;
  loaded: number;
  fill: number;
  border: number;

  textureLoader?: THREE.TextureLoader;

  constructor(sources: DataSource[]) {
    super();
    this.sources = sources;

    // Loading splash
    this.progressbar = document.querySelector(".progress .bar");
    this.splashscreen = document.querySelector(".splash");

    // Setup

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.fill = 0;
    this.border = 300;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    //  現在は画像ファイルしか読み込まないので、LoaderはTextureLoaderのみとする
    // this.gltfloader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
    // this.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    for (const source of this.sources) {
      switch (source.type) {
        // case "gltf":
        //   this.gltfloader.load(source.path, (file) => {
        //     this.sourceLoaded(source, file);
        //   });
        //   break;

        case "texture":
          this.textureLoader?.load(source.image_url, (file) => {
            file.flipY = false;
            file.encoding = THREE.sRGBEncoding;
            this.sourceLoaded(source, file);
          });
          break;

        // case "cubeTexture":
        //   this.cubeTextureLoader.load(source.path, (file) => {
        //     file.encoding = THREE.sRGBEncoding;
        //     this.sourceLoaded(source, file);
        //   });
        //   break;

        default:
          console.log("Unknown source type");
          break;
      }
    }
  }

  sourceLoaded(source: DataSource, file: any) {
    this.items[source.title] = file;
    this.loaded++;

    this.fill = (this.loaded / this.toLoad) * 300;
    this.border = 302 - this.fill;
    if (this.progressbar)
      this.progressbar.style.borderRightWidth = `${this.border}px`;
    if (this.progressbar) this.progressbar.style.width = `${this.fill}px`;

    if (this.loaded === this.toLoad) {
      setTimeout(() => {
        // this.splashscreen.style.opacity = 0;
        if (this.splashscreen) this.splashscreen.classList.add("ready");
        this.emit("ready");
        setTimeout(() => {
          if (this.splashscreen) this.splashscreen.style.display = "none";
        }, 2000);
      }, 500);
    }
  }
}
