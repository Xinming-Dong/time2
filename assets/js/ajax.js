import store from './store';

export function post(path, body) {
  console.log("pooooooost");
  console.log(path)
  console.log(body)
  let state = store.getState();
//   TODO: session is null
//   let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      //   TODO: session is null
    //   'x-auth': token || "",
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

export function submit_login(form, type) {
  let state = store.getState();
  console.log("heeeeeeeer");
  console.log(state);
  let data;
  if (type == "manager") {
    data = state.forms.manager_login;
  }
  else {
    data = state.forms.worker_login;
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