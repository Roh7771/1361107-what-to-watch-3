import * as React from "react";
import Main from "../main/main";
import {Switch, Route} from "react-router-dom";
import MoviePage from "../movie-page/movie-page";
import {connect} from "react-redux";
import withVideo from "../../hocs/with-video/with-video";
import MovieVideoPlayer from "../movie-video-player/movie-video-player";
import {
  getPromoFilm,
  getFilmsToRender,
  getUserFavoriteFilms,
  getAllFilms,
  getFilmComments
} from "../../reducer/data/selectors";
import {
  getFormSendingStatus,
  getFormErrorMessage,
  getFilmsLoadingStatus
} from "../../reducer/appStatus/selectors";
import {ActionCreators} from "../../reducer/appStatus/appStatus";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";
import SignIn from "../sign-in/sign-in";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import AddReview from "../add-review/add-review";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withTextState from "../../hocs/with-text-state/with-text-state";
import LoginRoute from "../routes/login-route/login-route";
import MyList from "../my-list/my-list";
import PrivateRoute from "../routes/private-route/private-route";
import Footer from "../footer/footer";
import {AppRoute} from "../../const";
import {Film} from "../../types";

const VideoPlayerWrapper = withVideo(MovieVideoPlayer);
const AddReviewWrapper = withTextState(withActiveItem(AddReview));
const MoviePageWrapper = withActiveItem(MoviePage);

interface Props {
  promoFilm: Film;
  userFavoriteFilms: Film[];
  allFilms: Film[];
  filmsToRender: Film[];
  onLoginFormSubmit: () => void;
  authorizationStatus: string;
  onReviewSend: () => void;
  isFormSending: boolean;
  formErrorMessage: string;
  isFilmsLoading: boolean;
  onFavoriteButtonClick: () => void;
  setFilmComments: () => void;
  filmComments: Comment[];
}

const App: React.FunctionComponent<Props> = (props: Props) => {
  const {
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
  } = props;
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
              <Footer withLink={false} />
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
              title={filmToWatch ? filmToWatch.title : ``}
              type={`movie`}
              className={`player__video`}
              isPlaying={false}
              posterSrc={filmToWatch ? filmToWatch.imgSrc : ``}
              videoSrc={filmToWatch ? filmToWatch.videoSrc : ``}
            />
          );
        }}
      />
    </Switch>
  );
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
