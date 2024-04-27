import axios from 'axios'

const API = axios.create({baseURL:'http://localhost:4500/'})

//AUTH
export const signUp = (formData) => API.post('/auth/signup', formData);
export const signIn = (formData) => API.post('/auth/signin', formData);
export const signInGoogle = (formData) => API.post('/auth/google', formData)