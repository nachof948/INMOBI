import { AUTH, END_LOADING, ERROR, LOGOUT, START_LOADING } from "../../constants";
import * as api from '../../api/index'

export const signup = (formData) => async (dispatch)=>{
    try {
        const { data } = await api.signUp(formData);

        if (data.success === false) {
            dispatch({ type: ERROR, payload: { message: data.message } }); // Enviar el mensaje de error al reducer
        } else {
            dispatch({ type: AUTH, payload: data });
        }
    } catch(error) {
        console.log(error);
    }
}

export const signin = (formData) => async (dispatch)=>{
    try {
        const { data } = await api.signIn(formData);

        if (data.success === false) {
            dispatch({ type: ERROR, payload: { message: data.message } });
        } else {
            dispatch({ type: AUTH, payload: data });
        }
    } catch(error) {
        dispatch({ type: ERROR, payload: { message: 'Error de red: No se pudo conectar al servidor' } });
    }
}
export const logout = () => async (dispatch)=>{
    try {
        const { data } = await api.logOut();

        if (data.success === false) {
            dispatch({ type: ERROR, payload: { message: data.message } });
        } else {
            dispatch({ type: LOGOUT});
        }
    } catch(error) {
        dispatch({ type: ERROR, payload: { message: 'Error de red: No se pudo conectar al servidor' } });
    }
}


export const signinGoogle = (formData) => async (dispatch)=>{
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.signInGoogle(formData);
        if (data.success === false) {
            dispatch({ type: ERROR, payload: { message: data.message } });
        } else {
            dispatch({ type: AUTH, payload: data });
        }
        dispatch({ type: END_LOADING });
    } catch(error) {
        dispatch({ type: ERROR, payload: { message: 'Error de red: No se pudo conectar al servidor' } });
    }
}
