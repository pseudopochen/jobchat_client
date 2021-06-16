import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem, Grid, Icon } from "antd-mobile";
import { clientToServer } from "../../redux/actions";

const Item = List.Item;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "", isShow: false };
    const emojis = [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
    ];
    this.emojis = emojis.map((emoji) => ({ text: emoji }));
  }

  toggleShow = () => {
    const isShow = !this.state.isShow;
    this.setState({ isShow });
    if (isShow) {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 0);
    }
  };

  handleSend = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();
    if (content) {
      this.props.clientToServer({ from, to, content });
    }
    this.setState({ content: "", isShow: false });
  };

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;

    const meId = user._id;
    if (!users[meId]) {
      // no display if users are empty
      return null;
    }

    const targetId = this.props.match.params.userid;
    //console.log('targetId: ', targetId)
    const chatId = [meId, targetId].sort().join("_");
    const msgs = chatMsgs.filter((msg) => msg.chat_id === chatId);
    //console.log('chatId: ', chatId, 'chatMsgs: ', chatMsgs);
    const targetIcon = users[targetId].avatar
      ? require(`../../assets/avatar/${users[targetId].avatar}.png`).default
      : null;

    return (
      <div id="chat-page">
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          className="sticky-header"
        >
          {users[targetId].username}
        </NavBar>
        <List style={{ marginTop: 50, marginBottom: 50 }}>
          {msgs.map((msg) => {
            if (targetId === msg.from) {
              return (
                <Item key={msg._id} thumb={targetIcon}>
                  {msg.content}
                </Item>
              );
            } else {
              return (
                <Item key={msg._id} className="chat-me" extra="me">
                  {msg.content}
                </Item>
              );
            }
          })}
        </List>
        <div className="am-tab-bar">
          <InputItem
            value={this.state.content}
            onChange={(value) => this.setState({ content: value })}
            onFocus={() => this.setState({ isShow: false })}
            placeholder="please enter message"
            extra={
              <span>
                <span onClick={this.toggleShow} style={{ marginRight: 5 }}>
                  😊
                </span>{" "}
                <span onClick={this.handleSend}>Send</span>
              </span>
            }
          />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({ content: this.state.content + item.text });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user, chat: state.chat }), {
  clientToServer,
})(Chat);
