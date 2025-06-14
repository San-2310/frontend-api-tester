import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      sessionStorage.removeItem("authToken")
      sessionStorage.removeItem("userData")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default apiClient
