import {extend} from "./utils";
import films from './mocks/films';
import settings from "./mocks/settings";

const initialState = {
  currentGenre: `All genres`,
  filmsList: films,
  filmsToRender: films,
  promoFilm: settings.PROMO_FILM,
  filmsToShowCount: 8
};

const ActionTypes = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SET_NEW_FILMS_LIST: `SET_NEW_FILMS_LIST`,
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
  RESET_FILMS_COUNT: `RESET_FILMS_COUNT`,
};

const ActionCreators = {
  resetFilmsCount: () => ({
    type: ActionTypes.RESET_FILMS_COUNT
  }),

  changeGenre: (chosenGenre) => ({
    type: ActionTypes.CHANGE_GENRE,
    payload: chosenGenre,
  }),

  setNewFilmsList: () => ({
    type: ActionTypes.SET_NEW_FILMS_LIST
  }),

  showMoreFilms: () => ({
    type: ActionTypes.SHOW_MORE_FILMS,
    payload: 8,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RESET_FILMS_COUNT:
      return extend(state, {
        filmsToShowCount: 8
      });

    case ActionTypes.SHOW_MORE_FILMS:
      return extend(state, {
        filmsToShowCount: state.filmsToShowCount + action.payload
      });

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
