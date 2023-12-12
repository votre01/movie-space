// movie.js

import { getMovieDetails } from './api.js';
import { formatDate, getMovieIdFromUrl, passMovieBtn } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const movieId = getMovieIdFromUrl();
    const movieDetails = await getMovieDetails(movieId);

    // Render movie details
    renderMovieDetails(movieDetails);
    const voteButton = document.getElementById("vote-btn");
    passMovieBtn("review.html", voteButton);

  } catch (error) {
    console.error('Error loading movie details:', error);
  }
});

function renderMovieDetails(movie) {
  const movieDetailsContainer = document.getElementById('movie-details');

  const moviePoster = document.createElement('img');
  moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  movieDetailsContainer.appendChild(moviePoster);

  const title = document.createElement('h3');
  title.textContent = movie.title;
  movieDetailsContainer.appendChild(title);

  const releaseDate = document.createElement('p');
  releaseDate.textContent = `Release Date: ${formatDate(movie.release_date)}`;
  movieDetailsContainer.appendChild(releaseDate);
  releaseDate.setAttribute("class", "release-date");

  const overview = document.createElement('p');
  overview.textContent = movie.overview;
  movieDetailsContainer.appendChild(overview);

  const voteAverage = document.createElement('p');
  voteAverage.textContent = `Vote Average: ${movie.vote_average}`;
  movieDetailsContainer.appendChild(voteAverage);
  voteAverage.setAttribute("class", "vote-average");


  const vote = document.createElement('button');
  vote.textContent = `Vote`;
  movieDetailsContainer.appendChild(vote);
  vote.setAttribute("class", "primary-btn");
  vote.setAttribute("id", "vote-btn");
}


