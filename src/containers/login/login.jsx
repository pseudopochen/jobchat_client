import React, { Component } from "react";
import {
  WingBlank,
  NavBar,
  InputItem,
  List,
  WhiteSpace,
  Button,
} from "antd-mobile";

import Logo from "../../components/logo/logo";

export default class Login extends Component {
  state = { username: "", password: "" };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  login = () => {
    console.log(this.state);
  };

  toRegister = () => {
    this.props.history.replace("/register");
  };

  render() {
    return (
      <div>
        <NavBar>Job &nbsp; Chat</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              placeholder="Please enter username."
              onChange={(value) => this.handleChange("username", value)}
            >
              Username:{" "}
            </InputItem>

            <WhiteSpace />

            <InputItem
              placeholder="Please enter password."
              onChange={(value) => this.handleChange("password", value)}
              type="password"
            >
              Password:
            </InputItem>

            <WhiteSpace />

            <Button type="primary" onClick={this.login}>
              Log in
            </Button>

            <WhiteSpace />

            <Button type="ghost" onClick={this.toRegister}>
              Register
            </Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
