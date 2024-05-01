import { CREATE_LISTING} from "../../constants";
import * as api from '../../api/index'

export const listingCreate = (formData, userRef) => async (dispatch) =>{
    try{
        const { data } = await api.createListing(formData, userRef)
        console.log(data)
        dispatch({type: CREATE_LISTING, payload: data})
    }catch(error){
        console.log(error)
    }
}