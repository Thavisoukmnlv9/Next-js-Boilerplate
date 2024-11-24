import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"
import { getSession } from "next-auth/react"

export interface ApiError {
  message: string
  status: number
  data?: any
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const session = await getSession()
      if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`
      }
      return config
    } catch (error) {
      return Promise.reject(error)
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config!

    if (error.response?.status === 401) {
      try {
        const session = await getSession()
        if (session?.user?.accessToken) {
        }
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    const apiError: ApiError = {
      message: error.message || "An error occurred",
      status: error.response?.status || 500,
      data: error.response?.data,
    }

    return Promise.reject(apiError)
  }
)

export const apiClient = {
  get: <T>(url: string, config = {}) =>
    api.get<T>(url, config).then((response) => response.data),

  post: <T>(url: string, data: any, config = {}) =>
    api.post<T>(url, data, config).then((response) => response.data),

  put: <T>(url: string, data: any, config = {}) =>
    api.put<T>(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config = {}) =>
    api.delete<T>(url, config).then((response) => response.data),
}

export default api
