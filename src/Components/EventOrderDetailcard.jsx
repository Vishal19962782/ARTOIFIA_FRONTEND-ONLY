import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import AxiosBase from "../api/AxiosBase";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AnimationPages from "../Outlets/AnimationPages";
import styled from "@emotion/styled";
import EventIcon from "@mui/icons-material/Event";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
function EventOrderDetailcard({ tickets }) {
  const { orderItem, orderOwner } = tickets;
  const eventdate = new Date(orderItem?.eventDate);
  const downloadTicket = () => {
    AxiosBase.get("api/ticket/downloadTicket/" + tickets?._id, {
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Invoice.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  const StyledPaper = styled(Box)({
    display: "flex",

    alignItems: "center",
    gap: "15px",
  });
  return (
    <AnimationPages>
      <Box sx={{ mt: "10px", mb: "10px" }}>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={orderItem?.eventImage}
            alt="no image"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Stack gap={3} direction alignItems={"center"}>
                <Typography variant="h4" color={"primary"} component="p">
                  {orderItem?.eventName}{" "}
                </Typography>
                <Chip
                  variant="filled"
                  color="warning"
                  label={tickets.amount + "  ₹"}
                />
                <Typography variant="h12" color={"primary"} component="p">
                  <Chip
                    size="small"
                    variant="outlined"
                    color={"secondary"}
                    label={`${orderOwner?.fname + " " + orderOwner?.lname}`}
                  />
                </Typography>
              </Stack>
              <Divider sx={{ p: "5px" }} />
              <Stack gap={1} justifyContent={"center"}>
                <StyledPaper>
                  <EventIcon color="info" />
                  <Typography marginTop={1} variant="h8" component="p">
                    {eventdate?.toDateString()}
                  </Typography>
                </StyledPaper>
                <StyledPaper>
                  <ConfirmationNumberIcon color="warning" />
                  <Typography variant="h6">
                    {tickets?.amount / orderItem?.ticketPrice}
                    <Typography
                      color={"warning.dark"}
                      variant="h11"
                      fontSize={12}
                    >
                      {" "}
                      Tickets
                    </Typography>
                  </Typography>
                </StyledPaper>
              </Stack>
            </CardContent>
            <CardActions
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            >
              <Button
                size="small"
                endIcon={<ReceiptIcon />}
                onClick={downloadTicket}
              >
                Download E-Ticket{" "}
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </AnimationPages>
  );
}

export default EventOrderDetailcard;
