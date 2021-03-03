/**  
 * 自动导入组件
 */
const files = require.context("../../views/",true,/\.js$/);
const components = [];
files.keys().map(key=>{
    if(key.includes('./index/') || key.includes('./login/')) { return false};

    const splitFileName = key.split('.');
    //path
    const path = `/index${splitFileName[1].toLowerCase()}`;
    const component = files(key).default;
    const jsonObj = {
        path,component
    };
    components.push(jsonObj);
    return true
});

export default components;