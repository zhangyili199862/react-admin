// app Reducer
import {
  setToken as setTokenType,
  setUsername as setUsernameType,
} from "../Type";
import { getToken, getUserName } from "@/utils/session";
const app = {
  token: "" || getToken(),
  username: "" || getUserName(),
};
const configReducer = function (state = app, action) {
  switch (action.type) {
    //token
    case setTokenType: {
      return {
        ...state,
        token: action.payload,
      };
    }
    //username
    case setUsernameType: {
      return {
        ...state,
        username: action.payload,
      };
    }
    default:
      return state;
  }
};

export default configReducer;
