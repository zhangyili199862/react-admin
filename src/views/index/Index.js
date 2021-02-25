import React from "react";
import "./index.scss";

//组件
import Aside from "./components/Aside"
//antd
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout className="layout-wrap">
        <Sider width="250px"><Aside/></Sider>
        <Layout>
          <Header className="layout-header">Header</Header>
          <Content className="layout-content">Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
