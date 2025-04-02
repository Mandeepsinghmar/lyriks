import React from 'react';

import SongBar from './SongBar';

const RelatedSongs = ({
  data,
  songDetails,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">
      {artistId
        ? `${songDetails?.attributes?.name} top songs:`
        : 'Related Songs:'}
    </h1>

    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${artistId}-${song?.track ? song?.track.key : song?.id}-${i}`}
          song={song.track ? song.track : song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          songDetails={songDetails}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
