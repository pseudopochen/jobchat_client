import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem } from "antd-mobile";
import { clientToServer } from "../../redux/actions";

const Item = List.Item;

class Chat extends Component {
  state = { content: "" };

  handleSend = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();
    if (content) {
      this.props.clientToServer({ from, to, content });
    }
    this.setState({ content: "" });
  };

  render() {
    return (
      <div id="chat-page">
        <NavBar></NavBar>
        <List>
          <Item></Item>
        </List>
        <div className="am-tab-bar">
          <InputItem
            value={this.state.content}
            onChange={(value) => this.setState({ content: value })}
            placeholder="please enter message"
            extra={<span onClick={this.handleSend}>send</span>}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { clientToServer })(
  Chat
);
