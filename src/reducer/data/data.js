import {extend} from "../../utils";
import adaptFilmsData from "./adaptFilmsData";
import {ActionCreators as AppActionCreators} from "../appStatus/appStatus";
import history from "../../history";
import {AppRoute} from "../../const";

let timer;

const initialState = {
  filmsList: [],
  promoFilm: {},
  userFavoriteFilms: [],
  filmComments: []
};

const ActionTypes = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  GET_FAVORITE_FILMS: `GET_FAVORITE_FILMS`,
  UPDATE_FILM_FAVORITE_STATUS: `UPDATE_FILM_FAVORITE_STATUS`,
  GET_FILM_COMMENTS: `GET_FILM_COMMENTS`
};

const ActionCreators = {
  getFilmComments: (comments) => {
    return {
      type: ActionTypes.GET_FILM_COMMENTS,
      payload: comments
    };
  },
  updateFilmFavoriteStatus: (id) => {
    return {
      type: ActionTypes.UPDATE_FILM_FAVORITE_STATUS,
      payload: id
    };
  },
  getFavoriteFilms: (films) => {
    return {
      type: ActionTypes.GET_FAVORITE_FILMS,
      payload: films
    };
  },
  loadPromoFilm: (film) => {
    return {
      type: ActionTypes.LOAD_PROMO_FILM,
      payload: film
    };
  },
  loadFilms: (films) => {
    return {
      type: ActionTypes.LOAD_FILMS,
      payload: films
    };
  }
};

const Operation = {
  getFilmComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`).then((response) => {
      dispatch(ActionCreators.getFilmComments(response.data));
    });
  },
  getFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      const newData = adaptFilmsData(response.data);
      dispatch(ActionCreators.getFavoriteFilms(newData));
    });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`${AppRoute.FILM}/promo`).then((response) => {
      const newData = adaptFilmsData([response.data]);
      dispatch(ActionCreators.loadPromoFilm(newData[0]));
    });
  },
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`${AppRoute.FILM}`).then((response) => {
      const newData = adaptFilmsData(response.data);
      dispatch(ActionCreators.loadFilms(newData));
      dispatch(AppActionCreators.changeFilmsLoadingStatus());
    });
  },
  sendReview: (id, comment, rating) => (dispatch, getState, api) => {
    clearTimeout(timer);
    return api
      .post(`/comments/${id}`, {
        rating,
        comment
      })
      .then(() => {
        dispatch(AppActionCreators.changeFormSendingStatus(false));
        history.push(`${AppRoute.FILM}/${id}`);
      });
  },
  setFilmFavoriteStatus: (id, value) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${value}`).then((response) => {
      dispatch(ActionCreators.updateFilmFavoriteStatus(response.data.id));
      dispatch(Operation.getFavoriteFilms());
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_FILM_COMMENTS:
      return extend(state, {
        filmComments: action.payload
      });
    case ActionTypes.UPDATE_FILM_FAVORITE_STATUS:
      return extend(state, {
        filmsList: state.filmsList.map((film) => {
          if (film.id === action.payload) {
            return extend(film, {isFavorite: !film.isFavorite});
          }
          return film;
        }),
        promoFilm: extend(state.promoFilm, {
          isFavorite:
            state.promoFilm.id === action.payload
              ? !state.promoFilm.isFavorite
              : state.promoFilm.isFavorite
        })
      });
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
