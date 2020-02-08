import React from "react";
import { Layout, Icon } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer>
      Copyright &copy; 2020. <strong>Number Systems App</strong>. Made with{" "}
      <Icon type="heart" theme="filled" /> by{" "}
      <a href="https://github.com/andikabahari">Andika Bahari.</a>
    </Footer>
  );
};

export default AppFooter;
