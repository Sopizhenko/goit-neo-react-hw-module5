import axios from "axios";

// APIClient for themoviedb.org
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGM2OGQ4NDFmYWNjZTRmM2JmY2I3NTI3Y2NkZjk3YiIsIm5iZiI6MTczNjM2NjY1OC43MzYsInN1YiI6IjY3N2VkYTQyNzczMjIwOWUxN2JiMWE5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7wpZVlZovh02zZbhBsBCPw6CSufeXzvMyGPhusHErnA";

const API_BASE_URL = "https://api.themoviedb.org/3";

async function fetchFromApi(endpoint) {
  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from endpoint: ${endpoint}`, error);
    throw error;
  }
}

export async function getTrendingMovies() {
  const data = await fetchFromApi("/trending/movie/day");
  return data.results;
}

export async function getMovieDetails(movieId) {
  return await fetchFromApi(`/movie/${movieId}`);
}

export async function getMovieCredits(movieId) {
  const data = await fetchFromApi(`/movie/${movieId}/credits`);
  return data.cast;
}

export async function getMovieReviews(movieId) {
  const data = await fetchFromApi(`/movie/${movieId}/reviews`);
  return data.results;
}

export async function searchMovies(query) {
  const data = await fetchFromApi(`/search/movie?query=${encodeURIComponent(query)}`);
  return data.results;
}
