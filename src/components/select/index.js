import React, { Component } from "react";
// propTypes
import PropTypes from 'prop-types';
// url
import {requestUrl} from "@/api/requestUrl";
// API
import { TableList } from "@/api/common";
// antd
import { Select } from "antd";
const { Option } = Select;

class SelectComponent extends Component {
    constructor(props){
        super();
        console.log(props)
        this.state = {
            props: props.propsKey,
            options: [],
            // change value
            name: props.name,
            value: ""
        }
    }  

    componentDidMount(){
        this.getSelectList();
    }

    static getDerivedStateFromProps(nextProps, prevState){  // 1、静态的，无法获取 this.state，2、必须有返回
        let { value, name } = nextProps;
        if(!value) { return false; }
        // 判断是否是JSON对象
        if(Object.prototype.toString.call(value) === "[object Object]") {
            value = value[name]   // { parentId: "760" }
        }
        if(value !== prevState.value) {
            return {
                value: value
            }
        }
        // 直接放在最后面
        return null;
    }


    // 请求数据
    getSelectList = () => {
        const url = this.props.url;
        const data = {
            url: requestUrl[url],
            data: {}
        }
        // 不存在 url 时，阻止
        if(!data.url) { return false; }
        // 接口
        TableList(data).then(response => {
            this.setState({
                options: response.data.data.data
            })
        })
    }
    // select onchang
    onChange = (value) => {
        this.setState({ value })
        this.triggerChange(value);
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
          onChange(changedValue);
        }
    };
    

    render(){
        const { value, label } = this.props.keyConfig;
        return (
            <Select value={this.state.value} onChange={this.onChange}>
                {
                    this.state.options && this.state.options.map(elem => {
                        return <Option value={elem[value]} key={Number(elem[value])}>{elem[label]}</Option>
                    })
                }
            </Select>
        )
    }

}
// 校验数据类型
SelectComponent.propTypes = {
    formConfig: PropTypes.object
}
// 默认
SelectComponent.defaultProps = {
    formConfig: {}
}
export default SelectComponent;