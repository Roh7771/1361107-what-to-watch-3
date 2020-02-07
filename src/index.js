import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  PROMO_FILM: {
    promoFilmTitle: `The Grand Budapest Hotel`,
    promoFilmGenre: `Drama`,
    promoFilmReleaseYear: 2014
  },
  FILMS_LIST: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`],
};

ReactDOM.render(<App filmsList= {Settings.FILMS_LIST} promoFilm={Settings.PROMO_FILM} />, document.getElementById(`root`));
