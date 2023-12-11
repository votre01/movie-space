// utils.js

export function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

export function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}

export function passMovie(pageLocation) {
  let movieTitles = document.querySelectorAll(".movie-title");

  for (let movieTitle of movieTitles) {
    movieTitle.addEventListener("click", function() {
      const movieId = movieTitle.getAttribute("id");
      const url = `${pageLocation}/movie.html?movie_id=${movieId}`;
      window.location.href = url;
    }); 
  }
}
