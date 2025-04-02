import React from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import {
  useGetSongsBySearchQuery,
  useGetTopChartsQuery,
} from '../redux/services/shazamCore';

const TopCharts = () => {
  const { data, isFetching, error } = useGetSongsBySearchQuery('hindi songs');

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.hits?.map((song, i) => (
          <SongCard
            key={song.track.id}
            song={song.track}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.tracks?.hits}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
