import {extend} from "../../utils";
import settings from "../../mocks/settings";

const initialState = {
  filmsList: [],
  promoFilm: settings.PROMO_FILM,
};

const ActionTypes = {
  LOAD_FILMS: `LOAD_FILMS`,
};

const ActionCreators = {
  loadFilms: (films) => {
    return {
      type: ActionTypes.LOAD_FILMS,
      payload: films
    };
  },
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreators.loadFilms(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_FILMS:
      return extend(state, {
        filmsList: action.payload
      });
  }
  return state;
};

export {reducer, ActionCreators, ActionTypes, Operation};
