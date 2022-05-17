import { Box, Button, Fade, Modal, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import React from "react";
import { IconButton } from "@mui/material";
import styled from "@emotion/styled";

import { useDispatch } from "react-redux";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function AddressModal() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    
  };
  return (
    <div>
      <IconButton type="submit" onClick={handleOpen} size="large">
        <CurrencyRupeeIcon />
      </IconButton>

      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
      >
        <Fade in={open}>
          <Box
            bgcolor={"white"}
            maxWidth={300}
            maxHeight={380}
            width={{ xs: "100%", sm: "80%", md: "40%" }}
            height="75%"
            display="flex"
            flexDirection={"column"}
            justifyContent="space-evenly"
            borderRadius={5}
            padding={5}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h2"
              >
                Add Address
              </Typography>
              <IconButton size="large">
                <CloseIcon fontSize="medium" onClick={() => handleClose()} />
              </IconButton>
            </Stack>
            <Box>
              <Stack component="form" rowGap={1}>
                <TextField label="Address" name="address" />
                <TextField label="City" name="city" />
                <TextField label="State" name="state" />
                <TextField label="Zip" name="zip" />
                <TextField label="Country" name="country" />
                <Button type="submit" variant="contained" color="primary">
                  Add Address
                </Button>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </StyledModal>
    </div>
  );
}

export default AddressModal;
