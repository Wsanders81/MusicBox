import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactRotatingText from 'react-rotating-text';

import '../styles/Home.css';
export default function Home() {
	const [ values, setValues ] = useState({ artist: '' });
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((values) => ({
			...values,
			[name] : value
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (values.artist === '') {
			return navigate('/');
		}
		return navigate(
			`artist/${values.artist.toLowerCase().replace(' ', '_')}`
		);
	};
	return (
		<Box sx={{ height: '100vh' }} className="Home">
			<Typography variant="h3" className="Home-header">
				Welcome to MusicBox
			</Typography>

			<Typography className="Home-rotating-text" variant="h4">
				Discover :
				<ReactRotatingText
					items={[
						' Artists',
						' Albums',
						' Tracks',
						' Videos',
						' All In One Place'
					]}
				/>
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					id="artist"
					variant="filled"
					label="Search for an Artist"
					name="artist"
					className="Home-textfield"
					value={values.artist}
					onChange={handleChange}
				/>
				<div className="Home-button-container">
					<Button
						type="submit"
						variant="contained"
						sx={{ backgroundColor: '#209e9e' }}
					>
						Search
					</Button>
				</div>
			</form>
		</Box>
	);
}
