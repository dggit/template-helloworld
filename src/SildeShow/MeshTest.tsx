import * as THREE from 'three';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {extend, Object3DNode} from '@react-three/fiber';
import {ThreeCanvas} from '@remotion/three';
import './PlaneShaderMaterial';
import {PlaneShaderMaterial, PlaneShaderMaterialUniform} from './PlaneShaderMaterial';
import {SimpleShaderMaterial} from './SimpleShaderMaterial';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import Roboto from '../Roboto_Regular.json';
import {Container, CustomContainer, Fullscreen, Text} from '@react-three/uikit';


// Ensure react-three-fiber recognizes your custom material
extend({
	PlaneShaderMaterial,
	SimpleShaderMaterial,
	TextGeometry
});
declare module '@react-three/fiber' {
	interface ThreeElements {
		textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
		planeShaderMaterial: Object3DNode<PlaneShaderMaterialUniform, typeof PlaneShaderMaterial>;

	}
}

eport const MyMesh = (props: {
	texture1: any,
	texture2: any,
	aspectRatio: number,
	frame: number;
}) => {
	const {texture1, texture2, aspectRatio, frame} = props;
	// const shaderRef = useRef();

	// const points = [];
	// points.push(new THREE.Vector3(0, 1000, 0));
	// points.push(new THREE.Vector3(0.5, 20, 0));
	//
	// const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

	const font = new FontLoader().parse(Roboto);
	console.log(font);
	// return (
	// 			<mesh position={[0,0,1]}>
	// 				<textGeometry attach="geometry" args={['Hello World', {font, size: 20, depth: 10}]} />
	// 				<meshPhysicalMaterial attach="material" color={"black"} />
	// 			</mesh>
	// );
	return (
		<Fullscreen flexDirection="column" padding={0} gap={0}>
			{/*<Container flexGrow={1} backgroundOpacity={0.5} hover={{backgroundOpacity: 1}} backgroundColor="red" />*/}
			{/*<Container flexGrow={1} backgroundOpacity={0.5} hover={{backgroundOpacity: 1}} backgroundColor="blue" />*/}

			<CustomContainer width={'100%'} height={'100%'} positionBottom={0} positionLeft={0} positionTop={0}
											 positionRight={0} positionType={'absolute'}>
				<planeShaderMaterial
					attach="material"
					// ref={shaderRef}
					texture1={texture1}
					texture2={texture2}
					progress={frame}
				/>

				<planeGeometry attach="geometry" args={[aspectRatio, 1]} />
			</CustomContainer>

			{frame >= 0.5 && (
				<Container width={'100%'} height={200} positionBottom={0} backgroundColor={'black'} backgroundOpacity={frame}
									 justifyContent={'center'} positionType={'absolute'} alignItems={'center'} display={'flex'}
				>
					<Text color={'white'} fontSize={40} verticalAlign={'center'}>Test with text</Text>
				</Container>
			)}
		</Fullscreen>
	);
	// return (
	// 	<>
	// 		<mesh>
	// 			<planeShaderMaterial
	// 				attach="material"
	// 				ref={shaderRef}
	// 				texture1={texture1}
	// 				texture2={texture2}
	// 				progress={frame}
	// 			/>
	//
	// 			{/*<simpleShaderMaterial
	// 			attach="material"
	// 			ref={shaderRef}
	// 			uTexture={texture1}
	// 			progress={frame}
	// 			/>*/}
	// 			{/*<group position={[50, 50, 10]}>
	// 			<line geometry={lineGeometry}>
	// 				<lineBasicMaterial attach="material" color={'red'} linewidth={20} />
	// 			</line>
	// 		</group>*/}
	// 			<planeGeometry attach="geometry" args={[aspectRatio, 1]} />
	// 		</mesh>
	// 		<mesh>
	// 			<textGeometry attach="geometry" args={['Hello World', {font, size: 1, depth: 1}]} />
	// 			<meshPhysicalMaterial attach="material" color="red" />
	// 		</mesh>
	// 	</>
	// );

};


export const Test = ({
								texture1,
								texture2
							}: {
	texture1: any;
	texture2: any;
}) => {
	const frame = useCurrentFrame();
	const {width, height, durationInFrames} = useVideoConfig();
	const aspectRatio = width / height;

	return (
		<ThreeCanvas
			flat={true}
			width={width}
			height={height}
			style={{
				// backgroundColor: 'black'
			}}
			camera={{position: [0, 0, 1], zoom: 1}}
			// onCreated={({ gl }) => { gl.toneMapping = THREE.NoToneMapping }}
			gl={{antialias: true, toneMapping: THREE.NoToneMapping}}
			linear
			// colorManagement={false}
		>
			<MyMesh
				texture1={texture1}
				texture2={texture2}
				aspectRatio={aspectRatio}
				frame={frame / durationInFrames}
			/>
		</ThreeCanvas>
	);
};
