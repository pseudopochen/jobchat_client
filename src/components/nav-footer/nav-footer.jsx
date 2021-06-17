import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { TabBar } from "antd-mobile";
import PropTypes from "prop-types";

import { getNavList } from "../../utils/index";

class NavFooter extends Component {
  static propTypes = {
    userType: PropTypes.string.isRequired,
    // path: PropTypes.string.isRequired,
    unReadCount: PropTypes.number.isRequired,
  };

  render() {
    const path = this.props.location.pathname;
    const {unReadCount} = this.props; 
    // console.log('path: ', path, ' userType: ', this.props.userType)
    return (
      <TabBar>
        {getNavList(this.props.userType).map((nav) => (
          <TabBar.Item
            key={nav.path}
            badge={nav.path==='/message' ? unReadCount : 0}
            title={nav.text}
            icon={{ uri: require(`./images/${nav.icon}.png`).default }}
            selectedIcon={{
              uri: require(`./images/${nav.icon}-selected.png`).default,
            }}
            selected={path === nav.path}
            onPress={() => this.props.history.replace(nav.path)}
          />
        ))}
      </TabBar>
    );
  }
}

export default withRouter(NavFooter);
