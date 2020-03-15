import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getCurrentGenre, getFilmsToShowCount} from "../appStatus/selectors.js";

export const getAllFilms = (state) => {
  return state[NameSpace.DATA].filmsList;
};

export const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

export const getUserFavoriteFilms = (state) => {
  return state[NameSpace.DATA].userFavoriteFilms;
};

export const getFilmComments = (state) => {
  return state[NameSpace.DATA].filmComments;
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

export const getGenreList = createSelector(
    getAllFilms,
    (films) => {
      const genreList = films.map((film) => film.genre);
      const filteredGenreList = genreList.filter((genre, index) => genreList.indexOf(genre) === index);
      return [`All genres`, ...filteredGenreList];
    }
);

