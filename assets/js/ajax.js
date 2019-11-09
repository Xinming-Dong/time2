import store from './store';

export function post(path, body) {
  let state = store.getState();
  let token = "";
  if (state.session) {
    token = state.session.token;
  }

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function get(path) {
  let state = store.getState();
  let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}

export function job_codes() {
  get('/jobs')
    .then((resp) => {
      store.dispatch({
        type: 'JOB_CODES',
        data:resp,
      });
    });
}

export function create_sheet(form) {
  let state = store.getState();
  let data = state.new_sheet;
  console.log(data);

  post('/sheets', data)
    .then((resp) => {
      if(resp.data) {
        // localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'CREATE_NEW_SHEET',
          data: resp,
        });
        form.redirect('/');
      }
    })
}

export function show_tasks(sheet_id) {
  // get tasks by sheet id
  get('/tasks/' + sheet_id)
  .then((resp) => {
    // TODO: remove this print
    console.log("show tasks: we got that");
    console.log(resp);
    store.dispatch({
      type: 'SHOW_TASKS',
      data: resp,
    });
  });

}

export function get_sheets(sheet_id) {
  // get all sheets
  let worker_id = JSON.parse(localStorage.getItem("session")).worker_id;
  if (sheet_id == 0) {
    get('/sheets/' + worker_id)
    .then((resp) => {
      // TODO: remove this print
      console.log("get sheets");
      console.log(resp);
      store.dispatch({
        type: 'ADD_SHEETS',
        data: resp,
      });
    });
  }
  else {
    console.log("get tasks in a specific sheet");
    get('/tasks/' + sheet_id)
      .then((resp) => {
    // TODO: remove this print
    console.log("show tasks: we got that");
    console.log(resp);
    store.dispatch({
      type: 'SHOW_TASKS',
      tasks: resp,
    });
  });
  }
}

export function manager_sheets(sheet_id, type) {
  let manager_id = JSON.parse(localStorage.getItem("session")).manager_id;
  if (type == "") { 
    if (sheet_id == 0) {
      get('/workers/' + manager_id)
      .then((resp) => {
        store.dispatch({
          type: 'MANAGER_SHEETS',
          data: resp,
        });
      });
    }
    else {
      get('/tasks/' + sheet_id)
      .then((resp) => {
        store.dispatch({
          type: 'SHOW_TASKS',
          tasks: resp,
        });
      });
    }
  }
  else {
    get('/sheets/approve/' + manager_id + "/" + sheet_id)
    .then((resp) => {
      store.dispatch({
        type: 'APPROVE',
        data: resp,
      });
    });
  }
}

export function submit_login(form, type) {
  let state = store.getState();
  let data = state.worker_login;
  if (type == "manager") {
    data = state.manager_login;
  }

  post('/sessions', data)
    .then((resp) => {
    
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN',
          data: resp,
        });
        // TODO: change redirect
        form.redirect('/');
      }
      else {
        store.dispatch({
          // TODO: change type
          type: 'CHANGE_LOGIN',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}