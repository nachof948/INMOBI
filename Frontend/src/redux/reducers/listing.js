import { GET_USER_LISTING,GET_MORE_LISTING,CLEAR_LISTING, DELETE_LISTING, GET_LIST, UPDATE_LIST, DELETE_IMAGE, COMMENT_LIST, SEARCH_LISTING, SHOW_MORE } from "../../constants";

const initialState = {
    listing:[],
    list: {},
    showMore: null
}

const listingReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_USER_LISTING:
      return{...state, listing: action.payload}
    case DELETE_LISTING:
      return{...state, listing: state.listing.filter((list) => list._id !== action.payload)}
    case GET_LIST:
      return{...state, list: action.payload}
    case UPDATE_LIST:
      return{...state, list: action.payload}
    case DELETE_IMAGE:
      return{...state, list: {...state.list, imageUrls: action.payload}}
    case COMMENT_LIST:
      return{...state, list: {...state.list, comments: action.payload}}
    case SEARCH_LISTING:
      return {...state, listing: action.payload}
    case GET_MORE_LISTING:
      return {...state, listing:[...state.listing, ...action.payload]}
    case SHOW_MORE:
      return{...state, showMore: action.payload}
    case CLEAR_LISTING:
      return { ...state, listing: [] };
    default:
      return state
  }
}
export default listingReducer