import { CLEAR_LISTING, END_LOADING, GET_USER_LISTING, START_LOADING} from "../../constants";
import * as api from '../../api/index'

export const listingUserGet = (id) => async (dispatch) =>{
    try{
        dispatch({type: START_LOADING})
        dispatch({type: CLEAR_LISTING})
        const { data } = await api.getListingUser(id)
        dispatch({type: GET_USER_LISTING, payload: data})
        dispatch({type: END_LOADING})
    }catch(error){
        console.log(error)
    }
}