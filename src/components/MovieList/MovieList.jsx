import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`} state={location}>{movie.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
