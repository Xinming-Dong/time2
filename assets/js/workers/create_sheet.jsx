import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

class CreateSheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
    };
  }

  render() {
    
    return(
      <Form.Group controlId="email">
        <Form.Label>Create a timesheet</Form.Label>
      </Form.Group>
    );
  }
}

function state2props(state) {
  return state.forms.worker_login;
}

export default connect(state2props)(CreateSheet);