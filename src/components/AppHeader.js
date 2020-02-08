import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, PageHeader, Menu, Icon } from "antd";

import Logo from "../logo.svg";

const getCurrentRoute = () => {
  return window.location.href
    .replace(/https?:\/\//, "")
    .replace(/\?.*/, "")
    .split("/")
    .reverse()[0];
};

class AppHeader extends Component {
  state = {
    current: ""
  };

  componentDidMount = () => {
    if (getCurrentRoute() !== this.state.current) {
      this.setState({ current: getCurrentRoute() });
    }
  };

  componentDidUpdate = () => {
    if (getCurrentRoute() !== this.state.current) {
      this.setState({ current: getCurrentRoute() });
    }
  };

  handleClick = e => {
    this.setState({ current: e.key });
  };

  render() {
    const { Header } = Layout;
    return (
      <Header style={{ height: "auto", padding: "0px" }}>
        <PageHeader
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgb(235, 237, 240)"
          }}
          title="Number Systems App"
          avatar={{
            src: Logo
          }}
        />
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="converter">
            <Link to="converter">
              <Icon type="swap" />
              Converter
            </Link>
          </Menu.Item>
          <Menu.Item key="calculator">
            <Link to="calculator">
              <Icon type="calculator" />
              Calculator
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default AppHeader;
