import React from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Form, Button, Alert, Col, Nav} from 'react-bootstrap';
import { Redirect} from 'react-router';
import { get_sheets, show_tasks } from '../ajax';

import _ from 'lodash';

import ShowSheet from './show_sheet';
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
    console.log(this.props);
    console.log(sheetslist);
    if (sheetslist.length == 0) {
      get_sheets();
      return (
        <div>
          <h1>Show Sheet</h1>
          <p>Loading...</p>
        </div>
      );
    }
    console.log(sheetslist);
    
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
    return (
    <div>
      <h1>All Available Sheets</h1>
      <select id="mySelect" className="browser-default custom-select custom-select-lg mb-3" >
        <option disabled selected>Choose your timesheet</option>
          {sheetslist}
      </select>
      <p id="demo"></p>
      <Button variant="primary">
          Submit
      </Button>
    </div>
    );
  }
}
// let ViewSheets = connect(({sheets}) => ({sheets}))(({sheets}) => {
//   get_sheets();
//   let sheetslist = store.getState().sheets.data;
//   sheetslist = _.map(sheetslist, (sheet, ii) => {
//     if (sheet.approve_status) {
//       return (
//         <option value={sheet.id}> {sheet.date}      approved </option>
//       );
//     }
//     else {
//       return (
//         <option value={sheet.id}> {sheet.date}      not approved </option>
//       );
//     }
    
//   }) ;

//   // let taskslist = store.getState().tasks;
//   // // TODO: remove this print
//   // console.log("view sheets");
//   // console.log(taskslist);

//   return (
//     <div>
//       <h1>All Available Sheets</h1>
//       <select id="mySelect" class="browser-default custom-select custom-select-lg mb-3" >
//         <option disabled selected>Choose your timesheet</option>
//         {sheetslist}
//       </select>
//       <p id="demo"></p>
//       <Button variant="primary" onClick={() => {
//         let sheet_id = document.getElementById("mySelect").value;
//         document.getElementById("demo").innerHTML = "You selected: " + sheet_id;
//         show_tasks(sheet_id);
//       }}>
//           Submit
//         </Button>
//     </div>
//   );
// });


function state2props(state) {
  // TODO: remove this print
  return state.sheets;
}

export default connect(state2props)(ViewSheets);