import React from "react";
import PropTypes from 'prop-types';
import MovieCard from "../movie-card/movie-card.jsx";

const MovieList = (props) => {
  const {filmsToRender, onMovieCardClick, activeItem, onActiveItemChange, changeTab} = props;
  return (
    filmsToRender.length === 0 ?
      <p>There is no films :(</p> :
      filmsToRender.map((el) => {
        return (
          <MovieCard
            key={el.id}
            film={el}
            onFilmMouseOut={onActiveItemChange}
            onFilmMouseOver={onActiveItemChange}
            onMovieCardClick={onMovieCardClick}
            activeCard={activeItem}
            changeTab={changeTab}
          />
        );
      })
  );
};

MovieList.propTypes = {
  filmsToRender: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    id: PropTypes.id,
  })).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  activeItem: PropTypes.object.isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
};

export default MovieList;

