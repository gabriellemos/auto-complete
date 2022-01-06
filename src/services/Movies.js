import axios from 'axios'

const baseService = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

baseService.interceptors.request.use(
  function (config) {
    config.withCredentials = false
    config.headers.Authorization = `Bearer ${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export const search = (query = '') => {
  return baseService.get('/search/movie', {
    params: { query }
  })
}
