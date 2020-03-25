import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { createAPI } from "./api";
import thunk from "redux-thunk";
import { Operation as DataOperation } from "./reducer/data/data";
import {
  Operation as UserOperation,
  ActionCreators as UserActionCreators,
  AuthorizationStatus
} from "./reducer/user/user";
import { ActionCreators as AppActionCreators } from "./reducer/appStatus/appStatus";
import { Router } from "react-router-dom";
import history from "./history";

let timer;

const onUnauthorized = () => {
  store.dispatch(
    UserActionCreators.requireAuthorization(AuthorizationStatus.NO_AUTH)
  );
};

const onErrorReceived = error => {
  clearTimeout(timer);
  store.dispatch(AppActionCreators.changeFormSendingStatus(false));
  store.dispatch(
    AppActionCreators.setFormErrorMessage(error.response.data.error)
  );
  timer = setTimeout(() => {
    store.dispatch(AppActionCreators.setFormErrorMessage(null));
  }, 5000);
};

const api = createAPI(onUnauthorized, onErrorReceived);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);
store.dispatch(DataOperation.loadFilms());
store.dispatch(DataOperation.loadPromoFilm());
store.dispatch(UserOperation.checkAuth());
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById(`root`)
);
