import { Box, Button, Fade, Modal, Paper, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { IconButton } from "@mui/material";
import styled from "@emotion/styled";
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
function PaymentOptionModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      <Button onClick={handleOpen} aria-label="Comment">
        {/* <CommentIcon /> */}
        Buy
      </Button>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
      >
        <Fade in={open}>
          <Box
            bgcolor={"white"}
            width="30%"
            height="45%"
            display="flex"
            flexDirection={"column"}
            justifyContent="Space-between"
            borderRadius={5}
            padding={5}
          >
            <Stack
              direction={"column"}
              display="flex"
              justifyContent={"flex-end"}
              alignContent="flex-end"
            >
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                >
                  Choose Your Payment Method
                </Typography>
                <IconButton size="large">
                  <CloseIcon fontSize="medium" onClick={() => setOpen(!open)} />
                </IconButton>
              </Stack>
              <Stack>
                <Stack direction justifyContent={"center"} gap={3}>
                  <Paper
                    elevation={12}
                    sx={{
                      "&:hover": { backgroundColor: "#e1f5fe" },
                      p: "10px",
                    }}
                  >
                    <img
                      width="150px"
                      src="https://pngimg.com/uploads/paypal/paypal_PNG22.png"
                    />
                  </Paper>
                 
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </StyledModal>
    </div>
  );
}

export default PaymentOptionModal;
