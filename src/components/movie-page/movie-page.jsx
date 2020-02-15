import React from "react";
import PropTypes from 'prop-types';

const getRatingLevel = (ratingScore) => {
  if (ratingScore < 3) {
    return `Bad`;
  }
  if (ratingScore >= 3 && ratingScore < 5) {
    return `Normal`;
  }
  if (ratingScore >= 5 && ratingScore < 8) {
    return `Good`;
  }
  if (ratingScore >= 8 && ratingScore < 10) {
    return `Very good`;
  }
  if (ratingScore === 10) {
    return `Awesome`;
  }
  return `No rating`;
};

const MoviePage = ({film}) => {
  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={film.bgSrc} alt={film.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{film.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{film.genre}</span>
              <span className="movie-card__year">{film.releaseYear}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={film.posterSrc} alt={`${film.title} poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item movie-nav__item--active">
                  <a href="#" className="movie-nav__link">Overview</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Details</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Reviews</a>
                </li>
              </ul>
            </nav>

            <div className="movie-rating">
              <div className="movie-rating__score">{String(film.ratingScore).replace(`.`, `,`)}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{getRatingLevel(film.ratingScore)}</span>
                <span className="movie-rating__count">{`${film.ratingCount} ratings`}</span>
              </p>
            </div>

            <div className="movie-card__text">
              {film.description.map((el, i) => {
                return (
                  <p key={`${i + 1}-descr`}>{el}</p>
                );
              })}

              <p className="movie-card__director"><strong>{`Director: ${film.director}`}</strong></p>

              <p className="movie-card__starring"><strong>{`Starring: ${film.starring.reduce((prev, next) => `${prev}, ${next}`)} and other`}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MoviePage.propTypes = {
  film: PropTypes.shape({
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
    id: PropTypes.number
  })
};

export default MoviePage;
