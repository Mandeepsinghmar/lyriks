/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';
import Loader from './Loader';
import Error from './Error';

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
      activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className='font-bold text-base text-white mr-3'>{i + 1}.</h3>
    <div className='flex-1 flex flex-row justify-between items-center'>
      <img
        className='w-20 h-20 rounded-lg'
        src={song?.images.coverart}
        alt={song?.title}
      />
      <div className='flex-1 flex flex-col justify-center mx-3'>
        <Link to={`/songs/${song.key}`}>
          <p className='text-xl font-bold text-white'>{song?.title}</p>
        </Link>
        <Link
          to={song ? `/artists/${song?.artists[0].adamid}` : '/top-artists'}
        >
          <p className='text-base text-gray-300 mt-1'>{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, isLoading, error } = useGetTopChartsQuery(undefined, {
    skip: !shouldFetch, // This will skip the query until shouldFetch is true
  });

  const divRef = useRef(null);

  useEffect(() => {
    // Set a timeout to trigger the query after 3 seconds
    const queryTimeout = setTimeout(() => {
      setShouldFetch(true); // This will trigger the query
    }, 1000); // 3000 milliseconds = 3 seconds

    // Cleanup function to clear the timeout if component unmounts
    return () => clearTimeout(queryTimeout);
  }, []);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  });

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
  // if (error) return <Error />;

  if (!data && !error) return <Loader title='Loading Top Charts...' />;

  return (
    <>
      {data?.tracks?.hits?.length && (
        <div
          ref={divRef}
          className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full w-full flex flex-col  '
        >
          <div className='w-full flex flex-col'>
            <div className='flex flex-row justify-between items-center'>
              <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
              <Link to='/top-charts'>
                <p className='text-gray-300 text-base cursor-pointer'>
                  See more
                </p>
              </Link>
            </div>

            <div className='mt-4 flex flex-col gap-1'>
              {data?.tracks?.hits?.map((song, i) => (
                <TopChartCard
                  key={song.track.id}
                  song={song.track}
                  i={i}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePauseClick={handlePauseClick}
                  handlePlayClick={() => handlePlayClick(song.track, i)}
                />
              ))}
            </div>
          </div>

          <div className='w-full flex flex-col mt-8'>
            <div className='flex flex-row justify-between items-center'>
              <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
              <Link to='/top-artists'>
                <p className='text-gray-300 text-base cursor-pointer'>
                  See more
                </p>
              </Link>
            </div>

            <Swiper
              slidesPerView='auto'
              spaceBetween={15}
              freeMode
              centeredSlides
              centeredSlidesBounds
              modules={[FreeMode]}
              className='mt-4'
            >
              {data?.tracks?.hits?.map((song, i) => (
                <SwiperSlide
                  key={i}
                  style={{ width: '25%', height: 'auto' }}
                  className='shadow-lg rounded-full animate-slideright'
                >
                  <Link
                    to={
                      song
                        ? `/artists/${song?.track.artists[0].adamid}`
                        : '/top-artists'
                    }
                  >
                    <img
                      src={song?.track?.images.background}
                      alt='Name'
                      className='rounded-full w-full object-cover'
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default TopPlay;
