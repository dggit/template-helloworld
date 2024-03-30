import {Composition} from 'remotion';
import {Slideshow} from './SildeShow/Slideshow';
import GLTransitions from "gl-transitions";
// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {


	// const photos = ['img1.png', 'img2.png'];
	// const photos = ['https://files.shoootin.com/emails/header4.png', 'https://files.shoootin.com/emails/header3.png'];
	// const photos = [image1, image2];
	//
	// const [imageOne, imageTwo] = useLoader(THREE.TextureLoader, photos);
	//

	console.log(GLTransitions);

	return (
		<>
			{/*<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				schema={myCompSchema}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: '#000000',
					logoColor1: '#91EAE4',
					logoColor2: '#86A8E7',
				}}
			/>*/}
			<Composition
				id="MySlideshow"
				component={Slideshow}
				durationInFrames={6700}
				fps={30}
				width={900}
				height={600}
				// defaultProps={{
				// 	photos: images
				// }}
			/>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
			{/*<Composition
				id="OnlyLogo"
				component={Logo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				schema={myCompSchema2}
				defaultProps={{
					logoColor1: '#91dAE2' as const,
					logoColor2: '#86A8E7' as const,
				}}
			/>*/}
		</>
	);
};
