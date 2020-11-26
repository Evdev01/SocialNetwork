import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'e334a3cf-40ab-4e92-aecd-ecbfe5154d76'
    }
})

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`/profile/${userId}`)
    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append('image', photoFile)

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}


export const authAPI = {
    me(id, email, login) {
        return instance.get(`auth/me`, {id, email, login})
    },
    login(email, password, rememberMe, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}
















