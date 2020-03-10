import React from "react";
import Main from "../main/main.jsx";
import {Router, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import MoviePage from "../movie-page/movie-page.jsx";
import {connect} from "react-redux";
import withVideo from "../../hocs/with-video/with-video.js";
import MovieVideoPlayer from "../movie-video-player/movie-video-player.jsx";
import {
  getPromoFilm,
  getFilmsToRender,
  getUserFavoriteFilms
} from "../../reducer/data/selectors.js";
import {
  getChosenFilm,
  getFilmToWatch,
  getLoggingStatus,
  getFormSendingStatus,
  getFormErrorMessage,
  getFilmsLoadingStatus
} from "../../reducer/appStatus/selectors.js";
import {ActionCreators} from "../../reducer/appStatus/appStatus.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import SignIn from "../sign-in/sign-in.jsx";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import AddReview from "../add-review/add-review.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import withTextState from "../../hocs/with-text-state/with-text-state.js";
import history from "../../history.js";
import LoginRoute from "../routes/login-route/login-route.jsx";
import MyList from "../my-list/my-list.jsx";

const VideoPlayerWrapper = withVideo(MovieVideoPlayer);
const AddReviewWrapper = withTextState(withActiveItem(AddReview));

const App = ({
  filmsToRender,
  promoFilm,
  login,
  changeLoggingStatus,
  onMovieCardClick,
  onReviewSend,
  authorizationStatus,
  onPlayFilmButtonClick,
  changeFormSendingStatus,
  isFormSending,
  formErrorMessage,
  isFilmsLoading,
  userFavoriteFilms,
  setFilmFavoriteStatus
}) => {
  // const renderApp = () => {
  //   if (filmToWatch) {
  //     return (
  //       <VideoPlayerWrapper
  //         title={filmToWatch.title}
  //         type={`movie`}
  //         className={`player__video`}
  //         isPlaying={false}
  //         posterSrc={filmToWatch.imgSrc}
  //         videoSrc={filmToWatch.videoSrc}
  //         onPlayFilmButtonClick={onPlayFilmButtonClick}
  //       />
  //     );
  //   }

  //   if (chosenFilm) {
  //     return (
  //       <MoviePage
  //         onPlayFilmButtonClick={onPlayFilmButtonClick}
  //         film={chosenFilm}
  //         onMovieCardClick={onMovieCardClick}
  //         authorizationStatus={authorizationStatus}
  //       />
  //     );
  //   }
  // };

  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Main
                authorizationStatus={authorizationStatus}
                promoFilm={promoFilm}
                onMovieCardClick={onMovieCardClick}
                onPlayFilmButtonClick={onPlayFilmButtonClick}
                filmsToRender={filmsToRender}
                onSignInClick={changeLoggingStatus}
                userFavoriteFilms={userFavoriteFilms}
                setFilmFavoriteStatus={setFilmFavoriteStatus}
              />
            );
          }}
        />
        <Route
          exact
          path="/films/:id"
          render={(propsFromRoute) => {
            return (
              <MoviePage
                onPlayFilmButtonClick={onPlayFilmButtonClick}
                film={filmsToRender[propsFromRoute.match.params.id]}
                onMovieCardClick={onMovieCardClick}
                authorizationStatus={authorizationStatus}
                isFilmsLoading={isFilmsLoading}
              />
            );
          }}
        />
        <LoginRoute
          authorizationStatus={authorizationStatus}
          exact
          path="/login"
          render={() => {
            return (
              <SignIn
                onSubmit={login}
                formErrorMessage={formErrorMessage}
                changeFormSendingStatus={changeFormSendingStatus}
                isFormSending={isFormSending}
              />
            );
          }}
        />
        <Route
          exact
          path="/mylist"
          render={() => {
            return (
              <MyList
                onMovieCardClick={onMovieCardClick}
                userFavoriteFilms={userFavoriteFilms}
              />
            );
          }}
        />
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
    </Router>
  );
};

App.propTypes = {
  promoFilm: PropTypes.shape({
    promoFilmTitle: PropTypes.string,
    promoFilmGenre: PropTypes.string,
    promoFilmReleaseYear: PropTypes.number
  }).isRequired,
  userFavoriteFilms: PropTypes.arrayOf(
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
  isFilmsLoading: PropTypes.bool.isRequired,
  setFilmFavoriteStatus: PropTypes.func.isRequired,
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
  isFilmsLoading: getFilmsLoadingStatus(state),
  userFavoriteFilms: getUserFavoriteFilms(state)
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
  changeFormSendingStatus: (value) => {
    dispatch(ActionCreators.changeFormSendingStatus(value));
  },
  setFilmFavoriteStatus: (id, value) => {
    dispatch(DataOperation.setFilmFavoriteStatus(id, value));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
