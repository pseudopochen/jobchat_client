import React, { Component } from "react";
import PropTypes from "prop-types";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";
import { withRouter } from "react-router-dom";
import QueAnim from "rc-queue-anim";

const Header = Card.Header;
const Body = Card.Body;

class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired,
  };

  render() {
    const { userList } = this.props;
    // console.log('user-list: ', userList);
    return (
      <WingBlank style={{ marginBottom: 50, marginTop: 50 }}>
        <QueAnim type="scale">
          {userList.map((user) => (
            <div key={user._id}>
              <WhiteSpace />
              <Card
                onClick={() => this.props.history.push(`/chat/${user._id}`)}
              >
                <Header
                  thumb={
                    require(`../../assets/avatar/${user.avatar}.png`).default
                  }
                  extra={user.username}
                />

                <Body>
                  <div>Post: {user.post}</div>
                  {user.company ? <div>Company: {user.company}</div> : null}
                  {user.salary ? <div>Salary: {user.salary}</div> : null}
                  <div>Info: {user.info}</div>
                </Body>
              </Card>
            </div>
          ))}
        </QueAnim>
      </WingBlank>
    );
  }
}
export default withRouter(UserList);
