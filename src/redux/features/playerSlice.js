import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      // if (action.payload.song?.hub?.actions[1].uri) {
      //   // state.activeSong = action.payload.song.hub?.actions[1].uri;
      //   state.activeSong = action.payload.song;
      // } else if (action.payload.song?.previews[0].url) {
      //   state.activeSong = action.payload.song;
      // } else {
      state.activeSong = action.payload.song;
      // }

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data?.tracks.hits;
      } else {
        state.currentSongs = action.payload.data;
      }
      state.currentIndex = action.payload.i;

      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else if (state.currentSongs[action.payload]?.attributes) {
        state.activeSong = state.currentSongs[action.payload].attributes;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else if (state.currentSongs[action.payload]?.attributes) {
        state.activeSong = state.currentSongs[action.payload].attributes;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
