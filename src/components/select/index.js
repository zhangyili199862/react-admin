import React from "react";
import { Select } from "antd";
import propTypes from "prop-types";
import { TableList } from "@/api/common";
import { requestUrl } from "@/api/requestUrl";
const { Option } = Select;
export default class SelectCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          value: "4953",
          label: "张毅力",
        },
        {
          value: "4952",
          label: "123",
        },
        {
          value: "4949",
          label: "划水部",
        },
      ],
      value: "",
    };
    this.getSelectList = this.getSelectList.bind(this);
    this.valueChange = this.valueChange.bind(this);
  }
  triggerChange(changedValue) {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange({ [this.props.name]: changedValue });
    }
  }
  componentDidMount() {
    this.getSelectList();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps)
    let { value,name } = nextProps;
    if (!value) return;
    if(Object.prototype.toString.call(value) === "[object Object]"){
      value = value[name];
    }
    if (value != prevState.value) {
      return {
        value: value,
      };
    }
    return null;
  }
  getSelectList() {
    const { url, keyConfig } = this.props;
    const data = {
      url: requestUrl[url],
      data: null,
    };
    if (!data.url) return false;
    TableList(data).then((res) => {
      this.setState({
        options: res.data.data.data,
      });
    });
  }
  valueChange(newValue) {
    this.setState({
      value: newValue,
    });
    this.triggerChange(newValue);
  }
  render() {
    const { value, label } = this.props.keyConfig;
    return (
      <Select value={this.state.value} onChange={this.valueChange}>
        {this.state.options &&
          this.state.options.map((item) => {
            return (
              <Option value={item[value]} key={`${item[value]}_${item[label]}`}>
                {item[label]}
              </Option>
            );
          })}
      </Select>
    );
  }
}
// SelectCom
