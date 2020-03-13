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
  getUserFavoriteFilms,
  getAllFilms,
  getFilmComments
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
import PrivateRoute from "../routes/private-route/private-route.jsx";
import Footer from "../footer/footer.jsx";

const VideoPlayerWrapper = withVideo(MovieVideoPlayer);
const AddReviewWrapper = withTextState(withActiveItem(AddReview));
const MoviePageWrapper = withActiveItem(MoviePage);

const App = ({
  filmsToRender,
  promoFilm,
  login,
  onMovieCardClick,
  onReviewSend,
  authorizationStatus,
  onPlayFilmButtonClick,
  changeFormSendingStatus,
  isFormSending,
  formErrorMessage,
  isFilmsLoading,
  userFavoriteFilms,
  setFilmFavoriteStatus,
  allFilms,
  filmComments,
  onReviewButtonClick
}) => {
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
                userFavoriteFilms={userFavoriteFilms}
                setFilmFavoriteStatus={setFilmFavoriteStatus}
              >
                <Footer/>
              </Main>
            );
          }}
        />
        <Route
          exact
          path="/films/:id"
          render={(propsFromRoute) => {
            const filmToRender = allFilms.find((film) => film.id === +propsFromRoute.match.params.id);
            return (
              <MoviePageWrapper
                activeItem={`movieOverview`}
                onPlayFilmButtonClick={onPlayFilmButtonClick}
                film={filmToRender}
                onMovieCardClick={onMovieCardClick}
                authorizationStatus={authorizationStatus}
                isFilmsLoading={isFilmsLoading}
                setFilmFavoriteStatus={setFilmFavoriteStatus}
                filmComments={filmComments}
                onReviewButtonClick={onReviewButtonClick}
              >
                <Footer withLink />
              </MoviePageWrapper>
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
              >
                <Footer withLink/>
              </SignIn>
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
              >
                <Footer withLink/>
              </MyList>
            );
          }}
        />
        <PrivateRoute
          exact
          authorizationStatus={authorizationStatus}
          path="/films/:id/review"
          render={(propsFromRoute) => {
            const reviewedFilm = allFilms.find((film) => film.id === +propsFromRoute.match.params.id);
            return (
              <AddReviewWrapper
                changeFormSendingStatus={changeFormSendingStatus}
                onReviewSend={onReviewSend}
                reviewedFilm={reviewedFilm}
                activeItem={3}
                isFormSending={isFormSending}
                formErrorMessage={formErrorMessage}
              />
            );
          }}
        />
        <Route
          exact
          path="/player/:id"
          render={(propsFromRoute) => {
            const filmToWatch = allFilms.find((film) => film.id === +propsFromRoute.match.params.id);
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
          }}
        />
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
  allFilms: PropTypes.arrayOf(
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
  onReviewSend: PropTypes.func.isRequired,
  changeFormSendingStatus: PropTypes.func.isRequired,
  isFormSending: PropTypes.bool.isRequired,
  formErrorMessage: PropTypes.string,
  isFilmsLoading: PropTypes.bool.isRequired,
  setFilmFavoriteStatus: PropTypes.func.isRequired,
  onReviewButtonClick: PropTypes.func.isRequired,
  filmComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    rating: PropTypes.number,
    comment: PropTypes.string,
    data: PropTypes.string,
  })),
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
  userFavoriteFilms: getUserFavoriteFilms(state),
  allFilms: getAllFilms(state),
  filmComments: getFilmComments(state),
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
  onReviewSend: (id, comment, rating) => {
    dispatch(DataOperation.sendReview(id, comment, rating));
  },
  changeFormSendingStatus: (value) => {
    dispatch(ActionCreators.changeFormSendingStatus(value));
  },
  setFilmFavoriteStatus: (id, value) => {
    dispatch(DataOperation.setFilmFavoriteStatus(id, value));
  },
  onReviewButtonClick: (id) => {
    dispatch(DataOperation.getFilmComments(id));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
