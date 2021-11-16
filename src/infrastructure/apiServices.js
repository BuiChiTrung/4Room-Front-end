import noAuthApiConfig from "@/infrastructure/noAuthApi";
import authApiConfig from "@/infrastructure/authApi";
import axios from 'axios';
import { baseApiUrl } from '@/env'


export const authApi = {
    login(data) {
        return axios.post(`${baseApiUrl}/login`, data, noAuthApiConfig);
    },
    register(data) {
        return axios.post(`${baseApiUrl}/register`, data, noAuthApiConfig);
    },
    resetPasswordRequest(data) {
        return axios.post(`${baseApiUrl}/reset-password-request`, data, noAuthApiConfig);
    },
    resetPassword(data) {
        return axios.post(`${baseApiUrl}/reset-password`, data, noAuthApiConfig);
    },
    logout() {
        return axios.get(`${baseApiUrl}/logout`, authApiConfig);
    },
    jwtValidate() {
        return axios.get(`${baseApiUrl}/jwt-validate`, authApiConfig);
    }
}

export const profileApi = {
    getProfile() {
        return axios.get(`${baseApiUrl}/profile`, authApiConfig);
    },
    updateProfile(data) {
        return axios.post(`${baseApiUrl}/profile`, data, authApiConfig);
    },
    searchUserByName(data) {
        return axios.post(`${baseApiUrl}/users/search`, data, authApiConfig);
    },
    getUserInfo(id) {
        return axios.get(`${baseApiUrl}/users/${id}`, authApiConfig);
    }
}

export const followApi = {
    follow(userId) {
        return axios.post(`${baseApiUrl}/follow-user/${userId}`, {}, authApiConfig);
    },
    unFollow(userId) {
        return axios.delete(`${baseApiUrl}/follow-user/${userId}`, authApiConfig);
    },
    suggestFollow() {
        return axios.get(`${baseApiUrl}/follow/suggestion`, authApiConfig);
    }
}

function upPost(data) {
    return axios.post(`${baseApiUrl}/posts/create`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}

function getAPost(postID) {
    return axios.get(`${baseApiUrl}/posts/${postID}`, authApiConfig)
}

function upVote(addUpvote, postID) {
    return (
        addUpvote ? axios.post(`${baseApiUrl}/upvote-post/${postID}`, null, authApiConfig)
        : axios.delete(`${baseApiUrl}/upvote-post/${postID}`, authApiConfig)
    )
}

function fetchPost(page) {
    return axios.get(`${baseApiUrl}/newsfeed?page=${page}`, authApiConfig)
}

function downFile(data) {
    return axios.get(`${baseApiUrl}/download/files/${data}`, noAuthApiConfig)
}

function submitComment(data, postID) {
    return axios.post(`${baseApiUrl}/posts/${postID}/comments/create`, data, authApiConfig)
}

export {
    upPost,
    upVote,
    fetchPost,
    submitComment,
    getAPost,
    downFile,
}
