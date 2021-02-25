import React, { Component, Fragment } from "react";
import "./index.scss";
//组件
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { validate_password } from "../../utils/validate";
import {setToken} from "../../utils/session";
import CodeButton from "../../components/code/index"
//接口
import { Login } from "../../api/account";
import { withRouter } from "react-router-dom";
class loginForm extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      loginLoading:false
    };
    this.toggleClick = this.toggleClick.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }
  //登录
  onFinish(values) {
    this.setState({
      loginLoading:true
    })
    Login()
      .then((res) => {
        setToken('123');
        console.log(res);
        this.props.history.push('/index');
      })
      .catch((e) => {
        this.setState({
          loginLoading:false
        })
        console.log(e);
      });
  }
  //Input输入
  inputChange(e) {
    let value = e.target.value;
    this.setState({
      userName: value,
    });
  }

  toggleClick(value) {
    this.props.switchForm("register");
  }
  render() {
    const {userName,loginLoading} = this.state;
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
                  type: "email",
                  message: "邮箱格式不正确",
                },
                {
                  required: true,
                  message: "邮箱不能为空",
                },
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
                  pattern: validate_password,
                  message: "请输入大于6位小于20位数字加字母",
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
                  len: 6,
                  message: "请输入长度为6位的验证码",
                },
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
                  <CodeButton userName={userName}/>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                loading={loginLoading}
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

export default withRouter(loginForm);
