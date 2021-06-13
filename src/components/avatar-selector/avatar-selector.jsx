import React, { Component } from "react";
import { List, Grid } from "antd-mobile";
import PropTypes from "prop-types";

export default class AvatarSelector extends Component {
  static propTypes = {
    setAvatar: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.avatarList = [];
    for (let i = 0; i < 20; i++) {
      let idx = String(i + 1).padStart(2, "0");
      this.avatarList.push({
        text: "avatar" + idx,
        icon: require(`./images/avatar${idx}.png`).default, // must add .default, if not, output will be [object.moduel] on the html instead of the src path, this is due to webpack resolution rule (https://stackoverflow.com/questions/59070216/webpack-file-loader-outputs-object-module)
      });
    }

    this.state = { icon: null };
  }

  handleClick = ({ text, icon }) => {
    this.setState({ icon });
    this.props.setAvatar(text);
  };

  render() {
    const { icon } = this.state;

    const listHeader = icon ? (
      <div>
        <span>Your selected avatar:</span> &nbsp;&nbsp;
        <img alt="avatar" src={icon} style={{ width: 20 }} />
      </div>
    ) : (
      "Please select your avatar:"
    );

    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.avatarList} columnNum={5} onClick={this.handleClick} />
      </List>
    );
  }
}
