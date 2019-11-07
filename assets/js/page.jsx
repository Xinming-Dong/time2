import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';

import WorkerLogin from './worker_login';
import ManagerLogin from './manager_login';

import store from './store';

import CreateSheet from './workers/create_sheet';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Page(props) {
  // let session= JSON.parse(localStorage.getItem("session"));
  // console.log("page------------------");
  // console.log(session);
  return(
      <div>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Col md="4">
            <Nav>
              <Nav.Item>
                <NavLink to="/" exact activeClassName="active" className="nav-link">
                  Home Page
                </NavLink>
              </Nav.Item>
            </Nav>
          </Col>
          
        </Navbar>
        <Col md="8">
            <Session />
          </Col>
  
        <Switch>
          <Route exact path="/worker_login">
            <WorkerLogin />
          </Route>
          <Route exact path="/manager_login">
            <ManagerLogin />
          </Route>
          <Route exact path="/workers/create_sheet">
            <CreateSheet />
          </Route>
        </Switch>
        </Router>
        
      </div>
    );
}

let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
  }
  if (session == null) {
    return (
      <Col md="4">
        <Nav>
          <Nav.Item>
            <NavLink to="/worker_login" exact activeClassName="active" className="nav-link">
              Workers Login
            </NavLink>
          </Nav.Item>
          
          <Nav.Item>
            <NavLink to="/manager_login" exact activeClassName="active" className="nav-link">
              Managers Login
            </NavLink>
          </Nav.Item>
        </Nav>
      </Col>
    );
  }
  else if (session.manager_id){
    return (
      <Router>
      <Nav>
        <Nav.Item>
          <p className="text-light py-2">Manager: {session.manager_name}</p>
        </Nav.Item>
        <Nav.Item>
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </Nav.Item>
      </Nav>
      </Router>
    );
  }
  else {
    return (
      <div>
      <Router>
      <Nav>
        <Nav.Item>
          <p className="text-light py-2">Worker: {session.worker_name}</p>
        </Nav.Item>
        <Nav.Item>
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </Nav.Item>
      </Nav>
      </Router>
      <Router>
        <NavLink to="/workers/create_sheet" exact activeClassName="active" className="nav-link">
          Create a Timesheet
        </NavLink>

        <Switch>
          <Route exact path="/workers/create_sheet">
            <CreateSheet />
          </Route>
        </Switch>
      </Router>
      
      </div>
    );
  }
});