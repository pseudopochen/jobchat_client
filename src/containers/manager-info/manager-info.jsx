import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, NavBar, InputItem, TextareaItem } from "antd-mobile";

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
  };

  render() {
    return (
      <div>
        <NavBar>Manager Info Form</NavBar>
        <AvatarSelector setAvatar={(avatar) => this.setState({avatar})} />
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
          rows={3}
          onChange={(value) => this.handleChange("info", value)}
        />
        <Button type="primary" onClick={this.save}>
          Save
        </Button>
      </div>
    );
  }
}

export default connect((state) => ({}), {})(ManagerInfo);
