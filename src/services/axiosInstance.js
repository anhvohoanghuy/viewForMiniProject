import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
let isRefreshing = false
let pendingRequests = []
const processQueue = (error, token = null) => {
  pendingRequests.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  pendingRequests = []
}
//request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
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
    const originalRequest = error.config
    if (
      (error.response.status === 401 && !originalRequest._retry) ||
      (error.response.status === 403 && !originalRequest._retry)
    ) {
      //nếu đang tạo mới token thin chờ cho đến khi tạo xong
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return axiosInstance(originalRequest)
          })
          .catch((err) => {
            console.error('Error in refreshing token:', err)
            return Promise.reject(err)
          })
      }
      //chuyển trạng thái đang tạo mới token
      //thêm thuộc tính _retry vào request để tránh vòng lặp vô tận
      originalRequest._retry = true
      isRefreshing = true
      const refreshToken = localStorage.getItem('refreshToken')
      try {
        //gọi api refresh token
        const response = await axios.post('http://localhost:8080/api/auth/refresh', {
          refreshToken: refreshToken,
          accessToken: localStorage.getItem('accessToken'),
          userId: localStorage.getItem('userId'),
        })
        const accessToken = response.data
        localStorage.setItem('accessToken', accessToken)
        console.log('New access token:', accessToken)
        //chạy lại tất cả các request đang chờ
        processQueue(null, accessToken)
        return axiosInstance(originalRequest)
      } catch (err) {
        processQueue(err, null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userId')
        window.location.href = '/login'
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
  },
)
export default axiosInstance
