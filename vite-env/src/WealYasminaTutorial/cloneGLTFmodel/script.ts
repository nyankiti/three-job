import * as THREE from "three";
import App from "./src/app";

const myCanvas = document.querySelector("#myCanvas") as HTMLCanvasElement;
const app = new App(myCanvas);

// デバッグのため、軸を追加 赤: x, 青: z, 緑: y (数学だとzが高さだが、three.jsではyが高さなので注意！　)
app.scene.add(new THREE.AxesHelper(10));
