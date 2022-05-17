import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import { addPost } from "../Actions/PostActions";
import { useDispatch, useSelector } from "react-redux";


const AddForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const userId = 2; //TODO: getting user id from authentication
  const userSchema = yup.object({
    title: yup.string().required("Required"),
    body: yup.string().max(240, "240 Words Limit"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      tags: "1", //TODO: add tags drop down
    },
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      handleClose();
      dispatch(addPost(userId, values)); //dispatching adding
    },
    validationSchema: userSchema,
  });

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="error"
        sx={{ mr: 2 }}
      >
        Add A New Post
      </Button>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Add Post!</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Fill below to add a new post
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
          ></TextField>
          <TextField
            multiline
            rows={4}
            margin="dense"
            name="body"
            label="Post!"
            type="text"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
          ></TextField>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddForm;
