uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main() {
    float mixStrengthColor = (vElevation + uColorOffset) * uColorMultiplier;
    // 第三引数が0ならDepthColor, 1ならSurfaceColor、0.5ならその中間の色となる
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrengthColor);
    // 単色の場合
    gl_FragColor = vec4(color, 1.0);
}