import React, { Component } from "react";
import "./index.scss";
//组件

import LoginForm from "./loginForm"
import RegisterForm from "./registerForm"
class Login extends Component {
  constructor() {
    super();
    this.state = {
        formType:"login"
    };
    this.switchForm = this.switchForm.bind(this);
  }
  switchForm(value){
    this.setState({
        formType:value
    })
  }
  render() {
    return (
      <div className="form-wrap">
        <div>
            {this.state.formType ==='login' ? <LoginForm switchForm={this.switchForm} /> : <RegisterForm switchForm={this.switchForm} />}
        </div>
      </div>
    );
  }
}

export default Login;
