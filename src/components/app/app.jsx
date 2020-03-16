import React from "react";
import Main from "../main/main.jsx";
import {Switch, Route} from "react-router-dom";
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
import LoginRoute from "../routes/login-route/login-route.jsx";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../routes/private-route/private-route.jsx";
import Footer from "../footer/footer.jsx";
import {AppRoute} from "../../const.js";

const VideoPlayerWrapper = withVideo(MovieVideoPlayer);
const AddReviewWrapper = withTextState(withActiveItem(AddReview));
const MoviePageWrapper = withActiveItem(MoviePage);

const App = ({
  filmsToRender,
  promoFilm,
  onLoginFormSubmit,
  onReviewSend,
  authorizationStatus,
  isFormSending,
  formErrorMessage,
  isFilmsLoading,
  userFavoriteFilms,
  onFavoriteButtonClick,
  allFilms,
  filmComments,
  setFilmComments
}) => {
  return (
    <Switch>
      <Route
        exact
        path={`${AppRoute.ROOT}`}
        render={() => {
          return (
            <Main
              authorizationStatus={authorizationStatus}
              promoFilm={promoFilm}
              filmsToRender={filmsToRender}
              userFavoriteFilms={userFavoriteFilms}
              onFavoriteButtonClick={onFavoriteButtonClick}
            >
              <Footer />
            </Main>
          );
        }}
      />
      <Route
        exact
        path={`${AppRoute.FILM}/:id`}
        render={(propsFromRoute) => {
          const filmToRender = allFilms.find(
              (film) => film.id === +propsFromRoute.match.params.id
          );
          return (
            <MoviePageWrapper
              activeItem={`movieOverview`}
              film={filmToRender}
              authorizationStatus={authorizationStatus}
              isFilmsLoading={isFilmsLoading}
              onFavoriteButtonClick={onFavoriteButtonClick}
              filmComments={filmComments}
              setFilmComments={setFilmComments}
            >
              <Footer withLink />
            </MoviePageWrapper>
          );
        }}
      />
      <LoginRoute
        authorizationStatus={authorizationStatus}
        exact
        path={`${AppRoute.LOGIN}`}
        render={() => {
          return (
            <SignIn
              onLoginFormSubmit={onLoginFormSubmit}
              formErrorMessage={formErrorMessage}
              isFormSending={isFormSending}
            >
              <Footer withLink />
            </SignIn>
          );
        }}
      />
      <Route
        exact
        path={`${AppRoute.MY_LIST}`}
        render={() => {
          return (
            <MyList userFavoriteFilms={userFavoriteFilms}>
              <Footer withLink />
            </MyList>
          );
        }}
      />
      <PrivateRoute
        exact
        authorizationStatus={authorizationStatus}
        path={`${AppRoute.FILM}/:id/review`}
        render={(propsFromRoute) => {
          const reviewedFilm = allFilms.find(
              (film) => film.id === +propsFromRoute.match.params.id
          );
          return (
            <AddReviewWrapper
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
        path={`${AppRoute.PLAYER}/:id`}
        render={(propsFromRoute) => {
          const filmToWatch = allFilms.find(
              (film) => film.id === +propsFromRoute.match.params.id
          );
          return (
            <VideoPlayerWrapper
              title={filmToWatch.title}
              type={`movie`}
              className={`player__video`}
              isPlaying={false}
              posterSrc={filmToWatch.imgSrc}
              videoSrc={filmToWatch.videoSrc}
            />
          );
        }}
      />
    </Switch>
  );
};

App.propTypes = {
  promoFilm: PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    releaseYear: PropTypes.number,
    posterSrc: PropTypes.string,
    bgSrc: PropTypes.string,
    videoSrc: PropTypes.string,
    id: PropTypes.number,
    isFavorite: PropTypes.bool
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
  onLoginFormSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onReviewSend: PropTypes.func.isRequired,
  isFormSending: PropTypes.bool.isRequired,
  formErrorMessage: PropTypes.string,
  isFilmsLoading: PropTypes.bool.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  setFilmComments: PropTypes.func.isRequired,
  filmComments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        }),
        rating: PropTypes.number,
        comment: PropTypes.string,
        data: PropTypes.string
      })
  )
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  promoFilm: getPromoFilm(state),
  filmsToRender: getFilmsToRender(state),
  isFormSending: getFormSendingStatus(state),
  formErrorMessage: getFormErrorMessage(state),
  isFilmsLoading: getFilmsLoadingStatus(state),
  userFavoriteFilms: getUserFavoriteFilms(state),
  allFilms: getAllFilms(state),
  filmComments: getFilmComments(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoginFormSubmit: (authData) => {
    dispatch(UserOperation.login(authData));
    dispatch(ActionCreators.changeFormSendingStatus(true));
  },
  onReviewSend: (id, comment, rating) => {
    dispatch(DataOperation.sendReview(id, comment, rating));
    dispatch(ActionCreators.changeFormSendingStatus(true));
  },
  onFavoriteButtonClick: (id, value) => {
    dispatch(DataOperation.setFilmFavoriteStatus(id, value));
  },
  setFilmComments: (id) => {
    dispatch(DataOperation.getFilmComments(id));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
