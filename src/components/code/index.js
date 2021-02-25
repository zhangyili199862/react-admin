import React, { Component } from "react";

import { Button, message } from "antd";
//api
import { GetCode } from "../../api/account";
let timer = null;
export default class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName:"",
      code_button_disabled: false,
      code_button_loading: false,
      code_button_text: "获取验证码",
    };
    this.getCode = this.getCode.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  componentWillReceiveProps(value){
      const {userName} = value;
      this.setState({
        userName:userName
      })
  }

  componentWillUnmount(){
    clearInterval(timer);
  }
  //获取验证码
  getCode() {
    const { userName } = this.state;
    if (!userName) {
      message.warning("用户名不能为空！");
      return;
    } else {
      this.setState({
        code_button_loading: true,
        code_button_text: "发送中",
      });
    }
    const requestData = {
      username: userName,
      module: "login",
    };
    GetCode(requestData)
      .then((res) => {
        message.success(res.data.message)
        this.countDown();
      })
      .catch((err) => {
        this.setState({
          code_button_loading: false,
          code_button_text: "重新获取",
        });
      });
  }
  //倒计时
  countDown() {
    let sec = 60;
    this.setState({
      code_button_loading: false,
      code_button_disabled: true,
      code_button_text: `${sec}S`,
    });
    timer = setInterval(() => {
      sec--;
      if (sec <= 0) {
        this.setState({
          code_button_text: "重新获取",
          code_button_disabled: false,
        });
        clearInterval(timer);
      } else {
        this.setState({
          code_button_text: `${sec}S`,
        });
      }
    }, 1000);
  }
  render() {
    const {
      code_button_disabled,
      code_button_loading,
      code_button_text,
    } = this.state;
    return (
      <Button
        type="primary"
        danger
        block
        onClick={this.getCode.bind(this)}
        disabled={code_button_disabled}
        loading={code_button_loading}
      >
        {code_button_text}
      </Button>
    );
  }
}
