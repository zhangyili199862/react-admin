import {setToken as setTokenType,setUsername as setUsernameType,logout} from "../Type"
import {setToken,setUserName,removeToken,removeUsername} from "@/utils/session";
export function setTokenAction(token){
    setToken(token)
    return {
        type:setTokenType,
        payload:token
    }
}
export function setUsernameAction(username){
    setUserName(username)
    return {
        type:setUsernameType,
        payload:username
    }
}
export function logoutAction(){
    removeToken();
    removeUsername();
    return {
        type:logout,
        value:""
    }
}