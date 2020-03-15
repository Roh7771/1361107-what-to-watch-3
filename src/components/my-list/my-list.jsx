import React from 'react';
import PropTypes from 'prop-types';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import MovieList from '../movie-list/movie-list.jsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

const MovieListWrapper = withActiveItem(MovieList);

const MyList = ({userFavoriteFilms, children}) => {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={`${AppRoute.ROOT}`} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__movies-list">
          <MovieListWrapper activeItem={{}} filmsToRender={userFavoriteFilms}/>
        </div>
      </section>

      {children}
    </div>
  );
};

MyList.propTypes = {
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
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

export default MyList;
