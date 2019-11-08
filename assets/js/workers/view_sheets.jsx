import React from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { Form, Button, Alert, Col} from 'react-bootstrap';
import { Redirect , NavLink} from 'react-router';
import { get_sheets } from '../ajax';

import _ from 'lodash';

// export default function ViewSheets(props) {
//   return (
//     <div>
//       <h3>all sheets</h3>
//     </div>
//   );

let ViewSheets = connect(({sheets}) => ({sheets}))(({sheets}) => {
  // TODO: remove this print
  console.log("view sheets");
  get_sheets();
  let sheetslist = store.getState().sheets.data;
  console.log(sheetslist);
  sheetslist = _.map(sheetslist, (sheet, ii) => {
    return (
      <div className="col">
          <p>{sheet.date} </p>
          <p>{sheet.id} </p>
      </div>
    );
  }) ;
  return (
    <div>
        <h1>All Available Sheets</h1>
        <div className="row">
            {sheetslist}
        </div>
    </div>
  );
});

export default ViewSheets;