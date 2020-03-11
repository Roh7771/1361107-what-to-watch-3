import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentGenre} from '../../reducer/appStatus/selectors';
import {ActionCreators} from '../../reducer/appStatus/appStatus';
import {getGenreList} from '../../reducer/data/selectors';

const GenresList = ({currentGenre, onGenreButtonClick, genreList}) => {
  return (
    <ul className="catalog__genres-list">
      {genreList.map((genre, i) => {
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
  genreList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: getCurrentGenre(state),
  genreList: getGenreList(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreButtonClick: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
    dispatch(ActionCreators.resetFilmsCount());
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);


