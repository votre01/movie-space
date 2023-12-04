// movie.js

import { getMovieDetails } from './api.js';
import { formatDate, formatNumber } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const movieId = getMovieIdFromUrl();
    const movieDetails = await getMovieDetails(movieId);

    // Render movie details
    renderMovieDetails(movieDetails);

    // Add event listeners for navigation, etc.
    document.getElementById('home-link').addEventListener('click', () => {
      // Handle navigation to the home page
    });
    // Add more event listeners for other navigation links
  } catch (error) {
    console.error('Error loading movie details:', error);
  }
});

function getMovieIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  if (!movieId) {
    console.error('Movie ID not found in the URL');

  }

  return movieId;
}

function renderMovieDetails(movie) {
  const movieDetailsContainer = document.getElementById('movie-details');

  const moviePoster = document.createElement('img');
  moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  movieDetailsContainer.appendChild(moviePoster);

  const title = document.createElement('h2');
  title.textContent = movie.title;
  movieDetailsContainer.appendChild(title);

  const releaseDate = document.createElement('p');
  releaseDate.textContent = `Release Date: ${formatDate(movie.release_date)}`;
  movieDetailsContainer.appendChild(releaseDate);

  const overview = document.createElement('p');
  overview.textContent = movie.overview;
  movieDetailsContainer.appendChild(overview);

  const voteAverage = document.createElement('p');
  voteAverage.textContent = `Vote Average: ${movie.vote_average}`;
  movieDetailsContainer.appendChild(voteAverage);

}
