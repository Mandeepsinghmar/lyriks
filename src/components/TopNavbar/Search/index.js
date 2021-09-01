import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import './search.scss';
import Modal from 'react-modal';
import CancelIcon from '@material-ui/icons/Cancel';
import Loader from 'react-loader-spinner';

const SearchArtists = lazy(() => import('./SearchArtists'));
const SearchTracks = lazy(() => import('./SearchTracks'));

const Search = ({ activeSearchBar, setActiveSearchBar }) => {
  const { searchLoading } = useSelector(
    (state) => state.musicReducer,
  );

  Modal.setAppElement('#root');

  function closeModal() {
    setActiveSearchBar(false);
  }

  return (
    <>
      <Modal
        isOpen={activeSearchBar}
        onRequestClose={closeModal}
        style={{
          overlay: {
            top: '64px',
            backgroundColor: 'transparent',
          },
          content: {
            backgroundColor: 'white',
            maxWidth: '370px',
            minWidth: '354px',
            left: 'auto',
            top: '5px',
            right: '20px',
            maxHeight: '410px',
          },
        }}
      >
        <div
          className="cancel"
          style={{
            float: 'right',
            color: 'black',
            fontSize: '1.4rem',
            fontWeight: '800',
            cursor: 'pointer',
          }}
          onClick={() => setActiveSearchBar(false)}
        >
          <p>
            <CancelIcon />
          </p>
        </div>

        <>
          {!searchLoading ? (
            <>
              <div className="card-container">
                <Suspense fallback={<div>loading..</div>}>
                  <SearchTracks />

                </Suspense>

                <Suspense fallback={<div>loading..</div>}>
                  <SearchArtists />

                </Suspense>
              </div>

            </>
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
        </>

      </Modal>
    </>
  );
};

export default Search;
