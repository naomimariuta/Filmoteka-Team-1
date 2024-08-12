import axios from 'axios';
import { Notify } from 'notiflix';

export const API_KEY = 'b4a37daab61b0e2cbc84b0608fc0fe04'; 
export const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchVideo(movieId) {
  const videoEndpoint = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  
  try {
    const response = await axios.get(videoEndpoint);
    const videos = response.data.results;

    const youtubeTrailer = videos.find(
      video => video.site === 'YouTube' && video.type === 'Trailer'
    );

    return youtubeTrailer
      ? `https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=1`
      : null;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      Notify.failure('Failed to load movie trailer, but it\'s awesome anyway');
      console.error('Error fetching movie trailer:', error);
      return null;
    }
  }
}

export async function searchMovies(query = '', page = 1) {
  const searchEndpoint = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
    : `${BASE_URL}/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`;
  
  try {
    const response = await axios.get(searchEndpoint);

    const moviesWithTrailers = await Promise.all(
      response.data.results.map(async movie => {
        try {
          const trailerUrl = await fetchVideo(movie.id);
          return { ...movie, trailerUrl };
        } catch (error) {
          console.error('Error fetching trailer for movie:', error);
          return { ...movie, trailerUrl: null };
        }
      })
    );

    return { ...response.data, results: moviesWithTrailers };
  } catch (error) {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    throw error;
  }
}
