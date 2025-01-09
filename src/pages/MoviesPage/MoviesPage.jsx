import { useSearchParams } from "react-router-dom";
import MovieSearch from "../../components/MovieSearch/MovieSearch";
import { lazy, Suspense, useEffect, useState } from "react";
import { searchMovies } from "../../themoviedbApi";

const MoviesList = lazy(() => import("../../components/MovieList/MovieList"));

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const query = searchQuery.get("query");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery({ query: e.target.elements.query.value });
    e.target.reset();
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchMovies = async () => {
      const movies = await searchMovies(query);
      setMovies(movies || []);
    };

    fetchMovies();
  }, [query]);

  return (
    <>
      <MovieSearch handleSubmit={handleSubmit} />
      <Suspense fallback={<div>Loading...</div>}>
        {query && movies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          <MoviesList movies={movies} />
        )}
      </Suspense>
    </>
  );
};

export default MoviesPage;
