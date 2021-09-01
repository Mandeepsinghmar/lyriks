import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import uuid from 'react-uuid';

import { getTracks } from '../../store/actions/musicActions';
import './artists.scss';

const Artists = () => {
  const dispatch = useDispatch();
  const { tracks, loading } = useSelector((state) => state.musicReducer);

  useEffect(() => {
    if (tracks?.length === 0) {
      dispatch(getTracks('genre-global-chart-1'));
    }
  }, []);

  return (
    <div className="container">
      <div style={{ margin: '20px 20px 20px 40px' }}>
        <h2 style={{ fontSize: '1.9rem', fontWeight: '900' }}>
          Listen most-streamed artists
        </h2>
      </div>
      <div className="artists-container">
        {!loading ? (
          tracks && tracks.map((track) => (
            <div key={uuid()} className="artist-card-container">
              {track.artists ? (
                <Link
                  to={`/artists/${track.artists[0].id}`}
                  className="artist-link"
                >
                  <div className="artist-card" style={{ cursor: 'pointer' }}>
                    <div className="artist-name">
                      <p>{track.subtitle}</p>
                    </div>
                    <img
                      src={
                        track.images?.background
                          ? track.images.background
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRBqTeY-dTImnv-0qS4j32of8dVtWelSEMw&usqp=CAU'
                      }
                      alt=""
                    />
                  </div>
                </Link>
              ) : (
                <Link to="/artists/43054929" className="artist-link">
                  <div className="artist-card" style={{ cursor: 'pointer' }}>
                    <div className="artist-name">
                      <p>Doja Cat</p>
                    </div>
                    <img
                      src="https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/d7/a7/37/d7a73703-ee4b-29b7-8f22-64d7b88a31b6/pr_source.png/800x800cc.jpg"
                      alt=""
                    />
                  </div>
                </Link>
              )}
            </div>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
            }}
          >
            <Loader type="Oval" color="blue" height={370} width={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;
