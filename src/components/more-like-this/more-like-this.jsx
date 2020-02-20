import React from 'react';
import PropTypes from 'prop-types';
import MovieList from '../movie-list/movie-list.jsx';

const MoreLikeThis = ({onMovieCardClick, currentFilm, filmsList}) => {
  const filteredFilmsList = filmsList.filter((film) => currentFilm.genre === film.genre && film.title !== currentFilm.title);
  if (filteredFilmsList.length > 4) {
    filteredFilmsList.splice(4);
  }
  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__movies-list">
          {filteredFilmsList.length === 0 ? <p>Sorry, there is no more films :(</p> : <MovieList onMovieCardClick={onMovieCardClick} filmsList={filteredFilmsList}/>}
        </div>
      </section>
    </div>
  );
};

MoreLikeThis.propTypes = {
  onMovieCardClick: PropTypes.func.isRequired,
  currentFilm: PropTypes.shape({
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
  }),
  filmsList: PropTypes.array.isRequired,
};

export default MoreLikeThis;
