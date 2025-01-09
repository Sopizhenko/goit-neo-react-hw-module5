import css from "./MovieCast.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../themoviedbApi";
import actorImg from "../../assets/actor-placeholder.jpg";

const MovieCast = () => {
  const location = useLocation();
  const [cast, setCast] = useState([]);
  console.log(cast);

  useEffect(() => {
    const fetchCast = async () => {
      const movieCast = await getMovieCredits(location.state);
      setCast(movieCast || []);
    };
    fetchCast();
  }, [location.state]);

  return (
    <div>
      {cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.castItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : actorImg
                }
                alt={actor.name}
                className={css.castImage}
                width={200}
                height={300}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information</p>
      )}
    </div>
  );
};

export default MovieCast;
