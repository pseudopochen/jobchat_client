import React, { Component } from "react";
import { Button } from "antd-mobile";

class NotFound extends Component {
  render() {
    return (
      <div>
        <h2>Sorry, cannot find the requested page.</h2>
        <Button onClick={() => this.props.history.replace("/")}>
          Back to Front Page
        </Button>
      </div>
    );
  }
}
export default NotFound;
