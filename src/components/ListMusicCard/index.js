import React from 'react';
import './listMusicCard.scss';
import { Link } from 'react-router-dom';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { useDispatch } from 'react-redux';
import { setCurrentSong } from '../../store/actions/musicActions';
import Banner from '../../assets/images/Banner.svg';

const ListMusicCard = ({
  tracks,
  image,
  title,
  subTitle,
  url,
  songId,
  artistId,
  idx,
}) => {
  const dispatch = useDispatch();

  const currPlayingTracks = tracks && tracks.map((track, index) => (
    {
      title: track.title,
      id: track.key,
      subTitle: track.subtitle,
      image:
    track.images?.coverart
      ? track.images.coverart
      : Banner,
      url:
    track.hub?.actions?.[1]
      ?.uri
      ? track.hub.actions[1].uri
      : 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9c/7e/20/9c7e20aa-f4ec-c6d1-3fb9-2a3f7a90c456/mzaf_1937335649665882562.plus.aac.p.m4a',
      artistId: track.artists?.[0].id,
      idx: index,
    }
  ));

  const currPlayingTrack = {
    image,
    title,
    subTitle,
    url,
    id: songId,
    artistId,
    idx,
  };

  function handlePlay() {
    dispatch(setCurrentSong(currPlayingTrack, currPlayingTracks));
  }

  return (
    <div className="list-music-card">
      <p style={{ fontWeight: '800' }}> {idx + 1}.</p>

      <div onClick={handlePlay} className="list-music-card-cover">
        <img src={image || Banner} alt={title} loading="lazy" />
      </div>
      <div className="list-music-card-desc">
        <div>
          <Link to={`/songs/${songId}`}>
            <p className="list-song-name"> {title}</p>
          </Link>
          {artistId && (
          <Link to={`/artists/${artistId}`}>
            {' '}
            <p className="list-song-artist">{subTitle}</p>
          </Link>
          )}
        </div>

        <div className="list-play-circle" onClick={handlePlay}>
          <PlayCircleFilledWhiteIcon />
        </div>
      </div>
    </div>
  );
};

export default ListMusicCard;
