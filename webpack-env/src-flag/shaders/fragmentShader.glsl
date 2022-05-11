// THREE.Colorインスタンスは (r, g, b) の要素を持った3次元ベクトルである
// uniform vec3 uColor;
// textureを扱う型はsampler2Dという。
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElecation;



void main() {
    // 単色の場合
    // gl_FragColor = vec4(uColor, 1.0);
    
    // 画像をtextrueにmappingする場合
    vec4 textureColor = texture2D(uTexture, vUv);
    // 影をつける
    textureColor.rgb *= vElecation*3.5 + 0.7;
    gl_FragColor = textureColor;
}