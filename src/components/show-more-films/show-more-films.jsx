import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreators} from '../../reducer';
import {connect} from 'react-redux';

function ShowMoreFilms({onMoreFilmsButtonClick, filmsToRender, filmsToShowCount}) {
  return (
    <div style={filmsToShowCount >= filmsToRender.length ? {display: `none`} : null} className="catalog__more">
      <button onClick={onMoreFilmsButtonClick} className="catalog__button" type="button">
        Show more
      </button>
    </div>
  );
}

ShowMoreFilms.propTypes = {
  onMoreFilmsButtonClick: PropTypes.func.isRequired,
  filmsToRender: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  filmsToShowCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  filmsToRender: state.filmsToRender,
  filmsToShowCount: state.filmsToShowCount
});


const mapDispatchToProps = (dispatch) => ({
  onMoreFilmsButtonClick: () => {
    dispatch(ActionCreators.showMoreFilms());
  }
});

export {ShowMoreFilms};

export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreFilms);

