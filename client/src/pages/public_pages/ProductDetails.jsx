import { useEffect, useState } from "react";
import { productTypes } from "../../utils/ProductData"
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    setProduct(productTypes.find(product => product.name === params.productId));
  }, [params.productId])

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full mb-12 gap-2 max-w-screen-xl text-black justify-between items-start px-4 py-7 sm:px-6 lg:px-8 lg:pt-7">
        <img src={product.photo} alt="" className="w-full md:w-1/3"/>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-1 text-base text-gray-700">{product.price} Rwf</p>
          <h3 className="mt-5 text-lg font-bold">Description</h3>
          <p className="mt-1 text-sm text-gray-700">{product.description}</p>
          <Link className="block w-full rounded bg-black px-12 py-3 text-sm text-center mt-6 font-medium text-white shadow hover:bg-slate-700 focus:outline-none focus:ring active:bg-slate-500 sm:w-auto" to={'/cart'}>Order now</Link>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails