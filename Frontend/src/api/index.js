import axios from 'axios'

/* const API = axios.create({baseURL:'https://inmobi-server.vercel.app/'}) */
const API = axios.create({baseURL:'http://localhost:4500/'})


//AUTH
export const signUp = (formData) => API.post('/auth/signup', formData, {
    withCredentials: 'include'
});
export const signIn = (formData) => API.post('/auth/signin', formData, {
    withCredentials: 'include'
});
export const logOut = () => API.post('/auth/logout')


export const signInGoogle = (formData) => API.post('/auth/google', formData, {
    withCredentials: 'include'
});

//USER
export const updatedUser = (formData, id) => API.post(`/user/update/${id}`, formData,{
    withCredentials: 'include'
});