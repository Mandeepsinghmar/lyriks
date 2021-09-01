import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchArtists = () => {
  const { searchArtists } = useSelector(
    (state) => state.musicReducer,
  );
  return (
    <div>
      <div className="card-container" style={{ marginTop: '10px' }}>
        {searchArtists && searchArtists.hits && searchArtists.hits.length > 0 && <h1>Artists</h1>}

        {searchArtists && searchArtists.hits && searchArtists.hits.map((item) => (
          <Link
            to={`/artists/${item.artist.id}`}
            className="artist-card"
            key={item.artist.id}
          >
            <div className="artist-image-container">
              <img
                src={
                              item.artist.avatar
                                ? item.artist.avatar
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRBqTeY-dTImnv-0qS4j32of8dVtWelSEMw&usqp=CAU'
                            }
                alt={item.artist.name}
              />
            </div>

            <div className="artist-card-desc">
              <h1>{item.artist.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchArtists;
