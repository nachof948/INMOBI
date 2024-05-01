import { CREATE_LISTING } from "../../constants";

const initialState = {
    listing:{}
}

const listingReducer = (state = initialState, action) => {
  switch(action.type){
    case CREATE_LISTING:
      return{...state, listing: action?.payload}
    default:
      return state
  }
}
export default listingReducer