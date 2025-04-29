import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
//request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Error in request:', error)
    return Promise.reject(error)
  },
)
//response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const accessToken = localStorage.getItem('accessToken')
        const auth = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        }
        if (refreshToken) {
          const response = await axios.post('http://localhost:8080/api/auth/refresh', auth)
          localStorage.setItem('accessToken', response.data.accessToken)
          error.config.headers['Authorization'] = `Bearer ${response.data.accessToken}`
          return axiosInstance.request(error.config) // gọi lại request ban đầu với access token mới
        } else {
          window.location.href = '/login' // chuyển hướng đến trang đăng nhập nếu không có refresh token
        }
      } catch (err) {
        console.error('Error refreshing token:', err)
        window.location.href = '/login' // chuyển hướng đến trang đăng nhập nếu có lỗi khi làm mới token
      }
      // Nếu không phải lỗi 401, trả về lỗi gốc
      return Promise.reject(error)
    }
  },
)
export default axiosInstance
