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
        <div>
            <h1>Cart</h1>
            <form onSubmit={goToPayment}>
                <button type='submit'>Checkout</button>
            </form>
        </div>
    )
}

export default Cart