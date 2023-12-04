// index.js

import { getPopularMovies } from './api.js';
import { renderHome } from './home.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch popular movies
    const popularMovies = await getPopularMovies();

    // Render home page with popular movies
    renderHome(popularMovies);

    // Add event listeners for navigation, etc.
    document.getElementById('home-link').addEventListener('click', () => {
      // Handle navigation to the home page
    });
    document.getElementById('genre-link').addEventListener('click', () => {
      // Handle navigation to the genre page
    });
    document.getElementById('search-link').addEventListener('click', () => {
      // Handle navigation to the search page
    });
  } catch (error) {
    console.error('Error initializing the app:', error);
  }
});
