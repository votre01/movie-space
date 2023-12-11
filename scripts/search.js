import { formatDate, passMovie } from "./utils.js";
import { imgUrl } from "./api.js";

export function renderHomeSearch(homeSearch) {
    // Render searched movies on the home page
    const homeSearchResults = document.getElementById('home-search-results');
    homeSearchResults.innerHTML = "<h3>Here's what we found</h3>";
  
    const movieSearchList = document.createElement('ul');
    homeSearch.results.forEach((movie) => {
      const searchListItem = document.createElement('li');
      const moviePoster = document.createElement('img');
  
      searchListItem.innerHTML = `<img src="${imgUrl}${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                                  <a href="#" id="${movie.id}" class="movie-title"><h3>${movie.title}</h3></a>
                                  <p>(${formatDate(movie.release_date)})<p>`;
      movieSearchList.appendChild(searchListItem);
    });
  
    homeSearchResults.appendChild(movieSearchList);
}

export function renderGenreSearch(genreSearch) {
    // Render searched movies on the home page
    const genreSearchResults = document.getElementById('genre-search-results');
    genreSearchResults.innerHTML = "<h3>Here's what we found</h3>";
  
    const genreSearchList = document.createElement('ul');
    genreSearch.results.forEach((movie) => {
      const genreListItem = document.createElement('li');
      const moviePoster = document.createElement('img');
  
      genreListItem.innerHTML = `<img src="${imgUrl}${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                                  <a href="#" id="${movie.id}" class="movie-title"><h3>${movie.title}</h3></a>
                                  <p>(${formatDate(movie.release_date)})<p>`;
      genreSearchList.appendChild(genreListItem);
    });
  
    genreSearchResults.appendChild(genreSearchList);
}
