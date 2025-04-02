
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongIdQuery,
  useGetSongsBySearchQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songIdData, error } = useGetSongIdQuery({ songid });

  const songId = songIdData?.resources?.songs
    ? Object.keys(songIdData.resources.songs)[0]
    : null;

  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(
    { songid: songId },
    {
      skip: !songId, // Skip if songId is null or undefined
    },
  );

  const artistName = songData?.data?.[0]?.attributes?.artistName || null;

  const { data, isFetching: isFetchingRelatedSongs } = useGetSongsBySearchQuery(
    artistName,
    {
      skip: !artistName, // Skip if artistName is null or undefined
    },
  );

  if (isFetchingSongDetails || !songData) return <Loader title="Searching song details" />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(
      setActiveSong({
        song: song?.attributes ? song.attributes : song,

        data: data?.tracks?.hits,
        i,
      }),
    );
    dispatch(playPause(true));
  };

  const handlePlayCurrentSong = () => {
    dispatch(
      setActiveSong({
        song: songData?.data ? songData?.data[0].attributes : {},
        data: data?.tracks?.hits,
        i: -1,
      }),
    );
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        songData={songData?.data && songData?.data[0]}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayCurrentSong}
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

      {
 isFetchingRelatedSongs ? <Loader title="Searching song details" /> : (
   <RelatedSongs
     data={data?.tracks?.hits}
     artistId={artistId}
     isPlaying={isPlaying}
     activeSong={activeSong}
     handlePauseClick={handlePauseClick}
     handlePlayClick={handlePlayClick}
     songDetails
   />
 )

}

    </div>
  );
};

export default SongDetails;
