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
//import * as dayjs from "dayjs";
//import * as relativeTime from "dayjs/plugin/relativeTime";
//import { useDispatch, useSelector } from "react-redux";
//https://api.tawwr.com/users
//https://react-query.tanstack.com/guides/optimistic-updates

const PostDetails = () => {
  const {id} = useParams();
  console.log(id);
  const [post, setPost] = useState([]);

  async function fetchingPost(id) {
    //console.log("hi");
    //console.log(id);
    const response = await api.getPostById(+id);
    const postDetails = response.data[0];
    console.log(response.data[0]);
    return setPost(postDetails);
  }
  console.log(post)
  useEffect(() => {
  //dayjs.extend(relativeTime);
    fetchingPost(id);
  }, []);

  const userSchema = yup.object({
    body: yup.string().max(240, "240 Words Limit"),
  });

  const formik = useFormik({
    initialValues: {
      body: "",
      userId: "2",
    },
    onSubmit: async (values) => {
      formik.resetForm();
      const response = await api.addComment(id, values.body);
      console.log(response);
      return fetchingPost(id);
    },
    validationSchema: userSchema,
  });

  const user = post.comments
  console.log(user)
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Card sx={{ width: "80%", justifyContent: "center", margin: "15px" }}>
        <Box>
          <CardHeader
            avatar={<Avatar></Avatar>}
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
              post.userId
              // +
              // " " +
              // dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")
            }
          />
        </Box>
        <Divider variant="middle" />
        <CardContent>
          <Typography variant="body2" color="text.primary" margin="5px">
            {post.body}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", margin: "5px" }}>
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
        {post.comments?.map((com) => {
          return (
            <Card
              key={com.id}
              elevation={0}
              sx={{ width: "100%", justifyContent: "center", margin: "5px" }}
            >
              <CardHeader avatar={<Avatar></Avatar>} title={com.user} />
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
                    4d ago
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
        })}

        <Box margin="10px" sx={{ justifyContent: "space-evenly" }}>
          <TextareaAutosize
            minRows={3}
            placeholder="Comment!"
            style={{ width: "99%" }}
            name="body"
            onChange={formik.handleChange}
            value={formik.values.body}
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
  );
};

export default PostDetails;
