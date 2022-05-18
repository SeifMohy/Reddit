import * as api from "../API";

export const getPosts = () => async (dispatch) => {
  try {
    console.log("trying to get posts");
    const response = await api.getPosts();
    dispatch({ type: "FETCH_ALL", payload: response.data });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
export const addPost = (id, newPost) => async (dispatch) => {
  try {
    console.log("trying to add post");
    await api.addPost(id, newPost);
    const response = await api.getPosts();
    dispatch({ type: "ADD_POST", payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
export const addLike = (userId, postId, value) => async (dispatch) => {
  try {
    console.log("trying to add like");
    await api.addLike(userId, postId, value);
    const response = await api.getPosts();
    dispatch({ type: "ADD_LIKE", payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
// export const getPostById = (id) => async (dispatch) => {
//   try {
//     console.log("trying to get post by ID");
//     const response = await api.getPostById(+id);
//     console.log(response.data)
//     dispatch({ type: "GET_POST_BY_ID", payload: response.data });
//     return response.data
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const addComment = (userId, postId, newComment) => async (dispatch) => {
//   try {
//     console.log("trying to add comment");
//     await api.addComment(userId, postId, newComment);
//     const response = await api.getPosts();
//     dispatch({ type: "ADD_COMMENT", payload: response.data });
//   } catch (err) {
//     console.log(err);
//   }
// };
