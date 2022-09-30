import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";



// middleware
const middleware = [thunk];

// creating store
export const store = createStore(rootReducer, applyMiddleware(...middleware));

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
