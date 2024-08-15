import { createGallery } from './libraryManager';
import { getMovieInfo, onError } from './movieApi';
import { getFromStorage } from './storageManager';

const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');
const actionPage = document.querySelector('.active_link');

const fetchStorage = key => {
  try {
    const storedMovies = Object.keys(localStorage).reduce((acc, id) => {
      const movieData = JSON.parse(localStorage.getItem(id));
      if (movieData && movieData[key]) {
        acc.push(movieData.id);
      }
      return acc;
    }, []);

    return storedMovies.length ? storedMovies : undefined;
  } catch (error) {
    onError(error);
    return undefined;
  }
};

if (actionPage.dataset.action === 'library') {
  showLibrary();
}

export async function showLibrary() {
  watchedBtn.classList.remove('active');
  queueBtn.classList.remove('active');
  watchedBtn.classList.add('not-active');
  queueBtn.classList.add('not-active');
  showAll();
  watchedBtn.addEventListener('click', showWatched);
  queueBtn.addEventListener('click', showQueue);
}

function showAll() {
  document.querySelector('.card-list-main').innerHTML = '';

  const watchedMovies = fetchStorage('isWatched') || [];
  const queueMovies = fetchStorage('isQueue') || [];
  const allMovies = [...watchedMovies, ...queueMovies];

  if (allMovies.length === 0) {
    showNothing();
  } else {
    const moviesPromises = allMovies.map(id => getMovieInfo(id));
    Promise.all(moviesPromises)
      .then(response => {
        createGallery(response);
      })
      .catch(onError);
  }
}
export function showWatched() {
  document.querySelector('.card-list-main').innerHTML = '';
  const watchedMovies = fetchStorage('isWatched');
  onWatchedClick();
  if (watchedMovies.length === 0) {
    showNothing();
  } else {
    const moviesPromises = watchedMovies.map(id => getMovieInfo(id));
    Promise.all(moviesPromises)
      .then(response => {
        createGallery(response);
      })
      .catch(onError);
  }
}

export function showQueue() {
  document.querySelector('.card-list-main').innerHTML = '';
  const queueMovies = fetchStorage('isQueue');
  onQueueClick();
  if (queueMovies.length === 0) {
    showNothing();
  } else {
    const moviesPromises = queueMovies.map(id => getMovieInfo(id));
    Promise.all(moviesPromises)
      .then(response => {
        createGallery(response);
      })
      .catch(onError);
  }
}

function onWatchedClick() {
  watchedBtn.classList.remove('not-active');
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
  queueBtn.classList.add('not-active');
}

function onQueueClick() {
  watchedBtn.classList.remove('active');
  watchedBtn.classList.add('not-active');
  queueBtn.classList.add('active');
  queueBtn.classList.remove('not-active');
}

function showNothing() {
  document.querySelector('.card-list-main').innerHTML =
    '<p class="nothing-to-show"> No movies have been added yet.</p>';
}
