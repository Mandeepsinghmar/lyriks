import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import { getArtistDetails, getArtistTracks } from '../../store/actions/musicActions';
import ListMusicCard from '../ListMusicCard';
import Banner from '../../assets/images/Banner.svg';
import './artist.scss';

const Artist = () => {
  const { artistId } = useParams();
  const dispatch = useDispatch();
  const { artistDetails, artistTracks, artistLoading, loading } = useSelector((state) => state.musicReducer);

  useEffect(() => {
    dispatch(getArtistDetails(artistId));
    dispatch(getArtistTracks(artistId));
  }, [artistId]);

  return (
    <div className="container">
      {!artistLoading ? (
        artistDetails && (
          <>
            <div className="music-container">
              <div className="image-container">
                <img
                  src={
                    artistDetails.avatar
                      ? artistDetails.avatar
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRBqTeY-dTImnv-0qS4j32of8dVtWelSEMw&usqp=CA'
                  }
                  alt=""
                />
              </div>
              <div className="music-card-desc">
                <h1>{artistDetails.name}</h1>
                <p className="music-type">{artistDetails.genres.primary}</p>
              </div>
            </div>
            <div
              style={{
                marginTop: '50px',
                marginBottom: '30px',
                marginLeft: '20px',
              }}
            >
              <h2 style={{ fontWeight: '900', fontSize: '2.2rem' }}>
                Popular songs by {artistDetails.name}
              </h2>
            </div>
          </>
        )
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0px auto',
          }}
        >
          <Loader type="Oval" color="blue" height={200} width={30} />
        </div>
      )}
      <div className="music-card-container">
        {!loading ? (
          artistTracks && artistTracks.map((song, idx) => (
            <ListMusicCard
              key={song.key}
              tracks={artistTracks}
              image={
              song.images?.coverart
                ? song.images.coverart
                : Banner
            }
              title={song.title}
              subTitle={song.subtitle}
              url={
              song.hub?.actions && song.hub.actions[1] && song.hub.actions[1]?.uri
                ? song.hub.actions[1].uri
                : 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9c/7e/20/9c7e20aa-f4ec-c6d1-3fb9-2a3f7a90c456/mzaf_1937335649665882562.plus.aac.p.m4a'
            }
              songId={song.key}
              artistId={song.artists && song.artists[0] && song.artists[0].id}
              idx={idx}
            />
          ))
        ) : (
          <div style={{ margin: '0px auto' }}>
            <Loader type="Oval" color="blue" height={370} width={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Artist;
