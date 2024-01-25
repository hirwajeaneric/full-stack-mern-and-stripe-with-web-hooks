/* eslint-disable react/prop-types */
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

// This is your test public API key.
const stripePromise = loadStripe("pk_test_51OXVUEJ0gOzWqZK5uVE6U8ZKxFdPsYj3txq9wPCcdBTqT2G8RqL4v6NwkNBtVl6M1wfuc4DvBRCVpoy3RJ7Z5dgb00p4oqHVKg");

const CheckoutForm = ({ items }) => {
    const [clientSecret, setClientSecret] = useState('');

    console.log(items);

    useEffect(() => {
        // Create a Checkout Session as soon as the page loads
        axios.post("http://localhost:4242/create-checkout-session", { items })
        .then((response) => {
            setClientSecret(response.data.clientSecret);
        })
        .catch((error) => {
            console.log('Error :', error);
        });
    }, [items]);
    
    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    )
}

export default CheckoutForm;
// fetch("http://localhost:4242/create-checkout-session", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: {
//         items: items,
//     },
// })
//     .then((res) => res.json())
//     .then((data) => setClientSecret(data.clientSecret));