import { getPopularFilms } from './movieApi';
import { createPagination } from './mainPagination';
import { createGallery } from './libraryManager';

function getMoviesPagination() {
  getPopularFilms().then(response => {
    // const response = getPopularFilms(1).results;
    createGallery(response.results);
  });
}

getMoviesPagination();
