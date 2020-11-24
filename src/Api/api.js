import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'ce134303-9116-49e7-bcdf-b0906ef007e3'
    }
})

export const authAPI = {
    me(id, email, login) {
        return instance.get(`auth/me`, {id, email, login})
    }
}