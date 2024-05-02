import { GET_USER_LISTING,CLEAR_LISTING, DELETE_LISTING, GET_LIST } from "../../constants";

const initialState = {
    listing:[],
    list: {}
}

const listingReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_USER_LISTING:
      return{...state, listing: action.payload}
    case DELETE_LISTING:
      return{...state, listing: state.listing.filter((list) => list._id !== action.payload)}
    case GET_LIST:
      return{...state, list: action.payload}
    case CLEAR_LISTING:
      return { ...state, listing: [] };
    default:
      return state
  }
}
export default listingReducer