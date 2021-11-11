import axios from 'axios';
const BASE_URL = 'https://theaudiodb.com/api/v1/json/1/';

export default class AudioDBAPI {
	static async getArtist(artist) {
		try {
			const url = BASE_URL + 'search.php?s=' + artist;
			const res = await axios.get(url);
			return res.data.artists[0];
		} catch (e) {
			console.log(e);
		}
	}
	static async getAlbumInfo(artistID) {
		try {
			const url = BASE_URL + 'album.php?i=' + artistID;
			const res = await axios.get(url);
			return res.data.album;
		} catch (e) {
			console.log(e);
		}
	}
	static async getVideos(artistID) {
		try {
			const url = BASE_URL + 'mvid.php?i=' + artistID;
			const res = await axios.get(url);
			return res.data.mvids;
		} catch (e) {
			console.log(e);
		}
	}
}
