import React, { Component, Fragment } from "react";
import "./index.scss";
//组件
import { Form, Input, Button, Row, Col ,message } from "antd";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import {validate_password}from "../../utils/validate"
//接口
import {Login,GetCode} from "../../api/account";
class loginForm extends Component {
  constructor() {
    super();
    this.state = {
      userName:"",
      code_button_disabled:false,
      code_button_loading:false,
      code_button_text:"获取验证码"
    };
    this.toggleClick = this.toggleClick.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  //登录
  onFinish(values) {
    Login().then(res=>{
      console.log(res);
    }).catch(e=>{
      console.log(e);
    })
  }
  //获取验证码
  getCode(){
    const {userName} = this.state;
    if(!userName){
      message.warning("用户名不能为空！")
      return
    }else{
      this.setState({
        code_button_loading:true,
        code_button_text:"发送中"
      })
    }
    const requestData = {
      username:userName,
      module:"login"
    }
    GetCode(requestData).then(res=>{
      this.countDown();
    }).catch(err=>{
      this.setState({
        code_button_loading:false,
        code_button_text:"重新获取"
      })
    })
  }
  //Input输入
  inputChange(e){
    let value = e.target.value;
    this.setState({
      userName:value
    });
  }
  //倒计时
  countDown(){
    let sec = 60,timer = null;
    this.setState({
      code_button_loading:false,
      code_button_disabled:true,
      code_button_text:`${sec}S`
    });
    timer = setInterval(() => {
      sec--;
      if(sec<=0){
        this.setState({
          code_button_text:"重新获取",
          code_button_disabled:false,
        });
        clearInterval(timer);
      }else {
        this.setState({
          code_button_text:`${sec}S`
        })
      }
    }, 1000);
  }
  toggleClick(value){
    this.props.switchForm('register');
  }
  render() {
    const {code_button_disabled,code_button_loading,code_button_text} = this.state;
    return (
      <Fragment>
        <div className="form-header">
          <h4 className="column">登录</h4>
          <span onClick={this.toggleClick}>账号注册</span>
        </div>
        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  type: 'email',
                  message: "邮箱格式不正确",
                },
                {
                  required: true,
                    message:"邮箱不能为空"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                onChange={this.inputChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "密码不能为空",
                },
                {
                  pattern:validate_password,
                  message:"请输入大于6位小于20位数字加字母"
                },
              ]}
            >
              <Input
                prefix={<UnlockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="字母+数字，大于6位小于20位"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "请输入验证码",
                },
                {
                  len:6,
                  message:"请输入长度为6位的验证码"
                }
              ]}
            >
              <Row gutter={13}>
                <Col span={14}>
                  <Input
                    prefix={<UnlockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="code"
                  />
                </Col>
                <Col span={10}>
                  <Button type="primary" danger block onClick={this.getCode.bind(this)} disabled={code_button_disabled} loading={code_button_loading}>
                    {code_button_text}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default loginForm;
