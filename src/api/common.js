import service from "../utils/request";

/** 
 * 列表
*/

export function TableList(params){
    return service.request({
        url:params.url,
        method:params.method || "post",
        data:params.data
    })
}

/** 
 * 删除
*/
export function TableDelete(params){
    return service.request({
        url:params.url,
        method:params.method || "post",
        data:params.data
    })
}
/** 
 * 状态变更
*/
export function TableStatus(params){
    return service.request({
        url:params.url,
        method:params.method || "post",
        data:params.data
    })
}

/**
 * 表单提交
 */

export function FormSubmit(params){
    return service.request({
        url:params.url,
        method:params.method || "post",
        data:params.data
    })
}

/**
 * 七牛云token
 */
export function UploadToken(data){
    return service.request({
        url: "/uploadIToken/",
        method: "post",
        data
    })
}