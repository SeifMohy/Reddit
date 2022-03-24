import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import * as api from "../API";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Actions/PostActions";

const Posts = () => {
  //const [posts, setPosts] = useState([]);

  //   async function fetchingPosts() {
  //     console.log("hi");
  //     const response = await api.getPosts();
  //     const postsDetails = response.data.data;
  //     console.log(response.data.data);
  //     return setPosts(postsDetails);
  //   }
  
  const posts = useSelector((state) => {
    console.log(state);
    return state.posts;
  });

  console.log(posts)


  if (!posts || posts.length === 0) return <h1>loading...</h1>;
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      {posts.map((post) => {
        return (
          <Card
            key={post.id}
            sx={{ width: "80%", justifyContent: "center", margin: "15px" }}
          >
            <CardHeader
              avatar={<Avatar></Avatar>}
              title={post.userId}
              subheader={post.createdAt}
            />
            <CardContent>
              <Typography
                variant="title"
                color="text.primary"
                sx={{ fontWeight: "bold" }}
              >
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.primary" margin="5px">
                {post.body}
              </Typography>
            </CardContent>

            <CardActions
              sx={{ justifyContent: "space-between", margin: "5px" }}
            >
              <Box>
                <IconButton>
                  <ThumbUpIcon />
                </IconButton>
                <Typography
                  variant="subtitle"
                  color="text.action"
                  sx={{ fontSize: 14 }}
                >
                  {post.upVotesTotal}
                </Typography>
                <IconButton>
                  <ThumbDownAltIcon />
                </IconButton>
                <Typography
                  variant="subtitle"
                  color="text.action"
                  sx={{ fontSize: 14 }}
                >
                  {post.downVotesTotal}
                </Typography>
                <IconButton>
                  <CommentIcon />
                </IconButton>
                <Typography
                  variant="subtitle"
                  color="text.action"
                  sx={{ fontSize: 14 }}
                >
                  {post.commentsTotal}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle"
                  color="text.action"
                  sx={{ fontSize: 14 }}
                >
                  Open Post
                </Typography>
                <Link to={`/${post.id}`}>
                  <IconButton>
                    <ArrowForwardIcon />
                  </IconButton>
                </Link>
              </Box>
            </CardActions>
          </Card>
        );
      })}
    </Grid>
  );
};

export default Posts;
