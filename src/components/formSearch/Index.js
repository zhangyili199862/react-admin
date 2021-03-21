import React from "react";
import { Form, Button, Input, Select, InputNumber, Radio } from "antd";
// import { requestUrl } from "@/api/requestUrl";
// import { FormSubmit } from "@/api/common";
import propTypes from "prop-types";
import { global } from "@/js/global";
const { Option } = Select;
export default class FormSearch extends React.Component {
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
    const { formItem } = this.props;
    if (!formItem || (formItem && formItem.length === 0)) {
      return false;
    }
    let formList = [];
    formItem.map((item) => {
      if (item.type === "Input") {
        formList.push(this.initInput(item));
      }
      if (item.type === "Select") {
        item.options = global[item.key];
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
  onSubmit(value) {
    const searchData = {};
    for (let key in value) {
      if (value[key] !== undefined && value[key] !== "") {
        searchData[key] = value[key];
      }
    }
    this.props.search(searchData);
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
