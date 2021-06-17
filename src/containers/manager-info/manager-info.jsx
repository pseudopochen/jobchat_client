import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, NavBar, InputItem, TextareaItem } from "antd-mobile";

import { updateUser } from "../../redux/actions";
import AvatarSelector from "../../components/avatar-selector/avatar-selector";

class ManagerInfo extends Component {
  state = {
    avatar: "",
    post: "",
    info: "",
    company: "",
    salary: "",
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  save = () => {
    console.log(this.state);
    const newUser = { ...this.props.user, ...this.state };
    console.log(newUser);
    this.props.updateUser(newUser);
  };

  render() {
    const { avatar } = this.props.user;
    if (avatar) {
      return <Redirect to="/manager" />;
    }

    return (
      <div>
        <NavBar>Manager Info Form</NavBar>
        <AvatarSelector setAvatar={(avatar) => this.setState({ avatar })} />
        <InputItem
          labelNumber={10}
          placeholder="enter position info"
          onChange={(value) => this.handleChange("post", value)}
        >
          Hiring Position:
        </InputItem>
        <InputItem
          labelNumber={10}
          placeholder="enter company name"
          onChange={(value) => this.handleChange("company", value)}
        >
          Company Name:
        </InputItem>
        <InputItem
          labelNumber={10}
          placeholder="enter salary"
          onChange={(value) => this.handleChange("salary", value)}
        >
          Salary:
        </InputItem>
        <TextareaItem
          labelNumber={10}
          title="Position requirement:"
          rows={2}
          onChange={(value) => this.handleChange("info", value)}
        />
        <Button type="primary" onClick={this.save}>
          Save
        </Button>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { updateUser })(
  ManagerInfo
);
