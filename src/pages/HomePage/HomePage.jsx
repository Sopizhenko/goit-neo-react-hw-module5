import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../themoviedbApi";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const trendingMovies = await getTrendingMovies();
      setTrending(trendingMovies || []);
    };
    fetchTrending();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {trending.length > 0 ? (
        <MovieList movies={trending} />
      ) : (
        <p>No trending movies</p>
      )}
    </div>
  );
};

export default HomePage;
