import axios from 'axios';
import { Notify } from 'notiflix';

const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = 'b4a37daab61b0e2cbc84b0608fc0fe04';

const parameters = {
  position: 'center-center',
  timeout: 4000,
  width: '750px',
  fontSize: '30px',
};

export async function getPopularFilms(page) {
  const response = await axios.get(`${BASE_URL}3/trending/movie/day`, {
    params: { api_key: API_KEY, page: page || 1 },
  });
  return response.data;
}

export async function getMovieInfo(id) {
  const response = await axios.get(`${BASE_URL}3/movie/${id}`, {
    params: { api_key: API_KEY },
  });
  return response.data;
}

export async function getMovieByKeyword(keyword, page = 1) {
  const response = await axios.get(
    `${BASE_URL}3/search/movie?include_adult=false?language=en-US&page=1`,
    {
      params: { api_key: API_KEY, query: keyword, page: page },
    }
  );
  return response.data;
}

export async function getMoviesByGenres() {
  try {
    const response = await axios.get(`${BASE_URL}3/genre/movie/list`, {
      params: { api_key: API_KEY, language: 'en' },
    });
    return response.data;
  } catch (error) {
    onError(error.message);
  }
}

export async function getMovieTrailer(id) {
  const response = await axios.get(`${BASE_URL}3/movie/${id}/videos`, {
    params: { api_key: API_KEY },
  });
  return response.data;
}

export function onError(error) {
  console.error('An error occurred:', error);
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or make another choice!',
    parameters
  );
}
