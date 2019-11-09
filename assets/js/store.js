import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

/* Structure of store data:
 * {
 *   forms: {
 *     worker_login: {...},
 *     manager_login: {...},
 *   },
 *   workers: Map.new(
 *     1 => {id: 1, name: "Carol Anderson", email: "carol@example.com", manager_id: 1},
 *     ...
 *   ),
 *   
 * }
 */

function worker_login(st0 = {worker_email: "", errors: null}, action) {
  switch(action.type) {
    case 'WORKER_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function manager_login(st0 = {manager_email: "", errors: null}, action) {
  switch(action.type) {
    case 'MANAGER_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function new_sheet(st0 = {current_worker_id: 0, date: null, job_code: [], hour: [], note: []}, action) {
  switch(action.type) {
    case 'CREATE_NEW_SHEET':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function sheets(st0 = {data: [], tasks: []}, action) {
  switch(action.type) {
    case 'ADD_SHEETS':
      return Object.assign({}, st0, action.data);
    case 'SHOW_TASKS': 
      let task = {tasks: action.tasks.data};
      return Object.assign({}, st0, task);
    default:
      return st0;
  }
}

function manager_sheets(st0 = {sheets: [], tasks: []}, action) {
  switch(action.type) {
    case 'MANAGER_SHEETS':
      let sheet = {sheets: action.data.data};
      console.log(sheet);
      return Object.assign({}, st0, sheet);
    case 'SHOW_TASKS': 
      let task = {tasks: action.tasks.data};
      return Object.assign({}, st0, task);
    default:
        return st0;
  }
}

// function tasks(st0 = {data: []}, action) {
//   switch(action.type) {
//     case 'SHOW_TASKS':
//       return Object.assign({}, st0, action.data);
//     default:
//       return st0;
//   }
// }

// function forms(st0, action) {
//   let reducer = combineReducers({
//     worker_login,
//     manager_login,
//   });
//   return reducer(st0, action);
// }

let session0 = localStorage.getItem('session');
if (session0) {
  session0 = JSON.parse(session0);
}
function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
    worker_login,
    manager_login,
    sheets,
    manager_sheets,
    session,
    new_sheet,
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;