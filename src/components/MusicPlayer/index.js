import React, { useEffect, useRef, useState } from 'react';
import './musicPlayer.scss';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Slider from '@material-ui/core/Slider';
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime } from '../../utils/formatTime';
import { setCurrentSong } from '../../store/actions/musicActions';

function MusicPlayer({ music, isPlaying, setPlayPauseClicked }) {
  const [{ id, title, subTitle, image, url, artistId, idx }, setCurrTrack] = useState(music && music);
  const [repeatClicked, setRepeatClicked] = useState(false);
  const [prevClicked, setPrevClicked] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);
  const [volumeClicked, setVolumeClicked] = useState(false);
  const [volume, setVolume] = useState(100);
  const [seekTime, setSeekTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currTime, setCurrTime] = useState(0);

  const { currPlayingTracks, currPlayingTrack } = useSelector((state) => state.musicReducer);

  const dispatch = useDispatch();
  const audioElement = useRef();

  const handleSeekChange = (event, newValue) => {
    audioElement.current.currentTime = (newValue * duration) / 100;
    setSeekTime(newValue);
  };
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };
  useEffect(() => {
    setCurrTrack(music);
  }, [music]);

  useEffect(() => {
    if (isPlaying) {
      const playPromise = audioElement.current.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
        })
          .catch(() => {
          });
      }
    } else {
      audioElement.current.pause();
    }

    audioElement.current.loop = repeatClicked;
    audioElement.current.volume = volume / 100;
    audioElement.current.muted = volumeClicked;
    audioElement.current.onloadeddata = () => {
      if (audioElement.current != null) setDuration(audioElement.current.duration);
    };
    setInterval(() => {
      if (audioElement.current !== null) setCurrTime(audioElement.current.currentTime);
    });
  });

  useEffect(() => {
    setSeekTime(currTime / (duration / 100));
  }, [currTime, duration]);

  useEffect(() => {
    audioElement.current.onended = () => {
      if (currPlayingTracks) {
        setNextClicked(true);
      }
      setPlayPauseClicked(false);
    };
  });

  useEffect(() => {
    if (nextClicked) {
      const currTrackIdx = (idx + 1) % currPlayingTracks.length;
      dispatch(setCurrentSong(currPlayingTracks[currTrackIdx], currPlayingTracks));
      setCurrTrack(currPlayingTrack);
      setNextClicked(false);
    }
    if (prevClicked) {
      let currTrackIdx = (idx - 1) % currPlayingTracks.length;
      if (idx - 1 < 0) {
        currTrackIdx = currPlayingTracks.length - 1;
      }
      dispatch(setCurrentSong(currPlayingTracks[currTrackIdx], currPlayingTracks));
      setCurrTrack(currPlayingTrack);
      setPrevClicked(false);
    }
  }, [nextClicked, prevClicked]);

  return (
    <div className="footer-player">
      <div className="playback">
        {!Number.isNaN(seekTime) && (
          <Slider
            className="playback-completed"
            value={seekTime}
            onChange={handleSeekChange}
          />
        )}
      </div>
      <Button
        startIcon={(
          <Avatar
            className={isPlaying ? 'image rotate' : 'image'}
            variant="square"
            src={image || null}
            alt={title}
          />
        )}
        className="curr-music-container"
        style={{ display: 'flex' }}
      >
        <div className="curr-music-details">
          <Link to={`/songs/${id}`}>
            <p style={{ color: '#edf6f9' }}>
              {title && title.length > 20
                ? `${title.substring(0, 20)}...`
                : title}
            </p>
          </Link>
          <Link to={`/artists/${artistId}`}>
            <p style={{ color: '#abe4f7' }}>
              {subTitle && subTitle.length > 20
                ? `${subTitle.substring(0, 20)}...`
                : subTitle}
            </p>
          </Link>
        </div>
      </Button>
      <div className="playback-controls">

        {repeatClicked ? (
          <Button
            onClick={() => setRepeatClicked(!repeatClicked)}
            style={{ cursor: 'pointer', color: '#edf6f9' }}
          >
            <RepeatOneIcon fontSize="large" />
          </Button>
        ) : (
          <Button
            onClick={() => setRepeatClicked(!repeatClicked)}
            style={{ cursor: 'pointer', color: '#edf6f9' }}
          >
            <RepeatIcon fontSize="large" />
          </Button>
        )}

        <Button
          onClick={() => setPrevClicked(true)}
          style={{ cursor: 'pointer', color: '#edf6f9' }}
        >
          <SkipPreviousIcon fontSize="large" />
        </Button>

        <audio ref={audioElement} src={url} preload="metadata">
          <track kind="captions" />
        </audio>
        {isPlaying ? (
          <button
            type="button"
            onClick={() => setPlayPauseClicked(!isPlaying)}
            style={{ cursor: 'pointer', color: '#edf6f9' }}
          >
            <PauseIcon fontSize="large" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPlayPauseClicked(!isPlaying)}
            style={{ cursor: 'pointer', color: '#edf6f9' }}
          >
            <PlayArrowIcon fontSize="large" />
          </button>
        )}

        <Button
          onClick={() => setNextClicked(true)}
          style={{ cursor: 'pointer', color: '#edf6f9' }}
        >
          <SkipNextIcon fontSize="large" />
        </Button>
      </div>
      <div className="playback-widgets">
        <div className="timer">
          <p>
            <span>{formatTime(currTime)}</span>/
            <span>{formatTime(duration)}</span>
          </p>
        </div>
        <div className="slider">
          <Slider value={volume} onChange={handleVolumeChange} />
        </div>
        {volumeClicked ? (
          <Button
            onClick={() => {
              setVolumeClicked(!volumeClicked);
              setVolume(100);
            }}
            style={{ cursor: 'pointer', color: '#edf6f9' }}
          >
            <VolumeOffIcon fontSize="large" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              setVolumeClicked(!volumeClicked);
              setVolume(0);
            }}
            style={{ cursor: 'pointer', color: '#edf6f9' }}
          >
            <VolumeUpIcon fontSize="large" />
          </Button>
        )}

      </div>
    </div>
  );
}

export default MusicPlayer;
