import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://172.16.1.108:3333'
})