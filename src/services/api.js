import axios from 'axios'
export const api = axios.create({
  baseURL: "http://pao-na-caixa-dev.herokuapp.com/",
})