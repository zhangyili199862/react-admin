import React, { Fragment } from "react";
import Router from "../../router/index";
//andt
import { Menu } from "antd";
// import {
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// } from "@ant-design/icons";
const { SubMenu } = Menu;
export default class AsideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderMenu({ title, key }) {
    return <Menu.Item key={key}>{title}</Menu.Item>;
  }
  renderSubMenu({ title, key, child }) {
    return (
      <SubMenu title={title} key={key}>
        {child &&
          child.map((item) => {
            return item.child && item.child.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenu(item);
          })}
      </SubMenu>
    );
  }
  render() {
    return (
      <Fragment>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ borderRight: 0 }}
        >
          {Router &&
            Router.map((firstItem) => {
              return firstItem.child && firstItem.child.length > 0
                ? this.renderSubMenu(firstItem)
                : this.renderMenu(firstItem);
            })}
        </Menu>
      </Fragment>
    );
  }
}
