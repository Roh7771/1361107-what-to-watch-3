import React from 'react';
import PropTypes from 'prop-types';

const getStarsListHtml = (stars) => {
  let newStarsList = [];
  stars.map((star, i) => [`${star}, `, <br key={`${i}-${star}`}></br>]).forEach((arr) => {
    newStarsList = newStarsList.concat(arr);
  });
  newStarsList.pop();
  newStarsList[newStarsList.length - 1] = newStarsList[newStarsList.length - 1].slice(0, -2);
  return newStarsList;
};

const convertFilmDuration = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};

const MovieDetails = ({film}) => {
  const {director, starring, filmDuration, genre, releaseYear} = film;
  let newStarsList = [];
  starring.map((star, i) => [`${star}, `, <br key={`${i}-${star}`}></br>]).forEach((arr) => {
    newStarsList = newStarsList.concat(arr);
  });
  newStarsList.pop();
  newStarsList[newStarsList.length - 1] = newStarsList[newStarsList.length - 1].slice(0, -2);
  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {getStarsListHtml(starring)}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{convertFilmDuration(filmDuration)}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{releaseYear}</span>
        </p>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
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

export default MovieDetails;
