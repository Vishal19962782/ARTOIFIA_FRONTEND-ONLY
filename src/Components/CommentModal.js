import { Box, Fade, Modal, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommentItem from "./CommentItem";
import React from "react";
import { IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import Axios from "./../api/AxiosBase";
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const CommentBox = styled(Box)({
  display: "block",
  gap: "10",
  maginBottom: "10",
});

function CommentModal(props) {
  const [commentList, setCommentList] = React.useState(props.comments);
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    Axios.post("/api/user/comment", {
      postId: props?.postId,
      comment: comment,
    })
      .then((res) => {
        setCommentList(res.data.postComments);
        props.setCommentNumber(props.commentNumber + 1);
      })
      .catch((err) => {
        
      });
  };

  return (
    <div>
      <IconButton onClick={handleOpen} aria-label="Comment">
        <CommentIcon />
      </IconButton>

      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
      >
        <Fade in={open}>
          <Box
            bgcolor={"white"}
            width="80%"
            height="75%"
            display="flex"
            flexDirection={"column"}
            justifyContent="Space-between"
            borderRadius={5}
            padding={5}
          >
            <CommentBox>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                >
                  Comments
                </Typography>
                <IconButton size="large">
                  <CloseIcon fontSize="medium" onClick={() => setOpen(!open)} />
                </IconButton>
              </Stack>
              <Stack justifyContent={"space-between"}>
                <Stack>
                  <CommentItem comments={commentList} />
                </Stack>
              </Stack>
            </CommentBox>
            <Stack
              direction={"column"}
              display="flex"
              justifyContent={"flex-end"}
              alignContent="flex-end"
            >
              <Box
                display="flex"
                component="form"
                onSubmit={handleSubmit}
                alignItems={"center"}
              >
                <TextField
                  multiline
                  rows={2}
                  variant="filled"
                  sx={{ width: { xs: "95%" }, backgroundColor: "primary" }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <IconButton type="submit" size="large">
                  <SendIcon />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        </Fade>
      </StyledModal>
    </div>
  );
}

export default CommentModal;
