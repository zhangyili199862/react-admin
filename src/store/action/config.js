import {configUpdateStatus,configAddStatus} from "../Type"
export function addStatus(label,value){
    return {
        type:configAddStatus,
        payload:{
            label,value
        }
    }
}
export function updateStatus(label,value){
    return {
        type:configUpdateStatus,
        payload:{
            label,value
        }
    }
}