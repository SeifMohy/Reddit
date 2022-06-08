import axios from "axios"

const API = axios.create({baseURL: "http://localhost:7081"})

export const getPosts = () => API.get("/")

export const getPostById = (id) => API.get(`/post/${id}`)

export const addPost = (id,newPost) => API.post(`/post/${id}`, newPost)

export const addComment = (userId, postId, newComment) => API.post(`/post/comment/${userId}/${postId}`, newComment)

export const addLike = (userId, postId, value) => API.post(`/post/like/${userId}/${postId}`, value)