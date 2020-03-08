import React from "react";
import Main from "../main/main.jsx";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import MoviePage from "../movie-page/movie-page.jsx";
import {connect} from "react-redux";
import withVideo from "../../hocs/with-video/with-video.js";
import MovieVideoPlayer from "../movie-video-player/movie-video-player.jsx";
import {
  getPromoFilm,
  getFilmsToRender
} from "../../reducer/data/selectors.js";
import {
  getChosenFilm,
  getFilmToWatch,
  getLoggingStatus,
  getFormSendingStatus,
  getFormErrorMessage
} from "../../reducer/appStatus/selectors.js";
import {ActionCreators} from "../../reducer/appStatus/appStatus.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import SignIn from "../sign-in/sign-in.jsx";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import AddReview from "../add-review/add-review.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import withTextState from "../../hocs/with-text-state/with-text-state.js";

const VideoPlayerWrapper = withVideo(MovieVideoPlayer);
const AddReviewWrapper = withTextState(withActiveItem(AddReview));

const App = ({
  filmsToRender,
  promoFilm,
  chosenFilm,
  login,
  filmToWatch,
  isLogging,
  changeLoggingStatus,
  onMovieCardClick,
  onReviewSend,
  authorizationStatus,
  onPlayFilmButtonClick,
  changeFormSendingStatus,
  isFormSending,
  formErrorMessage
}) => {
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
        <MoviePage
          onPlayFilmButtonClick={onPlayFilmButtonClick}
          film={chosenFilm}
          onMovieCardClick={onMovieCardClick}
          authorizationStatus={authorizationStatus}
        />
      );
    }

    if (isLogging) {
      return <SignIn onSubmit={login} />;
    }

    return (
      <Main
        authorizationStatus={authorizationStatus}
        promoFilm={promoFilm}
        onMovieCardClick={onMovieCardClick}
        onPlayFilmButtonClick={onPlayFilmButtonClick}
        filmsToRender={filmsToRender}
        onSignInClick={changeLoggingStatus}
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
          <MoviePage
            onPlayFilmButtonClick={() => {}}
            onMovieCardClick={onMovieCardClick}
            film={chosenFilm ? chosenFilm : filmsToRender[0]}
            authorizationStatus={authorizationStatus}
          />
        </Route>
        <Route exact path="/dev-movie-player">
          <VideoPlayerWrapper
            title={`Some Film`}
            type={`movie`}
            className={`player__video`}
            isPlaying={false}
            posterSrc={`https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png/220px-Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png`}
            videoSrc={`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
          />
        </Route>
        <Route exact path="/dev-auth">
          <SignIn onSubmit={login} />
        </Route>
        <Route exact path="/dev-review">
          <AddReviewWrapper
            changeFormSendingStatus={changeFormSendingStatus}
            onReviewSend={onReviewSend}
            id={5}
            movieTitle={`The Grand Budapest Hotel`}
            movieBg={`img/bg-the-grand-budapest-hotel.jpg`}
            moviePoster={`img/the-grand-budapest-hotel-poster.jpg`}
            activeItem={3}
            isFormSending={isFormSending}
            formErrorMessage={formErrorMessage}
          />
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
  filmsToRender: PropTypes.arrayOf(
      PropTypes.shape({
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
        reviews: PropTypes.array
      })
  ).isRequired,
  chosenFilm: PropTypes.object,
  onMovieCardClick: PropTypes.func.isRequired,
  filmToWatch: PropTypes.object,
  onPlayFilmButtonClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  isLogging: PropTypes.bool.isRequired,
  changeLoggingStatus: PropTypes.func.isRequired,
  onReviewSend: PropTypes.func.isRequired,
  changeFormSendingStatus: PropTypes.func.isRequired,
  isFormSending: PropTypes.bool.isRequired,
  formErrorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  promoFilm: getPromoFilm(state),
  filmsToRender: getFilmsToRender(state),
  chosenFilm: getChosenFilm(state),
  filmToWatch: getFilmToWatch(state),
  isLogging: getLoggingStatus(state),
  isFormSending: getFormSendingStatus(state),
  formErrorMessage: getFormErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick: (chosenFilm) => {
    dispatch(ActionCreators.setChosenFilm(chosenFilm));
  },
  onPlayFilmButtonClick: (film) => {
    dispatch(ActionCreators.setFilmToWatch(film));
  },
  login: (authData) => {
    dispatch(UserOperation.login(authData));
  },
  changeLoggingStatus: () => {
    dispatch(ActionCreators.changeLoggingStatus());
  },
  onReviewSend: (id, comment, rating) => {
    dispatch(DataOperation.sendReview(id, comment, rating));
  },
  changeFormSendingStatus: () => {
    dispatch(ActionCreators.changeFormSendingStatus());
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
