import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Typography from "@mui/material/Typography";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { addLike, addComment } from "../Actions/PostActions";
import { useDispatch, useSelector } from "react-redux";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const userId = 2; //TODO get this from authorization
  const dispatch = useDispatch();

  const posts = useSelector((state) => {
    return state.posts;
  });

  useEffect(() => {
    const item = posts.find((post) => {
      return post.id === +id;
    });
    if (item) {
      setPost(item);
    }
    console.log(item);
  }, [posts]);

  const userSchema = yup.object({
    body: yup.string().max(240, "240 Character Limit"),
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: async (values) => {
      formik.resetForm();
      dispatch(addComment(userId, id, values));
    },
    validationSchema: userSchema,
  });

  const sortedComments = post.comments?.sort((a, b) => a.id - b.id)
  return (
    <>
      {Object.keys(post).length === 0 ? (
        <div>Loading...</div>
      ) : post !== undefined ? (
        <Grid container direction="column" alignItems="center" justify="center">
          <Card sx={{ width: "80%", justifyContent: "center", margin: "15px" }}>
            <Box>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ width: 62, height: 62 }}
                    src={post?.user.imgUrl}
                  ></Avatar>
                }
                title={
                  <Typography
                    variant="title"
                    color="text.primary"
                    sx={{ fontWeight: "bold", fontSize: "23px" }}
                  >
                    {post.title}
                  </Typography>
                }
                subheader={
                  <Typography sx={{ fontSize: "17px", color: "text.secondary" }}>
                    {
                  post?.user.firstName + " " + post?.user.lastName +
                  " - " +
                  moment(post.date).format("MMMM D, YYYY h:mm A")
                }
                  </Typography>
                }
              />
            </Box>
            <Divider variant="middle" />
            <CardContent sx={{ pb:0 }}>
              <Typography sx={{  fontSize: "17px" }} variant="body2" color="text.primary">
                {post.body}
              </Typography>
            </CardContent>

            <CardActions
              sx={{ justifyContent: "space-between", margin: "5px" }}
            >
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
                  {post.comments?.length}
                </Typography>
              </Box>
            </CardActions>
          </Card>
          <Card sx={{ width: "80%", justifyContent: "center", margin: "5px" }}>
            <CardHeader
            sx={{ fontWeight: "bold", p:3 }}
              title={
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ fontWeight: "bold", fontSize: "21px"}}
                >
                  Comments!
                </Typography>
              }
            />
            <Divider variant="middle" />
            {/* {console.log(post.comments.user)} //TODO: Fix the map */}
            {post.comments.length === 0 ? (
              <div>no comments yet</div>
            ) : post.comments !== undefined ? (
              sortedComments.map((com) => {
                return (
                  <Card
                    key={com.id}
                    elevation={0}
                    sx={{
                      width: "100%",
                      margin: "3px",
                      display: 'flex', flexDirection: 'row'
                    }}
                  >
                    <CardHeader
                    sx={{ p: 2, pb: 0, pr:0, alignItems: 'flex-start'}}
                      avatar={
                        <Avatar
                          sx={{ width: 58, height: 58 }}
                          src={com.user?.imgUrl}
                        ></Avatar>
                      }
                    />
                    <CardContent sx={{ pt: 2, pl:0, alignContent: 'center' }}>
                    <Typography 
                          variant="title"
                          color="text.primary"
                          sx={{ fontWeight: "bold", fontSize: "17px" }}
                        >
                          {com.user?.firstName + " " + com.user?.lastName}
                        </Typography>
                      <Typography sx={{ pt: 1, pb:1, fontSize: "17px" }} variant="body2" color="text.primary">
                        {com.comment}
                      </Typography>
                      <Box>
                        <Typography
                          variant="subtitle"
                          color="text.action"
                          sx={{ fontSize: "17px" }}
                        >
                          {moment(com.date).fromNow()}
                        </Typography>
                        <Typography
                          variant="subtitle"
                          color="text.action"
                          margin="5px"
                          sx={{ fontSize: "17px"}}
                        >
                          .
                        </Typography>
                        <Typography
                          variant="subtitle"
                          color="text.action"
                          sx={{ fontSize: "17px", fontWeight: "medium" }}
                        >
                          Reply
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })
            ) : null}

            <Box margin="10px" sx={{ justifyContent: "space-evenly" }}>
              <TextareaAutosize
                minRows={3}
                placeholder="Comment!"
                style={{ width: "99%" }}
                name="comment"
                onChange={formik.handleChange}
                value={formik.values.comment}
              />
              <Box margin="10px" sx={{ ml: "80%" }}>
                <Button
                  type="submit"
                  onClick={formik.handleSubmit}
                  variant="contained"
                  color="error"
                >
                  Comment!
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      ) : null}
    </>
  );
};

export default PostDetails;
