import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getCurrentGenre, getFilmsToShowCount, getChosenFilm} from "../appStatus/selectors.js";

export const getAllFilms = (state) => {
  return state[NameSpace.DATA].filmsList;
};

export const getFilmsToRender = createSelector(
    getAllFilms,
    getCurrentGenre,
    getFilmsToShowCount,
    (films, genre, filmsToShowCount) => {
      if (genre === `All genres`) {
        return films.slice(0, filmsToShowCount);
      }

      const filteredFilms = films.filter((film) => film.genre === genre);
      return filteredFilms.slice(0, filmsToShowCount);
    }
);

export const getMoreLikeThisFilm = createSelector(
    getAllFilms,
    getChosenFilm,
    (films, chosenFilm) => {
      const filteredFilms = films.filter((film) => chosenFilm.genre === film.genre && film.name !== chosenFilm.name);
      return filteredFilms.slice(0, 4);
    }
);

