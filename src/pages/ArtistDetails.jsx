import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import {
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} from '../redux/services/shazamCore';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const ArtistDetails = () => {
  const dispatch = useDispatch();

  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);
  const { data: artistSongs, isFetching: isFetchingArtistSongs } = useGetArtistTopSongsQuery(artistId);
  if (isFetchingArtistDetails && isFetchingArtistSongs) return <Loader title="Loading artist details..." />;

  if (error) return <Error />;
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(
      setActiveSong({
        song: song?.attributes ? song.attributes : song,
        data: artistSongs?.data,
        i,
      }),
    );
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />

      <RelatedSongs
        data={artistSongs?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        songDetails={artistData?.data[0]}
      />
    </div>
  );
};

export default ArtistDetails;
