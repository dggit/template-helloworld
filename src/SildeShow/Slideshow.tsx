import {Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import image1 from '../../public/img1.jpg';
import image2 from '../../public/img2.jpg';
import image3 from '../../public/img3.jpg';
import image4 from '../../public/img4.jpg';
import image5 from '../../public/img5.jpg';
import image6 from '../../public/img6.jpg';
import image7 from '../../public/img7.jpg';
import image8 from '../../public/img8.jpg';
import image9 from '../../public/img9.jpg';


import GLTransitions from 'gl-transitions';
import './PlaneShaderMaterial';
import {Surface} from 'gl-react-dom';
import {GL} from './GL';


import {loadFont} from '@remotion/google-fonts/Roboto';

const {fontFamily} = loadFont();

// We want to add a progressive border around the frame to indicate the progress of the slideshow
// We want first top border to be filled, then right border, then bottom border, then left border
const Border = ({progress}: {progress: number}) => {
	return (
		<>
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				height: 10,
				backgroundColor: 'black',
				width: `${progress * 100}%`
			}} />
			<div style={{
				position: 'absolute',
				right: 0,
				bottom: 0,
				width: 10,
				backgroundColor: 'black',
				height: `${progress * 100}%`
			}} />
			<div style={{
				position: 'absolute',
				bottom: 0,
				right: 0,
				height: 10,
				backgroundColor: 'black',
				width: `${progress * 100}%`

			}} />
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				width: 10,
				backgroundColor: 'black',
				height: `${progress * 100}%`
			}} />
		</>
	);

};

export const Slideshow = () => {
	const photos = [image1, image2, image3, image4, image5, image6, image7, image8, image9];
	const {width, height, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();

	const progress = frame / durationInFrames;
	// const [imageOne, imageTwo] = useLoader(THREE.TextureLoader, photos);

	const duplicatedPhotos = [
		...photos, ...photos, ...photos, ...photos, ...photos, ...photos, ...photos,
	];

	const delay = 30;
	const index = Math.floor(frame / (delay + durationInFrames / duplicatedPhotos.length));

	const transition = GLTransitions[index % GLTransitions.length];

	return (<>

			<Sequence from={0} durationInFrames={durationInFrames} layout={'none'}>
				<div style={{position: 'relative', width, height}}>
					<Surface width={width} height={height} style={{position: 'absolute', left: 0, right: 0, bottom: 0, top: 0}}>
						{/*<Demo7 image1={photos[0]} image2={photos[1]} progress={progress} />*/}
						<GL slides={duplicatedPhotos} delay={delay} duration={durationInFrames / duplicatedPhotos.length}
								time={frame}
						/>
					</Surface>
					<Border progress={progress} />
					<div style={{
						position: 'absolute',
						left: 10,
						right: 10,
						bottom: 10,
						fontSize: 20,
						color: 'white',
						backgroundColor: 'black',
						opacity: 0.5,
						// width: '100%',
						padding: 20,
						fontFamily
					}}>
						<div>
							Magnifique appartement a 200 000 000 €
						</div>
						<div style={{fontSiize: 10}}>{transition.name} {index}</div>
					</div>
				</div>

				{/*<Test texture1={imageOne} texture2={imageTwo} />*/}
			</Sequence>
		</>
	);
};
