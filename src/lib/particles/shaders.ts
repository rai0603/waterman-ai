export const particleVertexShader = /* glsl */ `
  attribute vec3 aTaiwan;
  attribute vec3 aTrident;
  attribute vec3 aLattice;
  attribute vec2 aWave;
  attribute vec4 aRand;
  attribute float aGlobeAlpha;

  uniform float uTime;
  uniform float uGlobeRot;
  uniform float uGlobeTilt;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uOpacity;
  uniform float uScale;
  uniform float uBoot;
  uniform vec4 uW;
  uniform float uWWave;
  uniform vec2 uOffset;
  uniform vec2 uPointer;
  uniform vec3 uYilan;

  varying float vAlpha;
  varying float vAccent;

  mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1., 0., 0., 0., c, s, 0., -s, c);
  }

  mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, 0., -s, 0., 1., 0., s, 0., c);
  }

  void main() {
    float t = uTime;

    vec3 globe = rotX(uGlobeTilt) * rotY(uGlobeRot) * position;

    vec3 taiwan = rotX(-0.25) * rotY(sin(t * 0.22) * 0.16) * aTaiwan;
    taiwan.z += sin(aTaiwan.y * 3. + t * 0.8) * 0.03;

    vec3 trident = rotY(sin(t * 0.3) * 0.32) * aTrident;

    float ripple = 1. + 0.05 * sin(length(aLattice) * 4. - t * 1.6);
    vec3 lattice = rotY(t * 0.14) * rotX(0.5) * (aLattice * ripple);

    float height = 0.42 * sin(aWave.x * 0.55 + t * 0.7)
      + 0.3 * sin(aWave.y * 0.85 - t * 0.55)
      + 0.14 * sin((aWave.x + aWave.y) * 1.5 + t * 1.1);
    vec3 wave = rotX(0.62) * vec3(aWave.x, height, aWave.y);

    vec3 p = globe * uW.x + taiwan * uW.y + trident * uW.z + lattice * uW.w + wave * uWWave;

    // 形狀切換時粒子先散開再重組
    float settled = max(max(max(uW.x, uW.y), max(uW.z, uW.w)), uWWave);
    float scatter = 1. - settled;
    vec3 drift = (aRand.xyz - 0.5) * 2.;
    p += drift * scatter * 5. + drift * (1. - uBoot) * 7.;

    vec4 view = modelViewMatrix * vec4(p * uScale + vec3(uOffset, 0.), 1.);

    // 游標附近的粒子被推開
    vec2 away = view.xy - uPointer;
    float push = exp(-dot(away, away) * 2.6);
    view.xy += normalize(away + 0.0001) * push * 0.26;

    gl_Position = projectionMatrix * view;
    gl_PointSize = uSize * uPixelRatio * (0.6 + aRand.w * 0.8) * (7. / -view.z);

    float facing = smoothstep(-0.4, 0.55, normalize(globe).z);
    float globeAlpha = aGlobeAlpha * mix(0.06, 1., facing);
    float waveFade = smoothstep(9.5, 6., abs(aWave.x)) * smoothstep(-6.2, -3., aWave.y) * (0.45 + height * 0.9);
    float shape = globeAlpha * uW.x + 0.8 * uW.y + 0.85 * uW.z + 0.5 * uW.w + waveFade * uWWave;
    vAlpha = (shape + scatter * 0.35) * uOpacity * uBoot;

    float nearYilan = 1. - smoothstep(0.03, 0.26, distance(aTaiwan.xy, uYilan.xy));
    vAccent = max(step(0.985, aRand.w), nearYilan * uW.y);
  }
`;

export const particleFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;

  varying float vAlpha;
  varying float vAccent;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.12, d) * vAlpha;
    gl_FragColor = vec4(mix(uColor, uAccent, vAccent), alpha);
  }
`;

export const arcVertexShader = /* glsl */ `
  attribute float aProgress;
  attribute float aPhase;

  varying float vProgress;
  varying float vPhase;
  varying float vFacing;

  void main() {
    vProgress = aProgress;
    vPhase = aPhase;
    vFacing = smoothstep(-0.15, 0.3, normalize((modelMatrix * vec4(position, 0.)).xyz).z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
  }
`;

export const arcFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uFade;
  uniform vec3 uAccent;

  varying float vProgress;
  varying float vPhase;
  varying float vFacing;

  void main() {
    float head = fract(uTime * 0.2 + vPhase);
    float behind = head - vProgress;
    float pulse = smoothstep(0.32, 0., behind) * step(0., behind);
    gl_FragColor = vec4(uAccent, (0.14 + pulse) * uFade * vFacing);
  }
`;
