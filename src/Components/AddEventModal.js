import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
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
import { useDispatch, useSelector } from "react-redux";
import { pushPosts } from "../features/PostSlice";
import { getUser } from "../features/Userslice";
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
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const userDetails = useSelector(getUser);
  const fileInput = useRef();
  const [img, setImg] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    axios
      .post("/api/user", data)
      .then((res) => {
        
        dispatch(pushPosts({ payload: res.data }));
        setOpen(false);
        Swal.fire("Success", "Your post has been added", "success");
      })
      .catch((e) => {
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
      <Button onClick={() => setOpen(true)} color="primary">
        <AddIcon />
      </Button>
      {/* </Tooltip> */}
      {/* <LocalizationProvider dateAdapter={<AdapterDateFns/>} > */}
      <StyledModal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"space-between"}
          width="80%"
          height="70%"
          bgcolor="white"
          borderRadius={5}
          sx={{ webkitOverflowScrolling: "touch" }}
          p={3}
        >
          <Box>
            <Stack direction justifyContent={"space-between"}>
              <Typography variant="h4" textAlign={"center"}>
                Event Details
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
                {userDetails?.fname + " " + userDetails.lname}
              </Typography>
            </UserBox>
          </Box>
          <Box
            maxWidth="lg"
            borderRadius={3}
            maxHeight="450px"
            overflow={"hidden"}
          >
            {img ? (
              <img width="100%" src={URL.createObjectURL(img)} alt="" />
            ) : null}
          </Box>
          <br />

          {/* <Stack
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            sx={{ display: { xs: "flex" }, color: "red" }}
          > */}
          <Grid
          //   display={"flex"}
          //   flexDirection="row"
          //   justifyContent="flex-end"
          >
            <Button variant="text" onClick={() => fileInput.current.click()}>
              <UploadFileIcon fontSize="small" />
              <Typography fontSize={10}>Upload event banner here</Typography>
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
            <Grid container>
              <Grid item sm={6} xs={8} md={6} lg={2}>
                <TextField
                  id="outlined-basic"
                  label="Event Name"
                  fullWidth
                  multiline={true}
                  rows={1}
                  placeholder="Event Name"
                  variant="filled"
                  name="postName"
                />
                <TextField
                  id="outlined-basic"
                  label="Ticket price"
                  fullWidth
                  multiline={true}
                  rows={1}
                  placeholder="Ticket Price"
                  variant="filled"
                  name="minPrice"
                />
              </Grid>
              <Grid item sx={6} sm={6}>
              <TextField
                  id="date"
                  label="Start date"
                  variant="filled"
                  fullWidth
                  type="date"
                  defaultValue=""
                 
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="date"
                  label="End date"
                  variant="filled"
                  fullWidth
                  type="date"
                  defaultValue=""
                 
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
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
            <Button fullWidth type="submit" variant="contained" color="primary">
              submit
            </Button>
          </Grid>
          {/* </Stack> */}
        </Box>
      </StyledModal>
      {/* </LocalizationProvider> */}
    </>
  );
}

export default Add;
