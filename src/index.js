import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  PROMO_FILM: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    releaseYear: 2014
  }
};

ReactDOM.render(<App promoFilm={Settings.PROMO_FILM} />, document.getElementById(`root`)
);
