// o axios serve para podermos trabalhar com requisicoes http
import axios from 'axios'

export const api = axios.create({ // nessa config, podemos colocar a url da nossa api.
    baseURL: 'http://192.168.100.6:8180'
})