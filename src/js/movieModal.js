import { genresList } from './filmGenres';
import {
  addToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from './getLocalStorage';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const showFilmModal = (film, cardHtml) => {
  if (
    !film ||
    typeof film !== 'object' ||
    !film.hasOwnProperty('genre_ids')
  ) {
    console.error(
      'Film data is incomplete or in incorrect format.'
    );
    return;
  }

  const genreNames = Array.isArray(film.genre_ids)
    ? film.genre_ids
        .map(id => {
          const genre = genresList.find(genre => genre.id === id);
          return genre ? genre.name : 'Unknown';
        })
        .filter(name => name !== 'Unknown')
        .join(', ')
    : 'Unknown';

  let filmTitle = film.title || 'Unknown Title';

  if (film.media_type) {
    if (film.media_type === 'movie') {
      filmTitle = film.original_title || film.title;
    } else if (film.media_type === 'tv') {
      filmTitle = film.original_name || film.name;
    }
  }

  const isFilmInQueue = getFromLocalStorage(film.id) !== null;

  const modalContent = `
    <div class="film-modal">
        <div class="film-modal-content">
         <span class="close-modal">&times;</span>
         <h2 class="film-modal-title">${film.title || film.name}</h2>
        ${
          film.trailerUrl
            ? `<div class="film-modal-trailer">
                   <iframe src="${film.trailerUrl}" frameborder="0" allowfullscreen></iframe>
                </div>`
            : `<div class="film-modal-poster">
                   <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title || film.name}">
                </div>`
        }
        <h3>Original title: ${filmTitle}</h3>
        <p class="film-modal-score"><span>Score: ${
          typeof film.vote_average === 'number'
            ? film.vote_average.toFixed(2)
            : 'N/A'
        }</span></p>
        <p class="modal-genre-paragraph"><b>Genre:</b> ${genreNames}</p>
        <h4 class="film-modal-about">ABOUT</h4>
        <p>${film.overview}</p>
        <div class="film-modal-actions">
          <button id="btnAddToWatched">ADD TO WATCHED</button>
          <button id="btnAddToQueue">${
            isFilmInQueue ? 'REMOVE FROM QUEUE' : 'ADD TO QUEUE'
          }</button>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalContent);
  const modal = document.querySelector('.film-modal');

  const btnAddToQueue = document.querySelector('#btnAddToQueue');
  const btnAddToWatched = document.querySelector('#btnAddToWatched');

  const updateButtonStates = () => {
    const storedFilm = getFromLocalStorage(film.id);
    if (storedFilm) {
      btnAddToQueue.textContent = storedFilm.isInQueue
        ? 'REMOVE FROM QUEUE'
        : 'ADD TO QUEUE';
      btnAddToWatched.textContent = storedFilm.isWatched
        ? 'REMOVE FROM WATCHED'
        : 'ADD TO WATCHED';
    }
  };
  updateButtonStates();

  btnAddToQueue.addEventListener('click', () => {
    const storedFilm = getFromLocalStorage(film.id);
    if (storedFilm) {
      updateFilmInLocalStorage(
        film.id,
        !storedFilm.isInQueue,
        storedFilm.isWatched
      );
      if (storedFilm.isInQueue) {
      }
    } else {
      enqueueFilm({
        id: film.id,
        cardHtml: cardHtml,
        data: film,
      });
    }
    updateButtonStates();
  });

  btnAddToWatched.addEventListener('click', () => {
    const storedFilm = getFromLocalStorage(film.id);
    if (storedFilm) {
      updateFilmInLocalStorage(
        film.id,
        storedFilm.isInQueue,
        !storedFilm.isWatched
      );
      if (storedFilm.isWatched) {
      }
    } else {
      markFilmAsWatched({
        id: film.id,
        cardHtml: cardHtml,
        data: film,
      });
    }
    updateButtonStates();
  });

  new SimpleLightbox('.film-modal-content a', {
    overlay: true,
    close: true,
    showCounter: true,
  });

  function handleModalClick(event) {
    if (
      event.target === modal ||
      event.target.classList.contains('close-modal')
    ) {
      modal.remove();
      document.removeEventListener('click', handleModalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }

  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleModalClick);
    }
  }

  modal.addEventListener('click', handleModalClick);
  document.addEventListener('keydown', handleEscapeKey);
};
