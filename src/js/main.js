import { getPopularFilms } from './movieApi';
import { createGallery } from './libraryManager';

function getMoviesPagination() {
  getPopularFilms().then(response => {
    createGallery(response.results);
  });
}

getMoviesPagination();
