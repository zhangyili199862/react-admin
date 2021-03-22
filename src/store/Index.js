import { createStore,combineReducers} from "redux";

import departmentReducer from "./reducer/department";
import jobReducer from "./reducer/job";
import configReducer from "./reducer/config"
const allReducer = {
    department:departmentReducer,
    job:jobReducer,
    config:configReducer
}

const rootReducer = combineReducers(allReducer)
const store = createStore(rootReducer);

export default store;
