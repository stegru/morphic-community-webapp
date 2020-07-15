import axios from 'axios'
import { BASE_URL } from '@/utils/constants'

export const HTTP = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
})
