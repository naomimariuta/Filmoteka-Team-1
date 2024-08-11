import { genres } from './filmGenres';
import { showFilmModal } from './movieModal.js';
import { searchMovies } from './getMovies.js';

export async function renderFilmCards(movieDataPromise) {
  const movieContainerElement = document.querySelector('.movie-wrapper');
  const movieData = await movieDataPromise;

  movieContainerElement.textContent = '';

  if (!movieData || !movieData.results) {
    return;
  }

  movieData.results.forEach(movie => {
    const movieCardElement = createMovieCard(movie);
    movieContainerElement.append(movieCardElement);

    movieCardElement.addEventListener('click', () => {
      closeExistingModal();
      showFilmModal(movie, movieCardElement.outerHTML);
    });
  });
}

function createMovieCard(movie) {
  const movieCardElement = document.createElement('div');
  movieCardElement.classList.add('movie-wrapper__card');
  movieCardElement.setAttribute('data-filmId', movie.id.toString());

  const movieTitle = extractTitle(movie);
  const genreNames = extractGenreNames(movie.genre_ids);
  const releaseYear = extractReleaseYear(movie);
  const rating = formatRating(movie.vote_average);
  const posterUrl = resolvePosterPath(movie.poster_path);

  movieCardElement.innerHTML = `
    <div class="movie-wrapper__card-img">
      <img src="${posterUrl}" alt="${movieTitle}">
      <span class="movie-wrapper__info-rating">${rating}</span>
    </div>
    <div class="movie-wrapper__footer">
      <div class="movie-wrapper__title">${movieTitle}</div>
      <div class="movie-wrapper__info">
        <p class="movie-wrapper__info-genres">${genreNames}</p>
        <span class="movie-wrapper__info-year"> | ${releaseYear}</span>
      </div>
    </div>`;

  return movieCardElement;
}
function extractTitle(movie) {
  if (movie.media_type === 'tv') {
    return movie.name || movie.original_name || 'Unknown Title';
  } else if (movie.media_type === 'movie') {
    return movie.title || movie.original_title || 'Unknown Title';
  }
  return 'Unknown Title';
}


function extractGenreNames(genreIds) {
  const genreNames = genreIds
    .map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : 'Unknown';
    })
    .filter(name => name !== 'Unknown')
    .join(', ');

  return genreNames || 'Unknown Genre';
}

function extractReleaseYear(movie) {
  if (movie.media_type === 'movie') {
    return movie.release_date ? movie.release_date.split('-')[0] : 'Unknown Year';
  } else if (movie.media_type === 'tv') {
    return movie.first_air_date ? movie.first_air_date.split('-')[0] : 'Unknown Year';
  }
  return 'Unknown Year';
}

function formatRating(voteAverage) {
  return typeof voteAverage === 'number' ? voteAverage.toFixed(2) : 'N/A';
}

function resolvePosterPath(posterPath) {
  return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'path/to/default/image.jpg';
}

function closeExistingModal() {
  const existingModalElement = document.querySelector('.film-modal');
  if (existingModalElement) {
    existingModalElement.remove();
  }
}
