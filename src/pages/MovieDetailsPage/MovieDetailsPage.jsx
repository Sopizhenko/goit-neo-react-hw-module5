import css from "./MovieDetailsPage.module.css";
import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useParams , NavLink, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../themoviedbApi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import clsx from "clsx";


const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const previousLocationRef = useRef(location.state?.from ?? "/");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      const movie = await getMovieDetails(id);
      setMovie(movie);
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const { title, overview, genres, poster_path, vote_average } = movie;

  return (
    <main>
      <button
        className={css.gobackBtn}
        type="button"
        onClick={() => navigate(previousLocationRef.current)}
      >
        <IoArrowBackCircleOutline /> Go back
      </button>
      <div className={css.info}>
        <img
          className={css.poster}
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
        <div>
          <h1>{title}</h1>
          <p>User score: {Math.round(vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <ul className={css.genres}>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <h2>Additional information</h2>
      <ul className={css.additionalInfo}>
        <li>
          <NavLink
            to="cast"
            state={movie.id}
            replace
            className={buildLinkClass}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            state={movie.id}
            replace
            className={buildLinkClass}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
