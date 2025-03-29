import React from 'react';
import { Link } from 'react-router-dom';
import PlayPause from './PlayPause';

const DetailsHeader = ({
  artistId,
  artistData,
  songData,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  console.log(songData);

  return (
    <div className='relative w-full flex flex-col'>
      <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28' />

      <div className='absolute inset-0 flex items-center'>
        <img
          alt='profile'
          src={artistId ? artistData?.avatar : songData?.images?.coverart}
          className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
        />

        <div className='ml-5'>
          <div className='flex justify-between gap-10 '>
            <p className='font-bold sm:text-3xl text-xl text-white'>
              {artistId ? artistData?.attributes?.name : songData?.title}
            </p>
            {!artistId && (
              <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={songData}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
              />
            )}
          </div>

          {!artistId && (
            <Link
              to={`/artists/${
                songData?.artists && songData?.artists[0]?.adamid
              }`}
            >
              <p className='text-base text-gray-400 mt-2'>
                {songData?.subtitle && songData.subtitle}
              </p>
            </Link>
          )}

          <p className='text-base text-gray-400 mt-2'>
            {artistId
              ? artistData?.attributes?.genreNames[0]
              : songData?.genres?.primary}
          </p>
          <p className=' mt-3 text-sm text-gray-300 leading-relaxed'>
            {artistData?.attributes?.artistBio}
          </p>
        </div>
      </div>

      <div className='w-full sm:h-40 h-24' />
    </div>
  );
};

export default DetailsHeader;
