import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import {
  WingBlank,
  NavBar,
  InputItem,
  List,
  WhiteSpace,
  Button,
} from "antd-mobile";

import { login } from "../../redux/actions";
import Logo from "../../components/logo/logo";

class Login extends Component {
  state = { username: "", password: "" };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  login = () => {
    //console.log(this.state);
    this.props.login(this.state);
  };

  toRegister = () => {
    this.props.history.replace("/register");
  };

  render() {
    const { msg, redirectTo } = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <div>
        <NavBar>Job &nbsp; Chat</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? <div className="error-msg">{msg}</div> : null}
            <WhiteSpace />
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

export default connect((state) => ({ user: state.user }), {login})(Login);
