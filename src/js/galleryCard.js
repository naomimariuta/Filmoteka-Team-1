export function createCard(movie, genres) {
  return `
    <li class="card-list-item">
          <a href="#" class="card-list-link" id="${movie.id}">
            <div class="card-list-img-box">
              <img class="card-list-img" data-id="${
                movie.id
              }" src="https://image.tmdb.org/t/p/w500${
    movie.poster_path
  }" alt=" ${movie.title} ">
            </div>
            <h3 class="card-list-title">${movie.title}</h3>
            <p class="card-list-text">${genres} | ${
    new Date(movie.release_date).getFullYear() || ''
  } </p>
          </a>
        </li>`;
}
