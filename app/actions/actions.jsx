import axios from 'axios'
import {hashHistory} from 'react-router'

export var getHello = (nameText) => {
  return {
    type: 'GET_HELLO',
    nameText
  }
};

export var setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  }
};

export var setErrorMessage = (errorMessage) => {
  return {
    type: 'SET_ERROR_MESSAGE',
    errorMessage
  }
};

export var clearErrorMessage = () => {
  return {
    type: 'CLEAR_ERROR_MESSAGE'
  }
};

export var doLogin = (user, password) => {
    // We return a function instead of an action object
    return (dispatch) => {
        axios.post('http://localhost:3000/api/v1/user/login', {
          email: user,
          password
        }).then((res) => {
          switch (res.status) {
            case 200:
              dispatch(clearErrorMessage());
              dispatch(setUser({
                username: res.data.email,
                token: res.headers['x-auth']
              }));
              hashHistory.push('/');
              break;
            case 401:
                dispatch(setErrorMessage('Bad username or password'));
              break;
              default:
                dispatch(setErrorMessage('An error occurred'));
          }
        }).catch((e) => dispatch(setErrorMessage(e)));
    };
}

export var doLogout = (token) => {
  return (dispatch) => {
        axios.delete('http://localhost:3000/api/v1/user/logout')
          .then((res) => {
          switch (res.status) {
            case 200:
              dispatch(logout());
              hashHistory.push('/');
              break;
            case 401:
                dispatch(setErrorMessage('You are not logged in'));
                hashHistory.push('/login');
              break;
              default:
                dispatch(setErrorMessage('An error occurred'));
          }
        }).catch((e) => dispatch(setErrorMessage(e)));
    };
}

export var doRegister = (user, password, phone) => {
    // We return a function instead of an action object
    return (dispatch) => {
        axios.post('http://localhost:3000/api/v1/user/register', {
          email: user,
          password,
          phone
        }, {validateStatus: (status) => (status === 200 || status === 400) })
          .then((res) => {
          console.log(JSON.stringify(res, undefined, 2));
          switch (res.status) {
            case 200:
              dispatch(clearErrorMessage());
              dispatch(setUser({
                username: res.data.email,
                token: res.headers['x-auth']
              }));
              hashHistory.push('/');
              break;
            case 400:
              var message = '';
              var e = res.data.errors;
              if (e.phone) {
                message += e.phone.message;
              }
              if (e.email) {
                message += e.email.message;
              }
              if (e.password) {
                message += e.password.message;
              }
              dispatch(setErrorMessage(message));
              break;
            default:
                dispatch(setErrorMessage('An error occurred'));
          }
        }).catch((e) => dispatch(setErrorMessage(e)));
    };
}