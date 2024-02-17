import axios from "axios"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const Success = () => { 
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (new URLSearchParams(window.location.search).get('redirect_status') === 'succeeded') {
            axios.put(`${serverAddress}/api/v1/cement-swift/cart/confirm?customerId=${userInfo._id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
        }
    },[])

    return (
            <section className="w-full flex flex-col justify-center items-center">
                <div className="flex flex-col w-full mb-12 gap-2 max-w-screen-xl text-black justify-center items-center px-4 py-7 sm:px-6 lg:px-8 lg:py-20 flex-wrap">
                    <h1 className="text-4xl font-bold">Thank you for your order!</h1>
                    <p className="mt-1 text-base text-gray-700">You will recieve a confirmation email shortly.</p>
                    <div className="flex w-full gap-4 justify-center items-center flex-wrap">
                        <Link
                            to={"/account/order/34asdf843j0jasdf0asd"}
                            className="w-full md:w-1/4 block rounded bg-black px-12 py-3 text-base text-center mt-6 font-normal text-white hover:bg-slate-700 focus:outline-none focus:ring active:bg-slate-500"
                        >
                            View order
                        </Link>
                        <Link
                            to={'/account/orders'}
                            className="w-full md:w-1/4 rounded px-12 py-3 text-base text-center mt-6 font-normal text-black hover:bg-slate-100 focus:outline-none focus:ring active:bg-slate-500 border-black border-2"
                        >
                            View all orders
                        </Link>
                    </div>
                </div>
            </section>
    )
}

export default Success