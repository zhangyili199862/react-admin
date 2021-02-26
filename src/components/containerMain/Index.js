import React from "react";
import {Switch} from "react-router-dom"
//加载组件
import User from "../../views/user/Index";
import UserAdd from "../../views/user/Add";

import Depart from "../../views/department/Index";
import DepartAdd from "../../views/department/Add";
import PrivateRouter from "../privateRouter/Index"

/**  
 * 自动导入组件
 */
// const files = require.context("../../views/",true,/\.js$/);
// files.keys().map(key=>{
//     if(key.includes('./index/') || key.includes('./login/')) { return false};

//     const splitFileName = key.split('.');
//     //path
//     const path = `/index${splitFileName[1].toLowerCase()}`;
// })
export default class containerMain extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return (
            <Switch>
                <PrivateRouter exact component={User} path="/index/user/list"></PrivateRouter>
                <PrivateRouter exact component={UserAdd} path="/index/user/add"></PrivateRouter>
                <PrivateRouter exact component={Depart} path="/index/department/list"></PrivateRouter>
                <PrivateRouter exact component={DepartAdd} path="/index/department/add"></PrivateRouter>
            </Switch>
        )
    }
}