import React from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { Form, Button, Alert, Col, Nav} from 'react-bootstrap';
import { Redirect} from 'react-router';
import { manager_sheets } from '../ajax';

import _ from 'lodash';

class ViewWorkers extends React.Component{
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

    let sheetslist = this.props.sheets;
    if (sheetslist.length == 0) {
      manager_sheets(0, "");
      console.log(this.props);
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
          <option key={sheet.id} value={sheet.id}> {sheet.date} created by {sheet.worker_name}   status: approved </option>
        );
      }
      else {
        return (
          <option key={sheet.id} value={sheet.id}> {sheet.date} created by {sheet.worker_name}   status: not approved </option>
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
      <p id="demo"></p>
      <Button variant="primary" onClick={() => {
        let sheet_id = document.getElementById("mySelect").value;
        document.getElementById("demo").innerHTML = "You selected: " + sheet_id;
        manager_sheets(sheet_id, "approve");
      }}>
        Approve
      </Button>
      </div>
    }

    return (
    <div>
      <h1>Choose a Timesheet</h1>
      <select id="mySelect" className="browser-default custom-select custom-select-lg mb-3" >
        <option disabled selected>Choose your timesheet</option>
          {sheetslist}
      </select>
      <Button variant="primary" onClick={() => {
        let sheet_id = document.getElementById("mySelect").value;
        manager_sheets(sheet_id, "");
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
  return state.manager_sheets;
}

export default connect(state2props)(ViewWorkers);