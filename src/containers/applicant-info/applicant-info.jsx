import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, NavBar, InputItem, TextareaItem } from "antd-mobile";

import AvatarSelector from "../../components/avatar-selector/avatar-selector";

class ApplicantInfo extends Component {
  state = {
    avatar: "",
    post: "",
    info: "",
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  save = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <NavBar>Applicant Info Form</NavBar>
        <AvatarSelector setAvatar={(avatar) => this.setState({ avatar })} />
        <InputItem
          labelNumber={10}
          placeholder="enter job post"
          onChange={(value) => this.handleChange("post", value)}
        >
          Job post:
        </InputItem>
        <TextareaItem
          labelNumber={10}
          title="Self intro:"
          rows={5}
          placeholder="enter self intro"
          onChange={(value) => this.handleChange("info", value)}
        >
          Self intro:
        </TextareaItem>

        <Button type="primary" onClick={this.save}>
          Save
        </Button>
      </div>
    );
  }
}

export default connect((state) => ({}), {})(ApplicantInfo);
