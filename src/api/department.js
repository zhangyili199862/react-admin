import service from "../utils/request";

/** 
 * 部门新增
*/

export function DepartmentAdd(data){
    return service.request({
        url:"/department/add/",
        method:"post",
        data
    })
}
/** 
 * 部门编辑
*/

export function DepartmentEdit(data){
    return service.request({
        url:"/department/edit/",
        method:"post",
        data
    })
}
/** 
 * 部门列表
*/

export function DepartmentList(data){
    return service.request({
        url:"/department/list/",
        method:"post",
        data
    })
}
/**
 * 删除
 */
export function DepartmentDelete(data){
    return service.request({
        url:"/department/delete/",
        method:"post",
        data
    })
}

/** 
 * 部门禁启用
*/

export function DepartmentStatusEdit(data){
    return service.request({
        url:"/department/status/",
        method:"post",
        data
    })
}

/** 
 * 详情
*/

export function DepartmentDetailed(data){
    return service.request({
        url:"/department/detailed/",
        method:"post",
        data
    })
}
