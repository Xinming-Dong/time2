import React from 'react';

import { connect } from 'react-redux';
import { Form, Button, Alert, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Redirect , NavLink} from 'react-router';

import { create_sheet, job_codes } from '../ajax';

class CreateSheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      date: null,
      job_codes: ["", "", "", "", "", "", "", ""],
      hours: [0, 0, 0, 0, 0, 0, 0, 0],
      notes: ["", "", "", "", "", "", "", ""],
      numOfRow: 1,
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
      data: data,
    });
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  plus() {
    if (this.state.numOfRow < 8) {
      this.setState({ numOfRow: this.state.numOfRow + 1 });
    }
  }
  minus() {
    if (this.state.numOfRow > 1) {
      this.setState({ numOfRow: this.state.numOfRow - 1 });
    }
  }

  table() {
    let t = [];
    for (let i = 0; i < this.state.numOfRow; i++) {
      t.push(
        <div>
          <SheetInfo
            allJobCode={this.props.job_codes}
            handel_change_job_code={e => this.handel_change_job_code(i, e)}
            handel_change_hour={e => this.handel_change_hour(i, e)}
            handel_change_note={e => this.handel_change_note(i, e)}
          />
        </div>
      );
    }
    return t;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    let codes = this.props.job_codes;
    if(codes.length == 0) {
      job_codes();
      return (
        <div>
          <h1>Show Sheet</h1>
          <p>Loading...</p>
        </div>
      );
    }
    
    return(
      <div>
        <h1>New Time Sheet</h1>
        
        <Form>
          <Form.Row>
            <Form.Label>date</Form.Label>
            <input type="date" className="form_control mr-sm-2" onChange={(en) => this.handle_date_change(en)}/>
          </Form.Row>
          <Button id="button1" variant="primary" onClick={() => this.plus()}>+</Button>
          <Button id="button2" variant="primary" onClick={() => this.minus()}>-</Button>
          <div>{this.table()}</div>
        </Form>
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
        </div>);
          
      
  }
}

function SheetInfo(params) {
  let {
    allJobCode,
    handel_change_job_code,
    handel_change_hour,
    handel_change_note
  } = params;
  let aaa = _.map(allJobCode, (code, ii) => {
    console.log(String(code));
    return <option key={ii} value={code}> {code} </option>
  });

  let select_code = 
  <select id="mySelect" className="browser-default custom-select custom-select-lg mb-3" onChange={handel_change_job_code}>
    <option disabled selected >Jobcode</option>
      {aaa}
  </select>;

  return (
    <Form.Row>
      <Form.Group as={Col} controlId="formGridJob">
        <Form.Label>Job</Form.Label>
        {select_code}
      </Form.Group>

      <Form.Group as={Col} controlId="formGridHour">
        <Form.Label>Hour</Form.Label>
        <Form.Control type="hour" placeholder="Hour" onChange={handel_change_hour}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridNote">
        <Form.Label>Notes</Form.Label>
        <Form.Control type="description" placeholder="Notes" onChange={handel_change_note}/>
      </Form.Group>
    </Form.Row>
  );
}

function state2props(state) {
  // TODO: remove this print
  return state.new_sheet;
}

export default connect(state2props)(CreateSheet);