import { CLEAR_LISTING, COMMENT_LIST, DELETE_LISTING, END_LOADING, GET_LIST, GET_USER_LISTING, START_LOADING, UPDATE_LIST} from "../../constants";
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

export const listingDelete = (id) => async (dispatch) =>{
    try{
        await api.deleteListing(id)
        dispatch({type: DELETE_LISTING, payload: id})
    }catch(error){
        console.log(error)
    }
}

export const listGet = (id) => async (dispatch) =>{
    try {
        const { data } = await api.getList(id)
        console.log(data)
        dispatch({type: GET_LIST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const listUpdate = (id, formData) => async (dispatch) =>{
    try {
        const { data } = await api.updateList(id, formData)
        dispatch({type: UPDATE_LIST, payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const listOpinion = (id, formData, userId) => async (dispatch) =>{
    try {
        const { data } = await api.opinionList(id, formData, userId)
        const comments = data.comments
        console.log(comments)
        dispatch ({type: COMMENT_LIST, payload: comments })
    } catch (error) {
        console.log(error)
    }
}
export const listDeleteOpinion = (id, formData, userId) => async (dispatch) =>{
    try {
        const { data } = await api.deleteOpinionList(id, formData, userId)
        const comments = data.comments
        console.log(comments)
        dispatch ({type: COMMENT_LIST, payload: comments })
    } catch (error) {
        console.log(error)
    }
}