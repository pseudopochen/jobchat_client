import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, NavBar, InputItem, TextareaItem } from "antd-mobile";

import { updateUser } from "../../redux/actions";
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
    const newUser = {...this.props.user, ...this.state};
    this.props.updateUser(newUser);
  };

  render() {
    const {avatar} = this.props.user;
    if (avatar) {
      return <Redirect to='/applicant'/> 
    }
    
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

export default connect((state) => ({ user: state.user }), { updateUser })(
  ApplicantInfo
);
