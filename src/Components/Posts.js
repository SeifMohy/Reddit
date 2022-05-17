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
import ToggleButton from '@mui/material/ToggleButton';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

const Posts = () => {
  const posts = useSelector((state) => {
    return state.posts;
  });
  const [selected, setSelected] = React.useState(false);
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
              avatar={
                <Avatar
                  sx={{ width: 62, height: 62 }}
                  src={post.user?.imgUrl}
                ></Avatar>
              }
              title={post.user.firstName + " " + post.user.lastName}
              subheader={moment(post.date).format("MMMM DD YYYY")} 
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
                <ToggleButton
                  selected={selected}
                  onChange={() => {
                    setSelected(!selected);
                  }}
                >
                  <ThumbUpIcon />
                </ToggleButton>
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
                <IconButton disabled="true">
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
