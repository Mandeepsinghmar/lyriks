import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';

import { getList, getTracks } from '../../store/actions/musicActions';
import GridMusicCard from '../GridMusicCard';
import Banner from '../../assets/images/Banner.svg';
import HorizontalSrollbar from '../HorizontalScrollbar';
import './homePage.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const { tracks, list, loading } = useSelector((state) => state.musicReducer);
  const [genre, setGenre] = useState('genre-global-chart-1');
  const [genreType, setGenreType] = useState('Pop');

  useEffect(() => {
    dispatch(getList());
    dispatch(getTracks(genre));
  }, [genre]);

  return (
    <div className="Container">
      <div className="list-container">
        {list.globalGenres?.length > 0 ? (
          <HorizontalSrollbar
            data={list.globalGenres}
            setList={setGenre}
            setListType={setGenreType}
          />
        ) : (

          <div
            style={{
              margin: ' 0px auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader type="Oval" color="blue" height={30} width={30} />
          </div>
        )}
      </div>
      {list.globalGenres?.length > 0 && (
        <div style={{ margin: '0px 20px 20px 40px' }}>
          <h2 style={{ fontWeight: '900' }}>
            Top{' '}
            <span
              style={{ fontSize: '2rem', borderBottom: ' 1px solid white' }}
            >
              {genreType}
            </span>{' '}
            songs of this week
          </h2>
        </div>
      )}

      <div className="music-card-container">
        {!loading ? (
          <>
            {tracks
              && tracks.map((song, idx) => (
                <GridMusicCard
                  key={song.key}
                  tracks={tracks}
                  image={song.images?.coverart ? song.images.coverart : Banner}
                  title={song.title}
                  subTitle={song.subtitle}
                  url={
                    song.hub?.actions
                    && song.hub.actions[1]
                    && song.hub.actions[1]?.uri
                      ? song.hub.actions[1].uri
                      : 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9c/7e/20/9c7e20aa-f4ec-c6d1-3fb9-2a3f7a90c456/mzaf_1937335649665882562.plus.aac.p.m4a'
                  }
                  songId={song.key}
                  artistId={
                    song.artists && song.artists[0] && song.artists[0].id
                  }
                  idx={idx}
                />
              ))}
          </>
        ) : (
          <div>
            <Loader type="Oval" color="blue" height={370} width={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
