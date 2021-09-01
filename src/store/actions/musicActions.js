import { getData, fetchData } from '../../utils/makeRequest';

export const MUSIC_TYPES = {
  GET_TRACKS: 'GET_TRACKS',
  SET_CURR_SONG: 'SET_CURR_SONG',
  GET_LIST: 'GET_LIST',
  GET_SONG_DETAILS: 'GET_SONG_DETAILS',
  GET_ARTIST_TRACKS: 'GET_ARTIST_TRACKS',
  GET_ARTIST_DETAILS: 'GET_ARTIST_DETAILS',
  GET_RECOMMENDED_TRACKS: 'GET_RECOMMENDED_TRACKS',
  GET_SEARCH_LIST: 'GET_SEARCH_LIST',
  LOADING: 'LOADING',
  ARTIST_LOADING: 'ARTIST_LOADING',
  SONG_LOADING: 'SONG_LOADING',
  SEARCH_LOADING: 'SEARCH_LOADING',
  MORE_TRACKS_LOADING: 'MORE_TRACKS_LOADING',
  COUNTRY_LOADING: 'COUNTRY_LOADING',
  GET_USER_COUNTRY: 'GET_USER_COUNTRY',
};
const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl1 = process.env.REACT_APP_API_URL_1;
const apiKey1 = process.env.REACT_APP_IP_GEO_KEY;

export const getTracks = (listId) => async (dispatch) => {
  try {
    dispatch({ type: MUSIC_TYPES.LOADING, payload: true });
    dispatch({ type: MUSIC_TYPES.GET_TRACKS, payload: null });
    const res = await getData(
      `${apiUrl}/charts/track/?locale=en-US&listId=${listId}&pageSize=20&startFrom=0`,
    );

    dispatch({ type: MUSIC_TYPES.GET_TRACKS, payload: res.data.tracks });

    dispatch({ type: MUSIC_TYPES.LOADING, payload: false });
  } catch (err) {
    console.log(err);
  }
};

export const getList = () => async (dispatch) => {
  try {
    dispatch({ type: MUSIC_TYPES.LOADING, payload: true });
    const res = await getData(`${apiUrl}/charts/list`);
    dispatch({ type: MUSIC_TYPES.GET_LIST, payload: res.data });
    dispatch({ type: MUSIC_TYPES.LOADING, payload: false });
  } catch (err) {
    console.log(err);
  }
};
export const getUserCountry = () => async (dispatch) => {
  try {
    dispatch({ type: MUSIC_TYPES.COUNTRY_LOADING, payload: true });
    const res = await getData(`${apiUrl}/charts/list`);
    const res1 = await fetch('https://api.ipify.org?format=json');
    const data = await res1.json();
    const res2 = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${apiKey1}&ipAddress=${data.ip}`,
    );
    const data1 = await res2.json();
    const countryId = data1.location.country;
    if (countryId) {
      const country = res.data.countries.filter((item) => item.id === countryId);
      localStorage.setItem('userCountry', JSON.stringify({ id: country[0].id, listid: country[0].listid, name: country[0].name }));
      dispatch({ type: MUSIC_TYPES.GET_USER_COUNTRY, payload: { id: country[0].id, listid: country[0].listid, name: country[0].name } });
      dispatch({ type: MUSIC_TYPES.COUNTRY_LOADING, payload: false });
      dispatch({ type: MUSIC_TYPES.LOADING, payload: true });
      dispatch({ type: MUSIC_TYPES.GET_TRACKS, payload: null });
      const res3 = await getData(
        `${apiUrl}/charts/track/?locale=en-US&listId=${country[0].listid}&pageSize=20&startFrom=0`,
      );

      dispatch({ type: MUSIC_TYPES.GET_TRACKS, payload: res3.data.tracks });

      dispatch({ type: MUSIC_TYPES.LOADING, payload: false });
    }
  } catch (err) {
    console.log(err);
  }
};
export const getSongDetails = (songId) => async (dispatch) => {
  try {
    dispatch({ type: MUSIC_TYPES.SONG_LOADING, payload: true });
    const res = await getData(`${apiUrl}/songs/get-details?key=${songId}`);
    dispatch({
      type: MUSIC_TYPES.GET_SONG_DETAILS,
      payload: res.data,
    });
    dispatch({ type: MUSIC_TYPES.SONG_LOADING, payload: false });
  } catch (err) {
    console.log(err);
  }
};
export const getArtistDetails = (artistId) => async (dispatch) => {
  try {
    dispatch({ type: MUSIC_TYPES.ARTIST_LOADING, payload: true });
    const res = await fetchData(
      `https://shazam-core.p.rapidapi.com/v1/artists/details?artist_id=${artistId}`,
    );
    dispatch({
      type: MUSIC_TYPES.GET_ARTIST_DETAILS,
      payload: res.data,
    });
    dispatch({ type: MUSIC_TYPES.ARTIST_LOADING, payload: false });
  } catch (err) {
    console.log(err);
  }
};
export const getArtistTracks = (artistId) => async (dispatch) => {
  try {
    dispatch({ type: MUSIC_TYPES.LOADING, payload: true });
    const res = await getData(
      `${apiUrl}/songs/list-artist-top-tracks?id=${artistId}`,
    );
    dispatch({
      type: MUSIC_TYPES.GET_ARTIST_TRACKS,
      payload: res.data.tracks,
    });
    dispatch({ type: MUSIC_TYPES.LOADING, payload: false });
  } catch (err) {
    console.log(err);
  }
};
export const getSearchList = (searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: MUSIC_TYPES.SEARCH_LOADING, payload: true });

    const res = await getData(
      `${apiUrl}/search?term=${searchTerm}&locale=en-US&offset=0&limit=5"`,
    );

    dispatch({
      type: MUSIC_TYPES.GET_SEARCH_LIST,
      payload: res.data,
    });

    dispatch({ type: MUSIC_TYPES.SEARCH_LOADING, payload: false });
  } catch (err) {
    console.log(err);
  }
};
export const getRecommendedTracks = (songId) => async (dispatch) => {
  try {
    dispatch({ type: MUSIC_TYPES.LOADING, payload: true });
    const res = await fetchData(
      `${apiUrl1}/v1/tracks/related?track_id=${songId}&limit=20`,
    );
    dispatch({
      type: MUSIC_TYPES.GET_RECOMMENDED_TRACKS,
      payload: res.data,
    });
    dispatch({ type: MUSIC_TYPES.LOADING, payload: false });
  } catch (err) {
    console.log(err);
    dispatch({ type: MUSIC_TYPES.LOADING, payload: false });
  }
};

export const setCurrentSong = (currPlayingTrack, currPlayingTracks) => ({
  type: MUSIC_TYPES.SET_CURR_SONG,
  payload: { currPlayingTrack, currPlayingTracks },
});
