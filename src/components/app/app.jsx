import React from "react";
import Main from "../main/main.jsx";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from "prop-types";

const handlerTitleButtonClick = () => {};

const App = ({promoFilm, filmsList}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            filmsList={filmsList}
            promoFilm={promoFilm}
            onTitleButtonClick={handlerTitleButtonClick}
          />
        </Route>
        <Route exact path="/dev-component">
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  promoFilm: PropTypes.shape({
    promoFilmTitle: PropTypes.string,
    promoFilmGenre: PropTypes.string,
    promoFilmReleaseYear: PropTypes.number
  }).isRequired,
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    id: PropTypes.id,
  })).isRequired,
};

export default App;
