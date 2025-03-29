/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongDetailsV1Query,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldFetchAnother, setShouldFetchAnother] = useState(false);

  const { data: songData } = useGetSongDetailsQuery({ songid });
  const { data: realSongData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsV1Query(
      {
        songid: songData?.data?.[0]?.id || songid,
      },
      {
        // Only run the query when we have a valid songid
        skip: !shouldFetch,
      }
    );
  const {
    data,
    isFetching: isFetchinRelatedSongs,
    error,
  } = useGetSongRelatedQuery(
    { songid: songData?.data?.[0]?.id || songid },
    { skip: !shouldFetchAnother }
  );

  useEffect(() => {
    // Set a timeout to trigger the query after 1 seconds
    const queryTimeout = setTimeout(() => {
      setShouldFetch(true); // This will trigger the query
    }, 3000); // 1000 milliseconds = 1 seconds

    const queryTimeout2 = setTimeout(() => {
      setShouldFetchAnother(true); // This will trigger the query
    }, 6000); // 1000 milliseconds = 1 seconds

    // Cleanup function to clear the timeout if component unmounts
    return () => {
      clearTimeout(queryTimeout);
      clearTimeout(queryTimeout2);
    };
  }, [songid]);

  if (isFetchingSongDetails && isFetchinRelatedSongs)
    return <Loader title='Searching song details' />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(
      setActiveSong({
        song: song?.attributes ? song.attributes : song,
        data,
        i,
      })
    );
    dispatch(playPause(true));
  };

  return (
    <div className='flex flex-col'>
      <DetailsHeader
        artistId={artistId}
        songData={realSongData || songData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />

      <div>
        {songData?.resources?.lyrics &&
          Object.values(songData.resources.lyrics)[0]?.attributes?.text && (
            <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>
          )}

        <div className='mt-5 mb-10'>
          {songData?.resources?.lyrics ? (
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
          ) : null}
        </div>
      </div>

      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        songDetails
      />
    </div>
  );
};

export default SongDetails;
