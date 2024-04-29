import * as api from '../../api/index'
import { DELETE_USER, UPDATE_USER } from '../../constants'

export const userUpdate = (formData, id) => async (dispatch) =>{
    try{
        const { data } = await api.updatedUser(formData, id)
        dispatch({ type: UPDATE_USER , payload: data})
    }catch(error){
        console.log(error)
    }
}
export const userDelete = (id) => async (dispatch) =>{
    try{
        await api.deleteUser( id)
        dispatch({ type: DELETE_USER })
    }catch(error){
        console.log(error)
    }
}