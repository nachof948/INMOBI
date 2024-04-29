import { LOGOUT, AUTH, START_LOADING, END_LOADING, ERROR,AUTH_GOOGLE, UPDATE_USER } from "../../constants";

const initialState={
  user: /* JSON.parse(localStorage.getItem('profile')) ||  */{}, 
  isLoading: false,
  error: null,
  userGoogle: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case ERROR:
        return { ...state, error: action.payload.message, isLoading: false };
      case START_LOADING:
        return {...state, isLoading: true}
      case END_LOADING:
        return {...state, isLoading: false}
      case AUTH:
          /* localStorage.setItem('profile', JSON.stringify({...action?.payload})) */
          return { ...state, user: action?.payload};
      case UPDATE_USER:
        return {...state, user: action?.payload};
      case AUTH_GOOGLE:
        return{...state, userGoogle: action?.payload}
      case LOGOUT:
        /* localStorage.removeItem('profile') */
        return { ...state, user: {}}
      default:
        return state;
    }
  };
  
  export default authReducer;