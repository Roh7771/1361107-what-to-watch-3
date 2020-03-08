import {extend} from "../../utils";
import settings from "../../mocks/settings";
import adaptFilmsData from "./adaptFilmsData";
import {ActionCreators as AppActionCreators} from '../appStatus/appStatus.js';

const initialState = {
  filmsList: [],
  promoFilm: settings.PROMO_FILM,
};

const ActionTypes = {
  LOAD_FILMS: `LOAD_FILMS`,
  SEND_REVIEW: `SEND_REVIEW`
};

const ActionCreators = {
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
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const newData = adaptFilmsData(response.data);
        dispatch(ActionCreators.loadFilms(newData));
      });
  },
  sendReview: (id, comment, rating) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {
      rating,
      comment
    })
    .then(() => {
      dispatch(AppActionCreators.changeFormSendingStatus());
      dispatch(ActionCreators.sendReview());
    })
    .catch(() => {
      dispatch(AppActionCreators.changeFormSendingStatus());
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
