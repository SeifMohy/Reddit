import * as api from "../API";

export const getPosts = () => async (dispatch) => {
    try{
        console.log("trying to get post");
        const response = await api.getPosts(); 
        dispatch({type : "FETCH_ALL", payload: response.data.data }); 
        console.log(response)
    } catch(err){
        console.log(err); 
    }
};
export const addPost = (newPost) => async (dispatch) => {
  try {
    console.log("trying to add post");
    await api.addPost(newPost);
    const response = await api.getPosts();
    dispatch({ type: "ADD_POST", payload: response.data.data });
  } catch (err) {
    console.log(err);
  }
};
