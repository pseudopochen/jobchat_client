import React, { Component } from "react";
import { connect } from "react-redux";

import { getUserList } from "../../redux/actions";
import UserList from "../../components/user-list/user-list";

class Applicant extends Component {
  componentDidMount() {
    this.props.getUserList("manager");
    // console.log(this.props.userList);
  }

  render() {
    // console.log('render: ', this.props.userList)
    return <UserList userList={this.props.userList} />;
  }
}

export default connect((state) => ({ userList: state.userList }), {
  getUserList,
})(Applicant);
