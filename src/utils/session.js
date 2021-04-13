import cookies from "react-cookies";
const token = "adminToken",
  username = "username";
export function setToken(value) {
  cookies.save("adminToken", value);
}

export function getToken() {
  return cookies.load(token);
}

export function setUserName(value) {
  cookies.save(username, value);
}
export function getUserName() {
  return cookies.load(username);
}

export function removeToken() {
  cookies.remove(token, { path: "/" });
}
export function removeUsername() {
  cookies.remove(username, { path: "/" });
}
