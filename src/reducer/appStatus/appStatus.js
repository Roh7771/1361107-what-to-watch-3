import {extend} from "../../utils";

const initialState = {
  currentGenre: `All genres`,
  filmsToShowCount: 8,
  chosenFilm: null,
  filmToWatch: null,
  isLogging: false
};

const ActionTypes = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
  RESET_FILMS_COUNT: `RESET_FILMS_COUNT`,
  SET_CHOSEN_FILM: `SET_CHOSEN_FILM`,
  SET_FILM_TO_WATCH: `SET_FILM_TO_WATCH`,
  CHANGE_LOGGING_STATUS: `CHANGE_LOGGING_STATUS`
};

const ActionCreators = {
  changeLoggingStatus: () => ({
    type: ActionTypes.CHANGE_LOGGING_STATUS,
  }),

  setFilmToWatch: (film) => ({
    type: ActionTypes.SET_FILM_TO_WATCH,
    payload: film
  }),

  setChosenFilm: (chosenFilm) => ({
    type: ActionTypes.SET_CHOSEN_FILM,
    payload: chosenFilm
  }),

  resetFilmsCount: () => ({
    type: ActionTypes.RESET_FILMS_COUNT
  }),

  changeGenre: (chosenGenre) => ({
    type: ActionTypes.CHANGE_GENRE,
    payload: chosenGenre,
  }),

  showMoreFilms: () => ({
    type: ActionTypes.SHOW_MORE_FILMS,
    payload: 8,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_LOGGING_STATUS:
      return extend(state, {
        isLogging: !state.isLogging
      });

    case ActionTypes.RESET_FILMS_COUNT:
      return extend(state, {
        filmsToShowCount: 8
      });

    case ActionTypes.SET_FILM_TO_WATCH:
      return extend(state, {
        filmToWatch: action.payload
      });

    case ActionTypes.SHOW_MORE_FILMS:
      return extend(state, {
        filmsToShowCount: state.filmsToShowCount + action.payload
      });

    case ActionTypes.CHANGE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionTypes.SET_CHOSEN_FILM:
      return extend(state, {
        chosenFilm: action.payload
      });
  }
  return state;
};

export {reducer, ActionCreators, ActionTypes};
