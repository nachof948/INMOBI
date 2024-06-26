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
export const logOut = () => API.get('/auth/logout',{
    withCredentials: 'include'
});
export const signInGoogle = (formData) => API.post('/auth/google', formData, {
    withCredentials: 'include'
});

//USER
export const updatedUser = (formData, id) => API.post(`/user/update/${id}`, formData,{
    withCredentials: 'include'
});
export const deleteUser = (id) => API.delete(`/user/delete/${id}`, {
    withCredentials: 'include'
});
export const getListingUser = (id) => API.get(`/user/listings/${id}`, {
    withCredentials: 'include'
});


//PUBICACION
export const createListing = (formData, userRef) => API.post('/listing/create', {formData, userRef} , {
    withCredentials: 'include'
});
export const deleteListing = (id) => API.delete(`/listing/delete/${id}`, {
    withCredentials: 'include'
});
export const getList = (id) => API.get(`/listing/list/${id}`, {
    withCredentials: 'include'
})
export const updateList = (id, formData) => API.put(`listing/update/${id}`,{formData},{
    withCredentials: 'include'
});
export const opinionList = (value,id) => API.post(`listing/comment/${id}`,{value},{
    withCredentials: 'include'
});
export const deleteOpinionList = (commentText, id) => API.delete(`listing/comment/delete/${id}`,{commentText},{
    withCredentials: 'include'
});

//SEARCH
export const getSearch = (searchQuery) => API.get(`/listing/search?${searchQuery}`, {
    withCredentials: 'include'
})
export const getOfferSearch = () => API.get(`/listing/search?offer=true&limit=4`)
export const getRentSearch = () => API.get(`/listing/search?type=rent&limit=4`)
export const getSaleSearch = () => API.get(`/listing/search?type=sale&limit=4`)