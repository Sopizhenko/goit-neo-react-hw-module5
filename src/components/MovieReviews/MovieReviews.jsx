import css from "./MovieReviews.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieReviews } from "../../themoviedbApi";

const MovieReviews = () => {
  const location = useLocation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const movieReviews = await getMovieReviews(location.state);
      setReviews(movieReviews || []);
    };
    fetchReviews();
  }, [location.state]);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <h2>{review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews</p>
      )}
    </div>
  );
};

export default MovieReviews;
