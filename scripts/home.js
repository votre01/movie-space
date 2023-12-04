import { formatDate } from './utils.js';

export function renderHome(popularMovies) {
  // Render popular movies on the home page
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '<h2>Popular Movies</h2>';

  const movieList = document.createElement('ul');
  popularMovies.results.forEach((movie) => {
    const listItem = document.createElement('li');
    const moviePoster = document.createElement('img');

    listItem.innerHTML = `<img src=${movie.moviePoster} alt=${movie.title}>
                        <a href="">${movie.title}</a>
                        (${formatDate(movie.release_date)})`;
    movieList.appendChild(listItem);
  });

  mainContent.appendChild(movieList);
}