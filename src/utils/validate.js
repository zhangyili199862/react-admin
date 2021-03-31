export const validate_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
const reg_phone = /^1[3456789]\d{9}$/;

export function validate_phone(value){
    return reg_phone.test(value)
}