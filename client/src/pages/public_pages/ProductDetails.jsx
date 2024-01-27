import { useEffect, useState } from "react";
import { productTypes } from "../../utils/ProductData"
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    setProduct(productTypes.find(product => product.name === params.productId));
  }, [params.productId])

  const addToChart = (e) => {
    e.preventDefault();

    axios.post("http://localhost:4242/add-to-cart", { productId: params.productId })
      .then((response) => {
        if (response.status === 201) {
          window.location.replace('/cart');
        }
      })
      .catch((error) => {
        console.log('Error :', error);
      });
  }

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full mb-12 gap-2 max-w-screen-xl text-black justify-between items-start px-4 py-7 sm:px-6 lg:px-8 lg:pt-7">
        <img src={product.photo} alt="" className="w-full md:w-1/3" />

        <form onSubmit={addToChart} className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-1 text-base text-gray-700">{product.price} Rwf</p>
          <h3 className="mt-5 text-lg font-bold">Description</h3>
          <p className="mt-1 text-sm text-gray-700">{product.description}</p>
          {
            localStorage.getItem('customer_access_token') &&
            <button type="submit" className="block w-full rounded bg-black px-12 py-3 text-sm text-center mt-6 font-medium text-white shadow hover:bg-slate-700 focus:outline-none focus:ring active:bg-slate-500 sm:w-auto" to={"/cart"}>Order now</button>
          }
          {
            !localStorage.getItem('customer_access_token') &&
            <Link className="block w-full rounded bg-black px-12 py-3 text-sm text-center mt-6 font-medium text-white shadow hover:bg-slate-700 focus:outline-none focus:ring active:bg-slate-500 sm:w-auto" to={"/signin?redirect=cart"}>Login to order</Link>
          }
        </form>
      </div>
    </section>
  )
}

export default ProductDetails