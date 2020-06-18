import { reducer } from "./reducer/reducer";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import logger, { createLogger } from "redux-logger";
import thunk from "redux-thunk";
let middleware = [thunk,logger];
let rootReducer = combineReducers({ reducer });
middleware.push(createLogger());
const composedEnhancers = compose(applyMiddleware(...middleware));
export const store = createStore(rootReducer, composedEnhancers);
