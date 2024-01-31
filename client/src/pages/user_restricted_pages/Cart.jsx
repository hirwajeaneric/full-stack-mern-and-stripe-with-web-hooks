import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
                var grandTotal = 0;
                response.data.items.forEach((item) => {
                    grandTotal += item.total;
                });
                setSummary({ ...summary, grandTotal: grandTotal });
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

        navigate(`/checkout?amount=${JSON.stringify(summary.grandTotal)}&items=${JSON.stringify(cartItems)}`);

    };

    return (
        <section className="w-full flex flex-col justify-center items-center">
            <div className="flex w-full flex-col mb-12 gap-2 max-w-screen-xl text-black justify-between items-start px-4 py-7 sm:px-6 lg:px-8 lg:pt-7">
                <h1 className="text-3xl font-bold">Cart</h1>
                <div className='flex w-full flex-wrap'>

                    {unConfirmedOrders.length === 0 &&
                        <div className='my-10'>
                            <p>No items in the cart for now.</p>
                            <Link to="/products" className='text-slate-400 text-lg'>Click here to Order cement.</Link>
                        </div>
                    }

                    {unConfirmedOrders.length !== 0 &&
                        <>
                            <form className='w-full md:w-3/4 mb-7'>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='text-left'>
                                            <td>Products</td>
                                            <td>Quantity</td>
                                            <td>Subtotal</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unConfirmedOrders.map((product, index) => (
                                            <CartItem 
                                                key={index} 
                                                product={product} 
                                                summary={summary}
                                                setSummary={setSummary}
                                                unConfirmedOrder={unConfirmedOrders} 
                                                setUnConfirmedOrders={setUnConfirmedOrders} 
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </form>

                            <form onSubmit={goToPayment} className='w-full md:w-1/4 flex flex-col gap-6 p-5 rounded-md border-solid border-2 border-slate-100'>
                                <h3 className='font-bold text-lg'>Summary</h3>
                                <div className='flex justify-between items-center'>
                                    <p>Delivery Charge</p>
                                    <p>{summary.deliveryCharge} Rwf</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p><strong>Grand Total</strong></p>
                                    <p><strong>{summary.grandTotal} Rwf</strong></p>
                                </div>
                                <button type='submit' className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow hover:bg-slate-700 focus:outline-none focus:ring active:bg-slate-500">Checkout</button>
                            </form>
                        </>}
                </div>
            </div>
        </section>
    )
}

export default Cart