/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongDetailsV1Query,
  useGetSongIdQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldFetchAnother, setShouldFetchAnother] = useState(false);

  const { data: songIdData, error } = useGetSongIdQuery({ songid });
  const { data: songData } = useGetSongDetailsQuery(
    { songid: songIdData && Object.keys(songIdData?.resources?.songs)[0] },
    {
      // Only run the query when we have a valid songid
      skip: songIdData && !Object.keys(songIdData?.resources?.songs)[0],
    },
  );

  // const {
  //   data,
  //   isFetching: isFetchinRelatedSongs,
  //   error,
  // } = useGetSongRelatedQuery(
  //   { songid: songData?.data?.[0]?.id || songid },
  //   { skip: !shouldFetchAnother }
  // );

  // if (isFetchingSongDetails && isFetchinRelatedSongs)
  //   return <Loader title='Searching song details' />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // const handlePlayClick = (song, i) => {
  //   dispatch(
  //     setActiveSong({
  //       song: song?.attributes ? song.attributes : song,
  //       data,
  //       i,
  //     })
  //   );
  //   dispatch(playPause(true));
  // };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        songData={songData?.data[0]}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        // handlePlayClick={handlePlayClick}
      />

      <div>
        {/* {songData?.data[0].attributes.hasLyrics && (
          <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>
        )} */}

        <div className="mt-5 mb-10">
          {/* {songData?.resources?.lyrics ? (
            Object.values(songData.resources.lyrics)[0]?.attributes?.text ? (
              Object.values(songData.resources.lyrics)[0].attributes.text.map(
                (line, i) => (
                  <p
                    key={`lyrics-${line}-${i}`}
                    className='text-gray-400 text-base my-1'
                  >
                    {line}
                  </p>
                )
              )
            ) : (
              <p className='text-gray-400 text-base my-1'>
                Sorry, No lyrics found!
              </p>
            )
          ) : null} */}
        </div>
      </div>

      {/* <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        songDetails
      /> */}
    </div>
  );
};

export default SongDetails;
