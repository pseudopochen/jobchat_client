import React, { Component } from "react";
import { connect } from "react-redux";
import { Result, List, WhiteSpace, Button, Modal } from "antd-mobile";
import Cookies from "js-cookie";

import { resetUser } from "../../redux/actions";

class Personal extends Component {
  logout = () => {
    Modal.alert("logout", "Are your sure?", [
      { text: "Cancel" },
      {
        text: "Confirm",
        onPress: () => {
          Cookies.remove("userid");
          this.props.resetUser();
        },
      },
    ]);
  };

  render() {
    const { username, avatar, company, post, salary, info } = this.props.user;

    return (
      <div style={{marginBottom: 50, marginTop: 50}}>
        <Result
          img={
            <img
              src={require("../../assets/avatar/" + avatar + ".png").default}
              style={{ width: 50 }}
              alt="avatar"
            />
          }
          title={username}
          message={company}
        />
        <List renderHeader={() => "Related info:"}>
          <List.Item multipleLine>
            <List.Item.Brief>Post: {post}</List.Item.Brief>
            <List.Item.Brief>Info: {info}</List.Item.Brief>
            {salary ? (
              <List.Item.Brief>Salary: ${salary}/month</List.Item.Brief>
            ) : null}
          </List.Item>
        </List>
        <WhiteSpace />
        <List>
          <Button type="warning" onClick={this.logout}>
            Logout
          </Button>
        </List>
      </div>
    );
  }
}
export default connect((state) => ({ user: state.user }), { resetUser })(
  Personal
);
