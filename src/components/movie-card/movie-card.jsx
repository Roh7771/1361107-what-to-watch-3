import React from "react";
import PropTypes from 'prop-types';
import Player from "../movie-video-player/movie-video-player.jsx";
import withVideo from "../../hocs/with-video/with-video.js";

const VideoPlayer = withVideo(Player);

let timer;

const MovieCard = ({film, onFilmMouseOver, onFilmMouseOut, onMovieCardClick, activeCard}) => {
  const {title, imgSrc, trailerSrc} = film;

  return (
    <article
      onMouseEnter={() => {
        timer = setTimeout(() => {
          onFilmMouseOver(film);
        }, 1000);
      }}
      onMouseLeave={() => {
        clearTimeout(timer);
        onFilmMouseOut({});
      }}
      onClick={() => {
        clearTimeout(timer);
        onMovieCardClick(film);
      }}
      className="small-movie-card catalog__movies-card"
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          isPlaying={activeCard === film}
          videoSrc={trailerSrc}
          posterSrc={imgSrc}
          isMuted
          widthAtr={280}
          heightAtr={175}
          type={`trailer`}
        />
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
    trailerSrc: PropTypes.string,
  }).isRequired,
  onFilmMouseOver: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onFilmMouseOut: PropTypes.func.isRequired,
  activeCard: PropTypes.object.isRequired,
};

export default MovieCard;
