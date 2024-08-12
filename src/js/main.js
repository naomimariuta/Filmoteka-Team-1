import { getPopularFilms } from './movieApi';
import { createPagination } from './mainPagination';
import { createGallery } from './libraryManager';

function getMoviesPagination() {
  getPopularFilms().then(response => {
    console.log('test');
    // const response = getPopularFilms(1).results;
    console.log(response);
    createGallery(response.results);
  });
}

getMoviesPagination();
