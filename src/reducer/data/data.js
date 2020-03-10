import {extend} from "../../utils";
import adaptFilmsData from "./adaptFilmsData";
import {ActionCreators as AppActionCreators} from '../appStatus/appStatus.js';

let timer;

const initialState = {
  filmsList: [],
  promoFilm: {},
};

const ActionTypes = {
  LOAD_FILMS: `LOAD_FILMS`,
  SEND_REVIEW: `SEND_REVIEW`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`
};

const ActionCreators = {
  loadPromoFilm: (film) => {
    return {
      type: ActionTypes.LOAD_PROMO_FILM,
      payload: film,
    };
  },
  loadFilms: (films) => {
    return {
      type: ActionTypes.LOAD_FILMS,
      payload: films
    };
  },
  sendReview: () => {
    return {
      type: ActionTypes.SEND_REVIEW
    };
  }
};

const Operation = {
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        const newData = adaptFilmsData([response.data]);
        dispatch(ActionCreators.loadPromoFilm(newData[0]));
      });
  },
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const newData = adaptFilmsData(response.data);
        dispatch(ActionCreators.loadFilms(newData));
        dispatch(AppActionCreators.changeFilmsLoadingStatus());
      });
  },
  sendReview: (id, comment, rating) => (dispatch, getState, api) => {
    clearTimeout(timer);
    return api.post(`/comments/${id}`, {
      rating,
      comment
    })
    .then(() => {
      dispatch(AppActionCreators.changeFormSendingStatus(false));
      dispatch(ActionCreators.sendReview());
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_FILMS:
      return extend(state, {
        filmsList: action.payload
      });
    case ActionTypes.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload
      });
  }
  return state;
};

export {reducer, ActionCreators, ActionTypes, Operation};
