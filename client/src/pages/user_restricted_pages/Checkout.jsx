import { useEffect, useState } from 'react'
import CheckoutForm from '../../components/CheckoutForm'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51OXVUEJ0gOzWqZK5uVE6U8ZKxFdPsYj3txq9wPCcdBTqT2G8RqL4v6NwkNBtVl6M1wfuc4DvBRCVpoy3RJ7Z5dgb00p4oqHVKg");

const Checkout = () => {
  const [items, setItems] = useState();
  const [clientSecret, setClientSecret] = useState('');

  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   const queryData = JSON.parse(searchParams.get('items'));
  //   setItems(queryData);

  //   axios.post("http://localhost:4242/create-checkout-session", { items })
  //     .then((response) => {
  //       setClientSecret(response.data.clientSecret);

  //     })
  //     .catch((error) => {
  //       console.log('Error :', error);
  //     });
  // }, []);
  useEffect(() => {
    const queryData = JSON.parse(searchParams.get('items'));
    setItems(queryData);

    axios.get("http://localhost:4242/secret")
      .then((response) => {
        setClientSecret(response.data.client_scecret);
      })
      .catch((error) => {
        console.log('Error :', error);
      });
  }, []);

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }} >
      <CheckoutForm items={items} />
    </Elements >
  )
}

export default Checkout