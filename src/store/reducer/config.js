// config Reducer
import {configUpdateStatus,configAddStatus} from "../Type"
const config = {
  status: [
    { label: "禁用", value: false },
    { label: "启动", value: true },
  ],
};
const configReducer = function (state = config, action) {
  switch (action.type) {
    case configAddStatus: {
      return {
        ...state,
        status: [...state.status, action.payload],
      };
    }
    case configUpdateStatus:{
        const stateData = JSON.parse(JSON.stringify(state));
        const data = stateData.status.filter(item=>item.value === action.payload.value);
        data[0].label = action.payload.label;
        return stateData
    }
    default:
      return state;
  }
};

export default configReducer;
