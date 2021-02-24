import React, { Component, Fragment } from "react";
import "./index.scss";
//组件
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
class registerForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.toggleClick = this.toggleClick.bind(this);
  }
  onFinish(values) {
    console.log("Received values of form: ", values);
  }
  toggleClick(){
    this.props.switchForm('login');
  }
  render() {
    return (
      <Fragment>
        <div className="form-header">
          <h4 className="column">注册</h4>
          <span onClick={this.toggleClick}>登录</span>
        </div>
        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={() => this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  type: 'email',
                  message: "邮箱格式不正确",
                },
                {
                    require:true,
                    message:"邮箱不能为空"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
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
                    min:6,
                    message:"不能小于六位"
                }
              ]}
            >
              <Input
                prefix={<UnlockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<UnlockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Code!",
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
                  <Button type="primary" danger block>
                    获取验证码
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
                  注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default registerForm;
