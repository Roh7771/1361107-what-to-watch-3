import React from "react";
import Main from "../main/main.jsx";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import MoviePage from "../movie-page/movie-page.jsx";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer.js";
import withVideo from "../../hocs/with-video/with-video.js";
import TrailerVideoPlayer from "../trailer-video-player/trailer-video-player.jsx";

const VideoPlayerWrapper = withVideo(TrailerVideoPlayer);

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
        <Route exact path="/dev-movie-player">
          <div className="player">
            <VideoPlayerWrapper className={`player__video`} isPlaying={true} posterSrc={`https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png/220px-Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png`} videoSrc={`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}/>

            <button type="button" className="player__exit">Exit</button>

            <div className="player__controls">
              <div className="player__controls-row">
                <div className="player__time">
                  <progress className="player__progress" value="30" max="100"></progress>
                  <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
                </div>
                <div className="player__time-value">1:30:29</div>
              </div>

              <div className="player__controls-row">
                <button type="button" className="player__play">
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </button>
                <div className="player__name">Transpotting</div>

                <button type="button" className="player__full-screen">
                  <svg viewBox="0 0 27 27" width="27" height="27">
                    <use xlinkHref="#full-screen"></use>
                  </svg>
                  <span>Full screen</span>
                </button>
              </div>
            </div>
          </div>
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
