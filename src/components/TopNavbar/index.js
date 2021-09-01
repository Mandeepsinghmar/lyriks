/* eslint-disable quotes */
/* eslint-disable prefer-rest-params */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import MusicNoteIcon from "@material-ui/icons/MusicNote";

import "./topNavbar.scss";

import Search from './Search';
import { getSearchList } from "../../store/actions/musicActions";

const TopNavbar = () => {
  const [activeSearchBar, setActiveSearchBar] = useState(false);

  const dispatch = useDispatch();
  const getData = (e) => {
    if (e.target.value !== "") {
      dispatch(getSearchList(e.target.value));
    }
  };

  function debounce(fn, delay) {
    let timer;
    // eslint-disable-next-line func-names
    return function () {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, arguments);
      }, delay);
    };
  }
  return (
    <nav className="navbar-container">
      <div className="nav-item">
        <div className="brand-container">
          <Link className="navbar-brand" to="/">
            lyriks <MusicNoteIcon />
          </Link>
        </div>

        <div className="search-container">
          <div className="search-bar">

            <input
              onMouseDown={() => setActiveSearchBar(true)}
              onFocus={() => setActiveSearchBar(true)}
              onKeyUp={debounce(getData, 300)}
              type="text"
              className="search-input"
              placeholder="Search songs or artists"
            />
          </div>

          {activeSearchBar && (
          <div className="search-result">
            <Search
              activeSearchBar={activeSearchBar}
              setActiveSearchBar={setActiveSearchBar}
            />
          </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
