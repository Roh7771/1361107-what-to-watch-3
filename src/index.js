import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import {reducer} from "./reducer.js";
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from "react-redux";
import {createAPI} from "./api.js";
import thunk from "redux-thunk";

const api = createAPI(() => {});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById(`root`));
