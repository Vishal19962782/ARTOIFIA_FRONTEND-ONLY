import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Fab,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
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
function ArtistRequest() {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  const fileInput = useRef();
  const [img, setImg] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    axios
      .post("/api/Request", data)
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
      {!userData.isArtist ? (
        <Fab
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: "20px",
            left: { xs: "45%", sm: "20px" },
          }}
          title="Addicon"
          placement="bottom-end"
          color="primary"
        >
          <Typography fontSize={12}>Get Artist Acc.</Typography>
        </Fab>
      ) : null}
      {/* </Tooltip> */}
      <StyledModal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: "99999" }}
      >
        <Paper
          display={"flex"}
          flexDirection="column"
          justifyContent={"space-between"}
          width="80%"
          height="70%"
          borderRadius={5}
          sx={{
            webkitOverflowScrolling: "touch",
            p: "25px",
            borderRadius: "50px",
            minHeight: "70vh",
          }}
          p={3}
        >
          <Box>
            <Stack direction justifyContent={"space-between"}>
              <Typography variant="h4" textAlign={"center"}>
                Please fill the form to get artist account
              </Typography>
              <IconButton>
                <CloseIcon onClick={() => setOpen(false)} />
              </IconButton>
            </Stack>
            <Divider sx={{ margin: "10px" }} />
            <UserBox>
              <Avatar
                sx={{ height: "30px", width: "30px" }}
                src={userData.avatar}
              />
              <Typography fontWeight={500} variant="span">
                {userData?.fname}
              </Typography>
            </UserBox>
          </Box>
          <Box
            maxWidth="sm"
            borderRadius={3}
            maxHeight="450px"
            overflow={"hidden"}
            minHeight="40vh"
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
                <Typography fontSize="8px" variant="span">
                  Upload
                </Typography>
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
                id="standard-multiline-static"
                fullWidth={true}
                label="Description"
                multiline={true}
                rows={3}
                placeholder="Please write a description about yourself...!NOTE:This will be shown on your profile"
                variant="filled"
                name="Description"
                onChange={(e) => handleText(e)}
              />
              <Button type="submit" variant="contained" color="primary">
                submit
              </Button>
            </Grid>
          </Stack>
        </Paper>
      </StyledModal>
    </>
  );
}

export default ArtistRequest;
