import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

/* eslint-disable react/prop-types */
const CartItem = ({product}) => {
    const [productData, setProductData] = useState({});

    useEffect(() => {
        setProductData(product);
    },[product])

    const handleQuantity = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }

    return (
        <tr>
            <td>
                <div className="flex items-center">
                    <img src={`${product.photo}`} className="w-12 h-12 object-contain rounded-full" alt="" />
                    <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{product.productName}</h3>
                        <p className="mt-1 text-sm text-gray-500">{product.price} Rwf</p>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <button>-</button>
                    <input type="number" name="quantity" id="quantity" value={productData.quantity} onChange={handleQuantity} />
                    <button>+</button>
                </div>
            </td>
            <td>
                <div>
                    <p>{productData.quantity * productData.price} Rwf</p>
                    <button>
                        <MdDeleteOutline className="text-red-500 text-2xl"/>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default CartItem