import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

/* eslint-disable react/prop-types */
const CartItem = ({product}) => {
    const [productData, setProductData] = useState({});

    useEffect(() => {
        setProductData(product);
    },[product])

    const deleteItem = (e) => {
        e.preventDefault();


    }

    const handleQuantity = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }

    return (
        <tr>
            <td className="py-4">
                <div className="flex items-center">
                    <img src={`${product.photo}`} className="w-12 h-12 object-contain rounded-full" alt="" />
                    <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{product.productName}</h3>
                        <p className="mt-1 text-sm text-gray-500">{product.price} Rwf</p>
                    </div>
                </div>
            </td>
            <td className="py-4">
                <div className="flex rounded-md border-solid border-2 w-1/3">
                    <button className="w-1/3 p-2">-</button>
                    <input type="number" name="quantity" id="quantity" className="w-1/3 text-center" value={productData.quantity} onChange={handleQuantity} />
                    <button className="w-1/3 p-2">+</button>
                </div>
            </td>
            <td className="py-4">
                <div className="flex gap-4">
                    <p>{productData.quantity * productData.price} Rwf</p>
                    <button onClick={deleteItem}>
                        <MdDeleteOutline className="text-red-500 text-2xl"/>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default CartItem