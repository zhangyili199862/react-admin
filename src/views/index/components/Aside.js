import React, { Fragment } from "react";
import "./aside.scss";
import AsideMenu from "@/components/asideMenu/Index"
//andt
export default class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <h1 className="logo">
          <span>LOGO</span>
        </h1>
        <AsideMenu/>
      </Fragment>
    );
  }
}
