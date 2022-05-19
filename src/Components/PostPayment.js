import { Button } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import AxiosBase from "../api/AxiosBase";
function PaymentComponent({ order,setPage }) {
  
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [orders, setOrders] = useState([]);
  const loadRazorpay = () => {
    
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Error in loading razorpay");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await AxiosBase.post("/api/payment/order", {
          amount: order.price * 100, 
        });
        
        const { amount, id: order_id, currency } = result.data;
        const data = await AxiosBase.get("/api/payment/getRazorpayKey");
        
        const options = {
          key: data.data,
          amount: amount.toString(),
          currency: currency,
          name: "Artofia",
          description: `Payment for ${order.postId.postName}`,
          order_id: order_id,
          handler: async (response) => {
            
            const result = await AxiosBase.post("/api/payment/payOrder", {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              itemType: "Art",
              orderItem: order.postId._id,
            }).then(()=>{
              Swal.fire({
                title: "Payment Successful",
                text: "Your payment has been successful",
                icon: "success",
              })
              setPage(2);
            })
          },
        };
        
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert("error"+err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };
  return (
    <div>
      <Button onClick={loadRazorpay}>Pay </Button>
    </div>
  );
}

export default PaymentComponent;
