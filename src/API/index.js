import axios from "axios"

const API = axios.create({baseURL: "http://localhost:7080"})

export const getPosts = () => API.get("/")

export const getPostById = (id) => API.get(`/post/${id}`)

export const addPost = (id,newPost) => API.post(`/post/${id}`, newPost)

export const addComment = (id, newComment) => API.post(`/posts/${id}/comment`, newComment)