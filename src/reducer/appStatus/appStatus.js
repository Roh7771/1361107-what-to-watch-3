import {extend} from "../../utils";

const initialState = {
  currentGenre: `All genres`,
  filmsToShowCount: 8,
  isFormSending: false,
  formErrorMessage: null,
  isFilmsLoading: true
};

const ActionTypes = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
  RESET_FILMS_COUNT: `RESET_FILMS_COUNT`,
  CHANGE_FORM_SENDING_STATUS: `CHANGE_FORM_SENDING_STATUS`,
  SET_FORM_ERROR_MESSAGE: `SET_FORM_ERROR_MESSAGE`,
  CHANGE_FILMS_LOADING_STATUS: `CHANGE_FILMS_LOADING_STATUS`
};

const ActionCreators = {
  setFormErrorMessage: (message) => ({
    type: ActionTypes.SET_FORM_ERROR_MESSAGE,
    payload: message
  }),

  changeFilmsLoadingStatus: () => ({
    type: ActionTypes.CHANGE_FILMS_LOADING_STATUS
  }),

  changeFormSendingStatus: (value) => ({
    type: ActionTypes.CHANGE_FORM_SENDING_STATUS,
    payload: value
  }),

  resetFilmsCount: () => ({
    type: ActionTypes.RESET_FILMS_COUNT
  }),

  changeGenre: (chosenGenre) => ({
    type: ActionTypes.CHANGE_GENRE,
    payload: chosenGenre
  }),

  showMoreFilms: () => ({
    type: ActionTypes.SHOW_MORE_FILMS,
    payload: 8
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_FILMS_LOADING_STATUS:
      return extend(state, {
        isFilmsLoading: !state.isFilmsLoading
      });

    case ActionTypes.SET_FORM_ERROR_MESSAGE:
      return extend(state, {
        formErrorMessage: action.payload
      });

    case ActionTypes.CHANGE_FORM_SENDING_STATUS:
      return extend(state, {
        isFormSending: action.payload
      });

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
        currentGenre: action.payload
      });
  }
  return state;
};

export {reducer, ActionCreators, ActionTypes};
