// api.js

const apiKey = 'a7755f43714efef1105e70a67ece7032';
const apiUrl = 'https://api.themoviedb.org/3';

async function fetchData(endpoint, params = {}) {
  const url = new URL(`${apiUrl}${endpoint}`);
  url.searchParams.append('api_key', apiKey);

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      url.searchParams.append(key, params[key]);
    }
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getPopularMovies() {
  const endpoint = '/movie/popular';
  const params = { language: 'en-US', page: 1 };
  return fetchData(endpoint, params);
}

export async function getMovieDetails(movieId) {
  const endpoint = `/movie/${movieId}`;
  const params = { language: 'en-US' };
  return fetchData(endpoint, params);
}

export async function getMoviesByGenre(genreId) {
  const endpoint = '/discover/movie';
  const params = { with_genres: genreId, language: 'en-US', page: 1 };
  return fetchData(endpoint, params);
}

export async function searchMovies(query) {
  const endpoint = '/search/movie';
  const params = { query, language: 'en-US', page: 1 };
  return fetchData(endpoint, params);
}
