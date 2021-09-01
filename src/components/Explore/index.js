import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { getList, getTracks } from '../../store/actions/musicActions';
import ListMusicCard from '../ListMusicCard';
import Banner from '../../assets/images/Banner.svg';
import HorizontalSrollbar from '../HorizontalScrollbar';
import './explore.scss';

const Explore = () => {
  const dispatch = useDispatch();
  const { tracks, list, loading } = useSelector((state) => state.musicReducer);
  const [listId, setListId] = useState('ip-country-chart-DE');
  const [type, setType] = useState('Germany');
  const [country, setCountry] = useState(list && list.countries[0]);
  const [countryId, setCountryId] = useState('ip-country-chart-DE');
  const [removeCityLabel, setRemoveCityLabel] = useState(true);
  const [removeGenreLabel, setRemoveGenreLabel] = useState(true);

  useEffect(() => {
    dispatch(getList());
    dispatch(getTracks(listId));
  }, [listId]);
  useEffect(() => {
    const selectedCountry = list.countries.filter(
      (item) => item.listid === countryId,
    );
    setCountry(selectedCountry[0]);
  }, [countryId]);

  return (
    <div className="Container">
      <div className="list-container">
        {list.countries ? (
          <HorizontalSrollbar
            data={list.countries}
            setList={setListId}
            setListType={setType}
            countryId={setCountryId}
          />
        ) : (
          <div
            style={{
              margin: '0px auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader type="Oval" color="blue" height={30} width={30} />
          </div>
        )}
      </div>
      <FormControl className="app__dropdown">
        {removeCityLabel && (
          <InputLabel
            id="label"
            style={{
              fontSize: '1.3rem',
              color: 'white',
              margin: '10px 20px 20px 20px',
            }}
          >
            City
          </InputLabel>
        )}
        <Select
          labelId="label"
          id="select-filled"
          className="app__select"
          variant="outlined"
          value={listId}
          style={{ color: 'white' }}
          onChange={(e) => {
            setRemoveCityLabel(false);

            setListId(e.target.value);
          }}
        >
          {country
            && country.cities.map((city) => (
              <MenuItem value={city.listid}>{city.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
      {country && country.genres[0] && (
        <FormControl className="app__dropdown">
          {removeGenreLabel && (
            <InputLabel
              id="label"
              style={{
                fontSize: '1.3rem',
                color: 'white',
                margin: '10px 20px 20px 20px',
              }}
            >
              Genre
            </InputLabel>
          )}

          <Select
            labelId="label"
            id="select-filled"
            style={{ color: 'white' }}
            label="Genre"
            className="app__select"
            variant="outlined"
            value={listId}
            onChange={(e) => {
              setRemoveGenreLabel(false);
              setListId(e.target.value);
            }}
          >
            {country
              && country.genres.map((genre) => (
                <MenuItem value={genre.listid}>{genre.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      <div style={{ margin: '30px 30px 40px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '900' }}>
          The most Popular songs in {type} this week
        </h2>
      </div>

      <div className="music-card-container">
        {!loading ? (
          tracks
          && tracks.map((song, idx) => (
            <ListMusicCard
              key={song.key}
              tracks={tracks}
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
              songId={song.key}
              artistId={song.artists && song.artists[0] && song.artists[0].id}
              idx={idx}
            />
          ))
        ) : (
          <div style={{ minHeight: '50vh' }}>
            <Loader type="Oval" color="blue" height={370} width={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
