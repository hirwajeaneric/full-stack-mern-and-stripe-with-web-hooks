import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [unConfirmedOrders, setUnConfirmedOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4242/api/v1/cement-swift/cart/list?customerId=${JSON.parse(localStorage.getItem('user'))._id}`)
            .then((response) => {
                setUnConfirmedOrders(response.data.items);
            })
            .catch((error) => { console.log(error); })
    }, []);

    const goToPayment = (e) => {
        e.preventDefault();
        var cartItems = [];
        unConfirmedOrders.forEach(unConfirmedOrder => {
            cartItems.push({
                price: unConfirmedOrder.productId,
                quantity: unConfirmedOrder.quantity
            });
        })

        navigate(`/checkout?items=${JSON.stringify(cartItems)}`);

    };

    return (
        <section className="w-full flex flex-col justify-center items-center">
            <div className="flex w-full flex-col mb-12 gap-2 max-w-screen-xl text-black justify-between items-start px-4 py-7 sm:px-6 lg:px-8 lg:pt-7">
                <h1 className="text-3xl font-bold">Cart</h1>
                <form onSubmit={goToPayment}>
                    <button type='submit'>Checkout</button>
                </form>
            </div>
        </section>
    )
}

export default Cart