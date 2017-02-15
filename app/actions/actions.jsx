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
        }, {validateStatus: (status) => (status === 200 || status === 401) }).then((res) => {
          switch (res.status) {
            case 200:
              dispatch(startSession(res.data.email, res.headers['x-auth'], '/manage'));
              break;
            case 401:
                dispatch(setErrorMessage('Bad username or password'));
              break;
              default:
                dispatch(setErrorMessage('An error occurred'));
          }
        }).catch((e) => {
          console.log(e);
          dispatch(setErrorMessage(e))
        });
    };
}

export var doLogout = (token) => {
  return (dispatch) => {
        axios.delete('http://localhost:3000/api/v1/user/logout')
          .then((res) => {
          switch (res.status) {
            case 200:
              dispatch(logout());
              localStorage.clearItem('jwt-token');
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

export var startSession = (user, token, redirect = undefined) => {
  return function (dispatch) {
    dispatch(clearErrorMessage());
    dispatch(setUser({
      username: user,
      token: token
    }));
    localStorage.setItem('jwt-token', token);
    if (redirect) {
      hashHistory.push(redirect);
    }
  }
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
          switch (res.status) {
            case 200:
              dispatch(startSession(res.data.username, res.headers['x-auth'], '/manage'));
              break;
            case 400:
              var message = '';
              if (res.data.errors){
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
              } else { message = res.data};
              dispatch(setErrorMessage(message));
              break;
            default:
                dispatch(setErrorMessage('An error occurred'));
          }
        }).catch((e) => {
          console.log(e);
          dispatch(setErrorMessage(e))
        });
    };
}

export var loadToken = (token) => {
  return function (dispatch) {
    axios.get('http://localhost:3000/api/v1/user/me', {
          headers: {'x-auth': token}
        }).then((res) => {
          switch (res.status) {
            case 200:
              dispatch(startSession(res.data.username, res.headers['x-auth']));
              break;
            default:
                localStorage.removeItem('jwt-token');
          }
        }).catch((e) => localStorage.removeItem('jwt-token'));
  }

}