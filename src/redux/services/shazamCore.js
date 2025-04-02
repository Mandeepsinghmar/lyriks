import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (offset) => `/search?term=rock&limit=50&offset=${offset}`,
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `/search?term=${genre}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `/search?term=${countryCode}&limit=50`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm, offset) =>
        `/search?term=${searchTerm}&limit=50&offset=${offset}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/get-details?id=${artistId}`,
    }),
    getArtistTopSongs: builder.query({
      query: (artistId) => `/artists/get-top-songs?id=${artistId}`,
    }),
    getSongId: builder.query({
      query: ({ songid }) => `/shazam-songs/get-details?id=${songid}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/songs/v2/get-details?id=${songid}`,
    }),

    getSongRelated: builder.query({
      query: ({ songid }) => `/v1/tracks/related?track_id=${songid}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongIdQuery,
  useGetSongDetailsV1Query,
  useGetArtistTopSongsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
