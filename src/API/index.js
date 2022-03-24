import axios from "axios"

const API = axios.create({baseURL: "https://api.tawwr.com"})

export const getPosts = () => API.get("/posts")

export const getPostById = (id) => API.get(`/posts/${id}`)

export const addPost = (newPost) => API.post("/posts", newPost)

export const addComment = (id, newComment) => API.post(`/posts/${id}/comment`, newComment)