import { Box, Button, Fade, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React from "react";
import { IconButton } from "@mui/material";
import styled from "@emotion/styled";
import AxiosBase from "../api/AxiosBase";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../features/Userslice";
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function AddressModal() {
  const [open, setOpen] = React.useState(false);
    const dispatch=useDispatch()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit=(event)=>{
    event.preventDefault();
    
    const data = new FormData(event.currentTarget)
    
    AxiosBase.put("/route/addAddress",{
        city:data.get('city'),
        address:data.get('address'),
        zip:data.get('zip'),
        country:data.get('country'),
        state:data.get('state'),
    }).then((res)=>{
        dispatch(addUserDetails(res.data))
    })

  }
  return (
    <div>
      <Button fullWidth onClick={handleOpen} aria-label="Comment">
        Add
      </Button>

      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
      >
        <Fade in={open}>
          <Paper
            bgcolor={"white"}
            maxWidth={300}
          
            maxHeight={380}
            width={{ xs: "100%", sm: "80%", md: "40%" }}
            sx={{width:"200px"}}
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
                <Stack component='form' onSubmit={handleSubmit} rowGap={1} >
            
                <TextField  label="Address" name="address" />
                <TextField label="City" name="city" />
                <TextField label="State" name="state" />
                <TextField label="Zip" name="zip" /> 
                <TextField label="Country" name="country" />
                <Button type="submit" variant="contained" color="primary">
                    Add Address
                </Button>
         
                </Stack>
            </Box>
          </Paper>
        </Fade>
      </StyledModal>
    </div>
  );
}

export default AddressModal;
