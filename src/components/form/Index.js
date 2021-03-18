import React from "react";
import { Form, Button,Input } from "antd";
export default class FormCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
    };
    this.initFormItem = this.initFormItem.bind(this);
  }
  initInput(item){
    return (
    <Form.Item label={item.label} name={item.name} key={item.name}>
        <Input />
    </Form.Item>
    )
  }
  initSelect(item){
    return (
    <Form.Item label={item.label} name={item.name} key={item.name}>
        <Input />
    </Form.Item>
    )
  }
  initFormItem() {
    const { formItem } = this.props;
    if(!formItem || (formItem&&formItem.length===0)) {
        return false;
    }
    let formList = [];
    formItem.map(item=>{
        if(item.type==='Input'){
            formList.push(this.initInput(item));
        }
        if(item.type === 'Select'){
            formList.push(this.initSelect(item));
        }
        return false;
    })
    return formList;
  }
  onSubmit(value) {
    alert("123");
  }
  render() {
    const { formLayout } = this.state;
    return (
      <Form ref="form" {...formLayout} onFinish={this.onSubmit}>
        <Form.Item>
          {this.initFormItem()}
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
