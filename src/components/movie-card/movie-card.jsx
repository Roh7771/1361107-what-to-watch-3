import React from "react";
import PropTypes from 'prop-types';

const MovieCard = ({film, onFilmMouseOver, onFilmMouseOut, onMovieCardClick}) => {
  const {title, imgSrc} = film;

  return (
    <article
      onMouseEnter={() => {
        onFilmMouseOver(film);
      }}
      onMouseLeave={() => {
        onFilmMouseOut();
      }}
      onClick={() => {
        onMovieCardClick(film);
      }}
      className="small-movie-card catalog__movies-card"
    >
      <div className="small-movie-card__image">
        <img src={imgSrc} alt="" width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a
          onClick={(e) => {
            e.preventDefault();
            onMovieCardClick(film);
          }}
          className="small-movie-card__link"
          href="movie-page.html"
        >
          {title}
        </a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    id: PropTypes.id,
  }).isRequired,
  onFilmMouseOver: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onFilmMouseOut: PropTypes.func.isRequired,
};

export default MovieCard;
