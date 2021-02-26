import React from "react";
import "./Index.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
export default class ContainerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="header-wrap">
          <span className="collapsed-icon" onClick={this.props.setCollapsed}>
            {!this.props.collapsed ? (
              <MenuFoldOutlined />
            ) : (
              <MenuUnfoldOutlined />
            )}
          </span>
        </div>
      </React.Fragment>
    );
  }
}
