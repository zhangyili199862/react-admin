import {addDepartmentList as addDepartmentListType} from "../Type";
const stateData = {
  departmentList: [],
};

//部门 Reducer
const departmentReducer = function (state = stateData, action) {
  switch (action.type) {
    case addDepartmentListType: {
      return {
        ...state,
        departmentList: action.data,
      };
    }
    default:
      return state;
  }
};
export default departmentReducer;
