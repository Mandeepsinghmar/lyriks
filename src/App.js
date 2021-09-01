import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Sidebar, MusicPlayer, BottomNavbar, HomePage, SongDetails, Artist, Explore, Artists, CountrySongs } from './components';
import TopNavbar from './components/TopNavbar';
import { getUserCountry } from './store/actions/musicActions';
import './App.scss';

const App = () => {
  const { currPlayingTrack } = useSelector((state) => state.musicReducer);
  const [currMusic, setCurrMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrMusic(currPlayingTrack);

    if (currPlayingTrack) setIsPlaying(true);
  }, [currPlayingTrack]);

  useEffect(() => {
    const userCountry = JSON.parse(localStorage.getItem('userCountry'));

    if (!userCountry) dispatch(getUserCountry());
  }, []);

  return (
    <div className="main-home-container">
      <TopNavbar />
      <section className="home-music-container">
        <div className="sidebar-home">
          <Sidebar />
        </div>
        <div className="main-home">
          <Routes>
            <Route path="/">
              <HomePage />
            </Route>

            <Route path="/explore">
              <Explore />
            </Route>
            <Route path="/country-tracks">
              <CountrySongs />
            </Route>
            <Route path="/artists">
              <Artists />
            </Route>
            <Route path="/songs/:songId">
              <SongDetails />
            </Route>
            <Route path="/artists/:artistId">
              <Artist />
            </Route>
          </Routes>
        </div>
      </section>
      {currMusic
        ? <MusicPlayer music={currMusic} isPlaying={isPlaying} setPlayPauseClicked={setIsPlaying} />
        : <div style={{ marginTop: '70px' }} />}

      <div className="bottom-navbar">
        <BottomNavbar />

      </div>
    </div>
  );
};

export default App;
