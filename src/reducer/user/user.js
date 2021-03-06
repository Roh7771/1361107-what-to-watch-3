import {extend} from "../../utils";
import history from "../../history";
import {Operation as DataOperation} from "../data/data";
import {ActionCreators as AppActionCreators} from "../appStatus/appStatus";
import {AppRoute} from "../../const";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const ActionTypes = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`
};

const ActionCreators = {
  requireAuthorization: (status) => {
    return {
      type: ActionTypes.REQUIRE_AUTHORIZATION,
      payload: status
    };
  }
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`${AppRoute.LOGIN}`).then(() => {
      dispatch(ActionCreators.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(DataOperation.getFavoriteFilms());
    });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api
      .post(`${AppRoute.LOGIN}`, {
        email: authData.login,
        password: authData.password
      })
      .then(() => {
        dispatch(ActionCreators.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(DataOperation.getFavoriteFilms());
        dispatch(AppActionCreators.changeFormSendingStatus(false));
        if (history.length === 2) {
          history.push(`${AppRoute.ROOT}`);
        } else {
          history.goBack();
        }
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload
      });
  }

  return state;
};

export {ActionCreators, ActionTypes, reducer, Operation, AuthorizationStatus};
