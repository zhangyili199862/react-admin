import React from "react";

import { Form, Input, InputNumber, Button, Radio, message } from "antd";

//API
import { DepartmentAdd } from "@/api/department";
export default class DepartAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      buttonDisabled: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(formObj) {
    if (!formObj.name) {
      message.error("部门名称不能为空");
      return false;
    }
    if (!formObj.number || formObj.number === 0) {
      message.error("人员数量不能为0");
      return false;
    }
    if (!formObj.content) {
      message.error("部门描述不能为空");
      return false;
    }
    this.setState({
      buttonLoading: true,
    });
    DepartmentAdd(formObj)
      .then((res) => {
        message.success(res.data.message);
        this.refs.form.resetFields();
      })
      .finally(() => {
        this.setState({
          buttonLoading: false,
        });
      });
  }
  render() {
    const formLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      { buttonLoading, buttonDisabled } = this.state;
    return (
      <div>
        <Form ref="form" {...formLayout} onFinish={this.onSubmit}>
          <Form.Item label="部门名称" name="name">
            <Input></Input>
          </Form.Item>
          <Form.Item label="人员数量" name="number">
            <InputNumber initialValues={0}></InputNumber>
          </Form.Item>
          <Form.Item label="禁启用" name="status">
            <Radio.Group defaultChecked={true}>
              <Radio value={false}>禁用</Radio>
              <Radio value={true}>启用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="描述" name="content">
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <Button
              loading={buttonLoading}
              disabled={buttonDisabled}
              htmlType="submit"
              type="primary"
            >
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
