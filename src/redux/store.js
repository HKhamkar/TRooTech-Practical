import { createStore, combineReducers } from "redux";
import tableDataReducer from "./reducers/tableDataReducer";

const rootReducer = combineReducers({
  tableData: tableDataReducer,
});

const store = createStore(rootReducer);

export default store;
