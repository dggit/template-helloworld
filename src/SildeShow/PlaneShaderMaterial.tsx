import * as THREE from 'three';
import {shaderMaterial} from '@react-three/drei';


export type PlaneShaderMaterialUniform = {
	// uColor: THREE.Color;
	texture1: THREE.Texture;
	texture2: THREE.Texture;
	progress: number;

};

const uniform = {
	// uColor: new THREE.Color(1.0, 0.0, 0.0),
	texture1: new THREE.Texture(),
	texture2: new THREE.Texture(),
	progress: 0,
};

const vertexShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;

  void main() {

    vec3 pos = position;
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform vec3 uColor;
  varying vec2 vUv;
  uniform float progress;
  uniform sampler2D texture1;
  uniform sampler2D texture2;
mat2 rotate(float a) {
float s = sin(a);
float c = cos(a);
return mat2(c, -s, s, c);
}
  void main() {
    
    // vec4 image1 = texture2D(texture1,vUv);
		// vec4 image2 = texture2D(texture2,vUv);
//		gl_FragColor = mix(image1, image2, progress);
//		gl_FragColor = texture2D(texture1,fract(vUv + vUv));
//gl_FragColor = texture2D(texture1, vUv - vUv * vec2(1.,0) * progress * 0.5);
// gl_FragColor = texture2D(texture1, vUv - fract(vUv * vec2(100.,0.)) * progress * 0.1 );
//vec4 image1 = texture2D(texture1, vUv - fract(vUv * vec2(100.,0.)) * progress * 0.1 );
//vec4 image2 = texture2D(texture2, vUv - fract(vUv * vec2(100.,0.)) * progress * 0.1 );
		
//gl_FragColor = mix(image1, image2, progress);


vec2 newUV = (vUv - vec2(0.5))*1.2 + vec2(0.5);

vec2 uvDivided = fract(newUV*vec2(20.,1.));


vec2 uvDisplaced1 = newUV + rotate(0.)*uvDivided*progress*0.1;
vec2 uvDisplaced2 = newUV + rotate(0.)*uvDivided*(1. - progress)*0.1;

vec4 t1 = texture2D(texture1,uvDisplaced1);
vec4 t2 = texture2D(texture2,uvDisplaced2);

gl_FragColor = mix(t1, t2, progress);


  }
`;

export const PlaneShaderMaterial = shaderMaterial(
	// Uniform
	uniform,
	// vertex shader
	vertexShader,
	// fragment shader
	fragmentShader,
);

//vec4 t = texture2D(uTexture, vUv);

//gl_FragColor = vec4(t);
