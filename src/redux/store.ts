import { createStore } from "redux";
import taskReducer from "./reducers/task";

const store = createStore(taskReducer);

export default store;