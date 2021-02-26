import React from "react";
import {Switch} from "react-router-dom"
//加载组件
import User from "../../views/user/Index";
import UserAdd from "../../views/user/Add";
import PrivateRouter from "../privateRouter/Index"
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
            </Switch>
        )
    }
}