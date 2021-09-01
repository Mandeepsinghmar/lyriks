import axios from 'axios';

const key = process.env.REACT_APP_X_RAPIDAPI_KEY;

export const getData = async (url) => {
  const res = await axios.get(url, {
    headers: {
      'x-rapidapi-key': key,
      'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
    },
  });
  return res;
};

export const fetchData = async (url) => {
  const res = await axios.get(url, {
    headers: {
      'x-rapidapi-key': key,
      'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST_1,
    },
  });
  return res;
};
