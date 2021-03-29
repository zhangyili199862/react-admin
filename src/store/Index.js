import { createStore,combineReducers} from "redux";

import departmentReducer from "./reducer/department";
import jobReducer from "./reducer/job";
import configReducer from "./reducer/config";
import appReducer from "./reducer/app"
const allReducer = {
    department:departmentReducer,
    job:jobReducer,
    config:configReducer,
    app:appReducer
}

const rootReducer = combineReducers(allReducer)
const store = createStore(rootReducer);

export default store;
