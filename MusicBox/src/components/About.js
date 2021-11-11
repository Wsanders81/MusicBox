import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

import AudioDBAPI from '../API/audioDB';
import Artist from './Artist';
import '../styles/About.css';
export default function About() {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ artist, setArtist ] = useState(null);
	const { artistName } = useParams();

	useEffect(
		() => {
			async function getArtist() {
				const res = await AudioDBAPI.getArtist(artistName);
				if (!res) {
					setIsLoading(false);
				}
				setArtist(res);
				setIsLoading(false);
			}
			getArtist();
		},
		[ artistName ]
	);

	if (isLoading)
		return (
			<Box className="About" sx={{ width: '100vw', height: '100vh' }}>
				<CircularProgress
					className="About-progress"
					color="success"
					size="20rem"
				/>
			</Box>
		);

	return (
		<Box
			className="About"
			sx={{ width: '100vw', height: '100vh', paddingTop: '5rem' }}
		>
			<Artist artist={artist} />
		</Box>
	);
}
