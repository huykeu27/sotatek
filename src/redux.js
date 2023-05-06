import rootReducer from "./store/reducers/rootReducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const reduxStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  return { store };
};

export default reduxStore;
