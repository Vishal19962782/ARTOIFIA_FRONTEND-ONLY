import { Box, Button, Container, Divider, Stack } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import AxiosBase from "../../../api/AxiosBase";
import AnimationPages from "../../../Outlets/AnimationPages";
import ReqCard from "./ReqCard";

function Requests() {
  const [requests, setRequests] = React.useState([]);
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    AxiosBase.get("/api/Request").then((res) => {
      setRequests(res.data);
    });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: "10px" }}>
      <AnimationPages>
        <Stack>
          <Stack direction justifyContent={"start"}>
            <Button
              onClick={() => {
                setPage(1);
              }}
              variant={page == 1 ? "contained" : ""}
              sx={{ borderRadius: "10px 10px 0px 0px" }}
            >
              Pending
            </Button>
            <Button
              onClick={() => {
                setPage(2);
              }}
              variant={page == 2 ? "contained" : ""}
              sx={{ borderRadius: "10px 10px 0px 0px" }}
            >
              Rejected
            </Button>
          </Stack>
          <Divider sx={{ mb: "20px" }} />
          {page == 1 ? (
            <Stack justifyContent={"center"} alignItems="center">
              {requests
                .filter((item) => item.status == "pending")
                .map((item) => (
                  <ReqCard setReq={setRequests} req={item} />
                ))}
            </Stack>
          ) : (
            <Stack justifyContent={"center"} alignItems="center">
              {requests
                .filter((item) => item.status == "Rejected")
                .map((item) => (
                  <ReqCard setReq={setRequests} req={item} />
                ))}
            </Stack>
          )}
        </Stack>
      </AnimationPages>
    </Container>
  );
}

export default Requests;
