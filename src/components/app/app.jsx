import React from "react";
import Main from "../main/main.jsx";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayer from "../video-player/video-player.jsx";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer.js";

const App = ({filmsList, promoFilm, chosenFilm, onMovieCardClick}) => {
  const renderApp = () => {
    if (chosenFilm) {
      return (
        <MoviePage film={chosenFilm} onMovieCardClick={onMovieCardClick} filmsList={filmsList} />
      );
    }

    return (
      <Main
        promoFilm={promoFilm}
        onMovieCardClick={onMovieCardClick}
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
          <MoviePage onMovieCardClick={onMovieCardClick} filmsList={filmsList} film={chosenFilm ? chosenFilm : filmsList[0]}/>
        </Route>
        <Route exact path="/dev-video-player">
          <VideoPlayer posterSrc="img/revenant.jpg" isPlaying={false} videoSrc="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"/>
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
  filmsList: PropTypes.arrayOf(PropTypes.shape({
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
};

const mapStateToProps = (state) => ({
  promoFilm: state.promoFilm,
  filmsList: state.filmsList,
  chosenFilm: state.chosenFilm
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick: (chosenFilm) => {
    dispatch(ActionCreators.setChosenFilm(chosenFilm));
  }
});


export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
