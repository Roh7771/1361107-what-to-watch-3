import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const titleButtonHandler = () => {};

const App = ({promoFilm, filmsList}) => {
  return (
    <Main
      filmsList={filmsList}
      promoFilm={promoFilm}
      onTitleButtonClick={titleButtonHandler}
    />
  );
};

App.propTypes = {
  promoFilm: PropTypes.shape({
    promoFilmTitle: PropTypes.string,
    promoFilmGenre: PropTypes.string,
    promoFilmReleaseYear: PropTypes.number
  }).isRequired,
  filmsList: PropTypes.arrayOf(
      PropTypes.shape({
        filmTitle: PropTypes.string,
        filmId: PropTypes.number
      })
  ).isRequired
};

export default App;
