import React from "react";
import PropTypes from 'prop-types';
import MovieCard from "../movie-card/movie-card.jsx";

const MovieList = (props) => {
  const {filmsToRender, activeItem, onActiveItemChange, changeTab} = props;
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
  activeItem: PropTypes.object.isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
  changeTab: PropTypes.func,
};

export default MovieList;

