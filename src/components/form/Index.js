import React from "react";
import { Form, Button, Input,Select,InputNumber, Radio } from "antd";
import {requestUrl} from "@/api/requestUrl"
import {FormSubmit} from "@/api/common"
const { Option } = Select;
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
    this.onSubmit = this.onSubmit.bind(this);
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
            {
                item.options && item.options.map(item=>{
                    return <Option value={item.value}>{item.label}</Option>
                })
            }
        </Select>
      </Form.Item>
    );
  }

  /*
    InputNumber
  */
 initInputNumber(item){
     return (
        <Form.Item
          label={item.label}
          name={item.name}
          key={item.name}
          rules={item.rules ?? []}
        >
          <InputNumber defaultValue={0} min={item.min} max={item.max} />
        </Form.Item>
      );
 }
 /**
  * Radio
  */
 initRadio(item){
     return (
        <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules ?? []}
      >
        <Radio.Group defaultValue={item.defaultValue}>
                {
                    item.options && item.options.map(ele=>{
                        return <Radio value={ele.value} key={`${ele.value}.${ele.label}`} >{ele.label}</Radio>
                    })
                }
        </Radio.Group>
      </Form.Item>
     )
 }
 /**
  * TextArea
  */
 initTextArea(item){
    return (
        <Form.Item
          label={item.label}
          name={item.name}
          key={item.name}
          rules={item.rules ?? []}
        >
          <Input.TextArea  />
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
        formList.push(this.initSelect(item));
      }
      if(item.type ==="InputNumber"){
        formList.push(this.initInputNumber(item));
      }
      if(item.type ==="Radio"){
        formList.push(this.initRadio(item));
      }
      if(item.type==='TextArea'){
        formList.push(this.initTextArea(item));
      }
      return false;
    });
    return formList;
  }
  onSubmit(value) {
      console.log(this.props.formConfig)
    // this.props.onSubmit(value);
    const data = {
        url:requestUrl[this.props.formConfig.url],
        data:value
    }
    FormSubmit(data).then(res=>{
        console.log(res);
    })
  }
  render() {
    const { formLayout } = this.props;
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
