import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getFilmsToRender} from '../../reducer/data/selectors';
import {getFilmsToShowCount} from '../../reducer/appStatus/selectors';
import {ActionCreators} from '../../reducer/appStatus/appStatus';

function ShowMoreFilms({onMoreFilmsButtonClick, filmsToRender, filmsToShowCount}) {
  return (
    <div style={filmsToShowCount > filmsToRender.length ? {display: `none`} : null} className="catalog__more">
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
  filmsToRender: getFilmsToRender(state),
  filmsToShowCount: getFilmsToShowCount(state)
});


const mapDispatchToProps = (dispatch) => ({
  onMoreFilmsButtonClick: () => {
    dispatch(ActionCreators.showMoreFilms());
  }
});

export {ShowMoreFilms};

export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreFilms);

