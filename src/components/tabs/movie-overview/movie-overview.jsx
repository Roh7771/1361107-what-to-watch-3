import React, {Fragment} from "react";
import PropTypes from "prop-types";

const getRatingLevel = (ratingScore) => {
  if (ratingScore < 3) {
    return `Bad`;
  }
  if (ratingScore >= 3 && ratingScore < 5) {
    return `Normal`;
  }
  if (ratingScore >= 5 && ratingScore < 8) {
    return `Good`;
  }
  if (ratingScore >= 8 && ratingScore < 10) {
    return `Very good`;
  }
  if (ratingScore === 10) {
    return `Awesome`;
  }
  return `No rating`;
};

const MovieOverview = ({film}) => {
  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">
          {String(film.ratingScore).replace(`.`, `,`)}
        </div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">
            {getRatingLevel(film.ratingScore)}
          </span>
          <span className="movie-rating__count">{`${film.ratingCount} ratings`}</span>
        </p>
      </div>

      <div className="movie-card__text">
        {film.description.map((el, i) => {
          return <p key={`${i + 1}-descr`}>{el}</p>;
        })}
        <p className="movie-card__director">
          <strong>{`Director: ${film.director}`}</strong>
        </p>
        <p className="movie-card__starring">
          <strong>{`Starring: ${film.starring.reduce(
              (prev, next) => `${prev}, ${next}`
          )} and other`}</strong>
        </p>
      </div>
    </Fragment>
  );
};

MovieOverview.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    releaseYear: PropTypes.number,
    imgSrc: PropTypes.string,
    bgSrc: PropTypes.string,
    posterSrc: PropTypes.string,
    ratingScore: PropTypes.number,
    ratingCount: PropTypes.number,
    description: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number,
    filmDuration: PropTypes.number,
    reviews: PropTypes.array,
  })
};

export default MovieOverview;
