const API_KEY="a0688f176816fa136c0be13dc6f9786c"
const BASE_URL="https://api.themoviedb.org/3"

export const fetchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.results;
}

export const fetchMovieDetails = async (movieId) => {
  // Fetch main movie details
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  const data = await response.json();

  // Fetch videos for the movie (trailers, teasers, etc.)
  const videosResponse = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  let trailerKey = null;
  if (videosResponse.ok) {
    const videosData = await videosResponse.json();
    // Find the first YouTube trailer
    const trailer = videosData.results.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer"
    );
    if (trailer) {
      trailerKey = trailer.key;
    }
  }

  // Add trailerKey to the movie details object
  return { ...data, trailerKey };
}

export const fetchPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  const data = await response.json();
  return data.results;
}