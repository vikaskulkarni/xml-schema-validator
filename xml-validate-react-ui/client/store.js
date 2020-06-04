import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchSagas } from "./sagas/saga";

const sagaMiddleware = createSagaMiddleware();

// Dynamically load all the defined reducers inside of ./reducers folder.
// No need to manually add a reducer everytime one is introduced
const reducerModules = require.context(
  "./reducers/",
  false,
  /[a-zA-Z0-9]+.js$/
);

const allReducers = (requireContext) => {
  return requireContext.keys().reduce(
    (reducers, reducer) => ({
      ...reducers,
      // Extract of the name of the file as the reducer name without extension
      [reducer.substr(2).slice(0, -3)]: requireContext(reducer).default,
    }),
    {}
  );
};

let store;

if (
  (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
  window.navigator.userAgent.includes("Chrome")
) {
  store = createStore(
    combineReducers(allReducers(reducerModules)),
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(
    combineReducers(allReducers(reducerModules)),
    applyMiddleware(sagaMiddleware)
  );
}

sagaMiddleware.run(watchSagas, store.dispatch);

export default store;
