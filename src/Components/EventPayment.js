import { useState } from "react";
import AxiosBase from "../api/AxiosBase";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { Button, Modal, Paper, Stack } from "@mui/material";
import React from "react";
import { IconButton } from "@mui/material";
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
function EventPayment({ Event, quantity, setQuantity }) {
  const [count, setCount] = useState(1);

  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(1);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCount = (method) => {
    if (method == "plus" && count < Event.noOfTickets - Event.noOfTicketsSold) {
      setCount(count + 1);
    }
    if (count > 1 && method == "minus") {
      setCount(count - 1);
    }
  };
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Error in loading razorpay");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await AxiosBase.post("/api/ticket/order", {
          amount: Event?.ticketPrice * 100 * count,
        });

        const { amount, id: order_id, currency } = result.data;
        const data = await AxiosBase.get("/api/ticket/getRazorpayKey");

        const options = {
          key: data.data,
          amount: amount.toString(),
          currency: currency,
          name: "Artofia",
          description: `Payment for ${Event.eventName} X ${count}`,
          order_id: order_id,
          handler: async (response) => {
            setQuantity(quantity - count);

            const result = await AxiosBase.post("/api/ticket/payOrder", {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              itemType: "Event",
              orderItem: Event._id,
              noOfTickets: count,
            });
            alert(result.data.msg);
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert("errorrrr" + err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <>
      <Paper sx={{ backgroundColor: "info.dark" }}>
        <Stack>
          <Stack direction>
            <IconButton onClick={() => handleCount("plus")} variant="">
              <AddIcon />
            </IconButton>
            <Button variant="contained" onClick={() => loadRazorpay()}>
              Buy {count} ticket{" "}
            </Button>
            <IconButton onClick={() => handleCount("minus")} variant="">
              <RemoveIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

export default EventPayment;
