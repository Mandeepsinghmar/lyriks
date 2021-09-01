import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import { getTracks } from '../../store/actions/musicActions';
import ListMusicCard from '../ListMusicCard';
import Banner from '../../assets/images/Banner.svg';
import './countrySongs.scss';

const CountrySongs = () => {
  const dispatch = useDispatch();
  const { tracks, loading, userCountry, countryLoading } = useSelector((state) => state.musicReducer);
  const [country, setCountry] = useState(userCountry);

  useEffect(() => {
    const userCntry = JSON.parse(localStorage.getItem('userCountry'));
    if (userCntry) {
      setCountry(userCntry);
      dispatch(getTracks(userCntry.listid));
    }
  }, []);

  return (
    <>
      {
   !countryLoading ? (
     <div className="Container">
       {!loading ? (

         tracks && (
         <>
           <div style={{ margin: '30px 30px 40px' }}>
             <h2 style={{ fontSize: '1.9rem', fontWeight: '900' }}>
               Popular songs in
               <span style={{ marginLeft: '10px' }}>
                 {userCountry ? userCountry.name
                   : <span>{country && country.name}</span>}
               </span>

             </h2>
           </div>
           <div className="music-card-container">
             { tracks.map((song, idx) => (
               <ListMusicCard
                 key={song.key}
                 tracks={tracks}
                 image={
            song.images?.coverart
              ? song.images.coverart
              : Banner
          }
                 title={song.title}
                 subTitle={song.subtitle}
                 url={
            song.hub?.actions && song.hub.actions[1]
            && song.hub.actions[1]?.uri
              ? song.hub.actions[1].uri
              : 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9c/7e/20/9c7e20aa-f4ec-c6d1-3fb9-2a3f7a90c456/mzaf_1937335649665882562.plus.aac.p.m4a'
          }
                 songId={song.key}
                 artistId={song.artists && song.artists[0] && song.artists[0].id}
                 idx={idx}
               />
             ))}
           </div>
         </>
         )
       ) : (
         <div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <Loader type="Oval" color="blue" height={370} width={30} />
         </div>
       )}

     </div>
   )
     : (
       <div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <Loader type="Oval" color="blue" height={370} width={30} />
       </div>
     )
 }
    </>
  );
};

export default CountrySongs;
