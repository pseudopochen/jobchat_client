import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import ManagerInfo from "../manager-info/manager-info";
import ApplicantInfo from "../applicant-info/applicant-info";
import {getRedirectTo} from '../../utils/index'

class Main extends Component {

  componentDidMount() {
    if (!this.props.user._id && this.userid) {

    }
  }

  render() {
    const userid = Cookies.get("userid");
    if (!userid) {
      return <Redirect to="/login"/>
    }
    this.userid = userid;

    const {user} = this.props;
    if (!user._id) {
      return null;
    } else {
      let path = this.props.location.pathname;
      if (path === '/') {
        path = getRedirectTo(user.type, user.avatar);
        return <Redirect to={path}/>
      }
    }

    return (
      <div>
        <Switch>
          <Route path="/managerinfo" component={ManagerInfo} />
          <Route path="/applicantinfo" component={ApplicantInfo} />
        </Switch>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), {})(Main);
