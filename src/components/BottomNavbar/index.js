import React, { useState, useEffect } from 'react';
import { HomeOutlined, ExploreOutlined, AlbumOutlined, LibraryMusicOutlined } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import './bottomNavbar.scss';

const BottomNavbar = () => {
  const { userCountry, countryLoading } = useSelector((state) => state.musicReducer);
  const [country, setCountry] = useState();

  useEffect(() => {
    setCountry(JSON.parse(localStorage.getItem('userCountry')));
  }, []);

  const currPath = window.location.pathname;

  return (
    <div className="bottom-navigation">
      <Link className="bottom-navigation-link" to="/">
        <Button
          className={currPath === '/' ? 'BottomNavAction active' : 'BottomNavAction'}
          style={{ borderRadius: 0 }}
        >
          <span className="icon">
            <HomeOutlined />
          </span>
          <span className="label">Home</span>
        </Button>
      </Link>
      <Link className="bottom-navigation-link" to="/explore">
        <Button
          className={currPath === '/explore' ? 'BottomNavAction active' : 'BottomNavAction'}
          style={{ borderRadius: 0 }}
        >
          <span className="icon">
            <ExploreOutlined />
          </span>
          <span className="label">Explore</span>
        </Button>
      </Link>
      <Link className="bottom-navigation-link" to="/country-tracks">
        <Button
          className={currPath === '/country-tracks' ? 'BottomNavAction active' : 'BottomNavAction'}
          style={{ borderRadius: 0 }}
        >
          <span className="icon">
            <AlbumOutlined />
          </span>
          <span className="label">
            {!countryLoading ? (
              <div>
                {userCountry ? userCountry.name : (
                  <>
                    {country && country.name}
                  </>
                )}
              </div>
            ) : (
              <div>
                <Loader type="Oval" color="white" height={20} width={20} />
              </div>
            )}
          </span>
        </Button>
      </Link>
      <Link className="bottom-navigation-link" to="/artists">
        <Button
          className={currPath === '/artists' ? 'BottomNavAction active' : 'BottomNavAction'}
          style={{ borderRadius: 0 }}
        >
          <span className="icon">
            <LibraryMusicOutlined />
          </span>
          <span className="label">Artists</span>
        </Button>
      </Link>
    </div>
  );
};

export default BottomNavbar;
