import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Loader from 'react-loader-spinner';
import uuid from 'react-uuid';
import ListMusicCard from '../ListMusicCard';
import Banner from '../../assets/images/Banner.svg';
import { getRecommendedTracks, getSongDetails, setCurrentSong } from '../../store/actions/musicActions';
import './songDetails.scss';

const SongDetails = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const { songDetails, recommendedTracks, loading, songLoading } = useSelector(
    (state) => state.musicReducer,
  );
  useEffect(() => {
    dispatch(getSongDetails(songId));
    dispatch(getRecommendedTracks(songId));
  }, [songId]);
  const currPlayingTracks = recommendedTracks
    && recommendedTracks.map((track, index) => ({
      title: track.title,
      id: track.key,
      subTitle: track.subtitle,
      image: track.images?.coverart ? track.images.coverart : Banner,
      url: track.hub?.actions?.[1]?.uri
        ? track.hub.actions[1].uri
        : 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9c/7e/20/9c7e20aa-f4ec-c6d1-3fb9-2a3f7a90c456/mzaf_1937335649665882562.plus.aac.p.m4a',
      artistId: track.artists?.[0].id,
      idx: index,
    }));
  const currPlayingTrack = songDetails && {
    image: songDetails?.images?.coverart ? songDetails.images.coverart : Banner,
    title: songDetails.title ? songDetails.title : 'STAY',
    subTitle: songDetails.subtitle ? songDetails.subtitle : 'The Kid LAROI',
    url: songDetails.hub?.actions?.[1]?.uri
      ? songDetails.hub.actions[1].uri
      : 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9c/7e/20/9c7e20aa-f4ec-c6d1-3fb9-2a3f7a90c456/mzaf_1937335649665882562.plus.aac.p.m4a',
    id: songDetails.key ? songDetails.key : '552221348',
    artistId: songDetails?.artists ? songDetails.artists[0].id : '205204904',
    idx: 0,
  };

  function handlePlay() {
    dispatch(setCurrentSong(currPlayingTrack, currPlayingTracks));
  }

  return (
    <div className="container">
      {!songLoading ? (
        songDetails && (
          <>
            <div className="music-container">
              <div
                className="image-container"
                onClick={handlePlay}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={
                    songDetails?.images?.coverart
                      ? songDetails.images.coverart
                      : Banner
                  }
                  alt=""
                />
                <div className="play-circle">
                  <PlayCircleFilledWhiteIcon />
                </div>
              </div>

              <div className="music-card-desc">
                <h1>{songDetails?.title}</h1>
                {songDetails.artists && (
                  <Link
                    to={`/artists/${songDetails.artists[0].id}`}
                    className="music-artist"
                  >
                    <p>{songDetails?.subtitle}</p>
                  </Link>
                )}

                <p className="music-type">{songDetails?.genres?.primary}</p>
              </div>
            </div>
            {songDetails?.sections && (
              <div className="music-details">
                {songDetails.sections[2]?.youtubeurl?.actions[0]?.uri && (
                  <div className="music-video-container">
                    <h2>Music video</h2>
                    <ReactPlayer
                      url={songDetails.sections[2].youtubeurl.actions[0].uri}
                      controls
                      width="100%"
                      height="430px"
                    />
                  </div>
                )}
                <div className="music-lyrics-container">
                  {songDetails.sections[1]?.text && (
                    <div className="music-lyrics">
                      <div className="lyrics-title">
                        <h2>Lyrics</h2>
                      </div>

                      <>
                        {songDetails.sections[1].text.map((text) => (
                          <div key={uuid()} className="lyrics">
                            <p>{text}</p>
                          </div>
                        ))}
                      </>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader type="Oval" color="blue" height={200} width={30} />
        </div>
      )}

      {recommendedTracks && (
        <div
          style={{
            marginTop: '70px',
            marginBottom: '30px',
            marginLeft: '20px',
          }}
        >
          <h2 style={{ fontWeight: '900', fontSize: '2.2rem' }}>
            {recommendedTracks.length > 0 && <div>Similar Songs</div>}
          </h2>
        </div>
      )}
      <div className="music-card-container">
        {!loading ? (
          recommendedTracks.length > 0 && (
            recommendedTracks.map((song, idx) => (
              <ListMusicCard
                key={song.id}
                tracks={recommendedTracks}
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
                songId={song.id}
                artistId={song.artists && song.artists[0] && song.artists[0].id}
                idx={idx}
              />
            ))
          )) : (
            <div style={{ minHeight: '50vh' }}>
              <Loader type="Oval" color="blue" height={370} width={30} />
            </div>
        )}
      </div>
    </div>
  );
};

export default SongDetails;
