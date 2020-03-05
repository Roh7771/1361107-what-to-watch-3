import React from 'react';
import PropTypes from 'prop-types';
import genres from '../../mocks/genres';
import {connect} from 'react-redux';
import {getCurrentGenre} from '../../reducer/appStatus/selectors';
import {ActionCreators} from '../../reducer/appStatus/appStatus';

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
  currentGenre: getCurrentGenre(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreButtonClick: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
    dispatch(ActionCreators.resetFilmsCount());
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);


