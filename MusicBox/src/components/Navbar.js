import { AppBar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import image from '../assets/images/music-notes.png';
export default function Navbar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				className="Navbar"
				sx={{ backgroundColor: 'rgba(136, 29, 29,0.9)' }}
			>
				<Typography variant="h5" sx={{ marginTop: '0.5rem' }}>
					<Link to="/">MusicBox</Link>
					<img src={image} alt="" />
				</Typography>
			</AppBar>
		</Box>
	);
}
