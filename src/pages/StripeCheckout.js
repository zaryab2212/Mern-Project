import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectcurrentOrder } from "../features/order/orderSlice";

const stripePromise = loadStripe("pk_test_51Njf8DSEgSLCI1a7XORda0twWPH8VtMN2JZgQ0EAXx1rGqOJt0CwWtZAdy1JeGLcrGneiiW1piOi3ckG0C92E5U500KS4SxoED");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
 const currentOrder = useSelector(selectcurrentOrder)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount,orderId: currentOrder._id  }),
  
   
    
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (

    <div className="Stripe">
      {/* {console.log(currentOrder)} */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}