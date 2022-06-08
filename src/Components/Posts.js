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
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { addLike } from "../Actions/PostActions";

const Posts = () => {
  const posts = useSelector((state) => {
    console.log(state.posts);
    return state.posts;
  });
  // const [selected, setSelected] = React.useState(false);
  const userId = 2; //TODO: getting user id from authentication
  const dispatch = useDispatch();

  const sortedPosts = posts.sort(
    (a, b) => b.id - a.id
  );
console.log(posts)
  if (!posts || posts.length === 0) return <h1>loading...</h1>;
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      {sortedPosts.map((post) => {
        return (
          <Card
            key={post.id}
            sx={{ width: "80%", justifyContent: "center", margin: "15px" }}
          >
            <CardHeader
            sx={{ p: 2, pb: 0 }}
              avatar={
                <Avatar
                  sx={{ width: 58, height: 58 }}
                  src={post.user?.imgUrl}
                ></Avatar>
              }
              title={
                <Typography sx={{ fontWeight: "bold", fontSize: "17px" }}>
                  {post.user.firstName + " " + post.user.lastName}
                </Typography>
              }
              subheader={
                <Typography sx={{ fontSize: "17px", color: "text.secondary" }}>
                  {moment(post.date).format("MMMM DD YYYY, h:mm a")}
                </Typography>
              }
            />
            <CardContent
            sx={{ p: 2, pb: 0 }}
            >
              <Typography
                color="text.primary"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                {post.title}
              </Typography>
              <Typography sx={{ pt:1, fontSize: "17px" }} variant="body2" color="text.primary">
                {post.body}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between", margin: "" }}>
              {/* TODO: change button color when clicked */}
              <Box>
                <IconButton
                  onClick={async () => {
                    dispatch(addLike(userId, post.id, { value: true }));
                  }}
                >
                  <ThumbUpIcon />
                </IconButton>
                <Typography
                  variant="subtitle"
                  color="text.action"
                  sx={{ fontSize: 14 }}
                >
                  {post.likes?.filter((likes) => likes.value === true).length}
                </Typography>
                <IconButton
                  onClick={async () => {
                    dispatch(addLike(userId, post.id, { value: false }));
                  }}
                >
                  <ThumbDownAltIcon />
                </IconButton>
                <Typography
                  variant="subtitle"
                  color="text.action"
                  sx={{ fontSize: 14 }}
                >
                  {post.likes?.filter((likes) => likes.value === false).length}
                </Typography>
                <IconButton disabled={true}>
                  <CommentIcon />
                </IconButton>
                <Typography
                  variant="subtitle"
                  color="text.action"
                  sx={{ fontSize: 14 }}
                >
                  {post.comments.length}
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
                <Link to={`post/${post.id}`}>
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
