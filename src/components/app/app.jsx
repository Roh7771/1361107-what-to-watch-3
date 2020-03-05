import React from "react";
import Main from "../main/main.jsx";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import MoviePage from "../movie-page/movie-page.jsx";
import {connect} from "react-redux";
import withVideo from "../../hocs/with-video/with-video.js";
import MovieVideoPlayer from "../movie-video-player/movie-video-player.jsx";
import {getPromoFilm, getFilmsToRender} from "../../reducer/data/selectors.js";
import {getChosenFilm, getFilmToWatch} from "../../reducer/appStatus/selectors.js";
import {ActionCreators} from "../../reducer/appStatus/appStatus.js";

const VideoPlayerWrapper = withVideo(MovieVideoPlayer);

const App = ({filmsToRender, promoFilm, chosenFilm, filmToWatch, onMovieCardClick, onPlayFilmButtonClick}) => {
  const renderApp = () => {
    if (filmToWatch) {
      return (
        <VideoPlayerWrapper
          title={filmToWatch.title}
          type={`movie`}
          className={`player__video`}
          isPlaying={false}
          posterSrc={filmToWatch.imgSrc}
          videoSrc={filmToWatch.videoSrc}
          onPlayFilmButtonClick={onPlayFilmButtonClick}
        />
      );
    }


    if (chosenFilm) {
      return (
        <MoviePage onPlayFilmButtonClick={onPlayFilmButtonClick} film={chosenFilm} onMovieCardClick={onMovieCardClick} />
      );
    }

    return (
      <Main
        promoFilm={promoFilm}
        onMovieCardClick={onMovieCardClick}
        onPlayFilmButtonClick={onPlayFilmButtonClick}
        filmsToRender={filmsToRender}
      />
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderApp()}
        </Route>
        <Route exact path="/dev-movie-page">
          <MoviePage onPlayFilmButtonClick={() => {}} onMovieCardClick={onMovieCardClick} film={chosenFilm ? chosenFilm : filmsToRender[0]}/>
        </Route>
        <Route exact path="/dev-movie-player">
          <VideoPlayerWrapper title={`Some Film`} type={`movie`} className={`player__video`} isPlaying={false} posterSrc={`https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png/220px-Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png`} videoSrc={`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  promoFilm: PropTypes.shape({
    promoFilmTitle: PropTypes.string,
    promoFilmGenre: PropTypes.string,
    promoFilmReleaseYear: PropTypes.number
  }).isRequired,
  filmsToRender: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  chosenFilm: PropTypes.object,
  onMovieCardClick: PropTypes.func.isRequired,
  filmToWatch: PropTypes.object,
  onPlayFilmButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoFilm: getPromoFilm(state),
  filmsToRender: getFilmsToRender(state),
  chosenFilm: getChosenFilm(state),
  filmToWatch: getFilmToWatch(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick: (chosenFilm) => {
    dispatch(ActionCreators.setChosenFilm(chosenFilm));
  },
  onPlayFilmButtonClick: (film) => {
    dispatch(ActionCreators.setFilmToWatch(film));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
