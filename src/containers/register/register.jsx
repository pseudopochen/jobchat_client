import React, { Component } from "react";
import {
  WingBlank,
  NavBar,
  InputItem,
  List,
  WhiteSpace,
  Radio,
  Button,
} from "antd-mobile";

import Logo from "../../components/logo/logo";

export default class Register extends Component {
  state = { username: "", password: "", password2: "", type: "manager" };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  register = () => {
    console.log(this.state);
  };

  toLogin = () => {
    this.props.history.replace("/login");
  };

  render() {
    const { type } = this.state;
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
            <InputItem
              placeholder="Please confirm."
              onChange={(value) => this.handleChange("password2", value)}
              type="password"
              labelNumber={10}
            >
              Confirm password:
            </InputItem>
            <WhiteSpace />
            <List.Item>
              <span>User type:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                checked={type === "applicant"}
                onChange={() => this.handleChange("type", "applicant")}
              >
                Applicant
              </Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                checked={type === "manager"}
                onChange={() => this.handleChange("type", "manager")}
              >
                Manager
              </Radio>
            </List.Item>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>
              Register
            </Button>
            <WhiteSpace />
            <Button type="ghost" onClick={this.toLogin}>
              Existing User
            </Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
