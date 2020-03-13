import React from "react";
import PropTypes from "prop-types";
import MovieList from "../movie-list/movie-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {getAllFilms} from "../../reducer/data/selectors.js";
import {connect} from "react-redux";

const MovieListWrapper = withActiveItem(MovieList);

const MoreLikeThis = ({filmsList, film: chosenFilm, changeTab}) => {
  const filmsToRender = filmsList
    .filter(
        (film) => chosenFilm.genre === film.genre && film.title !== chosenFilm.title
    )
    .slice(0, 4);
  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__movies-list">
          {filmsToRender.length === 0 ? (
            <p>Sorry, there is no more films :(</p>
          ) : (
            <MovieListWrapper
              activeItem={{}}
              changeTab={changeTab}
              filmsToRender={filmsToRender}
            />
          )}
        </div>
      </section>
    </div>
  );
};

MoreLikeThis.propTypes = {
  filmsList: PropTypes.array.isRequired,
  film: PropTypes.shape({
    genre: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  changeTab: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  filmsList: getAllFilms(state)
});

export {MoreLikeThis};

export default connect(mapStateToProps)(MoreLikeThis);
