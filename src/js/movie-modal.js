import { getMovieInfo, getMovieTrailer, onError } from './movieApi';
import {
  addToStorage,
  getFromStorage,
  removeFromStorage,
} from './storageManager';

document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const watchedBtn = document.getElementById('watched');
  const queueBtn = document.getElementById('queue');
  const trailerContainer = document.getElementById('trailer-container');
  const trailerNotFound = document.getElementById('trailer-not-found');

  const openModal = async movieId => {
    try {
      const movie = await getMovieInfo(movieId);
      const trailer = await getMovieTrailer(movieId);

      document.getElementById('movie-title').textContent = movie.title;
      document.getElementById('movie-title').dataset.id = movieId;
      document.getElementById('movie-original-title').textContent =
        movie.original_title;
      document.getElementById('movie-genres').textContent = movie.genres
        .map(g => g.name)
        .join(', ');
      document.getElementById(
        'movie-release-date'
      ).textContent = `Release Date: ${movie.release_date}`;
      document.getElementById(
        'movie-vote-average'
      ).textContent = `Rating: ${movie.vote_average}`;

      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '../images/no-img.jpg';
      document.getElementById('movie-poster').src = posterUrl;

      const storedMovie = getFromStorage(movieId);
      updateButtonState(
        storedMovie,
        watchedBtn,
        'watched',
        'ADD TO WATCHED',
        'REMOVE FROM WATCHED'
      );
      updateButtonState(
        storedMovie,
        queueBtn,
        'queue',
        'ADD TO QUEUE',
        'REMOVE FROM QUEUE'
      );

      trailerContainer.innerHTML = '';
      if (trailer.results.length > 0) {
        const trailerUrl = `https://www.youtube.com/embed/${trailer.results[0].key}?autoplay=1&mute=1`;
        trailerContainer.innerHTML = `<iframe src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>`;
        trailerNotFound.classList.add('is-hidden');
      } else {
        trailerNotFound.classList.remove('is-hidden');
      }

      modalOverlay.classList.remove('is-hidden');
    } catch (error) {
      onError(error);
    }
  };

  const updateButtonState = (
    storedMovie,
    button,
    type,
    addText,
    removeText
  ) => {
    if (storedMovie && storedMovie[`is${capitalize(type)}`]) {
      button.textContent = removeText;
      button.classList.add('active');
    } else {
      button.textContent = addText;
      button.classList.remove('active');
    }
  };

  const closeModal = () => {
    modalOverlay.classList.add('is-hidden');
    trailerContainer.innerHTML = '';
  };

  const toggleMovieState = (button, type, addText, removeText, movieId) => {
    let storedMovie = getFromStorage(movieId);
    if (storedMovie && storedMovie[`is${capitalize(type)}`]) {
      // Dacă filmul este deja în lista curentă, îl eliminăm
      storedMovie[`is${capitalize(type)}`] = false;
      button.textContent = addText;
      button.classList.remove('active');

      if (!storedMovie.isInQueue && !storedMovie.isWatched) {
        removeFromStorage(movieId);
      } else {
        addToStorage(movieId, storedMovie); // Actualizăm starea în local storage
      }
    } else {
      // Dacă filmul nu este în lista curentă, îl adăugăm
      if (!storedMovie) {
        storedMovie = { id: movieId };
      }
      storedMovie[`is${capitalize(type)}`] = true;
      button.textContent = removeText;
      button.classList.add('active');
      addToStorage(movieId, storedMovie);
    }
  };

  watchedBtn.addEventListener('click', () => {
    const movieId = document.getElementById('movie-title').dataset.id;
    toggleMovieState(
      watchedBtn,
      'watched',
      'ADD TO WATCHED',
      'REMOVE FROM WATCHED',
      movieId
    );
  });

  queueBtn.addEventListener('click', () => {
    const movieId = document.getElementById('movie-title').dataset.id;
    toggleMovieState(
      queueBtn,
      'queue',
      'ADD TO QUEUE',
      'REMOVE FROM QUEUE',
      movieId
    );
  });

  closeModalBtn.addEventListener('click', closeModal);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  document.querySelector('.card-list-main').addEventListener('click', e => {
    const target = e.target.closest('.card-list-img');
    if (target) {
      const movieId = target.dataset.id;
      console.log(movieId);
      openModal(movieId);
    }
  });
});
