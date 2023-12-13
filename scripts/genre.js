// genre.js

import { getMoviesByGenre, apiKey } from './api.js';
import { renderGenreSearch } from './search.js';
import genreIds from './genreIds.json' assert { type: 'json' };
import { passMovie } from './utils.js';
console.log(genreIds);

document.addEventListener('DOMContentLoaded', async () => {
  try {

    async function searchedGenre() {
        // Get search query
      let genreSearchQuery = document.getElementById("genre-search-input").value.toLowerCase().trim();

      // Get genre ID
      const genreSearch = await getMoviesByGenre(genreIds[genreSearchQuery]);
    
      console.log(genreIds[genreSearchQuery]);

      // Render movies by genre
      renderGenreSearch(genreSearch);

      // Pass movieId to details page
      const movieTitles = document.querySelectorAll(".movie-title");
      passMovie("./movie.html", movieTitles);
    }

    // Render me page with searched movie(s)
    document.getElementById("genre-search-btn").addEventListener("click", searchedGenre);

  } catch (error) {
    console.error('Error initializing the app:', error);
  }
});