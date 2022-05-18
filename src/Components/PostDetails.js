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
import * as api from "../API";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { addLike, addComment } from "../Actions/PostActions";
import { useDispatch, useSelector } from "react-redux";

const PostDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState({});

  const userId = 2; //TODO get this from authorization
  const dispatch = useDispatch();

  const posts = useSelector((state) => {
    return state.posts;
  });

  console.log(post);
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
    body: yup.string().max(240, "240 Words Limit"),
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: async (values) => {
      formik.resetForm();
      // const {data} = await api.addComment(userId, id, values);
      // dispatch({ type: "ADD_COMMENT", payload: {data, id} });
      dispatch(addComment(userId, id, values))
    },
    validationSchema: userSchema,
  });

  console.log(post.comments);
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
                    sx={{ fontWeight: "bold" }}
                  >
                    {post.title}
                  </Typography>
                }
                subheader={
                  post?.user.firstName +
                  " - " +
                  moment(post.date).format("MMMM D, YYYY h:mm A")
                }
              />
            </Box>
            <Divider variant="middle" />
            <CardContent>
              <Typography variant="body2" color="text.primary" margin="5px">
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
          <Card sx={{ width: "80%", justifyContent: "center", margin: "15px" }}>
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ fontWeight: "bold" }}
                >
                  Comments!
                </Typography>
              }
            />
            <Divider variant="middle" />
            {/* {console.log(post.comments.user)} //TODO: Fix the map */}
            {post.comments.length === 0 ? (
              <div>no comments yet</div>
            ) : post.comments !== undefined? (
              post.comments.map((com) => {
                return (
                  <Card
                    key={com.id}
                    elevation={0}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      margin: "5px",
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography
                          variant="title"
                          color="text.primary"
                          sx={{ fontWeight: "bold" }}
                        >
                          {com.user?.firstName}
                        </Typography>
                      }
                      avatar={
                        <Avatar
                          sx={{ width: 62, height: 62 }}
                          src={com.user?.imgUrl}
                        ></Avatar>
                      }
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.primary">
                        {com.comment}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: "space-between" }}>
                      <Box>
                        <Typography
                          variant="subtitle"
                          color="text.action"
                          sx={{ fontSize: 14 }}
                        >
                          {moment(com.date).fromNow()}
                        </Typography>
                        <Typography
                          variant="subtitle"
                          color="text.action"
                          margin="5px"
                          sx={{ fontSize: 14 }}
                        >
                          .
                        </Typography>
                        <Typography
                          variant="subtitle"
                          color="text.action"
                          sx={{ fontSize: 14 }}
                        >
                          Reply
                        </Typography>
                      </Box>
                    </CardActions>
                  </Card>
                );
              })
            ): null}

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
