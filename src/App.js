import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Layout, Row, Col } from "antd";

import AppHeader from "./components/AppHeader";
import AppCalculator from "./components/AppCalculator";
import AppConverter from "./components/AppConverter";
import AppFooter from "./components/AppFooter";

import "./App.css";

class App extends Component {
  render() {
    const { Content } = Layout;
    return (
      <div>
        <Layout>
          <AppHeader />
          <Content style={{ backgroundColor: "#fff", padding: "70px 0px" }}>
            <Row type="flex" justify="center">
              <Col xl={12} lg={14} md={16} sm={18} xs={20}>
                <Switch>
                  <Route exact path="/" component={AppConverter} />
                  <Route exact path="/converter" component={AppConverter} />
                  <Route exact path="/calculator" component={AppCalculator} />
                </Switch>
              </Col>
            </Row>
          </Content>
          <AppFooter />
        </Layout>
      </div>
    );
  }
}

export default App;
