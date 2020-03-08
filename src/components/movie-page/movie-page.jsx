import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import TabList from "../tab-list/tab-list.jsx";
import MoreLikeThis from "../more-like-this/more-like-this.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const TabListWrapper = withActiveItem(TabList);

const MoviePage = ({film, onMovieCardClick, onPlayFilmButtonClick, authorizationStatus}) => {
  return (
    <Fragment>
      <section className="movie-card movie-card--full" style={{backgroundColor: `${film.bgColor}`}}>
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
                <button
                  onClick={() => {
                    onPlayFilmButtonClick(film);
                  }}
                  className="btn btn--play movie-card__button"
                  type="button"
                >
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
                {authorizationStatus === AuthorizationStatus.AUTH ? (
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                ) : (
                  null
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.posterSrc} alt={`${film.title} poster`} width="218" height="327" />
            </div>
            <TabListWrapper activeItem={`movieOverview`} film={film}/>
          </div>
        </div>
      </section>
      <MoreLikeThis onMovieCardClick={onMovieCardClick}/>
    </Fragment>
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
    id: PropTypes.number,
    filmDuration: PropTypes.number,
    reviews: PropTypes.array,
    bgColor: PropTypes.string.isRequired,
  }),
  onMovieCardClick: PropTypes.func.isRequired,
  onPlayFilmButtonClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

export default MoviePage;
