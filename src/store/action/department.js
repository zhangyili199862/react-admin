import {addDepartmentList as addDepartmentListType ,updateDepartmentList as updateDepartmentListType} from "../Type"
export function addDepartmentList(params){
    const {data} = params;
    return {
        type:addDepartmentListType,
        data
    }
}
export function updateDepartmentList(params){
    const {data} = params;
    return {
        type:updateDepartmentListType,
        data
    }
}