uniform vec2 uFrequency;
uniform float uTime;

// varyingを使うことで、fragmentShaderにこの変数を渡すことができる。varying属性なので、頭文字にvをつけている。
varying vec2 vUv;
varying float vElecation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // 経過時間 uTime を足すことで位相をずらしている
    float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
    modelPosition.z += elevation;

    // modelPosition.y *= 0.7;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    // fragmentShaderにuv座標を渡す(uvは組み込み変数)
    vUv = uv;
    vElecation = elevation;
}