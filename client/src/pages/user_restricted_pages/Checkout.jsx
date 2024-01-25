import { useEffect, useState } from 'react'
import CheckoutForm from '../../components/CheckoutForm'
import { useSearchParams } from 'react-router-dom'; 

const Checkout = () => {
  const [items, setItems] = useState();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryData = JSON.parse(searchParams.get('items'));
    setItems(queryData);
  },[searchParams])

  return (
    <div id='checkout-page'>
        <h1>Checkout</h1>
        <CheckoutForm items={items}/>
    </div>
  )
}

export default Checkout