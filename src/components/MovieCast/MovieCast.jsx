import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../themoviedbApi";
import actorImg from "../../assets/actor-placeholder.jpg";

const MovieCast = () => {
  const {id: movieId} = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const movieCast = await getMovieCredits(movieId);
      setCast(movieCast || []);
    };
    fetchCast();
  }, [movieId]);

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
