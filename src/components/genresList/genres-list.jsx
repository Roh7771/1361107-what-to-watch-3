import React from 'react';
import PropTypes from 'prop-types';
import genres from '../../mocks/genres';
import {ActionCreators} from '../../reducer';
import {connect} from 'react-redux';

const GenresList = ({currentGenre, onGenreButtonClick}) => {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, i) => {
        return (
          <li key={`${i}-${genre}`} className={`catalog__genres-item ${currentGenre === genre ? `catalog__genres-item--active` : ``}`}>
            <a
              href="#"
              className="catalog__genres-link"
              onClick={(e) => {
                e.preventDefault();
                onGenreButtonClick(genre);
              }}
            >
              {genre}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  onGenreButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre
});

const mapDispatchToProps = (dispatch) => ({
  onGenreButtonClick: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
    dispatch(ActionCreators.setNewFilmsList());
    dispatch(ActionCreators.resetFilmsCount());
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);


