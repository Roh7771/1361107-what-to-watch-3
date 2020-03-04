import React from 'react';
import PropTypes from 'prop-types';
import MovieList from '../movie-list/movie-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import {getMoreLikeThisFilm} from '../../reducer/data/selectors.js';
import {connect} from 'react-redux';

const MovieListWrapper = withActiveItem(MovieList);

const MoreLikeThis = ({onMovieCardClick, filmsToRender}) => {
  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__movies-list">
          {filmsToRender.length === 0 ? <p>Sorry, there is no more films :(</p> : <MovieListWrapper activeItem={{}} onMovieCardClick={onMovieCardClick} filmsToRender={filmsToRender}/>}
        </div>
      </section>
    </div>
  );
};

MoreLikeThis.propTypes = {
  onMovieCardClick: PropTypes.func.isRequired,
  filmsToRender: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  filmsToRender: getMoreLikeThisFilm(state)
});


export default connect(mapStateToProps)(MoreLikeThis);
