import React from "react";
import Main from "../main/main.jsx";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayer from "../video-player/video-player.jsx";

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {chosenFilm: null};
    this._renderApp = this._renderApp.bind(this);
    this._handlerMovieCardClick = this._handlerMovieCardClick.bind(this);
  }

  _handlerMovieCardClick(chosenFilm) {
    this.setState({
      chosenFilm
    });
  }

  _renderApp() {
    const {filmsList, promoFilm} = this.props;
    const {chosenFilm} = this.state;

    if (chosenFilm) {
      return (
        <MoviePage film={chosenFilm} />
      );
    }

    return (
      <Main
        filmsList={filmsList}
        promoFilm={promoFilm}
        onMovieCardClick={this._handlerMovieCardClick}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePage film={this.state.chosenFilm ? this.state.chosenFilm : this.props.filmsList[0]}/>
          </Route>
          <Route exact path="/dev-video-player">
            <VideoPlayer posterSrc="img/revenant.jpg" isPlaying={false} videoSrc="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4"/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoFilm: PropTypes.shape({
    promoFilmTitle: PropTypes.string,
    promoFilmGenre: PropTypes.string,
    promoFilmReleaseYear: PropTypes.number
  }).isRequired,
  filmsList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        imgSrc: PropTypes.string,
        id: PropTypes.id
      })
  ).isRequired
};

export default App;
