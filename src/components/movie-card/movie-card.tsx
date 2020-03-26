import * as React from "react";
import Player from "../movie-video-player/movie-video-player";
import withVideo from "../../hocs/with-video/with-video";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {Film, VideoPlayerType} from "../../types";

const VideoPlayer = withVideo(Player);

let timer;

interface Props {
  film: Film;
  onFilmMouseOver: (film: Film) => void;
  onFilmMouseOut: (film: {}) => void;
  activeCard: Film;
  changeTab: (tab: string) => void;
}

const MovieCard: React.FunctionComponent<Props> = (props: Props) => {
  const {
    film,
    onFilmMouseOver,
    onFilmMouseOut,
    activeCard,
    changeTab
  } = props;
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
      <Link to={`${AppRoute.FILM}/${id}`}>
        <div className="small-movie-card__image">
          <VideoPlayer
            isPlaying={activeCard === film}
            videoSrc={trailerSrc}
            posterSrc={imgSrc}
            isMuted
            widthAtr={280}
            heightAtr={175}
            type={VideoPlayerType.TRAILER}
          />
        </div>
      </Link>
      <h3 className="small-movie-card__title">
        <Link
          to={`${AppRoute.FILM}/${id}`}
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

};

export default MovieCard;
