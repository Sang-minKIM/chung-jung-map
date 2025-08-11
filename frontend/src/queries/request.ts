import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { RequestError } from './request-error'

const BASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const request = async <T = unknown>(path: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = (await axios({
      url: `${BASE_URL}${path}`,
      ...config,
      headers: {
        ...config?.headers,
        apikey: SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      },
    })) as AxiosResponse<T>
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response
      throw new RequestError({
        errorCode: data.errorCode,
        message: data.message,
        endpoint: path,
      })
    } else {
      console.error(error)
      throw error
    }
  }
}
