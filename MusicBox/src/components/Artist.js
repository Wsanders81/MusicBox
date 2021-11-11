import { Box, Typography, Button, Tooltip, Modal } from '@mui/material';
import { Language } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioDBAPI from '../API/audioDB';
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox';
import '../styles/Artist.css';
import facebook from '../assets/icons/facebook.svg';
import twitter from '../assets/icons/twitter.svg';
export default function Artist({ artist }) {
	const [ image, setImage ] = useState(
		artist ? artist.strArtistFanart : null
	);
    const [ albums, setAlbums ] = useState(null)
    const [ videos, setVideos ] = useState(null)
    const [ open, setOpen ] = useState(false)
    const [ openTwo, setOpenTwo ] = useState(false)
    useEffect(()=> {
        function openModal() {
            setOpen(true)
        } openModal()  
    }, [albums])
    useEffect(()=> {
        function openModal() {
            setOpenTwo(true)
        } openModal()
    }, [videos])
	const navigate = useNavigate();
	const handleBackClick = () => {
		navigate('/');
	};


	const fail = (
		<Box sx={{ marginTop: '5rem' }}>
			<Typography
				className="Artist-failed-query"
				variant="h5"
				sx={{ paddingBottom: '2rem' }}
			>
				Hmmm, We couldn't quite find what you're looking for please try
				again
			</Typography>
			<Button
				sx={{ backgroundColor: '#209e9e' }}
				variant="contained"
				onClick={handleBackClick}
			>
				Go Back
			</Button>
		</Box>
	);
	if (!artist) {
		return fail;
	}
	const handleClick = (e) => {
		setImage(e.target.src);
	};
    const handleClose = () => {
        setOpen(false)
        setAlbums(null)
    }
    const handleCloseTwo = () => {
        setOpenTwo(false)
        setVideos(null)
    }
    
    const handleAlbumsClick = async() => {
        const res = await AudioDBAPI.getAlbumInfo(artist.idArtist)
        setAlbums(res)
        
        
    }
    const handleVideosClick = async() => {
        const res = await AudioDBAPI.getVideos(artist.idArtist)
        
        setVideos(res)
    }
	const facebookLink = 'https://' + artist.strFacebook;
	const twitterLink = 'https://' + artist.strTwitter;
	const websiteLink = 'https://' + artist.strWebsite;

	return (
        <>
		<Box
			className="Artist"
			sx={{
				height          : '85vh',
				width           : '100vw',
				backgroundColor : 'white',
				margin          : 'auto',
				display         : 'flex'
			}}
		>
			<Box
				className="Artist-img-container"
				sx={{ width: '55%', height: '70%', flexDirection: 'column' }}
			>
				<img className="Artist-img" alt="artist" src={image} />

				<Box className="Artist-icon-container">
					<a href={facebookLink}>
						<Tooltip title="Facebook">
							<img
								className="Artist-icon"
								alt="facebook"
								src={facebook}
							/>
						</Tooltip>
					</a>
					<a href={twitterLink}>
						<Tooltip title="Twitter">
							<img
								className="Artist-icon"
								alt="facebook"
								src={twitter}
							/>
						</Tooltip>
					</a>
					<a href={websiteLink}>
                        <Tooltip title="Website">
						<Language sx={{fontSize: "1.95rem", color: "rgba(136, 29, 29,0.9)"}}  className="Artist-icon" />
                        </Tooltip>
					</a>
				</Box>
				<Box className="Artist-thumbnail-container">
					<img
						className="Artist-thumbnail"
						alt=""
						src={artist.strArtistClearart}
						onClick={handleClick}
					/>
					<img
						className="Artist-thumbnail"
						alt=""
						src={artist.strArtistFanart}
						onClick={handleClick}
					/>
					<img
						className="Artist-thumbnail"
						alt=""
						src={artist.strArtistFanart2}
						onClick={handleClick}
					/>
					<img
						className="Artist-thumbnail"
						alt=""
						src={artist.strArtistFanart3}
						onClick={handleClick}
					/>
					<img
						className="Artist-thumbnail"
						alt=""
						src={artist.strArtistWideThumb}
						onClick={handleClick}
					/>
				</Box>
				<Box
					sx={{
						paddingTop  : '1rem',
						paddingLeft : '1rem',
						maxHeight   : '25%'
					}}
				>
                    
					<Typography
						className="Artist-info"
						
						align="left"
					>
						Artist : {artist.strArtist}
					</Typography>
					<Typography
						className="Artist-info"
						variant="body2"
						align="left"
					>
						Year Formed : {artist.intFormedYear}
					</Typography>
					<Typography
						className="Artist-info"
						variant="body2"
						align="left"
					>
						Origin : {artist.strCountry}
					</Typography>
					<Typography
						className="Artist-info"
						variant="body2"
						align="left"
					>
						Record Label : {artist.strLabel}
					</Typography>
					<Typography
						className="Artist-info"
						variant="body2"
						align="left"
					>
						Genre : {artist.strGenre}
					</Typography>
                <Button sx={{color:'#209e9e'}} 
                variant="outlined" className="Artist-link" onClick={handleAlbumsClick}>Albums</Button>
                <Button sx={{color:'#209e9e'}} 
                variant="outlined" className="Artist-link" onClick={handleVideosClick}>Videos</Button>
				</Box>
			</Box>
			<Box
				className="Artist-biography"
				sx={{ width: '50%', overflow: 'scroll' }}
			>
				<img
					className="Artist-banner"
					src={artist.strArtistBanner}
					alt="banner"
				/>

				<Typography
					variant="body2"
					sx={{ padding: '1rem' }}
					align="left"
				>
					{artist.strBiographyEN}
				</Typography>
				<Typography variant="body2" align="left" />
			</Box>
           {albums !== null ? <Modal open={open} onClose={handleClose}>
                <SimpleReactLightbox>
                    <Box 
                        className="Artist-modal" 
                        sx={{height: '80%', width: '80%', 
                        textAlign:"center", backgroundColor: "rgba(136, 29, 29,0.9)"}}>
                        <Typography 
                                className="Artist-modal-text" 
                                sx={{paddingBottom: '1rem', 
                                margin:'auto',
                                paddingTop:"1rem",
                                color: "white"}}>
                            {artist.strArtist.toUpperCase()} DISCOGRAPHY
                        </Typography>
                        <Box sx={{height: '100%'}}>
                            <SRLWrapper>
                        {albums.map(album => { 
                            if(album.strAlbumThumb){
                               
                            return (
                            
                            <img alt={album.strAlbumStripped} 
                                className="Artist-album-img" 
                                src={album.strAlbumThumb} 
                                key={album.strAlbumThumb}
                                srl_gallery_image="true"
                                /> 
                                        )
                            } else {return null}})}
                            </SRLWrapper>
                        </Box>
                    </Box>
                </SimpleReactLightbox>
                   </Modal> : null}
                   {videos !== null ? <Modal open={openTwo} onClose={handleCloseTwo}>
                
                    <Box 
                        className="Artist-modal" 
                        sx={{height: '80%', 
                        width: '80%', 
                        textAlign:"center", 
                        backgroundColor: "rgba(136, 29, 29,0.9)"}}>
                        <h2 className="Artist-modal-text">
                            {artist.strArtist.toUpperCase()} YOUTUBE VIDEOS
                        </h2>
                        <Box className="Artist-videos" >
                            
                        {videos.map(video => { 
                            if(video.strMusicVid){
                                
                            const str = video.strMusicVid
                            const subStr = str.substr(str.lastIndexOf("=")+1)
                            const url = "https://img.youtube.com/vi/" + subStr + "/default.jpg"
                            
                            const img = <Box className="Artist-video" sx={{width: '4rem'}}>
                                        <Tooltip title={video.strTrack}>
                                        <a href={str} target="_blank" rel="noreferrer">
                                        <img alt={video.strTrack} 
                                        className="Artist-album-img" 
                                        src={url} 
                                        key={video.strMusicVid}
                                        />
                                        </a>
                                        </Tooltip>
                                        
                                        </Box>
                            return (
                                
                                img
                                
                                        )
                            } else {
                                return null
                                }
                            }
                        )}
                            
                        </Box>
                    </Box>
                   </Modal> : null}
		</Box>
        
       </>
	);
}
