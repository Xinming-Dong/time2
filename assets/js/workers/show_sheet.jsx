import React from 'react';
import store from '../store';

import { connect } from 'react-redux';
import { Form, Button, Alert, Col} from 'react-bootstrap';
import { Redirect , NavLink} from 'react-router';

class ShowSheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
    };
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  render() {
    // TODO: remove this print
    console.log("enter create sheet render");
    console.log(this.props);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    let sheetslist = store.getState().sheets.data;
    // TODO: remove this print
    console.log("check if show sheet can get sheets");
    console.log(sheetslist);
    
    return(
      <div>
          <p>show the sheet.</p>
      </div>
    );
  }
}

function state2props(state) {
  return state.new_sheet;
}

export default connect(state2props)(ShowSheet);