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

const api = createAPI(() => {});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadFilms());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById(`root`));
