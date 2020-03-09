import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import reducer from "./reducer/reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from "react-redux";
import {createAPI} from "./api.js";
import thunk from "redux-thunk";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreators, AuthorizationStatus} from "./reducer/user/user.js";

const onUnauthorized = () => {
  store.dispatch(ActionCreators.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadFilms());
store.dispatch(DataOperation.loadPromoFilm());
store.dispatch(UserOperation.checkAuth());
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById(`root`));

