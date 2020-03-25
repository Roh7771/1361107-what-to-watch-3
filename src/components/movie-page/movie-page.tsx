import * as React from "react";
import TabList from "../tab-list/tab-list";
import MoreLikeThis from "../more-like-this/more-like-this";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from "react-router-dom";
import history from "../../history";
import {AppRoute} from "../../const";
import {Film, Comment} from "../../types";

interface Props {
  film: Film;
  authorizationStatus: string;
  isFilmsLoading: boolean;
  onFavoriteButtonClick: (id: number, status: number) => void;
  setFilmComments: (id: number) => void;
  filmComments: Comment[];
  onActiveItemChange: () => void;
  activeItem: string;
  children: React.ReactNode;
}

const MoviePage: React.FunctionComponent<Props> = (props: Props) => {
  const {
    film,
    authorizationStatus,
    isFilmsLoading,
    onFavoriteButtonClick,
    filmComments,
    setFilmComments,
    activeItem,
    onActiveItemChange,
    children
  } = props;
  const {bgSrc, title, genre, releaseYear, posterSrc, isFavorite, id} = film;
  React.useEffect(() => {
    if (id) {
      setFilmComments(id);
    }
  }, [id]);
  return isFilmsLoading ? (
    <p>Идет загрузка фильмов, пожалуйста подождите...</p>
  ) : (
    <div className="page-content">
      <section
        className="movie-card movie-card--full"
        style={{backgroundColor: `${film.bgColor}`}}
      >
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={bgSrc} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to={`${AppRoute.ROOT}`} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              {authorizationStatus === AuthorizationStatus.AUTH ? (
                <Link to={`${AppRoute.MY_LIST}`}>
                  <div className="user-block__avatar">
                    <img
                      src="/img/avatar.jpg"
                      alt="User avatar"
                      width="63"
                      height="63"
                    />
                  </div>
                </Link>
              ) : (
                <Link to={`${AppRoute.LOGIN}`} className="user-block__link">
                  Sign in
                </Link>
              )}
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{releaseYear}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  onClick={() => {
                    history.push(`${AppRoute.PLAYER}/${id}`);
                  }}
                  className="btn btn--play movie-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list movie-card__button"
                  type="button"
                  onClick={() => {
                    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                      history.push(`${AppRoute.LOGIN}`);
                    }
                    return isFavorite
                      ? onFavoriteButtonClick(id, 0)
                      : onFavoriteButtonClick(id, 1);
                  }}
                >
                  {isFavorite ? (
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                  )}
                  <span>My list</span>
                </button>
                <Link
                  to={`${AppRoute.FILM}/${id}/review`}
                  className="btn movie-card__button"
                >
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img
                src={posterSrc}
                alt={`${title} poster`}
                width="218"
                height="327"
              />
            </div>
            <TabList
              filmComments={filmComments}
              activeItem={activeItem}
              changeTab={onActiveItemChange}
              film={film}
            />
          </div>
        </div>
      </section>
      <MoreLikeThis changeTab={onActiveItemChange} film={film} />
      {children}
    </div>
  );
};

export default MoviePage;
