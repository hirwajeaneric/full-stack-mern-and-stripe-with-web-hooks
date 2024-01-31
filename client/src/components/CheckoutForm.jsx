import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe ||!elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://127.0.0.1:3000/success',
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Send the paymentMethod ID to your server.
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={!stripe}>Submit</button>
        {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}

export default CheckoutForm