import * as React from "react";
import MovieList from "../movie-list/movie-list";
import GenresList from "../genres-list/genres-list";
import ShowMoreFilms from "../show-more-films/show-more-films";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from "react-router-dom";
import history from "../../history";
import {AppRoute} from "../../const";
import {Film} from "../../types";

const MovieListWrapper = withActiveItem(MovieList);

interface Props {
  promoFilm: Film;
  filmsToRender: Film[];
  userFavoriteFilms: Film[];
  authorizationStatus: string;
  onFavoriteButtonClick: (id: number, status: number) => void;
  children: React.ReactNode;
}

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {
    promoFilm,
    filmsToRender,
    authorizationStatus,
    onFavoriteButtonClick,
    children
  } = props;
  const {title, releaseYear, genre, bgSrc, posterSrc, isFavorite} = promoFilm;
  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={bgSrc} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
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
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src={posterSrc}
                alt={`${title} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{releaseYear}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  onClick={() => {
                    history.push(`${AppRoute.PLAYER}/${promoFilm.id}`);
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
                      ? onFavoriteButtonClick(promoFilm.id, 0)
                      : onFavoriteButtonClick(promoFilm.id, 1);
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <div className="catalog__movies-list">
            <MovieListWrapper
              activeItem={{}}
              filmsToRender={filmsToRender}
            />
          </div>

          <ShowMoreFilms />
        </section>
        {children}
      </div>
    </React.Fragment>
  );
};

export default Main;
