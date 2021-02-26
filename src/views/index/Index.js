import React from "react";
import "./index.scss";

//组件
import Aside from "./components/Aside";
import ContainerMain from "../../components/containerMain/Index";
import ContainerHeader from "../../components/containerHeader/Index";
//antd
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.setCollapsed = this.setCollapsed.bind(this);
  }
  componentDidMount(){
    const collapsed =JSON.parse(sessionStorage.getItem('collapsed'));
    this.setState({
      collapsed
    })
  }
  setCollapsed() {
    const collapsed = !this.state.collapsed;
    this.setState({
      collapsed: collapsed,
    });
    sessionStorage.setItem('collapsed',collapsed);
  }
  render() {
    const {collapsed} = this.state;
    return (
      <Layout className="layout-wrap">
        <Sider width="250px" collapsed={collapsed}>
          <Aside />
        </Sider>
        <Layout>
          <Header className="layout-header">
            <ContainerHeader collapsed={collapsed} setCollapsed={this.setCollapsed} />
          </Header>
          <Content className="layout-content">
            <ContainerMain />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
