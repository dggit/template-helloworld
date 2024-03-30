import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const uniforms = {
  uTexture: new THREE.Texture(),
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;

  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`;

export const SimpleShaderMaterial = shaderMaterial(
  uniforms,
  vertexShader,
  fragmentShader,
);
