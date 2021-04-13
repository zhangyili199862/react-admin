import React from "react";
import "./Index.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//action
import { logoutAction } from "@/store/action/app";

class ContainerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }
  logout = () => {
    this.props.actions.logout();
    this.props.history.push("/");
  };
  render() {
    return (
      <React.Fragment>
        <div className="header-wrap">
          <div>
            <span className="collapsed-icon" onClick={this.props.setCollapsed}>
              {!this.props.collapsed ? (
                <MenuFoldOutlined />
              ) : (
                <MenuUnfoldOutlined />
              )}
            </span>
          </div>
          <div onClick={this.logout}>
            <LoginOutlined />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ logout: logoutAction }, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(withRouter(ContainerHeader));
