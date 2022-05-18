import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import AxiosBase from "../api/AxiosBase";
import AnimationPages from "../Outlets/AnimationPages";
import CalendarTodayTwoToneIcon from "@mui/icons-material/CalendarTodayTwoTone";
import styled from "@emotion/styled";
import DoneIcon from "@mui/icons-material/Done";
function PastOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    AxiosBase.get("/api/payment/getOrders").then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);
  const StyledStack = styled(Stack)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  });
  return (
    <AnimationPages>
      {loading ? (
        <Skeleton variant="rect" animation="wave" width="100%" height={200} />
      ) : (
        orders?.map((orders, index) => {
          const { orderItem, orderOwner } = orders;
          return (
            <Box key={index} sx={{ mt: "10px", mb: "10px", width: "100%" }}>
              <Card sx={{ display: "flex", boxShadow: "5" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image={orderItem?.Image}
                  alt="no image"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Stack gap={2} alignItems={"center"} direction>
                      <Typography variant="h4" color={"primary"} component="p">
                        {orderItem?.postName}
                      </Typography>
                      <Chip
                        color="warning"
                        label={orders?.amount / 100 + " ₹"}
                      />
                      <Chip
                        color="secondary"
                        size="small"
                        variant="outlined"
                        label={
                          orderItem?.postOwner.fname +
                          " " +
                          orderItem?.postOwner.lname
                        }
                      />
                    </Stack>
                    <Divider />
                    <StyledStack>
                      <CalendarTodayTwoToneIcon
                        sx={{ color: "warning.dark" }}
                      />
                      <Typography variant="h8" component="p">
                        {new Date(orders?.orderDate).toDateString()}
                      </Typography>
                    </StyledStack>
                    <StyledStack>
                      <Chip
                        variant="outlined"
                        label={
                          <Stack direction>
                            <DoneIcon color="success" />
                            <Typography color={"success.dark"}>
                              Paid through Razorpay
                            </Typography>
                          </Stack>
                        }
                      />
                    </StyledStack>
                  </CardContent>
                </Box>
              </Card>
            </Box>
          );
        })
      )}
      {orders?.length == 0 ? (
        <Box>
          <Typography
            variant="h6"
            sx={{ opacity: "0.5", color: "text.primary" }}
            textAlign={"center"}
          >
            NO Posts Purchased
          </Typography>
        </Box>
      ) : null}
      )}
    </AnimationPages>
  );
}

export default PastOrders;
