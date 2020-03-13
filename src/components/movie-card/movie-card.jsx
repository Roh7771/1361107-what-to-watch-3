import React from "react";
import PropTypes from 'prop-types';
import Player from "../movie-video-player/movie-video-player.jsx";
import withVideo from "../../hocs/with-video/with-video.js";
import {Link} from "react-router-dom";

const VideoPlayer = withVideo(Player);

let timer;

const MovieCard = ({film, onFilmMouseOver, onFilmMouseOut, activeCard, changeTab}) => {
  const {title, imgSrc, trailerSrc, id} = film;

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
        if (changeTab) {
          changeTab(`movieOverview`);
        }
        window.scrollTo(0, 0);
      }}
      className="small-movie-card catalog__movies-card"
    >
      <Link to={`/films/${id}`}>
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
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={`/films/${id}`}
          className="small-movie-card__link"
          href="movie-page.html"
        >
          {title}
        </Link>
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
  onFilmMouseOut: PropTypes.func.isRequired,
  activeCard: PropTypes.object.isRequired,
  changeTab: PropTypes.func,
};

export default MovieCard;
