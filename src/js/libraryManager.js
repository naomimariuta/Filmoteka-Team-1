import { addToStorage, getFromStorage } from './storageManager';
import { getMoviesByGenres, getPopularFilms, onError } from './movieApi';
import { showLibrary } from './library';

export const genreList = {};
const actionPage = document.querySelector('.active_link');

const runningAPI = async () => {
  try {
    const response = await getMoviesByGenres();
    const genres = response.genres;
    genres.forEach(m => (genreList[m.id] = m.name)); // Use forEach for clarity
    const trending = await getPopularFilms();
    createGallery(trending.results);
  } catch (error) {
    onError(error);
  }
};

if (actionPage.dataset.action === 'library') {
  showLibrary();
} else {
  runningAPI();
}

export function createGallery(results = []) {
  const elements = results
    .map(m => {
      if (!m || typeof m !== 'object') {
        console.warn('Unexpected item in results:', m);
        return '';
      }

      let {
        id,
        poster_path,
        title,
        genre_ids = [],
        genres = [],
        release_date,
        vote_average,
      } = m;
      const libraryGenres = genres.map(el => el.name);
      const mainGenre = genre_ids.map(
        el => ' ' + genreList[el] || 'Unknown Genre'
      );
      const year = new Date(release_date).getFullYear();
      const average = vote_average ? vote_average.toFixed(2) : 'N/A';
      let poster;
      if (!poster_path) {
        poster = new URL('/src/images/no-img.jpg', import.meta.url);
      } else {
        poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      }

      if (actionPage.dataset.action === 'library') {
        return `
    <li class="card-list-item">
          <a href="#" class="card-list-link" id="${id}">
            <div class="card-list-img-box">
              <img class="card-list-img" data-id="${id}" src="${poster}" alt=" ${title} ">
            </div>
            <h3 class="card-list-title">${title}</h3>
            <p class="card-list-text">${libraryGenres} | ${
          year || ''
        } | ${average}</p>
          </a>
        </li>`;
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

  if (results.length === 0) {
    cardListEl.innerHTML = '<p>No results found.</p>';
  }
}

export function addToQueue(movieData) {
  const movie = {
    html: movieData.cardHtml,
    data: movieData,
    isQueue: true,
    isWatched: false,
  };
  console.log('added to queue');
  addToStorage(movieData.id, movie);
}

export function addToWatched(movieData) {
  const movie = {
    html: movieData.cardHtml,
    data: movieData,
    isQueue: false,
    isWatched: true,
  };
  console.log('added to watched');
  addToStorage(movieData.id, movie);
}

export function updateMovieStateInStorage(id, isQueue, isWatched) {
  const movie = getFromStorage(id);
  if (movie) {
    movie.isQueue = isQueue;
    movie.isWatched = isWatched;
    addToStorage(id, movie);
  }
}
