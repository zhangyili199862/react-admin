import React from "react";
import {Switch} from "react-router-dom"
//加载组件
import PrivateRouter from "../privateRouter/Index"

import components from "./components"
export default class containerMain extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return (
            <Switch>
                {components.map(item=>{
                    return <PrivateRouter exact key={item.path} path={item.path} component={item.component}/>
                })}
                {/* <PrivateRouter exact component={User} path="/index/user/list"></PrivateRouter>
                <PrivateRouter exact component={UserAdd} path="/index/user/add"></PrivateRouter>
                <PrivateRouter exact component={Depart} path="/index/department/list"></PrivateRouter>
                <PrivateRouter exact component={DepartAdd} path="/index/department/add"></PrivateRouter> */}
            </Switch>
        )
    }
}