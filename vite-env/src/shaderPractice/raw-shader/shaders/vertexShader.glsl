// カメラの範囲の領域に関する行列
uniform mat4 projectionMatrix;
// カメラの位置に関する行列
uniform mat4 viewMatrix;
// 物体の位置に関する行列
uniform mat4 modelMatrix;

/*
3D空間から2D空間への座標変換のために行列を使っているらしい、、
詳しくは右の記事を見よう：https://learnopengl.com/index.php?p=Getting-started/Coordinate-Systems
*/

attribute vec3 position;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y += 0.3;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
}