import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Fab,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import axios from "../api/AxiosBase";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDispatch } from "react-redux";
import { pushPosts } from "../features/PostSlice";
import { LoadingButton } from "@mui/lab";
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "10px",
});
function Add() {
  const dispatch = useDispatch();
  const fileInput = useRef();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setLoading(true);
    axios
      .post("/api/user", data)
      .then((res) => {
        
        dispatch(pushPosts({ payload: res.data }));
        setOpen(false);
        Swal.fire("Success", "Your post has been added", "success");
        setLoading(false);
      })
      .catch((e) => {
        setOpen(false);
        Swal.fire("Error", "Something went wrong", "error");
      });
  };
  const fileHandle = (e) => { 
    setImg(e.target.files[0]);
  };
  function handleText(e) {
    setText(e.target.value);
  }
  return (
    <>
      {/* <Tooltip > */}
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: "20px",
          left: { xs: "45%", sm: "20px" },
        }}
        title="Add new post"
        placement="bottom-end"
        color="primary"
      >
        <AddIcon />
      </Fab>
      {/* </Tooltip> */}
      <StyledModal
        open={open}
        sx={{zIndex:"99999"}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          display={"flex"}
          flexDirection="column"
          justifyContent={"space-between"}
          
          width="70%"
          // sx={{height:"600px"}}
          bgcolor={"white"}
          borderRadius={5}
          
          sx={{borderRadius:'30px', webkitOverflowScrolling: "touch",zIndex:"999999",padding:"20px"}}
          p={3}
        >
          <Box>
            <Stack direction justifyContent={"space-between"}>
              <Typography variant="h4" textAlign={"center"}>
                New post
              </Typography>
              <IconButton>
                <CloseIcon onClick={() => setOpen(false)} />
              </IconButton>
            </Stack>
            <Divider sx={{ margin: "10px" }} />
            <UserBox>
              <Avatar
                sx={{ height: "30px", width: "30px" }}
                src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              />
              <Typography fontWeight={500} variant="span">
                John bean
              </Typography>
            </UserBox>
          </Box>
          <Box
            maxWidth="sm"
            borderRadius={3}
            minHeight="400px"
            maxHeight="450px"
            overflow={"hidden"}
          >
            {img ? (
              <img width="100%" src={URL.createObjectURL(img)} alt="" />
            ) : null}
          </Box>
          <br />

          <Stack
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            sx={{ display: { xs: "flex" }, color: "red" }}
          >
            <Grid
              display={"flex"}
              flexDirection="row"
              justifyContent="flex-end"
            >
              <Button variant="text" onClick={() => fileInput.current.click()}>
                <UploadFileIcon fontSize="large" />
              </Button>
              <input
                hidden
                component="Input"
                ref={fileInput}
                type="file"
                name="image"
                accept="image/*"
                onChange={fileHandle}
                id="contained-button-file"
              />

              <TextField
                id="outlined-basic"
                label="Art Name"
                fullWidth
                multiline={true}
                rows={2}
                placeholder="Art Name"
                variant="filled"
                name="postName"
              />
              <TextField
                id="outlined-basic"
                label="Starting price"
                fullWidth
                multiline={true}
                rows={2}
                placeholder="Art Price"
                variant="filled"
                name="minPrice"
              />
              <TextField
                id="standard-multiline-static"
                fullWidth={true}
                multiline={true}
                rows={2}
                placeholder="Art Description"
                variant="filled"
                name="postDescription"
                onChange={(e) => handleText(e)}
              />
              <LoadingButton loading={loading} loadingIndicator={<CircularProgress/>} type="submit" variant="contained" color="primary">
                submit
              </LoadingButton>
            </Grid>
          </Stack>
        </Paper>
      </StyledModal>
    </>
  );
}

export default Add;
