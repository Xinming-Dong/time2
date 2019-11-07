import store from './store';

export function post(path, body) {
  console.log("pooooooost");
  console.log(path)
  console.log(body)
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

export function create_sheet(form) {
  let state = store.getState();
  let data = state.new_sheet;

  post('/sheets', data)
    .then((resp) => {
      console.log(resp);
    })
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