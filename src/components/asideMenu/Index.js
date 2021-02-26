import React, { Fragment } from "react";
import Router from "../../router/index";
import { Link, withRouter } from "react-router-dom";
//andt
import { Menu } from "antd";
// import {
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// } from "@ant-design/icons";
const { SubMenu } = Menu;
class AsideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      openKeys: [],
    };
    this.selectMenu = this.selectMenu.bind(this);
    this.setMenu = this.setMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }
  componentDidMount() {
    const pathname = this.props.location.pathname;
    const menuKey = pathname.split("/").slice(0, 3).join("/");
    this.setMenu(pathname, menuKey);
  }
  openMenu(openKeys){
    this.setState({
        openKeys:[openKeys[openKeys.length-1]]
    })
  }
  selectMenu({ key, keyPath }) {
    this.setMenu(key, keyPath[keyPath.length - 1]);
  }
  setMenu(selectedKeys, openKeys) {
    this.setState({ selectedKeys, openKeys });
  }
  renderMenu({ title, key }) {
    return (
      <Menu.Item key={key}>
        <Link to={key}>{title}</Link>
      </Menu.Item>
    );
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
    const { selectedKeys, openKeys } = this.state;
    return (
      <Fragment>
        <Menu
          theme="dark"
          mode="inline"
          onOpenChange={this.openMenu}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={this.selectMenu}
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
export default withRouter(AsideMenu);
