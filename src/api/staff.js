import service from "../utils/request";

/**
 * 详情
 */
export function Detailed(data) {
  return service.request({
    url: "/staff/detailed/",
    method: "post",
    data,
  });
}
