import * as api from '../../api/index'
import { UPDATE_USER } from '../../constants'

export const userUpdate = (formData, id) => async (dispatch) =>{
    try{
        const { data } = await api.updatedUser(formData, id)
        dispatch({ type: UPDATE_USER , payload: data})
    }catch(error){
        console.log(error)
    }
}