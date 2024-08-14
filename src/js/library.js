import { getFromStorage } from './storageManager';
import { createGallery, genreList } from './libraryManager';
import { getMovieInfo, getMoviesByGenres } from './movieApi';
import { createCard } from './galleryCard';

document.querySelector('.library-btn').addEventListener('click', showLibrary);

document.querySelector('.watched-btn').addEventListener('click', () => {
  displayMovies('watched');
});

document.querySelector('.queue-btn').addEventListener('click', () => {
  displayMovies('queue');
});

function showLibrary() {
  document.querySelector('.library-btn').classList.add('active');
  document.querySelector('.watched-btn').classList.remove('active');
  document.querySelector('.queue-btn').classList.remove('active');

  displayMovies();
  // document.querySelector('.watch-and-queue').style.display = 'flex';
}

function displayMovies(filter = null) {
  const cardList = document.querySelector('.card-list-main');
  cardList.innerHTML = '';
  const movies = getAllStoredMovies();

  let filteredMovies = movies;
  console.log(filteredMovies);
  if (filter === 'watched') {
    filteredMovies = movies.filter(movie => movie.isWatched);
  } else if (filter === 'queue') {
    filteredMovies = movies.filter(movie => movie.isInQueue);
  }
  createGallery(
    filteredMovies.map(movie => {
      const movieInfo = getMovieInfo(movie.id);
      const movieGenres = genreList[movie.id];
      createCard(movieInfo, movieGenres);
    })
  );
  document.querySelector('.library-btn').classList.add('active');
}

function getAllStoredMovies() {
  const movies = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const movie = getFromStorage(key);
    console.log(movie);
    if (movie) {
      movies.push(movie);
    }
  }
  return movies;
}
