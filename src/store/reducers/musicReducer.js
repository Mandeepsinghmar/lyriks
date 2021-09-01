import { MUSIC_TYPES } from '../actions/musicActions';

const initialState = {
  tracks: [],
  list: {
    countries: [],
    globalGenres: [],
  },
  artistTracks: [],

  searchTracks: [],
  searchArtists: [],

  songDetails: null,
  artistDetails: null,
  currPlayingTrack: null,
  recommendedTracks: [],
  loading: false,
  songLoading: false,
  artistLoading: false,
  searchLoading: false,
  countryLoading: false,
  userCountry: null,
  currPlayingTracks: [],
};

const {
  GET_TRACKS,
  SET_CURR_SONG,
  GET_LIST,
  GET_SONG_DETAILS,
  GET_ARTIST_TRACKS,
  GET_ARTIST_DETAILS,
  GET_RECOMMENDED_TRACKS,
  GET_SEARCH_LIST,
  LOADING,
  ARTIST_LOADING,
  SONG_LOADING,
  SEARCH_LOADING,
  MORE_TRACKS_LOADING,
  COUNTRY_LOADING,
  GET_USER_COUNTRY,
} = MUSIC_TYPES;

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      };

    case SET_CURR_SONG:
      return {
        ...state,
        currPlayingTrack: action.payload.currPlayingTrack,
        currPlayingTracks: action.payload.currPlayingTracks,
      };
    case GET_USER_COUNTRY:
      return {
        ...state,
        userCountry: action.payload,
      };
    case GET_LIST:
      return {
        ...state,
        list: {
          countries: action.payload.countries,

          globalGenres: action.payload.global.genres,
        },
      };
    case GET_SONG_DETAILS:
      return {
        ...state,
        songDetails: action.payload,
      };
    case GET_ARTIST_DETAILS:
      return {
        ...state,
        artistDetails: action.payload,
      };
    case GET_ARTIST_TRACKS:
      return {
        ...state,
        artistTracks: action.payload,
      };
    case GET_SEARCH_LIST:
      return {
        ...state,
        searchArtists: action.payload.artists,
        searchTracks: action.payload.tracks,
      };
    case GET_RECOMMENDED_TRACKS:
      return {
        ...state,
        recommendedTracks: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ARTIST_LOADING:
      return {
        ...state,
        artistLoading: action.payload,
      };
    case SONG_LOADING:
      return {
        ...state,
        songLoading: action.payload,
      };
    case SEARCH_LOADING:
      return {
        ...state,
        searchLoading: action.payload,
      };
    case COUNTRY_LOADING:
      return {
        ...state,
        countryLoading: action.payload,
      };
    case MORE_TRACKS_LOADING:
      return {
        ...state,
        moreTracksLoading: action.payload,
      };
    default:
      return state;
  }
};
export default musicReducer;
