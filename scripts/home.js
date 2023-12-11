import { formatDate } from "./utils.js";
import { imgUrl } from "./api.js";


export function renderPopularMovies(popularMovies) {
  // Render popular movies on the home page
  const popular = document.getElementById("popular-movies");
  popular.innerHTML = "<h3>Popular Movies</h3>";

  const popularMovieList = document.createElement('ul');
  popularMovieList.setAttribute("id", "popMovies");
  popularMovies.results.forEach((movie) => {
    const listItem = document.createElement('li');    

    listItem.innerHTML = `<img src="${imgUrl}${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                        <a href="#" id="${movie.id}" class="movie-title"><h3>${movie.title}</h3></a>
                        <p>(${formatDate(movie.release_date)})<p>`;
    popularMovieList.appendChild(listItem);

  });

  popular.appendChild(popularMovieList);
}





