import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";

import { getLastMsgs, getUnReadCount } from "../../utils";

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {
  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;
    const lastMsgs = getLastMsgs(chatMsgs);
    const {unreadCount, totalUnRead} = getUnReadCount(chatMsgs, user._id);
    // console.log("totalUnRead: ", totalUnRead);

    return (
      <List style={{ marginTop: 50, marginBottom: 50 }}>
        {lastMsgs.map((msg) => (
          <Item
            key={msg._id}
            extra={
              <Badge
                text={unreadCount[msg.chat_id] ? unreadCount[msg.chat_id] : 0}
              />
            }
            thumb={
              require(`../../assets/avatar/${
                users[user._id === msg.to ? msg.from : msg.to].avatar
              }.png`).default
            }
            arrow="horizontal"
            onClick={() =>
              this.props.history.push(
                "/chat/" + (user._id === msg.to ? msg.from : msg.to)
              )
            }
          >
            {msg.content}
            <Brief>
              {users[user._id === msg.to ? msg.from : msg.to].username}
            </Brief>
          </Item>
        ))}
      </List>
    );
  }
}
export default connect(
  (state) => ({ user: state.user, chat: state.chat }),
  {}
)(Message);
