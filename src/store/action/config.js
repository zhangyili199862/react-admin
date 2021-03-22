import {configUploadStatus} from "../Type"
export function addStatus(label,value){
    return {
        type:"ADD_STATUS",
        payload:{
            label,value
        }
    }
}
export function updateStatus(label,value){
    return {
        type:configUploadStatus,
        payload:{
            label,value
        }
    }
}