import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { useForm } from "react-hook-form";
import AxiosBase from "../api/AxiosBase";
import AnimationPages from "../Outlets/AnimationPages";
import Swal from "sweetalert2";
import { useRef } from "react";

function AddEventPage() {
  const hiddenFileInput = useRef(null);
  const [img, setImg] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("image", img);
    AxiosBase.post("/api/Events/AddEvent", form).then(()=>{
      setDisable(true);
      Swal.fire({
        title: "Success",
        text: "Event has been added",
        icon: "success",
    
      })
    })
  };
  function fileUploadClick() {
    console.log("heyyyy");
    hiddenFileInput.current.click();
  }
  return (
    <AnimationPages>
      <Card sx={{ mt: "10px" }}>
        <CardMedia
          component="img"
          image={img?URL.createObjectURL(img):null}
          alt="Add your Banner here"
          height="200px"
        />
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <Grid container>
            <Grid
              item
              justifyContent={"flex-end"}
              display="flex"
              xs={12}
              sm={12}
              md={12}
            >
              <IconButton onClick={()=>fileUploadClick()}>
                <input
                  ref={hiddenFileInput}
                  hidden
                  type={"file"}
                  onChange={(e) => setImg(e.target.files[0])}
                />
                <PhotoCameraBackIcon  />
                <Typography variant="h12">Add Event Banner</Typography>
              </IconButton>
            </Grid>
          </Grid>
          <CardContent>
            <Grid gap={2} justifyContent={"center"} container>
              <Grid item sm={5}>
                <TextField
                  variant="filled"
                  label="Event name"
                  fullWidth={true}
                  sx={{ backgroundColor: "" }}
                  {...register("eventName")}
                ></TextField>
                <TextField
                  variant="filled"
                  label="Briefing about time and venue"
                  fullWidth={true}
                  {...register("eventBrief")}
                ></TextField>
                <TextField
                  id="date"
                  type="date"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Event Date"
                  fullWidth={true}
                  sx={{ backgroundColor: "" }}
                  {...register("eventDate")}
                ></TextField>

                <TextField
                  variant="filled"
                  label="No. of Tickets"
                  fullWidth={true}
                  sx={{ backgroundColor: "" }}
                  {...register("noOfTickets")}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Grid gap={1} container>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      fullWidth
                      label="Ticket price"
                      {...register("ticketPrice")}
                    ></TextField>
                  </Grid>

                  <Grid item xs={5.8}></Grid>
                </Grid>
                <TextField
                  multiline
                  fullWidth={true}
                  label="Event Description"
                  variant="filled"
                  rows={5.9}
                  {...register("eventDescription")}
                ></TextField>
              </Grid>
              <Grid item sx={{ border: "0px solid black" }} xs={12} sm={11.3}>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  label="Venue/Address"
                  variant="filled"
                  {...register("eventAddress")}
                ></TextField>
                <Button type="submit" disabled={disable} fullWidth variant="contained">
                  {disable?"This event has been added":"Submit"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>
    </AnimationPages>
  );
}

export default AddEventPage;
