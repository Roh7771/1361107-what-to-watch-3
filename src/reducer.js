import {extend} from "./utils";
import films from './mocks/films';
import settings from "./mocks/settings";

const initialState = {
  currentGenre: `All genres`,
  filmsList: films,
  filmsToRender: films,
  promoFilm: settings.PROMO_FILM
};

const ActionTypes = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SET_NEW_FILMS_LIST: `SET_NEW_FILMS_LIST`,
};

const ActionCreators = {
  changeGenre: (chosenGenre) => ({
    type: ActionTypes.CHANGE_GENRE,
    payload: chosenGenre,
  }),

  setNewFilmsList: () => ({
    type: ActionTypes.SET_NEW_FILMS_LIST
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionTypes.SET_NEW_FILMS_LIST:
      const {currentGenre, filmsList} = state;

      if (currentGenre === `All genres`) {
        return extend(state, {
          filmsToRender: films
        });
      }

      const newFilmsList = filmsList.filter((film) => film.genre === currentGenre);

      return extend(state, {
        filmsToRender: newFilmsList
      });
  }
  return state;
};

export {reducer, ActionCreators, ActionTypes};
