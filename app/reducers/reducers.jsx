export var exampleReducer = (state = 'world', action) => {
  switch (action.type){
    case 'GET_HELLO':
      return `Hello ${state}`;
    case 'SET_NAME':
      return action.name;
    default:
      return state;
  };
};

export var userReducer = (state = {
  username: null,
  token: null,
  loggedIn: false
}, action) => {
  switch (action.type){
    case 'SET_USER':
      return {
        username: action.user.username,
        token: action.user.token,
        loggedIn: true
      };
    case 'LOGOUT':
      return {
        username: null,
        token: null,
        loggedIn: false
      };
    default:
      return state;
  };
};

export var errorMessageReducer = (state = '', action) => {
  switch (action.type){
    case 'SET_ERROR_MESSAGE':
      return action.errorMessage;
    case 'CLEAR_ERROR_MESSAGE':
      return null;
    default:
      return state;
  };
};