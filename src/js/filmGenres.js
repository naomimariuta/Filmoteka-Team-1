import axios from 'axios';
import Notiflix from 'notiflix';

export const API_KEY = 'b4a37daab61b0e2cbc84b0608fc0fe04'; 
export const BASE_URL = 'https://api.themoviedb.org/3';

export let genres = [];

export async function filmGenres() {
  const genreUrl = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  try {
    const genreResponse = await axios.get(genreUrl);
    genres = genreResponse.data.genres;
  } catch (error) {
    Notiflix.Notify.failure('Failed to load genres. Hope it will be your type anyway.');
    console.error('Error fetching genres:', error);
  }
}

window.addEventListener('load', async () => {
  await filmGenres();
});
