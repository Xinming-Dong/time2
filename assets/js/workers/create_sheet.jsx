import React from 'react';

import { connect } from 'react-redux';
import { Form, Button, Alert, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Redirect , NavLink} from 'react-router';

import { create_sheet } from '../ajax';

class CreateSheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      date: null,
      job_codes: ["", "", "", "", "", "", "", ""],
      hours: [0, 0, 0, 0, 0, 0, 0, 0],
      notes: ["", "", "", "", "", "", "", ""],
    };
  }

  handel_change_job_code(i, e) {
    // change job code
    let state_codes = this.state.job_codes;
    state_codes[i] = e.target.value;
    this.setState({
      job_codes: state_codes,
    }, () => {console.log(this.state.job_codes)});
  }

  handel_change_hour(i, e) {
    let state_hours = this.state.hours;
    state_hours[i] = e.target.value;
    this.setState({
      hours: state_hours,
    }, () => {console.log(this.state.hours)});
  }

  handel_change_note(i, e) {
    let state_notes = this.state.notes;
    state_notes[i] = e.target.value;
    this.setState({
      notes: state_notes,
    }, () => {console.log(this.state.notes)});
  }

  handle_date_change(e) {
    this.setState({
      date: e.target.value,
    }, () => {console.log(this.state.date)});
  }

  changed(data) {
    this.props.dispatch({
      type: "CREATE_NEW_SHEET",
      data: data
    });
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
    
    return(
      <div>
      <Form>
        <Form.Row>
          <Form.Label>date</Form.Label>
          <input type="date" className="form_control mr-sm-2" onChange={(en) => this.handle_date_change(en)}/>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridJob">
            <Form.Label>Job</Form.Label>
            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(0, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHour">
            <Form.Label>Hour</Form.Label>
            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(0, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNote">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="description" placeholder="Notes" onChange={(en) =>this.handel_change_note(0, en)}/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridJob">
            <Form.Label>Job</Form.Label>
            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(1, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHour">
            <Form.Label>Hour</Form.Label>
            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(1, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNote">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="description" placeholder="Notes" onChange={(en) =>this.handel_change_note(1, en)}/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridJob">
            <Form.Label>Job</Form.Label>
            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(2, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHour">
            <Form.Label>Hour</Form.Label>
            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(2, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNote">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="description" placeholder="Notes" onChange={(en) =>this.handel_change_note(2, en)}/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridJob">
            <Form.Label>Job</Form.Label>
            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(3, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHour">
            <Form.Label>Hour</Form.Label>
            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(3, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNote">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="description" placeholder="Notes" onChange={(en) =>this.handel_change_note(3, en)}/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridJob">
            <Form.Label>Job</Form.Label>
            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(4, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHour">
            <Form.Label>Hour</Form.Label>
            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(4, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNote">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="description" placeholder="Notes" onChange={(en) =>this.handel_change_note(4, en)}/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridJob">
            <Form.Label>Job</Form.Label>
            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(5, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHour">
            <Form.Label>Hour</Form.Label>
            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(5, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNote">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="description" placeholder="Notes" onChange={(en) =>this.handel_change_note(5, en)}/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridJob">
            <Form.Label>Job</Form.Label>
            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(6, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHour">
            <Form.Label>Hour</Form.Label>
            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(6, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNote">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="description" placeholder="Notes" onChange={(en) =>this.handel_change_note(6, en)}/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridJob">
            <Form.Label>Job</Form.Label>
            <Form.Control type="job_code" placeholder="Enter Job Code" onChange={(en) => this.handel_change_job_code(7, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHour">
            <Form.Label>Hour</Form.Label>
            <Form.Control type="hour" placeholder="Hour" onChange={(en) => this.handel_change_hour(7, en)}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNote">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="description" placeholder="Notes" onChange={(en) =>this.handel_change_note(7, en)}/>
          </Form.Group>
        </Form.Row>
        <Button variant="primary" onClick={() => {
              this.changed({
                current_worker_id: JSON.parse(localStorage.getItem("session")).worker_id,
                date: this.state.date,
                job_code: this.state.job_codes,
                hour: this.state.hours,
                note: this.state.notes,
              });
              create_sheet(this);
            }}>
          Submit
        </Button>
      </Form>
      </div>
    );
  }
}

function state2props(state) {
  // TODO: remove this print
  return state.new_sheet;
}

export default connect(state2props)(CreateSheet);