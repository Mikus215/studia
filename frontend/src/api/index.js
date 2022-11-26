import axios from 'axios'

axios.defaults.withCredentials = true

const API = axios.create({ baseURL: 'https://kind-swimsuit-crow.cyclic.app/' })
// const API = axios.create({ baseURL: 'http://localhost:5000/' })

export const registerUser = user => API.post('/user/register', user, { withCredentials: true })
export const loginUser = user => API.post('/user/login', user, { withCredentials: true })
export const logoutUser = () => API.post('/user/logout', { withCredentials: true })
export const registerCompany = company => API.post('/company/register', company, { withCredentials: true })
export const addCompanyComment = (comment, idCompany) => API.post(`/company/comment/add/${idCompany}`, { comment }, { withCredentials: true })
export const addCompanyRate = (rate, idCompany) => API.post(`/company/rate/add/${idCompany}`, { rate }, { withCredentials: true })
export const getUserListCompany = () => API.post('/company/panel', { withCredentials: true })
export const deleteCompany = companyId => API.delete(`/company/panel/delete/${companyId}`, { withCredentials: true })
export const updateCompany = (companyId, updatedCompany) => API.patch(`/company/panel/update/${companyId}`, updatedCompany, { withCredentials: true })
export const getCompanies = () => API.get('/company/list', { withCredentials: true })
export const getSearchedCompany = companyName => API.post('/company/search', { companyName }, { withCredentials: true })
export const getPopularCompany = () => API.get('/company/filter/popular', { withCredentials: true })
export const getBestCompany = () => API.get('/company/filter/best', { withCredentials: true })