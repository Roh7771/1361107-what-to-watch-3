import React from "react";
import PropTypes from 'prop-types';
import VideoPlayer from "../video-player/video-player.jsx";

const MovieCard = ({film, onFilmMouseOver, onFilmMouseOut, onMovieCardClick, activeCard}) => {
  const {title, imgSrc, videoSrc} = film;

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
        <VideoPlayer isPlaying={activeCard === film} videoSrc={videoSrc} posterSrc={imgSrc}/>
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
    videoSrc: PropTypes.string,
  }).isRequired,
  onFilmMouseOver: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onFilmMouseOut: PropTypes.func.isRequired,
  activeCard: PropTypes.object.isRequired,
};

export default MovieCard;
