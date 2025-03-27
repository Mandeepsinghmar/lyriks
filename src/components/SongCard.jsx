import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i, isSearch }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song: song?.attributes, data, i }));
    dispatch(playPause(true));
  };
  console.log({ song, data, activeSong });
  return (
    <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <div className='relative w-full h-56 group'>
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === (song?.attributes?.name || song?.title)
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song.attributes || song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            // handlePlay={() => handlePlayClick(song.attributes, i)}
          />
        </div>
        <img
          alt='song_img'
          src={song?.attributes?.artwork.url || song.images.coverart}
          className='w-full h-full rounded-lg'
        />
      </div>

      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg text-white truncate'>
          <Link to={`/songs/${song?.id || song?.key}`}>
            {song?.attributes?.name || song.title}
          </Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          {song?.relationships?.artists ? (
            <Link
              to={
                song?.relationships?.artists
                  ? `/artists/${song?.relationships.artists.data[0].id}`
                  : '/top-artists'
              }
            >
              {song?.attributes?.artistName}
            </Link>
          ) : (
            <Link to={song ? `/artists/${song?.subTitle}` : '/top-artists'}>
              {song?.subtitle}
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
