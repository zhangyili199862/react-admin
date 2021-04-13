import service from "../utils/request";

/**
 *  新增
 */
export function UserAdd(data) {
  return service.request({
    url: "/user/add/",
    method: "post",
    data,
  });
}
/**
 *  详情
 */
export function UserDetail(data) {
    return service.request({
      url: "/user/detailed/",
      method: "post",
      data,
    });
}
/**
 *  编辑
 */
export function UserEdit(data) {
    return service.request({
      url: "/user/edit/",
      method: "post",
      data,
    });
}


