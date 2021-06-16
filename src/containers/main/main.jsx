import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { NavBar } from "antd-mobile";

import { getUser } from "../../redux/actions";
import ManagerInfo from "../manager-info/manager-info";
import ApplicantInfo from "../applicant-info/applicant-info";
// import Manager from "../manager/manager";
// import Applicant from "../applicant/applicant";
// import Message from "../message/message";
// import Personal from "../personal/personal";
// import NotFound from "../../components/not-found/not-found";
import Chat from "../chat/chat";
import NavFooter from "../../components/nav-footer/nav-footer";
import { getRedirectTo, getNavList, inNavList } from "../../utils/index";

class Main extends Component {
  componentDidMount() {
    if (!this.props.user._id && this.userid) {
      this.props.getUser();
    }
  }

  render() {
    const userid = Cookies.get("userid");
    if (!userid) {
      return <Redirect to="/login" />;
    }
    this.userid = userid;

    const { user } = this.props;
    if (!user._id) {
      return null;
    } else {
      let path = this.props.location.pathname;
      if (path === "/") {
        path = getRedirectTo(user.type, user.avatar);
        console.log('path: ', path);
        return <Redirect to={path} />;
      }
    }

    const path = this.props.location.pathname;
    const currentNav = inNavList(path);

    return (
      <div>
        {currentNav ? (
          <NavBar className="sticky-header">{currentNav.title}</NavBar>
        ) : null}
        <Switch>
          {getNavList().map((nav) => (
            <Route key={nav.path} path={nav.path} component={nav.component} />
          ))}
          <Route path="/managerinfo" component={ManagerInfo} />
          <Route path="/applicantinfo" component={ApplicantInfo} />
          <Route path="/chat/:userid" component={Chat} />
        </Switch>
        {currentNav ? <NavFooter userType={user.type} /> : null}
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { getUser })(Main);
