const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  console.log("deafult " + action.type);

  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('login error: ' + action.err.message);
      return {
        ...state,
        authError: action.err.message
      }

    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
        userProfile: {
          firstName: action.response.firstName,
          lastName: action.response.lastName,
          initials: (action.response.firstName.charAt(0) + action.response.lastName.charAt(0)).toUpperCase(),
          score: action.response.score
        }
      }

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;

    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null,
        userProfile: {
          firstName: action.newUser.firstName,
          lastName: action.newUser.lastName,
          initials: (action.newUser.firstName.charAt(0) + action.newUser.lastName.charAt(0)).toUpperCase(),
          score: action.newUser.score
        }
      }

    case 'SIGNUP_ERROR':
      console.log('signup error: ' + action.err.message)
      return {
        ...state,
        authError: action.err.message
      }

    case 'GET_INITIAL':
      return {
        ...state,
        userProfile: {
          firstName: action.response.firstName,
          lastName: action.response.lastName,
          initials: (action.response.firstName.charAt(0) + action.response.lastName.charAt(0)).toUpperCase(),
          score: action.response.score
        }
      }
    case 'GET_INITIAL_ERROR':
      console.log('GET_INITIAL error: ' + action.err.message)
      return {
        ...state,
        authError: action.err.message
      }

    default:
      return state
  }
};

export default authReducer;