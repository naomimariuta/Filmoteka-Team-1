import { getMovieByKeyword, onError } from './movieApi';
import { createGallery } from './libraryManager';

document
  .querySelector('.search-form')
  .addEventListener('submit', async event => {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === '') return;

    try {
      const searchResults = await getMovieByKeyword(searchInput);
      createGallery(searchResults.results);
    } catch (error) {
      onError(error);
    }
  });
