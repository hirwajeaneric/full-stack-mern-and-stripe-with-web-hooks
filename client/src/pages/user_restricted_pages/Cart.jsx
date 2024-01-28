import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartItem from '../../components/CartItem';

const Cart = () => {
    const [unConfirmedOrders, setUnConfirmedOrders] = useState([]);
    const [summary, setSummary] = useState({
        deliveryCharge: 0, 
        grandTotal: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4242/api/v1/cement-swift/cart/list?customerId=${JSON.parse(localStorage.getItem('user'))._id}`)
            .then((response) => {
                setUnConfirmedOrders(response.data.items);
                var grandTotal=0;
                response.data.items.forEach((item) => {
                    grandTotal += item.price;
                });
                setSummary({grandTotal: grandTotal});
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
                <div>
                    <form>
                        <table>
                            <tr>
                                <th>Products</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                            {unConfirmedOrders.map((product, index) => (
                                <CartItem key={index} product={product} />
                            ))}
                        </table>
                    </form>
                    <form onSubmit={goToPayment}>
                        <h3>Summary</h3>
                        <div>
                            <p>Delivery Charge</p>
                            <p>{summary.deliveryCharge} Rwf</p>
                        </div>
                        <div>
                            <p><strong>Grand Total</strong></p>
                            <p><strong>{summary.grandTotal} Rwf</strong></p>
                        </div>
                        <button type='submit'>Checkout</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Cart