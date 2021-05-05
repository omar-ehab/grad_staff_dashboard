import actions from './actions';

const initState = { idToken: null, staffId: null, error_message: "" };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token,
        staffId: action.staff_id,
      };
    case actions.LOGIN_ERROR:
      return {
        error_message: action.error_message,
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
