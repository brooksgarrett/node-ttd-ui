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
  loggedIn: false,
  subscriptions: []
}, action) => {
  switch (action.type){
    case 'SET_USER':
      return {
        username: action.user.username,
        token: action.user.token,
        loggedIn: true,
        subscriptions: action.user.subscriptions
      };
    case 'SET_SUBSCRIPTIONS':
      return {
        subscriptions: action.subscriptions,
        username: state.user.username,
        token: state.user.token,
        loggedIn: state.user.loggedIn
      };
    case 'LOGOUT':
      return {
        username: null,
        token: null,
        loggedIn: false,
        subscriptions: []
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

export var tonesetReducer = (state = [], action) => {
  switch (action.type){
    case 'SET_TONESETS':
      return action.tonesets;
    case 'TOGGLE_TONESET':
      return state.map((toneset) => {
        if (toneset._id === action.tonesetID) {
          toneset.subscribed = !toneset.subscribed;
        } 
        return toneset;
      })
    default:
      return state
  }
}