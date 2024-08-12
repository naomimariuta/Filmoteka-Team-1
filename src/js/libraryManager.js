import { getFromStorage } from './storageManager';
import { getMoviesByGenres, getPopularFilms, onError, } from './movieApi';

export const genreList = {};

const runningAPI = async () => {
  try {
    const response = await getMoviesByGenres();
    const genres = response.genres;
    genres.map(m => (genreList[m.id] = m.name));
    const trending = await getPopularFilms();
    createGallery(trending.results);
  } catch (error) {
    onError(error);
  }
};
runningAPI();

export function createGallery(results = []) {
  const elements = results
    .map(m => {
      let {
        id,
        poster_path,
        title,
        genre_ids = [],
        genres = [],
        release_date,
        vote_average,
      } = m;

      const mainGenre = genre_ids.map(el => ' ' + genreList[el]);
      const year = new Date(release_date).getFullYear();
      const average = vote_average.toFixed(2);
      let poster;
      if (!poster_path) {
        poster = new URL('/src/images/no-img.jpg', import.meta.url);
      } else {
        poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      }
      return `
    <li class="card-list-item">
          <a href="#" class="card-list-link" id="${id}">
            <div class="card-list-img-box">
              <img class="card-list-img" data-id="${id}" src="${poster}" alt=" ${title} ">
            </div>
            <h3 class="card-list-title">${title}</h3>
            <p class="card-list-text">${mainGenre} | ${year || ''} </p>
          </a>
        </li>`;
    })
    .join('');
  const cardListEl = document.querySelector('.card-list-main');
  cardListEl.innerHTML = elements;
}

export function addToQueue(movieData) {
  const movie = {
    html: movieData.cardHtml,
    data: movieData,
    isInQueue: true,
  };
  localStorage.setItem(movieData.id.toString(), JSON.stringify(movie));
}

export function addToWatched(movieData) {
  const movie = {
    html: movieData.cardHtml,
    data: movieData,
    isWatched: true,
  };
  localStorage.set(movieData.id.toString(), JSON.stringify(movie));
}

export function updateMovieStateInStorage(id, isInQueue, isWatched) {
  const movie = getFromStorage(id);
  if (movie) {
    movie.isInQueue = isInQueue;
    movie.isWatched = isWatched;
    localStorage.setItem(id.toString(), JSON.stringify(movie));
  }
}

