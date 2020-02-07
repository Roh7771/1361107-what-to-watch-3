import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {Settings} from "./mocks/mock.js";

ReactDOM.render(<App filmsList= {Settings.FILMS_LIST} promoFilm={Settings.PROMO_FILM} />, document.getElementById(`root`));
