import React from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Form, Button, Alert, Col, Nav} from 'react-bootstrap';
import { Redirect} from 'react-router';
import { get_sheets } from '../ajax';

import _ from 'lodash';

class ViewSheets extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let sheetslist = this.props.data;
    if (sheetslist.length == 0) {
      get_sheets(0);
      return (
        <div>
          <h1>Show Sheet</h1>
          <p>Loading...</p>
        </div>
      );
    }
    
    sheetslist = _.map(sheetslist, (sheet, ii) => {
      if (sheet.approve_status) {
        return (
          <option key={sheet.id} value={sheet.id}> {sheet.date}      approved </option>
        );
      }
      else {
        return (
          <option key={sheet.id} value={sheet.id}> {sheet.date}      not approved </option>
        );
      }
    });

    let taskslist = this.props.tasks;
    let tasks_display;
    if (taskslist.length == 0) {
      tasks_display = <div> </div>;
    }
    else {
      taskslist = _.map(taskslist, (tt, ii) => {
        return(
          <tr>
            <th scope="row">1</th>
              <td>{tt.job_code}</td>
              <td>{tt.name}</td>
              <td>{tt.hour}</td>
              <td>{tt.note}</td>
          </tr>
        );
      });
      tasks_display = 
      <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">job code</th>
            <th scope="col">job name</th>
            <th scope="col">hour</th>
            <th scope="col">note</th>
          </tr>
        </thead>
        <tbody>
          {taskslist}
        </tbody>
      </table>
      
      </div>
    }

    return (
    <div>
      <h1>All Available Sheets</h1>
      <select id="mySelect" className="browser-default custom-select custom-select-lg mb-3" >
        <option disabled selected>Choose your timesheet</option>
          {sheetslist}
      </select>
      <Button variant="primary" onClick={() => {
        let sheet_id = document.getElementById("mySelect").value;
        get_sheets(sheet_id);
      }}>
          Submit
      </Button>
      <div>{tasks_display}</div>
    </div>
    );
  }
}

function state2props(state) {
  // TODO: remove this print
  return state.sheets;
}

export default connect(state2props)(ViewSheets);