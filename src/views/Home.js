import React, { Fragment } from "react";
import "./aaa.scss";
import { Button } from "antd";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        Home
        <Button type="primary">button</Button>
      </Fragment>
    );
  }
}

export default Home;
