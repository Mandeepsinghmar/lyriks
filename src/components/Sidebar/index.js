import React, { useEffect, useState } from 'react';
import './sidebar.scss';
import {
  ExploreOutlined,
  HomeOutlined,
  AlbumOutlined,
  LibraryMusicOutlined,
} from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

function SideBar() {
  const { userCountry, countryLoading } = useSelector((state) => state.musicReducer);

  const [country, setCountry] = useState();
  useEffect(() => {
    const userCntry = JSON.parse(localStorage.getItem('userCountry'));
    setCountry(userCntry);
  }, []);
  const currPath = window.location.pathname;

  return (
    <aside className="aside-bar">
      <div className="aside-bar-container">
        <Link
          to="/"
          className={currPath === '/' ? 'lib-sub active' : 'lib-sub'}
        >
          <Button startIcon={<HomeOutlined />} />
          Home
        </Link>
        <NavLink to="/explore" activeClassName="active" className="lib-sub">
          <Button startIcon={<ExploreOutlined />} />
          Explore
        </NavLink>
        <NavLink
          activeClassName="active"
          to="/country-tracks"
          style={{ color: 'white' }}
          className="lib-sub"
        >
          <Button startIcon={<AlbumOutlined />} />
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
        </NavLink>

        <Link
          to="/artists"
          className={currPath === '/artists' ? 'lib-sub active' : 'lib-sub'}
        >
          <Button startIcon={<LibraryMusicOutlined />} />
          Artists
        </Link>
      </div>
    </aside>
  );
}

export default SideBar;
