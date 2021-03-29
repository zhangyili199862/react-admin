import {setToken as setTokenType,setUsername as setUsernameType} from "../Type"
import {setToken,setUserName} from "@/utils/session";
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