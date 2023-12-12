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

export function passMovie(pageLocation, items) {

  for (let item of items) {
    item.addEventListener("click", function() {
      const movieId = item.getAttribute("id");
      const url = `${pageLocation}?movie_id=${movieId}`;
      window.location.href = url;
    }); 
  }
}

export function passMovieBtn(pageLocation, item) {

    item.addEventListener("click", function() {
      const movieId = getMovieIdFromUrl();
      const url = `${pageLocation}?movie_id=${movieId}`;
      window.location.href = url;
    }); 
}

export function getMovieIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('movie_id');

  if (!movieId) {
    console.error('Movie ID not found in the URL');

  }

  return movieId;
}
