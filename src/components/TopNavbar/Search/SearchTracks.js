import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Banner from '../../../assets/images/Banner.svg';

const SearchTracks = () => {
  const { searchTracks } = useSelector(
    (state) => state.musicReducer,
  );
  return (
    <div>
      <div className="card-container">
        {searchTracks && searchTracks.hits && searchTracks.hits.length > 0 && <h1>Tracks</h1>}

        {searchTracks && searchTracks.hits ? searchTracks.hits.map((item) => (
          <Link
            to={`/songs/${item.track.key}`}
            className="artist-card"
            key={item.track.key}
          >
            <div className="artist-image-container">
              <img
                src={
                            item.track.images && item.track.images.coverart
                              ? item.track.images.coverart
                              : Banner
                          }
                alt={item.track.title}
              />
            </div>

            <div className="artist-card-desc">
              <h1>{item.track.title}</h1>
              <p>{item.track.subtitle}</p>
            </div>
          </Link>
        )) : (
          <div
            style={{
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%',
              margin: 'auto 0px',
              gap: '10px',
            }}
          >
            <SearchIcon style={{ fontSize: '3rem' }} />
            <p style={{ color: 'blue', fontWeight: '800', fontSize: '1.5rem' }}>
              No Searches just yet
            </p>
            <p>Search for your favorite artists or songs</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTracks;
