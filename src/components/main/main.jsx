import React from "react";
import PropTypes from "prop-types";
import MovieList from "../movie-list/movie-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMoreFilms from "../show-more-films/show-more-films.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";

const MovieListWrapper = withActiveItem(MovieList);

const Main = ({promoFilm, onMovieCardClick, onPlayFilmButtonClick, filmsToRender}) => {
  const {
    promoFilmTitle,
    promoFilmReleaseYear,
    promoFilmGenre,
    promoFilmBgSrc,
    promoFilmPosterSrc,
    promoFilmVideoSrc
  } = promoFilm;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img
            src={promoFilmBgSrc}
            alt={promoFilmTitle}
          />
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
            <div className="user-block__avatar">
              <img
                src="img/avatar.jpg"
                alt="User avatar"
                width="63"
                height="63"
              />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src={promoFilmPosterSrc}
                alt={`${promoFilmTitle} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoFilmTitle}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoFilmGenre}</span>
                <span className="movie-card__year">{promoFilmReleaseYear}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  onClick={() => {
                    onPlayFilmButtonClick({
                      title: promoFilmTitle,
                      imgSrc: promoFilmPosterSrc,
                      videoSrc: promoFilmVideoSrc
                    });
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
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
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
              onMovieCardClick={onMovieCardClick}
              activeItem={{}}
              onPlayFilmButtonClick={() => {}}
              filmsToRender={filmsToRender}
            />
          </div>

          <ShowMoreFilms/>
        </section>
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  promoFilm: PropTypes.shape({
    promoFilmTitle: PropTypes.string,
    promoFilmGenre: PropTypes.string,
    promoFilmReleaseYear: PropTypes.number,
    promoFilmPosterSrc: PropTypes.string,
    promoFilmBgSrc: PropTypes.string,
    promoFilmVideoSrc: PropTypes.string,
  }).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onPlayFilmButtonClick: PropTypes.func.isRequired,
  filmsToRender: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    releaseYear: PropTypes.number,
    imgSrc: PropTypes.string,
    bgSrc: PropTypes.string,
    videoSrc: PropTypes.string,
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
};

export default Main;
