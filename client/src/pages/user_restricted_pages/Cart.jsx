import { useNavigate } from 'react-router-dom';

const Cart = () => {
    // const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();

    const goToPayment = (e) => {
        e.preventDefault();
        var cartItems = [
            {
                price: 'price_1OY2vBJ0gOzWqZK58WRHI18q',
                quantity: 3,
            },
            {
                price: 'price_1OY2TAJ0gOzWqZK5dm4BeoC5',
                quantity: 4,
            },
            {
                price: 'price_1OY2xZJ0gOzWqZK5d2KVV9sv',
                quantity: 2,
            }
        ];

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