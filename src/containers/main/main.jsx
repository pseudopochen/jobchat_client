import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ManagerInfo from "../manager-info/manager-info";
import ApplicantInfo from "../applicant-info/applicant-info";

export default class Main extends Component {
  render() {
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
