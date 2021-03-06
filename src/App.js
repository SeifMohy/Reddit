import "./App.css";
import Navigation from "./Components/Navigation";
import Posts from "./Components/Posts";
import PostDetails from "./Components/PostDetails";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./Actions/PostActions";
//TODO: Add Yup Errors
//TODO: Clean off some of annoying posts

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Box sx={{ bgcolor: grey[200] }}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/comments/:id" element={<PostDetails />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </Box>
  );
}

export default App;
