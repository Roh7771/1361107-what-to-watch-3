import {extend} from "../../utils";
import adaptFilmsData from "./adaptFilmsData";
import {ActionCreators as AppActionCreators} from '../appStatus/appStatus.js';

let timer;

const initialState = {
  filmsList: [],
  promoFilm: {},
  userFavoriteFilms: [],
};

const ActionTypes = {
  LOAD_FILMS: `LOAD_FILMS`,
  SEND_REVIEW: `SEND_REVIEW`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  GET_FAVORITE_FILMS: `GET_FAVORITE_FILMS`
};

const ActionCreators = {
  getFavoriteFilms: (films) => {
    return {
      type: ActionTypes.GET_FAVORITE_FILMS,
      payload: films
    };
  },
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
  getFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const newData = adaptFilmsData(response.data);
        dispatch(ActionCreators.getFavoriteFilms(newData));
      });
  },
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
  },
  setFilmFavoriteStatus: (id, value) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${value}`)
      .then((response) => {
        console.dir(response);
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_FAVORITE_FILMS:
      return extend(state, {
        userFavoriteFilms: action.payload
      });
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
