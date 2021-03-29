import React from "react";
import { Form, Button, Input, Select, InputNumber, Radio } from "antd";
import { requestUrl } from "@/api/requestUrl";
import { TableList } from "@/api/common";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {bindActionCreators} from "redux"
import Store from "@/store/Index";
//action
import {addDepartmentList,updateDepartmentList} from "@/store/action/department"
const { Option } = Select;
class FormSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
    };
    this.initFormItem = this.initFormItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.initInputNumber = this.initInputNumber.bind(this);
  }
  componentDidMount() {
    this.onSubmit();
  }
  /**
   * Input
   */
  initInput(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <Input style={item.style} />
      </Form.Item>
    );
  }

  /*
   *Select
   */
  initSelect(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <Select style={item.style} placeholder={item.placeholder}>
          {item.options &&
            item.options.map((item) => {
              return <Option value={item.value}>{item.label}</Option>;
            })}
        </Select>
      </Form.Item>
    );
  }

  /*
    InputNumber
  */
  initInputNumber(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <InputNumber min={item.min} max={item.max} />
      </Form.Item>
    );
  }
  /**
   * Radio
   */
  initRadio(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <Radio.Group>
          {item.options &&
            item.options.map((ele) => {
              return (
                <Radio value={ele.value} key={`${ele.value}.${ele.label}`}>
                  {ele.label}
                </Radio>
              );
            })}
        </Radio.Group>
      </Form.Item>
    );
  }
  /**
   * TextArea
   */
  initTextArea(item) {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <Input.TextArea />
      </Form.Item>
    );
  }
  initFormItem() {
    const { formItem, config } = this.props;
    if (!formItem || (formItem && formItem.length === 0)) {
      return false;
    }
    let formList = [];
    console.log(this.props);
    formItem.map((item) => {
      if (item.type === "Input") {
        formList.push(this.initInput(item));
      }
      if (item.type === "Select") {
        item.options = config[item.key];
        formList.push(this.initSelect(item));
      }
      if (item.type === "InputNumber") {
        formList.push(this.initInputNumber(item));
      }
      if (item.type === "Radio") {
        formList.push(this.initRadio(item));
      }
      if (item.type === "TextArea") {
        formList.push(this.initTextArea(item));
      }
      return false;
    });
    return formList;
  }
  search(params){
    const requestData = {
      url: requestUrl[params.url],
      method: "post",
      data: {
        pageNumber: 1,
        pageSize: 10,
      },
    };
    if (Object.keys(params.searchData).length !== 0) {
      for (let key in params.searchData) {
        requestData.data[key] = params.searchData[key];
      }
    }
    TableList(requestData).then((res) => {
      const resData = res.data.data;
      this.props.actions.addData(resData);
    });
  }
  onSubmit(value) {
    console.log(this.props)
    const searchData = {};
    for (let key in value) {
      if (value[key] !== undefined && value[key] !== "") {
        searchData[key] = value[key];
      }
    }
    this.search({
      url: "department",
      searchData,
    });
    // this.setState({
    //   buttonLoading: true,
    // });
    // const data = {
    //   url: requestUrl[this.props.formConfig.url],
    //   data: value,
    // };
    // FormSubmit(data)
    //   .then((res) => {
    //     message.success(res.data.message);
    //     this.refs.form.resetFields();
    //   })
    //   .finally(() => {
    //     this.setState({
    //       buttonLoading: false,
    //     });
    //   });
  }
  render() {
    const { formLayout, formConfig } = this.props;
    const { buttonLoading } = this.state;
    return (
      <Form
        layout="inline"
        ref="form"
        {...formLayout}
        initialValues={formConfig.initValue}
        onFinish={this.onSubmit}
      >
        {this.initFormItem()}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={buttonLoading}>
            搜索
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
FormSearch.propTypes = {
  formConfig: propTypes.object,
};
FormSearch.defaultProps = {
  formConfig: {},
};
const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // listData: bindActionCreators(addDepartmentList,dispatch) //单个action
    actions:bindActionCreators({addData:addDepartmentList,updateData:updateDepartmentList},dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);
