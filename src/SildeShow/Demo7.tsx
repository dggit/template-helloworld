//@flow
import {GLSL, Node, Shaders} from 'gl-react';

const shaders = Shaders.create({
	Demo7: {
// 		vert: GLSL`
//   //varying vec2 vUv;
//   void main() {
//     //vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `,
		frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D image1;
uniform sampler2D image2;
uniform float progress;

mat2 rotate(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, -s, s, c);
}

void main() {
		
		//we do not need this newUv calculation
		vec2 newUV = uv;//(uv - vec2(0.5))*resolution.zw + vec2(0.5);
		
		vec2 uvDivided = fract(newUV*vec2(20.,1.));
		
		
		vec2 uvDisplaced1 = newUV + rotate(0.)*uvDivided*progress*0.1;
		vec2 uvDisplaced2 = newUV + rotate(0.)*uvDivided*(1. - progress)*0.1;
		
		vec4 t1 = texture2D(image1,uvDisplaced1);
		vec4 t2 = texture2D(image2,uvDisplaced2);
		
		gl_FragColor = mix(t1, t2, progress);
}
`
	}
});

export const Demo7 = (props: {image1: string, image2: string, progress: number}) =>
	<Node
		shader={shaders.Demo7}
		uniforms={props}
	/>;


