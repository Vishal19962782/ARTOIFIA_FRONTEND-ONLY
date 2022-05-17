import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Swal from "sweetalert2";
import AxiosBase from "../../../api/AxiosBase";

function ReqCard({ req }) {
  console.log("clicked");
  const [open, setOpen] = React.useState(true);
  const date = new Date(req.userId.dateOfCreation);
  const AcceptRequest = async (reqId, userId, description) => {
    console.log("Trying to accpttt");
    // return 0;
    try {
      const accept = await AxiosBase.put("/api/Request/AcceptRequest", {
        reqId,
        userId,
        description,
      });
      console.log(accept.data);
      setOpen(false);
      Swal.fire({
        title: "Success",
        text: "Request Accepted",
        icon: "success",
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Request not accepted something went wrong",
        icon: "error",
      });
    }
  };
  const RejectRequest = (reqId, userId) => {
    AxiosBase.put("/api/Request/RejectRequest", { reqId, userId }).then(() => {
      setOpen(false);
      Swal.fire({
        title: "Success",
        text: "Request Rejected",
        icon: "success",
      });
    });
  };

  return (
    <Box display={open ? "block" : "none"} width={"100%"}>
      <Accordion elevation={9}>
        <AccordionSummary elevation={0}>
          <Card sx={{ display: "flex", flexGrow: "1" }}>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={req.userId.avatar}
              alt="no image"
            />
            <Stack
              p={4}
              width="100%"
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Box>
                <Box sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h4" component="p">
                    {req.userId.fname + " " + req.userId.lname}sss
                  </Typography>
                  <Typography variant="h9" component="p">
                    Date of account creation: {date.toDateString()}
                  </Typography>
                  {req.status == "Rejected" ? (
                    <Typography color={"error"} variant="h8" component="p">
                      This request was rejected
                    </Typography>
                  ) : null}
                  <Typography variant="h8" component="p">
                    {req.description}
                  </Typography>
                </Box>
              </Box>
              <Box></Box>
            </Stack>
          </Card>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column">
            <Stack direction>
              <Button
                onClick={() =>
                  AcceptRequest(req._id, req.userId._id, req.description)
                }
                variant="contained"
                sx={{
                  borderRadius: "10px 0px 0px 0px",
                  boxShadow: "none",
                  width: "50%",
                }}
              >
                Accept request
              </Button>
              <Button
                onClick={() => RejectRequest(req._id, req.userId._id)}
                variant="contained"
                width="50%"
                sx={{
                  borderRadius: "0px 10px 0px 0px",
                  boxShadow: "none",
                  width: "50%",
                }}
                color="error"
                disabled={req.status == "Rejected"}
              >
                Reject request
              </Button>
            </Stack>
            <CardMedia
              component="img"
              // sx={{ width: 150 }}
              image={req.image}
              alt="no image"
              sx={{
                borderRadius: "0px 0px 11px 11px",
                "&:hover": { color: "warning" },
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ReqCard;
