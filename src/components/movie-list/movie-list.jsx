import React from "react";
import PropTypes from 'prop-types';
import MovieCard from "../movie-card/movie-card.jsx";
import {connect} from "react-redux";

const MovieList = (props) => {
  const {filmsList, onMovieCardClick, filmsToShowCount, activeItem, onActiveItemChange} = props;
  const filmsToRender = filmsList.slice(0, filmsToShowCount);
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
          />
        );
      })
  );
};

const mapStateToProps = (state) => ({
  filmsList: state.filmsToRender,
  filmsToShowCount: state.filmsToShowCount
});

MovieList.propTypes = {
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    id: PropTypes.id,
  })).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  filmsToShowCount: PropTypes.number.isRequired,
  activeItem: PropTypes.object.isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
};

export {MovieList};

export default connect(mapStateToProps)(MovieList);

